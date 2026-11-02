import { api } from "@/lib/api";
import type { CouponPublic } from "@/lib/types";

export type CouponStats = Pick<
  CouponPublic,
  "success_count" | "fail_count" | "last_verified_at" | "success_rate"
>;

export const couponQueryKeys = {
  all: ["coupons"] as const,
  stats: (couponId: string) => ["coupons", "stats", couponId] as const,
};

/** Interactive coupon requests. The API wrapper selects Axios in the browser. */
export const couponApi = {
  getStats: (couponId: string, signal?: AbortSignal) => api.getCouponStats(couponId, { signal }),
  verify: (couponId: string, worked: boolean) => api.verifyCoupon(couponId, worked),
};
