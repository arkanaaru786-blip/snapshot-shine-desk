import { Link } from "@tanstack/react-router";
import { BUY_CATEGORIES } from "@/lib/site";
import cars from "@/assets/categories/cars.jpg";
import bikes from "@/assets/categories/bikes.jpg";
import threeWheelers from "@/assets/categories/three-wheelers.jpg";
import scv from "@/assets/categories/scv.jpg";
import trucks from "@/assets/categories/trucks.jpg";
import buses from "@/assets/categories/buses.jpg";
import tractors from "@/assets/categories/tractors.jpg";
import taxi from "@/assets/categories/taxi.jpg";

const IMAGES = [cars, bikes, threeWheelers, scv, trucks, buses, tractors, taxi];

export function BrowseCategories() {
  return (
    <section className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <h2 className="section-title text-left">Explore Vehicles</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
          {BUY_CATEGORIES.map((c, i) => {
            const image = IMAGES[i] ?? cars;
            return (
              <Link
                key={c.to}
                to={c.to}
                className="group overflow-hidden rounded-sm border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-panel"
              >
                <img src={image} alt={`${c.label} marketplace category`} width={720} height={450} loading="lazy" className="aspect-[8/5] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <span className="block border-t border-border px-2 py-3 text-center font-display text-sm font-bold uppercase text-card-foreground group-hover:text-primary">
                  {c.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
