import { describe, expect, it } from "vitest";
import { COLLECTIONS } from "@/data/collections";
import { buildDigestText, buildShareText, DISCLOSURE, shareUrl } from "@/lib/share-text";

const withEvidence = {
  ...COLLECTIONS[0],
  slug: "test-collection",
  picks: [
    { ...COLLECTIONS[0].picks[0], evidence: "Source page seen 20 Nov 2026" },
    { ...COLLECTIONS[0].picks[1], evidence: "No source date yet" },
  ],
};

describe("share and digest text", () => {
  it("includes disclosure and share source capture", () => {
    const text = buildShareText(withEvidence);
    expect(text).toContain(DISCLOSURE);
    expect(shareUrl(withEvidence)).toContain("utm_source=share");
  });

  it("never includes an item without a source date", () => {
    const text = buildShareText(withEvidence);
    expect(text).toContain(withEvidence.picks[0].name);
    expect(text).not.toContain(withEvidence.picks[1].name);
    expect(text).not.toContain("No source date yet");
  });

  it("digest includes only sourced offers", () => {
    const text = buildDigestText(
      [withEvidence],
      [
        { title: "Good offer", source_url: "https://brand.example", checked_on: "2026-11-20T00:00:00Z", evidence_tier: "source_seen" },
        { title: "Unsourced offer", source_url: null, checked_on: null, evidence_tier: "unknown" },
      ],
    );
    expect(text).toContain("DRAFT");
    expect(text).toContain("Good offer");
    expect(text).not.toContain("Unsourced offer");
    expect(text).toContain(DISCLOSURE);
  });
});
