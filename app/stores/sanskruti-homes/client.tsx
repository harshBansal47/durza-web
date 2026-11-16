"use client";

import { useState } from "react";
import { Home, ArrowUpRight } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import type { CouponPublic } from "@/lib/types";

interface Props {
  offers: CouponPublic[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function SanskrutiHomesClient({ faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "sanskrutihomes.in";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:py-12 md:pb-8">
      <StoreHero
        name="Sanskruti Homes"
        heading="Sanskruti Homes — India's handcrafted home linen."
        subtitle="Handspun cotton, block-printed dohars, handwoven bedsheets — supporting Rajasthan's artisan economy while giving your home the softest, most breathable linen India produces."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/sanskrutihomes-in-ecommerce-cps-india?src=store-page"
        ctaLabel="Shop Sanskruti Homes"
        perks={[
          { label: "Craft", value: "Handspun cotton, hand block-print" },
          { label: "Origin", value: "Rajasthan, India" },
          { label: "Care", value: "Cold wash, shade dry, no bleach" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section aria-labelledby="sanskruti-collection-heading" className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Collections at Sanskruti</p>
        <h2 id="sanskruti-collection-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">The Sanskruti edit — what to pick</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { name: "Handwoven Cotton Bedsheets", note: "100% cotton, no synthetic blend. Two fitted and one flat sheet fits most Indian king bedsheets." },
            { name: "Block-Printed Dohars", note: "Rajasthani block printing on handspun cotton — the perfect light-weight monsoon and summer cover." },
            { name: "Kitchen Linen & Napkins", note: "Handwoven cotton kitchen towels — absorbent, fast-drying, machine washable." },
            { name: "Sofa Covers & Cushions", note: "Custom-fit covers for Indian sofa sets. 100% cotton with handblock trims." },
          ].map((item) => (
            <li key={item.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-serif font-bold text-ink">{item.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{item.note}</p>
            </li>
          ))}
        </ul>
        <a
          href="/go/sanskrutihomes-in-ecommerce-cps-india?src=store-page"
          rel="nofollow sponsored noopener"
          target="_blank"
          className="mt-5 inline-flex items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-inkblue"
        >
          Browse Sanskruti Homes
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </a>
      </section>

      <FaqSection eyebrow="Sanskruti Homes FAQs" items={faqs} />
    </div>
  );
}
