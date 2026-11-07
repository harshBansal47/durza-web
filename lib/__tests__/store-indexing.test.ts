import { describe, expect, it } from "vitest";
import { isIndexableStore } from "@/lib/store-indexing";

describe("isIndexableStore", () => {
  it.each([
    [3, null, true],
    [1, "", true],
    [0, "Acer makes laptops.", true],
    [null, "Acer makes laptops.", true],
    [0, null, false],
    [0, "", false],
    [0, "   \n ", false],
    [null, undefined, false],
    [undefined, null, false],
  ])("offers=%s description=%j -> %s", (offers, description, expected) => {
    expect(isIndexableStore(offers, description)).toBe(expected);
  });
});
