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

type Concern = "grey" | "henna" | "scalp" | "skin";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Concern, Match> = {
  grey: {
    label: "Sensitive Scalp Grey Coverage",
    name: "Damage-Free Gel Hair Color (No Ammonia, No PPD)",
    detail: "Enriched with aloe vera, jojoba, and orange oil for comfortable home coloring.",
    cta: "Shop Gel Hair Color",
    src: "matcher-gel-color",
  },
  henna: {
    label: "100% Herbal Henna & Indigo",
    name: "Bio-Organic 100% Botanical Henna & Indigo Powder",
    detail: "Two-step natural black/brown conditioning without synthetic metallic salts.",
    cta: "Shop Henna & Indigo",
    src: "matcher-henna-indigo",
  },
  scalp: {
    label: "Hair Fall & Scalp Care",
    name: "Growout Onion & Bhringraj Hair Oil + Cold-Pressed Castor/Argan",
    detail: "Unrefined carrier oils for weekly root massage.",
    cta: "Shop Hair & Scalp Oils",
    src: "matcher-scalp-care",
  },
  skin: {
    label: "Natural Skin & Face Packs",
    name: "Bio-Organic Sandalwood, Multani Mitti & Rose Water",
    detail: "Micro-fine herbal powders free from synthetic fragrance.",
    cta: "Shop Skin & Face Packs",
    src: "matcher-face-packs",
  },
};

const TABS = (Object.keys(MATCHES) as Concern[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function BotanicalIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 46c10-2 16-8 18-18 8 2 14 8 16 18-8 4-24 6-34 0Z" />
      <path d="M36 28c6-8 12-12 18-14-2 8-6 14-14 18" />
      <path d="M14 50h36" />
      <path d="M28 50v-8" />
      <path d="M44 14c0 6-2 10-6 14" />
      <path d="M24 34c-4 4-6 8-6 12" />
    </svg>
  );
}

export default function IndusValleyClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Concern>("grey");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://buyindusvalley.in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "buyindusvalley.in";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Indus Valley"
        subtitle="Doctor-recommended botanical hair colors, triple-sifted Rajasthani henna, and cold-pressed oils formulated without harsh PPD or ammonia fumes."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/indus-valley.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("indus-valley", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="indus-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="indus-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Indus Valley — Ammonia-Free Gel Hair Color &amp; Bio-Organic Botanicals
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Doctor-recommended botanical hair colors, triple-sifted Rajasthani henna, and cold-pressed oils formulated without
          harsh PPD or ammonia fumes.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-amber-100 bg-amber-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Unlike conventional box dyes that swell the hair cuticle with
          ammonia, a pH-balanced botanical gel coats greys gently while keeping strands soft.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="indus-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Botanical Matcher</p>
        <h2 id="indus-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your hair or skin need
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right Indus Valley botanical routine. Every CTA opens the official store via a tracked link.
        </p>

        <div role="tablist" aria-label="Indus Valley matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`indus-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`indus-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-[#4b5d2a] bg-[#4b5d2a] text-white" : "border-ledger-line bg-white text-ink hover:border-[#4b5d2a]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`indus-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`indus-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-[#f8faf3] p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-lime-200 bg-white text-lime-800">
              <BotanicalIcon />
              <span className="sr-only">No Ammonia · Triple-Sifted Botanicals</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-800">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">No Ammonia · Triple-Sifted Botanicals</p>
              <a
                href={storeGoHref("indus-valley", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#4b5d2a] px-5 text-sm font-semibold text-white transition hover:bg-[#3f4f23]"
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
        <h2 className="mt-1 font-serif text-2xl font-extrabold text-ink">Explore related guides and stores</h2>
        <div className="mt-4">
          <StoreGuideLink slug="indus-valley" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/guides/indian-skincare-actives-haircare-guide" className="font-medium text-durza-deep hover:underline">Indian skincare actives &amp; haircare guide</Link></li>
          <li><Link href="/stores/kama-ayurveda" className="font-medium text-durza-deep hover:underline">Kama Ayurveda store guide</Link></li>
          <li><Link href="/stores/brillare" className="font-medium text-durza-deep hover:underline">Brillare store guide</Link></li>
          <li><Link href="/categories/beauty" className="font-medium text-durza-deep hover:underline">Beauty category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on buyindusvalley.in.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("indus-valley", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Indus Valley"
        href={storeGoHref("indus-valley", "store-page-bottom")}
        description="Browse the full Indus Valley range and check live availability, current combos, and terms directly on the official store."
      />

      <FaqSection eyebrow="Indus Valley FAQs" items={faqs} />


      <AffiliateDisclosure />
    </div>
  );
}
