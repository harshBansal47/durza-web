/**
 * Shared topic taxonomy for Durza's editorial layer.
 *
 * Reviews, guides and comparisons now come from the editorial API; collections
 * still carry a static vocabulary in data/collections.ts. Each editorial row
 * also has a free `category` string in structured_data. This module folds all
 * of them into one small set of durable decision topics so the homepage, hub
 * pages and related-content blocks can agree on what belongs together.
 *
 * This is a PRESENTATION grouping, not a claim of expertise. It never invents
 * authors, methods or freshness — it only groups content that already exists.
 */

import type { EditorialType } from "@/lib/types";

export type TopicId = "tech" | "home" | "money" | "health" | "beauty" | "fashion";

export type TopicGlyph = "laptop" | "home" | "wallet" | "heart" | "sparkles" | "shirt";

export interface TopicDefinition {
  id: TopicId;
  label: string;
  eyebrow: string;
  description: string;
  hubHref: string;
  /** Matching commerce category hub — kept in sync with /categories/*. */
  categoryHref: string;
  categoryLabel: string;
  glyph: TopicGlyph;
  /** Exact category labels used by the static datafiles and store guides. */
  categories: string[];
  /** Last-resort match for unlisted store-guide category strings. */
  keywords: string[];
}

/**
 * Ordered deliberately: the first two are the verticals where Durza already
 * has the deepest comparison and tool coverage.
 */
export const TOPICS: TopicDefinition[] = [
  {
    id: "tech",
    label: "Tech & Gadgets",
    eyebrow: "Compare before you upgrade",
    description:
      "Side-by-side laptop, phone and audio decisions, with the tradeoffs spelled out and calculators for the numbers that matter.",
    hubHref: "/topics/tech",
    /** Matching commerce category hub — kept in sync with /categories/*. */
    categoryHref: "/categories/electronics",
    categoryLabel: "Electronics",
    glyph: "laptop",
    categories: [
      "Electronics & Laptops",
      "Smartphones",
      "Laptops & Tech",
      "EdTech & Careers",
      "Work & Tech",
      "Electronics",
      "Tech",
      "Laptops",
    ],
    keywords: ["laptop", "phone", "smartphone", "audio", "earbud", "headphone", "camera", "gadget", "edtech", "tablet"],
  },
  {
    id: "home",
    label: "Home & Appliances",
    eyebrow: "Buy once, buy right",
    description:
      "Appliance and household buying decisions, including running-cost tools, capacity checks and side-by-side brand comparisons.",
    hubHref: "/topics/home",
    /** Matching commerce category hub — kept in sync with /categories/*. */
    categoryHref: "/categories/home-kitchen",
    categoryLabel: "Home & Kitchen",
    glyph: "home",
    categories: [
      "Health & Home",
      "Home & Appliances",
      "Gifting & Lifestyle",
      "Home",
      "Appliances",
      "Kitchen",
      "Baby & Kids",
      "Furniture",
    ],
    keywords: ["air conditioner", "fan", "appliance", "kitchen", "home", "cooler", "furniture", "baby", "parenting", "gifting", "milton", "wonderchef"],
  },
  {
    id: "money",
    label: "Deals & Money Math",
    eyebrow: "Know what the discount is worth",
    description:
      "Bank-offer maths, exchange-value checks and sale-timing comparisons — where the headline number is rarely the final number.",
    hubHref: "/topics/money",
    /** Matching commerce category hub — kept in sync with /categories/*. */
    categoryHref: "/categories/finance",
    categoryLabel: "Finance & Cards",
    glyph: "wallet",
    categories: [
      "Sale & Card Math",
      "Memberships & Cards",
      "Finance",
      "Cards",
      "Sale",
      "Travel",
      "Food Delivery",
    ],
    keywords: ["bank", "card", "sale", "discount", "cashback", "membership", "prime", "exchange", "gst", "emi", "travel"],
  },
  {
    id: "health",
    label: "Health & Fitness",
    eyebrow: "Read the label, then decide",
    description:
      "Supplement and fitness buying guides built around label data, per-serving cost and what the product actually delivers.",
    hubHref: "/topics/health",
    /** Matching commerce category hub — kept in sync with /categories/*. */
    categoryHref: "/categories/supplements",
    categoryLabel: "Supplements & Fitness",
    glyph: "heart",
    categories: [
      "Health & Supplements",
      "Fitness & Nutrition",
      "Health",
      "Fitness",
      "Supplements",
      "Nutrition",
      "Wellness",
    ],
    keywords: ["protein", "supplement", "nutrition", "wellness", "ayurveda", "health", "gym", "fitness", "vitamin", "recovery"],
  },
  {
    id: "beauty",
    label: "Beauty & Grooming",
    eyebrow: "Find what suits you",
    description:
      "Skincare, haircare and grooming decisions organized by skin concern and routine step rather than by brand discount.",
    hubHref: "/topics/beauty",
    /** Matching commerce category hub — kept in sync with /categories/*. */
    categoryHref: "/categories/beauty",
    categoryLabel: "Beauty & Grooming",
    glyph: "sparkles",
    categories: [
      "Fashion & Beauty",
      "Skincare & Haircare",
      "Beauty & Grooming",
      "Beauty",
      "Grooming",
      "Skincare",
      "Haircare",
      "Makeup",
    ],
    keywords: ["skin", "skincare", "beauty", "hair", "grooming", "makeup", "perfume", "sunscreen", "lip", "serum"],
  },
  {
    id: "fashion",
    label: "Fashion & Style",
    eyebrow: "Fit, use case, then price",
    description:
      "Footwear, clothing and accessory decisions with size and material tradeoffs explained before the offer is shown.",
    hubHref: "/topics/fashion",
    /** Matching commerce category hub — kept in sync with /categories/*. */
    categoryHref: "/categories/fashion",
    categoryLabel: "Fashion",
    glyph: "shirt",
    categories: [
      "Fashion & Activewear",
      "Fashion & Accessories",
      "Fashion",
      "Footwear",
      "Clothing",
      "Accessories",
    ],
    keywords: ["fashion", "footwear", "shoes", "denim", " clothing", "jewelry", "watch", "activewear", "style", "bag"],
  },
];

