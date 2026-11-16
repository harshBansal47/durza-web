"use client";

import { Zap, Move, ArrowUpRight } from "lucide-react";
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

export default function BlissClubClient({ faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "blissclub.com";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:py-12 md:pb-8">
      <StoreHero
        name="BlissClub"
        heading="BlissClub — the legging women actually reach for."
        subtitle="Women's Ultimate Leggings, flares, and joggers — patented Ultrasoft fabric, tested in India's hottest gyms, priced for working women who work out."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/bliss-club?src=store-page"
        ctaLabel="Shop BlissClub"
        perks={[
          { label: "Fabric", value: "Ultrasoft, sweat-wicking" },
          { label: "Fit", value: "High-rise, sculpting" },
          { label: "Sizing", value: "XS–3XL — extended range" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">BlissClub fit guide</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Which BlissClub legging do you need?</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { name: "Ultimate Leggings", note: "High-rise, sculpting compression through thigh and glute. Best for HIIT, yoga flows and weight training." },
            { name: "Bliss Flares", note: "High-rise flare Yoga pants — wider leg with a high-rise fit. Best for dancing, light court sports and cafe-to-gym Saturdays." },
            { name: "Bliss Joggers", note: "Tapered joggers with sweat-wicking waistband — the commuter activewear for Bengaluru and Hyderabad mornings." },
            { name: "Bliss Everyday", note: "Noon-to-night lounge-to-laptop wear — the wardrobe piece you won't want to change out of." },
          ].map((item) => (
            <li key={item.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-serif font-bold text-ink">{item.name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{item.note}</p>
            </li>
          ))}
        </ul>
        <a
          href="/go/bliss-club?src=store-page"
          rel="nofollow sponsored noopener"
          target="_blank"
          className="mt-5 inline-flex items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-inkblue"
        >
          Shop BlissClub
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </a>
      </section>

      <FaqSection eyebrow="BlissClub FAQs" items={faqs} />
    </div>
  );
}
