import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

const TITLE = "Sell Your Car | Motor Wallah";
const DESCRIPTION = "Get a transparent vehicle evaluation and a hassle-free selling experience with Motor Wallah.";

export const Route = createFileRoute("/sell-your-car")({
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
  return <PagePlaceholder title="Sell Your Car" description="Get a transparent vehicle evaluation and a hassle-free selling experience with Motor Wallah." />;
}
