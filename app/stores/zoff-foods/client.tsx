"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("zoff-foods", url, sub);
const RESTOCK_ITEMS = [
  { id: "masala", label: "Essential Masala Combo (₹499)", amount: 499 },
  { id: "almonds", label: "Almonds & Cardamom Combo (₹599)", amount: 599 },
];
const GRINDING = [
  { id: "traditional", label: "Traditional Chakki / Hammer Mills", points: ["Generates up to 95°C heat during grinding", "Volatile essential oils burn off — dull, bitter spices", "Preservative-free powders go stale within months", "Color fades; curcumin and capsaicin degrade"] },
  { id: "coolgrind", label: "ZOFF Cool-Grinding Tech", points: ["Spices ground at sub-zero temperatures", "Locks in up to 95% of natural essential oils", "Vibrant natural color without artificial dyes", "Medicinal curcumin and capsaicin stay potent"] },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
}

export default function ZoffFoodsClient({ offers, products }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [tech, setTech] = useState(GRINDING[1]);
  const [restock, setRestock] = useState<string[]>(["masala", "almonds"]);
  const filtered = products.filter((p) => p.tab === concern);
  const subtotal = RESTOCK_ITEMS.filter((r) => restock.includes(r.id)).reduce((s, r) => s + r.amount, 0);
  const pantry20 = Math.round(subtotal * 0.2);
  const upi = Math.round((subtotal - pantry20) * 0.05);
  const net = subtotal - pantry20 - upi;
  const freeShip = subtotal >= 499;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-orange-950 to-red-800 text-white p-8">
        <h1 className="text-3xl font-bold">ZOFF Foods</h1>
        <p className="mt-2 text-sm font-medium text-white">Zone Of Fresh Food • Cool-Grinding Technology for 100% Natural Aroma &amp; Purity</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Shark Tank India Featured • Zero Artificial Colors or Preservatives • 5-Layer Zip-Lock Freshness • Free Delivery Above ₹499</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Why Cool-Grinding Matters</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {GRINDING.map((t) => (
            <button key={t.id} type="button" onClick={() => setTech(t)} className={`rounded-full px-4 py-2 text-sm font-medium ${tech.id === t.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{t.label}</button>
          ))}
        </div>
        <ul className="mt-4 list-disc pl-5 text-sm text-ink-soft">
          {tech.points.map((pt) => <li key={pt}>{pt}</li>)}
        </ul>
      </div>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Smart Restock Hack — Full Monthly Pantry</h2>
        <p className="mt-1 text-sm text-ink-soft">Tap items to build your combo; PANTRY20 + 5% UPI apply at checkout.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {RESTOCK_ITEMS.map((r) => (
            <button key={r.id} type="button" onClick={() => setRestock((cur) => cur.includes(r.id) ? cur.filter((x) => x !== r.id) : [...cur, r.id])} className={`rounded-full px-4 py-2 text-sm font-medium ${restock.includes(r.id) ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{r.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-ledger-line p-4 text-sm">
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">Subtotal</span><span className="font-semibold text-ink">₹{subtotal.toLocaleString("en-IN")}</span></div>
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">PANTRY20 (20% off)</span><span className="font-semibold text-ink">− ₹{pantry20}</span></div>
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">5% UPI instant deduction</span><span className="font-semibold text-ink">− ₹{upi}</span></div>
          <div className="flex items-center justify-between py-2"><span className="font-semibold text-ink">Net you pay (free ship ₹499+)</span><span className="text-lg font-bold text-ink">₹{net.toLocaleString("en-IN")}</span></div>
        </div>
        <a href={link("https://zofffoods.com/collections/combos", "restock_hack")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Pantry Combos on ZOFF</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on ZOFF</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Cool-Ground Spice &amp; Pantry Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((c) => (
            <button key={c} type="button" onClick={() => setConcern(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${concern === c ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <div key={p.name} className="rounded-2xl border border-ledger-line bg-white p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{p.specs}</p>
              <div className="mt-2 flex items-baseline gap-2"><span className="text-lg font-bold text-ink">{p.price}</span><span className="text-sm text-ink-soft line-through">{p.mrp}</span></div>
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Shop on ZOFF</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What does Cool-Grinding technology do to spice aroma?</summary><p className="mt-2 text-sm text-ink-soft">Traditional mills generate up to 95°C heat that burns off volatile essential oils. ZOFF grinds at sub-zero temperatures, preserving up to 95% of natural essential oils — so Haldi smells like Haldi, and Kashmiri Mirchi keeps its natural crimson.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do the 5-layer zip-lock pouches prevent clumping in monsoon humidity?</summary><p className="mt-2 text-sm text-ink-soft">Each pouch is a multi-layer vapour barrier with a resealable zip lock, keeping moisture out so spices stay free-flowing, bright and potent even through Indian monsoons.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the free shipping threshold?</summary><p className="mt-2 text-sm text-ink-soft">Free doorstep delivery across India on all orders of ₹499 or more — the Essential Kitchen Masala Combo alone qualifies.</p></details>
      </section>
    </div>
  );
}
