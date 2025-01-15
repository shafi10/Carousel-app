import {
  Card,
  Text,
  BlockStack,
  InlineGrid,
  Layout,
  Button,
  InlineStack,
} from "@shopify/polaris";
import React, { useEffect, useState, lazy, Suspense } from "react";
import SortVirtualList from "./common/SortVirtualList";
import useQuery from "../hooks/useQuery";
import { PaginationButtons } from "./common/Pagination";
import { SortableItem } from "./SortableItem";
import Skeleton from "./common/Skeleton";
import { templates } from "../utils/template";
import useCreate from "../hooks/useCreate";

// Define a fallback loader
const LoaderSkeleton = () => <Skeleton lines={8} />;

// Map template IDs to their corresponding lazy-loaded components
const componentMap = {
  effectCoverflow: lazy(() => import("./carousel/CoverFlow")),
  effectCards: lazy(() => import("./carousel/effectCards")),
  effectCube: lazy(() => import("./carousel/effectCube")),
  effectFlip: lazy(() => import("./carousel/effectFlip")),
  freeMode: lazy(() => import("./carousel/freeMode")),
  EF3DPrespective: lazy(() => import("./carousel/effectCreative3DPerspective")),
  gridCarousel: lazy(() => import("./carousel/gridCarousel")),
  EFSlideIn: lazy(() => import("./carousel/effectCreativeSlideIn")),
  EFRotatingSlide: lazy(() => import("./carousel/effectCreativeRotatingSlide")),
  EFDepthSlide: lazy(() => import("./carousel/effectCreativeDepthSlide")),
};

export default function CollectionCarousel() {
  const [searchParams, setSearchParams] = useState({ after: "" });
  const [selectedTemplate, setSelectedTemplate] = useState({
    id: "freeMode",
    label: "Free Mode",
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const afterCursor = searchParams?.after;
  const beforeCursor = searchParams?.before;
  let limit = 10;

  const url = `/api/collection/list?afterCursor=${
    afterCursor || ""
  }&beforeCursor=${beforeCursor || ""}&limit=${limit}`;

  const { isLoading, data } = useQuery({
    apiEndpoint: url,
    apiKey: "collectionList",
    dependency: [afterCursor, beforeCursor, limit],
  });

  const {
    mutate: createCollections,
    isError: isErrorForBulk,
    isLoading: isCreateLoading,
  } = useCreate("/api/metafield", "collectionList");

  const { isLoading: isMetafieldLoading, data: metafieldData } = useQuery({
    apiEndpoint: "/api/metafield",
    apiKey: "collectionsMetafield",
    dependency: [],
  });
  console.log("🚀 ~ CollectionCarousel ~ metafieldData:", metafieldData);

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.some((i) => i?.id === item?.id)
        ? prevSelected.filter((i) => i?.id !== item?.id)
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
    // const list = selectedItems.map((item) => {
    //   return {
    //     title: item?.title,
    //   };
    // });
    const obj = {
      template: selectedTemplate,
      collections: selectedItems,
    };
    createCollections(obj);
  };

  useEffect(() => {
    if (metafieldData) {
      setSelectedTemplate(metafieldData?.metafieldData?.template);
      setSelectedItems(metafieldData?.metafieldData?.collections);
    }
  }, [metafieldData]);

  // Get the selected component based on the current template ID
  const SelectedComponent = componentMap[selectedTemplate.id];

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
        <InlineGrid gap="400" columns={5}>
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
          <Suspense fallback={<LoaderSkeleton />}>
            {SelectedComponent ? (
              <div className="carousel_preview_container">
                <SelectedComponent items={selectedItems} />
              </div>
            ) : (
              <p>No component selected</p>
            )}
          </Suspense>
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
                  Collections
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
                              selectedItems.some((i) => i.id === item?.id)
                                ? "selected-row"
                                : "row"
                            }
                          >
                            <td className="td checkbox-column">
                              <input
                                type="checkbox"
                                checked={selectedItems.some(
                                  (i) => i.id === item?.id
                                )}
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
