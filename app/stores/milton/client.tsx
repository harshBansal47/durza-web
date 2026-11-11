"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
const link = (url: string, sub: string): string => getAffiliateLink("milton", url, sub);
const OFFERS = [
  { code: "MILTON10", badge: "SITEWIDE EXTRA", title: "Extra 10% OFF on Thermosteel Flasks & Tiffins", desc: "Stacks on top of existing discounts across Flip Lid flasks and casseroles.", url: "https://www.milton.in/collections/bestsellers", sub: "milton10" },
  { code: "OFFICE15", badge: "WORKDAY BUNDLE", title: "Flat 15% OFF on Office Lunch & Bottle Combos", desc: "Applies when bundling insulated lunch boxes with office flasks.", url: "https://www.milton.in/collections/lunch-boxes", sub: "office15" },
  { code: "PREPAID5", badge: "INSTANT UPI", title: "Extra 5% Instant OFF on Prepaid Checkout", desc: "Automatic payment gateway deduction on UPI and Card orders.", url: "https://www.milton.in", sub: "prepaid5" },
  { code: "FREESHIP", badge: "DELIVERY PERK", title: "Free Nationwide Shipping Above ₹499", desc: "Zero delivery charges across India on orders of ₹499 or more.", url: "https://www.milton.in", sub: "freeship" },
];
const CONCERNS = ["24H Vacuum Thermosteel", "Office & Electric Tiffins", "Pure Copper Bottles", "Airtight Kitchen Storage"];
const PRODUCTS = [
  { concern: "24H Vacuum Thermosteel", name: "Milton Thermosteel Flip Lid Vacuum Insulated Flask (1000ml)", specs: "304 Grade Rust-Proof Steel • Hot/Cold for 24 Hours • Leakproof", price: "₹849", mrp: "₹1,135", url: "https://www.milton.in/collections/thermosteel-flasks", sub: "thermosteel_1000ml" },
  { concern: "Office & Electric Tiffins", name: "Milton Futuron Electric Lunch Box (3 Stainless Steel Containers)", specs: "Auto Cut-Off Heating • Detachable Power Cord • Heats Meal in 30 Mins", price: "₹1,399", mrp: "₹1,995", url: "https://www.milton.in/collections/electric-lunch-boxes", sub: "electric_tiffin" },
  { concern: "Office & Electric Tiffins", name: "Milton Executive Insulated 3-Container Lunch Box with Jacket", specs: "Leakproof Lock-Lid Steel Containers + Washable Carry Bag", price: "₹699", mrp: "₹945", url: "https://www.milton.in/collections/insulated-lunch-boxes", sub: "executive_lunchbox" },
  { concern: "Pure Copper Bottles", name: "Milton Copper Charge 1000ml Leakproof Ayurvedic Bottle", specs: "99.9% Pure Copper • Silicone Seal Ring • Lacquer Coated Exterior", price: "₹899", mrp: "₹1,249", url: "https://www.milton.in/collections/copper-bottles", sub: "copper_bottle" },
  { concern: "Airtight Kitchen Storage", name: "Milton Vitro Borosilicate Glass Container Set (Set of 3)", specs: "Microwave, Oven & Freezer Safe • 100% Airtight Silicone Gasket Lids", price: "₹749", mrp: "₹1,099", url: "https://www.milton.in/collections/glass-containers", sub: "glass_containers" },
];
const NEEDS = [
  { id: "hot", label: "Need 24H Boiling Hot Tea/Coffee?", result: "Vacuum Thermosteel (Flip Lid 1000ml)", detail: "A double-walled vacuum flask keeps tea, coffee or dal at boiling temperature for up to 24 hours. Pre-heat with hot water for 5 minutes first.", note: "₹849 • 25% OFF + extra 10% with MILTON10", url: "https://www.milton.in/collections/thermosteel-flasks", sub: "need_hot" },
  { id: "lunch", label: "Need Piping Hot Office Lunch Without Microwave?", result: "Plug-in Electric Tiffin (Futuron)", detail: "Three stainless containers with auto cut-off heating warm your home meal in about 30 minutes — no office kitchen required.", note: "₹1,399 • 30% OFF + eligible for OFFICE15", url: "https://www.milton.in/collections/electric-lunch-boxes", sub: "need_lunch" },
  { id: "copper", label: "Overnight Ayurvedic Copper Water?", result: "99.9% Pure Copper Bottle", detail: "Store room-temperature or cool water overnight for the traditional tamra jal Ayurvedic practice.", note: "Never pour hot or boiling water into a copper bottle — it can leach excess copper and damage the lacquer.", url: "https://www.milton.in/collections/copper-bottles", sub: "need_copper" },
];
export default function MiltonClient() {
  const [concern, setConcern] = useState(CONCERNS[0]);
  const [need, setNeed] = useState(NEEDS[0]);
  const filtered = PRODUCTS.filter((p) => p.concern === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-slate-800 to-sky-700 text-white p-8">
        <h1 className="text-3xl font-bold">Milton India</h1>
        <p className="mt-2 text-sm font-medium text-white">Kuch Naya Sochte Hain • 24H Vacuum Thermosteel, Electric Tiffins &amp; Pure Copper</p>
        <p className="mt-1 text-xs font-semibold text-white/90">1-Year Manufacturer Warranty on Vacuum Insulation &amp; Electrical Heating • Free Delivery Above ₹499</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Insulation &amp; Use-Case Advisor</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {NEEDS.map((n) => (
            <button key={n.id} type="button" onClick={() => setNeed(n)} className={`rounded-full px-4 py-2 text-sm font-medium ${need.id === n.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{n.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">Recommended: {need.result}</p>
          <p className="mt-1 text-sm text-ink-soft">{need.detail}</p>
          <p className="mt-2 text-xs font-medium text-ink">{need.note}</p>
        </div>
        <a href={link(need.url, need.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop {need.result}</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.desc}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.url, o.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Milton</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Daily Carry &amp; Insulation Hours Matcher</h2>
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
              <a href={link(p.url, p.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Shop on Milton</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I test the vacuum insulation on a Thermosteel flask?</summary><p className="mt-2 text-sm text-ink-soft">Fill the flask with boiling water, close the lid, and touch the outer body after 5 minutes. If the exterior stays cool, the vacuum seal is intact. If it feels warm, contact support — do not try to repair a vacuum flask yourself.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Why shouldn&apos;t hot liquids go in a pure copper bottle?</summary><p className="mt-2 text-sm text-ink-soft">Heat accelerates copper leaching beyond safe daily limits and can strip the interior lacquer. Store only room-temperature or cool water, and use steel flasks for hot beverages.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What does the 1-year manufacturer warranty cover?</summary><p className="mt-2 text-sm text-ink-soft">One year on vacuum insulation performance and electrical heating elements (Futuron). Register your product on milton.in with the invoice to claim repairs or replacement.</p></details>
      </section>
    </div>
  );
}
