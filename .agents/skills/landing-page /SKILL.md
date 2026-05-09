---
name: landing-page
description: >
  Implements and maintains the varsilias.dev landing page (index.mdx), including
  the hero section, open source project cards, engineering identity section, and
  CTA layout. Use this skill whenever the user is working on the homepage, editing
  the hero headline or philosophy copy, adding or updating a project card, adjusting
  the layout of the projects grid, modifying CTA buttons, or structuring any part
  of the root index page. Also triggers when asking how to add a new open source
  project to the homepage listing, or how to structure the personal engineering bio.
license: MIT
compatibility: Requires Node.js for CLI. Works with any Git-based workflow.
metadata:
  author: Daniel Okoronkwo
  version: "1.0"
---

# Landing Page — varsilias.dev

## Page Role

The landing page (`docs/index.mdx`) is simultaneously:
- A personal engineering identity page (who Daniel is, what he cares about)
- A discoverability hub (all open source tools in one place)
- An entry point to the documentation ecosystem

It is **not** a marketing page. No startup-style hero copy. No excessive CTAs.
The tone is: calm, technical, thoughtful — a serious engineer's home on the web.

---

## Page Structure (in order)

```
1. Hero section
2. Engineering philosophy paragraph
3. Open source projects grid
4. Footer attribution
```

---

## Hero Section

```mdx
---
title: "Daniel Okoronkwo"
description: "Open source infrastructure tools for distributed systems."
---

<div className="hero-section">

# Daniel Okoronkwo

[engineering philosophy line — written manually]

<div className="cta-group">
  <a href="#projects" className="btn-primary">Explore Projects</a>
  <a href="https://github.com/Varsilias" className="btn-secondary">GitHub</a>
  <a href="/blog" className="btn-secondary">Blog</a>
</div>

</div>
```

**Constraints on hero copy:**
- Headline: name or a concise statement — never a tagline like "Building the future of X"
- Philosophy paragraph: 2–3 sentences maximum, written in first person, focused on
  why observability / distributed systems / systems-level tools matter to Daniel personally
- No animated text, no typewriter effects, no emoji in the hero
- CTA buttons: maximum three. Primary = Explore Projects. Secondary = GitHub, Blog.

---

## Project Card Spec

Each open source tool is represented by a card. Cards live in a responsive grid.

### Card MDX pattern (using Mintlify Card component):

```mdx
<CardGroup cols={2}>

<Card
  title="Corelens"
  icon="telescope"
  href="/corelens"
>
  Lightweight observability instrumentation for Node.js applications.
  OpenTelemetry-compatible. Zero vendor lock-in.

  <div className="card-meta">
    <span className="badge badge-stable">Stable</span>
    <span className="lang-tag">Node.js</span>
    <span className="lang-tag">TypeScript</span>
  </div>

  <div className="card-links">
    <a href="https://github.com/Varsilias/corelens">GitHub</a>
    <a href="/corelens">Docs →</a>
  </div>
</Card>

<Card
  title="Concile"
  icon="scale"
  href="/concile"
>
  Distributed reconciliation engine for event-driven financial systems.

  <div className="card-meta">
    <span className="badge badge-experimental">Experimental</span>
    <span className="lang-tag">Node.js</span>
  </div>

  <div className="card-links">
    <a href="https://github.com/Varsilias/concile">GitHub</a>
    <a href="/concile">Docs →</a>
  </div>
</Card>

</CardGroup>
```

### Card Field Definitions

| Field | Required | Notes |
|-------|----------|-------|
| `title` | Yes | Tool name, title case |
| `icon` | Yes | Mintlify icon name (Heroicons/Lucide compatible) |
| `href` | Yes | Internal docs path |
| Description | Yes | 1–2 sentences. Focus on what it does and when to use it. No marketing superlatives. |
| Status badge | Recommended | See status badge system below |
| Language tags | Recommended | Primary runtime(s) only |
| GitHub link | Yes | Always link to the repo |

### Status Badge System

| Status | Badge class | When to use |
|--------|-------------|-------------|
| Stable | `badge-stable` | API is stable, production-tested |
| Beta | `badge-beta` | Feature complete, API may change |
| Experimental | `badge-experimental` | Under active development, breaking changes expected |
| Archived | `badge-archived` | No longer maintained |

Never use "Coming Soon" as a status — only list tools that have a public repo.

---

## Engineering Identity Section

Below the project cards, include a brief section that communicates Daniel's
engineering perspective. This is not a bio — it is an engineering philosophy statement.

Structure:
```mdx
## On building tools

[2–4 sentences on why systems-level tooling matters, written manually]

[1–2 sentences on open source philosophy — attribution, craftsmanship, long-term thinking]
```

Do not include:
- CV-style lists of technologies
- LinkedIn-style summaries
- Years of experience language
- Lists of company names

Do include:
- What kinds of problems Daniel is drawn to
- Why performance and reliability matter in his work
- A link to GitHub or blog for more

---

## Footer / Attribution Pattern

Every landing page should close with:

```mdx
---

Built and maintained by [Daniel Okoronkwo](https://github.com/Varsilias). All tools are open source.
```

This reinforces authorship without being loud about it.

---

## Responsive Behaviour

- `CardGroup cols={2}` renders two columns on desktop, one on mobile (Mintlify default)
- CTA buttons should stack vertically on mobile (use flexbox column direction at small breakpoints)
- Hero headline: large on desktop, reduced on mobile — handled by Mintlify's typography scale
- Do not introduce custom breakpoints — work within Mintlify's responsive defaults

---

## Tone Checklist

Before finalising any landing page copy, check:

- [ ] No superlatives ("blazing fast", "best-in-class", "powerful")  
- [ ] No passive voice in project descriptions  
- [ ] No filler phrases ("we believe", "our mission is")  
- [ ] Project descriptions say what it does, not how great it is  
- [ ] Philosophy paragraph reads like an engineer talking, not a founder pitching  

---

## Reference Files

- `references/copywriting-examples.md` — Approved tone examples and anti-patterns
- `references/mintlify-card-icons.md` — Available icon names for project cards