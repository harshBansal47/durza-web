"use client";

/**
 * Admitad Program Manager.
 *
 * VCommission and Admitad keep separate program records but share one Durza
 * store identity. Admitad is the primary network; VCommission stays as a
 * fallback. Program synchronization and coupon ingestion are shown as two
 * independent operations.
 */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  approveAdmitadProgram,
  bulkCheckAdmitadPrograms,
  checkAdmitadProgram,
  deactivateAdmitadStore,
  fetchAdmitadIngestionHealth,
  fetchAdmitadProgramDetail,
  fetchAdmitadPrograms,
  fetchAdmitadSyncHistory,
  fetchMerchantAliases,
  reactivateAdmitadProgram,
  resolveMerchantAlias,
  runAdmitadIngestion,
  syncAdmitadPrograms,
} from "@/lib/api/admin";
import { ApiError } from "@/lib/api-error";
import type {
  AdmitadIngestionHealth,
  AdmitadProgram,
  AdmitadProgramDetail,
  AdmitadProgramPage,
  AdmitadSyncHistory,
  CampaignSummary,
  MerchantAlias,
} from "@/lib/types";

const PAGE_SIZE = 25;

const TABS = [
  { id: "", label: "All Programs", key: "all" as const },
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
    if (error.status === 401) return "Sign in as an admin to manage Admitad programs.";
    if (error.status === 403) return "This account is not an admin, so programs are hidden.";
  }
  return error instanceof Error ? error.message : "Could not load Admitad programs. Try again.";
}

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString();
}

