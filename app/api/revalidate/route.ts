import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const TAG_RE =
  /^(catalogue|stores|editorial|sitemap|store:[a-z0-9-]{1,120}|editorial:[a-z-]{1,40}|offer:[A-Za-z0-9_-]{1,120})$/;

export async function POST(request: NextRequest) {
  const secret = process.env.VERCEL_REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "invalid JSON" }, { status: 400 });
  }
  const tags = (payload as { tags?: unknown })?.tags;
  if (!Array.isArray(tags) || tags.length === 0 || tags.length > 20 || !tags.every((t) => typeof t === "string" && TAG_RE.test(t))) {
    return Response.json({ error: "invalid tags" }, { status: 400 });
  }
  for (const tag of tags) revalidateTag(tag as string, "max");
  return Response.json({ revalidated: tags });
}
