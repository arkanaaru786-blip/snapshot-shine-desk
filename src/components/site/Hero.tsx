import { Car, Download, IndianRupee, Repeat, ShieldCheck } from "lucide-react";
import heroCars from "@/assets/hero-cars.jpg";

const TAGS = ["Buy", "Sell", "Exchange", "Finance", "Servicing", "More"];

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
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/10" />

      <div className="relative mx-auto max-w-[1600px] px-4 py-16 lg:px-8 lg:py-24">
        <div className="max-w-xl">
          <p className="font-display text-2xl font-medium tracking-wide sm:text-3xl">India&apos;s Trusted</p>
          <h1 className="mt-1 font-display text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
            <span className="block text-primary">Certified</span>
            <span className="block">Pre-Owned</span>
            <span className="block">Car Network</span>
          </h1>

          <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-sm uppercase tracking-wide">
            {TAGS.map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                {i > 0 && <span className="text-primary">|</span>}
                {t}
              </li>
            ))}
          </ul>

          <p className="mt-5 font-display text-xl italic text-primary">Drive Trust. Drive Quality.</p>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-foreground/80">
            At Motor Wallah, we are transforming the pre-owned car industry by offering certified quality
            vehicles, transparent pricing, easy financing, insurance solutions, and a seamless ownership
            experience. Every vehicle is professionally inspected to ensure reliability, safety, and
            complete peace of mind.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#search"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground shadow-red transition-transform hover:-translate-y-0.5"
            >
              <Car className="h-4 w-4" /> Explore Cars
            </a>
            <a
              href="#sell"
              className="inline-flex items-center gap-2 border border-ink-foreground/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:border-primary hover:text-primary"
            >
              <IndianRupee className="h-4 w-4" /> Sell Your Car
            </a>
            <a
              href="#sell"
              className="inline-flex items-center gap-2 border border-ink-foreground/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:border-primary hover:text-primary"
            >
              <Repeat className="h-4 w-4" /> Exchange Your Car
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-ink-foreground/70">
            <a href="#services" className="inline-flex items-center gap-2 underline-offset-4 transition-colors hover:text-primary hover:underline">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Become a Franchise Partner
            </a>
            <span className="inline-flex items-center gap-2">
              <Download className="h-3.5 w-3.5" /> Download App (Coming Soon)
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
