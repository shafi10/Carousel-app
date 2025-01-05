import {
  Card,
  Text,
  BlockStack,
  InlineGrid,
  Layout,
  Button,
  InlineStack,
} from "@shopify/polaris";
import React, { useState } from "react";
import SortVirtualList from "./common/SortVirtualList";
import useQuery from "../hooks/useQuery";
import { PaginationButtons } from "./common/Pagination";
import { SortableItem } from "./SortableItem";
import Skeleton from "./common/Skeleton";
import { templates } from "../utils/template";
import useCreate from "../hooks/useCreate";

export default function CollectionCarousel() {
  const [searchParams, setSearchParams] = useState({ after: "" });
  const [selectedTemplate, setSelectedTemplate] = useState({
    id: "beautiful",
    label: "Beautiful",
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const afterCursor = searchParams?.after;
  const beforeCursor = searchParams?.before;

  const { isError, isLoading, data } = useQuery({
    apiEndpoint: "/api/collection/list",
    afterCursor,
    beforeCursor,
    limit: 3,
    apiKey: "collectionList",
  });
  console.log("🚀 ~ CollectionCarousel ~ data:", data);

  const {
    mutate: createCollections,
    isError: isErrorForBulk,
    isLoading: isCreateLoading,
  } = useCreate("/api/collection/create-collection", "collectionList");

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(data?.collections); // Select all items
    } else {
      setSelectedItems([]); // Deselect all items
    }
  };

  const handleChangeTemplate = (data) => {
    setSelectedTemplate(data);
  };

  const handleSubmit = (selectedItems, selectedTemplate) => {
    const list = selectedItems.map((item) => item.handle);
    const obj = {
      template: selectedTemplate?.id,
      collections: list,
    };
    createCollections(obj);
  };

  return (
    <Card>
      <BlockStack gap="500">
        <InlineStack wrap={false} align="space-between">
          <Text variant="headingLg" as="p">
            Carousel Templates
          </Text>
          <Button
            variant="primary"
            size="large"
            onClick={() => handleSubmit(selectedItems, selectedTemplate)}
          >
            Save Changes
          </Button>
        </InlineStack>
        <InlineGrid gap="400" columns={6}>
          {templates?.map((data) => (
            <div
              key={data?.id}
              className={
                data?.id === selectedTemplate?.id ? "badge active" : "badge"
              }
              onClick={() => handleChangeTemplate(data)}
            >
              <Text variant="headingMd" as="h5">
                {data?.label}
              </Text>
            </div>
          ))}
        </InlineGrid>
        <Card>
          <Text as="h2" variant="bodyMd">
            Content inside a card
          </Text>
        </Card>
        <Layout>
          <Layout.Section variant="oneHalf">
            <Card title="Order details" sectioned>
              <BlockStack gap="500">
                <Text as="h2" variant="headingLg">
                  Selected collections
                </Text>
                <BlockStack gap="200">
                  {selectedItems?.length > 0 && (
                    <>
                      <SortVirtualList
                        items={selectedItems}
                        setSelectedItems={setSelectedItems}
                      >
                        {selectedItems?.map((item) => (
                          <SortableItem key={item?.id} item={item} />
                        ))}
                      </SortVirtualList>
                    </>
                  )}
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card title="Tags" sectioned>
              <BlockStack gap="500">
                <Text as="h2" variant="headingLg">
                  All collections
                </Text>
                {isLoading ? (
                  <>
                    <Skeleton lines={10} />
                  </>
                ) : (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="th checkbox-column">
                            <input
                              type="checkbox"
                              checked={
                                selectedItems.length ===
                                data?.collections?.length
                              }
                              onChange={handleSelectAll}
                            />
                          </th>
                          <th className="th">Collections Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.collections?.map((item) => (
                          <tr
                            key={item?.id}
                            className={
                              selectedItems.includes(item)
                                ? "selected-row"
                                : "row"
                            }
                          >
                            <td className="td checkbox-column">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(item)}
                                onChange={() => handleCheckboxChange(item)}
                              />
                            </td>
                            <td className="td">
                              <Text>{item?.title}</Text>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <PaginationButtons
                      data={data}
                      setSearchParams={setSearchParams}
                    />
                  </>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Card>
  );
}
