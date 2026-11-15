#!/usr/bin/env python3
"""
Consolidate Google Trends raw exports (docs/seo/google-trends/raw/) into one
deduped master CSV (docs/seo/google-trends-consolidated.csv).

Usage:
  python3 scripts/seo/consolidate_trends.py

How it works
------------
Every raw CSV is named:
  searched_with_<rising|top>-searches_queries_<GEO>_<START>_<END>.csv

and contains exactly three columns:
  query, search interest (0-100, *relative*, not search volume), increase percent
  ('Breakout', '3,550%', '-40%').

Rows are normalised (lowercased, whitespace-collapsed) and merged per query:
the highest relative-interest value seen in any window is kept, and the
per-window trends ('top' vs 'rising') are recorded separately so rising spikes
can be ranked against steady-state demand.

Auto-classification only *hints* at a cluster (regex rules, see below). The
authoritative cluster/intent/target-page decisions live in
docs/seo/keyword-clusters.md — never edit those from this script.

Re-running is idempotent: it rewrites the master CSV from the raw/ folder.
"""

import csv
import re
import sys
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
RAW_DIR = REPO / "docs" / "seo" / "google-trends" / "raw"
OUT = REPO / "docs" / "seo" / "google-trends-consolidated.csv"

FILENAME_RE = re.compile(
    r"searched_with_(rising|top)-searches_queries_([A-Za-z]{2})_(\d{8})-(\d{2,4})_(\d{8})-(\d{2,4})\.csv$"
)

# Ordered regex -> cluster. First match wins.
CLUSTER_RULES = [
    (re.compile(r"adobe student|student discount|code with harry|pw coupon|code\.?\s*org|chatgpt|chegg", re.I), "education-learning"),
    (re.compile(r"creatine|muscleblaze|muscletech|bigmuscles|big muscle|nutrabay|yoga ?bar|gnc coupon|protein|supp", re.I), "sports-nutrition"),
    (re.compile(r"jiomart|jio mart|bigbasket|blinkit|zepto|grofers", re.I), "grocery-quick-commerce"),
    (re.compile(r"croma", re.I), "electronics-croma"),
    (re.compile(r"oneplus", re.I), "smartphone-oneplus"),
    (re.compile(r"\bvivo\b", re.I), "smartphone-vivo"),
    (re.compile(r"dominos|kfc|pizza|mcdonald", re.I), "qsr-food"),
    (re.compile(r"redbus|rapido|indigo|makemytrip|ixigo|easemytrip|yatra|goibibo", re.I), "travel"),
    (re.compile(r"\bfnp\b|\bigp\b|interflora", re.I), "gifting"),
    (re.compile(r"nykaa", re.I), "beauty-nykaa"),
    (re.compile(r"shein|savana", re.I), "fashion-budget"),
    (re.compile(r"superbottoms|firstcry|huggies|pampers", re.I), "baby"),
    (re.compile(r"hdfc|mastercard|icici|\bsbi\b|axis|amex|hdfc reward", re.I), "bank-rewards"),
    (re.compile(r"fancode|sony ?liv|bookmyshow|district app|cricbuzz|\bcrex\b|hotstar", re.I), "entertainment"),
    (re.compile(r"hostinger|godaddy|namecheap|webshare|lemlist", re.I), "saas-hosting"),
    (re.compile(r"binance|bitget|gate exchange|gate deal|polyx|elden|crypto", re.I), "crypto"),
    (re.compile(r"free fire|mech arena|forge codes|fc mobile|fc codes|rivals codes|eldorad|el ?dorado|razor codes", re.I), "game-codes"),
    (re.compile(r"mypoints|feature points|google opinion rewards|be 10x|content reward|5d ?planner", re.I), "rewards-apps"),
    (re.compile(r"toyota|volkswagen|isuzu|maruti|honda car", re.I), "auto"),
    (re.compile(r"chadwick boseman|crcs sahara", re.I), "news-event"),
    (re.compile(r"yes madam", re.I), "consumer-services"),
    (re.compile(r"ghar soap|pringles", re.I), "other-brand"),
    (re.compile(r"dxn", re.I), "off-brand-mlm"),
    (re.compile(r"amazon|myntra|flipkart", re.I), "marketplace-brand"),
    (re.compile(r"^bogo$", re.I), "head-coupon-terms"),
    (re.compile(r"^(code|coupon|coupons|coupon code|promo code|voucher|deal|reduction|hsn code|rebate|promotional|promotion|bonus|sh coupon)$", re.I), "head-coupon-terms"),
    (re.compile(r"^code .|code$", re.I), "head-coupon-terms"),
    (re.compile(r"casino|slot|betting", re.I), "gambling"),
]

