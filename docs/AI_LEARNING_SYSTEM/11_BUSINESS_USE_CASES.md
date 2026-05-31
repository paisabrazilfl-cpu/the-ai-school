# 11 - BUSINESS USE CASES

> WEB VERIFICATION NOT AVAILABLE IN THIS RUN. "Best AI for the job"
> recommendations are tagged with verification status and reflect commonly
> reported strengths at the time of writing. Confirm against current
> vendor documentation and your own evaluations before standardizing.

---

## 1. Purpose

This document catalogs operator-grade business use cases for AI across
sales, marketing, operations, finance, legal, HR, customer support,
product, and strategy. For each, it gives:

- The best AI surface for the job (with verification status).
- A copy-paste prompt template.
- The expected output shape.
- A verification step the operator can perform.
- The dominant failure mode.

The pattern repeats so the operator can reuse it for new use cases not
listed.

---

## 2. Who It Is For

| Role | Why this matters |
|---|---|
| Founder / CEO | Needs leverage across functions without hiring for each. |
| Function head | Needs concrete prompts that pass internal review. |
| Operator / chief of staff | Needs orchestration patterns across functions. |
| Investor / advisor | Needs to evaluate where AI actually moves the needle. |
| Consultant | Needs reusable artifacts across clients. |

---

## 3. Beginner Explanation

For each business problem, the question is the same:

1. What decision am I trying to make?
2. What inputs does that decision require?
3. Which AI tool is most likely to produce good inputs?
4. How will I know the output is wrong?
5. Where is the human approval before action?

If you cannot answer any one of those, do not run the prompt yet.

---

## 4. Operator Explanation

At operator depth, the value of AI in business is **leverage on
decisions**, not "content generation." Content is the byproduct.

Every use case has the same shape:

- A decision under uncertainty.
- A set of inputs that reduce that uncertainty.
- A verification step that confirms the inputs are real.
- An action that follows from the inputs.

The catalog below is a starting kit. The operator extends it by writing
the next use case in the same shape.

The "best AI for the job" recommendations below are heuristics based on
commonly reported strengths. Treat them as defaults, not as rankings.
Test on your data; standards drift between model versions.

---

## 5. Core Concepts

### 5.1 Use-case schema

| Field | Definition |
|---|---|
| Decision | The specific decision the prompt supports. |
| Best AI | The surface most likely to produce useful output today. |
| Prompt | A reusable template with bracketed inputs. |
| Output | The expected shape of the response. |
| Verification | How the operator confirms the output is real. |
| Failure mode | The most common way this prompt produces a wrong answer. |

### 5.2 Verification status tags

- VERIFIED_LOCAL: validated in this codebase / environment.
- VERIFIED_DOCS: validated against vendor documentation.
- USER_PROVIDED_UNVERIFIED: claim from user, not independently checked.
- CUSTOM_WORKFLOW: a workflow specific to this manual.
- LIKELY_NATIVE_UNVERIFIED: appears native to a platform but not verified
  in this run.
- UNKNOWN: status is not known.
- DEPRECATED: previously valid, now superseded.

### 5.3 Decision quality > content quality

A beautifully written analysis with wrong inputs is worse than a plain
analysis with right inputs. The catalog optimizes for inputs.

### 5.4 Human-in-the-loop placement

For each use case, the operator marks where the human signs off. AI does
not press send on customer communications, financial transactions, or
hiring decisions without a named human approval.

---

## 6. Workflow

```
+------------------+
| 01 DECISION      |
| name it          |
+--------+---------+
         |
         v
+------------------+
| 02 INPUTS        |
| what is needed   |
+--------+---------+
         |
         v
+------------------+
| 03 BEST AI       |
| pick tool        |
+--------+---------+
         |
         v
+------------------+
| 04 PROMPT        |
| from template    |
+--------+---------+
         |
         v
+------------------+
| 05 OUTPUT        |
| structured       |
+--------+---------+
         |
         v
+------------------+
| 06 VERIFY        |
| against source   |
+--------+---------+
         |
         v
+------------------+
| 07 APPROVE       |
| named human      |
+--------+---------+
         |
         v
+------------------+
| 08 ACT           |
| with audit       |
+------------------+
```

---

## 7. Cheat Sheet

