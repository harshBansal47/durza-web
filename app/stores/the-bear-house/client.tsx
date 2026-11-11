"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("the-bear-house", url, sub);
const BUNDLE = { shirt: 1399, chino: 1699, code: 500, upiRate: 0.05 };
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
}

export default function TheBearHouseClient({ offers, products }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [qty, setQty] = useState({ shirt: true, chino: true });
  const filtered = products.filter((p) => p.tab === concern);
  const subtotal = (qty.shirt ? BUNDLE.shirt : 0) + (qty.chino ? BUNDLE.chino : 0);
  const bundleOff = subtotal >= 2999 ? BUNDLE.code : 0;
  const upiOff = Math.round((subtotal - bundleOff) * BUNDLE.upiRate);
  const net = subtotal - bundleOff - upiOff;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-orange-950 to-amber-800 text-white p-8">
        <h1 className="text-3xl font-bold">The Bear House</h1>
        <p className="mt-2 text-sm font-medium text-white">Crafted For Comfort • Premium Textured Casual Shirts, Linen &amp; Tailored Menswear</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Free Delivery Above ₹999 • Hassle-Free 7-Day Size Exchange &amp; Easy Returns</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Smart 2-Item Wardrobe Multiplier</h2>
        <p className="mt-1 text-sm text-ink-soft">Pick a complete head-to-toe workwear look and watch BUNDLE500 + 5% UPI stack.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => setQty((q) => ({ ...q, shirt: !q.shirt }))} className={`rounded-full px-4 py-2 text-sm font-medium ${qty.shirt ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Oxford Shirt (₹1,399)</button>
          <button type="button" onClick={() => setQty((q) => ({ ...q, chino: !q.chino }))} className={`rounded-full px-4 py-2 text-sm font-medium ${qty.chino ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Stretch Chino (₹1,699)</button>
        </div>
        <div className="mt-4 rounded-xl border border-ledger-line p-4 text-sm">
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">Subtotal</span><span className="font-semibold text-ink">₹{subtotal.toLocaleString("en-IN")}</span></div>
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">BUNDLE500 {subtotal < 2999 && "(needs ₹2,999+)"}</span><span className="font-semibold text-ink">− ₹{bundleOff}</span></div>
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">5% UPI instant deduction</span><span className="font-semibold text-ink">− ₹{upiOff}</span></div>
          <div className="flex items-center justify-between py-2"><span className="font-semibold text-ink">Net you pay</span><span className="text-lg font-bold text-ink">₹{net.toLocaleString("en-IN")}</span></div>
        </div>
        <a href={link("https://thebearhouse.com/collections/best-sellers", "wardrobe_multiplier")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Build My 2-Piece Look</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on The Bear House</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Menswear Fabric &amp; Occasion Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Shop on The Bear House</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I choose between regular fit and slim fit?</summary><p className="mt-2 text-sm text-ink-soft">Slim fit tapers at the chest and waist for a sculpted, modern silhouette. Regular fit keeps a straighter cut with more room through the torso — pick slim for office smart-casual and regular for all-day comfort.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How should I wash linen shirts to prevent shrinkage?</summary><p className="mt-2 text-sm text-ink-soft">Gentle machine wash cold (or hand wash) with mild detergent, iron on medium while slightly damp, and avoid tumble drying on high heat. Natural linen relaxes and softens with each wash.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does the 7-day exchange process work?</summary><p className="mt-2 text-sm text-ink-soft">Initiate a size exchange within 7 days of delivery from your account or support. The reverse pickup is free, and the replacement ships after the courier collects the original pair.</p></details>
      </section>
    </div>
  );
}
