import {
  Card,
  Text,
  BlockStack,
  InlineGrid,
  Badge,
  Layout,
  LegacyCard,
} from "@shopify/polaris";
import React from "react";

export default function CollectionCarousel() {
  return (
    <Card>
      <BlockStack gap="500">
        <Text variant="headingLg" as="p">
          Carousel Templates
        </Text>
        <InlineGrid gap="400" columns={6}>
          <Badge>
            <Text variant="headingMd" as="h5">
              Fulfilled
            </Text>
          </Badge>
          <Badge>
            <Text variant="headingMd" as="h5">
              Fulfilled
            </Text>
          </Badge>
          <Badge>
            <Text variant="headingMd" as="h5">
              Fulfilled
            </Text>
          </Badge>
          <Badge>
            <Text variant="headingMd" as="h5">
              Fulfilled
            </Text>
          </Badge>
          <Badge>
            <Text variant="headingMd" as="h5">
              Fulfilled
            </Text>
          </Badge>
          <Badge>
            <Text variant="headingMd" as="h5">
              Fulfilled
            </Text>
          </Badge>
        </InlineGrid>
        <Card>
          <Text as="h2" variant="bodyMd">
            Content inside a card
          </Text>
        </Card>
        <Layout>
          <Layout.Section variant="oneHalf">
            <Card title="Order details" sectioned>
              <p>
                Use to follow a normal section with a secondary section to
                create a 2/3 + 1/3 layout on detail pages (such as individual
                product or order pages). Can also be used on any page that needs
                to structure a lot of content. This layout stacks the columns on
                small screens.
              </p>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card title="Tags" sectioned>
              <p>Add tags to your order.</p>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Card>
  );
}
