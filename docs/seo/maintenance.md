# Maintenance — incorporating new exports

This playbook keeps the knowledge base alive. Follow it every time you drop in
new Google Trends or Keyword Planner CSVs.

## 1. Preserve the raw file exactly

- Copy the export into `docs/seo/google-trends/raw/` unchanged.
- Keep the original filename. If Google ships a generic name, rename it to
  `searched_with_<rising|top>-searches_queries_<GEO>_<START>-<TIME>_<END>-<TIME>.csv`
  (date `YYYYMMDD-HHMM`, four-digit time accepted; see `google-trends/README.md`).
- Delete byte-identical duplicates before running the consolidation script.

## 2. Re-run consolidation

```bash
python3 scripts/seo/consolidate_trends.py
```

- Output: `docs/seo/google-trends-consolidated.csv` (rewritten from `raw/`).
- The script normalises queries and merges wears across windows; it auto-
  hints a `cluster` based on regex rules. It does **not** make targeting
  decisions — those live in `keyword-clusters.md`.

## 3. Update the cluster map — not from memory

- Open `keyword-clusters.md`. For every window the new export changes
  (1m / 3m / 12m), note material deltas as bullets with the date (e.g.
  `2026-12: jiomart coupon +1,000% over 12-month window (Breakout tags) — recruitment still pending`).
- If you may need significance, state absolute interest (0–100) and the
  export window side by side. Never compare 12-month relative scores to
  1-month scores as if they were volumes.

## 4. Update the page map in the same commit

- If new relevant queries appear (or old ones re-rank), update `page-map.md`:
  - one keyword → exactly one owning page;
  - unclaimed queries → offer as recommendation with owner decision, do not
    silently create pages for them.
- Confirm no two Durza pages end up assigned the same query.

## 5. Keyword Planner exports (different shape)

Keyword Planner CSVs use a different schema (typically `Keyword`, `Avg. monthly searches`, `Competition`, `Top of page bid`). Do not feed them through
`consolidate_trends.py` — it will silently skip them. Instead:

1. Put the export in a new folder `docs/seo/google-keyword-planner/raw/`.
2. Write `scripts/seo/consolidate_keyword_planner.py` mirroring the Trends one:
   - normalise keyword (lowercase, strip punctuation),
   - parse average-monthly-searches ranges (`1K–10K`, `100`) into integer midpoints for sorting,
   - emit `google-keyword-planner-consolidated.csv` with `keyword, avg_monthly_searches_low, avg_monthly_searches_high, competition, cluster, geo`.
3. Update `keyword-clusters.md` with real-volume backing where it changes priorities; keep Trends data for relative direction.

## 6. Search Console exports (the missing half)

GSC "Search results" / "Queries" exports (query, clicks, impressions, CTR, position) are the closest thing to truth available and they are **not yet
in this knowledge base**. When they arrive:

- `docs/seo/search-console/queries.csv` — keyed to our live URLs; annotate with our clusters.
- Reconcile: queries with impressions but weak rankings → content/implementation gaps; queries already ranking → reassign ownership or defend; queries appearing on the wrong page → internal link or page-match fix.
- Update `page-map.md` so each owned query maps to the page GSC shows it on.
- Compare against this Trends file to spot gaps we already page for but never rank (authority problem) vs. queries we never page for (opportunity).

## 7. Quality bar on changes

Every `keyword-clusters.md` edit must carry:

- the signal (file/date/window or GSC query), stated as observed fact;
- the recommended action and the page it affects;
- what was *rejected* and why (for every chunk of demand we deliberately skip).

If you did not find it in `raw/` or GSC, it does not exist for this file.
