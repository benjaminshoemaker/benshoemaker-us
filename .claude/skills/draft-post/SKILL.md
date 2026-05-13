---
name: draft-post
description: Write a blog post draft from a braindump brief, matching Ben's writing voice. Use after /braindump produces a BRIEF.md.
argument-hint: [topic-slug]
allowed-tools: Bash, Read, Write, Edit, AskUserQuestion
---

# Draft Post — Write a Blog Post in Ben's Voice

Write a full blog post draft from a BRIEF.md, matching Ben Shoemaker's established writing voice.

Copy this checklist and track progress:

```
Draft Post Progress:
- [ ] Step 1: Load context (brief + author profile)
- [ ] Step 2: Choose structure with user
- [ ] Step 3: Write first draft
- [ ] Step 4: Self-review against voice profile
- [ ] Step 5: Present to user and iterate
- [ ] Step 6: Finalize (set draft: false, cleanup, remind /tone-check)
```

## Step 1: Load Context

If a slug is provided, read `src/content/writing/<slug>/BRIEF.md`.
If not, ask which brief to use (list available BRIEF.md files under `src/content/writing/`).

Also read `AUTHOR_PROFILE.md` (in this skill's directory) for Ben's background, expertise, and core beliefs.

If the draft needs specific anecdotes beyond what AUTHOR_PROFILE.md provides, read the detailed stories in `~/Projects/interview_documents/stories/` (Dradis, LLM Match Quality, ASK'EM, Connections, Component Platform, Layoff Leadership).

**If BRIEF.md doesn't exist** for the given slug, ask the user if they want to run `/braindump` first. Don't proceed without a brief.

**If AUTHOR_PROFILE.md is missing**, proceed but note that authority grounding will be weaker — flag claims that need personal experience backing.

## Step 2: Choose Structure

Before writing, propose a structural approach. Present the user with 2-3 options from these patterns, chosen based on what fits the brief's content:

**Surprising Reversal** — Present the conventional wisdom, let the reader settle in, then pivot to reveal why it's wrong. Thesis lands late. Best when the audience holds the belief you're challenging.
*Ben's example: "The Codex App Changes Everything!!! (not really)"*

**Case Study Cascade** — 2-4 concrete examples that each independently support the thesis, building cumulative weight. No single example carries the argument; the pattern across them does.
*Ben's example: "Fivetran + dbt Merger" (three migration stories → the pattern)*

**Rogerian Concession** — Genuinely steelman the opposing view first, grant its strongest points, then identify the specific conditions under which it breaks down. Builds credibility in polarized debates.
*Ben's example: "In defense of not reading the code" (quotes critics, takes them seriously, then responds)*

**Narrative-to-Principle Extraction** — Open with a specific concrete story, then zoom out to extract the general principle. Story provides grounding; principle provides transferable value.

**Diagnostic Dissection** — Identify a symptom everyone recognizes, then work backward through layers of causation to find the non-obvious root. Mirrors debugging — a reasoning pattern technical audiences trust.

**First Principles Rebuild** — Strip a familiar concept to its foundation, discard inherited assumptions, reconstruct from scratch. Effective when the audience's assumptions are the problem.

**Reframing / Lens Shift** — Take a well-known problem and apply a framework from a different domain. The essay's value is the lens itself — readers leave with a new mental model.

**Defaults:** Use Surprising Reversal for opinion pieces and Case Study Cascade for experience-based pieces. Use Rogerian Concession when the topic is actively debated. Present the default plus 1-2 alternatives.

Ask the user which structure fits, or if they have a different one in mind.

## Step 3: Write the First Draft

Write the full post applying the chosen structure and the voice profile below. Save to `src/content/writing/<slug>.md` with frontmatter:

```yaml
---
title: "<title>"
date: <today's date>
type: essay
tags: [<relevant tags>]
description: "<1-2 sentence hook for social/SEO>"
draft: true
---
```

### Voice Profile — Ben Shoemaker

**Opening:** Lead with a contrarian take, a direct challenge to conventional wisdom, or a strong claim that immediately stakes out a position. Never open with throat-clearing ("In today's rapidly evolving..."). Examples from past posts:
- "No, it doesn't."
- "The consolidation wave nobody saw coming (except everyone did)"
- "If you avoid centralizing during growth, data mesh becomes a natural evolution rather than a painful/impossible retrofit."

**Authority:** Ground claims in specific personal experience from AUTHOR_PROFILE.md — name the company, the team size, the timeframe, the outcome. Don't hedge with "in my experience, generally speaking..." — be specific: "I've spent 6 years leading product for Indeed's Employer Data & Analytics organization."

**Evidence:** Always concrete. Name people, projects, companies, stats. Quote external sources directly (block quotes for longer passages). Mix personal anecdotes with external examples. Never make claims without backing — if there's no evidence, flag it as opinion explicitly ("I think").

**Tone:** Confident and opinionated but conversational. Use contractions. Use "I think" when it's genuinely opinion vs. fact. Ask rhetorical questions occasionally. Never condescending — take counterarguments seriously and engage with them honestly.

**Sentence rhythm:** Alternate between short punchy assertions and longer analytical sentences. Use short sentences for impact after building up a longer thought. Examples:
- "I still don't read the code."
- "That's not speculation — it's how pricing power works when vendors merge."
- "The code isn't the thing I'm debugging. The system that produced the code is."

**Structure:**
- H2 headers for major sections. Headers should be opinionated or narrative, not generic ("The Bigger Picture", "The evidence is piling up", "What I'd Do If I Were You" — not "Analysis" or "Discussion").
- Bold for emphasis on key phrases, sparingly.
- Numbered lists for sequential/ordered things, bullet points only when genuinely parallel.
- Block quotes for external sources.
- Occasional images if relevant (note placement with `![](/images/writing/<slug>/image-N.png)`).

**Things to AVOID:**
- Listicle structure (the post should read as a narrative, not a checklist)
- Overly formal academic tone
- Passive voice as default
- Summarizing at the end - close with a forward-looking bet or actionable challenge
- AI vocabulary (Tier 1 - never use): "delve", "tapestry", "realm", "pivotal", "meticulous", "underscore" (verb), "showcase", "intricate", "interplay", "fostering", "testament", "vibrant", "nestled"
- AI vocabulary (Tier 2 - avoid in clusters): "landscape" (metaphorical), "paradigm", "holistic", "robust", "seamless", "innovative", "cutting-edge", "unprecedented", "multifaceted", "crucial", "comprehensive", "transformative", "navigate" (metaphorical), "leverage" (non-financial verb), "utilize", "streamline", "enhance", "synergy", "groundbreaking", "profound"
- "It's not X, it's Y" negative parallelism - the single most recognizable AI structural pattern. One per post max, and only if it's genuinely the clearest way to say it
- Rule-of-three lists with near-synonyms ("professionals, experts, and specialists")
- Em-dash overuse - Ben uses ` - ` (space-hyphen-space), not `—`. Keep to ~9-10 per 1000 words. Many can be replaced with periods or commas
- Bold-header bullet lists (**Header:** description) - convert to narrative prose
- "Serves as" / "stands as" / "represents a" instead of "is"
- Starting paragraphs with "So," or "Now," or "Look,"
- Excessive hedging - if you believe it, say it
- Generic transitions ("That said," "Moving on," "With that in mind,")
- Throat-clearing ("It's worth noting", "It's important to note", "To be clear,")
- Vague attributions ("Experts argue...", "Many believe...", "Observers have cited...")
- Sandwich structure on opinions (positive, concern, reassurance) - just say the thing

**Closing:** End with either:
- A forward-looking bet ("Not reading the code is a bet on the trajectory")
- An actionable challenge to the reader ("Map your exit costs. Dual-path your critical sources. Prove portability with a real migration.")
- Never a summary of what was just said

**Length:** Target 800-1500 words for most posts. The Fivetran post was ~1200 words, the "not reading the code" post was ~1800 (longer because it was responding to debate). Match length to substance — don't pad.

After writing, verify the file exists and the frontmatter is valid by reading back the first 10 lines.

## Step 4: Self-Review

Before presenting to the user, audit the draft against the voice profile:

1. Does the opening stake out a position immediately?
2. Are there any AI-typical phrases from the avoid list?
3. Is every claim backed by evidence or explicitly flagged as opinion?
4. Does it read as narrative, not listicle?
5. Is the closing forward-looking, not a summary?
6. Are authority claims grounded in specific experience from AUTHOR_PROFILE.md?
7. Does it use short punchy sentences for impact, or is everything mid-length?
8. Are headers opinionated/narrative rather than generic?

Fix any issues found before presenting.

## Step 5: Present & Iterate

Show the draft to the user. Then ask targeted questions about the weakest parts — never generic "what do you think?" questions. Examples of good targeted questions:

- "The section on [X] makes a claim about [Y] — do you have a personal story from Indeed/Zencohen/Vibescaffold that proves it?"
- "The counterargument about [Y] — is this how you'd actually respond, or do you see it differently?"
- "The opening takes the angle of [Z] — does that match your instinct, or would you frame it differently?"
- "This paragraph feels like the weakest in the post — it's making [claim] without evidence. Can you fill in a specific example?"
- "[Section] is doing a lot of heavy lifting for the argument but it's only two sentences. Worth expanding with a concrete case?"

Continue iterating until the user is satisfied. Each revision should preserve what worked and only change what was flagged.

## Step 6: Finalize

When the user approves:
- Set `draft: false` in frontmatter
- Remove the BRIEF.md directory if the user confirms
- Remind the user to run `/pre-publish-check` as a final gate
