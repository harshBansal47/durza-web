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
