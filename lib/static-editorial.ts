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

export function staticFeaturedGuides(limit = 3): EditorialContent[] {
  return STORE_GUIDES.filter((guide) => guide.featured)
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
