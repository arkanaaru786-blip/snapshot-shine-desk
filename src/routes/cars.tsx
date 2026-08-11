import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Fuel, Gauge, MapPin, MessageCircle, Settings2, ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import {
  BODY_TYPES,
  BRANDS,
  BUDGETS,
  DEMO_CARS,
  FUELS,
  LOCATIONS,
  MODELS,
  TRANSMISSIONS,
  YEARS,
  formatKm,
  formatPrice,
  type DemoCar,
} from "@/lib/cars-data";
import { PHONE_HREF, whatsappLink } from "@/lib/site";

const TITLE = "Buy Certified Pre-Owned Cars in Indore | Motor Wallah";
const DESCRIPTION =
  "Browse quality-checked pre-owned cars with transparent pricing, 150+ point inspection and complete ownership support across Madhya Pradesh.";

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

const ANY = "any";

type Filters = {
  brand: string;
  model: string;
  budget: string;
  fuel: string;
  transmission: string;
  bodyType: string;
  year: string;
  location: string;
};

const EMPTY: Filters = {
  brand: ANY,
  model: ANY,
  budget: ANY,
  fuel: ANY,
  transmission: ANY,
  bodyType: ANY,
  year: ANY,
  location: ANY,
};

const SORTS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "km", label: "Lowest KM" },
];

function applyFilters(cars: DemoCar[], f: Filters) {
  return cars.filter((c) => {
    if (f.brand !== ANY && c.brand !== f.brand) return false;
    if (f.model !== ANY && c.model !== f.model) return false;
    if (f.fuel !== ANY && c.fuel !== f.fuel) return false;
    if (f.transmission !== ANY && c.transmission !== f.transmission) return false;
    if (f.bodyType !== ANY && c.bodyType !== f.bodyType) return false;
    if (f.year !== ANY && String(c.year) !== f.year) return false;
    if (f.location !== ANY && c.location !== f.location) return false;
    if (f.budget !== ANY) {
      const b = BUDGETS.find((x) => x.label === f.budget);
      if (b && (c.priceLakh < b.min || c.priceLakh >= b.max)) return false;
    }
    return true;
  });
}

function sortCars(cars: DemoCar[], sort: string) {
  const list = [...cars];
  if (sort === "price-asc") list.sort((a, b) => a.priceLakh - b.priceLakh);
  if (sort === "price-desc") list.sort((a, b) => b.priceLakh - a.priceLakh);
  if (sort === "newest") list.sort((a, b) => b.year - a.year);
  if (sort === "km") list.sort((a, b) => a.km - b.km);
  return list;
}

