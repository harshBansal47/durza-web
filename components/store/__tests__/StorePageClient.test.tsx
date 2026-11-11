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

function renderStore(
  s: Store,
  tabs = {},
  pagination: {
    page: number;
    totalPages: number;
    rangeStart?: number;
    rangeEnd?: number;
  } = { page: 1, totalPages: 1 },
  pageStats = stats,
) {
  return render(
    <StorePageClient
      store={s}
      tabs={tabs}
      stats={pageStats}
      relatedStores={[]}
      currency="INR"
      pagination={pagination}
    />,
  );
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

  it("shows pagination immediately after the offers section", () => {
    renderStore(store(), {}, { page: 2, totalPages: 5 });

    const pagination = screen.getByRole("navigation", { name: "Pagination" });

    expect(screen.getByText("Page 2 of 5")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Previous" }).getAttribute("href")).toBe("/stores/acer?page=1");
    expect(screen.getByRole("link", { name: "Next" }).getAttribute("href")).toBe("/stores/acer?page=3");
  });

  it("shows the current range and a compact page window for a 1,000-offer store", () => {
    renderStore(
      store(),
      {},
      { page: 25, totalPages: 50, rangeStart: 481, rangeEnd: 500 },
      { total: 1000, verified: 0, avgRate: 0, totalReports: 0, latestCheck: null },
    );

    expect(screen.getByText("Showing 481–500 of 1000 offers")).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Pagination" }).textContent).toContain("Page 25 of 50");
    expect(screen.getByRole("link", { name: "Page 1" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Page 24" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Page 25" }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByRole("link", { name: "Page 26" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Page 50" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Page 2" })).toBeNull();
  });
});
