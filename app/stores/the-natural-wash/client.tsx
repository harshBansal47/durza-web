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

type Tab = "mist" | "lips" | "cleanse" | "body";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  mist: {
    label: "Toning & Mid-Day Refresh",
    name: "Steam-Distilled Kannauj Rose Water Mist",
    detail: "Alcohol-free facial toner that balances skin pH after cleansing.",
    cta: "Shop Rose Water Mist",
    src: "matcher-rose-mist",
  },
  lips: {
    label: "Dry & Pigmented Lips",
    name: "Beetroot Lip Balm, Lip Scrub & Overnight Lip Sleeping Mask",
    detail: "Shea butter and beetroot extract formulas for soft, tinted hydration.",
    cta: "Shop Lip Care",
    src: "matcher-lip-care",
  },
  cleanse: {
    label: "Gentle Daily Face Cleansing",
    name: "Oat, Rice Water & Vitamin C Sulphate-Free Face Washes",
    detail: "Non-stripping cleansers suited for sensitive and combination skin.",
    cta: "Shop Face Washes",
    src: "matcher-cleansers",
  },
  body: {
    label: "Hair & Body Essentials",
    name: "Bhringraj Hair Care & Shea Body Lotions",
    detail: "Botanical wash-off and moisturizing staples for daily routines.",
    cta: "Shop Hair & Body",
    src: "matcher-hair-body",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function DistillIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 44V28a8 8 0 0 1 16 0v16" />
      <path d="M14 44h24" />
      <path d="M34 28h10l6 6v10H34" />
      <path d="M42 34v6" />
      <path d="M20 20c2-4 6-6 10-6" />
      <path d="M46 16c2 2 4 5 4 8" />
    </svg>
  );
}

export default function TheNaturalWashClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("mist");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.thenaturalwash.com/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "thenaturalwash.com";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero headingLevel={2}
        name="The Natural Wash (TNW)"
        subtitle="Ayurvedic-inspired facial mists, beetroot-tinted lip balms, and mild sulphate-free washes built for gentle daily skin maintenance."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/the-natural-wash.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("the-natural-wash", "store-page")}
        ctaLabel="Visit Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="tnw-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="tnw-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          The Natural Wash (TNW) — Steam-Distilled Hydrosols &amp; Herbal Everyday Care
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Ayurvedic-inspired facial mists, beetroot-tinted lip balms, and mild sulphate-free washes built for gentle daily
          skin maintenance.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-rose-100 bg-rose-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> True steam-distilled rose water captures water-soluble rose
          essential oils directly from Kannauj petals—unlike synthetic rose-scented water mixed with artificial perfume and
          alcohol.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="tnw-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Routine Matcher</p>
        <h2 id="tnw-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your TNW routine
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right herbal care staple. Every CTA opens the official store via a tracked link.
        </p>

        <div role="tablist" aria-label="TNW matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`tnw-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`tnw-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected ? "border-rose-700 bg-rose-700 text-white" : "border-ledger-line bg-white text-ink hover:border-rose-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`tnw-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tnw-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-rose-50/40 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-rose-200 bg-white text-rose-700">
              <DistillIcon />
              <span className="sr-only">Steam-Distilled · Alcohol-Free · Herbal Care</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Steam-Distilled · Alcohol-Free · Herbal Care</p>
              <a
                href={storeGoHref("the-natural-wash", match.src)}
                rel={GO_REL}
                target="_blank"
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-rose-700 px-5 text-sm font-semibold text-white transition hover:bg-rose-800"
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
          <StoreGuideLink slug="the-natural-wash" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/guides/indian-skincare-actives-haircare-guide" className="font-medium text-durza-deep hover:underline">Indian skincare actives &amp; haircare guide</Link></li>
          <li><Link href="/stores/kama-ayurveda" className="font-medium text-durza-deep hover:underline">Kama Ayurveda store guide</Link></li>
          <li><Link href="/stores/nourish-mantra" className="font-medium text-durza-deep hover:underline">Nourish Mantra store guide</Link></li>
          <li><Link href="/categories/beauty" className="font-medium text-durza-deep hover:underline">Beauty category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on thenaturalwash.com.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("the-natural-wash", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="The Natural Wash (TNW)"
        href={storeGoHref("the-natural-wash", "store-page-bottom")}
        description="Browse the full TNW range and check live availability, ingredient details, and terms directly on the official store."
      />

      <FaqSection eyebrow="The Natural Wash FAQs" items={faqs} />


      <AffiliateDisclosure />
    </div>
  );
}
