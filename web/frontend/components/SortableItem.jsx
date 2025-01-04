import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandleIcon } from "@shopify/polaris-icons";
import { Icon, InlineStack } from "@shopify/polaris";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props?.item?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <InlineStack wrap={false}>
        <span className="my-draggable-item">
          <Icon source={DragHandleIcon} tone="base" />
        </span>
        {props?.item?.title}
      </InlineStack>
    </div>
  );
}
