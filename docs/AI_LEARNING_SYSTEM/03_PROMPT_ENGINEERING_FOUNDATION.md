# 03 - Prompt Engineering Foundation

> Verification tags used in this document: VERIFIED_LOCAL, VERIFIED_DOCS, USER_PROVIDED_UNVERIFIED, CUSTOM_WORKFLOW, LIKELY_NATIVE_UNVERIFIED, UNKNOWN, DEPRECATED.
> WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

---

## 1. Purpose

Teach the operator a repeatable, model-agnostic prompt construction formula that converts vague intent into deterministic, useful output. This document is the load-bearing foundation for files 04 (vocabulary), 05 (format), and 06 (hallucination control).

The formula:

```
PROMPT = ROLE + OBJECTIVE + CONTEXT + CONSTRAINTS + OUTPUT
```

Every operator-grade prompt in this manual is built from these five slots. If output quality degrades, you do not "try harder" - you identify which of the five slots was underspecified and fix that slot.

---

## 2. Who It Is For

| Reader | Use This Document To |
|---|---|
| Absolute beginner | Learn the five components and stop writing one-line prompts. |
| Intermediate user | Diagnose why a prompt failed by slot. |
| Operator / power user | Standardize team prompts, build reusable templates, and audit prompt quality. |
| Builder / engineer | Pre-fill ROLE and CONSTRAINTS at the system prompt layer; expose OBJECTIVE and CONTEXT to users. |

---

## 3. Beginner Explanation

A weak prompt looks like:

> "Write me a marketing plan."

A strong prompt looks like:

> "Act as a B2B SaaS growth marketer (ROLE). Draft a 90-day go-to-market plan (OBJECTIVE) for a $49/month project management tool sold to design agencies in North America with a $20k launch budget (CONTEXT). Stay within paid + content channels, no events, no outbound cold email (CONSTRAINTS). Return a table with Week | Channel | Activity | KPI | Cost (OUTPUT)."

The second prompt is not "longer for the sake of length." Each clause replaces a guess the model would otherwise make.

Mental model: the AI fills every blank you leave blank. Leave fewer blanks.

---

## 4. Operator Explanation

A prompt is an instruction to a probabilistic system. Underspecified prompts cause:

1. Mode collapse to generic outputs (the model averages across its training distribution).
2. Format drift (you wanted JSON, you got prose).
3. Hallucinated specificity (model invents facts to satisfy implicit specificity demands).
4. Wasted iteration cycles.

The five-slot formula is a forcing function for specificity. Treat ROLE/OBJECTIVE/CONTEXT/CONSTRAINTS/OUTPUT as a checklist. If a slot is empty, you have authorized the model to choose for you.

Operator rule: never request hidden chain-of-thought. Ask for a "reasoning summary" or "decision rationale" instead. (LIKELY_NATIVE_UNVERIFIED - exact phrasing requirements vary by model.)

---

## 5. Core Concepts

### 5.1 ROLE - who the model is acting as

ROLE narrows the model's stylistic and epistemic distribution. It picks vocabulary, depth, and bias.

10 example roles:

| # | Role | Forces |
|---|---|---|
| 1 | Senior litigation paralegal (US federal) | Precise citations, hedged conclusions, no legal advice disclaimer flood. |
| 2 | Staff SRE at a high-availability fintech | Failure-mode reasoning, runbook tone. |
| 3 | M&A diligence analyst at a mid-market PE firm | Risk-first framing, financial vocabulary. |
| 4 | Pediatric ICU charge nurse | Triage logic, abbreviations expanded. |
| 5 | FAA Part 135 chief pilot | Regulation-anchored, checklist-driven. |
| 6 | B2B SaaS growth marketer | Funnel vocabulary, channel literacy. |
| 7 | Forensic accountant | Reconciliation logic, red-flag scanning. |
| 8 | Technical writer for developer docs | Active voice, code-first examples. |
| 9 | Negotiation coach (Voss / Camp / Harvard style) | Tactic naming, script lines. |
| 10 | Adversarial red-teamer | Attack surface enumeration. |

