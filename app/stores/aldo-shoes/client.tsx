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
  offers?: StoreOfferCard[];
  faqs: FaqItem[];
  stats?: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

type Tab = "heels" | "formal" | "sneakers" | "bags";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  heels: {
    label: "Cushioned Party & Wedding Heels",
    name: "Pillow Walk Stilettos, Platforms & Block Heels",
    detail: "Dual-density footbed padding designed for long festive events.",
    cta: "Shop Pillow Walk Heels",
    src: "matcher-pillow-walk-heels",
  },
  formal: {
    label: "Men's Formal & Wedding Shoes",
    name: "Leather Loafers, Monk Straps & Oxfords",
    detail: "Sleek European lasts with flexible rubber-injected outsoles.",
    cta: "Shop Men's Formal Shoes",
    src: "matcher-mens-formal",
  },
  sneakers: {
    label: "Smart-Casual Sneakers",
    name: "Court Cupsole & Clean Leather Trainers",
    detail: "Pairs effortlessly with chinos, denim, or relaxed blazers.",
    cta: "Shop Sneakers",
    src: "matcher-sneakers",
  },
  bags: {
    label: "Top-Handle Bags & Wallets",
    name: "Structured Satchels, Evening Clutches & Men's Billfolds",
    detail: "Coordinated seasonal hardware and gift-ready packaging.",
    cta: "Shop Bags & Wallets",
    src: "matcher-bags-wallets",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function InsoleIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 50c-2-10 0-22 8-32 4-5 10-8 16-6 4 2 6 8 4 14-2 8-8 16-16 22-4 3-8 4-12 2Z" />
      <path d="M24 28c6-4 12-4 18 0" />
      <path d="M22 36c6-4 14-4 20 0" />
      <path d="M24 44c5-3 10-3 14 0" />
    </svg>
  );
}

export default function AldoShoesClient({ offers = [], faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("heels");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.aldoshoes.in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "aldoshoes.in";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="ALDO India"
        subtitle="Canadian footwear engineered with dual-density Pillow Walk foam insoles so formal dress shoes and party heels feel broken-in from hour one."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/aldo-new.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("aldo-new", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      {stats ? <TrustStats {...stats} /> : null}

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="aldo-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="aldo-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          ALDO India — Pillow Walk Comfort Heels, Dress Loafers &amp; Handbags
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Canadian footwear engineered with dual-density Pillow Walk foam insoles so formal dress shoes and party heels feel
          broken-in from hour one.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-amber-100 bg-amber-50/60 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> ALDO&apos;s Pillow Walk footbed layers molded arch foam under the
          ball of the foot—taking the sting out of thin-soled formal heels and dress shoes.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="aldo-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Footwear Matcher</p>
        <h2 id="aldo-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your ALDO edit
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right footwear or accessory lineup. Every CTA opens the official ALDO India store via a tracked link.
        </p>

        <div role="tablist" aria-label="ALDO matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`aldo-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`aldo-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-stone-900 bg-stone-900 text-white" : "border-ledger-line bg-white text-ink hover:border-stone-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`aldo-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`aldo-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-stone-50 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-800">
              <InsoleIcon />
              <span className="sr-only">Pillow Walk™ Dual-Density Foam</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Pillow Walk™ Dual-Density Foam</p>
              <a
                href={storeGoHref("aldo-new", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-stone-900 px-5 text-sm font-semibold text-white transition hover:bg-stone-800"
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
          <StoreGuideLink slug="aldo-new" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/boardroom-to-dinner-capsule-wardrobe-india" className="font-medium text-durza-deep hover:underline">Boardroom to dinner capsule wardrobe (India)</Link></li>
          <li><Link href="/stores/charles-and-keith" className="font-medium text-durza-deep hover:underline">Charles &amp; Keith India store guide</Link></li>
          <li><Link href="/categories/fashion" className="font-medium text-durza-deep hover:underline">Fashion category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on aldoshoes.in.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("aldo-new", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="ALDO India"
        href={storeGoHref("aldo-new", "store-page-bottom")}
        description="Browse the full ALDO India range and check live availability, sizing, and current terms directly on the official store."
      />

      <FaqSection eyebrow="ALDO India FAQs" items={faqs} />

      <p className="mt-8 text-xs leading-6 text-ink-faint">
        Durza may earn a commission from purchases made via our affiliate links to ALDO India (aldoshoes.in). Product availability, sizing, and terms are subject to change on the official store.
      </p>
      <AffiliateDisclosure />
    </div>
  );
}
