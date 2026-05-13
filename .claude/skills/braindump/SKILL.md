---
name: braindump
description: Capture links, thoughts, and a thesis for a blog post, then research and structure them into a writing brief. Use when starting a new blog post.
argument-hint: [topic-slug]
allowed-tools: Bash, Read, Write, Edit, WebSearch, WebFetch, AskUserQuestion
---

# Braindump — Blog Post Research & Brief

Turn scattered links, thoughts, and a thesis into a structured writing brief.

Copy this checklist and track progress:

```
Braindump Progress:
- [ ] Step 1: Gather inputs (thesis, links, thoughts, audience)
- [ ] Step 2: Research (fetch sources, web search, find prevailing narrative)
- [ ] Step 3: Produce the brief (thesis, outline, evidence, gaps)
- [ ] Step 4: Review with user and iterate
```

## Guiding Principles

- **Be pragmatic.** Every assertion in the brief should be backed by evidence — a source, a data point, a named example. Flag anything that's currently opinion-only.
- **Find the contrarian angle.** Before structuring, identify the prevailing narrative on this topic. Surface it explicitly so the author can decide how to push against it.
- **Identify where personal experience is required.** The best parts of Ben's essays are grounded in specific things he's done. Aggressively flag where a personal anecdote or data point would strengthen the argument.

## Reference Files

Before gathering inputs, read these for context on the author's background:
- `.claude/skills/draft-post/AUTHOR_PROFILE.md` — Career history, expertise, core beliefs
- `~/Projects/interview_documents/stories/` — Detailed stories (Dradis, LLM Match Quality, ASK'EM, Connections, Component Platform, Layoff Leadership) that may contain relevant anecdotes

Use these when identifying gaps that need personal experience.

## Step 1: Gather Inputs

Ask the user (one AskUserQuestion with up to 4 questions):

1. **What's your thesis?** — The core argument or point you want to make, in a sentence or two.
2. **What links/sources do you have?** — Paste URLs, article titles, tweets, whatever you've collected.
3. **What are your rough thoughts?** — Bullet points, fragments, half-formed arguments — anything in your head.
4. **Who's the audience?** — Tech leaders? Developers? General? (Default: technical professionals who follow AI/data/product trends.)

## Step 2: Research

For each link the user provided:
- Fetch the page content with WebFetch
- Extract the key claims, data points, and quotable passages
- Note the author and publication date

Then do supplementary research:
- WebSearch for 3-5 additional sources that support, complicate, or counter the thesis
- Specifically search for: concrete data/stats, named examples (companies, people, projects), counterarguments worth addressing
- Fetch and extract key content from the best 2-3 additional sources found

Also search for the **prevailing narrative** on this topic:
- What do most people currently believe about this?
- What's the "default take" that shows up in mainstream tech discourse?
- Surface this explicitly — it's the thing the post should either challenge, complicate, or reframe.

## Step 3: Produce the Brief

The brief is NOT a rigid template. It should capture four things in whatever format feels natural for the topic:

1. **Thesis** — The refined core argument, informed by research. If the evidence changed the thesis, say so.
2. **Outline** — The narrative arc and key sections. Not headers-and-bullets, but the *story*: what hooks the reader, what builds the argument, what addresses skeptics, what leaves them with.
3. **Evidence** — All sources organized by which argument they support. For each: source name, key quote or data point, URL. Flag the strongest 2-3 pieces.
4. **Gaps** — Things the thesis claims that don't yet have evidence. Places where Ben's personal experience would make the argument land. Counterarguments that need a response. Be specific: "You claim X but the only evidence is Y — do you have a story from Indeed/Zencohen/Vibescaffold that proves this?"

Also include:
- **Prevailing narrative** — What most people currently think about this topic, so the author can see what they're pushing against.
- **Source library** — Simple table of all sources with URLs for reference during drafting.

Create the directory `src/content/writing/<slug>/` if it doesn't exist, then save to `src/content/writing/<slug>/BRIEF.md`. Verify the file was written by reading back the first 5 lines.

## Error Handling

| Situation | Action |
|-----------|--------|
| Link is unreachable, paywalled, or returns an error | Note it in the source library as "[unavailable]" and WebSearch for cached or alternate versions of the same content |
| WebSearch returns nothing relevant | Note the gap and move on — don't fabricate sources. Flag it in the Gaps section |
| AUTHOR_PROFILE.md not found | Proceed without it but note that gap identification for personal experience will be weaker |

## Step 4: Review with User

Present the brief to the user. Ask:
- Does the thesis still feel right after seeing the evidence?
- Are there arguments or sources missing?
- Any of the gaps you can fill in right now?

Iterate on the brief based on feedback before considering it done.

## Output

The final brief at `src/content/writing/<slug>/BRIEF.md`, ready for `/draft-post`.
