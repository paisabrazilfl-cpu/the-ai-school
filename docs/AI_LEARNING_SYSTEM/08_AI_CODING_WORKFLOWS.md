# 08 - AI CODING WORKFLOWS

> WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Tool behaviors are tagged with
> verification status. Confirm vendor-specific claims against the current
> product documentation before relying on them.

---

## 1. Purpose

This document defines the operating discipline for using AI to write, change,
review, and ship code. The objective is **evidence-backed changes**: every
modification to a codebase must be linked to a requirement, a plan, a test, and
a verifiable runtime result.

The dominant failure mode of AI coding is the **"plausibly fixed" output**:
code that compiles, looks reasonable, and is in fact wrong. The pipeline below
exists to make that failure mode hard to reach.

---

## 2. Who It Is For

| Role | Why this matters |
|---|---|
| Engineer | Daily driver of AI coding tools; needs guardrails. |
| Tech lead | Reviews AI-assisted PRs; needs an evidence standard. |
| Solo founder | May ship without a second pair of eyes; needs self-review. |
| Product manager | Needs to understand what "done" means with AI authoring. |
| Security reviewer | Needs anti-pattern catalog for AI-written code. |
| Operator hiring engineers | Needs to evaluate AI fluency, not just code fluency. |

---

## 3. Beginner Explanation

When you ask an AI to write code, treat it like a junior engineer who is fast,
confident, and sometimes wrong. The rules are:

1. **Tell it what done looks like before it starts.** Acceptance criteria
   first.
2. **Make it read the existing code before changing it.** No blind edits.
3. **Make it write a plan before patching.** No silent rewrites.
4. **Make it run tests.** No "should work" claims.
5. **Make it show evidence.** Logs, test output, screenshots. Not prose.

If you skip any of these, the cost shows up in production, not at review time.

---

## 4. Operator Explanation

At operator depth, AI coding is a constrained code-modification process with
the same correctness obligations as a human engineer, plus three new ones:

- **No invention.** The model must not call APIs, modules, or types that do not
  exist. The defense is reading the repo and the docs first.
- **No drift.** The model must not modify files outside the change scope. The
  defense is an explicit plan and a diff review gate.
- **No mocked success.** The model must not declare a fix without runtime
  evidence. The defense is mandatory test and verify steps with logged output.

Every AI-authored change should be reviewable by asking three questions:

1. What was the requirement?
2. Where is the evidence the change satisfies the requirement?
3. Where is the evidence the change did not break anything else?

If any of the three is missing, the change is not done.

---

## 5. Core Concepts

### 5.1 Requirements before code

A change starts with a written acceptance criterion: the input, the expected
output, and the verification step. If the requirement is not written, the model
will invent one.

### 5.2 Repo inspection before patching

The model reads:

- The entrypoint(s) for the affected feature.
- The configuration that wires the feature.
- The tests that already exist.
- The neighboring patterns (naming, error handling, logging, types).

Without inspection, the model patches in a generic style that conflicts with the
codebase.

### 5.3 Plan before patch

A plan is a short list: which files, which functions, which tests. The plan is
reviewed before any edit is applied. A plan that contains "and similar files"
or "as needed" is not a plan.

### 5.4 Tests, lint, typecheck, runtime verify

Four gates, in order. None is optional. A change that compiles but does not run
is not done. A change that runs once is not done; it needs a test.

### 5.5 Evidence reporting

The deliverable is a report that includes: the requirement, the plan, the
diff, the test output, the runtime log, and any caveats. No prose claims of
success without an artifact behind them.

### 5.6 Anti-fake-success

The phrase "this should now work" is forbidden. Either it works and the log
proves it, or it does not work and you say so.

---

## 6. Workflow

### 6.1 CODING_AGENT_PIPELINE (ASCII)

```
+---------------------------+
| 01 READ REQUIREMENTS      |
| acceptance criteria       |
+-------------+-------------+
              |
              v
+---------------------------+
| 02 INSPECT REPO           |
| entrypoints, tests,       |
| config, neighbors         |
+-------------+-------------+
              |
              v
+---------------------------+
| 03 IDENTIFY ARCHITECTURE  |
| layers, boundaries,       |
| dependency direction      |
+-------------+-------------+
              |
              v
+---------------------------+
| 04 LOCATE FILES           |
| exact paths to change     |
+-------------+-------------+
              |
              v
+---------------------------+
| 05 IDENTIFY PATTERNS      |
| naming, errors, logging,  |
| tests, types              |
+-------------+-------------+
              |
              v
+---------------------------+
| 06 PLAN                   |
| files, functions, tests,  |
| rollback                  |
+-------------+-------------+
              |
              v
+---------------------------+
| 07 PATCH                  |
| smallest viable diff      |
+-------------+-------------+
              |
              v
+---------------------------+
| 08 TESTS                  |
| unit, integration         |
+-------------+-------------+
              |
              v
+---------------------------+
| 09 LINT / TYPECHECK       |
| project's configured set  |
+-------------+-------------+
              |
              v
+---------------------------+
| 10 RUNTIME VERIFY         |
| actually run the path     |
+-------------+-------------+
              |
              v
+---------------------------+
| 11 DOCUMENT               |
| changelog, comments       |
| only where load-bearing   |
+-------------+-------------+
              |
              v
+---------------------------+
| 12 REPORT EVIDENCE        |
| diff + logs + test output |
+---------------------------+
```

