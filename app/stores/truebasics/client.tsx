"use client";

import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import HowToApply from "@/components/store/HowToApply";
import StackingExample from "@/components/store/StackingExample";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
import { ArrowUpRight } from "lucide-react";
const link = (url: string, sub: string): string => getAffiliateLink("truebasics", url, sub);
const COMPARISONS = [
  { id: "ashwagandha", generic: { label: "Generic Ashwagandha", points: ["Unverified withanolide % — often <1.5%", "May contain toxic leaf material mixed with root", "Effectiveness varies batch to batch", "No clinical trials backing stress claims"] }, patented: { label: "KSM-66® (Full-Spectrum Root)", points: ["Highest concentration of withanolides (5%+)", "Root-only extract — zero leaf alkaloids", "22 published clinical trials on stress & sleep", "Same extract used in the studies, not a look-alike"] } },
  { id: "omega3", generic: { label: "Standard 1000mg Fish Oil", points: ["Only ~300mg active EPA+DHA per softgel", "~70% filler oil with low bioavailability", "Often skips enteric coating (fishy burps)", "Needs 3–4 softgels for the same EPA+DHA dose"] }, patented: { label: "TrueBasics Triple Strength", points: ["960mg active EPA+DHA per softgel", "3× concentration vs commercial fish oils", "Enteric coated — zero aftertaste or burps", "One softgel delivers a clinically relevant dose"] } },
];
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function TrueBasicsClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [comparison, setComparison] = useState(COMPARISONS[0]);
  const filtered = products.filter((p) => p.tab === concern);
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="TrueBasics"
        subtitle="Clinically Proven Nutrition • Patented Ingredients & Maximum Bioavailability"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Patent vs. Generic Ingredient Transparency Matrix</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {COMPARISONS.map((c) => (
            <button key={c.id} type="button" onClick={() => setComparison(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${comparison.id === c.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c.id === "ashwagandha" ? "KSM-66® vs Generic" : "Triple Strength vs Standard"}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-ledger-line bg-paper p-4">
            <p className="text-sm font-semibold text-ink-soft">{comparison.generic.label}</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-ink-soft">{comparison.generic.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </div>
          <div className="rounded-xl border border-accent bg-green-50 p-4">
            <p className="text-sm font-bold text-ink">{comparison.patented.label}</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-ink-soft">{comparison.patented.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </div>
        </div>
        <a href={link("https://www.truebasics.com", "patent_matrix")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Clinical Formulations</a>
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

      <StackingExample
        title="How people stack savings on TrueBasics"
        lead="A 90-day clinical omega-3 + ashwagandha regimen:"
        lines={[
          { label: "90-day clinical regimen", value: "₹2,199" },
          { label: "Apply CLINICAL20 (60/90-day)", value: "− ₹440*" },
          { label: "Free shipping above ₹499", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹1,759" }}
        saving="You could save ₹440+ on the regimen"
        note="*Illustrative — CLINICAL20 applies to 60/90-day bundles only; TRUE10 to individual bottles."
      />
      <HowToApply storeName="TrueBasics" />

      <div>
        <h2 className="text-xl font-bold text-ink">Clinical Ingredient &amp; Health Goal Matcher</h2>
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
              <a href={link(p.targetUrl, p.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">Get Deal on TrueBasics</a>
            </div>
          ))}
        </div>
      </div>

            <FaqSection eyebrow="TrueBasics FAQs" items={faqs} />


      {topOffer && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
          <a
            href={link(topOffer.targetUrl, topOffer.subId)}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white"
          >
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Code {topOffer.code}
              </span>
              <span className="block truncate text-xs font-semibold">{topOffer.title}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-xs font-bold">
              Shop
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
