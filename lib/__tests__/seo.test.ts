import { describe, expect, it } from "vitest";
import {
  absoluteUrl,
  aggregateRatingJsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

describe("absoluteUrl", () => {
  it("joins a leading-slash path to the site URL", () => {
    expect(absoluteUrl("/coupons/foo")).toBe("http://localhost:3000/coupons/foo");
  });

  it("adds a leading slash if missing", () => {
    expect(absoluteUrl("coupons/foo")).toBe("http://localhost:3000/coupons/foo");
  });
});

describe("breadcrumbJsonLd", () => {
  it("builds a schema.org BreadcrumbList with 1-indexed positions", () => {
    const result = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Amazon", path: "/stores/amazon" },
    ]);
    expect(result["@type"]).toBe("BreadcrumbList");
    expect(result.itemListElement).toHaveLength(2);
    expect(result.itemListElement[0]).toMatchObject({ position: 1, name: "Home" });
    expect(result.itemListElement[1]).toMatchObject({
      position: 2,
      name: "Amazon",
      item: "http://localhost:3000/stores/amazon",
    });
  });
});

describe("aggregateRatingJsonLd", () => {
  it("returns undefined with zero reports - no rating claimed, none shown", () => {
    expect(aggregateRatingJsonLd(0, 0)).toBeUndefined();
  });

  it("maps a 100% success rate to 5 stars", () => {
    const rating = aggregateRatingJsonLd(10, 0);
    expect(rating?.ratingValue).toBe("5.00");
    expect(rating?.reviewCount).toBe(10);
  });

  it("maps a 0% success rate to 1 star, not 0", () => {
    const rating = aggregateRatingJsonLd(0, 10);
    expect(rating?.ratingValue).toBe("1.00");
  });

  it("maps a 50% success rate to the midpoint (3 stars)", () => {
    const rating = aggregateRatingJsonLd(5, 5);
    expect(rating?.ratingValue).toBe("3.00");
  });

  it("counts both successes and failures in reviewCount", () => {
    const rating = aggregateRatingJsonLd(3, 7);
    expect(rating?.reviewCount).toBe(10);
  });
});

describe("organizationJsonLd", () => {
  it("describes the site's own entity with the logo it actually ships", () => {
    const org = organizationJsonLd();
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("Durza");
    expect(org.url).toBe("http://localhost:3000");
    expect(org.logo).toBe("http://localhost:3000/logo.png");
  });
});

describe("websiteJsonLd", () => {
  it("wires the sitelinks search box to the real /search?q= endpoint", () => {
    const site = websiteJsonLd();
    expect(site["@type"]).toBe("WebSite");
    expect(site.potentialAction["@type"]).toBe("SearchAction");
    expect(site.potentialAction.target.urlTemplate).toBe(
      "http://localhost:3000/search?q={search_term_string}",
    );
  });
});
