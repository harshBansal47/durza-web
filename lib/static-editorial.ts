/**
 * Adapter between the hand-authored static buying guides in
 * `data/store-guides.ts` and the editorial shapes the homepage / listing
 * components already know how to render.
 *
 * Static guides carry real content but they are not editorial-DB rows, so
 * we synthesize the minimal `EditorialContent` envelope the cards need.
 */

import type { EditorialContent, EditorialFAQ } from "@/lib/types";
import { STORE_GUIDES } from "@/data/store-guides";

/**
 * Owner-curated guide priority (1-10). Higher = ranked first everywhere a
 * static guide appears. Default is 5; anything not listed is 5.
 */
const GUIDE_PRIORITY: Record<string, number> = {
  // Tier 10 — Indian own-SKU premium brands
  "alpino-peanut-butter-and-oats-guide": 10,
  "beast-life-whey-and-recovery-guide": 10,
  "boldfit-home-gym-deals-and-offers-guide": 10,
  "boult-audio-earbuds-anc-codes-guide": 10,
  "the-man-company-grooming-beard-kits-guide": 10,
  "milton-thermosteel-offers-guide": 10,
  "havells-bldc-fan-offers-guide": 10,
  "sirona-menstrual-cup-guide": 10,
  "wonderchef-khuramas-kitchenware-guide": 10,
  "dot-and-key-skin-active-guide": 10,
  "kapiva-ayurveda-daily-wellness-guide": 10,
  "kama-ayurveda-bringadi-and-kumkumadi-guide": 10,
  "gritzo-kids-nutrition-and-growth-guide": 10,
  "fitspire-plant-protein-and-vegan-guide": 10,
  "truebasics-clinical-strength-guide": 10,
  // Tier 9 — Indian own-SKU household / Indian-owned marketplaces
  "firstcry-parenting-deals-and-firstcry-club-guide": 9,
  "nykaa-coupons-and-sale-guide": 9,
  "pepperfry-bean-bags-and-furniture-guide": 9,
  // Tier 8 — India-reachable partners / Indian travel
  "reliance-digital-appliance-laptop-offers-guide": 8,
  "lenovo-laptop-offers-india-2026": 8,
  "best-acer-laptop-deals-promo-codes": 8,
  // Tier 7 — partner-tier coupons/guides
  "adidas-sale-india-2026": 7,
  "levis-denim-offers-and-sale-guide": 7,
  "moglix-tools-and-gst-savings-guide": 5,
  "baccabucci-footwear-sandali-loafers-guide": 5,
  // Low priority — off-topic / flat-volume
  "life-changing-astro-consultation-guide": 3,
};

const DEFAULT_GUIDE_PRIORITY = 5;

/** Priority for a static guide slug (1-10). */
export function priorityForGuide(slug: string): number {
  return GUIDE_PRIORITY[slug] ?? DEFAULT_GUIDE_PRIORITY;
}

export function staticFeaturedGuides(limit = 3): EditorialContent[] {
  return STORE_GUIDES.filter((guide) => guide.featured)
    .slice()
    .sort((a, b) => priorityForGuide(b.slug) - priorityForGuide(a.slug))
    .slice(0, limit)
    .map((guide) => ({
      id: `static-${guide.slug}`,
      content_type: "guide" as const,
      status: "published" as const,
      title: guide.seo.title,
      slug: guide.slug,
      summary: guide.summary,
      content_blocks: [],
      structured_data: {},
      hero_image_url: guide.heroImage ?? null,
      author_name: null,
      market: null,
      seo_title: guide.seo.title,
      meta_description: guide.seo.description,
      canonical_url: `/guides/${guide.slug}`,
      is_indexable: true,
      is_featured: true,
      published_at: guide.auditedOn ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date(guide.auditedOn ?? Date.now()).toISOString(),
      relations: [],
      entity_links: [],
      faqs: guide.faqs.map((faq, i): EditorialFAQ => ({ ...faq, sort_order: i })),
      adsense_eligible: false,
    }));
}
