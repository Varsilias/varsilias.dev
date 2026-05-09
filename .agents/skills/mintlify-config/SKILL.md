---
name: mintlify-config
description: >
  Configures Mintlify for the varsilias.dev centralized documentation platform.
  Use this skill whenever the user is working on docs.json, setting up Mintlify
  routing, registering a new product/tool, configuring the navigation structure,
  adjusting tab groups, anchors, or any top-level Mintlify platform settings.
  Also triggers when the user asks how to add a new tool to the docs site, update
  the global navbar, or integrate a new product namespace like /corelens or /concile.
license: MIT
compatibility: Requires Node.js for CLI. Works with any Git-based workflow.
metadata:
  author: Daniel Okoronkwo
  version: "1.0"
---

# Mintlify Configuration — varsilias.dev

## Platform Context

varsilias.dev is a centralized, multi-product open source documentation platform
built on Mintlify. It hosts multiple tools (Corelens, Concile, and future projects)
under one domain with isolated routing but shared layout, theming, and navigation.

Target aesthetic: Vercel/Stripe-level polish. Developer-first. No marketing fluff.

---

## docs.json Canonical Structure

Always treat `docs.json` as the single source of truth for platform configuration.
Never hardcode product-specific assumptions into the root config — use the
`navigation` array pattern with groups and `anchors` for extensibility.

```json
{
  "name": "Varsilias",
  "logo": {
    "light": "/logo/light.svg",
    "dark": "/logo/dark.svg",
    "href": "/"
  },
  "favicon": "/favicon.svg",
  "colors": {
    "primary": "#7c6af7",
    "light": "#4fc3f7",
    "dark": "#7c6af7",
    "anchors": {
      "from": "#7c6af7",
      "to": "#4fc3f7"
    }
  },
  "topbarLinks": [
    { "name": "GitHub", "url": "https://github.com/Varsilias" }
  ],
  "topbarCtaButton": {
    "name": "Get Started",
    "url": "/corelens/quickstart"
  },
  "tabs": [
    { "name": "Corelens", "url": "corelens" },
    { "name": "Concile",  "url": "concile"  }
  ],
  "anchors": [
    {
      "name": "GitHub",
      "icon": "github",
      "url": "https://github.com/Varsilias"
    },
    {
      "name": "Blog",
      "icon": "pen-line",
      "url": "/blog"
    }
  ],
  "navigation": [
    {
      "group": "Corelens",
      "pages": [
        "corelens/overview",
        "corelens/quickstart",
        "corelens/installation",
        "corelens/configuration",
        "corelens/architecture",
        {
          "group": "Core Concepts",
          "pages": [
            "corelens/concepts/tracing",
            "corelens/concepts/metrics",
            "corelens/concepts/exporters"
          ]
        },
        "corelens/production",
        "corelens/benchmarks",
        "corelens/api-reference",
        "corelens/faq",
        "corelens/troubleshooting"
      ]
    },
    {
      "group": "Concile",
      "pages": [
        "concile/overview",
        "concile/quickstart",
        "concile/installation"
      ]
    }
  ],
  "footerSocials": {
    "github": "https://github.com/Varsilias",
    "twitter": "https://twitter.com/varsilias"
  }
}
```

---

## Adding a New Product

When a new tool is added to the platform, follow this checklist:

### 1. Add a tab entry
```json
{ "name": "NewTool", "url": "new-tool" }
```

### 2. Add a navigation group
```json
{
  "group": "NewTool",
  "pages": [
    "new-tool/overview",
    "new-tool/quickstart",
    "new-tool/installation"
  ]
}
```

### 3. Create the content directory
```
docs/
  new-tool/
    overview.mdx
    quickstart.mdx
    installation.mdx
```

### 4. Scaffold the overview page (see content-authoring skill for conventions)

Never add product-specific config outside the `navigation` group and `tabs` array.
Shared layout, theming, and topbar are global — do not override per product.

---

## Routing Conventions

| URL pattern | Content file |
|---|---|
| `/corelens` | `docs/corelens/overview.mdx` |
| `/corelens/quickstart` | `docs/corelens/quickstart.mdx` |
| `/concile/api-reference` | `docs/concile/api-reference.mdx` |

Mintlify infers routes directly from the file path relative to `docs/`. Always
use kebab-case for all filenames and directory names.

---

## Theme & Color Configuration

The brand accent gradient is: `linear-gradient(135deg, #7c6af7, #4fc3f7)`

In `docs.json`, map it as:
- `colors.primary`: `#7c6af7` (violet — used for links, active states)
- `colors.light`: `#4fc3f7` (cyan — lighter mode accents)
- `colors.anchors.from/to`: full gradient range

Do not override Mintlify's default green elsewhere. All other color decisions
defer to the brand-theme skill.

---

## SEO Metadata

Set these fields at the root level of `docs.json`:

```json
{
  "metadata": {
    "og:title": "Varsilias — Open Source Developer Tools",
    "og:description": "Documentation for Corelens, Concile, and future open source infrastructure tools by Daniel Okoronkwo.",
    "og:image": "/og-image.png",
    "twitter:card": "summary_large_image"
  }
}
```

Each product's overview page should override title and description via its own
frontmatter `sidebarTitle` and MDX metadata.

---

## Common Mistakes to Avoid

- Do not use `pages` array paths with `.mdx` extension — Mintlify strips it automatically
- Do not put navigation groups in any file other than `docs.json`
- Do not use `title` casing in tab names that conflicts with the brand voice (sentence case preferred)
- Do not modify theme colors on a per-page basis — all color changes go through `docs.json`

---

## Reference Files

- `references/navigation-patterns.md` — Advanced sidebar patterns (nested groups, versioned docs, conditional pages)
- `references/mintlify-components.md` — Available MDX components and when to use each