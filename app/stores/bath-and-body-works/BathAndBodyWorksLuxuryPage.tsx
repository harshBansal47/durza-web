"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Gift, PackageCheck, Sparkles } from "lucide-react";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import type { LuxurySlot } from "@/lib/luxury-images";

interface Props {
  storeUrl: string;
  faqs: FaqItem[];
  stats: TrustStatsProps;
  slots: LuxurySlot[];
}

const REL = "nofollow sponsored noopener noreferrer";
const STORE_HREF = "/go/bath-body-works?src=store-page";
const CARD_HREF = "/go/bath-body-works?src=luxury";
const MATCHER_HREF = "/go/bath-body-works?src=scent-matcher";
const MOBILE_HREF = "/go/bath-body-works?src=mobile-sticky";

type MoodId = "warm" | "fresh" | "cozy" | "festive";

const MOODS: {
  id: MoodId;
  label: string;
  tip: string;
  /** indexes into slots (0-based) to highlight */
  matches: number[];
}[] = [
  {
    id: "warm",
    label: "Warm & Vanilla",
    tip: "Layer a shea body cream with a glowing 3-wick candle for a warm, vanilla-kissed sillage that lasts all day.",
    matches: [1, 2, 4],
  },
  {
    id: "fresh",
    label: "Fresh & Floral",
    tip: "Pair a floral fine fragrance mist with a foaming botanical hand soap for an effortlessly fresh, petal-soft ritual.",
    matches: [0, 3, 4],
  },
  {
    id: "cozy",
    label: "Cozy Coffee & Woods",
    tip: "Light a gourmand 3-wick candle and follow with a comforting body wash for cozy, coffee-and-woods evenings at home.",
    matches: [1, 4, 2],
  },
  {
    id: "festive",
    label: "Festive & Wedding Gifting",
    tip: "Choose a curated gift box with a signature mist and candle — a ready-to-gift spa set for weddings, Diwali and celebrations.",
    matches: [5, 0, 1],
  },
];

