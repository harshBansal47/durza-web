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
import ProductDealRouter from "@/components/store/ProductDealRouter";
const link = (url: string, sub: string): string => getAffiliateLink("zeroharm", url, sub);
const TECH = [
  { id: "standard", label: "Standard Supplements", points: ["High-heat chemical extraction destroys phytonutrients", "Harsh stomach acid blocks up to 80% of absorption", "Large 1000mg tablets just to compensate for loss", "Bulk dosage increases side-effect risk"] },
  { id: "nano", label: "ZeroHarm Nano-Tech", points: ["Water-based extraction preserves live phytonutrients", "Microscopic lipid spheres bypass stomach acid entirely", "Absorbed directly in the small intestine for 5–10× uptake", "Smaller clean dosages with zero heavy metals or synthetics"] },
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

export default function ZeroHarmClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [tech, setTech] = useState(TECH[1]);
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="ZeroHarm Sciences"
        subtitle="Precision Plant Nutraceuticals • Nano-Formulated for 5x Higher Absorption"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Why Nano-Encapsulation Beats Standard Tablets</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {TECH.map((t) => (
            <button key={t.id} type="button" onClick={() => setTech(t)} className={`rounded-full px-4 py-2 text-sm font-medium ${tech.id === t.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{t.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-4">
          <ul className="list-disc pl-5 text-sm text-ink-soft">
            {tech.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
        </div>
        <a href={link("https://www.zeroharm.in/collections/all-products", "nano_explainer")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Nano-Formulated Nutrition</a>
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
        title="How people stack savings on ZeroHarm"
        lead="A 90-day nano-nutraceutical wellness course:"
        lines={[
          { label: "90-day nano-nutraceutical course", value: "₹2,499" },
          { label: "Apply NANO25 (25% off)", value: "− ₹625*" },
          { label: "Free shipping above ₹499", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹1,874" }}
        saving="You could save ₹625+ on the course"
        note="*Illustrative — NANO25 applies to marked 90-day courses; ZERO15 is the all-catalogue 15% offer."
      />
      <HowToApply storeName="ZeroHarm Sciences" />

            <ProductDealRouter
        title="Nano-Nutrition &amp; Clinical Concern Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="zeroharm"
        columns={2}
      />

            <FaqSection eyebrow="ZeroHarm Sciences FAQs" items={faqs} />


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
