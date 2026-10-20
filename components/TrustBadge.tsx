import { Check, Clock } from "lucide-react";
import { trustCopy, trustLevel } from "@/lib/persuasion";

export interface TrustBadgeProps {
  successRate: number | null;
  reports: number;
  checkedDate?: string | null;
}

export default function TrustBadge({ successRate, reports, checkedDate }: TrustBadgeProps) {
  const level = trustLevel(successRate, reports);
  const copy = trustCopy(level, reports);
  const verified = level === "verified";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${
        verified
          ? "border-verified/30 bg-verified-soft text-verified"
          : "border-ledger-line bg-paper-alt text-ink-soft"
      }`}
    >
      {verified ? (
        <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
      ) : (
        <Clock aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
      )}
      {copy}
      {!verified && checkedDate ? `. Checked ${checkedDate}` : ""}
    </span>
  );
}
