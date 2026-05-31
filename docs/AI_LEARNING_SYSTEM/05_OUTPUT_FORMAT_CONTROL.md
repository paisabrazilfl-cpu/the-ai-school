# 05 - Output Format Control

> Verification tags used in this document: VERIFIED_LOCAL, VERIFIED_DOCS, USER_PROVIDED_UNVERIFIED, CUSTOM_WORKFLOW, LIKELY_NATIVE_UNVERIFIED, UNKNOWN, DEPRECATED.
> WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

---

## 1. Purpose

Control the shape of model output so it is usable, comparable across runs, and machine-parseable when needed. Format is independent of content: the same facts can be delivered as bullets, a table, JSON, a SOP, or a decision matrix, and only one of those will be the right tool for the job at hand.

This document is the shape-discipline companion to file 03 (formula) and file 04 (vocabulary), and pairs with file 06 (hallucination control) on JSON reliability.

---

## 2. Who It Is For

| Reader | Use This Document To |
|---|---|
| Beginner | Stop accepting prose-by-default. |
| Operator | Match the right shape to the task. |
| Builder | Specify structured outputs for downstream code. |
| Reviewer | Force comparable outputs across teammates' prompts. |

---

## 3. Beginner Explanation

When you do not specify a format, the model picks one for you. Usually it picks prose with bullets. Prose is the worst format for decisions, comparisons, audits, automation, and any task you will re-run.

Match the shape to the job:

- Decision -> decision matrix.
- Comparison -> table.
- Audit -> checklist.
- Pipeline input -> JSON.
- Procedure -> numbered SOP.
- Risk -> risk matrix.
- Hierarchy -> ASCII tree.
- Quick answer for a human -> BLUF + bullets.

---

## 4. Operator Explanation

Format is a control surface. It changes:

1. How comparable two runs are. (Tables are diff-able; prose is not.)
2. How quickly a human can act. (Checklists are scannable; paragraphs are not.)
3. Whether the output can feed downstream code. (Strict JSON yes; prose no.)
4. Where the model can hide hand-waving. (Tables expose empty cells; prose hides them.)

Operator rule: specify the format completely - columns, keys, ordering, what to do with missing values - or expect drift.

---

## 5. Core Concepts

Format spec has five sub-specifications:

1. Outer shape (bullets / table / JSON / tree / etc.).
2. Named fields (columns, keys, sections).
3. Ordering rule (rank by X, chronological, dependency order).
4. Missing-value policy (UNKNOWN, N/A, null, drop the row).
5. Boundary policy (no preamble, no closing remarks, no markdown fences around JSON).

A format without all five drifts.

---

## 6. Workflow

```
ASCII WORKFLOW

[Identify task type]
       |
       v
[Pick outer shape from menu]
       |
       v
[Name fields (columns / keys / sections)]
       |
       v
[State ordering rule]
       |
       v
[State missing-value policy]
       |
       v
[State boundary policy]
       |
       v
[Send prompt]
       |
       v
[Validate output against spec]
       |
       v
[If drift: send recovery prompt]
```

CUSTOM_WORKFLOW.

---

## 7. Cheat Sheet

```
SHAPE              USE WHEN                          DO NOT USE WHEN
bulleted list      quick human read                  comparison, machine input
numbered list      ordered steps                     unordered set
table              comparison, audit                 narrative
JSON (strict)      machine input                     human-only consumption
JSON Schema        contract definition               one-off output
checklist          actionable audit                  analysis / decision
ASCII tree         hierarchy / dependency            tabular comparison
code block         code / config                     prose
diff / patch       minimal change to known text      net-new content
SOP                repeatable procedure              one-off advice
executive summary  decision for time-poor reader     deep technical detail
ranked list        prioritization                    equal-weight set
risk matrix        risk surfacing                    cost / benefit
decision matrix    multi-criteria decision           single-criterion choice
state machine      stateful workflow                 stateless task
```

