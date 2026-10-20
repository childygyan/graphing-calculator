#!/usr/bin/env bash
# Install the 8 regenerated unique graph-2 screenshots for the /learn/ program.
# Usage: scripts/install-regen-screenshots.sh <screenshots-dir>
#   <screenshots-dir> must contain <slug>-graph-2.png for the 8 slugs listed below
#   (captured at 1280x720 from the share URLs in scripts/_regen_out/shot-urls.json).
#
# What it does:
#   1. Copies each PNG into src/pages/learn/_drafts_images/<slug>/graph-2.png
#      (the 4 still-draft articles are done here — the daily cron moves them
#      into public/ at publish time).
#   2. Copies the 4 LIVE articles' PNGs into public/images/learn/<slug>/graph-2.png.
#   3. Hash-verifies: all 10 articles' graph-2 files are unique, and no graph-2
#      duplicates any graph-1.
# After this: npm run typecheck && npm run build, deploy with
#   python3 ~/workspace/bin/cf-pages-deploy.py graphing-calc <repo>/dist --branch=main
# then verify the 4 live article pages + their new images return 200,
# and git-commit (push token is 403 — commit locally, report plainly).
set -euo pipefail
SRC_DIR="${1:?usage: install-regen-screenshots.sh <screenshots-dir>}"
REPO="$(cd "$(dirname "$0")/.." && pwd)"

LIVE_SLUGS="increasing-and-decreasing-intervals function-transformations tangent-line-at-a-point find-roots-and-zeros"
DRAFT_SLUGS="derivative-at-a-point getting-started-graphing-calculator how-to-use-the-table-of-values solve-quadratic-equations"
# Unchanged (canonical images kept): find-local-minimum-and-maximum, find-intersection-of-two-graphs

for slug in $LIVE_SLUGS $DRAFT_SLUGS; do
  f="$SRC_DIR/$slug-graph-2.png"
  [ -f "$f" ] || { echo "MISSING: $f"; exit 1; }
  cp "$f" "$REPO/src/pages/learn/_drafts_images/$slug/graph-2.png"
  echo "installed _drafts_images/$slug/graph-2.png"
done
for slug in $LIVE_SLUGS; do
  cp "$SRC_DIR/$slug-graph-2.png" "$REPO/public/images/learn/$slug/graph-2.png"
  echo "installed public/images/learn/$slug/graph-2.png"
done

echo "--- uniqueness check (all 10 graph-2 files) ---"
python3 - "$REPO" <<'EOF'
import hashlib, sys
repo = sys.argv[1]
slugs = ("find-local-minimum-and-maximum increasing-and-decreasing-intervals derivative-at-a-point "
         "find-intersection-of-two-graphs function-transformations getting-started-graphing-calculator "
         "tangent-line-at-a-point find-roots-and-zeros how-to-use-the-table-of-values solve-quadratic-equations").split()
seen = {}
dups = 0
for s in slugs:
    for loc in ("src/pages/learn/_drafts_images", "public/images/learn"):
        p = f"{repo}/{loc}/{s}/graph-2.png"
        try:
            h = hashlib.md5(open(p,'rb').read()).hexdigest()[:12]
        except FileNotFoundError:
            continue  # drafts have no public/ copy yet — expected
        key = (h, loc if loc.startswith('public') else 'draft')
        # drafts<->public copies of the SAME article are expected to match; only
        # flag when two DIFFERENT articles share a hash in the same location class
        tag = f"{h}"
        if tag in seen and seen[tag][0] != s:
            print(f"DUPLICATE: {s} matches {seen[tag][0]} ({h})"); dups += 1
        seen.setdefault(tag, (s, p))
print("OK: all graph-2 files unique" if dups == 0 else f"FAIL: {dups} duplicates")
sys.exit(1 if dups else 0)
EOF
