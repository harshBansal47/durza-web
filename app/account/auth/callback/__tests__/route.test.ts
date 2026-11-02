import { describe, expect, it } from "vitest";
import { GET } from "../route";

describe("retired token-in-query OAuth callback", () => {
  it("never stores or reflects session tokens supplied in the URL", async () => {
    const request = new Request(
      "http://localhost:3000/account/auth/callback?access_token=secret-access&refresh_token=secret-refresh&next=%2Faccount",
    );

    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/account/login?error=google&reason=unsupported_callback",
    );
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("referrer-policy")).toBe("no-referrer");
    expect(response.headers.get("set-cookie")).toBeNull();
  });
});
