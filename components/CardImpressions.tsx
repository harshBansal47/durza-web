"use client";

import { ImpressionTracker } from "./ImpressionTracker";

/** Client island so the (server) card can report real impressions. */
export function CardImpressions(props: {
  couponId: string;
  merchantId: string;
  pageType: string;
  position: number;
}) {
  return <ImpressionTracker {...props} />;
}
