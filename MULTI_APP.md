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
