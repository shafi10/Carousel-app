import shopify from "../shopify.js";

export const getQueryData = async (res, shopQuery) => {
  try {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const response = await client.query({
      data: shopQuery,
    });

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const queryDataWithVariables = async (res, query, variables) => {
  try {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const response = await client.query({
      data: {
        query: query,
        variables: variables,
      },
    });
    return response;
  } catch (error) {
    console.error("error", error);
    return error;
  }
};
