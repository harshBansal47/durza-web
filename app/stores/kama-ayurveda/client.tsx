"use client";

import StoreGuidePage from "@/components/store/StoreGuidePage";
import type { TrustStatsProps } from "@/components/store/TrustStats";

interface Props {
  faqs: { question: string; answer: string }[];
  stats: TrustStatsProps;
  // Accepted for route parity; the shared template does not need these yet.
  heroImageUrl?: string | null;
  offerCount?: number | null;
  storeUrl?: string;
}

const ADVANTAGES = [{"title": "Authentic Ayurvedic formulations", "desc": "Shop directly for authentic Kama Ayurveda products and ranges as presented on the official store."}, {"title": "Consultation & guidance", "desc": "Kama Ayurveda offers consultation/guidance options on its site to help you choose suitable rituals \u2014 check availability on the official store."}, {"title": "Signature ranges & gifting", "desc": "Access core collections, travel formats and curated gift sets directly from the brand."}, {"title": "Samples & checkout benefits", "desc": "Complimentary samples or checkout benefits may be offered on qualifying orders \u2014 see live terms on kamaayurveda.in."}] as const;
const MATCHERS = [{"id": "glow", "label": "Glow & Radiance", "headline": "Nighttime nourishment and glow-focused rituals", "bullets": ["Cleanse gently and layer hydration before facial oils as suited to your skin", "Patch-test active or essential-oil rich products before regular use", "Check ingredients and usage directions on the product page"], "cta": "Explore radiance rituals \u2192", "src": "matcher-glow"}, {"id": "hair", "label": "Hair & Scalp Care", "headline": "Nourishing oils and cleansers for hair routines", "bullets": ["Choose pre-wash oils and cleansers suited to your scalp/hair needs", "Follow recommended application time and wash routine", "Review ingredients and suitability on the official listing"], "cta": "Explore hair care \u2192", "src": "matcher-hair"}, {"id": "balance", "label": "Balance & Hydration", "headline": "Toning, cleansing and daily skin balance", "bullets": ["Pick gentle cleansers and mists suited to your skin type", "Introduce new products one at a time and patch-test", "Confirm usage guidance and ingredients on Kama Ayurveda"], "cta": "Explore skin care \u2192", "src": "matcher-balance"}, {"id": "gifting", "label": "Gifting & Discovery", "headline": "Curated sets and discovery-friendly picks", "bullets": ["Choose pre-curated gift boxes for ready-to-present options", "Consider discovery/travel sizes when trying a new ritual", "Check contents and availability on the official store"], "cta": "Explore gifting \u2192", "src": "matcher-gifting"}] as const;
const LINEUP = [{"title": "Kumkumadi & Face Oils", "badge": "Face care", "copy": "Signature facial oils and serums \u2014 review ingredients and usage guidance.", "src": "lineup-kumkumadi"}, {"title": "Bringadi & Hair Care", "badge": "Hair care", "copy": "Hair oils and cleansers for scalp and hair rituals \u2014 check suitability.", "src": "lineup-hair"}, {"title": "Floral Waters & Mists", "badge": "Toning", "copy": "Pure mists and toning essentials \u2014 see ingredients and formats.", "src": "lineup-mists"}, {"title": "Cleansers & Ubtans", "badge": "Cleansing", "copy": "Gentle cleansers and masks for daily routines \u2014 review directions.", "src": "lineup-cleansers"}, {"title": "Body Care & Oils", "badge": "Body", "copy": "Body oils and care rituals \u2014 check textures and ingredients.", "src": "lineup-body"}, {"title": "Gift Boxes & Sets", "badge": "Gifting", "copy": "Curated Ayurvedic gift sets \u2014 view contents on the official store.", "src": "lineup-gifting"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  return (
    <StoreGuidePage
      slug="kama-ayurveda"
      name="Kama Ayurveda"
      headline="Kama Ayurveda Official Store — Ayurvedic Skin, Hair & Gifting"
      lead="Discover Kama Ayurveda rituals by concern, explore signature collections, and check live availability and details on the official store."
      matcherHeading="Find your Kama Ayurveda ritual"
      matcherDescription="Choose your concern to get a simple routine checklist, then explore the matching collection on the official store."
      lineupEyebrow="Signature collections"
      lineupTitle="Explore Kama Ayurveda collections"
      lineupDescription="Browse signature Ayurvedic collections and check live availability and details on the official store."
      faqNote="Skincare results and suitability vary by individual. Patch-test new products and refer to official product guidance; this page does not provide medical advice."
      mobileCtaLabel="Check live range & offers on Kama Ayurveda"
      advantages={ADVANTAGES}
      matchers={MATCHERS}
      lineup={LINEUP}
      faqs={faqs}
      stats={stats}
    />
  );
}
