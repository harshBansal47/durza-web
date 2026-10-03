# Frontend tasks (do ONLY the first unchecked task; tick it when done)

- [x] F1 `lib/lastGo.ts` + `components/OutboundLink.tsx`
  - `lib/lastGo.ts` (no React): `rememberGo(entry)`, `readLastGo(maxAgeMs)`, `clearLastGo()`
    over `localStorage` key `couponbase:last-go`, all wrapped in try/catch. `readLastGo`
    returns null when missing, malformed, or older than `maxAgeMs`. Entry shape from the brief.
  - `components/OutboundLink.tsx` ("use client"): renders an `<a>` with all passed props and
    an extra `go` prop `{couponId, title, storeName, hadCode}`. On click it calls
    `rememberGo({... , at: Date.now()})` and does NOT preventDefault.
  - Use it for the CTA in `CouponCodePanel.tsx` and the code-less link in
    `StickyDealBar.tsx` (keep hrefs, `rel`, classes, and existing tests passing; the
    sticky bar stays a server component and just renders `<OutboundLink>`).
  - Tests: `rememberGo`/`readLastGo` round trip, expiry, malformed JSON returns null,
    storage that throws is swallowed; clicking `OutboundLink` stores the entry and keeps the
    href; existing CouponCodePanel / OutboundLinks tests still pass.

- [ ] F2 `components/WorkedPrompt.tsx` + mount in layout
  - "use client". On mount and on `document.visibilitychange` to "visible", call
    `readLastGo(30 * 60 * 1000)`. Show the prompt only if the entry is at least 8 seconds old
    (the visitor really left) and was not already answered/dismissed for that entry.
  - UI: a small bottom sheet card (fixed bottom, max-w-md, centered on desktop, full width
    minus margin on mobile, above `StickyDealBar` on mobile: add bottom spacing ~5rem),
    `role="dialog" aria-label="Did the code work?"`, text "Did {code or 'the deal'} work at
    {storeName}?" and three buttons: "It worked" (btn-verified), "It didn't" (btn-outline),
    "Not now" (btn-ghost). Escape also dismisses. No focus stealing.
  - On "It worked"/"It didn't": submit through the same mechanism `VerifyWidget` uses;
    on success show "Thanks, that helps the next shopper." for 2.5s then hide; on the
    rate-limit/already-voted outcome show the same friendly message VerifyWidget shows. In
    every case call `clearLastGo()` so it never asks again for that click. "Not now" also
    clears.
  - Mount it once in `app/layout.tsx` inside `<body>` after the footer. Skip rendering on
    `/account` and `/admin`-like routes (use `usePathname`).
  - Tests with fake timers: no prompt for an entry younger than 8s; prompt appears for a 20s
    old entry; "Not now" clears storage and hides; answering calls the verify function with
    the right coupon id and `worked` boolean; error path shows a message and still clears;
    stale (>30 min) entry shows nothing; Escape dismisses.

- [ ] F3 Polish and final check
  - Make sure the sheet does not overlap the mobile `StickyDealBar` (check classes) and has
    `no-print`. Add a one-line mention to README ("Did it work? prompt").
  - Run `npx tsc --noEmit && npx eslint . && npm test` three times to confirm no flaky test.
  - Write `PHASE2_SUMMARY.md`: files added/changed, decisions, manual checks (click a coupon
    link, return to the tab after 10+ seconds, see the prompt once, answer, confirm it does
    not return).