"use client";

import { useEffect, useState, useTransition } from "react";
import { Check, Plus } from "lucide-react";
import { track } from "@/lib/analytics";
import { isStoreFollowed, setFollowedStore } from "@/lib/personalization";
import { useSession } from "@/components/session/SessionProvider";
import { setSavedStoreAction } from "@/app/account/actions";

export function StoreFollowButton({
  storeId,
  slug,
  name,
  compact = false,
}: {
  storeId: string;
  slug: string;
  name: string;
  compact?: boolean;
}) {
  const [on, setOn] = useState<boolean>(() => isStoreFollowed(slug));
  // Keep the control inert until the shared session check completes.
  const { session } = useSession();
  const isSignedIn = session.status === "loading" ? null : session.status === "authenticated";
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isSignedIn !== true || !isStoreFollowed(slug)) return;
    let active = true;
    void setSavedStoreAction(storeId, true)
      .then((result) => {
        if (active && result.error) setError(result.error);
      })
      .catch(() => {
        if (active) setError("Could not sync this followed store. Please try again.");
      });
    return () => {
      active = false;
    };
  }, [isSignedIn, slug, storeId]);

  function click() {
    if (isSignedIn === false) {
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.assign(`/account/login?next=${next}`);
      return;
    }
    if (isSignedIn !== true || isPending) return;

    const wasOn = on;
    const next = !wasOn;
    setFollowedStore(slug, next);
    setOn(next);
    setError(null);
    startTransition(async () => {
      try {
        const result = await setSavedStoreAction(storeId, next);
        if (result.error) {
          setFollowedStore(slug, wasOn);
          setOn(wasOn);
          setError(result.error);
          return;
        }
        track(next ? "follow_store" : "unfollow_store", { store_slug: slug });
      } catch {
        setFollowedStore(slug, wasOn);
        setOn(wasOn);
        setError("Could not update this followed store. Please try again.");
      }
    });
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={click}
        disabled={isSignedIn === null || isPending}
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
      {error && (
        <span role="alert" className="max-w-48 text-xs text-rust">
          {error}
        </span>
      )}
    </div>
  );
}
