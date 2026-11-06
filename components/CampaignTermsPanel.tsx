import { channelChips, payoutNote, readTerms, reasonLabel, type ChannelChip } from "@/lib/campaign-terms";
import type { AffiliateCampaign } from "@/lib/types";

/** Colour is never the only signal: every status also has a symbol and words. */
const STATUS_VIEW: Record<ChannelChip["status"], { symbol: string; words: string; style: string }> = {
  allowed: { symbol: "✓", words: "Allowed", style: "border-green-700/30 bg-green-50 text-green-900" },
  conditional: { symbol: "◐", words: "Conditional", style: "border-amber-700/30 bg-amber-50 text-amber-900" },
  not_allowed: { symbol: "✕", words: "Not allowed", style: "border-red-700/30 bg-red-50 text-red-900" },
  unavailable: { symbol: "–", words: "Unavailable", style: "border-ledger-line bg-paper-raised text-ink-soft" },
  unknown: { symbol: "?", words: "Not stated", style: "border-ledger-line bg-paper-raised text-ink-soft" },
};

const days = (value: number | null) => (value === null ? "not stated" : `${value} day${value === 1 ? "" : "s"}`);

/**
 * What the advertiser allows and how it pays, as read from its description. Admin-only: it
 * shows advertiser wording. Renders nothing when there are no parsed terms.
 */
export default function CampaignTermsPanel({ campaign }: { campaign: AffiliateCampaign }) {
  const terms = readTerms(campaign);
  if (!terms) return null;

  const chips = channelChips(terms);
  const note = payoutNote(terms);
  const flags = [
    terms.brandBiddingBanned ? "Brand bidding banned" : null,
    terms.otherAffiliateCodeVoidsSale ? "Another affiliate's code can void the sale" : null,
  ].filter(Boolean) as string[];

  return (
    <section aria-label="Parsed advertiser terms" className="mt-4 border-t border-ledger-line pt-4">
      {campaign.needs_review ? (
        <div role="note" className="mb-3 rounded-md border border-amber-700/40 bg-amber-50 px-3 py-2 text-sm text-amber-950">
          <p className="font-semibold">Needs review before promoting</p>
          <ul className="mt-1 list-disc pl-5">
            {terms.reviewReasons
              .filter((code) => !["cookie_missing", "validation_missing", "payout_text_differs_from_api"].includes(code))
              .map((code) => (
                <li key={code}>{reasonLabel(code)}</li>
              ))}
          </ul>
        </div>
      ) : null}

      <ul className="flex flex-wrap gap-1.5" aria-label="Promotion channels">
        {chips.map((chip) => {
          const view = STATUS_VIEW[chip.status];
          return (
            <li
              key={chip.key}
              className={`rounded-full border px-2.5 py-1 text-xs ${view.style}`}
              title={chip.note ?? undefined}
            >
              <span aria-hidden="true">{view.symbol} </span>
              {chip.label}
              <span className="sr-only">: {view.words}</span>
              {chip.note ? <span className="ml-1 opacity-80">({chip.note})</span> : null}
            </li>
          );
        })}
      </ul>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <dt className="text-ink-soft">Cookie</dt>
        <dd className="font-medium text-ink">{days(terms.cookieDays)}</dd>
        <dt className="text-ink-soft">Validation</dt>
        <dd className="font-medium text-ink">{days(terms.validationDays)}</dd>
        {terms.geo ? (
          <>
            <dt className="text-ink-soft">Geo</dt>
            <dd className="font-medium text-ink">{terms.geo}</dd>
          </>
        ) : null}
        {terms.approvedCodes.length > 0 ? (
          <>
            <dt className="text-ink-soft">Approved codes</dt>
            <dd className="font-medium text-ink">{terms.approvedCodes.join(", ")}</dd>
          </>
        ) : null}
      </dl>

      {flags.length > 0 ? (
        <ul className="mt-3 space-y-1 text-xs text-ink">
          {flags.map((flag) => (
            <li key={flag}>⚠ {flag}</li>
          ))}
        </ul>
      ) : null}
      {note ? <p className="mt-3 text-xs text-ink-soft">{note}</p> : null}

      {terms.rules.length > 0 ? (
        <details className="mt-3 text-xs">
          <summary className="cursor-pointer font-medium text-inkblue">
            Advertiser rules ({terms.rules.length})
          </summary>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-ink-soft">
            {terms.rules.map((rule, index) => (
              <li key={index}>{rule.text}</li>
            ))}
          </ol>
        </details>
      ) : null}
    </section>
  );
}
