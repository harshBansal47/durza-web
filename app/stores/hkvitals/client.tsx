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

const ADVANTAGES = [{"title": "HealthKart-backed brand", "desc": "HK Vitals is part of the HealthKart ecosystem, offering targeted nutraceutical ranges \u2014 review brand and product details on hkvitals.com."}, {"title": "Targeted formulations", "desc": "Products are organized by concerns like skin, hair, immunity and daily nutrition with clear ingredient information on listings."}, {"title": "Combo & multi-pack options", "desc": "Multi-pack and combo options are commonly available for consistent routines \u2014 compare pack sizes and value on the official store."}, {"title": "Clear labeling & dietary markers", "desc": "Check vegetarian/non-vegetarian markers, ingredients and usage directions on each product page before buying."}] as const;
const MATCHERS = [{"id": "skin", "label": "Skin & Glow", "headline": "Nutrition support for skin routines", "bullets": ["Check key ingredients (e.g. collagen/vitamins) and dietary markers", "Look for pack durations suited to consistent use", "Follow label directions and consult a professional if needed"], "cta": "Explore skin supplements \u2192", "src": "matcher-skin"}, {"id": "hair", "label": "Hair & Nails", "headline": "Support for hair and nail nutrition", "bullets": ["Review biotin/mineral blends and suitability for your diet", "Choose formats (tablet/gummy) that fit your routine", "Check allergens and usage guidance on the listing"], "cta": "Explore hair supplements \u2192", "src": "matcher-hair"}, {"id": "daily", "label": "Daily Multivitamins", "headline": "Everyday micronutrient support", "bullets": ["Pick formulations appropriate for your age/gender and needs", "Check dosage and avoid unnecessary overlap with other supplements", "Review ingredient forms and dietary markers"], "cta": "Explore multivitamins \u2192", "src": "matcher-daily"}, {"id": "joints", "label": "Joints, Heart & Immunity", "headline": "Omega-3 and targeted wellness support", "bullets": ["Check EPA/DHA or active ingredient amounts as listed", "Choose formats and serving sizes you can take consistently", "Confirm suitability and consult a professional when appropriate"], "cta": "Explore wellness supplements \u2192", "src": "matcher-wellness"}] as const;
const LINEUP = [{"title": "Collagen & Skin Care", "badge": "Skin", "copy": "Collagen and skin-nutrition products \u2014 review ingredients and pack sizes.", "src": "lineup-collagen"}, {"title": "Biotin & Hair Care", "badge": "Hair", "copy": "Hair-focused supplements \u2014 check biotin blends and dietary markers.", "src": "lineup-hair"}, {"title": "Skin Radiance", "badge": "Glow", "copy": "Antioxidant and radiance-focused options \u2014 review composition and usage.", "src": "lineup-radiance"}, {"title": "Daily Multivitamins", "badge": "Daily", "copy": "Multivitamins for everyday needs \u2014 compare formulations and dosage.", "src": "lineup-multivitamins"}, {"title": "Omega-3 & Fish Oil", "badge": "Wellness", "copy": "Omega-3 supplements \u2014 check EPA/DHA amounts and format.", "src": "lineup-omega3"}, {"title": "Gut & Metabolism", "badge": "Routine", "copy": "ACV and routine-support products \u2014 review ingredients and directions.", "src": "lineup-gut"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  return (
    <StoreGuidePage
      slug="hkvitals"
      name="HK Vitals"
      headline="HK Vitals Official Store — Skin, Hair & Daily Wellness Supplements"
      lead="Choose HK Vitals supplements by concern, review ingredients and dietary markers, and check live packs and pricing on the official store."
      matcherHeading="Choose by your concern"
      matcherDescription="Select a concern for a quick checklist, then explore the matching HK Vitals range on the official store."
      lineupEyebrow="Supplement ranges"
      lineupTitle="Explore HK Vitals by concern"
      lineupDescription="Browse HK Vitals categories and confirm ingredients, dietary markers and live pricing on the official store."
      faqNote="Supplements support nutrition but are not medical treatments and results vary. Check labels and consult a healthcare professional when appropriate."
      mobileCtaLabel="Check live range & offers on HK Vitals"
      advantages={ADVANTAGES}
      matchers={MATCHERS}
      lineup={LINEUP}
      faqs={faqs}
      stats={stats}
    />
  );
}
