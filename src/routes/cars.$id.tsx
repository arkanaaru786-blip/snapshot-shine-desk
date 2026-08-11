import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Fuel, Gauge, MapPin, MessageCircle, Phone, Settings2, ShieldCheck } from "lucide-react";
import { ON_REQUEST, formatKm, formatPrice, getVehicle, vehicleName, type Vehicle } from "@/lib/cars-data";
import { PHONE_HREF, whatsappLink } from "@/lib/site";
import { TestDriveDialog } from "@/components/site/TestDriveDialog";

export const Route = createFileRoute("/cars/$id")({
  loader: ({ params }) => {
    const vehicle = getVehicle(params.id);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Vehicle Unavailable | Motor Wallah" }, { name: "robots", content: "noindex" }] };
    }
    const v = loaderData.vehicle;
    const title = `${vehicleName(v)} — ${formatPrice(v.price)} | Motor Wallah`;
    const description = `${vehicleName(v)} in ${v.location}: ${formatKm(v.kilometres)}, ${v.fuel}, ${v.transmission}. Demo listing pending real inventory confirmation.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: VehicleNotFound,
  component: Page,
});

function VehicleNotFound() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-24 text-center lg:px-8">
      <p className="font-display text-3xl uppercase">Vehicle Not Found</p>
      <p className="mt-2 text-sm text-muted-foreground">This listing is no longer available.</p>
      <Link to="/cars" className="mt-6 inline-block bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground">
        Back to All Cars
      </Link>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-2.5 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`text-right font-semibold ${value ? "" : "text-muted-foreground"}`}>{value ?? ON_REQUEST}</dd>
    </div>
  );
}

function Page() {
  const { vehicle } = Route.useLoaderData() as { vehicle: Vehicle };
  const [testDrive, setTestDrive] = useState(false);
  const [active, setActive] = useState(0);
  const name = vehicleName(vehicle);
  const sold = vehicle.status === "Sold";
  const enquiry = whatsappLink(
    `Hello MOTOR WALLAH, I am interested in the ${name} priced at ${formatPrice(vehicle.price)}. I would like to know more about this vehicle.`,
  );

  return (
    <div className="pb-24 md:pb-10">
      <section className="bg-ink py-8 text-ink-foreground">
        <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
          <Link to="/cars" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-foreground/70 hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> All Cars
          </Link>
          <h1 className="mt-4 font-display text-3xl uppercase tracking-tight sm:text-4xl">{name}</h1>
          <p className="mt-2 text-2xl font-bold text-primary">{formatPrice(vehicle.price)}</p>
        </div>
      </section>

      <section className="bg-background py-8">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-4 lg:grid-cols-[1.4fr_1fr] lg:px-8">
          <div className="min-w-0">
            <div className="relative border border-border bg-card">
              <img
                src={vehicle.images[active]}
                alt={`${vehicle.bodyType} placeholder image for ${name}`}
                width={1024}
                height={640}
                className="aspect-[16/10] w-full bg-secondary object-cover"
              />
              <div className="absolute left-0 top-0 flex flex-col items-start gap-1 p-3">
                <span className="bg-primary px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-primary-foreground">
                  Motor Wallah Certified
                </span>
                <span className="bg-ink px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-ink-foreground">
                  150+ Point Inspection
                </span>
                {vehicle.demo && (
                  <span className="border border-border bg-card px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide">
                    Demo Listing
                  </span>
                )}
              </div>
              {vehicle.status !== "Available" && (
                <span className="absolute right-3 top-3 bg-ink px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-ink-foreground">
                  {vehicle.status}
                </span>
              )}
            </div>

            {vehicle.images.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto">
                {vehicle.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`h-20 w-28 shrink-0 border ${i === active ? "border-primary" : "border-border"}`}
                  >
                    <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <p className="mt-3 text-xs text-muted-foreground">
              Image shown is a neutral body-type placeholder. Actual vehicle photos are available on request until real
              Motor Wallah inventory is connected.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Spec icon={<Gauge className="h-4 w-4 text-primary" />} label="Kilometres" value={formatKm(vehicle.kilometres)} />
              <Spec icon={<Fuel className="h-4 w-4 text-primary" />} label="Fuel" value={vehicle.fuel} />
              <Spec icon={<Settings2 className="h-4 w-4 text-primary" />} label="Transmission" value={vehicle.transmission} />
              <Spec icon={<ShieldCheck className="h-4 w-4 text-primary" />} label="Body Type" value={vehicle.bodyType} />
              <Spec icon={<MapPin className="h-4 w-4 text-primary" />} label="Location" value={vehicle.location} />
              <Spec icon={<ShieldCheck className="h-4 w-4 text-primary" />} label="Status" value={vehicle.status} />
            </div>

            <div className="mt-8 border border-border bg-card p-5">
              <h2 className="font-display text-xl uppercase">Vehicle Overview</h2>
              <p className="mt-2 text-sm text-muted-foreground">{vehicle.description ?? ON_REQUEST}</p>
              <dl className="mt-4">
                <Row label="Certification status" value={vehicle.certified ? "Motor Wallah Certified" : null} />
                <Row label="150+ point inspection report" value={vehicle.inspectionPoints ? `${vehicle.inspectionPoints} points checked` : null} />
                <Row label="Exterior condition" value={vehicle.exteriorCondition} />
                <Row label="Interior condition" value={vehicle.interiorCondition} />
                <Row label="Engine & mechanical condition" value={vehicle.engineCondition} />
                <Row label="Tyres" value={vehicle.tyres} />
                <Row label="Service history" value={vehicle.serviceHistory} />
                <Row label="Registration details" value={vehicle.registration} />
                <Row label="Insurance status" value={vehicle.insurance} />
                <Row label="Ownership history" value={vehicle.ownershipHistory} />
                <Row label="RTO details" value={vehicle.rto} />
                <Row label="Finance availability" value={vehicle.finance} />
                <Row label="Warranty information" value={vehicle.warranty} />
                <Row label="Location" value={vehicle.location} />
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">
                Details marked “{ON_REQUEST}” are not yet confirmed for this vehicle. Our team will share verified
                documentation before purchase.
              </p>
            </div>
          </div>

          {/* Action panel */}
          <aside className="h-fit border border-border bg-card p-5 shadow-panel lg:sticky lg:top-24">
            <p className="font-display text-xl uppercase">Interested in this car?</p>
            <p className="mt-1 text-sm text-muted-foreground">Talk to the Motor Wallah team in {vehicle.location}.</p>
            <div className="mt-5 grid gap-2">
              <button
                type="button"
                disabled={sold}
                onClick={() => setTestDrive(true)}
                className="bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {sold ? "Sold" : "Book Test Drive"}
              </button>
              <Link
                to="/finance"
                className="border border-border px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-primary hover:text-primary"
              >
                Get Finance
              </Link>
              <a
                href={enquiry}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-primary hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <Link
                to="/contact"
                className="bg-ink px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-ink-foreground transition-transform hover:-translate-y-0.5"
              >
                Enquire Now
              </Link>
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4" /> Call our team
              </a>
            </div>
          </aside>
        </div>
      </section>

      <TestDriveDialog vehicle={vehicle} open={testDrive} onClose={() => setTestDrive(false)} />
    </div>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border border-border bg-card px-3 py-3">
      <div className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-wide text-muted-foreground">
        {icon} {label}
      </div>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}