Anti-patterns: "Act as an expert." (Expert in what? Where? Era?) "You are a helpful assistant." (Default; adds nothing.)

### 5.2 OBJECTIVE - what must exist when the model finishes

OBJECTIVE is the deliverable, not the topic. "Discuss pricing" is a topic. "Produce a three-tier pricing recommendation with monthly price, included seats, and one upgrade trigger per tier" is an objective.

10 objective templates:

| # | Template |
|---|---|
| 1 | "Produce a [deliverable] containing [N items], each with [fields]." |
| 2 | "Compare [A] and [B] across [criteria] and recommend one." |
| 3 | "Diagnose the most likely root cause of [symptom] given [evidence]." |
| 4 | "Draft a [document type] of approximately [length] suitable for [audience]." |
| 5 | "Refactor the following [artifact] to satisfy [constraint] without changing [invariant]." |
| 6 | "Generate [N] distinct options for [decision], ranked by [metric]." |
| 7 | "Extract every [entity] from the source and return as [format]." |
| 8 | "Stress-test the following plan by listing every failure mode and its mitigation." |
| 9 | "Convert the following [source format] to [target format] preserving [fields]." |
| 10 | "Summarize the following text in [N] bullets at a [reading level] level, preserving [must-keep elements]." |

### 5.3 CONTEXT - the situation that disambiguates the objective

Context dimensions to fill (omit only when irrelevant, never by default):

| Dimension | Question It Answers |
|---|---|
| Audience | Who reads the output? Their seniority, vocabulary, decision authority. |
| Industry | Vertical-specific norms, regulations, jargon. |
| Location / jurisdiction | Legal regime, language, currency, regulatory body. |
| Timeframe | Deadline, planning horizon, point-in-time of facts. |
| Budget | Money, headcount, hours, compute. |
| Tools | What stack/platform/software is in play. |
| Risk tolerance | Conservative, balanced, aggressive. |
| Source material | Documents, data, transcripts the model must use rather than recall. |
| Prior decisions | What has already been chosen and is off the table. |
| Success metric | How the output will be judged. |

### 5.4 CONSTRAINTS - what the model must not do, or must obey

Constraint types:

| Type | Example |
|---|---|
| Length | "Maximum 250 words." / "Exactly 5 bullets." |
| Tone / register | "Formal, third person, no contractions." |
| Vocabulary | "Avoid the words 'leverage', 'synergy', 'robust'." |
| Format | "Return only valid JSON, no prose." |
| Scope | "Only US federal law. Ignore state law." |
| Source discipline | "Only use facts present in the supplied document; mark all inference." |
| Safety / compliance | "No medical dosing advice; refer to clinician." |
| Time | "Cite no fact later than 2023-12-31 unless flagged." |
| Style | "Active voice, no passive constructions." |
| Confidence | "If confidence < 70%, write UNKNOWN." |
| Exclusion | "Do not recommend acquisitions, partnerships, or hiring." |
| Inclusion | "Every recommendation must include a measurable KPI." |

### 5.5 OUTPUT - the exact shape of the answer

Format menu (full treatment in file 05):

- Bulleted list (flat / nested)
- Numbered list
- Table (specify columns)
- Decision matrix (options x criteria, weighted)
- Risk matrix (likelihood x impact)
- JSON (specify schema)
- JSON Schema document
- Checklist (actionable, verb-first)
- ASCII tree (hierarchy)
- Code block (specify language)
- Diff / patch
- SOP (numbered steps with owner + time)
- Executive summary + appendix
- Ranked list with score + rationale
- State machine (states + transitions)
- Pros/cons two-column
- BLUF (Bottom Line Up Front) + supporting detail
- Q&A pairs
- Comparison table
- Timeline / Gantt-style table

---

## 6. Workflow

