import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DealFeed from "@/components/deals/DealFeed";
import DealsCategoryPills from "@/components/deals/DealsCategoryPills";
import LoadMoreDeals from "@/components/deals/LoadMoreDeals";
import SpotlightDeal from "@/components/deals/SpotlightDeal";
import { api } from "@/lib/api";
import { dealFeedDividerLabel, pickSpotlightDeal } from "@/lib/deal-feed";
import type { CouponPublic } from "@/lib/types";

vi.mock("@/lib/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/api")>();
  return { ...actual, api: { ...actual.api, listCoupons: vi.fn() } };
});

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
  const listCoupons = vi.mocked(api.listCoupons);

  beforeEach(() => {
    listCoupons.mockReset();
  });

  function renderPager(total: number) {
    return render(
      <LoadMoreDeals
        filters={{
          stores: [],
          categories: [],
          verifiedWithinHours: undefined,
          expiresWithinDays: undefined,
          sort: "recommended",
        }}
        facets={{ store_ids: [], category_ids: [], unresolved: false }}
        keyword=""
        baseSkip={0}
        serverCount={1}
        serverIds={["c1"]}
        total={total}
        limit={20}
        stores={[amazon]}
        categoryNames={{}}
        nextHref="/deals?skip=20"
      />,
    );
  }

  it("appends the next page in place and then reports the end", async () => {
    listCoupons.mockResolvedValueOnce({
      items: [makeCoupon({ id: "c2", title: "Second page deal" })],
      total: 2,
      skip: 1,
      limit: 20,
    });
    renderPager(2);

    const button = screen.getByRole("link", { name: "Load more deals…" });
    expect(button).toHaveAttribute("href", "/deals?skip=20");

    fireEvent.click(button);

    expect(await screen.findByText("Second page deal")).toBeInTheDocument();
    expect(listCoupons).toHaveBeenCalledTimes(1);
    expect(listCoupons.mock.calls[0][0]).toMatchObject({ skip: 1, limit: 20 });
    expect(screen.getByText(/That's all 2 deals for this view/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Load more deals…" })).not.toBeInTheDocument();
  });

  it("keeps the button and explains when the fetch fails", async () => {
    listCoupons.mockRejectedValueOnce(new Error("offline"));
    renderPager(5);

    fireEvent.click(screen.getByRole("link", { name: "Load more deals…" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/Couldn't load more deals/);
    expect(screen.getByRole("link", { name: "Load more deals…" })).toBeInTheDocument();
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
