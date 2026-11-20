"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  BadgePercent,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Tag,
} from "lucide-react";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import { GO_REL, storeGoHref, type GoSource } from "@/lib/go";
import {
  ASUS_COMPARISONS,
  ASUS_LINEUP,
  ASUS_MATCHES,
  ASUS_MATCHER_ORDER,
  type AsusMatchId,
} from "./content";

interface Props {
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

function affiliateHref(placement: GoSource): string {
  return storeGoHref("asus", placement);
}

const HERO_HREF = "/go/asus?src=asus-india-hero";
const MATCHER_HREF = "/go/asus?src=asus-india-matcher";
const MOBILE_HREF = "/go/asus?src=asus-india-mobile";

const PROMO_START = new Date("2026-11-18T00:00:00+05:30").getTime();
const PROMO_END = new Date("2026-11-30T23:59:59.999+05:30").getTime();

type AsusDeal = {
  name: string;
  model: string;
  dealPrice: number;
  originalPrice: number;
  savings: number;
  image: string;
  alt: string;
  href: string;
  cta: string;
};

const ASUS_NOVEMBER_DEALS: AsusDeal[] = [
  {
    name: "ASUS Vivobook 16 (X1607)",
    model: "X1607AA-MB038WS",
    dealPrice: 98990,
    originalPrice: 159990,
    savings: 61000,
    image: "/stores/asus-deals/vivobook-x1607.webp",
    alt: "ASUS Vivobook 16 X1607 laptop",
    href: "https://www.asus.com/in/laptops/for-home/vivobook/asus-vivobook-16-x1607/",
    cta: "View Vivobook 16 on ASUS",
  },
  {
    name: "ASUS TUF Gaming A15",
    model: "FA506NCQ-IN081WS",
    dealPrice: 105990,
    originalPrice: 164990,
    savings: 59000,
    image: "/stores/asus-deals/tuf-gaming-a15-2021.webp",
    alt: "ASUS TUF Gaming A15 laptop (FA506NCQ-IN081WS)",
    href: "https://www.asus.com/in/laptops/for-gaming/tuf-gaming/2021-asus-tuf-gaming-a15/",
    cta: "View TUF Gaming A15 on ASUS",
  },
  {
    name: "ASUS TUF Gaming A15",
    model: "FA506NCG-HN192WS",
    dealPrice: 110990,
    originalPrice: 155990,
    savings: 45000,
    image: "/stores/asus-deals/tuf-gaming-a15-2021.webp",
    alt: "ASUS TUF Gaming A15 laptop (FA506NCG-HN192WS)",
    href: "https://www.asus.com/in/laptops/for-gaming/tuf-gaming/2021-asus-tuf-gaming-a15/",
    cta: "View TUF Gaming A15 on ASUS",
  },
  {
    name: "ASUS TUF Gaming A15",
    model: "FA506NCQ-IN080W",
    dealPrice: 103990,
    originalPrice: 161990,
    savings: 58000,
    image: "/stores/asus-deals/tuf-gaming-a15-2021.webp",
    alt: "ASUS TUF Gaming A15 laptop (FA506NCQ-IN080W)",
    href: "https://www.asus.com/in/laptops/for-gaming/tuf-gaming/2021-asus-tuf-gaming-a15/",
    cta: "View TUF Gaming A15 on ASUS",
  },
];

function formatINR(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

function savingsPercent(savings: number, original: number): number {
  if (original <= 0) return 0;
  return Math.round((savings / original) * 100);
}

export default function AsusClient({ faqs, stats, storeUrl }: Props) {
  const [active, setActive] = useState<AsusMatchId>("gaming");
  const [isPromoActive, setIsPromoActive] = useState(false);

  useEffect(() => {
    const now = Date.now();
    setIsPromoActive(now >= PROMO_START && now <= PROMO_END);
  }, []);

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
          className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-amber-300/40 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-cyan-500/10 px-4 py-3 text-left transition hover:border-amber-300/70"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-200">
              <Tag aria-hidden="true" className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">ASUS November Deals</p>
              <p className="truncate text-sm font-medium text-slate-100 sm:text-base">
                Save up to ₹61,000 on select ASUS laptops • Valid 18–30 November 2026
              </p>
            </div>
          </div>
          <span className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-cyan-200 sm:inline-flex">
            View deals <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </a>
      )}

