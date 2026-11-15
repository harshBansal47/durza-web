# SEO Research — Durza.in

This folder is the **single place** for everything that drives Durza.in content
decisions from search evidence. It exists because keyword judgement made from
memory goes stale and scatters; future work should read from here and never
re-derive from scratch.

## What lives here

| File | Purpose |
|---|---|
| `keyword-clusters.md` | Every keyword cluster we researched from Google Trends (and why some were rejected), with relevance, intent, seasonality, trend direction and the page that owns each cluster |
| `page-map.md` | The authoritative keyword → page assignment table. One query, one owner page — no two pages compete for the same term |
| `optimization-log-2026-11.md` | What changed on 15 Nov 2026 and why (with measured Trend signals referenced) |
| `future-work.md` | Prioritised opportunities — recruitment targets, pages to build, measurement steps, what remains blocked on Keyword Planner / GSC data |
| `google-trends/raw/` | Original CSVs downloaded from Google Trends, **preserved byte-for-byte, never edited** |
| `google-trends/README.md` | Raw export naming convention and windows |
| `google-trends-consolidated.csv` | Deduped master: one row per unique query, interest per window, auto-classified cluster |
| `scripts/seo/consolidate_trends.py` | The script that produces the master CSV from `raw/` — idempotent, documented |

## How to use it

**Before creating or editing any content:** read `keyword-clusters.md` and
`page-map.md`. If a query you want to cover already has an owner page there,
improve that page instead of creating a new one. If the owner page already
covers the cluster, do not repeat it — density is not strategy.

**When a new Trends or Keyword Planner export arrives:** see
`maintenance.md` — drop the raw file in, re-run the script, then update
`keyword-clusters.md` / `page-map.md` in the same commit.

**Never** invent demand numbers. Google Trends interest is a relative 0–100
scale inside each export, not search volume. Raw files outrank any summary.

## Provenance

CSV exports inspected 15 Nov 2026 (IN, last 12-month-related windows), seeded
by a supplement/coupon-adjacent query set. All files are preserved under
`google-trends/raw/`. The original user-provided folder also contained a
byte-identical duplicate of one rising-searches export; the duplicate is **not**
kept here to keep the consolidation deterministic.

## Operating rules (carried over from `docs/content-guide.md`)

1. Never claim a page "ranks", "targets" or "owns" a query beyond the assignments in `page-map.md` — this file is descriptive of strategy, not of SERP truth.
2. Keyword changes must pass the content-guide bar: real value to an Indian shopper, no stuffing, no invented verification or discount numbers.
3. Demand evidence older than ~6 months is context, not command. Trends decay; re-check on every export.
4. If you add a page, add its keywords to `page-map.md` in the same commit — otherwise the next audit finds orphans.
