import { resilient } from "@/lib/api";
import type { Ad, AdPosition } from "@/lib/types";

/**
 * The live ad for a slot, or null. Never throws: a failing ad request must not
 * take a page down, and no ad is always an acceptable outcome. The backend only
 * returns ads that are switched on and inside their booked window.
 */
export async function getSponsored(position: AdPosition): Promise<Ad | null> {
  const result = await resilient.listAds({ position, limit: 1 });
  return result.items[0] ?? null;
}
