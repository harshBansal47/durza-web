"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, TicketPercent } from "lucide-react";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";

/**
 * Deal & stacking router — replaces static product catalog cards on custom brand pages.
 *
 * Every card:
 *   1. opens with a savings badge sourced from the live offer (never invented);
 *   2. names the use-case recommendation (the tab bucket) for the need;
 *   3. shows the promo code and checkout guidance based on available offer details;
 *   4. CTAs straight to the merchant's collection through a tracked destination link.
 */

interface DealRouterProps {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  tabs: string[];
  concern: string;
  onConcern: (concern: string) => void;
  title: string;
  eyebrow?: string;
  storeName: string;
  /** Optional display name for copy (defaults to storeName). */
  storeDisplayName?: string;
  /** Optional CTA label per product (overrides default). */
  getCtaLabel?: (product: StoreProductCard, concern: string, storeDisplayName: string) => string;
  /** Optional href transform per product (e.g. tracking wrap). */
  getHref?: (product: StoreProductCard, index: number) => string;
  /** Number of columns in the card grid. */
  columns?: 2 | 3 | 4;
}

/** Pick the single strongest offer to headline: percentage beats flat ₹. */
function bestOffer(offers: StoreOfferCard[]): StoreOfferCard | null {
  if (offers.length === 0) return null;
  const pct = offers.filter((o) => /%/.test(o.badge));
  if (pct.length) return pct.slice().sort((a, b) => Number.parseInt(b.badge) - Number.parseInt(a.badge))[0];
  const flat = offers.filter((o) => /₹\s*\d+/.test(o.badge));
  if (flat.length) return flat.slice().sort((a, b) => Number.parseInt(b.badge.replace(/[^\d]/g, "")) - Number.parseInt(a.badge.replace(/[^\d]/g, "")))[0];
  return offers[0];
}

function CopyCodePill({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        void navigator.clipboard.writeText(code);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }}
      aria-label={copied ? `Code ${code} copied` : `Copy code ${code}`}
      title={copied ? `✓ ${code} copied` : `Click to copy ${code}`}
      className="inline-flex min-h-8 cursor-pointer items-center gap-1 rounded border border-verified-ink/30 bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-verified-ink transition-colors hover:border-verified-ink hover:bg-verified-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-verified-ink"
    >
      {copied ? (
        <>
          <Check aria-hidden="true" className="h-3 w-3" strokeWidth={2.5} />
          <span>✓ Copied</span>
        </>
      ) : (
        <>
          <Copy aria-hidden="true" className="h-3 w-3" strokeWidth={2} />
          <span>{code}</span>
        </>
      )}
    </button>
  );
}

/** One-line human description of the use case for a product. */
function describeUseCase(product: StoreProductCard): string {
  // Preference order: explicit spec from the catalogue, else a fallback built from the name.
  if (product.specs) return product.specs;
  return `Best fit from the ${product.tab} range.`;
}

export default function ProductDealRouter({
  offers,
  products,
  tabs,
  concern,
  onConcern,
  title,
  eyebrow,
  storeName,
  storeDisplayName,
  getCtaLabel,
  getHref,
  columns = 2,
}: DealRouterProps) {
  const promo = bestOffer(offers);
  const displayName = storeDisplayName ?? storeName;
  const gridClass =
    columns === 4
      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      : columns === 3
        ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        : "grid gap-4 sm:grid-cols-2";

  return (
    <section id="tool" aria-labelledby="deal-router-heading" className="scroll-mt-24 rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="font-mono text-[10px] uppercase tracking-widest text-inkblue">{eyebrow}</p>
          ) : null}
          <h2 id="deal-router-heading" className="mt-1 text-lg font-bold text-ink">{title}</h2>
          <p className="mt-0.5 text-xs text-ink-soft">
            Use-case picks from {displayName}&apos;s live catalogue. Prices change on the merchant side; the badge and code are the ones we know are live today.
          </p>
        </div>
        {promo && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-verified-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-verified-ink">
            <TicketPercent aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
            {promo.badge}
          </span>
        )}
      </div>

      {tabs.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Shop by need">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={concern === t}
              type="button"
              onClick={() => onConcern(t)}
              className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition ${
                concern === t ? "bg-ink text-white" : "bg-white text-ink-soft ring-1 ring-ledger-line hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className={`mt-5 ${gridClass}`}>
        {products.length === 0 ? (
          <p className="col-span-full rounded-xl border border-ledger-line bg-paper-sunken px-4 py-6 text-center text-sm text-ink-soft">
            Nothing in this bucket right now — switch tabs or look at the coupons above.
          </p>
        ) : (
          products.map((p, idx) => {
            const href = getHref ? getHref(p, idx) : p.targetUrl;
            const defaultCta = `Shop ${p.name} ↗`;
            const cta = getCtaLabel ? getCtaLabel(p, concern, displayName) : defaultCta;
            return (
            <div
              key={`${p.name}-${p.targetUrl}-${idx}`}
              className="group flex h-full flex-col rounded-2xl border border-ledger-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-inkblue hover:shadow-sm"
            >
              {/* 1 · Discount anchor header — badge from the DB, never invented */}
              <div className="flex flex-wrap items-center gap-2">
                {promo ? (
                  <span className="inline-flex items-center rounded-md bg-verified-soft px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-verified-ink">
                    {promo.badge}
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-md bg-verified-soft px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-verified-ink">
                    SALE
                  </span>
                )}
                {promo?.code && (
                  <span className="inline-flex items-center rounded-md border border-verified-ink/30 bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-verified-ink">
                    {promo.code}
                  </span>
                )}
              </div>

              {/* 2 · Use-case recommendation */}
              <h3 className="mt-2 text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-inkblue">
                {p.name}
              </h3>
              <p className="mt-0.5 line-clamp-2 text-xs leading-4 text-ink-soft">{describeUseCase(p)}</p>

              {/* 3 · One-line checkout stacking tip */}
              <div className="mt-3 rounded-lg bg-paper-sunken/70 px-3 py-2 text-[11px] leading-snug text-ink-soft">
                <span className="font-semibold text-ink">Checkout stack:</span> collection markdown + code{" "}
                {promo?.code ? <CopyCodePill code={promo.code} /> : <span className="font-mono font-bold text-ink">SALE</span>}
                {promo?.description ? (
                  <span className="text-ink-soft"> ({promo.description})</span>
                ) : null}
              </div>
              <p className="mt-1.5 text-[10px] text-ink-soft">
                Min-cart rules from {displayName} apply. Code auto-validated at checkout — if the collection isn&apos;t live, the next tab below is.
              </p>

              {/* 4 · Deep link CTA — merchant decides pricing */}
              <a
                href={href}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                aria-label={cta.replace(/\s*↗\s*$/, "")}
                className="mt-auto inline-flex min-h-11 items-center justify-center gap-1 rounded-xl bg-ink px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-slate-800"
              >
                {cta}
                {!/↗/.test(cta) && <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />}
              </a>
            </div>
            );
          })
        )}
      </div>

      <p className="mt-3 text-[10px] text-ink-soft">
        Live pricing on {displayName} — refreshed at checkout. The badge and code above are the ones currently running on the merchant site.
      </p>
    </section>
  );
}
