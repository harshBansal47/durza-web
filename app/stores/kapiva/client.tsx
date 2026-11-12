"use client";

import StoreHero from "@/components/StoreHero";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("kapiva", url, sub);
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function KapivaPage({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="Kapiva Ayurveda"
        subtitle="Modern Ayurveda for Everyday Living • Clinically Validated Herbal Nutrition"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Cost-Per-Day Habit Calculator</h2>
        <p className="mt-2 text-sm text-ink-soft">Kapiva Himalayan Shilajit (20g @ ₹1,099) gives 60 servings = Just ~₹18/day for pure cellular energy & endurance.</p>
        <p className="mt-2 text-sm text-ink-soft">Combine 1 Shilajit Resin (₹1,099) + 1 Dia Free Juice (₹549) = ₹1,648. Unlock Free Shipping + Flat 15% with STAMINA15 + 5% UPI savings.</p>
        <a href={link("https://kapiva.in", "health_routine")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Start My Health Routine</a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Kapiva</a>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold text-ink">Health Goal & Herbal Nutrition Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on Kapiva</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I verify the purity of Kapiva Shilajit Resin?</summary><p className="mt-2 text-sm text-ink-soft">Every jar comes with a batch-specific NABL lab test certificate verifying {">"}60% Fulvic Acid and heavy metal levels below FSSAI limits.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How should Kapiva juices be consumed for best results?</summary><p className="mt-2 text-sm text-ink-soft">Mix 30ml of juice in room-temperature water and consume twice daily on an empty stomach, 30 minutes before breakfast and dinner.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the minimum order for free shipping on Kapiva?</summary><p className="mt-2 text-sm text-ink-soft">Free doorstep delivery across India on all orders of ₹499 or more.</p></details>
      </section>
    </div>
  );
}
