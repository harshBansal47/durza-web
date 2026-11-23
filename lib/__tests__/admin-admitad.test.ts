import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const forward = vi.fn(async () => new Response("{}"));
vi.mock("@/lib/admin-proxy", () => ({ forwardToAdminApi: (...args: unknown[]) => forward(...(args as [])) }));

import { GET as listGET } from "@/app/api/admin/admitad/route";
import { GET, POST } from "@/app/api/admin/admitad/[...path]/route";

describe("admin admitad proxy", () => {
  beforeEach(() => forward.mockClear());

  it("forwards only allow-listed list filters", async () => {
    await listGET(
      new NextRequest("http://localhost/api/admin/admitad?status=working&search=milton&skip=25&limit=25&evil=1"),
    );
    const [path, init] = forward.mock.calls[0] as unknown as [string, { query: URLSearchParams }];
    expect(path).toBe("/admin/admitad");
    expect(Object.fromEntries(init.query)).toEqual({ status: "working", search: "milton", skip: "25", limit: "25" });
  });

  it("forwards program actions and ingestion controls", async () => {
    await POST(
      new NextRequest("http://localhost/api/admin/admitad/11111111-1111-4111-8111-111111111111/approve", { method: "POST" }),
      { params: Promise.resolve({ path: ["11111111-1111-4111-8111-111111111111", "approve"] }) },
    );
    expect((forward.mock.calls[0] as unknown as [string])[0]).toBe(
      "/admin/admitad/11111111-1111-4111-8111-111111111111/approve",
    );
    await POST(new NextRequest("http://localhost/api/admin/admitad/ingestion/run", { method: "POST" }), {
      params: Promise.resolve({ path: ["ingestion", "run"] }),
    });
    expect((forward.mock.calls[1] as unknown as [string])[0]).toBe("/admin/admitad/ingestion/run");
  });

  it("does not forward unknown paths", async () => {
    const response = await GET(new NextRequest("http://localhost/api/admin/admitad/anything"), {
      params: Promise.resolve({ path: ["anything"] }),
    });
    expect(response.status).toBe(404);
    expect(forward).not.toHaveBeenCalled();
  });
});
