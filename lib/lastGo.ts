/**
 * Tiny wrapper around `localStorage` for the "did it work?" prompt.
 *
 * Key: `BachatBase:last-go`
 * Value shape:
 *   {
 *     couponId: string;
 *     title: string;
 *     storeName: string;
 *     hadCode: boolean;
 *     at: number; // epoch ms
 *   }
 *
 * All functions are defensive: they never throw, and they sanitise what
 * comes back from storage. If `localStorage` is unavailable (private
 * browsing, etc.) the functions are no-ops.
 */

const STORAGE_KEY = "BachatBase:last-go";

export interface LastGoEntry {
  couponId: string;
  title: string;
  storeName: string;
  hadCode: boolean;
  at: number;
}

/** Returns the stored entry if it exists, is valid JSON, has all required
 *  fields, and is younger than `maxAgeMs`. Otherwise returns `null`. */
export function readLastGo(maxAgeMs: number): LastGoEntry | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof parsed.couponId !== "string" ||
      typeof parsed.title !== "string" ||
      typeof parsed.storeName !== "string" ||
      typeof parsed.hadCode !== "boolean" ||
      typeof parsed.at !== "number"
    ) {
      return null;
    }
    if (Date.now() - parsed.at > maxAgeMs) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/** Writes the entry to localStorage. Never throws. */
export function rememberGo(entry: Omit<LastGoEntry, "at">): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...entry, at: Date.now() }),
    );
  } catch {
    // Private browsing, quota exceeded, etc. — silently ignore.
  }
}

/** Clears the stored entry. Never throws. */
export function clearLastGo(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}