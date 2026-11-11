"use client";

import { useState } from "react";

const TRACK = "https://track.vcommission.com/click?campaign_id=12859&pub_id=133499";
function link(url: string, subId: string) {
  return `${TRACK}&sub1=${subId}&url=${encodeURIComponent(url)}`;
}

const OFFERS = [
  { code: "FIRST10", badge: "NEW USER", title: "Flat 10% OFF on First Order", desc: "Valid across entire botanical hair color, organic indigo, and skincare range.", url: "https://www.buyindusvalley.in", sub: "first10" },
  { code: "AC10", badge: "SITEWIDE EXTRA", title: "Extra 10% OFF on Combos & Regimes", desc: "Additional 10% markdown on bundle savings for pigmentation kits.", url: "https://www.buyindusvalley.in/collections/super-saver-combos", sub: "ac10" },
  { code: "FREESHIP", badge: "SHIPPING PERK", title: "Free Standard Shipping Across India", desc: "Automatically waived shipping fee above ₹299.", url: "https://www.buyindusvalley.in", sub: "freeship" },
  { code: "PREPAID5", badge: "PAYMENT OFFER", title: "Extra 5% OFF on UPI & Prepaid Checkout", desc: "Instant deduction when paying via UPI or Cards.", url: "https://www.buyindusvalley.in", sub: "prepaid5" },
];

const CONCERNS = ["Safe Hair Coloring", "Hair Fall & Regrowth", "Pigmentation & Dark Spots", "Dandruff & Scalp"];

const PRODUCTS = [
  { concern: "Safe Hair Coloring", name: "Damage-Free Natural Gel Hair Colour", specs: "6 Shades • 120 ml + 20 g", price: "₹559", mrp: "₹699", url: "https://www.buyindusvalley.in/products/damage-free-gel-colour", sub: "gel_hair_colour" },
  { concern: "Safe Hair Coloring", name: "Bio-Organic Herbal Henna & Indigo Powder Combo", specs: "100g Henna + 100g Indigo", price: "₹438", mrp: "₹548", url: "https://www.buyindusvalley.in/products/henna-indigo-combo", sub: "henna_indigo_combo" },
  { concern: "Safe Hair Coloring", name: "100% Botanical Aqua Colour", specs: "Water-based • 4 Shades", price: "₹821", mrp: "₹899", url: "https://www.buyindusvalley.in/products/aqua-colour", sub: "aqua_colour" },
  { concern: "Hair Fall & Regrowth", name: "Growout Hairfall Control Oil & Shampoo Combo", specs: "200ml + 200ml", price: "₹622", mrp: "₹778", url: "https://www.buyindusvalley.in/products/growout-combo", sub: "growout_combo" },
  { concern: "Pigmentation & Dark Spots", name: "Brightening Depigmentation Gel", specs: "50 ml Gel", price: "₹229", mrp: "₹349", url: "https://www.buyindusvalley.in/products/depigmentation-gel", sub: "depigmentation_gel" },
  { concern: "Pigmentation & Dark Spots", name: "AM to PM Complete Pigmentation Removal Regime", specs: "4-Step Kit", price: "₹1,357", mrp: "₹1,696", url: "https://www.buyindusvalley.in/products/pigmentation-kit", sub: "pigmentation_kit" },
  { concern: "Dandruff & Scalp", name: "Deep Nourishing Hair Ultima Spa Mask", specs: "175 ml Tub", price: "₹272", mrp: "₹349", url: "https://www.buyindusvalley.in/products/hair-ultima-spa", sub: "hair_spa" },
];

export default function IndusValleyStorePage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-emerald-700 to-green-500 text-white p-8">
        <h1 className="text-3xl font-bold">Indus Valley Bio-Organic</h1>
        <p className="mt-2 text-sm opacity-90">100% Botanical, Ammonia-Free & PPD-Free Hair Color & Organic Skin Care</p>
        <p className="mt-1 text-xs opacity-80">Verified Offers: Extra 10% Off with FIRST10 + Free Delivery Above ₹299</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Redeem on Indus Valley
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Hair & Skin Solution Matcher</h2>
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
                Claim Deal
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How is Indus Valley Gel Hair Colour different from regular dyes?</summary>
          <p className="mt-2 text-sm text-ink-soft">It contains zero ammonia, hydrogen peroxide, and synthetic PPD, coloring hair through certified organic herbs and aloe vera base, eliminating chemical damage and burning.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How do I get free shipping on Indus Valley orders?</summary>
          <p className="mt-2 text-sm text-ink-soft">Orders with a cart total of ₹299 or higher qualify for free standard doorstep delivery across India automatically at checkout.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Can the FIRST10 coupon code be used on bundles and kits?</summary>
          <p className="mt-2 text-sm text-ink-soft">Yes, FIRST10 stacks on already-discounted combos and individual items for first-time shoppers.</p>
        </details>
      </section>
    </div>
  );
}
