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

const ADVANTAGES = [{"title": "Authenticity & sourcing focus", "desc": "HealthKart emphasizes sourcing from brands/authorized channels and provides authenticity verification guidance for eligible products \u2014 see details on the site."}, {"title": "Wide supplement & nutrition range", "desc": "Compare whey, creatine, vitamins, health foods and more across brands and formats with detailed product information."}, {"title": "Combos, rewards & value packs", "desc": "Combo bundles and loyalty/reward benefits may be available on HealthKart \u2014 check live offers and terms on the store."}, {"title": "Delivery & returns per policy", "desc": "Pan-India delivery and returns/replacements apply as per HealthKart policies and product eligibility \u2014 review at checkout."}] as const;
const MATCHERS = [{"id": "muscle", "label": "Muscle & Recovery", "headline": "Protein support for training and recovery", "bullets": ["Compare protein per serving, ingredients and suitability (e.g. concentrate/isolate)", "Verify authenticity codes/seals on delivery where applicable", "Choose pack size based on servings and consistency"], "cta": "Explore whey protein \u2192", "src": "matcher-muscle"}, {"id": "strength", "label": "Strength & Performance", "headline": "Creatine and performance nutrition basics", "bullets": ["Check serving size, purity and ingredient transparency", "Follow label directions and hydrate adequately", "Consider combos if you also need protein or accessories"], "cta": "Explore performance nutrition \u2192", "src": "matcher-strength"}, {"id": "gainers", "label": "Weight & Calorie Support", "headline": "Gainers and calorie-dense nutrition options", "bullets": ["Review carb/protein ratio and added sugars per serving", "Align with your overall diet and training plan", "Compare value by servings, not just tub price"], "cta": "Explore gainers \u2192", "src": "matcher-gainers"}, {"id": "daily", "label": "Daily Vitamins & Wellness", "headline": "Micronutrients, omega-3 and everyday health", "bullets": ["Check dosage, ingredient form and dietary markers", "Avoid stacking overlapping supplements without guidance", "Review labels and consult a professional if needed"], "cta": "Explore vitamins & wellness \u2192", "src": "matcher-daily"}] as const;
const LINEUP = [{"title": "Whey Protein", "badge": "Protein", "copy": "Concentrate, isolate and blends \u2014 compare protein per scoop and ingredients.", "src": "lineup-whey"}, {"title": "Creatine", "badge": "Performance", "copy": "Creatine monohydrate and more \u2014 check serving, purity and format.", "src": "lineup-creatine"}, {"title": "Mass Gainers", "badge": "Calories", "copy": "Calorie and carb-protein options \u2014 review macros per serving.", "src": "lineup-gainers"}, {"title": "Pre-Workout & Aminos", "badge": "Training", "copy": "Pre-workout and amino products \u2014 check stimulant and ingredient labels.", "src": "lineup-preworkout"}, {"title": "Health Foods & Snacks", "badge": "Nutrition", "copy": "Protein foods, peanut butter and bars \u2014 compare nutrition per serving.", "src": "lineup-foods"}, {"title": "Vitamins & Omega-3", "badge": "Wellness", "copy": "Multivitamins, fish oil and more \u2014 review dosage and suitability.", "src": "lineup-vitamins"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  return (
    <StoreGuidePage
      slug="healthkart"
      name="HealthKart"
      headline="HealthKart Official Store — Protein, Creatine & Sports Nutrition"
      lead="Shop supplements by goal, compare protein and ingredient labels, and check live prices, combos and authenticity guidance on the official HealthKart store."
      matcherHeading="Pick supplements by your goal"
      matcherDescription="Choose your fitness goal for a quick checklist, then browse the matching category on HealthKart."
      lineupEyebrow="Popular categories"
      lineupTitle="Shop HealthKart by category"
      lineupDescription="Browse key supplement categories and confirm labels, authenticity guidance and live pricing on the official store."
      faqNote="Supplements support nutrition and training but are not substitutes for medical advice. Read labels carefully and consult a professional when appropriate."
      mobileCtaLabel="Check live range & offers on HealthKart"
      advantages={ADVANTAGES}
      matchers={MATCHERS}
      lineup={LINEUP}
      faqs={faqs}
      stats={stats}
    />
  );
}
