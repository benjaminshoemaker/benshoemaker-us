# AGENTS.md — benshoemaker.us

Project guidance for AI agents working on Ben Shoemaker's personal site.

## Project Context

| Key | Value |
|-----|-------|
| Language | TypeScript 5 |
| Runtime | Node.js 20+ |
| Framework | Astro v5, static site generation |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Package manager | npm |
| Dev server | `npm run dev` at `http://localhost:4321` |
| Build | `npm run build` |
| Type check | `npx astro check` |

The site presents Ben's writing, projects, services, background, and current
work. Published essays live in `src/content/writing/`; project and site data
live in `src/data/`.

## Working Rules

- Make focused changes that preserve the site's established visual language and
  writing voice.
- Treat content claims, career details, and external links as facts to verify,
  not placeholders to invent.
- Do not add dependencies unless the change genuinely needs them.
- Keep drafts unpublished until Ben explicitly approves publication.
- Preserve the project-specific writing skills under `.claude/skills/`; invoke
  them only for the writing tasks described by their metadata.
- Capture durable product context in normal project documentation or source,
  not generated phase state, execution plans, or agent-specific logs.

## Verification

This static site has no unit-test suite. Before claiming a code or content
change is complete, run:

```bash
npm run build
npx astro check
```

For visual changes, also inspect the affected pages at desktop and mobile
widths. For draft processing changes, verify the generated content rather than
relying only on a successful command.
