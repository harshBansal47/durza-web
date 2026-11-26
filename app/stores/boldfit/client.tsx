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

const ADVANTAGES = [{"title": "Wide home-fitness range", "desc": "Find yoga, strength, hydration and gym accessories in one place with specs and options listed on boldfit.in."}, {"title": "Combos & kits", "desc": "Multi-item kits and combos can offer convenient setups for home workouts \u2014 compare contents and value on the store."}, {"title": "Options, colours & sizes", "desc": "Access available thickness levels, resistance options and colourways directly on the official listings."}, {"title": "Delivery & support per policy", "desc": "Shipping, returns and support follow Boldfit\u2019s policies \u2014 review current terms on the official site and product pages."}] as const;
const MATCHERS = [{"id": "yoga", "label": "Yoga & Mobility", "headline": "Mats and accessories for floor workouts", "bullets": ["Choose mat thickness/material for your practice and comfort", "Look for grip/texture suited to sweat and floor type", "Check size, care instructions and included accessories"], "cta": "Explore yoga & mobility \u2192", "src": "matcher-yoga"}, {"id": "strength", "label": "Home Strength", "headline": "Compact gear for strength and resistance training", "bullets": ["Pick resistance levels or weights suited to your current ability", "Check build quality, grip and storage footprint", "Review safety guidance and product specs before use"], "cta": "Explore strength gear \u2192", "src": "matcher-strength"}, {"id": "hydration", "label": "Hydration & Shakers", "headline": "Bottles and shakers for gym and daily use", "bullets": ["Choose capacity and material (e.g. BPA-free/insulated) for your needs", "Check leak-proof design and ease of cleaning", "Compare lids, markings and portability"], "cta": "Explore hydration \u2192", "src": "matcher-hydration"}, {"id": "gym-bag", "label": "Gym Essentials", "headline": "Gloves, supports and everyday training accessories", "bullets": ["Pick the right size and support level for your activity", "Check materials, padding and durability details", "Review care instructions and return eligibility"], "cta": "Explore gym essentials \u2192", "src": "matcher-gym-essentials"}] as const;
const LINEUP = [{"title": "Yoga & Exercise Mats", "badge": "Yoga", "copy": "Mats in different materials and thicknesses \u2014 compare grip and comfort.", "src": "lineup-yoga-mats"}, {"title": "Resistance Bands & Tubes", "badge": "Strength", "copy": "Bands for home and travel workouts \u2014 check resistance levels and kits.", "src": "lineup-bands"}, {"title": "Bottles & Shakers", "badge": "Hydration", "copy": "Hydration and shaker options \u2014 compare capacity, material and lids.", "src": "lineup-hydration"}, {"title": "Gym Gloves & Supports", "badge": "Training", "copy": "Training accessories for grip and support \u2014 check sizing and padding.", "src": "lineup-gym-gear"}, {"title": "Home Workout Equipment", "badge": "Home gym", "copy": "Compact strength tools \u2014 review build, weight options and use guidance.", "src": "lineup-home-gym"}, {"title": "Activewear & Socks", "badge": "Apparel", "copy": "Training apparel essentials \u2014 check fabric, fit and care details.", "src": "lineup-apparel"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  return (
    <StoreGuidePage
      slug="boldfit"
      name="Boldfit"
      headline="Boldfit Official Store — Home Gym, Yoga & Fitness Accessories"
      lead="Build your workout setup by goal, compare materials and specs, and check live options and availability on the official Boldfit store."
      matcherHeading="Build your workout setup"
      matcherDescription="Pick your workout style for a quick checklist, then browse matching gear on the official store."
      lineupEyebrow="Fitness gear"
      lineupTitle="Shop Boldfit by category"
      lineupDescription="Browse popular Boldfit categories and confirm specs, options and live availability on the official store."
      faqNote="Choose gear suited to your fitness level and use it safely. Check product specs and Boldfit’s current policies on the official store."
      mobileCtaLabel="Check live range & offers on Boldfit"
      advantages={ADVANTAGES}
      matchers={MATCHERS}
      lineup={LINEUP}
      faqs={faqs}
      stats={stats}
    />
  );
}
