import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { getPersonalizationConsent, setPersonalizationConsent, isPersonalizationAllowed } from "@/lib/consent";

describe("personalization consent", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it("defaults to off", () => {
    expect(getPersonalizationConsent()).toBeNull();
    expect(isPersonalizationAllowed()).toBe(false);
  });

  it("can be enabled and disabled", () => {
    setPersonalizationConsent("accepted");
    expect(isPersonalizationAllowed()).toBe(true);
    setPersonalizationConsent("declined");
    expect(isPersonalizationAllowed()).toBe(false);
  });
});
