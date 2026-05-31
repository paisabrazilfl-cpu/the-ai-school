# 24 — Prompt Templates

> WEB VERIFICATION NOT AVAILABLE IN THIS RUN.
> Platform-specific claims tagged: VERIFIED_LOCAL / VERIFIED_DOCS / USER_PROVIDED_UNVERIFIED / CUSTOM_WORKFLOW / LIKELY_NATIVE_UNVERIFIED / UNKNOWN / DEPRECATED.
> Never request hidden chain-of-thought. Use "reasoning summary."

---

## 1. Purpose

A copy-paste-ready library of 40+ operator-grade prompts. Every template follows the same structure:

```
ROLE:
OBJECTIVE:
CONTEXT:
CONSTRAINTS:
OUTPUT:
```

Fill the bracketed `[ ... ]` slots and run. Each template is plug-and-play; you should not need to rewrite the scaffolding.

---

## 2. Who It Is For

| Reader            | Use the templates to...                                                  |
|-------------------|--------------------------------------------------------------------------|
| Beginner          | Skip the cold-start problem; learn by filling slots.                     |
| Operator          | Standardize daily workflows.                                             |
| Engineer          | Drop into CI scripts and agent prompts.                                  |
| Researcher        | Enforce citation discipline.                                             |
| Writer            | Maintain voice across documents.                                         |
| Business owner    | Run strategy, GTM, OKRs through a repeatable shape.                      |

---

## 3. Beginner Explanation

A prompt template is a fill-in-the-blank form. You do not invent the structure each time; you reuse the structure that works and only vary the content. This is how professionals work in every other field — checklists, SOPs, runbooks — and AI is no different.

When you start, copy the template verbatim, replace the brackets, and run. After 10-20 runs, you will know which slots matter most for your context, and you can shorten.

---

## 4. Operator Explanation

Templates are versioned artifacts. Treat them like code:

- Store in a `prompts/` directory.
- One file per template; include front-matter (use case, model, owner, version, date).
- Track changes in a `CHANGELOG.md`.
- Run them through an eval harness when models change.
- Retire deprecated templates with a tombstone, not deletion.

A template is "good" when:

- It produces a usable first draft >= 80% of the time.
- Its refinements are short (one or two meta-commands).
- A new operator can run it without training.

---

## 5. Core Concepts — Universal Structure

```
ROLE: You are a [specific expert] with [credentials / experience].
OBJECTIVE: Produce [exact deliverable] for [audience].
CONTEXT: [facts, files, links, prior decisions, constraints from the real world].
CONSTRAINTS: [length, tone, must-include, must-exclude, citations, format, deadlines].
OUTPUT: [exact shape: headings, JSON schema, table columns, file format].
```

Optional add-ons:

- `EXAMPLES:` 1-3 reference samples (few-shot).
- `REASONING SUMMARY:` end with a 3-5 line summary of approach (never request hidden chain-of-thought).
- `REFUSAL TRIGGERS:` if X is true, refuse and explain.

---

## 6. Workflow — How to Use This Library

```
1. Find the template closest to your task (use the index in Section 7).
2. Copy it into your chat or editor.
3. Replace every [bracket] with concrete content.
4. Remove or shorten any constraint that does not apply.
5. Run.
6. If output is weak, apply one Meta refinement command (Section 8.9).
7. Save the populated version to your prompt library with a date.
```

---

## 7. Cheat Sheet — Template Index

| #  | Category   | Template                                  |
|----|-----------|--------------------------------------------|
| 1  | Research  | Current events                             |
| 2  | Research  | Legal                                      |
| 3  | Research  | Scientific                                 |
| 4  | Research  | Market                                     |
| 5  | Research  | Competitor                                 |
| 6  | Research  | Product                                    |
| 7  | Research  | Medical (with disclaimer)                  |
| 8  | Research  | Financial (with disclaimer)                |
| 9  | Coding    | Bug fix                                    |
| 10 | Coding    | Feature build                              |
| 11 | Coding    | Refactor                                   |
| 12 | Coding    | Test generation                            |
| 13 | Coding    | Security audit                             |
| 14 | Coding    | Migration                                  |
| 15 | Coding    | Performance                                |
| 16 | Writing   | Email                                      |
| 17 | Writing   | Resume                                     |
| 18 | Writing   | Cover letter                               |
| 19 | Writing   | Report                                     |
| 20 | Writing   | SOP                                        |
| 21 | Writing   | Proposal                                   |
| 22 | Writing   | Social post                                |
| 23 | Writing   | Blog post                                  |
| 24 | Writing   | Script                                     |
| 25 | Business  | GTM plan                                   |
| 26 | Business  | Pricing model                              |
| 27 | Business  | Persona                                    |
| 28 | Business  | Competitive moat                           |
| 29 | Business  | OKRs                                       |
| 30 | Business  | Board update                               |
| 31 | Data      | EDA                                        |
| 32 | Data      | SQL from English                           |
| 33 | Data      | Anomaly detection                          |
| 34 | Data      | Dashboard spec                             |
| 35 | Automation| n8n flow spec                              |
| 36 | Automation| Zapier flow spec                           |
| 37 | Automation| Approval gate spec                         |
| 38 | Agents    | Planner                                    |
| 39 | Agents    | Executor                                   |
| 40 | Agents    | Validator                                  |
| 41 | Agents    | Audit logger                               |
| 42 | Creative  | Image                                      |
| 43 | Creative  | Video                                      |
| 44 | Creative  | Voice                                      |
| 45 | Creative  | Music                                      |
| 46 | Creative  | Brand consistency                          |
| 47 | Meta      | Refinement commands                        |