      {/* Hero — dark precision hardware */}
      <section className="overflow-hidden rounded-3xl border border-[#1f2937] bg-[#0D1117] shadow-sm">
        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#22d3ee]">
            ASUS India · Official eShop
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-4xl md:text-5xl">
            ASUS India Official Store — ROG, Zenbook &amp; Vivobook Lineup
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#cbd5e1] sm:text-lg">
            Compare flagship OLED ultrabooks, RTX gaming rigs, and creator workstations—then find official ASUS eShop
            warranty bundles, bank cashback, and student privileges.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={HERO_HREF}
              rel={GO_REL}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg bg-[#22d3ee] px-6 py-3 text-sm font-bold tracking-wide text-[#0D1117] transition hover:bg-[#67e8f9]"
            >
              Configure &amp; Check Live Price on ASUS India →
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </a>
            <span className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">{domain}</span>
          </div>

          {/* eShop Advantage Strip */}
          <div className="mt-10 grid gap-4 border-t border-[#1f2937] pt-8 sm:grid-cols-3">
            <div className="rounded-xl border border-[#223047] bg-[#111827]/60 p-4">
              <div className="flex items-center gap-2 text-[#f59e0b]">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-[#F8FAFC]">Official Warranty Bundles</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#94a3b8]">
                Extended warranty and protection add-ons may be available at checkout (availability and pricing vary by model).
              </p>
            </div>
            <div className="rounded-xl border border-[#223047] bg-[#111827]/60 p-4">
              <div className="flex items-center gap-2 text-[#22d3ee]">
                <BadgePercent className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-[#F8FAFC]">Instant Bank &amp; EMI</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#94a3b8]">
                Bank cashback and EMI offers may be available on eligible cards; check live terms at checkout.
              </p>
            </div>
            <div className="rounded-xl border border-[#223047] bg-[#111827]/60 p-4">
              <div className="flex items-center gap-2 text-[#22d3ee]">
                <GraduationCap className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-[#F8FAFC]">Student &amp; Pro Perks</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#94a3b8]">
                Exclusive Edu-Store pricing via official verification
              </p>
            </div>
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
                Limited-time ASUS promotions
              </p>
              <h2 id="asus-november-deals-heading" className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                ASUS November Deals – Save Up to ₹61,000
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                Real promotional pricing on select ASUS laptops. No coupon codes required for these listed deals — check the official ASUS product pages for live availability, final checkout price, and terms.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-100">
              <CalendarDays aria-hidden="true" className="h-4 w-4" />
              Validity: 18–30 November 2026
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {ASUS_NOVEMBER_DEALS.map((deal) => {
              const percent = savingsPercent(deal.savings, deal.originalPrice);
              return (
                <article
                  key={deal.model}
                  className="group overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/60 transition hover:border-cyan-400/40 hover:shadow-[0_16px_40px_rgba(8,145,178,0.15)]"
                >
                  <div className="grid sm:grid-cols-[180px_1fr]">
                    <div className="relative aspect-[4/3] bg-slate-950 sm:aspect-auto sm:min-h-full">
                      <Image
                        src={deal.image}
                        alt={deal.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 180px"
                        className="object-contain p-4 transition duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-300">
                          Save {percent}%
                        </span>
                        <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-cyan-200">
                          {formatINR(deal.savings)} off
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold leading-snug text-white">{deal.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Model: {deal.model}</p>

                      <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-1">
                        <p className="text-2xl font-extrabold text-white">{formatINR(deal.dealPrice)}</p>
                        <p className="text-sm font-medium text-slate-400 line-through">{formatINR(deal.originalPrice)}</p>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-emerald-300">You save {formatINR(deal.savings)}</p>

                      <a
                        href={deal.href}
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
                  ASUS is also promoting an Adobe Creative Cloud 1-month bundle offer. Check the official ASUS offer page for eligibility, redemption steps, and terms.
                </p>
                <p className="mt-2 text-xs font-medium text-slate-400">Promotional period shown on this page: 18–30 November 2026</p>
              </div>
              <a
                href="https://www.asus.com/in/content/asus-offers-adobe-creative-cloud/"
                target="_blank"
                rel={GO_REL}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-violet-300/40 bg-violet-400/10 px-5 py-2.5 text-sm font-bold text-violet-100 transition hover:bg-violet-400/20"
              >
                View Adobe Bundle Offer
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <p className="mt-4 text-xs leading-6 text-slate-400">
            Deal details shown above are based on the promotional information provided for 18–30 November 2026. Prices, model availability, and offer terms may change on ASUS. Verify final details on the official ASUS pages before purchase.
          </p>
        </section>
      )}

      <div className="mt-4">
        <TrustStats {...stats} />
      </div>
      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      {/* Flagship Lineup */}
      <section aria-labelledby="asus-lineup-heading" className="mt-10">
        <div className="mb-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0891b2]">2026 lineup</p>
          <h2 id="asus-lineup-heading" className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Explore the 2026 ASUS India Lineup
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-soft">
            Flagship gaming, OLED ultrabooks, creator workstations and handheld power — compare series and configure on
            the official ASUS India eShop.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {ASUS_LINEUP.map((item) => (
            <li key={item.slug} className="min-h-0">
              <a
                href={`/go/asus?src=lineup-${item.slug}`}
                rel={GO_REL}
                target="_blank"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-[0_12px_40px_rgba(15,23,42,0.12)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-[#0D1117]/85 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#22d3ee] backdrop-blur-sm">
                    {item.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-ink-soft">{item.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#0891b2]">
                    Configure on ASUS India <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ASUS Matcher */}
      <section
        aria-labelledby="asus-matcher-heading"
        className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0891b2]">ASUS matcher</p>
        <h2 id="asus-matcher-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
          Find the right ASUS for how you work and play
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
          Select a use case to see a spec checklist, recommended RAM/GPU tier and an indicative rupee range — then view
          matching configurations on the official ASUS India eShop.
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
                  else if (event.key === "ArrowLeft")
                    nextIndex = (currentIndex - 1 + ASUS_MATCHER_ORDER.length) % ASUS_MATCHER_ORDER.length;
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
        <div
          id="asus-match-panel"
          role="tabpanel"
          aria-labelledby={`asus-tab-${active}`}
          className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
        >
          <h3 className="text-xl font-bold text-ink">{match.headline}</h3>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-ink-soft">
            {match.checklist.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0891b2]" aria-hidden="true" strokeWidth={2} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            <strong className="text-ink">Recommended tier:</strong> {match.spec}
          </p>
          <p className="mt-1 text-sm leading-7 text-ink-soft">
            <strong className="text-ink">Indicative range:</strong> {match.budget}
          </p>
          <a
            href={MATCHER_HREF}
            rel={GO_REL}
            target="_blank"
            data-affiliate-click="asus-india-matcher"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0D1117] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#0891b2]"
          >
            View Matching Models on ASUS India →
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      {/* Comparison table */}
      <section aria-labelledby="asus-comparison-heading" className="mt-8">
        <div className="mb-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#0891b2]">
            Quick comparison
          </p>
          <h2 id="asus-comparison-heading" className="mt-1 text-2xl font-bold text-ink">
            ASUS laptop families at a glance
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Compare popular series by use case and key specs, then check live configurations and pricing on the official
            ASUS India eShop.
          </p>
        </div>
        <div
          className="overflow-x-auto rounded-2xl border border-ledger-line bg-white"
          role="region"
          aria-label="ASUS laptop comparison table"
          tabIndex={0}
        >
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Model family</th>
                <th scope="col" className="px-4 py-3 font-semibold">Best for</th>
                <th scope="col" className="px-4 py-3 font-semibold">Key specs</th>
                <th scope="col" className="px-4 py-3 font-semibold">Indicative range</th>
                <th scope="col" className="px-4 py-3 font-semibold">Live price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ASUS_COMPARISONS.map((product) => (
                <tr key={product.id} className="align-top">
                  <th scope="row" className="px-4 py-4 font-semibold text-ink">
                    ASUS {product.name}
                  </th>
                  <td className="px-4 py-4 text-ink-soft">{product.bestFor}</td>
                  <td className="max-w-xs px-4 py-4 leading-6 text-ink-soft">{product.keySpec}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-ink-soft">{product.budget}</td>
                  <td className="px-4 py-4">
                    <a
                      href={affiliateHref(`asus-india-compare-${product.id}` as GoSource)}
                      rel={GO_REL}
                      target="_blank"
                      data-affiliate-click={`asus-india-compare-${product.id}`}
                      className="inline-flex min-h-10 items-center gap-1 rounded-lg bg-[#0D1117] px-3 py-2 text-xs font-bold text-white hover:bg-[#0891b2]"
                    >
                      Check Live Price →
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-10">
        <FaqSection eyebrow="ASUS India laptop FAQs" items={faqs} />
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1f2937] bg-[#0D1117]/95 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <span className="truncate text-xs font-medium text-[#e2e8f0]">ASUS Official India Store</span>
          <a
            href={MOBILE_HREF}
            rel={GO_REL}
            target="_blank"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#22d3ee] px-4 py-2 text-xs font-bold text-[#0D1117]"
          >
            Check Live Stock &amp; Bank Offers on ASUS India
          </a>
        </div>
      </div>
    </div>
  );
}
