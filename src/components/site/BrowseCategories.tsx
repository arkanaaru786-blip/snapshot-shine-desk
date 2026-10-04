import { Link } from "@tanstack/react-router";
import { Bike, Bus, Car, CarTaxiFront, ChevronRight, Tractor, Truck, Caravan, Package } from "lucide-react";
import { BUY_CATEGORIES } from "@/lib/site";

const ICONS = [Car, Bike, Caravan, Package, Truck, Bus, Tractor, CarTaxiFront];

export function BrowseCategories() {
  return (
    <section className="bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Browse by Category</p>
        <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide text-foreground lg:text-4xl">
          Find Your Vehicle
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {BUY_CATEGORIES.map((c, i) => {
            const Icon = ICONS[i];
            return (
              <Link
                key={c.to}
                to={c.to}
                className="group flex flex-col gap-3 border border-border bg-card p-4 transition-colors hover:border-primary lg:p-5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-ink-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="flex items-center justify-between font-display text-lg font-bold uppercase text-card-foreground">
                    {c.label}
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </span>
                  <span className="block text-xs text-muted-foreground">{c.blurb}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