```
ASCII WORKFLOW

[Intent in your head]
        |
        v
[Slot 1: ROLE]----------> Who must the model be?
        |
        v
[Slot 2: OBJECTIVE]------> What deliverable exists at the end?
        |
        v
[Slot 3: CONTEXT]--------> Audience / industry / jurisdiction /
        |                  timeframe / budget / tools / risk /
        |                  sources / prior decisions / metric
        v
[Slot 4: CONSTRAINTS]----> Length / tone / vocab / scope / time /
        |                  confidence / exclusions / inclusions
        v
[Slot 5: OUTPUT]---------> Exact shape (table? JSON? SOP?)
        |
        v
[Send prompt]
        |
        v
[Inspect output]
        |
        v
[Refine: narrow / expand / simplify / technicalize / add citations /
         add risk matrix / add examples]
```

CUSTOM_WORKFLOW. Adapt slot order if your domain demands it (e.g., legal often leads with jurisdiction).

---

## 7. Cheat Sheet

```
ROLE:        "Act as a [seniority] [discipline] specializing in [domain] in [jurisdiction]."
OBJECTIVE:   "Produce [deliverable] with [N] [items] each containing [fields]."
CONTEXT:     "Audience: [X]. Industry: [Y]. Timeframe: [Z]. Budget: [$]. Tools: [stack].
              Risk tolerance: [low|med|high]. Source: [paste or attach]."
CONSTRAINTS: "Max [N] words. No [forbidden terms]. Cite every claim. Mark all inference.
              If confidence < 70%, write UNKNOWN."
OUTPUT:      "Return as a [format] with columns/keys: [...]. No preamble. No closing remarks."
```

---

## 8. Examples

Each example shows BAD vs GOOD with annotation. Annotations call out which slot was strengthened.

### 8.1 Research

BAD:

```
Research electric vehicle adoption.
```

GOOD:

```
ROLE: Act as a transportation policy analyst at a US state DOT.
OBJECTIVE: Produce a briefing on light-duty EV adoption trends for a state legislator.
CONTEXT: Audience: one legislator, non-technical. Jurisdiction: United States,
  state-level focus, but cite national baselines. Timeframe: 2020-2024 data only.
  Source discipline: cite primary government or peer-reviewed sources only;
  if a figure cannot be sourced, mark UNKNOWN. WEB VERIFICATION NOT AVAILABLE IN THIS RUN.
CONSTRAINTS: 600 words max. No partisan framing. Mark every claim as Fact or Inference.
OUTPUT: BLUF (3 bullets) + table (Year | New EV Registrations | % of New Sales | Source) +
  3-bullet "What changed" + 3-bullet "What to watch."
```

What changed and why: added ROLE (forces analyst register), OBJECTIVE (briefing not essay), CONTEXT (jurisdiction, audience, timeframe), CONSTRAINTS (sourcing discipline, length), OUTPUT (exact shape).

### 8.2 Coding

BAD:

```
Write me a function to dedupe a list.
```

GOOD:

```
ROLE: Senior Python engineer writing production code for a data pipeline.
OBJECTIVE: Implement a function dedupe_records(records: list[dict], keys: list[str]) -> list[dict]
  that returns the first occurrence per composite key.
CONTEXT: Python 3.11. Input may contain unhashable nested values. Order must be preserved.
  Used in an ETL job processing up to 10M rows; memory-bounded environment.
CONSTRAINTS: Standard library only. No pandas. Include type hints. Include 4 unit tests
  covering: empty input, duplicate keys, missing keys, unhashable values. No print statements.
OUTPUT: One python code block with the function, then a second code block with pytest tests.
  No prose between or after.
```

What changed and why: ROLE picks idioms; OBJECTIVE specifies signature and semantics; CONTEXT surfaces edge cases (size, unhashable); CONSTRAINTS forbid common drift (pandas); OUTPUT forces two-block structure.

### 8.3 Writing

BAD:

```
Write a blog post about productivity.
```

GOOD:

