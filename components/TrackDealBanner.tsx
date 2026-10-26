"use client";

import Link from "next/link";
import { useActionState, useCallback, useEffect, useId, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { Bell, Check, Loader2, Mail } from "lucide-react";
import {
  requestTrackCodeAction,
  setSavedCouponAction,
  setSavedStoreAction,
  trackWithEmailCodeAction,
  trackingStatusAction,
} from "@/app/account/actions";
import type { TrackFlowResult } from "@/app/account/action-result";
import { useSession } from "@/components/session/SessionProvider";
import { useTypedToast } from "@/components/ui/Toast";
import { track } from "@/lib/analytics";
import { setFollowedStore, setSavedCoupon } from "@/lib/personalization";

/** What the visitor is asking us to watch. */
export type TrackTarget =
  | { kind: "store"; id: string; slug: string; name: string }
  | { kind: "coupon"; id: string; title: string; storeName?: string };

/** Matches the API's per-account cooldown between sign-in codes. */
const RESEND_AFTER_SECONDS = 60;

const EMPTY: TrackFlowResult = {};

function copyFor(target: TrackTarget) {
  if (target.kind === "store") {
    return {
      heading: `Never miss a ${target.name} offer`,
      body: `Follow ${target.name} and we'll email you when it adds a new offer.`,
      cta: `Follow ${target.name}`,
      confirm: `Confirm and follow`,
      doneTitle: `You're following ${target.name}`,
      doneBody: "We'll email you when it has a new offer.",
      toast: `Following ${target.name}. We'll email you about new offers.`,
    };
  }
  return {
    heading: "Don't check back. We'll tell you.",
    body: "Track this offer and we'll email you if it's confirmed working, about to end, or stops working.",
    cta: "Track this offer",
    confirm: "Confirm and track",
    doneTitle: "You're tracking this offer",
    doneBody: "We'll email you if it's confirmed working, about to end, or stops working.",
    toast: "Tracking this offer. We'll email you if anything changes.",
  };
}

const FINE_PRINT = "At most one email a day. Unsubscribe any time.";
const FINE_PRINT_NEW = `No password needed: we confirm your email with a 6-digit code. ${FINE_PRINT}`;

const INPUT_CLASS =
  "w-full rounded-xl border border-ledger-line bg-paper-raised py-2.5 pl-10 pr-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft disabled:opacity-60";

function Spinner() {
  return <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" strokeWidth={2.25} />;
}

/**
 * Follow a store / track an offer.
 *
 * Three kinds of visitor, one control:
 *  - signed in: one button; the state (idle, saving, tracking) is always visible;
 *  - signed out: email, then a 6-digit code, right here — no password, no trip
 *    to a login page and back. Confirming the code signs them in *and* starts
 *    tracking, so the first thing they did is the thing that happened;
 *  - already tracking: says so, says what will happen, and offers to stop.
 *
 * Whether the visitor is signed in is learned on the client after the page is
 * showing, so the page itself stays cacheable and nothing waits on it.
 */
export default function TrackDealBanner({ target }: { target: TrackTarget }) {
  const { session, refresh } = useSession();
  const { success, error } = useTypedToast();
  const copy = copyFor(target);
  const [known, setKnown] = useState<{ tracking: boolean; email: string | null } | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (session.status !== "authenticated") return;
    let alive = true;
    void trackingStatusAction(target.kind, target.id).then((status) => {
      if (alive) setKnown({ tracking: status.tracking, email: status.email });
    });
    return () => {
      alive = false;
    };
  }, [session.status, target.kind, target.id]);

  /** Other buttons on the site read this device-local mirror for their first paint. */
  const mirrorLocally = useCallback(
    (on: boolean) => {
      if (target.kind === "store") {
        setFollowedStore(target.slug, on);
        track(on ? "follow_store" : "unfollow_store", { store_slug: target.slug });
      } else {
        setSavedCoupon(target.id, on);
        track(on ? "save_coupon" : "unsave_coupon", { coupon_id: target.id });
      }
    },
    [target],
  );

  const onTracked = useCallback(
    (email: string | null) => {
      mirrorLocally(true);
      setKnown({ tracking: true, email });
      refresh();
      success(copy.toast);
    },
    [mirrorLocally, refresh, success, copy.toast],
  );

  const onSignedInOnly = useCallback(
    (message: string) => {
      // The code was right but saving failed. They now have a session, so the
      // page switches to the one-button state and they can simply press it.
      refresh();
      error(message);
    },
    [refresh, error],
  );

  function setTracking(next: boolean) {
    startTransition(async () => {
      const result = await (target.kind === "store"
        ? setSavedStoreAction(target.id, next)
        : setSavedCouponAction(target.id, next));
      if (result.error) {
        error(result.error);
        return;
      }
      mirrorLocally(next);
      setKnown((prev) => ({ tracking: next, email: prev?.email ?? null }));
      success(result.message ?? (next ? copy.toast : "Stopped."));
    });
  }

  if (known?.tracking) {
    return (
      <section aria-live="polite" className="rounded-xl border border-verified/40 bg-verified-soft p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper-raised text-verified">
              <Check aria-hidden="true" className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <div>
              <h3 className="text-base font-semibold text-ink">{copy.doneTitle}</h3>
              <p className="mt-1 text-sm text-ink-soft">
                {copy.doneBody}
                {known.email ? ` We'll write to ${known.email}.` : ""} {FINE_PRINT}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4 text-sm">
            <Link href="/account/saved" className="font-medium text-inkblue hover:underline">
              Manage
            </Link>
            <button
              type="button"
              onClick={() => setTracking(false)}
              disabled={pending}
              className="inline-flex min-h-11 items-center gap-2 text-ink-soft underline-offset-2 hover:text-ink hover:underline disabled:opacity-60"
            >
              {pending && <Spinner />}
              {pending ? "Stopping" : "Stop"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  const signedIn = session.status === "authenticated";
  const checking = session.status === "loading" || (signedIn && known === null);

  return (
    <section aria-live="polite" className="rounded-xl border border-accent-soft bg-accent-faint p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
            <Bell aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-ink">{copy.heading}</h3>
            <p className="mt-1 text-sm text-ink-soft">{copy.body}</p>
            <p className="mt-1 text-[13px] text-ink-soft">{signedIn ? FINE_PRINT : FINE_PRINT_NEW}</p>
          </div>
        </div>

        <div className="w-full md:w-auto md:min-w-[22rem]">
          {signedIn || checking ? (
            <button
              type="button"
              onClick={() => setTracking(true)}
              disabled={checking || pending}
              aria-busy={checking || pending}
              className="btn btn-cta inline-flex min-h-11 w-full items-center justify-center gap-2 md:w-auto"
            >
              {(checking || pending) && <Spinner />}
              {checking ? "Checking" : pending ? "Saving" : copy.cta}
            </button>
          ) : (
            <SignedOutFlow
              target={target}
              copy={copy}
              onTracked={onTracked}
              onSignedInOnly={onSignedInOnly}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/** Remounting is the only way to reset `useActionState`, so "start over" bumps a key. */
function SignedOutFlow(props: {
  target: TrackTarget;
  copy: ReturnType<typeof copyFor>;
  onTracked: (email: string | null) => void;
  onSignedInOnly: (message: string) => void;
}) {
  const [run, setRun] = useState(0);
  return <FlowSteps key={run} {...props} onStartOver={() => setRun((n) => n + 1)} />;
}

function FlowSteps({
  target,
  copy,
  onTracked,
  onSignedInOnly,
  onStartOver,
}: {
  target: TrackTarget;
  copy: ReturnType<typeof copyFor>;
  onTracked: (email: string | null) => void;
  onSignedInOnly: (message: string) => void;
  onStartOver: () => void;
}) {
  const emailId = useId();
  const codeId = useId();
  const [requested, requestForm, requesting] = useActionState(requestTrackCodeAction, EMPTY);

  // Side effects belong in the action, which runs on submit, not in an effect
  // that would have to notice a result changing.
  const verifyAndReport = useCallback(
    async (prev: TrackFlowResult, formData: FormData) => {
      const result = await trackWithEmailCodeAction(prev, formData);
      if (result.tracking) onTracked(result.email ?? null);
      else if (result.signedIn) onSignedInOnly(result.error ?? "You're signed in. Press the button to finish.");
      return result;
    },
    [onTracked, onSignedInOnly],
  );
  const [verified, verifyForm, verifying] = useActionState(verifyAndReport, EMPTY);

  if (!requested.codeSentTo) {
    return (
      <div className="space-y-2">
        <form action={requestForm} aria-busy={requesting} className="flex flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor={emailId}>
            Email address
          </label>
          <div className="relative flex-1">
            <Mail
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              strokeWidth={2}
            />
            <input
              id={emailId}
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={requesting}
              placeholder="you@example.com"
              className={INPUT_CLASS}
            />
          </div>
          <button
            type="submit"
            disabled={requesting}
            className="btn btn-cta inline-flex min-h-11 shrink-0 items-center justify-center gap-2"
          >
            {requesting && <Spinner />}
            {requesting ? "Sending code" : copy.cta}
          </button>
        </form>
        {requested.error && (
          <p role="alert" className="text-sm text-rust">
            {requested.error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-ink">
        We sent a 6-digit code to <span className="font-medium">{requested.codeSentTo}</span>.
      </p>
      <form action={verifyForm} aria-busy={verifying} className="flex flex-col gap-2 sm:flex-row">
        <input type="hidden" name="email" value={requested.codeSentTo} />
        <input type="hidden" name="kind" value={target.kind} />
        <input type="hidden" name="itemId" value={target.id} />
        <label className="sr-only" htmlFor={codeId}>
          6-digit code
        </label>
        <div className="relative flex-1">
          <input
            id={codeId}
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9 ]*"
            maxLength={7}
            required
            autoFocus
            disabled={verifying}
            placeholder="123456"
            className={`${INPUT_CLASS} pl-3 tracking-[0.25em]`}
          />
        </div>
        <button
          type="submit"
          disabled={verifying}
          className="btn btn-cta inline-flex min-h-11 shrink-0 items-center justify-center gap-2"
        >
          {verifying && <Spinner />}
          {verifying ? "Confirming" : copy.confirm}
        </button>
      </form>
      {verified.error && (
        <p role="alert" className="text-sm text-rust">
          {verified.error}
        </p>
      )}
      <form action={requestForm} className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <input type="hidden" name="email" value={requested.codeSentTo} />
        <ResendButton key={requested.sentAt} />
        <button type="button" onClick={onStartOver} className="min-h-9 text-inkblue hover:underline">
          Use a different email
        </button>
      </form>
    </div>
  );
}

/**
 * "Send a new code", locked for a minute after each send. The parent remounts
 * this on every successful request, which restarts the countdown; time is read
 * in an interval callback, never during render.
 */
function ResendButton() {
  const { pending } = useFormStatus();
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, RESEND_AFTER_SECONDS - Math.floor((now - startedAt) / 1000));
  const locked = remaining > 0;

  return (
    <button
      type="submit"
      disabled={locked || pending}
      className="inline-flex min-h-9 items-center gap-2 text-inkblue hover:underline disabled:text-ink-soft disabled:no-underline"
    >
      {pending && <Spinner />}
      {pending ? "Sending" : locked ? `Send a new code (${remaining}s)` : "Send a new code"}
    </button>
  );
}
