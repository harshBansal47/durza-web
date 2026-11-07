import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import StorePageClient from "@/components/store/StorePageClient";
import type { Store } from "@/lib/types";

vi.mock("@/components/SaveDealBanner", () => ({ default: () => null }));

const store = (overrides: Partial<Store> = {}): Store =>
  ({
    id: "s1",
    name: "Acer",
    slug: "acer",
    website_url: "https://www.acer.example/in",
    description: null,
    is_active: true,
    ...overrides,
  }) as Store;

const stats = { total: 0, verified: 0, avgRate: 0, totalReports: 0, latestCheck: null };

function renderStore(s: Store, tabs = {}) {
  return render(<StorePageClient store={s} tabs={tabs} stats={stats} relatedStores={[]} currency="INR" />);
}

const goLinks = () =>
  screen.getAllByRole("link").filter((a) => (a.getAttribute("href") ?? "").startsWith("/go/"));

describe("Go to store", () => {
  it("sends every store link through the neutral /go path, tagged with the page", () => {
    renderStore(store());
    const links = goLinks();

    expect(links.length).toBeGreaterThanOrEqual(2); // the button and the website pill
    for (const link of links) {
      expect(link.getAttribute("href")).toBe("/go/acer?src=store-page");
    }
  });

  it("marks them sponsored and opens a new tab safely", () => {
    renderStore(store());
    for (const link of goLinks()) {
      expect(link.getAttribute("rel")?.split(" ")).toEqual(
        expect.arrayContaining(["sponsored", "nofollow", "noopener", "noreferrer"]),
      );
      expect(link.getAttribute("target")).toBe("_blank");
    }
  });

  it("never links straight to the store's website, which would skip tracking and disclosure", () => {
    renderStore(store());
    const direct = screen.getAllByRole("link").filter((a) => a.getAttribute("href")?.includes("acer.example"));
    expect(direct).toEqual([]);
  });

  it("says we may earn a commission, right beside the button", () => {
    renderStore(store());
    expect(screen.getByText(/we may earn a commission/i)).toBeTruthy();
    expect(screen.getByText(/never changes the price you pay/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /how we make money/i }).getAttribute("href")).toBe("/affiliate-disclosure");
  });

  it("shows no button, and no promise of one, when the store has no usable website", () => {
    renderStore(store({ website_url: "javascript:alert(1)" }));
    expect(goLinks()).toEqual([]);
    expect(screen.queryByText(/we may earn a commission/i)).toBeNull();
  });

  it("never mentions a network", () => {
    const { container } = renderStore(store());
    expect(container.innerHTML.toLowerCase()).not.toMatch(/vcommission|admitad|cuelinks/);
  });
});

describe("a store with no offers", () => {
  it("is honest that there is nothing to promise, and still lets the shopper through", () => {
    renderStore(store());

    expect(screen.getByRole("heading", { name: /no active offers for acer right now/i })).toBeTruthy();
    expect(screen.getByText(/we have no discount to promise/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /shop acer via durza/i }).getAttribute("href")).toBe(
      "/go/acer?src=store-page",
    );
  });

  it("offers no button in the empty state when there is nowhere to send the shopper", () => {
    renderStore(store({ website_url: null }));
    expect(screen.queryByRole("link", { name: /via durza/i })).toBeNull();
    expect(screen.getByRole("heading", { name: /no active offers/i })).toBeTruthy();
  });
});
