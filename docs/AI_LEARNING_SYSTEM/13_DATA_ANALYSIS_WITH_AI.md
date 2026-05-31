# 13 DATA ANALYSIS WITH AI

Part of the AI_LEARNING_SYSTEM manual. Operator-grade guide to using AI as a data analyst pair without letting it lie to you about numbers.

WEB VERIFICATION NOT AVAILABLE IN THIS RUN. All platform-specific claims are tagged. Tags used:
- VERIFIED_LOCAL: confirmed against files in this repo
- VERIFIED_DOCS: confirmed against canonical vendor docs at time of writing
- USER_PROVIDED_UNVERIFIED: stated by user, not re-verified here
- CUSTOM_WORKFLOW: technique recommended by this manual
- LIKELY_NATIVE_UNVERIFIED: plausibly a native feature, not re-verified
- UNKNOWN: cannot be determined without live web access
- DEPRECATED: previously available, may no longer be

---

## 1. Purpose

This chapter teaches you to use AI to accelerate exploratory data analysis (EDA), data cleaning, SQL writing, pandas / numpy code generation, charting, KPI design, anomaly detection, and dashboard wireframes - while never trusting AI math without independent recomputation.

You will learn:
- Prompt templates for every common analysis task
- A verification loop that catches AI numeric hallucinations
- How to ask for uncertainty and confidence, not just point estimates
- A worked example from raw CSV to verified summary

---

## 2. Who It Is For

| Audience | Use this chapter to |
|---|---|
| Beginners | Move from staring at spreadsheets to asking precise questions |
| Analysts | 5x speed on EDA, SQL, and cleaning |
| Engineers | Generate boilerplate pandas / SQL safely |
| Founders / PMs | Design KPIs and dashboards from English |
| Operators | Reproducible analysis recipes with verification gates |

---

## 3. Beginner Explanation

A spreadsheet or CSV is a grid of facts. Analysis is the act of turning that grid into a decision. Historically you had to know SQL, pandas, or Excel formulas to ask questions. Now you can describe the question in English and have AI write the code. But there is a trap: AI can also confidently produce wrong numbers. The fix is simple - ask AI to write code, then run the code (yourself or via a code-execution tool), then compare results.

Three habits:
1. Always describe the data first (schema, dtypes, row count, missingness).
2. Ask for code, not just answers.
3. Run the code. Compare. Never copy a number out of a chat without running the math.

---

## 4. Operator Explanation

At operator level you treat AI as a code generator and reasoning summarizer, not as a calculator. Your pipeline is:

```
DATA -> AI generates code -> Execution environment runs code -> Results -> AI explains -> You verify
```

You version your prompts. You version your data snapshots. You log the exact code that produced each number that ships to a stakeholder. You require any statistic to come with a confidence interval, sample size, or stated uncertainty. You distrust any number presented without supporting code.

---

## 5. Core Concepts

### 5.1 Modalities of AI-Assisted Analysis

| Task | AI does well | AI does badly |
|---|---|---|
| Schema inference | Suggests dtypes and likely keys | Inventing nonexistent columns |
| Data cleaning | Generates pandas code for nulls, types, outliers | Silently dropping rows |
| EDA | Suggests questions, distributions, correlations | Misreading column semantics |
| SQL from English | Writes queries with joins, windows, CTEs | Inventing tables; ambiguous joins |
| pandas / numpy | Idiomatic vectorized code | Inefficient row-wise apply |
| Charting | Specifies chart types and encodings | Choosing misleading scales |
| Stats summaries | Computes means, medians, CIs in code | Doing arithmetic in its head |
| Anomaly detection | Suggests heuristics and ML methods | Calling normal variation anomalous |
| Dashboards | Lays out KPI grids and wireframes | Choosing actually meaningful KPIs |
| KPI design | Suggests candidate metrics and definitions | Conflating leading and lagging |

### 5.2 The Anti-Pattern: AI as Calculator

If you paste a CSV into a chat and ask "what is the average revenue?" and accept the number, you are gambling. Tokens are not arithmetic. Even when the model is right, you have no audit trail.

Replace this with:

```
1. Paste schema and a small sample (not full data unless privacy allows)
2. Ask for code
3. Run code in a real environment
4. Paste the code output back
5. Ask for interpretation
```

### 5.3 Uncertainty First

Every statistic should come with one of:
- Confidence interval (parametric or bootstrap)
- Sample size and standard error
- Stated assumption and sensitivity
- "Not enough data to answer" - a valid answer

