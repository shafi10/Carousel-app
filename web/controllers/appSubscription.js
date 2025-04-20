import {
  subscriptionCancel,
  activeSubscription,
  subscriptionCreate,
} from "../utils/query.js";
import { queryDataWithVariables, getQueryData } from "../utils/getQueryData.js";

export const getActiveSubscription = async (req, res) => {
  try {
    const query = activeSubscription();
    const appSubscription = await getQueryData(res, query);

    if (appSubscription?.errors) {
      return res.status(400).json({
        errors: appSubscription.errors,
      });
    } else if (
      appSubscription?.body?.data?.appInstallation?.userErrors?.[0]?.message
    ) {
      return res.status(400).json({
        errors: appSubscription.body.data?.appInstallation?.userErrors?.[0],
      });
    }
    res.status(200).json({
      activeSubscription:
        appSubscription.body.data?.appInstallation.activeSubscriptions?.[0],
      message: "Success",
    });
  } catch (error) {
    console.log("🚀 ~ getActiveSubscription ~ error:", error);
    return res.status(400).json({
      error: error,
    });
  }
};

export const createAppSubscription = async (req, res, next) => {
  try {
    const subsData = req.body;
    let variables = {
      name: subsData?.name,
      returnUrl: `https://${res.locals.shopify.session?.shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`,
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              price: {
                amount: subsData?.amount,
                currencyCode: "USD",
              },
              interval: subsData?.interval,
            },
          },
        },
      ],
      test: true,
      trialDays: subsData?.trialDays,
    };
    const query = subscriptionCreate();
    const appSubscription = await queryDataWithVariables(res, query, variables);
    if (appSubscription?.errors) {
      return res.status(400).json({
        errors: appSubscription.errors,
      });
    } else if (
      appSubscription?.body?.data?.appSubscriptionCreate?.userErrors?.[0]
        ?.message
    ) {
      return res.status(400).json({
        errors:
          appSubscription.body.data?.appSubscriptionCreate?.userErrors?.[0],
      });
    }
    res.status(200).json({
      appSubscription: appSubscription.body.data?.appSubscriptionCreate,
      message: "Success",
    });
  } catch (error) {
    console.log("🚀 ~ createAppSubscription ~ error:", error);
    return res.status(400).json({
      error: error,
    });
  }
};

export const cancelAppSubscription = async (req, res, next) => {
  try {
    const subsData = req?.params?.id;

    let variables = {
      id: subsData,
    };

    const appSubscription = await queryDataWithVariables(
      res,
      subscriptionCancel,
      variables
    );

    if (appSubscription?.errors) {
      return res.status(400).json({
        errors: appSubscription.errors,
      });
    } else if (
      appSubscription?.body?.data?.appSubscriptionCancel?.userErrors?.[0]
        ?.message
    ) {
      return res.status(400).json({
        errors:
          appSubscription.body.data?.appSubscriptionCancel?.userErrors?.[0],
      });
    }
    res.status(200).json({
      metafieldData:
        appSubscription.body.data?.appSubscriptionCancel?.appSubscription,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};
