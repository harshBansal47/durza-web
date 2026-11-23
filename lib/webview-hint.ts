/**
 * Phase 3 T5 — in-app browser hint only. Never used for routing, copy behaviour
 * or any core decision. A false positive only shows a helpful sentence.
 */
export function isLikelyInAppBrowser(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  return /(Instagram|FBAV|FB_IAB|WhatsApp|Line\/|Twitter)/i.test(userAgent);
}

export const OPEN_IN_BROWSER_HINT =
  "If the store did not open, open this page in your browser and try again.";
