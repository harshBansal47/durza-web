"use client";

/**
 * Campaign lifecycle + store-integration management.
 *
 * VCommission is the source of truth for discovery; lifecycle state (approval /
 * abandonment) and store integration health are tracked independently. The
 * four dashboard statuses are derived by the API from those two facts.
 */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  approveCampaign,
  bulkCampaignHealthCheck,
  deactivateCampaignStore,
  fetchCampaignDashboard,
  fetchCampaignDetail,
  reactivateCampaign,
  runCampaignHealthCheck,
  syncCampaignsNow,
} from "@/lib/api/admin";
import { ApiError } from "@/lib/api-error";
import type {
  CampaignDashboardItem,
  CampaignDashboardPage,
  CampaignDetail,
  CampaignSummary,
} from "@/lib/types";

const PAGE_SIZE = 25;

const TABS = [
  { id: "", label: "All Campaigns", key: "all" as const },
  { id: "working", label: "Working", key: "working" as const },
  { id: "awaiting_approval", label: "Awaiting Approval", key: "awaiting_approval" as const },
  { id: "needs_attention", label: "Needs Attention", key: "needs_attention" as const },
  { id: "abandoned", label: "Abandoned", key: "abandoned" as const },
];

const STATUS_TONE: Record<string, string> = {
  working: "bg-emerald-100 text-emerald-800",
  awaiting_approval: "bg-amber-100 text-amber-800",
  needs_attention: "bg-rose-100 text-rose-800",
  abandoned: "bg-slate-200 text-slate-700",
};

function describeError(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 401) return "Sign in as an admin to manage campaigns.";
    if (error.status === 403) return "This account is not an admin, so campaigns are hidden.";
  }
  return error instanceof Error ? error.message : "Could not load campaigns. Try again.";
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString();
}

function StoreLogo({ item }: { item: CampaignDashboardItem }) {
  const [failed, setFailed] = useState(false);
  const initials = (item.store_name || item.merchant_name || "?")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  if (!item.store_logo_url || failed) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
        {initials}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.store_logo_url}
      alt=""
      width={32}
      height={32}
      className="h-8 w-8 rounded-full object-contain"
      onError={() => setFailed(true)}
    />
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_TONE[status] ?? "bg-slate-100 text-slate-700"}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

