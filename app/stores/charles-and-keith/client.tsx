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

type Tab = "work" | "everyday" | "flats" | "occasion";

type Match = {
  label: string;
  name: string;
  detail: string;
  cta: string;
  src: string;
};

const MATCHES: Record<Tab, Match> = {
  work: {
    label: "Office & Laptop Carry",
    name: "Structured Double-Handle Totes & Belted Buckets",
    detail: "Holds a 13\"–14\" laptop upright without losing its crisp silhouette.",
    cta: "Shop Work Totes",
    src: "matcher-work-totes",
  },
  everyday: {
    label: "Signature Everyday Bags",
    name: "Gabine Saddle Bags & Quilted Crossbodies",
    detail: "Iconic curved buckle hardware with interchangeable shoulder and crossbody straps.",
    cta: "Shop Gabine & Crossbodies",
    src: "matcher-everyday-bags",
  },
  flats: {
    label: "Boardroom Flats & Loafers",
    name: "Chunky Penny Loafers & Pointed Slingbacks",
    detail: "Cushioned footbeds built for all-day office commutes.",
    cta: "Shop Loafers & Flats",
    src: "matcher-loafers",
  },
  occasion: {
    label: "Wedding & Festive Evenings",
    name: "Metallic Strappy Block Heels & Embellished Clutches",
    detail: "Lawn-friendly block heels paired with detachable-chain evening clutches.",
    cta: "Shop Occasion Edit",
    src: "matcher-occasion",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((key) => ({ id: key, label: MATCHES[key].label }));

function BagHeelIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 28h24v20a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V28Z" />
      <path d="M20 28v-6a6 6 0 0 1 12 0v6" />
      <rect x="40" y="22" width="10" height="14" rx="2" />
      <path d="M42 36l-4 16h8" />
      <path d="M38 52h14" />
    </svg>
  );
}

export default function CharlesKeithClient({ offers = [], faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("work");
  const match = useMemo(() => MATCHES[active], [active]);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://www.charleskeith.in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "charleskeith.in";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Charles & Keith"
        subtitle="Clean Singaporean silhouettes—from 14-inch padded work totes to metallic wedding block heels—direct from the official Indian boutique."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/charles-keith.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={storeGoHref("charles-keith", "store-page")}
        ctaLabel="Visit Official Boutique"
        offers={offers}
      />

      {stats ? <TrustStats {...stats} /> : null}

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="ck-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="ck-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Charles &amp; Keith India — Architectural Handbags, Loafers &amp; Occasion Heels
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Clean Singaporean silhouettes—from 14-inch padded work totes to metallic wedding block heels—direct from the
          official Indian boutique.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> A 45mm sculptural block heel distributes weight across the heel
          base so you can stand through an entire Indian wedding reception without sinking into lawn grass.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="ck-matcher">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Style Matcher</p>
        <h2 id="ck-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Choose your Charles &amp; Keith edit
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
          Select a tab to find the right bag or footwear lineup. Every CTA opens the official boutique via a tracked link.
        </p>

        <div role="tablist" aria-label="Charles & Keith matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                id={`ck-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`ck-panel-${tab.id}`}
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
          id={`ck-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`ck-tab-${active}`}
          className="mt-6 rounded-xl border border-ledger-line bg-stone-50 p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-800">
              <BagHeelIcon />
              <span className="sr-only">Official Boutique · Privilege Membership</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">{match.label}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Official Boutique · Privilege Membership</p>
              <a
                href={storeGoHref("charles-keith", match.src)}
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
          <StoreGuideLink slug="charles-keith" />
        </div>
        <ul className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/collections/boardroom-to-dinner-capsule-wardrobe-india" className="font-medium text-durza-deep hover:underline">Boardroom to dinner capsule wardrobe (India)</Link></li>
          <li><Link href="/collections/wedding-and-festive-luxury-gifting-edit-india" className="font-medium text-durza-deep hover:underline">Wedding &amp; festive luxury gifting edit (India)</Link></li>
          <li><Link href="/stores/lavie-world" className="font-medium text-durza-deep hover:underline">Lavie World store guide</Link></li>
          <li><Link href="/categories/fashion" className="font-medium text-durza-deep hover:underline">Fashion category</Link></li>
        </ul>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on charleskeith.in.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard
                  bookmarkId={offer.id}
                  code={offer.code}
                  badge={offer.badge}
                  title={offer.title}
                  description={offer.description}
                  ctaHref={offer.targetUrl || storeGoHref("charles-keith", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ExploreStoreCta
        storeName="Charles & Keith"
        href={storeGoHref("charles-keith", "store-page-bottom")}
        description="Browse the full Charles & Keith India range and check live availability, current collections, and terms directly on the official boutique."
      />

      <FaqSection eyebrow="Charles & Keith India FAQs" items={faqs} />

      <p className="mt-8 text-xs leading-6 text-ink-faint">
        Durza may earn a commission from purchases made via our affiliate links to Charles &amp; Keith India (charleskeith.in). Product availability and terms are subject to change on the official store.
      </p>
      <AffiliateDisclosure />
    </div>
  );
}
