import shopify from "../shopify.js";

const collectionQuery = (variables) => {
  let query = `
  query ($count: Int!, $cursor: String) {
    collections(first: $count, after: $cursor, reverse: true) {
      edges {
        node {
          id
          title
          handle
          updatedAt
          sortOrder
          metafield(namespace: "bs-23-seo-app", key: "json-ld") {
            value
          }
          seo{
            title
            description
          }
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
