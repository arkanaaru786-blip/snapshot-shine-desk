import carSuv from "@/assets/car-suv.jpg";
import carSedan from "@/assets/car-sedan.jpg";
import carHatch from "@/assets/car-hatch.jpg";

export type DemoCar = {
  id: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  km: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  location: string;
  priceLakh: number;
  image: string;
};

// DEMO DATA ONLY — illustrative vehicles, not live Motor Wallah inventory.
export const DEMO_CARS: DemoCar[] = [
  { id: "mw-01", brand: "Hyundai", model: "Creta", variant: "SX", year: 2022, km: 45000, fuel: "Petrol", transmission: "Automatic", bodyType: "SUV", location: "Indore", priceLakh: 12.5, image: carSuv },
  { id: "mw-02", brand: "Hyundai", model: "i20", variant: "Asta", year: 2021, km: 32400, fuel: "Petrol", transmission: "Manual", bodyType: "Hatchback", location: "Bhopal", priceLakh: 7.85, image: carHatch },
  { id: "mw-03", brand: "Maruti Suzuki", model: "Baleno", variant: "Zeta", year: 2022, km: 21600, fuel: "Petrol", transmission: "Manual", bodyType: "Hatchback", location: "Indore", priceLakh: 7.4, image: carHatch },
  { id: "mw-04", brand: "Maruti Suzuki", model: "Ertiga", variant: "ZXI CNG", year: 2021, km: 54800, fuel: "CNG", transmission: "Manual", bodyType: "MUV", location: "Ujjain", priceLakh: 9.6, image: carSedan },
  { id: "mw-05", brand: "Tata", model: "Nexon", variant: "XZ+", year: 2021, km: 33250, fuel: "Diesel", transmission: "Manual", bodyType: "SUV", location: "Indore", priceLakh: 9.1, image: carSuv },
  { id: "mw-06", brand: "Tata", model: "Altroz", variant: "XT", year: 2020, km: 41200, fuel: "Petrol", transmission: "Manual", bodyType: "Hatchback", location: "Dewas", priceLakh: 6.25, image: carHatch },
  { id: "mw-07", brand: "Mahindra", model: "Scorpio N", variant: "Z8", year: 2022, km: 29800, fuel: "Diesel", transmission: "Manual", bodyType: "SUV", location: "Indore", priceLakh: 18.2, image: carSuv },
  { id: "mw-08", brand: "Mahindra", model: "XUV300", variant: "W8 (O)", year: 2020, km: 48900, fuel: "Diesel", transmission: "Manual", bodyType: "SUV", location: "Bhopal", priceLakh: 8.75, image: carSuv },
  { id: "mw-09", brand: "Kia", model: "Seltos", variant: "HTX", year: 2021, km: 37600, fuel: "Petrol", transmission: "Automatic", bodyType: "SUV", location: "Indore", priceLakh: 13.4, image: carSuv },
  { id: "mw-10", brand: "Toyota", model: "Innova Crysta", variant: "GX", year: 2019, km: 62900, fuel: "Diesel", transmission: "Automatic", bodyType: "MUV", location: "Ujjain", priceLakh: 16.5, image: carSedan },
  { id: "mw-11", brand: "Honda", model: "City", variant: "VX", year: 2020, km: 44100, fuel: "Petrol", transmission: "Automatic", bodyType: "Sedan", location: "Indore", priceLakh: 9.75, image: carSedan },
  { id: "mw-12", brand: "Volkswagen", model: "Polo", variant: "Highline Plus", year: 2019, km: 58300, fuel: "Petrol", transmission: "Manual", bodyType: "Hatchback", location: "Dewas", priceLakh: 5.9, image: carHatch },
];

export const BUDGETS = [
  { label: "Under ₹5 Lakh", min: 0, max: 5 },
  { label: "₹5–10 Lakh", min: 5, max: 10 },
  { label: "₹10–15 Lakh", min: 10, max: 15 },
  { label: "₹15 Lakh+", min: 15, max: Infinity },
];

const uniq = (values: string[]) => Array.from(new Set(values)).sort();

export const BRANDS = uniq(DEMO_CARS.map((c) => c.brand));
export const MODELS = uniq(DEMO_CARS.map((c) => c.model));
export const FUELS = uniq(DEMO_CARS.map((c) => c.fuel));
export const TRANSMISSIONS = uniq(DEMO_CARS.map((c) => c.transmission));
export const BODY_TYPES = uniq(DEMO_CARS.map((c) => c.bodyType));
export const LOCATIONS = uniq(DEMO_CARS.map((c) => c.location));
export const YEARS = uniq(DEMO_CARS.map((c) => String(c.year))).reverse();

export const formatPrice = (lakh: number) => `₹${lakh.toFixed(2)} Lakh`;
export const formatKm = (km: number) => `${km.toLocaleString("en-IN")} km`;
