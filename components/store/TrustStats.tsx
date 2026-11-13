import { ShieldCheck, BadgeCheck, Clock3, ThumbsUp } from "lucide-react";

export interface TrustStatsProps {
  /** Offers verified within the last 30 days (code or check). */
  verifiedRecently: number;
  /** Average reported success rate across offers with data, 0–100. */
  avgRate: number | null;
  /** Most recent source check across all offers on the store (ISO). */
  latestCheck: string | null;
  /** Total shopper reports (worked + didn't work). */
  totalReports: number;
}

function formatCheckedDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "recently";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(d);
}

/**
 * Trust strip for store pages: what Durza actually did to these codes and how
 * shoppers reported back. Presentational — all numbers come from the DB, and
 * empty buckets simply don't render.
 */
export default function TrustStats({ verifiedRecently, avgRate, latestCheck, totalReports }: TrustStatsProps) {
  const items = [
    verifiedRecently > 0
      ? {
          icon: BadgeCheck,
          label: `${verifiedRecently} code${verifiedRecently === 1 ? "" : "s"} verified in the last 30 days`,
        }
      : null,
    latestCheck
      ? {
          icon: Clock3,
          label: `Last checked ${formatCheckedDate(latestCheck)}`,
        }
      : null,
    avgRate !== null
      ? {
          icon: ShieldCheck,
          label: `${avgRate}% of uses reported working`,
        }
      : null,
    totalReports > 0
      ? {
          icon: ThumbsUp,
          label: `Based on ${totalReports} shopper report${totalReports === 1 ? "" : "s"}`,
        }
      : null,
  ].filter((item) => item !== null);

  if (items.length === 0) return null;

  return (
    <div
      aria-label="Durza verification summary"
      className="flex flex-wrap items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-xs font-medium text-emerald-900"
    >
      {items.map((item, index) => {
        const Icon = item!.icon;
        return (
          <span key={index} className="inline-flex items-center gap-1.5">
            <Icon aria-hidden="true" className="h-4 w-4 text-emerald-600" strokeWidth={2} />
            {item!.label}
          </span>
        );
      })}
    </div>
  );
}
