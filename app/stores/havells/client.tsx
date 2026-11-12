"use client";

import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("havells", url, sub);
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function HavellsPage({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="Havells India"
        subtitle="Havells • Making A Difference with Smart & Energy-Efficient Appliances"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">BLDC Energy Savings Calculator</h2>
        <p className="mt-2 text-sm text-ink-soft">Replacing a standard 75W fan with a Havells 28W BLDC fan saves ~₹1,400 per fan on your annual electricity bill (paying for itself in under 3 years).</p>
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
        <h2 className="text-xl font-bold text-ink">Appliance Use-Case & Energy Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on Havells</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does warranty registration work on the Havells official store?</summary><p className="mt-2 text-sm text-ink-soft">Every Havells product includes a 100% genuine manufacturer warranty; you can register it on their website using your invoice and serial number.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Is doorstep installation available?</summary><p className="mt-2 text-sm text-ink-soft">Yes, eligible products include doorstep installation as per Havells service terms.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How to apply HAVELLS500?</summary><p className="mt-2 text-sm text-ink-soft">Add products worth ₹4,999 or more and enter HAVELLS500 at checkout to get flat ₹500 off.</p></details>
      </section>
    </div>
  );
}
