import { describe, expect, it } from "vitest";
import { COLLECTIONS, type CollectionEntry } from "@/data/collections";
import { validateCollection, validateCollections } from "@/lib/collection-integrity";

const withoutSkipIf = { ...COLLECTIONS[0].picks[0] };
delete (withoutSkipIf as Partial<typeof withoutSkipIf>).skipIf;
const draftFixture: CollectionEntry = {
  ...COLLECTIONS[0],
  slug: "draft-test-only",
  picks: [{ ...COLLECTIONS[0].picks[0], why: "" }, withoutSkipIf],
};

describe("static collection publish rules", () => {
  it("all shipped collections pass the same gate as DB-backed ones", () => {
    expect(validateCollections(COLLECTIONS)).toEqual([]);
  });

  it("rejects a DRAFT fixture with missing why, missing skipIf field and too few items", () => {
    const errors = validateCollection(draftFixture);
    expect(errors.some((error) => error.includes("why"))).toBe(true);
    expect(errors.some((error) => error.includes("skipIf"))).toBe(true);
    expect(errors.some((error) => error.includes("at least 3"))).toBe(true);
  });
});
