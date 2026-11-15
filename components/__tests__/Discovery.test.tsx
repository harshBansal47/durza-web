import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NewDealsRow, RecentlyVerifiedRow } from "@/components/discovery/Discovery";
import { RecommendedRow } from "@/components/discovery/Recommended";
import type { CouponPublic } from "@/lib/types";

const { apiMock } = vi.hoisted(() => ({
  apiMock: { getStoreBySlug: vi.fn(), listCoupons: vi.fn() },
}));

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, api: { ...actual.api, ...apiMock } };
});

import { api } from "@/lib/api";

// The "For you" row is personalised: it needs the build flag on and the
// visitor's personalization consent. Both are mocked so a test can turn them
// on and off.
const { flagState } = vi.hoisted(() => ({
  flagState: { personalizationEnabled: true, consentGranted: true },
}));
vi.mock("@/lib/flags", () => ({
  get PERSONALIZATION_ENABLED() {
    return flagState.personalizationEnabled;
  },
}));
vi.mock("@/lib/consent", () => ({
  isPersonalizationAllowed: () => flagState.consentGranted,
  isAnalyticsAllowed: () => true,
  getPersonalizationConsent: () => (flagState.consentGranted ? "accepted" : null),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

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

const stores = [{ id: "s1", name: "Amazon", slug: "amazon", currency: "USD" }];

describe("discovery modules", () => {
  beforeEach(() => {
    localStorage.clear();
    flagState.personalizationEnabled = true;
    flagState.consentGranted = true;
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("RecentlyVerified renders nothing without verification data — never fake freshness", () => {
    const { container } = render(<RecentlyVerifiedRow coupons={[makeCoupon()]} stores={stores} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("RecentlyVerified shows checked deals when the data backs it", () => {
    render(
      <RecentlyVerifiedRow
        coupons={[makeCoupon({ last_verified_at: "2026-03-01T00:00:00Z", success_count: 3, success_rate: 0.9 })]}
        stores={stores}
      />,
    );
    expect(screen.getByText("Freshly checked")).toBeInTheDocument();
  });

  it("NewDeals lists the newest stock", () => {
    render(<NewDealsRow coupons={[makeCoupon()]} stores={stores} />);
    expect(screen.getByText("New deals")).toBeInTheDocument();
  });

  it("Recommended stays hidden with no taste signals — never invents picks", () => {
    const { container } = render(<RecommendedRow />);
    expect(container).toBeEmptyDOMElement();
  });

  it("Recommended stays hidden while personalization is off", async () => {
    flagState.personalizationEnabled = false;
    localStorage.setItem(
      "durza.taste_v2",
      JSON.stringify({ version: 2, stores: [{ id: "amazon", at: Date.now() }], followed: [] }),
    );
    localStorage.setItem("durza_personalization_v1", "accepted");
    const { container } = render(<RecommendedRow />);
    await Promise.resolve();

    expect(container).toBeEmptyDOMElement();
    expect(api.getStoreBySlug).not.toHaveBeenCalled();
    expect(api.listCoupons).not.toHaveBeenCalled();
  });

  it("Recommended stays hidden without the personalization purpose", async () => {
    flagState.consentGranted = false;
    localStorage.setItem(
      "durza.taste_v2",
      JSON.stringify({ version: 2, stores: [{ id: "amazon", at: Date.now() }], followed: [] }),
    );
    const { container } = render(<RecommendedRow />);
    await Promise.resolve();

    expect(container).toBeEmptyDOMElement();
    expect(api.getStoreBySlug).not.toHaveBeenCalled();
    expect(api.listCoupons).not.toHaveBeenCalled();
  });

  it("Recommended shows the row and says why when it is allowed", async () => {
    localStorage.setItem(
      "durza.taste_v2",
      JSON.stringify({ version: 2, stores: [{ id: "amazon", at: Date.now() }], followed: [] }),
    );
    apiMock.getStoreBySlug.mockResolvedValue({
      id: "s1",
      name: "Amazon",
      slug: "amazon",
      logo_url: null,
      currency: "INR",
    });
    apiMock.listCoupons.mockResolvedValue({ items: [makeCoupon()], total: 1 });

    render(<RecommendedRow />);

    expect(await screen.findByText("For you")).toBeInTheDocument();
    expect(screen.getByText("Why am I seeing this?")).toBeInTheDocument();
    expect(screen.getByText(/You have looked at Amazon/)).toBeInTheDocument();
  });

  it("Recommended asks for every store at once, not one after another", async () => {
    localStorage.setItem(
      "durza.taste_v2",
      JSON.stringify({
        version: 2,
        stores: [
          { id: "amazon", at: Date.now() },
          { id: "myntra", at: Date.now() },
          { id: "nykaa", at: Date.now() },
        ],
        followed: [],
      }),
    );
    // None of the lookups resolves until we say so. If the row waited for one store
    // before asking for the next, only one call would have been made by now.
    const release: Array<() => void> = [];
    apiMock.getStoreBySlug.mockImplementation(
      (slug: string) =>
        new Promise((resolve) => {
          release.push(() => resolve({ id: `id-${slug}`, name: slug, slug, logo_url: null, currency: "INR" }));
        }),
    );
    apiMock.listCoupons.mockResolvedValue({ items: [makeCoupon()], total: 1 });

    render(<RecommendedRow />);
    await vi.waitFor(() => expect(api.getStoreBySlug).toHaveBeenCalledTimes(3));

    release.forEach((resolve) => resolve());
    expect(await screen.findByText("For you")).toBeInTheDocument();
  });

  it("Recommended keeps the visitor's order and skips a store that fails", async () => {
    localStorage.setItem(
      "durza.taste_v2",
      JSON.stringify({
        version: 2,
        stores: [
          { id: "slow", at: Date.now() },
          { id: "broken", at: Date.now() },
          { id: "fast", at: Date.now() },
        ],
        followed: [],
      }),
    );
    apiMock.getStoreBySlug.mockImplementation(async (slug: string) => {
      if (slug === "broken") throw new Error("offline");
      if (slug === "slow") await new Promise((resolve) => setTimeout(resolve, 20));
      return { id: `id-${slug}`, name: slug, slug, logo_url: null, currency: "INR" };
    });
    apiMock.listCoupons.mockResolvedValue({ items: [makeCoupon()], total: 1 });

    render(<RecommendedRow />);
    await screen.findByText("For you");

    const names = screen.getAllByText(/^More from/).map((el) => el.textContent);
    expect(names).toEqual(["More from slow", "More from fast"]);
  });
});
