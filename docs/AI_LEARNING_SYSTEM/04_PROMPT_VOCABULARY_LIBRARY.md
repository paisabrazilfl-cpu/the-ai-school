# 04 - Prompt Vocabulary Library

> Verification tags used in this document: VERIFIED_LOCAL, VERIFIED_DOCS, USER_PROVIDED_UNVERIFIED, CUSTOM_WORKFLOW, LIKELY_NATIVE_UNVERIFIED, UNKNOWN, DEPRECATED.
> WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

---

## 1. Purpose

Give the operator a controlled vocabulary that forces specific model behaviors. Each word or phrase in this library is a lever: insert it and the output changes in a predictable direction. The library is organized into ten categories. Each category includes at least ten entries and a stacking pattern that combines three to five entries in a single prompt.

This file is the lexical companion to file 03 (formula) and feeds file 05 (format) and file 06 (hallucination control).

---

## 2. Who It Is For

| Reader | Use This Document To |
|---|---|
| Beginner | Memorize 2-3 words per category. |
| Intermediate | Build a personal stack template. |
| Operator | Compose precise prompts on the fly. |
| Builder | Bake high-leverage words into system prompts. |

---

## 3. Beginner Explanation

Words are dials. "Summarize" is a different dial from "compress without loss of decisions." "List risks" is a different dial from "enumerate failure modes ranked by likelihood and impact." Better words produce better outputs without longer prompts.

---

## 4. Operator Explanation

The right verb collapses the model's output distribution to a narrower, more useful subset. Vague verbs ("discuss", "explore", "consider") expand the distribution. Operator vocabulary chooses verbs that constrain.

Rule: never request hidden chain-of-thought. Use "reasoning summary" or "decision rationale" instead.

---

## 5. Core Concepts

A high-leverage prompt word does three things at once:

1. Picks an epistemic stance (fact vs inference vs opinion).
2. Picks a shape (list, ranking, matrix, decision).
3. Picks a depth (surface, mechanism, root cause).

Stacking three to five such words composes a precise instruction.

---

## 6. Workflow

```
ASCII WORKFLOW

[Draft objective]
      |
      v
[Pick one Truth-Discipline word]----> controls epistemics
      |
      v
[Pick one Depth-Control word]-------> controls how deep
      |
      v
[Pick one Scope-Control word]-------> controls breadth
      |
      v
[Pick one Structure-Control word]---> controls shape
      |
      v
[Pick one category-specific word]---> Business / Tech / Research / etc.
      |
      v
[Compose prompt and send]
```

CUSTOM_WORKFLOW.

---

## 7. Cheat Sheet

```
TRUTH:     distinguish | cite | mark unknowns | refuse if | state assumptions
DEPTH:     first principles | root cause | mechanism | second-order | five whys
SCOPE:     narrow to | exclude | constrain to | jurisdiction | timebox
STRUCTURE: table | JSON | ranked list | decision matrix | risk matrix | SOP
BUSINESS:  pricing power | unit economics | moat | TAM/SAM/SOM | NRR | CAC payback
TECH:      failure mode | invariant | complexity | concurrency | observability
RESEARCH:  primary source | replication status | sample size | effect size | confound
STRATEGY:  expected value | optionality | reversibility | dominant strategy | regret
FAILURE:   pre-mortem | red team | adversarial | stress test | tripwire
CREATIVE:  voice | constraint | reference | anti-reference | rhythm
```

---

## 8. Examples

The category tables below are themselves the examples; each row includes an "Example Prompt Use" column.

### 8.1 Truth Discipline

