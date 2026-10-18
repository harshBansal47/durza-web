import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AccountShell from "@/components/account/AccountShell";

vi.mock("@/app/account/actions", () => ({
  logoutAction: vi.fn(),
}));

// The real module is server-only; the shell only ever needs the display name.
vi.mock("@/lib/session", () => ({
  displayName: (user: { full_name: string | null; email: string }) =>
    user.full_name?.trim() || user.email.split("@")[0],
}));

describe("AccountShell identity", () => {
  it("shows the Google avatar when the account has one", () => {
    const { container } = render(
      <AccountShell
        user={{
          email: "ava@example.com",
          full_name: "Ava Tar",
          avatar_url: "https://lh3.googleusercontent.com/a/abc=s96-c",
        }}
        active="/account"
      >
        <p>content</p>
      </AccountShell>,
    );
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(decodeURIComponent(img?.getAttribute("src") ?? "")).toContain(
      "lh3.googleusercontent.com",
    );
    expect(screen.getByText("Ava Tar")).toBeInTheDocument();
  });

  it("renders no photo for password-only accounts", () => {
    const { container } = render(
      <AccountShell
        user={{ email: "ada@example.com", full_name: null, avatar_url: null }}
        active="/account"
      >
        <p>content</p>
      </AccountShell>,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByText("ada")).toBeInTheDocument();
  });
});
