import { Check, Clock } from "lucide-react";

export interface TrustBadgeProps {
  successRate: number | null;
  reports: number;
  checkedDate?: string | null;
}

export default function TrustBadge({ successRate, reports, checkedDate }: TrustBadgeProps) {
  const rate = successRate === null ? null : Math.round(successRate * 100);
  if (rate !== null && rate >= 80 && reports > 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-green-100 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
        <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
        Verified working by {reports} Durza user{reports === 1 ? "" : "s"} recently
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
      <Clock aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
      Verified by our team, not scraped by bots{checkedDate ? `. Checked ${checkedDate}` : ""}
    </span>
  );
}