---

## 8. Examples — The Templates

### 8.1 Research

#### 1. Current events

```
ROLE: You are a research analyst trained in news triage and source verification.
OBJECTIVE: Summarize the current state of [topic] as of [date].
CONTEXT: Audience is [audience]. Geography: [region]. Time window: last [N] days.
CONSTRAINTS:
- Use only reputable sources (major newswires, government, peer-reviewed).
- Every factual claim must have an inline citation [n] and a final numbered source list.
- Flag any claim where reputable sources disagree.
- Tag uncertain facts UNKNOWN.
- Do not speculate beyond the cited material.
OUTPUT:
1. 5-sentence executive summary.
2. Timeline (markdown table: Date | Event | Source [n]).
3. Open questions (bulleted).
4. Sources (numbered list with URLs and access date).
5. Reasoning summary (3 lines).
```

#### 2. Legal

```
ROLE: You are a paralegal-level research assistant. You are not a lawyer.
OBJECTIVE: Summarize the law on [topic] in [jurisdiction] as of [date].
CONTEXT: User is a non-lawyer trying to understand [specific situation]. This is not legal advice.
CONSTRAINTS:
- Cite statutes, regulations, and leading cases by full citation.
- Distinguish black-letter law from interpretation.
- Note the date of each authority and warn if outdated.
- Add the disclaimer: "This is general information, not legal advice. Consult a licensed attorney in [jurisdiction] before acting."
OUTPUT:
1. Plain-English summary (under 300 words).
2. Primary authorities (table: Citation | Holding | Date).
3. Open questions / disputed points.
4. Recommended next steps (consult attorney, gather documents, etc.).
5. Reasoning summary.
```

#### 3. Scientific

```
ROLE: You are a research scientist trained to read primary literature critically.
OBJECTIVE: Summarize the current scientific consensus on [topic].
CONTEXT: Audience is [layperson / undergraduate / domain expert]. Time horizon: last [N] years.
CONSTRAINTS:
- Cite peer-reviewed sources only.
- Distinguish consensus, majority view, minority view, and fringe.
- Note effect sizes and study limitations.
- Flag where the literature is thin.
OUTPUT:
1. One-paragraph consensus statement.
2. Evidence table (Study | Year | Design | N | Effect size | Citation).
3. Limitations and unknowns.
4. Numbered source list.
5. Reasoning summary.
```

#### 4. Market

```
ROLE: You are a market analyst with experience in [industry].
OBJECTIVE: Produce a market overview for [product category] in [region].
CONTEXT: Use case is [strategic planning / fundraising / due diligence].
CONSTRAINTS:
- Include TAM, SAM, SOM with stated assumptions.
- Cite the source of every number.
- Tag any estimate UNKNOWN if a source is not available.
- Note growth rate range, not a single number.
OUTPUT:
1. Market size (table: Metric | Value | Source | Year).
2. Segmentation (by customer type, region, price tier).
3. Growth drivers and risks.
4. Top 5 players (table: Name | Position | Differentiator).
5. Reasoning summary.
```

#### 5. Competitor

```
ROLE: You are a competitive intelligence analyst.
OBJECTIVE: Build a competitor profile of [company].
CONTEXT: We compete with them on [axes]. Our position is [our position].
CONSTRAINTS:
- Use only public sources (website, filings, press, job ads).
- Note source freshness on every claim.
- Tag any inferred claim INFERRED.
OUTPUT:
1. One-page profile: business model, ICP, pricing (if public), GTM.
2. SWOT relative to us.
3. Likely 12-month moves.
4. Counter-strategies for us.
5. Sources and reasoning summary.
```

#### 6. Product

```
ROLE: You are a senior product manager.
OBJECTIVE: Evaluate [product] against [job-to-be-done] for [user segment].
CONTEXT: Constraints: [budget, ecosystem, integrations].
CONSTRAINTS:
- Score against a fixed rubric (functionality, reliability, cost, support, ecosystem).
- Cite the rubric source.
- Distinguish vendor claims from third-party evidence.
OUTPUT:
1. Rubric scores (table: Dimension | Score 1-5 | Evidence | Source).
2. Top 3 strengths and weaknesses.
3. Fit verdict for our use case.
4. Open questions for vendor or trial.
5. Reasoning summary.
```

#### 7. Medical (with disclaimer)

