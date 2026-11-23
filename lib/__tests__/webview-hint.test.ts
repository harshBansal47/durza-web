import { describe, expect, it } from "vitest";
import { isLikelyInAppBrowser, OPEN_IN_BROWSER_HINT } from "@/lib/webview-hint";

describe("in-app browser hint", () => {
  it("detects common in-app user agents only", () => {
    expect(isLikelyInAppBrowser("Mozilla/5.0 (iPhone) Instagram 300.0")).toBe(true);
    expect(isLikelyInAppBrowser("Mozilla/5.0 FBAV/400.0")).toBe(true);
    expect(isLikelyInAppBrowser("Mozilla/5.0 WhatsApp/2.23")).toBe(true);
    expect(isLikelyInAppBrowser("Mozilla/5.0 (Windows NT 10.0) Chrome/120.0")).toBe(false);
    expect(isLikelyInAppBrowser(undefined)).toBe(false);
  });
  it("hint exists", () => expect(OPEN_IN_BROWSER_HINT).toContain("browser"));
});