### 6.2 Step-by-step

1. **Read requirements.** Restate the acceptance criteria in your own words
   back to the requester. Mismatches surface here, not at code review.
2. **Inspect repo.** Open the entrypoints, configs, tests. Do not skim.
3. **Identify architecture.** Note the layering and dependency direction.
   Edits that cross layers in the wrong direction are red flags.
4. **Locate files.** Name the exact paths. If you cannot, you have not
   inspected enough.
5. **Identify patterns.** Match the codebase's style for naming, errors,
   logging, types, and tests.
6. **Plan.** A short list. Approved before any edit.
7. **Patch.** The smallest diff that satisfies the requirement.
8. **Tests.** Add or update; run them.
9. **Lint and typecheck.** Run the project's configured set.
10. **Runtime verify.** Exercise the code path with real inputs and capture
    the output.
11. **Document.** Update the changelog. Add comments only where the code
    cannot speak for itself.
12. **Report evidence.** Diff, test output, runtime log, caveats.

---

## 7. Cheat Sheet

```
REQUIRE   : acceptance criteria written before any code
INSPECT   : entrypoints + config + tests + neighbors
PLAN      : files, functions, tests, rollback (approved)
PATCH     : smallest viable diff, no drift
GATES     : tests | lint | typecheck | runtime verify
REPORT    : diff + test output + runtime log + caveats
FORBIDDEN : "should work" | mocked success | TODO as final
RULE      : no invented APIs (cite the doc or read the source)
RULE      : no edits outside the planned file list
RULE      : if it broke something, say so and fix or revert
```

---

## 8. Examples

> Replace bracketed text. Each prompt is a starting template; tighten it to your
> codebase and conventions.

### 8.1 Bug fix

```
Bug: "[symptom, reproduction steps, expected vs actual]".
Repo: this workspace.
Constraints: no edits outside the file(s) you justify in the plan.

Steps:
1. Reproduce the bug. Quote the failing test or the failing log line.
2. Read the relevant code. Cite the file paths and line ranges.
3. Form a hypothesis. Name the assumption that is wrong.
4. Plan the smallest change. List files, functions, tests.
5. Patch. Run tests. Run lint and typecheck. Run the path that reproduced
   the bug.
6. Report: requirement, plan, diff, test output, runtime log, caveats.

Do not claim a fix without the runtime log showing the bug is gone.
```

### 8.2 Feature build

```
Feature: "[user-visible behavior, acceptance criteria]".
Non-goals: "[explicit list]".
Constraints: match existing patterns for naming, errors, logging, tests.

Plan first. Do not edit until the plan is reviewed.

Plan must list: files to create, files to modify, public surface,
backward-compatibility notes, tests added, rollback steps.

After approval: patch, test, lint, typecheck, runtime verify, report.
```

### 8.3 Refactor

```
Refactor goal: "[what shape we want, why]".
Hard constraint: no behavior change. Tests pass identically before and after.

Steps:
1. Identify the seam(s) being refactored. Cite paths.
2. Capture current behavior with a characterization test if not already
   covered.
3. Apply the refactor in steps small enough that each step keeps tests
   green.
4. Report each step's diff and test output.

If you discover a latent bug, do not silently fix it. File it separately.
```

### 8.4 Test generation

```
Goal: increase coverage for "[file or module]" against its public API.

Steps:
1. List the public functions, their inputs, expected outputs, and error
   paths. Cite the source.
2. Propose test cases that cover: happy path, boundary, error, idempotency,
   concurrency where relevant.
3. Implement the tests using the project's existing test framework and
   conventions.
4. Run the tests. Report pass/fail counts and any flakes.

Do not test private implementation details. Do not add snapshots without
justification.
```

### 8.5 API integration

```
Integrate API: "[name, version, doc URL]".
Use case: "[the operation we need]".

Steps:
1. Open the vendor's documentation. Quote the endpoint, method, required
   headers, request schema, response schema, error codes, rate limits.
2. Locate the project's HTTP client and error-handling conventions.
3. Plan: client wrapper, types, error mapping, retries, tests including a
   mocked failure case.
4. Implement. Run tests. Run a real call against a sandbox if available;
   otherwise document why not.
5. Report: doc citations, diff, test output, sandbox log or reason absent.

Do not invent fields. If a field is not in the documentation you cited,
do not use it.
```

