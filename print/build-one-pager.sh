#!/bin/bash
# Prints portfolio-one-pager.html to a one-page A4 PDF with clickable links.
# Usage: print/build-one-pager.sh [output.pdf]
set -euo pipefail
cd "$(dirname "$0")"
out="${1:-$HOME/Downloads/Ion Cazac - Portfolio.pdf}"

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new \
  --disable-gpu \
  --allow-file-access-from-files \
  --no-pdf-header-footer \
  --virtual-time-budget=8000 \
  --print-to-pdf="$out" \
  "file://$PWD/portfolio-one-pager.html" 2>/dev/null

echo "Saved: $out"