export default function BathAndBodyWorksLuxuryPage({ storeUrl, faqs, stats, slots }: Props) {
  const [activeMood, setActiveMood] = useState<MoodId>("warm");
  const domain = (() => {
    try {
      return new URL(storeUrl).hostname.replace(/^www\./, "");
    } catch {
      return "bathandbodyworks.in";
    }
  })();
  const mood = MOODS.find((m) => m.id === activeMood) ?? MOODS[0];
  const highlighted = new Set(mood.matches);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 sm:py-12 md:pb-12">
      {/* Hero — warm apothecary */}
      <section className="overflow-hidden rounded-3xl border border-[#243246] bg-[#182232] shadow-sm">
        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <p className="font-serif text-[11px] font-medium uppercase tracking-[0.32em] text-[#d6b25e]">
            Bath &amp; Body Works India · Fragrance Boutique
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-light leading-[1.1] tracking-tight text-[#F8F4EE] sm:text-4xl md:text-5xl">
            Bath &amp; Body Works India — The Home Spa &amp; Fragrance Edit
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-[#e7dfcf] sm:text-lg">
            Iconic 3-wick soy-blend candles, fine fragrance mists, shea body creams, and ready-to-gift spa sets —
            curated for Indian homes and festive gifting.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={STORE_HREF}
              rel={REL}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-[#d6b25e] bg-[#d6b25e] px-6 py-3 font-serif text-sm font-medium tracking-wide text-[#182232] transition hover:bg-[#e3c676]"
            >
              Explore Official Fragrance Store →
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <span className="text-xs uppercase tracking-[0.2em] text-[#c7b896]">{domain}</span>
          </div>
        </div>
      </section>

      {/* Official Store Privileges */}
      <section aria-labelledby="bbw-privileges-heading" className="mt-8">
        <h2 id="bbw-privileges-heading" className="sr-only">
          Official Store Privileges
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          <li className="flex gap-3 rounded-2xl border border-[#e7dfcf] bg-[#F8F4EE] p-5">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#b8922e]" aria-hidden="true" strokeWidth={1.5} />
            <div>
              <p className="font-serif text-base font-medium text-[#182232]">Mix &amp; Match Rituals</p>
              <p className="mt-1 text-sm leading-6 text-[#4b5563]">
                Full-size mists, lotions &amp; 3-wick candles eligible for official site bundle tiers
              </p>
            </div>
          </li>
          <li className="flex gap-3 rounded-2xl border border-[#e7dfcf] bg-[#F8F4EE] p-5">
            <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#b8922e]" aria-hidden="true" strokeWidth={1.5} />
            <div>
              <p className="font-serif text-base font-medium text-[#182232]">Fresh India Stock</p>
              <p className="mt-1 text-sm leading-6 text-[#4b5563]">
                Direct dispatch from official bathandbodyworks.in warehouses (zero old-batch marketplace risk)
              </p>
            </div>
          </li>
          <li className="flex gap-3 rounded-2xl border border-[#e7dfcf] bg-[#F8F4EE] p-5">
            <Gift className="mt-0.5 h-5 w-5 shrink-0 text-[#b8922e]" aria-hidden="true" strokeWidth={1.5} />
            <div>
              <p className="font-serif text-base font-medium text-[#182232]">Ready-to-Gift Packaging</p>
              <p className="mt-1 text-sm leading-6 text-[#4b5563]">
                Cellophane-wrapped gift sets &amp; festive hampers delivered pan-India
              </p>
            </div>
          </li>
        </ul>
      </section>

      <TrustStats {...stats} />
      <AffiliateDisclosure />

      {/* Scent matcher */}
      <section
        aria-labelledby="bbw-scent-heading"
        className="mt-10 rounded-3xl border border-[#e7dfcf] bg-[#F8F4EE] p-5 sm:p-7"
      >
        <p className="font-serif text-[11px] font-medium uppercase tracking-[0.28em] text-[#8a6d1d]">
          Find Your Signature Scent
        </p>
        <h2 id="bbw-scent-heading" className="mt-2 font-serif text-2xl font-light tracking-tight text-[#182232]">
          Choose a mood, discover your ritual
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {MOODS.map((m) => {
            const active = m.id === activeMood;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveMood(m.id)}
                aria-pressed={active}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
                  active
                    ? "border-[#182232] bg-[#182232] text-[#F8F4EE]"
                    : "border-[#d8ccb4] bg-white text-[#182232] hover:border-[#182232]"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-2xl border border-[#e7dfcf] bg-white p-5">
          <p className="font-serif text-[15px] leading-7 text-[#374151]">
            <span className="font-medium text-[#182232]">Pairing tip:</span> {mood.tip}
          </p>
          <a
            href={MATCHER_HREF}
            rel={REL}
            target="_blank"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#182232] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#F8F4EE] transition hover:bg-[#243246]"
          >
            Shop this mood on the official store
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>
      </section>

      {/* Curated grid */}
      <section aria-labelledby="bbw-edit-heading" className="mt-10 rounded-3xl bg-[#F8F4EE] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <header className="mb-10 md:mb-14">
            <p className="font-serif text-[11px] font-medium uppercase tracking-[0.32em] text-[#8a6d1d]">
              The Home Spa Edit
            </p>
            <h2
              id="bbw-edit-heading"
              className="mt-3 max-w-2xl font-serif text-3xl font-light leading-[1.1] tracking-tight text-[#182232] sm:text-4xl"
            >
              Curated for Indian homes &amp; festive gifting
            </h2>
          </header>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {slots.map((slot, idx) => {
              const isMatch = highlighted.has(idx);
              return (
                <li key={slot.collection} className="min-h-0">
                  <article
                    className={`group flex h-full flex-col overflow-hidden border bg-white transition-all hover:shadow-[0_10px_40px_rgba(24,34,50,0.12)] ${
                      isMatch ? "border-[#d6b25e] ring-1 ring-[#d6b25e]/40" : "border-[#e7dfcf]"
                    }`}
                  >
                    <a
                      href={CARD_HREF}
                      rel={REL}
                      target="_blank"
                      className="relative block aspect-[4/5] w-full overflow-hidden bg-[#efe8dc]"
                      aria-label={`Shop ${slot.collection} on official store`}
                    >
                      {slot.image ? (
                        <Image
                          src={slot.image}
                          alt={slot.alt ?? slot.collection}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center font-serif text-sm text-[#6b7280]">
                          {slot.collection}
                        </span>
                      )}
                      {slot.kicker && (
                        <span className="absolute left-4 top-4 border border-white/40 bg-[#182232]/75 px-3 py-1 font-serif text-[10px] uppercase tracking-[0.22em] text-[#f3e7c3] backdrop-blur-sm">
                          {slot.kicker}
                        </span>
                      )}
                    </a>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h3 className="font-serif text-lg leading-snug text-[#182232]">{slot.collection}</h3>
                      <p className="text-[13px] leading-6 text-[#4b5563]">{slot.styling}</p>
                      <a
                        href={CARD_HREF}
                        rel={REL}
                        target="_blank"
                        className="mt-auto inline-flex items-center gap-1.5 border border-[#182232] px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#182232] transition-colors hover:bg-[#182232] hover:text-[#F8F4EE]"
                      >
                        Shop Collection on Official Store →
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </a>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FaqSection eyebrow="Bath & Body Works India FAQs" items={faqs} />

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#243246] bg-[#182232]/92 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <span className="truncate font-serif text-sm text-[#F8F4EE]">Bath &amp; Body Works India</span>
          <a
            href={MOBILE_HREF}
            rel={REL}
            target="_blank"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#d6b25e] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#182232]"
          >
            Shop Official Store →
          </a>
        </div>
      </div>
    </div>
  );
}
