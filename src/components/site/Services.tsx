import {
  BatteryCharging,
  Car,
  CarFront,
  FileText,
  HandCoins,
  IndianRupee,
  PaintBucket,
  Radio,
  Repeat,
  ShieldCheck,
  Sofa,
  Sparkles,
  Truck,
  Umbrella,
  Wrench,
} from "lucide-react";

const SERVICES = [
  { icon: Car, label: "Buy\nCertified Cars" },
  { icon: HandCoins, label: "Sell\nYour Car" },
  { icon: Repeat, label: "Exchange\nYour Car" },
  { icon: ShieldCheck, label: "Vehicle Inspection\n& Certification" },
  { icon: IndianRupee, label: "Car\nFinance" },
  { icon: Umbrella, label: "Insurance\nServices" },
  { icon: FileText, label: "RTO\nDocumentation" },
  { icon: CarFront, label: "Complete Car\nCare Workshop" },
  { icon: Wrench, label: "Mechanical\nWorks" },
  { icon: PaintBucket, label: "Denting &\nPainting" },
  { icon: BatteryCharging, label: "Electrical\nWorks" },
  { icon: Sparkles, label: "Detailing\nWorks" },
  { icon: Sofa, label: "Car\nAccessories" },
  { icon: Radio, label: "Motor Wallah\nConnected" },
  { icon: ShieldCheck, label: "Extended\nWarranty" },
  { icon: Truck, label: "24x7 Roadside\nAssistance" },
];

export function Services() {
  return (
    <section id="services" className="bg-secondary/50 py-14">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <h2 className="section-title">
          Our <span className="text-primary">Services</span>
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8">
          {SERVICES.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              className="group flex flex-col items-center justify-start gap-3 border border-border bg-card px-3 py-5 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-panel"
            >
              <Icon className="h-7 w-7 text-foreground transition-colors group-hover:text-primary" strokeWidth={1.5} />
              <span className="whitespace-pre-line text-[0.68rem] font-semibold leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
