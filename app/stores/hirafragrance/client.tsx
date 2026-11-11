"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("hirafragrance", url, sub);
const OFFERS = [
  { code: "HIRA10", badge: "WELCOME DISCOUNT", title: "Extra 10% OFF Sitewide", desc: "Valid on all Extrait de Parfum bottles and Attar roll-ons.", url: "https://hirafragrance.com/collections/all", sub: "hira10" },
  { code: "OUD20", badge: "ROYAL COLLECTION", title: "Flat 20% OFF on Luxury Oud & Amber Regimens", desc: "Applies on royal oriental concentrates and premium gift box sets.", url: "https://hirafragrance.com/collections/oud-collection", sub: "oud20" },
  { code: "DISCOVERY", badge: "TRIAL VALUE", title: "Flat ₹200 OFF on 5-Piece Scent Discovery Sets", desc: "Test five 10ml travel sprays before investing in full-size luxury bottles.", url: "https://hirafragrance.com/collections/discovery-sets", sub: "discovery" },
  { code: "FREESHIP", badge: "SHIPPING PERK", title: "Free Insured Shipping Above ₹599", desc: "Zero shipping fees across India on prepaid orders reaching ₹599 or more.", url: "https://hirafragrance.com", sub: "freeship" },
];
const CONCERNS = ["Daily Office & Fresh", "Royal Oud & Evening", "Non-Alcoholic Luxury Attars", "Gifting & Discovery Sets"];
const PRODUCTS = [
  { concern: "Daily Office & Fresh", name: "Aqua Marine Extrait De Parfum (50ml)", specs: "Top: Bergamot, Sea Salt • Base: White Musk, Cedarwood", price: "₹899", mrp: "₹1,499", url: "https://hirafragrance.com/products/aqua-marine", sub: "aqua_marine" },
  { concern: "Royal Oud & Evening", name: "Imperial Oud Royal Extrait De Parfum (50ml)", specs: "Top: Saffron • Heart: Rose, Smoky Birch • Base: Cambodian Oud", price: "₹1,299", mrp: "₹2,199", url: "https://hirafragrance.com/products/imperial-oud", sub: "imperial_oud" },
  { concern: "Non-Alcoholic Luxury Attars", name: "Mitti Attar & White Oudh Pure Perfume Oil Roll-On (12ml)", specs: "100% Pure Concentrated Perfume Oil • Zero Alcohol", price: "₹599", mrp: "₹999", url: "https://hirafragrance.com/products/mitti-attar", sub: "mitti_attar" },
  { concern: "Gifting & Discovery Sets", name: "Luxury Extrait Discovery Set (5 x 10ml Travel Sprays)", specs: "Fresh, Citrus, Oriental, Woody & Amber", price: "₹799", mrp: "₹1,299", url: "https://hirafragrance.com/products/discovery-set", sub: "discovery_set" },
];
export default function HiraFragrancePage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-purple-700 to-fuchsia-500 text-white p-8">
        <h1 className="text-3xl font-bold">Hira Fragrance</h1>
        <p className="mt-2 text-sm font-medium text-white">Pure Luxury Scents • High-Concentration Extrait de Parfum & Authentic Attars</p>
        <p className="mt-1 text-xs font-semibold text-white/90">100% IFRA Certified • Zero Harsh Chemicals • Free Delivery Above ₹599</p>
      </section>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Hira</a>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold text-ink">Occasion & Scent Profile Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on Hira</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the difference between Eau de Parfum and Extrait de Parfum?</summary><p className="mt-2 text-sm text-ink-soft">Extrait de Parfum has a much higher fragrance oil concentration, giving stronger projection and longer longevity (8–12 hours) than standard Eau de Parfum.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How long do non-alcoholic Attars last?</summary><p className="mt-2 text-sm text-ink-soft">Pure Attars are highly concentrated and can last 8–12 hours on skin and even longer on fabric.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What are the shipping details?</summary><p className="mt-2 text-sm text-ink-soft">Free insured shipping across India on prepaid orders above ₹599.</p></details>
      </section>
    </div>
  );
}
