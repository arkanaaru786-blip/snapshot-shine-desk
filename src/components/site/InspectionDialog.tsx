import { AlertTriangle, Check, Minus, X } from "lucide-react";
import { type Vehicle, vehicleName, type InspectionResult } from "@/lib/cars-data";

const icon = (r: InspectionResult) => {
  if (r === "Passed") return <Check className="h-4 w-4 text-primary" />;
  if (r === "Attention Required") return <AlertTriangle className="h-4 w-4 text-primary" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

export function InspectionDialog({
  vehicle,
  open,
  onClose,
}: {
  vehicle: Vehicle;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  const report = vehicle.inspection;

  return (
    <div className="fixed inset-0 z-[85] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-ink/70" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-xl uppercase leading-tight">150+ Point Inspection</p>
            <p className="mt-1 text-xs text-muted-foreground">{vehicleName(vehicle)}</p>
          </div>
          <button type="button" aria-label="Close inspection report" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {!report ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No inspection data exists for this vehicle yet. Our team will share the full report on request.
          </p>
        ) : (
          <>
            <div className="border border-border bg-secondary/40 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">Inspection score</span>
                <span className="font-display text-2xl text-primary">{report.score ?? "—"}%</span>
              </div>
              <div className="mt-2 h-2 w-full bg-border">
                <div className="h-full bg-primary" style={{ width: `${report.score ?? 0}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {report.totalPoints} checkpoints across {report.items.length} categories.
              </p>
            </div>

            {!report.verified && (
              <p className="mt-3 border border-primary/40 bg-primary/10 px-3 py-2 text-[0.7rem] font-bold uppercase tracking-wide text-primary">
                Demo inspection data — this vehicle has not been physically inspected.
              </p>
            )}

            <ul className="mt-4 divide-y divide-border border border-border">
              {report.items.map((item) => (
                <li key={item.category} className="flex items-start justify-between gap-3 px-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2 font-semibold uppercase tracking-wide">
                    {icon(item.result)} {item.category}
                  </span>
                  <span className="text-right text-xs text-muted-foreground">
                    {item.result}
                    {item.note && <span className="block">{item.note}</span>}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs text-muted-foreground">
              Verified reports are issued only after a physical Motor Wallah inspection.
            </p>
          </>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground"
        >
          Close
        </button>
      </div>
    </div>
  );
}
