import { describe, expect, it } from "vitest";
import {
  EXPIRY_WARNING_MS,
  expiryTone,
  savedCount,
  trustCopy,
  trustLevel,
} from "@/lib/persuasion";

describe("persuasion primitives", () => {
  it("trustLevel only verifies real votes above the threshold", () => {
    expect(trustLevel(0.9, 5)).toBe("verified");
    expect(trustLevel(0.9, 4)).toBe("low-data");
    expect(trustLevel(null, 0)).toBe("no-data");
  });

  it("trustCopy uses honest low-data copy", () => {
    expect(trustCopy("verified", 12)).toBe("12 shopper reports said it worked recently");
    expect(trustCopy("low-data", 2)).toBe("No votes yet from enough shoppers");
    expect(trustCopy("no-data", 0)).toBe("Fresh — be the first to try");
  });

  it("expiryTone uses a warning window but never a timer", () => {
    const now = new Date("2026-10-20T00:00:00Z");
    expect(expiryTone(null, now)).toBe("none");
    expect(expiryTone("2026-10-19T00:00:00Z", now)).toBe("expired");
    expect(expiryTone(new Date(now.getTime() + EXPIRY_WARNING_MS - 1).toISOString(), now)).toBe("warning");
    expect(expiryTone(new Date(now.getTime() + EXPIRY_WARNING_MS + 1).toISOString(), now)).toBe("calm");
  });

  it("savedCount counts real saved items", () => {
    expect(savedCount([1, 2, 3])).toBe(3);
    expect(savedCount([])).toBe(0);
  });
});
