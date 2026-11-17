"use client";

import { Loader2 } from "lucide-react";

/**
 * Shared footer for "View More" lists: a slim progress bar showing how much of
 * the catalogue is loaded, an accessible counter ("40 of 500"), and the button
 * with a visible spinner while the next batch is fetched.
 */
export default function ViewMoreFooter({
  loaded,
  total,
  loading,
  error,
  onLoadMore,
  noun,
  href,
  suppressAction = false,
  errorMessage,
}: {
  loaded: number;
  total: number;
  loading: boolean;
  error: boolean;
  onLoadMore: () => void;
  /** Singular-ish noun used in copy, e.g. "deals", "stores", "results". */
  noun: string;
  /**
   * When set, the action is a real link to the next page instead of a button.
   * Progressive enhancement: it still works without JS and crawlers can
   * follow it; with JS the click is intercepted and the next page is appended
   * in place.
   */
  href?: string;
  /** Hide the action entirely (useful when server-side filtering is unresolved). */
  suppressAction?: boolean;
  /** Override the generic connection-error line (e.g. "Couldn't load more deals…"). */
  errorMessage?: string;
}) {
  const hasMore = loaded < total;
  const pct = total > 0 ? Math.round((loaded / total) * 100) : 100;

  return (
    <div className="mt-6 flex flex-col items-center gap-3" data-lx="more">
      {/* Progress row: count + bar */}
      <div className="flex w-full max-w-sm flex-col items-center gap-1.5">
        <p className="text-xs font-medium text-ink-soft" aria-live="polite">
          Showing <span className="font-semibold text-ink">{loaded.toLocaleString("en-IN")}</span>{" "}
          of <span className="font-semibold text-ink">{total.toLocaleString("en-IN")}</span> {noun}
        </p>
        <div
          role="progressbar"
          aria-valuenow={loaded}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${loaded} of ${total} ${noun} loaded`}
          className="h-1.5 w-full overflow-hidden rounded-full bg-paper-alt"
        >
          <div
            className="h-full rounded-full bg-ink/70 transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {!suppressAction && hasMore && href ? (
        <a
          href={href}
          aria-busy={loading}
          onClick={(event) => {
            event.preventDefault();
            onLoadMore();
          }}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ledger-line bg-white px-6 py-2.5 text-sm font-semibold text-ink transition-all hover:border-inkblue hover:text-inkblue"
        >
          {loading && (
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" strokeWidth={2} />
          )}
          {loading ? "Loading more…" : "View More"}
        </a>
      ) : !suppressAction && hasMore ? (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={loading}
          aria-busy={loading}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ledger-line bg-white px-6 py-2.5 text-sm font-semibold text-ink transition-all hover:border-inkblue hover:text-inkblue disabled:cursor-wait disabled:opacity-70"
        >
          {loading && (
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" strokeWidth={2} />
          )}
          {loading ? "Loading more…" : "View More"}
        </button>
      ) : (
        total > 0 && (
          <p className="py-1 text-center text-xs text-ink-soft">
            That&apos;s all {total.toLocaleString("en-IN")} {noun}.
          </p>
        )
      )}

      {error && (
        <p role="alert" className="text-xs text-rust">
          {errorMessage ?? "Couldn't load more — check your connection and try again."}
        </p>
      )}
    </div>
  );
}
