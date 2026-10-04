import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import { BUY_CATEGORIES, MAIN_NAV, PHONE_DISPLAY, PHONE_HREF, SERVICE_LINKS, WHATSAPP } from "@/lib/site";

const MOBILE_PRIMARY = [
  { label: "Buy Cars", to: "/cars" },
  { label: "Sell Your Car", to: "/sell-your-car" },
  { label: "Exchange", to: "/exchange" },
  { label: "Finance", to: "/finance" },
] as const;

const MOBILE_SECONDARY = [
  { label: "Franchise", to: "/franchise" },
  { label: "About Us", to: "/about" },
  { label: "Locations", to: "/locations" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:px-8 xl:flex xl:gap-6">
        <Link to="/" onClick={close} className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-9 shrink-0 place-items-center rounded-b-[1.2rem] border-2 border-primary font-display text-sm font-bold">
            MW
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg font-bold tracking-wide sm:text-xl">
              MOTOR <span className="text-primary">WALLAH</span>
            </span>
            <span className="block truncate text-[0.6rem] tracking-[0.18em] text-ink-foreground/60 sm:text-[0.65rem]">
              Drive Trust. Drive Quality.
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-5 xl:flex">
          {MAIN_NAV.map((item) =>
            item.to === "/cars" ? (
              <div key="buy" className="group relative">
                <Link
                  to="/cars"
                  className="flex items-center gap-1 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-ink-foreground/80 transition-colors hover:text-primary"
                >
                  Buy <ChevronDown className="h-3 w-3" />
                </Link>
                <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="w-60 border border-ink-foreground/10 bg-ink py-2 shadow-lg">
                    {BUY_CATEGORIES.map((c) => (
                      <li key={c.to}>
                        <Link
                          to={c.to}
                          className="block px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink-foreground/85 hover:bg-primary hover:text-primary-foreground"
                        >
                          Buy {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "border-b-2 border-primary pb-1 text-ink-foreground" }}
                inactiveProps={{ className: "text-ink-foreground/80" }}
                className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.08em] transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 xl:ml-6">
          <a
            href={PHONE_HREF}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="hidden h-10 w-10 place-items-center rounded-full border-2 border-primary text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:grid"
          >
            <Phone className="h-4 w-4" />
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp us"
            className="hidden h-10 w-10 place-items-center rounded-full border-2 border-ink-foreground/30 transition-colors hover:border-primary hover:text-primary sm:grid"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <a href={PHONE_HREF} className="hidden leading-tight lg:block">
            <span className="block font-display text-lg font-bold">{PHONE_DISPLAY}</span>
            <span className="block text-[0.65rem] text-ink-foreground/60">Customer Support</span>
          </a>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-ink-foreground/25 xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[75vh] overflow-y-auto border-t border-ink-foreground/10 px-4 pb-6 xl:hidden">
          <ul className="pt-2">
            {MOBILE_PRIMARY.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={close}
                  className="flex items-center justify-between border-b border-ink-foreground/10 py-3 text-sm font-bold uppercase tracking-wide"
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-primary" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
            Buy Vehicles
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4">
            {BUY_CATEGORIES.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={close}
                  className="block border-b border-ink-foreground/10 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink-foreground/85"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-primary">
            Services
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4">
            {SERVICE_LINKS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={close}
                  className="block border-b border-ink-foreground/10 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink-foreground/85"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-5">
            {MOBILE_SECONDARY.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={close}
                  className="flex items-center justify-between border-b border-ink-foreground/10 py-3 text-sm font-bold uppercase tracking-wide"
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-primary" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-ink-foreground/30 px-4 py-3 text-xs font-bold uppercase tracking-[0.1em]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
