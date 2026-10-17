"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { track } from "@/lib/analytics";
import { isStoreFollowed, toggleFollowedStore } from "@/lib/personalization";

/**
 * Anonymous store follow. No login wall: follows live in localStorage and
 * become deal-alert candidates later (§24). The account page can adopt
 * these ids on sign-in.
 */
export function StoreFollowButton({
  slug,
  name,
  compact = false,
}: {
  slug: string;
  name: string;
  compact?: boolean;
}) {
  const [on, setOn] = useState<boolean>(() => isStoreFollowed(slug));

  function click() {
    const next = toggleFollowedStore(slug);
    setOn(next);
    track(next ? "follow_store" : "unfollow_store", { store_slug: slug });
  }

  return (
    <button
      type="button"
      onClick={click}
      aria-pressed={on}
      aria-label={on ? `Stop following ${name}` : `Follow ${name} for new deals`}
      className={
        compact
          ? `rounded-full px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
              on ? "bg-ink text-white" : "border border-ledger-line bg-white text-ink hover:border-ink"
            }`
          : `btn shrink-0 ${on ? "btn-primary" : "btn-outline"}`
      }
    >
      {on ? (
        <>
          <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          Following
        </>
      ) : (
        <>
          <Plus aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          Follow
        </>
      )}
    </button>
  );
}
