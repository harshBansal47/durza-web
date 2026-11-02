import { afterEach, describe, expect, it, vi } from "vitest";
import { clientApiUrl, clientHttp, clientRequestConfig } from "@/lib/client-http";

describe("browser API transport", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("normalizes FastAPI detail responses into the shared API error", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ detail: "Coupon has already been verified" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(clientHttp.get(clientApiUrl("/coupons/c1"))).rejects.toMatchObject({
      name: "ApiError",
      message: "Coupon has already been verified",
      status: 429,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("preserves cancellation, timeout, cache, and credential options", () => {
    const controller = new AbortController();
    const config = clientRequestConfig(controller.signal, {
      timeoutMs: 2_500,
      credentials: "include",
      cache: "no-store",
    });

    expect(config.signal).toBe(controller.signal);
    expect(config.timeout).toBe(2_500);
    expect(config.withCredentials).toBe(true);
    expect(config.fetchOptions).toEqual({ cache: "no-store" });
  });
});
