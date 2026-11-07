/**
 * Does a store page have enough on it to belong in a search index?
 *
 * One rule, used by both the page's robots tag and the sitemap, so they cannot disagree:
 * submitting a URL in the sitemap that the page itself marks `noindex` is reported by Search
 * Console as an error and wastes crawl budget. A store qualifies when it has at least one live
 * offer or someone has written about it; a store with neither is a page with nothing to say.
 */
export function isIndexableStore(
  offerCount: number | null | undefined,
  description: string | null | undefined,
): boolean {
  return (offerCount ?? 0) > 0 || Boolean(description?.trim());
}
