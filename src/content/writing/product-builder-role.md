---
title: "The Product Builder Is Here"
date: 2026-05-12
type: essay
tags: [ai-coding, product, careers]
description: "AI coding tools are collapsing the PM/engineer divide. The hybrid role I've been predicting - and living - is now a job you can apply for."
draft: false
---

The first month at my startup (stealth!) almost broke the company.

I was the technical co-founder. My co-founder had deep domain expertise in PropTech but wasn't technical. We tried the conventional approach: he'd write requirements, I'd build. It didn't work. His specs were overly complex, full of sprawl. He was using AI tools too, which meant they'd dump massive volumes of text at me - none of it really actionable. I'd push back, ask for more clarity, he'd revise, and we'd burn another week.

After about a month of this, I made a deliberate choice. I said: I've learned enough. I understand what we're trying to do. I'm just going to go build and he can decide whether he likes it.

I built a feature in a day. He looked at it and said, "This is great. We never would have gotten here." He liked about 80% of it. We iterated from there and moved dramatically faster.

A year earlier, as a PM, I would've called that approach reckless - wasting engineering time building something speculative. But with AI coding tools, the math changed. It took me a day, not a quarter. The handoff wasn't protecting quality; it was destroying speed. The bottleneck wasn't the people. It was the structure.

