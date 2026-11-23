"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  BadgePercent,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Info,
  ShieldCheck,
  Sparkles,
  Tag,
  Wallet,
} from "lucide-react";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import { GO_REL, storeGoHref } from "@/lib/go";
import {
  ASUS_COMPARISONS,
  ASUS_LINEUP,
  ASUS_MATCHES,
  ASUS_MATCHER_ORDER,
  type AsusMatchId,
} from "./content";

interface Props {
  faqs: { question: string; answer: string }[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
  forcedStoreHref?: string | null;
}

const ASUS_ADMITAD_PROGRAM = "36176";

function asusOutHref(targetUrl: string, src: string): string {
  return `/out?program=${ASUS_ADMITAD_PROGRAM}&ulp=${encodeURIComponent(targetUrl)}&src=${encodeURIComponent(src)}`;
}

function affiliateHref(placement: string, forcedStoreHref?: string | null): string {
  return storeGoHref("asus", placement, forcedStoreHref ?? undefined);
}

const HERO_SRC = "asus-india-hero";
const MATCHER_SRC = "asus-india-matcher";
const MOBILE_SRC = "asus-india-mobile";

const PROMO_START = new Date("2026-11-18T00:00:00+05:30").getTime();
const PROMO_END = new Date("2026-11-30T23:59:59.999+05:30").getTime();
const SPECS_CHECKED = "20 Nov 2026";

type AsusDeal = {
  name: string;
  model: string;
  dealPrice: number;
  originalPrice: number;
  savings: number;
  image: string;
  alt: string;
  targetUrl: string;
  src: string;
  cta: string;
  bestFor: string;
  verdict: string;
  specs: { label: string; value: string }[];
};

const ASUS_NOVEMBER_DEALS: AsusDeal[] = [
  {
    name: "ASUS Vivobook 16 (X1607)",
    model: "X1607AA-MB038WS",
    dealPrice: 98990,
    originalPrice: 159990,
    savings: 61000,
    image: "/stores/asus-deals/vivobook-x1607.webp",
    alt: "ASUS Vivobook 16 X1607 laptop (official product image)",
    targetUrl: "https://www.asus.com/in/laptops/for-home/vivobook/asus-vivobook-16-x1607/",
    src: "asus-deal-vivobook-x1607aa-mb038ws",
    cta: "View Vivobook 16 on ASUS",
    bestFor: "Students & everyday productivity",
    verdict: "A large-screen everyday laptop pick if you want a practical work/study machine at a lower final price.",
    specs: [
      { label: "CPU", value: "Check exact CPU for this SKU on ASUS" },
      { label: "GPU", value: "Check exact graphics configuration on ASUS" },
      { label: "RAM", value: "Check exact memory configuration on ASUS" },
      { label: "Storage", value: "Check exact SSD/storage configuration on ASUS" },
      { label: "Display", value: "16-inch class (confirm panel/resolution on ASUS)" },
      { label: "Weight", value: "Check official weight/spec sheet on ASUS" },
    ],
  },
  {
    name: "ASUS TUF Gaming A15",
    model: "FA506NCQ-IN081WS",
    dealPrice: 105990,
    originalPrice: 164990,
    savings: 59000,
    image: "/stores/asus-deals/tuf-gaming-a15-2021.webp",
    alt: "ASUS TUF Gaming A15 laptop (official product-family image)",
    targetUrl: "https://www.asus.com/in/laptops/for-gaming/tuf-gaming/2021-asus-tuf-gaming-a15/",
    src: "asus-deal-tuf-a15-fa506ncq-in081ws",
    cta: "View TUF Gaming A15 on ASUS",
    bestFor: "Value-focused 1080p gaming",
    verdict: "Consider this if the final price and listed GPU/RAM config match your gaming needs; compare all TUF SKUs before choosing.",
    specs: [
      { label: "CPU", value: "Verify exact Ryzen/Intel CPU for FA506NCQ-IN081WS on ASUS" },
      { label: "GPU", value: "Verify exact NVIDIA GeForce GPU/VRAM on ASUS" },
      { label: "RAM", value: "Verify installed memory and upgrade options on ASUS" },
      { label: "Storage", value: "Verify SSD capacity and slots on ASUS" },
      { label: "Display", value: "15.6-inch gaming display (confirm refresh rate/resolution on ASUS)" },
      { label: "Weight", value: "Verify official weight on ASUS" },
    ],
  },
  {
    name: "ASUS TUF Gaming A15",
    model: "FA506NCG-HN192WS",
    dealPrice: 110990,
    originalPrice: 155990,
    savings: 45000,
    image: "/stores/asus-deals/tuf-gaming-a15-2021.webp",
    alt: "ASUS TUF Gaming A15 laptop (official product-family image)",
    targetUrl: "https://www.asus.com/in/laptops/for-gaming/tuf-gaming/2021-asus-tuf-gaming-a15/",
    src: "asus-deal-tuf-a15-fa506ncg-hn192ws",
    cta: "View TUF Gaming A15 on ASUS",
    bestFor: "Gaming & performance buyers comparing configs",
    verdict: "Higher deal price than some sibling SKUs here—worth it only if ASUS lists stronger listed specs for this exact model.",
    specs: [
      { label: "CPU", value: "Verify exact processor for FA506NCG-HN192WS on ASUS" },
      { label: "GPU", value: "Verify exact NVIDIA GeForce GPU/VRAM on ASUS" },
      { label: "RAM", value: "Verify installed memory and upgrade options on ASUS" },
      { label: "Storage", value: "Verify SSD capacity and slots on ASUS" },
      { label: "Display", value: "15.6-inch gaming display (confirm refresh rate/resolution on ASUS)" },
      { label: "Weight", value: "Verify official weight on ASUS" },
    ],
  },
  {
    name: "ASUS TUF Gaming A15",
    model: "FA506NCQ-IN080W",
    dealPrice: 103990,
    originalPrice: 161990,
    savings: 58000,
    image: "/stores/asus-deals/tuf-gaming-a15-2021.webp",
    alt: "ASUS TUF Gaming A15 laptop (official product-family image)",
    targetUrl: "https://www.asus.com/in/laptops/for-gaming/tuf-gaming/2021-asus-tuf-gaming-a15/",
    src: "asus-deal-tuf-a15-fa506ncq-in080w",
    cta: "View TUF Gaming A15 on ASUS",
    bestFor: "Budget-conscious gamers",
    verdict: "Lowest deal price among these TUF listings—check the listed CPU/GPU/RAM/storage on ASUS to confirm overall value.",
    specs: [
      { label: "CPU", value: "Verify exact processor for FA506NCQ-IN080W on ASUS" },
      { label: "GPU", value: "Verify exact NVIDIA GeForce GPU/VRAM on ASUS" },
      { label: "RAM", value: "Verify installed memory and upgrade options on ASUS" },
      { label: "Storage", value: "Verify SSD capacity and slots on ASUS" },
      { label: "Display", value: "15.6-inch gaming display (confirm refresh rate/resolution on ASUS)" },
      { label: "Weight", value: "Verify official weight on ASUS" },
    ],
  },
];

const ASUS_ADOBE_TARGET_URL = "https://www.asus.com/in/content/asus-offers-adobe-creative-cloud/";

function formatINR(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

function savingsPercent(savings: number, original: number): number {
  if (original <= 0) return 0;
  return Math.round((savings / original) * 100);
}

export default function AsusClient({ faqs, stats, storeUrl, forcedStoreHref }: Props) {
  const [active, setActive] = useState<AsusMatchId>("gaming");
  const [isPromoActive, setIsPromoActive] = useState(false);

  useEffect(() => {
    const now = Date.now();
    setIsPromoActive(now >= PROMO_START && now <= PROMO_END);
  }, []);

  const heroHref = affiliateHref(HERO_SRC, forcedStoreHref);
  const matcherHref = affiliateHref(MATCHER_SRC, forcedStoreHref);
  const mobileHref = affiliateHref(MOBILE_SRC, forcedStoreHref);

  const domain = (() => {
    try {
      return new URL(storeUrl ?? "https://asus.com/in/").hostname.replace(/^www\./, "");
    } catch {
      return "asus.com/in";
    }
  })();
  const match = ASUS_MATCHES[active];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 sm:px-6 sm:py-12 md:pb-8">
      {isPromoActive && (
        <a
          href="#asus-november-deals"
          className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-amber-400/50 bg-slate-900 px-4 py-3 text-left shadow-sm transition hover:border-amber-300/70 hover:bg-slate-800"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300 ring-1 ring-amber-400/30">
              <Tag aria-hidden="true" className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">ASUS November Deals</p>
              <p className="truncate text-sm font-medium text-white sm:text-base">
                Select laptops with promotional pricing • Valid 18–30 Nov 2026
              </p>
            </div>
          </div>
          <span className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-cyan-300 sm:inline-flex">
            View deals <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </a>
      )}

      {/* Hero */}
      <section className="overflow-hidden rounded-3xl border border-[#1f2937] bg-[#0D1117] shadow-sm">
        <div className="grid gap-8 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#22d3ee]">
              ASUS India · Official eShop
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-4xl md:text-5xl">
              ASUS India Laptop Buying Guide — ROG, TUF, Zenbook &amp; Vivobook
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#cbd5e1] sm:text-lg">
              Compare laptop families by real use case, understand key specs in plain language, and check official ASUS
              India pages for live configurations, pricing, and checkout offers.
            </p>
            {isPromoActive && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-sm font-medium text-amber-100">
                <CalendarDays className="h-4 w-4" aria-hidden="true" /> November promos live: 18–30 Nov 2026
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={heroHref}
                rel={GO_REL}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg bg-[#22d3ee] px-6 py-3 text-sm font-bold tracking-wide text-[#0D1117] transition hover:bg-[#67e8f9]"
              >
                Check Live Models &amp; Offers on ASUS India
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </a>
              <span className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">{domain}</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#223047] bg-gradient-to-br from-[#111827] to-[#0b1220] p-4">
              <Image
                src="/stores/asus-deals/vivobook-x1607.webp"
                alt="ASUS Vivobook 16 laptop (official product image)"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-contain p-4"
                priority={false}
              />
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">Featured ASUS product image shown for illustration; verify exact SKU/config on ASUS.</p>
          </div>
        </div>

        <div className="grid gap-4 border-t border-[#1f2937] px-6 py-8 sm:grid-cols-3 sm:px-10">
          <div className="rounded-xl border border-[#223047] bg-[#111827]/70 p-4">
            <div className="flex items-center gap-2 text-[#f59e0b]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-[#F8FAFC]">Official Warranty &amp; Support</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#cbd5e1]">
              Buy from official channels for manufacturer-backed warranty and service options (terms vary by model/SKU).
            </p>
          </div>
          <div className="rounded-xl border border-[#223047] bg-[#111827]/70 p-4">
            <div className="flex items-center gap-2 text-[#22d3ee]">
              <BadgePercent className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-[#F8FAFC]">Bank Offers &amp; EMI</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#cbd5e1]">
              Instant discounts, cashback, and EMI options may be available at checkout—always confirm live eligibility.
            </p>
          </div>
          <div className="rounded-xl border border-[#223047] bg-[#111827]/70 p-4">
            <div className="flex items-center gap-2 text-[#22d3ee]">
              <GraduationCap className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-[#F8FAFC]">Student &amp; Creator Benefits</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#cbd5e1]">
              Some programs/bundles (including education benefits or software offers) may apply on eligible purchases.
            </p>
          </div>
        </div>
      </section>

      {isPromoActive && (
        <section
          id="asus-november-deals"
          aria-labelledby="asus-november-deals-heading"
          className="mt-8 scroll-mt-24 overflow-hidden rounded-3xl border border-[#334155] bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1220] p-5 shadow-[0_20px_60px_rgba(2,6,23,0.45)] sm:p-7"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">
                Curated promotional listings
              </p>
              <h2 id="asus-november-deals-heading" className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                ASUS November Deals – Save Up to ₹61,000
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                Select ASUS laptops with promotional pricing for <strong className="text-white">18–30 November 2026</strong>. No coupon codes are required for these listed deals. Always verify the exact SKU specs, final checkout price, stock, and terms on ASUS.
              </p>
              <p className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-slate-300">
                <Clock3 className="h-4 w-4" aria-hidden="true" /> Specs checked: {SPECS_CHECKED}
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
              <p className="font-semibold text-white">Pricing note</p>
              <p className="mt-1 max-w-xs leading-6 text-slate-300">Focus on the final deal price and verified specs. Strike-through/MRP and savings can vary by listing and may look high on older models.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-2">
            {ASUS_NOVEMBER_DEALS.map((deal) => {
              const percent = savingsPercent(deal.savings, deal.originalPrice);
              return (
                <article
                  key={deal.model}
                  className="group overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/60 transition hover:border-cyan-400/40 hover:shadow-[0_16px_40px_rgba(8,145,178,0.15)]"
                >
                  <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                    <div className="relative min-h-[220px] bg-slate-950 md:min-h-full">
                      <Image
                        src={deal.image}
                        alt={deal.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 220px"
                        className="object-contain p-5 transition duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-cyan-200">Best for: {deal.bestFor}</span>
                        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-300">Save {percent}% ({formatINR(deal.savings)})</span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold leading-snug text-white sm:text-xl">{deal.name}</h3>
                      <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">Model: {deal.model}</p>

                      <div className="mt-4">
                        <p className="text-sm text-slate-300">Deal price</p>
                        <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
                          <p className="text-3xl font-extrabold tracking-tight text-white">{formatINR(deal.dealPrice)}</p>
                          <p className="text-sm font-medium text-slate-400"><span className="line-through">{formatINR(deal.originalPrice)}</span> <span className="text-slate-500">(listed original/MRP)</span></p>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-200"><strong className="text-white">Verdict:</strong> {deal.verdict}</p>

                      <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2 rounded-xl border border-slate-700/70 bg-slate-950/40 p-3 text-sm sm:grid-cols-2">
                        {deal.specs.map((spec) => (
                          <div key={`${deal.model}-${spec.label}`} className="min-w-0">
                            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{spec.label}</dt>
                            <dd className="mt-0.5 leading-5 text-slate-200">{spec.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        <Info className="mr-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden="true" />
                        Specs vary by SKU/configuration. Verify CPU, GPU, RAM, storage, display, and weight on the official ASUS page before buying.
                      </p>

                      <a
                        href={asusOutHref(deal.targetUrl, deal.src)}
                        target="_blank"
                        rel={GO_REL}
                        className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                      >
                        {deal.cta}
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-violet-300/25 bg-violet-500/10 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">Additional ASUS benefit</p>
                <h3 className="mt-1 text-xl font-bold text-white">ASUS Adobe Creative Cloud 1-month bundle</h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
                  ASUS may offer an Adobe Creative Cloud 1-month bundle on eligible purchases. Check the official ASUS offer page for eligibility, redemption steps, supported products, and terms.
                </p>
                <p className="mt-2 text-xs font-medium text-slate-400">Promo period shown on this page: 18–30 November 2026 (verify current terms on ASUS).</p>
              </div>
              <a
                href={asusOutHref(ASUS_ADOBE_TARGET_URL, "asus-adobe-creative-cloud")}
                target="_blank"
                rel={GO_REL}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-violet-300/40 bg-violet-400/10 px-5 py-2.5 text-sm font-bold text-violet-100 transition hover:bg-violet-400/20"
              >
                View Adobe Bundle Offer
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white"><Wallet className="h-5 w-5 text-cyan-300" aria-hidden="true" /> How to stack savings (example checklist)</h3>
              <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                <li><strong className="text-white">1. Start with the final SKU price:</strong> compare the exact model number/config on ASUS, not just the series name.</li>
                <li><strong className="text-white">2. Check bank/EMI offers at checkout:</strong> instant discounts or no-cost EMI may apply on eligible cards (varies by date and bank).</li>
                <li><strong className="text-white">3. Look for student/education or brand programs:</strong> apply only if you’re eligible and the terms fit.</li>
                <li><strong className="text-white">4. Confirm bundles/perks:</strong> warranty upgrades, accessories, or software bundles (like Adobe) may be separate from the laptop price.</li>
              </ol>
              <p className="mt-3 text-xs text-slate-400">Example only—offers, banks, and eligibility change. Verify the final payable amount on the ASUS checkout page.</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white"><Sparkles className="h-5 w-5 text-amber-300" aria-hidden="true" /> Buy now or wait? (seasonal note)</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                These listed ASUS promotions are valid through <strong className="text-white">30 Nov 2026</strong>. With Black Friday/weekend sale periods often around the corner, prices and bundles can change quickly.
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                <li><strong className="text-white">Buy now</strong> if the exact SKU you want is in stock at a price/config you’re happy with.</li>
                <li><strong className="text-white">Wait/watch</strong> if you’re flexible and want to compare upcoming bank offers or bundle changes—but stock/configurations may shift.</li>
              </ul>
            </div>
          </div>

          <p className="mt-4 text-xs leading-6 text-slate-400">
            Deal details above are based on provided promotional information for 18–30 November 2026. TUF Gaming A15 listings link to the official ASUS TUF Gaming A15 (2021) product-family page; confirm the exact generation/specs for each SKU on ASUS before purchase. This page is informational and not an ASUS-exclusive offer.
          </p>
        </section>
      )}

      <div className="mt-4">
        <TrustStats {...stats} />
      </div>
      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      {/* Lineup */}
      <section aria-labelledby="asus-lineup-heading" className="mt-10">
        <div className="mb-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0891b2]">ASUS lineup</p>
          <h2 id="asus-lineup-heading" className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Explore ASUS laptop families by what you want to do
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-soft">
            Outcome-focused picks to help you narrow down a series. Product images in this lineup may be placeholders—replace with official ASUS product images for best accuracy.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {ASUS_LINEUP.map((item) => (
            <li key={item.slug} className="min-h-0">
              <a
                href={affiliateHref(`asus-india-lineup-${item.slug}`, forcedStoreHref)}
                rel={GO_REL}
                target="_blank"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-[0_12px_40px_rgba(15,23,42,0.12)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-[#0D1117]/85 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#22d3ee] backdrop-blur-sm">
                    {item.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium text-slate-700">{item.outcome}</p>
                  <p className="mt-2 text-[13px] leading-6 text-ink-soft">{item.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0891b2]">
                    View on ASUS India <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Matcher */}
      <section aria-labelledby="asus-matcher-heading" className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0891b2]">ASUS matcher</p>
        <h2 id="asus-matcher-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
          Find the right ASUS for how you work and play
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
          Pick a use case to see what to prioritize, a recommended spec tier, and a typical price range (last checked 20 Nov 2026). Then verify live configs on ASUS India.
        </p>
        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Choose a laptop use case">
          {ASUS_MATCHER_ORDER.map((id) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                id={`asus-tab-${id}`}
                type="button"
                role="tab"
                onClick={() => setActive(id)}
                onKeyDown={(event) => {
                  const currentIndex = ASUS_MATCHER_ORDER.indexOf(id);
                  let nextIndex: number | null = null;
                  if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % ASUS_MATCHER_ORDER.length;
                  else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + ASUS_MATCHER_ORDER.length) % ASUS_MATCHER_ORDER.length;
                  else if (event.key === "Home") nextIndex = 0;
                  else if (event.key === "End") nextIndex = ASUS_MATCHER_ORDER.length - 1;
                  if (nextIndex === null) return;
                  event.preventDefault();
                  const next = ASUS_MATCHER_ORDER[nextIndex];
                  setActive(next);
                  document.getElementById(`asus-tab-${next}`)?.focus();
                }}
                aria-selected={isActive}
                aria-controls="asus-match-panel"
                tabIndex={isActive ? 0 : -1}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-[#0D1117] bg-[#0D1117] text-white"
                    : "border-ledger-line bg-white text-ink hover:border-[#0891b2]"
                }`}
              >
                {ASUS_MATCHES[id].label}
              </button>
            );
          })}
        </div>
        <div id="asus-match-panel" role="tabpanel" aria-labelledby={`asus-tab-${active}`} className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <h3 className="text-xl font-bold text-ink">{match.headline}</h3>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-ink-soft">
            {match.checklist.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0891b2]" aria-hidden="true" strokeWidth={2} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-7 text-ink-soft"><strong className="text-ink">Recommended spec tier:</strong> {match.spec}</p>
          <p className="mt-1 text-sm leading-7 text-ink-soft"><strong className="text-ink">Indicative range:</strong> {match.budget}</p>
          <a
            href={matcherHref}
            rel={GO_REL}
            target="_blank"
            data-affiliate-click="asus-india-matcher"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0D1117] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#0891b2]"
          >
            View Matching Models on ASUS India
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      {/* Comparison */}
      <section aria-labelledby="asus-comparison-heading" className="mt-8">
        <div className="mb-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0891b2]">Quick comparison</p>
          <h2 id="asus-comparison-heading" className="mt-1 text-2xl font-bold text-ink">ASUS laptop families at a glance</h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">Typical ranges and key traits to shortlist faster. Last checked: 20 Nov 2026. Verify exact SKU specs and live prices on ASUS India.</p>
        </div>

        {/* Mobile cards */}
        <div className="grid gap-4 md:hidden">
          {ASUS_COMPARISONS.map((product) => (
            <article key={product.id} className="rounded-2xl border border-ledger-line bg-white p-4 shadow-sm">
              <h3 className="text-base font-bold text-ink">ASUS {product.name}</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div><dt className="font-semibold text-ink">Best for</dt><dd className="text-ink-soft">{product.bestFor}</dd></div>
                <div><dt className="font-semibold text-ink">Key traits</dt><dd className="leading-6 text-ink-soft">{product.keySpec}</dd></div>
                <div><dt className="font-semibold text-ink">Indicative range</dt><dd className="text-ink-soft">{product.budget}</dd></div>
              </dl>
              <a
                href={affiliateHref(`asus-india-compare-${product.id}`, forcedStoreHref)}
                rel={GO_REL}
                target="_blank"
                data-affiliate-click={`asus-india-compare-${product.id}`}
                className="mt-4 inline-flex min-h-10 items-center gap-1 rounded-lg bg-[#0D1117] px-3 py-2 text-xs font-bold text-white hover:bg-[#0891b2]"
              >
                Check Live Price &amp; Configs <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto rounded-2xl border border-ledger-line bg-white md:block" role="region" aria-label="ASUS laptop comparison table" tabIndex={0}>
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Model family</th>
                <th scope="col" className="px-4 py-3 font-semibold">Best for</th>
                <th scope="col" className="px-4 py-3 font-semibold">Key traits</th>
                <th scope="col" className="px-4 py-3 font-semibold">Indicative range (last checked 20 Nov 2026)</th>
                <th scope="col" className="px-4 py-3 font-semibold">Live price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ASUS_COMPARISONS.map((product) => (
                <tr key={product.id} className="align-top">
                  <th scope="row" className="px-4 py-4 font-semibold text-ink">ASUS {product.name}</th>
                  <td className="px-4 py-4 text-ink-soft">{product.bestFor}</td>
                  <td className="max-w-xs px-4 py-4 leading-6 text-ink-soft">{product.keySpec}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-ink-soft">{product.budget}</td>
                  <td className="px-4 py-4">
                    <a href={affiliateHref(`asus-india-compare-${product.id}`, forcedStoreHref)} rel={GO_REL} target="_blank" data-affiliate-click={`asus-india-compare-${product.id}`} className="inline-flex min-h-10 items-center gap-1 rounded-lg bg-[#0D1117] px-3 py-2 text-xs font-bold text-white hover:bg-[#0891b2]">
                      Check Live Price <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Persona inspiration + glossary */}
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0891b2]">Use-case inspiration</p>
          <h2 className="mt-1 text-2xl font-bold text-ink">What the right ASUS can help you do</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { title: "Student", text: "Take notes, attend classes, and run coding/study apps on a reliable everyday laptop." },
              { title: "Creator", text: "Edit photos/videos and work with color-rich visuals on an OLED or creator-focused setup." },
              { title: "Gamer", text: "Play esports smoothly and enjoy AAA titles at settings matched to your GPU and display." },
              { title: "Traveler", text: "Carry a lighter laptop for flights/commutes with battery life suited to work on the go." },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-bold text-ink">{card.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{card.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-soft">Outcomes depend on the exact configuration (CPU/GPU/RAM/display). Always verify the SKU details on ASUS.</p>
        </div>
        <div className="rounded-2xl border border-ledger-line bg-white p-5 sm:p-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0891b2]">Quick glossary</p>
          <h2 className="mt-1 text-2xl font-bold text-ink">Specs, explained simply</h2>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              { term: "TGP (GPU power)", def: "How much power the laptop gives its graphics chip. Higher TGP often means better sustained gaming/creative performance (with more heat/noise)." },
              { term: "120Hz / 144Hz display", def: "The screen refreshes 120/144 times per second, making motion look smoother—especially noticeable in games and scrolling." },
              { term: "OLED / Lumina OLED", def: "Display tech with deep blacks and vivid colors; great for media and creative work. Check brightness and resolution per model." },
              { term: "Delta E < 1 / Calman-verified", def: "A measure/certification of color accuracy. Lower Delta E means colors are closer to what creators intend (model-specific)." },
              { term: "Ceraluminum", def: "ASUS material finish used on some premium designs; check the exact model page for build materials and durability details." },
            ].map((item) => (
              <div key={item.term} className="rounded-lg border border-slate-200 p-3">
                <dt className="font-semibold text-ink">{item.term}</dt>
                <dd className="mt-1 leading-6 text-ink-soft">{item.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQs */}
      <section aria-labelledby="store-faqs" className="mt-10">
        <h2 id="store-faqs" className="text-xl font-bold text-ink">ASUS India laptop FAQs</h2>
        <div className="mt-3 space-y-3">
          {faqs.map((item, idx) => (
            <details key={item.question} className="rounded-xl border border-ledger-line bg-white p-4" open={idx < 3}>
              <summary className="cursor-pointer text-sm font-semibold text-ink">{item.question}</summary>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1f2937] bg-[#0D1117]/95 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <span className="truncate text-xs font-medium text-[#e2e8f0]">ASUS Official India Store</span>
          <a href={mobileHref} rel={GO_REL} target="_blank" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#22d3ee] px-4 py-2 text-xs font-bold text-[#0D1117]">
            Check Live Price &amp; Offers
          </a>
        </div>
      </div>
    </div>
  );
}
