---
name: content-authoring
description: >
  Governs how documentation content is written, structured, and formatted for
  varsilias.dev. Use this skill whenever writing or reviewing any MDX page for
  the platform — including overview pages, quickstarts, architecture docs, concept
  deep dives, API references, troubleshooting guides, and FAQs. Also triggers when
  the user asks how to explain a technical concept, structure a docs page, use
  Mintlify components (callouts, tabs, code blocks, cards), write a quickstart,
  or maintain the platform's writing tone and philosophy across tools.
license: MIT
compatibility: Requires Node.js for CLI. Works with any Git-based workflow.
metadata:
  author: Daniel Okoronkwo
  version: "1.0"
---

# Content Authoring — varsilias.dev

## Writing Philosophy

Documentation on varsilias.dev should teach:
- **Why** — the reasoning behind design decisions
- **When** — under what conditions to use this
- **Tradeoffs** — what you give up, what you gain
- **Internals** — how it works, not just how to use it

Avoid:
- Shallow "copy this code" tutorials with no explanation
- Passive voice
- Filler phrases ("In this guide, we will...")
- Marketing language ("powerful", "blazing fast", "best-in-class")
- Walls of text with no structural rhythm

The reader is a developer. Treat them as such.

---

## MDX Frontmatter Standard

Every page must include frontmatter:

```mdx
---
title: "Configuration"
description: "Complete reference for Corelens configuration options, including environment variables, SDK options, and exporter settings."
sidebarTitle: "Configuration"  # optional — use if you want a shorter sidebar label
---
```

Rules:
- `title`: Full, descriptive. This is the `<h1>` and `<title>` tag.
- `description`: One sentence. Specific enough to be useful in search results.
- Never leave `description` vague ("Learn how to configure Corelens").

---

## Page Structure Patterns

### Overview page

```mdx
---
title: "Corelens"
description: "Lightweight observability instrumentation for Node.js — OpenTelemetry-compatible, zero vendor lock-in."
---

## What is Corelens?

[1–2 sentences: what it is at its core]

## Why Corelens?

[The problem it solves. Be honest about tradeoffs. Do not sell.]

## When to use it

[Concrete scenarios where Corelens is the right choice]

## When not to use it

[Honest limitations — this builds trust]

## How it works

[High-level architecture, 1 diagram if useful]

## Next steps

<CardGroup cols={2}>
  <Card title="Quickstart" href="/corelens/quickstart" icon="rocket" />
  <Card title="Installation" href="/corelens/installation" icon="download" />
</CardGroup>
```

### Quickstart page

```mdx
---
title: "Quickstart"
description: "Get Corelens running in your Node.js application in under 5 minutes."
---

## Prerequisites

- Node.js 18+
- An existing Node.js/Express application

## 1. Install

```bash
npm install @varsilias/corelens
```

## 2. Instrument

[Minimal working code example — runnable as-is]

## 3. Verify

[How to confirm it's working — specific output to look for]

## What's next

[Link to configuration, architecture, or production guide]
```

**Quickstart rules:**
- Must be completable in under 5 minutes on a fresh project
- Every code block must be runnable as shown — no pseudocode
- Do not defer "this is explained later" — link to the explanation
- The working example should produce visible output the user can verify

---

## Mintlify Components Reference

### Callouts

Use callouts deliberately — not as decoration:

```mdx
<Note>
Use this for supplementary context the reader might find useful but doesn't need to proceed.
</Note>

<Warning>
Use this when a mistake here has real consequences (data loss, security issues, broken deploys).
</Warning>

<Tip>
Use this for non-obvious shortcuts or patterns experienced users would appreciate.
</Tip>

<Info>
Use this for version or environment-specific context.
</Info>
```

**Over-use of callouts is a writing smell.** If every other paragraph is wrapped
in a callout, the prose structure is broken — fix the prose.

### Code blocks

Always specify language:

```mdx
```typescript
// Always include language identifier
const client = new CorelensClient({ serviceName: 'api' });
```
```

For shell commands, use `bash` or `sh`:
```mdx
```bash
npm install @varsilias/corelens
```
```

For file paths in prose, always use inline code: `src/instrumentation.ts`

For config files, always show the full relevant section — never just the changed line.

### Tabs (for multi-runtime or multi-approach content)

```mdx
<Tabs>
  <Tab title="npm">
    ```bash
    npm install @varsilias/corelens
    ```
  </Tab>
  <Tab title="pnpm">
    ```bash
    pnpm add @varsilias/corelens
    ```
  </Tab>
  <Tab title="yarn">
    ```bash
    yarn add @varsilias/corelens
    ```
  </Tab>
</Tabs>
```

Use tabs when the reader must choose one path — not for showing multiple valid options simultaneously.

### Cards for navigation

```mdx
<CardGroup cols={2}>
  <Card title="Architecture" href="/corelens/architecture" icon="layers">
    How Corelens instruments your application under the hood.
  </Card>
  <Card title="Production" href="/corelens/production" icon="server">
    Deployment patterns, performance tuning, and monitoring in production.
  </Card>
</CardGroup>
```

Use card groups at the end of overview and quickstart pages to guide next steps.
Do not use cards in the middle of a page — they break reading flow.

---

## Architecture & Concept Pages

Architecture pages should:

1. Start with a diagram or mental model — give the reader a spatial understanding first
2. Walk through the diagram in prose — explain each component and its role
3. Explain data flow — what happens when a request arrives? Step by step.
4. Explain design decisions — why this architecture? What alternatives were considered?
5. Link to deeper concept pages if specific areas need more explanation

Example structure:
```mdx
## Architecture overview

[Diagram placeholder or Mermaid diagram]

## Components

### Tracer

[What it is, what it does, why it exists]

### Exporter

[Same pattern]

## Data flow

1. A request arrives at the HTTP layer
2. Corelens middleware intercepts and starts a span
3. ...

## Design decisions

### Why not use X instead?

[Honest tradeoff explanation]
```

---

## Troubleshooting Pages

Structure all troubleshooting content by **symptom**, not by cause:

```mdx
## Traces not appearing in my collector

**Symptom**: You see spans in the logs but nothing arrives at the OTLP endpoint.

**Likely causes:**
1. Exporter endpoint is misconfigured
2. Network port is not exposed in Docker

**Diagnosis:**
```bash
# Check exporter config
corelens diagnose --check-exporter
```

**Fix:**
[Specific fix for each cause]
```

Do not title troubleshooting sections by technical component. The user is searching
by what they see broken, not by internal architecture.

---

## Attribution Snippet

Every tool's overview page must close with the attribution snippet:

```mdx
<Snippet file="attribution.mdx" />
```

This renders: "Built and maintained by Daniel Okoronkwo / Varsilias."
With links to the GitHub org and license.

---

## Tone Checklist (apply before any page is considered done)

- [ ] Does the first paragraph tell the reader what this page is about?
- [ ] Is there a "when not to use" or honest limitations section where relevant?
- [ ] Are all code examples runnable as shown?
- [ ] Is every callout earning its place, or is it decorating weak prose?
- [ ] Does the page explain *why*, not just *what*?
- [ ] Is the language direct and active ("Corelens captures spans" not "Spans are captured")?
- [ ] Are there no marketing superlatives?
- [ ] Does the page end with a clear next step?

---

## Reference Files

- `references/page-templates.md` — Copy-paste MDX templates for all standard page types
- `references/voice-and-tone.md` — Extended tone guide with before/after examples
- `references/mermaid-diagrams.md` — Architecture diagram patterns using Mermaid in Mintlify