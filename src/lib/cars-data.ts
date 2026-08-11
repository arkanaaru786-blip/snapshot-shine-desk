import placeholderHatchback from "@/assets/placeholder-hatchback.jpg";
import placeholderSedan from "@/assets/placeholder-sedan.jpg";
import placeholderSuv from "@/assets/placeholder-suv.jpg";
import placeholderMuv from "@/assets/placeholder-muv.jpg";

export type VehicleStatus = "Available" | "Reserved" | "Sold";
export type BodyType = "Hatchback" | "Sedan" | "SUV" | "MUV";

export type Vehicle = {
  id: string;
  status: VehicleStatus;
  demo: boolean;
  make: string;
  model: string;
  variant: string;
  year: number;
  price: number; // in ₹ lakh
  kilometres: number;
  fuel: string;
  transmission: string;
  bodyType: BodyType;
  location: string;
  images: string[];
  description: string | null;
  certified: boolean;
  inspectionPoints: number | null;
  registration: string | null;
  insurance: string | null;
  warranty: string | null;
  serviceHistory: string | null;
  ownershipHistory: string | null;
  exteriorCondition: string | null;
  interiorCondition: string | null;
  engineCondition: string | null;
  tyres: string | null;
  rto: string | null;
  finance: string | null;
  createdAt: string;
};

/**
 * DEMO INVENTORY — clearly labelled placeholder records.
 * Images are neutral body-type placeholders (never a mismatched brand photo).
 * Unknown attributes are `null` and rendered as "Available on request".
 */
const bodyPlaceholder: Record<BodyType, string> = {
  Hatchback: placeholderHatchback,
  Sedan: placeholderSedan,
  SUV: placeholderSuv,
  MUV: placeholderMuv,
};

export const placeholderFor = (bodyType: BodyType) => bodyPlaceholder[bodyType];

const demo = (
  v: Omit<
    Vehicle,
    | "demo"
    | "images"
    | "description"
    | "certified"
    | "inspectionPoints"
    | "registration"
    | "insurance"
    | "warranty"
    | "serviceHistory"
    | "ownershipHistory"
    | "exteriorCondition"
    | "interiorCondition"
    | "engineCondition"
    | "tyres"
    | "rto"
    | "finance"
  >,
): Vehicle => ({
  ...v,
  demo: true,
  images: [bodyPlaceholder[v.bodyType]],
  description: null,
  certified: false,
  inspectionPoints: null,
  registration: null,
  insurance: null,
  warranty: null,
  serviceHistory: null,
  ownershipHistory: null,
  exteriorCondition: null,
  interiorCondition: null,
  engineCondition: null,
  tyres: null,
  rto: null,
  finance: null,
});

export const VEHICLES: Vehicle[] = [
  demo({ id: "mw-01", status: "Available", make: "Maruti Suzuki", model: "Baleno", variant: "Zeta", year: 2022, price: 7.4, kilometres: 21600, fuel: "Petrol", transmission: "Manual", bodyType: "Hatchback", location: "Indore", createdAt: "2026-07-28" }),
  demo({ id: "mw-02", status: "Available", make: "Hyundai", model: "i20", variant: "Asta", year: 2021, price: 7.85, kilometres: 32400, fuel: "Petrol", transmission: "Manual", bodyType: "Hatchback", location: "Bhopal", createdAt: "2026-07-22" }),
  demo({ id: "mw-03", status: "Available", make: "Hyundai", model: "Creta", variant: "SX", year: 2022, price: 12.5, kilometres: 45000, fuel: "Petrol", transmission: "Automatic", bodyType: "SUV", location: "Indore", createdAt: "2026-08-04" }),
  demo({ id: "mw-04", status: "Reserved", make: "Maruti Suzuki", model: "Ertiga", variant: "ZXI CNG", year: 2021, price: 9.6, kilometres: 54800, fuel: "CNG", transmission: "Manual", bodyType: "MUV", location: "Ujjain", createdAt: "2026-07-10" }),
  demo({ id: "mw-05", status: "Available", make: "Tata", model: "Nexon", variant: "XZ+", year: 2021, price: 9.1, kilometres: 33250, fuel: "Diesel", transmission: "Manual", bodyType: "SUV", location: "Indore", createdAt: "2026-08-01" }),
  demo({ id: "mw-06", status: "Available", make: "Mahindra", model: "Scorpio N", variant: "Z8", year: 2022, price: 18.2, kilometres: 29800, fuel: "Diesel", transmission: "Manual", bodyType: "SUV", location: "Indore", createdAt: "2026-08-08" }),
  demo({ id: "mw-07", status: "Sold", make: "Tata", model: "Altroz", variant: "XT", year: 2020, price: 6.25, kilometres: 41200, fuel: "Petrol", transmission: "Manual", bodyType: "Hatchback", location: "Dewas", createdAt: "2026-06-30" }),
];

export const PRICE_RANGES = [
  { label: "Under ₹5 Lakh", min: 0, max: 5 },
  { label: "₹5–8 Lakh", min: 5, max: 8 },
  { label: "₹8–12 Lakh", min: 8, max: 12 },
  { label: "₹12–20 Lakh", min: 12, max: 20 },
  { label: "₹20 Lakh+", min: 20, max: Infinity },
];

export const KM_RANGES = [
  { label: "Under 25,000 km", min: 0, max: 25000 },
  { label: "25,000 – 50,000 km", min: 25000, max: 50000 },
  { label: "50,000 km+", min: 50000, max: Infinity },
];

export const FUELS = ["Petrol", "Diesel", "CNG", "Electric"];
export const TRANSMISSIONS = ["Manual", "Automatic", "AMT", "DCT"];
export const BODY_TYPES: BodyType[] = ["Hatchback", "Sedan", "SUV", "MUV"];
export const LOCATIONS = ["Indore", "Bhopal", "Ujjain", "Dewas", "Other Motor Wallah locations"];

const uniq = (values: string[]) => Array.from(new Set(values)).sort();
export const BRANDS = uniq(VEHICLES.map((v) => v.make));
export const MODELS = uniq(VEHICLES.map((v) => v.model));
export const YEARS = uniq(VEHICLES.map((v) => String(v.year))).reverse();

export const vehicleName = (v: Vehicle) => `${v.year} ${v.make} ${v.model} ${v.variant}`;
export const formatPrice = (lakh: number) => `₹${lakh.toFixed(2)} Lakh`;
export const formatKm = (km: number) => `${km.toLocaleString("en-IN")} km`;
export const getVehicle = (id: string) => VEHICLES.find((v) => v.id === id);
export const ON_REQUEST = "Available on request";
