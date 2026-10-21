"use client";

import type { ImpressionPageType } from "@/lib/analytics";
import { ImpressionTracker } from "./ImpressionTracker";

/** Client island so the (server) card can report real impressions. */
export function CardImpressions(props: {
  couponId: string;
  merchantId: string;
  pageType: ImpressionPageType;
  position: number;
  listId?: string;
}) {
  return <ImpressionTracker {...props} listId={props.listId} />;
}
