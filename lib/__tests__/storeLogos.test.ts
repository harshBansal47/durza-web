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
    expect(storeLogoUrl({ slug: "myntra", logo_url: null })).toBe("/stores/myntra.webp");
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
      // Several feed slugs intentionally share one self-hosted icon
      // (e.g. the Ajio network slug uses the Ajio brand icon).
      expect(url, slug).toMatch(/^\/stores\/[^/]+\.png$/);
      expect(existsSync(path.join(root, url)), `${slug} icon missing from public/`).toBe(true);
    }
  });
});

describe("storeAccent", () => {
  it("returns the sampled colour for stores with icons", () => {
    expect(storeAccent("amazon-in")).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("returns null for unknown stores and empty slugs", () => {
    expect(storeAccent("brand-new-store")).toBeNull();
    expect(storeAccent(null)).toBeNull();
    expect(storeAccent(undefined)).toBeNull();
  });

  it("every self-hosted icon has a sampled accent colour", () => {
    // STORE_ACCENTS also covers stores served by network-fetched icons, so it
    // is a superset of the self-hosted map by design.
    for (const slug of Object.keys(LOCAL_STORE_LOGOS)) {
      expect(STORE_ACCENTS[slug], `${slug} accent missing`).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});