Demand this in every prompt.

### 5.4 Reproducibility Recipe

```
RECIPE = DATA_SNAPSHOT_HASH + PROMPT + GENERATED_CODE + EXECUTION_ENV + RESULTS
```

Store the recipe with every analytical output that influences a decision.

---

## 6. Workflow

```
AI-ASSISTED DATA ANALYSIS WORKFLOW
.
|-- 1. SECURE DATA
|     |-- Confirm you may use AI tooling on this data (privacy, compliance)
|     `-- Take a snapshot, record hash
|
|-- 2. DESCRIBE DATA TO AI
|     |-- Provide schema, dtypes, row count, missingness, 5-row sample
|     `-- Provide business context: what each column means
|
|-- 3. SCOPE THE QUESTION
|     |-- Convert vague ask into a precise, falsifiable question
|     `-- State the decision the answer should support
|
|-- 4. ASK FOR CODE, NOT ANSWERS
|     |-- pandas / SQL / numpy
|     `-- Require comments, assumptions, and uncertainty handling
|
|-- 5. RUN CODE
|     |-- Local notebook, code interpreter, or sandbox
|     |-- Capture stdout, dataframes, charts
|
|-- 6. CROSS-CHECK
|     |-- Recompute one number a different way
|     |-- Sanity check magnitudes
|     `-- Validate against a known ground truth row
|
|-- 7. ASK FOR INTERPRETATION (REASONING SUMMARY)
|     |-- Push for caveats, alternative explanations
|
|-- 8. ITERATE
|
|-- 9. SHIP WITH RECIPE
```

---

## 7. Cheat Sheet

### 7.1 Universal Pre-Prompt

```
You are a careful data analyst. Rules:
- Do not perform arithmetic in your head. Always produce runnable code.
- State assumptions explicitly.
- For every statistic, include sample size and a confidence interval or stated uncertainty.
- If data is insufficient, say so.
- Provide a brief reasoning summary, not chain-of-thought.
```

### 7.2 Schema Inference Prompt

```
Given the following first 20 rows of a CSV and the column names, infer:
- a likely dtype per column
- likely primary key candidates
- likely foreign key relationships
- columns likely to contain PII
- columns likely to be derived
Return as a markdown table. Note any ambiguity.
```

### 7.3 Data Cleaning Prompt

```
Write pandas code that, given a DataFrame df with the schema below:
1. Casts dtypes appropriately
2. Reports per-column null counts and unique counts
3. Detects and flags rows with implausible values (state thresholds explicitly)
4. Produces a cleaned DataFrame df_clean without dropping rows silently - all drops must be logged

Schema:
<<<paste schema>>>

Requirements:
- vectorized, no row-wise apply
- comment each step
- include a reasoning summary at the end describing the assumptions
```

### 7.4 Joining Datasets Prompt

```
I have two tables.

Table A: <<<schema>>>
Table B: <<<schema>>>

Business meaning:
- Table A is <<<business meaning>>>
- Table B is <<<business meaning>>>

Goal: <<<analytical goal>>>

Write a pandas merge (and the equivalent SQL) that:
- Picks the correct join type and keys
- Handles duplicates explicitly (state policy)
- Flags rows that fail to match
- Returns a small validation report (matched, unmatched on A, unmatched on B)
Provide a reasoning summary of the join choice.
```

### 7.5 SQL From English Prompt

```
Dialect: <<<Postgres / BigQuery / Snowflake / SQLite>>>
Tables and columns:
<<<paste DDL or schema>>>

Question in English:
<<<question>>>

Write the SQL with:
- CTEs for clarity
- Explicit joins
- Comments on each CTE
- A short reasoning summary explaining the choices
- A second query that returns counts you can use to validate the first (row counts, sums)
```

### 7.6 pandas Code Generation Prompt

```
DataFrame df has columns: <<<list with dtypes>>>

Compute: <<<metric>>>

Constraints:
- Vectorized, idiomatic pandas
- No chained indexing
- Handle nulls explicitly (state policy)
- Return both the metric and a validation count
- Provide a reasoning summary, not chain-of-thought
```

### 7.7 Chart Spec Prompt

```
Given dataframe df with columns <<<list>>>, propose 3 chart specs that would help answer:
<<<question>>>

