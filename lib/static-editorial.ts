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
  "reliance-digital-appliance-laptop-offers-guide": 8,
  "milton-thermosteel-offers-guide": 8,
  "firstcry-parenting-deals-and-firstcry-club-guide": 8,
  "zomato-veg-deals-and-go-out-offers-guide": 8,
  "boult-audio-earbuds-anc-codes-guide": 7,
  "havells-bldc-fan-offers-guide": 7,
  "pepperfry-bean-bags-and-furniture-guide": 7,
  "moglix-tools-and-gst-savings-guide": 7,
  "levis-denim-offers-and-sale-guide": 6,
  "nykaa-coupons-and-sale-guide": 6,
  "beast-life-whey-and-recovery-guide": 6,
  "alpino-peanut-butter-and-oats-guide": 6,
  "baccabucci-footwear-sandali-loafers-guide": 3,
  "ixigo-travel-flight-hotel-codes-guide": 3,
  "life-changing-astro-consultation-guide": 2,
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
