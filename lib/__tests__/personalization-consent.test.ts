import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  getConsent,
  getPersonalizationConsent,
  isAnalyticsAllowed,
  isPersonalizationAllowed,
  setConsent,
  setPersonalizationConsent,
} from "@/lib/consent";

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

  it("is independent from analytics consent", () => {
    // analytics only
    setConsent("accepted");
    expect(isAnalyticsAllowed()).toBe(true);
    expect(isPersonalizationAllowed()).toBe(false);

    // personalization only
    setConsent("declined");
    setPersonalizationConsent("accepted");
    expect(isAnalyticsAllowed()).toBe(false);
    expect(isPersonalizationAllowed()).toBe(true);

    // neither
    setPersonalizationConsent("declined");
    expect(getConsent()).toBe("declined");
    expect(isAnalyticsAllowed()).toBe(false);
    expect(getPersonalizationConsent()).toBe("declined");
    expect(isPersonalizationAllowed()).toBe(false);
  });
});
