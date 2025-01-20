import { RadioButton, BlockStack } from "@shopify/polaris";
import { useCallback } from "react";

export default function RadioButtonList({ items }) {
  const handleChange = useCallback((_, newValue) => setValue(newValue), []);
  return (
    <BlockStack gap="200">
      {items.map((data) => (
        <RadioButton
          label={data?.label}
          checked={data?.id === "disabled"}
          id="disabled"
          name="accounts"
          onChange={handleChange}
        />
      ))}
    </BlockStack>
  );
}
