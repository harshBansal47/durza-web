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

const REDIRECT_DELAY_MS = 2000;

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

    // Open the tab synchronously inside the click so popup blockers allow it,
    // then point it at the offer after the delay.
    const win = window.open("", "_blank");
    if (win) {
      win.opener = null;
      try {
        win.document.write(
          "<p style='font-family:sans-serif;padding:24px'>Code copied. Opening offer…</p>",
        );
      } catch {
        // Ignore — the tab will simply stay blank until redirected.
      }
    }

    setCopied(true);
    await writeToClipboard(code);

    const target = trackedHref;
    timerRef.current = window.setTimeout(() => {
      if (win && !win.closed) {
        win.location.href = target;
      } else {
        // Popup blocked or closed — fall back to same-tab navigation.
        window.location.href = target;
      }
      setCopied(false);
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

            <a
              href={trackedHref}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-800"
            >
              {ctaLabel ?? "View Offer"}
              <ArrowRight className="h-3 w-3" />
            </a>
          </>
        )}
      </div>
    </article>
  );
}