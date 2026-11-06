import { describe, expect, it } from "vitest";
import { channelChips, payoutNote, readTerms, reasonLabel } from "@/lib/campaign-terms";

const wrap = (terms: unknown) => ({ terms }) as never;

describe("readTerms", () => {
  it.each([undefined, null, "oops", 42, [], true])("reads %s as no terms", (value) => {
    expect(readTerms(wrap(value))).toBeNull();
  });

  it("drops malformed pieces instead of guessing", () => {
    const terms = readTerms(
      wrap({
        channels: {
          telegram: { status: "allowed" },
          email: { status: "sure, why not" }, // not a status we know
          sms: "allowed", // not an object
          coupon: null,
        },
        cookie_days: "30", // wrong type
        validation_days: Number.NaN,
        rules: [{ text: "ok", kind: "geo" }, { kind: "geo" }, "nope", { text: "   " }],
        approved_codes: ["VCOM15", 7, null],
        review_reasons: ["a", 5],
      }),
    )!;

    expect(Object.keys(terms.channels)).toEqual(["telegram"]);
    expect(terms.cookieDays).toBeNull();
    expect(terms.validationDays).toBeNull();
    expect(terms.rules).toEqual([{ kind: "geo", text: "ok" }]);
    expect(terms.approvedCodes).toEqual(["VCOM15"]);
    expect(terms.reviewReasons).toEqual(["a"]);
    expect(terms.brandBiddingBanned).toBe(false);
    expect(terms.payoutStructure).toBe("api_only");
  });
});

describe("channelChips", () => {
  it("a channel the advertiser did not mention is 'unknown', never 'allowed'", () => {
    const terms = readTerms(wrap({ channels: { telegram: { status: "allowed" } } }))!;
    const chips = Object.fromEntries(channelChips(terms).map((c) => [c.key, c.status]));
    expect(chips.telegram).toBe("allowed");
    expect(chips.email).toBe("unknown");
    expect(chips.sms).toBe("unknown");
  });

  it("carries the advertiser's qualifier on a conditional channel", () => {
    const terms = readTerms(
      wrap({ channels: { search: { status: "conditional", note: "Only generic" } } }),
    )!;
    const search = channelChips(terms).find((c) => c.key === "search")!;
    expect(search).toMatchObject({ status: "conditional", note: "Only generic" });
  });
});

describe("labels", () => {
  it("explains a known reason and degrades gracefully for an unknown one", () => {
    expect(reasonLabel("code_payout_rule")).toMatch(/discount codes affect payout/i);
    expect(reasonLabel("some_new_reason")).toBe("some new reason");
  });

  it("warns when the API payout is only a base rate, and stays quiet when it is the whole story", () => {
    expect(payoutNote(readTerms(wrap({ payout_structure: "slab" }))!)).toMatch(/GMV slabs.*base rate/i);
    expect(payoutNote(readTerms(wrap({ payout_structure: "api_only" }))!)).toBeNull();
  });
});