---

## 8. Examples

For each format: when to use, when not to, prompt snippet, worked example (truncated).

### 8.1 Bulleted List

When to use: quick human scan, equal-weight items, fewer than ~12 entries.
When not to use: comparison across attributes, machine consumption, ordered procedures.

Prompt snippet:

```
Return a flat bulleted list, max 7 bullets, each starting with a strong verb,
each under 15 words. No nested bullets. No preamble.
```

Worked example (truncated):

```
- Audit churn cohorts by signup quarter.
- Tag any segment with N < 30 as LOW_N.
- Rank top 3 churn predictors by lift.
- Propose one intervention per predictor.
- Define a tripwire metric for each.
```

### 8.2 Numbered List

When to use: ordered steps that are not yet a full SOP.
When not to use: unordered sets (people misread numbers as ranking).

Prompt snippet:

```
Return a numbered list of steps. Each step is a single imperative sentence.
Number from 1. Do not include sub-steps. No preamble.
```

Worked example (truncated):

```
1. Export the cohort table to CSV.
2. Filter to accounts with signup_date in 2023.
3. Compute 90-day retention per cohort month.
...
```

### 8.3 Table

When to use: comparison across two or more attributes; any time you might re-run and want diffable output.
When not to use: narrative; single-attribute lists.

Prompt snippet:

```
Return a Markdown table with exactly these columns:
Option | Cost | Risk | Owner | Decision Date.
Sort by Cost ascending. For missing values write UNKNOWN. No preamble.
```

Worked example (truncated):

```
| Option | Cost   | Risk   | Owner | Decision Date |
|--------|--------|--------|-------|---------------|
| A      | $12k   | Low    | Sara  | 2026-05-31    |
| B      | $20k   | Medium | Raj   | 2026-05-31    |
| C      | UNKNOWN| High   | Lin   | UNKNOWN       |
```

### 8.4 JSON (strict)

When to use: any output that will be parsed by code.
When not to use: human-only consumption.

Prompt snippet:

```
Return strict JSON. No prose, no markdown fences, no trailing text.
Schema:
{
  "options": [
    {"name": str, "cost_usd": int, "risk": "low"|"medium"|"high", "owner": str}
  ],
  "winner": str,
  "rationale_summary": str
}
For missing values use null. Do not invent fields.
```

Worked example (truncated):

```
{"options":[{"name":"A","cost_usd":12000,"risk":"low","owner":"Sara"}],
 "winner":"A","rationale_summary":"Lowest cost, low risk, owner committed."}
```

### 8.5 JSON Schema

When to use: defining a contract that other prompts or services will follow.
When not to use: ad-hoc outputs.

Prompt snippet:

```
Return a JSON Schema (draft 2020-12) for the following object shape: [describe shape].
Include required, type, and description for every field. Return only the schema as JSON,
no prose.
```

Worked example (truncated):

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["options", "winner"],
  "properties": {
    "options": {"type": "array", "items": {"$ref": "#/$defs/option"}},
    "winner": {"type": "string"}
  },
  "$defs": {
    "option": {
      "type": "object",
      "required": ["name", "cost_usd", "risk", "owner"],
      "properties": {
        "name": {"type": "string"},
        "cost_usd": {"type": "integer", "minimum": 0},
        "risk": {"type": "string", "enum": ["low","medium","high"]},
        "owner": {"type": "string"}
      }
    }
  }
}
```

LIKELY_NATIVE_UNVERIFIED: some models support a native "structured output" mode that enforces the schema; others do not.

### 8.6 Checklist

When to use: pre-flight, audit, sign-off, repeatable verification.
When not to use: analysis or decisions.

Prompt snippet:

```
Return a checklist of verb-first items, max 12 items. Each item is independently
verifiable in under 2 minutes. Use - [ ] Markdown checkbox syntax. No preamble.
```

Worked example (truncated):

```
- [ ] Confirm cohort table is exported as CSV.
- [ ] Validate row count matches source system.
- [ ] Flag segments with N < 30.
- [ ] Record analysis date.
```

### 8.7 Decision Matrix

When to use: multi-criteria decisions, especially with explicit weights.
When not to use: single-criterion choices or non-decisions.

Prompt snippet:

```
Return a decision matrix as a Markdown table.
Rows: options.
Columns: each criterion with its weight in parentheses (weights sum to 1.0).
Cells: integer score 1-5.
Add a final column "Weighted Total" computed as sum(weight * score).
Sort by Weighted Total descending. State the winner under the table.
```

Worked example (truncated):

```
| Option | Cost (0.4) | Risk (0.3) | Speed (0.3) | Weighted Total |
|--------|------------|------------|-------------|----------------|
| A      | 5          | 4          | 3           | 4.1            |
| B      | 3          | 5          | 4           | 3.9            |

