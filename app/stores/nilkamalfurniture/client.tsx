"use client";

import StoreHero from "@/components/StoreHero";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("nilkamalfurniture", url, sub);
const CONFIDENCE = [
  { title: "Mesh Breathability", detail: "Aerated mesh backs prevent back sweating during long Indian summers — the single biggest complaint with leatherette chairs." },
  { title: "Free Assembly Service", detail: "Wardrobes, beds and large tables include complimentary professional carpenter assembly in covered cities — no flatpack headaches." },
  { title: "Dual Coupon Stacking", detail: "Base sale discount + NILKAMAL500 (above ₹4,999) + 5% instant UPI deduction stack together at checkout." },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function NilkamalFurnitureClient({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="Nilkamal Furniture"
        subtitle="India's Favorite Furniture Brand • Ergonomic Chairs, Wardrobes & Solid Living"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Ergonomic WFH &amp; Assembly Confidence Checker</h2>
        <ol className="mt-4 space-y-3">
          {CONFIDENCE.map((item, i) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{i + 1}</span>
              <span className="text-sm"><span className="font-semibold text-ink">{item.title}: </span><span className="text-ink-soft">{item.detail}</span></span>
            </li>
          ))}
        </ol>
        <a href={link("https://www.nilkamalfurniture.com/collections/best-sellers", "confidence_checker")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Best Sellers on Nilkamal</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Nilkamal</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Room Utility &amp; Ergonomic Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Shop on Nilkamal</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does Nilkamal carpenter assembly work?</summary><p className="mt-2 text-sm text-ink-soft">Eligible large furniture — wardrobes, beds and tables — is delivered and assembled by a Nilkamal-trained carpenter at no extra cost in covered cities. The slot is scheduled after delivery confirmation; keep the invoice handy for the team.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What are the return and warranty terms on plastic and wood furniture?</summary><p className="mt-2 text-sm text-ink-soft">Structural frames carry 1–5 year manufacturer warranties against defects. Returns are accepted within the standard return window with the original invoice and packaging, subject to Nilkamal&apos;s terms.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Can NILKAMAL500 stack with the 5% UPI discount?</summary><p className="mt-2 text-sm text-ink-soft">Yes. Apply NILKAMAL500 at checkout for flat ₹500 off above ₹4,999, then pay via UPI or card for an extra 5% instant deduction on the remaining balance. BEDROOM1000 works the same above ₹9,999.</p></details>
      </section>
    </div>
  );
}
