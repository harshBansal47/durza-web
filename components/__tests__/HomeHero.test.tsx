import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HomeHero from "@/components/home/hero/HomeHero";
import ToastProvider from "@/components/ui/Toast";
import type { HeroDeal, HeroStore } from "@/lib/home-hero";
import type { CouponPublic } from "@/lib/types";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock("@/components/session/SessionProvider", () => ({
  useSession: () => ({ session: { status: "anonymous" } }),
}));
vi.mock("@/app/account/actions", () => ({ setSavedCouponAction: vi.fn() }));
vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return { ...actual, api: { ...actual.api, verifyCoupon: vi.fn(), getCouponStats: vi.fn().mockResolvedValue({}) } };
});

const store = (id: string, name: string, slug: string): HeroStore => ({ id, name, slug, logoUrl: null, accent: null, offerCount: 3 });
const stores = [store("s1", "HealthKart", "healthkart"), store("s2", "GoBoult", "goboult"), store("s3", "Bewakoof", "bewakoof"), store("s4", "Sirona", "sirona"), store("s5", "Havells", "havells")];

function deal(id: string, s: HeroStore, title: string, code: string | null, extra: Partial<HeroDeal> = {}): HeroDeal {
  return {
    id,
    slug: `deal-${id}`,
    coupon: { id, store_id: s.id, slug: `deal-${id}`, code, title, success_count: 0, fail_count: 0, last_verified_at: null, success_rate: null, verification_status: "verified" } as unknown as CouponPublic,
    store: s,
    category: "Fitness",
    title,
    code,
    discount: "10% off",
    checkedLabel: "2 hours ago",
    endsInDays: 4,
    verified: true,
    terms: ["Valid on orders above ₹999"],
    sourceText: "Read from the HealthKart offers page",
    goHref: `https://api.test/go/${id}`,
    ...extra,
  };
}
const deals = [
  deal("1", stores[0], "Extra 10% off on whey protein", "SV10VC"),
  deal("2", stores[1], "Flat ₹300 off on earbuds", "BOULT300"),
  deal("3", stores[2], "Up to 40% off sitewide", null),
  deal("4", stores[3], "Cup + wash combo", "SIRONA15"),
  deal("5", stores[4], "BLDC fan offer", "FAN5", { verified: false }),
];
const featured = deals.slice(0, 4);

function renderHero(props: Partial<React.ComponentProps<typeof HomeHero>> = {}) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <ToastProvider>
        <HomeHero
          deals={deals}
          featured={featured}
          stores={stores}
          popularStores={stores}
          categories={[{ slug: "electronics", name: "Electronics", count: 12 }, { slug: "fashion", name: "Fashion", count: 8 }]}
          stats={{ coupons: 1255, stores: 94, categories: 16 }}
          {...props}
        />
      </ToastProvider>
    </QueryClientProvider>,
  );
}

const searchInput = () => screen.getByRole("combobox", { name: /search stores and codes/i });

beforeEach(() => {
  push.mockReset();
  window.localStorage.clear();
  document.body.style.overflow = "";
});
afterEach(() => {
  vi.useRealTimers();
});

describe("HomeHero — structure", () => {
  it("renders the compact headline, eyebrow, featured panel and trust band", () => {
    renderHero();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Discover genuine deals. Shop smarter. Save more.");
    expect(screen.getByRole("complementary", { name: "Featured offers" })).toBeInTheDocument();
    expect(screen.getByText("No fake countdown timers")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "+ 89 more" })).toHaveAttribute("href", "/stores");
    expect(screen.getByRole("link", { name: /All 1,255 coupons/ })).toBeInTheDocument();
  });

  it("omits invented numbers when there is no data", () => {
    renderHero({ categories: [], featured: [], stats: { coupons: 0, stores: 0, categories: 0 } });
    expect(screen.queryByText(/checked within the last 24 hours/i)).not.toBeInTheDocument();
    expect(screen.getByText(/No featured offers right now/)).toBeInTheDocument();
  });

  it("only claims CHECKED OUT for the panel when every featured offer is verified", () => {
    renderHero({ featured: [deals[0], deals[4]] });
    expect(screen.getByText("LIVE")).toBeInTheDocument();
  });
});

