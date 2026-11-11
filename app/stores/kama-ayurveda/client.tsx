"use client";
import { useState } from "react";
const TRACK = "https://track.vcommission.com/click?campaign_id=10125&pub_id=133499";
function link(url: string, sub: string) { return `${TRACK}&sub1=${sub}&url=${encodeURIComponent(url)}`; }
const OFFERS = [
  { code: "KAMA10", badge: "WELCOME LUXURY", title: "Flat 10% OFF on First Ayurvedic Order", desc: "Valid on Kumkumadi, Bringadi, and Pure Rose Water.", url: "https://www.kamaayurveda.com", sub: "kama10" },
  { code: "GLOWGIFT", badge: "GIFT WITH PURCHASE", title: "Complimentary Kumkumadi Scrub (Mini) Above ₹2,999", desc: "Unlocked automatically in basket.", url: "https://www.kamaayurveda.com", sub: "glowgift" },
  { code: "RITUAL15", badge: "REGIME SAVER", title: "Flat 15% OFF on Curated Gift Boxes & Regimes", desc: "Applies across bridal trousseau sets and festive boxes.", url: "https://www.kamaayurveda.com", sub: "ritual15" },
  { code: "FREESHIP", badge: "COMPLIMENTARY TRANSIT", title: "Free Doorstep Express Delivery Above ₹1,499", desc: "Transit fee waived automatically.", url: "https://www.kamaayurveda.com", sub: "freeship" },
];
const CONCERNS = ["Kumkumadi Skin Radiance", "Bringadi Intensive Hair Therapy", "Pure Floral Mists & Toners", "Rejuvenating Body & Spa"];
const PRODUCTS = [
  { concern: "Kumkumadi Skin Radiance", name: "Kumkumadi Miraculous Beauty Ayurvedic Night Serum (12ml)", specs: "Kashmiri Saffron & Lotus Extracts", price: "₹3,195", mrp: "₹3,195", url: "https://www.kamaayurveda.com", sub: "kumkumadi_fluid" },
  { concern: "Kumkumadi Skin Radiance", name: "Kumkumadi Brightening Cleansing Oil (100ml)", specs: "Ayurvedic Make-Up Remover & Lipid Replenisher", price: "₹1,695", mrp: "₹1,695", url: "https://www.kamaayurveda.com", sub: "kumkumadi_cleanser" },
  { concern: "Bringadi Intensive Hair Therapy", name: "Bringadi Intensive Hair Treatment Oil (100ml)", specs: "Bhringraj, Amla, Indigo & Sesame Oil", price: "₹1,250", mrp: "₹1,250", url: "https://www.kamaayurveda.com", sub: "bringadi_oil" },
  { concern: "Bringadi Intensive Hair Therapy", name: "Bringadi Hair Cleanser (200ml)", specs: "Sulphate & Paraben-Free", price: "₹1,495", mrp: "₹1,495", url: "https://www.kamaayurveda.com", sub: "bringadi_cleanser" },
  { concern: "Pure Floral Mists & Toners", name: "Pure Rose Water Mist (200ml)", specs: "Steam-Distilled Kannauj Rose, Zero Alcohol", price: "₹1,450", mrp: "₹1,450", url: "https://www.kamaayurveda.com", sub: "pure_rose_water" },
];
export default function KamaAyurvedaPage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-rose-700 to-pink-500 text-white p-8">
        <h1 className="text-3xl font-bold">Kama Ayurveda</h1>
        <p className="mt-2 text-sm font-medium text-white">Authentic Ayurvedic Formulations • 100% Natural, Plant-Based Luxury Care</p>
        <p className="mt-1 text-xs font-semibold text-white/90">3 Free Luxury Trial Samples with Every Order • Free Shipping Above ₹1,499</p>
      </section>
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Luxury Cart Optimization & Sample Unlocking Guide</h2>
        <ul className="mt-3 space-y-1 text-sm text-ink-soft">
          <li>Level 1 (Any Order): 3 Free Handpicked Luxury Mini Sachets/Vials.</li>
          <li>Level 2 (Above ₹1,499): 100% Free Doorstep Delivery.</li>
          <li>Level 3 (Above ₹2,999): Unlock Complimentary Deluxe Gift (Kumkumadi Mini Scrub/Cream).</li>
        </ul>
        <a href={link("https://www.kamaayurveda.com", "luxury_box")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Build My Luxury Box</a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Experience on Kama Ayurveda</a>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold text-ink">Ayurvedic Treatment & Ritual Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Explore Ritual</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I choose my 3 complimentary samples?</summary><p className="mt-2 text-sm text-ink-soft">An interactive sample selector appears at checkout, letting you handpick 3 luxury trial sizes across cleansers, oils, and moisturizers.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Is Kama Kumkumadi Oil suitable for oily or acne-prone skin?</summary><p className="mt-2 text-sm text-ink-soft">Yes, but apply only 2–3 drops onto damp skin and leave on for 30 minutes before wiping with a warm cotton cloth.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the minimum threshold for free shipping?</summary><p className="mt-2 text-sm text-ink-soft">Free express delivery on all domestic orders totaling ₹1,499 or more.</p></details>
      </section>
    </div>
  );
}
