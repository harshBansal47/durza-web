export interface AnalyticsOverview {
  traffic: {
    unique_visitors: number;
    total_sessions: number;
    total_impressions: number;
    total_clicks: number;
    top_sources: { source: string; clicks: number }[];
    device_breakdown: { device_type: string; sessions: number }[];
  };
  engagement: {
    searches: number;
    coupon_reveals: number;
    code_copies: number;
    coupon_saves: number;
    store_follows: number;
  };
  coupons: {
    impressions: number;
    clicks: number;
    ctr: number;
    verification_success: number;
    verification_failed: number;
    top_merchants: {
      merchant_id: string;
      merchant_name: string;
      impressions: number;
      clicks: number;
    }[];
  };
  affiliate: {
    outbound_clicks: number;
    conversions: number;
    revenue_by_currency: {
      currency: string;
      estimated_commission: number;
      confirmed_commission: number;
    }[];
    top_providers: {
      provider_id: string;
      provider_name: string;
      currency: string;
      clicks: number;
      conversions: number;
      estimated_commission: number;
      confirmed_commission: number;
    }[];
  };
  data_health: {
    failed_jobs_last_7d: number;
    stale_ingestion: boolean;
    latest_ingestion_status: string;
    latest_ingestion_time: string | null;
    malformed_records_last_7d: number;
  };
  meta: {
    start_date: string;
    end_date: string;
    timezone: string;
    user_role: string;
    rollups_measured: boolean;
    measurement_note: string;
  };
}
export async function fetchAnalyticsOverview(
  startDate: string,
  endDate: string,
  signal?: AbortSignal,
): Promise<AnalyticsOverview> {
  const params = new URLSearchParams({ start_date: startDate, end_date: endDate });
  const response = await clientHttp.get<AnalyticsOverview>(
    clientAppUrl(`/api/admin/analytics/overview?${params}`),
    clientRequestConfig(signal, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export interface ReadinessGate {
  name: string;
  status: "green" | "amber" | "red";
  value: string;
  reason: string;
  next_action: string;
}

export interface AcquisitionReadiness {
  overall: "green" | "red";
  gates: ReadinessGate[];
  note: string;
}

export async function fetchAcquisitionReadiness(): Promise<AcquisitionReadiness> {
  const response = await clientHttp.get<AcquisitionReadiness>(
    clientAppUrl("/api/admin/readiness"),
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export interface MonetisationRow {
  id: string;
  title: string;
  code: string | null;
  store_slug: string | null;
  clicks: number;
  destination_url: string | null;
  label: string;
  rule: string;
  accepted_unmonetised: boolean;
}

export async function fetchMonetisationQueue(): Promise<MonetisationRow[]> {
  const response = await clientHttp.get<MonetisationRow[]>(
    clientAppUrl("/api/admin/monetisation/queue"),
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function setTrackedUrl(id: string, url: string, reason: string): Promise<{ id: string; destination_url: string }> {
  const response = await clientHttp.post(
    clientAppUrl(`/api/admin/monetisation/${encodeURIComponent(id)}/url`),
    { url, reason },
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function restoreTrackedUrl(id: string): Promise<{ id: string; destination_url: string }> {
  const response = await clientHttp.post(
    clientAppUrl(`/api/admin/monetisation/${encodeURIComponent(id)}/restore`),
    {},
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function markAcceptedUnmonetised(id: string, accepted: boolean): Promise<{ id: string; accepted_unmonetised: boolean }> {
  const response = await clientHttp.post(
    clientAppUrl(`/api/admin/monetisation/${encodeURIComponent(id)}/accepted-unmonetised`),
    { accepted },
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export interface JobStatusRow {
  job: string;
  last_status: string | null;
  last_run_at: string | null;
  last_detail: string | null;
  enabled: boolean;
  next_run_at: string | null;
}

export async function fetchJobStatus(): Promise<JobStatusRow[]> {
  const response = await clientHttp.get<JobStatusRow[]>(
    clientAppUrl("/api/admin/analytics/jobs"),
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export interface ScoreboardBucket {
  label: string;
  clicks: number;
  visitors: number;
}

export interface RawEventScoreboard {
  window: { start_date: string; end_date: string };
  total_clicks: number;
  unique_visitors: number;
  returning_visitors: number;
  clicks_by_placement: ScoreboardBucket[];
  clicks_by_offer_type: ScoreboardBucket[];
  clicks_by_store_tier: ScoreboardBucket[];
  clicks_by_channel: ScoreboardBucket[];
  clicks_by_campaign: ScoreboardBucket[];
  collection_views: number;
  collection_clicks: number;
  ctr_available: boolean;
  notes: string[];
}

export async function fetchScoreboard(
  startDate: string,
  endDate: string,
  signal?: AbortSignal,
): Promise<RawEventScoreboard> {
  const params = new URLSearchParams({ start_date: startDate, end_date: endDate });
  const response = await clientHttp.get<RawEventScoreboard>(
    clientAppUrl(`/api/admin/analytics/scoreboard?${params}`),
    clientRequestConfig(signal, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function fetchAnalyticsCsv(startDate: string, endDate: string): Promise<Blob> {
  const params = new URLSearchParams({
    start_date: startDate,
    end_date: endDate,
    format: "csv",
  });
  const response = await clientHttp.get<Blob>(
    clientAppUrl(`/api/admin/analytics/overview?${params}`),
    {
      ...clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
      responseType: "blob",
    },
  );
  return response.data;
}

// ---------------------------------------------------------------------------
// Ingestion controls
// ---------------------------------------------------------------------------

export interface IngestionSource {
  slug: string;
  name: string;
  kind: string;
  is_enabled: boolean;
  /** The credentials this provider needs are present on the server. */
  configured: boolean;
  api_status: string;
  consecutive_failures: number;
  sync_interval_minutes: number;
  last_sync_at: string | null;
  last_success_at: string | null;
  last_failure_at: string | null;
  last_error: string | null;
  latest_run_status: string | null;
  latest_run_started_at: string | null;
}

export interface IngestionOverview {
  user_role: string;
  scheduler: {
    enabled: boolean;
    /** False means ingestion only runs when someone triggers it. */
    ingestion_automated: boolean;
    interval_hours: number;
  };
  sources: IngestionSource[];
}

export interface IngestionRun {
  id: string;
  source_slug: string;
  source_name: string;
  status: string;
  mode: string;
  triggered_by: string | null;
  started_at: string;
  finished_at: string | null;
  duration_ms: number | null;
  fetched: number;
  created: number;
  updated: number;
  duplicated: number;
  failed: number;
  malformed: number;
  error: string | null;
}

export interface IngestionRunResult {
  started: string[];
  skipped: { slug: string; reason: string }[];
}

export interface ShopifyProductSyncStatus {
  scheduler_enabled: boolean;
  scheduled: boolean;
  interval_hours: number;
  last_run_status: string | null;
  last_run_started_at: string | null;
  last_run_finished_at: string | null;
  last_run_duration_ms: number | null;
  last_run_detail: string | null;
}

export async function fetchIngestionOverview(signal?: AbortSignal): Promise<IngestionOverview> {
  const response = await clientHttp.get<IngestionOverview>(
    clientAppUrl("/api/admin/ingestion/overview"),
    clientRequestConfig(signal, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function fetchIngestionRuns(
  limit = 20,
  signal?: AbortSignal,
): Promise<IngestionRun[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  const response = await clientHttp.get<IngestionRun[]>(
    clientAppUrl(`/api/admin/ingestion/runs?${params}`),
    clientRequestConfig(signal, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function fetchShopifyProductSyncStatus(
  signal?: AbortSignal,
): Promise<ShopifyProductSyncStatus> {
  const response = await clientHttp.get<ShopifyProductSyncStatus>(
    clientAppUrl("/api/admin/products/sync/shopify"),
    clientRequestConfig(signal, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function triggerShopifyProductSync(): Promise<{ detail: string }> {
  const response = await clientHttp.post<{ detail: string }>(
    clientAppUrl("/api/admin/products/sync/shopify"),
    {},
    clientRequestConfig(undefined, { credentials: "include", timeoutMs: 480_000, cache: "no-store" }),
  );
  return response.data;
}

/** Start ingestion now. Pass slugs to pick providers, or null for every enabled one. */
export async function triggerIngestion(slugs: string[] | null): Promise<IngestionRunResult> {
  const response = await clientHttp.post<IngestionRunResult>(
    clientAppUrl("/api/admin/ingestion/run"),
    slugs ? { source_slugs: slugs } : {},
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}
import { clientAppUrl, clientHttp, clientRequestConfig } from "@/lib/client-http";
import type {
  AdmitadIngestionHealth,
  AdmitadProgramDetail,
  AdmitadProgramPage,
  AdmitadSyncHistory,
  CampaignActionResult,
  CampaignDashboardPage,
  CampaignDetail,
  CampaignSummary,
  MerchantAlias,
} from "@/lib/types";

export interface CampaignDashboardFilters {
  status?: string;
  search?: string;
  skip?: number;
  limit?: number;
}

function campaignPath(path: string, params?: URLSearchParams): string {
  const query = params?.toString();
  return clientAppUrl(`/api/admin/campaigns${path}${query ? `?${query}` : ""}`);
}

/** The campaign lifecycle + store-integration dashboard. */
export async function fetchCampaignDashboard(
  filters: CampaignDashboardFilters,
  signal?: AbortSignal,
): Promise<CampaignDashboardPage> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  const response = await clientHttp.get<CampaignDashboardPage>(
    campaignPath("", params),
    clientRequestConfig(signal, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function fetchCampaignDetail(
  id: string,
  signal?: AbortSignal,
): Promise<CampaignDetail> {
  const response = await clientHttp.get<CampaignDetail>(
    campaignPath(`/${encodeURIComponent(id)}`),
    clientRequestConfig(signal, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

async function campaignAction<T>(path: string, body?: unknown): Promise<T> {
  const response = await clientHttp.post<T>(
    campaignPath(path),
    body ?? {},
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function approveCampaign(id: string): Promise<CampaignDetail> {
  return campaignAction<CampaignDetail>(`/${encodeURIComponent(id)}/approve`);
}

export async function runCampaignHealthCheck(id: string): Promise<CampaignHealthCheckResult> {
  return campaignAction<CampaignHealthCheckResult>(`/${encodeURIComponent(id)}/health-check`);
}

export async function bulkCampaignHealthCheck(limit = 100): Promise<CampaignBulkResult> {
  return campaignAction<CampaignBulkResult>(`/health-check/bulk?limit=${limit}`);
}

export async function deactivateCampaignStore(id: string): Promise<CampaignActionResult> {
  return campaignAction<CampaignActionResult>(`/${encodeURIComponent(id)}/deactivate-store`);
}

export async function reactivateCampaign(id: string): Promise<CampaignDetail> {
  return campaignAction<CampaignDetail>(`/${encodeURIComponent(id)}/reactivate`);
}

export async function syncCampaignsNow(): Promise<CampaignActionResult> {
  return campaignAction<CampaignActionResult>("/sync");
}

export async function fetchCampaignSummary(): Promise<CampaignSummary> {
  const response = await clientHttp.get<CampaignSummary>(
    campaignPath("/summary"),
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export interface CampaignHealthCheckResult {
  passed_all: boolean;
  checks: Array<{ name: string; passed: boolean; reason: string }>;
  failure_reasons: string[];
  checked_by: string | null;
}

export interface CampaignBulkResult {
  checked: number;
  working: number;
  needs_attention: number;
  failed: string[];
}

// ---- Admitad Program Manager ------------------------------------------------

function admitadPath(path: string, params?: URLSearchParams): string {
  const query = params?.toString();
  return clientAppUrl(`/api/admin/admitad${path}${query ? `?${query}` : ""}`);
}

export async function fetchAdmitadPrograms(
  filters: CampaignDashboardFilters,
  signal?: AbortSignal,
): Promise<AdmitadProgramPage> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  const response = await clientHttp.get<AdmitadProgramPage>(
    admitadPath("", params),
    clientRequestConfig(signal, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function fetchAdmitadProgramDetail(
  id: string,
  signal?: AbortSignal,
): Promise<AdmitadProgramDetail> {
  const response = await clientHttp.get<AdmitadProgramDetail>(
    admitadPath(`/${encodeURIComponent(id)}`),
    clientRequestConfig(signal, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

async function admitadAction<T>(path: string, body: unknown = {}): Promise<T> {
  const response = await clientHttp.post<T>(
    admitadPath(path),
    body,
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function approveAdmitadProgram(id: string): Promise<AdmitadProgramDetail> {
  return admitadAction<AdmitadProgramDetail>(`/${encodeURIComponent(id)}/approve`);
}

export async function checkAdmitadProgram(id: string): Promise<CampaignHealthCheckResult> {
  return admitadAction<CampaignHealthCheckResult>(`/${encodeURIComponent(id)}/health-check`);
}

export async function bulkCheckAdmitadPrograms(limit = 100): Promise<CampaignBulkResult> {
  return admitadAction<CampaignBulkResult>(`/health-check/bulk?limit=${limit}`);
}

export async function deactivateAdmitadStore(id: string): Promise<CampaignActionResult> {
  return admitadAction<CampaignActionResult>(`/${encodeURIComponent(id)}/deactivate-store`);
}

export async function reactivateAdmitadProgram(id: string): Promise<AdmitadProgramDetail> {
  return admitadAction<AdmitadProgramDetail>(`/${encodeURIComponent(id)}/reactivate`);
}

export async function syncAdmitadPrograms(): Promise<CampaignActionResult> {
  return admitadAction<CampaignActionResult>("/sync");
}

export async function runAdmitadIngestion(): Promise<CampaignActionResult> {
  return admitadAction<CampaignActionResult>("/ingestion/run");
}

export async function fetchAdmitadSyncHistory(): Promise<AdmitadSyncHistory> {
  const response = await clientHttp.get<AdmitadSyncHistory>(
    admitadPath("/sync/history"),
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function fetchAdmitadIngestionHealth(): Promise<AdmitadIngestionHealth> {
  const response = await clientHttp.get<AdmitadIngestionHealth>(
    admitadPath("/ingestion/health"),
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function fetchMerchantAliases(status?: string): Promise<MerchantAlias[]> {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  const response = await clientHttp.get<MerchantAlias[]>(
    admitadPath("/aliases", params),
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store" }),
  );
  return response.data;
}

export async function resolveMerchantAlias(
  id: string,
  decision: "confirm" | "reject",
  storeId?: string,
): Promise<{ detail: string }> {
  const params = new URLSearchParams();
  if (storeId) params.set("store_id", storeId);
  return admitadAction<{ detail: string }>(`/aliases/${encodeURIComponent(id)}/${decision}?${params}`);
}

export async function sendTelegram(couponId: string, title?: string): Promise<{ message_id: number }> {
  // Telegram is rate-limited and may retry on our behalf, so the outbound API
  // call can sit longer than 8s with no fault. The default transport timeout
  // is 8s — for the admin Approve & send path we wait longer, on purpose.
  const response = await clientHttp.post<{ message_id: number }>(
    clientAppUrl("/api/admin/telegram/send"),
    { coupon_id: couponId, title },
    clientRequestConfig(undefined, { credentials: "include", cache: "no-store", timeoutMs: 30_000 }),
  );
  return response.data;
}
