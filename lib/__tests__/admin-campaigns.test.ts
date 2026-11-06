import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const forward = vi.fn(async () => new Response("{}"));
vi.mock("@/lib/admin-proxy", () => ({ forwardToAdminApi: (...args: unknown[]) => forward(...(args as [])) }));

import { GET } from "@/app/api/admin/campaigns/route";
import nextConfig from "../../next.config";

describe("admin campaigns route", () => {
  beforeEach(() => forward.mockClear());

  it("forwards only the filters the API understands, to the admin-only endpoint", async () => {
    const request = new NextRequest(
      "http://localhost/api/admin/campaigns?search=shop&category=fashion&country=IN&needs_review=true&skip=20&limit=20&evil=1&token=x",
    );
    await GET(request);

    expect(forward).toHaveBeenCalledTimes(1);
    const [path, init] = forward.mock.calls[0] as unknown as [string, { query: URLSearchParams }];
    expect(path).toBe("/vcommission/campaigns");
    expect(Object.fromEntries(init.query)).toEqual({
      search: "shop",
      category: "fashion",
      country: "IN",
      needs_review: "true",
      skip: "20",
      limit: "20",
    });
  });
});

describe("the old public campaigns address", () => {
  it("is a permanent HTTP redirect to the homepage, not a page that renders advertiser text", async () => {
    const rules = await nextConfig.redirects!();
    expect(rules).toContainEqual({ source: "/affiliate-campaigns", destination: "/", permanent: true });
  });
});

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "__tests__" && entry.name !== "node_modules") sourceFiles(path, out);
    } else if (/\.(ts|tsx)$/.test(path) && !/\.test\./.test(path)) out.push(path);
  }
  return out;
}

describe("nothing points shoppers at the campaigns catalogue", () => {
  const root = process.cwd();
  const files = [...sourceFiles(join(root, "app")), ...sourceFiles(join(root, "components")), ...sourceFiles(join(root, "lib"))];

  it("no link, nav entry or sitemap row mentions /affiliate-campaigns", () => {
    const offenders = files
      .filter((file) => readFileSync(file, "utf8").includes("affiliate-campaigns"))
      .map((file) => file.replace(root + "/", ""));
    expect(offenders).toEqual([]);
  });

  it("the public API client no longer fetches the campaign catalogue", () => {
    const api = readFileSync(join(root, "lib/api.ts"), "utf8");
    expect(api).not.toMatch(/\/vcommission\/campaigns\$\{qs/);
  });
});