```
ROLE: You are a medical information assistant. You are not a physician.
OBJECTIVE: Explain the current understanding of [condition / treatment / drug interaction].
CONTEXT: Audience is a non-clinician seeking general education, not diagnosis.
CONSTRAINTS:
- Cite peer-reviewed sources, major guidelines (WHO, CDC, NICE, NEJM, etc.).
- Always include: "This is general information and not medical advice. Consult a licensed clinician for personal medical decisions."
- Flag emergency symptoms with a clear "Seek emergency care now if..." block.
- Note where evidence is weak or contested.
OUTPUT:
1. Disclaimer block.
2. Plain-English explanation (under 300 words).
3. Evidence table (Source | Year | Strength of evidence).
4. Red flags / when to seek care.
5. Reasoning summary.
```

#### 8. Financial (with disclaimer)

```
ROLE: You are a financial research assistant. You are not a financial advisor.
OBJECTIVE: Summarize [instrument / strategy / concept] for an informed retail investor.
CONTEXT: Audience situation: [age, risk tolerance, goal] (if provided; otherwise general).
CONSTRAINTS:
- Include: "This is general information and not financial advice. Consult a licensed fiduciary advisor before acting."
- Use sourced, dated data only.
- Show calculations explicitly when relevant.
- Note tax considerations as general; not personal tax advice.
OUTPUT:
1. Disclaimer.
2. Mechanism explanation.
3. Risks and edge cases.
4. Historical context with sources.
5. Reasoning summary.
```

---

### 8.2 Coding

#### 9. Bug fix

```
ROLE: You are a senior [language] engineer.
OBJECTIVE: Diagnose and fix the bug described below.
CONTEXT:
- Repo / file: [path].
- Error / behavior: [stack trace or description].
- Reproduction steps: [steps].
- Recent changes: [diff or commit hash].
CONSTRAINTS:
- Minimal diff; no unrelated changes.
- Preserve public API.
- Add or update tests that fail without the fix and pass with it.
- Reasoning summary at the end (3-5 lines).
OUTPUT:
1. Root cause (one paragraph).
2. Patch (unified diff).
3. New / updated tests.
4. Risk notes (regressions, side effects).
5. Reasoning summary.
```

#### 10. Feature build

```
ROLE: You are a senior [language] engineer.
OBJECTIVE: Implement feature [name] per the spec below.
CONTEXT:
- Spec: [paste].
- Codebase conventions: [linter, style, testing framework].
- Dependencies allowed: [list]. Forbidden: [list].
CONSTRAINTS:
- Test-first: produce tests, then implementation.
- All public functions have docstrings.
- No TODOs left behind.
OUTPUT:
1. File-by-file plan.
2. Tests (full file).
3. Implementation (full files).
4. How to run.
5. Reasoning summary.
```

#### 11. Refactor

```
ROLE: You are a senior [language] engineer focused on maintainability.
OBJECTIVE: Refactor [file / module] to [goal: reduce coupling / improve naming / extract module].
CONTEXT: Existing tests: [path]. Public API must not change.
CONSTRAINTS:
- All existing tests must still pass.
- No behavior changes.
- Each commit-sized step is independently safe.
OUTPUT:
1. Step list (numbered, small).
2. Diff for each step.
3. Verification commands.
4. Reasoning summary.
```

#### 12. Test generation

```
ROLE: You are a test engineer.
OBJECTIVE: Generate tests for [function / module].
CONTEXT: Source: [paste]. Framework: [pytest / jest / etc.]. Coverage target: [N]%.
CONSTRAINTS:
- Cover happy path, edge cases, error cases, and at least 2 adversarial inputs.
- No flakiness; no time-dependent assertions.
- Each test asserts one thing.
OUTPUT:
1. Test file (full).
2. Coverage notes (which branches are still uncovered and why).
3. Reasoning summary.
```

#### 13. Security audit

```
ROLE: You are an application security engineer.
OBJECTIVE: Audit the code below for security defects.
CONTEXT: Language: [lang]. Threat model: [public-facing API / internal tool / mobile].
CONSTRAINTS:
- Map findings to OWASP categories where applicable.
- Severity: critical / high / medium / low with rationale.
- Suggest concrete remediations with code.
OUTPUT:
1. Findings table (ID | Severity | Category | Location | Description | Remediation).
2. Top 3 fixes to do first.
3. Residual risks.
4. Reasoning summary.
```

#### 14. Migration

```
ROLE: You are a migration engineer.
OBJECTIVE: Migrate [system / library / version] from [source] to [target].
CONTEXT: Codebase size: [LOC]. Test coverage: [%]. Risk tolerance: [low/med/high].
CONSTRAINTS:
- Phased plan; each phase independently revertible.
- Compatibility shims allowed during transition.
- All tests pass at each phase.
OUTPUT:
1. Phase plan (table).
2. Step-by-step changes for phase 1.
3. Rollback plan.
4. Reasoning summary.
```

#### 15. Performance

