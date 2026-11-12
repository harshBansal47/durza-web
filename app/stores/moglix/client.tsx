"use client";

import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("moglix", url, sub);
const BUYERS = [
  { id: "retail", label: "Retail Buyer (Home DIY)", lines: [["High-Pressure Washer", "₹4,299"], ["TOOLS250 coupon", "− ₹250"], ["Effective price", "₹4,049"]], note: "Plus extra 5% instant off on prepaid UPI/card checkout." },
  { id: "gst", label: "GST Registered Business", lines: [["High-Pressure Washer", "₹4,299"], ["TOOLS250 coupon", "− ₹250"], ["18% GST Input Tax Credit", "~ − ₹619"], ["Effective net cost", "~ ₹3,430"]], note: "Claim back the GST component as Input Tax Credit in your next GST return — enter your GSTIN at checkout." },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function MoglixClient({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [buyer, setBuyer] = useState(BUYERS[0]);
  const filtered = products.filter((p) => p.tab === concern);
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="Moglix"
        subtitle="Power Tools, Safety Gear, Automotive & Electricals • GST Invoice Ready"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">True Net Cost Calculator</h2>
        <p className="mt-1 text-sm text-ink-soft">Same ₹4,299 pressure washer — very different net cost depending on who is buying.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {BUYERS.map((b) => (
            <button key={b.id} type="button" onClick={() => setBuyer(b)} className={`rounded-full px-4 py-2 text-sm font-medium ${buyer.id === b.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{b.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-ledger-line p-4">
          {buyer.lines.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-b border-ledger-line py-2 text-sm last:border-0">
              <span className="text-ink-soft">{label}</span>
              <span className="font-semibold text-ink">{value}</span>
            </div>
          ))}
          <p className="mt-2 text-xs text-ink-soft">{buyer.note}</p>
        </div>
        <a href={link("https://www.moglix.com", "net_cost_calculator")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop with GST Invoice on Moglix</a>
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
        <h2 className="text-xl font-bold text-ink">Home DIY &amp; Industrial Equipment Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on Moglix</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I download a GST tax invoice on Moglix?</summary><p className="mt-2 text-sm text-ink-soft">Enter your GSTIN at checkout or save it in your Moglix business profile — every order then ships with a compliant GST tax invoice, downloadable from My Orders.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What warranty covers Bosch and Stanley power tools?</summary><p className="mt-2 text-sm text-ink-soft">Genuine Bosch and Stanley tools carry the manufacturer warranty (typically 1 year), serviceable at authorised centres. Keep your Moglix invoice as proof of purchase.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How does bulk quote pricing work?</summary><p className="mt-2 text-sm text-ink-soft">Add items to your cart, choose the bulk/quote option, and the Moglix B2B team sends volume-based pricing with delivery timelines — ideal for workshops, contractors and facility managers.</p></details>
      </section>
    </div>
  );
}
