# Google Trends raw exports

Originals from the user's "Google Trends" folder (IN — India; downloaded
2026-11-15), preserved byte-for-byte. **Never edit files in `raw/`** — they are
the evidence everything else traces to.

## Naming convention

```
searched_with_<rising|top>-searches_queries_<GEO>_<START-YYYYMMDD>-<HHMM>_<END-YYYYMMDD>-<HHMM>.csv
```

| Token | Meaning |
|---|---|
| `rising` / `top` | Related queries report type: "Rising" (breakout/growth %) vs "Top" (highest relative interest, lower window) |
| `<GEO>` | `IN` = India |
| `START–END` | Window of the export. 20251115–20261115 ≈ 12-month, 20260815–20261115 ≈ 3-month, 20261015–20261115 ≈ 1-month |

## Files and what they show

| File | Window | Type | Note |
|---|---|---|---|
| `searched_with_top-searches_queries_IN_20251115-1955_20261115-1955.csv` | 12m | top | Sports-nutrition seed (creatine 100…). The strongest content-alignment signal in the whole set |
| `searched_with_top-searches_queries_IN_20251115-2001_20261115-2001.csv` | 12m | top | General coupon/promo head terms (code 100, coupon 67 …) |
| `searched_with_top-searches_queries_IN_20260815-2001_20261115-2001.csv` | 3m | top | Same head terms, 3-month window |
| `searched_with_top-searches_queries_IN_20261015-2001_20261115-2001.csv` | 1m | top | Same head terms, 1-month window |
| `searched_with_rising-searches_queries_IN_20251115-2000_20261115-2000.csv` | 12m | rising | Breakout/rising queries (jiomart, blinkit, dominos, nykaa-adjacent, bank rewards) |
| `searched_with_rising-searches_queries_IN_20260815-2001_20261115-2001.csv` | 3m | rising | Crypto noise dominates; a few brand spikes (vivo deals +2,350%, mastercard application, gate/binance cluster) |
| `searched_with_rising-searches_queries_IN_20261015-2001_20261115-2001.csv` | 1m | rising | Freshest signals (superbottoms +3,350%, kfc BOGO, hdfc redeem, fnp/nykaa/igp coupons) |

The user's download folder also contained a byte-identical copy of the
12-month rising export (`…20251115-2000_20261115-2000 (1).csv`). It is **not**
kept here to keep `scripts/seo/consolidate_trends.py` deterministic; md5
verified `070d9e2187b98458a8858a984e3be84f` on both copies.

## Provenance caveat

All trends scores are **relative interest (0–100 within each export)**, not
search volumes, and the datasets were pulled for related-queries seeds around
the Indian coupon/supplements space (the 1955 file is clearly a
sports-nutrition seed, not a generic coupon seed). Treat single-media
break-outs (e.g. oneplus freedom sale) as "watch" signals, not "build" commands.