describe("HomeHero — search", () => {
  it("focuses the search on '/' but not while typing in another field", async () => {
    const user = userEvent.setup();
    renderHero();
    await user.keyboard("/");
    expect(searchInput()).toHaveFocus();
    expect(searchInput()).toHaveAttribute("aria-expanded", "true");

    const other = document.createElement("input");
    document.body.appendChild(other);
    other.focus();
    await user.keyboard("/");
    expect(other).toHaveFocus();
    expect(other.value).toBe("/");
    other.remove();
  });

  it("filters live, highlights the match, and navigates with arrows, enter and escape", async () => {
    const user = userEvent.setup();
    renderHero();
    await user.click(searchInput());
    await user.type(searchInput(), "boult");
    const list = screen.getByRole("listbox", { name: "Search results" });
    expect(within(list).getAllByRole("option").length).toBeGreaterThanOrEqual(2); // the deal + the store
    expect(list.querySelector("mark")).toHaveTextContent(/boult/i);

    await user.keyboard("{ArrowDown}");
    expect(within(list).getAllByRole("option")[1]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowUp}");
    expect(within(list).getAllByRole("option")[0]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Enter}"); // first result is the deal → drawer
    expect(await screen.findByRole("dialog", { name: /Offer details: GoBoult/ })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(searchInput()).toHaveFocus(); // focus returned
  });

  it("closes on Escape, then clears on a second Escape", async () => {
    const user = userEvent.setup();
    renderHero();
    await user.type(searchInput(), "whey");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(searchInput()).toHaveValue("whey");
    await user.keyboard("{Escape}");
    expect(searchInput()).toHaveValue("");
  });

  it("scopes results: codes, deals, stores", async () => {
    const user = userEvent.setup();
    renderHero();
    await user.type(searchInput(), "off");
    await user.click(screen.getByRole("tab", { name: "Coupon codes" }));
    const codes = screen.getByRole("listbox");
    expect(codes).toHaveTextContent("SV10VC");
    expect(codes).toHaveTextContent("BOULT300");
    expect(codes).not.toHaveTextContent("Up to 40% off sitewide"); // no-code deal is excluded
    await user.click(screen.getByRole("tab", { name: "Deals" }));
    expect(screen.getByRole("listbox")).toHaveTextContent("Up to 40% off sitewide");
    await user.click(screen.getByRole("tab", { name: "Stores" }));
    expect(screen.getByRole("listbox")).toHaveTextContent(/Nothing in today/);
    await user.clear(searchInput());
    await user.type(searchInput(), "boult");
    expect(screen.getByRole("listbox")).toHaveTextContent("GoBoult");
  });

  it("routes a store click and falls back to /search", async () => {
    const user = userEvent.setup();
    renderHero();

    await user.click(screen.getByRole("tab", { name: "All" }));
    await user.clear(searchInput());
    await user.type(searchInput(), "sirona");
    await user.click(within(screen.getByRole("listbox")).getByRole("option", { name: /Sirona.*live offers/ }));
    expect(push).toHaveBeenCalledWith("/stores/sirona");

    await user.clear(searchInput());
    await user.type(searchInput(), "zzzz");
    await user.keyboard("{Enter}");
    expect(push).toHaveBeenLastCalledWith("/search?q=zzzz");
  });
});

describe("HomeHero — copy", () => {
  it("writes the exact code to the clipboard, shows COPIED, and toasts with an Open store action", async () => {
    const user = userEvent.setup();
    renderHero();
    const btn = screen.getByRole("button", { name: "Copy code SV10VC" });
    await user.click(btn);
    expect(await navigator.clipboard.readText()).toBe("SV10VC");
    expect(btn).toHaveTextContent("COPIED");
    expect(await screen.findByText(/Code SV10VC copied/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open store" })).toBeInTheDocument();
  });

  it("shows VIEW DEAL (not a code chip) for offers without a code", () => {
    renderHero();
    expect(screen.getByText("VIEW DEAL →")).toBeInTheDocument();
  });
});

describe("HomeHero — drawer & overlay hygiene", () => {
  it("shows code, check time, stated terms and a tracked store link; closes via Esc, scrim and button", async () => {
    const user = userEvent.setup();
    renderHero();
    const opener = screen.getAllByRole("button", { name: /Extra 10% off on whey protein/ })[0];
    await user.click(opener);
    const drawer = screen.getByRole("dialog", { name: /Offer details: HealthKart/ });
    expect(drawer).toHaveTextContent("SV10VC");
    expect(drawer).toHaveTextContent("2 hours ago");
    expect(drawer).toHaveTextContent("Valid on orders above ₹999");
    expect(drawer).toHaveTextContent("ends in 4 days");
    expect(within(drawer).getByRole("link", { name: /Open HealthKart & paste code/ })).toHaveAttribute("rel", expect.stringContaining("sponsored"));
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe("");

    await user.click(opener);
    await user.click(document.querySelector(".hx-scrim") as HTMLElement);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(opener);
    await user.click(screen.getByRole("button", { name: "Close offer details" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("traps Tab focus inside the drawer", async () => {
    const user = userEvent.setup();
    renderHero();
    await user.click(screen.getAllByRole("button", { name: /Extra 10% off on whey protein/ })[0]);
    const drawer = screen.getByRole("dialog");
    for (let i = 0; i < 25; i++) {
      await user.tab();
      expect(drawer.contains(document.activeElement)).toBe(true);
    }
    await user.tab({ shift: true });
    expect(drawer.contains(document.activeElement)).toBe(true);
  });

  it("leaves no stuck overlay, scroll lock or listener after repeated open/close cycles", async () => {
    const user = userEvent.setup();
    const add = vi.spyOn(document, "addEventListener");
    const remove = vi.spyOn(document, "removeEventListener");
    renderHero();
    const keydownBefore = add.mock.calls.filter(([t]) => t === "keydown").length;
    for (let i = 0; i < 5; i++) {
      await user.click(screen.getAllByRole("button", { name: /Flat ₹300 off on earbuds/ })[0]);
      await user.click(screen.getByRole("button", { name: "Close offer details" }));
    }
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.querySelector(".hx-scrim")).toBeNull();
    expect(document.body.style.overflow).toBe("");
    const added = add.mock.calls.filter(([t]) => t === "keydown").length - keydownBefore;
    const removed = remove.mock.calls.filter(([t]) => t === "keydown").length;
    expect(removed).toBeGreaterThanOrEqual(added); // every overlay keydown listener was removed
    add.mockRestore();
    remove.mockRestore();
  });
});

describe("HomeHero — featured rotation", () => {
  const hotTitle = () => document.querySelector(".hx-fcard.hot .hx-fc-open")?.textContent;

  it("advances every 6s, holds on hover, and dots jump (restarting the timer)", () => {
    vi.useFakeTimers();
    renderHero();
    expect(hotTitle()).toBe("Extra 10% off on whey protein");
    act(() => void vi.advanceTimersByTime(6000));
    expect(hotTitle()).toBe("Flat ₹300 off on earbuds");

    const desk = screen.getByRole("complementary", { name: "Featured offers" });
    fireEvent.mouseEnter(desk);
    act(() => void vi.advanceTimersByTime(20000));
    expect(hotTitle()).toBe("Flat ₹300 off on earbuds"); // held
    fireEvent.mouseLeave(desk);
    act(() => void vi.advanceTimersByTime(6000));
    expect(hotTitle()).toBe("Up to 40% off sitewide");

    fireEvent.click(screen.getByRole("button", { name: /Highlight offer 1 of 4/ }));
    expect(hotTitle()).toBe("Extra 10% off on whey protein");
    act(() => void vi.advanceTimersByTime(5900));
    expect(hotTitle()).toBe("Extra 10% off on whey protein"); // timer restarted by the click
    act(() => void vi.advanceTimersByTime(200));
    expect(hotTitle()).toBe("Flat ₹300 off on earbuds");
  });

  it("clears its timer on unmount", () => {
    vi.useFakeTimers();
    const { unmount } = renderHero();
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("labels the highlighted card TOP CHECK only when it is verified", () => {
    renderHero();
    expect(screen.getByText("TOP CHECK")).toBeInTheDocument();
    renderHero({ featured: [deals[4], deals[0]] });
    expect(screen.getByText("FEATURED")).toBeInTheDocument();
  });
});
