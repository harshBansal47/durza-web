import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ listCoupons: vi.fn() }));
vi.mock("@/lib/api", () => ({ api: { listCoupons: mocks.listCoupons }, STATIC_REVALIDATE: 21600 }));

import { generateStaticParams, PREBUILD_TOP_COUPONS } from "@/app/coupons/[slug]/page";

const coupon = (slug: string) => ({ slug });

describe("coupon detail prebuild", () => {
  beforeEach(() => mocks.listCoupons.mockReset());

  it("prebuilds the top clicked offers from real data", async () => {
    mocks.listCoupons.mockResolvedValue({ items: [coupon("a"), coupon("b")] });
    expect(await generateStaticParams()).toEqual([{ slug: "a" }, { slug: "b" }]);
    expect(mocks.listCoupons).toHaveBeenCalledWith(
      { active_only: true, sort: "most_used", limit: PREBUILD_TOP_COUPONS },
      21600,
    );
  });

  it("falls back to on-demand when the API is unavailable", async () => {
    mocks.listCoupons.mockResolvedValue({ items: undefined });
    expect(await generateStaticParams()).toEqual([]);
  });
});
