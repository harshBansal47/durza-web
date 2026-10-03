"use client";

import { useCallback } from "react";
import { rememberGo } from "@/lib/lastGo";
import type { CouponPublic } from "@/lib/types";

interface OutboundLinkProps {
  /** The coupon being clicked through. */
  coupon: CouponPublic;
  /** Human-readable store name (for the "last go" entry). */
  storeName: string;
  /** Which surface sent the click. */
  src: string;
  /** ClassName for the inner <a>. */
  className?: string;
  /** Children (link text). */
  children: React.ReactNode;
}

/**
 * Wrapper around `<Link>` that remembers the "last go" entry for the
 * "Did it work?" prompt.
 *
 * Renders a `<Link>` (internal) or `<a>` (external) that calls
 * `rememberGo()` on click and then lets the navigation proceed normally.
 * Does NOT call `preventDefault()` — the navigation must proceed.
 *
 * Usage:
 *   <OutboundLink
 *     coupon={coupon}
 *     storeName={store.name}
 *     src="coupon-page"
 *     className="btn btn-cta"
 *   >
 *     Get deal
 *   </OutboundLink>
 */
export default function OutboundLink({
  coupon,
  storeName,
  src,
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
  }, [coupon, storeName]);

  const href = `/coupons/${coupon.id}/go${coupon.code ? `?src=${encodeURIComponent(src)}` : `?src=${encodeURIComponent(src)}`}`;

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