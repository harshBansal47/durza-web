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

type Tab = "gym" | "yoga" | "support" | "travel";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  gym: {
    label: "Gym, Running & Everyday Pockets",
    name: "The Ultimate Leggings (4 Deep Pockets + High Waist)",
    detail: "Holds a 6.7-inch smartphone flat against the thigh without bouncing.",
    cta: "Shop Ultimate Leggings",
    src: "matcher-ultimate-leggings",
  },
  yoga: {
    label: "Yoga, Pilates & Lounge",
    name: "The Ribbed Flared Pants & Cloud9 Buttery Tights",
    detail: "Ultra-soft brushed stretch that transitions from studio to coffee runs.",
    cta: "Shop Yoga & Lounge Fits",
    src: "matcher-yoga-pilates",
  },
  support: {
    label: "High- & Medium-Impact Support",
    name: "Limitless & Cloud9 Sports Bras",
    detail: "Wide anti-dig shoulder straps and breathable removable padding.",
    cta: "Shop Sports Bras",
    src: "matcher-sports-bras",
  },
  travel: {
    label: "Travel & Airport Co-ords",
    name: "Airy Oversized Tees, Jackets & Straight-Leg Trackpants",
    detail: "Wrinkle-resistant, sweat-wicking layers for flights and errands.",
    cta: "Shop Travel Co-ords",
    src: "matcher-travel-coords",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function PocketStretchIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10h24l-4 44H24L20 10Z" />
      <path d="M24 22h16" />
      <path d="M26 30h12v10H26z" />
      <path d="M14 18l4 4M50 18l-4 4M14 46l4-4M50 46l-4-4" />
    </svg>
  );
}

export default function BlissClubClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("gym");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://blissclub.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "blissclub.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero headingLevel={2}
        name="BlissClub"
        subtitle="Squat-proof 4-way stretch leggings with deep phone pockets, zero-camel-toe gussets, and breathable Cloud9 fabrics made for Indian weather."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/bliss-club.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("bliss-club", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="bliss-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="bliss-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          BlissClub — Technical Activewear Engineered for Indian Body Types
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Squat-proof 4-way stretch leggings with deep phone pockets, zero-camel-toe gussets, and breathable Cloud9 fabrics
          made for Indian weather.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-rose-100 bg-rose-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> A diamond-shaped crotch gusset and flatlock seams prevent thigh
          chafing and front-seam riding during deep squats, brisk walks, and humid yoga flows.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="bliss-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Fit Matcher</p>
        <h2 id="bliss-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Find the right BlissClub fit
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Choose a tab to match your activity. Every CTA opens the official BlissClub store via a tracked link.
        </p>

        <div role="tablist" aria-label="BlissClub matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`bliss-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`bliss-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-[#7c4a3a] bg-[#7c4a3a] text-white" : "border-ledger-line bg-white text-ink hover:border-[#7c4a3a]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`bliss-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`bliss-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-[#fff8f4] p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-rose-200 bg-white text-[#7c4a3a]">
              <PocketStretchIcon />
              <span className="sr-only">Squat-Proof · 4 Deep Pockets · Indian Fit</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7c4a3a]">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Squat-Proof · 4 Deep Pockets · Indian Fit</p>
              <a
                href={storeGoHref("bliss-club", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#7c4a3a] px-5 text-sm font-semibold text-white transition hover:bg-[#684033]"
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
          <StoreGuideLink slug="bliss-club" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/indian-home-gym-and-running-starter-kit" className="font-medium text-durza-deep hover:underline">Indian home gym &amp; running starter kit</Link></li>
          <li><Link href="/stores/boldfit" className="font-medium text-durza-deep hover:underline">Boldfit store guide</Link></li>
          <li><Link href="/stores/adidas" className="font-medium text-durza-deep hover:underline">Adidas India store guide</Link></li>
          <li><Link href="/categories/fitness" className="font-medium text-durza-deep hover:underline">Fitness category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on blissclub.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("bliss-club", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="BlissClub"
        href={storeGoHref("bliss-club", "store-page-bottom")}
        description="Browse the full BlissClub range and check live availability, sizing, and current terms directly on the official store."
      />

      <FaqSection eyebrow="BlissClub FAQs" items={faqs} />


      <AffiliateDisclosure />
    </div>
  );
}
