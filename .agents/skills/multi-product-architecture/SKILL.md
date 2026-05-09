---
name: multi-product-architecture
description: >
  Defines the folder structure, content isolation strategy, and shared layout
  system for the varsilias.dev multi-product documentation platform. Use this
  skill whenever the user is scaffolding the repo, organizing docs folders,
  designing the directory structure, setting up shared vs product-specific assets,
  planning how multiple tools coexist in one Mintlify site, or asking how to
  keep products isolated while sharing branding and layout. Also triggers when
  adding a new tool to the ecosystem or restructuring the existing content tree.
license: MIT
compatibility: Requires Node.js for CLI. Works with any Git-based workflow.
metadata:
  author: Daniel Okoronkwo
  version: "1.0"
---

# Multi-Product Architecture — varsilias.dev

## Design Philosophy

Each tool on varsilias.dev must feel:
- **Isolated** — its own sidebar, its own narrative, its own structure
- **Complete** — users should not need to leave the product section to understand the tool
- **Consistent** — same layout system, same typography, same navigation behaviour

Tools share: branding, layout shell, theming, navbar, footer, search, writing conventions.
Tools own: sidebar structure, page content, architecture diagrams, API references.

---

## Canonical Folder Structure

```
varsilias.dev/
├── docs.json                    # Platform configuration (single source of truth)
├── docs/
│   ├── corelens/
│   │   ├── overview.mdx
│   │   ├── quickstart.mdx
│   │   ├── installation.mdx
│   │   ├── configuration.mdx
│   │   ├── architecture.mdx
│   │   ├── concepts/
│   │   │   ├── tracing.mdx
│   │   │   ├── metrics.mdx
│   │   │   └── exporters.mdx
│   │   ├── examples/
│   │   ├── production.mdx
│   │   ├── benchmarks.mdx
│   │   ├── api-reference.mdx
│   │   ├── faq.mdx
│   │   └── troubleshooting.mdx
│   ├── concile/
│   │   ├── overview.mdx
│   │   ├── quickstart.mdx
│   │   └── installation.mdx
│   ├── shared/
│   │   ├── philosophy.mdx       # Shared engineering philosophy snippet
│   │   └── contributing.mdx     # Contribution guide (reusable across tools)
│   └── index.mdx                # Landing/home page
├── assets/
│   ├── logo/
│   │   ├── light.svg
│   │   └── dark.svg
│   ├── og-image.png
│   └── favicon.svg
└── snippets/                    # Mintlify reusable MDX snippets
    ├── installation-note.mdx
    └── attribution.mdx
```

---

## Product Namespace Rules

Every tool gets exactly one top-level directory under `docs/`.

| Tool | Directory | URL prefix |
|------|-----------|------------|
| Corelens | `docs/corelens/` | `/corelens/` |
| Concile | `docs/concile/` | `/concile/` |
| Future tool | `docs/<tool-slug>/` | `/<tool-slug>/` |

**Naming**: Always use kebab-case. Never camelCase or underscores in directory/file names.

---

## Standard Page Set Per Tool

Every tool should implement this minimum page set before launch:

| Page | File | Purpose |
|------|------|---------|
| Overview | `overview.mdx` | What it is, why it exists, when to use it |
| Quickstart | `quickstart.mdx` | Working example in under 5 minutes |
| Installation | `installation.mdx` | All install paths (npm, go get, docker, etc.) |
| Configuration | `configuration.mdx` | Full config reference with defaults |
| Architecture | `architecture.mdx` | How it works internally — mental model |
| Production | `production.mdx` | Deployment guidance, performance, gotchas |
| FAQ | `faq.mdx` | Honest answers to real questions |
| Troubleshooting | `troubleshooting.mdx` | Indexed by symptom, not cause |

Optional but recommended:
- `benchmarks.mdx` — performance data with methodology
- `api-reference.mdx` — generated or hand-written API docs
- `concepts/` — deep dives per concept (keeps other pages scannable)
- `examples/` — real-world usage patterns

---

## Shared Content Strategy

Use Mintlify's snippet system for content that appears across tools:

```
snippets/
  attribution.mdx         # "Built and maintained by Daniel Okoronkwo / Varsilias"
  installation-note.mdx   # Standard Node.js/Go version requirement block
  contributing.mdx        # How to open issues, PRs, etc.
```

Reference a snippet in any MDX page:
```mdx
<Snippet file="attribution.mdx" />
```

Do not copy-paste shared content between product sections. Always extract to snippets.

---

## Sidebar Isolation

Each product controls its own sidebar entirely via its navigation group in `docs.json`.

The `tabs` array in `docs.json` acts as the product switcher — users click a tab
and enter an entirely isolated sidebar context.

When adding sub-sections within a product, use nested groups:

```json
{
  "group": "Core Concepts",
  "pages": [
    "corelens/concepts/tracing",
    "corelens/concepts/metrics"
  ]
}
```

Keep nesting to two levels maximum. Deeper nesting signals the content needs
restructuring, not more hierarchy.

---

## Versioning (Future)

When a tool reaches v2, adopt this structure:

```
docs/
  corelens/           # current (latest)
  corelens-v1/        # archived v1 docs
```

And in `docs.json` add a version dropdown using Mintlify's versioning config.
Do not implement this prematurely — wait until a breaking change is released.

---

## New Tool Scaffolding Checklist

When adding a tool to the platform:

1. Create `docs/<tool-slug>/` directory
2. Add `overview.mdx`, `quickstart.mdx`, `installation.mdx` as the minimum
3. Register tab in `docs.json` → `tabs` array
4. Register navigation group in `docs.json` → `navigation` array
5. Add the tool to the landing page project cards (see landing-page skill)
6. Add GitHub and license links to the tool's `overview.mdx`
7. Add `<Snippet file="attribution.mdx" />` to the overview footer

---

## Reference Files

- `references/page-templates.md` — MDX templates for each standard page type
- `references/snippet-library.md` — Available shared snippets and usage examples