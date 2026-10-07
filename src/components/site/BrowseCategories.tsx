import { Link } from "@tanstack/react-router";
import { BUY_CATEGORIES } from "@/lib/site";
import { ArrowRight, ChevronRight } from "lucide-react";
import cars from "@/assets/categories/cars.jpg";
import bikes from "@/assets/categories/bikes.jpg";
import threeWheelers from "@/assets/categories/three-wheelers.jpg";
import scv from "@/assets/categories/scv.jpg";
import trucks from "@/assets/categories/trucks.jpg";
import buses from "@/assets/categories/buses.jpg";
import tractors from "@/assets/categories/tractors.jpg";
import taxi from "@/assets/categories/taxi.jpg";

const IMAGES = [cars, bikes, threeWheelers, scv, trucks, buses, tractors, taxi];
const CATEGORY_BRANDS = [
  ["Maruti Suzuki", "Hyundai", "Tata", "Toyota"],
  ["Royal Enfield", "Bajaj", "TVS", "Honda"],
  ["Bajaj", "Piaggio", "TVS", "Mahindra"],
  ["Tata", "Ashok Leyland", "Mahindra"],
  ["Tata", "Ashok Leyland", "Eicher"],
  ["Tata", "Ashok Leyland", "Force"],
  ["Mahindra", "Sonalika", "Swaraj"],
  ["Maruti Suzuki", "Toyota", "Hyundai"],
];

// Replaceable text wordmarks, not fabricated manufacturer logo artwork.
export function BrandStrip() {
  return (
    <nav aria-label="Featured vehicle brands" className="home-brand-rail">
      {["Maruti Suzuki", "Hyundai", "Tata Motors", "Toyota", "Mahindra", "Honda", "Kia", "MG", "Renault", "Škoda", "BMW", "Mercedes-Benz", "Volvo"].map((brand) => (
        <Link key={brand} to="/cars" search={{ brand: brand === "Tata Motors" ? "Tata" : brand }} className="home-brand-wordmark">{brand}</Link>
      ))}
      <Link to="/cars" className="home-brand-all">View all brands <ArrowRight size={14} /></Link>
    </nav>
  );
}

export function BrowseCategories() {
  return (
    <section className="home-categories bg-background">
      <div className="home-container">
        <div className="home-section-heading"><div><h2>Explore <span>Vehicles</span></h2><p>Find your perfect ride from our wide range of vehicles.</p></div><Link to="/cars">View all <ArrowRight size={14} /></Link></div>
        <div className="home-category-grid">
          {BUY_CATEGORIES.map((c, i) => {
            const image = IMAGES[i] ?? cars;
            return (
              <Link
                key={c.to}
                to={c.to}
                className="home-category-card group"
              >
                <div className="home-category-image"><img src={image} alt={`${c.label} marketplace category`} width={720} height={450} loading="lazy" /></div>
                <div className="home-category-content"><span className="home-category-name">{c.label}<ChevronRight size={16} /></span>
                  <span className="home-category-brands">{CATEGORY_BRANDS[i]?.map((brand) => <span key={brand} className="home-category-wordmark">{brand}</span>)}</span>
                  <span className="home-explore-link">Explore <ArrowRight size={12} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
