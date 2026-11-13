/**
 * One ad-click, one traceable row.
 *
 * Every outbound click goes through the redirect, which attaches a `click_id`
 * and records it. The redirect needs two query params to reconstruct where
 * the click came from:
 *
 *   src          — the page / placement the click fired from (e.g. "homepage")
 *   content_ref  — a compact, backend-safe id; the redirect whitelist is
 *                  `[a-z0-9:_-]{1,80}`, so the separator is ":" and every
 *                  segment is lowercased and stripped of anything else.
 *
 * `content_ref` is constructed on every click automatically, so nothing
 * leaves the site untracked. `src` always travels too; legacy callers that
 * only set `src` get a `content_ref` for free.
 */

const COUPON_ID_LENGTH = 12;

/** Backend-safe segment: lowercase letters/digits + `_` and `-`, max 20. */
export const cleanSegment = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9_-]/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "").slice(0, 20);

const shortCouponId = (id: string): string =>
  id.replace(/-/g, "").slice(0, COUPON_ID_LENGTH).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

/** Builds the content_ref for a click on this page — always backend-safe. */
export function buildContentRef(
  page: string,
  placement: string | undefined,
  couponId: string,
  utmSource?: string | null,
): string {
  const parts = [cleanSegment(page), placement ? cleanSegment(placement) : "", shortCouponId(couponId)];
  if (utmSource) parts.push(cleanSegment(utmSource));
  return parts.filter((part) => part.length > 0).join(":").slice(0, 78);
}

/**
 * Appends `utm_source` onto a redirect URL when present, so the advertising
 * origin (instagram / telegram / whatsapp / facebook) lands on the click row.
 * Does nothing for same-origin paths that never leave the site without a
 * referrer.
 */
export function withTrafficSource(url: string, utmSource: string | null | undefined): string {
  if (!utmSource) return url;
  try {
    const u = new URL(url, "https://durza.in");
    const src = u.searchParams.get("src") ?? "click";
    u.searchParams.set("src", `${src}:${utmSource.slice(0, 30)}`.slice(0, 40));
    return u.pathname + u.search;
  } catch {
    return url;
  }
}


/** Reads `utm_source` from a page's `location.search` (or any query string). */
export function trafficSourceFrom(search: string | null | undefined): string | null {
  if (!search) return null;
  return new URLSearchParams(search).get("utm_source");
}
