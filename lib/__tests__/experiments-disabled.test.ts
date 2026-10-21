import { describe, expect, it, vi } from "vitest";
import { getVariant } from "@/lib/experiments";
import { track } from "@/lib/analytics";

vi.mock("@/lib/analytics", () => ({ track: vi.fn() }));
vi.mock("@/lib/consent", () => ({ isAnalyticsAllowed: vi.fn(() => true) }));
vi.mock("@/lib/flags", () => ({ PERSONALIZATION_EXPERIMENTS_ENABLED: false }));

describe("experiment kill switch", () => {
  it("returns control and records nothing when the flag is off", () => {
    localStorage.clear();
    expect(getVariant("test-exp", ["control", "variant"])).toBe("control");
    expect(localStorage.getItem("durza.exp.test-exp")).toBeNull();
    expect(track).not.toHaveBeenCalled();
  });
});
