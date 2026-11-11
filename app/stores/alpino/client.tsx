"use client";

import { useState } from "react";

const TRACK = "https://track.vcommission.com/click?campaign_id=13512&pub_id=133499";
function link(url: string, subId: string) {
  return `${TRACK}&sub1=${subId}&url=${encodeURIComponent(url)}`;
}

const OFFERS = [
  { code: "ALPINO10", badge: "SITEWIDE EXTRA", title: "Extra 10% OFF on All Peanut Butters & Oats", desc: "Valid on all 1kg, 2.5kg value tubs, high-protein muesli, and chocolate spreads.", url: "https://alpino.store/collections/all", sub: "alpino10" },
  { code: "BULK20", badge: "VALUE JUMBO", title: "Flat 20% OFF on 2.5 kg Mega Saver Tubs", desc: "Maximum savings for regular daily gym-goers and athletes.", url: "https://alpino.store/collections/peanut-butter", sub: "bulk20" },
  { code: "EXTRA5", badge: "PREPAID COMBO", title: "Extra 5% Instant OFF on UPI Checkout", desc: "Automatically deducted on prepaid orders.", url: "https://alpino.store", sub: "extra5" },
  { code: "FREESHIP", badge: "SHIPPING PERK", title: "Free Nationwide Shipping Above ₹499", desc: "Standard delivery fee waived above ₹499.", url: "https://alpino.store", sub: "freeship" },
];

const CONCERNS = ["100% Pure Natural (Zero Sugar)", "High-Protein Super Spreads", "Rolled Oats & Superfoods", "Guilt-Free Dark Chocolate"];

const PRODUCTS = [
  { concern: "100% Pure Natural (Zero Sugar)", name: "Alpino All-Natural Peanut Butter (Crunchy / Smooth)", specs: "1 kg Tub • 100% Roasted Peanuts", price: "₹449", mrp: "₹549", url: "https://alpino.store/products/all-natural-peanut-butter-crunchy", sub: "natural_pb_1kg" },
  { concern: "100% Pure Natural (Zero Sugar)", name: "Alpino All-Natural Peanut Butter (Jumbo Gym Tub)", specs: "2.5 kg Mega Saver Tub", price: "₹1,099", mrp: "₹1,399", url: "https://alpino.store/products/all-natural-peanut-butter-2-5kg", sub: "natural_pb_2_5kg" },
  { concern: "High-Protein Super Spreads", name: "Alpino High Protein Super Peanut Butter with Whey", specs: "1 kg Tub • 32g Protein per 100g", price: "₹649", mrp: "₹799", url: "https://alpino.store/products/super-peanut-butter", sub: "super_pb_whey" },
  { concern: "Guilt-Free Dark Chocolate", name: "Alpino Dark Chocolate Peanut Butter", specs: "1 kg Tub • Roasted Peanuts + Dark Cocoa", price: "₹499", mrp: "₹599", url: "https://alpino.store/products/dark-chocolate-peanut-butter", sub: "dark_choc_pb" },
  { concern: "Rolled Oats & Superfoods", name: "Alpino Super Rolled Oats", specs: "1 kg Pouch • Whole Grain Jumbo Rolled Oats", price: "₹299", mrp: "₹399", url: "https://alpino.store/products/super-rolled-oats", sub: "rolled_oats" },
];

export default function AlpinoStorePage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-500 text-white p-8">
        <h1 className="text-3xl font-bold">Alpino Health Foods</h1>
        <p className="mt-2 text-sm font-medium text-white">The Real Peanut Butter • Zero Palm Oil, Zero Trans Fat & 100% Roasted Peanuts</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Smart Restock: Up to 21% Off Base Price + Extra 10% with ALPINO10 + Instant 5% UPI Discount + Free Shipping Above ₹499.</p>
      </section>

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
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Redeem on Alpino
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Diet Goal & Nutrition Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CONCERNS.map((c) => (
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
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
