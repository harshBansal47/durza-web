# Durza content guide

This guide is binding for user-facing copy. Clarity wins over persuasion. When a rewrite can only remove, shorten, clarify or tie text to a real field, it is allowed. It may not add a claim.

## Standard

1. **Promise = delivery.** A title, button, meta description, notification or heading must describe exactly what the user gets after clicking or reading.
2. **True from data.** Every number, date, “verified”, “best” or “up to” is backed by a real field or a stated basis. If not, rewrite it as a plain description or remove it.
3. **Plain and specific.** Everyday words, short sentences, one idea per element. Prefer “₹500 off orders above ₹2,999, until 31 Oct” over “huge savings”.
4. **Tell the next step.** Each screen/section makes obvious: what this is, what I can do here, what I need to do it.
5. **Nothing exaggerated.** No hype words, ALL CAPS, stacked exclamation marks, filler (“Welcome to…”, “We are passionate about…”), or superlatives without a basis.
6. **Same word, same meaning.** Use the glossary.

## Glossary

- **Coupon**: a store offer that may use a code or may be automatic. A coupon is not a code.
- **Code**: the exact promo string the user pastes at checkout. Codes stay masked on list surfaces.
- **Deal**: an offer without a code, or a price reduction.
- **Offer**: any store promotion. Use “offer” when the page may show both codes and deals.
- **Verified**: only when real votes or a real verification field exists. Otherwise show the source-check date or “No votes yet”.
- **Success rate**: `success_count / (success_count + fail_count)` from real reports. Never shown without reports.
- **Expires**: the store-stated end date. One calm expiry label per card. Never a countdown timer.

## Offer detail order

Identical on every card and page:

1. **What you get** — discount, code masked, or deal.
2. **What you need** — minimum spend, bank/card, new-user rule, category limit, from real `restrictions`.
3. **Until when** — one expiry label from `expires_at`.
4. **How to claim** — “Copy code and open store” only when the button does both; otherwise “View code”.

## Length budgets

- Button: 1–3 words, starts with a verb.
- Card title: 60 characters or fewer.
- Meta description: 155 characters or fewer.
- Paragraph: 3 sentences or fewer.

## Errors and empty states

- Errors say what happened and what to do next. No blame.
- Empty states say why it is empty and give one action.
- Forms have visible labels and helper text before the error, not after.

## Formats

Use `lib/format.ts` for Indian number grouping, unambiguous dates (“31 Oct 2026”) and currency symbol rules. Do not hand-format money or dates.

## Provider text

Provider-supplied coupon titles and terms may be normalised at display time for casing, spacing and emoji/shouting only. Never alter amounts, codes, dates or conditions. Keep the “Up to” rule from `docs/ui-guidelines.md`.

## SEO query targeting (binding)

1. Before writing or editing anything that changes query visibility (titles, meta descriptions, headings, H-tables, FAQs, CTAs for external paths), read `docs/seo/keyword-clusters.md` and `docs/seo/page-map.md`. If the cluster is already assigned to a page, optimise that page — do not create a competing one.
2. Use tracked vocabulary or natural synonyms. Never transplant a trending term into copy that doesn't serve the shopper's intent.
3. Every new page must declare its target cluster in `docs/seo/page-map.md` (same commit). No orphan pages.
4. Never fabricate demand numbers; relative Trends scores, not volumes.
5. Seasonal opportunities are scheduled in `docs/seo/future-work.md` — budget for Diwali / BF / CM / Christmas phasing and do not add seasonal copy outside the window.
6. The standing measurement loop is Google Search Console; Trends evidence guides but does not arbitrate. Rankings are verified, not assumed.
