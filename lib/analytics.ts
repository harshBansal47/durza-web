"use client";

import { api } from "./api";
import { isAnalyticsAllowed } from "./consent";

/**
 * Where an impression happened. These are the ONLY values the backend accepts
 * (`ImpressionType` in app/models/coupon_impression.py); anything else is rejected
 * with a 422 that this client swallows, silently losing the data. Making it a
 * union type turns a wrong value into a compile error instead.
 */
export const IMPRESSION_PAGE_TYPES = [
  "coupon_card",
  "coupon_detail",
  "merchant_page",
  "category_page",
  "search_results",
  "homepage",
  "deals",
  "featured_section",
  "sponsored_section",
] as const;
export type ImpressionPageType = (typeof IMPRESSION_PAGE_TYPES)[number];

export function isImpressionPageType(value: unknown): value is ImpressionPageType {
  return typeof value === "string" && (IMPRESSION_PAGE_TYPES as readonly string[]).includes(value);
}

// One impression per coupon per page view: the same coupon often appears in several rows.
const seenOnThisPage = new Set<string>();
let seenPath = "";

/** Test hook: forget what has been counted. */
export function resetImpressionDedupe() {
  seenOnThisPage.clear();
  seenPath = "";
}

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
  | "verify_vote"
  | "content_view"
  | "scroll"
  | "engaged_time";

/**
 * Single frontend event bus. Coupon impressions/clicks flow into the backend
 * monetization architecture (analytics/impression + /go redirect); everything
 * else is fire-and-forget via sendBeacon so tracking never blocks interaction.
 */
export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  // Consent gate: no tracking until the visitor explicitly accepts.
  // Declined or no-choice both block all analytics.
  if (!isAnalyticsAllowed()) return;
  try {
    if (event === "coupon_impression") {
      const { coupon_id, merchant_id, page_type, position, page_id, list_id, sponsored } = payload as {
        coupon_id: string;
        merchant_id: string;
        page_type: string;
        position: number;
        page_id?: string;
        list_id?: string;
        sponsored?: boolean;
      };
      // The backend requires a known page type and a 1-based position; sending anything
      // else is a guaranteed 422, so do not send it at all.
      const position1 = Math.trunc(Number(position));
      if (!isImpressionPageType(page_type) || !(position1 >= 1 && position1 <= 100)) return;
      const path = typeof window === "undefined" ? "" : window.location.pathname;
      if (path !== seenPath) {
        seenOnThisPage.clear();
        seenPath = path;
      }
      const key = `${coupon_id}|${page_type}`;
      if (seenOnThisPage.has(key)) return;
      seenOnThisPage.add(key);
      if (coupon_id && merchant_id) {
        api
          .recordImpression({
            coupon_id,
            merchant_id,
            page_type,
            position: position1,
            page_id: page_id as string | undefined,
            list_id: list_id as string | undefined,
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
