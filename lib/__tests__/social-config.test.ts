import { describe, expect, it } from "vitest";
import { validateSocialUrl } from "@/lib/social-config";

describe("social follow config", () => {
  it("returns null when unset", () => {
    expect(validateSocialUrl("instagram", undefined)).toBeNull();
    expect(validateSocialUrl("instagram", "")).toBeNull();
  });
  it("accepts allowlisted https hosts", () => {
    expect(validateSocialUrl("instagram", "https://instagram.com/durza")).toContain("instagram.com");
    expect(validateSocialUrl("whatsapp", "https://chat.whatsapp.com/abc")).toContain("whatsapp.com");
  });
  it("rejects http and unknown hosts", () => {
    expect(() => validateSocialUrl("instagram", "http://instagram.com/durza")).toThrow();
    expect(() => validateSocialUrl("facebook", "https://evil.example/fb")).toThrow();
    expect(() => validateSocialUrl("instagram", "instagram.com/durza")).toThrow();
  });
});