```
ROLE: You are a performance engineer.
OBJECTIVE: Improve [metric: latency / throughput / memory] for [endpoint / function] by [target].
CONTEXT: Current numbers: [paste]. Profile: [paste]. Constraints: [no infra changes / no API changes].
CONSTRAINTS:
- Hypothesis-driven: list hypotheses; rank by expected impact.
- Measure before / after for every change.
- No micro-optimizations without a profile.
OUTPUT:
1. Hypotheses (table: Hypothesis | Expected impact | Risk).
2. Top 3 changes with patches.
3. Measurement plan.
4. Reasoning summary.
```

---

### 8.3 Writing

#### 16. Email

```
ROLE: You are a [B2B copywriter / executive assistant / sales rep] with a [warm / formal / direct] style.
OBJECTIVE: Draft an email to [recipient role] about [topic / ask].
CONTEXT: Relationship: [cold / warm / existing]. Prior thread: [paste or none]. Goal: [meeting / decision / info].
CONSTRAINTS:
- Under [N] words.
- One specific ask. One clear CTA.
- No buzzwords. No hedging openers ("I hope this finds you well").
OUTPUT:
- Subject line (under 50 chars).
- Body.
- 2 variants (A: curiosity; B: value-led).
```

#### 17. Resume

```
ROLE: You are a senior technical recruiter for [industry / role].
OBJECTIVE: Rewrite the resume below for the target role [title].
CONTEXT: Target JD: [paste]. Candidate background: [paste resume].
CONSTRAINTS:
- One page. Reverse chronological.
- Bullets start with strong verbs and include measurable impact.
- No clichés ("results-driven", "team player").
- Tailor each bullet to the JD keywords without keyword stuffing.
OUTPUT:
1. Summary (3 lines).
2. Experience (per role: 3-5 bullets).
3. Education and skills.
4. ATS keyword coverage note.
```

#### 18. Cover letter

```
ROLE: You are a hiring-side writer who reads 500 cover letters a week.
OBJECTIVE: Draft a cover letter for [company / role].
CONTEXT: JD: [paste]. Resume: [paste]. Why this company specifically: [one true reason].
CONSTRAINTS:
- Under 300 words.
- Open with a hook tied to the company, not the candidate.
- Show, do not tell: cite one measurable result.
- No template phrases.
OUTPUT:
- Final letter.
- 3-sentence rationale for the structure.
```

#### 19. Report

```
ROLE: You are an analyst writing for [audience: exec / technical / customer].
OBJECTIVE: Produce a [length] report on [topic].
CONTEXT: Inputs: [data, links, prior reports]. Decisions required: [list].
CONSTRAINTS:
- Pyramid principle: conclusion first.
- Every claim sourced or tagged.
- Headings are sentences, not labels.
OUTPUT:
1. Executive summary (5 bullets).
2. Findings (sections).
3. Recommendations (numbered, with owners and dates).
4. Appendix (data, sources).
5. Reasoning summary.
```

#### 20. SOP

```
ROLE: You are an operations lead writing SOPs for a new hire.
OBJECTIVE: Write a step-by-step SOP for [process].
CONTEXT: Tools used: [list]. Failure modes: [list]. Audit needs: [list].
CONSTRAINTS:
- Steps are imperative, atomic, testable.
- Each step lists: who, what, where, expected output.
- Include rollback steps.
OUTPUT:
1. Purpose.
2. Preconditions.
3. Steps (numbered).
4. Verification.
5. Rollback.
6. Owner and review cadence.
```

#### 21. Proposal

```
ROLE: You are a senior consultant writing a proposal.
OBJECTIVE: Propose [scope] to [client] for [outcome].
CONTEXT: Their problem: [paste]. Budget range: [range]. Timeline: [dates].
CONSTRAINTS:
- Lead with their problem, not our credentials.
- Concrete deliverables with dates.
- Pricing with assumptions.
- No vague phases.
OUTPUT:
1. Problem statement (in their words).
2. Proposed solution.
3. Deliverables and milestones (table).
4. Pricing.
5. Risks and mitigations.
6. Next step.
```

#### 22. Social post

```
ROLE: You are a social-first writer for [platform].
OBJECTIVE: Post about [topic] aimed at [audience].
CONTEXT: Brand voice: [paste reference posts]. Goal: [engagement / sign-ups / awareness].
CONSTRAINTS:
- Platform-appropriate length.
- First line must hook in under 8 words.
- No emojis (unless brand voice uses them).
- One link max.
OUTPUT:
- 3 post variants (A: story; B: data; C: contrarian).
- For each: predicted strength and weakness.
```

#### 23. Blog post

```
ROLE: You are a senior content writer specializing in [domain].
OBJECTIVE: Draft a blog post on [topic] for [audience].
CONTEXT: Search intent: [informational / commercial / navigational]. Target length: [N] words.
CONSTRAINTS:
- One thesis. Argue it.
- Original examples; no clichés.
- Subheads are sentences.
- Cite sources.
OUTPUT:
1. Title options (5).
2. Outline.
3. Full draft.
4. Meta description (under 160 chars).
5. Reasoning summary.
```

