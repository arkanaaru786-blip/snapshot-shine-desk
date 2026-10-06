import { Link } from "@tanstack/react-router";
import { BadgeCheck, Building2, ChevronRight, FileCheck2, Handshake, IndianRupee, MapPin, ShieldCheck, Umbrella } from "lucide-react";
import { Button } from "@/components/ui/button";
import franchiseShowroom from "@/assets/franchise-showroom.jpg";
import businessSpotlight from "@/assets/business-spotlight.jpg";
import carImage from "@/assets/categories/cars.jpg";
import bikeImage from "@/assets/categories/bikes.jpg";
import threeWheelImage from "@/assets/categories/three-wheelers.jpg";
import scvImage from "@/assets/categories/scv.jpg";
import truckImage from "@/assets/categories/trucks.jpg";
import busImage from "@/assets/categories/buses.jpg";
import tractorImage from "@/assets/categories/tractors.jpg";
import taxiImage from "@/assets/categories/taxi.jpg";

const LISTINGS = [
  { name: "Maruti Suzuki Swift", variant: "VXI", year: 2021, fuel: "Petrol", km: "32,000 km", place: "Indore", price: "₹6.45 Lakh", image: carImage, to: "/cars", badge: "Inspected" },
  { name: "Royal Enfield Classic 350", variant: "Redditch", year: 2022, fuel: "Petrol", km: "8,200 km", place: "Indore", price: "₹1.85 Lakh", image: bikeImage, to: "/buy/bikes", badge: "Verified" },
  { name: "Mahindra Alfa Plus", variant: "Passenger", year: 2021, fuel: "CNG", km: "28,000 km", place: "Indore", price: "₹1.95 Lakh", image: threeWheelImage, to: "/buy/three-wheelers", badge: "Inspected" },
  { name: "Tata Ace Gold", variant: "Diesel", year: 2021, fuel: "Diesel", km: "41,000 km", place: "Indore", price: "₹4.65 Lakh", image: scvImage, to: "/buy/scv", badge: "Verified" },
  { name: "Ashok Leyland 1616", variant: "BS6", year: 2020, fuel: "Diesel", km: "1,18,000 km", place: "Dewas", price: "₹16.80 Lakh", image: truckImage, to: "/buy/trucks", badge: "Inspected" },
  { name: "Tata Starbus", variant: "Executive", year: 2019, fuel: "Diesel", km: "82,000 km", place: "Bhopal", price: "₹24.90 Lakh", image: busImage, to: "/buy/buses", badge: "Verified" },
  { name: "Sonalika DI 745 III", variant: "50 HP", year: 2021, fuel: "Diesel", km: "1,675 hrs", place: "Indore", price: "₹6.75 Lakh", image: tractorImage, to: "/buy/tractors", badge: "Inspected" },
  { name: "Maruti Suzuki Dzire", variant: "Tour S CNG", year: 2022, fuel: "CNG", km: "45,000 km", place: "Indore", price: "₹6.75 Lakh", image: taxiImage, to: "/buy/taxi", badge: "Verified" },
] as const;

const ACTIONS = [
  { label: "Buy", to: "/cars" }, { label: "Sell", to: "/sell-your-car" }, { label: "Exchange", to: "/exchange" },
  { label: "Value", to: "/sell-your-car" }, { label: "Compare", to: "/cars" }, { label: "Service", to: "/services" }, { label: "Scrap", to: "/contact" },
] as const;

const TRUST = [
  { icon: BadgeCheck, title: "Verified Vehicles", text: "Carefully verified for quality and ownership." },
  { icon: FileCheck2, title: "Transparent Information", text: "Clear vehicle details and available records." },
  { icon: ShieldCheck, title: "Inspection & Certification", text: "Multi-point inspection and certification." },
  { icon: Handshake, title: "Trusted Partners", text: "Automotive network across the marketplace." },
  { icon: IndianRupee, title: "Finance Assistance", text: "Support through relevant lending partners." },
  { icon: Umbrella, title: "Insurance Assistance", text: "Insurance support through relevant providers." },
] as const;

