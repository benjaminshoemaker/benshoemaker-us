# AGENTS.md

Scoped execution guidance for the initial greenfield build.

Base project rules live in `../../AGENTS.md`.

## Scope

- Run greenfield execution commands from this directory: `plans/greenfield/`
- This file applies only to the initial project build tracked by `EXECUTION_PLAN.md`.
- Feature work belongs in `../../features/<name>/`.

## Required Context

Before starting a task, read:
1. `../../AGENTS.md`
2. `PRODUCT_SPEC.md` if it exists
3. `TECHNICAL_SPEC.md` if it exists
4. `EXECUTION_PLAN.md`
5. `QUESTIONS.md` if it exists
6. `../../LEARNINGS.md` if it exists

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
