"use client";

import StoreHero from "@/components/StoreHero";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
const link = (url: string, sub: string): string => getAffiliateLink("neesh-perfumes", url, sub);
const CONCENTRATIONS = [
  { id: "edp", label: "Eau de Parfum (15–18%)", headline: "Standard EDP — fades in 2–3 hours in Indian heat", points: ["15%–18% perfume oil concentration", "Evaporates fast in high heat and humidity", "Reapplication needed through the day", "Fine for mild climates and short wear"] },
  { id: "extrait", label: "Extrait de Parfum (25–30%)", headline: "Neesh Extrait — 12H+ projection, built for India", points: ["25%–30% pure perfume oil concentration", "Survives heat and humidity without collapse", "Sillage and projection last 12+ hours", "Richer amber, musk and vanilla base accords"] },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function NeeshPerfumesClient({ offers, products, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [concentration, setConcentration] = useState(CONCENTRATIONS[1]);
  const filtered = products.filter((p) => p.tab === concern);
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <StoreHero
        name="Neesh Perfumes"
        subtitle="Haute Parfumerie • Handcrafted Extrait de Parfum with Unrivaled Sillage"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Extrait vs. EDP Concentration &amp; Projection Guide</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {CONCENTRATIONS.map((c) => (
            <button key={c.id} type="button" onClick={() => setConcentration(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${concentration.id === c.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">{concentration.headline}</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-ink-soft">
            {concentration.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
        </div>
        <p className="mt-3 text-xs text-ink-soft">Testing first? The Discovery Set (flat ₹300 off with DISCOVERY) lets you sample the flagship five scents with full credit toward your first full bottle — no blind buys.</p>
        <a href={link("https://neeshperfumes.com/collections/discovery-sets", "concentration_guide")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Discovery Sets</a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((o) => (
          <div key={o.code} className="rounded-2xl border border-ledger-line bg-white p-4">
            <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium text-ink">{o.badge}</span>
            <h3 className="mt-2 font-semibold text-ink">{o.title}</h3>
            <p className="mt-1 text-xs text-ink-soft">{o.description}</p>
            <p className="mt-2 text-sm font-mono text-accent">{o.code}</p>
            <a href={link(o.targetUrl, o.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Redeem on Neesh</a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">Haute Fragrance &amp; Scent Profile Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Shop on Neesh</a>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">FAQ</h2>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">What is the difference between Eau de Parfum and Extrait de Parfum?</summary><p className="mt-2 text-sm text-ink-soft">Standard EDP carries 15%–18% perfume oil; Neesh Extrait packs 25%–30%. That is why Extrait survives Indian heat and humidity with 12H+ sillage instead of fading in 2–3 hours.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How long do Neesh scents last on clothing?</summary><p className="mt-2 text-sm text-ink-soft">On fabric, Neesh Extrait and pure attars hold 12–24 hours. Mist pulse points and a light spray on clothing (from 30cm away) for the strongest, longest-lasting projection.</p></details>
        <details className="rounded-xl border border-ledger-line bg-white p-4"><summary className="font-medium text-ink">How do I apply NEESH10?</summary><p className="mt-2 text-sm text-ink-soft">Add your chosen bottles or discovery set to the cart on neeshperfumes.com, enter NEESH10 at checkout for an extra 10% off — no minimum order value, stackable with sale prices.</p></details>
      </section>
    </div>
  );
}
