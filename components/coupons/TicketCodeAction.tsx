"use client";

import CodeRevealButton from "@/components/CodeRevealButton";
import { track } from "@/lib/analytics";
import { markRevealed } from "@/lib/deviceState";
import { rememberGo } from "@/lib/lastGo";
import { api } from "@/lib/api";
import type { CouponPublic } from "@/lib/types";

/**
 * The ticket's reveal action.
 *
 * It reuses the existing `CodeRevealButton` so the reveal flow — copy the
 * code, open the store through the tracked redirect, confirm with a check
 * icon — behaves exactly as it does on the offer page, including the
 * `coupon_reveal` analytics event and the device-local "revealed" flag that
 * unlocks the "did it work?" prompt.
 */
export default function TicketCodeAction({
  coupon,
  storeName = "",
  src = "coupon-page",
}: {
  coupon: CouponPublic;
  storeName?: string;
  /** Where the click happened; the backend files anything unknown as "unknown". */
  src?: string;
}) {
  if (!coupon.code) return null;

  return (
    <CodeRevealButton
      code={coupon.code}
      url={api.goUrl(coupon.id, src)}
      label="Reveal code"
      showCode={false}
      className="w-full justify-center"
      onReveal={() => {
        markRevealed(coupon.id);
        track("coupon_reveal", { coupon_id: coupon.id });
        rememberGo({
          couponId: coupon.id,
          title: coupon.title,
          storeName,
          hadCode: true,
        });
      }}
    />
  );
}
