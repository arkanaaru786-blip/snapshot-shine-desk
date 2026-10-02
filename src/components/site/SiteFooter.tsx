import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP } from "@/lib/site";

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Franchise", to: "/franchise" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Buy & Sell",
    links: [
      { label: "Buy Cars", to: "/cars" },
      { label: "Buy Bikes", to: "/buy/bikes" },
      { label: "Buy 3-Wheelers", to: "/buy/three-wheelers" },
      { label: "Buy SCV", to: "/buy/scv" },
      { label: "Buy Trucks", to: "/buy/trucks" },
      { label: "Buy Buses", to: "/buy/buses" },
      { label: "Buy Tractors", to: "/buy/tractors" },
      { label: "Buy Taxi", to: "/buy/taxi" },
      { label: "Sell Your Car", to: "/sell-your-car" },
      { label: "Exchange", to: "/exchange" },
      { label: "Finance", to: "/finance" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Inspection", to: "/inspection" },
      { label: "Insurance", to: "/insurance" },
      { label: "RTO", to: "/rto" },
      { label: "Workshop", to: "/workshop" },
      { label: "Warranty", to: "/warranty" },
      { label: "Roadside Assistance", to: "/roadside-assistance" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Book Service", to: "/book-service" },
      { label: "FAQs", to: "/faq" },
    ],
  },
];

const LEGAL = ["Privacy Policy", "Terms & Conditions", "Refund/Cancellation Policy", "Disclaimer"];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div>
          <p className="font-display text-xl font-bold">
            MOTOR <span className="text-primary">WALLAH</span>
          </p>
          <p className="mt-1 text-[0.7rem] tracking-[0.18em] text-ink-foreground/60">
            Drive Trust. Drive Quality.
          </p>
          <p className="mt-4 max-w-xs text-sm text-ink-foreground/70">
            Certified pre-owned cars from Indore, Madhya Pradesh — buying, selling, exchange,
            finance assistance and complete car care.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold uppercase tracking-wide">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-ink-foreground/70 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              {col.title === "Support" && (
                <li>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-foreground/70 transition-colors hover:text-primary"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-8 gap-y-2 px-4 py-5 text-xs text-ink-foreground/70 lg:px-8">
          <a href={PHONE_HREF} className="flex items-center gap-2 hover:text-primary">
            <Phone className="h-4 w-4 text-primary" /> {PHONE_DISPLAY}
          </a>
          <a href="mailto:care@motorwallah.in" className="flex items-center gap-2 hover:text-primary">
            <Mail className="h-4 w-4 text-primary" /> care@motorwallah.in
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Indore, Madhya Pradesh
          </span>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-5 text-xs text-ink-foreground/60 lg:flex-row lg:items-center lg:px-8">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL.map((l) => (
              <li key={l}>
                <span className="cursor-default">{l}</span>
              </li>
            ))}
          </ul>
          <span className="lg:ml-auto">
            © {new Date().getFullYear()} Motor Wallah. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
