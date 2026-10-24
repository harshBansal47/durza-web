import type {
  CouponSort,
  AlertEvent,
  AutocompleteResult,
  Category,
  CouponPublic,
  DiscountType,
  EditorialContent,
  EditorialHomepage,
  EditorialType,
  CmsPage,
  NotificationPreference,
  Paginated,
  Ad,
  AdPosition,
  PricePoint,
  Product,
  PushPublicKey,
  PushState,
  PushSubscriptionPayload,
  SavedItem,
  Store,
  StoreDestination,
  TokenPair,
  TrackedProduct,
  User,
  VerificationHistoryItem,
  VerifyResponse,
} from "./types";

/**
 * The API as the browser reaches it. Everything that builds a URL a visitor
 * follows — affiliate redirects, OAuth — uses this, so it is never the private
 * address below.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

/**
 * The base for server-side reads. When the Next server shares a host with the
 * API, set API_INTERNAL_URL to the private address (e.g.
 * `http://127.0.0.1:8000/api/v1`) so a render does not leave the host and come
 * straight back through the public domain.
 *
 * Deliberately a function: the env read only runs where `process.env` is real,
 * so a private address can never end up in a link the browser follows, and no
 * client bundle depends on how the bundler handles a non-public variable.
 */
function serverApiUrl(): string {
  if (typeof window !== "undefined") return API_URL;
  return process.env.API_INTERNAL_URL?.trim() || API_URL;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type FetchOptions = RequestInit & {
  /** Next.js data-cache revalidate window, in seconds. Omit to opt out of caching. */
  revalidate?: number;
  /** Bearer token for authenticated endpoints. Server-only in practice. */
  token?: string | null;
};

export interface SaleSeriesResponse {
  series: string;
  title?: string;
  description?: string;
  edition: string;
  year?: number;
  lifecycle_status?: string;
  start_at?: string | null;
  end_at?: string | null;
  dates_confirmed?: boolean;
  coupons?: CouponPublic[];
}

export interface SaleEditionResponse {
  series: string;
  title?: string;
  edition: string;
  year?: number;
  lifecycle_status: string;
  dates_confirmed: boolean;
  start_at?: string | null;
  end_at?: string | null;
  content_ref?: string;
  coupons?: CouponPublic[];
}

/**
 * Upper bound for any API call. Without one, a single slow or hung endpoint
 * stalls the whole page render (pages await several calls together) for as long
 * as the server cares to wait. The `resilient.*` wrappers already turn a failure
 * into an empty fallback, so a timeout lets the page render without that one
 * piece instead of not rendering at all.
 */
const REQUEST_TIMEOUT_MS = 8000;

function timeoutSignal(): AbortSignal | undefined {
  // AbortSignal.timeout is missing from older WebViews (the Capacitor apps).
  return typeof AbortSignal !== "undefined" && "timeout" in AbortSignal
    ? AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    : undefined;
}

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { revalidate, token, headers, ...rest } = options;
  const base = serverApiUrl();
  const res = await fetch(`${base}${path}`, {
    ...rest,
    signal: rest.signal ?? timeoutSignal(),
    headers: {
      ...(rest.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    // Server Components: cache briefly so a busy listing page doesn't hammer
    // the API on every request, but stay close to real-time for verify counts.
    next: revalidate !== undefined ? { revalidate } : undefined,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new ApiError(extractDetail(body) || res.statusText, res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

/** FastAPI puts the human-readable reason in `detail`, sometimes as a list. */
function extractDetail(body: string): string {
  if (!body) return "";
  try {
    const parsed: unknown = JSON.parse(body);
    if (typeof parsed === "string") return parsed;
    if (parsed && typeof parsed === "object" && "detail" in parsed) {
      const detail = (parsed as { detail: unknown }).detail;
      if (typeof detail === "string") return detail;
      if (Array.isArray(detail) && detail.length > 0) {
        const first = detail[0] as { msg?: string };
        return first.msg ?? "Invalid input";
      }
    }
  } catch {
    // Not JSON — fall through to the raw text.
  }
  return body.slice(0, 300);
}

/** Serialises params into a query string, dropping empty values. */
function qs(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null && item !== "") search.append(key, String(item));
      }
    } else if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  }
  const s = search.toString();
  return s ? `?${s}` : "";
}

export interface CouponListParams {
  store_id?: string;
  category_id?: string;
  store_ids?: string[];
  category_ids?: string[];
  search?: string;
  active_only?: boolean;
  sort?: CouponSort;
  discount_type?: DiscountType;
  /** true = a code the shopper types, false = an auto-applied deal. */
  has_code?: boolean;
  /** true = somebody has confirmed it at least once. */
  verified?: boolean;
  /** 0..1; offers with no reports at all are excluded, whatever the value. */
  min_success_rate?: number;
  /** Only coupons that really expire within this many days. */
  expires_within_days?: number;
  /** Only coupons confirmed within this many hours. `total` is then an exact count. */
  verified_within_hours?: number;
  skip?: number;
  limit?: number;
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface StoreListParams {
  search?: string;
  country_code?: string;
  skip?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}

function goQuery(src?: string, contentRef?: string): string {
  const parts: string[] = [];
  if (src) parts.push(`src=${encodeURIComponent(src)}`);
  if (contentRef) parts.push(`content_ref=${encodeURIComponent(contentRef)}`);
  return parts.length ? `?${parts.join("&")}` : "";
}

export const api = {
  // ---- Public catalogue -------------------------------------------------

  listCoupons: (params: CouponListParams = {}) =>
    apiFetch<Paginated<CouponPublic>>(`/coupons${qs(params)}`, { revalidate: 300 }),

  getCouponBySlug: (slug: string) =>
    apiFetch<CouponPublic>(`/coupons/by-slug/${encodeURIComponent(slug)}`, { revalidate: 300 }),

  /**
   * Live vote counts for one coupon, never cached. The coupon page itself is
   * cached for five minutes, so the counts baked into it can be stale; the vote
   * widget asks again once it is on screen.
   */
  getCouponStats: (couponId: string) =>
    apiFetch<CouponPublic>(`/coupons/${couponId}`, { cache: "no-store" }),

  /** Account pages hold coupon ids (from /me/saved-coupons), not slugs. */
  getCouponById: (couponId: string) =>
    apiFetch<CouponPublic>(`/coupons/${couponId}`, { revalidate: 300 }),

  /**
   * Affiliate URLs are only ever resolved by the server-side /go redirect.
   * `src` tags which surface sent the click ("coupon-page", "sticky-bar", ...);
   * the backend only accepts short lowercase tags and files anything else as "unknown".
   */
  goUrl: (couponId: string, src?: string, contentRef?: string) => `${API_URL}/coupons/${couponId}/go${goQuery(src, contentRef)}`,

  /** Live sponsored placements (the backend already enforces the booked window). */
  listAds: (params: { position?: AdPosition; limit?: number } = {}) =>
    apiFetch<Paginated<Ad>>(`/ads${qs(params)}`, { revalidate: 600 }),

  /** Tracked redirect to an advertiser. The advertiser URL is never in API JSON. */
  adGoUrl: (adId: string, src?: string, contentRef?: string) => `${API_URL}/ads/${adId}/go${goQuery(src, contentRef)}`,

  /** Tracked redirect to a product's store page. The raw URL is never in API JSON. */
  productGoUrl: (productId: string, src?: string, contentRef?: string) =>
    `${API_URL}/products/${productId}/go${goQuery(src, contentRef)}`,

  verifyCoupon: (couponId: string, worked: boolean, note?: string) =>
    apiFetch<VerifyResponse>(`/coupons/${couponId}/verify`, {
      method: "POST",
      body: JSON.stringify({ worked, ...(note ? { note } : {}) }),
      cache: "no-store",
    }),

  recordImpression: (body: {
    coupon_id: string;
    merchant_id: string;
    page_type: string;
    page_id?: string;
    list_id?: string;
    position: number;
    ranking_version?: string;
    ranking_score?: number | null;
    source?: string;
    referrer?: string;
    device_type?: string;
    country?: string;
    sponsored?: boolean;
  }) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1"}/analytics/impression`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      credentials: "include",
    }).then((r) => {
      if (!r.ok) throw new Error("impression failed");
    }),

  getCouponVerificationHistory: (couponId: string, limit = 50) =>
    apiFetch<VerificationHistoryItem[]>(`/coupons/${couponId}/verification-history${qs({ limit })}`, {
      revalidate: 300,
    }),

  listStores: (params: StoreListParams = {}) =>
    apiFetch<Paginated<Store>>(`/stores${qs(params)}`, { revalidate: 300 }),

  getStoreById: (storeId: string) => apiFetch<Store>(`/stores/${storeId}`, { revalidate: 300 }),

  getStoreBySlug: (slug: string) =>
    apiFetch<Store>(`/stores/by-slug/${encodeURIComponent(slug)}`, { revalidate: 300 }),

  getStoreDestination: (slug: string) =>
    apiFetch<StoreDestination>(`/stores/by-slug/${encodeURIComponent(slug)}/destination`, {
      revalidate: 300,
    }),

  listEditorial: (
    params: { content_type?: EditorialType; skip?: number; limit?: number } = {},
  ) => apiFetch<Paginated<EditorialContent>>(`/editorial${qs(params)}`, { revalidate: 300 }),

  getEditorial: (contentType: EditorialType, slug: string) =>
    apiFetch<EditorialContent>(
      `/editorial/${contentType}/${encodeURIComponent(slug)}`,
      { revalidate: 300 },
    ),

  getEditorialHomepage: () =>
    apiFetch<EditorialHomepage>("/editorial/homepage", { revalidate: 300 }),

  listSales: () => apiFetch<{ slug: string; title: string }[]>(`/sales`, { revalidate: 300 }),
  getSaleSeries: (series: string) =>
    apiFetch<SaleSeriesResponse>(`/sales/${encodeURIComponent(series)}`, { revalidate: 300 }),
  getSaleEdition: (series: string, edition: string) =>
    apiFetch<SaleEditionResponse>(
      `/sales/${encodeURIComponent(series)}/${encodeURIComponent(edition)}`,
      { revalidate: 300 },
    ),

  /** ISO 3166-1 alpha-2 codes Durza currently serves. */
  listMarkets: () => apiFetch<string[]>(`/stores/markets`, { revalidate: 3600 }),

  listCategories: (params: { parent_id?: string; limit?: number; skip?: number } = {}) =>
    apiFetch<Paginated<Category>>(`/categories${qs(params)}`, { revalidate: 300 }),

  getCategoryBySlug: (slug: string) =>
    apiFetch<Category>(`/categories/by-slug/${encodeURIComponent(slug)}`, { revalidate: 300 }),

  getPageBySlug: (slug: string) => apiFetch<CmsPage>(`/pages/by-slug/${encodeURIComponent(slug)}`, { revalidate: 300 }),

  listProducts: (
    params: { search?: string; store_id?: string; category_id?: string; skip?: number; limit?: number } = {},
  ) => apiFetch<Paginated<Product>>(`/products${qs(params)}`, { revalidate: 300 }),

  getProductBySlug: (slug: string) => apiFetch<Product>(`/products/by-slug/${encodeURIComponent(slug)}`, { revalidate: 300 }),

  getProductById: (id: string) => apiFetch<Product>(`/products/${id}`, { revalidate: 300 }),

  getPriceHistory: (productId: string) =>
    apiFetch<PricePoint[]>(`/products/${productId}/price-history`, { revalidate: 300 }),

  // ---- Autocomplete (no cache, abortable) -------------------------------

  autocompleteStores: (query: string, limit = 10) =>
    apiFetch<string[]>(`/stores/autocomplete${qs({ q: query, limit })}`, { cache: "no-store" }),

  autocompleteCategories: (query: string, limit = 10) =>
    apiFetch<string[]>(`/categories/autocomplete${qs({ q: query, limit })}`, { cache: "no-store" }),

  autocompleteProducts: (query: string, limit = 10) =>
    apiFetch<string[]>(`/products/autocomplete${qs({ q: query, limit })}`, { cache: "no-store" }),

  /**
   * Type-ahead across stores, categories and products. Always runs uncached and
   * takes an AbortSignal so stale keystrokes can be dropped.
   */
  autocomplete: async (
    query: string,
    opts: { limit?: number; signal?: AbortSignal } = {},
  ): Promise<AutocompleteResult> => {
    const { limit = 5, signal } = opts;
    const run = (path: string) => apiFetch<string[]>(`${path}${qs({ q: query, limit })}`, { cache: "no-store", signal });
    const [stores, categories, products] = await Promise.allSettled([
      run("/stores/autocomplete"),
      run("/categories/autocomplete"),
      run("/products/autocomplete"),
    ]);
    return {
      stores: stores.status === "fulfilled" ? stores.value : [],
      categories: categories.status === "fulfilled" ? categories.value : [],
      products: products.status === "fulfilled" ? products.value : [],
    };
  },

  // ---- Auth -------------------------------------------------------------

  /** Ask the backend for a passwordless email sign-in code. */
  requestEmailOtp: (email: string) =>
    apiFetch<void>("/auth/email/request", {
      method: "POST",
      body: JSON.stringify({ email }),
      cache: "no-store",
    }),

  /** Exchange a six-digit sign-in code for a token pair. */
  verifyEmailOtp: (email: string, code: string) =>
    apiFetch<TokenPair>("/auth/email/verify", {
      method: "POST",
      body: JSON.stringify({ email, code }),
      cache: "no-store",
    }),

  /** Start Google OAuth: returns the URL the browser should visit. */
  googleLoginUrl: (returnTo = "/account") =>
    `${API_URL}/auth/google?redirect=${encodeURIComponent(returnTo)}`,

  /** Revoke the current session and every token issued before the logout. */
  logout: (token: string) =>
    apiFetch<void>("/auth/logout", {
      method: "POST",
      token,
      cache: "no-store",
    }),

  refresh: (refresh_token: string) =>
    apiFetch<TokenPair>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token }),
      cache: "no-store",
    }),

  me: (token: string) => apiFetch<User>("/auth/me", { token, cache: "no-store" }),

  /** Self-service profile edit: display name. */
  updateMe: (token: string, patch: { full_name?: string | null }) =>
    apiFetch<User>("/auth/me", {
      method: "PATCH",
      token,
      body: JSON.stringify(patch),
      cache: "no-store",
    }),

  // ---- Account (/me) ----------------------------------------------------

  listSavedStores: (token: string) => apiFetch<SavedItem[]>("/me/saved-stores", { token, cache: "no-store" }),

  saveStore: (token: string, storeId: string) =>
    apiFetch<{ status: string }>(`/me/saved-stores/${storeId}`, { method: "POST", token, cache: "no-store" }),

  unsaveStore: (token: string, storeId: string) =>
    apiFetch<void>(`/me/saved-stores/${storeId}`, { method: "DELETE", token, cache: "no-store" }),

  listSavedCoupons: (token: string) => apiFetch<SavedItem[]>("/me/saved-coupons", { token, cache: "no-store" }),

  saveCoupon: (token: string, couponId: string) =>
    apiFetch<{ status: string }>(`/me/saved-coupons/${couponId}`, { method: "POST", token, cache: "no-store" }),

  unsaveCoupon: (token: string, couponId: string) =>
    apiFetch<void>(`/me/saved-coupons/${couponId}`, { method: "DELETE", token, cache: "no-store" }),

  listTrackedProducts: (token: string) =>
    apiFetch<TrackedProduct[]>("/me/tracked-products", { token, cache: "no-store" }),

  trackProduct: (token: string, productId: string, targetPrice?: number | null) =>
    apiFetch<TrackedProduct>("/me/tracked-products", {
      method: "POST",
      token,
      body: JSON.stringify({ product_id: productId, target_price: targetPrice ?? null }),
      cache: "no-store",
    }),

  updateTrackedProduct: (token: string, trackedId: string, targetPrice: number | null) =>
    apiFetch<TrackedProduct>(`/me/tracked-products/${trackedId}`, {
      method: "PATCH",
      token,
      body: JSON.stringify({ target_price: targetPrice }),
      cache: "no-store",
    }),

  untrackProduct: (token: string, trackedId: string) =>
    apiFetch<void>(`/me/tracked-products/${trackedId}`, { method: "DELETE", token, cache: "no-store" }),

  getNotificationPreferences: (token: string) =>
    apiFetch<NotificationPreference>("/me/notification-preferences", { token, cache: "no-store" }),

  updateNotificationPreferences: (
    token: string,
    patch: Partial<Pick<NotificationPreference, "email_enabled" | "telegram_enabled" | "telegram_chat_id" | "push_enabled" | "push_subscription">>,
  ) =>
    apiFetch<NotificationPreference>("/me/notification-preferences", {
      method: "PATCH",
      token,
      body: JSON.stringify(patch),
      cache: "no-store",
    }),

  /** Permanently delete the current user's account. */
  deleteAccount: (token: string, confirmEmail: string) =>
    apiFetch<void>("/auth/me", {
      method: "DELETE",
      token,
      body: JSON.stringify({ confirm_email: confirmEmail }),
      cache: "no-store",
    }),

  listAlerts: (token: string, limit = 50) =>
    apiFetch<AlertEvent[]>(`/me/alerts${qs({ limit })}`, { token, cache: "no-store" }),

  /**
   * The VAPID public key, from the API rather than from a build-time env var.
   *
   * Two sources of truth for one key is a footgun: they drift, and the symptom
   * is `subscribe()` throwing an opaque crypto error on exactly one deployment.
   * It also carries `enabled`, which an env var cannot — the frontend needs to
   * tell "push is off here" apart from "push is broken here", and only the
   * backend knows which.
   */
  getPushPublicKey: () =>
    apiFetch<PushPublicKey>("/me/push/key", { cache: "no-store" }),

  /**
   * Register this browser's subscription. Enables push as a side effect: the
   * browser only produces a subscription after an explicit permission grant, so
   * its arrival is the consent.
   */
  subscribePush: (token: string, subscription: PushSubscriptionPayload) =>
    apiFetch<PushState>("/me/push/subscription", {
      method: "PUT",
      token,
      body: JSON.stringify(subscription),
      cache: "no-store",
    }),

  /** Forget this browser's subscription server-side. */
  unsubscribePush: (token: string) =>
    apiFetch<void>("/me/push/subscription", { method: "DELETE", token, cache: "no-store" }),
};

