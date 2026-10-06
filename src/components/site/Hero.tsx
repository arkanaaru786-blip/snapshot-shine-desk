import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeftRight, Calculator, GitCompareArrows, Search, ShoppingBag, Store, Wrench, Recycle } from "lucide-react";
import marketplaceHero from "@/assets/marketplace-hero.jpg";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/vehicle-categories";
import { VEHICLES } from "@/lib/cars-data";

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
    <section className="relative isolate min-h-[31rem] overflow-hidden bg-ink text-ink-foreground sm:min-h-[37rem] lg:min-h-[44rem]">
      <img
        src={marketplaceHero}
        alt="Car, bike, 3-wheeler, small commercial vehicle, truck, bus and tractor in the Motor Wallah marketplace"
        width={1920}
        height={1024}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink/85 sm:bg-gradient-to-r sm:from-ink/80 sm:via-ink/20 sm:to-transparent" />

      <div className="relative mx-auto flex min-h-[31rem] max-w-[1600px] flex-col px-4 pb-6 pt-9 sm:min-h-[37rem] sm:pt-12 lg:min-h-[44rem] lg:px-8 lg:pt-16">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-foreground/75">India&apos;s multi-vehicle marketplace</p>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.92] sm:text-6xl lg:text-8xl">
            Every Vehicle.
            <span className="block text-primary">One Marketplace.</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm font-medium leading-relaxed text-ink-foreground/90 sm:text-base">
            Cars, bikes, 3-wheelers, commercial vehicles and tractors — all in one place.
          </p>
        </div>

        <form onSubmit={(event) => { event.preventDefault(); search(); }} className="mt-auto grid w-full max-w-3xl grid-cols-[minmax(0,1fr)_auto] overflow-hidden rounded-sm bg-background p-1.5 shadow-panel">
          <label className="flex min-w-0 items-center gap-2 px-3 text-foreground">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by brand, model or vehicle type" aria-label="Search vehicles" className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </label>
          <Button type="submit" className="h-11 rounded-sm px-4 text-xs font-bold uppercase sm:px-7">Search</Button>
        </form>

        <nav aria-label="Marketplace actions" className="scrollbar-none mt-4 flex overflow-x-auto rounded-sm border border-ink-foreground/15 bg-ink/90 backdrop-blur-sm">
          {ACTIONS.map(({ label, to, icon: Icon }) => (
            <Link key={label} to={to} className="flex min-w-[5.3rem] flex-1 shrink-0 flex-col items-center gap-1 border-r border-ink-foreground/10 px-3 py-3 text-[0.58rem] font-bold uppercase text-ink-foreground/80 transition-colors last:border-r-0 hover:bg-primary hover:text-primary-foreground">
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
