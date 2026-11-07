/**
 * Links that send a shopper to a store.
 *
 * Every outbound store link on the site goes through `/go/{store-slug}`. That path names
 * nothing about how the click is earned: the server chooses the destination (see
 * `app/go/[slug]/route.ts`), logs the click against the page or channel in `src`, and the
 * browser only ever sees our own address and, after the redirect, the store.
 */

/** Where a click came from. The backend stores it as the click's source tag. */
export type GoSource =
  | "store-page"
  | "coupon-page"
  | "category"
  | "homepage"
  | "search"
  | "site"
  | "telegram";

/**
 * rel for any link that can earn us money: `sponsored` is Google's marker for paid or
 * affiliate links, `nofollow` keeps ranking signals from leaking, and noopener/noreferrer
 * protect the page that opened it.
 */
export const GO_REL = "sponsored nofollow noopener noreferrer";

/** Store slugs are lowercase words and digits joined by hyphens; allow a little more. */
const STORE_SLUG = /^[A-Za-z0-9][A-Za-z0-9._-]{0,119}$/;

export function isValidStoreSlug(slug: string): boolean {
  return STORE_SLUG.test(slug);
}

/** The neutral redirect path for a store, tagged with where the click came from. */
export function storeGoHref(slug: string, src: GoSource = "site"): string {
  return `/go/${encodeURIComponent(slug)}?src=${encodeURIComponent(src)}`;
}
