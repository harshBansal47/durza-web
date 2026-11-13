import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import StorePageClient from "@/components/store/StorePageClient";
import ToastProvider from "@/components/ui/Toast";
import type { CouponPublic, Store } from "@/lib/types";

vi.mock("@/components/SaveDealBanner", () => ({ default: () => null }));
vi.mock("@/components/CardSaveButton", () => ({ CardSaveButton: () => null }));
vi.mock("@/components/CardImpressions", () => ({ CardImpressions: () => null }));

const store = { id: "s1", name: "Acme", slug: "acme", website_url: "https://acme.example", description: null, is_active: true } as Store;

// Distinct words, so similar-offer grouping never merges two of them into one card.
const WORDS = ["Boots", "Sandals", "Loafers", "Sneakers", "Slippers", "Clogs", "Oxfords", "Pumps", "Flats", "Mules",
  "Wedges", "Trainers", "Brogues", "Espadrilles", "Moccasins", "Slides", "Derbies", "Heels", "Plimsolls", "Galoshes"];

const offer = (i: number, price: string | null): CouponPublic =>
  ({
    id: `c${i}`, slug: `o${i}`, store_id: "s1", title: `${WORDS[i]} for everyday wear`, description: null, code: null,
    discount_type: "percentage", discount_value: 10, expires_at: null, success_rate: null, success_count: 0,
    fail_count: 0, last_checked_at: null, restrictions: price ? { deal_price: price } : {},
  }) as unknown as CouponPublic;

/** 20 offers on one page; `cheap` of them cost ₹399, the rest ₹2109 (in `format`). */
function renderPage(cheap: number, format: (n: number) => string = (n) => `₹${n}`) {
  const items = Array.from({ length: 20 }, (_, i) => offer(i, format(i < cheap ? 399 : 2109)));
  const tabs = {
    best: { label: "Top offers", items },
    latest: { label: "Recently added", items },
    expiring: { label: "Ending soon", items: [] },
  };
  const view = render(
    <ToastProvider>
      <StorePageClient
        store={store}
        tabs={tabs as never}
        stats={{ total: 20, verified: 0, avgRate: 0, totalReports: 0, latestCheck: null }}
        relatedStores={[]}
        currency="INR"
        pagination={{ page: 1, totalPages: 1, rangeStart: 1, rangeEnd: 20 }}
      />
    </ToastProvider>,
  );
  return { cards: () => view.container.querySelectorAll("article").length };
}

const click = (name: string | RegExp) => act(() => void fireEvent.click(screen.getByRole("button", { name })));

describe("the 'Show all offers' button", () => {
  it("counts the offers on the page, not the same offers once per tab", () => {
    renderPage(2);
    expect(screen.getByRole("button", { name: "Show all 20 offers" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: /show all 40/i })).toBeNull();
  });

  it("starts with six cards and reveals the rest when pressed", () => {
    const { cards } = renderPage(2);
    expect(cards()).toBe(6);
    click(/show all/i);
    expect(cards()).toBe(20);
    expect(screen.queryByRole("button", { name: /show all/i })).toBeNull();
  });
});

describe("the 'Under ₹500' filter", () => {
  it("keeps only offers priced under ₹500", () => {
    const { cards } = renderPage(2);
    click("Under ₹500");
    expect(cards()).toBe(2);
  });

  it("works for prices written with decimals, as stores send them", () => {
    const { cards } = renderPage(3, (n) => `₹${n}.00`);
    click("Under ₹500");
    expect(cards()).toBe(3);
  });

  it("works for prices with Indian digit grouping", () => {
    const { cards } = renderPage(4, (n) => (n > 1000 ? "₹2,109.00" : "₹399.00"));
    click("Under ₹500");
    expect(cards()).toBe(4);
  });

  it("goes back to every offer when 'All' is pressed", () => {
    const { cards } = renderPage(2);
    click("Under ₹500");
    click("All");
    expect(cards()).toBe(6);
  });

  it("says so, and offers a way back, when nothing is under ₹500 — not that the store has no offers", () => {
    const { cards } = renderPage(0);
    click("Under ₹500");
    expect(cards()).toBe(0);
    expect(screen.getByText("No offers under ₹500 on this page.")).toBeTruthy();
    expect(screen.queryByText(/no active offers for acme/i)).toBeNull();
    click("Show all offers");
    expect(cards()).toBe(6);
  });
});
