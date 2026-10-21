import { describe, expect, it } from "vitest";
import { copy } from "@/lib/copy";
import { lintCopy } from "@/lib/copyLint";

describe("copy lint", () => {
  it("passes central strings", () => {
    const values = [
      ...Object.values(copy.actions),
      copy.status.noVotes,
      copy.status.lowData,
      copy.status.checked("31 Oct 2026"),
      copy.status.expires("31 Oct 2026"),
      copy.status.endsToday,
      copy.status.expired,
      ...Object.values(copy.empty),
      ...Object.values(copy.errors),
    ];
    for (const value of values) {
      expect(lintCopy(value)).toEqual([]);
    }
  });

  it("flags hype, caps, repeated punctuation and length", () => {
    expect(lintCopy("Amazing HUGE deal!!")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ kind: "hype" }),
        expect.objectContaining({ kind: "punctuation" }),
      ]),
    );
    expect(lintCopy("BEST PRICE")).toEqual(
      expect.arrayContaining([expect.objectContaining({ kind: "caps" })]),
    );
    expect(lintCopy("a".repeat(160))).toEqual(
      expect.arrayContaining([expect.objectContaining({ kind: "length" })]),
    );
  });

  it("flags fake urgency and scarcity claims", () => {
    expect(lintCopy("Hurry, last chance!")).toEqual(
      expect.arrayContaining([expect.objectContaining({ kind: "urgency" })]),
    );
    expect(lintCopy("Only 2 left")).toEqual(
      expect.arrayContaining([expect.objectContaining({ kind: "urgency" })]),
    );
    expect(lintCopy("14 people are viewing this")).toEqual(
      expect.arrayContaining([expect.objectContaining({ kind: "urgency" })]),
    );
  });
});
