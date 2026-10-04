"use client";

import { api } from "./api";

export type AnalyticsEvent =
  | "page_view"
  | "search"
  | "coupon_impression"
  | "coupon_click"
  | "coupon_reveal"
  | "copy_code"
  | "save_coupon"
  | "unsave_coupon"
  | "follow_store"
  | "unfollow_store"
  | "merchant_click"
  | "filter_change"
  | "verify_vote";

/**
 * Single frontend event bus. Coupon impressions/clicks flow into the backend
 * monetization architecture (analytics/impression + /go redirect); everything
 * else is fire-and-forget via sendBeacon so tracking never blocks interaction.
 */
export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  try {
    if (event === "coupon_impression") {
      const { coupon_id, merchant_id, page_type, position, page_id, sponsored } = payload as {
        coupon_id: string;
        merchant_id: string;
        page_type: string;
        position: number;
        page_id?: string;
        sponsored?: boolean;
      };
      if (coupon_id && merchant_id) {
        api
          .recordImpression({
            coupon_id,
            merchant_id,
            page_type: String(page_type ?? "unknown"),
            position: Number(position ?? 0),
            page_id: page_id as string | undefined,
            sponsored: Boolean(sponsored ?? false),
            source: "web",
          })
          .catch(() => {});
      }
      return;
    }
    const url = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/analytics/event`
      : null;
    const body = JSON.stringify({ event, ...payload, ts: new Date().toISOString() });
    if (url && navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
    }
  } catch {
    /* analytics must never break the product */
  }
}
