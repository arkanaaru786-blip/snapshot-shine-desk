import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

const TITLE = "Exchange Your Car | Motor Wallah";
const DESCRIPTION = "Share your current car details and upgrade to your next certified pre-owned car.";

export const Route = createFileRoute("/exchange")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return <PagePlaceholder title="Exchange Your Car" description="Share your current car details and upgrade to your next certified pre-owned car." />;
}
