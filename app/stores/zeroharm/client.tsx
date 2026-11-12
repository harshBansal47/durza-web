"use client";

import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("zeroharm", url, sub);
const TECH = [
  { id: "standard", label: "Standard Supplements", points: ["High-heat chemical extraction destroys phytonutrients", "Harsh stomach acid blocks up to 80% of absorption", "Large 1000mg tablets just to compensate for loss", "Bulk dosage increases side-effect risk"] },
  { id: "nano", label: "ZeroHarm Nano-Tech", points: ["Water-based extraction preserves live phytonutrients", "Microscopic lipid spheres bypass stomach acid entirely", "Absorbed directly in the small intestine for 5–10× uptake", "Smaller clean dosages with zero heavy metals or synthetics"] },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function ZeroHarmClient({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [tech, setTech] = useState(TECH[1]);
  const filtered = products.filter((p) => p.tab === concern);
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="ZeroHarm Sciences"
        subtitle="Precision Plant Nutraceuticals • Nano-Formulated for 5x Higher Absorption"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Why Nano-Encapsulation Beats Standard Tablets</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {TECH.map((t) => (
            <button key={t.id} type="button" onClick={() => setTech(t)} className={`rounded-full px-4 py-2 text-sm font-medium ${tech.id === t.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{t.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-4">
          <ul className="list-disc pl-5 text-sm text-ink-soft">
            {tech.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
        </div>
        <a href={link("https://www.zeroharm.in/collections/all-products", "nano_explainer")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Nano-Formulated Nutrition</a>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((o) => (
          <OfferCard
            key={o.code}
            bookmarkId={o.id}
            code={o.code}
            badge={o.badge}
            title={o.title}
            description={o.description}
            ctaHref={link(o.targetUrl, o.subId)}
            expiresAt={o.expiresAt}
          />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Nano-Nutrition &amp; Clinical Concern Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on ZeroHarm</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does ZeroHarm extract Vitamin B12 purely from plants?</summary><p className="mt-2 text-sm text-ink-soft">ZeroHarm derives methylcobalamin from Spirulina and Chlorella through gentle water extraction, then nano-encapsulates it for direct intestinal absorption — no animal derivatives, no synthetic B12.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Why do smaller nano dosages work faster than bulky 1000mg pills?</summary><p className="mt-2 text-sm text-ink-soft">Bioavailability, not milligram weight, drives results. Nano lipid spheres carry plant actives past stomach acid into the small intestine, so your body absorbs far more per tablet than from an unabsorbed bulk dose.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Can I stack NANO25 with prepaid UPI discounts?</summary><p className="mt-2 text-sm text-ink-soft">Yes. Apply NANO25 for flat 25% off 90-day combo courses, then pay via UPI or card for an extra 5% instant deduction on the discounted balance.</p></details>
      </section>
    </div>
  );
}
