import { describe, expect, it } from "vitest";
import { PRIMARY_NAV, SAVED_NAV, SECONDARY_NAV, SITE_NAV } from "@/lib/nav-config";

describe("single header nav config", () => {
  it("keeps every existing href exactly once", () => {
    const hrefs = SITE_NAV.map((item) => item.href);
    expect(hrefs).toHaveLength(new Set(hrefs).size);
    expect(hrefs).toEqual([
      "/compare",
      "/guides",
      "/reviews",
      "/tools",
      "/topics",
      "/coupons",
      "/deals",
      "/stores",
      "/bank-offers",
      "/categories",
      "/collections",
      "/black-friday",
      "/methodology",
      "/saved",
    ]);
  });

  it("splits rows without a More menu", () => {
    expect(PRIMARY_NAV.map((item) => item.label)).toEqual([
      "Comparisons",
      "Guides",
      "Reviews",
      "Tools",
      "Topics",
    ]);
    expect(SECONDARY_NAV.map((item) => item.label)).toEqual([
      "Coupons",
      "Deals",
      "Stores",
      "Bank & card offers",
      "Categories",
      "Collections",
      "Black Friday 2026",
      "How we research",
      "Saved",
    ]);
    expect(SITE_NAV.some((item) => item.label === "More")).toBe(false);
  });

  it("marks only the seasonal item and provides the saved shortcut", () => {
    expect(SITE_NAV.filter((item) => item.seasonal).map((item) => item.href)).toEqual([
      "/black-friday",
    ]);
    expect(SAVED_NAV?.href).toBe("/saved");
  });
});
