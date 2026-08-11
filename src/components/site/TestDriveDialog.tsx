import { useState } from "react";
import { X } from "lucide-react";
import { LOCATIONS, type Vehicle, vehicleName } from "@/lib/cars-data";

export function TestDriveDialog({
  vehicle,
  open,
  onClose,
}: {
  vehicle: Vehicle;
  open: boolean;
  onClose: () => void;
}) {
  const [done, setDone] = useState(false);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-ink/70" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto border border-border bg-card p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-xl uppercase leading-tight">Book Test Drive</p>
            <p className="mt-1 text-xs text-muted-foreground">{vehicleName(vehicle)}</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="py-8 text-center">
            <p className="font-display text-2xl uppercase text-primary">Thank you.</p>
            <p className="mt-2 text-sm text-muted-foreground">Our team will contact you shortly.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            className="grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <Input label="Name" name="name" required maxLength={100} />
            <Input label="Mobile Number" name="mobile" type="tel" required pattern="[0-9+ ]{10,15}" maxLength={15} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Preferred Date" name="date" type="date" required />
              <Input label="Preferred Time" name="time" type="time" required />
            </div>
            <label className="block border border-border px-3 py-2">
              <span className="block text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                Preferred Location
              </span>
              <select name="location" defaultValue={vehicle.location} className="w-full bg-transparent text-sm font-semibold outline-none">
                {LOCATIONS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </label>
            <label className="block border border-border bg-secondary/40 px-3 py-2">
              <span className="block text-[0.65rem] uppercase tracking-wide text-muted-foreground">Vehicle</span>
              <input
                readOnly
                value={vehicleName(vehicle)}
                className="w-full bg-transparent text-sm font-semibold outline-none"
              />
            </label>
            <label className="block border border-border px-3 py-2">
              <span className="block text-[0.65rem] uppercase tracking-wide text-muted-foreground">Message</span>
              <textarea
                name="message"
                rows={3}
                maxLength={500}
                className="w-full resize-none bg-transparent text-sm outline-none"
              />
            </label>
            <button
              type="submit"
              className="mt-1 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Book Test Drive
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block border border-border px-3 py-2">
      <span className="block text-[0.65rem] uppercase tracking-wide text-muted-foreground">{label}</span>
      <input {...props} className="w-full bg-transparent text-sm font-semibold outline-none" />
    </label>
  );
}