Winner: A.
```

### 8.8 Risk Matrix

When to use: risk surfacing, governance reviews, pre-mortems.
When not to use: cost/benefit (use decision matrix).

Prompt snippet:

```
Return a 5-row risk matrix as a Markdown table:
Risk | Likelihood (L/M/H) | Impact (L/M/H) | Mitigation | Owner.
Sort by Impact descending, then Likelihood descending.
```

Worked example (truncated):

```
| Risk                  | Likelihood | Impact | Mitigation                  | Owner |
|-----------------------|------------|--------|-----------------------------|-------|
| Vendor missed SLA     | H          | H      | Dual-source + weekly review | Raj   |
| Data export breaks    | M          | H      | Schema contract + alerts    | Sara  |
```

### 8.9 ASCII Tree

When to use: hierarchies, dependencies, file systems, decision branches.
When not to use: flat comparisons.

Prompt snippet:

```
Return an ASCII tree. Use | and `-- conventions. Max depth 4. No prose around it.
```

Worked example (truncated):

```
Launch
|-- Pricing
|   |-- Tiering decision
|   `-- Migration comms
|-- Channels
|   |-- Paid search
|   `-- Content
`-- Risk
    |-- Churn spike
    `-- Support volume
```

### 8.10 Code Block

When to use: code, config, command sequences.
When not to use: prose explanation.

Prompt snippet:

```
Return one fenced code block with language tag. No prose before or after the block.
Include type hints. Include 4 unit tests in a second fenced block.
```

Worked example (truncated):

````
```python
def dedupe_records(records, keys):
    seen = set()
    out = []
    for r in records:
        k = tuple(r.get(k) for k in keys)
        if k not in seen:
            seen.add(k)
            out.append(r)
    return out
```
````

### 8.11 Diff / Patch

When to use: minimal changes to a known artifact (contract clause, code, doc).
When not to use: net-new content.

Prompt snippet:

```
Return a unified diff against the supplied text. Use - for removed lines and + for
added lines. Preserve all unchanged context. No prose.
```

Worked example (truncated):

```
- Employee shall not work for any competitor for 24 months following termination.
+ Employee shall not solicit Company customers for 12 months following termination.
```

### 8.12 SOP

When to use: repeatable procedure with owners, time, and exit criteria.
When not to use: one-off advice.

Prompt snippet:

```
Return a numbered SOP. Each step includes: Step | Owner | Time | Action | Exit Criteria.
Use a Markdown table.
```

Worked example (truncated):

```
| # | Owner | Time   | Action                           | Exit Criteria                |
|---|-------|--------|----------------------------------|------------------------------|
| 1 | Sara  | 30 min | Export cohort CSV                | File saved in /reports/      |
| 2 | Raj   | 1 hr   | Compute 90-day retention         | Output reviewed by analyst   |
```

### 8.13 Executive Summary

When to use: time-poor senior reader needs the decision and the why.
When not to use: deep technical work.

