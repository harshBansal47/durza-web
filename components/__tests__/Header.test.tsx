import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "@/components/Header";
import { SessionProvider, type SessionUser } from "@/components/session/SessionProvider";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/app/account/actions", () => ({
  logoutAction: vi.fn(),
}));

// jsdom has no ResizeObserver; the header measures itself in a layout effect.
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

const signedIn = {
  name: "Ava Tar",
  avatarUrl: "https://lh3.googleusercontent.com/a/abc=s96-c",
};

/** The header reads the session from context; the provider takes a test seam. */
function renderHeader(user: SessionUser | null) {
  return render(
    <SessionProvider
      initial={
        user ? { status: "authenticated", user } : { status: "anonymous", user: null }
      }
    >
      <Header />
    </SessionProvider>,
  );
}

describe("Header account chip", () => {
  it("shows a sign-in link when signed out", () => {
    renderHeader(null);
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute(
      "href",
      "/account/login",
    );
  });

  it("stays neutral while the session check is in flight", () => {
    render(
      <SessionProvider>
        <Header />
      </SessionProvider>,
    );
    expect(screen.queryByRole("link", { name: /sign in/i })).toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("renders the Google avatar photo when one is available", () => {
    const { container } = renderHeader(signedIn);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    // next/image rewrites src to the optimizer URL; the source is query-encoded.
    expect(decodeURIComponent(img?.getAttribute("src") ?? "")).toContain(
      "lh3.googleusercontent.com",
    );
  });

  it("falls back to initials when there is no photo", () => {
    const { container } = renderHeader({ name: "Ada Lovelace", avatarUrl: null });
    expect(container.querySelector("img")).toBeNull();
    const button = screen.getByRole("button", { name: /Ada Lovelace/i });
    expect(button).not.toBeNull();
    expect(within(button as HTMLElement).getByText("A")).toBeInTheDocument();
  });

  it("opens a menu with account links and sign out", () => {
    const { container } = renderHeader(signedIn);
    const button = screen.getByRole("button", { name: /Ava Tar/i });
    fireEvent.click(button);
    const menu = container.querySelector("div.absolute");
    expect(menu).not.toBeNull();
    const scope = within(menu as HTMLElement);
    expect(scope.getByRole("link", { name: "Your account" })).toHaveAttribute(
      "href",
      "/account",
    );
    expect(scope.getByRole("link", { name: "Settings" })).toHaveAttribute(
      "href",
      "/account/settings",
    );
    expect(scope.getByRole("button", { name: "Sign out" })).toBeInTheDocument();
  });
});


describe("three-row header", () => {
  it("renders exactly Primary and Secondary nav landmarks", () => {
    render(<Header />);
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Secondary" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^more$/i })).toBeNull();
  });

  it("shows all nine former More destinations inline without a click", () => {
    render(<Header />);
    const secondary = screen.getByRole("navigation", { name: "Secondary" });
    for (const label of [
      "Coupons",
      "Deals",
      "Stores",
      "Bank & card offers",
      "Categories",
      "Collections",
      "Black Friday 2026",
      "How we research",
      "Saved",
    ]) {
      expect(within(secondary).getByRole("link", { name: new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") })).toBeInTheDocument();
    }
  });
});
