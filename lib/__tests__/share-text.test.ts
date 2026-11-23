import { describe, expect, it } from "vitest";
import { COLLECTIONS } from "@/data/collections";
import { buildDigestText, buildShareText, DISCLOSURE, shareUrl } from "@/lib/share-text";

const testCollection = { ...COLLECTIONS[0], slug: "test-collection" };

describe("share and digest text", () => {
  it("includes disclosure and share source capture", () => {
    const text = buildShareText(testCollection);
    expect(text).toContain(DISCLOSURE);
    expect(shareUrl(testCollection)).toContain("utm_source=share");
  });

  it("uses collection titles and editor-written why lines only", () => {
    const text = buildShareText(testCollection);
    expect(text).toContain(testCollection.picks[0].name);
    expect(text).not.toMatch(/Source page seen|No source date yet|verified/i);
  });

  it("digest includes the offers supplied by a human", () => {
    const text = buildDigestText([testCollection], [{ title: "Good offer" }]);
    expect(text).toContain("DRAFT");
    expect(text).toContain("Good offer");
    expect(text).toContain(DISCLOSURE);
  });
});
