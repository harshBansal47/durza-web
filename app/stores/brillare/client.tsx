"use client";

import { useState } from "react";

import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("brillare", url, sub);
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
}

export default function BrillareStorePage({ offers, products }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white p-8">
        <h1 className="text-3xl font-bold">Brillare Science</h1>
        <p className="mt-2 text-sm font-medium text-white">100% Vegan, Zero-Dilution Natural Hair & Skin Formulations</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Verified Offers: Buy 2 Get 20% Off + Free Shipping Above ₹499</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Activate Deal
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Hair & Skin Concern Matcher</h2>
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
              <p className="mt-2 text-lg font-bold text-ink">{p.price}</p>
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
                Get Regimen Deal
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How do I apply the Brillare FLAT20 promo code?</summary>
          <p className="mt-2 text-sm text-ink-soft">Add any 2 items to your basket on the official Brillare site and apply FLAT20 during checkout. If paying online, an extra 5% discount stacks automatically.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How long does one box of Brillare Oil Shots last?</summary>
          <p className="mt-2 text-sm text-ink-soft">Each box contains 8 single-dose vials of 6ml each, designed for a 24-day intensive regimen applying every 3 days.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">What is the minimum order for free shipping on Brillare?</summary>
          <p className="mt-2 text-sm text-ink-soft">Standard doorstep delivery is free on all orders of ₹499 or more.</p>
        </details>
      </section>
    </div>
  );
}
