import type { CouponPublic } from "./types";

/**
 * Render-time normalization for coupon/feed text from external sources.
 * Never mutates DB data; use on values before display or dedupe keying.
 */
export function sanitizeFeedText(value: string | null | undefined): string | undefined {
  if (value == null) return undefined;
  let text = String(value);
  if (!text) return undefined;

  // Common mojibake / Windows-1252 sequences seen in feed text.
  text = text
    .replace(/â‚¹/g, "₹")
    .replace(/â€™|â€˜/g, "'")
    .replace(/â€œ|â€�|â€\u009d/g, '"')
    .replace(/â€“|â€”/g, "-")
    .replace(/Â(?=\s|₹|$)/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/\r\n?/g, "\n");

  // Collapse excessive whitespace/newlines into readable single spacing.
  text = text.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n");
  text = text.replace(/\s+/g, " ").trim();

  // Strip obvious scraped T&C boilerplate artifacts when they dominate the tail.
  text = text.replace(/\s*T&C\s*[-:–].*$/i, (m) => (m.length > 120 ? "" : m)).trim();
  text = text.replace(/\s*More information\s*[-:–].*$/i, (m) => (m.length > 120 ? "" : m)).trim();

  return text || undefined;
}

export function sanitizeCouponForDisplay<T extends Partial<CouponPublic>>(coupon: T): T {
  const title = sanitizeFeedText(coupon.title) ?? coupon.title;
  const description = sanitizeFeedText(coupon.description ?? undefined);
  const code = typeof coupon.code === "string" ? coupon.code.trim() || null : coupon.code;
  const terms = sanitizeFeedText((coupon as any).terms ?? undefined);
  const restrictions =
    coupon.restrictions && typeof coupon.restrictions === "object"
      ? Object.fromEntries(
          Object.entries(coupon.restrictions).map(([k, v]) => [k, typeof v === "string" ? sanitizeFeedText(v) ?? v : v]),
        )
      : coupon.restrictions;
  return {
    ...coupon,
    title,
    description: description ?? null,
    code: code ?? null,
    ...(terms !== undefined ? { terms } : {}),
    ...(restrictions ? { restrictions } : {}),
  } as T;
}

function norm(v: unknown): string {
  return String(v ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function minSpendKey(coupon: Partial<CouponPublic>): string {
  const r: any = coupon.restrictions ?? {};
  const candidates = [
    r.min_spend,
    r.minSpend,
    r.minimum_spend,
    r.minimumSpend,
    r.min_cart_value,
    r.minCartValue,
    r.min_order,
    r.minOrder,
    r.min_order_value,
    r.minOrderValue,
  ];
  for (const c of candidates) {
    if (c == null || c === "") continue;
    return norm(c).replace(/[^0-9.]/g, "") || norm(c);
  }
  return "";
}

function discountKey(coupon: Partial<CouponPublic>): string {
  const r: any = coupon.restrictions ?? {};
  const parts = [
    coupon.discount_type,
    coupon.discount_value,
    r.discount_percent,
    r.discountPercent,
    r.flat_discount,
    r.flatDiscount,
    r.cashback,
    r.max_discount,
    r.maxDiscount,
    r.value,
  ]
    .map(norm)
    .filter(Boolean);
  return parts.join("|");
}

/**
 * Conservative dedupe: only collapse rows that look like the same offer
 * (same store, normalized code/state, normalized discount, min spend, and title).
 * Keeps first occurrence to preserve ordering.
 */
export function dedupeCoupons<T extends CouponPublic>(coupons: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const coupon of coupons) {
    const code = norm(coupon.code).replace(/\s+/g, "");
    const key = [
      coupon.store_id || "",
      code || (coupon.discount_type ? `deal:${norm(coupon.discount_type)}` : "deal"),
      discountKey(coupon),
      minSpendKey(coupon),
      norm(sanitizeFeedText(coupon.title) ?? coupon.title),
    ].join("::");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(coupon);
  }
  return out;
}