# Clusters we will not target (log only; never page for these)
OFF_BRAND_CLUSTERS = {"crypto", "game-codes", "rewards-apps", "news-event", "auto", "gambling", "saas-hosting", "off-brand-mlm"}


def classify(query: str) -> tuple[str, str]:
    for rx, cluster in CLUSTER_RULES:
        if rx.search(query):
            return cluster, ("off-brand" if cluster in OFF_BRAND_CLUSTERS else "brandable")
    return "other", "review"


def parse_change(raw: str):
    raw = raw.strip()
    if raw.lower() == "breakout":
        return "Breakout"
    m = re.match(r"([+-]?[\d,]+)%$", raw)
    if m:
        return f"{int(m.group(1).replace(',', ''))}%"
    return raw


def windows_of(filename: str):
    m = FILENAME_RE.search(filename)
    if not m:
        return None
    kind, geo, start, _, end, _ = m.groups()
    start_d = datetime.strptime(start, "%Y%m%d").date()
    end_d = datetime.strptime(end, "%Y%m%d").date()
    span_days = (end_d - start_d).days
    if span_days >= 330:
        window = "12m"
    elif span_days >= 75:
        window = "3m"
    else:
        window = "1m"
    return kind, geo.upper(), window


def main():
    if not RAW_DIR.is_dir():
        sys.exit(f"raw dir not found: {RAW_DIR}")

    merged: dict[str, dict] = {}
    skipped = []

    for csv_path in sorted(RAW_DIR.glob("*.csv")):
        meta = windows_of(csv_path.name)
        if not meta:
            skipped.append(csv_path.name)
            continue
        kind, geo, window = meta

        with csv_path.open(newline="", encoding="utf-8") as fh:
            for row in csv.DictReader(fh):
                query = re.sub(r"\s+", " ", row["query"].strip().lower())
                try:
                    interest = int(row["search interest"])
                except ValueError:
                    interest = 0
                change = parse_change(row["increase percent"])
                bucket = merged.setdefault(
                    query,
                    {
                        "top_12m": "",
                        "top_3m": "",
                        "top_1m": "",
                        "rising_12m": "",
                        "rising_3m": "",
                        "rising_1m": "",
                        "geo": geo,
                    },
                )
                key = f"{kind}_{window}"
                prev = bucket[key]
                # keep the largest absolute interest seen for that slot
                try:
                    prev_val = int(prev.split("|")[0]) if prev else -1
                except ValueError:
                    prev_val = -1
                if interest >= prev_val:
                    bucket[key] = f"{interest}|{change}"

    rows = []
    for query, m in merged.items():
        def interest_of(key):
            raw = m[key]
            if not raw:
                return 0
            try:
                return int(raw.split("|")[0])
            except ValueError:
                return 0

        interest_values = [interest_of(k) for k in ["top_12m", "top_3m", "top_1m", "rising_12m", "rising_3m", "rising_1m"]]
        cluster, brandability = classify(query)
        rows.append(
            {
                "query": query,
                "geo": m["geo"],
                "max_interest": max(interest_values + [0]),
                "best_interest_source": max(
                    ["top_12m", "top_3m", "top_1m", "rising_12m", "rising_3m", "rising_1m"],
                    key=interest_of,
                ) if max(interest_values + [0]) > 0 else "",
                "top_12m": m["top_12m"],
                "top_3m": m["top_3m"],
                "top_1m": m["top_1m"],
                "rising_12m": m["rising_12m"],
                "rising_3m": m["rising_3m"],
                "rising_1m": m["rising_1m"],
                "cluster": cluster,
                "brandability": brandability,
                "windows_seen": ";".join(k for k, v in m.items() if v and k.startswith(("top_", "rising_"))),
            }
        )

    rows.sort(key=lambda r: (-r["max_interest"], r["cluster"], r["query"]))

    with OUT.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(
            fh,
            fieldnames=[
                "query",
                "geo",
                "max_interest",
                "best_interest_source",
        "top_12m",
                "top_3m",
                "top_1m",
                "rising_12m",
                "rising_3m",
                "rising_1m",
                "cluster",
                "brandability",
                "windows_seen",
            ],
        )
        writer.writeheader()
        writer.writerows(rows)

    print(f"merged {len(rows)} unique queries -> {OUT}")
    if skipped:
        print(f"skipped (unparseable name): {skipped}")

    from collections import Counter

    counts = Counter(r["cluster"] for r in rows)
    print("\ncluster counts:")
    for cluster, count in sorted(counts.items(), key=lambda x: (-x[1], x[0])):
        print(f"  {cluster:28s} {count}")


if __name__ == "__main__":
    main()
