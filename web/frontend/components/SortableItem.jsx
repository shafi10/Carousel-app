import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandleIcon } from "@shopify/polaris-icons";
import { Icon, InlineStack, Card, Text } from "@shopify/polaris";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props?.item?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card>
        <InlineStack wrap={false} gap="150" blockAlign="center">
          <span className="my-draggable-item">
            <Icon source={DragHandleIcon} tone="base" />
          </span>
          <span className="media-container">
            <img
              src={props?.item?.image?.url}
              alt={props?.item?.image?.altText}
              className="media"
            />
          </span>
          <Text>{props?.item?.title}</Text>
        </InlineStack>
      </Card>
    </div>
  );
}
