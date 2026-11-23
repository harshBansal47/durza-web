import { SITE_URL } from "@/lib/site";

/**
 * Phase 3 T4 — strict campaign link convention. No shortener, no invented data.
 * Every value is lowercase [a-z0-9-] and length-limited.
 */

export const CHANNELS = ["instagram", "facebook", "whatsapp", "community", "search", "other"] as const;
export type Channel = (typeof CHANNELS)[number];

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const MAX_CAMPAIGN_SLUG = 48;

export function validSlug(value: string, max = MAX_CAMPAIGN_SLUG): boolean {
  return value.length > 0 && value.length <= max && SLUG_RE.test(value);
}

export interface CampaignLinkInput {
  path: string;
  channel: Channel;
  campaignSlug: string;
}

export function buildCampaignUrl(
  { path, channel, campaignSlug }: CampaignLinkInput,
  origin: string = SITE_URL,
): string {
  if (!validSlug(campaignSlug)) throw new Error("Campaign slug must be lowercase [a-z0-9-]");
  if (!CHANNELS.includes(channel)) throw new Error("Unknown channel");
  if (!path.startsWith("/") || path.includes("?")) throw new Error("Target must be an internal path");
  const url = new URL(path, origin);
  url.searchParams.set("utm_source", channel);
  url.searchParams.set("utm_medium", channel === "search" ? "organic" : "social");
  url.searchParams.set("utm_campaign", campaignSlug);
  // Carried in content_ref so ClickEvent can group by campaign without a new column.
  url.searchParams.set("content_ref", `campaign_${campaignSlug}_${channel}`.slice(0, 78));
  return url.toString();
}

/** Canonical URLs never carry acquisition parameters. */
export function canonicalize(url: string, origin: string = SITE_URL): string {
  const parsed = new URL(url, origin);
  for (const key of [...parsed.searchParams.keys()]) {
    if (key === "ref" || key === "content_ref" || key.startsWith("utm_")) {
      parsed.searchParams.delete(key);
    }
  }
  parsed.hash = "";
  return parsed.toString().replace(/\/$/, "") || "/";
}