For each chart return:
- chart type
- x, y, color, facet mappings
- axis scales (linear / log) with justification
- annotations
- a matplotlib or vega-lite snippet
- one sentence on what the reader should conclude if the chart looks like X
```

### 7.8 Statistical Summary Prompt

```
Compute the following statistics for column <<<col>>>, grouped by <<<group>>>:
- count
- mean with 95 percent bootstrap CI (n_boot=2000)
- median with IQR
- standard deviation
- min, max
Return a tidy table and the code that produced it. Do not compute the numbers - only write the code I will run.
```

### 7.9 Anomaly Flag Prompt

```
Given df with columns <<<list>>>, write code that flags rows likely to be anomalies using:
- IQR rule on numeric columns
- z-score with |z| > 3
- isolation forest as an ensemble check
Return a labeled DataFrame with one column per detector and an aggregate `anomaly_score`.
State assumptions and limitations. Do not call non-anomalous variance an anomaly - require multiple detectors to agree before flagging.
```

### 7.10 Dashboard Wireframe Prompt

```
Audience: <<<role>>>
Decision they make: <<<decision>>>
Cadence: <<<daily / weekly>>>
Available data: <<<sources>>>

Design a one-page dashboard:
- 4-6 KPI tiles at top with definition, formula, and target
- 2-3 trend charts
- 1 segment breakdown
- 1 anomaly / alert panel

For each element provide:
- the question it answers
- the SQL or pandas to compute it
- how to verify the number
Return as a markdown wireframe with ASCII layout.
```

### 7.11 KPI Design Prompt

```
Business: <<<one paragraph>>>
North star: <<<single metric or hypothesis>>>

Propose:
- 3 leading indicators
- 3 lagging indicators
- For each: definition, formula, data source, refresh cadence, known failure modes
- A "watch list" of metrics that look useful but are misleading and why
Provide a reasoning summary of the trade-offs.
```

---

## 8. Examples

### 8.1 Worked Example: Small CSV EDA

#### Invented CSV: `coffee_shop_orders.csv`

Schema:

| Column | Dtype | Description |
|---|---|---|
| order_id | string | Unique order identifier (e.g. ORD-00231) |
| order_ts | timestamp | Order placed timestamp, UTC |
| store_id | int | Store identifier, 1 through 12 |
| customer_id | string | Hashed customer identifier; null for guests |
| item | string | Drink name (e.g. "Latte", "Cold Brew") |
| size | string | "S" / "M" / "L" |
| quantity | int | Items in this line |
| unit_price_usd | float | Price per unit at sale time |
| discount_usd | float | Discount applied to the line |
| payment_method | string | "card" / "cash" / "app" |
| loyalty_member | bool | True if customer is enrolled |

5-row sample:

```
ORD-00001, 2026-05-01T08:12:33Z, 3, CUS-9911, Latte,      M, 1, 5.25, 0.00, app,  true
ORD-00002, 2026-05-01T08:14:02Z, 3, ,         Cold Brew,  L, 2, 5.75, 0.50, card, false
ORD-00003, 2026-05-01T08:14:50Z, 7, CUS-2210, Espresso,   S, 1, 3.50, 0.00, cash, true
ORD-00004, 2026-05-01T08:15:11Z, 3, CUS-9911, Croissant,  M, 1, 4.00, 0.00, app,  true
ORD-00005, 2026-05-01T08:17:09Z, 1, CUS-7733, Latte,      L, 1, 6.25, 1.25, card, true
```

#### EDA Prompt You Send

```
You are a careful data analyst. Rules:
- Do not perform arithmetic. Only produce runnable code.
- State assumptions explicitly.
- Provide every statistic with sample size and a 95 percent CI where applicable.
- Provide a reasoning summary, not chain-of-thought.

DataFrame df has been loaded from coffee_shop_orders.csv. Schema:

  order_id        string
  order_ts        timestamp (UTC)
  store_id        int (1..12)
  customer_id     string (nullable; null means guest)
  item            string
  size            string ("S","M","L")
  quantity        int
  unit_price_usd  float
  discount_usd    float
  payment_method  string ("card","cash","app")
  loyalty_member  bool

Business context:
- A line's gross revenue is quantity * unit_price_usd.
- Net revenue is gross - discount_usd.
- An "order" is one order_id (may have many lines, but in this dataset assume one line per row unless duplicates exist).
- Loyalty members are expected to spend more per visit.

