import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ success: vi.fn() }));
vi.mock("@/components/ui/Toast", () => ({ useTypedToast: () => ({ success: mocks.success }) }));

import CodeRevealButton from "@/components/CodeRevealButton";

describe("code reveal clipboard fallback", () => {
  beforeEach(() => {
    mocks.success.mockReset();
    vi.stubGlobal("open", vi.fn());
    Object.defineProperty(navigator, "clipboard", { value: { writeText: vi.fn().mockRejectedValue(new Error("blocked")) }, configurable: true });
    Object.defineProperty(navigator, "userAgent", { value: "Mozilla/5.0 Chrome/120.0", configurable: true });
  });

  it("shows selectable code and never claims success when clipboard fails", async () => {
    render(<CodeRevealButton code="SAVE20" url="https://durza.in/go/test" />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/clipboard unavailable/i)).toBeTruthy();
    expect(screen.getAllByText("SAVE20").length).toBeGreaterThan(0);
    expect(mocks.success).not.toHaveBeenCalled();
  });

  it("does not show browser hint in a normal browser", async () => {
    render(<CodeRevealButton code="SAVE20" url="https://durza.in/go/test" />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.queryByText(/open this page in your browser/i)).toBeNull();
  });
});
