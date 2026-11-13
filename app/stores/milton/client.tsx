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
const link = (url: string, sub: string): string => getAffiliateLink("milton", url, sub);
const NEEDS = [
  { id: "hot", label: "Need 24H Boiling Hot Tea/Coffee?", result: "Vacuum Thermosteel (Flip Lid 1000ml)", detail: "A double-walled vacuum flask keeps tea, coffee or dal at boiling temperature for up to 24 hours. Pre-heat with hot water for 5 minutes first.", note: "₹849 • 25% OFF + extra 10% with MILTON10", url: "https://www.milton.in/collections/thermosteel-flasks", sub: "need_hot" },
  { id: "lunch", label: "Need Piping Hot Office Lunch Without Microwave?", result: "Plug-in Electric Tiffin (Futuron)", detail: "Three stainless containers with auto cut-off heating warm your home meal in about 30 minutes — no office kitchen required.", note: "₹1,399 • 30% OFF + eligible for OFFICE15", url: "https://www.milton.in/collections/electric-lunch-boxes", sub: "need_lunch" },
  { id: "copper", label: "Overnight Ayurvedic Copper Water?", result: "99.9% Pure Copper Bottle", detail: "Store room-temperature or cool water overnight for the traditional tamra jal Ayurvedic practice.", note: "Never pour hot or boiling water into a copper bottle — it can leach excess copper and damage the lacquer.", url: "https://www.milton.in/collections/copper-bottles", sub: "need_copper" },
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
        <a href={link(need.url, need.sub)} target="_blank" rel="nofollow sponsored noopener" className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">Shop {need.result}</a>
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
        title="How people stack savings on Milton"
        lead="A Thermosteel flask and tiffin combo for daily office:"
        lines={[
          { label: "Thermosteel flask + tiffin combo", value: "₹1,299" },
          { label: "OFFICE15 (office combos)", value: "− ₹195*" },
          { label: "Free shipping above ₹499", value: "included" }
        ]}
        total={{ label: "You pay", value: "≈ ₹1,104" }}
        saving="You could save ₹195+ on one order"
        note="*Illustrative — MILTON10 applies to Thermosteel lines; OFFICE15 to marked lunch combos."
      />
      <HowToApply storeName="Milton India" />

            <ProductDealRouter
        title="Daily Carry &amp; Insulation Hours Matcher"
        offers={offers}
        products={products}
        tabs={tabs}
        concern={concern}
        onConcern={setConcern}
        storeName="milton"
        columns={2}
      />

            <FaqSection eyebrow="Milton India FAQs" items={faqs} />


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
