"use client";

import LiveOffersSection from "@/components/store/LiveOffersSection";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import StoreGuideLink from "@/components/stores/StoreGuideLink";
import type { StoreOfferCard } from "@/lib/store-offers";
import { GO_REL, storeGoHref } from "@/lib/go";

interface Props {
  offers: StoreOfferCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

type Tab = "dryness" | "detox" | "hydration" | "gift";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  dryness: {
    label: "Dryness & Overnight Glow",
    name: "Urban Rani Youth Preserve Facial Oil & Moringa Range",
    detail: "Lightweight botanical oil blend for nighttime barrier nourishment.",
    cta: "Shop Facial Oils",
    src: "matcher-overnight-glow",
  },
  detox: {
    label: "City Pollution & Deep Detox",
    name: "Holy Basil & Neem Clay Masks + Cucumber Cleansers",
    detail: "Draws out PM2.5 grime and excess oil without tight over-drying.",
    cta: "Shop Detox Masks & Cleansers",
    src: "matcher-detox",
  },
  hydration: {
    label: "Instant Hydration & Toning",
    name: "Mystic Indian Rose & Vetiver Facial Mists",
    detail: "Steam-distilled floral hydrosols for mid-day desk refreshment.",
    cta: "Shop Facial Mists",
    src: "matcher-hydration",
  },
  gift: {
    label: "Clean Vegan Gift Sets",
    name: "Curated Skincare & Body Care Ritual Boxes",
    detail: "Paraben-free, SLS-free sets ready for gifting.",
    cta: "Shop Gift Sets",
    src: "matcher-gift-sets",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function LotusOilIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M32 46c10 0 18-6 18-14-6 0-12 2-18 8-6-6-12-8-18-8 0 8 8 14 18 14Z" />
      <path d="M32 40c0-10 4-16 10-20-2 8-4 14-10 20Z" />
      <path d="M32 40c0-10-4-16-10-20 2 8 4 14 10 20Z" />
      <path d="M32 18v10" />
      <path d="M32 10c3 2 4 4 4 6s-1 4-4 6c-3-2-4-4-4-6s1-4 4-6Z" />
    </svg>
  );
}

export default function NourishMantraClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("dryness");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://nourishmantra.in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "nourishmantra.in";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero headingLevel={2}
        name="Nourish Mantra"
        subtitle="100% vegan, PETA-certified cruelty-free cleansers, moringa-and-hemp facial oils, and rose hydrosol mists formulated for city pollution and dry AC skin."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/nourish-mantra.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("nourish-mantra", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="nm-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="nm-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Nourish Mantra — Vegan Ayurvedic Botanicals for Urban Skin Stress
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          100% vegan, PETA-certified cruelty-free cleansers, moringa-and-hemp facial oils, and rose hydrosol mists
          formulated for city pollution and dry AC skin.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Cold-pressed moringa and hemp seed oils mimic skin&apos;s natural
          sebum lipid profile—sealing in moisture after serums without clogging pores like heavy mineral oils.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="nm-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Skincare Matcher</p>
        <h2 id="nm-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your Nourish Mantra routine
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right botanical routine. Every CTA opens the official Nourish Mantra store via a tracked link.
        </p>

        <div role="tablist" aria-label="Nourish Mantra matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`nm-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`nm-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-emerald-700 bg-emerald-700 text-white" : "border-ledger-line bg-white text-ink hover:border-emerald-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`nm-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`nm-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-emerald-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-700">
              <LotusOilIcon />
              <span className="sr-only">100% Vegan · PETA Cruelty-Free · Paraben-Free</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">100% Vegan · PETA Cruelty-Free · Paraben-Free</p>
              <a
                href={storeGoHref("nourish-mantra", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                {match.cta}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Curated Links</p>
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related collections and guides</h2>
        <div className="mt-4">
          <StoreGuideLink slug="nourish-mantra" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/indian-humidity-and-monsoon-skincare-kit" className="font-medium text-durza-deep hover:underline">Indian humidity &amp; monsoon skincare kit</Link></li>
          <li><Link href="/guides/indian-skincare-actives-haircare-guide" className="font-medium text-durza-deep hover:underline">Indian skincare actives &amp; haircare guide</Link></li>
          <li><Link href="/stores/kama-ayurveda" className="font-medium text-durza-deep hover:underline">Kama Ayurveda store guide</Link></li>
          <li><Link href="/categories/beauty" className="font-medium text-durza-deep hover:underline">Beauty category</Link></li>
        </ul>
      </section>

      <LiveOffersSection offers={offers} storeSlug="nourish-mantra" domain="nourishmantra" />

      <ExploreStoreCta
        storeName="Nourish Mantra"
        href={storeGoHref("nourish-mantra", "store-page-bottom")}
        description="Browse the full Nourish Mantra range and check live availability, ingredient details, and terms directly on the official store."
      />

      <FaqSection eyebrow="Nourish Mantra FAQs" items={faqs} />


      <AffiliateDisclosure />
    </div>
  );
}
