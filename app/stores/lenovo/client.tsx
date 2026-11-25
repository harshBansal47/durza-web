"use client";

import { useState } from "react";
import VerifiedListingsTable from "@/components/editorial/VerifiedListingsTable";
import VerifiedResearchPanel from "@/components/editorial/VerifiedResearchPanel";
import Image from "next/image";
import { ArrowUpRight, BadgePercent, Cpu, ShieldCheck } from "lucide-react";
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
const STORE_HREF = "/go/lenovo-india?src=store-page";
const MATCHER_HREF = "/go/lenovo-india?src=matcher";
const STACKING_HREF = "/go/lenovo-india?src=stacking-box";
const MOBILE_HREF = "/go/lenovo-india?src=mobile-sticky";

type Tab = "college" | "gaming" | "founders" | "design";

const TABS: Record<
  Tab,
  { label: string; headline: string; spec: string; price: string; note: string }
> = {
  college: {
    label: "College & Coding (IdeaPad Slim 5)",
    headline: "IdeaPad Slim 5 — dependable for college and coding",
    spec: "16GB RAM / 512GB SSD / Ryzen 7 or Core Ultra 5",
    price: "Check live price on Lenovo India",
    note: "A balanced everyday build for lectures, development, multitasking and long study sessions with efficient performance.",
  },
  gaming: {
    label: "Heavy Gaming (Legion / LOQ)",
    headline: "Legion & LOQ — high-FPS power, your way",
    spec: "RTX 4060/4070 / 165Hz+ Display / Custom CTO",
    price: "Check live price on Lenovo India",
    note: "Dial in GPU, memory and storage with Custom-To-Order options for competitive play and demanding AAA titles.",
  },
  founders: {
    label: "Founders & Linux Devs (ThinkPad)",
    headline: "ThinkPad — built for founders and Linux developers",
    spec: "X1 Carbon / T14 / Ubuntu-certified / 3-Yr Premier Support",
    price: "Check live price on Lenovo India",
    note: "Legendary keyboards, dependable build quality, and enterprise-ready support for engineering and leadership workflows.",
  },
  design: {
    label: "Design & Touch (Yoga OLED)",
    headline: "Yoga OLED — vivid 2-in-1 creativity",
    spec: "2.8K OLED / 100% DCI-P3 / 2-in-1 Pen",
    price: "Check live price on Lenovo India",
    note: "Color-accurate OLED touch with pen support and flexible 360° modes for design, illustration and presentations.",
  },
};

const TAB_ORDER: Tab[] = ["college", "gaming", "founders", "design"];

const LINEUP = [
  {
    slug: "legion-pro-slim",
    title: "Legion Pro & Slim Gaming",
    badge: "Flagship RTX",
    copy: "ColdFront vapor-chamber cooling, NVIDIA RTX 40/50-series high-TGP GPUs, and 240Hz PureSight gaming displays built for competitive FPS.",
    image: "public/stores/lenovo/legion-pro-slim.webp",
    alt: "Lenovo Legion flagship gaming laptop",
  },
  {
    slug: "thinkpad-x1-t-series",
    title: "ThinkPad X1 Carbon & T-Series",
    badge: "Executive & Dev",
    copy: "MIL-STD-810H carbon-fiber chassis, legendary tactile keyboards, Linux-ready firmware, and Intel vPro reliability for founders & engineers.",
    image: "public/stores/lenovo/thinkpad-x1.webp",
    alt: "Lenovo ThinkPad business laptop on a desk",
  },
  {
    slug: "loq-gaming",
    title: "LOQ Gaming Series",
    badge: "High-FPS Value",
    copy: "Lenovo's highest-value RTX gaming lineup with AI Engine+ thermal tuning, MUX switches, and custom CTO RAM/SSD upgrades on Lenovo.com.",
    image: "public/stores/lenovo/loq-gaming.webp",
    alt: "Lenovo LOQ gaming laptop",
  },
  {
    slug: "yoga-pro-oled",
    title: "Yoga Pro & 2-in-1 OLED",
    badge: "Creators & Touch",
    copy: "360-degree convertible touchscreens with Lenovo Digital Pen support, Dolby Vision OLED panels, and ultra-slim aluminum unibodies.",
    image: "public/stores/lenovo/yoga-oled.webp",
    alt: "Lenovo Yoga OLED convertible laptop",
  },
  {
    slug: "ideapad-slim",
    title: "IdeaPad Slim 5 & Pro",
    badge: "Students & Daily",
    copy: "All-day battery life, 16GB LPDDR5X memory options, and lightweight metal builds engineered for college lectures, coding, and hybrid work.",
    image: "public/stores/lenovo/ideapad-slim.webp",
    alt: "Lenovo IdeaPad Slim laptop for students and daily work",
  },
  {
    slug: "legion-go-thinkvision",
    title: "Legion Go Handheld & ThinkVision Monitors",
    badge: "Console & Desk",
    copy: "Detachable TrueStrike controllers with 8.8-inch QHD+ 144Hz gaming display, alongside color-accurate USB-C monitors for dual-screen setups.",
    image: "public/stores/lenovo/legion-go-thinkvision.webp",
    alt: "Lenovo Legion Go handheld and ThinkVision monitor setup",
  },
];