export function FranchiseBanner({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "bg-background py-5" : "bg-background pb-4"}>
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <div className={`relative isolate overflow-hidden rounded-sm bg-ink text-ink-foreground ${compact ? "min-h-40" : "min-h-52 sm:min-h-64"}`}>
          <img src={franchiseShowroom} alt="Premium automotive franchise showroom" width={1920} height={720} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/5" />
          <div className="relative flex min-h-inherit max-w-xl flex-col items-start justify-center px-6 py-8 sm:px-10">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">Franchise opportunity</p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase leading-tight sm:text-4xl">Build Your Automotive Business<br /><span className="text-primary">With Motor Wallah</span></h2>
            {!compact && <p className="mt-3 max-w-md text-sm text-ink-foreground/75">Start your automotive business with the MOTOR WALLAH franchise network.</p>}
            <Button asChild className="mt-5 rounded-sm text-xs font-bold uppercase"><Link to="/franchise">Become a Franchise Partner</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessSpotlight() {
  return (
    <section className="bg-background py-4">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <div className="grid overflow-hidden rounded-sm border border-border bg-card shadow-sm sm:grid-cols-[15rem_minmax(0,1fr)_auto] sm:items-center">
          <img src={businessSpotlight} alt="ABC Auto Care workshop" width={1280} height={720} loading="lazy" className="h-40 w-full object-cover sm:h-full" />
          <div className="min-w-0 p-5">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">Business Spotlight · Advertisement</p>
            <h2 className="mt-1 font-display text-2xl font-bold uppercase">ABC Auto Care</h2>
            <p className="mt-1 text-sm text-muted-foreground">Complete Car Service • AC • Denting • Painting</p>
            <p className="mt-2 flex items-center gap-1 text-xs"><MapPin className="h-3.5 w-3.5 text-primary" /> Indore</p>
            <Link to="/services" className="mt-3 inline-flex items-center text-xs font-bold uppercase text-primary">View details <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="border-t border-border p-5 sm:border-l sm:border-t-0">
            <Button asChild variant="outline" className="w-full rounded-sm border-primary text-xs font-bold uppercase text-primary"><Link to="/contact"><Building2 /> Advertise Your Business</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PopularVehicles() {
  return (
    <section className="bg-background py-10">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <div className="flex items-end justify-between gap-4"><h2 className="section-title text-left">Popular Vehicles</h2><span className="text-[0.6rem] font-bold uppercase text-muted-foreground">Demo listings</span></div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
          {LISTINGS.map((item) => (
            <article key={item.name} className="flex min-w-0 flex-col overflow-hidden rounded-sm border border-border bg-card shadow-sm">
              <div className="relative"><img src={item.image} alt={item.name} width={720} height={450} loading="lazy" className="aspect-[8/5] w-full object-cover" /><span className="absolute left-2 top-2 bg-ink px-2 py-1 text-[0.5rem] font-bold uppercase text-ink-foreground">{item.badge}</span></div>
              <div className="flex flex-1 flex-col p-3">
                <p className="truncate text-[0.55rem] font-bold uppercase text-primary">{item.name.split(" ")[0]}</p>
                <h3 className="mt-0.5 min-h-9 text-xs font-bold leading-tight normal-case">{item.name}</h3>
                <p className="mt-1 truncate text-[0.62rem] text-muted-foreground">{item.variant}</p>
                <p className="mt-2 text-[0.6rem] text-muted-foreground">{item.year} · {item.fuel}</p>
                <p className="mt-1 text-[0.6rem] text-muted-foreground">{item.km} · {item.place}</p>
                <p className="mt-2 font-display text-base font-bold text-primary">{item.price}</p>
                <Link to={item.to} className="mt-auto flex items-center justify-center border border-primary px-2 py-2 text-[0.55rem] font-bold uppercase text-primary hover:bg-primary hover:text-primary-foreground">View Details</Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 text-center"><Button asChild variant="outline" className="rounded-sm text-xs font-bold uppercase"><Link to="/cars">View All Vehicles <ChevronRight /></Link></Button></div>
      </div>
    </section>
  );
}

export function MarketplaceActions() {
  return (
    <section className="bg-secondary/60 py-10">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <h2 className="section-title">What Do You Want To Do?</h2>
        <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-7">
          {ACTIONS.map((item) => <Link key={item.label} to={item.to} className="flex min-h-20 items-center justify-center rounded-sm border border-border bg-card px-2 text-center font-display text-xs font-bold uppercase transition-colors hover:border-primary hover:text-primary">{item.label}</Link>)}
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    <section className="bg-background py-10">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <h2 className="section-title">Why Motor Wallah</h2>
        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-6">
          {TRUST.map(({ icon: Icon, title, text }) => <div key={title} className="text-center"><Icon className="mx-auto h-7 w-7 text-primary" strokeWidth={1.5} /><h3 className="mt-3 text-xs font-bold uppercase">{title}</h3><p className="mt-1 text-[0.68rem] leading-relaxed text-muted-foreground">{text}</p></div>)}
        </div>
      </div>
    </section>
  );
}