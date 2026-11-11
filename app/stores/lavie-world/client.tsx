"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("lavie-world", url, sub);
const CARRY = [
  { id: "laptop", label: "14\" Laptop + Charger", result: "Work Tote", detail: "You need the Horsebit Structured Large Work Tote (₹1,399) — padded sleeve fits a 14\" laptop with room for a charger and documents.", math: "Base 65% OFF + extra 10% with LAVIE10 + 5% UPI ≈ ₹1,069 final.", url: "https://www.lavieworld.com/collections/tote-bags", sub: "capacity_laptop" },
  { id: "everyday", label: "Phone + Makeup + Keys", result: "Dome Satchel", detail: "The Betula Medium Dome Satchel (₹1,199) swallows a phone, makeup pouch, keys and a cardholder with a structured silhouette.", math: "66% OFF + extra 10% with LAVIE10 + 5% UPI ≈ ₹916 final.", url: "https://www.lavieworld.com/collections/satchel-bags", sub: "capacity_everyday" },
  { id: "minimal", label: "Phone + Cards Only", result: "Quilted Sling", detail: "The Ushawu Quilted Crossbody Sling (₹799) fits a 6.7\" phone, keys and a cardholder hands-free.", math: "64% OFF + extra 10% with LAVIE10 + 5% UPI ≈ ₹610 final.", url: "https://www.lavieworld.com/collections/sling-bags", sub: "capacity_minimal" },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
}

export default function LavieWorldClient({ offers, products }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [carry, setCarry] = useState(CARRY[0]);
  const filtered = products.filter((p) => p.tab === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-fuchsia-700 to-pink-500 text-white p-8">
        <h1 className="text-3xl font-bold">Lavie World</h1>
        <p className="mt-2 text-sm font-medium text-white">Fickle Is Fun • Designer Handbags, Work Totes &amp; Festive Clutches</p>
        <p className="mt-1 text-xs font-semibold text-white/90">6-Month Manufacturer Warranty on Zips, Hardware &amp; Stitching • Free Shipping Above ₹499</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">What Fits Inside? — Capacity Guide</h2>
        <p className="mt-1 text-sm text-ink-soft">Select your daily carry and we will surface the exact bag for it.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {CARRY.map((c) => (
            <button key={c.id} type="button" onClick={() => setCarry(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${carry.id === c.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">Recommended: {carry.result}</p>
          <p className="mt-1 text-sm text-ink-soft">{carry.detail}</p>
          <p className="mt-2 text-xs font-medium text-ink">Stacking math: {carry.math}</p>
        </div>
        <a href={link(carry.url, carry.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop {carry.result} on Lavie</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Lavie</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Capacity &amp; Occasion Handbag Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Shop on Lavie</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What does the 6-month manufacturer warranty cover?</summary><p className="mt-2 text-sm text-ink-soft">Lavie covers manufacturing defects in zips, hardware and stitching for 6 months from delivery. Register your invoice on lavieworld.com to claim repairs or replacement.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I clean my faux leather handbag?</summary><p className="mt-2 text-sm text-ink-soft">Wipe with a soft, dry or slightly damp microfibre cloth. Avoid harsh detergents and direct sunlight; use a mild soap solution for stubborn spots and air-dry naturally.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Can I stack LAVIE10 with the 5% UPI discount?</summary><p className="mt-2 text-sm text-ink-soft">Yes. Apply LAVIE10 at checkout first, then pay via UPI or card for an extra 5% instant discount on the remaining balance.</p></details>
      </section>
    </div>
  );
}
