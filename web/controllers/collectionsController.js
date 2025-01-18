import shopify from "../shopify.js";
import { getQueryData, queryDataWithVariables } from "../utils/getQueryData.js";
import { collectionQuery, selectedCollectionQuery } from "../utils/query.js";
import { getMetafield } from "./getMetafield.js";

const fetchAllCollections = async (session, variables) => {
  const client = new shopify.api.clients.Graphql({
    session: session,
  });

  try {
    const query = collectionQuery(variables);
    const response = await client.query({
      data: {
        query: query,
        variables: variables,
      },
    });

    const collections = response.body.data.collections.edges.map(
      (edge) => edge.node
    );
    const pageInfo = response.body.data.collections.pageInfo;
    return { collections, pageInfo };
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

export const getCollectionsController = async (req, res, next) => {
  try {
    const afterCursor = req?.query?.afterCursor;
    const beforeCursor = req?.query?.beforeCursor;
    const limit = req?.query?.limit;

    let variables = {
      count: +limit,
      cursor: afterCursor || beforeCursor || null,
      after: afterCursor || null,
      before: beforeCursor || null,
    };

    const collections = await fetchAllCollections(
      res.locals.shopify.session,
      variables
    );

    return res.status(200).json(collections);
  } catch (err) {
    console.log(
      "🚀 ~ file: description.js:73 ~ descriptionController ~ err:",
      err
    );
    res.status(400).json({ err });
  }
};

export const getSelectedCollectionsController = async (req, res, next) => {
  try {
    const afterCursor = req?.query?.afterCursor;
    const beforeCursor = req?.query?.beforeCursor;
    const limit = req?.query?.limit;

    const selectedList = await getMetafield(res);
    const dynamicQuery = selectedList?.collections
      .map((item) => `id:${item?.id?.split("/").pop()}`)
      .join(" OR ");

    let variables = {
      count: +limit,
      cursor: afterCursor || beforeCursor || null,
      after: afterCursor || null,
      before: beforeCursor || null,
      dynamicQuery: dynamicQuery,
    };

    const query = selectedCollectionQuery(variables, selectedList?.collections);
    const responseList = await queryDataWithVariables(res, query, variables);
    const collections = responseList.body.data.collections.edges.map(
      (edge) => edge.node
    );
    const orderedCollections = selectedList?.collections?.map((item) =>
      collections.find((collection) =>
        collection?.id?.endsWith(item?.id?.split("/").pop())
      )
    );
    const pageInfo = responseList.body.data.collections.pageInfo;
    const finalList = {
      collections: orderedCollections,
      pageInfo: pageInfo,
      template: selectedList?.template,
    };
    return res.status(200).json(finalList);
  } catch (err) {
    console.log(
      "🚀 ~ file: description.js:73 ~ descriptionController ~ err:",
      err
    );
    res.status(400).json({ err });
  }
};
