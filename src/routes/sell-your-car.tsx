import { createFileRoute } from "@tanstack/react-router";
import { VehicleJourney, type JourneyField } from "@/components/site/VehicleJourney";

const TITLE = "Sell Your Car | Motor Wallah";
const DESCRIPTION =
  "Get a transparent vehicle evaluation and a hassle-free selling experience with Motor Wallah.";

export const Route = createFileRoute("/sell-your-car")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const FIELDS: JourneyField[] = [
  { name: "registration", label: "Vehicle Registration Number", required: true, placeholder: "MP09 AB 1234" },
  {
    name: "ownership",
    label: "Ownership Status",
    type: "select",
    options: ["First Owner", "Second Owner", "Third Owner", "Fourth Owner or more"],
    required: true,
  },
  {
    name: "condition",
    label: "Vehicle Condition",
    type: "select",
    options: ["Excellent", "Good", "Average", "Needs Work"],
    required: true,
  },
  {
    name: "accidentHistory",
    label: "Accident History",
    type: "select",
    options: ["No Accident", "Minor Repair", "Major Repair", "Not Sure"],
    required: true,
  },
  {
    name: "insuranceStatus",
    label: "Insurance Status",
    type: "select",
    options: ["Valid Comprehensive", "Valid Third Party", "Expired", "Not Sure"],
    required: true,
  },
  {
    name: "serviceHistory",
    label: "Service History",
    type: "select",
    options: ["Full Authorised Service", "Partial Records", "Local Workshop", "No Records"],
    required: true,
  },
  { name: "currentKm", label: "Current Kilometres", type: "number", required: true, placeholder: "e.g. 45000" },
  { name: "expectedPrice", label: "Expected Selling Price (optional)", placeholder: "e.g. ₹4.5 Lakh" },
  { name: "name", label: "Your Name", required: true },
  { name: "mobile", label: "Mobile Number", type: "tel", required: true, placeholder: "10-digit mobile" },
  { name: "whatsapp", label: "WhatsApp Number", type: "tel", placeholder: "If different" },
  {
    name: "preferredContact",
    label: "Preferred Contact Method",
    type: "select",
    options: ["Call", "WhatsApp", "Either"],
    required: true,
  },
];

function Page() {
  return (
    <VehicleJourney
      title="Sell Your Car"
      highlight="at the Right Price"
      description="Select your car details and get a transparent Motor Wallah valuation with a hassle-free selling experience."
      ctaLabel="Get My Car Valued"
      formTitle="Tell Us About Your Car"
      fields={FIELDS}
      leadType="sell_car"
      source="sell-your-car"
      whatsappMessage="Hi Motor Wallah, I want a valuation for my car."
    />
  );
}
