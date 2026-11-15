"use client";

import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import StackingExample from "@/components/store/StackingExample";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import OfferCard from "@/components/OfferCard";
import { useState } from "react";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";
import { ArrowUpRight } from "lucide-react";
import ProductDealRouter from "@/components/store/ProductDealRouter";
const link = (url: string, sub: string): string => getAffiliateLink("the-bear-house", url, sub);
const BUNDLE = { shirt: 1399, chino: 1699, code: 500, upiRate: 0.05 };
interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function TheBearHouseClient({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [qty, setQty] = useState({ shirt: true, chino: true });
  const subtotal = (qty.shirt ? BUNDLE.shirt : 0) + (qty.chino ? BUNDLE.chino : 0);
  const bundleOff = subtotal >= 2999 ? BUNDLE.code : 0;
  const upiOff = Math.round((subtotal - bundleOff) * BUNDLE.upiRate);
  const net = subtotal - bundleOff - upiOff;
  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  const ctaHref = storeUrl ? link(storeUrl, "store_hub") : "#";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8 pb-24 md:pb-8">
      <StoreHero
        name="The Bear House"
        subtitle="Crafted For Comfort • Premium Textured Casual Shirts, Linen & Tailored Menswear"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        offers={offers}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      <div className="rounded-2xl border border-ledger-line bg-white p-6">
        <h2 className="text-xl font-bold text-ink">Smart 2-Item Wardrobe Multiplier</h2>
        <p className="mt-1 text-sm text-ink-soft">Pick a complete head-to-toe workwear look and watch BUNDLE500 + 5% UPI stack.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => setQty((q) => ({ ...q, shirt: !q.shirt }))} className={`rounded-full px-4 py-2 text-sm font-medium ${qty.shirt ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Oxford Shirt (₹1,399)</button>
          <button type="button" onClick={() => setQty((q) => ({ ...q, chino: !q.chino }))} className={`rounded-full px-4 py-2 text-sm font-medium ${qty.chino ? "bg-accent text-white" : "bg-gray-100 text-ink-soft"}`}>Stretch Chino (₹1,699)</button>
        </div>
        <div className="mt-4 rounded-xl border border-ledger-line p-4 text-sm">
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">Subtotal</span><span className="font-semibold text-ink">₹{subtotal.toLocaleString("en-IN")}</span></div>
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">BUNDLE500 {subtotal < 2999 && "(needs ₹2,999+)"}</span><span className="font-semibold text-ink">− ₹{bundleOff}</span></div>
          <div className="flex items-center justify-between border-b border-ledger-line py-2"><span className="text-ink-soft">5% UPI instant deduction</span><span className="font-semibold text-ink">− ₹{upiOff}</span></div>
          <div className="flex items-center justify-between py-2"><span className="font-semibold text-ink">Net you pay</span><span className="text-lg font-bold text-ink">₹{net.toLocaleString("en-IN")}</span></div>
        </div>
        <a href={link("https://thebearhouse.com/collections/best-sellers", "wardrobe_multiplier")} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Build My 2-Piece Look</a>
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
        title="How people stack savings on The Bear House"
        lead="Three cotton polos for the office rotation:"
        lines={[
          { label: "3-cotton-polo bundle", value: "₹3,199" },
          { label: "Apply BUNDLE500 (above ₹2,999)", value: "− ₹500" },
          { label: "Free shipping above ₹999", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹2,699" }}
        saving="You could save ₹500+ on a rotation bundle"
        note="*Illustrative — BEAR10 adds on eligible polos; sale styles may be excluded."
      />

            <ProductDealRouter
        title="Menswear Fabric &amp; Occasion Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="the-bear-house"
        columns={2}
      />

            <FaqSection eyebrow="The Bear House FAQs" items={faqs} />


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
