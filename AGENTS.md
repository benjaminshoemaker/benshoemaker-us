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

## Purpose and Visual Direction

This is Ben's public presence: ideas, projects, leadership, and approachable
expertise in building with AI. Help readers understand his thinking and explore
his work. Do not turn the homepage into a job application or résumé landing page.

Preserve the project sidebar, warm neutral surfaces, amber accents, and Lora
headings. Tokens live in `src/styles/global.css`. Favor actual product captures
and published writing over decorative graphics or activity counts. Label demo
data clearly. Keep career claims and new essays subject to Ben's review.

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