#### 24. Script

```
ROLE: You are a scriptwriter for [format: explainer / interview / ad].
OBJECTIVE: Write a [N]-second / [N]-minute script on [topic].
CONTEXT: Audience: [paste]. Voice: [paste sample lines]. CTA: [exact action].
CONSTRAINTS:
- Spoken word, not written prose.
- One idea per beat.
- Stage directions in [brackets].
OUTPUT:
1. Cold open (max 8 seconds).
2. Body beats (timestamped).
3. CTA.
4. B-roll / visual notes.
```

---

### 8.4 Business

#### 25. GTM plan

```
ROLE: You are a GTM lead with experience launching [category] products.
OBJECTIVE: Build a 90-day GTM plan for [product].
CONTEXT: ICP: [paste]. Pricing: [paste]. Team: [size]. Budget: [amount].
CONSTRAINTS:
- Channels prioritized by expected CAC and time-to-first-customer.
- Each channel has a 30-day experiment with success criteria.
- Concrete weekly milestones.
OUTPUT:
1. Positioning statement.
2. Channels (table: Channel | Hypothesis | Experiment | Success metric | Owner).
3. 90-day milestone plan.
4. Risks and kill criteria.
5. Reasoning summary.
```

#### 26. Pricing model

```
ROLE: You are a pricing strategist.
OBJECTIVE: Propose a pricing model for [product] targeting [segment].
CONTEXT: Value drivers: [list]. Competitor pricing: [paste]. Margin floor: [%].
CONSTRAINTS:
- Tie price to a value metric, not seats by default.
- Show willingness-to-pay assumptions.
- Provide 3 packaging options.
OUTPUT:
1. Recommended model with rationale.
2. Tier table (Tier | Price | Inclusions | Target buyer).
3. Discount / contract policy.
4. Risks and tests.
5. Reasoning summary.
```

#### 27. Persona

```
ROLE: You are a customer research lead.
OBJECTIVE: Build a buyer persona for [segment].
CONTEXT: Existing customers: [paste interview notes or descriptions]. JTBD: [list].
CONSTRAINTS:
- Evidence-tagged: each claim cites a customer quote or data point.
- Avoid demographic-only personas; emphasize JTBD.
OUTPUT:
1. One-page persona (role, JTBD, pains, gains, buying triggers, objections, watering holes).
2. Quotes table (Quote | Source).
3. Anti-persona (who this is not).
4. Reasoning summary.
```

#### 28. Competitive moat

```
ROLE: You are a strategy consultant.
OBJECTIVE: Identify and strengthen [company]'s competitive moats.
CONTEXT: Current moats (hypothesized): [list]. Competitors: [list].
CONSTRAINTS:
- Use a recognized framework (Hamilton Helmer's 7 Powers or equivalent).
- Distinguish actual moats from claimed moats.
- Rank by durability.
OUTPUT:
1. Moat inventory (table: Moat | Type | Strength 1-5 | Evidence).
2. Top 3 moats to deepen.
3. Concrete actions per moat.
4. Reasoning summary.
```

#### 29. OKRs

```
ROLE: You are an operating partner.
OBJECTIVE: Draft OKRs for [team] for [quarter].
CONTEXT: Annual goals: [paste]. Constraints: [headcount, budget].
CONSTRAINTS:
- 3-5 Objectives. Each with 3 measurable Key Results.
- KRs are outcomes, not activities.
- Stretch but not impossible (target 60-70% confidence).
OUTPUT:
1. Objectives and KRs (table).
2. Dependencies and risks.
3. Weekly check-in format.
4. Reasoning summary.
```

#### 30. Board update

```
ROLE: You are the CEO writing a monthly board update.
OBJECTIVE: Draft this month's board update for [company].
CONTEXT: Metrics: [paste]. Wins: [list]. Misses: [list]. Asks: [list].
CONSTRAINTS:
- Lead with the asks.
- Numbers in tables, not prose.
- Misses before wins.
- Under 800 words.
OUTPUT:
1. Asks (top of page).
2. Headline metrics (table).
3. Wins (3 bullets).
4. Misses (3 bullets with diagnosis).
5. Next-month focus.
6. Appendix.
```

---

### 8.5 Data

#### 31. EDA (Exploratory Data Analysis)

```
ROLE: You are a senior data analyst.
OBJECTIVE: Produce an EDA report for the dataset described below.
CONTEXT: Schema: [paste]. Row count: [N]. Source: [path]. Domain: [paste].
CONSTRAINTS:
- Numbers must be reproducible from code you write.
- Flag missingness, outliers, and likely-bad rows.
- No conclusions without a query that produced them.
OUTPUT:
1. Summary stats (table per column).
2. Missingness map.
3. Outlier list.
4. 5 hypotheses worth testing.
5. The exact SQL / Python used.
6. Reasoning summary.
```

#### 32. SQL from English

