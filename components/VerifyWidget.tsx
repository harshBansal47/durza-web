"use client";

import { useEffect, useRef, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { DEVICE_STATE_EVENT, getVote, hasRevealed, markVoted } from "@/lib/deviceState";
import { formatRelativeTime } from "@/lib/format";
import type { CouponPublic } from "@/lib/types";

type Stats = Pick<CouponPublic, "success_count" | "fail_count" | "last_verified_at" | "success_rate">;

/**
 * "Did it work?" widget. Two honesty rules:
 *  - a vote needs a reveal first — you can only report on an offer you saw;
 *  - this device remembers its own vote, so the buttons don't invite a second
 *    one the server would reject anyway (the server keeps its own cooldown).
 */
export default function VerifyWidget({ coupon }: { coupon: CouponPublic }) {
  const [stats, setStats] = useState<Stats>({
    success_count: coupon.success_count,
    fail_count: coupon.fail_count,
    last_verified_at: coupon.last_verified_at,
    success_rate: coupon.success_rate,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "limited">("idle");
  const [device, setDevice] = useState<{ revealed: boolean; vote: "worked" | "failed" | null } | null>(null);

  // The page this widget sits on is cached for minutes, so `coupon` can predate
  // votes that were already cast — including this visitor's own, which is why a
  // vote seemed to "disappear" on reload. Ask for the live numbers once mounted.
  // Skipped if the visitor votes first: their response is already the freshest.
  const votedRef = useRef(false);
  useEffect(() => {
    let alive = true;
    // `Promise.resolve().then` so a throw inside the call becomes a rejection
    // the catch below swallows, rather than an error during the effect.
    Promise.resolve()
      .then(() => api.getCouponStats(coupon.id))
      .then((fresh) => {
        if (!alive || votedRef.current) return;
        setStats({
          success_count: fresh.success_count,
          fail_count: fresh.fail_count,
          last_verified_at: fresh.last_verified_at,
          success_rate: fresh.success_rate,
        });
      })
      .catch(() => {
        // Keep the numbers the page was rendered with.
      });
    return () => {
      alive = false;
    };
  }, [coupon.id]);

  useEffect(() => {
    function refresh() {
      setDevice({ revealed: hasRevealed(coupon.id), vote: getVote(coupon.id) });
    }
    refresh();
    window.addEventListener(DEVICE_STATE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(DEVICE_STATE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [coupon.id]);

  async function report(worked: boolean) {
    if (status === "sending") return;
    setStatus("sending");
    try {
      const updated = await api.verifyCoupon(coupon.id, worked);
      votedRef.current = true;
      setStats(updated);
      markVoted(coupon.id, worked);
      setStatus("done");
    } catch (err) {
      setStatus(err instanceof ApiError && err.status === 429 ? "limited" : "idle");
    }
  }

  const total = stats.success_count + stats.fail_count;
  const hasCode = Boolean(coupon.code);

  return (
    <div className="rounded-[var(--radius-md)] border border-ledger-line px-4 py-4">
      {total === 0 ? (
        // Two monospace "No reports yet / No votes yet" cells read like broken data;
        // one sentence says the same thing and invites the first vote.
        <p className="mb-4 text-sm text-ink-soft">
          <span className="font-medium text-ink">No reports yet.</span> Be the first to tell us whether this worked.
        </p>
      ) : (
        <dl className="mb-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-ink-soft">Success rate</dt>
            <dd className="font-mono text-base text-ink">
              {stats.success_rate !== null ? `${Math.round(stats.success_rate * 100)}%` : "No reports yet"}
              {total > 0 && (
                <span className="text-ink-soft">
                  {" "}
                  ({total} report{total === 1 ? "" : "s"})
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-ink-soft">Last vote</dt>
            <dd className="font-mono text-base text-ink">
              {stats.last_verified_at ? formatRelativeTime(stats.last_verified_at) : "No votes yet"}
            </dd>
          </div>
        </dl>
      )}

      {status === "done" ? (
        <p className="text-sm text-verified">Thanks — that helps the next person.</p>
      ) : status === "limited" ? (
        <p className="text-sm text-ink-soft">You&apos;ve already reported on this one recently.</p>
      ) : device?.vote ? (
        <p className="text-sm text-ink-soft">
          You reported this {device.vote === "worked" ? "worked" : "didn&apos;t work"} on this device.
          One vote per offer per day — thanks for keeping it honest.
        </p>
      ) : device?.revealed ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-ink-soft">Did this work for you?</span>
          <button
            type="button"
            onClick={() => report(true)}
            disabled={status === "sending"}
            className="rounded-[var(--radius-sm)] border border-verified min-h-11 px-4 py-1.5 text-sm text-verified transition-colors hover:bg-verified-soft disabled:opacity-50"
          >
            Worked
          </button>
          <button
            type="button"
            onClick={() => report(false)}
            disabled={status === "sending"}
            className="rounded-[var(--radius-sm)] border border-rust min-h-11 px-4 py-1.5 text-sm text-rust transition-colors hover:bg-rust-soft disabled:opacity-50"
          >
            Didn&apos;t work
          </button>
        </div>
      ) : device ? (
        <div className="rounded-[var(--radius-sm)] border border-dashed border-ledger-line bg-paper-raised px-3 py-3 text-sm">
          <p className="font-medium text-ink">Did this {hasCode ? "code" : "deal"} work for you?</p>
          <p className="mt-1 text-ink-soft">
            Only people who tried the offer can vote, so the numbers stay honest.
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-ink-soft">
            <li>
              <a href="#code-panel" className="font-medium text-inkblue underline-offset-2 hover:underline">
                {hasCode ? "Reveal the code" : "Get the deal at the store"}
              </a>{" "}
              {hasCode ? "and use it at checkout." : "and complete your purchase."}
            </li>
            <li>
              Come back here and tap <span className="text-ink">Worked</span> or{" "}
              <span className="text-ink">Didn&apos;t work</span>.
            </li>
          </ol>
        </div>
      ) : null}
    </div>
  );
}
