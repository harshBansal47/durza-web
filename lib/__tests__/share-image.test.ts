import { describe, expect, it } from "vitest";
import { COLLECTIONS } from "@/data/collections";
import { assetEligibility, shareImageText } from "@/lib/share-image";
import { DISCLOSURE } from "@/lib/share-text";

describe("share image eligibility", () => {
  it("refuses missing collection", () => expect(assetEligibility(undefined)).toContain("Collection not found"));
  it("refuses a collection with unsourced items", () => {
    const entry = { ...COLLECTIONS[0], picks: COLLECTIONS[0].picks.map((pick) => ({ ...pick, evidence: "No source date yet" })) };
    expect(assetEligibility(entry).join(" ")).toMatch(/source date/);
  });
  it("includes disclosure and only evidence-backed text", () => {
    const entry = { ...COLLECTIONS[0], picks: COLLECTIONS[0].picks.slice(0, 5).map((pick) => ({ ...pick, evidence: "Source page seen 20 Nov 2026" })) };
    const text = shareImageText(entry);
    expect(text).toContain(DISCLOSURE);
    expect(text).not.toMatch(/verified|%|\boff\b|₹/i);
  });
});
