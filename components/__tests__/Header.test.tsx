import { render, screen, within } from "@testing-library/react";
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

const links = [{ href: "/", label: "Home" }];

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
      <Header links={links} />
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
        <Header links={links} />
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
    const summary = container.querySelector("summary");
    expect(summary).not.toBeNull();
    expect(within(summary as HTMLElement).getByText("A")).toBeInTheDocument();
  });

  it("opens a menu with account links and sign out", () => {
    const { container } = renderHeader(signedIn);
    const menu = container.querySelector("details");
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
