"use client";

/**
 * Personalization foundation (§22). No fake "AI picks" — just honest
 * signal collection in localStorage today:
 *
 *   recent stores · recent coupons · clicked coupons · saved coupons ·
 *   followed stores . searches
 *
 * Signals are stored in a versioned, timestamped shape so the server can
 * apply decay without trusting a client-computed score. The old unversioned
 * string-list keys remain readable and are migrated on first read.
 */

const V2_KEY = "durza.taste_v2";
const STORES_KEY = "durza.recent_stores";
const COUPONS_KEY = "durza.recent_coupons";
const CLICKS_KEY = "durza.clicked_coupons";
const SAVED_KEY = "durza.saved_coupons";
const FOLLOWED_KEY = "durza.followed_stores";
const SEARCHES_KEY = "durza.recent";
const MAX = 12;

type SignalBucket = "stores" | "coupons" | "clicked" | "saved" | "followed" | "searches";

interface SignalEntry {
  id: string;
  at: number;
}

interface TasteStoreV2 {
  version: 2;
  stores: SignalEntry[];
  coupons: SignalEntry[];
  clicked: SignalEntry[];
  saved: SignalEntry[];
  followed: SignalEntry[];
  searches: SignalEntry[];
}

const BUCKETS: Record<SignalBucket, string> = {
  stores: STORES_KEY,
  coupons: COUPONS_KEY,
  clicked: CLICKS_KEY,
  saved: SAVED_KEY,
  followed: FOLLOWED_KEY,
  searches: SEARCHES_KEY,
};

export interface TasteSignals {
  stores: string[];
  coupons: string[];
  clicked: string[];
  saved: string[];
  followed: string[];
  searches: string[];
}

function emptyStore(): TasteStoreV2 {
  return { version: 2, stores: [], coupons: [], clicked: [], saved: [], followed: [], searches: [] };
}

function readLegacy(bucket: SignalBucket): string[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(BUCKETS[bucket]) ?? "[]");
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function isEntry(value: unknown): value is SignalEntry {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as SignalEntry).id === "string" &&
    typeof (value as SignalEntry).at === "number"
  );
}

function readV2(): TasteStoreV2 | null {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(V2_KEY) ?? "null");
    if (!raw || typeof raw !== "object") return null;
    const candidate = raw as Partial<TasteStoreV2>;
    if (candidate.version !== 2) return null;
    const store = emptyStore();
    for (const bucket of Object.keys(BUCKETS) as SignalBucket[]) {
      const entries = candidate[bucket];
      store[bucket] = Array.isArray(entries) ? entries.filter(isEntry) : [];
    }
    return store;
  } catch {
    return null;
  }
}

function writeV2(store: TasteStoreV2): void {
  try {
    localStorage.setItem(V2_KEY, JSON.stringify(store));
    // Keep the legacy keys in sync so older components keep working.
    for (const bucket of Object.keys(BUCKETS) as SignalBucket[]) {
      localStorage.setItem(BUCKETS[bucket], JSON.stringify(store[bucket].map((entry) => entry.id)));
    }
  } catch {
    /* private mode — signals are best effort */
  }
}

/** Read v2, or migrate the legacy string-list format on first use. */
function readStore(): TasteStoreV2 {
  const existing = readV2();
  if (existing) {
    // Older components still write the legacy keys directly; merge any ids
    // they added so the versioned store remains the source of truth.
    let changed = false;
    for (const bucket of Object.keys(BUCKETS) as SignalBucket[]) {
      const known = new Set(existing[bucket].map((entry) => entry.id));
      const missing = readLegacy(bucket).filter((id) => !known.has(id));
      if (missing.length) {
        existing[bucket] = [
          ...missing.map((id) => ({ id, at: Date.now() })),
          ...existing[bucket],
        ].slice(0, 200);
        changed = true;
      }
    }
    if (changed) writeV2(existing);
    return existing;
  }
  const now = Date.now();
  const migrated = emptyStore();
  for (const bucket of Object.keys(BUCKETS) as SignalBucket[]) {
    migrated[bucket] = readLegacy(bucket).map((id) => ({ id, at: now }));
  }
  writeV2(migrated);
  return migrated;
}

function readList(bucket: SignalBucket): string[] {
  return readStore()[bucket].map((entry) => entry.id);
}

function push(bucket: SignalBucket, value: string): void {
  try {
    const store = readStore();
    const next = [{ id: value, at: Date.now() }, ...store[bucket].filter((entry) => entry.id !== value)].slice(0, MAX);
    store[bucket] = next;
    writeV2(store);
  } catch {
    /* private mode — signals are best effort */
  }
}

function setSignal(bucket: SignalBucket, value: string, active: boolean): void {
  const store = readStore();
  const exists = store[bucket].some((entry) => entry.id === value);
  if (exists === active) return;

  try {
    store[bucket] = active
      ? [{ id: value, at: Date.now() }, ...store[bucket]].slice(0, 200)
      : store[bucket].filter((entry) => entry.id !== value);
    writeV2(store);
  } catch {
    /* best effort */
  }
}

function toggle(bucket: SignalBucket, value: string): boolean {
  const store = readStore();
  const on = !store[bucket].some((entry) => entry.id === value);
  setSignal(bucket, value, on);
  return on;
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function recordStoreView(slug: string): void {
  if (isClient() && slug) push("stores", slug);
}

export function recordCouponView(id: string): void {
  if (isClient() && id) push("coupons", id);
}

export function recordCouponClick(id: string): void {
  if (isClient() && id) push("clicked", id);
}

export function getSignals(): TasteSignals {
  if (!isClient()) return { stores: [], coupons: [], clicked: [], saved: [], followed: [], searches: [] };
  return {
    stores: readList("stores"),
    coupons: readList("coupons"),
    clicked: readList("clicked"),
    saved: readList("saved"),
    followed: readList("followed"),
    searches: readList("searches"),
  };
}

export function getSavedCouponIds(): string[] {
  return isClient() ? readList("saved") : [];
}

export function toggleSavedCoupon(id: string): boolean {
  if (!isClient() || !id) return false;
  return toggle("saved", id);
}

export function setSavedCoupon(id: string, saved: boolean): void {
  if (isClient() && id) setSignal("saved", id, saved);
}

export function getFollowedStores(): string[] {
  return isClient() ? readList("followed") : [];
}

export function isStoreFollowed(slug: string): boolean {
  return isClient() && slug ? readList("followed").includes(slug) : false;
}

export function toggleFollowedStore(slug: string): boolean {
  if (!isClient() || !slug) return false;
  return toggle("followed", slug);
}

export function setFollowedStore(slug: string, followed: boolean): void {
  if (isClient() && slug) setSignal("followed", slug, followed);
}
