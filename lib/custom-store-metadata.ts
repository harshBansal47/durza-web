import type { Metadata } from "next";
import { api } from "@/lib/api";

/**
 * Phase 1 T10 — shared noindex guard for custom store pages.
 *
 * Custom pages bypass the generic template's thin-page rule. A page with no
 * live offers and no documented standalone tool gets `noindex,follow` while
 * staying fully accessible. API failures keep the base metadata (never confuse
 * "could not check" with "thin"). Substantive tool pages keep their index rule.
 */
const SUBSTANTIVE_TOOL_SLUGS = new Set(["firstcry", "havells"]);

export async function customStoreMetadata(
  slug: string,
  base: Metadata,
): Promise<Metadata> {
  if (SUBSTANTIVE_TOOL_SLUGS.has(slug)) return base;
  try {
    const store = await api.getStoreBySlug(slug);
    if (!store) return { ...base, robots: { index: false, follow: true } };
    const offers = await api.listCoupons({ store_id: store.id, active_only: true, limit: 1 });
    if (offers.total === 0) return { ...base, robots: { index: false, follow: true } };
  } catch {
    // Keep base metadata — an API outage must not silently deindex a page.
  }
  return base;
}
