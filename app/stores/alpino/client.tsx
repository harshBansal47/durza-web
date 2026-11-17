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
const link = (url: string, sub: string): string => getAffiliateLink("alpino", url, sub);

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function AlpinoStorePage({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");

  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="Alpino Health Foods"
        subtitle="The Real Peanut Butter • Zero Palm Oil, Zero Trans Fat & 100% Roasted Peanuts"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="scroll-mt-24 rounded-2xl border border-ledger-line bg-white p-6" id="protein-decoder">
        <h2 className="text-xl font-bold text-ink">Protein-Per-Rupee Stacking Calculator</h2>
        <div className="mt-4 space-y-2 text-sm text-ink-soft">
          <p>Alpino All-Natural 1kg (₹449) delivers 300g pure plant protein → Just ~₹1.49 per gram of clean protein.</p>
          <p>Add 1kg Natural PB (₹449) + 1kg Rolled Oats (₹299) = ₹748. Unlock Free Shipping + Flat 10% with ALPINO10 + 5% UPI savings.</p>
        </div>
        <a href={link("https://alpino.store/collections/combos", "breakfast_stack")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">
          Shop Breakfast Stack on Alpino
        </a>
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
        <ExploreStoreCta storeName="Alpino Health Foods" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on Alpino"
        lead="Grab a 2.5 kg Mega Saver Tub and a rolled-oats combo for a weekly stock-up:"
        lines={[
          { label: "2.5 kg Mega Saver Tub", value: "₹1,299" },
          { label: "Apply BULK20 (20% off)", value: "− ₹260*" },
          { label: "UPI / instant checkout offer", value: "− ₹50*" },
          { label: "Free doorstep shipping", value: "above ₹499" }
        ]}
        total={{ label: "You pay", value: "≈ ₹989" }}
        saving="You could save ₹310+ on one stock-up"
        note="*Illustrative — exact discount shown at checkout. Offers don't always combine; the biggest single-cart total decides eligibility."
      />

            <ProductDealRouter
        title="Diet Goal & Nutrition Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="alpino"
        columns={2}
      />

            <FaqSection eyebrow="Alpino Health Foods FAQs" items={faqs} />


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
              {topOffer ? topOffer.title : `Check live range & offers on Alpino Health Foods`}
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
