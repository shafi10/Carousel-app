import { ButtonGroup, FullscreenBar, Button, Text } from "@shopify/polaris";

export default function FullScreenBar({ setNavItem }) {
  return (
    <FullscreenBar>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
          <Text variant="headingLg" as="p">
            Quick Carousel
          </Text>
        </div>
        <ButtonGroup>
          <Button
            variant="primary"
            onClick={() => {
              setNavItem("collections");
            }}
          >
            Collections carousel
          </Button>
          <Button
            onClick={() => {
              setNavItem("products");
            }}
          >
            Product carousel
          </Button>
        </ButtonGroup>
      </div>
    </FullscreenBar>
  );
}