I [talked about this on a podcast](https://youtu.be/OirsRgdFC_8?t=309) a while back: "I think one version of it is people are doing both - you have to understand the product and then go implement it. That's always been engineers who think that way - as a PM you're like, 'I love this person, let no one talk to them and let them just build amazing things.' I think everyone could be that way now."

I believed that then. I wrote on [my website](https://benshoemaker.us) that "AI tools have created a new kind of role. Not quite PM, not quite engineer. Someone who can hold product vision and demonstrate it by building." I said companies would start hiring for this explicitly soon.

They have.

## The Role Has a Name Now

Go look at job boards right now. Here's what you'll find:

**Knotch** is hiring a "Product Builder." The listing says it plainly: "The traditional lines between Product Management and Engineering are disappearing, and the speed of execution is everything." They want 5+ years in PM and 2-3 years as a software engineer. $160-180K.

**Impiricus** is hiring an "AI Solutions Builder" at $165-210K. The job explicitly requires you to "act as your own PM" - interview stakeholders, define scope, then build the thing yourself. They want someone who can take "vibe-coded" prototypes and turn them into production systems.

**ShopMy** is hiring a "Senior Product Builder" who "thinks in complete systems" and "ships solutions, not specs." **Hello Heart** wants a "Senior AI Builder" - "the person who turns business problems into working AI solutions, fast." **Tiger Data** is hiring a "Builder in Residence."

These aren't engineering roles with a product coat of paint. They explicitly require product instincts: user research, stakeholder management, roadmap thinking. Combined with the ability to build working software. One role, with both sides of the coin.

## Why This Is Happening Now

The PM/engineering split existed for economic reasons, not philosophical ones. Building software was expensive and slow. You needed specialists who did nothing but write code, and other specialists who did nothing but figure out what to build. The handoff was costly, but having one person do both was even more costly - building took so long that product thinking would atrophy while you coded.

AI coding tools broke that equation. When I can prototype a feature in a day with Claude Code or Cursor, the handoff cost exceeds the build cost. It's faster for me to just go build than to write a spec, hand it off, wait, review, iterate, and repeat.

This isn't the "AI replaces PMs" story, and it isn't the tepid "AI makes PMs faster at PM work" story either. An ex-AWS engineer [told MRJ Recruitment](https://www.mrjrecruitment.com/resources/blog/is-product-management-becoming-product-engineering--how-ai-is-reshaping-roles-in-big-tech/) that "PMs in Big Tech are never going to touch the codebase with AI." I think he's wrong - not because PMs will become engineers, but because AI reduced the cost of going from product judgment to working artifact. That created space for a role that didn't exist before.

The "product engineer" title has existed for years at places like Shopify. But the bar was high - you had to be a genuinely strong engineer who also had product sense. AI tools lowered that bar. Not to zero - these listings still want real technical understanding and, in most cases, some engineering experience. But the bar moved from "write production code from scratch" to "direct AI agents effectively and know when the output is wrong." That opens the door wider than it's ever been.

## "This Is Just Startups Being Startups"

The obvious pushback: these are startup job listings. Startups have always had people wearing multiple hats. Big Tech will never merge these roles.

But... they already are. The [SF Standard reported in March](https://sfstandard.com/2026/03/05/engineer-2025-ai-land-everyone-s-builder-now/) that Meta PMs are calling themselves "AI builders" on LinkedIn. LinkedIn itself launched a "full stack builder" program training employees across all job titles to combine design, product, and engineering tasks. Walmart filled all of its dedicated agent builder positions with both technical and non-technical employees.

I think everyone will follow. When one builder with AI tools can validate a product concept in a day instead of a two-week sprint cycle, the cost difference is hard to ignore. Apollo's CPO is hiring Product Builders. Superhuman's CPO wants PMs to "fully become builders." Anthropic is showing the same pattern.[^1] When one person with AI tools can do what used to require a PM and two engineers, the org chart will eventually reflect that - not everywhere, not for everything, but for a growing category of product work.

## "Vibe Coding Is Slop"

There's a harder version of the pushback, and it deserves a real answer.

[My last post](https://news.ycombinator.com/item?id=46891131) generated hundreds of comments, and a consistent thread was: AI-generated code is unreliable, and people who don't review it are shipping garbage. This isn't hypothetical anymore. Between December 2025 and March 2026, Amazon experienced [multiple Sev-1 production incidents](https://getautonoma.com/blog/amazon-vibe-coding-lessons) during a period where they'd mandated 80% weekly usage of their AI coding assistant while cutting 30,000 corporate employees. Amazon's spokesperson said only one reviewed incident was directly AI-related, but internal documents pointed to a pattern - AI-assisted velocity had outpaced the change-management systems meant to catch problems. The guardrails hadn't scaled with the speed.

CodeRabbit's [analysis of 470 GitHub pull requests](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report) found AI-authored code contains 1.7x more major issues than human-written code: 75% more logic errors, 2.74x more security vulnerabilities. Lightrun's 2026 survey found 43% of AI-generated code changes need debugging in production even after passing QA.[^2]

One engineer put it well: "Claude Code in the hands of someone who has never debugged at 2am is just a faster way to ship problems." The strongest version of this pushback is right. These tools can't check themselves. The bar for production code doesn't get to drop just because AI wrote it.

## How Builders Fit Into the Dev Cycle

There are actually three versions of this role emerging, and it matters which one you're hiring for:

A **prototype builder** validates ideas with working demos. Engineering owns anything that goes to production. This is the lowest-risk version and probably the most immediately valuable - a PM who can show a working concept instead of a slide deck changes the entire product conversation.

An **internal tools builder** ships lower-risk workflows - admin panels, internal dashboards, automation scripts. The blast radius of a bug is limited and the speed advantage is real.

A **production builder** is closer to a product engineer using AI. They touch customer-facing code. They need real engineering depth - debugging, data modeling, understanding failure modes - not just the ability to prompt an AI agent. The Impiricus listing is this version: they want someone who can take "vibe-coded" prototypes and turn them into production-grade systems.

All three are real. But the expectations, the review standards, and the failure modes are different for each. A company hiring for version three and getting version one will have problems.

For production builders, the question everyone will ask is: **who owns the code after merge? Who gets paged?** The answer has to be that builders operate inside the engineering system - same CI, same tests, same review, same on-call expectations. If they can't meet that bar, they produce prototypes that engineering owns before production. There's no third path where "AI made it" substitutes for ownership.

The obvious objection: doesn't this recreate the handoff in reverse? I think a working prototype is a better artifact to hand off than a spec document. An engineer reviewing a builder's PR can see what it does, run it, test it. They're reviewing a concrete thing, not interpreting an abstract one. But the builder only saves time if the artifact is small, scoped, and test-backed. A 3,000-line AI PR isn't a better spec - it's technical debt with screenshots.

Getting this right will take real investment. Companies need the constraints I've [written about before](https://benshoemaker.us/writing/in-defense-of-not-reading-the-code) - specs with requirement traceability, layered verification, automated testing gates. They also need to figure out how builders and engineers actually collaborate day-to-day. Companies that hire builders without doing that work will learn the hard way. Some already have.

## The Bet

I've been living this role for the past year. I built [Vibe Scaffold](https://vibescaffold.dev) - an AI spec generator that got 4,000+ users. I built the full stack for a PropTech startup from scratch. I built [a CLI for finding and reviewing AI builder jobs](https://github.com/benjaminshoemaker/jobs_ai_builder). Not because I couldn't find a PM job or an engineering job, but because the most interesting work sits at the intersection. I've been a PM because I cared what got built, but building it myself was inefficient - now it's not. I feel unlocked.

I don't know whether the dominant title will be Product Builder, AI Builder, Product Engineer, or something else. But I'm confident the capability is real and durable: people who can identify the right thing to build, make it tangible quickly, and know where prototype ends and engineering begins. The companies hiring for that capability today are early, not wrong.

If you're a PM who's been experimenting with Cursor, or an engineer who's tired of building someone else's vision, or a hiring manager wondering what to call the role you actually need - the listings are already out there. Go look.

[^1]: Moe Ali ([@ProductFaculty](https://x.com/ProductFaculty/status/2040094285706711285)), who trains 3,200+ AI-native PMs, documented CPO-level hiring for Product Builder roles at Apollo, Superhuman, and Anthropic.
[^2]: Lightrun, [2026 State of AI-Powered Engineering Report](https://lightrun.com/state-of-ai-powered-engineering-2026/).
