"use client";

/**
 * Personalization foundation (§22). No fake "AI picks" — just honest
 * signal collection in localStorage today:
 *
 *   recent stores · recent coupons · clicked coupons · saved coupons ·
 *   followed stores · searches
 *
 * Future server personalization ("Because you viewed Nike") reads these
 * same signals once accounts sync them. Modules must render nothing when
 * there is no signal rather than inventing recommendations.
 */

const STORES_KEY = "BachatBase.recent_stores";
const COUPONS_KEY = "BachatBase.recent_coupons";
const CLICKS_KEY = "BachatBase.clicked_coupons";
const SAVED_KEY = "BachatBase.saved_coupons";
const FOLLOWED_KEY = "BachatBase.followed_stores";
const SEARCHES_KEY = "BachatBase.recent";
const MAX = 12;

export interface TasteSignals {
  stores: string[];
  coupons: string[];
  clicked: string[];
  saved: string[];
  followed: string[];
  searches: string[];
}

function readList(key: string): string[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function push(key: string, value: string): void {
  try {
    const next = [value, ...readList(key).filter((v) => v !== value)].slice(0, MAX);
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    /* private mode — signals are best effort */
  }
}

function toggle(key: string, value: string): boolean {
  const list = readList(key);
  const on = !list.includes(value);
  try {
    const next = on ? [value, ...list].slice(0, 200) : list.filter((v) => v !== value);
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    /* best effort */
  }
  return on;
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function recordStoreView(slug: string): void {
  if (isClient() && slug) push(STORES_KEY, slug);
}

export function recordCouponView(id: string): void {
  if (isClient() && id) push(COUPONS_KEY, id);
}

export function recordCouponClick(id: string): void {
  if (isClient() && id) push(CLICKS_KEY, id);
}

export function getSignals(): TasteSignals {
  if (!isClient()) return { stores: [], coupons: [], clicked: [], saved: [], followed: [], searches: [] };
  return {
    stores: readList(STORES_KEY),
    coupons: readList(COUPONS_KEY),
    clicked: readList(CLICKS_KEY),
    saved: readList(SAVED_KEY),
    followed: readList(FOLLOWED_KEY),
    searches: readList(SEARCHES_KEY),
  };
}

export function getSavedCouponIds(): string[] {
  return isClient() ? readList(SAVED_KEY) : [];
}

export function getFollowedStores(): string[] {
  return isClient() ? readList(FOLLOWED_KEY) : [];
}

export function isStoreFollowed(slug: string): boolean {
  return isClient() && slug ? readList(FOLLOWED_KEY).includes(slug) : false;
}

export function toggleFollowedStore(slug: string): boolean {
  if (!isClient() || !slug) return false;
  return toggle(FOLLOWED_KEY, slug);
}
