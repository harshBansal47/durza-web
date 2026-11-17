"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Package, RefreshCcw, Ruler } from "lucide-react";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import type { CouponPublic } from "@/lib/types";

interface Props {
  offers: CouponPublic[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

const REL = "nofollow sponsored noopener noreferrer";
const STORE_HREF = "/go/bliss-club?src=store-page";
const FIT_GUIDE_HREF = "/go/bliss-club?src=fit-guide";
const FIT_MATCHER_HREF = "/go/bliss-club?src=fit-matcher";
const BUNDLE_HREF = "/go/bliss-club?src=bundle-banner";
const MOBILE_HREF = "/go/bliss-club?src=mobile-sticky";

const CARDS = [
  {
    title: "The Ultimate Leggings (4 Pockets)",
    tag: "Squat-Proof · Cloud9™ Fabric",
    copy: "High-rise sculpting waist that never rolls down, 4 deep phone-ready pockets, and buttery Cloud9™ stretch built for HIIT, lifting, and daily errands.",
    image: "/stores/blissclub/ultimate.jpg",
    alt: "Woman training in high-rise squat-proof leggings",
  },
  {
    title: "Bliss Flares & Straight Pants",
    tag: "Studio-to-Café · Wide Leg",
    copy: "Elongating high-rise flared silhouette with hidden side pockets—transitions effortlessly from morning pilates to airport lounges and Saturday brunch.",
    image: "/stores/blissclub/flares.jpg",
    alt: "Flared activewear pants with studio-to-café silhouette",
  },
  {
    title: "All-Day Travel & Commute Joggers",
    tag: "Anti-Chafe · Breathable",
    copy: "Tapered ankle cuffs, drawstring waist, and sweat-wicking stretch engineered for humid commutes, long-haul flights, and recovery walks.",
    image: "/stores/blissclub/joggers.jpg",
    alt: "Comfortable joggers for travel and daily commutes",
  },
  {
    title: "High-Support & Seamless Sports Bras",
    tag: "Zero-Bounce · Removable Pads",
    copy: "Breathable racerback and scoop-neck designs crafted to pair with Ultimate Leggings for high-impact runs or all-day wireless comfort.",
    image: "/stores/blissclub/bras.jpg",
    alt: "High-support sports bra for training",
  },
  {
    title: "Breeze & Movement Tank Tops",
    tag: "Featherlight · Anti-Odour",
    copy: "Relaxed-fit moisture-wicking tees and cropped tanks cut to skim the waistband without riding up during overhead presses or yoga flows.",
    image: "/stores/blissclub/tanks.jpg",
    alt: "Featherlight movement tank top for yoga and workouts",
  },
  {
    title: "Co-Ord Athleisure Sets & Combos",
    tag: "Highest Value · Match & Save",
    copy: "Pre-matched top-and-bottom sets in signature Indian skin-flattering shades (Espresso, Maroon, Olive, Noir) with built-in bundle pricing.",
    image: "/stores/blissclub/coord.jpg",
    alt: "Co-ordinated athleisure set in flattering tones",
  },
];

type FitId = "gym" | "yoga" | "travel" | "bundle";

const FITS: { id: FitId; label: string; tip: string }[] = [
  {
    id: "gym",
    label: "Gym & Weight Training",
    tip: "Between sizes? Size up in Ultimate Leggings for medium compression; stay true-to-size for a sculpted, squat-proof hold with 4 deep pockets.",
  },
  {
    id: "yoga",
    label: "Yoga & Pilates",
    tip: "Choose a true-to-size Ultimate Legging or Bliss Flares for fluid stretch and a no-roll waist; pair with a smooth, zero-bounce bra for comfort.",
  },
  {
    id: "travel",
    label: "Travel & Daily Errands",
    tip: "Opt for anti-chafe Travel & Commute Joggers or Bliss Flares in your usual size for breathable, all-day comfort on humid commutes and long hauls.",
  },
  {
    id: "bundle",
    label: "Co-Ord Bundle Deals",
    tip: "Build a 2-piece studio kit (leggings + sports bra/top) in matching shades to get official bundle savings and a ready-to-wear set.",
  },
];

export default function BlissClubClient({ faqs, stats, storeUrl }: Props) {
  const [activeFit, setActiveFit] = useState<FitId>("gym");
  const domain = (() => {
    try {
      return storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "blissclub.com";
    } catch {
      return "blissclub.com";
    }
  })();
  const fit = FITS.find((f) => f.id === activeFit) ?? FITS[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 sm:px-6 sm:py-12 md:pb-8">
      {/* Hero — warm studio-sage / espresso-noir */}
      <section className="overflow-hidden rounded-3xl border border-[#2a302c] bg-[#171C19] shadow-sm">
        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E8B4A2]">
            BlissClub · Indian Activewear
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-extrabold leading-[1.1] tracking-tight text-[#FAF7F2] sm:text-4xl md:text-5xl">
            BlissClub — the legging Indian women actually reach for.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#e8dfd8] sm:text-lg">
            Women&apos;s Ultimate Leggings, flares, and joggers — patented Ultrasoft fabric, tested in India&apos;s
            hottest gyms, priced for working women who work out.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={STORE_HREF}
              rel={REL}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-[#E8B4A2] px-6 py-3 text-sm font-bold tracking-wide text-[#171C19] transition hover:bg-[#f0c4b4]"
            >
              Shop Official BlissClub Store →
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </a>
            <span className="text-xs uppercase tracking-[0.2em] text-[#cbb8ad]">{domain}</span>
          </div>

          {/* Direct Store Privileges */}
          <div className="mt-10 grid gap-4 border-t border-[#2a302c] pt-8 sm:grid-cols-3">
            <div className="rounded-xl border border-[#2f3833] bg-[#1d2420]/70 p-4">
              <div className="flex items-center gap-2 text-[#E8B4A2]">
                <Ruler className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-[#FAF7F2]">Extended Indian Sizing</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#cbb8ad]">
                Engineered specifically for Indian body proportions in XS to 4XL
              </p>
            </div>
            <div className="rounded-xl border border-[#2f3833] bg-[#1d2420]/70 p-4">
              <div className="flex items-center gap-2 text-[#E8B4A2]">
                <Package className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-[#FAF7F2]">Co-Ord Set Bundles</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#cbb8ad]">
                Official site combos save up to 20% when pairing leggings + sports bras
              </p>
            </div>
            <div className="rounded-xl border border-[#2f3833] bg-[#1d2420]/70 p-4">
              <div className="flex items-center gap-2 text-[#E8B4A2]">
                <RefreshCcw className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-[#FAF7F2]">15-Day Hassle-Free Exchange</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#cbb8ad]">
                Free doorstep size swaps &amp; returns directly on blissclub.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustStats {...stats} />
      <AffiliateDisclosure />

      {/* Fit matcher */}
      <section
        aria-labelledby="bliss-fit-heading"
        className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
          Find Your Fit in 1 Click
        </p>
        <h2 id="bliss-fit-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Pick your move, get the right BlissClub fit
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {FITS.map((f) => {
            const active = f.id === activeFit;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFit(f.id)}
                aria-pressed={active}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  active
                    ? "border-[#171C19] bg-[#171C19] text-[#FAF7F2]"
                    : "border-ledger-line bg-white text-ink hover:border-[#171C19]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm leading-7 text-ink-soft">
            <strong className="text-ink">Fit &amp; fabric tip:</strong> {fit.tip}
          </p>
          <a
            href={FIT_MATCHER_HREF}
            rel={REL}
            target="_blank"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#171C19] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#FAF7F2] transition hover:bg-[#2a302c]"
          >
            Shop this fit on BlissClub
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      {/* Signature Fit & Fabric Lookbook */}
      <section aria-labelledby="bliss-lookbook-heading" className="mt-10">
        <div className="mb-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
            Signature fit &amp; fabric
          </p>
          <h2 id="bliss-lookbook-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink sm:text-3xl">
            Which BlissClub legging do you need?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-soft">
            Pocket-ready, squat-proof and body-positive fits engineered for Indian proportions — from studio sessions to
            daily errands.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <li key={card.title} className="min-h-0">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-[0_12px_40px_rgba(23,28,25,0.12)]">
                <a
                  href={FIT_GUIDE_HREF}
                  rel={REL}
                  target="_blank"
                  className="relative block aspect-[4/5] w-full overflow-hidden bg-stone-100"
                  aria-label={`Shop ${card.title} on BlissClub`}
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#171C19]/80 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FAF7F2] backdrop-blur-sm">
                    {card.tag}
                  </span>
                </a>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-lg font-bold leading-snug text-ink">{card.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-ink-soft">{card.copy}</p>
                  <a
                    href={FIT_GUIDE_HREF}
                    rel={REL}
                    target="_blank"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#171C19] hover:text-[#6b4b3e]"
                  >
                    Shop on BlissClub <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* Multi-Item AOV Booster */}
      <section
        aria-labelledby="bliss-bundle-heading"
        className="mt-10 overflow-hidden rounded-3xl border border-[#2a302c] bg-[#171C19] px-6 py-8 sm:px-10 sm:py-10"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E8B4A2]">
          Multi-item value
        </p>
        <h2 id="bliss-bundle-heading" className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#FAF7F2] sm:text-3xl">
          Build Your 2-Piece Studio Kit
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#e8dfd8]">
          Pair your favourite leggings with a sports bra or top on blissclub.com to get official bundle tiers and
          enjoy free express shipping on qualifying orders — a matched set that moves with you, for less.
        </p>
        <a
          href={BUNDLE_HREF}
          rel={REL}
          target="_blank"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#E8B4A2] px-6 py-3 text-sm font-bold tracking-wide text-[#171C19] transition hover:bg-[#f0c4b4]"
        >
          Build your bundle on BlissClub →
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </a>
      </section>

      <FaqSection eyebrow="BlissClub FAQs" items={faqs} />

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#2a302c] bg-[#171C19]/92 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <span className="truncate text-sm font-medium text-[#FAF7F2]">BlissClub Official India Store</span>
          <a
            href={MOBILE_HREF}
            rel={REL}
            target="_blank"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#E8B4A2] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#171C19]"
          >
            Shop XS–4XL Fit →
          </a>
        </div>
      </div>
    </div>
  );
}
