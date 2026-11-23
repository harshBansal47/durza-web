"use client";

import { ShoppingBasket, Home, Smartphone, ArrowUpRight } from "lucide-react";
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

export default function DigihaatClient({ faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "digihaat.in";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:py-12 md:pb-8">
      <StoreHero
        name="Digihaat"
        heading="Digihaat — India's ONDC revolution, in your pocket."
        subtitle="Swadeshi, grocery, kiranas and electronics — local sellers across India, zero platform fees, one cart, direct to you."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/digihaat?src=store-page"
        ctaLabel="Shop Digihaat"
        perks={[
          { label: "Model", value: "ONDC open network" },
          { label: "Fees", value: "Zero platform fee to sellers" },
          { label: "Range", value: "Grocery, pharmacy, electronics, swadeshi" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Digihaat — what to buy</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Digihaat — biggest categories right now</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShoppingBasket, name: "Grocery & Kirana", note: "Atta, rice, dal, oil, staples — from local kiranas to regional brands at ONDC-undercut prices." },
            { icon: Smartphone, name: "Electronics & Swadeshi", note: "Smartphones, accessories, and Swadeshi electronics — Lava, Micromax, Dixon Technologies." },
            { icon: Home, name: "Pharmacy & Wellness", note: "Genuine drugs and wellness from ONDC-licensed pharmacies." },
          ].map(({ icon: Icon, name, note }) => (
            <li key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Icon aria-hidden="true" className="h-6 w-6 text-inkblue" strokeWidth={1.75} />
              <h3 className="mt-2 font-serif font-bold text-ink">{name}</h3>
              <p className="mt-1 text-xs text-ink-soft">{note}</p>
            </li>
          ))}
        </ul>
        <a
          href="/go/digihaat?src=store-page"
          rel="nofollow sponsored noopener"
          target="_blank"
          className="mt-5 inline-flex items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-inkblue"
        >
          Shop Digihaat
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </a>
      </section>

      <FaqSection eyebrow="Digihaat FAQs" items={faqs} />
    </div>
  );
}
