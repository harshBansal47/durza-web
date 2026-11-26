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

const ADVANTAGES = [{"title": "Full range & combos", "desc": "Browse complete grooming ranges, combos and curated sets directly on the official store."}, {"title": "Fragrances & discovery sets", "desc": "Explore signature fragrances and discovery/gift formats as available on themancompany.com."}, {"title": "Gifting-ready options", "desc": "Find curated gift boxes and sets suited for occasions \u2014 check contents and availability on the listing."}, {"title": "Checkout benefits as available", "desc": "Prepaid/cart benefits or bundles may be offered from time to time \u2014 see live terms at checkout."}] as const;
const MATCHERS = [{"id": "fragrance", "label": "Fragrances", "headline": "Signature scents for day and evening", "bullets": ["Choose fragrance notes/profiles that fit your preference and occasion", "Consider discovery sets if trying a new scent", "Check size, concentration and ingredients on the listing"], "cta": "Explore fragrances \u2192", "src": "matcher-fragrance"}, {"id": "beard", "label": "Beard Care", "headline": "Clean, soften and style your beard", "bullets": ["Use a gentle beard wash and follow with oil/balm as needed", "Patch-test new products if you have sensitive skin", "Check ingredients and usage directions on the product page"], "cta": "Explore beard care \u2192", "src": "matcher-beard"}, {"id": "skincare", "label": "Face & Body Care", "headline": "Everyday cleansing and grooming essentials", "bullets": ["Pick cleansers/moisturizers suited to your skin type", "Use sunscreen as part of daytime routines where appropriate", "Review ingredients and instructions before use"], "cta": "Explore face & body care \u2192", "src": "matcher-skincare"}, {"id": "gifting", "label": "Gifting", "headline": "Ready-to-gift grooming sets", "bullets": ["Choose curated hampers or discovery sets for easy gifting", "Check what\u2019s included and packaging details on the listing", "Confirm delivery timelines and availability on the store"], "cta": "Explore gift sets \u2192", "src": "matcher-gifting"}] as const;
const LINEUP = [{"title": "Eau de Parfums", "badge": "Fragrance", "copy": "Signature scents and sizes \u2014 compare notes and formats.", "src": "lineup-perfumes"}, {"title": "Beard Care", "badge": "Beard", "copy": "Oils, washes and balms \u2014 check ingredients and routine fit.", "src": "lineup-beard"}, {"title": "Face Care", "badge": "Skin", "copy": "Cleansers, scrubs and daily care \u2014 review suitability for your skin.", "src": "lineup-face"}, {"title": "Gift Sets & Combos", "badge": "Gifting", "copy": "Curated boxes and combos \u2014 see contents and presentation.", "src": "lineup-gifting"}, {"title": "Hair & Body", "badge": "Essentials", "copy": "Styling and body care essentials \u2014 check usage and ingredients.", "src": "lineup-hair-body"}] as const;

export default function StoreClient({ faqs, stats }: Props) {
  return (
    <StoreGuidePage
      slug="the-man-company"
      name="The Man Company"
      headline="The Man Company Official Store — Grooming, Fragrances & Gift Sets"
      lead="Build your grooming routine or find a gift set, compare ranges, and check live availability on the official The Man Company store."
      matcherHeading="Find your routine or gift"
      matcherDescription="Choose your need for a quick checklist, then explore the matching range on the official store."
      lineupEyebrow="Grooming ranges"
      lineupTitle="Shop by category"
      lineupDescription="Browse grooming, fragrance and gifting categories and confirm live availability on the official store."
      faqNote="Patch-test new grooming products if you have sensitive skin. Check ingredients, usage directions and current store policies on the official site."
      mobileCtaLabel="Check live range & offers on The Man Company"
      advantages={ADVANTAGES}
      matchers={MATCHERS}
      lineup={LINEUP}
      faqs={faqs}
      stats={stats}
    />
  );
}
