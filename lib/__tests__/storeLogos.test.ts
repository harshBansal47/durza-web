import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { LOCAL_STORE_LOGOS, STORE_ACCENTS, storeAccent, storeLogoUrl } from "@/lib/storeLogos";

describe("storeLogoUrl", () => {
  it("prefers the backend logo when a store ships one", () => {
    expect(storeLogoUrl({ slug: "myntra", logo_url: "https://cdn.example.com/my.png" })).toBe(
      "https://cdn.example.com/my.png",
    );
  });

  it("falls back to the self-hosted icon by slug", () => {
    expect(storeLogoUrl({ slug: "myntra", logo_url: null })).toBe("/stores/myntra.png");
  });

  it("returns null for stores with no icon, so initials stay", () => {
    expect(storeLogoUrl({ slug: "brand-new-store", logo_url: null })).toBeNull();
    expect(storeLogoUrl({ logo_url: null })).toBeNull();
    expect(storeLogoUrl(null)).toBeNull();
    expect(storeLogoUrl(undefined)).toBeNull();
  });
});

describe("self-hosted icons", () => {
  it("every mapped icon exists in /public/stores", () => {
    const root = path.join(process.cwd(), "public");
    for (const [slug, url] of Object.entries(LOCAL_STORE_LOGOS)) {
      expect(url, slug).toBe(`/stores/${slug}.png`);
      expect(existsSync(path.join(root, url)), `${slug} icon missing from public/`).toBe(true);
    }
  });
});

describe("storeAccent", () => {
  it("returns the sampled colour for stores with icons", () => {
    expect(storeAccent("zomato")).toBe("#cc202e");
    expect(storeAccent("amazon-in")).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("returns null for unknown stores and empty slugs", () => {
    expect(storeAccent("brand-new-store")).toBeNull();
    expect(storeAccent(null)).toBeNull();
    expect(storeAccent(undefined)).toBeNull();
  });

  it("icon map and accent map cover exactly the same stores", () => {
    expect(Object.keys(STORE_ACCENTS).sort()).toEqual(Object.keys(LOCAL_STORE_LOGOS).sort());
  });
});
