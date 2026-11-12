"use client";

import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";

import { useState } from "react";

import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("beast-life", url, sub);

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function BeastLifeStorePage({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);

  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="Beast Life"
        subtitle="Fuel the Beast Within • 100% Transparent Sports Nutrition & Heavy Lifts"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Stack & Cost-Per-Scoop Calculator</h2>
        <div className="mt-4 space-y-2 text-sm text-ink-soft">
          <p>Creatine Tub = ₹799 for 83 Servings → Just ₹9.60 per workout session.</p>
          <p>Add Creatine (₹799) to Whey (₹2,399) to unlock Free Shipping + Flat 10% with BEAST10 + Extra 5% UPI savings.</p>
        </div>
        <a href={link("https://beastlife.in/collections/combos", "stack_builder")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
          Build Complete Beast Stack
        </a>
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
        <h2 className="text-xl font-bold text-ink">Training Phase & Nutrition Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setConcern(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${concern === c ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}
            >
              {c}
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
                Get Deal on Beast Life
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How do I verify the authenticity of my Beast Life supplement?</summary>
          <p className="mt-2 text-sm text-ink-soft">Every Beast Life product comes with a scratch-off authentication QR code on the packaging seal. Scan the code to verify batch authenticity, lab testing reports, and manufacturing dates directly on beastlife.in.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Can coupon code BEAST10 be combined with prepaid UPI discounts?</summary>
          <p className="mt-2 text-sm text-ink-soft">Yes. First enter coupon code BEAST10 on beastlife.in during checkout. When you select UPI or debit/credit card payment, an additional 5% instant discount is calculated on the remaining balance.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">What is the minimum spend for free shipping on Beast Life?</summary>
          <p className="mt-2 text-sm text-ink-soft">Beast Life offers free doorstep shipping on all orders totaling ₹999 or more across India. A single tub of Whey Protein or a Pre-Workout + Creatine combo automatically crosses this threshold.</p>
        </details>
      </section>
    </div>
  );
}
