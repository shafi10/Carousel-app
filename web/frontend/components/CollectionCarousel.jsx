import {
  Card,
  Text,
  BlockStack,
  InlineGrid,
  Badge,
  Layout,
} from "@shopify/polaris";
import React, { useState } from "react";
import SortVirtualList from "./common/SortVirtualList";
import { useCollectionsQuery } from "../hooks/useCollectionsQuery";
import { PaginationButtons } from "./common/pagination";
import { SortableItem } from "./SortableItem";
import { arrayMove } from "@dnd-kit/sortable";

export default function CollectionCarousel() {
  const [searchParams, setSearchParams] = useState({ after: "" });
  const [selectedItems, setSelectedItems] = useState([]);
  const afterCursor = searchParams?.after;
  const beforeCursor = searchParams?.before;
  const { isError, isLoading, data } = useCollectionsQuery({
    afterCursor,
    beforeCursor,
    limit: 10,
  });

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(items); // Select all items
    } else {
      setSelectedItems([]); // Deselect all items
    }
  };

  console.log("🚀 ~ CollectionCarousel ~ data:", searchParams, data);
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
              {!isLoading && (
                <>
                  <SortVirtualList
                    items={selectedItems}
                    handleDragEnd={handleDragEnd}
                  >
                    {selectedItems?.map((item) => (
                      <SortableItem key={item?.id} item={item} />
                    ))}
                  </SortVirtualList>
                  <PaginationButtons
                    data={data}
                    setSearchParams={setSearchParams}
                  />
                </>
              )}
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card title="Tags" sectioned>
              {!isLoading && data?.collections.length > 0 && (
                <>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginBottom: "20px",
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={styles.th}>
                          <input
                            type="checkbox"
                            checked={
                              selectedItems.length === data?.collections?.length
                            }
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th style={styles.th}>Collections Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.collections.map((item) => (
                        <tr
                          key={item?.id}
                          style={
                            selectedItems.includes(item)
                              ? styles.selectedRow
                              : styles.row
                          }
                        >
                          <td style={styles.td}>
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item)}
                              onChange={() => handleCheckboxChange(item)}
                            />
                          </td>
                          <td style={styles.td}>
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
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Card>
  );
}

const styles = {
  th: {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#f8f9fa",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  row: {
    backgroundColor: "#ffffff",
  },
  selectedRow: {
    backgroundColor: "#d1e7dd",
  },
};
