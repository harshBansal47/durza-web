"use client";

import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("kama-ayurveda", url, sub);
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function KamaAyurvedaPage({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="Kama Ayurveda"
        subtitle="Authentic Ayurvedic Formulations • 100% Natural, Plant-Based Luxury Care"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Luxury Cart Optimization & Sample Unlocking Guide</h2>
        <ul className="mt-3 space-y-1 text-sm text-ink-soft">
          <li>Level 1 (Any Order): 3 Free Handpicked Luxury Mini Sachets/Vials.</li>
          <li>Level 2 (Above ₹1,499): 100% Free Doorstep Delivery.</li>
          <li>Level 3 (Above ₹2,999): Unlock Complimentary Deluxe Gift (Kumkumadi Mini Scrub/Cream).</li>
        </ul>
        <a href={link("https://www.kamaayurveda.com", "luxury_box")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Build My Luxury Box</a>
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
        <h2 className="text-xl font-bold text-ink">Ayurvedic Treatment & Ritual Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Explore Ritual</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I choose my 3 complimentary samples?</summary><p className="mt-2 text-sm text-ink-soft">An interactive sample selector appears at checkout, letting you handpick 3 luxury trial sizes across cleansers, oils, and moisturizers.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Is Kama Kumkumadi Oil suitable for oily or acne-prone skin?</summary><p className="mt-2 text-sm text-ink-soft">Yes, but apply only 2–3 drops onto damp skin and leave on for 30 minutes before wiping with a warm cotton cloth.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the minimum threshold for free shipping?</summary><p className="mt-2 text-sm text-ink-soft">Free express delivery on all domestic orders totaling ₹1,499 or more.</p></details>
      </section>
    </div>
  );
}
