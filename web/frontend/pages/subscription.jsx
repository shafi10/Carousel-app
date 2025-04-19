import { Page } from "@shopify/polaris";
import Billing from "../components/Billing";
import useFetchQuery from "../hooks/useQuery";

export default function Subscription() {
  const { isLoading, data } = useFetchQuery({
    apiEndpoint: "/api/pricing/active-subscriptions",
    apiKey: "activeSubscription",
    dependency: [],
  });
  console.log("🚀 ~ Subscription ~ data:", data);

  return (
    <Page fullWidth>
      <Billing />
    </Page>
  );
}
