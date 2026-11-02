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
    clientRequestConfig(signal, { cache: "no-store" }),
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
    { ...clientRequestConfig(undefined, { cache: "no-store" }), responseType: "blob" },
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

export async function fetchIngestionOverview(signal?: AbortSignal): Promise<IngestionOverview> {
  const response = await clientHttp.get<IngestionOverview>(
    clientAppUrl("/api/admin/ingestion/overview"),
    clientRequestConfig(signal, { cache: "no-store" }),
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
    clientRequestConfig(signal, { cache: "no-store" }),
  );
  return response.data;
}

/** Start ingestion now. Pass slugs to pick providers, or null for every enabled one. */
export async function triggerIngestion(slugs: string[] | null): Promise<IngestionRunResult> {
  const response = await clientHttp.post<IngestionRunResult>(
    clientAppUrl("/api/admin/ingestion/run"),
    slugs ? { source_slugs: slugs } : {},
    clientRequestConfig(undefined, { cache: "no-store" }),
  );
  return response.data;
}
import { clientAppUrl, clientHttp, clientRequestConfig } from "@/lib/client-http";
