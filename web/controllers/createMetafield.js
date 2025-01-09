import { GetShopId, metafieldCreate } from "../utils/query.js";
import { getQueryData, queryDataWithVariables } from "../utils/getQueryData.js";

export const creteMetafield = async (req, res, next) => {
  try {
    const collections = JSON.stringify(req.body);

    const response = await getQueryData(res, GetShopId);

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

    const createMetafield = await queryDataWithVariables(
      res,
      metafieldCreate,
      variables
    );

    if (createMetafield?.errors) {
      return res.status(400).json({
        errors: createMetafield.errors,
      });
    } else if (
      createMetafield?.body?.data?.metafieldsSet?.userErrors?.[0]?.message
    ) {
      return res.status(400).json({
        errors: createMetafield.body.data?.metafieldsSet?.userErrors?.[0],
      });
    }
    res.status(200).json({
      metafieldData: createMetafield.body.data?.metafieldsSet?.metafields?.[0],
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};
