import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { ApiError, apiErrorMessage } from "@/lib/api-error";
import { getPublicApiBaseUrl } from "@/lib/api-url";

/** Browser transport only. Session refresh and bearer tokens remain server-side. */
export const clientHttp = axios.create({
  timeout: 8_000,
  withCredentials: false,
  adapter: "fetch",
});

/** Build an absolute FastAPI URL; relative URLs stay on the Next.js origin. */
export function clientApiUrl(path: string): string {
  return `${getPublicApiBaseUrl()}${path}`;
}

export function clientAppUrl(path: string): string {
  return typeof window === "undefined" ? path : new URL(path, window.location.origin).toString();
}

clientHttp.interceptors.request.use((config) => {
  config.headers.set("Accept", "application/json");
  return config;
});

clientHttp.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isCancel(error)) return Promise.reject(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<unknown>;
      const status = axiosError.response?.status ?? 0;
      const fallback = axiosError.response?.statusText || axiosError.message || "Request failed";
      return Promise.reject(
        new ApiError(apiErrorMessage(axiosError.response?.data, fallback), status, { cause: error }),
      );
    }
    return Promise.reject(error);
  },
);

/** Configure the few transport options that differ per existing API call. */
export function clientRequestConfig(
  signal?: AbortSignal,
  options: {
    timeoutMs?: number;
    credentials?: RequestCredentials;
    cache?: RequestCache;
    keepalive?: boolean;
  } = {},
): Pick<AxiosRequestConfig, "signal" | "timeout" | "withCredentials" | "fetchOptions"> {
  return {
    signal,
    timeout: options.timeoutMs ?? 8_000,
    withCredentials: options.credentials === "include",
    fetchOptions:
      options.cache || options.keepalive !== undefined
        ? { ...(options.cache ? { cache: options.cache } : {}), ...(options.keepalive !== undefined ? { keepalive: options.keepalive } : {}) }
        : undefined,
  };
}
