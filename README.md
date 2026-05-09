# Varsilias.dev

Documentation for open source infrastructure tools by [Daniel Okoronkwo](https://danielokoronkwo.com).

This site is built with [Mintlify](https://mintlify.com). It documents the Varsilias toolset and provides a contribution path for people who want to improve the docs.

## Projects

- **Corelens**: Stable Node.js observability instrumentation for portable traces and metrics.
- **Concile**: Experimental reconciliation engine for event-driven financial systems.
- **Varsilias.dev**: Documentation and contribution guides for this docs platform.

## Structure

```text
corelens/          Corelens product docs
concile/           Concile product docs
varsilias-dev/     Docs-project and contribution guides
snippets/          Reusable MDX snippets
logo/              Logo assets
docs.json          Mintlify configuration
style.css          Shared visual system
sitemap.xml        Explicit public sitemap
robots.txt         Crawler rules
llms.txt           AI discovery index
```

Each product namespace owns its own pages and navigation group. Shared configuration, theme, metadata, and layout styles live at the project root.

## Local workflow

Install the Mintlify CLI if needed:

```bash
npm i -g mint
```

Preview locally:

```bash
mint dev
```

Check links:

```bash
mint broken-links
```

Validate the docs build:

```bash
mint validate
```

## Analytics and SEO

Google Analytics 4 and Google Search Console placeholders live in `docs.json`.

Replace these before production use:

- `G-XXXXXXXXXX`
- `GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN`

See [Analytics and SEO](./varsilias-dev/analytics-seo.mdx) for setup steps.

## Contributing

Start with [Contributing](./varsilias-dev/contributing.mdx) and [Content style](./varsilias-dev/content-style.mdx).

Keep changes focused. Add new public pages to `docs.json` and `sitemap.xml`.
