import { resilient } from "./api";
import { buildBankGroups, liveBankCount, type BankOfferGroup } from "./bank-offers";
import type { CouponPublic, Store } from "./types";

export interface LiveBankSnapshot {
  groups: BankOfferGroup[];
  liveBanks: number;
  liveOffers: number;
  /** True when the catalogue was reachable and at least one live offer was read. */
  catalogueLive: boolean;
}

/**
 * Server-side fetch of the live catalogue and bank matching.
 *
 * Used by /bank-offers and the bank-offer buying guides so every number shown
 * on the page is read from Durza's own catalogue at request time — never from
 * hardcoded copy. Degrades honestly to empty groups when the API is
 * unreachable (the guides then show a "catalogue unavailable" note rather
 * than a fabricated list).
 */
export async function fetchLiveBankSnapshot(): Promise<LiveBankSnapshot> {
  try {
    const coupons: CouponPublic[] = [];
    for (let page = 0; page < 3; page++) {
      const result = await resilient.listCoupons({
        active_only: true,
        skip: page * 100,
        limit: 100,
      });
      coupons.push(...result.items);
      if (result.items.length < 100) break;
    }

    const storesResult = await resilient.listStores({ limit: 100 });
    const groups = buildBankGroups(coupons, storesResult.items as Store[]);
    return {
      groups,
      liveBanks: liveBankCount(groups),
      liveOffers: groups.reduce((sum, group) => sum + group.coupons.length, 0),
      catalogueLive: true,
    };
  } catch {
    return { groups: [], liveBanks: 0, liveOffers: 0, catalogueLive: false };
  }
}
