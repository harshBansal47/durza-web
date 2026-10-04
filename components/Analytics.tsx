"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { recordCouponView, recordStoreView } from "@/lib/personalization";

/** Fire-and-forget page_view on every route change. Never blocks render. */
export function AnalyticsPageView() {
  const pathname = usePathname();
  useEffect(() => {
    track("page_view", { path: pathname });
  }, [pathname]);
  return null;
}

/** One-off product event from a server-rendered page (search, filter, …). */
export function TrackEvent({ event, payload }: { event: AnalyticsEvent; payload?: Record<string, unknown> }) {
  useEffect(() => {
    track(event, payload ?? {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
  return null;
}

/**
 * Records taste signals for the personalization foundation. Renders nothing.
 * Server pages drop this in; all storage stays anonymous localStorage.
 */
export function RecordView({ storeSlug, couponId }: { storeSlug?: string; couponId?: string }) {
  useEffect(() => {
    if (storeSlug) recordStoreView(storeSlug);
    if (couponId) recordCouponView(couponId);
  }, [storeSlug, couponId]);
  return null;
}
