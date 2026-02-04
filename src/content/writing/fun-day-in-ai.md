---
title: "Fun day in AI"
date: 2025-09-29
type: note
tags: [ai, claude, product]
description: "Quick thoughts on Anthropic's Claude Sonnet 4.5 announcement and Lovable's new Cloud and AI features."
draft: false
---

## Claude Sonnet 4.5

Anthropic announced Claude Sonnet 4.5 with the headline that it's "the best coding model in the world." I find this positioning interesting given that coding represents only a minority of AI usage -estimates range from 4-12% of total LLM applications.

The announcement suggests Anthropic views winning developers as a strategic advantage for enterprise penetration and access to company data and billing systems. However, this represents a narrow focus compared to broader AI adoption.

### Will Claude Code reclaim dominance?

Early indicators suggest competitive positioning. Google Trends data shows Github Copilot gaining ground on Claude Code over recent months. Early reviews from developers like Simon Willison indicate Sonnet 4.5 performs well, though concrete benchmarks remain limited.

Additional features include expanded Chrome support (Max users only) and AI agent capabilities for Gmail and Google Docs -functionality requiring significant guardrails before widespread adoption.

## Lovable Cloud and AI

This release received minimal attention despite offering compelling value: integrated backend, authentication, storage, and AI features built into low-code development tools.

### Interoperability concerns

The critical limitation: portability. While technically possible to export to GitHub via Supabase, Lovable acknowledges the process remains difficult. I'm skeptical that the platform will prioritize interoperability, favoring vendor lock-in instead.

My workflow comparison highlights a preference for specialized tools -Figma for UI generation, then separate backend implementation -rather than all-in-one platforms sacrificing code ownership.

**Verdict:** Lovable's success depends on simplifying migration without creating lock-in friction.
