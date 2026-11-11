"use client";

import { useState } from "react";

const TRACK = "https://track.vcommission.com/click?campaign_id=12957&pub_id=133499";
function link(url: string, subId: string) {
  return `${TRACK}&sub1=${subId}&url=${encodeURIComponent(url)}`;
}

const OFFERS = [
  { code: "DOTB2G2", badge: "FLAGSHIP SALE", title: "Buy 2, Get 2 FREE Sitewide", desc: "Add any 4 products; lowest 2 discounted 100%.", url: "https://www.dotandkey.com/collections/all-products", sub: "dotb2g2" },
  { code: "EXTRA10", badge: "SITEWIDE EXTRA", title: "Extra 10% OFF on Prepaid Orders", desc: "Valid on all serums, moisturizers, and sunscreens.", url: "https://www.dotandkey.com/collections/best-sellers", sub: "extra10" },
  { code: "GLOW15", badge: "SKINCARE ROUTINE", title: "Flat 15% OFF on Combos & Regimens", desc: "Additional markdown on Cica Acne or Vitamin C Glow routines.", url: "https://www.dotandkey.com/collections/combos", sub: "glow15" },
  { code: "FREESHIP", badge: "SHIPPING PERK", title: "Free Doorstep Shipping Above ₹499", desc: "Waived shipping on all prepaid/COD orders above ₹499.", url: "https://www.dotandkey.com", sub: "freeship" },
];

const CONCERNS = ["Watermelon Hydration & Sunscreens", "Cica & Niacinamide (Acne Care)", "Vitamin C + E (Glow & Radiance)", "Ceramides & Barrier Repair", "Tinted Fruit Lip Balms"];

const PRODUCTS = [
  { concern: "Watermelon Hydration & Sunscreens", name: "Watermelon Hyaluronic Cooling Sunscreen SPF 50+", specs: "50g Lightweight Fluid", price: "₹495", mrp: "₹495", url: "https://www.dotandkey.com/products/watermelon-hyaluronic-cooling-sunscreen-spf-50", sub: "watermelon_sunscreen" },
  { concern: "Watermelon Hydration & Sunscreens", name: "72HR Hydrating Gel Moisturizer", specs: "60ml Oil-Free Gel", price: "₹495", mrp: "₹595", url: "https://www.dotandkey.com/products/watermelon-superglow-gel-face-moisturizer", sub: "watermelon_gel" },
  { concern: "Cica & Niacinamide (Acne Care)", name: "Cica & 2% Salicylic Oil-Free Anti-Acne Moisturizer", specs: "60ml Soothing Gel", price: "₹445", mrp: "₹495", url: "https://www.dotandkey.com/products/cica-niacinamide-oil-free-moisturizer", sub: "cica_moisturizer" },
  { concern: "Cica & Niacinamide (Acne Care)", name: "10% Niacinamide + Cica Dark Spot Serum", specs: "30ml Dropper", price: "₹595", mrp: "₹695", url: "https://www.dotandkey.com/products/cica-niacinamide-blemish-clearing-serum", sub: "niacinamide_serum" },
  { concern: "Vitamin C + E (Glow & Radiance)", name: "Vitamin C + E Super Bright Moisturizer", specs: "60ml Sorbet Cream", price: "₹495", mrp: "₹595", url: "https://www.dotandkey.com/products/vitamin-c-face-cream", sub: "vitaminc_cream" },
  { concern: "Ceramides & Barrier Repair", name: "Barrier Repair Ceramide & Hyaluronic Cream", specs: "100g Repair Formula", price: "₹355", mrp: "₹395", url: "https://www.dotandkey.com/products/ceramides-hyaluronic-face-cream", sub: "ceramide_cream" },
  { concern: "Tinted Fruit Lip Balms", name: "Gloss Boss Tinted Lip Balm SPF 30", specs: "12g Tube", price: "₹225", mrp: "₹249", url: "https://www.dotandkey.com/products/gloss-boss-lip-balm", sub: "gloss_boss" },
];

export default function DotAndKeyStorePage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white p-8">
        <h1 className="text-3xl font-bold">Dot & Key Skincare</h1>
        <p className="mt-2 text-sm font-medium text-white">Fruit-Infused Active Skincare & Dermatologist-Tested Formulations</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Verified Offers: Buy 2 Get 2 FREE with DOTB2G2 + Free Shipping Above ₹499</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Redeem on Dot & Key
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Fruit-Active Ingredient Matcher</h2>
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
                Get Deal on Dot & Key
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How does the Dot & Key Buy 2 Get 2 Free (B2G2) code work?</summary>
          <p className="mt-2 text-sm text-ink-soft">Add any 4 eligible skincare items to your cart on dotandkey.com and apply code DOTB2G2. The system automatically discounts the two lowest-priced items to ₹0.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Which Dot & Key sunscreen is best for oily and acne-prone skin?</summary>
          <p className="mt-2 text-sm text-ink-soft">The Watermelon Hyaluronic Cooling Sunscreen SPF 50+ is oil-free, lightweight, and leaves zero white cast, making it the preferred choice for humid climates and oily skin types.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">What is the minimum order threshold for free shipping on Dot & Key?</summary>
          <p className="mt-2 text-sm text-ink-soft">Shipping is free on all orders of ₹499 or more. Adding an impulse essential like the Gloss Boss Lip Balm (₹225) is an easy way to reach the threshold.</p>
        </details>
      </section>
    </div>
  );
}
