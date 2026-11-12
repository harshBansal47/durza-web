"use client";

import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("the-man-company", url, sub);
const STEPS = [
  { title: "Step 1 — Micro-needle 2x a week", detail: "Roll the 0.5mm titanium Derma Roller over patchy areas twice weekly to boost blood circulation and collagen production around dormant follicles." },
  { title: "Step 2 — Feed follicles daily", detail: "Apply Almond & Thyme Growth Oil every evening to nourish active hair follicles and soften coarse beard hair." },
  { title: "Step 3 — Bundle and stack", detail: "Buy the Derma Roller + Growth Oil + Wash as a kit and apply code BEARD20 for flat 20% off, plus free shipping above ₹499." },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function TheManCompanyClient({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="The Man Company"
        subtitle="Gentleman In You • Premium Beard Growth, Charcoal Detox & Long-Lasting Scents"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">The 2-Step Patchy Beard Solution Decoder</h2>
        <ol className="mt-4 space-y-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{i + 1}</span>
              <span className="text-sm"><span className="font-semibold text-ink">{s.title}: </span><span className="text-ink-soft">{s.detail}</span></span>
            </li>
          ))}
        </ol>
        <a href={link("https://www.themancompany.com/products/beard-growth-kit", "beard_decoder")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop the Beard Growth Pro Kit</a>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((o) => (
          <OfferCard
            key={o.code}
            bookmarkId={o.id}
            code={o.code}
            badge={o.badge}
            title={o.title}
            description={o.description}
            ctaHref={link(o.targetUrl, o.subId)}
            expiresAt={o.expiresAt}
          />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Men&apos;s Grooming Routine &amp; Scent Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on The Man Company</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How long does The Man Company Beard Growth Oil take to show results?</summary><p className="mt-2 text-sm text-ink-soft">Most users report softer, thicker-looking growth in 4–8 weeks of nightly use with the Derma Roller twice a week. Results vary by genetics and consistency — combine oil with the roller for best outcomes.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the difference between gas deodorants and Blanc EDP?</summary><p className="mt-2 text-sm text-ink-soft">Deodorants only mask sweat odour for hours. Blanc Eau de Parfum is an 8H+ fragrance with lemon, birch, lavender and patchouli notes layered for office and gym wear — it projects without overpowering.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the minimum order for free shipping?</summary><p className="mt-2 text-sm text-ink-soft">Free doorstep delivery across India on all orders of ₹499 or more — the Beard Growth Oil alone is enough to qualify.</p></details>
      </section>
    </div>
  );
}
