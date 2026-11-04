import { ArrowUpRight, Globe2, WalletCards } from "lucide-react";
import { api } from "@/lib/api";
import type { AffiliateCampaign } from "@/lib/types";

function label(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .split(" ")
    .map((word) => (word.length <= 3 ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1)))
    .join(" ");
}

function hasPayoutDetails(value: unknown): boolean {
  if (value == null || value === "") return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

export default function AffiliateCampaignCard({
  campaign,
}: {
  campaign: AffiliateCampaign;
}) {
  const conversion = [
    campaign.conversion_model ? label(campaign.conversion_model) : null,
    campaign.currency,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="flex h-full flex-col rounded-lg border border-ledger-line bg-white p-5 shadow-sm">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-inkblue">
        Advertiser campaign
      </p>
      <h2 className="mt-2 font-serif text-xl font-bold text-ink">{campaign.merchant_name}</h2>
      <p className="mt-1 text-sm font-medium leading-6 text-ink">{campaign.title}</p>

      {campaign.description ? (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-soft">
          {campaign.description}
        </p>
      ) : null}
      {campaign.kpi ? (
        <p className="mt-3 rounded-md bg-paper-raised px-3 py-2 text-sm leading-5 text-ink-soft">
          <span className="font-medium text-ink">Advertiser KPI:</span> {campaign.kpi}
        </p>
      ) : null}

      <dl className="mt-5 grid gap-3 border-y border-ledger-line py-4 text-sm">
        {conversion ? (
          <div className="flex items-start gap-2">
            <Globe2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-inkblue" />
            <div>
              <dt className="text-xs text-ink-soft">Conversion model · currency</dt>
              <dd className="mt-0.5 font-medium text-ink">{conversion}</dd>
            </div>
          </div>
        ) : null}
        {campaign.countries.length > 0 ? (
          <div className="flex items-start gap-2">
            <Globe2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-inkblue" />
            <div>
              <dt className="text-xs text-ink-soft">Campaign markets</dt>
              <dd className="mt-0.5 font-medium text-ink">{campaign.countries.join(", ")}</dd>
            </div>
          </div>
        ) : null}
        <div className="flex items-start gap-2">
          <WalletCards aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-inkblue" />
          <div>
            <dt className="text-xs text-ink-soft">Publisher compensation</dt>
            <dd className="mt-0.5 font-medium text-ink">
              {hasPayoutDetails(campaign.affiliate_payouts)
                ? "Payout terms supplied by the advertiser"
                : "See advertiser terms"}
            </dd>
          </div>
        </div>
      </dl>

      {campaign.categories.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Campaign categories">
          {campaign.categories.map((category) => (
            <li
              key={category}
              className="rounded-full bg-paper-raised px-2.5 py-1 text-xs text-ink-soft"
            >
              {label(category)}
            </li>
          ))}
        </ul>
      ) : null}

      <a
        href={api.vcommissionCampaignGoUrl(campaign.id, "campaign-catalog")}
        className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-inkblue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inkblue"
      >
        View campaign <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
      </a>
    </article>
  );
}