| Category | Word / Phrase | What It Forces | Example Prompt Use |
|---|---|---|---|
| Truth | "Distinguish fact, inference, and opinion" | Tags every claim by epistemic status. | "Distinguish fact, inference, and opinion for every bullet." |
| Truth | "Cite primary sources only" | Excludes blogs, summaries, AI outputs. | "Cite primary sources only - statutes, peer-reviewed studies, or first-party docs." |
| Truth | "Mark UNKNOWN if you cannot verify" | Suppresses confident fabrications. | "If a number cannot be verified from supplied sources, mark UNKNOWN." |
| Truth | "Refuse to answer if confidence < 70%" | Forces explicit abstention. | "If confidence is under 70%, write UNKNOWN instead of guessing." |
| Truth | "State assumptions before answering" | Surfaces hidden context. | "Before the answer, list every assumption you are making." |
| Truth | "Flag stale data" | Surfaces freshness risk. | "Flag any claim that depends on data more recent than your training cutoff." |
| Truth | "Current as of [date]" | Pins time. | "Treat all facts as current as of 2024-12-31; flag anything time-sensitive." |
| Truth | "No fabricated citations" | Targets a common failure mode. | "Do not invent citations. If you do not know the source, write UNKNOWN." |
| Truth | "Cross-check with [source]" | Forces verification step. | "Cross-check every figure against the supplied 10-K excerpt." |
| Truth | "Disclose uncertainty range" | Forces interval rather than point estimate. | "For every estimate, give a low-mid-high range and the assumption behind each." |
| Truth | "Separate model knowledge from supplied source" | Forces grounding. | "Separate what is in the supplied document from what is your prior knowledge." |
| Truth | "Reasoning summary, not internal steps" | Replaces hidden chain-of-thought. | "Provide a 5-line reasoning summary. Do not expose internal step-by-step reasoning." |

Stacking pattern (Truth):

> "Distinguish fact, inference, and opinion. Cite primary sources only. Mark UNKNOWN if confidence is under 70%. State assumptions before the answer. Provide a reasoning summary, not internal steps."

### 8.2 Depth Control

| Category | Word / Phrase | What It Forces | Example Prompt Use |
|---|---|---|---|
| Depth | "From first principles" | Strips received wisdom. | "Derive the answer from first principles, not industry conventions." |
| Depth | "Root cause" | Goes past symptoms. | "Identify the root cause, not the proximate cause." |
| Depth | "Five whys" | Iterative drill-down. | "Apply five whys to the failure. Show each why and answer." |
| Depth | "Mechanism of action" | Forces 'how it works'. | "Explain the mechanism of action, not just the effect." |
| Depth | "Second-order effects" | Surfaces downstream consequences. | "List the second-order effects of the policy change." |
| Depth | "Third-order effects" | Even further out. | "Continue to third-order effects, with declining confidence noted." |
| Depth | "Counterfactual" | Forces what-would-have-happened analysis. | "Give the counterfactual: what happens if we do nothing?" |
| Depth | "Necessary vs sufficient" | Disambiguates causality. | "Mark each condition Necessary, Sufficient, or Both." |
| Depth | "Steel-man the opposing view" | Forces the strongest counter. | "Steel-man the opposing view in 5 bullets before recommending." |
| Depth | "Show the trade-off frontier" | Forces multi-axis analysis. | "Show the trade-off frontier between cost and latency at 5 points." |
| Depth | "Decompose to atomic units" | Forces granularity. | "Decompose the workflow into atomic, single-actor steps." |
| Depth | "Map the dependency graph" | Forces relational depth. | "Map the dependency graph between the listed initiatives." |

Stacking pattern (Depth):

> "From first principles, identify the root cause. Map the dependency graph. Then list second-order effects and steel-man the opposing view."

### 8.3 Scope Control

| Category | Word / Phrase | What It Forces | Example Prompt Use |
|---|---|---|---|
| Scope | "Narrow to" | Restricts subject. | "Narrow to enterprise SaaS over $10M ARR." |
| Scope | "Exclude" | Removes a region of answer space. | "Exclude consumer use cases and non-US jurisdictions." |
| Scope | "Constrain to [N] options" | Forces comparison set size. | "Constrain to exactly 3 viable options." |
| Scope | "Jurisdiction: [X]" | Pins legal/regulatory frame. | "Jurisdiction: California; ignore federal preemption questions." |
| Scope | "Timebox to [period]" | Pins horizon. | "Timebox to the next 90 days." |
| Scope | "Only consider [factor]" | Strips irrelevant dimensions. | "Only consider cost; ignore brand and team preferences." |
| Scope | "Out of scope: [list]" | Explicit exclusion list. | "Out of scope: hiring, M&A, fundraising." |
| Scope | "In scope: [list]" | Explicit inclusion list. | "In scope: pricing, packaging, billing." |
| Scope | "Persona: [role]" | Restricts to one decision-maker. | "Persona: a CFO at a 200-person company." |
| Scope | "Use case: [task]" | Anchors to a job-to-be-done. | "Use case: weekly business review preparation." |
| Scope | "Treat [X] as fixed" | Removes a degree of freedom. | "Treat headcount as fixed; do not propose hiring." |
| Scope | "Boundary condition: [X]" | Sets a hard limit. | "Boundary condition: total spend must not exceed $50k." |