Task:
1. Validate the schema and report dtype mismatches.
2. Report per-column null counts and unique counts.
3. Report row count and time range covered.
4. Compute:
   a. Total net revenue (with code, not in your head).
   b. Net revenue per store, top 5.
   c. Average order net revenue with 95 percent bootstrap CI (n_boot=2000).
   d. Loyalty vs non-loyalty average order net revenue, with CIs and a difference test (Welch's t or bootstrap).
   e. Hourly order count, identify peak hour per store.
5. Flag potential data quality issues:
   - negative quantities, negative or zero prices
   - discount greater than gross
   - order_ts outside the expected window
   - duplicate order_id
6. Propose 3 charts that would best summarize the data for a store operations manager. Provide vega-lite or matplotlib snippets.

Do not output computed numerical answers. Output only:
- pandas code I will run
- a reasoning summary describing assumptions and what the analyst should look for in results
```

#### Expected Output Structure From AI

1. A pandas script with sections matching tasks 1-6, vectorized, commented.
2. No invented numbers.
3. A reasoning summary describing:
   - assumption that null customer_id implies guest
   - assumption that one row equals one line
   - the bootstrap choice and its limitations on small samples
   - chart choices and why

#### You Run the Code

You execute the script in a notebook or sandbox. You capture the actual outputs.

#### Verification Checklist for This Example

- [ ] Row count from `len(df)` matches the source CSV row count
- [ ] Total net revenue recomputed two ways:
  - Way A: `(df['quantity'] * df['unit_price_usd'] - df['discount_usd']).sum()`
  - Way B: aggregate by store then sum store totals; compare equality
- [ ] Per-store revenue sums to total net revenue exactly (within float tolerance)
- [ ] Hourly buckets cover the entire time range with no gaps
- [ ] Loyalty group sizes are both large enough to compute CIs; if not, report "insufficient data"
- [ ] Spot check: pick one `order_id` manually, compute its net revenue, compare to the script
- [ ] Data quality flags actually fire on synthetic test rows you inject
- [ ] Charts have correct axes, units, and titles

#### Then Ask AI For Interpretation

```
Here are the actual outputs from running the code:

<<<paste outputs and charts as text>>>

Provide a reasoning summary of:
- the top 3 findings
- caveats given sample size and time range
- 3 follow-up questions worth investigating
- any result that looks suspicious and how to validate it
```

### 8.2 SQL From English Example

```
Dialect: Postgres
Tables:
  orders(order_id, order_ts, store_id, customer_id, net_revenue_usd)
  customers(customer_id, signup_ts, loyalty_tier)

Question:
For each loyalty_tier, what is the median order net revenue in the last 30 days,
and how does it compare to the prior 30 days?

Write the SQL with CTEs and comments, plus a second validation query that returns:
- row counts per tier per window
- min and max order_ts per window
so I can sanity check the date filtering.
```

### 8.3 Anomaly Detection Example

```
df has columns:
  ts, store_id, hourly_order_count, hourly_net_revenue_usd

Write code to flag anomalous store-hours using:
- IQR per (store_id, hour_of_week)
- z-score across the same group
- isolation forest across (hourly_order_count, hourly_net_revenue_usd)

Require at least 2 of 3 detectors to agree before flagging.
Return a DataFrame anomaly_report sorted by aggregate score.
State assumptions about seasonality.
```

---

## 9. Common Mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| Accepting numbers from chat | Wrong KPI ships | Always require code; always run code |
| Asking arithmetic of the model | Confidently wrong totals | Forbid in-head math in your pre-prompt |
| Not describing schema | Hallucinated columns | Always paste schema and dtypes |
| Pasting all data into chat | Privacy / cost / context bloat | Paste schema and small sample; run code locally |
| No uncertainty | Decisions on noise | Require CIs or "insufficient data" |
| Silent row drops | Numbers do not reconcile | Require explicit drop logs |
| Ambiguous joins | Wrong granularity | Spell out keys and join type |
| Misleading chart scales | False conclusions | Require justification for log / clipped axes |
| Calling normal variance "anomaly" | Alert fatigue | Require multi-detector agreement |
| No recipe | Cannot reproduce | Log data hash, prompt, code, env, output |
| Chain-of-thought requests | Verbose, slower, often disallowed | Ask for reasoning summary instead |

---

## 10. Recovery Commands

CUSTOM_WORKFLOW unless tagged.

### 10.1 "Numbers do not reconcile"

```
The total from method A is <<<X>>> and from method B is <<<Y>>>. They should be equal.

Without performing arithmetic yourself, propose:
- the 5 most likely causes (null handling, duplicates, dtype coercion, filter mismatch, timezone)
- a diagnostic script that isolates each cause with a count or sample
- a reasoning summary
Do not guess which is right - produce the diagnostics.
```

### 10.2 "Recompute Differently"

```
Here is the code that produced <<<metric>>>:

<<<code>>>

Write a completely different implementation that computes the same metric using a different approach (e.g. groupby vs pivot, SQL window vs self join). Return only the alternative code. I will compare outputs.
```

### 10.3 "Audit the join"

```
Given the join code:

<<<code>>>

Write a validation script that returns:
- row counts before and after
- unmatched keys on each side, sampled
- duplicate-key counts on each side
- distribution of join multiplicities
Provide a reasoning summary of how to interpret each.
```

### 10.4 "Strip the hallucinated columns"

```
The previous response referenced columns not in my schema. Here is the authoritative schema:

<<<schema>>>

Re-write the code using only columns that exist. If a requested computation cannot be done with the available columns, state that explicitly and propose what data would be needed.
```

### 10.5 "Reconstruct a lost recipe"

```
I have this final number: <<<value>>>. I no longer have the code.

Given the schema below, produce:
- 3 candidate code snippets that could plausibly produce this number
- a diagnostic that distinguishes between them
- a reasoning summary
```

---

## 11. Verification Checklist

Run on every analytical deliverable.

Data
- [ ] Data snapshot hashed and stored
- [ ] Row count verified against source
- [ ] Time range explicitly stated
- [ ] PII handling reviewed VERIFIED_DOCS per your org policy

Code
- [ ] Generated by AI, reviewed by human
- [ ] Vectorized where possible
- [ ] No silent drops
- [ ] Null policy explicit
- [ ] Stored in version control

Numbers
- [ ] Every reported number traced to a line of code
- [ ] At least one cross-check method
- [ ] Sample sizes reported
- [ ] Confidence intervals or stated uncertainty
- [ ] Magnitudes pass sanity check against domain knowledge

Charts
- [ ] Axes labeled with units
- [ ] Scales justified (linear vs log; clipped vs full)
- [ ] No 3D, no dual axes unless justified
- [ ] Title states the question, not the chart type

Anomalies
- [ ] Multi-detector agreement required
- [ ] Seasonality considered
- [ ] False positive rate estimated

Dashboards / KPIs
- [ ] Each KPI has owner, definition, formula, refresh cadence
- [ ] Leading vs lagging clearly labeled
- [ ] Known failure modes documented

Reproducibility
- [ ] Recipe (data hash, prompt, code, env, results) logged

---

## 12. Practice Drills

Drill 1 - Schema first
- Take any CSV. Without opening it, write the schema you expect. Then open and compare. Note where you were wrong; the AI will be wrong in similar places if you do not provide schema.

Drill 2 - Force-the-code
- Ask AI "what is the average of this column" with a small CSV in chat. Note its number. Now ask for code. Run it. Compare. Reflect on what you would have shipped.

Drill 3 - Cross-check
- For a single metric, produce 3 implementations (pandas groupby, pandas pivot, SQL window). All three must match.

Drill 4 - Bootstrap CIs
- For a mean and a median, compute 95 percent bootstrap CIs with n=200, n=2000, n=20000. Note where the CI stops moving.

Drill 5 - Join audit
- Construct a deliberate many-to-many join. Predict the row explosion. Run the audit script.

Drill 6 - Anomaly tuning
- Inject 5 synthetic anomalies into a clean dataset. Tune detectors until exactly those 5 are flagged with zero false positives.

Drill 7 - KPI critique
- Take a dashboard you use. List every KPI. For each, ask: leading or lagging? How can it be gamed? What is the failure mode?

Drill 8 - Recovery
- Delete a notebook cell containing the code that produced a key number. Try to reconstruct using the recovery template.

---

## 13. Summary

AI accelerates data analysis only if you forbid it from being a calculator. Use AI to generate code, explain results, propose questions, design KPIs, and wireframe dashboards. Run the code yourself. Cross-check every number two ways. Require uncertainty on every statistic. Log the recipe. The workflow is simple: describe the data, scope the question, ask for code with a reasoning summary, run it, verify, interpret, ship with the recipe. Done this way, AI is the fastest analyst on your team. Done carelessly, it is a confident liar with a spreadsheet.

WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Re-confirm tool-specific syntax (BigQuery vs Snowflake vs Postgres dialect differences, pandas version-specific APIs, statistical library versions) against current documentation before production use.
