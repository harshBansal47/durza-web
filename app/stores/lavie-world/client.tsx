"use client";

import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import StackingExample from "@/components/store/StackingExample";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
import { ArrowUpRight } from "lucide-react";
import ProductDealRouter from "@/components/store/ProductDealRouter";
const link = (url: string, sub: string): string => getAffiliateLink("lavie-world", url, sub);
const CARRY = [
  { id: "laptop", label: "14\" Laptop + Charger", result: "Work Tote", detail: "You need the Horsebit Structured Large Work Tote (₹1,399) — padded sleeve fits a 14\" laptop with room for a charger and documents.", math: "Base 65% OFF + extra 10% with LAVIE10 + 5% UPI ≈ ₹1,069 final.", url: "https://www.lavieworld.com/collections/tote-bags", sub: "capacity_laptop" },
  { id: "everyday", label: "Phone + Makeup + Keys", result: "Dome Satchel", detail: "The Betula Medium Dome Satchel (₹1,199) swallows a phone, makeup pouch, keys and a cardholder with a structured silhouette.", math: "66% OFF + extra 10% with LAVIE10 + 5% UPI ≈ ₹916 final.", url: "https://www.lavieworld.com/collections/satchel-bags", sub: "capacity_everyday" },
  { id: "minimal", label: "Phone + Cards Only", result: "Quilted Sling", detail: "The Ushawu Quilted Crossbody Sling (₹799) fits a 6.7\" phone, keys and a cardholder hands-free.", math: "64% OFF + extra 10% with LAVIE10 + 5% UPI ≈ ₹610 final.", url: "https://www.lavieworld.com/collections/sling-bags", sub: "capacity_minimal" },
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

export default function LavieWorldClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [carry, setCarry] = useState(CARRY[0]);
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="Lavie World"
        subtitle="Fickle Is Fun • Designer Handbags, Work Totes & Festive Clutches"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">What Fits Inside? — Capacity Guide</h2>
        <p className="mt-1 text-sm text-ink-soft">Select your daily carry and we will surface the exact bag for it.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {CARRY.map((c) => (
            <button key={c.id} type="button" onClick={() => setCarry(c)} className={`rounded-full px-4 py-2 text-sm font-medium ${carry.id === c.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{c.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">Recommended: {carry.result}</p>
          <p className="mt-1 text-sm text-ink-soft">{carry.detail}</p>
          <p className="mt-2 text-xs font-medium text-ink">Stacking math: {carry.math}</p>
        </div>
        <a href={link(carry.url, carry.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop {carry.result} on Lavie</a>
      </div>

      {offers.length > 0 ? (
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
      ) : (
        <ExploreStoreCta storeName="Lavie World" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on Lavie"
        lead="A handbag and sling duo for everyday work:"
        lines={[
          { label: "Handbag + sling duo", value: "₹1,699" },
          { label: "LAVIE10 (10% off)", value: "− ₹170*" },
          { label: "STYLE200 (above ₹1,499)", value: "− ₹200*" },
          { label: "Free delivery above ₹499", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹1,329" }}
        saving="You could save ₹370+ on one order"
        note="*Illustrative — LAVIE10 and STYLE200 may have different eligibility; the cart total wins."
      />

            <ProductDealRouter
        title="Capacity &amp; Occasion Handbag Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="lavie-world"
        columns={2}
      />

            <FaqSection eyebrow="Lavie World FAQs" items={faqs} />


      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a
          href={topOffer ? link(topOffer.targetUrl, topOffer.subId) : ctaHref}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white"
        >
          <span className="min-w-0">
            {topOffer?.code ? (
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Code {topOffer.code}
              </span>
            ) : (
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Official store
              </span>
            )}
            <span className="block truncate text-xs font-semibold">
              {topOffer ? topOffer.title : `Check live range & offers on Lavie World`}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">
            Shop
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </span>
        </a>
      </div>
    </div>
  );
}
