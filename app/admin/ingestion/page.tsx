"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, ArrowLeft, Play, RefreshCw } from "lucide-react";
import { EmptyState, MetricCard, Panel } from "@/components/admin/DashboardCards";
import {
  fetchIngestionOverview,
  fetchIngestionRuns,
  triggerIngestion,
  type IngestionOverview,
  type IngestionRun,
} from "@/lib/api/admin";

const POLL_MS = 4000;
/** How long to keep polling after a trigger, in case the run row appears late. */
const AWAIT_MS = 90_000;

function formatWhen(iso: string | null): string {
  if (!iso) return "Never";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(iso),
  );
}

function formatDuration(ms: number | null): string {
  if (ms === null) return "—";
  return ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} s`;
}

const RUN_BADGE: Record<string, string> = {
  running: "bg-blue-50 text-blue-800",
  success: "bg-green-50 text-green-800",
  partial: "bg-amber-50 text-amber-800",
  failed: "bg-red-50 text-red-800",
  cancelled: "bg-gray-100 text-gray-700",
};

function RunBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-gray-400">No runs yet</span>;
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${RUN_BADGE[status] ?? "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}

export default function AdminIngestionDashboard() {
  const [overview, setOverview] = useState<IngestionOverview | null>(null);
  const [runs, setRuns] = useState<IngestionRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState<string | null>(null);
  const [awaiting, setAwaiting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = useCallback(async (signal?: AbortSignal) => {
    try {
      const [nextOverview, nextRuns] = await Promise.all([
        fetchIngestionOverview(signal),
        fetchIngestionRuns(20, signal),
      ]);
      setOverview(nextOverview);
      setRuns(nextRuns);
      setError(null);
    } catch (cause) {
      if (signal?.aborted) return;
      setError(cause instanceof Error ? cause.message : "Could not load ingestion status.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const anyRunning = Boolean(overview?.sources.some((s) => s.latest_run_status === "running"));
  const polling = awaiting || anyRunning;

  useEffect(() => {
    if (!polling) return;
    const id = window.setInterval(() => void load(), POLL_MS);
    return () => window.clearInterval(id);
  }, [polling, load]);

  const isAdmin = overview?.user_role === "admin";

  const start = async (slugs: string[] | null) => {
    setNotice(null);
    setActionError(null);
    setStarting(slugs ? slugs.join(",") : "all");
    try {
      const result = await triggerIngestion(slugs);
      const skipped = result.skipped.length
        ? ` Skipped: ${result.skipped.map((s) => `${s.slug} (${s.reason})`).join(", ")}.`
        : "";
      setNotice(`Started ${result.started.join(", ")}. Progress updates below.${skipped}`);
      setAwaiting(true);
      window.setTimeout(() => setAwaiting(false), AWAIT_MS);
      await load();
    } catch (cause) {
      setActionError(cause instanceof Error ? cause.message : "Could not start ingestion.");
    } finally {
      setStarting(null);
    }
  };

  const scheduler = overview?.scheduler;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Link
              className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800"
              href="/admin/analytics"
            >
              <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
              Analytics
            </Link>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
              Durza back office
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">Ingestion controls</h1>
            <p className="mt-2 text-sm text-gray-500">
              Run coupon ingestion for each provider on demand and watch the result.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
              disabled={loading}
              onClick={() => void load()}
              type="button"
            >
              <RefreshCw aria-hidden="true" className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            {isAdmin ? (
              <button
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50"
                disabled={starting !== null || anyRunning}
                onClick={() => void start(null)}
                type="button"
              >
                <Play aria-hidden="true" className="h-4 w-4" />
                {starting === "all" ? "Starting…" : "Ingest all enabled"}
              </button>
            ) : null}
          </div>
        </header>

        {error ? (
          <div
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            role="alert"
          >
            <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Ingestion status could not be loaded</p>
              <p className="mt-1">{error}</p>
            </div>
            <button className="font-semibold underline" onClick={() => void load()} type="button">
              Retry
            </button>
          </div>
        ) : null}
        {actionError ? (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
            {actionError}
          </div>
        ) : null}
        {notice ? (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800" role="status">
            {notice}
          </div>
        ) : null}
        {overview && !isAdmin ? (
          <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            You can view ingestion status, but only admins can start a run.
          </div>
        ) : null}

        {loading && !overview ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-gray-500" role="status">
            <RefreshCw aria-hidden="true" className="h-5 w-5 animate-spin text-orange-600" />
            Loading ingestion status…
          </div>
        ) : null}

        {overview && scheduler ? (
          <div aria-busy={loading}>
            <section aria-label="Scheduling" className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <MetricCard
                title="Scheduled ingestion"
                value={scheduler.ingestion_automated ? `Every ${scheduler.interval_hours}h` : "Manual only"}
                detail={
                  !scheduler.enabled
                    ? "The scheduler is off."
                    : scheduler.ingestion_automated
                      ? "Providers refresh automatically."
                      : "Ingestion runs only when triggered here."
                }
              />
              <MetricCard
                title="Providers"
                value={overview.sources.length.toLocaleString()}
                detail={`${overview.sources.filter((s) => s.is_enabled).length} enabled`}
              />
              <MetricCard
                title="Run in progress"
                value={anyRunning ? "Yes" : "No"}
                detail={polling ? "Checking every few seconds." : "Idle."}
              />
            </section>

            <div className="mb-8">
              <Panel
                title="Providers"
                detail="Enabling or disabling a provider is done in the config or the backend admin, not here."
              >
                {overview.sources.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="text-xs uppercase tracking-wide text-gray-500">
                        <tr>
                          <th className="pb-2 pr-3 font-medium">Provider</th>
                          <th className="pb-2 pr-3 font-medium">Latest run</th>
                          <th className="pb-2 pr-3 font-medium">Last success</th>
                          <th className="pb-2 pr-3 text-right font-medium">Failures</th>
                          <th className="pb-2 pr-3 font-medium">Last error</th>
                          <th className="pb-2 text-right font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {overview.sources.map((source) => {
                          const running = source.latest_run_status === "running";
                          const blocked = !source.is_enabled
                            ? "Disabled"
                            : running
                              ? "Already running"
                              : undefined;
                          return (
                            <tr key={source.slug}>
                              <td className="py-3 pr-3">
                                <p className="font-medium">{source.name}</p>
                                <p className="text-xs text-gray-500">
                                  {source.kind}
                                  {!source.is_enabled ? " · disabled" : ""}
                                </p>
                                {!source.configured ? (
                                  <p className="mt-1 text-xs font-medium text-amber-700">
                                    Credentials not set on the server
                                  </p>
                                ) : null}
                              </td>
                              <td className="py-3 pr-3">
                                <RunBadge status={source.latest_run_status} />
                                <p className="mt-1 text-xs text-gray-500">
                                  {formatWhen(source.latest_run_started_at)}
                                </p>
                              </td>
                              <td className="py-3 pr-3 text-gray-600">{formatWhen(source.last_success_at)}</td>
                              <td
                                className={`py-3 pr-3 text-right ${source.consecutive_failures ? "font-semibold text-red-700" : "text-gray-600"}`}
                              >
                                {source.consecutive_failures}
                              </td>
                              <td className="max-w-xs py-3 pr-3 text-xs text-gray-600">
                                <span className="line-clamp-2" title={source.last_error ?? undefined}>
                                  {source.last_error ?? "—"}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                {isAdmin ? (
                                  <button
                                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 text-sm font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    disabled={starting !== null || Boolean(blocked)}
                                    onClick={() => void start([source.slug])}
                                    title={blocked}
                                    type="button"
                                  >
                                    <Play aria-hidden="true" className="h-3.5 w-3.5" />
                                    {starting === source.slug ? "Starting…" : "Ingest now"}
                                  </button>
                                ) : null}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <EmptyState message="No providers exist yet. They are created on deploy from the provider config." />
                )}
              </Panel>
            </div>

            <Panel title="Recent runs" detail="Newest first. Counts are for that single run.">
              {runs.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs uppercase tracking-wide text-gray-500">
                      <tr>
                        <th className="pb-2 pr-3 font-medium">Provider</th>
                        <th className="pb-2 pr-3 font-medium">Status</th>
                        <th className="pb-2 pr-3 font-medium">Started</th>
                        <th className="pb-2 pr-3 text-right font-medium">Took</th>
                        <th className="pb-2 pr-3 text-right font-medium">Fetched</th>
                        <th className="pb-2 pr-3 text-right font-medium">New</th>
                        <th className="pb-2 pr-3 text-right font-medium">Updated</th>
                        <th className="pb-2 pr-3 text-right font-medium">Failed</th>
                        <th className="pb-2 font-medium">Trigger</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {runs.map((run) => (
                        <tr key={run.id} title={run.error ?? undefined}>
                          <td className="py-2 pr-3 font-medium">{run.source_name}</td>
                          <td className="py-2 pr-3">
                            <RunBadge status={run.status} />
                          </td>
                          <td className="py-2 pr-3 text-gray-600">{formatWhen(run.started_at)}</td>
                          <td className="py-2 pr-3 text-right text-gray-600">{formatDuration(run.duration_ms)}</td>
                          <td className="py-2 pr-3 text-right">{run.fetched.toLocaleString()}</td>
                          <td className="py-2 pr-3 text-right">{run.created.toLocaleString()}</td>
                          <td className="py-2 pr-3 text-right">{run.updated.toLocaleString()}</td>
                          <td className={`py-2 pr-3 text-right ${run.failed ? "font-semibold text-red-700" : ""}`}>
                            {run.failed.toLocaleString()}
                          </td>
                          <td className="py-2 text-gray-600">{run.triggered_by ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState message="No ingestion runs recorded yet." />
              )}
            </Panel>
          </div>
        ) : null}
      </div>
    </main>
  );
}
