#!/bin/sh
# CLI check for static collection publish integrity (Phase 2 T4).
# No new dependency: the check is a focused vitest run.
set -e
cd "$(dirname "$0")/.."
npx vitest run lib/__tests__/collection-integrity.test.ts
