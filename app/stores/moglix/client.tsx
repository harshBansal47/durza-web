"use client";
import { useState } from "react";
const TRACK = "https://track.vcommission.com/click?campaign_id=10351&pub_id=133499";
function link(url: string, sub: string) { return `${TRACK}&sub1=${sub}&url=${encodeURIComponent(url)}`; }
const OFFERS = [
  { code: "MOGLIX100", badge: "SITEWIDE INSTANT", title: "Flat ₹100 OFF on Orders Above ₹1,499", desc: "Valid on Bosch/Black+Decker drills, pressure washers and hand tool kits.", url: "https://www.moglix.com", sub: "moglix100" },
  { code: "TOOLS250", badge: "WORKSHOP SAVER", title: "Flat ₹250 OFF on Orders Above ₹3,499", desc: "Best for angle grinders, welding machines and commercial safety orders.", url: "https://www.moglix.com", sub: "tools250" },
  { code: "PREPAID5", badge: "EXTRA UPI", title: "Extra 5% Instant OFF on Prepaid Checkout", desc: "Instant deduction on UPI, NetBanking and Cards. Stacks with coupons.", url: "https://www.moglix.com", sub: "prepaid5" },
  { code: "GSTSAVE", badge: "BUSINESS PERK", title: "Save up to 28% Extra via GST Input Tax Credit", desc: "Enter your GSTIN at checkout for a fully compliant tax invoice.", url: "https://www.moglix.com", sub: "gstsave" },
];
const CONCERNS = ["Home DIY & Power Drills", "Car & Bike Pressure Washers", "Safety Shoes & PPE", "Smart Security & Electricals"];
const PRODUCTS = [
  { concern: "Home DIY & Power Drills", name: "Bosch GSB 500W RE 13mm Impact Drill Kit with 100 Accessories", specs: "500W Copper Motor • Variable Speed + Reverse • Full Home Kit", price: "₹2,699", mrp: "₹4,999", url: "https://www.moglix.com", sub: "bosch_drill_kit" },
  { concern: "Car & Bike Pressure Washers", name: "High-Pressure Car & Bike Washer (1800W, 135 Bar)", specs: "Auto-Stop Induction Motor • 8m Hose + Foam Cannon + Adjustable Nozzle", price: "₹4,299", mrp: "₹7,999", url: "https://www.moglix.com", sub: "pressure_washer" },
  { concern: "Safety Shoes & PPE", name: "Allen Cooper Steel Toe ISI Certified Industrial Safety Shoes", specs: "200J Steel Toe • Oil & Acid Resistant PU Sole • Breathable Mesh", price: "₹999", mrp: "₹2,199", url: "https://www.moglix.com", sub: "safety_shoes" },
  { concern: "Smart Security & Electricals", name: "CP Plus 3MP Full HD Wi-Fi Pan-Tilt Smart Home CCTV Camera", specs: "360° Coverage • Night Vision • Two-Way Audio • Motion Tracking", price: "₹1,499", mrp: "₹3,299", url: "https://www.moglix.com", sub: "wifi_cctv" },
];
const BUYERS = [
  { id: "retail", label: "Retail Buyer (Home DIY)", lines: [["High-Pressure Washer", "₹4,299"], ["TOOLS250 coupon", "− ₹250"], ["Effective price", "₹4,049"]], note: "Plus extra 5% instant off on prepaid UPI/card checkout." },
  { id: "gst", label: "GST Registered Business", lines: [["High-Pressure Washer", "₹4,299"], ["TOOLS250 coupon", "− ₹250"], ["18% GST Input Tax Credit", "~ − ₹619"], ["Effective net cost", "~ ₹3,430"]], note: "Claim back the GST component as Input Tax Credit in your next GST return — enter your GSTIN at checkout." },
];
export default function MoglixClient() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [buyer, setBuyer] = useState(BUYERS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-amber-700 to-yellow-600 text-white p-8">
        <h1 className="text-3xl font-bold">Moglix</h1>
        <p className="mt-2 text-sm font-medium text-white">Power Tools, Safety Gear, Automotive &amp; Electricals • GST Invoice Ready</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Free Shipping across 25,000+ PIN Codes above ₹499 • Up to 18–28% GST Input Tax Credit</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">True Net Cost Calculator</h2>
        <p className="mt-1 text-sm text-ink-soft">Same ₹4,299 pressure washer — very different net cost depending on who is buying.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {BUYERS.map((b) => (
            <button key={b.id} type="button" onClick={() => setBuyer(b)} className={`rounded-full px-4 py-2 text-sm font-medium ${buyer.id === b.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{b.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-ledger-line p-4">
          {buyer.lines.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-b border-ledger-line py-2 text-sm last:border-0">
              <span className="text-ink-soft">{label}</span>
              <span className="font-semibold text-ink">{value}</span>
            </div>
          ))}
          <p className="mt-2 text-xs text-ink-soft">{buyer.note}</p>
        </div>
        <a href={link("https://www.moglix.com", "net_cost_calculator")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop with GST Invoice on Moglix</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Moglix</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Home DIY &amp; Industrial Equipment Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on Moglix</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I download a GST tax invoice on Moglix?</summary><p className="mt-2 text-sm text-ink-soft">Enter your GSTIN at checkout or save it in your Moglix business profile — every order then ships with a compliant GST tax invoice, downloadable from My Orders.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What warranty covers Bosch and Stanley power tools?</summary><p className="mt-2 text-sm text-ink-soft">Genuine Bosch and Stanley tools carry the manufacturer warranty (typically 1 year), serviceable at authorised centres. Keep your Moglix invoice as proof of purchase.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does bulk quote pricing work?</summary><p className="mt-2 text-sm text-ink-soft">Add items to your cart, choose the bulk/quote option, and the Moglix B2B team sends volume-based pricing with delivery timelines — ideal for workshops, contractors and facility managers.</p></details>
      </section>
    </div>
  );
}
