import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { STORE_DOMAINS } from "@/lib/store-domains.generated";
import { STORE_ACCENTS, storeAccent, storeLogoUrl } from "@/lib/storeLogos";

describe("storeLogoUrl", () => {
  it("resolves a store logo from the generated domain map", () => {
    expect(storeLogoUrl({ slug: "myntra", logo_url: null })).toBe("/store-logos/myntra.com.webp");
    expect(storeLogoUrl({ slug: "amazon-in", logo_url: null })).toBe("/store-logos/amazon.in.webp");
  });

  it("prefers the website domain over a slug alias", () => {
    expect(storeLogoUrl({ slug: "brand-new-store", website_url: "https://shop.example.com/" })).toBe(
      "/store-logos/example.com.webp",
    );
  });

  it("falls back to the backend logo when no domain is known", () => {
    expect(storeLogoUrl({ slug: "brand-new-store", logo_url: "https://cdn.example.com/my.png" })).toBe(
      "https://cdn.example.com/my.png",
    );
  });

  it("returns null for stores with no icon, so initials stay", () => {
    expect(storeLogoUrl({ slug: "brand-new-store", logo_url: null })).toBeNull();
    expect(storeLogoUrl({ logo_url: null })).toBeNull();
    expect(storeLogoUrl(null)).toBeNull();
    expect(storeLogoUrl(undefined)).toBeNull();
  });
});

describe("generated store logos", () => {
  it("every mapped domain has a synced WebP file", () => {
    const root = path.join(process.cwd(), "public");
    for (const [slug, domain] of Object.entries(STORE_DOMAINS)) {
      const url = `/store-logos/${domain}.webp`;
      expect(existsSync(path.join(root, url)), `${slug} logo missing from public/`).toBe(true);
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

  it("every sampled accent is a hex colour", () => {
    for (const [slug, colour] of Object.entries(STORE_ACCENTS)) {
      expect(colour, `${slug} accent invalid`).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});