### 8.6 Database migration

```
Migration: "[schema change, motivation]".

Steps:
1. Read the current schema and the migration framework's conventions.
2. Plan: up migration, down migration, data backfill if needed,
   read/write compatibility window, deploy order.
3. Write the migration. Add a test that exercises both up and down.
4. Run against a disposable database. Capture row counts before and after.
5. Report: plan, diff, migration log, rollback plan.

Never write a destructive migration without an explicit rollback plan.
```

### 8.7 Frontend fix

```
Frontend issue: "[symptom, reproduction, browser/device]".

Steps:
1. Reproduce in a browser. Capture the console log and network trace.
2. Locate the component(s). Cite paths.
3. Identify whether the bug is data, render, style, or event.
4. Plan and patch the smallest scope.
5. Re-run the reproduction. Capture before/after screenshots or DOM
   snapshots.
6. Report: diff, repro log, screenshots, any visual regression risk.

Do not refactor unrelated components.
```

### 8.8 Backend fix

```
Backend issue: "[endpoint, payload, expected vs actual, log line]".

Steps:
1. Reproduce by calling the endpoint with the documented payload. Capture
   request and response.
2. Trace through handler, service, data layer. Cite files.
3. Identify the layer where the contract breaks.
4. Plan and patch. Add or update an integration test that hits the
   endpoint.
5. Re-run. Report: request, response, test output, log excerpt.
```

### 8.9 Auth fix

```
Auth issue: "[symptom: 401, 403, infinite redirect, missing claim, etc.]".

Steps:
1. Identify the auth model (session, token, OAuth flow, claims source).
2. Capture the failing request including cookies/headers (redact secrets).
3. Trace through middleware and identity provider integration. Cite files.
4. Hypothesize. Patch. Re-run. Capture the now-successful request.
5. Report: diff, before/after request, test for the regression.

Do not weaken auth to make a test pass. If a test requires bypass, isolate
the bypass to test infrastructure.
```

### 8.10 Logging fix

```
Logging gap: "[the event we cannot see today]".

Steps:
1. Read the project's logging conventions: levels, structured fields,
   transport, redaction rules.
2. Identify where in the code path the missing event should be emitted.
3. Add the log with the project's conventions. Redact PII per policy.
4. Trigger the path. Capture the log line.
5. Report: diff, captured log line, retention/PII notes.

Do not log secrets. Do not log full request bodies without redaction.
```

### 8.11 Performance fix

```
Performance issue: "[metric, baseline, target, workload]".

Steps:
1. Reproduce the workload. Capture the baseline metric with a profiler or
   benchmark.
2. Identify the hot path. Cite files and the profiler output.
3. Hypothesize the cause: algorithmic, allocation, IO, lock contention,
   N+1, network, etc. Name it.
4. Patch. Re-run the benchmark. Capture the new metric.
5. Report: baseline, change, new metric, methodology, caveats about
   measurement variance.

Do not micro-optimize without a profile. Do not change behavior in the
name of speed without explicit approval.
```

### 8.12 Security audit

```
Audit scope: "[component, threat model, e.g. STRIDE category]".

Steps:
1. Enumerate the trust boundaries and the data flowing across them.
2. For each boundary, check: authn, authz, input validation, output
   encoding, error handling, logging, rate limiting, secrets handling.
3. For each finding: file, line, category, severity (with justification),
   reproduction, recommended fix.
4. Report as a table. Do not apply fixes in the same pass as the audit.

Do not invent CVEs. Do not rate severity by feel.
```

### 8.13 Dependency update

```
Update dependency: "[name, current version, target version]".

Steps:
1. Read the upstream changelog from current to target. Quote breaking
   changes with the changelog URL.
2. Identify usage sites in this repo. Cite paths.
3. Plan the migration including any deprecated-API replacements.
4. Apply the update. Run full test suite. Run typecheck. Run lint.
5. Run the application paths that exercise the dependency.
6. Report: changelog excerpts, diff, test output, runtime log.

Do not update to a major version without reviewing the breaking-change
section in full.
```

---

## 9. Common Mistakes (Anti-patterns)

| Anti-pattern | Why it fails | Counter-discipline |
|---|---|---|
| Asking the user to inspect files | The agent's job is to read the repo. Offloading exploration is a tell that the agent did not do the work. | Agent reads, agent cites, agent decides. |
| Inventing APIs | Plausible-but-fake function names compile against no actual library. | Read the docs or the source; cite the locator. |
| Skipping tests | Removes the only objective signal. | Tests are a gate, not a courtesy. |
| Over-refactoring | Changes outside the requirement; bloats diff, hides risk. | Smallest viable diff. |
| Changing unrelated files | Drift; hides bugs in scope creep. | Plan-locked file list. |
| "Fixed" without evidence | Confidence is not correctness. | Show the log. |
| Mocked success | Tests pass because the mock is wrong. | At least one runtime path must be real. |
| TODO as final output | A handoff disguised as a deliverable. | If it is not done, say it is not done. |
| Stylistic rewrites in a bug-fix PR | Mixes risk classes; reviewers cannot evaluate. | One PR, one purpose. |
| Quoting AI as if it were docs | The model is Tier 7. | Quote the documentation itself. |

