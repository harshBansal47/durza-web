"use client";

import { Archive } from "lucide-react";
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

export default function ShopTupperwareClient({ faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "shoptupperware.in";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:py-12 md:pb-8">
      <StoreHero
        name="Shop Tupperware"
        heading="Shop Tupperware — dry storage that actually seals."
        subtitle="Airtight containers, stackable lunch systems and modular kitchen storage — food-safe polyethylene that India has borderline-impossible to keep out of kitchens."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/shoptupperware-in-ecommerce-cps-india?src=store-page"
        ctaLabel="Shop Tupperware India"
        perks={[
          { label: "Warranty", value: "Lifetime, most dry-storage items" },
          { label: "Safety", value: "BPA-free, food-grade PE" },
          { label: "Care", value: "Hand-wash or top-rack dishwasher safe" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Tupperware range — what to pick</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">The four families at Tupperware India</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { name: "Airtight Dry Storage", note: "Modular stackable containers in 400ml–5L. Best for rice, dal, atta, sugar and every state your Indian pantry needs." },
            { name: "Lunch Box & Crates", note: "Insulated lunch systems and stackable snacks crates — meal prep approved." },
            { name: "Fresh & Green", note: "Containers with water reservoirs for herbs — keeps coriander and mint fresh for a week." },
            { name: "Spice & Small Jars", note: "Spice click-top series with measure marks — the South Indian pantry upgrade." },
          ].map((item) => (
            <li key={item.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-serif font-bold text-ink">{item.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{item.note}</p>
            </li>
          ))}
        </ul>
        <a
          href="/go/shoptupperware-in-ecommerce-cps-india?src=store-page"
          rel="nofollow sponsored noopener"
          target="_blank"
          className="mt-5 inline-flex items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-inkblue"
        >
          Shop Tupperware India
          <Archive aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </a>
      </section>

      <FaqSection eyebrow="Shop Tupperware FAQs" items={faqs} />
    </div>
  );
}
