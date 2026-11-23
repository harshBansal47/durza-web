import { describe, expect, it } from "vitest";
import { COLLECTIONS } from "@/data/collections";
import { assetEligibility, shareImageText } from "@/lib/share-image";
import { DISCLOSURE } from "@/lib/share-text";

describe("share image eligibility", () => {
  it("refuses missing collection", () => expect(assetEligibility(undefined)).toContain("Collection not found"));
  it("refuses a collection with fewer than 3 items", () => {
    const entry = { ...COLLECTIONS[0], picks: COLLECTIONS[0].picks.slice(0, 2) };
    expect(assetEligibility(entry).join(" ")).toMatch(/3 items/);
  });
  it("includes disclosure and only evidence-backed text", () => {
    const entry = { ...COLLECTIONS[0], picks: COLLECTIONS[0].picks.slice(0, 5) };
    const text = shareImageText(entry);
    expect(text).toContain(DISCLOSURE);
    expect(text).not.toMatch(/verified|%|\boff\b|₹/i);
  });
});