Stacking pattern (Scope):

> "Narrow to US mid-market SaaS. Jurisdiction: US federal only. Timebox to 12 months. Out of scope: M&A and hiring. Treat current headcount as fixed."

### 8.4 Structure Control

| Category | Word / Phrase | What It Forces | Example Prompt Use |
|---|---|---|---|
| Structure | "Return as a table with columns" | Forces tabular shape. | "Return as a table with columns: Option | Cost | Risk | Owner." |
| Structure | "Return strict JSON matching this schema" | Forces machine-parseable shape. | "Return strict JSON matching: {\"options\": [{\"name\": str, \"score\": int}]}." |
| Structure | "Ranked list, highest leverage first" | Forces ordering. | "Ranked list, highest leverage first, with one-line rationale per item." |
| Structure | "Decision matrix" | Forces options x criteria. | "Decision matrix: rows are options, columns are weighted criteria, totals in last column." |
| Structure | "Risk matrix" | Forces likelihood x impact. | "Risk matrix: Risk | Likelihood (L/M/H) | Impact (L/M/H) | Mitigation | Owner." |
| Structure | "SOP with numbered steps" | Forces procedural shape. | "SOP with numbered steps; each step has Owner, Time, and Exit Criteria." |
| Structure | "BLUF then detail" | Forces decision-first. | "Bottom Line Up Front in 3 bullets, then detail in sections." |
| Structure | "Two-column pros/cons" | Forces balanced view. | "Two-column pros/cons; equal item counts." |
| Structure | "ASCII tree" | Forces hierarchical shape. | "Return as an ASCII tree of dependencies." |
| Structure | "Diff format" | Forces minimal-change shape. | "Return as a unified diff against the supplied text." |
| Structure | "Checklist, verb-first" | Forces actionable items. | "Return a checklist, verb-first, max 10 items." |
| Structure | "Q&A pairs" | Forces interrogative shape. | "Return as 10 Q&A pairs an analyst would ask." |

Stacking pattern (Structure):

> "BLUF in 3 bullets. Then a decision matrix (options x weighted criteria). Then a risk matrix. Then a numbered SOP with Owner and Exit Criteria per step."

### 8.5 Business Analysis

| Category | Word / Phrase | What It Forces | Example Prompt Use |
|---|---|---|---|
| Business | "Unit economics" | Forces per-unit P&L view. | "Express the change in unit economics: CAC, gross margin, payback." |
| Business | "Pricing power" | Forces willingness-to-pay analysis. | "Assess pricing power: who can raise price 10% without losing share?" |
| Business | "Moat" | Forces durable-advantage framing. | "Identify the moat: switching cost, network, scale, brand, regulatory." |
| Business | "TAM / SAM / SOM" | Forces market sizing discipline. | "Size TAM, SAM, and SOM with the assumption behind each." |
| Business | "Net Revenue Retention" | Forces expansion-minus-churn view. | "Project NRR for each cohort with current data." |
| Business | "CAC payback" | Forces capital efficiency view. | "Compute CAC payback in months for each channel." |
| Business | "Cohort analysis" | Forces time-anchored segmentation. | "Run a cohort analysis by signup month for the last 24 months." |
| Business | "Bottleneck" | Forces throughput thinking. | "Identify the single bottleneck in the funnel and quantify it." |
| Business | "Counter-positioning" | Forces structural advantage framing. | "Where can we counter-position against the incumbent's business model?" |
| Business | "Reverse DCF" | Forces implied-growth math. | "Run a reverse DCF: what growth rate is priced in today?" |
| Business | "Capital allocation options" | Forces explicit comparison of uses of cash. | "Rank capital allocation options: reinvest, buyback, dividend, M&A." |
| Business | "Sensitivity analysis" | Forces variable-level stress test. | "Sensitivity analysis on price, churn, and CAC at +/- 20%." |

Stacking pattern (Business):

