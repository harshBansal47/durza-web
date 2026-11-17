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
const link = (url: string, sub: string): string => getAffiliateLink("sirona", url, sub);
const SIZES = [
  { id: "s", label: "Under 25 & Not Given Birth?", size: "Size S (Small)", detail: "Designed for teens and women below 25 who have not given birth — narrower bell, secure fit for light-to-moderate flow.", url: "https://www.thesirona.com/products/sirona-reusable-menstrual-cup", sub: "cup_size_s" },
  { id: "m", label: "25+ or Normal Flow?", size: "Size M (Medium — Most Popular)", detail: "The all-rounder: perfect for most women with normal flow, regardless of age. Balanced capacity and comfort.", url: "https://www.thesirona.com/products/sirona-reusable-menstrual-cup", sub: "cup_size_m" },
  { id: "l", label: "Given Birth Vaginally?", size: "Size L (Large)", detail: "Higher capacity rim for post-childbirth anatomy and heavy-flow days — reliable protection for up to 10 hours.", url: "https://www.thesirona.com/products/sirona-reusable-menstrual-cup", sub: "cup_size_l" },
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

export default function SironaClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [size, setSize] = useState(SIZES[1]);
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="Sirona Hygiene"
        subtitle="Period Positive • FDA-Approved Menstrual Cups, Pain Relief Patches & PeeBuddy"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="scroll-mt-24 rounded-2xl border border-ledger-line bg-white p-6" id="cup-size-finder">
        <h2 className="text-xl font-bold text-ink">2-Click Menstrual Cup Size Finder</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button key={s.id} type="button" onClick={() => setSize(s)} className={`rounded-full px-4 py-2 text-sm font-medium ${size.id === s.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{s.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">Recommended: {size.size}</p>
          <p className="mt-1 text-sm text-ink-soft">{size.detail}</p>
        </div>
        <p className="mt-3 text-xs font-medium text-ink">Switching to a cup saves roughly ₹15,000 in disposable pad expenses over 5 years — the cup costs ₹299 and lasts a decade.</p>
        <a href={link(size.url, size.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop Size {size.id.toUpperCase()} Cup on Sirona</a>
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
        <ExploreStoreCta storeName="Sirona Hygiene" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on Sirona"
        lead="A menstrual-cup + sterilizer starter kit:"
        lines={[
          { label: "Menstrual cup + sterilizer kit", value: "₹899" },
          { label: "Apply SIRONA15 (15% off)", value: "− ₹135*" },
          { label: "Free shipping above ₹399", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹764" }}
        saving="You could save ₹135+ on the kit"
        note="*Illustrative — cup bundles have separate CUPFREE pricing; check both offers."
      />

            <ProductDealRouter
        title="Feminine Hygiene &amp; Period Comfort Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="sirona"
        columns={2}
      />

            <FaqSection eyebrow="Sirona Hygiene FAQs" items={faqs} />


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
              {topOffer ? topOffer.title : `Check live range & offers on Sirona Hygiene`}
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
