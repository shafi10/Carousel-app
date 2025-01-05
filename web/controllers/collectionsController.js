import shopify from "../shopify.js";
import { GetShopId, metafieldCreate } from "../utils/query.js";

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
    const collections = JSON.stringify(req.body);

    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const response = await client.query({
      data: GetShopId,
    });

    let variables = {
      metafields: [
        {
          key: "quick_collection_carousel_key",
          namespace: "quick_carousel_namespace_v1",
          ownerId: response.body.data.shop.id,
          type: "json",
          value: collections,
        },
      ],
    };

    const createMetafield = await client.query({
      data: {
        query: metafieldCreate,
        variables: variables,
      },
    });

    if (createMetafield?.errors) {
      return res.status(400).json({
        errors: createMetafield.errors,
      });
    } else if (
      createMetafield?.body?.data?.data?.metafieldsSet?.userErrors?.[0]?.message
    ) {
      return res.status(400).json({
        errors: createMetafield.body.data?.data?.metafieldsSet?.userErrors?.[0],
      });
    }
    res.status(200).json({
      data: createMetafield,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};
