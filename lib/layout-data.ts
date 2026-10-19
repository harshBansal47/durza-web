import "server-only";
import { unstable_cache } from "next/cache";
import { resilient } from "@/lib/api";

/**
 * Whether any comparison has been published — the nav and footer hide their
 * Compare links until one exists.
 *
 * Cached for an hour because the answer changes only when an editor publishes,
 * and awaited before render because two nav links depend on it: behind a
 * Suspense boundary the whole nav would visibly jump once it resolved.
 */
export const getHasComparisons = unstable_cache(
  async (): Promise<boolean> => {
    const page = await resilient.listEditorial({ content_type: "comparison", limit: 1 });
    return (page.total ?? page.items.length) > 0;
  },
  ["layout:has-comparisons"],
  { revalidate: 3600, tags: ["editorial"] },
);
