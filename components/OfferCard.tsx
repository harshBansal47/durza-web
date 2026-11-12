"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy, Zap } from "lucide-react";
import { CardSaveButton } from "./CardSaveButton";

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
  /** Show the subtle "✓ Verified" tag. Defaults to hidden until data backs it. */
  verified?: boolean;
  /** ISO date; renders a muted "Ends in Nd" pill when inside 7 days. */
  expiresAt?: string | null;
  /** Override the discount-badge tone explicitly when caller knows it. */
  badgeTone?: "amber" | "emerald";
}

function daysUntil(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const diff = Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
  return Number.isFinite(diff) ? diff : null;
}

/**
 * The high-density store offer card shared by the generic store template and
 * every custom brand page. Coded offers get a dashed copy box + "Use Code";
 * auto-applied deals get an "Auto-applied" status + "Activate Deal". All CTAs
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
  verified = false,
  expiresAt,
  badgeTone,
}: OfferCardProps) {
  const [copied, setCopied] = useState(false);
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
    <article className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:border-slate-300 hover:shadow-md">
      {/* Top row — discount anchor pill + verified tag, bookmark on the right */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${toneClasses}`}
          >
            {badge ?? (isCoded ? "OFFER" : "SITEWIDE DEAL")}
          </span>
          {verified ? <span className="text-[11px] font-medium text-slate-400">✓ Verified</span> : null}
          {expiringSoon ? (
            <span className="hidden text-[11px] font-medium text-slate-400 sm:inline">
              · ends in {days}d
            </span>
          ) : null}
        </div>
        {bookmarkId ? (
          <CardSaveButton couponId={bookmarkId} compact />
        ) : (
          <span aria-hidden="true" className="h-8 w-8" />
        )}
      </div>

      {/* Title + eligibility context */}
      <div className="min-w-0">
        <h3 className="text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
          {title}
        </h3>
        {description ? (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">{description}</p>
        ) : null}
      </div>

      {/* Bottom action bar — split code box + compact CTA */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-3.5">
        {isCoded ? (
          <button
            type="button"
            onClick={copyCode}
            aria-label={copied ? "Code copied" : `Copy code ${code}`}
            title="Copy code"
            className="inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-3 py-1.5 font-mono text-xs font-bold text-slate-800 transition-colors hover:border-slate-400"
          >
            {copied ? (
              <>
                <Check aria-hidden="true" className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy aria-hidden="true" className="h-3.5 w-3.5 text-slate-500" strokeWidth={2} />
                {code}
              </>
            )}
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            <Zap aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
            Auto-applied at checkout
          </span>
        )}

        <a
          href={ctaHref}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800"
        >
          {ctaLabel ?? (isCoded ? "Use Code" : "Activate Deal")}
          {isCoded ? (
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          ) : (
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          )}
        </a>
      </div>
    </article>
  );
}
