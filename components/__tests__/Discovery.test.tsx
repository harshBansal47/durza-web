import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NewDealsRow, RecentlyVerifiedRow } from "@/components/discovery/Discovery";
import { RecommendedRow } from "@/components/discovery/Recommended";
import { StoreFollowButton } from "@/components/StoreFollowButton";
import { SessionProvider } from "@/components/session/SessionProvider";
import type { CouponPublic } from "@/lib/types";

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
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/coupons")) {
        return { ok: true, json: async () => ({ items: [makeCoupon()], total: 1 }) };
      }
      return {
        ok: true,
        json: async () => ({
          id: "s1",
          name: "Amazon",
          slug: "amazon",
          logo_url: null,
          currency: "INR",
        }),
      };
    });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = render(<RecommendedRow />);
    await Promise.resolve();

    expect(container).toBeEmptyDOMElement();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("Recommended stays hidden without the personalization purpose", async () => {
    flagState.consentGranted = false;
    localStorage.setItem(
      "durza.taste_v2",
      JSON.stringify({ version: 2, stores: [{ id: "amazon", at: Date.now() }], followed: [] }),
    );
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { container } = render(<RecommendedRow />);
    await Promise.resolve();

    expect(container).toBeEmptyDOMElement();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("Recommended shows the row and says why when it is allowed", async () => {
    localStorage.setItem(
      "durza.taste_v2",
      JSON.stringify({ version: 2, stores: [{ id: "amazon", at: Date.now() }], followed: [] }),
    );
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/coupons")) {
        return { ok: true, json: async () => ({ items: [makeCoupon()], total: 1 }) };
      }
      return {
        ok: true,
        json: async () => ({
          id: "s1",
          name: "Amazon",
          slug: "amazon",
          logo_url: null,
          currency: "INR",
        }),
      };
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<RecommendedRow />);

    expect(await screen.findByText("For you")).toBeInTheDocument();
    expect(screen.getByText("Why am I seeing this?")).toBeInTheDocument();
    expect(screen.getByText(/You have looked at Amazon/)).toBeInTheDocument();
  });
});

describe("StoreFollowButton", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("follows and unfollows when signed in, with pressed state", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    render(
      <SessionProvider
        initial={{ status: "authenticated", user: { name: "Ada", avatarUrl: null } }}
      >
        <StoreFollowButton slug="nike" name="Nike" />
      </SessionProvider>,
    );
    const btn = screen.getByRole("button", { name: /Follow Nike/ });
    expect(btn).toHaveAttribute("aria-pressed", "false");
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
  });
});
