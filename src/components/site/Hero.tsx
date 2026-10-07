import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeftRight, Calculator, GitCompareArrows, Search, ShoppingBag, Store, Wrench, Recycle } from "lucide-react";
import marketplaceHero from "@/assets/marketplace-hero.jpg";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/vehicle-categories";
import { VEHICLES } from "@/lib/cars-data";
import { BrandStrip } from "@/components/site/BrowseCategories";

const ACTIONS = [
  { label: "Buy", to: "/cars", icon: ShoppingBag },
  { label: "Sell", to: "/sell-your-car", icon: Store },
  { label: "Exchange", to: "/exchange", icon: ArrowLeftRight },
  { label: "Value", to: "/sell-your-car", icon: Calculator },
  { label: "Compare", to: "/cars", icon: GitCompareArrows },
  { label: "Service", to: "/services", icon: Wrench },
  { label: "Scrap", to: "/contact", icon: Recycle },
  { label: "Franchise", to: "/franchise", icon: Store },
] as const;

export function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const search = () => {
    const value = query.trim().toLowerCase();
    if (!value) return;
    const category = CATEGORIES.find((item) => {
      const terms = [item.title, item.singular, item.blurb, ...Object.keys(item.catalog), ...Object.values(item.catalog).flat().map(([model]) => model)];
      return terms.some((term) => term.toLowerCase().includes(value) || value.includes(term.toLowerCase()));
    });
    if (category) {
      navigate({ to: category.to });
      return;
    }
    const car = VEHICLES.find((item) => `${item.make} ${item.model} ${item.variant} ${item.bodyType}`.toLowerCase().includes(value));
    navigate({ to: "/cars", search: car ? { brand: car.make, model: car.model } : {} });
  };

  return (
    <section className="home-hero-shell bg-ink text-ink-foreground">
      <div className="home-hero relative isolate overflow-hidden">
      <img
        src={marketplaceHero}
        alt="Car, bike, 3-wheeler, small commercial vehicle, truck, bus and tractor in the Motor Wallah marketplace"
        width={1920}
        height={1024}
        fetchPriority="high"
         className="home-hero-image"
      />
      <div className="home-hero-shade" />

      <div className="home-container home-hero-content">
        <div className="home-hero-copy">
          <h1>
            Every Vehicle.
            <span className="block text-primary">One Marketplace.</span>
          </h1>
          <p>
            Cars, bikes, 3-wheelers, commercial vehicles and tractors — all in one place.
          </p>
        </div>

        <form onSubmit={(event) => { event.preventDefault(); search(); }} className="home-search grid grid-cols-[minmax(0,1fr)_auto]">
          <label className="flex min-w-0 items-center gap-2 px-3 text-foreground">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
           <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by brand, model or vehicle type" aria-label="Search vehicles" className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </label>
          <Button type="submit" className="h-11 rounded-sm px-4 text-xs font-bold uppercase sm:px-7">Search</Button>
        </form>

        <nav aria-label="Marketplace actions" className="home-hero-actions">
          {ACTIONS.map(({ label, to, icon: Icon }) => (
            <Link key={label} to={to} className="flex min-w-[5.3rem] flex-1 shrink-0 flex-col items-center gap-1 border-r border-ink-foreground/10 px-3 py-3 text-[0.58rem] font-bold uppercase text-ink-foreground/80 transition-colors last:border-r-0 hover:bg-primary hover:text-primary-foreground">
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
      </div>
      </div>
      <div className="home-container"><BrandStrip /></div>
    </section>
  );
}
