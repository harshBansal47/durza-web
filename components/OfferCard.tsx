"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { CardSaveButton } from "./CardSaveButton";
import OfferEvidence from "./OfferEvidence";
import { offerTypeLabel } from "@/lib/offer-presentation";
import { useTrackedHref } from "@/lib/useTrackedHref";
import OfferBrandMark, { type OfferBrand } from "./OfferBrandMark";

export interface OfferCardProps {
  /** Coupon id — enables the bookmark save button when provided. */
  bookmarkId?: string;
  /** Code to reveal, or null/undefined for auto-applied deals. */
  code?: string | null;
  /** Short marketing badge from the DB (e.g. "SITEWIDE EXTRA", "APPLIANCE SAVER"). */
  badge?: string | null;
  title: string;
  description?: string | null;
  /** Pre-resolved, already-tracked destination (/go/{id} or affiliate tracker). */
  ctaHref: string;
  ctaLabel?: string;
  /** Live verifier failure count — when ≥ 2 the card is auto-hidden. */
  autoSuppressed?: boolean;
  /** ISO date; renders a muted "Ends in Nd" pill when inside 7 days. */
  expiresAt?: string | null;
  /** Override the discount-badge tone explicitly when caller knows it. */
  badgeTone?: "amber" | "emerald";
  /**
   * Brand identity for grids that mix stores (homepage explorer, deal feeds).
   * Omit on single-brand store pages where the page itself already names the store.
   */
  brand?: OfferBrand;
  /** Explicit type label from a CouponPublic row, when the caller has one. */
  typeLabelOverride?: string;
  /** Rendered only when a real last-checked date exists. */
  lastChecked?: string | null;
}

function daysUntil(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const diff = Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
  return Number.isFinite(diff) ? diff : null;
}

/**
 * The high-density store offer card shared by the generic store template and
 * every custom brand page. Coded offers get a dashed copy box + "Use Code";
 * no-code offers are shown as offer pages with a clear "View Offer" CTA. All CTAs
 * are nofollow sponsored noopener noreferrer.
 */
export default function OfferCard({
  bookmarkId,
  code,
  badge,
  title,
  description,
  ctaHref,
  ctaLabel,
  autoSuppressed = false,
  expiresAt,
  badgeTone,
  brand,
  typeLabelOverride,
  lastChecked,
}: OfferCardProps) {
  const [copied, setCopied] = useState(false);
  const trackedHref = useTrackedHref(ctaHref);
  if (autoSuppressed) return null;
  const isCoded = Boolean(code);
  const tone = badgeTone ?? (isCoded ? "amber" : "emerald");
  const days = daysUntil(expiresAt);
  const expiringSoon = days !== null && days >= 0 && days <= 7;

  const toneClasses =
    tone === "amber"
      ? "border-amber-200/70 bg-amber-50 text-amber-800"
      : "border-emerald-200/70 bg-emerald-50 text-emerald-700";

  async function copyCode() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked — leave the button in its default state.
    }
  }

  return (
    
<article className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm">

  {/* Brand + Save */}
  <div className="flex items-center justify-between">
    {brand ? <OfferBrandMark brand={brand} /> : <span />}

    {bookmarkId ? (
      <CardSaveButton couponId={bookmarkId} compact />
    ) : null}
  </div>

  {/* Metadata */}
  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
    <OfferEvidence
      typeLabel={typeLabelOverride ?? (isCoded
        ? offerTypeLabel("coupon_code")
        : offerTypeLabel("no_code_deal"))}
      lastChecked={lastChecked}
    />

    <span className={`rounded-md border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${toneClasses}`}>
      {badge ?? (isCoded ? "OFFER" : "SITEWIDE DEAL")}
    </span>

    {expiringSoon ? (
      <span className="text-[10px] text-slate-400">
        Ends in {days}d
      </span>
    ) : null}
  </div>

  {/* Title */}
  <h3 className="mt-1.5 text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
    {title}
  </h3>

  {description ? (
    <p className="mt-1 line-clamp-1 text-[11px] leading-snug text-slate-500">
      {description}
    </p>
  ) : null}

  {/* Actions */}
  <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-slate-100 pt-2">

    {isCoded ? (
      <button
        type="button"
        onClick={copyCode}
        aria-label={copied ? "Code copied" : `Copy code ${code}`}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-2 py-1.5 font-mono text-[10px] font-bold text-slate-800"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-emerald-600" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" />
            {code}
          </>
        )}
      </button>
    ) : (
      <span className="text-[10px] font-medium text-emerald-700">
        Offer page
      </span>
    )}

    <a
      href={trackedHref}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-800"
    >
      {ctaLabel ?? (isCoded ? "Use Code" : "View Offer")}
      {isCoded ? (
        <ArrowUpRight className="h-3 w-3" />
      ) : (
        <ArrowRight className="h-3 w-3" />
      )}
    </a>
  </div>
</article>

  );
}