Prompt snippet:

```
Return an executive summary in this exact shape:
- Bottom line (1 sentence)
- Decision required (1 sentence)
- Three reasons (3 bullets, each under 20 words)
- Key risk (1 sentence)
- Recommended next step (1 sentence)
No preamble. No appendix.
```

### 8.14 Ranked List

When to use: prioritization where ordering matters.
When not to use: equal-weight sets.

Prompt snippet:

```
Return a ranked list, highest leverage first. For each item include:
rank, item, one-line rationale, expected impact (L/M/H). Max 7 items.
```

Worked example (truncated):

```
1. Move Pro tier from $49 to $69. Rationale: pricing power untested. Impact: H.
2. Add annual prepay discount. Rationale: cash + retention. Impact: M.
```

### 8.15 State Machine

When to use: stateful workflows (orders, tickets, deployments).
When not to use: stateless tasks.

Prompt snippet:

```
Return a state machine as a table:
From State | Event | To State | Guard | Side Effect.
Then a separate table listing all states with definitions.
```

Worked example (truncated):

```
| From    | Event       | To       | Guard          | Side Effect       |
|---------|-------------|----------|----------------|-------------------|
| New     | submit      | Pending  | form valid     | email confirm     |
| Pending | approve     | Active   | reviewer = mgr | provision account |
| Pending | reject      | Closed   | -              | email reason      |
```

---

## 9. Structured Output Reliability

How to ask for strict JSON:

```
Return strict JSON only. Do not include:
- Any text before the opening brace.
- Any text after the closing brace.
- Markdown code fences.
- Comments.
- Trailing commas.

Schema:
{ ... }

For any field where you are not confident, use null. Do not invent fields.
Do not use keys not present in the schema.
```

How to recover from JSON drift:

| Drift | Recovery Prompt |
|---|---|
| Markdown fences around JSON | "Re-emit the previous output as raw JSON with no fences and no surrounding text." |
| Trailing prose | "Re-emit the JSON only. Discard any text outside the braces." |
| Missing keys | "Re-emit including every key in the schema. Use null where data is missing." |
| Extra keys | "Re-emit removing any keys not in the schema." |
| Wrong types | "Re-emit with strict types: cost_usd is integer, risk is one of [low, medium, high]." |
| Truncated | "The previous output was truncated. Re-emit starting from the [key/object] that was cut off." |

How to validate:

