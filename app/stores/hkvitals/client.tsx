"use client";
import { useState } from "react";
const TRACK = "https://track.vcommission.com/click?campaign_id=10111&pub_id=133499";
function link(url: string, sub: string) { return `${TRACK}&sub1=${sub}&url=${encodeURIComponent(url)}`; }
const OFFERS = [
  { code: "HKV10", badge: "SITEWIDE EXTRA", title: "Extra 10% OFF on All Daily Supplements", desc: "Valid across Multivitamins, Omega-3 Fish Oil, Biotin, and Collagen.", url: "https://www.hkvitals.com/collections/all-products", sub: "hkv10" },
  { code: "VITAL20", badge: "COMBO SAVER", title: "Flat 20% OFF on 2-Month & 3-Month Value Packs", desc: "Maximum savings on monthly health replenishment routines.", url: "https://www.hkvitals.com/collections/combos", sub: "vital20" },
  { code: "EXTRA5", badge: "PREPAID COMBO", title: "Extra 5% Instant OFF on UPI / Prepaid", desc: "Applies automatically at checkout on UPI and card payments.", url: "https://www.hkvitals.com", sub: "extra5" },
  { code: "FREESHIP", badge: "SHIPPING PERK", title: "Free Nationwide Shipping Above ₹499", desc: "Standard shipping fee waived above ₹499.", url: "https://www.hkvitals.com", sub: "freeship" },
];
const CONCERNS = ["Hair & Skin Health", "Heart & Omega-3", "Energy & Multivitamins", "Bone & Joint Mobility"];
const PRODUCTS = [
  { concern: "Hair & Skin Health", name: "HK Vitals Biotin (10,000 mcg)", specs: "60 Tablets", price: "₹399", mrp: "₹599", url: "https://www.hkvitals.com/products/biotin-tablets", sub: "biotin_tabs" },
  { concern: "Hair & Skin Health", name: "HK Vitals Skin Radiance Marine Collagen Powder", specs: "200g Tub (Orange Flavor)", price: "₹999", mrp: "₹1,499", url: "https://www.hkvitals.com/products/collagen", sub: "collagen_powder" },
  { concern: "Heart & Omega-3", name: "HK Vitals Fish Oil (1000mg)", specs: "60 Softgels", price: "₹549", mrp: "₹799", url: "https://www.hkvitals.com/products/fish-oil", sub: "fish_oil" },
  { concern: "Energy & Multivitamins", name: "HK Vitals Multivitamin with Ginseng", specs: "60 Tablets", price: "₹499", mrp: "₹699", url: "https://www.hkvitals.com/products/multivitamin", sub: "multivitamin" },
  { concern: "Bone & Joint Mobility", name: "HK Vitals Calcium + Magnesium + Zinc + Vitamin D3", specs: "60 Tablets", price: "₹349", mrp: "₹499", url: "https://www.hkvitals.com/products/calcium-tablets", sub: "calcium_tabs" },
];
export default function HkVitalsPage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-500 text-white p-8">
        <h1 className="text-3xl font-bold">HK Vitals by HealthKart</h1>
        <p className="mt-2 text-sm font-medium text-white">Science-Backed Daily Vitamins, Fish Oil & Skin Nutrition</p>
        <p className="mt-1 text-xs font-semibold text-white/90">FSSAI Certified • Non-GMO & Heavy Metal Tested • Free Delivery Above ₹499</p>
      </section>
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Cost-Per-Day Pill Counter</h2>
        <p className="mt-2 text-sm text-ink-soft">HK Vitals Multivitamin costs ₹499 for 60 days = Just ~₹8.30/day for complete 100% RDA micronutrient coverage.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on HK Vitals</a>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold text-ink">Nutrition Deficiency & Goal Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CONCERNS.map((c) => (
            <button key={c} type="button" onClick={() => setConcern(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${concern === c ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <div key={p.name} className="rounded-2xl border border-ledger-line bg-white p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{p.specs}</p>
              <div className="mt-2 flex items-baseline gap-2"><span className="text-lg font-bold text-ink">{p.price}</span><span className="text-sm text-ink-soft line-through">{p.mrp}</span></div>
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on HK Vitals</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Can I stack HKV10 with UPI discount?</summary><p className="mt-2 text-sm text-ink-soft">Yes, apply HKV10 first, then an extra 5% instant discount applies on UPI/card checkout.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Is HK Vitals fish oil heavy-metal safe?</summary><p className="mt-2 text-sm text-ink-soft">Yes, it is molecularly distilled and heavy metal tested.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the free shipping threshold?</summary><p className="mt-2 text-sm text-ink-soft">Free delivery on orders above ₹499.</p></details>
      </section>
    </div>
  );
}
