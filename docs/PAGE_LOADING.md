# How pages load (and what must never block)

A page has three tiers of data. The rule: **only tier 1 may delay the first
paint; tier 2 loads next to it without delaying it; tier 3 waits for the
visitor.**

| Tier | What it is | How it loads |
|---|---|---|
| 1. Needed to show the page | The thing the URL names (the offer, the store, the guide) and what its headline and main button need | Awaited on the server. Keep this to one or two calls. |
| 2. Adds to the page | Related offers, verification history, "More in category", sponsored slot, related stores | Its own async component behind `<Suspense>` with a skeleton (see `components/coupon/CouponSections.tsx`). Fails alone, renders nothing when empty. |
| 3. Depends on who is looking, or what they do | Signed-in state, whether *you* follow a store, saving, tracking, voting | Client-side, after the page is showing. Never on the server: reading the session there would make every page dynamic. |

## Rules

- **No call may hang a page.** `apiFetch` gives up after 8 seconds and the
  `resilient.*` wrappers turn a failure into an empty result, so a missing
  section is an absent section, not a blank screen.
- **Never fetch a big list to read one field.** If a page needs a name, find
  an endpoint that returns a name. Never add a call that runs *after* the
  others have finished (a waterfall) when it could run beside them.
- **Prefer data you already have.** Store listings carry `offer_count`, so
  "related stores" are ordered without fetching coupons.
- **Every segment shows something at once.** `app/loading.tsx` covers all
  routes; add a `loading.tsx` with a matching skeleton for any route whose
  shape is distinctive. `app/error.tsx` catches a crash inside a page and
  `app/global-error.tsx` catches a crash in the layout itself, the one case
  that would otherwise be a white screen.
- **Say what is happening.** Buttons that call the server show a spinner and
  a label that changes ("Saving", "Sending code"); success is confirmed in
  words, and failure is said plainly.

## Calls per page (server render, after the changes)

| Page | Before | Now (blocking → beside it) |
|---|---|---|
| Coupon `/coupons/[slug]` | offer, then 5 together | offer, store → 4 sections stream independently |
| Store `/stores/[slug]` | 3 together, then 1 more (up to 100 coupons) | 3 together |
| Root layout (every page) | 1 cached call (1h), could throw | same call; a failure now means "no Compare link", not a crash |

Remaining candidates, in order of weight: search (stores + categories lists, up
to 6 calls), deals (6), product pages (6), category pages (5).
