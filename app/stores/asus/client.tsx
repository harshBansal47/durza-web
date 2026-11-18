"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  BadgePercent,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
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

export default function AsusClient({ faqs, stats, storeUrl }: Props) {
  const [active, setActive] = useState<AsusMatchId>("gaming");
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
