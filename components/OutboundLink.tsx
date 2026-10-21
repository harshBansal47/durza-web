"use client";

import { useCallback } from "react";
import { api } from "@/lib/api";
import { rememberGo } from "@/lib/lastGo";
import { track } from "@/lib/analytics";
import { markRevealed } from "@/lib/deviceState";
import { recordCouponClick } from "@/lib/personalization";
import type { CouponPublic } from "@/lib/types";

interface OutboundLinkProps {
  /** The coupon being clicked through. */
  coupon: CouponPublic;
  /** Human-readable store name (for the "last go" entry). */
  storeName: string;
  /** Which surface sent the click. */
  src: string;
  /** Optional editorial content reference. */
  contentRef?: string;
  /** className for the <a>. */
  className?: string;
  /** Children (link text). */
  children: React.ReactNode;
}

/**
 * Tracked outbound link: an `<a>` to the backend's /go redirect that also
 * remembers the click for the "Did it work?" prompt.
 *
 * The href MUST come from `api.goUrl`: /go lives on the API origin, not on this
 * site, so a relative `/coupons/:id/go` here would 404. It never calls
 * `preventDefault()`, so navigation always proceeds.
 */
export default function OutboundLink({
  coupon,
  storeName,
  src,
  contentRef,
  className = "",
  children,
}: OutboundLinkProps) {
  const onClick = useCallback(() => {
    rememberGo({
      couponId: coupon.id,
      title: coupon.title,
      storeName,
      hadCode: Boolean(coupon.code),
    });
    markRevealed(coupon.id);
    track("coupon_click", { coupon_id: coupon.id, src, content_ref: contentRef });
    recordCouponClick(coupon.id);
  }, [coupon, storeName, src]);

  const href = api.goUrl(coupon.id, src, contentRef);

  return (
    <a
      href={href}
      onClick={onClick}
      rel="sponsored nofollow noopener"
      className={className}
    >
      {children}
    </a>
  );
}