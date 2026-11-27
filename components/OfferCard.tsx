"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy, Ticket } from "lucide-react";
import { CardSaveButton } from "./CardSaveButton";
import { useTrackedHref } from "@/lib/useTrackedHref";
import OfferBrandMark, { type OfferBrand } from "./OfferBrandMark";

export interface OfferCardProps {
  /** Coupon id — enables the bookmark save button when provided. */
  bookmarkId?: string;
  /** Code to copy, or null/undefined for auto-applied deals. Never rendered. */
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

const REDIRECT_DELAY_MS = 3000;

async function writeToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // Fall through to legacy copy.
  }
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  } catch {
    // Clipboard fully blocked — still continue to the offer.
  }
}

/**
 * The high-density store offer card shared by the generic store template and
 * every custom brand page.
 *
 * Coded offers: the code is never displayed. The user clicks "Copy Code", the
 * code is copied, and after 2 seconds the offer opens via the tracked link.
 * No-code offers: a plain "View Offer" link. All CTAs are nofollow sponsored.
 */
export default function OfferCard({
  bookmarkId,
  code,
  title,
  ctaHref,
  ctaLabel,
  autoSuppressed = false,
  brand,
}: OfferCardProps) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [opening, setOpening] = useState(false);
  const timerRef = useRef<number | null>(null);
  const trackedHref = useTrackedHref(ctaHref);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  if (autoSuppressed) return null;
  const isCoded = Boolean(code);

  async function copyAndRedirect() {
    if (!code || copied) return;

    setRevealed(true);
    setCopied(true);
    setPopupBlocked(false);
    await writeToClipboard(code);

    const target = trackedHref;
    timerRef.current = window.setTimeout(() => {
      const win = window.open(target, "_blank", "noopener,noreferrer");
      if (!win) {
        // Popup blocked — surface a manual link instead of navigating away.
        setPopupBlocked(true);
      }
      setCopied(false);
    }, REDIRECT_DELAY_MS);
  }

    async function openOffer() {
    if (opening) return;
    setOpening(true);
    setPopupBlocked(false);
    timerRef.current = window.setTimeout(() => {
      const win = window.open(trackedHref, "_blank", "noopener,noreferrer");
      if (!win) setPopupBlocked(true);
      setOpening(false);
    }, REDIRECT_DELAY_MS);
  }

  return (
    <article className="group flex h-full w-full sm:max-w-[300px] flex-col rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm">
      {/* Brand + Save */}
      <div className="flex items-start justify-between">
        {brand ? <OfferBrandMark brand={brand} /> : <span />}

        {bookmarkId ? (
          <CardSaveButton couponId={bookmarkId} compact />
        ) : null}
      </div>

      {/* Title */}
      <h3 className="mt-1.5 text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
        {title}
      </h3>

      {isCoded && revealed ? (
        <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-dashed border-amber-300 bg-amber-50 px-3 py-2">
          <code className="font-mono text-sm font-semibold text-amber-900">{code}</code>
          {popupBlocked ? (
            <a
              href={trackedHref}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="text-xs font-semibold text-amber-900 underline"
            >
              Open offer
            </a>
          ) : (
            <span className="text-xs font-medium text-amber-700">Copied!</span>
          )}
        </div>
      ) : null}

      {/* Actions */}
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
        {isCoded ? (
          <>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700">
              <Ticket className="h-3 w-3" aria-hidden="true" />
              Coupon code
            </span>

            <button
              type="button"
              onClick={copyAndRedirect}
              disabled={copied}
              aria-live="polite"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-default disabled:bg-emerald-600"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied! Opening…
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  {ctaLabel ?? "Copy Code"}
                </>
              )}
            </button>
          </>
        ) : (
          <>
            <span className="text-[10px] font-medium text-emerald-700">
              Offer page
            </span>

            <button
              type="button"
              onClick={() => void openOffer()}
              disabled={opening}
              className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-default disabled:bg-emerald-600"
            >
              {opening ? (
                <>
                  <Check className="h-3 w-3" />
                  Opening…
                </>
              ) : (
                <>
                  {ctaLabel ?? "View Offer"}
                  <ArrowRight className="h-3 w-3" />
                </>
              )}
            </button>
            {popupBlocked ? (
              <a
                href={trackedHref}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="text-xs font-semibold text-emerald-700 underline"
              >
                Open offer
              </a>
            ) : null}
          </>
        )}
      </div>
    </article>
  );
}