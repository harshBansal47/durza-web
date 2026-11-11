"use client";

import { useState } from "react";

import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("boldfit", url, sub);

const OFFERS = [
  { code: "SAVE100", badge: "TIER DISCOUNT", title: "Flat ₹100 OFF + Free Gym Socks", desc: "Valid on cart values of ₹1,899 and above.", url: "https://boldfit.com/collections/best-sellers", sub: "save100" },
  { code: "SAVE250", badge: "BULK SAVER", title: "Flat ₹250 OFF on Fitness Essentials", desc: "Applies automatically when cart reaches ₹2,599.", url: "https://boldfit.com/collections/home-gym-equipment", sub: "save250" },
  { code: "PULLUP150", badge: "EQUIPMENT SPECIAL", title: "Flat ₹150 OFF on Doorway Pull-Up Bars", desc: "Instant markdown on heavy-duty pull-up bars.", url: "https://boldfit.com/products/titan-grip-pull-up-bar", sub: "pullup150" },
  { code: "BF500", badge: "HIGH VALUE", title: "Flat ₹500 OFF on Orders Above ₹1,999", desc: "Applicable on footwear and activewear.", url: "https://boldfit.com/collections/footwear", sub: "bf500" },
];

const CONCERNS = ["Heavy Lifting & Gym Supports", "Home Workout & Calisthenics", "Muscle Recovery & Massagers", "Hydration & Shakers"];

const PRODUCTS = [
  { concern: "Heavy Lifting & Gym Supports", name: "Boldfit Pro Knee Compression Sleeve (Pair)", specs: "7mm Ergonomic Support", price: "₹699", mrp: "₹1,299", url: "https://boldfit.com/products/knee-support", sub: "knee_sleeve" },
  { concern: "Heavy Lifting & Gym Supports", name: "Heavy-Duty Gym Wrist Wraps", specs: "Cotton-Elastic Blend", price: "₹349", mrp: "₹699", url: "https://boldfit.com/products/wrist-wraps", sub: "wrist_wraps" },
  { concern: "Home Workout & Calisthenics", name: "11-Piece Resistance Tube Workout Set", specs: "5 Resistance Levels", price: "₹1,299", mrp: "₹2,165", url: "https://boldfit.com/products/resistance-tubes-set", sub: "resistance_tubes" },
  { concern: "Home Workout & Calisthenics", name: "TitanGrip Doorway Pull-Up Bar", specs: "No-Screw Installation", price: "₹1,899", mrp: "₹3,499", url: "https://boldfit.com/products/titan-grip-pull-up-bar", sub: "pullup_bar" },
  { concern: "Muscle Recovery & Massagers", name: "Deep Tissue Handheld Percussion Massage Gun", specs: "6 Speed Levels", price: "₹1,999", mrp: "₹4,999", url: "https://boldfit.com/products/massage-gun", sub: "massage_gun" },
  { concern: "Muscle Recovery & Massagers", name: "High-Density Foam Roller", specs: "Grid Trigger-Point", price: "₹799", mrp: "₹1,499", url: "https://boldfit.com/products/foam-roller", sub: "foam_roller" },
  { concern: "Hydration & Shakers", name: "Bold Gallon 2.2L Stainless Steel Water Jug", specs: "BPA-Free Leakproof", price: "₹899", mrp: "₹1,599", url: "https://boldfit.com/products/gallon-bottle", sub: "gallon_bottle" },
];

export default function BoldfitStorePage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-orange-600 to-red-500 text-white p-8">
        <h1 className="text-3xl font-bold">Boldfit</h1>
        <p className="mt-2 text-sm font-medium text-white">India&apos;s Leading Fitness Gear, Gym Accessories & Recovery Essentials</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Verified Offers: Extra ₹250 Off with SAVE250 + Free Delivery Above ₹800</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Redeem on Boldfit
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Workout Goal & Setup Matcher</h2>
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
                Get Deal on Boldfit
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How do I unlock free gym socks with my Boldfit order?</summary>
          <p className="mt-2 text-sm text-ink-soft">Add products totaling ₹1,899 or more to your cart and apply coupon SAVE100. Boldfit automatically adds a complimentary pair of performance socks to eligible shipments.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Does the Boldfit Doorway Pull-Up bar require drilling?</summary>
          <p className="mt-2 text-sm text-ink-soft">No, the TitanGrip Pull-Up Bar uses adjustable tension leverage with silicone buffer pads, securing between standard doorway frames without screws or wall drilling.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">What is the minimum order threshold for free shipping on Boldfit?</summary>
          <p className="mt-2 text-sm text-ink-soft">Doorstep delivery is completely free on all orders of ₹800 or more across India.</p>
        </details>
      </section>
    </div>
  );
}
