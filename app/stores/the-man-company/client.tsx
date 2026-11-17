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
const link = (url: string, sub: string): string => getAffiliateLink("the-man-company", url, sub);
const STEPS = [
  { title: "Step 1 — Micro-needle 2x a week", detail: "Roll the 0.5mm titanium Derma Roller over patchy areas twice weekly to boost blood circulation and collagen production around dormant follicles." },
  { title: "Step 2 — Feed follicles daily", detail: "Apply Almond & Thyme Growth Oil every evening to nourish active hair follicles and soften coarse beard hair." },
  { title: "Step 3 — Bundle and stack", detail: "Buy the Derma Roller + Growth Oil + Wash as a kit and apply code BEARD20 for flat 20% off, plus free shipping above ₹499." },
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

export default function TheManCompanyClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="The Man Company"
        subtitle="Gentleman In You • Premium Beard Growth, Charcoal Detox & Long-Lasting Scents"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">The 2-Step Patchy Beard Solution Decoder</h2>
        <ol className="mt-4 space-y-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{i + 1}</span>
              <span className="text-sm"><span className="font-semibold text-ink">{s.title}: </span><span className="text-ink-soft">{s.detail}</span></span>
            </li>
          ))}
        </ol>
        <a href={link("https://www.themancompany.com/products/beard-growth-kit", "beard_decoder")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop the Beard Growth Pro Kit</a>
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
        <ExploreStoreCta storeName="The Man Company" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on The Man Company"
        lead="A complete beard kit (oil, wash, comb & balm):"
        lines={[
          { label: "Complete beard kit", value: "₹1,299" },
          { label: "Apply BEARD20 (20% off)", value: "− ₹260*" },
          { label: "Free shipping above ₹499", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹1,039" }}
        saving="You could save ₹260+ on the kit"
        note="*Illustrative — TMC15 applies to marked grooming lines; fragrances may follow other offers."
      />

            <ProductDealRouter
        title="Men&apos;s Grooming Routine &amp; Scent Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="the-man-company"
        columns={2}
      />

            <FaqSection eyebrow="The Man Company FAQs" items={faqs} />


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
              {topOffer ? topOffer.title : `Check live range & offers on The Man Company`}
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
