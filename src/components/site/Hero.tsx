import { Link } from "@tanstack/react-router";
import { Car, HandCoins, ShieldCheck } from "lucide-react";
import heroCars from "@/assets/hero-cars.jpg";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <img
        src={heroCars}
        alt="Certified pre-owned cars lined up outside a Motor Wallah showroom at dusk"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover object-right opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/20" />

      <div className="relative mx-auto max-w-[1600px] px-4 py-16 lg:px-8 lg:py-24">
        <div className="max-w-xl">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-primary">
            Certified Pre-Owned Cars · Indore, Madhya Pradesh
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.98] sm:text-5xl lg:text-6xl">
            Find Your <span className="text-primary">Dream Car.</span>
            <span className="block">Drive With Confidence.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-foreground/80 sm:text-base">
            Certified pre-owned cars inspected for quality, transparent pricing and complete
            ownership support.
          </p>

          <p className="mt-4 font-display text-lg italic text-primary">Drive Trust. Drive Quality.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground shadow-red transition-transform hover:-translate-y-0.5"
            >
              <Car className="h-4 w-4" /> Buy a Car
            </Link>
            <Link
              to="/sell-your-car"
              className="inline-flex items-center gap-2 border border-ink-foreground/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:border-primary hover:text-primary"
            >
              <HandCoins className="h-4 w-4" /> Sell Your Car
            </Link>
            <Link
              to="/franchise"
              className="inline-flex items-center gap-2 border border-ink-foreground/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:border-primary hover:text-primary"
            >
              <ShieldCheck className="h-4 w-4" /> Become a Franchise Partner
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
