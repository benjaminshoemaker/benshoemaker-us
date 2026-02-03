---
title: "Interesting Pattern in Cursor's Autocomplete"
date: 2026-01-28
type: note
tags: [ai-coding]
description: "A quick observation about how Cursor's autocomplete handles repeated patterns differently than Copilot."
draft: false
---

Noticed something interesting today while working in Cursor.

When you have a repeated pattern—say, three similar function definitions—Cursor doesn't just autocomplete the next one. It seems to infer the *structure* you're building and suggests completions that maintain consistency with earlier examples.

Copilot does this too, but Cursor's version feels more context-aware. It's picking up on naming conventions and parameter ordering from the surrounding code, not just the immediate context.

Small detail, but it adds up over a long coding session.
