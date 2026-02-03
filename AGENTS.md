# AGENTS.md — benshoemaker.us

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

## Workflow

```
Human (Orchestrator)          Agent (Executor)
─────────────────────         ────────────────
Assign task from plan    →    Load context (AGENTS.md + specs)
                              Check dependencies
                              Implement (minimum code)
                              Verify acceptance criteria
                              Update checkboxes in EXECUTION_PLAN.md
                              Commit and report
Review checkpoint        ←    Request checkpoint review
Approve / request fixes  →    Fix and re-verify
```

Agents execute **one task at a time**. Humans handle setup, task assignment, and checkpoint approval.

## Task Execution

1. Read AGENTS.md, relevant spec sections, and EXECUTION_PLAN.md task
2. Check `Depends On` — all listed tasks must be complete
3. Implement with minimum code satisfying acceptance criteria
4. Verify each criterion using its `Verify` command
5. Mark criteria `- [x]` in EXECUTION_PLAN.md
6. Commit: `task({id}): {description} [REQ-XXX]`

## Context Management

- Start each task with a fresh context load
- Read only the spec sections referenced by the task
- If context gets large while debugging, compact before continuing
- Never exceed 60% context capacity

## Verification

**Primary:** Run each criterion's `Verify` command from EXECUTION_PLAN.md.

**Standard checks (run after every task):**
```bash
npm run build          # Must pass
npx astro check        # Must pass (TypeScript)
```

**For BROWSER criteria:** Use browser verification skill or manual inspection.
**For MANUAL criteria:** Report to human — do not self-verify.

## Testing Policy (Adapted for Static Site)

This project has no test runner. Instead:
- **BUILD verification** replaces unit tests — `npm run build` catches schema errors, missing imports, broken references
- **CODE verification** uses grep/file checks on source files
- **TYPE verification** uses `npx astro check`
- **BROWSER verification** uses Lighthouse or manual inspection

Never claim a criterion passes without running its Verify command.

## When to Stop and Ask

Stop and report a blocker when:
- A dependency file/function doesn't exist yet
- Environment variable or secret is needed (e.g., `GITHUB_TOKEN`)
- Acceptance criterion is ambiguous
- Build fails and you can't determine why after 3 attempts
- Changes would modify files outside the current task scope

**Blocker format:**
```
BLOCKED: {task-id}
Type: user-action | dependency | unclear-requirements
Details: {what's needed}
```

## Completion Report

After each task:
```
COMPLETE: {task-id}
Built: {1-2 sentence summary}
Files: {created/modified list}
Build: PASS | FAIL
Type Check: PASS | FAIL
Commit: {hash}
```

## Git Conventions

- **Branch:** One per phase → `phase-{N}` (e.g., `phase-1`)
- **Commits:** `task({id}): {description} [REQ-XXX]`
- **Requirement traceability:** Always include REQ-ID in commit message

## Guardrails

- Make the smallest change that satisfies acceptance criteria
- Don't duplicate files to work around import issues
- Don't guess — report if you can't access something
- Don't add dependencies not listed in TECHNICAL_SPEC.md
- Read full error output before attempting fixes
- Don't introduce new APIs without flagging for spec updates

## Follow-Up Items

If you discover issues outside current task scope, add to `TODOS.md`:
```markdown
- [ ] [{priority}] {description} (Source: task {id})
```
