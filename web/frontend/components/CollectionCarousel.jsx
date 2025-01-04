import {
  Card,
  Text,
  BlockStack,
  InlineGrid,
  Badge,
  Layout,
} from "@shopify/polaris";
import React from "react";
import SortVirtualList from "./common/SortVirtualList";

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
              <SortVirtualList />
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
