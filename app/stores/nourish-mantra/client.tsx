"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("nourish-mantra", url, sub);
const CONFIDENCE = [
  { title: "Vedic Modernity", detail: "Traditional herbs like Ashwagandha and Gotu Kola fused with clinical actives — Peptides and Niacinamide — in one formula." },
  { title: "Clean Guarantee", detail: "Zero parabens, phthalates, synthetic sulphates, or animal derivatives. PETA-certified cruelty-free and 100% vegan; plastic-neutral packaging." },
  { title: "Stacking Formula", detail: "Catalog discount + GLOW20 (flat 20% off above ₹1,499) + 5% instant UPI deduction = maximum savings on clean beauty." },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
}

export default function NourishMantraClient({ offers, products }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-700 text-white p-8">
        <h1 className="text-3xl font-bold">Nourish Mantra</h1>
        <p className="mt-2 text-sm font-medium text-white">Modern Clean Skincare Rooted in Vedic Wisdom • 100% Vegan &amp; Plastic Neutral</p>
        <p className="mt-1 text-xs font-semibold text-white/90">PETA-Certified Cruelty-Free • No Parabens, Sulphates or Phthalates • Free Delivery Above ₹499</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Clean Formulation Confidence Card</h2>
        <p className="mt-1 text-sm text-ink-soft">Why Nourish Mantra formulas convert — and how to stack the discounts.</p>
        <ol className="mt-4 space-y-3">
          {CONFIDENCE.map((item, i) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{i + 1}</span>
              <span className="text-sm"><span className="font-semibold text-ink">{item.title}: </span><span className="text-ink-soft">{item.detail}</span></span>
            </li>
          ))}
        </ol>
        <a href={link("https://nourishmantra.in/collections/combos", "confidence_card")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Build My Clean Routine</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Nourish Mantra</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Vedic Activism &amp; Clean Concern Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on Nourish Mantra</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does the Nourish Mantra Urban Rani Youth Serum work?</summary><p className="mt-2 text-sm text-ink-soft">Urban Rani Youth Serum blends modern actives like Niacinamide with traditional botanical extracts like Fortunella fruit and Okra. It works as an intensive cellular hydrator and pollution shield, reducing fine lines and evening skin texture without clogging pores.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Can MANTRA15 or GLOW20 be combined with prepaid UPI discounts?</summary><p className="mt-2 text-sm text-ink-soft">Yes. First enter coupon code MANTRA15 or GLOW20 on nourishmantra.in during checkout. When you proceed to the payment gateway and choose UPI or prepaid cards, an extra 5% instant discount is calculated on the remaining balance.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the minimum order threshold for free delivery on Nourish Mantra?</summary><p className="mt-2 text-sm text-ink-soft">Nourish Mantra provides free doorstep delivery across India on all orders of ₹499 or more. A single under-eye gel or serum immediately unlocks free shipping.</p></details>
      </section>
    </div>
  );
}
