---
name: brand-theme
description: >
  Governs the visual identity, color system, typography, and theme configuration
  for varsilias.dev. Use this skill whenever the user is working on colors, dark/light
  mode, brand accent gradient, CSS custom properties, typography choices, spacing,
  logo files, favicon, or any design decision affecting the look and feel of the
  platform. Also triggers when the user asks how to style a component, apply the
  brand gradient, override Mintlify defaults, or ensure a new UI element looks
  consistent with the rest of the site.
license: MIT
compatibility: Requires Node.js for CLI. Works with any Git-based workflow.
metadata:
  author: Daniel Okoronkwo
  version: "1.0"
---

# Brand & Theme System — varsilias.dev

## Design Philosophy

The platform aesthetic should feel like:
- a serious engineer built it
- performance and clarity matter
- craftsmanship is visible in the details

Avoid:
- gradients used as decoration
- neon/cyberpunk aesthetics
- excessive motion or animation
- "AI-generated" visual styles (oversaturated, high contrast everything)
- startup-template aesthetics

Target reference: Vercel Docs, Stripe Docs, Linear — calm, technical, precise.

---

## Brand Accent Gradient

The primary brand accent for varsilias.dev:

```css
linear-gradient(135deg, #7c6af7, #4fc3f7)
```

| Stop | Hex | Name | Usage |
|------|-----|------|-------|
| From | `#7c6af7` | Violet | Primary color, links, active nav states |
| To | `#4fc3f7` | Cyan | Light mode accents, anchor highlights |

### Where to apply the gradient
- CTA buttons (primary only)
- Active navigation items (subtle left-border accent)
- Anchor link indicators
- Logo mark (if SVG-based)
- Subtle decorative accents in hero section

### Where NOT to apply the gradient
- Body text
- Sidebar backgrounds
- Card borders (use solid `#7c6af7` at low opacity)
- Headings (use text color, not gradient text — avoid CSS gradient-clip on body copy)

---

## docs.json Color Configuration

```json
{
  "colors": {
    "primary": "#7c6af7",
    "light": "#4fc3f7",
    "dark": "#7c6af7",
    "anchors": {
      "from": "#7c6af7",
      "to": "#4fc3f7"
    }
  }
}
```

This is the only place to configure color globally. Do not set colors in per-page CSS.

---

## Dark Mode

Both dark and light modes are first-class. Neither is secondary.

### Dark mode principles
- Background: deep neutral (not pure black) — let Mintlify default handle it
- Text: high contrast on dark bg, but not blinding white
- Brand accent: same gradient, applied at slightly higher opacity to remain visible
- Code blocks: must be legible in both modes — do not override Mintlify's syntax theme
- Cards: surface elevation via subtle border, not shadow

### Testing both modes
Before considering any UI work done, manually toggle dark mode and verify:
- [ ] Text is readable
- [ ] Brand accent is visible but not glaring  
- [ ] Code blocks are legible
- [ ] Card borders are visible
- [ ] Status badges are legible in both modes

---

## Typography

Mintlify handles typography defaults. Do not override the font stack unless
there is a specific, justified reason.

### Hierarchy conventions

| Element | Mintlify default | Usage |
|---------|-----------------|-------|
| H1 | 2.25rem / 700 | Page title (one per page) |
| H2 | 1.5rem / 600 | Major sections |
| H3 | 1.25rem / 600 | Subsections |
| H4 | 1rem / 600 | Callout headings, card labels |
| Body | 1rem / 400 | All prose |
| Code | Mono / 0.875rem | Inline and block code |

**Rule**: Use heading levels semantically. Do not use H2 for visual size — only for logical structure.

### Code typography
- Inline code: use backticks consistently — never bold a command
- Code blocks: always include a language specifier for syntax highlighting
- File paths: always use inline code, never italics

---

## Status Badge CSS

These should be defined in Mintlify's custom CSS file:

```css
.badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
}

.badge-stable {
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
}

.badge-beta {
  background: rgba(124, 106, 247, 0.12);
  color: #7c6af7;
}

.badge-experimental {
  background: rgba(234, 179, 8, 0.12);
  color: #ca8a04;
}

.badge-archived {
  background: rgba(107, 114, 128, 0.12);
  color: #6b7280;
}
```

Dark mode overrides (in `:root[class~="dark"]`):

```css
:root[class~="dark"] .badge-stable  { color: #4ade80; }
:root[class~="dark"] .badge-beta    { color: #a78bfa; }
:root[class~="dark"] .badge-experimental { color: #fde047; }
:root[class~="dark"] .badge-archived { color: #9ca3af; }
```

---

## Logo & Favicon

### Requirements
- Logo: SVG only — no PNG for primary brand assets
- Provide `light.svg` and `dark.svg` variants (light version for dark bg, dark for light bg)
- Favicon: SVG preferred (`favicon.svg`) — Mintlify supports SVG favicons

### Logo design constraints
- Should work at 24px height (navbar) and 40px height (other contexts)
- No gradient fill on the wordmark — use solid or a single accent color
- Gradient is permitted on a logomark/icon element if it exists separately
- Must be legible on both white and near-black backgrounds

---

## Motion & Animation

Allowed:
- Subtle hover transitions on cards and buttons (150–200ms ease)
- Nav highlight transitions (100ms)
- Code copy button fade (100ms)

Not allowed:
- Page entrance animations
- Scroll-triggered reveal animations
- Typewriter / text cycling effects in hero
- Parallax
- Loading spinners that block content

---

## Custom CSS File Location

In Mintlify, add a `custom.css` reference in `docs.json`:

```json
{
  "customCss": "/styles/custom.css"
}
```

File location: `assets/styles/custom.css`

Keep this file minimal. Only use it for:
- Status badge styles
- CTA button gradient overrides
- Card meta layout (badge + lang tags row)

Do not put layout changes or spacing overrides in `custom.css` — 
work within Mintlify's component system wherever possible.

---

## Accessibility Requirements

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large headings
- The brand violet `#7c6af7` on white passes WCAG AA for large text — verify before using on small body text
- All interactive elements must have visible focus states
- Do not rely on color alone to convey status (badges must have text labels too)
- Animation must respect `prefers-reduced-motion`

---

## Reference Files

- `references/color-tokens.md` — Full color token list with light/dark values
- `references/accessibility-checklist.md` — WCAG compliance checklist for the platform