export const PHONE_DISPLAY = "1800 123 4567";
export const PHONE_HREF = "tel:18001234567";
export const WHATSAPP_BASE = "https://wa.me/919999999999";

export function whatsappLink(message: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP = whatsappLink("Hi Motor Wallah, I need help with a car");

export const MAIN_NAV = [
  { label: "Buy Cars", to: "/cars" },
  { label: "Sell Your Car", to: "/sell-your-car" },
  { label: "Exchange", to: "/exchange" },
  { label: "Finance", to: "/finance" },
  { label: "Services", to: "/services" },
  { label: "Franchise", to: "/franchise" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export const BUY_CATEGORIES = [
  { label: "Cars", to: "/cars", blurb: "Hatchbacks, sedans & SUVs" },
  { label: "Bikes", to: "/buy/bikes", blurb: "Motorcycles & scooters" },
  { label: "3-Wheelers", to: "/buy/three-wheelers", blurb: "Autos & e-rickshaws" },
  { label: "SCV", to: "/buy/scv", blurb: "Small commercial vehicles" },
  { label: "Trucks", to: "/buy/trucks", blurb: "Light to heavy trucks" },
  { label: "Buses", to: "/buy/buses", blurb: "School, staff & tourist" },
  { label: "Tractors", to: "/buy/tractors", blurb: "Farm tractors" },
  { label: "Taxi", to: "/buy/taxi", blurb: "Commercial cars" },
] as const;

export const SERVICE_LINKS = [
  { label: "Inspection", to: "/inspection" },
  { label: "Insurance", to: "/insurance" },
  { label: "RTO", to: "/rto" },
  { label: "Workshop", to: "/workshop" },
  { label: "Warranty", to: "/warranty" },
  { label: "Roadside Assistance", to: "/roadside-assistance" },
  { label: "Accessories", to: "/accessories" },
] as const;
