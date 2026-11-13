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
const link = (url: string, sub: string): string => getAffiliateLink("fitspire", url, sub);

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function FitspireStorePage({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [cartTotal, setCartTotal] = useState(2000);
  const filtered = products.filter((p) => p.tab === concern);

  const fit20 = Math.round(cartTotal * 0.20);
  const prepaid = Math.round((cartTotal - fit20) * 0.05);
  const shipping = cartTotal >= 499 ? 70 : 0;
  const final = cartTotal - fit20 - prepaid - shipping;

  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="Fitspire"
        subtitle="100% Vegan & Plant-Based Wellness Formulations"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Smart Shopper&apos;s Stacking Calculator</h2>
        <label className="mt-4 block text-sm font-medium text-ink">
          Cart total: ₹{cartTotal.toLocaleString("en-IN")}
          <input type="range" min={500} max={5000} step={100} value={cartTotal} onChange={(e) => setCartTotal(Number(e.target.value))} className="mt-2 w-full" />
        </label>
        <div className="mt-4 space-y-1 text-sm text-ink-soft">
          <p>Baseline Cart: ₹{cartTotal.toLocaleString("en-IN")}</p>
          <p>Code FIT20 (-₹{fit20.toLocaleString("en-IN")})</p>
          <p>Extra Prepaid Discount (-5% = -₹{prepaid.toLocaleString("en-IN")})</p>
          <p>Free Delivery (Saved ₹{shipping})</p>
          <p className="font-bold text-ink">Final Estimated Price: ₹{final.toLocaleString("en-IN")} (Total Savings: ₹{(cartTotal - final).toLocaleString("en-IN")})</p>
        </div>
        <a href={link("https://fitspire.online", "stacking_calc")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
          Apply This Stacking Formula on Fitspire
        </a>
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
        title="How people stack savings on Fitspire"
        lead="Monthly gummy vitamins and probiotics restock:"
        lines={[
          { label: "Monthly gummy restock", value: "₹1,499" },
          { label: "Apply FIT20 (above ₹1,499)", value: "− ₹300" },
          { label: "Free delivery above ₹499", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹1,199" }}
        saving="You could save ₹300+ per month"
        note="*Illustrative — B2G1 applies to marked probiotic lines only; FIT20 needs ₹1,499+ cart value."
      />
      <HowToApply storeName="Fitspire" />

      <div>
        <h2 className="text-xl font-bold text-ink">Plant-Wellness Lifestyle Matcher</h2>
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
                Get Deal on Fitspire
              </a>
            </div>
          ))}
        </div>
      </div>

            <FaqSection eyebrow="Fitspire FAQs" items={faqs} />


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
