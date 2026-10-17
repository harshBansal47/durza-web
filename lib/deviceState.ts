/**
 * Device-local state for the reveal → try → vote flow. Nothing here is sent
 * to the server: the server enforces its own vote cooldown; these helpers
 * make the UI honest on the device itself (no vote button before the code
 * was actually revealed, one visible vote per offer per device).
 */

const REVEAL_PREFIX = "durza:revealed:";
const VOTE_PREFIX = "durza:voted:";
export const DEVICE_STATE_EVENT = "durza:device-state";

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage blocked — the in-memory UI state still updates for this page.
  }
}

function emit() {
  try {
    window.dispatchEvent(new CustomEvent(DEVICE_STATE_EVENT));
  } catch {
    // Non-browser environment.
  }
}

/** Called when the visitor reveals the code or clicks through to the store. */
export function markRevealed(couponId: string) {
  safeSet(`${REVEAL_PREFIX}${couponId}`, "1");
  emit();
}

export function hasRevealed(couponId: string): boolean {
  return safeGet(`${REVEAL_PREFIX}${couponId}`) === "1";
}

export function markVoted(couponId: string, worked: boolean) {
  safeSet(`${VOTE_PREFIX}${couponId}`, worked ? "worked" : "failed");
  emit();
}

export function getVote(couponId: string): "worked" | "failed" | null {
  const value = safeGet(`${VOTE_PREFIX}${couponId}`);
  return value === "worked" || value === "failed" ? value : null;
}
