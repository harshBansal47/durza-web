import { describe, expect, it } from "vitest";
import { GO_REL, isValidStoreSlug, storeGoHref } from "@/lib/go";

describe("storeGoHref", () => {
  it("builds the neutral path and tags where the click came from", () => {
    expect(storeGoHref("acer", "store-page")).toBe("/go/acer?src=store-page");
    expect(storeGoHref("acer")).toBe("/go/acer?src=site");
  });

  it("never lets a slug break out of the path", () => {
    expect(storeGoHref("a/b?c=d#e", "site")).toBe("/go/a%2Fb%3Fc%3Dd%23e?src=site");
  });

  it("names no network, whatever the store", () => {
    expect(storeGoHref("nordpass", "coupon-page").toLowerCase()).not.toMatch(/vcommission|admitad|cuelinks/);
  });
});

describe("isValidStoreSlug", () => {
  it.each(["acer", "tom-jerrys-cafe-100", "nykaa-com", "a", "Store_1.2"])("accepts %s", (slug) => {
    expect(isValidStoreSlug(slug)).toBe(true);
  });

  it.each(["", "-leading", "has space", "a/b", "../etc", "a?b", "x".repeat(121), "<script>", "ünï"])(
    "rejects %j",
    (slug) => {
      expect(isValidStoreSlug(slug)).toBe(false);
    },
  );
});

describe("GO_REL", () => {
  it("marks the link as sponsored and protects the opener", () => {
    for (const token of ["sponsored", "nofollow", "noopener", "noreferrer"]) {
      expect(GO_REL.split(" ")).toContain(token);
    }
  });
});
