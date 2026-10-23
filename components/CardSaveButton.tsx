"use client";

import { useEffect, useState, useTransition } from "react";
import { track } from "@/lib/analytics";
import { getSavedCouponIds, setSavedCoupon } from "@/lib/personalization";
import { useSession } from "@/components/session/SessionProvider";
import { setSavedCouponAction } from "@/app/account/actions";

/** Save requires a signed-in account: anonymous saves can't sync to a profile. */
export function CardSaveButton({ couponId }: { couponId: string }) {
  // Shared with the header; null means the check is still in flight, and the
  // button stays inert until it lands (see `disabled` below).
  const { session } = useSession();
  const isSignedIn = session.status === "loading" ? null : session.status === "authenticated";
  const [saved, setSaved] = useState<boolean>(() =>
    typeof window === "undefined" ? false : getSavedCouponIds().includes(couponId),
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isSignedIn !== true || !getSavedCouponIds().includes(couponId)) return;
    let active = true;
    void setSavedCouponAction(couponId, true)
      .then((result) => {
        if (active && result.error) setError(result.error);
      })
      .catch(() => {
        if (active) setError("Could not sync this saved deal. Please try again.");
      });
    return () => {
      active = false;
    };
  }, [couponId, isSignedIn]);

  function toggle() {
    if (isSignedIn === false) {
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.assign(`/account/login?next=${next}`);
      return;
    }
    if (isSignedIn !== true || isPending) return;

    const wasSaved = saved;
    const next = !wasSaved;
    setSavedCoupon(couponId, next);
    setSaved(next);
    setError(null);
    startTransition(async () => {
      try {
        const result = await setSavedCouponAction(couponId, next);
        if (result.error) {
          setSavedCoupon(couponId, wasSaved);
          setSaved(wasSaved);
          setError(result.error);
          return;
        }
        track(next ? "save_coupon" : "unsave_coupon", { coupon_id: couponId });
      } catch {
        setSavedCoupon(couponId, wasSaved);
        setSaved(wasSaved);
        setError("Could not save this deal. Please try again.");
      }
    });
  }

  // While auth state is unknown, render the button inert to avoid a flash.
  const disabled = isSignedIn === null || isPending;

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-pressed={saved}
        aria-label={saved ? "Remove from saved deals" : "Save this deal"}
        title={isSignedIn === false ? "Sign in to save" : saved ? "Saved" : "Save for later"}
        className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all active:scale-90 ${
          disabled
            ? "border-ledger-line bg-white text-ink-soft opacity-50"
            : saved
              ? "border-rust bg-rust text-white"
              : "border-ledger-line bg-white text-ink-soft hover:border-rust hover:text-rust"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </button>
      {error && (
        <span role="alert" className="max-w-40 text-right text-[10px] text-rust">
          {error}
        </span>
      )}
    </div>
  );
}
