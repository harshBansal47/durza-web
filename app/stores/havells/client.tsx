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

const ADVANTAGES = [{"title": "Genuine warranty & brand support", "desc": "Manufacturer-backed warranty and authorized service support on eligible products, as specified on Havells listings."}, {"title": "Installation on eligible appliances", "desc": "Installation/demo support may be available for eligible products (such as water heaters and select appliances) \u2014 confirm by PIN code on the product page."}, {"title": "Energy ratings & current models", "desc": "View BEE star ratings, specifications and current model details directly on official Havells listings."}, {"title": "EMI & payment options at checkout", "desc": "EMI and bank/card payment options may be available on eligible orders \u2014 check live terms at checkout."}] as const;
const MATCHERS = [{"id": "cooling", "label": "Cooling & Fans", "headline": "Efficient airflow for bedrooms and living spaces", "bullets": ["Match fan sweep size to your room and ceiling height", "Consider BLDC motors for lower power use and quieter operation", "Check controls, finish and warranty details on the listing"], "cta": "Explore cooling & fans \u2192", "src": "matcher-cooling"}, {"id": "water-heating", "label": "Water Heating", "headline": "Storage and instant geysers for your home", "bullets": ["Choose capacity based on household size and usage", "Verify pressure rating and safety features for your building type", "Confirm installation availability and warranty on the product page"], "cta": "Explore water heaters \u2192", "src": "matcher-water-heating"}, {"id": "kitchen", "label": "Kitchen Appliances", "headline": "Appliances tuned for everyday Indian cooking", "bullets": ["Pick motor power, capacity and build suited to your cooking needs", "Compare presets, attachments and ease of cleaning", "Review energy use, safety features and service coverage"], "cta": "Explore kitchen appliances \u2192", "src": "matcher-kitchen"}, {"id": "air-light", "label": "Air, Lighting & Grooming", "headline": "Comfort, lighting and personal care essentials", "bullets": ["Match air-care coverage/filtration and lighting output to each space", "Compare grooming runtime, attachments and washability", "Check specifications and availability on the official store"], "cta": "Browse Havells range \u2192", "src": "matcher-air-light"}] as const;
const LINEUP = [{"title": "BLDC & Ceiling Fans", "badge": "Cooling", "copy": "Energy-efficient fans in multiple designs \u2014 compare sweep, motor type and ratings.", "src": "lineup-fans"}, {"title": "Water Heaters (Geysers)", "badge": "Hot water", "copy": "Storage and instant options \u2014 check capacity, pressure rating and safety features.", "src": "lineup-water-heaters"}, {"title": "Kitchen Appliances", "badge": "Kitchen", "copy": "Mixer grinders, air fryers and more \u2014 review power, capacity and warranty.", "src": "lineup-kitchen"}, {"title": "Air Purifiers & Heaters", "badge": "Air care", "copy": "Comfort solutions for your room \u2014 match coverage, filtration and noise levels.", "src": "lineup-air-care"}, {"title": "Personal Grooming", "badge": "Grooming", "copy": "Trimmers and grooming tools \u2014 compare blades, runtime and attachments.", "src": "lineup-grooming"}, {"title": "LED & Home Lighting", "badge": "Lighting", "copy": "Lighting for every space \u2014 check wattage, lumens and colour temperature.", "src": "lineup-lighting"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  return (
    <StoreGuidePage
      slug="havells"
      name="Havells"
      headline="Havells Official Store — Fans, Water Heaters & Home Appliances"
      lead="Compare Havells appliances by room and need, then check live price, availability and eligible service options on the official store."
      matcherHeading="Find the right Havells appliance"
      matcherDescription="Pick your need to see what to look for, then browse the matching range on the official Havells store."
      lineupEyebrow="Official range"
      lineupTitle="Shop Havells by category"
      lineupDescription="Browse key Havells categories and check live configurations, pricing and availability on the official store."
      faqNote="Shopping and service details can vary by product and PIN code. Check the official Havells listing and checkout for the latest information."
      mobileCtaLabel="Check live range & offers on Havells"
      advantages={ADVANTAGES}
      matchers={MATCHERS}
      lineup={LINEUP}
      faqs={faqs}
      stats={stats}
    />
  );
}
