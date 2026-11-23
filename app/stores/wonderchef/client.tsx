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

type Tab = "blend" | "cookware" | "coffee" | "healthy";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  blend: {
    label: "Compact Daily Blending & Masalas",
    name: "Nutri-Blend Mixer Grinders (400W–600W Multi-Jar)",
    detail: "Small countertop footprint with separate blades for smoothies, dry spices, and chutneys.",
    cta: "Shop Nutri-Blend",
    src: "matcher-nutriblend",
  },
  cookware: {
    label: "Low-Oil Everyday Cooking",
    name: "Granite & Ceramic PFOA-Free Non-Stick Cookware",
    detail: "Forged aluminum bases compatible with both gas stoves and induction cooktops.",
    cta: "Shop Granite Cookware",
    src: "matcher-cookware",
  },
  coffee: {
    label: "Home Cafe & Espresso",
    name: "Regenta Espresso Machines, French Presses & Frothers",
    detail: "15–20 bar pump coffee makers for lattes and cappuccinos at home.",
    cta: "Shop Coffee Makers",
    src: "matcher-coffee",
  },
  healthy: {
    label: "Healthy Air-Frying & Juicing",
    name: "Digital Air Fryers & Slow Cold-Press Juicers",
    detail: "Low-RPM masticating juicers that preserve fruit fiber and nutrients.",
    cta: "Shop Air Fryers & Juicers",
    src: "matcher-airfry-juice",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function KitchenIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 16h10v20a5 5 0 0 1-10 0V16Z" />
      <path d="M23 36v14" />
      <path d="M36 44h18" />
      <ellipse cx="45" cy="36" rx="9" ry="4" />
      <path d="M36 36v8a9 4 0 0 0 18 0v-8" />
      <path d="M40 18c2 2 2 4 0 6M46 18c2 2 2 4 0 6M52 18c2 2 2 4 0 6" />
    </svg>
  );
}

export default function WonderchefClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("blend");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.wonderchef.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "wonderchef.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero headingLevel={2}
        name="Wonderchef"
        subtitle="Compact high-RPM smoothie and masala blenders, 5-layer granite-finish pans, and home espresso machines curated with Chef Sanjeev Kapoor."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/wonderchef.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("wonderchef", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="wc-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="wc-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Wonderchef — Nutri-Blend Mixers, PFOA-Free Granite Cookware &amp; Coffee
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Compact high-RPM smoothie and masala blenders, 5-layer granite-finish pans, and home espresso machines curated with
          Chef Sanjeev Kapoor.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-amber-100 bg-amber-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> A 22,000-RPM compact motor with interchangeable wet and dry
          stainless-steel blades pulverizes whole garam masala and soaked chutneys in seconds—without hauling out a bulky 3-jar
          mixer.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="wc-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Kitchen Matcher</p>
        <h2 id="wc-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your Wonderchef setup
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right appliance or cookware. Every CTA opens the official Wonderchef store via a tracked link.
        </p>

        <div role="tablist" aria-label="Wonderchef matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`wc-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`wc-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-amber-700 bg-amber-700 text-white" : "border-ledger-line bg-white text-ink hover:border-amber-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`wc-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`wc-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-amber-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-white text-amber-700">
              <KitchenIcon />
              <span className="sr-only">22,000 RPM · PFOA-Free · Gas & Induction</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">22,000 RPM · PFOA-Free · Gas &amp; Induction</p>
              <a
                href={storeGoHref("wonderchef", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-amber-700 px-5 text-sm font-semibold text-white transition hover:bg-amber-800"
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
          <StoreGuideLink slug="wonderchef" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/stores/milton" className="font-medium text-durza-deep hover:underline">Milton store guide</Link></li>
          <li><Link href="/stores/havells" className="font-medium text-durza-deep hover:underline">Havells store guide</Link></li>
          <li><Link href="/collections/wedding-and-festive-luxury-gifting-edit-india" className="font-medium text-durza-deep hover:underline">Wedding &amp; festive luxury gifting edit (India)</Link></li>
          <li><Link href="/categories/home-kitchen" className="font-medium text-durza-deep hover:underline">Home &amp; Kitchen category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on wonderchef.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("wonderchef", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Wonderchef"
        href={storeGoHref("wonderchef", "store-page-bottom")}
        description="Browse the full Wonderchef range and check live availability, compatibility, and terms directly on the official store."
      />

      <FaqSection eyebrow="Wonderchef FAQs" items={faqs} />


      <AffiliateDisclosure />
    </div>
  );
}
