import { Search } from "lucide-react";

const FIELDS = [
  { label: "Brand", options: ["All Brands", "Hyundai", "Maruti Suzuki", "Toyota", "Honda", "Mahindra", "Tata"] },
  { label: "Model", options: ["All Models", "Creta", "Thar", "Fortuner", "City", "Nexon"] },
  { label: "Fuel Type", options: ["All Fuel Types", "Petrol", "Diesel", "CNG", "Electric", "Hybrid"] },
  { label: "Transmission", options: ["All Transmission", "Manual", "Automatic"] },
  { label: "Budget", options: ["All Budgets", "Under ₹5 Lakh", "₹5–10 Lakh", "₹10–20 Lakh", "₹20 Lakh+"] },
  { label: "Location", options: ["All Locations", "Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad"] },
];

export function CarSearch() {
  return (
    <section id="search" className="bg-secondary/60 pb-14">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <div className="-mt-10 border border-border bg-card p-5 shadow-panel lg:p-7">
          <h2 className="section-title">
            Find Your <span className="text-primary">Dream Car</span>
          </h2>

          <form
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
            onSubmit={(e) => e.preventDefault()}
          >
            {FIELDS.map((f) => (
              <label key={f.label} className="block border border-border px-3 py-2">
                <span className="block text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                  {f.label}
                </span>
                <select className="w-full bg-transparent text-sm font-semibold text-foreground outline-none">
                  {f.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            ))}
          </form>

          <button
            type="button"
            className="mx-auto mt-5 flex w-full max-w-md items-center justify-center gap-2 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <Search className="h-4 w-4" /> Search Cars
          </button>
        </div>
      </div>
    </section>
  );
}
