"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("healthkart", url, sub);
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
}

export default function HealthKartPage({ offers, products }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white p-8">
        <h1 className="text-3xl font-bold">HealthKart</h1>
        <p className="mt-2 text-sm font-medium text-white">India&apos;s #1 Authentic Supplement Store • Zero Fake Supplements Guaranteed</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Direct Brand Sourcing with Scratch-to-Verify Security Codes • Free Delivery Above ₹499</p>
      </section>
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">The Triple Stacking Formula</h2>
        <p className="mt-2 text-sm text-ink-soft">Catalog Markdown + Code WHEY300 + Extra 5% Instant UPI Discount + HK Cash Rewards = Maximum verified savings on authentic sports nutrition.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on HealthKart</a>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold text-ink">Athlete Goal & Authenticity Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on HealthKart</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How to verify scratch codes to prove authenticity?</summary><p className="mt-2 text-sm text-ink-soft">Every supplement comes with a scratch-off code; scratch it and verify on the brand site or app to confirm authenticity.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Can I stack HK Cash with coupon codes?</summary><p className="mt-2 text-sm text-ink-soft">Yes, HK Cash rewards can be redeemed alongside coupon code discounts.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What are the shipping criteria?</summary><p className="mt-2 text-sm text-ink-soft">Free shipping on orders above ₹499 across India.</p></details>
      </section>
    </div>
  );
}
