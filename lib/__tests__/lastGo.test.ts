import { beforeEach, describe, expect, it, vi } from "vitest";
import { readLastGo, rememberGo, clearLastGo } from "@/lib/lastGo";

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe("lastGo", () => {
  it("returns null when nothing is stored", () => {
    expect(readLastGo(1000)).toBeNull();
  });

  it("round-trips an entry within maxAgeMs", () => {
    rememberGo({ couponId: "c1", title: "Test", storeName: "Store", hadCode: true });
    const entry = readLastGo(1000);
    expect(entry).not.toBeNull();
    expect(entry!.couponId).toBe("c1");
    expect(entry!.title).toBe("Test");
    expect(entry!.storeName).toBe("Store");
    expect(entry!.hadCode).toBe(true);
  });

  it("returns null when entry is older than maxAgeMs", () => {
    const oldEntry = { couponId: "c1", title: "Test", storeName: "Store", hadCode: true, at: Date.now() - 10000 };
    localStorage.setItem("couponbase:last-go", JSON.stringify(oldEntry));
    expect(readLastGo(1000)).toBeNull();
  });

  it("returns null for malformed JSON", () => {
    localStorage.setItem("couponbase:last-go", "not json");
    expect(readLastGo(1000)).toBeNull();
  });

  it("returns null for missing required fields", () => {
    localStorage.setItem("couponbase:last-go", JSON.stringify({ couponId: "c1" }));
    expect(readLastGo(1000)).toBeNull();
  });

  it("returns null for wrong field types", () => {
    localStorage.setItem("couponbase:last-go", JSON.stringify({ couponId: 123, title: "t", storeName: "s", hadCode: true, at: Date.now() }));
    expect(readLastGo(1000)).toBeNull();
  });

  it("clearLastGo removes the entry", () => {
    rememberGo({ couponId: "c1", title: "Test", storeName: "Store", hadCode: true });
    expect(readLastGo(1000)).not.toBeNull();
    clearLastGo();
    expect(readLastGo(1000)).toBeNull();
  });

  it("does not throw when localStorage throws (private browsing)", () => {
    const originalSetItem = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Quota exceeded");
    });
    expect(() => rememberGo({ couponId: "c1", title: "Test", storeName: "Store", hadCode: true })).not.toThrow();
    expect(readLastGo(1000)).toBeNull();
    Storage.prototype.setItem = originalSetItem;
  });

  it("does not throw when localStorage.getItem throws", () => {
    const originalGetItem = Storage.prototype.getItem;
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage unavailable");
    });
    expect(readLastGo(1000)).toBeNull();
    Storage.prototype.getItem = originalGetItem;
  });
});