export const TOPIC_BY_ID: Record<TopicId, TopicDefinition> = Object.fromEntries(
  TOPICS.map((topic) => [topic.id, topic]),
) as Record<TopicId, TopicDefinition>;

export function isTopicId(value: string): value is TopicId {
  return Object.prototype.hasOwnProperty.call(TOPIC_BY_ID, value);
}

/** Exact first, then keyword fallback (longest keyword wins to avoid ties). */
export function classifyCategory(category: string | null | undefined): TopicId | null {
  if (!category) return null;
  const normalized = category.trim().toLowerCase();
  if (!normalized) return null;

  for (const topic of TOPICS) {
    if (topic.categories.some((candidate) => candidate.trim().toLowerCase() === normalized)) {
      return topic.id;
    }
  }

  let best: { id: TopicId; length: number } | null = null;
  for (const topic of TOPICS) {
    for (const keyword of topic.keywords) {
      const needle = keyword.trim().toLowerCase();
      if (needle && normalized.includes(needle) && (!best || needle.length > best.length)) {
        best = { id: topic.id, length: needle.length };
      }
    }
  }
  return best?.id ?? null;
}

/** Used for DB editorial rows, which have no category column. */
export function classifyText(text: string | null | undefined): TopicId | null {
  if (!text) return null;
  const normalized = text.toLowerCase();
  let best: { id: TopicId; length: number } | null = null;
  for (const topic of TOPICS) {
    for (const keyword of [...topic.categories, ...topic.keywords]) {
      const needle = keyword.trim().toLowerCase();
      if (needle.length >= 4 && normalized.includes(needle) && (!best || needle.length > best.length)) {
        best = { id: topic.id, length: needle.length };
      }
    }
  }
  return best?.id ?? null;
}

/** The other topics — the sibling set used by related-content blocks. */
export function siblingTopicIds(id: TopicId): TopicId[] {
  return TOPICS.filter((topic) => topic.id !== id).map((topic) => topic.id);
}

export interface DiscoverableContent {
  id: string;
  topicId: TopicId;
  contentType: EditorialType;
  title: string;
  summary: string;
  href: string;
  /** Editorial hero image, when one exists. Guides may fall back to generated art. */
  heroImage?: string | null;
  updatedAt: string | null;
  authorName: string | null;
  /** Owner-curated priority (1-10). Default 5 when not explicitly set. */
  priority: number;
  /** True only when the page actually publishes its research method. */
  hasMethod: boolean;
  hasFaq: boolean;
}

/** Whole days since an ISO date; null when absent or unparseable. */
export function freshnessDays(iso: string | null | undefined, now: Date = new Date()): number | null {
  if (!iso) return null;
  const parsed = new Date(iso).getTime();
  if (!Number.isFinite(parsed)) return null;
  return Math.max(0, Math.floor((now.getTime() - parsed) / 86_400_000));
}

const TYPE_WEIGHT: Record<EditorialType, number> = {
  comparison: 4,
  guide: 3,
  review: 2,
  collection: 1,
};

/**
 * Presentation score only. It never changes what is published — it decides
 * which already-published pieces get the limited editorial slots on the
 * homepage. Comparisons lead because they are the core decision format.
 */
export function scoreContent(item: DiscoverableContent, now: Date = new Date()): number {
  let score = TYPE_WEIGHT[item.contentType] ?? 1;
  score += Math.min(10, Math.max(1, item.priority || 5)) / 2;
  if (item.hasMethod) score += 1.5;
  if (item.hasFaq) score += 1;

  const days = freshnessDays(item.updatedAt, now);
  if (days !== null) {
    if (days <= 90) score += 2;
    else if (days <= 180) score += 1;
    else if (days > 365) score -= 1;
  }
  return score;
}

export interface TopicSpotlight {
  topic: TopicDefinition;
  items: DiscoverableContent[];
  score: number;
  total: number;
}

/**
 * Group content into topics, rank within each topic, then rank the topics.
 * Topics with no content are omitted so the homepage never shows an empty tab.
 */
export function buildTopicSpotlights(
  items: DiscoverableContent[],
  options: { limit?: number; perTopic?: number; now?: Date } = {},
): TopicSpotlight[] {
  const limit = options.limit ?? TOPICS.length;
  const perTopic = options.perTopic ?? 3;
  const now = options.now ?? new Date();

  const grouped = new Map<TopicId, { item: DiscoverableContent; score: number }[]>();
  for (const item of items) {
    const bucket = grouped.get(item.topicId) ?? [];
    bucket.push({ item, score: scoreContent(item, now) });
    grouped.set(item.topicId, bucket);
  }

  const spotlights: TopicSpotlight[] = [];
  for (const topic of TOPICS) {
    const bucket = grouped.get(topic.id);
    if (!bucket || bucket.length === 0) continue;
    bucket.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));
    const top = bucket.slice(0, perTopic);
    spotlights.push({
      topic,
      items: top.map((entry) => entry.item),
      score: top.reduce((sum, entry) => sum + entry.score, 0),
      total: bucket.length,
    });
  }

  const order = new Map(TOPICS.map((topic, index) => [topic.id, index]));
  spotlights.sort(
    (a, b) => b.score - a.score || (order.get(a.topic.id) ?? 99) - (order.get(b.topic.id) ?? 99),
  );
  return spotlights.slice(0, limit);
}
