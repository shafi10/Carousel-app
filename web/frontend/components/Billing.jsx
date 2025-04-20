import React from "react";
import {
  Card,
  Layout,
  Text,
  BlockStack,
  Grid,
  Button,
  Form,
} from "@shopify/polaris";
import useFetchQuery from "../hooks/useQuery";
import { pricingPlan } from "../utils/template";
import useCreate from "../hooks/useCreate";

export default function Billing() {
  const { isLoading, data } = useFetchQuery({
    apiEndpoint: "/api/pricing/active-subscriptions",
    apiKey: "activeSubscription",
    dependency: [],
  });

  const {
    mutate: createSubscription,
    isError: isErrorForBulk,
    isLoading: isCreateLoading,
  } = useCreate("/api/pricing/app-billing-create", "activeSubscription");

  console.log("🚀 ~ Subscription ~ data:", data);

  const handleSubmit = async (data) => {
    createSubscription(data, {
      onSuccess: async (res) => {
        const response = await res?.json();
        window.top.location.href = response?.appSubscription?.confirmationUrl;
      },
      onError: (error) => {
        alert("Billing failed: " + error.message);
      },
    });
  };

  return (
    <Card>
      <BlockStack gap="500">
        <Card>
          <Text variant="heading2xl" as="h3">
            Subscription plan
          </Text>
        </Card>
        <Layout>
          <Layout.Section secondary>
            <Card>
              <BlockStack gap="2">
                <Text as="h2" variant="headingMd">
                  Your Current Plan
                </Text>
                {data?.activeSubscription?.status === "ACTIVE" ? (
                  <>
                    <Text as="h6" variant="headingXs">
                      Name: {data?.activeSubscription?.name}
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Status: {data?.activeSubscription?.status}
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Activated On: {data?.activeSubscription?.activated_on}
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Expiration date:{" "}
                      {/* {addDaysToDate(
                      data?.activeSubscription?.activated_on, 30)} */}
                    </Text>{" "}
                    <Button
                      onClick={() =>
                        handleCancel({
                          isCancel: true,
                          priceId: data?.activeSubscription?.id,
                        })
                      }
                      primary
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Text as="h6" variant="headingXs">
                    Name: Free Plan
                  </Text>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Select your plan
                </Text>
                <Grid>
                  {pricingPlan.map((data) => (
                    <Grid.Cell
                      columnSpan={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}
                    >
                      <Card sectioned>
                        <Text variant="headingLg" as="h5" alignment="left">
                          {data?.name}
                        </Text>
                        <BlockStack gap="200" align="center">
                          <Text as="h2" variant="headingMd" alignment="center">
                            ${data?.amount}
                            <Text as="p" variant="bodyMd" alignment="center">
                              Free trial {data?.trialDays} days
                            </Text>
                            <Text as="p" variant="bodyMd" alignment="center">
                              {data?.interval === "EVERY_30_DAYS"
                                ? "After Every 30 Days"
                                : data?.interval}
                            </Text>
                          </Text>
                          {data?.feature.map((item) => (
                            <Text as="p" variant="bodyMd" alignment="center">
                              {item}
                            </Text>
                          ))}
                          <Button
                            variant="primary"
                            textAlign="center"
                            onClick={() => handleSubmit(data)}
                            disabled={data?.name == "Free"}
                          >
                            {data?.buttonTitle}
                          </Button>
                        </BlockStack>
                      </Card>
                    </Grid.Cell>
                  ))}
                </Grid>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Card>
  );
}
