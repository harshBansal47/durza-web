"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Baby,
  BadgePercent,
  Calculator,
  CheckCircle2,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
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

type Tab = "diapers" | "gear" | "apparel" | "feeding" | "toys";

const CATEGORIES: Record<
  Tab,
  {
    label: string;
    image: string;
    alt: string;
    title: string;
    detail: string;
    points: string[];
    cta: string;
    src: string;
  }
> = {
  diapers: {
    label: "Diapers & Wipes",
    image: "/stores/firstcry/hero-nursery.webp",
    alt: "Soft nursery essentials for baby diapering and care",
    title: "Pant-Style & Taped Diapers, Water Wipes & Rash Creams",
    detail:
      "Avoid bulk-buying newborn/small sizes too early. Start with smaller packs, then switch to jumbo monthly boxes once your baby settles into a size.",
    points: [
      "Taped diapers for early weeks and easy changes around the umbilical stump",
      "Pant-style diapers for active babies who roll and kick",
      "99% pure water wipes and zinc-oxide rash care essentials",
    ],
    cta: "Shop Diapers & Wipes",
    src: "matcher-diapers-wipes",
  },
  gear: {
    label: "Strollers & Car Seats",
    image: "/stores/firstcry/strollers-gear.webp",
    alt: "Modern foldable baby stroller for travel and everyday outings",
    title: "Cabin-Fold Strollers, ISOFIX Car Seats & Nursery Gear",
    detail:
      "Compare safety harnesses, fold style, and travel convenience for your routine — from quick errands to longer family trips.",
    points: [
      "Reversible and cabin-fold stroller options",
      "ISOFIX-compatible car seat choices (check model specs)",
      "PIN-code delivery and availability shown on FirstCry",
    ],
    cta: "Shop Baby Gear",
    src: "matcher-baby-gear",
  },
  apparel: {
    label: "Kids' Cotton Fashion",
    image: "/stores/firstcry/kids-fashion.webp",
    alt: "Soft cotton baby and toddler clothing",
    title: "Tagless Cotton Onesies, Jabas, Sets & Everyday Kidswear",
    detail:
      "Soft, breathable everyday outfits for newborns to growing kids — easy-on styles for quick changes and all-day comfort.",
    points: [
      "Tagless 100% combed-cotton onesies and front-open jablas",
      "Everyday sets for newborns through toddler/kids sizes",
      "Compare size charts and fabric details on product pages",
    ],
    cta: "Shop Kids' Fashion",
    src: "matcher-kids-apparel",
  },
  feeding: {
    label: "Feeding & Sterilizers",
    image: "/stores/firstcry/feeding-maternity.webp",
    alt: "Baby feeding bottles and nursery care essentials",
    title: "BPA-Free Bottles, Steam Sterilizers & Maternity Essentials",
    detail:
      "Build a practical feeding and care setup with bottles, sterilizing gear, and parent essentials in one place.",
    points: [
      "BPA-free anti-colic feeding bottle options",
      "Electric steam sterilizers and nursing essentials",
      "Useful for hospital-bag prep and monthly restocks",
    ],
    cta: "Shop Feeding & Maternity",
    src: "matcher-feeding-maternity",
  },
  toys: {
    label: "Developmental Toys",
    image: "/stores/firstcry/developmental-toys.webp",
    alt: "Wooden developmental toys and stacking blocks for toddlers",
    title: "Wooden Montessori Toys, Stacking Sets & Early Learning Play",
    detail:
      "Pick age-appropriate play essentials that support motor skills, curiosity, and screen-free time as your child grows.",
    points: [
      "Wooden stacking, sorting, and early learning toys",
      "Age-wise options for infants, toddlers, and kids",
      "Check material/safety details on each product listing",
    ],
    cta: "Shop Toys & Learning",
    src: "matcher-developmental-toys",
  },
};

const TABS = (Object.keys(CATEGORIES) as Tab[]).map((id) => ({ id, label: CATEGORIES[id].label }));

