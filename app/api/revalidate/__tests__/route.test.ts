import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ revalidateTag: vi.fn() }));
vi.mock("next/cache", () => ({ revalidateTag: mocks.revalidateTag }));

import { POST } from "../route";

function request(tags: unknown, secret: string | null) {
  return new Request("https://durza.in/api/revalidate", {
    method: "POST",
    headers: secret ? { "x-revalidate-secret": secret, "content-type": "application/json" } : { "content-type": "application/json" },
    body: JSON.stringify({ tags }),
  }) as never;
}

describe("ISR revalidation webhook", () => {
  beforeEach(() => {
    mocks.revalidateTag.mockReset();
    vi.stubEnv("VERCEL_REVALIDATE_SECRET", "secret");
  });

  it("rejects a missing or wrong secret", async () => {
    expect((await POST(request(["catalogue"], null))).status).toBe(401);
    expect((await POST(request(["catalogue"], "wrong"))).status).toBe(401);
    expect(mocks.revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects unknown or malformed tags", async () => {
    expect((await POST(request(["../../etc"], "secret"))).status).toBe(400);
    expect((await POST(request("catalogue", "secret"))).status).toBe(400);
    expect(mocks.revalidateTag).not.toHaveBeenCalled();
  });

  it("revalidates allowlisted tags", async () => {
    const response = await POST(request(["catalogue", "store:amazon-in", "sitemap"], "secret"));
    expect(response.status).toBe(200);
    expect(mocks.revalidateTag).toHaveBeenCalledWith("catalogue", "max");
    expect(mocks.revalidateTag).toHaveBeenCalledWith("sitemap", "max");
  });
});
