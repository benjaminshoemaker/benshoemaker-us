---
title: "Fivetran + dbt Merger: What It Really Means for Your Data Stack"
date: 2025-10-15
type: essay
tags: [data, analytics, vendor-lock-in]
description: "Analysis of the Fivetran and dbt Labs merger and how to maintain negotiating leverage without killing velocity."
draft: false
---

## The Consolidation Wave Nobody Saw Coming (Except Everyone Did)

Fivetran and dbt Labs are merging into a ~$600M ARR powerhouse. If you're running a modern data stack, this should get your attention – not because of the "open data infrastructure" messaging, but because of what happens when one vendor controls your path from source to transformation.

I've spent 6 years leading product for Indeed's Employer Data & Analytics organization and lived through enough vendor consolidations to recognize the pattern. Here's what's actually happening and how to keep negotiating leverage without killing velocity.

**Real talk:** If you're running Fivetran + dbt today, your combined spend is going up over the next 36 months. That's not speculation – it's how pricing power works when vendors merge. The pattern is accelerating: Databricks acquired Tabular to unify Iceberg and Delta, Snowflake launched Polaris Catalog, Microsoft keeps bundling everything into Fabric. Suite vendors raise prices through bundling and tilt roadmaps toward their own integrated experiences.

## Three Migrations That Changed How I Think About Lock-In

### AWS Migration (2020): Stability Buys You Runway

SMB Analytics launched on on-prem Hadoop where the core table was slow, costly, and unreliable. SLO attainment sat below 50%. The team isolated compute with privileged queues, pruned expensive joins, added data contracts and freshness checks. They climbed to 80%+ SLO attainment and <3% data quality issues.

That stability made the AWS migration feasible – the team had runway to plan the move rather than being forced to rebuild under pressure. Platform stability isn't a prerequisite for portability – it is portability.

### GBQ Lock-In (2023): Invisible Dependencies Compound

When executive leadership mandated a migration from Google BigQuery to AWS for cloud spend consolidation, the realistic estimate was 9-12 months minimum. The team hadn't invested in portability. Hundreds of SQL jobs used BigQuery-specific syntax. Orchestration lived in BigQuery scheduled queries, not Airflow. Materialized views couldn't port. BI dashboards were hard-coded to BigQuery auth patterns.

They'd traded velocity for lock-in, and the migration cost reflected it. Every vendor-specific feature adopted is a future tax bill. Make that trade consciously.

### Skywalker Database Migration (2024): Abstraction Layers Are Exit Insurance

The main analytics API saw QPS and costs accelerate simultaneously, creating reliability and cost risk. The team executed a vendor migration with zero customer impact: added rate limits, caching, bot protection, and custom endpoints for top customers, then lifted-and-shifted. Result: ~50% unit-cost reduction, 99.99% reliability maintained while traffic doubled.

The difference? A well-designed abstraction layer let them migrate without rewriting business logic. When you separate logic from infrastructure, switching vendors becomes "rewrite the connector" instead of "rebuild the platform."

## The Pattern Across All Three

**Business logic** (transformations, pipelines, metrics definitions) → version-controlled, portable code
**State** (data, metadata, lineage) → open formats with export mechanisms
**Vendor-specific optimizations** → isolated in a thin layer you can rewrite

Do this right and you preserve optionality. Don't, and you pay compound interest on every locked-in decision.

Even inside a suite, you can maintain leverage at key decision points:

**Table format is your exit hatch.** Store data in Apache Iceberg or Delta with UniForm enabled. Any engine that reads Iceberg can access your data – you're not re-ingesting, just changing the query layer. Quick test: can you query your production tables from Trino right now?

**Treat orchestration as your contract layer.** Use Airflow, Dagster, or Prefect -not vendor-native schedulers. If your dependencies live in Databricks Workflows or Snowflake Tasks, you can't port them.

**Keep transformation logic portable.** Write SQL that compiles to multiple engines – dbt Core with multiple adapters, or SQLGlot for transpilation. Vendor-specific syntax creates rewrite costs during migration.

## When Suites Actually Make Sense

Composable stacks aren't always the answer. Suites solve real problems for some teams.

