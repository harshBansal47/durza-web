import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ track: vi.fn() }));
vi.mock("@/lib/analytics", () => ({ track: mocks.track }));

import SocialFollowLinks from "@/components/SocialFollowLinks";

describe("social follow links", () => {
  beforeEach(() => mocks.track.mockReset());

  it("renders nothing when not configured", () => {
    const { container } = render(<SocialFollowLinks links={{}} placement="footer" />);
    expect(container.innerHTML).toBe("");
  });

  it("renders configured links and records placement", async () => {
    render(<SocialFollowLinks links={{ instagram: "https://instagram.com/durza" }} placement="footer" />);
    const link = screen.getByRole("link", { name: /instagram/i });
    expect(link.getAttribute("href")).toContain("instagram.com");
    await userEvent.click(link);
    expect(mocks.track).toHaveBeenCalledWith("outbound_click", { channel: "instagram", placement: "footer" });
  });
});
