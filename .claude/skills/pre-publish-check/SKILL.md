---
name: pre-publish-check
description: Final quality gate before publishing a blog post. Checks tone/voice match, conciseness, thesis connectivity, evidence backing, structural strength, links, frontmatter, and readability. Use after /draft-post iteration is complete. Replaces /tone-check.
argument-hint: <path-to-post>
allowed-tools: Bash, Read, Write, Edit, WebFetch, AskUserQuestion
---

# Pre-Publish Check

Final quality gate before publishing. Run this after the draft is done and you're ready to publish.

Copy this checklist and track progress:

```
Pre-Publish Check:
- [ ] Pass 1: Tone & voice match
- [ ] Pass 2: Conciseness audit
- [ ] Pass 3: Thesis connectivity
- [ ] Pass 4: Evidence audit
- [ ] Pass 5: Opening & closing strength
- [ ] Pass 6: Link & frontmatter check
- [ ] Pass 7: Readability scan
- [ ] Report findings to user
```

## Setup

Read the post file provided as argument. Also read:
- `.claude/skills/draft-post/AUTHOR_PROFILE.md` for voice reference
- 2-3 of Ben's published essays from `src/content/writing/` (prefer essays, not notes — check `type: essay` in frontmatter) for tone comparison

## Pass 1: Tone & Voice Match

