import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

const TITLE = "Buy Certified Pre-Owned Cars | Motor Wallah";
const DESCRIPTION = "Browse certified pre-owned cars from Motor Wallah, Indore — each inspected on our 150+ point vehicle inspection.";

export const Route = createFileRoute("/cars")({
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
  return <PagePlaceholder title="Buy Certified Pre-Owned Cars" description="Browse certified pre-owned cars from Motor Wallah, Indore — each inspected on our 150+ point vehicle inspection." />;
}