```
DECISION  : one sentence
INPUTS    : enumerated, sourced
TOOL      : default heuristic, then retest on your data
PROMPT    : constrained output schema
OUTPUT    : structured, machine-checkable where possible
VERIFY    : trace each claim to its source
APPROVE   : named human before customer-facing or financial action
LOG       : prompt, output, verifier, approver, action
```

---

## 8. Examples

> Format for every entry:
>
> **Decision / Best AI / Prompt / Output / Verification / Failure mode.**

### 8.1 Sales

#### 8.1.1 ICP (Ideal Customer Profile) definition

- Decision: Who do we sell to first.
- Best AI: Claude or ChatGPT (USER_PROVIDED_UNVERIFIED) for synthesis;
  Perplexity (USER_PROVIDED_UNVERIFIED) for sourcing.
- Prompt:

```
Using only customer evidence I provide below (won, lost, churned), define
our ICP. Output: firmographic profile (industry, size, geography, tech
stack), buyer persona (title, JTBD, pains, gains), and the top 3
disqualifiers. Cite the evidence rows for each claim. Do not invent
attributes.

EVIDENCE:
[paste anonymized customer rows]
```

- Output: A structured ICP doc with attribute -> evidence row mapping.
- Verification: Sample three wins and three churns; confirm fit/anti-fit.
- Failure mode: Confounding sample (recent deals only) makes the ICP
  reflect a phase, not the business.

#### 8.1.2 Account research (pre-call)

- Decision: How to open the call.
- Best AI: Perplexity (USER_PROVIDED_UNVERIFIED) for live web; Claude or
  ChatGPT for synthesis.
- Prompt:

```
Profile [company]. Return: legal entity, headcount range, recent funding,
named executives in [function], the last 3 public statements about [our
domain] with URLs, and the top 3 likely pains given their public signals.
Mark every claim with source URL or UNSOURCED.
```

- Output: Structured account brief.
- Verification: Open each URL; confirm the claim.
- Failure mode: Outdated executive names; fabricated press quotes.

#### 8.1.3 Discovery question set

- Decision: What to ask on a call.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Given ICP [paste] and product [paste], produce a 12-question discovery
set covering: situation, pain, impact, decision process, success
criteria. Group by category. Avoid leading questions. Avoid product
pitches.
```

- Output: Question set, grouped.
- Verification: Run against three past won deals; would these questions
  have surfaced the truth.
- Failure mode: Leading questions that reflect product, not buyer.

#### 8.1.4 Email outreach (one-to-one)

- Decision: How to start the conversation.
- Best AI: Claude or ChatGPT (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Draft a 90-word email to [name, role, company] referencing [specific
public signal with URL]. State a hypothesis about their pain. Ask one
question. No product features. No buzzwords. Plain text.
```

- Output: Email draft.
- Verification: A human reads aloud; if it sounds like a template, reject.
- Failure mode: Generic personalization tokens that read worse than no
  personalization.

#### 8.1.5 Proposal draft

- Decision: What to put in the proposal.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED) for long-form structure.
- Prompt:

```
Draft a proposal for [company] based on the discovery notes below. Use
the sections: situation, proposed approach, scope, deliverables, success
metrics, timeline, investment, assumptions, exclusions. Quote the
discovery notes verbatim for any claim about their situation.

NOTES:
[paste]
```

- Output: Structured proposal.
- Verification: Each "their situation" claim traceable to notes.
- Failure mode: Invented numbers in success metrics or ROI claims.

### 8.2 Marketing

#### 8.2.1 Positioning statement

- Decision: How we describe ourselves.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Given product [paste], ICP [paste], top 3 competitors [paste], and our
top 3 differentiators [paste], produce 5 positioning statements in the
form: "For [target], who [pain], [product] is [category] that [benefit],
unlike [competitor], which [contrast]." Then critique each for clarity,
defensibility, and specificity.
```

- Output: 5 candidates plus critique.
- Verification: Test with 3 friendly buyers; does any one land.
- Failure mode: Category-jargon that means nothing to buyers.

#### 8.2.2 Persona development

- Decision: Who we are writing to.
- Best AI: Claude or ChatGPT (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
From the customer interview transcripts below, build a persona for the
primary buyer. Include: title variants, day-in-the-life, JTBD,
information sources, objections, success metrics, who they report to,
who reports to them. Cite transcript lines for every attribute.

TRANSCRIPTS:
[paste]
```

