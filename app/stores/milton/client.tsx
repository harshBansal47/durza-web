"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Droplets, Flame, ShieldCheck, ThermometerSun, UtensilsCrossed } from "lucide-react";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import OfferCard from "@/components/OfferCard";
import ProductDealRouter from "@/components/store/ProductDealRouter";
import { getAffiliateLink } from "@/lib/affiliate";
import type { StoreOfferCard, StoreProductCard } from "@/lib/store-offers";

interface Props {
  offers: StoreOfferCard[];
  products: StoreProductCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

const link = (url: string, sub: string): string => getAffiliateLink("milton", url, sub);

const FEATURED = [
  {
    id: "thermosteel",
    title: "24H Vacuum Thermosteel Flasks",
    image: "/stores/milton/thermosteel-flasks.webp",
    alt: "Brushed steel Milton Thermosteel vacuum flask",
    description:
      "Double-wall 304-grade stainless steel flasks in practical capacities for daily commutes, office desks, and family use. Pre-condition before filling for better temperature retention.",
    points: [
      "Pre-heat or pre-cool for a few minutes before filling",
      "Available in multiple capacities (commuter to family sizes)",
      "Check lid/gasket and replacement part availability on product pages",
    ],
    href: "https://www.milton.in/collections/thermosteel-flasks",
    sub: "featured-thermosteel",
    cta: "Shop Thermosteel Flasks",
  },
  {
    id: "tiffin",
    title: "Electric & Insulated Lunch Boxes",
    image: "/stores/milton/electric-tiffins.webp",
    alt: "Home-cooked meal in a lunch box setup",
    description:
      "Electric tiffins can warm meals at your desk without waiting for a microwave (model-dependent). Insulated options help keep home-cooked food ready to eat on the go.",
    points: [
      "Electric models designed for desk-side warming (check wattage/time)",
      "Leak-resistant container setups vary by model",
      "Review safety, capacity, and warranty details before buying",
    ],
    href: "https://www.milton.in/collections/electric-lunch-boxes",
    sub: "featured-tiffin",
    cta: "Shop Electric Tiffins",
  },
  {
    id: "copper",
    title: "99.9% Pure Copper Bottles",
    image: "/stores/milton/copper-bottles.webp",
    alt: "Copper water bottle for room-temperature hydration",
    description:
      "Copper bottles are intended for plain, room-temperature or cool water as per product guidance. Avoid hot or acidic liquids unless explicitly allowed by the product instructions.",
    points: [
      "Use for plain water only (room-temperature/cool)",
      "Avoid hot tea, lemon water, or buttermilk in copper",
      "Follow Milton’s cleaning and care instructions",
    ],
    href: "https://www.milton.in/collections/copper-bottles",
    sub: "featured-copper",
    cta: "Shop Copper Bottles",
  },
  {
    id: "casserole",
    title: "Casseroles & Borosilicate Glassware",
    image: "/stores/milton/casseroles-glassware.webp",
    alt: "Glass food storage containers and casseroles on kitchen counter",
    description:
      "Insulated casseroles and glass storage options help with family dining, meal prep, and organized storage. Check microwave/fridge compatibility per product listing.",
    points: [
      "Double-wall insulated casseroles for serving and storage",
      "Borosilicate glass containers for organized meal prep (model-dependent)",
      "Confirm usage compatibility and care instructions on Milton",
    ],
    href: "https://www.milton.in/collections/casseroles",
    sub: "featured-casseroles",
    cta: "Shop Casseroles & Storage",
  },
] as const;

const NEEDS = [
  {
    id: "hot",
    label: "Need hot tea/coffee for hours?",
    result: "Vacuum Thermosteel flask",
    detail: "A double-walled vacuum flask can help keep beverages hot for longer. Pre-heating the flask may improve performance.",
    url: "https://www.milton.in/collections/thermosteel-flasks",
    sub: "need_hot",
  },
  {
    id: "lunch",
    label: "Need a hot office lunch?",
    result: "Electric lunch box",
    detail: "Electric tiffins can warm meals at your desk. Review heating time, capacity, and safety features on the product page.",
    url: "https://www.milton.in/collections/electric-lunch-boxes",
    sub: "need_lunch",
  },
  {
    id: "copper",
    label: "Looking for a copper bottle?",
    result: "Copper bottle",
    detail: "Store room-temperature or cool water as per product guidance. Avoid hot or acidic liquids unless explicitly allowed.",
    url: "https://www.milton.in/collections/copper-bottles",
    sub: "need_copper",
  },
] as const;

export default function MiltonClient({ offers, products, faqs, stats, heroImageUrl, storeUrl }: Props) {
  const tabs = Array.from(new Set(products.map((p) => p.tab)));
  const [concern, setConcern] = useState(tabs[0] ?? "");
  const [need, setNeed] = useState<(typeof NEEDS)[number]>(NEEDS[0]);
  const topOffer = offers[0] ?? null;
  const storeHref = link(storeUrl ?? "https://www.milton.in/", "store_hub");

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_38%,#fff7ed_100%)]">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">
              <ThermometerSun aria-hidden="true" className="h-4 w-4" />
              Milton Official Store Guide
            </p>
            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:leading-[1.05]">
              Thermosteel, Electric Tiffins &amp; Everyday Kitchenware{" "}
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                Built for Daily India
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg">
              From 24-hour vacuum flasks and desk-friendly electric lunch boxes to pure copper bottles and casseroles —
              explore Milton essentials with practical usage tips and tracked links to the official store.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={storeHref}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-orange-600 px-8 text-base font-bold text-white shadow-[0_12px_30px_rgba(234,88,12,0.25)] transition hover:-translate-y-0.5 hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                Shop Milton Official Store
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href="#featured"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-ledger-line bg-white px-8 text-base font-bold text-ink shadow-[var(--shadow-hairline)] transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[var(--shadow-raised)]"
              >
                Explore Collections
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Flame, label: "Heat-retention tips" },
                { icon: UtensilsCrossed, label: "Tiffins & casseroles" },
                { icon: Droplets, label: "Copper care guidance" },
                { icon: ShieldCheck, label: "Official store links" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-xl border border-ledger-line bg-white px-3 py-3 text-xs font-medium text-ink shadow-[var(--shadow-hairline)] sm:text-sm">
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-orange-600" />
                  <span className="leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={heroImageUrl || "/stores/milton/hero-kitchenware.webp"}
                alt="Milton kitchenware and insulated bottle on a clean countertop"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-700">Pro tip</p>
              <p className="mt-1 text-sm leading-6 text-ink-soft">
                Pre-condition a Thermosteel flask with hot (or cold) water for a few minutes before filling to reduce initial temperature drop.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-4 pb-24 sm:px-6 md:pb-10 lg:px-8">
        <TrustStats {...stats} />

        {/* Practical context */}
        <section className="rounded-3xl border border-ledger-line bg-white p-6 shadow-[var(--shadow-hairline)] sm:p-8" aria-labelledby="milton-context">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-inkblue">Practical Buying Guide</p>
          <h2 id="milton-context" className="mt-2 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
            Buy for the routine, not just the product name
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-ink-soft">
            Most people blame an insulated bottle when a drink turns lukewarm early, but pre-conditioning often makes the
            difference. Milton’s range covers daily routines across India — from 24-hour Thermosteel flasks for
            commuters and families to Futuron electric lunch boxes for desk-side warming, copper bottles for plain water
            routines, and casseroles/glassware for meal prep and serving.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              "Pre-condition flasks before filling for better retention",
              "Use copper bottles only for plain room-temperature/cool water",
              "Verify warranty, capacity, and live checkout offers on milton.in",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-xl border border-orange-100 bg-orange-50/50 p-4 text-sm leading-6 text-ink-soft">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured collections */}
        <section id="featured" className="scroll-mt-24" aria-labelledby="milton-featured">
          <div className="mb-6 text-center sm:mb-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-inkblue">Featured Collections</p>
            <h2 id="milton-featured" className="mt-2 font-serif text-3xl font-extrabold text-ink sm:text-4xl">Milton essentials by use case</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink-soft">
              Curated categories with practical guidance. Every CTA opens Milton via a tracked affiliate link.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {FEATURED.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-3xl border border-ledger-line bg-white shadow-[var(--shadow-hairline)]">
                <div className="relative aspect-[16/10] bg-slate-100">
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-sans text-2xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft sm:text-base">{item.description}</p>
                  <ul className="mt-4 space-y-2.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm leading-6 text-ink-soft">
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={link(item.href, item.sub)}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-orange-600 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-700"
                  >
                    {item.cta}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Use-case advisor */}
        <section className="rounded-3xl border border-ledger-line bg-white p-6 shadow-[var(--shadow-hairline)] sm:p-8" aria-labelledby="milton-advisor">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-inkblue">Use-Case Advisor</p>
          <h2 id="milton-advisor" className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">Find the right Milton pick</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {NEEDS.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setNeed(n)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  need.id === n.id ? "bg-orange-600 text-white" : "bg-slate-100 text-ink-soft hover:bg-slate-200"
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50/40 p-4">
            <p className="text-sm font-semibold text-ink">Recommended: {need.result}</p>
            <p className="mt-1 text-sm leading-7 text-ink-soft">{need.detail}</p>
            <p className="mt-2 text-xs font-medium text-ink-soft">Check live price, capacity, and offers on the official Milton page.</p>
          </div>
          <a
            href={link(need.url, need.sub)}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-700"
          >
            Shop {need.result} on Milton
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </section>

        {/* Offers */}
        {offers.length > 0 ? (
          <section aria-labelledby="milton-offers">
            <h2 id="milton-offers" className="font-serif text-2xl font-extrabold text-ink sm:text-3xl">Live offers &amp; deals</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
              Offers below come from our feed when available. Promo eligibility, shipping thresholds, and payment discounts vary — always verify the final amount at checkout on milton.in.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {offers.map((o) => (
                <OfferCard
                  key={o.id || o.code || o.title}
                  bookmarkId={o.id}
                  code={o.code}
                  badge={o.badge}
                  title={o.title}
                  description={o.description}
                  ctaHref={link(o.targetUrl, o.subId)}
                  expiresAt={o.expiresAt}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="rounded-3xl border border-ledger-line bg-white p-6 text-center shadow-[var(--shadow-hairline)] sm:p-8">
            <h2 className="font-serif text-2xl font-extrabold text-ink">Explore the official Milton range</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-ink-soft">
              No feed offers are listed right now. Browse live collections, pricing, and checkout offers directly on Milton.
            </p>
            <a href={storeHref} target="_blank" rel="nofollow sponsored noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-700">
              Visit Official Milton Store <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </section>
        )}

        {/* Savings note */}
        <section className="rounded-3xl border border-ledger-line bg-white p-6 shadow-[var(--shadow-hairline)] sm:p-8">
          <h2 className="text-xl font-bold text-ink">How savings usually stack on Milton</h2>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            Build your cart, apply any eligible promo code (if available), then review shipping/payment offers shown at checkout.
            Final payable amount, eligibility, and offer terms vary by product and time — confirm on the official checkout page.
          </p>
        </section>

        {products.length > 0 && (
          <ProductDealRouter
            title="Daily Carry & Insulation Matcher"
            offers={offers}
            products={products}
            tabs={tabs}
            concern={concern}
            onConcern={setConcern}
            storeName="milton"
            columns={2}
            getHref={(p, idx) => link(p.targetUrl, p.subId || `matcher_${idx}`)}
          />
        )}

        <FaqSection eyebrow="Milton FAQs" items={faqs} />

        <section className="rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-amber-50 p-6 text-center shadow-[var(--shadow-hairline)] sm:p-10">
          <h2 className="font-serif text-2xl font-extrabold text-ink sm:text-3xl">Ready to upgrade your daily essentials?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink-soft">
            Browse Thermosteel flasks, electric tiffins, copper bottles, casseroles, and more on Milton’s official store.
          </p>
          <a href={storeHref} target="_blank" rel="nofollow sponsored noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange-600 px-7 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-700">
            Visit Official Milton Store <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </section>

        <AffiliateDisclosure />
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur md:hidden">
        <a
          href={topOffer ? link(topOffer.targetUrl, topOffer.subId) : storeHref}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white"
        >
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-orange-300">
              {topOffer?.code ? `Code ${topOffer.code}` : "Official store"}
            </span>
            <span className="block truncate text-xs font-semibold">
              {topOffer ? topOffer.title : "Check live range & offers on Milton"}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">
            Shop <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </span>
        </a>
      </div>
    </div>
  );
}
