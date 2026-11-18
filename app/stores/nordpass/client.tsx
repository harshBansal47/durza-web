"use client";

import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import StackingExample from "@/components/store/StackingExample";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import ProductDealRouter from "@/components/store/ProductDealRouter";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
import { ArrowUpRight } from "lucide-react";
const link = (url: string, sub: string): string => getAffiliateLink("nordpass", url, sub);
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function NordPassClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="NordPass"
        subtitle="Password manager plans, passkeys, and security features — compare options on the official NordPass site."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Compare NordPass plans before checkout</h2>
        <p className="mt-1 text-sm text-ink-soft">
          NordPass pricing, billing periods, currencies, and promotions vary by region. Use the official pricing page to compare Individual, Family, and business plans and confirm the final checkout total in your currency.
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
          <li>Compare monthly vs multi-year billing on the official pricing page.</li>
          <li>Check how many users/vaults are included in Family or team plans.</li>
          <li>Review features such as passkeys, breach monitoring, and secure sharing.</li>
          <li>Confirm taxes, currency conversion, and refund terms at checkout.</li>
        </ul>
        <a href={link("https://nordpass.com/plans/", "plan_compare")} target="_blank" rel="nofollow sponsored noopener noreferrer" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Compare plans on NordPass</a>
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
        <ExploreStoreCta storeName="NordPass" href={ctaHref} />
      )}

      <StackingExample
        title="How to choose a NordPass plan"
        lead="Compare options on the official NordPass site before subscribing:"
        lines={[
          { label: "Pick plan type (Individual, Family, or business)", value: "Start here" },
          { label: "Choose billing period (monthly or longer term)", value: "Compare total" },
          { label: "Apply any eligible promotion shown by NordPass", value: "If available" },
          { label: "Review currency, taxes, and renewal terms", value: "At checkout" }
        ]}
        total={{ label: "Final amount", value: "Shown at checkout" }}
        saving="Select the plan and billing term that best fits your usage and budget"
        note="NordPass pricing, promotions, and billing terms vary by region and currency. Always confirm the final amount and renewal terms on the official checkout page."
      />

      {products.length > 0 && (
        <ProductDealRouter
          title="Security Tier &amp; Plan Decoder"
          offers={offers}
          products={products}
          tabs={tabs}
          concern={concern}
          onConcern={setConcern}
          storeName="NordPass"
          columns={2}
          getHref={(p, idx) => link(p.targetUrl, p.subId || `matcher_${idx}`)}
        />
      )}

            <FaqSection eyebrow="NordPass FAQs" items={faqs} />


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
              {topOffer ? topOffer.title : `Check live range & offers on NordPass`}
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
