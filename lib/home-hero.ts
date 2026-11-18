/**
 * View-model for the homepage hero. Everything the hero shows is derived from
 * the API rows the page already fetched — a deal exists in the hero only if a
 * coupon exists in the backend, and every date is the backend's own date.
 * Relative labels ("2 hours ago") are computed here, on the server, so the
 * client renders exactly what the server rendered (no hydration drift).
 */
import { api } from "@/lib/api";
import { categoryLabel } from "@/lib/catalog";
import { daysUntil, formatDiscountHeading, formatRelativeTime, stripStorePrefix } from "@/lib/format";
import { getRequirements, requirementLabels, sourceLine } from "@/lib/requirements";
import { formatStoreDisplayName } from "@/lib/store-display";
import { storeAccent, storeLogoUrl } from "@/lib/storeLogos";
import type { CouponPublic } from "@/lib/types";

export interface HeroStore {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  accent: string | null;
  offerCount: number | null;
}

export interface HeroDeal {
  id: string;
  slug: string;
  /** Full row, needed by the "did it work?" widget and the tracked outbound link. */
  coupon: CouponPublic;
  store: HeroStore;
  category: string | null;
  /** Title with a redundant "Store:" prefix removed. */
  title: string;
  code: string | null;
  /** Honest headline, e.g. "20% off", "₹300 off", "Deal". */
  discount: string;
  /** "2 hours ago" — null when the backend has never checked the offer. */
  checkedLabel: string | null;
  /** Whole days until expiry; null when no expiry is stated or it has passed. */
  endsInDays: number | null;
  verified: boolean;
  /** Stated conditions, shortest first, capped for the drawer. */
  terms: string[];
  sourceText: string | null;
  goHref: string;
}

export interface StoreInput {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  website_url: string | null;
  offer_count?: number | null;
}

export function toHeroStore(store: StoreInput): HeroStore {
  return {
    id: store.id,
    name: formatStoreDisplayName({ slug: store.slug, name: store.name }),
    slug: store.slug,
    logoUrl: storeLogoUrl(store),
    accent: storeAccent(store.slug),
    offerCount: store.offer_count ?? null,
  };
}

const MAX_TERMS = 5;
const MAX_TERM_LENGTH = 180;

/** Sentence-split the store's own terms text; never adds a condition the store did not state. */
export function statedTerms(coupon: CouponPublic): string[] {
  const out: string[] = [...requirementLabels(coupon)];
  const text = getRequirements(coupon).terms ?? coupon.description ?? "";
  for (const raw of text.split(/(?<=[.;])\s+/)) {
    const sentence = raw.trim().replace(/[.;]$/, "");
    if (sentence.length < 6) continue;
    const clipped = sentence.length > MAX_TERM_LENGTH ? `${sentence.slice(0, MAX_TERM_LENGTH - 1).trimEnd()}…` : sentence;
    if (!out.some((existing) => existing.toLowerCase() === clipped.toLowerCase())) out.push(clipped);
    if (out.length >= MAX_TERMS) break;
  }
  return out.slice(0, MAX_TERMS);
}

export function toHeroDeal(
  coupon: CouponPublic,
  store: HeroStore,
  categoryNames: ReadonlyMap<string, string>,
  now: Date = new Date(),
): HeroDeal {
  const checkedAt = coupon.last_checked_at ?? coupon.last_verified_at;
  const days = daysUntil(coupon.expires_at, now);
  return {
    id: coupon.id,
    slug: coupon.slug,
    coupon,
    store,
    category: categoryNames.get(coupon.category_id) ?? null,
    title: stripStorePrefix(coupon.title, store.name),
    code: coupon.code,
    discount: formatDiscountHeading(coupon) || "Deal",
    checkedLabel: checkedAt ? formatRelativeTime(checkedAt, now) : null,
    endsInDays: days !== null && days >= 0 ? days : null,
    verified: coupon.verification_status === "verified",
    terms: statedTerms(coupon),
    sourceText: sourceLine(coupon)?.text ?? null,
    goHref: api.goUrl(coupon.id, "homepage"),
  };
}

export function categoryNameMap(categories: readonly { id: string; name?: string | null; slug: string }[]): Map<string, string> {
  return new Map(categories.map((c) => [c.id, categoryLabel(c)]));
}

/**
 * Popular stores = the stores with the most live offers right now (a real count),
 * falling back to API order when counts are absent.
 */
export function popularStores(stores: readonly HeroStore[], limit = 5): HeroStore[] {
  return [...stores]
    .map((store, index) => ({ store, index }))
    .sort((a, b) => (b.store.offerCount ?? 0) - (a.store.offerCount ?? 0) || a.index - b.index)
    .slice(0, limit)
    .map(({ store }) => store);
}

/** "ENDS IN 3D" — straight from the expiry date, never a ticking countdown. */
export function dealEndsLabel(deal: Pick<HeroDeal, "endsInDays">): string | null {
  if (deal.endsInDays === null) return null;
  if (deal.endsInDays === 0) return "ENDS TODAY";
  return `ENDS IN ${deal.endsInDays}D`;
}
