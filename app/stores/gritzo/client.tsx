"use client";

import StoreHero from "@/components/StoreHero";

import { useState } from "react";

import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("gritzo", url, sub);

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function GritzoStorePage({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [stage, setStage] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === stage);

  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="Gritzo"
        subtitle="Personalized SuperMilk for Kids & Teens • 100% Clean Nutrition"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Redeem on Gritzo
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Age & Gender SuperMilk Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStage(s)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${stage === s ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <div key={p.name} className="rounded-2xl border border-ledger-line bg-white p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{p.specs}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-bold text-ink">{p.price}</span>
                <span className="text-sm text-ink-soft line-through">{p.mrp}</span>
              </div>
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
                Get Deal on Gritzo
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How is Gritzo SuperMilk different from traditional malt drinks?</summary>
          <p className="mt-2 text-sm text-ink-soft">Traditional malt drinks contain up to 50%–70% refined sugar and minimal protein. Gritzo SuperMilk contains zero refined sugar, zero preservatives, and provides 6g to 13g of clean, natural milk/whey protein per serving calibrated for specific age groups.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How do I get free shipping on Gritzo orders?</summary>
          <p className="mt-2 text-sm text-ink-soft">Gritzo provides free doorstep shipping on all orders totaling ₹499 or more across India. A single 400g tub or 1kg jar easily meets this threshold.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Can coupon code SUPER10 be applied to 1kg and 2kg value packs?</summary>
          <p className="mt-2 text-sm text-ink-soft">Yes. Code SUPER10 provides an additional 10% discount on top of already-discounted 1kg and 2kg bulk economy jars.</p>
        </details>
      </section>
    </div>
  );
}
