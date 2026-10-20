# Copy changelog

| File | Before | After | Reason |
|---|---|---|---|
| `lib/copy.ts` | new | Central reusable actions, status, empty and error strings | One source for clarity |
| `components/CodeRevealButton.tsx` | "Reveal code" | "Copy & open" | The button copies and opens; the label must say so |
| `components/CouponCodePanel.tsx` | "Reveal code" | "Copy & open" | Same action, same label |
| `components/CouponCodePanel.tsx` | "Revealing the code opens…" | "Copying the code opens…" | Matches the button |
| `components/CouponCard.tsx` | "Get code" | "View code" | The card links to the offer page, not directly to the code |
| `components/CouponCard.tsx` | "tap Get code to reveal it" | "tap View code to reveal it" | Matches button |
| `components/StickyDealBar.tsx` | "Get code" | "View code" | The sticky bar jumps to the reveal panel |
| `components/store/StorePageClient.tsx` | "Get it" | "View offer" | Says what the button does |
| `app/trust/page.tsx` | Generic "Learn how Durza helps…" | "How Durza finds coupons and deals, how offers are checked, and how commissions are disclosed." | Specific promise |
| `app/how-it-works/page.tsx` | Missing canonical | Canonical `/how-it-works` | Metadata matches page |
| `components/product/PriceHistory.tsx` | No range statement | "Showing N captures, newest first." | States what the table shows |