export default function FirstCryClient({ offers, faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("diapers");
  const category = useMemo(() => CATEGORIES[active], [active]);
  const officialHref = storeGoHref("firstcry", "store-page");

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7fb_0%,#ffffff_35%,#f8fbff_100%)]">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-pink-700">
              <Baby aria-hidden="true" className="h-4 w-4" />
              FirstCry Official Store Guide
            </p>
            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:leading-[1.05]">
              Diapers, Baby Gear &amp; Nursery Essentials{" "}
              <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
                for Every Stage
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg">
              Shop taped and pant-style diapers, 99% water wipes, strollers, ISOFIX car seats, cotton kidswear,
              feeding essentials, and developmental toys — then use Durza’s tools to plan smarter monthly restocks.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={officialHref}
                target="_blank"
                rel={GO_REL}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-pink-700 px-8 text-base font-bold text-white shadow-[0_12px_30px_rgba(190,24,93,0.25)] transition hover:-translate-y-0.5 hover:bg-pink-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              >
                Shop FirstCry Official Store
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href="#categories"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-ledger-line bg-white px-8 text-base font-bold text-ink shadow-[var(--shadow-hairline)] transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-[var(--shadow-raised)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              >
                Explore Categories
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: PackageCheck, label: "Nursery restocks" },
                { icon: ShieldCheck, label: "Trusted baby gear picks" },
                { icon: Calculator, label: "Club & diaper tools" },
                { icon: BadgePercent, label: "Live feed offers" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-ledger-line bg-white px-3 py-3 text-xs font-medium text-ink shadow-[var(--shadow-hairline)] sm:text-sm"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-pink-700" />
                  <span className="leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={heroImageUrl || "/stores/firstcry/hero-nursery.webp"}
                alt="Sunlit nursery with crib and baby essentials"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pink-700">Smart shopping tip</p>
              <p className="mt-1 text-sm leading-6 text-ink-soft">
                Buy smaller diaper packs in the first weeks, then switch to jumbo monthly boxes once size stabilizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TrustStats {...stats} />
      </div>

      {/* Practical buying context */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="fc-practical">
        <div className="rounded-3xl border border-ledger-line bg-white p-6 shadow-[var(--shadow-hairline)] sm:p-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-inkblue">Practical Buying Guide</p>
          <h2 id="fc-practical" className="mt-2 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
            Shop by stage, not just by cart size
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-ink-soft">
            Shopping for a baby or growing toddler usually starts with a simple mistake: buying massive bulk packs of
            newborn or small diapers before realizing how fast babies outgrow them in the first weeks. Start with
            smaller packs early on, then move to jumbo monthly boxes once your baby settles into Medium or Large.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-8 text-ink-soft">
            On FirstCry, you can compare taped diapers (easy for early weeks and gentle around a healing umbilical
            stump) with pant-style diapers that slip on quickly once babies become more active. Beyond diapers, you’ll
            find wipes, rash care, cotton clothing, feeding bottles, sterilizers, strollers, ISOFIX car seats, and more
            in one place.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              "Compare per-piece diaper costs before bulk restocks",
              "Check size charts, materials, and safety specs on product pages",
              "Apply eligible promo/payment offers at checkout on FirstCry",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-xl border border-pink-100 bg-pink-50/50 p-4 text-sm leading-6 text-ink-soft">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-pink-700" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto mt-10 max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8" aria-labelledby="fc-categories">
        <div className="mb-6 text-center sm:mb-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-inkblue">Curated Categories</p>
          <h2 id="fc-categories" className="mt-2 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
            Essentials for babies, toddlers &amp; parents
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink-soft">
            Explore key FirstCry categories with practical buying context. Every CTA opens the official FirstCry store via a tracked link.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition ${
                  selected
                    ? "border-pink-700 bg-pink-700 text-white shadow-sm"
                    : "border-ledger-line bg-white text-ink hover:border-pink-300 hover:bg-pink-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <article className="mt-6 overflow-hidden rounded-3xl border border-ledger-line bg-white shadow-[var(--shadow-hairline)]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[260px] bg-slate-100 sm:min-h-[340px]">
              <Image
                src={category.image}
                alt={category.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pink-700">{category.label}</p>
              <h3 className="mt-2 font-sans text-2xl font-bold leading-tight text-ink sm:text-3xl">{category.title}</h3>
              <p className="mt-3 text-base leading-7 text-ink-soft">{category.detail}</p>
              <ul className="mt-5 space-y-3">
                {category.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-6 text-ink-soft sm:text-base">
                    <Sparkles aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-pink-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href={storeGoHref("firstcry", category.src)}
                target="_blank"
                rel={GO_REL}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-pink-700 px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-pink-800"
              >
                {category.cta}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </article>
      </section>

      {/* Tools */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="fc-tools">
        <div className="rounded-3xl border border-ledger-line bg-white p-6 shadow-[var(--shadow-hairline)] sm:p-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-inkblue">Durza Tools for Parents</p>
          <h2 id="fc-tools" className="mt-2 font-serif text-3xl font-extrabold text-ink sm:text-4xl">
            Plan restocks before you check out
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
            Before locking in a monthly restock or FirstCry Club membership, run your numbers with Durza’s tools and then check live pricing, availability, and cart offers on the official store.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/stores/firstcry/club-calculator"
              className="group rounded-2xl border border-pink-100 bg-pink-50/40 p-5 transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-[var(--shadow-raised)]"
            >
              <div className="flex items-center gap-2 text-pink-700">
                <Calculator aria-hidden="true" className="h-5 w-5" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em]">Interactive Tool</p>
              </div>
              <h3 className="mt-2 text-lg font-bold text-ink group-hover:text-pink-700">FirstCry Club Calculator</h3>
              <p className="mt-1 text-sm leading-6 text-ink-soft">
                Estimate whether FirstCry Club pricing and perks make sense for your monthly baby essentials spend.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-pink-700">
                Open calculator <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </Link>
            <Link
              href="/stores/firstcry/diaper-cost-tracker"
              className="group rounded-2xl border border-pink-100 bg-pink-50/40 p-5 transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-[var(--shadow-raised)]"
            >
              <div className="flex items-center gap-2 text-pink-700">
                <Baby aria-hidden="true" className="h-5 w-5" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em]">Interactive Tool</p>
              </div>
              <h3 className="mt-2 text-lg font-bold text-ink group-hover:text-pink-700">Diaper Cost Tracker</h3>
              <p className="mt-1 text-sm leading-6 text-ink-soft">
                Compare per-piece diaper costs across pack sizes and plan smarter bulk restocks as your baby grows.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-pink-700">
                Open tracker <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-ledger-line bg-white p-6 shadow-[var(--shadow-hairline)] sm:p-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-inkblue">Curated Links</p>
          <h2 className="mt-2 font-serif text-2xl font-extrabold text-ink">Related guides &amp; categories</h2>
          <div className="mt-4"><StoreGuideLink slug="firstcry" /></div>
          <ul className="mt-3 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <li><Link href="/stores/gritzo" className="font-medium text-durza-deep hover:underline">Gritzo store guide</Link></li>
            <li><Link href="/categories/baby-kids" className="font-medium text-durza-deep hover:underline">Baby &amp; Kids category</Link></li>
            <li><Link href="/guides/firstcry-parenting-deals-and-firstcry-club-guide" className="font-medium text-durza-deep hover:underline">FirstCry parenting deals guide</Link></li>
            <li><a href={officialHref} target="_blank" rel={GO_REL} className="font-medium text-durza-deep hover:underline">Shop official FirstCry store</a></li>
          </ul>
        </div>
      </section>

      {/* Live offers */}
      {offers.length > 0 && (
        <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="fc-live-offers">
          <h2 id="fc-live-offers" className="font-serif text-2xl font-extrabold text-ink sm:text-3xl">Live offers from our feed</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
            Offers below are synced from our affiliate/feed sources when available. Always confirm final pricing, eligibility, PIN-code availability, and terms on firstcry.com before checkout.
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
                  ctaHref={offer.targetUrl || storeGoHref("firstcry", "offer-card")}
                  expiresAt={offer.expiresAt}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Final CTA */}
      <section className="mx-auto mt-10 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-50 via-white to-rose-50 p-6 text-center shadow-[var(--shadow-hairline)] sm:p-10">
          <h2 className="font-serif text-2xl font-extrabold text-ink sm:text-3xl">Ready to stock up for your little one?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink-soft">
            Browse diapers, gear, fashion, feeding essentials, and toys on FirstCry’s official store. Check live prices, delivery, and checkout offers before placing your order.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href={storeGoHref("firstcry", "store-page-bottom")}
              target="_blank"
              rel={GO_REL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-pink-700 px-7 text-sm font-bold text-white shadow-[0_12px_30px_rgba(190,24,93,0.25)] transition hover:-translate-y-0.5 hover:bg-pink-800"
            >
              Visit Official FirstCry Store
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8">
          <FaqSection eyebrow="FirstCry FAQs" items={faqs} />
        </div>
        <div className="mt-6">
          <AffiliateDisclosure />
        </div>
      </section>
    </div>
  );
}
