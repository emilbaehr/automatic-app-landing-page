#!/usr/bin/env bash
# Contribute to upstream: sanitize on a side branch, push PR branch, keep master as production.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BRANCH="feature/multi-app-showcase"
UPSTREAM="https://github.com/emilbaehr/automatic-app-landing-page.git"
MASTER_BRANCH="$(git branch --show-current)"

if [[ "$MASTER_BRANCH" != "master" ]]; then
  echo "Switch to master first."
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Uncommitted changes. Commit or stash first."
  exit 1
fi

git remote add upstream "$UPSTREAM" 2>/dev/null || git remote set-url upstream "$UPSTREAM"

git branch -D "$BRANCH" 2>/dev/null || true
git checkout -b "$BRANCH"

if [[ -f CNAME ]]; then
  git rm -f CNAME
fi

cat > _config.yml <<'YAML'
# Site Info (portfolio homepage)
page_title                                : My Apps
site_description                          : A collection of mobile apps. Add yours in _apps/.
ios_app_country                           : us

# GitHub Pages project site (user.github.io/repo-name) — uncomment and set yours:
# url: "https://YOUR_USERNAME.github.io"
# baseurl: "/YOUR_REPO_NAME"
#
# Custom domain at root — use after DNS is live:
# url: "https://www.example.com"
# baseurl: ""

enable_smart_app_banner                   : false
auto_load_app_store_screenshots           : true

your_name                                 :
your_link                                 :
your_city                                 :
email_address                             :
linkedin_username                         :
linkedin_company                          :
facebook_username                         :
instagram_username                        :
twitter_username                          :
github_username                           :
youtube_username                          :
mastodon_link                             :

presskit_download_link                    :

topbar_color                              : "#000000"
topbar_transparency                       : 0.1
topbar_title_color                        : "#ffffff"

cover_image                               : assets/headerimage.png
cover_overlay_color                       : "#363b3d"
cover_overlay_transparency                : 0.8

device_color                              : black
body_background_color                     : "#ffffff"
link_color                                : "#1d63ea"

app_title_color                           : "#ffffff"
app_price_color                           : "#ffffff"
app_description_color                     : "#ffffff"

feature_title_color                       : "#000000"
feature_text_color                        : "#666666"
feature_icons_foreground_color            : "#1d63ea"
feature_icons_background_color            : "#e6e6e6"
social_icons_foreground_color             : "#666666"
social_icons_background_color             : "#e6e6e6"
footer_text_color                         : "#666666"

sass:
  style: :compressed

exclude:
  - LICENSE
  - README.md
  - CNAME
  - SETUP.md

collections:
  pages:
    output: true
    permalink: /:path/
  apps:
    output: true
    permalink: /apps/:name/

markdown: kramdown
YAML

rm -f _apps/*.md
git rm -f SETUP.md 2>/dev/null || true

cat > _apps/example-app.md <<'MD'
---
title: Example App
layout: app
app_name: Example App
ios_app_id: 1234793120
app_description: Example app. Replace with your App Store ID in _apps/your-app.md.
device_color: black
features:
  - title: Automatic Metadata
    description: Icon, name, price and App Store link from iTunes API.
    fontawesome_icon_name: sync
  - title: Multi-App Portfolio
    description: Add more apps by creating files in _apps/.
    fontawesome_icon_name: mobile
  - title: App Store Screenshots
    description: iPhone screenshots load automatically with carousel controls.
    fontawesome_icon_name: images
---
MD

cat > MULTI_APP.md <<'MD'
# Multi-App Portfolio

This fork adds a portfolio homepage and per-app detail pages.

## Add an app

Create `_apps/my-app.md`:

```yaml
---
title: My App
layout: app
app_name: My App
ios_app_id: 1234567890
app_description: One-line description
device_color: black
features:
  - title: Feature
    description: Description
    fontawesome_icon_name: star
---
```

Optional: `ios_app_country: cn` for region-specific App Store lookup.

## Local preview

```bash
bundle install
jekyll serve --config _config.yml,_config_dev.yml
```

## GitHub Pages

For `https://username.github.io/repo-name/`, set in `_config.yml`:

```yaml
url: "https://username.github.io"
baseurl: "/repo-name"
```

Deploy with the included GitHub Actions workflow (`.github/workflows/jekyll.yml`).
MD

git add -A
git commit -m "Add multi-app portfolio landing page support" \
  -m "- Portfolio homepage with app cards (iTunes icon, name, price)" \
  -m "- Per-app detail pages under /apps/:name/" \
  -m "- App Store iPhone screenshots with carousel" \
  -m "- What's New hub and per-app release notes" \
  -m "- GitHub Pages baseurl-safe asset paths" \
  || true

git push -u origin "$BRANCH" --force

git checkout master

PR_URL="https://github.com/emilbaehr/automatic-app-landing-page/compare/master...Ekildar27:automatic-app-landing-page:${BRANCH}?expand=1"
echo ""
echo "Done. Open this URL to create Pull Request to upstream:"
echo "$PR_URL"
echo ""
echo "Local master unchanged (production config preserved on master)."
