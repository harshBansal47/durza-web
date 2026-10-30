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
  const response = await fetch(`/api/admin/analytics/overview?${params}`, {
    cache: "no-store",
    signal,
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as
      | { detail?: string; error?: string }
      | null;
    throw new Error(body?.detail ?? body?.error ?? `Analytics request failed (${response.status})`);
  }
  return (await response.json()) as AnalyticsOverview;
}

export async function fetchAnalyticsCsv(startDate: string, endDate: string): Promise<Blob> {
  const params = new URLSearchParams({
    start_date: startDate,
    end_date: endDate,
    format: "csv",
  });
  const response = await fetch(`/api/admin/analytics/overview?${params}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as
      | { detail?: string; error?: string }
      | null;
    throw new Error(body?.detail ?? body?.error ?? `CSV export failed (${response.status})`);
  }
  return response.blob();
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

async function readError(response: Response, fallback: string): Promise<Error> {
  const body = (await response.json().catch(() => null)) as
    | { detail?: unknown; error?: string }
    | null;
  const detail = typeof body?.detail === "string" ? body.detail : undefined;
  return new Error(detail ?? body?.error ?? `${fallback} (${response.status})`);
}

export async function fetchIngestionOverview(signal?: AbortSignal): Promise<IngestionOverview> {
  const response = await fetch("/api/admin/ingestion/overview", { cache: "no-store", signal });
  if (!response.ok) throw await readError(response, "Ingestion status request failed");
  return (await response.json()) as IngestionOverview;
}

export async function fetchIngestionRuns(
  limit = 20,
  signal?: AbortSignal,
): Promise<IngestionRun[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  const response = await fetch(`/api/admin/ingestion/runs?${params}`, {
    cache: "no-store",
    signal,
  });
  if (!response.ok) throw await readError(response, "Ingestion runs request failed");
  return (await response.json()) as IngestionRun[];
}

/** Start ingestion now. Pass slugs to pick providers, or null for every enabled one. */
export async function triggerIngestion(slugs: string[] | null): Promise<IngestionRunResult> {
  const response = await fetch("/api/admin/ingestion/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(slugs ? { source_slugs: slugs } : {}),
    cache: "no-store",
  });
  if (!response.ok) throw await readError(response, "Could not start ingestion");
  return (await response.json()) as IngestionRunResult;
}
