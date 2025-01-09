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