```
ROLE: Editor at a publication for engineering managers.
OBJECTIVE: 900-word essay arguing that "focus time" is a team-scheduling problem,
  not an individual willpower problem.
CONTEXT: Audience: engineering managers at 50-500 person companies. Tone: direct,
  empirical, mildly contrarian. Allowed to reference well-known frameworks
  (Maker's Schedule, deep work) but must not quote them at length.
CONSTRAINTS: No statistics unless you can name the study and year. No bullet lists
  longer than 5 items. No headings deeper than H2. No closing call-to-action.
OUTPUT: Title (under 70 chars) + dek (1 sentence) + 4 H2 sections + closing paragraph.
```

What changed and why: ROLE sets editorial bar; OBJECTIVE picks a thesis; CONSTRAINTS prevent statistical hallucination; OUTPUT forces structure.

### 8.4 Business

BAD:

```
Should we raise prices?
```

GOOD:

```
ROLE: Pricing strategist with SaaS experience.
OBJECTIVE: Decide whether to raise the Pro plan from $49 to $69/month.
CONTEXT: B2B SaaS, project management, ~4,200 paying customers, 3.1% monthly churn,
  NPS 38, last price change 26 months ago, two competitors at $59 and $79. Budget
  for migration comms: $5k. Risk tolerance: medium. Source: paste customer cohort
  table below. [TABLE].
CONSTRAINTS: Use only the numbers I supplied; do not invent benchmarks. If a number
  is needed and not supplied, write UNKNOWN. Provide a reasoning summary, not
  step-by-step internal reasoning.
OUTPUT: Decision (Raise / Hold / Tiered) + 5-row risk matrix (Risk | Likelihood
  | Impact | Mitigation | Owner) + 30/60/90-day rollout SOP.
```

What changed and why: OBJECTIVE is a decision, not a discussion; CONTEXT supplies all numbers; CONSTRAINTS block invented benchmarks; OUTPUT forces decision-first structure.

### 8.5 Legal / Compliance

BAD:

```
Is this contract clause enforceable?
```

GOOD:

```
ROLE: US contract attorney (commercial, non-litigator). This is operator-level analysis,
  not legal advice for a client.
OBJECTIVE: Assess enforceability risk of the supplied non-compete clause and propose
  two redlined alternatives.
CONTEXT: Jurisdiction: California, employer-employee, signed 2024. Source: paste clause
  below. Prior decisions: we will not remove the non-solicit; we will modify or remove
  the non-compete.
CONSTRAINTS: Cite the controlling statute(s) and at least one case by name; if a citation
  is not from your verified knowledge, mark it USER_PROVIDED_UNVERIFIED and instruct me
  to confirm. WEB VERIFICATION NOT AVAILABLE IN THIS RUN. No general disclaimers longer
  than one sentence.
OUTPUT: Section 1: Enforceability rating (High/Medium/Low/Likely Unenforceable) with
  one-paragraph rationale. Section 2: Two redlined alternatives in diff format
  (- removed / + added). Section 3: Verification checklist of facts I must confirm
  with counsel before signing.
```

What changed and why: ROLE clarifies it is not client legal advice; CONTEXT pins jurisdiction (decisive in non-compete law); CONSTRAINTS force citation tagging; OUTPUT separates assessment from redline from verification.

### 8.6 Image Generation

BAD:

```
A cyberpunk city.
```

GOOD:

```
ROLE: Concept artist for a AAA video game studio.
OBJECTIVE: Produce a prompt usable in a text-to-image model for a key art shot of a
  near-future Asian megacity at dusk.
CONTEXT: Reference style: Syd Mead industrial design crossed with Blade Runner 2049
  color palette. Camera: 35mm equivalent, eye-level, slight Dutch tilt. Subject:
  lone courier on an electric motorcycle, mid-foreground, three-quarter rear view.
  Weather: light rain, wet asphalt reflections. Time of day: 18 minutes after sunset.
CONSTRAINTS: No text or logos in image. No visible faces. No watermarks. No anime style.
OUTPUT: A single image prompt under 80 words plus a negative-prompt list. No commentary.
```

