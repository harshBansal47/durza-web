"use client";

import StoreHero from "@/components/StoreHero";
import TrustStats, { type TrustStatsProps } from "@/components/store/TrustStats";
import FaqSection, { type FaqItem } from "@/components/store/FaqSection";
import AffiliateDisclosure from "@/components/store/AffiliateDisclosure";
import LuxuryBrandShowcase from "@/components/store/LuxuryBrandShowcase";
import type { LuxurySlot } from "@/lib/luxury-images";

interface Props {
  storeName: string;
  tagline: string;
  storeSlug: string;
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
  faqs: FaqItem[];
  stats: TrustStatsProps;
  slots: LuxurySlot[];
  showcaseEyebrow?: string;
  showcaseLead?: string;
}

/** Tier 1 wrapper: hero + TrustStats + Showcase + affiliate disclosure + FAQs.
 *  No OfferCards, no CouponCodePanel, no promo banners — those belong to the brand. */
export default function LuxuryStoreClient({
  storeName,
  tagline,
  storeSlug,
  heroImageUrl,
  offerCount,
  storeUrl,
  faqs,
  stats,
  slots,
  showcaseEyebrow,
  showcaseLead,
}: Props) {
  const domain = storeUrl ? new URL(storeUrl).hostname.replace(/^www\./, "") : undefined;
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <StoreHero
        name={storeName}
        subtitle={tagline}
        domain={domain}
        heroImageUrl={heroImageUrl}
        offerCount={offerCount}
        ctaHref={`/go/${storeSlug}?src=store-page`}
        ctaLabel="Continue to official store"
        perks={[
          { label: "Affiliated partner", value: "Commission-supported link" },
          { label: "Origin", value: "Official India storefront" },
          { label: "Payment", value: "Prices & returns set by the store" },
        ]}
      />
      <TrustStats {...stats} />
      <AffiliateDisclosure />
      <LuxuryBrandShowcase
        storeSlug={storeSlug}
        storeName={storeName}
        slots={slots}
        eyebrow={showcaseEyebrow}
        lead={showcaseLead}
      />
      <FaqSection eyebrow={`${storeName} FAQs`} items={faqs} />
    </div>
  );
}