> "Compute unit economics and CAC payback. Run a sensitivity analysis at +/- 20% on price and churn. Identify the bottleneck. Return as a decision matrix with a reasoning summary."

### 8.6 Technical Analysis

| Category | Word / Phrase | What It Forces | Example Prompt Use |
|---|---|---|---|
| Technical | "Failure modes" | Forces enumeration of how it breaks. | "Enumerate every failure mode with trigger, blast radius, and detection." |
| Technical | "Invariant" | Forces statement of what must always hold. | "State the invariants this function must preserve." |
| Technical | "Time and space complexity" | Forces Big-O statement. | "Give time and space complexity in Big-O with justification." |
| Technical | "Concurrency model" | Forces explicit threading assumptions. | "State the concurrency model and where contention occurs." |
| Technical | "Observability hooks" | Forces operability. | "Add observability hooks: logs, metrics, traces with names." |
| Technical | "Idempotency" | Forces safe-retry analysis. | "Is this operation idempotent? If not, what makes it not?" |
| Technical | "Backpressure" | Forces overload handling. | "How does the system apply backpressure when downstream is slow?" |
| Technical | "Failure isolation" | Forces blast-radius design. | "Where are the failure isolation boundaries?" |
| Technical | "Schema migration plan" | Forces zero-downtime thinking. | "Provide a backward- and forward-compatible schema migration plan." |
| Technical | "Test pyramid" | Forces multi-level test coverage. | "Map tests across unit, integration, and end-to-end with counts." |
| Technical | "Threat model" | Forces security framing. | "Produce a STRIDE-style threat model for the data path." |
| Technical | "Rollback plan" | Forces reversibility. | "Every deploy step must include a one-command rollback." |

Stacking pattern (Technical):

> "State invariants. Enumerate failure modes with blast radius and detection. Provide observability hooks. Provide a rollback plan. Return as a table per category."

### 8.7 Research Analysis

| Category | Word / Phrase | What It Forces | Example Prompt Use |
|---|---|---|---|
| Research | "Primary source" | Excludes derivative material. | "Use primary sources only - statutes, peer-reviewed studies, first-party data." |
| Research | "Replication status" | Forces credibility check. | "For each cited study, note replication status." |
| Research | "Sample size" | Forces statistical literacy. | "Report N and exclude any study with N < 30 for the segment." |
| Research | "Effect size" | Forces magnitude over significance. | "Report effect size, not just p-value." |
| Research | "Confounders" | Forces causal humility. | "List plausible confounders for each claimed causal link." |
| Research | "Selection bias" | Forces sampling critique. | "Identify selection bias risks in each cited dataset." |
| Research | "Base rate" | Forces denominator thinking. | "Compare the claimed rate to the relevant base rate." |
| Research | "Triangulation" | Forces multi-source corroboration. | "Triangulate the claim across at least three independent sources." |
| Research | "Methodology comparison" | Forces apples-to-apples. | "Compare methodologies before comparing results." |
| Research | "Publication date" | Forces freshness. | "Annotate each source with publication date; flag anything older than 5 years." |
| Research | "Disconfirming evidence" | Forces falsification. | "Find the strongest disconfirming evidence for the thesis." |
| Research | "Source hierarchy tag" | Forces credibility ladder. | "Tag each source 1 (primary law) through 7 (AI summary) per the source hierarchy." |

Stacking pattern (Research):

> "Primary sources only. Triangulate every claim across three independent sources. Report effect size, sample size, and confounders. Flag disconfirming evidence in a dedicated section."

### 8.8 Strategy and Decision Engineering

| Category | Word / Phrase | What It Forces | Example Prompt Use |
|---|---|---|---|
| Strategy | "Expected value" | Forces probability-weighted comparison. | "Compute expected value for each option with explicit probabilities." |
| Strategy | "Optionality" | Forces value of future flexibility. | "Rank options by optionality preserved." |
| Strategy | "Reversibility" | Forces one-way / two-way door analysis. | "For each decision, classify as one-way or two-way door." |
| Strategy | "Dominant strategy" | Forces game-theoretic framing. | "Is there a dominant strategy regardless of competitor response?" |
| Strategy | "Regret minimization" | Forces worst-case framing. | "Which choice minimizes regret if the worst case occurs?" |
| Strategy | "Pre-commitment" | Forces binding mechanism. | "What pre-commitment makes the plan credible?" |
| Strategy | "Sunk cost" | Forces decision hygiene. | "Identify any sunk-cost reasoning in the supplied memo." |
| Strategy | "Opportunity cost" | Forces explicit comparison. | "State the opportunity cost of choosing option A over B." |
| Strategy | "Decision criteria first" | Forces process discipline. | "Define decision criteria and weights before evaluating options." |
| Strategy | "Kill criteria" | Forces stop-loss thinking. | "Define kill criteria that would end the initiative." |
| Strategy | "Time inconsistency" | Forces dynamic preference check. | "Will the decision still look right in 12 months under stated assumptions?" |
| Strategy | "Asymmetric payoff" | Forces convex-bet framing. | "Identify any asymmetric payoffs available." |

