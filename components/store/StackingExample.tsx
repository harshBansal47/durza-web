import { Sparkles } from "lucide-react";

export interface StackingLine {
  label: string;
  /** Display string keeps Indian formatting — e.g. "− ₹300" or "₹4,499". */
  value: string;
}

/**
 * Honest ₹ walk-through of stacking discounts on a store. Numbers are
 * always labelled as an example — eligibility is decided at checkout, never
 * promised here.
 */
export default function StackingExample({
  title,
  lead,
  lines,
  total,
  saving,
  note,
}: {
  title: string;
  lead: string;
  lines: StackingLine[];
  total: StackingLine;
  saving: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Sparkles aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={2} />
        <h2 className="text-lg font-bold text-ink">{title}</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{lead}</p>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
        <table className="w-full text-sm">
          <tbody>
            {lines.map((line) => (
              <tr key={line.label} className="border-b border-slate-100 last:border-b-0">
                <th scope="row" className="px-3 py-2 text-left font-normal text-ink-soft sm:px-4">{line.label}</th>
                <td className="px-3 py-2 text-right font-medium text-ink sm:px-4">{line.value}</td>
              </tr>
            ))}
            <tr className="bg-slate-50">
              <th scope="row" className="px-3 py-2 text-left font-semibold text-ink sm:px-4">{total.label}</th>
              <td className="px-3 py-2 text-right font-bold text-ink sm:px-4">{total.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm font-semibold text-emerald-800">{saving}</p>
      <p className="mt-1 text-[11px] leading-4 text-ink-soft">{note}</p>
    </div>
  );
}
