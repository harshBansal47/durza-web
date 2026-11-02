import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { api, type ImpressionBody } from "@/lib/api";
import {
  enqueueImpression,
  flushImpressions,
  resetImpressionQueue,
} from "@/lib/impressionQueue";

const item = (n: number, extra: Partial<ImpressionBody> = {}): ImpressionBody => ({
  coupon_id: `c${n}`,
  merchant_id: "m1",
  page_type: "deals",
  position: n,
  ...extra,
});

describe("impression batching", () => {
  let batch: ReturnType<typeof vi.spyOn>;
  let single: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.useFakeTimers();
    resetImpressionQueue();
    batch = vi.spyOn(api, "recordImpressions").mockResolvedValue(202);
    single = vi.spyOn(api, "recordImpression").mockResolvedValue(undefined as never);
  });
  afterEach(() => {
    resetImpressionQueue();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("sends nothing until the page has been quiet, then one request for the lot", () => {
    for (let i = 1; i <= 12; i++) enqueueImpression(item(i));
    expect(batch).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1500);
    expect(batch).toHaveBeenCalledTimes(1);
    expect(batch.mock.calls[0][0]).toHaveLength(12);
    expect(single).not.toHaveBeenCalled();
  });

  it("keeps the order impressions were seen in", () => {
    enqueueImpression(item(3));
    enqueueImpression(item(1));
    flushImpressions();
    expect(batch.mock.calls[0][0].map((i: ImpressionBody) => i.position)).toEqual([3, 1]);
  });

  it("flushes as soon as a batch is full, without waiting for the timer", () => {
    for (let i = 1; i <= 25; i++) enqueueImpression(item(i));
    expect(batch).toHaveBeenCalledTimes(1);
    expect(batch.mock.calls[0][0]).toHaveLength(25);
    enqueueImpression(item(26));
    vi.advanceTimersByTime(1500);
    expect(batch).toHaveBeenCalledTimes(2);
    expect(batch.mock.calls[1][0]).toHaveLength(1);
  });

  it("sends nothing when there is nothing queued", () => {
    flushImpressions();
    vi.advanceTimersByTime(5000);
    expect(batch).not.toHaveBeenCalled();
  });

  it("flushes with keepalive when the page is hidden, so the request survives leaving", () => {
    enqueueImpression(item(1));
    Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(batch).toHaveBeenCalledTimes(1);
    expect(batch.mock.calls[0][1]).toEqual({ keepalive: true });
    Object.defineProperty(document, "visibilityState", { value: "visible", configurable: true });
  });

  it("falls back to the per-impression route once if the API predates the batch route", async () => {
    batch.mockResolvedValue(404);
    enqueueImpression(item(1));
    enqueueImpression(item(2));
    flushImpressions();
    await vi.advanceTimersByTimeAsync(0);
    expect(single).toHaveBeenCalledTimes(2);

    // And it stops probing: the next batch goes straight to the old route.
    enqueueImpression(item(3));
    flushImpressions();
    await vi.advanceTimersByTimeAsync(0);
    expect(batch).toHaveBeenCalledTimes(1);
    expect(single).toHaveBeenCalledTimes(3);
  });

  it("does not fall back on a real failure such as a rate limit (no request amplification)", async () => {
    batch.mockResolvedValue(429);
    enqueueImpression(item(1));
    flushImpressions();
    await vi.advanceTimersByTimeAsync(0);
    expect(single).not.toHaveBeenCalled();
  });

  it("clamps ids to the backend's limits so one long value cannot sink the batch", () => {
    enqueueImpression(item(1, { page_id: "p".repeat(400), list_id: "l".repeat(200) }));
    flushImpressions();
    const sent = batch.mock.calls[0][0][0] as ImpressionBody;
    expect(sent.page_id).toHaveLength(255);
    expect(sent.list_id).toHaveLength(80);
  });

  it("swallows a network failure instead of throwing into the page", async () => {
    batch.mockRejectedValue(new Error("offline"));
    enqueueImpression(item(1));
    expect(() => flushImpressions()).not.toThrow();
    await vi.advanceTimersByTimeAsync(0);
  });
});