---

## 10. Recovery Commands

### 10.1 Evidence audit

```
For the last change, produce: requirement statement, plan, diff summary,
test command and full output, lint output, typecheck output, runtime
verification command and full output. If any item is missing, say so and
stop. Do not claim done.
```

### 10.2 Drift audit

```
List every file modified in the current branch. For each file, justify
the modification against the planned file list. Mark any file that is not
in the plan as DRIFT. Recommend revert for each DRIFT entry unless I
explicitly approve.
```

### 10.3 Invented-API audit

```
For every external symbol the new code calls (function, method, class,
constant), produce a citation: documentation URL or source-file path with
line number. Mark any symbol that cannot be cited as INVENTED. Do not
proceed until INVENTED is empty.
```

### 10.4 Test honesty audit

```
For every test added or modified, classify: real (calls the production
path under test), mocked (calls only mocks), or shape-only (asserts
structure without behavior). Report counts. If real == 0, flag the change
as UNVERIFIED.
```

### 10.5 Revert plan

```
Produce the exact git commands to revert the current branch to its
pre-change state without affecting other work. Include a verification
step that confirms the working tree matches the base commit.
```

### 10.6 Reusable coding-agent operating prompt

```
You are a coding agent operating on this repository. You will:

1. Restate the requirement and the acceptance criteria. Stop if either
   is ambiguous.
2. Inspect the repository: entrypoints, configuration, tests, and the
   files neighboring the change. Cite paths.
3. Identify the architecture and the patterns you will match: naming,
   error handling, logging, types, test framework.
4. Produce a plan: files to create, files to modify, public surface,
   tests added or updated, rollback steps. Wait for approval if the plan
   crosses module boundaries.
5. Apply the smallest viable diff. Do not modify files outside the plan.
6. Run tests, lint, and typecheck. Run the actual code path that
   satisfies the requirement and capture the output.
7. Report: requirement, plan, diff, test output, lint output, typecheck
   output, runtime log, caveats, follow-ups.

Forbidden:
- Inventing APIs not present in dependencies or documentation.
- Editing files not in the approved plan.
- Claiming success without runtime evidence.
- Using "should work" or equivalent prose.
- Leaving TODOs as the final deliverable.

If you cannot complete a step, stop and report what you tried, what
failed, and what you need.

When asked for your reasoning, provide a reasoning summary. Do not
fabricate hidden chain-of-thought.
```

---

## 11. Verification Checklist

- [ ] Requirement is written and restated.
- [ ] Repo was inspected; paths cited.
- [ ] Architecture and patterns named explicitly.
- [ ] Plan was produced and approved before editing.
- [ ] Diff is minimal and bounded to the planned files.
- [ ] Tests added or updated; they actually exercise the path.
- [ ] Lint and typecheck pass.
- [ ] Runtime verification executed; output captured.
- [ ] Report includes evidence artifacts, not prose claims.
- [ ] Caveats and follow-ups listed.
- [ ] No invented APIs; every external call has a citation.
- [ ] No drift; no unrelated files changed.

---

## 12. Practice Drills

1. **Plan-only.** For a real ticket, produce only the plan. Have a peer
   review it. Note where they push back.
2. **Smallest-diff.** Take a feature you already shipped. Re-implement it in
   the minimum number of lines that still pass tests. Compare.
3. **Invented-API hunt.** Take a sample of recent AI-authored diffs. Audit
   every external symbol for citations. Note false positives.
4. **Runtime evidence.** For a "fixed" change, write the runtime
   verification command. If you cannot, the change is not fixed.
5. **Anti-fake-success.** Re-read your last five PR descriptions. Mark every
   "should work" sentence. Rewrite them with evidence.
6. **Recovery drill.** Apply a change, then practice the revert plan from
   section 10.5. Confirm working tree matches base.

---

## 13. Summary

AI coding only works when the pipeline (read requirements, inspect repo,
identify architecture, locate files, identify patterns, plan, patch, tests,
lint, typecheck, runtime verify, document, report evidence) is treated as
non-negotiable.

The model is fast at producing plausible code. It is not fast at producing
correct code unless you put correctness gates in its path. The anti-pattern
catalog exists because every item in it has shipped to production somewhere
and broken something.

Ship the evidence with the diff or do not ship the diff.
