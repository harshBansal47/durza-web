"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("the-natural-wash", url, sub);
const CART_FILLERS = [
  { id: "potato", label: "Potato Wax (₹380)", amount: 380 },
  { id: "beetroot", label: "Beetroot Lip Balm (₹220)", amount: 220 },
  { id: "rose", label: "Rose Water (₹299)", amount: 299 },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
}

export default function TheNaturalWashClient({ offers, products }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [cart, setCart] = useState<string[]>(["potato"]);
  const filtered = products.filter((p) => p.tab === concern);
  const subtotal = CART_FILLERS.filter((c) => cart.includes(c.id)).reduce((s, c) => s + c.amount, 0);
  const tnw15 = Math.round(subtotal * 0.15);
  const freeShip = subtotal >= 450;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-rose-900 to-red-700 text-white p-8">
        <h1 className="text-3xl font-bold">The Natural Wash</h1>
        <p className="mt-2 text-sm font-medium text-white">Pure Natural Care • Authentic Ayurveda with Potent Natural Kitchen Actives</p>
        <p className="mt-1 text-xs font-semibold text-white/90">100% Free from Parabens, Sulphates &amp; Harmful Preservatives • Free Delivery Above ₹450</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Clean Beauty Cart-Filler Assistant</h2>
        <p className="mt-1 text-sm text-ink-soft">Tap items to see when you cross ₹450 free shipping and unlock TNW15.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {CART_FILLERS.map((c) => (
            <button key={c.id} type="button" onClick={() => setCart((cur) => cur.includes(c.id) ? cur.filter((x) => x !== c.id) : [...cur, c.id])} className={`rounded-full px-4 py-2 text-sm font-medium ${cart.includes(c.id) ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-ledger-line p-4 text-sm">
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">Cart subtotal</span><span className="font-semibold text-ink">₹{subtotal}</span></div>
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">TNW15 (15% off)</span><span className="font-semibold text-ink">− ₹{tnw15}</span></div>
          <div className="flex items-center justify-between py-2"><span className="text-ink-soft">Free shipping (₹450+)</span><span className="font-semibold text-ink">{freeShip ? "Unlocked" : `Add ₹${450 - subtotal} more`}</span></div>
        </div>
        <a href={link("https://www.thenaturalwash.com/collections/best-sellers", "cart_filler")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Best Sellers on TNW</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on TNW</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Kitchen-Active Ayurvedic Beauty Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on TNW</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Why are raw potato and beetroot effective in skincare?</summary><p className="mt-2 text-sm text-ink-soft">Potato starch contains natural catecholase enzymes that fade dark spots and blemishes; beetroot is rich in betalain antioxidants that tint and nourish chapped lips without synthetic dyes.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Does TNW lip balm contain artificial dyes?</summary><p className="mt-2 text-sm text-ink-soft">No. The Beetroot Lip Balm gets its tint entirely from pure beetroot extract with shea and cocoa butter — zero artificial colorants or parabens.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the shipping policy?</summary><p className="mt-2 text-sm text-ink-soft">Free doorstep delivery across India on all orders of ₹450 or more; a small flat shipping fee applies below ₹450.</p></details>
      </section>
    </div>
  );
}
