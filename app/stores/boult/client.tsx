"use client";

import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";

import { useState } from "react";

import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("boult", url, sub);

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function BoultStorePage({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [priority, setPriority] = useState("gaming");
  const filtered = products.filter((p) => p.tab === concern);

  const recommendation = products.find((p) => {
    if (priority === "gaming" && p.tab.startsWith("Gaming")) return true;
    if (priority === "calling" && p.tab.startsWith("Office")) return true;
    if (priority === "battery" && p.tab.startsWith("Heavy")) return true;
    return false;
  }) || filtered[0];

  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="Boult Audio"
        subtitle="Engineered for Sound • Premium TWS, ANC Earbuds & AMOLED Smartwatches"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />

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
            <a href={link(recommendation.targetUrl, recommendation.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
              Get Deal on Boult
            </a>
          </div>
        )}
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
        <h2 className="text-xl font-bold text-ink">Audio & Smartwatch Use-Case Matcher</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((c) => (
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
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
          <p className="mt-2 text-sm text-ink-soft">Yes. All purchases made through official store links on goboult.co.in include Boult&apos;s official 1-year replacement warranty, which you can register on their website using your invoice.</p>
        </details>
      </section>
    </div>
  );
}
