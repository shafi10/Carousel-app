import React from "react";
import { SkeletonBodyText } from "@shopify/polaris";

export default function Skeleton({ lines }) {
  return <SkeletonBodyText lines={lines} />;
}
