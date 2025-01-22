import { RadioButton, BlockStack } from "@shopify/polaris";
import { useCallback } from "react";

export default function RadioButtonList({
  items,
  setSelectedTemplate,
  selectedTemplate,
  windowType,
}) {
  const handleChange = (newValue, wType) => {
    console.log("🚀 ~ handleChange ~ newValue:", newValue, wType);
    setSelectedTemplate((prev) => ({
      ...prev,
      [wType]: newValue, // Update the specific key (desktop/mobile)
    }));
  };

  const selected = selectedTemplate?.[windowType];

  return (
    <BlockStack gap="200">
      {items.map((data) => (
        <RadioButton
          label={data?.label}
          checked={data?.id === selected?.id}
          id={`radio-${data?.id}-${windowType}`}
          name={`radio-${windowType}`} // Ensure unique name for each windowType
          onChange={() => handleChange(data, windowType)}
        />
      ))}
    </BlockStack>
  );
}
