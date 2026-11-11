"use client";

import { useState } from "react";

import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("beast-life", url, sub);

const OFFERS = [
  { code: "BEAST10", badge: "SITEWIDE EXTRA", title: "Extra 10% OFF on All Performance Nutrition", desc: "Valid across Whey Protein, Creatine, and Pre-Workouts.", url: "https://beastlife.in/collections/all-products", sub: "beast10" },
  { code: "PUMP15", badge: "STACK SAVER", title: "Flat 15% OFF on Beast Pre-Workout & Intra Combos", desc: "Applies when bundling Pre-Workout with EAAs or Creatine.", url: "https://beastlife.in/collections/combos", sub: "pump15" },
  { code: "EXTRA5", badge: "PREPAID COMBO", title: "Extra 5% Instant OFF on UPI & Card Checkout", desc: "Automatically deducted on prepaid orders.", url: "https://beastlife.in", sub: "extra5" },
  { code: "FREESHIP", badge: "SHIPPING PERK", title: "Free Nationwide Shipping Above ₹999", desc: "Standard delivery waived above ₹999.", url: "https://beastlife.in", sub: "freeship" },
];

const CONCERNS = ["Muscle Building & Whey", "Explosive Strength & Creatine", "High-Energy Pre-Workout", "Intra-Workout & Recovery"];

const PRODUCTS = [
  { concern: "Muscle Building & Whey", name: "Beast Life 100% Pure Whey Protein Concentrate", specs: "1 kg • 24g Protein per Scoop", price: "₹2,399", mrp: "₹3,199", url: "https://beastlife.in/products/whey-protein-concentrate", sub: "whey_concentrate" },
  { concern: "Muscle Building & Whey", name: "Beast Life 100% Whey Protein Isolate", specs: "1 kg • 27g Ultra-Pure Isolate", price: "₹3,199", mrp: "₹4,299", url: "https://beastlife.in/products/whey-protein-isolate", sub: "whey_isolate" },
  { concern: "Explosive Strength & Creatine", name: "Beast Life 100% Micronized Creatine Monohydrate", specs: "250g (83 Servings) • 3g per Scoop", price: "₹799", mrp: "₹1,299", url: "https://beastlife.in", sub: "creatine_mono" },
  { concern: "High-Energy Pre-Workout", name: "Beast Life High-Stim Pre-Workout Powder", specs: "300mg Caffeine + Beta-Alanine", price: "₹1,499", mrp: "₹2,299", url: "https://beastlife.in/products/pre-workout", sub: "pre_workout" },
  { concern: "Intra-Workout & Recovery", name: "Beast Life Essential EAAs + Hydration Electrolytes", specs: "300g (30 Servings)", price: "₹1,199", mrp: "₹1,799", url: "https://beastlife.in/products/eaas-recovery", sub: "eaas_recovery" },
];

export default function BeastLifeStorePage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white p-8">
        <h1 className="text-3xl font-bold">Beast Life</h1>
        <p className="mt-2 text-sm font-medium text-white">Fuel the Beast Within • 100% Transparent Sports Nutrition & Heavy Lifts</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Lifter&apos;s Stacking Hack: Up to 38% Off Base Price + Extra 10% with BEAST10 + Extra 5% Instant Discount on UPI Checkout.</p>
      </section>

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Redeem on Beast Life
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Training Phase & Nutrition Matcher</h2>
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