If you're in healthcare or fintech where compliance overhead dominates your calendar, having everything in Unity Catalog or Snowflake's governance layer is valuable. If your security team takes six months to vet each vendor, consolidating makes sense. If your data team is under 10 people, you don't have the platform capacity to maintain five vendor relationships.

But here's what I've observed: most mid-market and enterprise teams overpay for convenience they don't actually need. For teams with 15+ engineers handling diverse workloads, the composable approach wins on total cost of ownership over 3+ years.

### Decision Framework: Suite vs. Composable

| Factor | Favor Suite | Favor Composable |
|--------|-------------|------------------|
| **Team maturity** | Small team (<5), limited platform engineering | Staff+ platform team, strong DevOps culture |
| **Data volume** | Moderate, predictable growth | High or unpredictable (need cost control) |
| **Workload diversity** | Mostly SQL analytics | Mix of SQL, streaming, ML, reverse ETL |
| **Regulatory environment** | Standard compliance | Custom residency, audit, or lineage needs |
| **Risk tolerance** | Can absorb 30%+ annual price increases | Need pricing predictability |

The key is knowing which decision points to keep open.

## What to Do This Quarter

Unpopular opinion: Most teams overthink portability. The right amount of lock-in isn't zero -it's just enough that you're making an active choice, not drifting into dependency. Teams that panic-migrate every time a vendor announcement drops waste more money than they save. The ones that build smart exit options sleep better and negotiate harder.

**If you're serious about maintaining flexibility, do these three things:**

### 1. Map Your True Exit Costs

Not the theoretical "we could switch" but the actual engineering hours, stakeholder retraining, and downtime risk. Which sources? Which connectors -API vs. database replication? How many dbt models with vendor-specific SQL? How many dashboards are executive-facing?

For each component, estimate swap cost. I've done this exercise five times. It's always 2-3x worse than you think.

**Example:** Salesforce ingest via Fivetran = 12 hours to rebuild in Airbyte, 2-day testing window → Low swap cost (immediate negotiating leverage). 500 dbt models with Snowflake-specific syntax = 3 weeks to refactor, 2 weeks to test → High swap cost (invest in portability before you need to migrate).

### 2. Dual-Path Your Crown Jewels

Identify the 2-3 sources that, if lost tomorrow, would halt decision-making. Stand up parallel ingest using a different tool. If primary is Fivetran, make secondary Airbyte. Run both for two weeks. Compare latency, completeness, and cost.

**Cost:** ~$200/month in compute + 8 hours/week maintenance
**Benefit:** Proof you can cut over, which creates leverage in vendor negotiations

### 3. Prove Portability With a Real Migration

Pick one non-critical source and migrate it end-to-end. Actually complete it. Measure time to complete, incident rate, stakeholder friction. Document the process.

When you walk into your next vendor conversation with evidence that you can migrate in 48 hours and a competitor benchmark showing 40% lower unit costs, you're negotiating. Without that, you're just accepting terms.

## Budget Implications: 2026 Planning

Assume 20-30% annual price increases for consolidated vendors post-merger. For composable stacks, assume 10-15%.

Build your 2026 budget with three scenarios:

1. **Base case:** Renew all vendors at 15% increase
2. **Consolidation case:** One vendor raises 40% -model swap costs vs. paying
3. **Expansion case:** Data volume grows 50% -how does per-GB pricing scale?

Walk your exec team through all three scenarios. Advocate for composable if scenarios 2 or 3 create unacceptable budget risk.

**Headcount note:** Composable stacks need more senior platform engineers (Staff+ level to design contracts and portability) but less vendor management overhead. Suites need fewer platform engineers but more vendor relationship management.

## What I'd Do If I Were You

The Fivetran+dbt merger isn't going to kill your data stack overnight. But it's a forcing function – one of many consolidation moves that collectively change the economics of how we build data platforms.

**Personal takeaway:** Teams that thrive in consolidated markets don't have perfect architecture or unlimited budgets. They maintain optionality at key decision points -table formats, orchestration, transformation logic.

You don't need to be multi-cloud or multi-warehouse to preserve leverage. You just need to prove you could be.

Map your exit costs. Dual-path your critical sources. Prove portability with a real migration. Then negotiate from strength, not desperation.