function Field({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block min-w-0 border border-border bg-background px-3 py-2">
      <span className="block text-[0.65rem] uppercase tracking-wide text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm font-semibold text-foreground outline-none"
      >
        <option value={ANY}>All {label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Page() {
  const [draft, setDraft] = useState<Filters>(EMPTY);
  const [applied, setApplied] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState("recommended");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const results = useMemo(() => sortCars(applyFilters(DEMO_CARS, applied), sort), [applied, sort]);

  const set = (key: keyof Filters) => (v: string) => setDraft((d) => ({ ...d, [key]: v }));
  const search = () => {
    setApplied(draft);
    setDrawerOpen(false);
  };
  const reset = () => {
    setDraft(EMPTY);
    setApplied(EMPTY);
    setDrawerOpen(false);
  };

  const fields = (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Field label="Brand" value={draft.brand} options={BRANDS} onChange={set("brand")} />
      <Field label="Model" value={draft.model} options={MODELS} onChange={set("model")} />
      <Field label="Budget" value={draft.budget} options={BUDGETS.map((b) => b.label)} onChange={set("budget")} />
      <Field label="Fuel Type" value={draft.fuel} options={FUELS} onChange={set("fuel")} />
      <Field label="Transmission" value={draft.transmission} options={TRANSMISSIONS} onChange={set("transmission")} />
      <Field label="Body Type" value={draft.bodyType} options={BODY_TYPES} onChange={set("bodyType")} />
      <Field label="Year" value={draft.year} options={YEARS} onChange={set("year")} />
      <Field label="Location" value={draft.location} options={LOCATIONS} onChange={set("location")} />
    </div>
  );

  const actions = (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={search}
        className="bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        Search Cars
      </button>
      <button
        type="button"
        onClick={reset}
        className="border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-primary hover:text-primary"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="pb-24 md:pb-0">
      <section className="bg-ink py-12 text-ink-foreground">
        <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
          <h1 className="font-display text-3xl uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Certified <span className="text-primary">Pre-Owned Cars</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-ink-foreground/75 sm:text-base">
            Find quality-checked pre-owned cars with transparent pricing and complete ownership support.
          </p>
        </div>
      </section>

      <section className="bg-secondary/60 py-8">
        <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
          {/* Desktop filter panel */}
          <div className="hidden border border-border bg-card p-5 shadow-panel md:block lg:p-6">
            {fields}
            <div className="mt-5">{actions}</div>
          </div>

          {/* Mobile filter trigger */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex w-full items-center justify-center gap-2 border border-border bg-card px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
          </button>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-ink/70" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto border-t border-border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-lg uppercase">Filters</span>
              <button type="button" aria-label="Close filters" onClick={() => setDrawerOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            {fields}
            <div className="mt-5">{actions}</div>
          </div>
        </div>
      )}

      <section className="bg-background py-10">
        <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-xl uppercase">
              {results.length} {results.length === 1 ? "Car" : "Cars"} Found
            </p>
            <label className="flex items-center gap-2 border border-border px-3 py-2">
              <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent text-sm font-semibold outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Demo listings shown for illustration only — these vehicles are not confirmed Motor Wallah inventory.
          </p>

          {results.length === 0 ? (
            <div className="mt-10 border border-border bg-card p-10 text-center">
              <p className="font-display text-2xl uppercase">No Cars Found</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try changing your filters or clear the filters.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((c) => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function CarCard({ car }: { car: DemoCar }) {
  const name = `${car.year} ${car.brand} ${car.model} ${car.variant}`;
  return (
    <article className="flex flex-col border border-border bg-card">
      <div className="relative">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model} ${car.variant} pre-owned car`}
          loading="lazy"
          className="h-48 w-full object-cover"
        />
        <div className="absolute left-0 top-0 flex flex-col items-start gap-1 p-2">
          <span className="bg-primary px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-primary-foreground">
            Motor Wallah Certified
          </span>
          <span className="bg-ink px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-ink-foreground">
            150+ Point Inspection
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="font-display text-lg uppercase leading-tight">{name}</h2>
        <p className="mt-1 text-xl font-bold text-primary">{formatPrice(car.priceLakh)}</p>

        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-primary" />{formatKm(car.km)}</div>
          <div className="flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5 text-primary" />{car.fuel}</div>
          <div className="flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5 text-primary" />{car.transmission}</div>
          <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" />{car.location}</div>
          <div className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" />{car.bodyType}</div>
        </dl>

        <div className="mt-4 grid gap-2">
          <a
            href={whatsappLink(`Hi Motor Wallah, I want details of the ${name}.`)}
            className="bg-primary px-4 py-2.5 text-center text-[0.7rem] font-bold uppercase tracking-[0.12em] text-primary-foreground"
          >
            View Details
          </a>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={PHONE_HREF}
              className="border border-border px-3 py-2.5 text-center text-[0.7rem] font-bold uppercase tracking-[0.12em] transition-colors hover:border-primary hover:text-primary"
            >
              Book Test Drive
            </a>
            <a
              href={whatsappLink(`Hi Motor Wallah, I'm interested in the ${name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 border border-border px-3 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] transition-colors hover:border-primary hover:text-primary"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
