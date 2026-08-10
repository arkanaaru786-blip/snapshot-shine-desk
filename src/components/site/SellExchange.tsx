import { MessageCircle, Phone, Repeat, TrendingUp } from "lucide-react";

const WHATSAPP = "https://wa.me/919999999999?text=Hi%20Motor%20Wallah%2C%20I%20want%20a%20car%20valuation";

export function SellExchange() {
  return (
    <section id="sell" className="bg-background py-14">
      <div className="mx-auto grid max-w-[1600px] gap-4 px-4 lg:grid-cols-2 lg:px-8">
        <div className="border border-border bg-card p-7">
          <TrendingUp className="h-8 w-8 text-primary" strokeWidth={1.5} />
          <h2 className="mt-4 font-display text-2xl font-bold">
            Sell Your Car <span className="text-primary">at the Right Price</span>
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Get a fair, transparent valuation and a hassle-free selling experience with instant payment
            and free RTO transfer support.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#search"
              className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Get Instant Car Value
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:border-primary hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
            <a
              href="tel:18001234567"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:border-primary hover:text-primary"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </div>
        </div>

        <div className="border border-border bg-card p-7">
          <Repeat className="h-8 w-8 text-primary" strokeWidth={1.5} />
          <h2 className="mt-4 font-display text-2xl font-bold">
            Upgrade with <span className="text-primary">Easy Exchange</span>
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Share your current car details and get an exchange value adjusted instantly against your next
            certified pre-owned car.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#search"
              className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Start Exchange
            </a>
            <a
              href="#search"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:border-primary hover:text-primary"
            >
              Get Exchange Value
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
