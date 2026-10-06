import { Link } from "@tanstack/react-router";
import { Heart, MapPin, UserRound } from "lucide-react";
import { BUY_CATEGORIES, MAIN_NAV } from "@/lib/site";
import { BrandLogo } from "@/components/site/BrandLogo";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-foreground/10 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 lg:px-8 xl:flex">
        <BrandLogo />
        <nav className="ml-auto hidden items-center gap-4 xl:flex">
          {MAIN_NAV.map((item) =>
            item.label === "Buy" ? (
              <div key="buy" className="group relative">
                <Link
                  to="/cars"
                  className="font-sans text-[0.68rem] font-bold uppercase text-ink-foreground/85 transition-colors hover:text-primary"
                >
                  Buy
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
                key={item.label}
                to={item.to}
                activeProps={{ className: "border-b-2 border-primary pb-1 text-ink-foreground" }}
                inactiveProps={{ className: "text-ink-foreground/80" }}
                className="font-sans text-[0.68rem] font-bold uppercase transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-3 xl:ml-3">
          <Link to="/locations" aria-label="Choose location" className="hidden flex-col items-center text-[0.55rem] text-ink-foreground/70 hover:text-primary sm:flex">
            <MapPin className="mb-0.5 h-4 w-4" /> Location
          </Link>
          <Link to="/cars" aria-label="View favorites" className="hidden flex-col items-center text-[0.55rem] text-ink-foreground/70 hover:text-primary sm:flex">
            <Heart className="mb-0.5 h-4 w-4" /> Favorites
          </Link>
          <Link to="/contact" aria-label="My account" className="flex flex-col items-center text-[0.55rem] text-ink-foreground/70 hover:text-primary">
            <UserRound className="mb-0.5 h-4 w-4" /> My Account
          </Link>
          <Button asChild size="sm" className="hidden rounded-sm text-[0.6rem] font-bold uppercase lg:inline-flex">
            <Link to="/franchise">Become a Franchise Partner</Link>
          </Button>
        </div>
      </div>
      <nav aria-label="Primary navigation" className="scrollbar-none flex overflow-x-auto border-t border-ink-foreground/10 px-3 xl:hidden">
        {MAIN_NAV.map((item) => (
          <Link key={`${item.label}-${item.to}`} to={item.to} className="shrink-0 px-3 py-2 text-[0.62rem] font-bold uppercase text-ink-foreground/80 hover:text-primary">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