What changed and why: OBJECTIVE specifies the prompt itself is the deliverable; CONTEXT replaces every visual ambiguity; CONSTRAINTS list explicit "do not include" terms (high leverage in image gen). LIKELY_NATIVE_UNVERIFIED: specific syntax for negative prompts varies by model.

### 8.7 Automation

BAD:

```
Help me automate my inbox.
```

GOOD:

```
ROLE: Workflow engineer experienced with Gmail filters and Google Apps Script.
OBJECTIVE: Design an inbox triage automation that labels incoming mail into
  {Action, Waiting, Read-Later, Auto-Archive} based on supplied rules.
CONTEXT: Single Gmail account, ~250 messages/day, heavy newsletter volume, 4 priority
  senders. Tools: native Gmail filters first; Apps Script only if filters cannot express
  the rule. (LIKELY_NATIVE_UNVERIFIED on exact filter operator coverage.)
CONSTRAINTS: No third-party services. No OAuth scopes beyond gmail.modify. Each rule
  must include a rollback plan. If a rule cannot be implemented with native filters,
  mark it and propose the Apps Script alternative.
OUTPUT: Table: Rule # | Trigger | Action | Native or Script | Rollback. Then, for any
  Script row, a code block with the Apps Script function.
```

What changed and why: CONTEXT picks the platform; CONSTRAINTS enforce least-privilege and reversibility; OUTPUT separates declarative rules from imperative code.

### 8.8 Data Analysis

BAD:

```
Analyze this CSV.
```

GOOD:

```
ROLE: Data analyst supporting a head of customer success.
OBJECTIVE: Identify the three most actionable churn signals from the attached CSV
  and propose one intervention per signal.
CONTEXT: Source: CSV with columns [account_id, signup_date, mrr, last_login,
  ticket_count_30d, plan, churned_flag, churn_date]. 6,800 rows, monthly granularity,
  2023-01 through 2024-12. Audience: VP CS, non-technical, 10-minute read.
CONSTRAINTS: Use only the columns present; do not assume additional fields. State the
  statistical test used for any "significant" claim and its p-value. If sample size
  for a segment is < 30, mark LOW_N and do not generalize.
OUTPUT: BLUF (3 bullets) + table (Signal | Definition | Lift vs Baseline | Sample N |
  Confidence) + table (Signal | Intervention | Owner | Effort | Expected Impact).
  Then a 5-line reasoning summary (not internal step-by-step).
```

What changed and why: OBJECTIVE narrows to 3 signals + interventions (prevents kitchen-sink output); CONTEXT names every column (prevents invented columns); CONSTRAINTS force stats discipline; OUTPUT forces decision-grade structure.

---

## 9. Common Mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| One-line prompt | Generic, hedged output. | Add ROLE + OBJECTIVE minimum. |
| Topic instead of deliverable | Essay when you wanted a decision. | Replace OBJECTIVE verb with "Produce / Decide / Recommend / Extract." |
| Missing jurisdiction or timeframe | Hallucinated specifics. | Add CONTEXT dimensions. |
| Asking for "best practices" | Bland, listicle output. | Replace with "the three highest-leverage practices for [my specific situation]." |
| No format spec | Inconsistent shape across runs. | Specify OUTPUT explicitly. |
| Hidden chain-of-thought request | Verbose, possibly fabricated reasoning. | Ask for a "reasoning summary" only. |
| Overloaded prompt | Truncation, dropped sections. | Split into chained prompts. |
| No confidence rule | Confident-sounding fabrications. | Add "If confidence < 70%, write UNKNOWN." |
| No source discipline | Invented citations. | Add "Mark every claim Fact / Inference / UNKNOWN. Cite primary sources only." |
| Ambiguous audience | Wrong reading level. | Specify audience seniority and vocabulary. |

---

## 10. Recovery Commands

When output is off, send a single targeted follow-up instead of rewriting the whole prompt. CUSTOM_WORKFLOW.

