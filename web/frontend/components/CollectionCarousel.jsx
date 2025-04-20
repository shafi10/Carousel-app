import {
  Card,
  Text,
  BlockStack,
  InlineGrid,
  Layout,
  Button,
  InlineStack,
  Grid,
} from "@shopify/polaris";
import React, { useEffect, useState, lazy, Suspense } from "react";
import SortVirtualList from "./common/SortVirtualList";
import useQuery from "../hooks/useQuery";
import { PaginationButtons } from "./common/Pagination";
import { SortableItem } from "./SortableItem";
import Skeleton from "./common/Skeleton";
import { accessComponentType, getPlanType, templates } from "../utils/template";
import useCreate from "../hooks/useCreate";
import RadioButtonList from "./common/RadioButton";
import { Spinners } from "./Spinner";
import useFetchQuery from "../hooks/useQuery";

// Define a fallback loader
const LoaderSkeleton = () => <Skeleton lines={15} />;

// Map template IDs to their corresponding lazy-loaded components
const componentMap = {
  effectCoverflow: lazy(() => import("./carousel/coverFlow")),
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
  const [selectedTemplate, setSelectedTemplate] = useState({
    desktop: {
      id: "freeMode",
      label: "Free Mode",
    },
    mobile: {
      id: "freeMode",
      label: "Free Mode",
    },
  });
  const [selectedPreview, setSelectedPreview] = useState({
    id: "freeMode",
    label: "Free Mode",
  });
  const [selectedItems, setSelectedItems] = useState([]);
  // const [allowedTemplateIds, setAllowedTemplateIds] = useState([]);
  const [searchParams, setSearchParams] = useState({ after: "" });
  const afterCursor = searchParams?.after;
  const beforeCursor = searchParams?.before;
  let limit = 10;

  const [searchSelectedParams, setSearchSelectedParams] = useState({
    after: "",
  });
  const afterSelectedCursor = searchSelectedParams?.after;
  const beforeSelectedCursor = searchSelectedParams?.before;
  let selectedLimit = 100;

  const url = `/api/collection/list?afterCursor=${
    afterCursor || ""
  }&beforeCursor=${beforeCursor || ""}&limit=${limit}`;

  const { isLoading, data } = useQuery({
    apiEndpoint: url,
    apiKey: "collectionList",
    dependency: [afterCursor, beforeCursor, limit],
  });

  const { isLoading: isBillingLoading, data: activeAppBilling } = useFetchQuery(
    {
      apiEndpoint: "/api/pricing/active-subscriptions",
      apiKey: "activeSubscription",
      dependency: [],
    }
  );
  console.log("🚀 ~ CollectionCarousel ~ activeAppBilling:", activeAppBilling);

  const {
    mutate: createCollections,
    isError: isErrorForBulk,
    isLoading: isCreateLoading,
  } = useCreate("/api/metafield", "collectionList");

  const selectedUrl = `/api/collection/selectedList?afterCursor=${
    afterSelectedCursor || ""
  }&beforeCursor=${beforeSelectedCursor || ""}&limit=${selectedLimit}`;

  const { isLoading: isMetafieldLoading, data: metafieldData } = useQuery({
    apiEndpoint: selectedUrl,
    apiKey: "selectedCollections",
    dependency: [afterSelectedCursor, beforeSelectedCursor, selectedLimit],
  });

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
    setSelectedPreview(data);
  };

  const handleSubmit = (selectedItems, selectedTemplate) => {
    const handleList = selectedItems.map((item) => {
      return {
        id: item?.id,
        handle: item?.handle,
      };
    });
    const obj = {
      template: selectedTemplate,
      collections: handleList,
    };
    createCollections(obj);
  };

  useEffect(() => {
    if (metafieldData) {
      setSelectedPreview(metafieldData?.template?.desktop);
      setSelectedTemplate(metafieldData?.template);
      setSelectedItems(metafieldData?.collections);
    }
  }, [metafieldData]);

  // Get the selected component based on the current template ID
  const SelectedComponent = componentMap[selectedPreview?.id];

  const planType = getPlanType(activeAppBilling?.activeSubscription);
  const allowedTemplateIds = accessComponentType(planType) ?? [];
  console.log(
    "🚀 ~ CollectionCarousel ~ allowedTemplateIds:",
    allowedTemplateIds
  );

  return (
    <Card>
      <BlockStack gap="500">
        <InlineStack wrap={false} align="space-between">
          <Text variant="headingLg" as="p">
            Carousel Preview Templates
          </Text>
        </InlineStack>
        <Layout>
          <Layout.Section variant="oneThird">
            <InlineGrid gap="300" columns={2}>
              {templates?.map((data) => (
                <div
                  key={data?.id}
                  className={
                    data?.id === selectedPreview?.id ? "badge active" : "badge"
                  }
                  onClick={() => handleChangeTemplate(data)}
                >
                  <Text variant="headingMd" as="h5">
                    {data?.label}
                  </Text>
                </div>
              ))}
            </InlineGrid>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                {/* <InlineStack gap="400" wrap={false} blockAlign="center">
                  <span className="AI_quick_carousel_tag">Preview</span>
                  <span className="AI_quick_carousel_tag">
                    {selectedPreview?.label}
                  </span>
                </InlineStack> */}
                <Suspense fallback={<LoaderSkeleton />}>
                  {SelectedComponent ? (
                    <div className="carousel_preview_container">
                      <SelectedComponent items={selectedItems} />
                    </div>
                  ) : (
                    <p>No component selected</p>
                  )}
                </Suspense>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
        <Layout>
          <Layout.Section>
            <Card title="Order details" sectioned>
              <BlockStack gap="500">
                <InlineStack wrap={false} align="space-between">
                  <Text variant="headingLg" as="p">
                    Create settings for viewing in themes
                  </Text>
                  <Button
                    variant="primary"
                    size="large"
                    onClick={() =>
                      handleSubmit(selectedItems, selectedTemplate)
                    }
                  >
                    {isCreateLoading ? <Spinners /> : "Save Changes"}
                  </Button>
                </InlineStack>
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <Card>
                      <BlockStack gap="200">
                        <Text as="h2" variant="headingLg">
                          Selected Sortable collections
                        </Text>
                        {isMetafieldLoading ? (
                          <Skeleton lines={10} />
                        ) : (
                          selectedItems?.length > 0 && (
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
                          )
                        )}
                        <PaginationButtons
                          data={metafieldData}
                          setSearchParams={setSearchSelectedParams}
                        />
                      </BlockStack>
                    </Card>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                    <Card>
                      <BlockStack gap="200">
                        <Text as="h2" variant="headingLg">
                          Select Template
                        </Text>
                        <InlineGrid gap="400" columns={2}>
                          <Card>
                            <Text as="h5" variant="headingXs">
                              Desktop Template
                            </Text>
                            <RadioButtonList
                              items={templates}
                              setSelectedTemplate={setSelectedTemplate}
                              selectedTemplate={selectedTemplate}
                              windowType="desktop"
                              allowedTemplateIds={allowedTemplateIds || []}
                            />
                          </Card>
                          <Card>
                            <Text as="h5" variant="headingXs">
                              Mobile Template
                            </Text>
                            <RadioButtonList
                              items={templates}
                              setSelectedTemplate={setSelectedTemplate}
                              selectedTemplate={selectedTemplate}
                              windowType="mobile"
                              allowedTemplateIds={allowedTemplateIds || []}
                            />
                          </Card>
                        </InlineGrid>
                      </BlockStack>
                    </Card>
                  </Grid.Cell>
                </Grid>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
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
                                selectedItems?.length ===
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
                              selectedItems &&
                              selectedItems?.some((i) => i.id === item?.id)
                                ? "selected-row"
                                : "row"
                            }
                          >
                            <td className="td checkbox-column">
                              <input
                                type="checkbox"
                                checked={
                                  selectedItems &&
                                  selectedItems?.some((i) => i.id === item?.id)
                                }
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
