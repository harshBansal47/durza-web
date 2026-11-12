"use client";

import StoreHero from "@/components/StoreHero";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("hkvitals", url, sub);
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function HkVitalsPage({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="HK Vitals by HealthKart"
        subtitle="Science-Backed Daily Vitamins, Fish Oil & Skin Nutrition"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Cost-Per-Day Pill Counter</h2>
        <p className="mt-2 text-sm text-ink-soft">HK Vitals Multivitamin costs ₹499 for 60 days = Just ~₹8.30/day for complete 100% RDA micronutrient coverage.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on HK Vitals</a>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold text-ink">Nutrition Deficiency & Goal Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((c) => (
            <button key={c} type="button" onClick={() => setConcern(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${concern === c ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <div key={p.name} className="rounded-2xl border border-ledger-line bg-white p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{p.specs}</p>
              <div className="mt-2 flex items-baseline gap-2"><span className="text-lg font-bold text-ink">{p.price}</span><span className="text-sm text-ink-soft line-through">{p.mrp}</span></div>
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on HK Vitals</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Can I stack HKV10 with UPI discount?</summary><p className="mt-2 text-sm text-ink-soft">Yes, apply HKV10 first, then an extra 5% instant discount applies on UPI/card checkout.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Is HK Vitals fish oil heavy-metal safe?</summary><p className="mt-2 text-sm text-ink-soft">Yes, it is molecularly distilled and heavy metal tested.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the free shipping threshold?</summary><p className="mt-2 text-sm text-ink-soft">Free delivery on orders above ₹499.</p></details>
      </section>
    </div>
  );
}
