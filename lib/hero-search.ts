/**
 * The hero command-search index: pure functions over data already on the page.
 * Nothing here calls the network, so typing is instant and testable. A search the
 * local pool cannot answer falls through to the full /search page.
 */

export type HeroScope = "all" | "code" | "deal" | "store";

export interface SearchableDeal {
  id: string;
  title: string;
  code: string | null;
  category: string | null;
  store: { name: string };
}

export interface SearchableStore {
  slug: string;
  name: string;
}

export type HeroResult<D, S> =
  | { type: "deal"; deal: D }
  | { type: "store"; store: S };

export const SCOPES: { id: HeroScope; label: string }[] = [
  { id: "all", label: "All" },
  { id: "code", label: "Coupon codes" },
  { id: "deal", label: "Deals" },
  { id: "store", label: "Stores" },
];

const MAX_DEALS = 6;
const MAX_STORES = 4;

function includes(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle);
}

function dealMatches(deal: SearchableDeal, q: string): boolean {
  return includes([deal.title, deal.store.name, deal.category ?? "", deal.code ?? ""].join(" "), q);
}

/**
 * Results for a query and scope. With an empty query this returns a small "fresh
 * picks" starter so the dropdown is never blank on focus.
 */
export function buildHeroResults<D extends SearchableDeal, S extends SearchableStore>(
  rawQuery: string,
  scope: HeroScope,
  pool: { deals: readonly D[]; featured: readonly D[]; stores: readonly S[]; popularStores: readonly S[] },
): HeroResult<D, S>[] {
  const q = rawQuery.trim().toLowerCase();
  const out: HeroResult<D, S>[] = [];
  const dealsOf = (list: readonly D[], n: number) => list.slice(0, n).forEach((deal) => out.push({ type: "deal", deal }));

  if (!q) {
    if (scope === "all") {
      dealsOf(pool.featured, 3);
    } else if (scope === "code") {
      dealsOf(pool.deals.filter((d) => d.code), 3);
    } else if (scope === "deal") {
      dealsOf(pool.deals.filter((d) => !d.code), 3);
    } else if (scope === "store") {
      pool.popularStores.slice(0, 3).forEach((store) => out.push({ type: "store", store }));
    }
    return out;
  }

  if (scope === "all" || scope === "code" || scope === "deal") {
    const eligible = pool.deals.filter(
      (d) => (scope === "code" ? Boolean(d.code) : scope === "deal" ? !d.code : true) && dealMatches(d, q),
    );
    dealsOf(eligible, MAX_DEALS);
  }
  if (scope === "all" || scope === "store") {
    pool.stores
      .filter((s) => includes(s.name, q))
      .slice(0, MAX_STORES)
      .forEach((store) => out.push({ type: "store", store }));
  }
  return out;
}

/** Splits `text` around the first case-insensitive match of `query`, for <mark> highlighting. */
export function splitHighlight(text: string, query: string): [string, string, string] {
  const q = query.trim();
  if (!q) return [text, "", ""];
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return [text, "", ""];
  return [text.slice(0, i), text.slice(i, i + q.length), text.slice(i + q.length)];
}
