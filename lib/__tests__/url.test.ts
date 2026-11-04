import { describe, expect, it } from "vitest";
import { hostnameOf, parseHttpUrl } from "@/lib/url";

describe("parseHttpUrl", () => {
  it("accepts http and https", () => {
    expect(parseHttpUrl("https://www.example.com/a")?.hostname).toBe("www.example.com");
    expect(parseHttpUrl("http://example.com")?.protocol).toBe("http:");
    expect(parseHttpUrl("  https://example.com  ")?.hostname).toBe("example.com");
  });

  it.each([
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "file:///etc/passwd",
    "ftp://example.com",
  ])("rejects %s", (value) => {
    expect(parseHttpUrl(value)).toBeNull();
  });

  it.each([null, undefined, "", "not a url", "example.com", "//example.com"])(
    "returns null instead of throwing for %s",
    (value) => {
      expect(parseHttpUrl(value)).toBeNull();
    },
  );
});

describe("hostnameOf", () => {
  it("drops a leading www", () => {
    expect(hostnameOf("https://www.example.com/x")).toBe("example.com");
  });
  it("is null for anything that is not a usable link", () => {
    expect(hostnameOf("javascript:alert(1)")).toBeNull();
    expect(hostnameOf("garbage")).toBeNull();
  });
});
