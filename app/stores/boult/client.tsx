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
const link = (url: string, sub: string): string => getAffiliateLink("boult", url, sub);

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function BoultStorePage({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
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

  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="Boult Audio"
        subtitle="Engineered for Sound • Premium TWS, ANC Earbuds & AMOLED Smartwatches"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


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

      <StackingExample
        title="How people stack savings on Boult"
        lead="Boult earphones for the daily commute:"
        lines={[
          { label: "Boult earphones", value: "₹1,499" },
          { label: "Apply BOULT100 (above ₹999)", value: "− ₹100" },
          { label: "UPI / card discount", value: "− ₹70*" },
          { label: "Free shipping, all India", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹1,329" }}
        saving="You could save ₹170+ on one order"
        note="*Illustrative — ANC/product-specific codes differ in eligibility; check the offer card."
      />
      <HowToApply storeName="Boult Audio" />

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

            <FaqSection eyebrow="Boult Audio FAQs" items={faqs} />


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
