import { describe, expect, it } from "vitest";
import { COLLECTIONS } from "@/data/collections";
import { collectionReadiness, publishableOffers } from "@/lib/readiness";
import type { EvidenceRow } from "@/lib/api/admin";

describe("content readiness", () => {
  it("passes shipped collections with evidence", () => {
    const entry = { ...COLLECTIONS[0], picks: COLLECTIONS[0].picks.map((pick) => ({ ...pick, evidence: "Source page seen 20 Nov 2026" })) };
    const result = collectionReadiness(entry);
    expect(result.gate).toBe(true);
    expect(result.sourcedItems).toBe(entry.picks.length);
  });
  it("fails when items lack a source date", () => {
    const result = collectionReadiness(COLLECTIONS[0]);
    expect(result.gate).toBe(false);
    expect(result.reasons.join(" ")).toMatch(/source date/);
  });
  it("counts only live sourced offers by store and tier", () => {
    const row = (overrides: Partial<EvidenceRow> = {}): EvidenceRow => ({
      id: "1", title: "x", slug: "x", store_id: "s", store_slug: "store-a", clicks: 0,
      is_active: true, expires_at: null, evidence_tier: "source_seen", source_url: "https://x",
      source_kind: "brand_site", checked_on: "2026-11-20", checked_by: "e", expiry_claim: null,
      expiry_source_url: null, store_tier: "A", verification_status: "unverified", ...overrides,
    });
    const result = publishableOffers([row(), row({ id: "2", is_active: false }), row({ id: "3", evidence_tier: "unknown" }), row({ id: "4", store_slug: "store-b", store_tier: "B" })]);
    expect(result.total).toBe(2);
    expect(result.byStore).toEqual([["store-a", 1], ["store-b", 1]]);
    expect(result.byTier).toEqual([["A", 1], ["B", 1]]);
  });
});
