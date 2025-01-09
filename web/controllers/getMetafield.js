import { queryDataWithVariables } from "../utils/getQueryData.js";
import { metafieldQuery } from "../utils/query.js";

export const getMetafield = async (req, res) => {
  try {
    const variables = {
      namespace: "quick_carousel_namespace_v1",
      key: "quick_collection_carousel_key",
    };
    const response = await queryDataWithVariables(
      res,
      metafieldQuery,
      variables
    );
    const metafieldResponse = response?.body?.data?.shop?.shopMetafield?.value;
    const parseResponse = metafieldResponse
      ? JSON.parse(metafieldResponse)
      : null;
    return res
      .status(200)
      .json({ metafieldData: parseResponse, message: "Success" });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return res
      .status(400)
      .json({ message: "Something went wrong", metafieldData: {} });
  }
};
