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

export const subscriptionCreate = () => {
  return `mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $test: Boolean, $trialDays: Int ) {
    appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test: $test, trialDays: $trialDays) {
      userErrors {
        field
        message
      }
      appSubscription {
        id
      }
      confirmationUrl
    }
  }`;
};

export const subscriptionCancel = () => {
  return `mutation AppSubscriptionCancel($id: ID!, $prorate: Boolean) {
      appSubscriptionCancel(id: $id, prorate: $prorate) {
        userErrors {
          field
          message
        }
        appSubscription {
          id
          status
        }
      }
    }`;
};

export const activeSubscription = () => {
  return `query getSubscription {
    appInstallation {
     activeSubscriptions {
      createdAt
      currentPeriodEnd
      id
      name
      status
      test
      trialDays
       lineItems {
        id
        plan {
          pricingDetails {
            __typename
            ... on AppRecurringPricing {
              interval
              price {
                amount
              }
              discount {
                value {
                  ... on AppSubscriptionDiscountAmount {
                    amount {
                      amount
                    }
                  }
                  ... on AppSubscriptionDiscountPercentage {
                    percentage
                  }
                }
                priceAfterDiscount {
                  amount
                }
              }
            }
            ... on AppUsagePricing {
              interval
              cappedAmount {
                amount
              }
              balanceUsed {
                amount
              }
            }
          }
        }
        usageRecords(first: 250) {
          edges {
            node {
              id
              createdAt
              description
              idempotencyKey
              price {
                amount
              }
            }
          }
        }
      }
    }
  }
 }
`;
};
