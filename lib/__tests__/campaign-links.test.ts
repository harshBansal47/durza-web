import { describe, expect, it } from "vitest";
import { buildCampaignUrl, canonicalize, CHANNELS, validSlug } from "@/lib/campaign-links";

describe("campaign links", () => {
  it("builds strict lowercase convention parameters", () => {
    const url = new URL(buildCampaignUrl({ path: "/collections/spring-kit", channel: "instagram", campaignSlug: "diwali-2026" }, "https://durza.in"));
    expect(url.searchParams.get("utm_source")).toBe("instagram");
    expect(url.searchParams.get("utm_medium")).toBe("social");
    expect(url.searchParams.get("utm_campaign")).toBe("diwali-2026");
    expect(url.searchParams.get("content_ref")).toBe("campaign_diwali-2026_instagram");
  });

  it("rejects invalid slugs and channels", () => {
    expect(validSlug("Diwali 2026")).toBe(false);
    expect(validSlug("diwali_2026")).toBe(false);
    expect(validSlug("a".repeat(60))).toBe(false);
    expect(() => buildCampaignUrl({ path: "/", channel: "tiktok" as never, campaignSlug: "ok" })).toThrow();
    expect(() => buildCampaignUrl({ path: "/?x=1", channel: "search", campaignSlug: "ok" })).toThrow();
  });

  it("canonical strips all acquisition params and hash", () => {
    const canonical = canonicalize("https://durza.in/collections/kit?utm_source=share&utm_campaign=x&ref=ig&content_ref=y#section");
    expect(canonical).toBe("https://durza.in/collections/kit");
    expect(canonical).not.toMatch(/utm_|ref|#/);
  });

  it("every channel is supported", () => {
    for (const channel of CHANNELS) {
      expect(new URL(buildCampaignUrl({ path: "/", channel, campaignSlug: "test" })).searchParams.get("utm_source")).toBe(channel);
    }
  });
});
