"use client";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("wonderchef", url, sub);
const ADVISOR = [
  { title: "100% PFOA & Lead-Free", detail: "Wonderchef Granite coatings use non-toxic mineral layers safe for high-heat Indian tadka — no leaching, no flaking fumes." },
  { title: "Induction + Gas Dual Base", detail: "All granite pans carry a magnetic stainless steel base plate, fully compatible with both induction cooktops and gas stoves." },
  { title: "Stacking Formula", detail: "Catalog 49% off + code CHEF10 (extra 10%) + 5% instant UPI deduction = maximum savings on chef-curated kitchenware." },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
}

export default function WonderchefClient({ offers, products }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === concern);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-red-950 to-orange-800 text-white p-8">
        <h1 className="text-3xl font-bold">Wonderchef</h1>
        <p className="mt-2 text-sm font-medium text-white">Cook with Pride • Curated by Chef Sanjeev Kapoor • Healthy &amp; Smart Kitchens</p>
        <p className="mt-1 text-xs font-semibold text-white/90">Up to 2-Year On-Site / Replacement Warranty • Free Delivery Above ₹999</p>
      </section>

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Cookware Safety &amp; Wattage Advisor</h2>
        <ol className="mt-4 space-y-3">
          {ADVISOR.map((item, i) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{i + 1}</span>
              <span className="text-sm"><span className="font-semibold text-ink">{item.title}: </span><span className="text-ink-soft">{item.detail}</span></span>
            </li>
          ))}
        </ol>
        <a href={link("https://www.wonderchef.com/collections/cookware-sets", "safety_advisor")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Granite Cookware Sets</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Wonderchef</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Kitchen Appliance &amp; Cookware Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on Wonderchef</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How is the Wonderchef Nutri-Blend different from a standard mixer grinder?</summary><p className="mt-2 text-sm text-ink-soft">The Nutri-Blend runs a 22,000 RPM copper motor with unbreakable jars built for smoothies and masala grinding in seconds, with juicer and chopper attachments — standard mixers lack the RPM and jar ecosystem.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">Does granite cookware work on induction stoves?</summary><p className="mt-2 text-sm text-ink-soft">Yes. Wonderchef granite pans feature a stainless magnetic base, making them fully induction and gas compatible with even, fast heating across both cooktop types.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I claim the warranty?</summary><p className="mt-2 text-sm text-ink-soft">Register your appliance or cookware on wonderchef.com with the invoice to activate the 2-year on-site / replacement warranty, then raise a service request through support.</p></details>
      </section>
    </div>
  );
}
