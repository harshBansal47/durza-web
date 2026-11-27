import fs from "node:fs";
import path from "node:path";
import { COLLECTIONS } from "../data/collections";
import { getCollectionKit } from "../data/collection-kits";
import { BEAUTY_SHOP_CATEGORIES } from "../data/amazon-beauty-toolkit";

const outDir = path.join(process.cwd(), "migration", "content", "collection");
fs.mkdirSync(outDir, { recursive: true });

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

for (const c of COLLECTIONS) {
  const kit = getCollectionKit(c);
  const blocks: any[] = [];
  if (c.slug === "complete-amazon-makeup-toolkit") {
    for (const cat of BEAUTY_SHOP_CATEGORIES) {
      blocks.push({
        type: "collectionGroup",
        id: cat.slug,
        step: cat.stepLabel,
        heading: `${cat.stepLabel}: ${cat.title}`,
        dek: cat.shortIntro,
        items: cat.products.map((p:any) => ({
          product: slugify(`${p.brand}-${p.name}`),
          name: `${p.brand} ${p.name}`,
          badge: p.tag || null,
          href: p.amazonUrl,
          image_url: null,
          priceLabel: p.priceLabel || null,
          mrpLabel: p.mrpLabel || null,
          price_checked_at: p.priceLabel ? "2026-11-24" : null,
          _original: { name: `${p.brand} ${p.name}`, storeBadge: "Amazon India", why: p.description, ctaHref: p.amazonUrl, external: true },
        })),
      });
    }
    blocks.push({ type: "explorer" });
    blocks.push({ type: "quickPicks", lists: [] });
    blocks.push({ type: "kitTray", enabled: true });
    const doc = {
      kind: "collection",
      slug: c.slug,
      title: c.title,
      seo_title: c.seoTitle,
      description: c.metaDescription,
      meta_description: c.metaDescription,
      status: "published",
      content_blocks: blocks,
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
    continue;
  }
  // tierTable from picks tiers
  const tiers = [
    { label: "Essential First Buy", stepIds: [] as string[] },
    { label: "Smart upgrades", stepIds: [] as string[] },
  ];
  blocks.push({ type: "tierTable", tiers });
  // collectionGroup per kit section
  if (kit) {
    for (const sec of kit.sections) {
      blocks.push({
        type: "collectionGroup",
        id: sec.slug,
        step: sec.stepLabel,
        heading: sec.title,
        dek: sec.shortIntro,
        items: sec.products.map((p) => ({
          product: slugify(p.name),
          name: p.name,
          badge: p.badge,
          href: p.href,
          image_url: p.image,
          priceLabel: p.priceLabel || null,
          mrpLabel: p.mrpLabel || null,
          price_checked_at: p.priceLabel ? "2026-11-25" : null,
          _original: {
            name: p.name,
            storeBadge: p.badge,
            why: p.description,
            skipIf: p.note,
            ctaHref: p.href,
            external: true,
          },
        })),
      });
    }
  } else {
    // fallback: single group from picks
    blocks.push({
      type: "collectionGroup",
      id: "picks",
      heading: c.title,
      dek: c.summary,
      items: c.picks.map((p) => ({
        product: slugify(p.name),
        name: p.name,
        badge: p.storeBadge,
        href: p.ctaHref,
        _original: { name: p.name, storeBadge: p.storeBadge, tier: p.tier, why: p.why, skipIf: p.skipIf, ctaLabel: p.ctaLabel, ctaHref: p.ctaHref, external: p.external, offerType: p.offerType },
      })),
    });
  }
  blocks.push({ type: "explorer" });
  blocks.push({ type: "quickPicks", lists: [] });
  blocks.push({ type: "kitTray", enabled: true });

  const doc = {
    kind: "collection",
    slug: c.slug,
    title: c.title,
    seo_title: c.seoTitle,
    description: c.metaDescription,
    meta_description: c.metaDescription,
    status: "published",
    content_blocks: blocks,
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
