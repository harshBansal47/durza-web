import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CouponFilterPanel from "@/components/filters/CouponFilterPanel";
import FilterChips from "@/components/filters/FilterChips";
import SortControl from "@/components/filters/SortControl";

const h = vi.hoisted(() => ({ search: "", push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: h.push }),
  usePathname: () => "/coupons",
  useSearchParams: () => new URLSearchParams(h.search),
}));

const stores = [
  { id: "s1", name: "Amazon", slug: "amazon" },
  { id: "s2", name: "Ajio", slug: "ajio" },
];
const categories = [{ id: "c1", name: "Fashion", slug: "fashion" }];

function lastPush(): string {
  expect(h.push).toHaveBeenCalled();
  return h.push.mock.calls[h.push.mock.calls.length - 1][0] as string;
}

describe("CouponFilterPanel", () => {
  it("opens the store menu and writes the chosen store to the URL", () => {
    h.search = "type=deal&skip=40";
    render(<CouponFilterPanel stores={stores} categories={categories} />);

    fireEvent.click(screen.getByRole("button", { name: /All stores/ }));
    fireEvent.click(screen.getByRole("option", { name: "Amazon" }));

    // Paging is dropped: page 3 of the old result set is not page 1 of the new one.
    expect(lastPush()).toBe("/coupons?type=deal&store=amazon");
  });

  it("keeps every other filter when one control changes", () => {
    h.search = "q=shoes&rate=80&expires=7";
    render(<CouponFilterPanel stores={stores} categories={categories} />);

    fireEvent.click(screen.getByRole("button", { name: /Any kind/ }));
    fireEvent.click(screen.getByRole("option", { name: "Percentage off" }));

    expect(lastPush()).toBe("/coupons?q=shoes&rate=80&expires=7&type=percentage");
  });

  it("clears filters but keeps the search the visitor typed", () => {
    h.search = "q=shoes&store=amazon&rate=80&sort=newest";
    render(<CouponFilterPanel stores={stores} categories={categories} />);

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(lastPush()).toBe("/coupons?q=shoes");
  });

  it("hides the category control when the page is already scoped to one", () => {
    h.search = "";
    render(<CouponFilterPanel stores={stores} categories={categories} hideCategory />);
    expect(screen.queryByRole("button", { name: /All categories/ })).not.toBeInTheDocument();
  });
});

describe("SortControl", () => {
  it("writes the sort and resets paging", () => {
    h.search = "type=deal&sort=newest&skip=60";
    render(<SortControl />);

    fireEvent.click(screen.getByRole("button", { name: "Sort results" }));
    fireEvent.click(screen.getByRole("option", { name: "Ending soonest" }));

    expect(lastPush()).toBe("/coupons?type=deal&sort=ending_soon");
  });

  it("drops the param when the visitor goes back to the default sort", () => {
    h.search = "type=deal&sort=newest";
    render(<SortControl />);

    fireEvent.click(screen.getByRole("button", { name: "Sort results" }));
    fireEvent.click(screen.getByRole("option", { name: "Recommended" }));

    expect(lastPush()).toBe("/coupons?type=deal");
  });
});

describe("FilterChips", () => {
  it("removes one filter at a time and keeps the rest", () => {
    h.search = "store=amazon&rate=80&q=shoes";
    render(<FilterChips storeLabel="Amazon" />);

    fireEvent.click(screen.getByRole("button", { name: "Remove filter: Amazon" }));
    expect(lastPush()).toBe("/coupons?rate=80&q=shoes");
  });

  it("clears every filter but not the query", () => {
    h.search = "store=amazon&rate=80&q=shoes";
    render(<FilterChips storeLabel="Amazon" />);

    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));
    expect(lastPush()).toBe("/coupons?q=shoes");
  });

  it("renders nothing when no filter is active", () => {
    h.search = "q=shoes";
    const { container } = render(<FilterChips />);
    expect(container).toBeEmptyDOMElement();
  });
});
