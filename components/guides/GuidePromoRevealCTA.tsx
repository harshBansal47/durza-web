"use client";

import { useState } from "react";
import { BadgeCheck, Copy, Lock, ArrowUpRight } from "lucide-react";
import { getAcerAdmitadLink } from "@/lib/affiliate";

/**
 * Promo-and-redirect CTA for editorial buying guides.
 *
 * The affiliate attribution story: the user cannot copy-paste the raw code
 * because the visible pill shows •••••• instead of the string. The actual code
 * is recorded in the server-rendered offer data on this page (never the user
 * sees it before clicking). Copying fires `navigator.clipboard.writeText`;
 * the CTA navigates to the Admitad deep link so the click is recorded with a
 * `subid` placement tag. Every click is an affiliate click; just copy is a no-op.
 *
 * No invented discount values: `badge` is rendered only when supplied — fall
 * back to a generic "Verified Admitad Deal" pill. The caller supplies
 * `offerUrl` (already Admitad-safe like `https://store.acer.com/…`).
 */
export interface GuidePromoOffer {
  /** The actual coupon code the shopper will apply at checkout. */
  code: string;
  /** Short badge text used on the badge pill. Falls back to generic. */
  badge?: string;
  /** Short headline used in the title row. */
  headline: string;
  /** Eligibility / min-order line. Rendered as a small caption. */
  eligibility?: string;
  /** The Acer destination — usually a brand collection or search results page. */
  offerUrl: string;
  /** Placement tag for Admitad subid (e.g. "guide_acer_gaming"). */
  subId: string;
}

export default function GuidePromoRevealCTA({ offer }: { offer: GuidePromoOffer }) {
  const [copied, setCopied] = useState(false);

  const onCopyAndGo = async () => {
    try {
      await navigator.clipboard.writeText(offer.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked — still proceed with the navigation so the
      // shopper gets to Acer (they can type the code from the badge).
    }
    const url = getAcerAdmitadLink(offer.offerUrl, offer.code, offer.subId);
    if (url && typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      role="region"
      aria-label={`Admitad offer: ${offer.badge ?? "Admitad deal"}`}
      className="my-8 overflow-hidden rounded-2xl border border-ledger-line bg-white shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/60 px-5 py-4">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
          >
            <BadgeCheck className="h-5 w-5" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              {offer.badge ?? "Admitad deal"}
            </span>
            <h3 className="mt-1 text-base font-semibold leading-snug text-ink">{offer.headline}</h3>
            {offer.eligibility && (
              <p className="mt-1 text-xs leading-5 text-ink-soft">{offer.eligibility}</p>
            )}
          </div>
        </div>
        <span
          aria-label="Code hidden — click to copy"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ledger-line bg-white px-3 py-1.5 text-xs font-mono font-bold text-ink-soft"
        >
          <Lock aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          <span aria-hidden="true">••••••••</span>
          <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-ink-soft">hidden</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <p className="max-w-md text-xs leading-5 text-ink-soft">
          Code reveal reveals on click. Click <strong className="text-ink">Copy Code &amp; Go to Acer</strong> — code goes to your clipboard, one-tap deep link opens Acer with the offer already tracked.
        </p>
        <button
          type="button"
          onClick={onCopyAndGo}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          {copied ? (
            <>
              <BadgeCheck aria-hidden="true" className="h-4 w-4 text-emerald-400" strokeWidth={2.5} />
              Copied! Opening Acer…
            </>
          ) : (
            <>
              <Copy aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              Copy Code &amp; Go to Acer
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </>
          )}
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {copied ? `Promo code ${offer.code} copied to clipboard. Paste it at Acer checkout.` : ""}
      </p>
    </div>
  );
}
