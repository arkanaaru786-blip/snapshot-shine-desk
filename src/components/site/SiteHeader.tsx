import { useState } from "react";
import { Menu, Phone, ShieldCheck, X } from "lucide-react";

const NAV = [
  "Home",
  "Buy Cars",
  "Sell Car",
  "Exchange",
  "Services",
  "Finance",
  "Insurance",
  "Franchise",
  "About Us",
  "Contact Us",
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-[1600px] items-center gap-6 px-4 py-3 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-11 w-9 items-center justify-center rounded-b-[1.2rem] border-2 border-primary font-display text-sm font-bold">
            MW
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-bold tracking-wide">
              MOTOR <span className="text-primary">WALLAH</span>
            </span>
            <span className="block text-[0.65rem] tracking-[0.18em] text-ink-foreground/60">
              Drive Trust. Drive Quality.
            </span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-5 xl:flex">
          {NAV.map((item, i) => (
            <a
              key={item}
              href="#top"
              className={`font-sans text-[0.72rem] font-semibold uppercase tracking-[0.08em] transition-colors hover:text-primary ${
                i === 0 ? "border-b-2 border-primary pb-1 text-ink-foreground" : "text-ink-foreground/80"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 xl:ml-6">
          <span className="hidden h-10 w-10 place-items-center rounded-full border-2 border-primary text-primary sm:grid">
            <Phone className="h-4 w-4" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-lg font-bold">1800 123 4567</span>
            <span className="block text-[0.65rem] text-ink-foreground/60">24x7 Customer Support</span>
          </span>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-sm border border-ink-foreground/25 xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink-foreground/10 px-4 pb-4 xl:hidden">
          <ul className="grid grid-cols-2 gap-x-4">
            {NAV.map((item) => (
              <li key={item}>
                <a
                  href="#top"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 border-b border-ink-foreground/10 py-3 text-xs font-semibold uppercase tracking-wide text-ink-foreground/85"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
