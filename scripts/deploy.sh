#!/usr/bin/env bash
# Build the site and publish dist/ to the gh-pages branch served by GitHub Pages.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REMOTE="$(git -C "$ROOT" remote get-url origin)"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

npm --prefix "$ROOT" run build

cp -R "$ROOT/dist/." "$STAGE/"
touch "$STAGE/.nojekyll"

git -C "$STAGE" init -q -b gh-pages
git -C "$STAGE" add -A
git -C "$STAGE" commit -q -m "Deploy portfolio build ($(date -u +%Y-%m-%dT%H:%M:%SZ))"
git -C "$STAGE" push -q --force "$REMOTE" gh-pages

echo "Deployed -> https://rayen122.github.io/"
