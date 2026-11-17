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
const link = (url: string, sub: string): string => getAffiliateLink("moglix", url, sub);
const BUYERS = [
  { id: "retail", label: "Retail Buyer (Home DIY)", lines: [["High-Pressure Washer", "₹4,299"], ["TOOLS250 coupon", "− ₹250"], ["Effective price", "₹4,049"]], note: "Plus extra 5% instant off on prepaid UPI/card checkout." },
  { id: "gst", label: "GST Registered Business", lines: [["High-Pressure Washer", "₹4,299"], ["TOOLS250 coupon", "− ₹250"], ["18% GST Input Tax Credit", "~ − ₹619"], ["Effective net cost", "~ ₹3,430"]], note: "Claim back the GST component as Input Tax Credit in your next GST return — enter your GSTIN at checkout." },
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

export default function MoglixClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [buyer, setBuyer] = useState(BUYERS[0]);
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="Moglix"
        subtitle="Power Tools, Safety Gear, Automotive & Electricals • GST Invoice Ready"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="scroll-mt-24 rounded-2xl border border-ledger-line bg-white p-6" id="gst-net-cost">
        <h2 className="text-xl font-bold text-ink">True Net Cost Calculator</h2>
        <p className="mt-1 text-sm text-ink-soft">Same ₹4,299 pressure washer — very different net cost depending on who is buying.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {BUYERS.map((b) => (
            <button key={b.id} type="button" onClick={() => setBuyer(b)} className={`rounded-full px-4 py-2 text-sm font-medium ${buyer.id === b.id ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>{b.label}</button>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-ledger-line p-4">
          {buyer.lines.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-b border-ledger-line py-2 text-sm last:border-0">
              <span className="text-ink-soft">{label}</span>
              <span className="font-semibold text-ink">{value}</span>
            </div>
          ))}
          <p className="mt-2 text-xs text-ink-soft">{buyer.note}</p>
        </div>
        <a href={link("https://www.moglix.com", "net_cost_calculator")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop with GST Invoice on Moglix</a>
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
        <ExploreStoreCta storeName="Moglix" href={ctaHref} />
      )}

      <StackingExample
        title="How people stack savings on Moglix"
        lead="A professional tool kit for home repairs:"
        lines={[
          { label: "Professional tool kit", value: "₹3,499" },
          { label: "TOOLS250 (above ₹3,499)", value: "− ₹250" },
          { label: "GST input credit (GSTIN holders)", value: "up to 28%*" },
          { label: "Free prepaid note on invoices", value: "for businesses" }
        ]}
        total={{ label: "You pay", value: "≈ ₹3,249" }}
        saving="You could save ₹250 + GST credit on business buys"
        note="*Illustrative — GST input credit applies only when you invoice to a GSTIN and Moglix issues a B2B invoice."
      />

            <ProductDealRouter
        title="Home DIY &amp; Industrial Equipment Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="moglix"
        columns={2}
      />

            <FaqSection eyebrow="Moglix FAQs" items={faqs} />


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
              {topOffer ? topOffer.title : `Check live range & offers on Moglix`}
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
