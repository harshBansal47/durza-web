"use client";

import { ArrowUpRight, Car, Home, Crown, Utensils } from "lucide-react";
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

export default function RForRabbitClient({ faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "rforrabbit.com";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:py-12 md:pb-8">
      <StoreHero
        name="R for Rabbit"
        heading="R for Rabbit — baby gear, safety-certified."
        subtitle="Strollers, ISOFIX car seats, high chairs and cribs — engineered and weight-tested for Indian roads, backed by R for Rabbit service across 27 000+ PIN codes."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/rforrabbit-com-ecommerce-cps-india?src=store-page"
        ctaLabel="Shop R for Rabbit"
        perks={[
          { label: "Safety", value: "ECE R44 / i-Size certified" },
          { label: "Delivery", value: "Pan-India, free shipping" },
          { label: "Support", value: "Hindi + English chat" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">R for Rabbit matcher</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Which R for Rabbit product fits your life stage?</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Car, name: "Car Seats", note: "0-13 kg carriers, 9-18 kg toddler seats, 15-36 kg booster seats — ISOFIX standard" },
            { icon: Home, name: "Strollers", note: "Lightweight travel strollers to all-terrain parent-facing travel systems" },
            { icon: Crown, name: "Cribs & High Chairs", note: "Convertible cribs that grow with your child — crib → toddler bed — all in one frame" },
            { icon: Utensils, name: "Feeding", note: "High chairs with tray adjusters, bibs, and mealtime kits approved by Indian parents" },
          ].map(({ icon: Icon, name, note }) => (
            <li key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Icon aria-hidden="true" className="h-6 w-6 text-inkblue" strokeWidth={1.75} />
              <h3 className="mt-2 font-serif font-bold text-ink">{name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{note}</p>
            </li>
          ))}
        </ul>
        <a
          href="/go/rforrabbit-com-ecommerce-cps-india?src=store-page"
          rel="nofollow sponsored noopener"
          target="_blank"
          className="mt-5 inline-flex items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-inkblue"
        >
          Shop R for Rabbit
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </a>
      </section>

      <FaqSection eyebrow="R for Rabbit FAQs" items={faqs} />
    </div>
  );
}