export { extractDetail };
export default api;
/* ------------------------------------------------------------------ */
/* Resilient wrappers                                                   */
/* ------------------------------------------------------------------ */

/**
 * Public-catalogue reads that must never take a page down with them.
 *
 * A storefront that 500s because the API had a bad minute is worse than one
 * that renders with an empty section, and a static build must not need a live
 * API to succeed. Every wrapper here degrades to an empty result instead of
 * throwing. Authenticated calls deliberately do NOT appear here — a failed
 * account read should surface as an error state, not as "you have no saved
 * items".
 */

/** Element type is preserved so callers still get the right shape on success. */
function orEmpty<T>(promise: Promise<Paginated<T>>): Promise<Paginated<T>> {
  return promise.catch(() => ({ items: [], total: 0, skip: 0, limit: 0 }));
}

function orNull<T>(promise: Promise<T>): Promise<T | null> {
  return promise.catch(() => null);
}

function orEmptyArray<T>(promise: Promise<T[]>): Promise<T[]> {
  return promise.catch(() => []);
}

export const resilient = {
  listCoupons: (params: CouponListParams = {}) => orEmpty(api.listCoupons(params)),
  getCouponBySlug: (slug: string) => orNull(api.getCouponBySlug(slug)),
  getCouponById: (couponId: string) => orNull(api.getCouponById(couponId)),
  listStores: (params: StoreListParams = {}) => orEmpty(api.listStores(params)),
  listAds: (params: { position?: AdPosition; limit?: number } = {}) =>
    orEmpty(api.listAds(params)),
  getStoreBySlug: (slug: string) => orNull(api.getStoreBySlug(slug)),
  getStoreDestination: (slug: string) => orNull(api.getStoreDestination(slug)),
  getStoreById: (storeId: string) => orNull(api.getStoreById(storeId)),
  listMarkets: () => orEmptyArray(api.listMarkets()),
  listCategories: (params: { parent_id?: string; limit?: number; skip?: number } = {}) =>
    orEmpty(api.listCategories(params)),
  getCategoryBySlug: (slug: string) => orNull(api.getCategoryBySlug(slug)),
  listProducts: (
    params: { search?: string; store_id?: string; category_id?: string; skip?: number; limit?: number } = {},
  ) => orEmpty(api.listProducts(params)),
  getProductBySlug: (slug: string) => orNull(api.getProductBySlug(slug)),
  getProductById: (id: string) => orNull(api.getProductById(id)),
  getPriceHistory: (productId: string) => orEmptyArray(api.getPriceHistory(productId)),
  getPageBySlug: (slug: string) => orNull(api.getPageBySlug(slug)),
  getCouponVerificationHistory: (couponId: string, limit = 50) =>
    orEmptyArray(api.getCouponVerificationHistory(couponId, limit)),
  listEditorial: (params: { content_type?: EditorialType; skip?: number; limit?: number } = {}) =>
    orEmpty(api.listEditorial(params)),
  getEditorial: (contentType: EditorialType, slug: string) =>
    orNull(api.getEditorial(contentType, slug)),
  getEditorialHomepage: () =>
    orNull(api.getEditorialHomepage()),
  listSales: () => orEmptyArray(api.listSales()),
  getSaleSeries: (series: string) => orNull(api.getSaleSeries(series)),
  getSaleEdition: (series: string, edition: string) => orNull(api.getSaleEdition(series, edition)),
};
