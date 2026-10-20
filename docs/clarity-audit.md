# Clarity audit

Audit date: 2026-10-20. Scope: `couponza-web`. Clarity wins over persuasion when they conflict.

| Surface | Purpose | Copy problem | Fix |
|---|---|---|---|
| `/trust` vs `/how-it-works` | Trust explains how Durza works; How it works explains the same thing under a near-identical label. | Route names and labels can confuse; generic meta descriptions. | Keep both routes and binding nav rules; make titles describe the actual page. |
| `CouponCard`, `CouponRow`, `CouponGroupCard` | Decide and go to the offer page. | Button says "Get code" but destination is the offer page, not the code. | Use "View code" / "Copy code and open store" only where that is literally true. |
| `CouponCodePanel` | Reveal, copy and open store. | "Reveal code" does copy + open; label must say that. | "Copy code and open store". |
| `StickyDealBar` | Mobile quick action. | "Get code" jumps to reveal panel, not directly to code. | "View code" when jumping to reveal. |
| `VerifyWidget` | Vote after reveal. | Ensure "Did it work?" only appears after reveal/open. | Preserve existing behaviour; copy stays short. |
| Store pages | Choose a store and see live offers. | "Best right now" is a basis claim; must tie to real data. | Keep only when real votes or source data supports it; otherwise "Top offer" is honest. |
| Deals/search/bank-offers/categories/collections | Browse and choose. | Generic headings; no clear next step. | Use plain headings and one action. |
| Product pages | Check price history and set a target. | Must state date range and what chart/table shows. | Add "Showing N captures, oldest to newest" or similar from real data. |
| Account alerts/saved/products/settings | Manage alerts and see outcomes. | Ensure pending vs delivered is visible and no blame. | Preserve honest statuses. |
| Home/hero/about/contact | Explain Durza and how it earns. | Avoid filler. | Plain sentences, affiliate disclosure link. |
| Editorial | Read and act. | Must lead with answer, show updated date and sources. | Preserve backend content; display metadata honestly. |
| Metadata | Describe page. | Generic descriptions. | Use true values only. |

## BACKEND-NEEDED

- Provider feed titles/terms may contain hype, caps or emoji. Frontend can normalise casing/spacing/emoji at display time only; any substantive term change is backend-owned.
- Missing terms fields for conditions. Show only fields that exist.
- Email/push templates are backend-owned; not audited here.
