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

const ADVANTAGES = [{"title": "Direct-from-brand ordering", "desc": "Order directly from BeastLife to access current products, flavors and pack options as listed on the official store."}, {"title": "Transparency & product information", "desc": "BeastLife highlights ingredient transparency and product/testing information on its site \u2014 review details on each listing."}, {"title": "Stacks & combo value", "desc": "Combo packs and stacks may be available for training routines \u2014 compare servings and value on beastlife.in."}, {"title": "Checkout offers as available", "desc": "Any prepaid, bundle or cart benefits vary over time \u2014 check live terms at checkout on the official store."}] as const;
const MATCHERS = [{"id": "recovery", "label": "Muscle Recovery", "headline": "Protein support for post-training recovery", "bullets": ["Compare protein per serving, flavors and ingredient transparency", "Choose pack size based on your daily servings and consistency", "Verify authenticity/seal and storage guidance on delivery"], "cta": "Explore whey protein \u2192", "src": "matcher-whey"}, {"id": "strength", "label": "Strength & Performance", "headline": "Creatine and performance-focused staples", "bullets": ["Check creatine form, serving size and purity information", "Follow label directions and maintain hydration", "Consider stacks/combos if building a routine"], "cta": "Explore creatine & stacks \u2192", "src": "matcher-strength"}, {"id": "energy", "label": "Training Energy", "headline": "Pre-workout and session focus options", "bullets": ["Review stimulant/ingredient levels and assess your tolerance", "Avoid late-day use if sensitive to caffeine", "Check serving guidance and suitability on the label"], "cta": "Explore pre-workout \u2192", "src": "matcher-energy"}] as const;
const LINEUP = [{"title": "Whey Protein", "badge": "Recovery", "copy": "Protein options for daily training recovery \u2014 compare servings and flavors.", "src": "lineup-whey"}, {"title": "Creatine", "badge": "Strength", "copy": "Creatine products for performance routines \u2014 check form and serving.", "src": "lineup-creatine"}, {"title": "Pre-Workout", "badge": "Energy", "copy": "Pre-training formulas \u2014 review ingredients and stimulant levels.", "src": "lineup-preworkout"}, {"title": "Combos & Stacks", "badge": "Value", "copy": "Bundled routines and packs \u2014 compare value per serving on the store.", "src": "lineup-combos"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  return (
    <StoreGuidePage
      slug="beast-life"
      name="BeastLife"
      headline="BeastLife Official Store — Whey, Creatine & Performance Nutrition"
      lead="Choose BeastLife products by your training goal, review ingredient and product information, and check live availability on the official store."
      matcherHeading="Pick by your training goal"
      matcherDescription="Select your goal for a quick checklist, then explore the matching range on the official BeastLife store."
      lineupEyebrow="Performance range"
      lineupTitle="Explore BeastLife by category"
      lineupDescription="Browse core BeastLife categories and confirm flavors, packs and live availability on the official store."
      faqNote="Sports nutrition supports training and diet but is not a substitute for medical advice. Follow label guidance and consult a professional when appropriate."
      mobileCtaLabel="Check live range & offers on BeastLife"
      advantages={ADVANTAGES}
      matchers={MATCHERS}
      lineup={LINEUP}
      faqs={faqs}
      stats={stats}
    />
  );
}
