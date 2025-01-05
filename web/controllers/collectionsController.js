import shopify from "../shopify.js";
import { metafieldCreate } from "../utils/query.js";

const collectionQuery = (variables) => {
  let query = `
  query ($count: Int!, $cursor: String) {
    collections(first: $count, after: $cursor, reverse: true) {
      edges {
        node {
          id
          title
          handle
          image {
            id
            url
            altText
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
  if (variables?.before) {
    query = query.replace("first:", "last:");
    query = query.replace("after:", "before:");
  }
  return query;
};

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

export const creteCollections = async (req, res, next) => {
  try {
    let variables = {
      metafields: [
        {
          key: "example_key",
          namespace: "example_namespace",
          ownerId: "gid://shopify/Shop/1",
          type: "single_line_text_field",
          value: "Example Value",
        },
      ],
    };

    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const response = await client.query({
      data: {
        query: metafieldCreate,
        variables: variables,
      },
    });
  } catch (error) {}
};
