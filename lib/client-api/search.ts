import { api, type CouponListParams, type StoreListParams } from "@/lib/api";

/** Browser-facing search services. Components never construct API URLs. */
export const searchApi = {
  autocomplete: (query: string, opts?: { limit?: number; signal?: AbortSignal }) =>
    api.autocomplete(query, opts),
  listStores: (params: StoreListParams = {}) => api.listStores(params),
  listCoupons: (params: CouponListParams = {}) => api.listCoupons(params),
};
