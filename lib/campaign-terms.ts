/**
 * Reading the parsed advertiser terms the API attaches to a campaign (admin-only data).
 *
 * `terms` arrives as JSON, so nothing here assumes its shape: anything missing or malformed
 * reads as "unknown", never as a default that could look like permission.
 */
import type { AffiliateCampaign } from "@/lib/types";

export type ChannelStatus = "allowed" | "conditional" | "not_allowed" | "unavailable";

export interface ChannelChip {
  key: string;
  label: string;
  status: ChannelStatus | "unknown";
  note: string | null;
}

export interface ReadTerms {
  channels: Record<string, { status: ChannelStatus; note: string | null }>;
  cookieDays: number | null;
  validationDays: number | null;
  geo: string | null;
  brandBiddingBanned: boolean;
  otherAffiliateCodeVoidsSale: boolean;
  payoutStructure: string;
  payoutEffectiveFrom: string | null;
  approvedCodes: string[];
  rules: { kind: string; text: string }[];
  reviewReasons: string[];
}

/** The channels worth showing at a glance, in the order an admin thinks about them. */
const CHIP_CHANNELS: [string, string][] = [
  ["telegram", "Telegram"],
  ["coupon", "Coupons"],
  ["cashback", "Cashback"],
  ["email", "Email"],
  ["sms", "SMS"],
  ["search", "Paid search"],
  ["social", "Social ads"],
  ["influencer", "Influencer"],
];

const STATUSES: ChannelStatus[] = ["allowed", "conditional", "not_allowed", "unavailable"];

const REASON_LABELS: Record<string, string> = {
  description_missing: "No description to read",
  parse_error: "The terms could not be read",
  no_promotion_methods: "Advertiser channel rules were not found",
  no_detailed_kpi: "No detailed KPI section",
  code_payout_rule: "A rule says which discount codes affect payout",
  payout_change_upcoming: "Payout changes on a future date",
  payout_text_differs_from_api: "Payout is not a flat rate; the API figure is a base rate",
  cookie_missing: "Cookie period not stated",
  validation_missing: "Validation period not stated",
};

const PAYOUT_LABELS: Record<string, string> = {
  slab: "GMV slabs",
  user_type: "by user type",
  category: "by category",
  other: "a structure described in the terms",
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const asNumber = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

const asString = (value: unknown): string | null =>
  typeof value === "string" && value.trim() ? value : null;

export function readTerms(campaign: Pick<AffiliateCampaign, "terms">): ReadTerms | null {
  const raw = campaign.terms;
  if (!isRecord(raw)) return null;

  const channels: ReadTerms["channels"] = {};
  if (isRecord(raw.channels)) {
    for (const [key, entry] of Object.entries(raw.channels)) {
      if (!isRecord(entry)) continue;
      const status = STATUSES.find((s) => s === entry.status);
      if (status) channels[key] = { status, note: asString(entry.note) };
    }
  }

  const rules = Array.isArray(raw.rules)
    ? raw.rules.flatMap((rule) =>
        isRecord(rule) && asString(rule.text)
          ? [{ kind: asString(rule.kind) ?? "other", text: rule.text as string }]
          : [],
      )
    : [];

  return {
    channels,
    cookieDays: asNumber(raw.cookie_days),
    validationDays: asNumber(raw.validation_days),
    geo: asString(raw.geo),
    brandBiddingBanned: raw.brand_bidding_banned === true,
    otherAffiliateCodeVoidsSale: raw.other_affiliate_code_voids_sale === true,
    payoutStructure: asString(raw.payout_structure) ?? "api_only",
    payoutEffectiveFrom: asString(raw.payout_effective_from),
    approvedCodes: Array.isArray(raw.approved_codes)
      ? raw.approved_codes.filter((c): c is string => typeof c === "string")
      : [],
    rules,
    reviewReasons: Array.isArray(raw.review_reasons)
      ? raw.review_reasons.filter((r): r is string => typeof r === "string")
      : [],
  };
}

/** A channel the advertiser did not mention reads as "unknown", which is not "allowed". */
export function channelChips(terms: ReadTerms): ChannelChip[] {
  return CHIP_CHANNELS.map(([key, label]) => {
    const entry = terms.channels[key];
    return { key, label, status: entry?.status ?? "unknown", note: entry?.note ?? null };
  });
}

export function reasonLabel(code: string): string {
  return REASON_LABELS[code] ?? code.replace(/_/g, " ");
}

export function payoutNote(terms: ReadTerms): string | null {
  if (terms.payoutStructure === "api_only") return null;
  const how = PAYOUT_LABELS[terms.payoutStructure] ?? "a structure described in the terms";
  return `Payout varies ${how}. The API figure is only a base rate, so do not rank on it alone.`;
}
