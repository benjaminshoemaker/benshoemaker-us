# benshoemaker.us

Ben Shoemaker's personal site and writing platform, built as a static Astro
site.

## What Lives Here

- Essays and notes in `src/content/writing/`
- Site, social, and navigation data in `src/data/site.ts`
- Project portfolio data in `src/data/projects.ts`
- Astro pages, layouts, and components in `src/`
- Unpublished source material in `drafts/`
- Project-specific writing skills in `.claude/skills/`

## Development

Requires Node.js 20 or newer.

```bash
npm ci
npm run dev
```

The local site runs at `http://localhost:4321`.

Before committing code or content-processing changes:

```bash
npm run build
npx astro check
```

The pre-commit hook processes drafts with `scripts/process-drafts.mjs`.

## Possible Future Work

These are opportunities, not a committed execution plan:

- Move the `benshoemaker.us` DNS configuration to the current Vercel
  deployment if that is still outstanding.
- Import worthwhile posts from the previous blog.
- Consider richer GitHub activity or pinned-project presentation only if it
  improves the visitor experience beyond the current project data.
