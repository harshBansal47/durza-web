"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Check, Loader2, Plus } from "lucide-react";
import { track } from "@/lib/analytics";
import { isStoreFollowed, setFollowedStore } from "@/lib/personalization";
import { useSession } from "@/components/session/SessionProvider";
import { useTypedToast } from "@/components/ui/Toast";
import { setSavedStoreAction } from "@/app/account/actions";

/**
 * Follow a store.
 *
 * "Follow" alone tells a first-time visitor nothing, so this says what it does
 * (a line under the button), shows that something is happening (a spinner while
 * the request is in flight), confirms when it worked (the button settles into
 * "Following" with a brief highlight, plus a toast that repeats the promise),
 * and says plainly if it did not.
 *
 * Signed out, it does not bounce the visitor to a login page: it takes them to
 * the sign-up box on this page (`#track-deal`), which asks for an email and a
 * code and then follows the store in the same step.
 */
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
  const router = useRouter();
  const { success } = useTypedToast();
  const [error, setError] = useState<string | null>(null);
  const [justFollowed, setJustFollowed] = useState(false);
  const [isPending, startTransition] = useTransition();
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    },
    [],
  );

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

  function goToSignUp() {
    const box = document.getElementById("track-deal");
    if (box) {
      box.scrollIntoView({ behavior: "smooth", block: "center" });
      // Focus after the scroll starts so the keyboard lands where the eyes do.
      window.setTimeout(() => {
        box.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
      }, 350);
      return;
    }
    const next = encodeURIComponent(window.location.pathname + window.location.search);
    router.push(`/account/login?next=${next}`);
  }

  function click() {
    if (isSignedIn === false) {
      goToSignUp();
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
        if (result.message) success(result.message);
        if (next) {
          setJustFollowed(true);
          if (settleTimer.current) clearTimeout(settleTimer.current);
          settleTimer.current = setTimeout(() => setJustFollowed(false), 1400);
        }
      } catch {
        setFollowedStore(slug, wasOn);
        setOn(wasOn);
        setError("Could not update this followed store. Please try again.");
      }
    });
  }

  const idle = on ? "Following" : "Follow";
  const highlight = justFollowed ? "scale-105 ring-4 ring-accent/30" : "";

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={click}
        disabled={isSignedIn === null || isPending}
        aria-pressed={on}
        aria-busy={isPending}
        aria-label={
          isPending
            ? `Updating ${name}`
            : on
              ? `Stop following ${name}`
              : `Follow ${name} for new offers`
        }
        className={
          compact
            ? `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 active:scale-90 ${highlight} ${
                on ? "bg-ink text-white" : "border border-ledger-line bg-white text-ink hover:border-ink"
              }`
            : `btn shrink-0 gap-1.5 transition-all duration-300 ${highlight} ${
                on ? "bg-accent text-white hover:bg-accent/90" : "bg-white text-ink hover:bg-white/90"
              }`
        }
      >
        {isPending ? (
          <Loader2 aria-hidden="true" className="h-3.5 w-3.5 animate-spin" strokeWidth={2.25} />
        ) : on ? (
          <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} />
        ) : (
          <Plus aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
        )}
        {isPending ? (on ? "Following" : "Stopping") : idle}
      </button>
      {!compact && (
        <span className="max-w-56 text-xs text-ink-soft">
          {on ? `We'll email you when ${name} adds an offer.` : `Get an email when ${name} adds an offer.`}
        </span>
      )}
      {error && (
        <span role="alert" className="max-w-56 text-xs text-rust">
          {error}
        </span>
      )}
    </div>
  );
}
