"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { track } from "@/lib/analytics";
import { isStoreFollowed, toggleFollowedStore } from "@/lib/personalization";
import { useSession } from "@/components/session/SessionProvider";

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
  // null while the shared session check is in flight. `click` only diverts to
  // the login page on an explicit `false`, so an unknown state never bounces a
  // signed-in visitor out of the page.
  const { session } = useSession();
  const isSignedIn = session.status === "loading" ? null : session.status === "authenticated";

  function click() {
    if (isSignedIn === false) {
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.assign(`/account/login?next=${next}`);
      return;
    }
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
          ? `rounded-full px-3 py-1.5 text-xs font-semibold transition-all active:scale-90 ${
              on ? "bg-ink text-white" : "border border-ledger-line bg-white text-ink hover:border-ink"
            }`
          : `btn shrink-0 ${on ? "bg-accent text-white hover:bg-accent/90" : "bg-white text-ink hover:bg-white/90"}`
      }
      title={isSignedIn === false ? "Sign in to follow" : undefined}
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
