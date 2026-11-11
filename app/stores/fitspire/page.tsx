"use client";

import { useState } from "react";

const TRACK = "https://track.vcommission.com/click?campaign_id=13768&pub_id=133499";
function link(url: string, subId: string) {
  return `${TRACK}&sub1=${subId}&url=${encodeURIComponent(url)}`;
}

const OFFERS = [
  { code: "FIT10", badge: "STACKABLE CODE", title: "Extra 10% OFF Sitewide", desc: "Stacks on catalog markdowns across plant protein, peanut butter, and gummies.", url: "https://fitspire.online/collections/all-products", sub: "fit10" },
  { code: "FIT20", badge: "HIGH BASKET SAVER", title: "Flat 20% OFF on Orders Above ₹1,499", desc: "Best for stocking up on 2-month packs.", url: "https://fitspire.online/collections/best-sellers", sub: "fit20" },
  { code: "B2G1", badge: "BUNDLE PERK", title: "Buy 2, Get 1 FREE on Functional Gummies", desc: "Add 3 gummy tubs; 1 tub applies at zero cost.", url: "https://fitspire.online/collections/gummies", sub: "b2g1" },
  { code: "FREESHIP", badge: "SHIPPING PERK", title: "Free Delivery Above ₹499", desc: "Automatically waived shipping fee above ₹499.", url: "https://fitspire.online", sub: "freeship" },
];

const CONCERNS = ["Plant Protein & Energy", "Daily Multivitamins & Immunity", "Hair, Skin & Vegan Collagen", "Healthy Snacking & Spreads"];

const PRODUCTS = [
  { concern: "Plant Protein & Energy", name: "100% Plant Protein Powder (Pea & Brown Rice)", specs: "1 kg • 20g Clean Protein/Scoop", price: "₹2,099", mrp: "₹2,999", url: "https://fitspire.online/products/plant-protein", sub: "plant_protein" },
  { concern: "Daily Multivitamins & Immunity", name: "Men's / Women's Vitality Multivitamin", specs: "60 Vegan Tablets", price: "₹649", mrp: "₹999", url: "https://fitspire.online/products/daily-multivitamin", sub: "multivitamin" },
  { concern: "Daily Multivitamins & Immunity", name: "Fit Collagen Effervescent Fizzy Tabs", specs: "20 Tablets • Orange Flavor", price: "₹499", mrp: "₹799", url: "https://fitspire.online/products/collagen-effervescent", sub: "collagen_tabs" },
  { concern: "Hair, Skin & Vegan Collagen", name: "Plant-Based Biotin Hair Growth Gummies", specs: "30 Pectin Gummies", price: "₹549", mrp: "₹899", url: "https://fitspire.online/products/biotin-gummies", sub: "biotin_gummies" },
  { concern: "Hair, Skin & Vegan Collagen", name: "Vegan Collagen Plant Builder Powder", specs: "200g Tub", price: "₹899", mrp: "₹1,499", url: "https://fitspire.online/products/vegan-collagen", sub: "vegan_collagen" },
  { concern: "Healthy Snacking & Spreads", name: "All-Natural High Protein Peanut Butter", specs: "1 kg Tub", price: "₹449", mrp: "₹699", url: "https://fitspire.online/products/peanut-butter", sub: "peanut_butter" },
];

export default function FitspireStorePage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [cartTotal, setCartTotal] = useState(2000);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);

  const fit20 = Math.round(cartTotal * 0.20);
  const prepaid = Math.round((cartTotal - fit20) * 0.05);
  const shipping = cartTotal >= 499 ? 70 : 0;
  const final = cartTotal - fit20 - prepaid - shipping;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8">
        <h1 className="text-3xl font-bold">Fitspire</h1>
        <p className="mt-2 text-sm font-medium text-white">100% Vegan & Plant-Based Wellness Formulations</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Verified Offers: Catalog Discount + FIT20 + Extra 5% on UPI Checkout</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Smart Shopper's Stacking Calculator</h2>
        <label className="mt-4 block text-sm font-medium text-ink">
          Cart total: ₹{cartTotal.toLocaleString("en-IN")}
          <input type="range" min={500} max={5000} step={100} value={cartTotal} onChange={(e) => setCartTotal(Number(e.target.value))} className="mt-2 w-full" />
        </label>
        <div className="mt-4 space-y-1 text-sm text-ink-soft">
          <p>Baseline Cart: ₹{cartTotal.toLocaleString("en-IN")}</p>
          <p>Code FIT20 (-₹{fit20.toLocaleString("en-IN")})</p>
          <p>Extra Prepaid Discount (-5% = -₹{prepaid.toLocaleString("en-IN")})</p>
          <p>Free Delivery (Saved ₹{shipping})</p>
          <p className="font-bold text-ink">Final Estimated Price: ₹{final.toLocaleString("en-IN")} (Total Savings: ₹{(cartTotal - final).toLocaleString("en-IN")})</p>
        </div>
        <a href={link("https://fitspire.online", "stacking_calc")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
          Apply This Stacking Formula on Fitspire
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.code.toLowerCase())} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Redeem on Fitspire
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Plant-Wellness Lifestyle Matcher</h2>
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
                Get Deal on Fitspire
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Can I stack coupon code FIT10 or FIT20 with UPI checkout discounts?</summary>
          <p className="mt-2 text-sm text-ink-soft">Yes. First apply coupon code FIT10 or FIT20 in your Fitspire shopping cart. When you proceed to the payment gateway and choose UPI or prepaid cards, Fitspire applies an additional 5% instant deduction on the discounted subtotal.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Is Fitspire Collagen sourced from animals or fish?</summary>
          <p className="mt-2 text-sm text-ink-soft">No. Fitspire collagen is 100% plant-based, using natural plant extracts like Sesbania Agati, Acerola Cherry, and Bamboo Shoot that stimulate the body's natural collagen synthesis without marine or bovine derivatives.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">What is the easiest cart-filler to hit the ₹499 free shipping mark?</summary>
          <p className="mt-2 text-sm text-ink-soft">If your cart is around ₹350–₹450, adding an all-natural high protein peanut butter tub or an effervescent drink tube is more cost-effective than paying the standard ₹70 doorstep shipping fee.</p>
        </details>
      </section>
    </div>
  );
}