Stacking pattern (Strategy):

> "Define decision criteria and weights first. Compute expected value with explicit probabilities. Classify each option's reversibility. Define kill criteria. Return a decision matrix."

### 8.9 Failure Intelligence

| Category | Word / Phrase | What It Forces | Example Prompt Use |
|---|---|---|---|
| Failure | "Pre-mortem" | Forces failure imagination. | "Run a pre-mortem: assume the project failed in 12 months; list reasons." |
| Failure | "Red team" | Forces adversarial review. | "Red team the plan: attack every assumption." |
| Failure | "Adversarial example" | Forces edge-case discovery. | "Generate 5 adversarial inputs that would break this." |
| Failure | "Stress test" | Forces extreme-condition test. | "Stress test at 10x volume and 10% of normal latency budget." |
| Failure | "Tripwire" | Forces leading-indicator monitoring. | "Define tripwires that fire before the failure becomes visible." |
| Failure | "Single point of failure" | Forces redundancy analysis. | "List every single point of failure in the workflow." |
| Failure | "Cascading failure" | Forces dependency-failure chain. | "Trace cascading failure paths from any single component." |
| Failure | "Brittleness audit" | Forces robustness review. | "Audit for brittleness: what breaks if any input is slightly malformed?" |
| Failure | "Recovery time objective" | Forces operational SLO. | "State RTO and RPO per component." |
| Failure | "Post-mortem template" | Forces structured retrospective. | "Produce a post-mortem with Timeline | Trigger | Root Cause | Action Items." |
| Failure | "Anti-patterns" | Forces explicit naming of what not to do. | "List the anti-patterns this design should avoid." |
| Failure | "Failure budget" | Forces explicit tolerance. | "Define the failure budget for this quarter and how it is consumed." |

Stacking pattern (Failure):

> "Run a pre-mortem. Red team every assumption. List single points of failure and cascading paths. Define tripwires and a recovery time objective. Return as a risk matrix."

### 8.10 Creative Control

| Category | Word / Phrase | What It Forces | Example Prompt Use |
|---|---|---|---|
| Creative | "Voice: [author or register]" | Pins stylistic distribution. | "Voice: terse, declarative, in the register of a New Yorker reported essay." |
| Creative | "Constraint: [hard rule]" | Forces creative pressure. | "Constraint: no adverbs, no semicolons, no sentences longer than 14 words." |
| Creative | "Reference: [work]" | Provides positive anchor. | "Reference: the opening pages of 'The Power Broker' for pacing." |
| Creative | "Anti-reference: [work]" | Provides negative anchor. | "Anti-reference: do not sound like a LinkedIn thought-leadership post." |
| Creative | "Rhythm" | Forces sentence-length variation. | "Vary sentence rhythm: short, short, long. Then break the pattern once." |
| Creative | "Specificity over abstraction" | Forces concrete detail. | "Replace every abstraction with a specific noun, place, or number." |
| Creative | "Show, don't tell" | Forces scene over summary. | "Show through scene; do not tell through summary." |
| Creative | "POV: [first/third/omniscient]" | Pins perspective. | "POV: close third on the protagonist; no head-hopping." |
| Creative | "Stakes" | Forces dramatic pressure. | "Stakes: name what the protagonist loses if they fail." |
| Creative | "Subtext" | Forces below-surface meaning. | "Add subtext: what is the character not saying?" |
| Creative | "Negative space" | Forces deliberate omission. | "Leave one major question unanswered on purpose." |
| Creative | "Forbidden words" | Forces vocabulary discipline. | "Forbidden words: very, really, just, that, things, stuff." |

