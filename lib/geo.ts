import "server-only";
import { headers } from "next/headers";

export async function getRegion(): Promise<string | null> {
  const h = await headers();
  return h.get("x-vercel-ip-country") ?? null;
}
