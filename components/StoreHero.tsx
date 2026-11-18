import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import StoreShareButton from "./StoreShareButton";

export interface StoreHeroPerk {
  label: string;
  value: string;
}

export interface StoreHeroProps {
  /** Display name rendered in the H1, e.g. "Kapiva Ayurveda". */
  name: string;
  /** Full H1 override — e.g. "HealthKart Coupons & Offers". Defaults to "{name} Coupons, Deals & Smart Savings". */
  heading?: string;
  /** Advertiser domain for the pill, e.g. "kapiva.in". Falls back to hidden. */
  domain?: string | null;
  /** One-line value proposition under the title. */
  subtitle: string;
  /** Brand logo image (square-ish works best). Falls back to a monogram card. */
  heroImageUrl?: string | null;
  /** Live, verified offer count for the green pill. Falls back to generic copy. */
  offerCount?: number | null;
  /** Affiliate click-through — must be nofollow sponsored (+ noreferrer). Omitted when the store has no usable site. */
  ctaHref?: string;
  ctaLabel?: string;
  ctaTrackingId?: string;
  /** Hide the offer/update indicators when this page has no live status to report. */
  showStatus?: boolean;
  /** Three quick-scan highlights for the footer strip. Derived from offers when not passed. */
  perks?: [StoreHeroPerk, StoreHeroPerk, StoreHeroPerk];
  /** Coded offers for the store — used to derive perks when perks is not passed. */
  offers?: ReadonlyArray<{ code: string | null; title?: string | null }>;
}

function monogram(name: string): string {
  const words = name.replace(/[^a-zA-Z0-9 .]/g, " ").trim().split(/\s+/).filter(Boolean);
  const picks = words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "");
  return picks.join("") || name.slice(0, 2).toUpperCase();
}

function thresholdOf(title: string | null): string | null {
  if (!title) return null;
  const match = title.match(/₹\s?[\d,]+/) ?? title.match(/Rs\.?\s?[\d,]+/i);
  return match ? match[0].replace(/\s+/g, "") : null;
}

/**
 * Derives the three footer perks straight from the store's coded offers, so the
 * strip always reflects live DB data: top code, free-shipping threshold, and the
 * detected payment/prepaid offer code when available.
 */
export function deriveStoreHeroPerks(offers: ReadonlyArray<{ code: string | null; title?: string | null }> | undefined): [StoreHeroPerk, StoreHeroPerk, StoreHeroPerk] {
  const top = offers?.[0];
  const freeShip = offers?.find((o) => /free/i.test(o.title ?? "") || o.code?.toUpperCase() === "FREESHIP");
  const prepaid = offers?.find((o) => /EXTRA5|PREPAID|UPI/i.test(o.code ?? ""));
  const freeShipValue = thresholdOf(freeShip?.title ?? null);
  return [
    { label: "Top Code", value: top?.code ?? "Welcome10" },
    { label: "Free Shipping", value: freeShipValue ? `Above ${freeShipValue}` : "On eligible orders" },
    { label: "Payment Offers", value: prepaid?.code ?? "Check at checkout" },
  ];
}

/**
 * Modern light-mode store header — replaces the old navy banner everywhere.
 * All outbound CTAs are nofollow sponsored. The share control is the only
 * interactive part (see StoreShareButton).
 */
export default function StoreHero({
  name,
  heading,
  domain,
  subtitle,
  heroImageUrl,
  offerCount,
  ctaHref,
  ctaLabel,
  ctaTrackingId,
  showStatus = true,
  perks,
  offers,
}: StoreHeroProps) {
  const resolvedPerks = perks ?? deriveStoreHeroPerks(offers);
  const countLabel = typeof offerCount === "number" && offerCount > 0 ? `${offerCount} Offers` : "Offers";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-6">
          {/* Brand logo card */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-xs md:h-20 md:w-20">
            {heroImageUrl ? (
              <Image
                src={heroImageUrl}
                alt={`${name} logo`}
                width={96}
                height={96}
                priority
                className="h-full w-full object-contain"
              />
            ) : (
              <span aria-hidden="true" className="select-none text-2xl font-bold tracking-tight text-slate-400">
                {monogram(name)}
              </span>
            )}
          </div>

          {/* Title + trust signals */}
          <div className="min-w-0 flex-1">
            <h1 className="font-sans text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {heading ?? `${name} Coupons, Deals & Smart Savings`}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-600 md:text-base">{subtitle}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium">
              {showStatus ? (
                <>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50 px-2.5 py-1 text-emerald-700">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    {countLabel}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">Updated Today</span>
                </>
              ) : null}
              {domain ? (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{domain}</span>
              ) : null}
            </div>
          </div>

          {/* Action cluster */}
          <div className="flex shrink-0 items-center gap-2.5 self-start md:self-center">
            {ctaHref && (
              <a
                href={ctaHref}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                data-affiliate-click={ctaTrackingId}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-slate-800"
              >
                {ctaLabel ?? `Go to ${name}`}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </a>
            )}
            <StoreShareButton title={`${name} deals on Durza`} />
          </div>
        </div>
      </div>

      {/* Quick perks bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/70 px-5 py-3 text-xs text-slate-600 sm:px-7">
        {resolvedPerks.map((perk) => (
          <div key={perk.label} className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{perk.label}</span>
            <span className="font-semibold text-slate-800">{perk.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
