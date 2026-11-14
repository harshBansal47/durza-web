"use client";

import { ArrowUpRight, BadgeCheck, Sparkles } from "lucide-react";

/**
 * A zero-code, direct-affiliate CTA card for editorial buying guides.
 *
 * Used for three offer shapes:
 *  - Amazon Associates: routes the click to the Amazon.in product/search/deal page
 *    with `tag=<amazon tag>&ascsubtag=<subId>` via our tracking helper.
 *  - vCommission (auto-applied, no code): routes through our Amazon coupon path
 *    — link straight to the discounted collection.
 *  - Admitad (Acer / tjzuh.com etc.): routes through getAcerAdmitadLink with
 *    the campaign hash in the URL.
 *
 * Zero invented numbers: `badge` and `headline` come from the DB offer — we
 * never write a fake MRP or a fake strike-through here.
 */
export interface DirectOffer {
  /** Visual variant — controls badge styling. */
  kind: "amazon" | "vcommission" | "admitad";
  /** Short badge text, e.g. "LIVE AMAZON DEAL", "UP TO 60% OFF". */
  badge: string;
  /** Headline/value prop. */
  headline: string;
  eligibility?: string;
  /** The merchant destination URL we open in a new tab. */
  href: string;
  /** Dense one-line label shown inside the button, e.g. "Check Deal on Amazon.in ↗". */
  cta: string;
  /** Sub-id footnote for analytics + inspection. */
  sourceTag?: string;
}

export default function GuideDirectDealCard({ offer }: { offer: DirectOffer }) {
  const palette =
    offer.kind === "amazon"
      ? "border-amber-300 bg-amber-50/70"
      : offer.kind === "admitad"
        ? "border-cyan-300 bg-cyan-50/70"
        : "border-indigo-300 bg-indigo-50/70";

  const badgeKind =
    offer.kind === "amazon" ? "LIVE AMAZON DEAL" : offer.kind === "admitad" ? "ADMITAD DEAL" : "VERIFIED DEAL";

  return (
    <aside
      role="region"
      aria-label={`${badgeKind}: ${offer.headline}`}
      className={`not-prose my-8 overflow-hidden rounded-2xl border ${palette} shadow-sm`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/60 px-5 py-4">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-indigo-700 shadow-sm"
          >
            <BadgeCheck className="h-5 w-5" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              <Sparkles aria-hidden="true" className="h-3 w-3" strokeWidth={2} />
              {offer.badge}
            </span>
            <h3 className="mt-1.5 text-base font-semibold leading-snug text-ink">{offer.headline}</h3>
            {offer.eligibility && (
              <p className="mt-0.5 text-xs leading-5 text-ink-soft">{offer.eligibility}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <p className="max-w-md text-xs leading-5 text-ink-soft">
          {offer.kind === "amazon"
            ? "Amazon Associate link — small commission, price unchanged."
            : "Applied at checkout — no code to remember. Best for users who don't hunt coupons."}
        </p>
        <a
          href={offer.href}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          {offer.cta}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </a>
      </div>
    </aside>
  );
}