1. Parse with a JSON parser. If parsing fails, capture the error and send a recovery prompt.
2. Validate against a JSON Schema (draft 2020-12 or your tool's supported draft). LIKELY_NATIVE_UNVERIFIED on exact draft support.
3. Diff actual keys vs schema keys. Reject extras; fill missing with nulls.
4. Type-check each leaf. Coerce only when safe (e.g., "12000" -> 12000 is safe; "twelve thousand" -> 12000 is not).
5. Enum-check string fields against allowed values.
6. Range-check numerics. Out-of-range -> mark UNKNOWN and re-prompt.
7. For high-stakes outputs, run the same prompt twice and diff. Disagreements between runs flag low-confidence fields. CUSTOM_WORKFLOW.

LIKELY_NATIVE_UNVERIFIED: some platforms offer native structured-output enforcement; verify in your specific model's docs.

---

## 10. Common Mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| Asking for "JSON" without schema | Inconsistent keys across runs. | Provide schema with exact keys and types. |
| Mixing prose and JSON | Parser fails. | "Return strict JSON only, no prose, no fences." |
| Using bullets for comparisons | Hidden gaps, no comparability. | Use a table with named columns. |
| Using prose for decisions | Time-poor reader cannot extract decision. | Use BLUF + decision matrix. |
| Decision matrix without weights | Arbitrary winner. | Specify weights summing to 1.0. |
| Risk matrix without owner column | Risks have no accountability. | Always include Owner. |
| SOP without exit criteria | Steps can be "done" without being done. | Always include Exit Criteria column. |
| Tree too deep | Unreadable. | Cap depth at 4. |
| Missing-value policy unspecified | Fabricated values fill gaps. | Always state UNKNOWN / null / drop policy. |
| Boundary policy unspecified | Preambles and closings creep in. | Always say "no preamble, no closing remarks." |

---

## 11. Recovery Commands

| Failure | Recovery Prompt |
|---|---|
| Wrong shape entirely | "Reformat the previous content as [exact format]. Do not change content." |
| Missing column | "Add the [column name] column. Use UNKNOWN where you lack data." |
| Wrong ordering | "Re-sort by [column] [asc/desc]. Keep all rows." |
| Mixed shapes | "Pick one shape: [format]. Re-emit fully in that shape." |
| Preamble or closing | "Strip the preamble and closing remarks. Output the content only." |
| Markdown fences in JSON | "Re-emit as raw JSON, no fences, no text outside braces." |
| Sub-bullets when forbidden | "Flatten to a single level. Each item is one line." |
| Numbered list when set is unordered | "Convert numbers to bullets. Order does not matter." |
| Empty cells | "Fill empty cells with UNKNOWN. Do not invent values." |
| Inconsistent capitalization or case | "Normalize all keys to lower_snake_case." |

---

## 12. Verification Checklist

Before sending:

- [ ] Outer shape is specified (bullets / table / JSON / tree / etc.).
- [ ] Named fields (columns, keys, sections) are listed exactly.
- [ ] Ordering rule is stated.
- [ ] Missing-value policy is stated (UNKNOWN / null / drop).
- [ ] Boundary policy is stated (no preamble, no closing remarks).
- [ ] For JSON: schema is provided and "strict JSON only, no fences" is stated.
- [ ] For tables: max width is reasonable for the medium.
- [ ] For trees: depth cap is stated.
- [ ] For decision matrices: weights sum to 1.0.
- [ ] For risk matrices: Owner column is present.
- [ ] For SOPs: Exit Criteria column is present.

After receiving:

- [ ] Output parses (for JSON) or matches structure (for tables).
- [ ] No invented fields or columns.
- [ ] No preamble or closing text.
- [ ] Missing values are marked, not invented.
- [ ] Ordering matches the specified rule.

---

## 13. Practice Drills

Drill 1 - Shape swap. Take a working prose answer. Re-prompt the same content as: bullets, table, JSON, SOP, decision matrix. Note which shape made action fastest.

Drill 2 - JSON discipline. Ask for the same data as JSON ten times. Count format drifts. Apply the structured-output prompt template until drift hits zero.

Drill 3 - Decision matrix. Take any recent decision. Force the model to express it as a weighted decision matrix. Compare the matrix winner to your gut answer.

Drill 4 - Risk matrix. Take any plan. Force a 5-row risk matrix with Owner column. Note risks you had not surfaced.

Drill 5 - SOP. Convert an informal procedure into a SOP with Owner, Time, and Exit Criteria. Hand it to a teammate. Note ambiguities.

Drill 6 - Diff format. Take a contract clause or function. Ask for changes as a unified diff. Verify each + and - line.

Drill 7 - Recovery practice. Deliberately ask for a misshapen output. Recover using only the recovery commands in section 11.

---

## 14. Summary

```
Shape is a control surface. Specify all five sub-specs:
  outer shape | named fields | ordering | missing-value | boundary
```

- Match the shape to the job; prose is the worst default.
- Tables for comparisons. JSON for machines. SOP for procedures. Matrix for decisions. Risk matrix for risks. Tree for hierarchies. Diff for minimal changes.
- For JSON: provide schema, demand "strict JSON only, no fences," validate on receipt.
- For drift: send a single targeted recovery prompt; do not rewrite the whole prompt.

WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Tag platform-specific claims.
Never request hidden chain-of-thought; only "reasoning summary."
