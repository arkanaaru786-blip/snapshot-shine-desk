import { Mail, MapPin, Phone } from "lucide-react";

const COLUMNS = [
  { title: "Company", links: ["About Us", "Franchise", "Careers", "Contact Us"] },
  { title: "Buy & Sell", links: ["Buy Certified Cars", "Sell Your Car", "Exchange", "Car Finance"] },
  { title: "Services", links: ["Insurance", "RTO Documentation", "Workshop", "Extended Warranty"] },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-xl font-bold">
            MOTOR <span className="text-primary">WALLAH</span>
          </p>
          <p className="mt-1 text-[0.7rem] tracking-[0.18em] text-ink-foreground/60">
            Drive Trust. Drive Quality.
          </p>
          <p className="mt-4 max-w-xs text-sm text-ink-foreground/70">
            India&apos;s trusted certified pre-owned car network for buying, selling, servicing and
            financing vehicles.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold tracking-wide">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#top" className="text-sm text-ink-foreground/70 transition-colors hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-8 gap-y-2 px-4 py-5 text-xs text-ink-foreground/70 lg:px-8">
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" /> 1800 123 4567
          </span>
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" /> care@motorwallah.in
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Pan-India Dealer Network
          </span>
          <span className="ml-auto">© {new Date().getFullYear()} Motor Wallah. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