export default function LenovoClient({ faqs, stats, storeUrl }: Props) {
  const [active, setActive] = useState<Tab>("college");
  const tab = TABS[active];
  const domain = (() => {
    try {
      return storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : "lenovo.com/in/en";
    } catch {
      return "lenovo.com/in/en";
    }
  })();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 sm:px-6 sm:py-12 md:pb-8">
      {/* Hero — carbon black & crimson */}
      <section className="overflow-hidden rounded-3xl border border-[#252a33] bg-[#0E1013] shadow-sm">
        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E2231A]">
            Lenovo India · Official eStore
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-[1.1] tracking-tight text-[#F5F5F5] sm:text-4xl md:text-5xl">
            Lenovo India Official Store — Legion, ThinkPad &amp; Yoga Lineup
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#d1d5db] sm:text-lg">
            Configure custom-to-order ThinkPads, RTX Legion gaming rigs, and OLED Yoga ultrabooks—and stack official
            Lenovo.com student/corporate privileges, eligible card offers, and warranty/protection options shown at checkout.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={STORE_HREF}
              rel={REL}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-md bg-[#E2231A] px-6 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-[#c61d16]"
            >
              Configure &amp; Check Live Price on Lenovo.com →
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </a>
            <span className="text-xs uppercase tracking-[0.2em] text-[#9ca3af]">{domain}</span>
          </div>

          {/* Why Buy Direct */}
          <div className="mt-10 border-t border-[#252a33] pt-8">
            <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9ca3af]">
              Why Buy Direct on Lenovo.com India
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-[#2b313c] bg-[#141820] p-4">
                <div className="flex items-center gap-2 text-[#E2231A]">
                  <Cpu className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                  <p className="text-sm font-semibold text-[#F5F5F5]">Custom-To-Order (CTO)</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#9ca3af]">
                  Upgrade RAM, OLED panels &amp; RTX GPUs directly from the factory (not sold on Amazon/Flipkart)
                </p>
              </div>
              <div className="rounded-xl border border-[#2b313c] bg-[#141820] p-4">
                <div className="flex items-center gap-2 text-[#E2231A]">
                  <BadgePercent className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                  <p className="text-sm font-semibold text-[#F5F5F5]">Stackable Savings</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#9ca3af]">
                  Combine eligible MyLenovo Rewards, student/corporate verification, and card offers shown at checkout
                </p>
              </div>
              <div className="rounded-xl border border-[#2b313c] bg-[#141820] p-4">
                <div className="flex items-center gap-2 text-[#E2231A]">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
                  <p className="text-sm font-semibold text-[#F5F5F5]">Warranty &amp; ADP options</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#9ca3af]">
                  Unlock 3-Year Premium Care + Accidental Damage Protection at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStats {...stats} />
      <div className="mt-6"><VerifiedResearchPanel kind="lenovo" />
        <VerifiedListingsTable store="lenovo" /></div>
      <AffiliateDisclosure />

      {/* Flagship Lineup */}
      <section aria-labelledby="lenovo-lineup-heading" className="mt-10">
        <div className="mb-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#E2231A]">2026 lineup</p>
          <h2 id="lenovo-lineup-heading" className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Explore the 2026 Lenovo India Lineup
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-soft">
            Legion power, ThinkPad reliability, Yoga flexibility and IdeaPad value — configure the right build on the
            official Lenovo India eStore.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {LINEUP.map((item) => (
            <li key={item.slug} className="min-h-0">
              <a
                href={`/go/lenovo-india?src=lineup-${item.slug}`}
                rel={REL}
                target="_blank"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-[0_12px_40px_rgba(14,16,19,0.12)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-[#0E1013]/85 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff6b63] backdrop-blur-sm">
                    {item.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-ink-soft">{item.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#E2231A]">
                    Configure on Lenovo.com <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Lenovo Matcher */}
      <section
        aria-labelledby="lenovo-matcher-heading"
        className="mt-10 rounded-2xl border border-ledger-line bg-white p-5 sm:p-7"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#E2231A]">Lenovo matcher</p>
        <h2 id="lenovo-matcher-heading" className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
          Which Lenovo should you build in 2026?
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
          Choose a use case to see recommended specs, an indicative rupee range, and build the right configuration on
          Lenovo.com India.
        </p>
        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Choose a laptop use case">
          {TAB_ORDER.map((id) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                id={`lenovo-tab-${id}`}
                type="button"
                role="tab"
                onClick={() => setActive(id)}
                onKeyDown={(event) => {
                  const idx = TAB_ORDER.indexOf(id);
                  let next: number | null = null;
                  if (event.key === "ArrowRight") next = (idx + 1) % TAB_ORDER.length;
                  else if (event.key === "ArrowLeft") next = (idx - 1 + TAB_ORDER.length) % TAB_ORDER.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = TAB_ORDER.length - 1;
                  if (next === null) return;
                  event.preventDefault();
                  const nid = TAB_ORDER[next];
                  setActive(nid);
                  document.getElementById(`lenovo-tab-${nid}`)?.focus();
                }}
                aria-selected={isActive}
                aria-controls="lenovo-match-panel"
                tabIndex={isActive ? 0 : -1}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-[#0E1013] bg-[#0E1013] text-white"
                    : "border-ledger-line bg-white text-ink hover:border-[#E2231A]"
                }`}
              >
                {TABS[id].label}
              </button>
            );
          })}
        </div>
        <div
          id="lenovo-match-panel"
          role="tabpanel"
          aria-labelledby={`lenovo-tab-${active}`}
          className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
        >
          <h3 className="text-xl font-bold text-ink">{tab.headline}</h3>
          <p className="mt-3 text-sm leading-7 text-ink-soft">
            <strong className="text-ink">Recommended spec:</strong> {tab.spec}
          </p>
          <p className="mt-1 text-sm leading-7 text-ink-soft">
            <strong className="text-ink">Indicative range:</strong> {tab.price}
          </p>
          <p className="mt-3 border-l-2 border-[#E2231A]/40 pl-3 text-[13px] leading-6 text-ink-soft">{tab.note}</p>
          <a
            href={MATCHER_HREF}
            rel={REL}
            target="_blank"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#0E1013] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#E2231A]"
          >
            Build &amp; Price This Model on Lenovo.com →
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </section>

      {/* Stacking Checklist */}
      <section
        aria-labelledby="lenovo-stacking-heading"
        className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#E2231A]">Maximize value</p>
        <h2 id="lenovo-stacking-heading" className="mt-1 text-2xl font-bold tracking-tight text-ink">
          Official Lenovo.com Checkout Stacking Checklist
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
          Stack official privileges directly on lenovo.com/in to get the best-configured price and protection.
        </p>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="font-mono text-xs font-bold text-[#E2231A]">Step 1</p>
            <p className="mt-1 font-semibold text-ink">Build Your PC</p>
            <p className="mt-1 text-sm leading-6 text-ink-soft">
              Select exact RAM, SSD, display and GPU specs with Custom-To-Order (CTO).
            </p>
          </li>
          <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="font-mono text-xs font-bold text-[#E2231A]">Step 2</p>
            <p className="mt-1 font-semibold text-ink">See current offers</p>
            <p className="mt-1 text-sm leading-6 text-ink-soft">
              Add SheerID Student/Corporate verification or redeem MyLenovo Rewards at checkout.
            </p>
          </li>
          <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="font-mono text-xs font-bold text-[#E2231A]">Step 3</p>
            <p className="mt-1 font-semibold text-ink">Protect &amp; pay smart</p>
            <p className="mt-1 text-sm leading-6 text-ink-soft">
              Review warranty/protection options and apply eligible card offers at checkout.
            </p>
          </li>
        </ol>
        <a
          href={STACKING_HREF}
          rel={REL}
          target="_blank"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#0E1013] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#E2231A]"
        >
          Start stacking on Lenovo.com →
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </a>
      </section>

      <FaqSection eyebrow="Lenovo India FAQs" items={faqs} />

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#252a33] bg-[#0E1013]/95 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <span className="truncate text-sm font-medium text-[#F5F5F5]">Lenovo India Official eStore</span>
          <a
            href={MOBILE_HREF}
            rel={REL}
            target="_blank"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#E2231A] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white"
          >
            Check Live Deals →
          </a>
        </div>
      </div>
    </div>
  );
}
