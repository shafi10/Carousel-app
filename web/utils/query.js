export const metafieldCreate = `mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          key
          namespace
          value
          createdAt
          updatedAt
        }
        userErrors {
          field
          message
          code
        }
      }
    }`;

export const GetShopId = `
    query GetShopId {
        shop {
            id
        }
    }`;

export const metafieldQuery = `query ShopMetafield($namespace: String!, $key: String!) {
      shop {
        shopMetafield: metafield(namespace: $namespace, key: $key) {
          value
        }
      }
    }`;

export const selectedCollectionQuery = (variables) => {
  let query = `
      query ($count: Int!, $cursor: String, $dynamicQuery: String) {
       collections(first: $count, after: $cursor, query: $dynamicQuery) {
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

export const collectionQuery = (variables) => {
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
