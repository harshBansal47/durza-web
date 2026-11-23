"use client";

/**
 * Product synchronization.
 *
 * Affiliate network management now lives in dedicated pages:
 * /admin/admitad (Admitad) and /admin/campaigns (VCommission). The shared
 * ingestion backend, scheduler, locks and run history are untouched — only
 * this frontend is now scoped to Shopify product sync.
 */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { EmptyState, MetricCard, Panel } from "@/components/admin/DashboardCards";
import {
  fetchShopifyProductSyncStatus,
  triggerShopifyProductSync,
  type ShopifyProductSyncStatus,
} from "@/lib/api/admin";

const POLL_MS = 4000;

function formatWhen(value: string | null): string {
  if (!value) return "Never";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Never" : date.toLocaleString();
}

function formatDuration(ms: number | null): string {
  if (ms === null || ms === undefined) return "—";
  return ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} s`;
}

export default function ProductSyncPage() {
  const [status, setStatus] = useState<ShopifyProductSyncStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setStatus(await fetchShopifyProductSyncStatus());
      setError(null);
    } catch {
      setError("Could not load product sync status.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const running = status?.last_run_status === "running";
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => void load(), POLL_MS);
    return () => clearInterval(timer);
  }, [running, load]);

  const sync = async () => {
    setSyncing(true);
    setNotice(null);
    try {
      const result = await triggerShopifyProductSync();
      setNotice(result.detail || "Shopify product sync started.");
    } catch {
      setNotice("Could not sync Shopify products.");
    } finally {
      await load();
      setSyncing(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-orange-700">Durza back office</p>
          <h1 className="text-2xl font-semibold tracking-tight">Product synchronization</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-600">
            Affiliate networks are managed separately:{" "}
            <Link href="/admin/admitad" className="underline">Admitad programs</Link> and{" "}
            <Link href="/admin/campaigns" className="underline">VCommission campaigns</Link>.
            This page is limited to the Shopify product catalog.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin" className="text-sm text-slate-600 underline">Admin</Link>
          <button type="button" className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
            disabled={loading} onClick={() => void load()}>Refresh</button>
          <button type="button" className="rounded-md bg-orange-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
            disabled={syncing || running} onClick={() => void sync()}>
            {syncing || running ? "Syncing…" : "Sync Shopify products"}
          </button>
        </div>
      </div>

      {error && <p role="alert" className="mb-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>}
      {notice && <p role="status" className="mb-3 rounded-md bg-slate-100 px-3 py-2 text-sm">{notice}</p>}
      {loading && !status && <p className="p-4 text-sm text-slate-500">Loading product sync status…</p>}

      {status && (
        <Panel title="Shopify product sync" detail="Import the configured store's Shopify catalog into Durza's tracked product catalog.">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Automatic sync"
              value={status.scheduled ? `Every ${status.interval_hours}h` : "Manual only"}
              detail={status.scheduler_enabled ? undefined : "Scheduler disabled on this deployment"}
            />
            <MetricCard title="Latest result" value={status.last_run_status ?? "Never"} detail={formatWhen(status.last_run_started_at)} />
            <MetricCard title="Latest duration" value={formatDuration(status.last_run_duration_ms)} />
            <div className="rounded-2xl border p-4 text-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">Run details</p>
              <p className="mt-1 break-words">{status.last_run_detail ?? "—"}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            This button runs an immediate sync. Recurring sync is controlled by deployment settings.
          </p>
        </Panel>
      )}

      {status && !status.scheduled && <EmptyState message="No recurring Shopify sync is configured." />}
    </main>
  );
}