function StatusPill({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_TONE[status] ?? "bg-slate-100 text-slate-700"}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function ProgramLogo({ program }: { program: AdmitadProgram }) {
  const [failed, setFailed] = useState(false);
  const initials = program.store_name || program.merchant_name || "?";
  if (!program.store_logo_url || failed) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
        {initials.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={program.store_logo_url}
      alt=""
      width={32}
      height={32}
      className="h-8 w-8 rounded-full object-contain"
      onError={() => setFailed(true)}
    />
  );
}

export default function AdminAdmitadPage() {
  const [tab, setTab] = useState("");
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState<AdmitadProgramPage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [detail, setDetail] = useState<AdmitadProgramDetail | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [syncHistory, setSyncHistory] = useState<AdmitadSyncHistory | null>(null);
  const [ingestion, setIngestion] = useState<AdmitadIngestionHealth | null>(null);
  const [aliases, setAliases] = useState<MerchantAlias[]>([]);
  const [aliasError, setAliasError] = useState<string | null>(null);

  const loadOperations = useCallback(async () => {
    try {
      const [history, health, pending] = await Promise.all([
        fetchAdmitadSyncHistory(),
        fetchAdmitadIngestionHealth(),
        fetchMerchantAliases("pending"),
      ]);
      setSyncHistory(history);
      setIngestion(health);
      setAliases(pending);
    } catch {
      // Program table is primary; operational panels degrade quietly.
    }
  }, []);

  const load = useCallback(async () => {
    setError(null);
    try {
      setPage(
        await fetchAdmitadPrograms({
          status: tab || undefined,
          search: search || undefined,
          skip,
          limit: PAGE_SIZE,
        }),
      );
    } catch (caught) {
      setError(describeError(caught));
    }
  }, [tab, search, skip]);

  useEffect(() => {
    void load();
    void loadOperations();
  }, [load, loadOperations]);

  const summary: CampaignSummary =
    page?.summary ?? { all: 0, working: 0, awaiting_approval: 0, needs_attention: 0, abandoned: 0 };

  const act = async (label: string, action: () => Promise<unknown>, refresh = true) => {
    setBusy(label);
    setNotice(null);
    try {
      await action();
      if (refresh) {
        await load();
        await loadOperations();
      }
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
      setDetail(await fetchAdmitadProgramDetail(id));
    } catch (caught) {
      setDetailError(describeError(caught));
    }
  };

  const resolveAlias = async (id: string, decision: "confirm" | "reject", storeId?: string) => {
    setAliasError(null);
    try {
      await resolveMerchantAlias(id, decision, storeId);
      await loadOperations();
      await load();
    } catch (caught) {
      setAliasError(describeError(caught));
    }
  };

  const total = page?.total ?? 0;
  const items = page?.items ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admitad program manager</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-600">
            Admitad is the source of truth for program discovery. Programs and VCommission
            campaigns can share one Durza store; Admitad stays the preferred network while it is
            eligible. Program sync and coupon ingestion are separate operations.
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
            onClick={() => void act("Program synchronization", syncAdmitadPrograms)}
          >
            {busy === "Program synchronization" ? "Syncing…" : "Sync programs now"}
          </button>
          <button
            type="button"
            className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
            disabled={busy !== null}
            onClick={() => void act("Bulk health check", () => bulkCheckAdmitadPrograms(PAGE_SIZE))}
          >
            {busy === "Bulk health check" ? "Checking…" : "Bulk health check"}
          </button>
        </div>
      </div>

      {notice && <p role="status" className="mb-3 rounded-md bg-slate-100 px-3 py-2 text-sm">{notice}</p>}
      {error && (
        <p role="alert" className="mb-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>
      )}

      <section aria-label="Admitad operations" className="mb-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-md border p-3 text-sm">
          <h2 className="mb-2 font-semibold">Program synchronization</h2>
          <p>Last successful: {formatDate(syncHistory?.last_successful_at)}</p>
          <p>
            Recent runs: {syncHistory?.runs.length ?? 0}
            {syncHistory?.runs[0] && ` · latest ${syncHistory.runs[0].status} (${formatDate(syncHistory.runs[0].finished_at)})`}
          </p>
        </div>
        <div className="rounded-md border p-3 text-sm">
          <h2 className="mb-2 font-semibold">Coupon ingestion</h2>
          <p>
            Enabled: {ingestion?.enabled ? "Yes" : "No"} · Credentials:{" "}
            {ingestion?.configured ? "Configured" : "Missing"}
          </p>
          <p>Last ingestion: {formatDate(ingestion?.last_sync_at)} · Last success: {formatDate(ingestion?.last_success_at)}</p>
          {ingestion?.latest_run && (
            <p>
              Latest run: {String(ingestion.latest_run.status)} · fetched {String(ingestion.latest_run.fetched)} ·
              created {String(ingestion.latest_run.created)} · updated {String(ingestion.latest_run.updated)} ·
              failed {String(ingestion.latest_run.failed)}
            </p>
          )}
          {ingestion?.last_error && <p className="text-rose-700">{ingestion.last_error}</p>}
          <button
            type="button"
            className="mt-2 rounded-md border px-3 py-1.5 text-xs disabled:opacity-50"
            disabled={busy !== null}
            onClick={() => void act("Admitad coupon ingestion", runAdmitadIngestion, false)}
          >
            {busy === "Admitad coupon ingestion" ? "Starting…" : "Run Admitad Ingestion Now"}
          </button>
        </div>
      </section>

      {aliases.length > 0 && (
        <section aria-label="Suggested merchant matches" className="mb-5 rounded-md border p-3 text-sm">
          <h2 className="mb-2 font-semibold">Suggested merchant matches</h2>
          {aliasError && <p role="alert" className="mb-2 text-rose-700">{aliasError}</p>}
          <ul className="space-y-2">
            {aliases.map((alias) => (
              <li key={alias.id} className="flex flex-wrap items-center gap-2">
                <span>
                  <strong>{alias.label ?? alias.alias}</strong> → {alias.store_slug ?? "no store"} ·{" "}
                  {alias.confidence} confidence ({alias.method})
                </span>
                <button
                  type="button"
                  className="rounded border px-2 py-1 text-xs"
                  onClick={() => void resolveAlias(alias.id, "confirm", alias.store_id ?? undefined)}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="rounded border px-2 py-1 text-xs"
                  onClick={() => void resolveAlias(alias.id, "reject")}
                >
                  Reject
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Program status">
        {TABS.map((entry) => (
          <button
            key={entry.label}
            type="button"
            role="tab"
            aria-selected={tab === entry.id}
            onClick={() => { setTab(entry.id); setSkip(0); }}
            className={`rounded-full border px-3 py-1 text-sm ${tab === entry.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300"}`}
          >
            {entry.label} <span className="ml-1 opacity-70">{summary[entry.key]}</span>
          </button>
        ))}
      </div>

      <label className="mb-3 block text-sm">
        <span className="sr-only">Search Admitad programs</span>
        <input
          type="search"
          value={search}
          maxLength={100}
          onChange={(event) => { setSearch(event.target.value); setSkip(0); }}
          placeholder="Search program, merchant or Admitad ID"
          className="w-full max-w-md rounded-md border px-3 py-2 text-sm"
        />
      </label>

      <div className="overflow-x-auto rounded-md border">
        <table className="w-full min-w-[1080px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Program</th>
              <th className="px-3 py-2">Admitad ID</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Durza store</th>
              <th className="px-3 py-2">Store health</th>
              <th className="px-3 py-2">Custom</th>
              <th className="px-3 py-2">Cross-network</th>
              <th className="px-3 py-2">Last seen</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((program) => (
              <tr key={program.id} className="border-t align-top">
                <td className="px-3 py-2">
                  <button
                    type="button"
                    className="text-left font-medium underline decoration-slate-300"
                    onClick={() => void openDetail(program.id)}
                  >
                    {program.merchant_name}
                  </button>
                  <div className="text-xs text-slate-500">{program.title}</div>
                </td>
                <td className="px-3 py-2">{program.external_campaign_id}</td>
                <td className="px-3 py-2"><StatusPill status={program.status} /></td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <ProgramLogo program={program} />
                    <div>
                      {program.store_name ? (
                        program.store_slug ? (
                          <Link href={`/stores/${program.store_slug}`} className="underline">{program.store_name}</Link>
                        ) : program.store_name
                      ) : (
                        <span className="text-slate-500">No store linked</span>
                      )}
                      {program.store_status && (
                        <div className="text-xs text-slate-500">
                          {program.store_status}{program.store_is_active === false ? " · inactive" : ""}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2">
                  {program.health_passed_all === null ? (
                    <div>
                      <span className="text-slate-500">Not checked</span>
                      {program.status === "needs_attention" && program.failure_reasons[0] ? (
                        <span className="mt-1 block max-w-xs text-xs text-rose-700">
                          {program.failure_reasons[0]}
                        </span>
                      ) : null}
                    </div>
                  ) : program.health_passed_all ? (
                    <span className="text-emerald-700">All checks passed</span>
                  ) : (
                    <span className="text-rose-700" title={program.failure_reasons.join("\n")}>
                      {program.failure_reasons.length} failed
                      {program.failure_reasons[0] && (
                        <span className="block max-w-xs truncate text-xs">{program.failure_reasons[0]}</span>
                      )}
                    </span>
                  )}
                </td>
                <td className="px-3 py-2">{program.custom_store ? "Yes" : "No"}</td>
                <td className="px-3 py-2">
                  {program.cross_network.vcommission_external_id ? (
                    <span title={`Preferred: ${program.cross_network.preferred_network}`}>
                      VC {program.cross_network.vcommission_external_id}
                      {program.cross_network.vcommission_active ? " · active" : " · inactive"}
                    </span>
                  ) : (
                    <span className="text-slate-500">None</span>
                  )}
                </td>
                <td className="px-3 py-2">{formatDate(program.last_seen_at ?? program.last_synced_at)}</td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-1">
                    {program.status === "awaiting_approval" && (
                      <button type="button" className="rounded border px-2 py-1 text-xs disabled:opacity-50" disabled={busy !== null}
                        onClick={() => void act("Approval", () => approveAdmitadProgram(program.id))}>
                        Approve
                      </button>
                    )}
                    <button type="button" className="rounded border px-2 py-1 text-xs disabled:opacity-50" disabled={busy !== null}
                      onClick={() => void act("Health check", () => checkAdmitadProgram(program.id))}>
                      Check
                    </button>
                    {program.status === "abandoned" && (
                      <button type="button" className="rounded border px-2 py-1 text-xs disabled:opacity-50" disabled={busy !== null}
                        onClick={() => void act("Reactivation", () => reactivateAdmitadProgram(program.id))}>
                        Reactivate
                      </button>
                    )}
                    {program.store_id && program.status !== "abandoned" && (
                      <button type="button" className="rounded border px-2 py-1 text-xs text-rose-700 disabled:opacity-50" disabled={busy !== null}
                        onClick={() => void act("Deactivate store", () => deactivateAdmitadStore(program.id))}>
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
          <p className="p-6 text-center text-sm text-slate-500">No Admitad programs match these filters.</p>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span aria-live="polite">
          {total} program{total === 1 ? "" : "s"} · page {Math.floor(skip / PAGE_SIZE) + 1} of {Math.max(1, Math.ceil(total / PAGE_SIZE))}
        </span>
        <div className="flex gap-2">
          <button type="button" className="rounded border px-3 py-1 disabled:opacity-40" disabled={skip === 0}
            onClick={() => setSkip(Math.max(0, skip - PAGE_SIZE))}>Previous</button>
          <button type="button" className="rounded border px-3 py-1 disabled:opacity-40" disabled={skip + PAGE_SIZE >= total}
            onClick={() => setSkip(skip + PAGE_SIZE)}>Next</button>
        </div>
      </div>

      {detailError && <p role="alert" className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">{detailError}</p>}
      {detail && (
        <section className="mt-6 rounded-md border bg-white p-4" aria-label="Program details">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">{detail.merchant_name}</h2>
              <p className="text-xs text-slate-500">
                Admitad ID {detail.external_campaign_id} · {detail.preview_url ?? "no website"}
              </p>
            </div>
            <button type="button" className="rounded border px-2 py-1 text-sm" onClick={() => setDetail(null)}>Close</button>
          </div>
          <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-4">
            <div><dt className="text-slate-500">Lifecycle</dt><dd>{detail.lifecycle_state}</dd></div>
            <div><dt className="text-slate-500">Status</dt><dd><StatusPill status={detail.status} /></dd></div>
            <div><dt className="text-slate-500">Store</dt><dd>{detail.store_name ?? "—"}</dd></div>
            <div><dt className="text-slate-500">Custom store</dt><dd>{detail.custom_store ? "Yes" : "No"}</dd></div>
            <div><dt className="text-slate-500">Preferred network</dt><dd>{detail.cross_network.preferred_network}</dd></div>
            <div><dt className="text-slate-500">VCommission match</dt><dd>{detail.cross_network.vcommission_external_id ?? "—"}</dd></div>
            <div><dt className="text-slate-500">Last health check</dt><dd>{formatDate(detail.last_health_check_at)}</dd></div>
            <div><dt className="text-slate-500">Missed syncs</dt><dd>{detail.missed_syncs}</dd></div>
          </dl>
          <h3 className="mb-2 text-sm font-semibold">Store integration health</h3>
          <ul className="mb-4 space-y-1 text-sm">
            {detail.health_checks.length === 0 && <li className="text-slate-500">No health check yet.</li>}
            {detail.health_checks.map((check) => (
              <li key={check.name} className="flex gap-2">
                <span className={check.passed ? "text-emerald-700" : "text-rose-700"}>{check.passed ? "✓" : "✗"}</span>
                <span><strong>{check.name.replace(/_/g, " ")}</strong>: {check.reason}</span>
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
