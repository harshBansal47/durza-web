"use client";

import { useState } from "react";
import { ArrowUpRight, Dumbbell, Footprints, Sparkles, Globe } from "lucide-react";
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

type Use = "running" | "originals" | "training" | "originals-lifestyle";

const MATCHES: Record<Use, { headline: string; spec: string; note: string }> = {
  running: {
    headline: "Ultraboost Light / Adizero — for Indian roads",
    spec: "Boost midsole (Light), Primeknit upper, Continental rubber outsole — engineered for high-humidity, high-heat pavement running. £11,500 – 17,000.",
    note: "The Adizero line is designed for tempo and race-day pacing; Ultraboost remains the daily-trainer—distance blend with a louder Boost glow.",
  },
  originals: {
    headline: "Originals — Superstar, Stan Smith, Gazelle & Samba",
    spec: "Iconic leather sneakers and translations — the lineage Indian streetwear pairs with kurtas, chinos and everything from wedding season kurtas to weekend café dressing.",
    note: "Originals run a touch narrower than athletic trainers; if you favour wide fits try half a size up.",
  },
  training: {
    headline: "Training & gym — Adizero trainer / Ultraboost trainer",
    spec: "Cushioned training shoes with lateral stability wings, insole-forward support — the hybrid walking-workout trainer, ₹6,500 – 11,000.",
    note: "Best paired with Adidas Training Athleisure — the line Indians actually wear to the gym, the café and casual Friday.",
  },
  "originals-lifestyle": {
    headline: "Originals Samba & Gazelle — the retro wave",
    spec: "Samba OG and Gazelle — the authentic terrace classics with T-toe suede, gum rubber and the toe-box silhouette that's dominating Indian streetwear in 2026.",
    note: "The Samba boom shows no sign of slowing; Gazelle is the quieter sibling with translucent leather and a cleaner line.",
  },
};

const ORDER: Use[] = ["running", "originals", "training", "originals-lifestyle"];
const LABEL: Record<Use, string> = { running: "Running", originals: "Originals", training: "Training", "originals-lifestyle": "Samba & Gazelle" };

export default function AdidasClient({ faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Use>("running");
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "adidas.co.in";
  const match = MATCHES[active];
  const Icon = { running: Footprints, originals: Sparkles, training: Dumbbell, "originals-lifestyle": Globe }[active];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:py-12 md:pb-8">
      <StoreHero
        name="Adidas"
        heading="Adidas India — from track to café terrace."
        subtitle="Ultraboost, Adizero, Originals & Training — the Adidas lineup built for Indian roads, gyms and weddings. Careful matcher, honest advice."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref="/go/adidas?src=store-page"
        ctaLabel="Shop Adidas.co.in"
        perks={[
          { label: "Running", value: "Ultraboost Light" },
          { label: "Originals", value: "Samba & Gazelle" },
          { label: "Training", value: "Adizero trainer" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <section aria-labelledby="adidas-matcher-heading" className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Adidas matcher</p>
        <h2 id="adidas-matcher-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">Which Adidas fits your foot and pace?</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {ORDER.map((id) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                aria-pressed={isActive}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                  isActive ? "border-inkblue bg-ink text-white" : "border-ledger-line bg-white text-ink hover:border-inkblue"
                }`}
              >
                {LABEL[id]}
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-serif text-xl font-bold text-ink">{match.headline}</h3>
          <p className="mt-3 text-sm leading-7 text-ink-soft"><strong className="text-ink">What to expect:</strong> {match.spec}</p>
          <p className="mt-3 border-l-2 border-inkblue/40 pl-3 text-[13px] leading-6 text-ink-soft">{match.note}</p>
          <a
            href="/go/adidas?src=store-page"
            rel="nofollow sponsored noopener"
            target="_blank"
            className="mt-4 inline-flex items-center gap-1 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-inkblue"
          >
            See this on Adidas India
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">India's favourite — by the numbers</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-sm leading-7 text-ink-soft">
          {[
            "India's #1 sports brand — trusted by the Indian cricket team and 70+ Indian athletes",
            "Adidas India stores span 400+ retail outlets across 200+ cities — most Indians never need to shop online",
            "Free returns on full-price items within 30 days — the policy Indian shoppers appreciate most",
            "adidas.co.in often carries exclusive India colourways not found on Amazon or Flipkart",
          ].map((line) => <li key={line} className="flex items-start gap-2"><span className="mt-1 text-inkblue">•</span>{line}</li>)}
        </ul>
      </section>

      <FaqSection eyebrow="Adidas India FAQs" items={faqs} />
    </div>
  );
}
