import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StoreHero from "@/components/StoreHero";
import ToastProvider from "@/components/ui/Toast";

describe("StoreHero heading level (Phase 1 T10)", () => {
  it("renders an h1 by default for generic store pages", () => {
    render(<ToastProvider><StoreHero name="Example Store" subtitle="Live offers" /></ToastProvider>);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Example Store");
  });

  it("renders an h2 when a custom page owns the h1", () => {
    render(<ToastProvider><StoreHero name="Example Store" subtitle="Live offers" headingLevel={2} /></ToastProvider>);
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
    expect(screen.getByRole("heading", { level: 2 }).textContent).toContain("Example Store");
  });
});
