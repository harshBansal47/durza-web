import { beforeEach, describe, expect, it, vi } from "vitest";
import { getVariant, registerExperiment } from "@/lib/experiments";
import { track } from "@/lib/analytics";
import { isAnalyticsAllowed } from "@/lib/consent";

vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));
vi.mock("@/lib/consent", () => ({ isAnalyticsAllowed: vi.fn() }));

const mockTrack = track as ReturnType<typeof vi.fn>;
const mockAnalyticsAllowed = isAnalyticsAllowed as ReturnType<typeof vi.fn>;

describe("experiment assignment", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mockAnalyticsAllowed.mockReturnValue(false);
    registerExperiment({
      id: "test-exp",
      hypothesis: "test",
      primaryMetric: "clicks",
      guardrails: [],
      minSampleSize: 10,
      variants: ["control", "variant"],
    });
  });

  it("assigns a stable variant without analytics consent", () => {
    const first = getVariant("test-exp", ["control", "variant"]);
    const second = getVariant("test-exp", ["control", "variant"]);
    expect(second).toBe(first);
    expect(localStorage.getItem("durza.exp.test-exp")).toBe(first);
    expect(mockTrack).not.toHaveBeenCalled();
  });

  it("logs exposure once when analytics consent is present", () => {
    mockAnalyticsAllowed.mockReturnValue(true);
    const first = getVariant("test-exp", ["control", "variant"]);
    getVariant("test-exp", ["control", "variant"]);
    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith("filter_change", {
      experiment: "test-exp",
      variant: first,
      outcome: "exposure",
    });
  });
});
