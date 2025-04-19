import React from "react";
// import { Spinners } from "./index";
import { Banner, BlockStack } from "@shopify/polaris";
// import FullScreenBar from "./Fullscreenbar";
import { useState } from "react";
import CollectionCarousel from "./CollectionCarousel";
import ProductCarousel from "./ProductCarousel";

export function Dashboard() {
  const [navItem, setNavItem] = useState("collections");

  return (
    <>
      {/* {isLoading && !isError ? (
        <Spinners />
      ) : (
        <>
          {isError ? (
            <Banner title="Error">
              <p>
                An error occurred while processing this Page. Please try again
                later.
              </p>
            </Banner>
          ) : (
            <> */}
      <BlockStack gap="500">
        {/* <FullScreenBar setNavItem={setNavItem} /> */}
        {navItem === "collections" ? (
          <CollectionCarousel />
        ) : (
          <ProductCarousel />
        )}
      </BlockStack>
      {/* </>
          )}
        </>
      )} */}
    </>
  );
}
