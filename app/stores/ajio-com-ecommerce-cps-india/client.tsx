"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import StoreHero from "@/components/StoreHero";
import OfferCard from "@/components/OfferCard";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import { api } from "@/lib/api";
import { AJIO_SECTIONS } from "@/lib/ajio-sections";
import type { CouponPublic } from "@/lib/types";

const FALLBACK_URL = "https://www.ajio.com";

interface Props {
  offers: CouponPublic[];
  faqs: FaqItem[];
  stats: TrustStatsProps;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

export default function AjioClient({
  offers,
  faqs,
  stats,
  heroImageUrl,
  offerCount,
  storeUrl,
}: Props) {
  const domain = new URL(storeUrl ?? FALLBACK_URL).hostname.replace(/^www\./, "");
  const ctaHref = "/go/ajio-com-ecommerce-cps-india?src=store-page";

  const offersById = new Map(offers.map((o) => [o.id, o]));

  const sectioned = AJIO_SECTIONS.map((s) => ({
    ...s,
    items: s.ids.map((id) => offersById.get(id)).filter((o): o is CouponPublic => Boolean(o)),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 lg:pb-8">
      <StoreHero
        name="AJIO"
        heading="AJIO — every deal, in one place."
        subtitle="AJIO aggregates inventory from AJIO Luxe, AJIO Supr, AJIO.com, select partners and the official AJIO for Him/Her boutiques. The catalogue is large; so is the noise. This page surfaces the live, indexed AJIO offers — grouped so you can actually find what matters."
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={ctaHref}
        ctaLabel="Shop all AJIO offers"
        perks={[
          { label: "Deals live", value: `${offers.length} today` },
          { label: "Source", value: "ajio.com campaigns (Durza feeds them, daily)" },
          { label: "Affiliate", value: "Durza earns a referral from each" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />

      <nav aria-label="Jump to a category" className="mt-6 flex flex-wrap gap-2">
        {sectioned.filter((s) => s.items.length > 0).map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-ledger-line bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-inkblue hover:text-inkblue"
          >
            {s.name} ({s.items.length})
            <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        ))}
      </nav>

      <div className="mt-8 space-y-12">
        {sectioned.map((section) =>
          section.items.length === 0 ? null : (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <div className="mb-4">
                <p
                  aria-hidden="true"
                  className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-soft"
                >
                  AJIO · {section.id.replaceAll('-', ' ')}
                </p>
                <h2 id={`${section.id}-heading`} className="mt-1 font-serif text-2xl font-extrabold tracking-tight text-ink">
                  {section.name}
                </h2>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-ink-soft">{section.lead}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.items.map((o) => (
                  <OfferCard
                    key={o.id}
                    bookmarkId={o.id}
                    code={o.code}
                    title={o.title}
                    description={o.description ?? undefined}
                    ctaHref={api.goUrl(o.id, "store-page")}
                    expiresAt={o.expires_at}
                  />
                ))}
              </div>
            </section>
          ),
        )}
      </div>

      <FaqSection eyebrow="AJIO FAQs" items={faqs} />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] backdrop-blur lg:hidden">
        <a
          href={ctaHref}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl bg-ink px-4 py-3 text-white"
        >
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">AJIO · Everything</span>
            <span className="block truncate text-xs font-semibold">Browse all {offers.length} live AJIO offers</span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold">
            Shop
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </span>
        </a>
      </div>
    </div>
  );
}
