"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("iba-cosmetics", url, sub);
const OFFERS = [
  { code: "IBA15", badge: "SITEWIDE EXTRA", title: "Extra 15% OFF on All Clean Beauty", desc: "Valid on all breathable nail colors, transferproof matte lipsticks, and Halal skincare.", url: "https://ibacosmetics.com/collections/all-products", sub: "iba15" },
  { code: "B2G1", badge: "LIP & NAIL DEAL", title: "Buy 2, Get 1 FREE on Breathable Nail Enamels", desc: "Add any 3 breathable nail colors; the 3rd bottle is free.", url: "https://ibacosmetics.com/collections/breathable-nail-color", sub: "b2g1" },
  { code: "WELCOME10", badge: "FIRST ORDER", title: "Flat 10% OFF on First Cosmetic Order", desc: "Special introductory discount for new clean beauty customers.", url: "https://ibacosmetics.com", sub: "welcome10" },
  { code: "FREESHIP", badge: "SHIPPING PERK", title: "Free Nationwide Shipping Above ₹499", desc: "Doorstep shipping fee waived on orders totaling ₹499 or more.", url: "https://ibacosmetics.com", sub: "freeship" },
];
const CONCERNS = ["Breathable Wudhu-Friendly Nails", "Halal Transferproof Lipsticks", "Pure Skincare & Sunscreens", "Alcohol-Free Attars & Perfumes"];
const PRODUCTS = [
  { concern: "Breathable Wudhu-Friendly Nails", name: "Iba Breathable Nail Color", specs: "9ml Bottle • Water & Oxygen Permeable", price: "₹249", mrp: "₹299", url: "https://ibacosmetics.com/products/iba-breathable-nail-color", sub: "breathable_nail" },
  { concern: "Halal Transferproof Lipsticks", name: "Iba Maxx Matte Liquid Lipstick", specs: "6ml Wand • 12H Matte Finish", price: "₹399", mrp: "₹499", url: "https://ibacosmetics.com/products/iba-maxx-matte-liquid-lipstick", sub: "matte_lipstick" },
  { concern: "Pure Skincare & Sunscreens", name: "Iba Invisible Sunscreen SPF 50 PA++++", specs: "50g Ultra-Light Gel", price: "₹449", mrp: "₹499", url: "https://ibacosmetics.com", sub: "iba_sunscreen" },
  { concern: "Halal Transferproof Lipsticks", name: "Iba Pure Lips Moisture Rich Lipstick", specs: "3.8g Creamy Bullet", price: "₹225", mrp: "₹260", url: "https://ibacosmetics.com/products/moisture-rich-lipstick", sub: "moisture_lipstick" },
  { concern: "Alcohol-Free Attars & Perfumes", name: "Iba Pure Perfume Roller Ball", specs: "10ml Roll-On • Non-Alcoholic", price: "₹295", mrp: "₹350", url: "https://ibacosmetics.com/products/pure-perfume-roller", sub: "pure_perfume" },
];
export default function IbaCosmeticsPage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-pink-400 text-white p-8">
        <h1 className="text-3xl font-bold">Iba Cosmetics</h1>
        <p className="mt-2 text-sm font-medium text-white">Pure, Safe & Ethical Beauty • 100% Halal Certified, Vegan & Cruelty-Free</p>
        <p className="mt-1 text-xs font-semibold text-white/90">No Pig Fat • No Carmine • Zero Alcohol • Breathable Wudhu-Friendly Formula • Free Delivery Above ₹499</p>
      </section>
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Halal Beauty & Wudhu-Friendliness Decoder</h2>
        <p className="mt-2 text-sm text-ink-soft">Iba Breathable Nail Color uses a patented permeable membrane that allows water and air molecules to penetrate to the nail bed, ensuring valid ablution (Wudhu) without removal. 100% free from Carmine and animal fat.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Iba</a>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold text-ink">Clean Certification & Makeup Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on Iba</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What does Halal Certified mean in Iba Cosmetics?</summary><p className="mt-2 text-sm text-ink-soft">Halal certification ensures all ingredients are free from animal fat, alcohol, and prohibited byproducts like carmine, with strict hygiene standards.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I activate the Buy 2 Get 1 Free deal on Breathable Nail Colors?</summary><p className="mt-2 text-sm text-ink-soft">Add any 3 shades of Iba Breathable Nail Enamel to your basket and apply code B2G1 at checkout; the third bottle is deducted automatically.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the minimum order threshold for free delivery?</summary><p className="mt-2 text-sm text-ink-soft">Free doorstep delivery across all PIN codes in India for orders totaling ₹499 or more.</p></details>
      </section>
    </div>
  );
}
