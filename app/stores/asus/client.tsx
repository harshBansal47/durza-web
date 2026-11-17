"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  Gamepad2,
  Laptop,
  MapPin,
  Palette,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import { GO_REL, storeGoHref, type GoSource } from "@/lib/go";
import { ASUS_COMPARISONS, ASUS_MATCHES, ASUS_MATCHER_ORDER, type AsusMatchId } from "./content";

interface Props {
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

const CASE_ICONS: Record<AsusMatchId, LucideIcon> = {
  student: Laptop,
  gaming: Gamepad2,
  creative: Sparkles,
  business: Briefcase,
};

const HIGHLIGHTS: { icon: LucideIcon; title: string; detail: string }[] = [
  {
    icon: Palette,
    title: "Check the exact display",
    detail: "OLED, resolution, refresh rate and colour validation vary by model number.",
  },
  {
    icon: ShieldCheck,
    title: "Verify durability claims",
    detail: "Look for MIL-STD-810H details on the specific TUF model, not just the series name.",
  },
  {
    icon: MapPin,
    title: "Check local support",
    detail: "Look up an authorised service centre for your PIN code and read the warranty terms.",
  },
  {
    icon: Laptop,
    title: "Compare the full SKU",
    detail: "CPU, GPU, memory, ports and upgrade options can differ within one laptop family.",
  },
];

function affiliateHref(placement: GoSource): string {
  return storeGoHref("asus", placement);
}

export default function AsusClient({ faqs, stats, heroImageUrl, offerCount, storeUrl }: Props) {
  const [active, setActive] = useState<AsusMatchId>("gaming");
  const domain = new URL(storeUrl ?? "https://asus.com/in/").hostname.replace(/^www\./, "");
  const match = ASUS_MATCHES[active];
  const ActiveIcon = CASE_ICONS[active];
  const status =
    offerCount === 0
      ? "Durza currently lists no ASUS product or coupon offers. Check ASUS India for current models, prices and stock."
      : "This is a buying guide, not a live ASUS catalogue. Confirm current models, prices and stock on ASUS India.";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 sm:px-6 sm:py-12 md:pb-8">
      <StoreHero
        name="ASUS"
        heading="ASUS India laptop buying guide"
        subtitle="Compare ROG, TUF, Zenbook and Vivobook by what you need from a laptop. Use the matcher as a starting point, then verify the exact SKU."
        domain={domain}
        heroImageUrl={heroImageUrl}
        ctaHref={affiliateHref("asus-india-guide-hero")}
        ctaLabel="Shop ASUS India"
        ctaTrackingId="asus-india-guide-hero"
        showStatus={false}
        perks={[
          { label: "Gaming", value: "ROG · TUF" },
          { label: "Creative", value: "Zenbook" },
          { label: "Study", value: "Vivobook" },
        ]}
      />
      <div className="mt-4">
        <TrustStats {...stats} />
      </div>
      <div
        role="status"
        className="mt-4 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
      >
        <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
        <p>{status}</p>
      </div>
      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      <section
        aria-labelledby="asus-matcher-heading"
        className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
          ASUS matcher
        </p>
        <h2 id="asus-matcher-heading" className="mt-1 font-serif text-2xl font-extrabold text-ink">
          Which ASUS laptop family fits your needs?
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
          The rupee ranges below are planning budgets, not live ASUS prices. Model availability and
          specifications change; compare the exact model number and checkout price before buying.
        </p>
        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Choose a laptop use case">
          {ASUS_MATCHER_ORDER.map((id) => {
            const Icon = CASE_ICONS[id];
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
                  if (event.key === "ArrowRight") {
                    nextIndex = (currentIndex + 1) % ASUS_MATCHER_ORDER.length;
                  } else if (event.key === "ArrowLeft") {
                    nextIndex = (currentIndex - 1 + ASUS_MATCHER_ORDER.length) % ASUS_MATCHER_ORDER.length;
                  } else if (event.key === "Home") {
                    nextIndex = 0;
                  } else if (event.key === "End") {
                    nextIndex = ASUS_MATCHER_ORDER.length - 1;
                  }
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
                    ? "border-inkblue bg-ink text-white"
                    : "border-ledger-line bg-white text-ink hover:border-inkblue"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <ActiveIcon className="mt-1 h-5 w-5 shrink-0 text-inkblue" aria-hidden="true" />
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
                  {match.label}
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-ink">{match.headline}</h3>
              </div>
            </div>
            <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-200">
              {match.badge}
            </span>
          </div>
          <p className="mt-4 text-sm leading-7 text-ink-soft">
            <strong className="text-ink">Spec to look for:</strong> {match.spec}
          </p>
          <p className="mt-2 text-sm leading-7 text-ink-soft">
            <strong className="text-ink">Indicative price range:</strong> {match.budget}
          </p>
          <p className="mt-3 border-l-2 border-inkblue/40 pl-3 text-[13px] leading-6 text-ink-soft">
            <strong className="text-ink">Trade-off:</strong> {match.tradeOff}
          </p>
          <a
            href={affiliateHref(`asus-india-matcher-${active}`)}
            rel={GO_REL}
            target="_blank"
            data-affiliate-click={`asus-india-matcher-${active}`}
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-inkblue"
          >
            See this on ASUS India
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      <section aria-labelledby="asus-comparison-heading" className="mt-8">
        <div className="mb-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
            Quick comparison
          </p>
          <h2 id="asus-comparison-heading" className="mt-1 font-serif text-2xl font-bold text-ink">
            ASUS laptop families at a glance
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            These are comparison examples, not confirmation that each named model is currently sold.
            Budgets are indicative only; verify availability and the full specification on ASUS India.
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
                <th scope="col" className="px-4 py-3 font-semibold">CPU / GPU checks</th>
                <th scope="col" className="px-4 py-3 font-semibold">Buyer budget</th>
                <th scope="col" className="px-4 py-3 font-semibold">Next step</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ASUS_COMPARISONS.map((product) => {
                return (
                  <tr key={product.name} className="align-top">
                    <th scope="row" className="px-4 py-4 font-semibold text-ink">
                      ASUS {product.name}
                    </th>
                    <td className="px-4 py-4 text-ink-soft">{product.bestFor}</td>
                    <td className="max-w-xs px-4 py-4 leading-6 text-ink-soft">{product.keySpec}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-ink-soft">{product.budget}</td>
                    <td className="px-4 py-4">
                      <a
                        href={affiliateHref(`asus-india-compare-${product.id}`)}
                        rel={GO_REL}
                        target="_blank"
                        data-affiliate-click={`asus-india-compare-${product.id}`}
                        className="inline-flex min-h-10 items-center gap-1 rounded-lg bg-ink px-3 py-2 text-xs font-bold text-white hover:bg-inkblue"
                      >
                        Check on ASUS
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="asus-highlights-heading"
        className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-inkblue">
          Before you buy
        </p>
        <h2 id="asus-highlights-heading" className="mt-1 font-serif text-2xl font-bold text-ink">
          ASUS India in short
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map(({ icon: Icon, title, detail }) => (
            <li key={title} className="flex gap-3 rounded-xl bg-slate-50 p-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-inkblue" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <FaqSection eyebrow="ASUS India laptop FAQs" items={faqs} />
      </div>

      <section className="mt-8 rounded-2xl bg-slate-900 p-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-7">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-300">
            Smart buying guide
          </p>
          <h2 className="mt-2 font-serif text-xl font-bold">Compare the configuration, not just the badge.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Confirm the full model number, warranty, current stock and final checkout price before you buy.
          </p>
        </div>
        <a
          href={affiliateHref("asus-india-guide-final")}
          rel={GO_REL}
          target="_blank"
          data-affiliate-click="asus-india-guide-final"
          className="mt-4 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink hover:bg-slate-100 sm:mt-0"
        >
          Check ASUS India
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p className="min-w-0 text-xs leading-5 text-slate-600">
            Current price and stock on ASUS India
          </p>
          <a
            href={affiliateHref("asus-india-guide-mobile")}
            rel={GO_REL}
            target="_blank"
            data-affiliate-click="asus-india-guide-mobile"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-xs font-bold text-white"
          >
            Check price
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
