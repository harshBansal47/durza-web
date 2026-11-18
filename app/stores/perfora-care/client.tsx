"use client";

import { Droplet, Sparkles, Waves, ArrowUpRight } from "lucide-react";
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

export default function PerforaCareClient({ faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "perforacare.com";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:py-12 md:pb-8">
      <StoreHero
        name="Perfora Care"
        heading="Perfora Care — India's smart oral-care upgrade."
        subtitle="Smart electric toothbrushes with AI brushing-zones, teeth-whitening serums, and water flossers — engineered for Indian mouths, priced for Indian homes."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/perforacare-com-ecommerce-cps-india?src=store-page"
        ctaLabel="Shop Perfora Care"
        perks={[
          { label: "AI Guidance", value: "Smart app, zone tracking" },
          { label: "Ingredients", value: "Less H2O2 than US versions" },
          { label: "Care", value: "Vegetarian, cruelty-free" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Perfora range — what to pick</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">The three product families at Perfora</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Droplet, name: "Smart Electric Brush", note: "Electric toothbrush with app-guided brushing modes and pressure-sensing features. Check live specs and pricing on the official Perfora page." },
            { icon: Sparkles, name: "Teeth Whitening Serum", note: "Low-H2O2 whitening with potassium nitrate — dental-clinic level results, clinic-safe daily applicator." },
            { icon: Waves, name: "Water Flosser", note: "Cordless water flosser, 4 pressure settings, 300ml tank — braces, implants and gum pockets." },
          ].map(({ icon: Icon, name, note }) => (
            <li key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Icon aria-hidden="true" className="h-6 w-6 text-inkblue" strokeWidth={1.75} />
              <h3 className="mt-2 font-serif font-bold text-ink">{name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{note}</p>
            </li>
          ))}
        </ul>
        <a
          href="/go/perforacare-com-ecommerce-cps-india?src=store-page"
          rel="nofollow sponsored noopener"
          target="_blank"
          className="mt-5 inline-flex items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-inkblue"
        >
          Shop Perfora Care
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </a>
      </section>

      <FaqSection eyebrow="Perfora Care FAQs" items={faqs} />
    </div>
  );
}
