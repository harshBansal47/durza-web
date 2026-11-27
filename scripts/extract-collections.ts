import fs from "node:fs";
import path from "node:path";
import { COLLECTIONS } from "../data/collections";

const outDir = path.join(process.cwd(), "migration", "content", "collection");
fs.mkdirSync(outDir, { recursive: true });

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

for (const c of COLLECTIONS) {
  const doc = {
    kind: "collection",
    slug: c.slug,
    title: c.title,
    seo_title: c.seoTitle,
    description: c.metaDescription,
    meta_description: c.metaDescription,
    status: "published",
    content_blocks: [
      {
        type: "collectionGroup",
        id: "picks",
        heading: c.title,
        dek: c.summary,
        items: c.picks.map((p) => ({
          product: slugify(p.name),
          badge: null,
          tags: [],
          _original: { name: p.name, storeBadge: p.storeBadge, tier: p.tier, why: p.why, skipIf: p.skipIf, ctaLabel: p.ctaLabel, ctaHref: p.ctaHref, external: p.external, offerType: p.offerType },
        })),
      },
    ],
    structured_data: { itemCountLabel: c.itemCountLabel, updatedLabel: c.updatedLabel, keywords: c.keywords, relatedCollections: c.relatedCollections },
    hero_image_url: c.heroImage,
    author_name: null,
    canonical_url: `/collections/${c.slug}`,
    is_indexable: true,
    needs_review: true,
    faqs: c.faqs,
    updated_at: null,
  };
  fs.writeFileSync(path.join(outDir, `${c.slug}.json`), JSON.stringify(doc, null, 2));
}
console.log(`Extracted ${COLLECTIONS.length} collections`);
