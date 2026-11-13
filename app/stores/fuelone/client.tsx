"use client";

import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";

import { useState } from "react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function FuelOneStorePage({ offers, products, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [active, setActive] = useState(tabs[0] ?? "");
  const filtered = products.filter((p) => p.tab === active);

  const topOffer = offers[0] ?? null;
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <StoreHero
        name="Fuel One"
        subtitle="100% transparent sports nutrition — whey isolate, creatine & FSSAI-certified supplements"
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/fuelone"
        perks={[
          { label: "Whey & Creatine", value: "Flat deals inside" },
          { label: "Authenticity", value: "FSSAI-certified" },
          { label: "Delivery", value: "Pan-India shipping" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />


      {/* Category badges */}
      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === cat ? "bg-accent text-white" : "bg-gray-100 text-ink-soft hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.name} className="overflow-hidden rounded-2xl border border-ledger-line bg-white shadow-sm">
            <Image src={p.image ?? "/stores/fuelone.webp"} alt={p.name} width={400} height={200} className="h-40 w-full object-contain bg-paper" />
            <div className="p-4">
              <h3 className="font-semibold text-ink">{p.name}</h3>
              {p.variant && <p className="text-xs text-ink-soft">{p.variant}</p>}
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-bold text-ink">{p.price}</span>
                <span className="text-sm text-ink-soft line-through">{p.mrp}</span>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">{p.discount}</span>
              </div>
              <Link href="/go/fuelone" className="mt-3 inline-block w-full rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white">
                Buy now
              </Link>
            </div>
          </div>
        ))}
      </div>
            <FaqSection eyebrow="Fuel One FAQs" items={faqs} />


      {topOffer && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
          <a
            href="/go/fuelone"
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
