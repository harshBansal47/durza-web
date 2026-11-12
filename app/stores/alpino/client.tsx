"use client";

import StoreHero from "@/components/StoreHero";

import { useState } from "react";

import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("alpino", url, sub);

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function AlpinoStorePage({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);

  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="Alpino Health Foods"
        subtitle="The Real Peanut Butter • Zero Palm Oil, Zero Trans Fat & 100% Roasted Peanuts"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Protein-Per-Rupee Stacking Calculator</h2>
        <div className="mt-4 space-y-2 text-sm text-ink-soft">
          <p>Alpino All-Natural 1kg (₹449) delivers 300g pure plant protein → Just ~₹1.49 per gram of clean protein.</p>
          <p>Add 1kg Natural PB (₹449) + 1kg Rolled Oats (₹299) = ₹748. Unlock Free Shipping + Flat 10% with ALPINO10 + 5% UPI savings.</p>
        </div>
        <a href={link("https://alpino.store/collections/combos", "breakfast_stack")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
          Shop Breakfast Stack on Alpino
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Redeem on Alpino
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Diet Goal & Nutrition Matcher</h2>
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
                Get Deal on Alpino
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Why does oil separate on top of Alpino All-Natural Peanut Butter?</summary>
          <p className="mt-2 text-sm text-ink-soft">Oil separation is natural proof that Alpino contains zero hydrogenated vegetable oil, stabilizers, or chemical emulsifiers. The oil on top is 100% natural peanut oil. Simply stir it with a clean spoon before use.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Can coupon code ALPINO10 be combined with prepaid UPI checkout discounts?</summary>
          <p className="mt-2 text-sm text-ink-soft">Yes. First apply coupon code ALPINO10 on alpino.store during checkout. When you select UPI or debit/credit card payment, an additional 5% instant discount is calculated on the remaining balance.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">What is the minimum cart value for free shipping on Alpino?</summary>
          <p className="mt-2 text-sm text-ink-soft">Alpino provides free doorstep shipping on all orders totaling ₹499 or more across India. A single 1kg Dark Chocolate PB or combining 1kg Natural PB with Rolled Oats easily hits this mark.</p>
        </details>
      </section>
    </div>
  );
}
