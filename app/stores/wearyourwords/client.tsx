"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Ruler, Scissors, Sparkle } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import ExploreStoreCta from "@/components/store/ExploreStoreCta";
import OfferCard from "@/components/OfferCard";
import type { StoreOfferCard } from "@/lib/store-offers";
import { GO_REL, storeGoHref } from "@/lib/go";

interface Props {
  offers: StoreOfferCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
  forcedStoreHref?: string | null;
}

type Tab = "rhinestone" | "fleur" | "pearl" | "fresh";

const MATCHES: Record<Tab, { label: string; name: string; detail: string; cta: string; src: string }> = {
  rhinestone: {
    label: "Rhinestone Party Denim",
    name: "Rhinestone & Diamante Wide-Leg Jeans (Ice Blue & Midnight Black)",
    detail: "High-rise relaxed-leg denim scattered with light-catching crystals.",
    cta: "Shop Rhinestone Denim",
    src: "matcher-rhinestone",
  },
  fleur: {
    label: "Flèur Bloom & Lace",
    name: "Flèur Bloom & Sequinned Lace Cutout Jeans",
    detail: "Embroidered floral appliqués and delicate lace side-slit paneling.",
    cta: "Shop Flèur Bloom & Lace",
    src: "matcher-fleur",
  },
  pearl: {
    label: "Pearl-Trimmed Denim",
    name: "Pearl-Embellished Wide-Leg & Bootcut Fits",
    detail: "Structured high-waist denim accented with matte pearl rivets along seams and pockets.",
    cta: "Shop Pearl-Trimmed Denim",
    src: "matcher-pearl",
  },
  fresh: {
    label: "Fresh Edit & Bestsellers",
    name: "The Fresh Edit & Limited-Edition Capsule Denim",
    detail: "Small-batch seasonal washes and trending wide-leg silhouettes on wearyourwords.in.",
    cta: "Shop Fresh Edit",
    src: "matcher-fresh",
  },
};

const TABS = (Object.keys(MATCHES) as Tab[]).map((id) => ({ id, label: MATCHES[id].label }));

function DenimSparkleIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10h20l-2 10v30l-8 4-8-4V20L22 10Z" />
      <path d="M24 20h16M28 28h8M28 36h8" />
      <path d="M46 14l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z" />
      <path d="M12 44h18M16 40v8M26 40v8" />
      <circle cx="18" cy="34" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="46" cy="36" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function WearYourWordsClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl, forcedStoreHref }: Props) {
  const [active, setActive] = useState<Tab>("rhinestone");
  const match = useMemo(() => MATCHES[active], [active]);
  const href = (src: string, fallback?: string) => storeGoHref("wearyourwords", src, forcedStoreHref ?? undefined) || fallback || storeGoHref("wearyourwords", src);

  const domain = (() => {
    try {
      return (storeUrl ?? "https://wearyourwords.in/").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
    } catch {
      return "wearyourwords.in";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name="Wear Your Words"
        subtitle="Hand-finished Indian statement denim—from crystal-scattered wide-leg silhouettes to sequin-lace cutouts designed to turn a basic white tee into a full outfit."
        domain={domain}
        heroImageUrl={heroImageUrl ?? "/stores/wearyourwords/hero-denim.webp"}
        offerCount={offerCount ?? offers.length}
        ctaHref={href("store-page")}
        ctaLabel="Shop Official Store"
        offers={offers}
      />

      <TrustStats {...stats} />

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="wyw-hook">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Official Store Guide</p>
        <h1 id="wyw-hook" className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
          Wear Your Words — Rhinestone-Embellished, Pearl &amp; Wide-Leg Statement Jeans
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
          Hand-finished Indian statement denim—from crystal-scattered wide-leg silhouettes to sequin-lace cutouts designed to turn a basic white tee into a full outfit.
        </p>
        <p className="mt-4 max-w-3xl rounded-xl border border-sky-100 bg-sky-50/70 p-4 text-sm leading-7 text-ink">
          <strong className="font-semibold">Context:</strong> Heat-set rhinestones and pearl rivets hold up best when jeans are turned inside out in a mesh laundry bag and washed cold—skipping high-heat machine dryers that weaken adhesive backing.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="why-direct">
        <h2 id="why-direct" className="font-serif text-2xl font-extrabold text-ink">Why buy direct from Wear Your Words</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-ledger-line bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><Scissors className="h-5 w-5" aria-hidden="true" /></div>
            <h3 className="mt-3 text-base font-semibold text-ink">Independent Indian Label</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">Dehradun-founded statement denim label (est. 2023) focused on rhinestone, pearl, and lace-embellished jeans.</p>
          </div>
          <div className="rounded-2xl border border-ledger-line bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><Ruler className="h-5 w-5" aria-hidden="true" /></div>
            <h3 className="mt-3 text-base font-semibold text-ink">Inclusive Sizing &amp; Checkout</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">Inclusive waist sizes with domestic Indian shipping, prepaid checkout perks, and BNPL options (SnapMint) on the official store.</p>
          </div>
          <div className="rounded-2xl border border-ledger-line bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><Sparkle className="h-5 w-5" aria-hidden="true" /></div>
            <h3 className="mt-3 text-base font-semibold text-ink">Small-Batch Statement Drops</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">Explore The Fresh Edit and limited-edition capsule denim for trending wide-leg washes and embellished silhouettes.</p>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="lineup-heading">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Visual Category Lineup</p>
        <h2 id="lineup-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">Explore Wear Your Words denim</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { id: "lineup-rhinestone", src: "lineup-rhinestone", img: "/stores/wearyourwords/rhinestone-wideleg.webp", alt: "High-rise ice-blue wide-leg denim jeans with rhinestone and pearl embellishments on Wear Your Words", title: "Rhinestone & Diamante Wide-Leg Jeans", benefit: "Crystal-scattered high-rise wide-leg denim for night-out looks." },
            { id: "lineup-fleur", src: "lineup-fleur", img: "/stores/wearyourwords/fleur-bloom.webp", alt: "Flèur Bloom floral appliqué and sequinned lace statement jeans styled on Wear Your Words", title: "Flèur Bloom & Sequinned Lace", benefit: "Embroidered florals and delicate lace side-slit paneling." },
            { id: "lineup-pearl", src: "lineup-pearl", img: "/stores/wearyourwords/pearl-denim.webp", alt: "Pearl-trimmed wide-leg denim with matte pearl rivets along seams and pockets on Wear Your Words", title: "Pearl-Trimmed Wide-Leg & Bootcut", benefit: "Structured high-waist denim with matte pearl rivet accents." },
            { id: "lineup-fresh", src: "lineup-fresh", img: "/stores/wearyourwords/hero-denim.webp", alt: "Editorial studio look of embellished wide-leg statement denim from The Fresh Edit on Wear Your Words", title: "The Fresh Edit & Capsule Denim", benefit: "Small-batch seasonal washes and trending wide-leg silhouettes." },
          ].map((card) => (
            <a key={card.id} id={card.id} href={href(card.src)} rel={GO_REL} target="_blank" className="group overflow-hidden rounded-2xl border border-ledger-line bg-white transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image src={card.img} alt={card.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-ink group-hover:text-sky-700">{card.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{card.benefit}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sky-700">Shop on Wear Your Words <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7" aria-labelledby="wyw-matcher">
        <div className="flex flex-wrap items-start gap-4">
          <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-700">
            <DenimSparkleIcon />
            <span className="sr-only">Statement Wide-Leg Denim · Indian Label · Wash-Care Guide</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">Use-Case Matcher</p>
            <h2 id="wyw-matcher" className="mt-1 font-serif text-2xl font-extrabold text-ink">Find your Wear Your Words fit</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">Select a tab to explore statement denim styles and shop via tracked links to the official store.</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">Statement Wide-Leg Denim · Indian Label · Wash-Care Guide</p>
          </div>
        </div>
        <div role="tablist" aria-label="Wear Your Words matcher" className="mt-5 flex flex-wrap gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button key={tab.id} id={`wyw-tab-${tab.id}`} role="tab" type="button" aria-selected={selected} aria-controls={`wyw-panel-${tab.id}`} tabIndex={selected ? 0 : -1} onClick={() => setActive(tab.id)} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${selected ? "border-sky-700 bg-sky-700 text-white" : "border-ledger-line bg-white text-ink hover:border-sky-700"}`}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div id={`wyw-panel-${active}`} role="tabpanel" aria-labelledby={`wyw-tab-${active}`} className="mt-6 rounded-xl border border-ledger-line bg-sky-50/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{match.label}</p>
          <h3 className="mt-1 text-lg font-semibold text-ink">{match.name}</h3>
          <p className="mt-2 text-sm leading-7 text-ink-soft">{match.detail}</p>
          <a href={href(match.src)} rel={GO_REL} target="_blank" className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-sky-700 px-5 text-sm font-semibold text-white transition hover:bg-sky-800">
            {match.cta}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      {offers.length > 0 && (
        <section className="mt-10" aria-labelledby="live-offers">
          <h2 id="live-offers" className="font-serif text-2xl font-extrabold text-ink">Live offers from our feed</h2>
          <p className="mt-1 text-sm text-ink-soft">Offers below are synced from our affiliate feed when available. Always confirm final pricing and terms on wearyourwords.in.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id} className="min-h-0">
                <OfferCard bookmarkId={offer.id} code={offer.code} badge={offer.badge} title={offer.title} description={offer.description} ctaHref={href("offer-card", offer.targetUrl || storeGoHref("wearyourwords", "offer-card", forcedStoreHref ?? undefined))} expiresAt={offer.expiresAt} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <h2 className="font-serif text-2xl font-extrabold text-ink">Buyer FAQs &amp; related links</h2>
        <div className="mt-4">
          <FaqSection eyebrow="Wear Your Words FAQs" items={faqs} />
        </div>
        <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">Curated internal links</h3>
        <ul className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <li><Link href="/stores/levis" className="font-medium text-durza-deep hover:underline">Levi&apos;s store guide</Link></li>
          <li><Link href="/stores/vero-moda" className="font-medium text-durza-deep hover:underline">Vero Moda store guide</Link></li>
          <li><Link href="/collections/boardroom-to-dinner-capsule-wardrobe-india" className="font-medium text-durza-deep hover:underline">Boardroom-to-dinner capsule wardrobe (India)</Link></li>
          <li><Link href="/categories/fashion" className="font-medium text-durza-deep hover:underline">Fashion category</Link></li>
        </ul>
      </section>

      <ExploreStoreCta storeName="Wear Your Words" href={href("store-page-bottom")} description="Browse statement denim, check sizing guidance, and confirm wash-care and checkout terms directly on Wear Your Words." />
      <p className="mt-8 text-xs leading-6 text-ink-faint">Durza may earn a commission from purchases made via our affiliate links to Wear Your Words (wearyourwords.in). Product availability and terms are subject to change on the official store.</p>
      <AffiliateDisclosure />
    </div>
  );
}
