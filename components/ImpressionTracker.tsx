"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function ImpressionTracker({
  couponId,
  merchantId,
  pageType,
  position,
  pageId,
  sponsored,
}: {
  couponId: string;
  merchantId: string;
  pageType: string;
  position: number;
  pageId?: string;
  sponsored?: boolean;
}) {
  useEffect(() => {
    track("coupon_impression", {
      coupon_id: couponId,
      merchant_id: merchantId,
      page_type: pageType,
      position,
      page_id: pageId,
      sponsored: sponsored ?? false,
    });
  }, [couponId, merchantId, pageType, position, pageId, sponsored]);

  return null;
}