- Output: Evidence-cited persona.
- Verification: Buyer reviews their own persona; corrections logged.
- Failure mode: Demographic stereotypes; missing the JTBD.

#### 8.2.3 Channel selection

- Decision: Where to spend the next dollar.
- Best AI: Claude or ChatGPT (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Given current channel performance [paste table: channel, spend, leads,
SQL, CAC, payback] and our ICP, recommend the next channel to test and
the one to cut. Justify with the table only. Propose a test design with
budget, duration, success metric, and stop-loss.
```

- Output: Test plan.
- Verification: CFO signs off on the budget; the stop-loss is real.
- Failure mode: "Try everything" recommendation; no stop-loss.

#### 8.2.4 Content calendar

- Decision: What to publish.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Given our positioning [paste], persona [paste], and content goals [paste:
e.g., demand, brand, hire], propose 8 weeks of content. For each item:
title, format, audience, JTBD it serves, distribution channel, success
metric, owner.
```

- Output: 8-week calendar.
- Verification: Owner-availability check; conflicts surfaced.
- Failure mode: Calendar nobody owns.

#### 8.2.5 SEO topic clusters

- Decision: What topics to dominate.
- Best AI: Perplexity (USER_PROVIDED_UNVERIFIED) for SERP scan; Claude for
  cluster synthesis.
- Prompt:

```
Given seed topic [paste], propose 3 topic clusters with: pillar page,
8-12 supporting pages, search intent for each, internal link strategy,
and a measurable target (e.g., share of category SERPs). Do not invent
search volumes; if you cannot cite, mark UNSOURCED.
```

- Output: Cluster plan.
- Verification: Spot-check 5 queries on a real search engine.
- Failure mode: Hallucinated search volumes.

### 8.3 Operations

#### 8.3.1 SOP authoring

- Decision: How a task gets done repeatably.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
From the interview notes with the person who does this task [paste],
produce an SOP with: purpose, inputs, prerequisites, step-by-step
actions, decision points, outputs, definitions of done, rollback steps,
escalation contacts. Cite the notes for each step.
```

- Output: SOP doc.
- Verification: A second operator runs the SOP cold and reports gaps.
- Failure mode: Plausible-sounding steps that skip a real edge case.

#### 8.3.2 KPI tree

- Decision: What to measure.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Given top-line goal [e.g., revenue growth 2x in 12 months], decompose
into a KPI tree: 1st-level drivers, 2nd-level metrics, leading
indicators, instrumentation source for each leaf. Mark any leaf where
the data does not exist today.
```

- Output: KPI tree.
- Verification: Each leaf has an owner and a query.
- Failure mode: Vanity metrics on the tree.

#### 8.3.3 Vendor evaluation

- Decision: Which vendor to pick.
- Best AI: Claude or ChatGPT (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Compare vendors [A, B, C] for [use case]. Build a weighted scorecard:
feature fit, integration depth, security posture, pricing model, vendor
risk. Cite vendor docs (URLs) for each feature claim. Mark
UNDOCUMENTED where not in public docs.
```

- Output: Scorecard.
- Verification: Click each URL; confirm the claim.
- Failure mode: Marketing pages cited as documentation.

### 8.4 Finance

#### 8.4.1 Unit economics

- Decision: Are we economic per unit.
- Best AI: Claude or ChatGPT (USER_PROVIDED_UNVERIFIED) for modeling.
- Prompt:

```
Given the inputs below, compute: gross margin per unit, contribution
margin per unit, CAC, CAC payback (months), LTV (multiple methods:
margin-based, cohort-based), LTV/CAC. Show formulas and assumptions.
Flag any assumption I have not provided.

INPUTS:
[paste: price, COGS, variable cost, fixed cost allocation, churn, ACV,
gross margin, CAC components]
```

- Output: Model with formulas.
- Verification: Recompute one cohort by hand; numbers match.
- Failure mode: LTV using gross-revenue not gross-margin; ignoring churn
  curve shape.

#### 8.4.2 CAC / LTV / churn analysis

- Decision: Where the leak is.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Given cohort table [paste: signup month, customers, monthly revenue
retention by month], compute: gross dollar retention, net dollar
retention, logo churn, revenue churn, expansion rate. Identify the worst
cohort by NRR and propose three hypotheses for its underperformance, each
with a test.
```

- Output: Retention diagnostic.
- Verification: Cohort math reproducible by finance.
- Failure mode: Averaging across cohorts hides a recent decline.

#### 8.4.3 Pricing architecture

- Decision: How to price.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Given product [paste], value drivers [paste], competitor pricing [paste:
URLs], and ICP willingness-to-pay signals [paste interviews], propose a
pricing architecture with: pricing axis (per-seat, per-usage, per-value,
tiered), tier definitions, anchor pricing, discount policy, expansion
levers, downsell guardrails. For each, name the assumption it rests on
and a test to validate.
```

- Output: Architecture doc.
- Verification: 5 buyer conversations probing the axis.
- Failure mode: Copying competitor pricing without modeling our cost
  structure.

#### 8.4.4 13-week cash forecast

- Decision: Will we run out of cash.
- Best AI: Claude or ChatGPT (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Build a 13-week cash forecast given starting cash [X], weekly receipts
schedule [paste], weekly disbursements schedule [paste], and known
one-offs [paste]. Output a weekly table with: opening, receipts,
disbursements, closing, runway weeks. Mark every assumption.
```

- Output: 13-week table.
- Verification: Tie to bank balance week 1; reconcile.
- Failure mode: Missing a recurring vendor; optimistic AR aging.

#### 8.4.5 Scenario planning

- Decision: How to plan for downside.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Given the base plan [paste], build downside (-30% revenue), severe (-50%),
and upside (+25%) scenarios. For each, show: cash runway, hiring plan
delta, marketing budget delta, decision trigger thresholds, and the date
by which the decision must be made.
```

- Output: Scenario doc.
- Verification: Board reviews triggers; pre-commits to actions.
- Failure mode: Scenarios with no triggers; "we'll decide then."

### 8.5 Legal

> Safety: AI legal output is not legal advice. Confirm with counsel
> licensed in the relevant jurisdiction.

#### 8.5.1 Contract review (first pass)

- Decision: Where to push back.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED) for long context.
- Prompt:

```
Given the contract below and our standard positions [paste], produce a
redline-style review: clause, current language, our standard, gap, risk
(low/medium/high), suggested rewrite. Quote the operative clause
verbatim. Do not opine outside the standard positions.

CONTRACT:
[paste]
```

- Output: Redline table.
- Verification: Counsel reviews high-risk rows before send.
- Failure mode: Treating AI suggestions as final.

#### 8.5.2 NDA classification

- Decision: Sign as-is or redline.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Classify the NDA below against our policy [paste: term length, mutual
vs. one-way, IP carveouts, residuals, governing law]. Output: pass /
fail by criterion with the clause quote.
```

- Output: Pass/fail table.
- Verification: Spot-check by counsel monthly.
- Failure mode: Missing a non-standard clause not in the policy.

#### 8.5.3 Policy drafting

- Decision: What policy to publish.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Draft a [policy type: privacy, acceptable use, data retention] policy
for a company with [profile]. Use plain language. Highlight every
jurisdictional assumption I must confirm with counsel.
```

- Output: Draft + assumptions list.
- Verification: Counsel review before publication.
- Failure mode: Borrowing a template from the wrong jurisdiction.

### 8.6 HR

#### 8.6.1 Job description

- Decision: Who we are hiring.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Draft a JD for [role] based on outcomes [paste: 6-month and 12-month
outcomes], required skills [paste], not-required [paste]. Plain language.
No "rockstar," no "ninja." Inclusive language. Salary band [paste] and
location policy [paste] included.
```

- Output: JD.
- Verification: Hiring manager reads aloud; would they apply.
- Failure mode: Skills laundry list with no outcomes.

#### 8.6.2 Interview rubric

- Decision: How to evaluate.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
For role [paste JD], produce an interview rubric: 5 competencies, each
with: definition, 3 behavioral questions, scoring anchors (1-5) with
observable behavior at each level, red flags. Calibration note for
interviewers.
```

- Output: Rubric.
- Verification: Two interviewers score the same candidate; deltas
  reviewed.
- Failure mode: Anchors that are aspirations not behaviors.

#### 8.6.3 Performance review

- Decision: How to give feedback.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED) - operator use only, never
  raw to employee.
- Prompt:

```
Given the manager's notes and self-review below, draft a structured
review covering: outcomes vs. goals, strengths with examples, growth
areas with examples, development plan, calibration note. Plain language.
No template phrases. Mark anywhere I should add specifics.
```

- Output: Draft review.
- Verification: Manager edits and owns final version.
- Failure mode: Generic phrases that read as canned.

### 8.7 Customer Support

#### 8.7.1 Reply draft (human approves)

- Decision: How to answer.
- Best AI: Claude or ChatGPT (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Draft a reply to the customer message below using only the KB articles
cited. Tone: warm, direct, plain. If the question cannot be answered from
the KB, say so and propose the next step. Cite KB article ids inline.

MESSAGE:
[paste]
KB:
[paste]
```

- Output: Draft + KB ids.
- Verification: Agent edits before send.
- Failure mode: Fabricated policies not in KB.

#### 8.7.2 Macro / canned response generation

- Decision: What recurring replies to standardize.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
From the ticket sample below, cluster into top 10 intents. For each,
propose a macro: trigger phrases, response template with variables,
when to escalate. Output as a table.
```

- Output: Macro proposals.
- Verification: Agents test on shadow tickets.
- Failure mode: Macros that hide a product bug rather than fix it.

#### 8.7.3 Voice-of-customer synthesis

- Decision: What to fix in the product.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
From the ticket sample below, cluster pain themes. For each: theme,
frequency, severity (impact x users), example quotes, product area
implicated. Rank by frequency * severity. Do not propose solutions.
```

- Output: Theme report.
- Verification: PM reviews; engineering confirms scope.
- Failure mode: Vocal-minority bias; weight by representative sample.

### 8.8 Product

#### 8.8.1 PRD authoring

- Decision: What we are building.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Given the problem statement [paste], user research [paste], and
constraints [paste], draft a PRD: problem, users, JTBD, goals,
non-goals, success metrics, scope, out-of-scope, dependencies, risks,
open questions. Each section is short and specific.
```

- Output: PRD.
- Verification: Engineering and design sign off on scope and risks.
- Failure mode: Non-goals missing; scope drift starts at draft time.

#### 8.8.2 User-research synthesis

- Decision: What we learned.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
From the interview transcripts below, extract: top 5 JTBDs, top 5 pains,
top 5 workarounds, top 5 desired outcomes. Quote line numbers for each.
Mark any claim supported by only one transcript as SINGLE_SOURCE.
```

- Output: Themes with quotes.
- Verification: A second researcher re-codes a sample; agreement
  measured.
- Failure mode: Theming biased toward our hypothesis.

#### 8.8.3 Prioritization (RICE / ICE / WSJF)

- Decision: What to build first.
- Best AI: Claude or ChatGPT (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Given the backlog below with reach, impact, confidence, and effort
estimates, compute RICE scores and rank. Show formula. Flag any item
whose confidence is below 50%; do not let it score above the top
quartile by RICE alone without a confidence-raising step.
```

- Output: Ranked backlog.
- Verification: Engineering sanity-checks effort; sales sanity-checks
  reach.
- Failure mode: Pretending RICE is objective; inputs are still guesses.

### 8.9 Strategy

#### 8.9.1 GTM strategy

- Decision: How we go to market.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Given product [paste], ICP [paste], current traction [paste], and
constraints [paste: team size, runway, geo], propose a GTM strategy:
motion (PLG/SLG/hybrid), segment focus, channel mix, pricing alignment,
sales cycle expectations, leading indicators, 90-day plan, 12-month
plan. For each recommendation, name the assumption and the test.
```

- Output: GTM doc.
- Verification: Sales lead and marketing lead commit to the 90-day plan.
- Failure mode: "PLG and SLG simultaneously" with neither resourced.

#### 8.9.2 Competitive moat analysis

- Decision: Where our durability comes from.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
For our product [paste] in market [paste], analyze candidate moats:
network effects, switching costs, scale economies, brand, regulatory,
data, embedded workflow, IP. For each: present strength (1-5),
trajectory (improving/flat/eroding), evidence, action to deepen, risk
factors. Be skeptical; the default is no moat.
```

- Output: Moat scorecard.
- Verification: An external advisor stress-tests each claim.
- Failure mode: Confusing temporary advantage with moat.

#### 8.9.3 Build vs. buy vs. partner

- Decision: How to enter an adjacent capability.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
For capability [paste], evaluate build vs. buy vs. partner along:
strategic fit, time-to-value, total cost (12 and 36 months), control,
risk, optionality. Score each option. Recommend with reasoning summary
and the top 2 disqualifiers for the rejected options.
```

- Output: Decision memo.
- Verification: Finance models the costs; engineering models the build
  timeline.
- Failure mode: Underestimating "buy" integration cost or "build"
  maintenance cost.

#### 8.9.4 Board update

- Decision: What to tell the board.
- Best AI: Claude (USER_PROVIDED_UNVERIFIED).
- Prompt:

```
Given metrics [paste], wins [paste], losses [paste], asks [paste], draft
a board update: headline, metric scorecard, what is working, what is not
working, asks, top risks, next 90 days. Plain language. No spin. Flag
anything I should remove for legal or candor reasons.
```

- Output: Board doc.
- Verification: CFO and CEO sign off; investors get the same numbers as
  internal.
- Failure mode: Spin that creates a trust gap later.

---

## 9. Common Mistakes

| Mistake | Why it fails | Fix |
|---|---|---|
| Asking AI for "ideas" with no context | Generic outputs no operator can use. | Provide evidence; demand citations. |
| Treating AI synthesis as truth | Source quality is unknown. | Verify against primary sources. |
| Skipping the verification step | Errors propagate into customer-facing actions. | Always verify before send. |
| Letting AI press send | Reputation and financial risk. | Human approval at the boundary. |
| Using the wrong AI for the job | E.g., long-context task in a short-context surface. | Pick by capability, not habit. |
| Reusing a prompt across functions | Each function has its own decision shape. | Adapt the template per use case. |
| Treating "best AI for the job" as fixed | Models change monthly. | Re-test quarterly. |
| Confusing content with decision | Pretty prose, bad decision. | Optimize for inputs, not output style. |

---

## 10. Recovery Commands

### 10.1 Output audit

```
For the AI output below, produce a row per claim: claim text, source
provided (yes/no), citation, verification status. Mark any claim without
a source UNSUPPORTED. Do not rewrite.
```

### 10.2 Wrong-tool audit

```
For the use cases I ran this week, list: use case, tool used, output
quality (1-5), failure mode if any. Recommend tool changes for any
quality <= 3.
```

### 10.3 Approval-gate audit

```
List every action this week that contacted a customer, moved money, or
changed a system of record. For each, name the approver and the approval
timestamp. Flag any action without a named approver.
```

### 10.4 Decision-quality review

```
For three decisions made this month using AI inputs, retrospect: was the
input correct, was the decision correct, what would change next time.
Output as a table.
```

---

## 11. Verification Checklist

- [ ] Every use case has a written decision it supports.
- [ ] Every prompt has a constrained output shape.
- [ ] Every output has a verification step the operator can perform.
- [ ] Every customer-facing or financial action has a named human
      approver.
- [ ] Every "best AI for the job" claim is retested on real tasks
      quarterly.
- [ ] Every catalog entry has a documented failure mode.
- [ ] No prompt requests hidden chain-of-thought; reasoning summary only.

---

## 12. Practice Drills

1. **Use-case schema drill.** Pick a recent business decision. Reverse-fit
   it into the schema (decision, inputs, tool, prompt, output,
   verification, approval, failure mode). Note missing pieces.
2. **Tool re-test.** Take three use cases. Run them on two different AI
   surfaces. Score outputs. Update your defaults.
3. **Verification drill.** For one customer-facing AI output, trace every
   claim to a source. Note any UNSUPPORTED.
4. **Approval-gate drill.** Map the top 10 actions in your business that
   AI could trigger. For each, name the approver. Find the gaps.
5. **Wrong-tool retro.** Find a use case where the AI underperformed.
   Identify whether the cause was tool fit, prompt quality, or input
   quality.
6. **Decision-quality drill.** Pick one decision per function this
   quarter. Track input quality and outcome. Calibrate over time.

---

## 13. Summary

The operator value of AI is leverage on decisions. Every use case has the
same shape: decision, inputs, tool, prompt, output, verification,
approval, action. The catalog is a starting kit; the operator extends it
by writing the next use case in the same shape.

The "best AI for the job" defaults are heuristics that drift. Re-test
quarterly. Verify outputs against primary sources. Keep human approval at
every customer-facing or financial boundary. Optimize for input quality;
content quality follows.

If you cannot point at the decision the AI supported, you produced
content, not leverage.
