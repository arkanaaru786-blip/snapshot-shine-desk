/**
 * Central Motor Wallah vehicle catalogue.
 *
 * Single source of truth for the Brand -> Model relationship used by the
 * inventory listing, home search, vehicle metadata and any future admin
 * inventory entry form. Never duplicate model names elsewhere.
 *
 * Shape mirrors a future relational backend:
 *   brand(brand_id, brand_name)
 *   model(model_id, brand_id, model_name)
 *   vehicle_listing(listing_id, brand_id, model_id, ...)
 */

export type Brand = { id: string; name: string };
export type Model = { id: string; brandId: string; name: string };

const catalog: Record<string, string[]> = {
  "Maruti Suzuki": [
    "Alto",
    "Alto K10",
    "S-Presso",
    "Celerio",
    "Wagon R",
    "Swift",
    "Dzire",
    "Baleno",
    "Ignis",
    "Fronx",
    "Brezza",
    "Grand Vitara",
    "Ertiga",
    "XL6",
    "Invicto",
    "Jimny",
    "Eeco",
    "e Vitara",
    "Ciaz",
  ],
  Hyundai: [
    "Grand i10 Nios",
    "i20",
    "i20 N Line",
    "Aura",
    "Verna",
    "Exter",
    "Venue",
    "Venue N Line",
    "Creta",
    "Creta N Line",
    "Creta Electric",
    "Alcazar",
    "Tucson",
    "Ioniq 5",
  ],
  Tata: [
    "Tiago",
    "Tigor",
    "Altroz",
    "Punch",
    "Nexon",
    "Curvv",
    "Harrier",
    "Safari",
    "Sierra",
  ],
  Mahindra: [
    "Bolero",
    "Bolero Neo",
    "Scorpio",
    "Scorpio Classic",
    "Scorpio-N",
    "Thar",
    "Thar Roxx",
    "XUV 3XO",
    "XUV500",
    "XUV700",
    "XUV 7XO",
    "Marazzo",
    "BE 6",
    "XEV 9e",
  ],
  Toyota: [
    "Glanza",
    "Urban Cruiser",
    "Urban Cruiser Hyryder",
    "Taisor",
    "Rumion",
    "Innova Crysta",
    "Innova Hycross",
    "Fortuner",
    "Hilux",
    "Camry",
    "Vellfire",
    "Land Cruiser",
  ],
  Honda: ["Amaze", "City", "City e:HEV", "Elevate", "WR-V", "Jazz"],
  Kia: ["Sonet", "Seltos", "Carens", "Carens Clavis", "Syros", "Carnival", "EV6", "EV9"],
  Renault: ["Kwid", "Triber", "Kiger", "Duster"],
  Nissan: ["Magnite", "X-Trail", "Gravite"],
  Skoda: ["Slavia", "Kushaq", "Kodiaq", "Superb", "Octavia", "Kylaq"],
  Volkswagen: ["Polo", "Vento", "Virtus", "Taigun", "Tiguan"],
  MG: ["Comet EV", "Astor", "Hector", "Hector Plus", "ZS EV", "Windsor EV", "Gloster"],
  Citroen: ["C3", "ë-C3", "C3 Aircross", "C5 Aircross", "Basalt"],
  Jeep: ["Compass", "Meridian", "Wrangler", "Grand Cherokee"],
  BMW: ["2 Series", "3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "i4", "iX1"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "GLS", "EQS"],
  Audi: ["A4", "A6", "A8 L", "Q3", "Q5", "Q7", "Q8", "e-tron GT"],
  Volvo: ["XC40", "XC60", "XC90", "C40 Recharge", "S90"],
  Lexus: ["ES", "NX", "RX", "LX", "LM"],
  Jaguar: ["XF", "F-Pace", "F-Type", "I-Pace"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
  MINI: ["Cooper", "Countryman", "Cooper SE"],
  Porsche: ["718", "911", "Macan", "Cayenne", "Panamera", "Taycan"],
  Lamborghini: ["Huracan", "Urus", "Revuelto"],
  Maserati: ["Ghibli", "Levante", "Quattroporte", "Grecale"],
  Bentley: ["Bentayga", "Continental GT", "Flying Spur"],
  "Rolls-Royce": ["Cullinan", "Ghost", "Phantom", "Spectre"],
  "Aston Martin": ["DB12", "Vantage", "DBX"],
  Ferrari: ["Roma", "Purosangue", "296 GTB", "SF90"],
  Tesla: ["Model 3", "Model Y"],
  BYD: ["Atto 3", "Seal", "eMAX 7", "Sealion 7"],
  Isuzu: ["D-Max", "V-Cross", "MU-X"],
  "Force Motors": ["Gurkha", "Urbania", "Trax Cruiser"],
  VinFast: ["VF6", "VF7"],
};

const slug = (s: string) =>
  s.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const BRANDS_CATALOG: Brand[] = Object.keys(catalog)
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({ id: slug(name), name }));

export const MODELS_CATALOG: Model[] = BRANDS_CATALOG.flatMap((brand) =>
  (catalog[brand.name] ?? []).map((name) => ({
    id: `${brand.id}--${slug(name)}`,
    brandId: brand.id,
    name,
  })),
);

export const BRAND_NAMES = BRANDS_CATALOG.map((b) => b.name);

/** All model names, de-duplicated and sorted (used only for "All Brands"). */
export const ALL_MODEL_NAMES = Array.from(new Set(MODELS_CATALOG.map((m) => m.name))).sort((a, b) =>
  a.localeCompare(b),
);

export const getBrandByName = (name: string) => BRANDS_CATALOG.find((b) => b.name === name);

/** Models belonging to a brand name. Empty brand -> every model. */
export const modelsForBrand = (brandName: string | null | undefined): string[] => {
  if (!brandName) return ALL_MODEL_NAMES;
  return catalog[brandName] ? [...catalog[brandName]] : [];
};

/** True when the model actually belongs to the brand. */
export const isValidBrandModel = (brandName: string, modelName: string) =>
  (catalog[brandName] ?? []).includes(modelName);

export const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"] as const;
export const TRANSMISSION_TYPES = ["Manual", "Automatic"] as const;
