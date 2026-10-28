"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  Copy,
  Download,
  Eye,
  Heart,
  MousePointerClick,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";
import { DataBars, EmptyState, MetricCard, Panel } from "@/components/admin/DashboardCards";
import {
  fetchAnalyticsCsv,
  fetchAnalyticsOverview,
  type AnalyticsOverview,
} from "@/lib/api/admin";

function localDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function money(value: number, currency: string): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function AdminAnalyticsDashboard() {
  const today = localDate(new Date());
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
  const [startDate, setStartDate] = useState(localDate(thirtyDaysAgo));
  const [endDate, setEndDate] = useState(today);
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [reload, setReload] = useState(0);

  const handleExport = async () => {
    setExportError(null);
    setExporting(true);
    try {
      const blob = await fetchAnalyticsCsv(startDate, endDate);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `analytics_${startDate}_${endDate}.csv`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch (cause) {
      setExportError(cause instanceof Error ? cause.message : "Could not export analytics.");
    } finally {
      setExporting(false);
    }
  };

  const fetchData = useCallback(
    async (signal: AbortSignal) => {
      if (!startDate || !endDate || startDate > endDate) {
        setLoading(false);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const overview = await fetchAnalyticsOverview(startDate, endDate, signal);
        setData(overview);
      } catch (cause) {
        if (!signal.aborted) {
          setError(cause instanceof Error ? cause.message : "Could not load analytics.");
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    },
    [startDate, endDate],
  );

  useEffect(() => {
    const controller = new AbortController();
    void fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData, reload]);

  const isDateRangeValid = Boolean(startDate && endDate && startDate <= endDate);
  const healthNeedsAttention = Boolean(
    data?.data_health.stale_ingestion || data?.data_health.failed_jobs_last_7d,
  );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
              Durza back office
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">Analytics overview</h1>
            <p className="mt-2 text-sm text-gray-500">
              Aggregated product, traffic, affiliate, and operations metrics.
              {data ? ` All dates shown in ${data.meta.timezone}.` : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="text-xs font-medium text-gray-600">
              From
              <span className="mt-1 flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2">
                <CalendarDays aria-hidden="true" className="h-4 w-4 text-gray-400" />
                <input
                  aria-label="Start date"
                  className="min-w-0 bg-transparent text-sm outline-none"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </span>
            </label>
            <label className="text-xs font-medium text-gray-600">
              Through
              <span className="mt-1 flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2">
                <CalendarDays aria-hidden="true" className="h-4 w-4 text-gray-400" />
                <input
                  aria-label="End date"
                  className="min-w-0 bg-transparent text-sm outline-none"
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </span>
            </label>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
              disabled={!isDateRangeValid || loading}
              onClick={() => setReload((current) => current + 1)}
              type="button"
            >
              <RefreshCw aria-hidden="true" className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            {data?.meta.user_role === "admin" ? (
              <button
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50"
                disabled={exporting}
                onClick={() => void handleExport()}
                type="button"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                {exporting ? "Exporting…" : "Export CSV"}
              </button>
            ) : null}
          </div>
        </header>

        {!isDateRangeValid ? (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
            Choose a valid date range. The start date must not be after the end date.
          </div>
        ) : null}
        {error ? (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
            <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Analytics could not be loaded</p>
              <p className="mt-1">{error}</p>
            </div>
            <button className="font-semibold underline" onClick={() => setReload((value) => value + 1)} type="button">
              Retry
            </button>
          </div>
        ) : null}
        {exportError ? (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
            CSV export failed: {exportError}
          </div>
        ) : null}
        {loading && !data ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-gray-500" role="status">
            <RefreshCw aria-hidden="true" className="h-5 w-5 animate-spin text-orange-600" />
            Loading analytics…
          </div>
        ) : null}
        {data ? (
          <div aria-busy={loading}>
            {loading ? <p className="mb-3 text-right text-xs text-gray-500">Updating…</p> : null}
            <section aria-label="Traffic summary" className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard title="Unique visitors" value={data.traffic.unique_visitors.toLocaleString()} icon={<Users aria-hidden="true" className="h-5 w-5 text-blue-600" />} />
              <MetricCard title="Sessions" value={data.traffic.total_sessions.toLocaleString()} />
              <MetricCard title="Impressions" value={data.traffic.total_impressions.toLocaleString()} />
              <MetricCard title="Traffic clicks" value={data.traffic.total_clicks.toLocaleString()} icon={<MousePointerClick aria-hidden="true" className="h-5 w-5 text-green-600" />} />
            </section>

            <div className="mb-8 grid gap-5 lg:grid-cols-2">
              <Panel title="Traffic sources" detail="Clicks from daily traffic rollups">
                <DataBars rows={data.traffic.top_sources.map((item) => ({ label: item.source, value: item.clicks }))} />
              </Panel>
              <Panel title="Devices" detail="Sessions grouped by device type">
                <DataBars rows={data.traffic.device_breakdown.map((item) => ({ label: item.device_type, value: item.sessions }))} />
              </Panel>
            </div>

            <Panel title="Engagement" detail="Recorded event counts for the selected UTC dates">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <MetricCard title="Searches" value={data.engagement.searches.toLocaleString()} icon={<Search aria-hidden="true" className="h-5 w-5 text-purple-600" />} />
                <MetricCard title="Coupon reveals" value={data.engagement.coupon_reveals.toLocaleString()} icon={<Eye aria-hidden="true" className="h-5 w-5 text-pink-600" />} />
                <MetricCard title="Code copies" value={data.engagement.code_copies.toLocaleString()} icon={<Copy aria-hidden="true" className="h-5 w-5 text-indigo-600" />} />
                <MetricCard title="Coupon saves" value={data.engagement.coupon_saves.toLocaleString()} />
                <MetricCard title="Store follows" value={data.engagement.store_follows.toLocaleString()} icon={<Heart aria-hidden="true" className="h-5 w-5 text-red-600" />} />
              </div>
            </Panel>

            <div className="my-8 grid gap-5 lg:grid-cols-2">
              <Panel title="Coupon performance" detail={`CTR ${data.coupons.ctr.toFixed(2)}% · ${data.coupons.impressions.toLocaleString()} impressions · ${data.coupons.clicks.toLocaleString()} clicks`}>
                <div className="mb-5 grid grid-cols-2 gap-3">
                  <MetricCard title="Automated checks worked" value={data.coupons.verification_success.toLocaleString()} />
                  <MetricCard title="Automated checks failed" value={data.coupons.verification_failed.toLocaleString()} />
                </div>
                {data.coupons.top_merchants.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="text-xs uppercase tracking-wide text-gray-500">
                        <tr><th className="pb-2 font-medium">Top merchant</th><th className="pb-2 text-right font-medium">Impressions</th><th className="pb-2 text-right font-medium">Clicks</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {data.coupons.top_merchants.map((merchant) => (
                          <tr key={merchant.merchant_id}>
                            <td className="py-2 pr-3 font-medium">{merchant.merchant_name}</td>
                            <td className="py-2 text-right">{merchant.impressions.toLocaleString()}</td>
                            <td className="py-2 text-right">{merchant.clicks.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : <EmptyState message="No merchant rollups for this date range." />}
              </Panel>
              <Panel title="Affiliate performance" detail="Revenue is kept separate by currency; no currency conversion is assumed.">
                <div className="mb-5 grid grid-cols-2 gap-3">
                  <MetricCard title="Outbound clicks" value={data.affiliate.outbound_clicks.toLocaleString()} />
                  <MetricCard title="Conversions" value={data.affiliate.conversions.toLocaleString()} />
                </div>
                {data.affiliate.revenue_by_currency.length ? (
                  <div className="mb-5 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="text-xs uppercase tracking-wide text-gray-500">
                        <tr><th className="pb-2 font-medium">Currency</th><th className="pb-2 text-right font-medium">Estimated</th><th className="pb-2 text-right font-medium">Confirmed</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {data.affiliate.revenue_by_currency.map((item) => (
                          <tr key={item.currency}>
                            <td className="py-2 font-medium">{item.currency}</td>
                            <td className="py-2 text-right">{money(item.estimated_commission, item.currency)}</td>
                            <td className="py-2 text-right">{money(item.confirmed_commission, item.currency)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : <EmptyState message="No affiliate commission rollups for this date range." />}
                {data.affiliate.top_providers.length ? (
                  <ul className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                    {data.affiliate.top_providers.map((provider) => (
                      <li className="flex justify-between gap-3" key={`${provider.provider_id}-${provider.currency}`}>
                        <span className="truncate">{provider.provider_name} <span className="text-gray-500">({provider.currency})</span></span>
                        <span className="shrink-0 text-gray-600">{provider.conversions.toLocaleString()} conversions · {money(provider.confirmed_commission, provider.currency)} confirmed</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Panel>
            </div>

            <Panel title="Operations and data health" detail="Operational counters use a rolling seven-day window, independent of the selected analytics dates.">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  title="Ingestion"
                  value={data.data_health.latest_ingestion_status}
                  detail={data.data_health.latest_ingestion_time
                    ? `Started ${new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short", timeZone: data.meta.timezone }).format(new Date(data.data_health.latest_ingestion_time))}`
                    : "No ingestion run recorded"}
                  icon={<AlertTriangle aria-hidden="true" className={`h-5 w-5 ${data.data_health.stale_ingestion ? "text-red-600" : "text-green-600"}`} />}
                />
                <MetricCard title="Failed jobs (7 days)" value={data.data_health.failed_jobs_last_7d.toLocaleString()} />
                <MetricCard title="Malformed records (7 days)" value={data.data_health.malformed_records_last_7d.toLocaleString()} />
                <MetricCard title="Ingestion freshness" value={data.data_health.stale_ingestion ? "Stale" : "Current"} detail={data.data_health.stale_ingestion ? "No run started in the last 48 hours" : "A run started within the last 48 hours"} />
              </div>
              {healthNeedsAttention ? (
                <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                  One or more ingestion or scheduled-job health checks need attention.
                </p>
              ) : null}
            </Panel>
          </div>
        ) : null}
      </div>
    </main>
  );
}
