import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DealFeed from "@/components/deals/DealFeed";
import DealsCategoryPills from "@/components/deals/DealsCategoryPills";
import LoadMoreDeals from "@/components/deals/LoadMoreDeals";
import SpotlightDeal from "@/components/deals/SpotlightDeal";
import { dealFeedDividerLabel, pickSpotlightDeal } from "@/lib/deal-feed";
import type { CouponPublic } from "@/lib/types";

function makeCoupon(overrides: Partial<CouponPublic> = {}): CouponPublic {
  return {
    id: "c1",
    title: "20% off headphones",
    slug: "20-off-headphones",
    code: "SAVE20",
    description: null,
    discount_type: "percentage",
    discount_value: 20,
    store_id: "s1",
    category_id: "cat1",
    expires_at: null,
    is_active: true,
    views_count: 0,
    clicks_count: 0,
    success_count: 0,
    fail_count: 0,
    last_verified_at: null,
    success_rate: null,
    verification_status: "unverified",
    last_checked_at: null,
    restrictions: null,
    verification_failures: 0,
    tested_cart_value: null,
    verified_discount_amount: null,
    auto_suppressed: false,
    created_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

const amazon = { id: "s1", name: "Amazon", slug: "amazon", logo_url: null, currency: "INR" };

describe("dealFeedDividerLabel", () => {
  it("names the category most of the next stretch belongs to", () => {
    const coupons = [
      ...Array.from({ length: 7 }, (_, i) => makeCoupon({ id: `a${i}`, category_id: "electronics" })),
      ...Array.from({ length: 5 }, (_, i) => makeCoupon({ id: `b${i}`, category_id: "fashion" })),
      makeCoupon({ id: "b5", category_id: "beauty" }),
    ];
    const name = (id: string) => (id === "fashion" ? "Fashion" : "Beauty");
    expect(dealFeedDividerLabel(coupons, 7, name)).toBe("More fashion deals");
  });

  it("stays generic when the stretch is too short to name", () => {
    const coupons = Array.from({ length: 10 }, (_, i) =>
      makeCoupon({ id: `c${i}`, category_id: "fashion" }),
    );
    expect(dealFeedDividerLabel(coupons, 7, () => "Fashion")).toBeNull();
  });

  it("stays generic when no category leads a mixed stretch", () => {
    const coupons = Array.from({ length: 4 }, (_, i) =>
      makeCoupon({ id: `d${i}`, category_id: `cat-${i}` }),
    );
    expect(dealFeedDividerLabel(coupons, 0, (id) => id)).toBe("More deals");
  });
});

describe("pickSpotlightDeal", () => {
  it("prefers the steepest percentage, then the biggest fixed amount", () => {
    const small = makeCoupon({ id: "a", discount_type: "percentage", discount_value: 7.5 });
    const fixed = makeCoupon({ id: "b", discount_type: "fixed", discount_value: 6000 });
    const steep = makeCoupon({ id: "c", discount_type: "percentage", discount_value: 60 });
    const plain = makeCoupon({ id: "d", discount_type: "deal", discount_value: null });

    expect(pickSpotlightDeal([small, fixed, steep])?.id).toBe("c");
    expect(pickSpotlightDeal([fixed, plain])?.id).toBe("b");
  });

  it("falls back to the first card when no discount figure exists", () => {
    const coupon = makeCoupon({ id: "a", discount_type: "deal", discount_value: null });
    expect(pickSpotlightDeal([coupon])?.id).toBe("a");
    expect(pickSpotlightDeal([])).toBeUndefined();
  });
});

describe("DealFeed", () => {
  it("inserts a divider every seventh card, labelled from the stretch below it", () => {
    const coupons = Array.from({ length: 12 }, (_, i) =>
      makeCoupon({
        id: `c${i}`,
        title: `Deal ${i}`,
        category_id: i >= 7 ? "fashion" : "electronics",
      }),
    );
    const { container } = render(
      <DealFeed
        coupons={coupons}
        startIndex={0}
        stores={[amazon]}
        categoryNames={{ electronics: "Electronics", fashion: "Fashion" }}
      />,
    );

    expect(screen.getByText("More fashion deals")).toBeInTheDocument();
    expect(container.querySelectorAll("p.col-span-full")).toHaveLength(1);
  });

  it("hides the spotlight's grid copy below md without dropping it from the DOM", () => {
    const coupons = [
      makeCoupon({ id: "c1", title: "Spotlight me" }),
      makeCoupon({ id: "c2", title: "Second" }),
    ];
    const { container } = render(
      <DealFeed
        coupons={coupons}
        startIndex={0}
        stores={[amazon]}
        categoryNames={{}}
        hideOnMobileIds={["c1"]}
      />,
    );

    const hiddenCopies = container.querySelectorAll('[class*="md:block"]');
    expect(hiddenCopies).toHaveLength(1);
    expect(hiddenCopies[0].textContent).toContain("Spotlight me");
  });
});

describe("DealsCategoryPills", () => {
  it("rebuilds the query per pill, keeps the other filters and drops paging", () => {
    render(
      <DealsCategoryPills
        categories={[
          { id: "c1", name: "Fashion", slug: "fashion" },
          { id: "c2", name: "Beauty", slug: "beauty" },
        ]}
        active={["fashion"]}
        params={{ q: "shoes", stores: "myntra", categories: "fashion", skip: "20" }}
      />,
    );

    expect(screen.getByRole("link", { name: "Fashion" })).toHaveAttribute(
      "href",
      "/deals?q=shoes&stores=myntra&categories=fashion",
    );
    expect(screen.getByRole("link", { name: "Fashion" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "Beauty" })).toHaveAttribute(
      "href",
      "/deals?q=shoes&stores=myntra&categories=beauty",
    );
    expect(screen.getByRole("link", { name: "All" })).toHaveAttribute(
      "href",
      "/deals?q=shoes&stores=myntra",
    );
  });
});

describe("LoadMoreDeals", () => {
  function renderPager(total: number, allItems: CouponPublic[], limit = 20) {
    return render(
      <LoadMoreDeals
        facets={{ store_ids: [], category_ids: [], unresolved: false }}
        baseSkip={0}
        serverCount={1}
        serverIds={allItems.slice(0, 1).map((coupon) => coupon.id)}
        total={total}
        limit={limit}
        stores={[amazon]}
        categoryNames={{}}
        nextHref="/deals?skip=20"
        allItems={allItems}
      />,
    );
  }

  it("appends the next slice from the ordered list and then reports the end", async () => {
    const first = makeCoupon({ id: "c1", title: "First deal" });
    const second = makeCoupon({ id: "c2", title: "Second page deal" });
    renderPager(2, [first, second]);

    const button = screen.getByRole("link", { name: "View More" });
    expect(button).toHaveAttribute("href", "/deals?skip=20");

    fireEvent.click(button);

    expect(await screen.findByText("Second page deal")).toBeInTheDocument();
    expect(screen.getByText(/That's all 2 deals\./)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "View More" })).not.toBeInTheDocument();
  });

  it("keeps paging while ordered deals remain", async () => {
    const deals = [
      makeCoupon({ id: "c1", title: "First deal" }),
      makeCoupon({ id: "c2", title: "Second deal" }),
      makeCoupon({ id: "c3", title: "Third deal" }),
    ];
    renderPager(3, deals, 1);

    fireEvent.click(screen.getByRole("link", { name: "View More" }));
    expect(await screen.findByText("Second deal")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View More" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: "View More" }));
    expect(await screen.findByText("Third deal")).toBeInTheDocument();
    expect(screen.getByText(/That's all 3 deals\./)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "View More" })).not.toBeInTheDocument();
  });
});

describe("SpotlightDeal", () => {
  it("shows the big discount figure and links out through the tracked url", () => {
    render(<SpotlightDeal coupon={makeCoupon()} store={amazon} position={1} />);

    expect(screen.getByText("Best deal today")).toBeInTheDocument();
    expect(screen.getByText("20% off")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Get Deal" })).toHaveAttribute(
      "href",
      expect.stringContaining("/coupons/c1/go?src=spotlight"),
    );
  });

  it("falls back to the code when the offer has no figure", () => {
    render(
      <SpotlightDeal
        coupon={makeCoupon({ discount_type: "deal", discount_value: null, code: "FREESHIP" })}
        store={amazon}
        position={1}
      />,
    );

    expect(screen.getByText("FREESHIP")).toBeInTheDocument();
  });
});
