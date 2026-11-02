import { beforeEach, describe, expect, it, vi } from "vitest";

const getSessionUser = vi.hoisted(() => vi.fn());
vi.mock("@/lib/session", () => ({
  getSessionUser,
  displayName: (u: { name?: string; email: string }) => u.name ?? u.email.split("@")[0],
}));

import { GET } from "@/app/api/session/route";

describe("GET /api/session", () => {
  beforeEach(() => getSessionUser.mockReset());

  it("signed out: no user, never cacheable", async () => {
    getSessionUser.mockResolvedValue(null);
    const res = await GET();
    expect(await res.json()).toEqual({ signedIn: false, user: null });
    expect(res.headers.get("Cache-Control")).toContain("no-store");
  });

  it("signed in: carries the masked email, never the address itself", async () => {
    getSessionUser.mockResolvedValue({ name: "Asha", email: "asha@example.com", avatar_url: null });
    const res = await GET();
    const body = await res.json();
    expect(body.signedIn).toBe(true);
    expect(body.user.maskedEmail).toBe("a\u2022\u2022\u2022@example.com");
    expect(JSON.stringify(body)).not.toContain("asha@example.com");
    expect(res.headers.get("Cache-Control")).toContain("private");
  });
});
