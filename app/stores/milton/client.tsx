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
const link = (url: string, sub: string): string => getAffiliateLink("milton", url, sub);
const NEEDS = [
  { id: "hot", label: "Need 24H hot tea or coffee?", result: "Vacuum Thermosteel flask", detail: "A double-walled vacuum flask can help keep beverages hot for longer. Pre-heating the flask may improve performance.", note: "Check current price, capacity, and offers on the official Milton page.", url: "https://www.milton.in/collections/thermosteel-flasks", sub: "need_hot" },
  { id: "lunch", label: "Need a hot office lunch without a microwave?", result: "Electric lunch box", detail: "Electric tiffins can warm meals at your desk. Review heating time, capacity, and safety features on the product page.", note: "Check live price and any eligible offers at checkout.", url: "https://www.milton.in/collections/electric-lunch-boxes", sub: "need_lunch" },
  { id: "copper", label: "Looking for a copper water bottle?", result: "Copper bottle", detail: "Store room-temperature or cool water as per product guidance. Follow care instructions provided by Milton.", note: "Avoid using hot or boiling water unless the product page explicitly allows it.", url: "https://www.milton.in/collections/copper-bottles", sub: "need_copper" },
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

export default function MiltonClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [need, setNeed] = useState(NEEDS[0]);
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="Milton India"
        subtitle="Kuch Naya Sochte Hain • 24H Vacuum Thermosteel, Electric Tiffins & Pure Copper"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Insulation &amp; Use-Case Advisor</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {NEEDS.map((n) => (
            <button key={n.id} type="button" onClick={() => setNeed(n)} className={`rounded-full px-4 py-2 text-sm font-medium ${need.id === n.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{n.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-paper p-4">
          <p className="text-sm font-semibold text-ink">Recommended: {need.result}</p>
          <p className="mt-1 text-sm text-ink-soft">{need.detail}</p>
          <p className="mt-2 text-xs font-medium text-ink">{need.note}</p>
        </div>
        <a href={link(need.url, need.sub)} target="_blank" rel="nofollow sponsored noopener noreferrer" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop {need.result} on Milton</a>
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
        <ExploreStoreCta storeName="Milton India" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on Milton"
        lead="A Thermosteel flask and tiffin combo for daily office:"
        lines={[
          { label: "Add eligible items to cart", value: "Build cart" },
          { label: "Apply any eligible promo code", value: "If available" },
          { label: "Review shipping and payment offers at checkout", value: "As shown" }
        ]}
        total={{ label: "Final amount", value: "Shown at checkout" }}
        saving="Confirm the final payable amount and offer eligibility on the official checkout page"
        note="Prices, promo eligibility, shipping thresholds, and payment offers vary by product and time. Always verify details at checkout."
      />

            <ProductDealRouter
        title="Daily Carry &amp; Insulation Hours Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="milton"
        columns={2}
        getHref={(p, idx) => link(p.targetUrl, p.subId || `matcher_${idx}`)}
      />

            <FaqSection eyebrow="Milton India FAQs" items={faqs} />


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
              {topOffer ? topOffer.title : `Check live range & offers on Milton India`}
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
