import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { QuickActions } from "@/components/site/QuickActions";
import { CarSearch } from "@/components/site/CarSearch";
import { FeaturedCars } from "@/components/site/FeaturedCars";
import { WhyChoose } from "@/components/site/WhyChoose";
import { HowItWorks } from "@/components/site/HowItWorks";
import { SellExchange } from "@/components/site/SellExchange";
import { Services } from "@/components/site/Services";
import { FranchiseCTA } from "@/components/site/FranchiseCTA";
import { Locations } from "@/components/site/Locations";
import { UnderOneRoof } from "@/components/site/UnderOneRoof";
import { FinalCTA } from "@/components/site/FinalCTA";
import { StickyActions } from "@/components/site/StickyActions";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BrowseCategories } from "@/components/site/BrowseCategories";

const TITLE = "Motor Wallah | Certified Pre-Owned Cars in Indore, MP";
const DESCRIPTION =
  "Buy, sell, exchange, finance and service certified pre-owned cars with Motor Wallah, Indore — 150+ point vehicle inspection and transparent pricing.";

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
    <div id="top" className="min-h-screen bg-background pb-16 md:pb-0">
      <SiteHeader />
      <main>
        <Hero />
        <BrowseCategories />
        <QuickActions />
        <CarSearch />
        <FeaturedCars />
        <WhyChoose />
        <HowItWorks />
        <SellExchange />
        <Services />
        <FranchiseCTA />
        <Locations />
        <UnderOneRoof />
        <FinalCTA />
      </main>
      <SiteFooter />
      <StickyActions />
    </div>
  );
}