```
ROLE: You are a senior analytics engineer.
OBJECTIVE: Convert the question below into safe, performant SQL on the schema given.
CONTEXT: Schema: [paste DDL]. Dialect: [postgres / bigquery / etc.]. Question: [paste].
CONSTRAINTS:
- Read-only.
- Use CTEs for readability.
- Add comments explaining each CTE.
- Show expected row count or shape.
OUTPUT:
1. The SQL.
2. Explanation per CTE.
3. EXPLAIN considerations.
4. Edge cases the query may miss.
5. Reasoning summary.
```

#### 33. Anomaly detection

```
ROLE: You are a data quality engineer.
OBJECTIVE: Define anomaly checks for [table / metric].
CONTEXT: Normal ranges: [paste]. Known incidents: [paste].
CONSTRAINTS:
- Each check has: definition, threshold, severity, action.
- Avoid alert fatigue: tier critical vs warning.
- Include freshness checks.
OUTPUT:
1. Check catalog (table: Name | Definition | Threshold | Severity | Action).
2. Implementation hints (SQL or pseudo-code).
3. Runbook entries per critical alert.
4. Reasoning summary.
```

#### 34. Dashboard spec

```
ROLE: You are a BI lead.
OBJECTIVE: Spec a dashboard for [audience] answering [questions].
CONTEXT: Data sources: [list]. Refresh cadence: [interval]. Decisions made from it: [list].
CONSTRAINTS:
- One question per chart.
- Title chart by the answer, not the metric.
- Default time range and filters chosen for the audience.
OUTPUT:
1. Layout sketch (ASCII).
2. Chart spec table (Chart | Question | Type | Filters | Source).
3. Drill-downs.
4. Acceptance criteria.
5. Reasoning summary.
```

---

### 8.6 Automation

> Workflow-tool feature claims (n8n, Zapier, Make) below are USER_PROVIDED_UNVERIFIED unless your build has confirmed them.

#### 35. n8n flow spec

```
ROLE: You are an automation engineer specializing in n8n. [USER_PROVIDED_UNVERIFIED]
OBJECTIVE: Spec an n8n workflow that [goal].
CONTEXT: Trigger: [event]. Inputs: [shape]. Outputs: [shape]. Error policy: [retry/alert].
CONSTRAINTS:
- Node-by-node spec; no skipped steps.
- Idempotent where possible.
- Logs every node's input/output to a sink.
- Secrets via n8n credentials, not inline.
OUTPUT:
1. Node list (table: # | Node | Purpose | Inputs | Outputs).
2. Branch / error paths.
3. Logging schema.
4. Test plan (3 happy, 2 failure cases).
5. Reasoning summary.
```

#### 36. Zapier flow spec

```
ROLE: You are a Zapier solutions architect. [USER_PROVIDED_UNVERIFIED]
OBJECTIVE: Design a Zap that [goal].
CONTEXT: Trigger app: [app]. Action apps: [list]. Volume: [N/day]. SLAs: [latency, reliability].
CONSTRAINTS:
- Use built-in steps before Code steps.
- Add filter steps to avoid wasted tasks.
- Use Paths instead of branching Zaps where possible.
- Document task usage estimate.
OUTPUT:
1. Step list (Trigger -> Filter -> Path A/B -> Action -> ...).
2. Filter conditions.
3. Task usage estimate.
4. Test plan.
5. Reasoning summary.
```

#### 37. Approval gate spec

```
ROLE: You are a workflow designer.
OBJECTIVE: Add a human-in-the-loop approval gate to [workflow].
CONTEXT: Irreversible actions: [list]. Approvers: [roles]. SLA: [time].
CONSTRAINTS:
- No irreversible action without approval recorded.
- Approval payload includes: action summary, inputs, expected outputs, blast radius.
- Timeout policy if approver does not respond.
- Audit log includes approver identity and decision time.
OUTPUT:
1. Sequence diagram (ASCII).
2. Approval payload schema (JSON).
3. Timeout and escalation rules.
4. Audit log schema.
5. Reasoning summary.
```

---

### 8.7 Agents

#### 38. Planner

```
ROLE: You are the planner module of a multi-agent system.
OBJECTIVE: Decompose the user task into a numbered plan of atomic, verifiable steps.
CONTEXT: Task: [paste]. Tools available: [list with signatures]. Constraints: [list].
CONSTRAINTS:
- Each step has: goal, tool, inputs, expected output, success criterion.
- No step exceeds one tool call.
- Include a verification step after each action.
- Stop and ask if information is missing.
OUTPUT:
JSON:
{
  "plan": [
    {"id": 1, "goal": "...", "tool": "...", "inputs": {...}, "expected_output": "...", "success_criterion": "..."}
  ],
  "open_questions": [...],
  "reasoning_summary": "..."
}
```

#### 39. Executor

