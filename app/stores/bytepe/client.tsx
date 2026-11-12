"use client";

import StoreHero from "@/components/StoreHero";

import { useState } from "react";

import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("bytepe", url, sub);

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function BytePeStorePage({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);

  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="BytePe"
        subtitle="Seamless Digital Payments, Instant Bill Cashback & Smart Merchant Payouts"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Platform Fee Transparency Calculator</h2>
        <div className="mt-4 space-y-2 text-sm text-ink-soft">
          <p>Other payment apps charge ₹2 to ₹5 platform fee per mobile recharge.</p>
          <p>BytePe Charges: ₹0 Platform Fee + Gives up to 5% instant cashback with code RECHARGE10.</p>
          <p>Net Saving Highlight: Save ₹150–₹300/year just by eliminating convenience fees on everyday utility bills.</p>
        </div>
        <a href={link("https://bytepe.com", "fee_calculator")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
          Calculate My Bill Savings on BytePe
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
              Activate on BytePe
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Payment Service & Cashback Matcher</h2>
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
              <p className="mt-1 text-xs text-ink-soft">{p.price}</p>
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
                Pay & Earn Cashback on BytePe
              </a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">Does BytePe charge convenience fees on mobile and electricity bill payments?</summary>
          <p className="mt-2 text-sm text-ink-soft">Unlike many major wallet and UPI apps that levy a ₹2 to ₹5 platform or convenience fee, BytePe processes standard BBPS utility bill payments and mobile recharges with zero platform fee.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How does the FIRSTBILL cashback code work?</summary>
          <p className="mt-2 text-sm text-ink-soft">Create your BytePe account, choose your state electricity or piped gas provider under the BBPS section, enter a bill amount of ₹500 or more, and apply code FIRSTBILL. Your cashback is credited to your BytePe wallet immediately upon bank settlement.</p>
        </details>
        <details className="rounded-xl border border-ledger-line bg-white p-4">
          <summary className="font-medium text-ink">How fast do brand digital gift vouchers get delivered?</summary>
          <p className="mt-2 text-sm text-ink-soft">Gift vouchers purchased on BytePe are delivered instantly via SMS and email within seconds of transaction confirmation, ready to redeem on Amazon, Flipkart, or food delivery apps.</p>
        </details>
      </section>
    </div>
  );
}
