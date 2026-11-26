import { z } from "zod";

/**
 * Content system — Phase 1 data layer: Zod schemas.
 *
 * Single source of truth for the JSON content document shape served by
 * `GET /api/v1/editorial/{kind}/{slug}` and used by the content data layer
 * (`lib/content`). Block types mirror the editorial block catalog; unknown
 * blocks are rejected here and skipped/logged by the reader in production.
 */

export const contentKinds = ["guide", "review", "comparison", "collection"] as const;
export type ContentKind = (typeof contentKinds)[number];

export const contentStatuses = ["draft", "in_review", "published", "archived"] as const;
export type ContentStatus = (typeof contentStatuses)[number];

export const verdictVariants = ["answer10s", "quick"] as const;
export type VerdictVariant = (typeof verdictVariants)[number];

export const calloutTones = ["info", "caution", "verified", "disclosure"] as const;
export type CalloutTone = (typeof calloutTones)[number];

export const statusLedgerStatuses = [
  "confirmed",
  "expected",
  "unconfirmed",
  "reveal_only",
  "not_reverified",
] as const;
export type StatusLedgerStatus = (typeof statusLedgerStatuses)[number];

export const ctaSchema = z.object({
  label: z.string().min(1).max(160),
  href: z.string().min(1).max(1000),
});

export const inlineTextSchema = z.string().max(6000);

export const audienceBlockSchema = z
  .object({
    type: z.literal("audience"),
    forWho: z.array(z.string()).default([]),
    skipIf: z.array(z.string()).optional().default([]),
  })
  .passthrough();

export const verdictBlockSchema = z
  .object({
    type: z.literal("verdict"),
    variant: z.enum(verdictVariants).optional(),
    heading: z.string().optional(),
    body: z.string().optional(),
    ctas: z.array(ctaSchema).optional(),
  })
  .passthrough();

export const proseBlockSchema = z
  .object({
    type: z.literal("prose"),
    id: z.string().optional(),
    heading: z.string().optional(),
    level: z.enum(["2", "3"]).optional(),
    paragraphs: z.array(z.string()).default([]),
    badge: z.string().optional(),
  })
  .passthrough();

export const bulletsBlockSchema = z
  .object({
    type: z.literal("bullets"),
    heading: z.string().optional(),
    items: z.array(z.string()).default([]),
  })
  .passthrough();

export const calloutBlockSchema = z
  .object({
    type: z.literal("callout"),
    tone: z.enum(calloutTones).optional(),
    title: z.string().optional(),
    body: z.string().optional(),
  })
  .passthrough();

export const tableBlockSchema = z
  .object({
    type: z.literal("table"),
    id: z.string().optional(),
    caption: z.string().optional(),
    columns: z.array(z.string()).default([]),
    rows: z.array(z.array(z.string())).default([]),
  })
  .passthrough();

export const keyValueBlockSchema = z
  .object({
    type: z.literal("keyValue"),
    items: z.array(z.object({ label: z.string(), value: z.string() })),
  })
  .passthrough();

export const prosConsBlockSchema = z
  .object({
    type: z.literal("prosCons"),
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
  })
  .passthrough();

export const stepsBlockSchema = z
  .object({
    type: z.literal("steps"),
    heading: z.string().optional(),
    items: z.array(
      z.object({ title: z.string().optional(), body: z.string().optional() }),
    ),
  })
  .passthrough();

export const statusLedgerBlockSchema = z
  .object({
    type: z.literal("statusLedger"),
    status: z.enum(statusLedgerStatuses).optional(),
    rows: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        status: z.string().optional(),
        source: z.string().optional(),
      }),
    ),
  })
  .passthrough();

export const findingsBlockSchema = z
  .object({
    type: z.literal("findings"),
    heading: z.string().optional(),
    items: z.array(
      z.object({ claim: z.string(), detail: z.string(), sourceUrl: z.string().optional() }),
    ),
  })
  .passthrough();

export const offerCardsBlockSchema = z
  .object({
    type: z.literal("offerCards"),
    heading: z.string().optional(),
    items: z.array(
      z.object({
        store: z.string(),
        points: z.array(z.string()),
        ctaLabel: z.string(),
        href: z.string(),
      }),
    ),
  })
  .passthrough();

export const productLinksBlockSchema = z
  .object({
    type: z.literal("productLinks"),
    items: z.array(
      z.object({ label: z.string(), href: z.string(), note: z.string().optional() }),
    ),
  })
  .passthrough();

export const verificationBlockSchema = z
  .object({
    type: z.literal("verification"),
    verified: z.array(z.unknown()).default([]),
    notVerified: z.array(z.unknown()).default([]),
    checkedAt: z.string().optional(),
  })
  .passthrough();

export const faqBlockSchema = z
  .object({
    type: z.literal("faq"),
    items: z.array(
      z.object({
        q: z.string(),
        a: z.string(),
        sort_order: z.number().optional(),
      }),
    ),
  })
  .passthrough();

export const sourcesBlockSchema = z
  .object({
    type: z.literal("sources"),
    items: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
        checkedAt: z.string().optional(),
        type: z.string().optional(),
      }),
    ),
  })
  .passthrough();

export const relatedBlockSchema = z
  .object({
    type: z.literal("related"),
    groups: z.array(
      z.object({
        label: z.string(),
        links: z.array(z.object({ title: z.string(), href: z.string() })),
      }),
    ),
  })
  .passthrough();

const blocks = [
  audienceBlockSchema,
  verdictBlockSchema,
  proseBlockSchema,
  bulletsBlockSchema,
  calloutBlockSchema,
  tableBlockSchema,
  keyValueBlockSchema,
  prosConsBlockSchema,
  stepsBlockSchema,
  statusLedgerBlockSchema,
  findingsBlockSchema,
  offerCardsBlockSchema,
  productLinksBlockSchema,
  verificationBlockSchema,
  faqBlockSchema,
  sourcesBlockSchema,
  relatedBlockSchema,
];

export const contentBlockSchema = z.union(blocks);

export const contentPageSchema = z
  .object({
    kind: z.enum(contentKinds),
    slug: z.string().min(1).max(260),
    title: z.string().min(1).max(240),
    description: z.string().default(""),
    status: z.enum(contentStatuses),
    content_blocks: z.array(contentBlockSchema).default([]),
    structured_data: z.record(z.string(), z.unknown()).default({}),
    hero_image_url: z.string().nullable().optional(),
    author_name: z.string().nullable().optional(),
    seo_title: z.string().nullable().optional(),
    meta_description: z.string().nullable().optional(),
    canonical_url: z.string().nullable().optional(),
    is_indexable: z.boolean().optional(),
    is_featured: z.boolean().optional(),
    published_at: z.string().nullable().optional(),
    updated_at: z.string().optional(),
    needs_review: z.boolean().optional(),
    facts_checked_at: z.string().nullable().optional(),
  })
  .passthrough();

export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type ContentPage = z.infer<typeof contentPageSchema>;
export type ContentBlockInput = z.input<typeof contentBlockSchema>;
export type ContentPageInput = z.input<typeof contentPageSchema>;
