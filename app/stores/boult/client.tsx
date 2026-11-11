"use client";

import { useState } from "react";

const TRACK = "https://track.vcommission.com/click?campaign_id=10323&pub_id=133499";
function link(url: string, subId: string) {
  return `${TRACK}&sub1=${subId}&url=${encodeURIComponent(url)}`;
}

const OFFERS = [
  { code: "BOULT100", badge: "SITEWIDE INSTANT", title: "Flat ₹100 OFF on Orders Above ₹999", desc: "Valid on all trending wireless earbuds, neckbands, and smartwatches.", url: "https://www.goboult.co.in/collections/best-sellers", sub: "boult100" },
  { code: "EXTRA5", badge: "PREPAID COMBO", title: "Extra 5% OFF on UPI & Card Payments", desc: "Instant deduction on prepaid orders.", url: "https://www.goboult.co.in", sub: "extra5" },
  { code: "ANC200", badge: "FLAGSHIP AUDIO", title: "Flat ₹200 OFF on Active Noise Cancellation (ANC)", desc: "Applies on premium hybrid ANC earbuds.", url: "https://www.goboult.co.in/collections/true-wireless", sub: "anc200" },
  { code: "FREESHIP", badge: "DELIVERY PERK", title: "100% Free Shipping Across India", desc: "Zero shipping fees on all prepaid orders.", url: "https://www.goboult.co.in", sub: "freeship" },
];

const CONCERNS = ["Gaming TWS (Ultra-Low Latency)", "Office & Calls (ANC + ENC)", "AMOLED Smartwatches", "Heavy Bass & Long Battery"];

const PRODUCTS = [
  { concern: "Gaming TWS (Ultra-Low Latency)", name: "Boult Audio Astra Gaming Earbuds", specs: "40ms Ultra-Low Latency • 48H Battery", price: "₹1,299", mrp: "₹3,499", url: "https://www.goboult.co.in/products/astra-gaming-earbuds", sub: "astra_gaming" },
  { concern: "Office & Calls (ANC + ENC)", name: "Boult Audio W50 with 30dB Active Noise Cancellation", specs: "Hybrid ANC • 50H Playtime", price: "₹1,499", mrp: "₹4,999", url: "https://www.goboult.co.in/products/w50-anc-earbuds", sub: "w50_anc" },
  { concern: "AMOLED Smartwatches", name: "Boult Mirage 1.39\" Luxury AMOLED Smartwatch", specs: "Round HD AMOLED • BT Calling", price: "₹1,799", mrp: "₹6,999", url: "https://www.goboult.co.in/products/mirage-smartwatch", sub: "mirage_smartwatch" },
  { concern: "AMOLED Smartwatches", name: "Boult Crown R Pro Bluetooth Calling Watch", specs: "1.43\" Super AMOLED • 600 Nits", price: "₹1,999", mrp: "₹7,499", url: "https://www.goboult.co.in/products/crown-r-pro", sub: "crown_smartwatch" },
  { concern: "Heavy Bass & Long Battery", name: "Boult Audio Z40 Pro Earbuds", specs: "100 Hours Playtime • 10mm BoomX Bass", price: "₹1,399", mrp: "₹4,999", url: "https://www.goboult.co.in/products/z40-pro", sub: "z40_pro" },
];

export default function BoultStorePage() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [priority, setPriority] = useState("gaming");
  const filtered = PRODUCTS.filter((p) => p.concern === concern);

  const recommendation = PRODUCTS.find((p) => {
    if (priority === "gaming" && p.concern.startsWith("Gaming")) return true;
    if (priority === "calling" && p.concern.startsWith("Office")) return true;
    if (priority === "battery" && p.concern.startsWith("Heavy")) return true;
    return false;
  }) || filtered[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-slate-800 to-zinc-700 text-white p-8">
        <h1 className="text-3xl font-bold">Boult Audio</h1>
        <p className="mt-2 text-sm font-medium text-white">Engineered for Sound • Premium TWS, ANC Earbuds & AMOLED Smartwatches</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Smart Savings: Flat ₹100 Off with BOULT100 + Extra 5% Off on Prepaid UPI Checkout + Free Delivery.</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Audio Decision Snippet</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => setPriority("gaming")} className={`rounded-full px-4 py-2 text-sm font-medium ${priority === "gaming" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Zero Lag Gaming</button>
          <button type="button" onClick={() => setPriority("calling")} className={`rounded-full px-4 py-2 text-sm font-medium ${priority === "calling" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Crystal Clear Calling</button>
          <button type="button" onClick={() => setPriority("battery")} className={`rounded-full px-4 py-2 text-sm font-medium ${priority === "battery" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Multi-Day Battery</button>
        </div>
        {recommendation && (
          <div className="mt-4 rounded-xl border border-ledger-line bg-paper-alt p-4">
            <p className="font-semibold text-ink">Recommended: {recommendation.name}</p>
            <p className="mt-1 text-sm text-ink-soft">{recommendation.specs}</p>
            <a href={link(recommendation.url, recommendation.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
              Get Deal on Boult
            </a>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Redeem on Boult Audio
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Audio & Smartwatch Use-Case Matcher</h2>
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
                Get Deal on Boult
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How do I apply coupon code BOULT100 at checkout?</summary>
          <p className="mt-2 text-sm text-ink-soft">Add any earbuds, smartwatch, or audio accessory worth ₹999 or more to your cart on goboult.co.in. At the payment step, enter BOULT100 in the discount coupon box to receive an instant ₹100 deduction.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">What does Combat Mode™ mean in Boult gaming earbuds?</summary>
          <p className="mt-2 text-sm text-ink-soft">Combat Mode™ optimizes the Bluetooth audio transmission to deliver ultra-low latency down to 40 milliseconds, ensuring in-game footsteps and gunshots sync in real time without audio delay.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Do Boult products purchased via these deals come with brand warranty?</summary>
          <p className="mt-2 text-sm text-ink-soft">Yes. All purchases made through official store links on goboult.co.in include Boult's official 1-year replacement warranty, which you can register on their website using your invoice.</p>
        </details>
      </section>
    </div>
  );
}
