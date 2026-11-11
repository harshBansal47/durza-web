"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("sirona", url, sub);
const SIZES = [
  { id: "s", label: "Under 25 & Not Given Birth?", size: "Size S (Small)", detail: "Designed for teens and women below 25 who have not given birth — narrower bell, secure fit for light-to-moderate flow.", url: "https://www.thesirona.com/products/sirona-reusable-menstrual-cup", sub: "cup_size_s" },
  { id: "m", label: "25+ or Normal Flow?", size: "Size M (Medium — Most Popular)", detail: "The all-rounder: perfect for most women with normal flow, regardless of age. Balanced capacity and comfort.", url: "https://www.thesirona.com/products/sirona-reusable-menstrual-cup", sub: "cup_size_m" },
  { id: "l", label: "Given Birth Vaginally?", size: "Size L (Large)", detail: "Higher capacity rim for post-childbirth anatomy and heavy-flow days — reliable protection for up to 10 hours.", url: "https://www.thesirona.com/products/sirona-reusable-menstrual-cup", sub: "cup_size_l" },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
}

export default function SironaClient({ offers, products }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [size, setSize] = useState(SIZES[1]);
  const filtered = products.filter((p) => p.tab === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-fuchsia-950 to-pink-700 text-white p-8">
        <h1 className="text-3xl font-bold">Sirona Hygiene</h1>
        <p className="mt-2 text-sm font-medium text-white">Period Positive • FDA-Approved Menstrual Cups, Pain Relief Patches &amp; PeeBuddy</p>
        <p className="mt-1 text-xs font-semibold text-white/90">100% Medical-Grade Silicone • Hypoallergenic • Dermatologist Approved • Free Delivery Above ₹399</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">2-Click Menstrual Cup Size Finder</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button key={s.id} type="button" onClick={() => setSize(s)} className={`rounded-full px-4 py-2 text-sm font-medium ${size.id === s.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{s.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">Recommended: {size.size}</p>
          <p className="mt-1 text-sm text-ink-soft">{size.detail}</p>
        </div>
        <p className="mt-3 text-xs font-medium text-ink">Switching to a cup saves roughly ₹15,000 in disposable pad expenses over 5 years — the cup costs ₹299 and lasts a decade.</p>
        <a href={link(size.url, size.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Size {size.id.toUpperCase()} Cup on Sirona</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Sirona</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Feminine Hygiene &amp; Period Comfort Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on Sirona</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I determine the correct menstrual cup size?</summary><p className="mt-2 text-sm text-ink-soft">Pick Size S if you are under 25 and have never given birth; Size M for most women with normal flow; Size L if you have given birth vaginally or have a heavy flow. Still unsure? Start with M — it fits the majority.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do PeeBuddy funnels prevent UTIs in public restrooms?</summary><p className="mt-2 text-sm text-ink-soft">PeeBuddy lets you stand and urinate without contacting soiled toilet seats, avoiding the cross-contamination that causes urinary tract infections during travel and in dirty public washrooms.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What are the free delivery terms?</summary><p className="mt-2 text-sm text-ink-soft">Free express delivery across India on all orders of ₹399 or more — a single PeeBuddy pack or heat patches cross the threshold.</p></details>
      </section>
    </div>
  );
}
