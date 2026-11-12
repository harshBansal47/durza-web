"use client";

import StoreHero from "@/components/StoreHero";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("igp", url, sub);
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function IgpPage({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [slot, setSlot] = useState("midnight");
  const filtered = products.filter((p) => p.tab === concern);
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="IGP.com"
        subtitle="India's Largest Online Gifting Destination • Delivered with Emotion"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Delivery Slot & Timing Advisor</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => setSlot("midnight")} className={`rounded-full px-4 py-2 text-sm font-medium ${slot === "midnight" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Tonight at 12:00 AM</button>
          <button type="button" onClick={() => setSlot("sameday")} className={`rounded-full px-4 py-2 text-sm font-medium ${slot === "sameday" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Today in 2-3 Hours</button>
          <button type="button" onClick={() => setSlot("custom")} className={`rounded-full px-4 py-2 text-sm font-medium ${slot === "custom" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>In 2 to 4 Days</button>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          {slot === "midnight" && "Recommended: Fresh Cakes & Floral Bouquets with Midnight Slot guidance."}
          {slot === "sameday" && "Recommended: Express local dispatch items available today."}
          {slot === "custom" && "Recommended: Personalized Photo Crystals & Caricatures."}
        </p>
        <a href={link("https://www.igp.com", "delivery_advisor")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Check Delivery Slots on IGP</a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on IGP</a>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold text-ink">Occasion & Gift Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Send Gift via IGP</a>
            </div>
          ))}
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does Midnight Delivery work on IGP.com?</summary><p className="mt-2 text-sm text-ink-soft">Select the Midnight Delivery slot during checkout; the surprise arrives between 11:00 PM and 11:59 PM across 400+ cities.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Can coupon code IGP10 be applied to personalized gifts?</summary><p className="mt-2 text-sm text-ink-soft">Yes, IGP10 provides an additional 10% discount on custom photo frames, LED lamps, and hampers with no minimum.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What happens if the recipient is not available?</summary><p className="mt-2 text-sm text-ink-soft">For perishables, delivery agents coordinate via phone; standard products ship with courier partners and SMS tracking.</p></details>
      </section>
    </div>
  );
}
