import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { CarSearch } from "@/components/site/CarSearch";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Services } from "@/components/site/Services";
import { UnderOneRoof } from "@/components/site/UnderOneRoof";
import { SiteFooter } from "@/components/site/SiteFooter";

const TITLE = "Motor Wallah | Certified Pre-Owned Cars in India";
const DESCRIPTION =
  "Buy, sell, exchange, finance and service certified pre-owned cars with Motor Wallah — 150+ point inspection, transparent pricing and 24x7 roadside assistance.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <CarSearch />
        <WhyChoose />
        <Services />
        <UnderOneRoof />
      </main>
      <SiteFooter />
    </div>
  );
}
