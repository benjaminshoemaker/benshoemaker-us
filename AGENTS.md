# AGENTS.md — benshoemaker.us

Project-wide workflow guidance for AI agents working in this project.

## Instruction Hierarchy

- This file is the durable, project-wide baseline.
- Initial greenfield execution guidance lives in `plans/greenfield/AGENTS.md`.
- Feature execution guidance lives in `features/<name>/AGENTS.md`.
- When working in a scoped directory, read this file first, then the local `AGENTS.md` or `CLAUDE.md` in that directory.

## Project Context

| Key | Value |
|-----|-------|
| Language | TypeScript 5 |
| Runtime | Node.js 20+ |
| Framework | Astro v5 (static SSG) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Package Manager | npm |
| Dev Server | `npm run dev` → `http://localhost:4321` (wait ~3s) |
| Build | `npm run build` → `dist/` |
| Type Check | `npx astro check` |

No test runner — this is a static site. Verification uses BUILD, CODE, TYPE, and BROWSER checks.

## Testing Policy (Adapted for Static Site)

This project has no test runner. Instead:
- **BUILD verification** replaces unit tests — `npm run build` catches schema errors, missing imports, broken references
- **CODE verification** uses grep/file checks on source files
- **TYPE verification** uses `npx astro check`
- **BROWSER verification** uses Lighthouse or manual inspection

Never claim a criterion passes without running its Verify command.

## Git Conventions

- **Branch:** One per phase → `phase-{N}` (e.g., `phase-1`)
- **Commits:** `task({id}): {description} [REQ-XXX]`
- **Requirement traceability:** Always include REQ-ID in commit message

## Guardrails

- Make the smallest change that satisfies acceptance criteria
- Don't duplicate files to work around import issues
- Don't guess — report if you can't access something
- Don't add dependencies not listed in plans/greenfield/TECHNICAL_SPEC.md
- Read full error output before attempting fixes
- Don't introduce new APIs without flagging for spec updates

## Follow-Up Items

If you discover issues outside current task scope, add to `TODOS.md`:
```markdown
- [ ] [{priority}] {description} (Source: task {id})
```
