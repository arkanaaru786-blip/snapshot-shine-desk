import { BadgeIndianRupee, Clock, FileText, IndianRupee, ShieldCheck, Umbrella } from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Certified Quality",
    text: "Every vehicle undergoes 150+ point inspection for your peace of mind.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Transparent Pricing",
    text: "Fair market pricing with no hidden charges.",
  },
  {
    icon: IndianRupee,
    title: "Easy Finance",
    text: "Quick loan assistance through trusted banking partners.",
  },
  {
    icon: Umbrella,
    title: "Insurance Support",
    text: "New, renewal and claim assistance under one roof.",
  },
  {
    icon: FileText,
    title: "Complete Documentation",
    text: "Hassle-free RTO documentation and ownership transfer.",
  },
  {
    icon: Clock,
    title: "Roadside Assistance",
    text: "24x7 emergency support for greater peace of mind.",
  },
];

export function WhyChoose() {
  return (
    <section id="why" className="bg-background py-14">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
        <h2 className="section-title">
          Why Choose <span className="text-primary">Motor Wallah?</span>
        </h2>

        <div className="mt-10 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {ITEMS.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className={`px-6 text-center ${i > 0 ? "xl:border-l xl:border-border" : ""}`}
            >
              <Icon className="mx-auto h-9 w-9 text-primary" strokeWidth={1.5} />
              <h3 className="mt-4 text-sm font-bold tracking-wide">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#why"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:border-primary hover:text-primary"
          >
            Learn More About Us
          </a>
        </div>
      </div>
    </section>
  );
}