```
ROLE: You are the executor module of a multi-agent system.
OBJECTIVE: Execute step [id] from the plan and return a structured result.
CONTEXT: Plan: [paste]. Current step: [id]. Tool results so far: [paste]. Permissions: [list].
CONSTRAINTS:
- Only use the tool specified in the step.
- Do not improvise new steps.
- If the tool errors, return the error verbatim and stop.
- If the action is irreversible, request approval before proceeding.
OUTPUT:
JSON:
{
  "step_id": ...,
  "tool_called": "...",
  "inputs_sent": {...},
  "raw_output": "...",
  "interpreted_result": "...",
  "status": "ok | error | needs_approval",
  "reasoning_summary": "..."
}
```

#### 40. Validator

```
ROLE: You are the validator module of a multi-agent system.
OBJECTIVE: Check that step [id]'s result meets its success criterion.
CONTEXT: Step spec: [paste]. Executor output: [paste]. External facts to check against: [paste].
CONSTRAINTS:
- Pass / fail must be objective and reproducible.
- If fail, give a precise diagnosis and a proposed fix.
- Do not rewrite the plan; only validate.
OUTPUT:
JSON:
{
  "step_id": ...,
  "verdict": "pass | fail",
  "evidence": "...",
  "diagnosis_if_fail": "...",
  "proposed_fix": "...",
  "reasoning_summary": "..."
}
```

#### 41. Audit logger

```
ROLE: You are the audit logger of a multi-agent system.
OBJECTIVE: Emit a structured audit record for the action just taken.
CONTEXT: Step: [paste]. Inputs: [paste]. Outputs: [paste]. Approver (if any): [identity].
CONSTRAINTS:
- Deterministic schema; no free-text fields.
- Hash inputs and outputs (sha256) to protect PII.
- Include model name, model version, prompt template id, prompt version, and run id.
OUTPUT:
JSON:
{
  "run_id": "...",
  "step_id": ...,
  "timestamp": "...",
  "model": "...",
  "model_version": "...",
  "prompt_template_id": "...",
  "prompt_version": "...",
  "tool": "...",
  "input_hash": "...",
  "output_hash": "...",
  "approver": "...",
  "latency_ms": ...,
  "cost_estimate": ...,
  "status": "ok | error | needs_approval"
}
```

---

### 8.8 Creative

> Specific platform features (negative prompts, seeds, image-to-video, voice cloning) vary by tool; tag accordingly when invoking.

#### 42. Image

```
ROLE: You are an art director.
OBJECTIVE: Generate a [type: hero / social / product] image of [subject].
CONTEXT: Brand style: [paste references]. Use case: [paste].
CONSTRAINTS:
- Composition: [rule of thirds / centered / asymmetric].
- Palette: [hex list].
- Lighting: [paste].
- Camera: [lens, angle, depth of field].
- Negative prompt: [things to exclude]. [LIKELY_NATIVE_UNVERIFIED]
- Seed: [integer if reproducibility matters]. [LIKELY_NATIVE_UNVERIFIED]
OUTPUT:
1. Primary prompt.
2. 3 variant prompts (style A/B/C).
3. Suggested aspect ratios.
4. Post-processing notes.
```

#### 43. Video

```
ROLE: You are a video director.
OBJECTIVE: Generate a [N]-second clip of [scene].
CONTEXT: Style: [paste references]. Motion: [camera move, subject action].
CONSTRAINTS:
- Single scene; one camera move.
- No text overlays unless specified.
- Aspect ratio: [16:9 / 9:16 / 1:1].
- Source: [text-to-video / image-to-video]. [LIKELY_NATIVE_UNVERIFIED]
OUTPUT:
1. Shot list (table: Beat | Action | Camera | Duration).
2. Generation prompt.
3. Variant prompts.
4. Stitching plan if multi-shot.
```

#### 44. Voice

```
ROLE: You are a voice director.
OBJECTIVE: Produce a voiceover of [length] for [script].
CONTEXT: Voice persona: [age, accent, pace, energy]. Use case: [ad / explainer / narration].
CONSTRAINTS:
- Pace: [WPM].
- Emphasis marked with **bold**.
- Pauses marked with [pause: 0.5s].
- No mispronunciations on names: [phonetic spellings].
- Consent: confirm rights to clone any reference voice. [USER_PROVIDED_UNVERIFIED]
OUTPUT:
1. Annotated script.
2. Voice settings (model, stability, similarity, style).
3. Two takes (A: warmer; B: tighter).
```

#### 45. Music

```
ROLE: You are a composer.
OBJECTIVE: Produce a [length] track for [use case].
CONTEXT: Mood: [paste references]. Tempo: [BPM]. Key: [paste]. Instrumentation: [list].
CONSTRAINTS:
- No vocal stems unless specified.
- Loopable: [yes/no].
- Dynamic arc: [intro -> build -> climax -> outro].
- License: royalty-free for [scope]. [USER_PROVIDED_UNVERIFIED]
OUTPUT:
1. Generation prompt.
2. 3 variant prompts.
3. Stem requests (drums, bass, melody, pads).
4. Mix notes.
```

#### 46. Brand consistency

