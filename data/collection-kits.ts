/**
 * Shared, reusable structure for collection pages that follow the
 * "complete Amazon makeup toolkit" pattern: a designed hero, grouped product
 * sections with images, and one dedicated tracked link per product.
 *
 * Until a researched product list is supplied, a kit is derived from the
 * existing collection picks. `COLLECTION_KIT_OVERRIDES` is where a fully
 * researched set (categories, real images, exact product names and links)
 * replaces the derived version — no invented products or prices here.
 */
import { COLLECTIONS, type CollectionEntry } from "@/data/collections";

export const COLLECTION_KIT_PLACEHOLDER_IMAGE = "/collections/amazon-beauty-toolkit/product-placeholder.svg";
const PLACEHOLDER_IMAGE = COLLECTION_KIT_PLACEHOLDER_IMAGE;

export interface CollectionKitProduct {
  id: string;
  name: string;
  badge: string;
  description: string;
  image: string;
  note?: string;
  href: string;
  /** Only set when the price was actually verified on a source page. */
  priceLabel?: string;
  mrpLabel?: string;
}

export interface CollectionKitSection {
  slug: string;
  title: string;
  stepLabel: string;
  shortIntro: string;
  products: CollectionKitProduct[];
}

export interface CollectionKit {
  eyebrow: string;
  headline: string;
  subline: string;
  checkedLabel: string;
  sections: CollectionKitSection[];
  /** Required on health-adjacent kits. */
  healthNote?: string;
}

/** Fully researched overrides, keyed by collection slug. */
import { COLLECTION_KIT_OVERRIDES } from "@/data/collection-kit-overrides";
export { COLLECTION_KIT_OVERRIDES };

const GROUPS = [
  {
    slug: "start-here",
    title: "Start here",
    stepLabel: "Step 1 · Core",
    shortIntro: "The picks that solve the problem this kit is built around.",
    pattern: /Essential First Buy|Daily Non-Negotiable|Primary Coding Machine|High-Rise Essential|Bill Saver|Morning Gut|Weekly Scalp|Foundation Gear/i,
  },
  {
    slug: "smart-upgrades",
    title: "Smart upgrades",
    stepLabel: "Step 2 · Upgrade",
    shortIntro: "Add these once the core is in place and you know what is still missing.",
    pattern: /Sweet-Spot Upgrade|Performance Fix|Eye-Comfort Screen|Strength Booster|Clean Recovery|Compact Strength|Midday Refresh|Oil & Mark Control/i,
  },
  {
    slug: "finish-the-kit",
    title: "Finish the kit",
    stepLabel: "Step 3 · Add-ons",
    shortIntro: "Optional pieces that make the setup more complete, not more expensive.",
    pattern: /Optional Add-On|Long-Term Comfort|Zero-Roll Movement|Weekly Scalp|Smart-Casual|Signature Carry|Hostess|Bridal|Anniversary|Milestone/i,
  },
] as const;

function groupFor(tier: string | undefined, index: number, count: number) {
  if (tier) {
    const match = GROUPS.find((g) => g.pattern.test(tier));
    if (match) return match;
  }
  // No recognised tier: split the remaining picks into three even sections.
  return GROUPS[Math.min(2, Math.floor((index / Math.max(1, count)) * 3))];
}

export function deriveCollectionKit(entry: CollectionEntry): CollectionKit {
  const picks = entry.picks ?? [];
  // Only plain data crosses into the client component — never the RegExp pattern.
  const sections: CollectionKitSection[] = GROUPS.map((group) => ({
    slug: group.slug,
    title: group.title,
    stepLabel: group.stepLabel,
    shortIntro: group.shortIntro,
    products: [],
  }));
  picks.forEach((pick, index) => {
    const group = groupFor(pick.tier, index, picks.length);
    const target = sections.find((s) => s.slug === group.slug)!;
    target.products.push({
      id: `${entry.slug}-${index}`,
      name: pick.name,
      badge: pick.storeBadge || entry.category,
      description: pick.why,
      image: PLACEHOLDER_IMAGE,
      note: pick.skipIf,
      href: pick.ctaHref,
    });
  });
  return {
    eyebrow: entry.category,
    headline: entry.title,
    subline: entry.summary,
    checkedLabel: entry.updatedLabel,
    sections: sections.filter((section) => section.products.length > 0),
  };
}

export function getCollectionKit(entry: CollectionEntry): CollectionKit | null {
  const override = COLLECTION_KIT_OVERRIDES[entry.slug];
  if (override) return override;
  if (!entry.picks?.length) return null;
  return deriveCollectionKit(entry);
}

/** Slugs that render with the shared kit template (all static collections). */
export const KIT_SLUGS = new Set(COLLECTIONS.map((c) => c.slug));
