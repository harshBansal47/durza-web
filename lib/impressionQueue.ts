"use client";

import { api, type ImpressionBody } from "./api";

/**
 * Coalesces coupon impressions into one request.
 *
 * A listing page reports one impression per card as it scrolls into view. Sent one by one
 * that is a POST (and a database commit) per card, and the API rate-limits impressions per
 * client IP, so a fast scroller loses data silently. Instead, impressions wait briefly and
 * go out together.
 *
 * Flushes when: the batch is full, the page has been quiet for FLUSH_DELAY_MS, or the page
 * is being hidden/left (keepalive, so the request survives navigation).
 */
const FLUSH_DELAY_MS = 1500;
/** Comfortably below the backend's per-request cap (MAX_IMPRESSION_BATCH = 50). */
const MAX_BATCH = 25;

// Backend field limits (ImpressionRequest). One oversized field would 422 the whole batch,
// so clamp here instead of losing every impression queued alongside it.
const MAX_PAGE_ID = 255;
const MAX_LIST_ID = 80;

let queue: ImpressionBody[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let listening = false;
/** Set when the API answers 404/405 for the batch route (frontend deployed ahead of it). */
let batchUnsupported = false;

function clamp(item: ImpressionBody): ImpressionBody {
  return {
    ...item,
    page_id: item.page_id?.slice(0, MAX_PAGE_ID),
    list_id: item.list_id?.slice(0, MAX_LIST_ID),
  };
}

function listen() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushImpressions({ keepalive: true });
  });
  window.addEventListener("pagehide", () => flushImpressions({ keepalive: true }));
}

async function send(batch: ImpressionBody[], keepalive: boolean) {
  if (!batchUnsupported) {
    const status = await api.recordImpressions(batch, { keepalive });
    if (status !== 404 && status !== 405) return;
    batchUnsupported = true; // old API: fall through to the per-item route, and stop probing
  }
  await Promise.allSettled(batch.map((item) => api.recordImpression(item)));
}

export function flushImpressions({ keepalive = false }: { keepalive?: boolean } = {}) {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (queue.length === 0) return;
  const batch = queue;
  queue = [];
  // Analytics must never break the product; a lost batch is lost, as a lost beacon would be.
  send(batch, keepalive).catch(() => {});
}

export function enqueueImpression(item: ImpressionBody) {
  listen();
  queue.push(clamp(item));
  if (queue.length >= MAX_BATCH) {
    flushImpressions();
  } else if (!timer) {
    timer = setTimeout(() => flushImpressions(), FLUSH_DELAY_MS);
  }
}

/** Test hook: drop queued items and timers. */
export function resetImpressionQueue() {
  if (timer) clearTimeout(timer);
  timer = null;
  queue = [];
  batchUnsupported = false;
}