```
ROLE: You are a brand guardian.
OBJECTIVE: Enforce visual / verbal consistency across [N] assets.
CONTEXT: Brand guide: [paste]. Asset list: [list].
CONSTRAINTS:
- Same palette, type system, photographic style, voice across all assets.
- Asset-level overrides documented.
- Reject any asset that violates the guide.
OUTPUT:
1. Consistency rubric (table: Dimension | Standard | Test).
2. Per-asset compliance check.
3. Fix list for non-compliant assets.
```

---

### 8.9 Meta — Refinement Commands

When an output is close but not right, paste one of these as your next message instead of starting over.

| # | Command name      | Paste this verbatim                                                                              |
|---|-------------------|---------------------------------------------------------------------------------------------------|
| 1 | Narrow            | "Narrow the scope to only [aspect]. Drop everything else. Keep the format."                       |
| 2 | Expand            | "Expand each section with one concrete example and one risk. Same structure."                     |
| 3 | Simplify          | "Rewrite for a smart non-expert. Replace jargon. Keep the conclusions."                           |
| 4 | Technicalize      | "Rewrite for a domain expert. Add precise terminology, equations or schemas where useful."        |
| 5 | Add citations     | "Add inline citations [n] for every factual claim. Append a numbered source list with URLs and access dates." |
| 6 | Add risks         | "Add a 'Risks and how this could be wrong' section with 5-7 numbered items."                      |
| 7 | Add examples      | "Add 3 worked examples (good, edge, failure) for the core idea."                                  |
| 8 | Compress          | "Compress to 30% of current length. Keep the structure and conclusions."                          |
| 9 | Reformat          | "Reformat as [JSON with schema / markdown table / checklist]. Keep all content."                  |
| 10| Reasoning summary | "Append a 3-5 line reasoning summary explaining your approach. Do not expose hidden chain-of-thought." |

---

## 9. Common Mistakes

| Mistake                                          | Fix                                                                       |
|--------------------------------------------------|---------------------------------------------------------------------------|
| Leaving placeholder brackets unfilled            | Search the prompt for `[` before sending.                                |
| Using a template for a task it was not built for | Pick the closest, then customize CONSTRAINTS.                            |
| Skipping the OUTPUT section                      | Always specify shape; otherwise expect prose.                            |
| Pasting secrets into CONTEXT                     | Redact before pasting; substitute placeholders.                          |
| Treating template output as final                | Treat as a first draft. Apply Meta refinements.                          |
| Never versioning your filled-in templates        | Save them with date and use case.                                        |
| Requesting hidden chain-of-thought               | Ask for a "reasoning summary" only.                                      |
| Mixing two categories in one prompt              | Run two prompts; chain them.                                             |

---

## 10. Recovery Commands

When a template-driven output goes wrong:

| Symptom                            | Recovery                                                                  |
|------------------------------------|---------------------------------------------------------------------------|
| Output ignored CONSTRAINTS         | "Re-read CONSTRAINTS. List each one and confirm compliance or fix."       |
| Output ignored OUTPUT format       | "Reformat exactly to OUTPUT spec. Do not change content."                 |
| Output is generic                  | "Replace every generic noun with a specific entity from CONTEXT."         |
| Output invented facts              | "List every factual claim. Tag each with source or 'no source available.'"|
| Output is too long / short         | Use Meta #2 or #8.                                                        |
| Output is wrong voice              | "Match the voice of the reference sample I just pasted. Do not invent."   |

---

## 11. Verification Checklist

Before treating a templated output as done:

- [ ] All bracket placeholders replaced.
- [ ] CONSTRAINTS visibly satisfied.
- [ ] OUTPUT format matches the spec exactly.
- [ ] Every factual claim has a citation or a tag.
- [ ] No PII or secrets leaked into the prompt or output.
- [ ] Reasoning summary present (3-5 lines).
- [ ] Filled-in prompt saved with date and use case.
- [ ] If code: tests run and pass.
- [ ] If agent: audit log entry produced.

---

## 12. Practice Drills

1. Pick 5 templates from different categories. Run each on a real task today.
2. For each, time how long it took to produce a usable first draft.
3. Note which CONSTRAINTS you added or removed.
4. Save the filled-in versions to `prompts/2026-XX/` with a short README.
5. After a week, identify the top-3 templates you used most. Customize them into your personal versions.
6. Replace the original CONSTRAINTS with your defaults.
7. Run an A/B: original vs your customized version on the same task. Keep the better one.
8. Build one new template for a recurring task this library does not cover.
9. Run the eval ritual: pick 5 benchmark prompts; re-run when models change; compare.
10. Share two templates with a peer; have them stress-test and report failures.

---

## 13. Summary

- 40+ plug-and-play templates across Research, Coding, Writing, Business, Data, Automation, Agents, Creative, and Meta.
- Every template uses ROLE + OBJECTIVE + CONTEXT + CONSTRAINTS + OUTPUT.
- Refine with Meta commands; do not restart.
- Version your filled-in prompts; treat them like code.
- Tag platform-specific claims. Never request hidden chain-of-thought.
- Verification is part of the template, not an afterthought.
