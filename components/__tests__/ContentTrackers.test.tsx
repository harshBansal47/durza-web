import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContentViewTracker, EngagedTimeTracker, ScrollTracker } from "@/components/ContentTrackers";
import { track } from "@/lib/analytics";
import { setConsent } from "@/lib/consent";

vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));

const mockTrack = track as ReturnType<typeof vi.fn>;

describe("content trackers", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("does not fire content views before analytics consent", () => {
    render(<ContentViewTracker contentId="c1" contentType="guide" />);
    expect(mockTrack).not.toHaveBeenCalled();
  });

  it("fires a content view once when analytics consent is present", () => {
    setConsent("accepted");
    const { rerender } = render(<ContentViewTracker contentId="c1" contentType="guide" />);
    rerender(<ContentViewTracker contentId="c1" contentType="guide" />);
    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith("content_view", {
      content_id: "c1",
      content_type: "guide",
    });
  });

  it("does not fire scroll depth before consent", () => {
    render(<ScrollTracker />);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(mockTrack).not.toHaveBeenCalled();
  });

  it("fires each scroll-depth mark once when consent is present", () => {
    setConsent("accepted");
    Object.defineProperty(document.body, "scrollHeight", { value: 1000, configurable: true });
    Object.defineProperty(window, "innerHeight", { value: 1000, configurable: true });
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    render(<ScrollTracker />);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("scroll"));
    });
    expect(mockTrack).toHaveBeenCalledWith("scroll", { depth: 100 });
    expect(
      mockTrack.mock.calls
        .filter(([event]) => event === "scroll")
        .map(([, payload]) => payload.depth),
    ).toEqual([25, 50, 75, 100]);
  });

  it("sends engaged time on pagehide only with consent", () => {
    render(<EngagedTimeTracker />);
    act(() => {
      window.dispatchEvent(new Event("pagehide"));
    });
    expect(mockTrack).not.toHaveBeenCalled();

    setConsent("accepted");
    render(<EngagedTimeTracker />);
    act(() => {
      window.dispatchEvent(new Event("pagehide"));
    });
    expect(mockTrack).toHaveBeenCalledWith("engaged_time", expect.objectContaining({ ms: expect.any(Number) }));
  });
});
