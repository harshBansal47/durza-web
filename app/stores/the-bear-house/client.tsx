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

type Tab = "summer" | "office" | "winter" | "everyday";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  summer: {
    label: "Summer & Humid Commutes",
    name: "Breathable Cotton-Linen & Mandarin-Collar Shirts",
    detail: "Lightweight open-weave fabrics engineered for hot Indian afternoons.",
    cta: "Shop Linen Shirts",
    src: "matcher-linen",
  },
  office: {
    label: "Smart-Casual Office & Fridays",
    name: "Textured Oxford & Dobby Button-Down Shirts",
    detail: "Crisp collar roll and structured cuffs that work tucked or untucked.",
    cta: "Shop Oxford Shirts",
    src: "matcher-oxford",
  },
  winter: {
    label: "Winter Layering & Weekend Trips",
    name: "Brushed Cotton Flannel Checks & Overshirts",
    detail: "Soft-brushed medium-weight weaves designed to layer over solid tees.",
    cta: "Shop Flannels & Overshirts",
    src: "matcher-flannel",
  },
  everyday: {
    label: "Everyday Polos & Bottoms",
    name: "Pique Polos, Chinos & Relaxed Denim",
    detail: "Clean wardrobe staples with minimal branding.",
    cta: "Shop Polos & Bottoms",
    src: "matcher-everyday",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function WeaveCollarIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 12h28l-6 14v26H24V26l-6-14Z" />
      <path d="M24 26l8 8 8-8" />
      <path d="M24 34h16M24 40h16M24 46h16" />
      <path d="M30 12v10M34 12v10" />
    </svg>
  );
}

export default function TheBearHouseClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("summer");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://thebearhouse.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "thebearhouse.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="The Bear House"
        subtitle="Tailored Indian-fit casual shirts—from breathable European flax-linen blends for 35°C commutes to brushed double-weave flannels for AC offices."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/the-bear-house.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("the-bear-house", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="tbh-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="tbh-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          The Bear House — Men&apos;s Linen, Brushed Flannel &amp; Oxford Smart-Casuals
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Tailored Indian-fit casual shirts—from breathable European flax-linen blends for 35°C commutes to brushed
          double-weave flannels for AC offices.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-amber-100 bg-amber-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Cotton-linen blends give you the open-weave airflow of pure flax
          while resisting the deep elbow creases that 100% linen develops halfway through an office workday.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="tbh-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Fabric Matcher</p>
        <h2 id="tbh-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your Bear House fit
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right shirt or staple. Every CTA opens the official store via a tracked link.
        </p>

        <div role="tablist" aria-label="The Bear House matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`tbh-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`tbh-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-amber-800 bg-amber-800 text-white" : "border-ledger-line bg-white text-ink hover:border-amber-800"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`tbh-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tbh-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-amber-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-white text-amber-800">
              <WeaveCollarIcon />
              <span className="sr-only">Cotton-Linen Weave · Tailored Indian Fit</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Cotton-Linen Weave · Tailored Indian Fit</p>
              <a
                href={storeGoHref("the-bear-house", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-amber-800 px-5 text-sm font-semibold text-white transition hover:bg-amber-900"
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
          <StoreGuideLink slug="the-bear-house" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/stores/levis" className="font-medium text-durza-deep hover:underline">Levi&apos;s store guide</Link></li>
          <li><Link href="/categories/fashion" className="font-medium text-durza-deep hover:underline">Fashion category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on thebearhouse.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("the-bear-house", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="The Bear House"
        href={storeGoHref("the-bear-house", "store-page-bottom")}
        description="Browse the full The Bear House range and check live availability, fits, and terms directly on the official store."
      />

      <FaqSection eyebrow="The Bear House FAQs" items={faqs} />

      <p className="mt-8 text-xs leading-6 text-ink-faint">
        Durza may earn a commission from purchases made via our affiliate links to The Bear House (thebearhouse.com). Product availability and terms are subject to change on the official store.
      </p>
      <AffiliateDisclosure />
    </div>
  );
}
