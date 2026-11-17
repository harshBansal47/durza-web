"use client";

import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
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

const AFFILIATE_REL = "nofollow sponsored noopener noreferrer";

export default function AldoShoesLuxuryPage({ storeUrl, faqs, stats, slots }: Props) {
  const domain = (() => {
    try {
      return new URL(storeUrl).hostname.replace(/^www\./, "");
    } catch {
      return "aldoshoes.in";
    }
  })();

  const heroHref = "/go/aldo-new?src=store-page";
  const cardHref = "/go/aldo-new?src=luxury";
  const privilegeHref = "/go/aldo-new?src=privilege-banner";
  const mobileHref = "/go/aldo-new?src=mobile-sticky";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 sm:py-12 md:pb-12">
      {/* Hero — dark obsidian & warm champagne */}
      <section className="overflow-hidden rounded-3xl border border-[#2a241a] bg-[#111111] shadow-sm">
        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <p className="font-serif text-[11px] font-medium uppercase tracking-[0.32em] text-[#E5C99B]">
            ALDO India · Curated Lookbook
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-light leading-[1.1] tracking-tight text-[#FAF9F6] sm:text-4xl md:text-5xl">
            ALDO — The Architectural Footwear &amp; Bag Edit
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-base leading-7 text-[#d9d2c2] sm:text-lg">
            A quiet edit of sculpted heels, boardroom loafers, butter-soft sandals and structured bags — considered pieces
            for the modern India wardrobe, presented without bargain noise.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={heroHref}
              rel={AFFILIATE_REL}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5C99B] bg-[#E5C99B] px-6 py-3 font-serif text-sm font-medium tracking-wide text-[#111111] transition hover:bg-[#d8b97f]"
            >
              Enter Official ALDO Boutique →
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <span className="text-xs uppercase tracking-[0.2em] text-[#b9a784]">{domain}</span>
          </div>
        </div>
      </section>

      <TrustStats {...stats} />
      <AffiliateDisclosure />

      {/* Curated Lookbook grid */}
      <section aria-labelledby="aldo-edit-heading" className="mt-10 rounded-3xl bg-[#FAF9F6] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <header className="mb-10 md:mb-14">
            <p className="font-serif text-[11px] font-medium uppercase tracking-[0.32em] text-[#8b7355]">
              The 2026 Curated Edit
            </p>
            <h2
              id="aldo-edit-heading"
              className="mt-3 max-w-2xl font-serif text-3xl font-light leading-[1.1] tracking-tight text-slate-900 sm:text-4xl"
            >
              Six considered signatures
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-600">
              Sculpted forms, tactile leathers and quiet hardware — an editorial selection from the official ALDO India
              collection.
            </p>
          </header>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {slots.map((slot) => (
              <li key={slot.collection} className="min-h-0">
                <article className="group flex h-full flex-col overflow-hidden border border-stone-200 bg-white transition-shadow hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                  <a
                    href={cardHref}
                    rel={AFFILIATE_REL}
                    target="_blank"
                    className="relative block aspect-[4/5] w-full overflow-hidden bg-stone-100"
                    aria-label={`Acquire ${slot.collection} via official ALDO store`}
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
                      <span className="flex h-full w-full items-center justify-center bg-stone-100 font-serif text-sm text-stone-500">
                        {slot.collection}
                      </span>
                    )}
                    {slot.kicker && (
                      <span className="absolute left-4 top-4 border border-white/40 bg-[#111111]/75 px-3 py-1 font-serif text-[10px] uppercase tracking-[0.22em] text-[#E5C99B] backdrop-blur-sm">
                        {slot.kicker}
                      </span>
                    )}
                  </a>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="font-serif text-lg leading-snug text-slate-900">{slot.collection}</h3>
                    <p className="text-[13px] leading-6 text-slate-600">{slot.styling}</p>
                    <a
                      href={cardHref}
                      rel={AFFILIATE_REL}
                      target="_blank"
                      className="mt-auto inline-flex items-center gap-1.5 border border-[#111111] px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#111111] transition-colors hover:bg-[#111111] hover:text-[#E5C99B]"
                    >
                      Acquire via Official Store →
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Private Privilege Callout */}
      <section
        aria-labelledby="aldo-privilege-heading"
        className="mt-10 overflow-hidden rounded-3xl border border-[#2a241a] bg-[#111111] px-6 py-10 sm:px-10"
      >
        <p className="font-serif text-[11px] font-medium uppercase tracking-[0.32em] text-[#E5C99B]">
          Private Privilege
        </p>
        <h2
          id="aldo-privilege-heading"
          className="mt-3 font-serif text-2xl font-light tracking-tight text-[#FAF9F6] sm:text-3xl"
        >
          The Direct Boutique Advantage
        </h2>
        <ul className="mt-6 grid gap-4 text-sm leading-7 text-[#d9d2c2] sm:grid-cols-3">
          <li className="flex gap-3">
            <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#E5C99B]" strokeWidth={1.5} />
            <span>
              <strong className="font-medium text-[#FAF9F6]">Full EU size runs</strong> (35–42 Women / 6–12 Men), often
              sold out on marketplaces.
            </span>
          </li>
          <li className="flex gap-3">
            <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#E5C99B]" strokeWidth={1.5} />
            <span>
              <strong className="font-medium text-[#FAF9F6]">Official ALDO gift packaging</strong> &amp; dust bags with
              every qualifying order.
            </span>
          </li>
          <li className="flex gap-3">
            <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#E5C99B]" strokeWidth={1.5} />
            <span>
              <strong className="font-medium text-[#FAF9F6]">Direct access</strong> to seasonal VIP previews at the
              official boutique.
            </span>
          </li>
        </ul>
        <a
          href={privilegeHref}
          rel={AFFILIATE_REL}
          target="_blank"
          className="mt-8 inline-flex items-center gap-2 border border-[#E5C99B] px-5 py-3 font-serif text-sm tracking-wide text-[#E5C99B] transition hover:bg-[#E5C99B] hover:text-[#111111]"
        >
          Shop the Official Boutique
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
        </a>
      </section>

      <FaqSection eyebrow="ALDO India FAQs" items={faqs} />

      {/* Mobile sticky bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#2a241a] bg-[#111111]/90 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <span className="truncate font-serif text-sm text-[#FAF9F6]">ALDO India Official Store</span>
          <a
            href={mobileHref}
            rel={AFFILIATE_REL}
            target="_blank"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#E5C99B] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#111111]"
          >
            Shop New Arrivals →
          </a>
        </div>
      </div>
    </div>
  );
}