| Failure | Recovery Prompt |
|---|---|
| Too generic | "Re-run for my specific context: [context]. Cut anything that would apply to any other company." |
| Too long | "Compress to [N] words. Keep decisions and numbers; cut prose." |
| Wrong format | "Reformat the previous answer as [exact format]. Do not change content." |
| Hallucinated facts | "List every factual claim from your previous answer. For each, mark VERIFIED / UNVERIFIED / UNKNOWN. Remove UNVERIFIED unless I confirm." |
| Hedged / wishy-washy | "Take a position. Give the single best answer and the runner-up. Justify in 3 bullets each." |
| Missing risk view | "Add a 5-row risk matrix: Risk | Likelihood (L/M/H) | Impact (L/M/H) | Mitigation | Owner." |
| Missing examples | "Add 3 concrete worked examples drawn from [industry]." |
| Too technical | "Rewrite for a [non-technical audience]. Keep accuracy. Define every term inline." |
| Too shallow | "Go one level deeper on section [N]. Add second-order effects and edge cases." |
| Citation gaps | "Add a Sources column. Mark each row VERIFIED_DOCS / USER_PROVIDED_UNVERIFIED / UNKNOWN." |

---

## 11. Verification Checklist

Before sending a prompt:

- [ ] ROLE specifies seniority, discipline, and domain.
- [ ] OBJECTIVE is a deliverable verb (Produce / Decide / Extract / Compare), not a topic.
- [ ] CONTEXT covers audience, jurisdiction, timeframe, and source material at minimum.
- [ ] CONSTRAINTS include length, scope, and at least one confidence rule.
- [ ] OUTPUT specifies exact format (table columns, JSON keys, section headings).
- [ ] No request for hidden chain-of-thought. Only "reasoning summary."
- [ ] If facts are needed: source discipline clause is present.
- [ ] If web facts are tempting: note WEB VERIFICATION NOT AVAILABLE IN THIS RUN.
- [ ] If platform-specific claims: each claim will be tagged on return.

After receiving output:

- [ ] All five slots' requirements were satisfied.
- [ ] No invented columns, fields, or citations.
- [ ] Confidence markers present where required.
- [ ] Format matches exactly.

---

## 12. Practice Drills

Drill 1 - Slot diagnosis. Take the prompt "Write a SQL query to find top customers." Identify which of the five slots is empty. Rewrite the prompt filling every slot.

Drill 2 - Bad-to-good rewrite. For each domain in section 8 (research, coding, writing, business, legal, image, automation, data), take the BAD prompt, cover the GOOD version, and rewrite from memory. Compare.

Drill 3 - Constraint stacking. Take any working prompt. Add one constraint at a time (length, vocabulary, scope, confidence, exclusion) and observe which constraint produces the largest quality jump.

Drill 4 - Format permutation. Take one OBJECTIVE. Run it five times, each time changing only the OUTPUT format (bullets, table, JSON, SOP, decision matrix). Note which format makes the content easiest to act on.

Drill 5 - Source discipline. Run a research-style prompt twice: once without source discipline, once with "Mark every claim Fact / Inference / UNKNOWN, cite primary sources only." Compare hallucination rate.

Drill 6 - Recovery muscle. Deliberately send a vague prompt. Recover output quality using only the recovery commands in section 10, one at a time.

Drill 7 - Iterative refinement loop. Pick a deliverable. Run it through: narrow -> expand -> simplify -> technicalize -> add citations -> add risk matrix -> add examples. Save the chain.

---

## 13. Summary

```
PROMPT = ROLE + OBJECTIVE + CONTEXT + CONSTRAINTS + OUTPUT
```

- ROLE picks the model's voice and depth.
- OBJECTIVE names the deliverable, not the topic.
- CONTEXT closes every ambiguity that would otherwise be guessed.
- CONSTRAINTS define the boundary the output must respect.
- OUTPUT defines the shape so two runs are comparable.

If output is bad, diagnose by slot. If output is hallucinated, jump to file 06. If output shape is wrong, jump to file 05. If you do not have the words to force the behavior you want, jump to file 04.

Never request hidden chain-of-thought. Request a reasoning summary.
WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Tag every platform-specific claim.
