import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import SponsoredCard from "@/components/SponsoredCard";
import BannerCarousel from "@/components/home/BannerCarousel";
import { api, resilient } from "@/lib/api";
import { getSponsored } from "@/lib/ads";
import type { Ad } from "@/lib/types";

const ad: Ad = {
  id: "ad1",
  position: "header",
  image_url: "https://cdn.example.com/banner.png",
  label: "Sponsored",
  advertiser: "Acme Shoes",
  alt_text: "Acme summer sale",
  starts_at: null,
  ends_at: null,
  is_active: true,
  created_at: "2026-01-01T00:00:00Z",
};

afterEach(() => vi.restoreAllMocks());

describe("SponsoredCard", () => {
  it("always shows the disclosure label and the advertiser on the banner", () => {
    render(<SponsoredCard ad={ad} src="ad-footer" />);
    expect(screen.getByText("Sponsored")).toBeVisible();
    expect(screen.getByText(/Acme Shoes/)).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Sponsored: Acme Shoes" })).toBeInTheDocument();
  });

  it("uses whatever label the ad carries (Partner, Ad), never an empty one", () => {
    render(<SponsoredCard ad={{ ...ad, label: "Partner" }} src="ad-footer" />);
    expect(screen.getByText("Partner")).toBeInTheDocument();
  });

  it("links through the tracked /go redirect with the placement tag", () => {
    render(<SponsoredCard ad={ad} src="ad-sidebar" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe(api.adGoUrl("ad1", "ad-sidebar"));
    expect(link.getAttribute("href")).toMatch(/^https?:\/\/.+\/ads\/ad1\/go\?src=ad-sidebar$/);
  });

  it("marks the link sponsored, nofollow and noopener, and says it opens a new tab", () => {
    render(<SponsoredCard ad={ad} src="ad-footer" />);
    const link = screen.getByRole("link");
    for (const token of ["sponsored", "nofollow", "noopener", "noreferrer"]) {
      expect(link.getAttribute("rel")).toContain(token);
    }
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveTextContent("opens in a new tab");
  });

  it("describes the image with the alt text, falling back to the advertiser", () => {
    const { rerender } = render(<SponsoredCard ad={ad} src="x" />);
    expect(screen.getByAltText("Acme summer sale")).toBeInTheDocument();
    rerender(<SponsoredCard ad={{ ...ad, alt_text: null }} src="x" />);
    expect(screen.getByAltText("Acme Shoes")).toBeInTheDocument();
  });
});

describe("BannerCarousel sponsored slide", () => {
  it("has only the editorial slides when there is no ad", () => {
    render(<BannerCarousel sponsored={null} />);
    expect(screen.getAllByRole("group")).toHaveLength(3);
    expect(screen.queryByText("Sponsored")).not.toBeInTheDocument();
  });

  it("adds a labelled, tracked sponsored slide at the end", () => {
    render(<BannerCarousel sponsored={ad} />);
    const slides = screen.getAllByRole("group");
    expect(slides).toHaveLength(4);
    expect(slides[3]).toHaveAttribute("aria-label", "4 of 4, Sponsored");
    expect(screen.getByText("Sponsored")).toBeVisible();
    const link = screen.getByRole("link", { name: /Acme summer sale/ });
    expect(link.getAttribute("href")).toBe(api.adGoUrl("ad1", "ad-header"));
    expect(link.getAttribute("rel")).toContain("sponsored");
  });

  it("gets a dot for the sponsored slide too", () => {
    render(<BannerCarousel sponsored={ad} />);
    expect(screen.getByRole("button", { name: "Go to slide 4" })).toBeInTheDocument();
  });
});

describe("getSponsored", () => {
  it("returns the first live ad for the slot", async () => {
    const spy = vi
      .spyOn(api, "listAds")
      .mockResolvedValue({ items: [ad], total: 1, skip: 0, limit: 1 });
    expect(await getSponsored("header")).toEqual(ad);
    expect(spy).toHaveBeenCalledWith({ position: "header", limit: 1 });
  });

  it("returns null when there is no ad", async () => {
    vi.spyOn(api, "listAds").mockResolvedValue({ items: [], total: 0, skip: 0, limit: 1 });
    expect(await getSponsored("footer")).toBeNull();
  });

  it("returns null instead of throwing when the ads request fails", async () => {
    vi.spyOn(api, "listAds").mockRejectedValue(new Error("backend down"));
    await expect(getSponsored("sidebar")).resolves.toBeNull();
    await expect(resilient.listAds({})).resolves.toMatchObject({ items: [] });
  });
});

describe("adGoUrl", () => {
  it("encodes the source tag and omits it when absent", () => {
    expect(api.adGoUrl("a1")).toMatch(/\/ads\/a1\/go$/);
    expect(api.adGoUrl("a1", "a&b")).toContain("src=a%26b");
  });
});