Stacking pattern (Creative):

> "Voice: terse, declarative. Reference: 'The Power Broker' opening for pacing. Anti-reference: LinkedIn thought leadership. Constraint: no adverbs, sentences under 14 words. Show, don't tell."

---

## 9. Common Mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| Vague verbs ("discuss", "explore") | Sprawling essay output. | Replace with operator verbs ("decide", "rank", "enumerate"). |
| Stacking too many words | Contradictory instructions. | Cap at 5 stacked words per prompt. |
| Mixing categories badly | One category undercuts another. | Pair Depth with Truth, Scope with Structure, etc. |
| Forgetting confidence words | Confident fabrication. | Always include one Truth-Discipline word in research/legal/medical prompts. |
| No Structure word | Inconsistent format across runs. | Always include one Structure word. |
| Forbidden-word list too long | Model paralysis. | Cap at 6 forbidden words. |
| Hidden chain-of-thought request | Verbose, possibly fabricated reasoning. | Use "reasoning summary" only. |
| Generic role + generic verbs | Bland output. | Pair specific ROLE (file 03) with specific vocabulary (this file). |

---

## 10. Recovery Commands

| Failure | Recovery Word / Phrase |
|---|---|
| Too vague | "Replace every abstraction with a specific noun, place, or number." |
| Too shallow | "Go to root cause via five whys; do not stop at the proximate cause." |
| Too generic | "Narrow to my specific context: [context]. Cut anything generalizable." |
| Hedged | "Take a position. Give the single best answer and the runner-up." |
| Confidently wrong | "Mark every claim VERIFIED / UNVERIFIED / UNKNOWN. Remove UNVERIFIED unless I confirm." |
| Missing trade-offs | "Show the trade-off frontier between [X] and [Y] at 5 points." |
| Missing opposing view | "Steel-man the opposing view in 5 bullets before concluding." |
| Missing risks | "Add a 5-row risk matrix: Risk | Likelihood | Impact | Mitigation | Owner." |
| Missing decision | "Convert to a decision matrix with weighted criteria and a winner." |
| Missing kill criteria | "Add kill criteria that would end the initiative." |

---

## 11. Verification Checklist

Before sending:

- [ ] At least one Truth-Discipline word is present.
- [ ] At least one Structure-Control word is present.
- [ ] If facts are involved: source discipline word is present.
- [ ] If a decision is involved: a Strategy word is present.
- [ ] If a system is involved: a Failure-Intelligence word is present.
- [ ] No more than 5 stacked words per prompt.
- [ ] No request for hidden chain-of-thought; "reasoning summary" only.
- [ ] WEB VERIFICATION NOT AVAILABLE IN THIS RUN noted if web facts are tempting.
- [ ] Platform-specific claims will be tagged.

---

## 12. Practice Drills

Drill 1 - Word swap. Take a vague prompt. Replace one vague verb with an operator verb from this library. Compare outputs.

Drill 2 - Category stacking. Build a prompt using exactly one word from five different categories. Note which combination produced the largest quality jump.

Drill 3 - Forbidden words. Add a 5-word forbidden list to a writing prompt. Observe stylistic shift.

Drill 4 - Truth discipline. Run a research prompt twice: once with no Truth words, once with three Truth words. Count factual errors in each.

Drill 5 - Failure intelligence. Take any plan. Run pre-mortem + red team + tripwires. Compare to the original plan.

Drill 6 - Strategy pass. Take any decision. Run decision criteria first + expected value + reversibility + kill criteria. Compare to your gut answer.

Drill 7 - Personal stack. Build a 5-word default stack you will paste into every prompt for your most common task. Iterate weekly.

---

## 13. Summary

```
Better words -> tighter output distribution -> fewer iterations.
```

- Truth Discipline controls epistemics.
- Depth Control controls how far down you go.
- Scope Control controls breadth.
- Structure Control controls shape.
- Business / Technical / Research / Strategy / Failure / Creative are domain levers.
- Stack 3-5 words per prompt. Cap at 5.
- Always include one Truth word for fact-heavy tasks.
- Always include one Structure word for repeatable outputs.
- Never request hidden chain-of-thought. Only "reasoning summary."

WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Tag every platform-specific claim.
