"use client";

import Image from "next/image";
import { ArrowUpRight, BadgeCheck, CheckCircle2, Gem, Gift, Heart, ShieldCheck, Sparkles } from "lucide-react";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import OfferCard from "@/components/OfferCard";
import type { StoreOfferCard } from "@/lib/store-offers";
import { GO_REL, storeGoHref } from "@/lib/go";

interface Props {
  offers: StoreOfferCard[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  offerCount?: number | null;
  storeUrl: string;
  forcedStoreHref?: string | null;
}

const TRACKED_SLUG = "salty-co-in-ecommerce-cps-india";

const COLLECTIONS = [
  {
    title: "Layered Necklaces & Chains",
    image: "/stores/salty/necklaces-chains.webp",
    alt: "Gold chain pendant necklace styled in an editorial shot",
    description:
      "Pre-layered dual-strand necklaces and everyday chains designed to sit neatly over tees, shirts, and kurtas without constant tangling.",
    points: [
      "Layered looks that feel styled out of the box",
      "Easy day-to-dinner pieces with warm gold tones",
      "Pair with hoops or stackable rings for a complete set",
    ],
    src: "collection-necklaces",
  },
  {
    title: "Waterproof Hoops & Earrings",
    image: "/stores/salty/earrings-hoops.webp",
    alt: "Minimalist gold hoop earrings and studs",
    description:
      "Lightweight hoops, huggies, and studs made for daily wear — from desk hours to evenings out — with anti-tarnish finishes highlighted by the brand.",
    points: [
      "Minimal hoops and huggies for everyday comfort",
      "Statement options for festive and evening looks",
      "Low-maintenance styles for regular rotation",
    ],
    src: "collection-earrings",
  },
  {
    title: "Stackable Rings & Charm Bracelets",
    image: "/stores/salty/rings-bracelets.webp",
    alt: "Stackable gold rings and bracelets",
    description:
      "Open adjustable rings, stackable bands, and bracelets that make styling (and gifting) easier without overthinking sizing.",
    points: [
      "Adjustable/open ring options for easier gifting",
      "Stackable pieces to mix, match, and layer",
      "Great add-ons for curated gift boxes",
    ],
    src: "collection-rings-bracelets",
  },
  {
    title: "Jewellery Organizers & Gift Boxes",
    image: "/stores/salty/organizers-gifts.webp",
    alt: "Velvet jewellery organizer case and gift packaging",
    description:
      "Keep chains separated and pieces protected with organizers and gift-ready packaging — ideal for travel, storage, and thoughtful gifting.",
    points: [
      "Helps prevent tangling and surface scratches",
      "Travel-friendly storage for everyday favourites",
      "Gift-ready presentation for special occasions",
    ],
    src: "collection-organizers-gifts",
  },
] as const;

export default function SaltyStoreClient({ offers, faqs, stats, offerCount, storeUrl, forcedStoreHref }: Props) {
  const outHref = (src: string) => storeGoHref(TRACKED_SLUG, src, forcedStoreHref ?? undefined);
  const officialHref = outHref("store-page");

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_40%,#f8fafc_100%)]">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
              <Gem aria-hidden="true" className="h-4 w-4" />
              Salty Official Store Guide
            </p>
            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:leading-[1.05]">
              Anti-Tarnish Everyday Jewellery{" "}
              <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-rose-500 bg-clip-text text-transparent">
                Made to Wear on Repeat
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg">
              Discover Salty’s layered necklaces, waterproof hoops, stackable rings, charm bracelets, and gift-ready
              organizers — styled for Indian weather, desk-to-dinner days, and easy gifting.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={officialHref}
                target="_blank"
                rel={GO_REL}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-amber-600 px-8 text-base font-bold text-white shadow-[0_12px_30px_rgba(217,119,6,0.25)] transition hover:-translate-y-0.5 hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                Shop Salty Official Store
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href="#collections"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-ledger-line bg-white px-8 text-base font-bold text-ink shadow-[var(--shadow-hairline)] transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-[var(--shadow-raised)]"
              >
                Explore Collections
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: ShieldCheck, label: "Anti-tarnish focus" },
                { icon: Sparkles, label: "Everyday styling" },
                { icon: Gift, label: "Gift-ready picks" },
                { icon: BadgeCheck, label: "Tracked store links" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-xl border border-ledger-line bg-white px-3 py-3 text-xs font-medium text-ink shadow-[var(--shadow-hairline)] sm:text-sm">
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-amber-600" />
                  <span className="leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/stores/salty/hero-jewellery.webp"
                alt="18k gold-plated layered necklaces and jewellery flatlay"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">Care tip</p>
              <p className="mt-1 text-sm leading-6 text-ink-soft">
                Apply perfume, sunscreen, and hairspray first, let them dry, then wear your jewellery. Wipe before storing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-4 pb-12 sm:px-6 lg:px-8">
        <TrustStats {...stats} />

        {/* Brand context */}
        <section className="rounded-3xl border border-ledger-line bg-white p-6 shadow-[var(--shadow-hairline)] sm:p-8" aria-labelledby="salty-context">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-inkblue">Why Salty</p>
          <h2 id="salty-context" className="mt-2 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
            Jewellery that fits real, everyday routines
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-ink-soft">
            Standard fashion jewellery can lose its shine quickly in heat and humidity. Salty focuses on everyday pieces
            with anti-tarnish finishes (including stainless-steel based, PVD/18k gold-plated styles on many designs) so
            layered chains, hoops, huggies, and stackable rings can stay in regular rotation with proper care.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-ink-soft">
            A lot of the styling is simplified for you — pre-layered necklaces that sit neatly over outfits, lightweight
            hoops for comfort, adjustable rings for easier gifting, and organizers to keep chains separated at home or on
            the go.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              "Pre-layered looks without the tangling hassle",
              "Lightweight everyday earrings and adjustable rings",
              "Organizers and gift boxes for storage and gifting",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50/50 p-4 text-sm leading-6 text-ink-soft">
                <Heart aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Collections */}
        <section id="collections" className="scroll-mt-24" aria-labelledby="salty-collections">
          <div className="mb-6 text-center sm:mb-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-inkblue">Curated Collections</p>
            <h2 id="salty-collections" className="mt-2 font-serif text-3xl font-extrabold text-ink sm:text-4xl">Shop Salty by style</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink-soft">
              Explore featured jewellery categories and shop the official collection via tracked links.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {COLLECTIONS.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-3xl border border-ledger-line bg-white shadow-[var(--shadow-hairline)]">
                <div className="relative aspect-[16/10] bg-slate-100">
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-sans text-2xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft sm:text-base">{item.description}</p>
                  <ul className="mt-4 space-y-2.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm leading-6 text-ink-soft">
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={outHref(item.src)}
                    target="_blank"
                    rel={GO_REL}
                    className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-amber-600 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-amber-700"
                  >
                    Explore on Salty
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Care */}
        <section className="rounded-3xl border border-ledger-line bg-white p-6 shadow-[var(--shadow-hairline)] sm:p-8" aria-labelledby="salty-care">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-inkblue">Jewellery Care</p>
          <h2 id="salty-care" className="mt-2 font-serif text-2xl font-extrabold text-ink sm:text-3xl">Keep the shine for longer</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { title: "Wear last", text: "Apply perfume, sunscreen, and hairspray first, let them dry, then put jewellery on." },
              { title: "Wipe after use", text: "Gently wipe pieces with a dry microfiber cloth before storing." },
              { title: "Store separately", text: "Use pouches or organizers to reduce tangling, scratches, and friction." },
            ].map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4">
                <h3 className="text-base font-semibold text-ink">{tip.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Offers */}
        {offers.length > 0 && (
          <section aria-labelledby="salty-offers">
            <h2 id="salty-offers" className="font-serif text-2xl font-extrabold text-ink sm:text-3xl">Live offers from our feed</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
              Offers below are synced from our affiliate/feed sources when available. Confirm final pricing and terms on the official Salty store.
            </p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer) => (
                <li key={offer.id} className="min-h-0">
                  <OfferCard
                    bookmarkId={offer.id}
                    code={offer.code}
                    badge={offer.badge}
                    title={offer.title}
                    description={offer.description}
                    ctaHref={offer.targetUrl || outHref("offer-card")}
                    expiresAt={offer.expiresAt}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Final CTA */}
        <section className="rounded-3xl border border-amber-100 bg-gradient-to-r from-amber-50 via-white to-rose-50 p-6 text-center shadow-[var(--shadow-hairline)] sm:p-10">
          <h2 className="font-serif text-2xl font-extrabold text-ink sm:text-3xl">Ready to style your everyday stack?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink-soft">
            Browse Salty’s necklaces, hoops, rings, bracelets, and gift-ready organizers on the official store. Check live prices and offers before checkout.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={officialHref}
              target="_blank"
              rel={GO_REL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-600 px-7 text-sm font-bold text-white shadow-[0_12px_30px_rgba(217,119,6,0.25)] transition hover:-translate-y-0.5 hover:bg-amber-700"
            >
              Visit Official Salty Store
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href={storeUrl || officialHref}
              target="_blank"
              rel={GO_REL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ledger-line bg-white px-7 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-[var(--shadow-raised)]"
            >
              Check Salty Collections
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </section>

        <FaqSection eyebrow="Salty FAQs" items={faqs} />
        <AffiliateDisclosure />
      </div>
    </div>
  );
}