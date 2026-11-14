"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Lock, ShoppingBag } from "lucide-react";
import type { StaticGuideCta } from "@/data/store-guides";
import {
  getAffiliateLink,
  getAcerAdmitadLink,
  getAmazonAffiliateLink,
  ADMITAD_ACER_CAMPAIGNS,
  VCOMMISSION_CAMPAIGNS,
  type AffiliateBrand,
} from "@/lib/affiliate";

/**
 * The one deal CTA on every static buying guide.
 *
 * Code-backed offers start masked — `••••••` — so the raw code is never in the
 * initial HTML. First click copies the exact code and opens the tracked
 * affiliate destination in a new tab. Amazon offers have no code to copy and
 * open directly. All routes are tracked: vCommission (`p1=<subId>`), Admitad
 * (`subid=<subId>`), Amazon Associates (`tag` + `ascsubtag=<subId>`).
 */
export default function GuideCodeCta({
  storeSlug,
  storeName,
  cta,
}: {
  storeSlug: string;
  storeName: string;
  cta: StaticGuideCta;
}) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "failed">("idle");

  const href = trackedUrl(storeSlug, cta);

  const copyAndGo = async () => {
    if (cta.kind === "code") {
      try {
        await navigator.clipboard.writeText(cta.code);
      } catch {
        // Clipboard can fail on insecure contexts — the user still gets the tap
        // destination; they can copy the code from the toast that appears.
        setStatus("failed");
      }
      setCopied(true);
    }
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  };

  const isCode = cta.kind === "code";
  const ariaLabel = isCode
    ? `Copy code and go to ${storeName}`
    : `Open the tracked link for ${storeName}`;

  return (
    <aside
      role="region"
      aria-label={`${cta.badge} — ${storeName}`}
      className="not-prose my-8 overflow-hidden rounded-2xl border border-slate-900 bg-slate-900 text-white shadow-sm"
    >
      <div className="flex flex-wrap items-center gap-4 px-5 py-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-400">
          {isCode ? (
            <Lock aria-hidden="true" className="h-6 w-6 text-ink" strokeWidth={2} />
          ) : (
            <ShoppingBag aria-hidden="true" className="h-6 w-6 text-ink" strokeWidth={2} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400">
            Live {storeName} {isCode ? "coupon" : "deal"}
          </p>
          <p className="mt-1 text-lg font-extrabold leading-snug text-white">{cta.headline}</p>
          <p className="mt-1 text-xs leading-5 text-slate-300">{cta.eligibility}</p>
        </div>

        {isCode && (
          <code
            aria-hidden="true"
            className="hidden max-w-[9rem] select-none items-center justify-center whitespace-nowrap rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 font-mono text-base font-semibold tracking-[0.35em] text-slate-400 sm:inline-flex"
          >
            ••••••
          </code>
        )}

        <button
          type="button"
          onClick={() => void copyAndGo()}
          aria-label={ariaLabel}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          {copied ? (
            <>
              <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
              Copied — open {storeName}
            </>
          ) : (
            <>
              {isCode ? "Copy Code & Go" : "Unlock Deal"} — {storeName}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </>
          )}
        </button>
      </div>

      <p className="border-t border-slate-800 px-5 py-2 text-[10px] uppercase tracking-wider text-slate-400">
        {copied && isCode
          ? `Promo code copied! Paste it at ${storeName} checkout.`
          : "Durza may earn a small commission. Opens in a new tab."}
      </p>
    </aside>
  );
}

/** Build the tracked href for this store/CTA combo — code decides the network. */
function trackedUrl(storeSlug: string, cta: StaticGuideCta): string {
  const target = cta.targetUrl;
  if (cta.kind === "amazon") {
    return getAmazonAffiliateLink(target, cta.subId);
  }
  if (cta.kind === "admitad" || (cta.kind === "code" && ADMITAD_ACER_CAMPAIGNS[cta.code.toUpperCase()])) {
    const code = cta.kind === "code" ? cta.code : "";
    return (
      getAcerAdmitadLink(target, code, cta.subId) ??
      `/go/${encodeURIComponent(storeSlug)}?src=guide&sub=${encodeURIComponent(cta.subId)}`
    );
  }
  if (cta.kind === "code" || cta.kind === "vcommission_auto") {
    const brand = storeSlug in VCOMMISSION_CAMPAIGNS ? (storeSlug as AffiliateBrand) : undefined;
    if (brand) return getAffiliateLink(brand, target, cta.subId);
  }
  // Marketplaces & stores without a direct vCommission mapping route through
  // the backend /go redirect, which attribution-tracks clicks server-side.
  return `/go/${encodeURIComponent(storeSlug)}?src=guide&sub=${encodeURIComponent(cta.subId)}`;
}
