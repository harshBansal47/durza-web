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
const link = (url: string, sub: string): string => getAffiliateLink("guvi", url, sub);

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function GuviStorePage({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [goal, setGoal] = useState("job");
  const [lang, setLang] = useState("English");

  const recommended = products.find(() => {
    if (goal === "job" && (concern === "Full Stack Web Development" || concern === "Data Science & AI")) return true;
    if (goal === "single" && concern.startsWith("Programming")) return true;
    return false;
  }) || products[0];

  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="GUVI Geek Networks"
        subtitle="IIT Madras Incubated • HCL Group Company"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Career Decision Snippet</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => setGoal("job")} className={`rounded-full px-4 py-2 text-sm font-medium ${goal === "job" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Get My First Tech Job</button>
          <button type="button" onClick={() => setGoal("single")} className={`rounded-full px-4 py-2 text-sm font-medium ${goal === "single" ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Learn a Single Language</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Tamil", "Hindi", "Telugu", "English"].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${lang === l ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}
            >
              {l}
            </button>
          ))}
        </div>
        {recommended && (
          <div className="mt-4 rounded-xl border border-ledger-line bg-paper-alt p-4">
            <p className="font-semibold text-ink">Recommended: {recommended.name}</p>
            <p className="mt-1 text-sm text-ink-soft">{recommended.specs}</p>
            <a href={link(recommended.targetUrl, recommended.subId)} target="_blank" rel="nofollow sponsored noopener" className="mt-3 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
              Start Learning on GUVI
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
        title="How people stack savings on GUVI"
        lead="Enrol in a multi-course tech combo instead of separate courses:"
        lines={[
          { label: "Multi-course tech combo", value: "₹4,499" },
          { label: "Apply CAREER25 (up to 25% off)", value: "− ₹1,125*" },
          { label: "Free live demo class (Zen)", value: "₹0" }
        ]}
        total={{ label: "You pay", value: "≈ ₹3,374" }}
        saving="You could save ₹1,125+ vs buying separately"
        note="*Illustrative — course-wise pricing varies by cohort and city; check the current price before enrolling."
      />
      <HowToApply storeName="GUVI Geek Networks" />

            <ProductDealRouter
        title="Vernacular Tech Career Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="guvi"
        columns={2}
      />

            <FaqSection eyebrow="GUVI Geek Networks FAQs" items={faqs} />


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
