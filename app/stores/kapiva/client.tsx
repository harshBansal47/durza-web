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

const ADVANTAGES = [{"title": "Brand information & quality focus", "desc": "Kapiva provides product information, ingredient details and quality/testing information on its official site \u2014 review specifics on each listing."}, {"title": "Consultation options", "desc": "Kapiva offers access to Ayurveda/health guidance options on its platform as described on kapiva.in \u2014 check current availability."}, {"title": "Combos & routine packs", "desc": "Multi-pack and combo options are often available for consistent routines \u2014 compare pack sizes and value on the official store."}, {"title": "Direct-from-brand ordering", "desc": "Order directly to view current range, formats and delivery options shown at checkout."}] as const;
const MATCHERS = [{"id": "energy", "label": "Energy & Stamina", "headline": "Daily vitality and active-lifestyle support", "bullets": ["Review ingredient lists, serving guidance and any lab/test info provided", "Choose a format (resin/gummies/capsules) that fits your routine", "Consult a healthcare professional if you have conditions or take medication"], "cta": "Explore energy & stamina \u2192", "src": "matcher-energy"}, {"id": "weight", "label": "Metabolism & Weight Support", "headline": "Nutrition choices to support healthy routines", "bullets": ["Pair products with balanced diet and regular activity", "Check for added sugars and follow serving instructions", "Prefer consistent routines and review pack options on Kapiva"], "cta": "Explore metabolism support \u2192", "src": "matcher-weight"}, {"id": "skin-hair", "label": "Skin & Hair Nutrition", "headline": "Inside-out nutrition for skin and hair routines", "bullets": ["Check key ingredients, allergens and dietary markers (veg/non-veg)", "Allow time for consistent use as part of a routine", "Review suitability and guidance on the product page"], "cta": "Explore skin & hair nutrition \u2192", "src": "matcher-skin-hair"}, {"id": "gut", "label": "Gut & Daily Wellness", "headline": "Everyday wellness and digestive routine support", "bullets": ["Review storage and consumption guidance for juices/supplements", "Check ingredient suitability and serving size", "Confirm delivery and availability on the official store"], "cta": "Explore daily wellness \u2192", "src": "matcher-gut"}] as const;
const LINEUP = [{"title": "Himalayan Shilajit Range", "badge": "Vitality", "copy": "Shilajit products in multiple formats \u2014 review ingredients and brand information.", "src": "lineup-shilajit"}, {"title": "Weight & Metabolism", "badge": "Routine support", "copy": "Juices and nutrition for wellness routines \u2014 check serving and ingredients.", "src": "lineup-weight"}, {"title": "Skin & Glow Nutrition", "badge": "Skin", "copy": "Nutrition formats for skin routines \u2014 review ingredients and suitability.", "src": "lineup-skin"}, {"title": "Hair Nutrition", "badge": "Hair", "copy": "Products aimed at hair routines \u2014 check dietary markers and guidance.", "src": "lineup-hair"}, {"title": "Juices & Daily Wellness", "badge": "Daily", "copy": "Cold-pressed juices and daily wellness picks \u2014 see storage guidance.", "src": "lineup-gut"}, {"title": "Targeted Wellness Care", "badge": "Care", "copy": "Condition-focused wellness ranges \u2014 review information and consult professionals as needed.", "src": "lineup-care"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  return (
    <StoreGuidePage
      slug="kapiva"
      name="Kapiva"
      headline="Kapiva Official Store — Ayurvedic Nutrition & Everyday Wellness"
      lead="Choose Kapiva products by your wellness goal, review ingredients and brand information, then check live availability and pricing on the official store."
      matcherHeading="Choose by wellness goal"
      matcherDescription="Select your goal for a simple checklist, then explore the matching Kapiva range on the official store."
      lineupEyebrow="Wellness ranges"
      lineupTitle="Explore Kapiva by category"
      lineupDescription="Browse Kapiva categories and confirm ingredients, guidance and live availability on the official store."
      faqNote="Wellness products support routines but are not medical treatments. Check ingredients, follow label guidance and consult a healthcare professional when appropriate."
      mobileCtaLabel="Check live range & offers on Kapiva"
      advantages={ADVANTAGES}
      matchers={MATCHERS}
      lineup={LINEUP}
      faqs={faqs}
      stats={stats}
    />
  );
}
