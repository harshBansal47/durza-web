"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import OfferCard from "@/components/OfferCard";
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

type Tab = "daily" | "blends" | "whole" | "dry";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  daily: {
    label: "Daily Curry & Tadka Essentials",
    name: "Turmeric, Kashmiri Chilli, Coriander & Cumin Powders",
    detail: "Cool-ground single-origin spices packed in multi-layer zip-lock pouches.",
    cta: "Shop Daily Essentials",
    src: "matcher-daily-essentials",
  },
  blends: {
    label: "Aromatic Blended Masalas",
    name: "Garam Masala, Kitchen King, Pav Bhaji & Biryani Blends",
    detail: "Balanced whole-spice blends with zero artificial colors or fillers.",
    cta: "Shop Masala Blends",
    src: "matcher-masala-blends",
  },
  whole: {
    label: "Whole Spices (Khada Masala)",
    name: "Green Cardamom, Cloves, Cinnamon & Black Peppercorns",
    detail: "Graded whole spices for tempering and slow-cooked gravies.",
    cta: "Shop Whole Spices",
    src: "matcher-whole-spices",
  },
  dry: {
    label: "Dry Fruits, Seeds & Combos",
    name: "Almonds, Cashews, Pistachios & Everyday Masala Boxes",
    detail: "Resealable freshness packs for clean kitchen organization.",
    cta: "Shop Dry Fruits & Combos",
    src: "matcher-dry-fruits-combos",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function CoolGrindIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M32 10l4 8 8 4-8 4-4 8-4-8-8-4 8-4 4-8Z" />
      <path d="M18 38h28l-4 14H22l-4-14Z" />
      <path d="M22 38v-4h20v4" />
      <path d="M14 30c4-2 6-2 10 0M40 30c4-2 6-2 10 0" />
    </svg>
  );
}

export default function ZoffFoodsClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("daily");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://zofffoods.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "zofffoods.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="ZOFF Foods"
        subtitle="Turmeric, Kashmiri chilli, garam masala, and whole spices milled with Air Classifying Mills (ACM) so heat never scorches away natural aroma and color."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/zoff-foods.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("zoff-foods", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="zoff-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="zoff-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          ZOFF Foods — Cool-Ground Indian Spices &amp; Zip-Lock Pantry Staples
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Turmeric, Kashmiri chilli, garam masala, and whole spices milled with Air Classifying Mills (ACM) so heat never
          scorches away natural aroma and color.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-orange-100 bg-orange-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Traditional high-speed hammer mills generate friction heat above
          90°C that evaporates volatile spice oils; cool-grinding keeps milling temperatures low so half a spoon delivers full aroma.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="zoff-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Pantry Matcher</p>
        <h2 id="zoff-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your ZOFF pantry pick
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right spices or pantry staples. Every CTA opens the official ZOFF Foods store via a tracked link.
        </p>

        <div role="tablist" aria-label="ZOFF Foods matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`zoff-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`zoff-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-orange-700 bg-orange-700 text-white" : "border-ledger-line bg-white text-ink hover:border-orange-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`zoff-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`zoff-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-orange-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-orange-200 bg-white text-orange-700">
              <CoolGrindIcon />
              <span className="sr-only">Cool-Ground ACM · Essential Oils Intact · Zip-Lock</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Cool-Ground ACM · Essential Oils Intact · Zip-Lock</p>
              <a
                href={storeGoHref("zoff-foods", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-orange-700 px-5 text-sm font-semibold text-white transition hover:bg-orange-800"
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
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Related guides and stores</h2>
        <div className="mt-4">
          <StoreGuideLink slug="zoff-foods" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/stores/wonderchef" className="font-medium text-durza-deep hover:underline">Wonderchef store guide</Link></li>
          <li><Link href="/stores/alpino" className="font-medium text-durza-deep hover:underline">Alpino store guide</Link></li>
          <li><Link href="/categories/grocery" className="font-medium text-durza-deep hover:underline">Grocery category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on zofffoods.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("zoff-foods", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="ZOFF Foods"
        href={storeGoHref("zoff-foods", "store-page-bottom")}
        description="Browse the full ZOFF Foods range and check live availability, pantry details, and terms directly on the official store."
      />

      <FaqSection eyebrow="ZOFF Foods FAQs" items={faqs} />

      <AffiliateDisclosure />
    </div>
  );
}
