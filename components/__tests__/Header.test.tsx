import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "@/components/Header";

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

describe("Header account chip", () => {
  it("shows a sign-in link when signed out", () => {
    render(<Header links={links} />);
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute(
      "href",
      "/account/login",
    );
  });

  it("renders the Google avatar photo when one is available", () => {
    const { container } = render(<Header links={links} user={signedIn} />);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    // next/image rewrites src to the optimizer URL; the source is query-encoded.
    expect(decodeURIComponent(img?.getAttribute("src") ?? "")).toContain(
      "lh3.googleusercontent.com",
    );
  });

  it("falls back to initials when there is no photo", () => {
    const { container } = render(
      <Header links={links} user={{ name: "Ada Lovelace", avatarUrl: null }} />,
    );
    expect(container.querySelector("img")).toBeNull();
    const summary = container.querySelector("summary");
    expect(summary).not.toBeNull();
    expect(within(summary as HTMLElement).getByText("A")).toBeInTheDocument();
  });

  it("opens a menu with account links and sign out", () => {
    const { container } = render(<Header links={links} user={signedIn} />);
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