export default function AdminCampaignsPage() {
  const [tab, setTab] = useState("");
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState<CampaignDashboardPage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [detail, setDetail] = useState<CampaignDetail | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const result = await fetchCampaignDashboard({
        status: tab || undefined,
        search: search || undefined,
        skip,
        limit: PAGE_SIZE,
      });
      setPage(result);
    } catch (caught) {
      setError(describeError(caught));
    }
  }, [tab, search, skip]);

  useEffect(() => {
    void load();
  }, [load]);

  const summary: CampaignSummary =
    page?.summary ?? { all: 0, working: 0, awaiting_approval: 0, needs_attention: 0, abandoned: 0 };

  const act = async (label: string, action: () => Promise<unknown>, refresh = true) => {
    setBusy(label);
    setNotice(null);
    try {
      await action();
      if (refresh) await load();
      setNotice(`${label} completed.`);
    } catch (caught) {
      setNotice(`${label} failed: ${describeError(caught)}`);
    } finally {
      setBusy(null);
    }
  };

  const openDetail = async (id: string) => {
    setDetailError(null);
    setDetail(null);
    try {
      setDetail(await fetchCampaignDetail(id));
    } catch (caught) {
      setDetailError(describeError(caught));
    }
  };

  const refreshDetail = async (id: string) => {
    try {
      setDetail(await fetchCampaignDetail(id));
    } catch (caught) {
      setDetailError(describeError(caught));
    }
  };

  const total = page?.total ?? 0;
  const items = page?.items ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Campaign lifecycle &amp; store integration</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-600">
            VCommission discovers campaigns; Durza integration and store health are tracked
            separately. A campaign is <strong>Working</strong> only when all five mandatory store
            checks pass.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin" className="text-sm text-slate-600 underline">
            Admin
          </Link>
          <button
            type="button"
            className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
            disabled={busy !== null}
            onClick={() => void act("Synchronization", syncCampaignsNow)}
          >
            {busy === "Synchronization" ? "Syncing…" : "Sync now"}
          </button>
          <button
            type="button"
            className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
            disabled={busy !== null}
            onClick={() => void act("Bulk health check", () => bulkCampaignHealthCheck(PAGE_SIZE))}
          >
            {busy === "Bulk health check" ? "Checking…" : "Bulk health check"}
          </button>
        </div>
      </div>

      {notice && (
        <p role="status" className="mb-3 rounded-md bg-slate-100 px-3 py-2 text-sm">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="mb-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {error}
        </p>
      )}

      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Campaign status">
        {TABS.map((entry) => (
          <button
            key={entry.label}
            type="button"
            role="tab"
            aria-selected={tab === entry.id}
            onClick={() => {
              setTab(entry.id);
              setSkip(0);
            }}
            className={`rounded-full border px-3 py-1 text-sm ${tab === entry.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300"}`}
          >
            {entry.label} <span className="ml-1 opacity-70">{summary[entry.key]}</span>
          </button>
        ))}
      </div>

      <label className="mb-3 block text-sm">
        <span className="sr-only">Search campaigns</span>
        <input
          type="search"
          value={search}
          maxLength={100}
          onChange={(event) => {
            setSearch(event.target.value);
            setSkip(0);
          }}
          placeholder="Search name, advertiser or VCommission ID"
          className="w-full max-w-md rounded-md border px-3 py-2 text-sm"
        />
      </label>

      <div className="overflow-x-auto rounded-md border">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Campaign</th>
              <th className="px-3 py-2">Advertiser</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Durza store</th>
              <th className="px-3 py-2">Store health</th>
              <th className="px-3 py-2">Custom store</th>
              <th className="px-3 py-2">Last sync</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t align-top">
                <td className="px-3 py-2">
                  <button
                    type="button"
                    className="text-left font-medium underline decoration-slate-300"
                    onClick={() => void openDetail(item.id)}
                  >
                    {item.title}
                  </button>
                  <div className="text-xs text-slate-500">ID {item.external_campaign_id}</div>
                </td>
                <td className="px-3 py-2">{item.merchant_name}</td>
                <td className="px-3 py-2">
                  <StatusPill status={item.status} />
                  {item.missed_syncs > 0 && (
                    <div className="mt-1 text-xs text-amber-700">
                      missing for {item.missed_syncs} sync{item.missed_syncs === 1 ? "" : "s"}
                    </div>
                  )}
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <StoreLogo item={item} />
                    <div>
                      {item.store_name ? (
                        item.store_slug ? (
                          <Link href={`/stores/${item.store_slug}`} className="underline">
                            {item.store_name}
                          </Link>
                        ) : (
                          item.store_name
                        )
                      ) : (
                        <span className="text-slate-500">No store linked</span>
                      )}
                      {item.store_status && (
                        <div className="text-xs text-slate-500">
                          {item.store_status}
                          {item.store_is_active === false ? " · inactive" : ""}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2">
                  {item.health_passed_all === null ? (
                    <div>
                      <span className="text-slate-500">Not checked</span>
                      {item.status === "needs_attention" && item.failure_reasons[0] ? (
                        <span className="mt-1 block max-w-xs text-xs text-rose-700">
                          {item.failure_reasons[0]}
                        </span>
                      ) : null}
                    </div>
                  ) : item.health_passed_all ? (
                    <span className="text-emerald-700">All checks passed</span>
                  ) : (
                    <span className="text-rose-700" title={item.failure_reasons.join("\n")}>
                      {item.failure_reasons.length} failed
                      {item.failure_reasons[0] && (
                        <span className="block max-w-xs truncate text-xs">
                          {item.failure_reasons[0]}
                        </span>
                      )}
                    </span>
                  )}
                  {item.last_health_check_at && (
                    <div className="text-xs text-slate-500">
                      {formatDate(item.last_health_check_at)}
                    </div>
                  )}
                </td>
                <td className="px-3 py-2">{item.custom_store ? "Yes" : "No"}</td>
                <td className="px-3 py-2">{formatDate(item.last_seen_at ?? item.last_synced_at)}</td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-1">
                    {item.status === "awaiting_approval" && (
                      <button
                        type="button"
                        className="rounded border px-2 py-1 text-xs disabled:opacity-50"
                        disabled={busy !== null}
                        onClick={() =>
                          void act("Approval", () => approveCampaign(item.id)).then(() =>
                            detail?.id === item.id ? refreshDetail(item.id) : undefined,
                          )
                        }
                      >
                        Approve
                      </button>
                    )}
                    <button
                      type="button"
                      className="rounded border px-2 py-1 text-xs disabled:opacity-50"
                      disabled={busy !== null}
                      onClick={() =>
                        void act("Health check", () => runCampaignHealthCheck(item.id)).then(() =>
                          detail?.id === item.id ? refreshDetail(item.id) : undefined,
                        )
                      }
                    >
                      Check
                    </button>
                    {item.status === "abandoned" && (
                      <button
                        type="button"
                        className="rounded border px-2 py-1 text-xs disabled:opacity-50"
                        disabled={busy !== null}
                        onClick={() => void act("Reactivation", () => reactivateCampaign(item.id))}
                      >
                        Reactivate
                      </button>
                    )}
                    {item.store_id && item.status !== "abandoned" && (
                      <button
                        type="button"
                        className="rounded border px-2 py-1 text-xs text-rose-700 disabled:opacity-50"
                        disabled={busy !== null}
                        onClick={() =>
                          void act("Deactivate store", () => deactivateCampaignStore(item.id))
                        }
                      >
                        Deactivate store
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && !error && (
          <p className="p-6 text-center text-sm text-slate-500">No campaigns match these filters.</p>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span aria-live="polite">
          {total} campaign{total === 1 ? "" : "s"} · page {Math.floor(skip / PAGE_SIZE) + 1} of{" "}
          {Math.max(1, Math.ceil(total / PAGE_SIZE))}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded border px-3 py-1 disabled:opacity-40"
            disabled={skip === 0}
            onClick={() => setSkip(Math.max(0, skip - PAGE_SIZE))}
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded border px-3 py-1 disabled:opacity-40"
            disabled={skip + PAGE_SIZE >= total}
            onClick={() => setSkip(skip + PAGE_SIZE)}
          >
            Next
          </button>
        </div>
      </div>

      {detailError && (
        <p role="alert" className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {detailError}
        </p>
      )}
      {detail && (
        <section className="mt-6 rounded-md border bg-white p-4" aria-label="Campaign details">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">{detail.title}</h2>
              <p className="text-xs text-slate-500">
                VCommission ID {detail.external_campaign_id} · {detail.merchant_name}
              </p>
            </div>
            <button
              type="button"
              className="rounded border px-2 py-1 text-sm"
              onClick={() => setDetail(null)}
            >
              Close
            </button>
          </div>
          <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-4">
            <div><dt className="text-slate-500">Lifecycle</dt><dd>{detail.lifecycle_state}</dd></div>
            <div><dt className="text-slate-500">Display status</dt><dd><StatusPill status={detail.status} /></dd></div>
            <div><dt className="text-slate-500">Store</dt><dd>{detail.store_name ?? "—"}</dd></div>
            <div><dt className="text-slate-500">Custom store</dt><dd>{detail.custom_store ? "Yes" : "No"}</dd></div>
            <div><dt className="text-slate-500">Last synced</dt><dd>{formatDate(detail.last_synced_at)}</dd></div>
            <div><dt className="text-slate-500">Last seen</dt><dd>{formatDate(detail.last_seen_at)}</dd></div>
            <div><dt className="text-slate-500">Last health check</dt><dd>{formatDate(detail.last_health_check_at)}</dd></div>
            <div><dt className="text-slate-500">Missed syncs</dt><dd>{detail.missed_syncs}</dd></div>
          </dl>

          <h3 className="mb-2 text-sm font-semibold">Store integration health</h3>
          <ul className="mb-4 space-y-1 text-sm">
            {detail.health_checks.length === 0 && <li className="text-slate-500">No health check yet.</li>}
            {detail.health_checks.map((check) => (
              <li key={check.name} className="flex gap-2">
                <span className={check.passed ? "text-emerald-700" : "text-rose-700"}>
                  {check.passed ? "✓" : "✗"}
                </span>
                <span>
                  <strong>{check.name.replace(/_/g, " ")}</strong>: {check.reason}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mb-2 text-sm font-semibold">Activity history</h3>
          <ul className="space-y-1 text-xs">
            {detail.audit.length === 0 && <li className="text-slate-500">No events recorded.</li>}
            {detail.audit.map((event) => (
              <li key={event.id} className="flex gap-2">
                <span className="text-slate-500">{formatDate(event.created_at)}</span>
                <span className={event.success ? "" : "text-rose-700"}>{event.action}</span>
                {event.actor && <span className="text-slate-500">by {event.actor}</span>}
                {event.error && <span className="text-rose-700">{event.error}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
