"use client";

import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { track } from "@/lib/analytics";
import { isStoreFollowed, toggleFollowedStore } from "@/lib/personalization";

let sessionPromise: Promise<boolean> | null = null;
function signedIn(): Promise<boolean> {
  if (!sessionPromise) {
    sessionPromise = fetch("/api/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => Boolean(d?.signedIn))
      .catch(() => false);
  }
  return sessionPromise;
}

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
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    signedIn().then((v) => {
      if (!cancelled) setIsSignedIn(v);
    });
    return () => {
      cancelled = true;
    };
  }, []);

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
          : `btn shrink-0 ${on ? "btn-primary" : "btn-outline"}`
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