Read `AI_MARKERS.md` (in this skill's directory) for the full reference checklist. Compare the draft against Ben's published essays.

**AI writing marker scan (from AI_MARKERS.md):**
1. Ctrl+F for all Tier 1 vocabulary (delve, tapestry, realm, pivotal, etc.) - any hit is a flag
2. Check for Tier 2 vocabulary in clusters (3+ in one section = flag)
3. Search for "not X, it's Y" / "not only...but also" negative parallelism constructions - flag multiples
4. Count em-dashes per 1000 words. Compare against Ben's published baseline (Ben uses ` - ` not `—`; his baseline is ~9-10 dashes per 1000 words). Flag if significantly above
5. Check for rule-of-three (tricolon) lists, especially with near-synonyms - flag clusters
6. Check for bold-header bullet list formatting (each item = **Bold:** description) - convert to narrative
7. Check for elegant variation / copula avoidance ("serves as", "stands as", "represents a")
8. Check for throat-clearing openers, sycophantic patterns, false balance templates, vague attributions, and canned significance phrases (see AI_MARKERS.md for full lists)
9. Check for uniform paragraph structure (topic sentence + support + summary, repeated)
10. Check for sandwich structure on opinions (positive, concern, reassurance - never just the concern)
11. Flag paragraphs starting with "So,", "Now,", "Look,"

**Voice mismatch detection:**
- Compare sentence length standard deviation against published essays (AI text has lower variance)
- Check for contractions (Ben uses them consistently - their absence signals AI drift)
- Check for "I think" usage (Ben uses it deliberately to mark opinion vs. fact - absence or overuse both signal problems)
- Rhetorical questions (Ben uses them occasionally - zero or too many is a flag)
- Authority claims should reference specific experience, not generic credibility ("Experts argue..." is an AI tell)
- Check for genuine voice quirks (sentence fragments, intentional rule-breaking) - their total absence is a flag

**Output:** List each flagged instance with line number, the phrase, and a suggested fix.

## Pass 2: Conciseness Audit

### Sentence level
- Flag sentences over 30 words (Ben's style allows slightly longer than typical web writing, but 30+ is a warning)
- Flag 3+ consecutive sentences of similar length (monotonous rhythm)
- Flag filler phrases: "in order to" → "to", "due to the fact that" → "because", "has the ability to" → "can", "it is important to note that" → cut, "the reason why is that" → "because", "in the event that" → "if", "a large number of" → "many"
- Flag hedge words that aren't earning their keep: "very", "really", "quite", "rather", "somewhat", "just", "actually", "basically"
- Flag nominalizations where a verb would be stronger: "made a decision" → "decided", "gave consideration to" → "considered"
- Flag "There is/are..." and "It is...that..." constructions — rewrite with a real subject

### Paragraph level
- Flag paragraphs over 5 sentences
- Flag paragraphs that make two distinct points (should be split)

### Section level
- Flag sections over 350 words without a subheading break
- Flag any section where the first sentence doesn't carry the point (readers scan first lines)

**Output:** List each flag with line number, the text, and a suggested tighter version.

## Pass 3: Thesis Connectivity

State the thesis in one sentence (from the post itself or inferred).

For each section and each paragraph, ask: **Does this advance the thesis?** Apply these checks:

- If you can delete a paragraph and the argument still holds, flag it as cuttable
- If a paragraph's connection to the thesis requires the reader to make an inferential leap, flag it and suggest making the connection explicit
- If two sections make the same point with different evidence, flag the weaker one for merging
- If a section introduces a tangent that isn't resolved, flag it

**Output:** For each flag, state: the section/paragraph, why it's disconnected, and whether to cut, merge, or add a connecting sentence.

## Pass 4: Evidence Audit

For each factual claim in the post:

- **Supported:** Has a linked source, named example, or specific personal experience → mark as good
- **Opinion (marked):** Author flags it with "I think" or equivalent → mark as good
- **Unsupported:** Stated as fact but no source or experience → flag it

Also check:
- Are any sources cited twice for different claims? (each point should stand on its own evidence)
- Are any sources stale? (check dates — anything older than 18 months may need a freshness note)
- Do block quotes have attribution?

**Output:** Table of claims, their evidence status, and flags.

## Pass 5: Opening & Closing Strength

**Opening (first 3 paragraphs):**
- Does the first sentence hook? (Stakes a position, tells a story, or provokes — not throat-clearing)
- By paragraph 3, does the reader know what the post is about and why they should care?
- Is there a clear "turn" — the moment the post shifts from setup to argument?

**Closing (last 2 paragraphs):**
- Does it end with a forward-looking bet or actionable challenge?
- Does it summarize? (If yes, flag — Ben's posts don't summarize)
- Does the last sentence land? Read it in isolation — does it work as a standalone statement?

**Output:** Assessment of opening hook strength, closing strength, and specific suggestions if either is weak.

## Pass 6: Link & Frontmatter Check

**Links:**
- Find all markdown links in the post
- Check for placeholder links (TBD, TODO, #, empty href)
- Attempt to fetch each URL with WebFetch to verify it resolves (just check for 200/redirect, don't analyze content)
- Flag any broken or placeholder links

**Frontmatter:**
- `date` — is it today or a reasonable publish date?
- `type` — should be "essay" for full posts
- `tags` — are they present and relevant?
- `description` — is it a hook (good) or a summary (bad)? Should make someone want to click, not tell them what they'll read
- `draft` — should be `true` until user explicitly approves

**Output:** List of link issues and frontmatter issues.

## Pass 7: Readability Scan

- Flag jargon or acronyms not defined on first use (exception: terms the target audience universally knows, like PM, AI, PR)
- Flag inside-baseball references that assume the reader has read Ben's prior posts (each post should stand alone — brief context is fine, but don't require prior reading)
- Estimate reading time (assume 250 words/minute for online reading) — flag if over 10 minutes
- Check that bold text is used for emphasis on key phrases, not for entire sentences
- Check that H2 headers appear every 200-350 words (wall-of-text detection)

**Output:** List of readability flags with suggestions.

## Report

Present findings organized by severity:

**Must fix** — Broken links, placeholder URLs, unsupported factual claims, AI-typical phrases, paragraphs disconnected from thesis

**Should fix** — Verbose sentences, monotonous rhythm, weak opening/closing, missing evidence, excessive sections

**Consider** — Minor conciseness improvements, readability polish, frontmatter tweaks

For each finding, include: what the issue is, where it is (line number or quote), and a specific suggested fix.

After presenting, ask the user which fixes to apply. Apply approved changes and re-verify the affected checks.

## Error Handling

| Situation | Action |
|-----------|--------|
| Post file not found | Ask user for the correct path |
| AUTHOR_PROFILE.md not found | Skip voice comparison against profile, note reduced confidence in tone check |
| No published essays found for comparison | Skip comparative tone analysis, rely only on the voice profile rules |
| URL check fails (timeout/network) | Note as "unverifiable" rather than "broken" |
