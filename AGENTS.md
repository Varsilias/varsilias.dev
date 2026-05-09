# varsilias.dev — agent instructions

This is the centralized open source documentation platform for all tools built and
maintained by Daniel Okoronkwo / Varsilias. It runs on Mintlify and hosts multiple
independent tools (Corelens, Concile, and future projects) under one domain.

Before working on any part of this project, load the relevant skill. Skills are the
authoritative source for conventions, patterns, and constraints — not this file.

---

## Skills map

| Task | Skill to load |
|------|---------------|
| Editing `docs.json`, navigation, routing, tabs, anchors, SEO config | `mintlify-config` |
| Folder structure, adding a new tool, shared vs isolated content | `multi-product-architecture` |
| Writing or reviewing any MDX page (overview, quickstart, arch, FAQ, etc.) | `content-authoring` |
| Colors, dark mode, brand gradient, badges, typography, logo, CSS | `brand-theme` |
| Homepage (`index.mdx`), hero, project cards, engineering bio section | `landing-page` |

If a task touches more than one domain (e.g. adding a new tool end-to-end), load all
relevant skills before starting.

---

## Platform overview

- **Framework**: Mintlify
- **Config file**: `docs.json` — single source of truth for all navigation, theming, and routing
- **Content root**: `docs/` — all MDX pages live here
- **Snippets**: `snippets/` — shared MDX fragments used across tools
- **Assets**: `assets/` — logos, og-image, favicon, custom CSS
- **Local preview**: `mint dev`
- **Link checker**: `mint broken-links`

### Current tools

| Tool | Docs path | Status |
|------|-----------|--------|
| Corelens | `docs/corelens/` | Active |
| Concile | `docs/concile/` | Active |

---

## Absolute constraints

These apply everywhere, regardless of the task:

**Platform**
- `docs.json` is the only place for global config. Never hardcode nav, colors, or routing in MDX files.
- File and directory names are always kebab-case. No camelCase, no underscores.
- Do not add `.mdx` extensions to page paths inside `docs.json` navigation arrays — Mintlify strips them automatically.
- Sidebar nesting is capped at two levels. Deeper hierarchy means the content needs restructuring.

**Brand**
- Brand accent: `linear-gradient(135deg, #7c6af7, #4fc3f7)`. Applied to CTAs, active nav states, anchor indicators. Never to body text or headings.
- Both light and dark modes are first-class. Every change must be verified in both.
- No gradients as decoration. No animations except subtle hover transitions (150–200ms).

**Writing**
- Documentation teaches why, when, tradeoffs, and internals — not just what to copy.
- Active voice. No filler openers ("In this guide, we will..."). No marketing superlatives.
- Every code block includes a language identifier. Every code example must be runnable as shown.
- Callouts (`<Note>`, `<Warning>`, `<Tip>`) are used deliberately — overuse is a sign the prose needs fixing.
- Troubleshooting pages are indexed by symptom, not by internal component name.

**Attribution**
- Every tool's overview page closes with `<Snippet file="attribution.mdx" />`.
- Shared content (install notes, contributing guide, attribution) lives in `snippets/` — never copy-pasted between product sections.

---

## Terminology

| Use | Not |
|-----|-----|
| `docs.json` | `docs.json`, `config.json` |
| overview | introduction, home, index |
| tool | product, library, package (context-dependent — use "tool" in navigation labels) |
| snippet | partial, include, component (for MDX reusable fragments) |
| kebab-case | snake_case or camelCase (for file/directory names) |

---

## What not to do

- Do not implement user auth, CMS features, comments, or forum systems.
- Do not add animations beyond hover transitions.
- Do not introduce custom breakpoints — use Mintlify's responsive defaults.
- Do not modify theme colors on a per-page basis.
- Do not create a new tool's docs section without also registering it in `docs.json` tabs and navigation.
- Do not use "Coming Soon" as a project status on the landing page — only list tools with a public repo.
- Do not write copy with superlatives ("blazing fast", "powerful", "best-in-class").