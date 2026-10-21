import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { track } from "@/lib/analytics";
import { setConsent } from "@/lib/consent";

describe("analytics beacon transport", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api.test/api/v1");
    Object.defineProperty(navigator, "sendBeacon", {
      value: vi.fn().mockReturnValue(true),
      configurable: true,
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("uses sendBeacon for non-impression events with a JSON body", async () => {
    setConsent("accepted");
    track("page_view", { path: "/deals" });

    const beacon = navigator.sendBeacon as ReturnType<typeof vi.fn>;
    expect(beacon).toHaveBeenCalledTimes(1);
    const [url, blob] = beacon.mock.calls[0];
    expect(url).toBe("https://api.test/api/v1/analytics/event");
    expect(blob).toBeInstanceOf(Blob);
    expect((blob as Blob).type).toBe("application/json");
    const body = JSON.parse(await (blob as Blob).text());
    expect(body).toMatchObject({ event: "page_view", path: "/deals" });
    expect(typeof body.ts).toBe("string");
  });

  it("does not send a beacon without analytics consent", () => {
    track("page_view", { path: "/deals" });
    expect(navigator.sendBeacon).not.toHaveBeenCalled();
  });
});
