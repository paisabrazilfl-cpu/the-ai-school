# 10 - AUTOMATION WORKFLOWS

> WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Specific platform capabilities
> are tagged with verification status. Confirm node names, triggers, and
> action behaviors against the current vendor documentation.

---

## 1. Purpose

This document defines how to design, build, and operate AI-assisted
automations: workflows that connect triggers to actions across systems,
sometimes routing decisions through an AI step, and produce auditable,
idempotent, retryable results.

The goal is automations that fail loudly, retry safely, log honestly, and
ask for approval where the blast radius justifies it.

---

## 2. Who It Is For

| Role | Why this matters |
|---|---|
| Operator wiring tools together | The default automation is fragile; this is the discipline. |
| Founder consolidating systems | Needs to know when to automate vs. when to script vs. when to leave alone. |
| Engineer integrating SaaS | Needs idempotency, retries, observability. |
| Reviewer / compliance | Needs auditability and human-in-the-loop gates. |
| RevOps / Ops lead | Needs reliable orchestration across CRM, billing, support. |

---

## 3. Beginner Explanation

An automation is "when X happens, do Y." The trap is that real life is messy:

- The trigger fires twice for the same event.
- The data is missing a field.
- The downstream system is down.
- The AI step returns garbage.
- Someone needs to approve a step before it ships.
- You need to know later what actually happened.

The pipeline below treats each of those as a first-class concern instead of
a "we'll handle it later" comment that becomes a 2am page.

---

## 4. Operator Explanation

At operator depth, an automation is a small, observable, idempotent state
machine over external systems. The defining concerns are:

- **Idempotency**: the same input produces the same effect regardless of how
  many times it is processed.
- **Retry and backoff**: transient failures are retried with delay; permanent
  failures are escalated.
- **Validation**: inputs are checked at the boundary; bad data does not
  propagate.
- **Approval gates**: high-blast-radius actions require human authorization.
- **Logging**: every run is recorded with input, decisions, outputs, and
  outcome.
- **Anti-fake-success**: a run is not "ok" unless the downstream effect is
  confirmed.

If you cannot answer "did the customer actually get the email" with a log
query, your automation is theater.

---

## 5. Core Concepts

### 5.1 Trigger taxonomy

| Trigger | Examples | Notes |
|---|---|---|
| Schedule | Cron, interval | Beware overlapping runs; lock or guard. |
| Webhook | Inbound HTTP from another system | Validate signature; handle replays. |
| Polling | Periodic API read | Track last cursor; avoid duplicates. |
| Event bus | Pub/sub, queue | Use dead-letter queues. |
| Manual | Operator click | Still log; still validate. |
| Email / message | Inbound channels | Hardest to validate; consider an approval gate. |

### 5.2 Idempotency keys

Every external write should carry an idempotency key derived from the
business event, not from the run. If the workflow re-runs, the same key
results in the same effect.

### 5.3 Approval gates

A gate is a pause that requires a named human to approve. Use them for:
sending external messages at scale, financial actions, irreversible deletes,
data exports, schema changes, anything that touches customers in a way you
cannot undo.

### 5.4 Logging discipline

Log structure:

- `run_id`
- `trigger`
- `input` (or reference if large)
- `decisions` (each AI or rule output)
- `actions` (tool calls and results)
- `outcome` (`success`, `partial`, `failed`, `awaiting_approval`)
- `error` (if any)
- `links` to downstream system records

### 5.5 Retry and backoff

Default: exponential backoff with jitter, capped, with a max attempts cap.
Distinguish:

- **Transient**: network blip, 5xx, rate limit. Retry.
- **Permanent**: 4xx auth, validation failure. Do not retry; escalate.

### 5.6 Anti-fake-success rules

- A 200 status from a wrapper is not proof of delivery; query the downstream
  system if the action matters.
- An AI step that returns "done" is not done.
- A dry-run mode must be visibly distinct from a live mode in the log.
- A skipped step must be logged with the reason, not silently elided.

---

## 6. Workflow

### 6.1 AUTOMATION_PIPELINE (ASCII)

```
+------------------+
| 01 TRIGGER       |
| schedule/webhook |
| poll/event/manual|
+--------+---------+
         |
         v
+------------------+
| 02 INPUT SCHEMA  |
| typed contract   |
+--------+---------+
         |
         v
+------------------+
| 03 VALIDATION    |
| reject early     |
+--------+---------+
         |
         v
+------------------+
| 04 ENRICHMENT    |
| lookups, joins   |
+--------+---------+
         |
         v
+------------------+
| 05 DECISION      |
| rules first      |
+--------+---------+
         |
         v
+------------------+
| 06 AI REASONING  |
| only when needed |
+--------+---------+
         |
         v
+------------------+
| 07 TOOL ACTION   |
| with idempotency |
| key              |
+--------+---------+
         |
         v
+------------------+
| 08 APPROVAL GATE |
| if write-class   |
+--------+---------+
         |
         v
+------------------+
| 09 LOGGING       |
| structured run   |
| record           |
+--------+---------+
         |
         v
+------------------+
| 10 ERROR HANDLE  |
| classify         |
+--------+---------+
         |
         v
+------------------+
| 11 RETRY/BACKOFF |
| transient only   |
+--------+---------+
         |
         v
+------------------+
| 12 NOTIFICATION  |
| success/failure  |
+--------+---------+
         |
         v
+------------------+
| 13 AUDIT         |
| append-only      |
+------------------+
```

### 6.2 Step-by-step

1. **Trigger.** Pick the simplest trigger that meets the requirement. Avoid
   schedules that race with webhooks for the same event.
2. **Input schema.** Define a typed contract for inputs. Reject anything
   that fails.
3. **Validate.** Check required fields, formats, signatures, allowlists.
4. **Enrich.** Pull related records once; pass them down the pipeline. Avoid
   redundant lookups.
5. **Decision.** Try rules first. AI is a fallback when the decision is
   ambiguous, not a default.
6. **AI reasoning.** Constrain output schema. Reject non-conforming output.
7. **Tool action.** Compute an idempotency key. Call the tool. Capture the
   downstream identifier.
8. **Approval gate.** Pause for human approval where required.
9. **Logging.** Append the structured run record.
10. **Error handler.** Classify transient vs. permanent. Decide retry vs.
    escalate.
11. **Retry / backoff.** Bounded attempts, jittered delay.
12. **Notification.** Notify the right channel on success, partial, or
    failure - with links.
13. **Audit.** Persist the run record append-only for forensic review.

---

## 7. Cheat Sheet

```
TRIGGER  : pick one; do not double-source the same event
SCHEMA   : typed input contract; reject early
RULES    : try before AI; deterministic is cheaper
AI       : constrain output; validate output
IDEMP    : key from business event, not from run
APPROVAL : write-class actions require named approver
LOG      : run_id + input + decisions + actions + outcome + links
RETRY    : transient yes, permanent no; jitter; cap
NOTIFY   : success and failure; never silent
AUDIT    : append-only; reviewable
RULE     : 200 from wrapper != delivery
RULE     : AI "done" != done
```

---

## 8. Examples

### 8.1 Inbound lead routing

```
TRIGGER  : webhook from form provider
SCHEMA   : { name, email, company, source, utm.* }
VALIDATE : signature, email format, source in allowlist
ENRICH   : firmographic lookup; CRM dedupe by email
DECIDE   : rules: ICP fit by firmographics; size threshold
AI       : only if rules ambiguous; classify with constrained labels
ACTION   : create or update CRM lead; assign owner; queue follow-up
APPROVE  : not required for create; required for outbound auto-send
LOG      : run record with CRM id and assignment
RETRY    : CRM 5xx -> backoff; 4xx auth -> escalate
NOTIFY   : Slack to RevOps on creation; on failure to ops channel
```

### 8.2 Support ticket triage

```
TRIGGER  : new ticket via support inbox
ENRICH   : customer plan, ARR, recent incidents
AI       : classify category + severity with constrained labels
ROUTE    : rules-based queue selection by category + severity
APPROVE  : not required for routing; required for proactive refunds
LOG      : decision and confidence; if confidence < threshold, route
           to "needs human" queue
```

### 8.3 Document approval flow

```
TRIGGER  : new file in shared folder
EXTRACT  : OCR + AI summary with constrained sections
VALIDATE : required sections present? if not, kick back
APPROVE  : named reviewer queue
ACTION   : on approve, move to "approved" folder; index for search
AUDIT    : retain immutable copy with approver and timestamp
```

### 8.4 Invoice ingestion

```
TRIGGER  : email with attachment to invoices@
PARSE    : OCR + structured extraction with schema (vendor, amount,
           date, line items, tax)
VALIDATE : amount > 0, currency known, vendor in allowlist or pending
DECIDE   : if vendor unknown, pending-vendor queue
APPROVE  : >= threshold requires named approver
ACTION   : write to accounting system with idempotency key =
           hash(vendor, invoice_number)
LOG      : extraction, validation, approver, accounting id
```

### 8.5 Outbound message (high-blast-radius)

```
TRIGGER  : campaign manifest
VALIDATE : audience size, unsubscribe handling, content review
APPROVE  : explicit human approval per send; rate-cap configured
ACTION   : send via provider with idempotency key per recipient
LOG      : per-recipient send id and provider response
NOTIFY   : completion summary with delivery, bounce, open if available
```

### 8.6 Renewal risk alert

```
TRIGGER  : daily schedule
QUERY    : accounts with renewal in 90 days
ENRICH   : usage trend, support volume, NPS
AI       : risk score with constrained 1-5 and reason summary
DECIDE   : >=4 routes to CS lead; >=5 routes to CS lead and exec sponsor
ACTION   : create task in CRM; post to Slack
```

### 8.7 Data sync (CRM <-> billing)

```
TRIGGER  : webhook from CRM on opportunity won
ENRICH   : customer record, contract terms
ACTION   : create billing subscription with idempotency key =
           opportunity_id
ON 409   : treat as already-created; fetch and continue (idempotent)
RETRY    : 5xx with backoff; cap 5
LOG      : both system ids in run record
```

### 8.8 AI-assisted reply draft (never auto-send)

```
TRIGGER  : new inbound email tagged for AI draft
AI       : draft reply with constrained tone, length, citations to KB
APPROVE  : human reviewer must edit and send
LOG      : draft and the final sent text for evaluation
```

---

### Tools Reference

| Tool | Verification | Typical strength | Caution |
|---|---|---|---|
| n8n | USER_PROVIDED_UNVERIFIED | Self-hostable, expressive flows, code nodes. | Confirm exact node behavior in your version. |
| Zapier | USER_PROVIDED_UNVERIFIED | Largest catalog of pre-built integrations. | Cost scales with task volume; less control over retries. |
| Make | USER_PROVIDED_UNVERIFIED | Visual scenarios; powerful data mapping. | Confirm error-handling and idempotency primitives. |
| Google Sheets | LIKELY_NATIVE_UNVERIFIED | Ad hoc data, light triggers, prototypes. | Not a database; rate limits; concurrency issues. |
| Airtable | USER_PROVIDED_UNVERIFIED | Structured ops data with views and automations. | Confirm API limits; not for high-write workloads. |
| Notion | USER_PROVIDED_UNVERIFIED | Docs + databases for ops; integrations growing. | Confirm API performance for batch operations. |
| Gmail | LIKELY_NATIVE_UNVERIFIED | Inbound/outbound message workflows. | Deliverability and TOS for automated sends. |
| Slack | LIKELY_NATIVE_UNVERIFIED | Notifications, approvals via interactive messages. | Rate limits; channel hygiene. |
| CRMs (Salesforce, HubSpot, etc.) | USER_PROVIDED_UNVERIFIED | System of record for customers and pipeline. | Per-CRM API quotas, sandbox vs. production discipline. |
| Webhooks | UNKNOWN | Universal connector when no SDK exists. | Validate signatures; protect against replay. |
| Raw APIs | UNKNOWN | Maximum control; least convenience. | You now own retries, idempotency, observability. |

### 9.1 When to use which

| Need | Lean toward |
|---|---|
| Quick prototype with off-the-shelf apps | Zapier or Make |
| Self-hosted, code-able, complex branching | n8n |
| Strong typed records with views | Airtable |
| Doc-first ops with light automation | Notion |
| High-volume, custom logic, strict SLAs | Raw APIs in your own service |

### 9.2 When NOT to duplicate infrastructure

- If your CRM already does lead routing, do not rebuild it in n8n.
- If your billing system already retries webhooks, do not add a second retry.
- If your support tool already has macros, do not write an AI step that
  duplicates them.

Duplication is how you get two systems that disagree at 3am.

---

## 9. Common Mistakes

| Mistake | Why it fails | Fix |
|---|---|---|
| No idempotency key | Duplicate effects on retry. | Key from business event. |
| Retrying 4xx | Burns quotas; never succeeds. | Classify before retry. |
| Silent skip on bad data | Errors hide; metrics lie. | Log skip with reason. |
| AI as default decision | Slow, costly, fallible. | Rules first; AI as fallback. |
| No approval gate on writes | Wrong email to all customers. | Named approver for write-class. |
| 200 == success assumption | Wrapper success != downstream success. | Query downstream system. |
| One mega-workflow | Hard to debug; single point of failure. | Decompose into stages with queues. |
| Two systems sourcing one event | Race conditions and duplicates. | One source of truth per event. |
| No deadletter queue | Failures vanish. | DLQ with alerting. |
| No replay protection on webhooks | Old events reprocess. | Signature + nonce + idempotency. |
| Logs without run_id | Cannot reconstruct a run. | Always carry run_id. |

---

## 10. Recovery Commands

### 11.1 Replay a failed run

```
Given run_id = R, fetch the structured run record. Identify the failed
step. Confirm the failure was transient. Re-run from the failed step
using the same idempotency keys. Do not re-run earlier steps. Append a
new run record linking to R.
```

### 11.2 Quarantine a poisoned input

```
Move the failing input to the quarantine queue with the error
classification. Do not retry. Notify the on-call channel with a link to
the structured run record and the input reference.
```

### 11.3 Backfill missed runs

```
For the window [start, end] where the trigger source was degraded,
enumerate missed events from the source-of-truth. For each, compute the
idempotency key and re-run the pipeline. Confirm no double-effects via
the idempotency key.
```

### 11.4 Disable an automation safely

```
Set the automation to dry-run mode. Confirm the dry-run flag is visible
in the log of the next 5 runs. Then disable the trigger. Do not delete
the workflow; archive it with the disable timestamp and reason.
```

### 11.5 AI step regression

```
Pull the last N runs where the AI step produced non-conforming output.
Update the constrained schema or the prompt. Re-run the offending inputs
in a staging environment. Compare outputs against expected. Promote only
after green.
```

---

## 11. Verification Checklist

- [ ] Trigger source is single and explicit.
- [ ] Input schema defined; rejection path tested.
- [ ] Rules attempted before AI; AI output schema-constrained.
- [ ] Idempotency key derived from business event.
- [ ] Approval gate present for every write-class action.
- [ ] Structured run record captured for every run.
- [ ] Errors classified transient vs. permanent.
- [ ] Retry with jitter and cap; DLQ for permanent failures.
- [ ] Notifications fire on success, partial, and failure.
- [ ] Append-only audit retained per policy.
- [ ] Dry-run mode is visibly distinct from live mode.
- [ ] No duplication of capabilities the source system already provides.

---

## 12. Practice Drills

1. **Idempotency drill.** Re-fire a trigger five times. Confirm one
   downstream effect.
2. **Failure drill.** Inject a 5xx into a tool call. Confirm retry, log, and
   eventual success or escalation.
3. **Schema drill.** Send malformed input. Confirm early rejection with
   logged reason.
4. **Approval drill.** Run a write-class action with the approver offline.
   Confirm the run halts at the gate and times out gracefully.
5. **Replay drill.** Take a failed run from the DLQ. Replay it. Confirm no
   double effects.
6. **Audit drill.** Pick a run from 30 days ago. Reconstruct the input,
   decisions, and downstream ids using only the audit log.

---

## 13. Summary


An automation is a small, observable, idempotent state machine over
external systems. The pipeline (trigger, input schema, validation,
enrichment, decision, AI reasoning, tool action, approval gate, logging,
error handling, retry / backoff, notification, audit) is the unit of work.

AI belongs as a constrained step inside this pipeline, not as the
pipeline. Rules first, AI for ambiguity, approval gates for blast radius,
logs that tell the truth. If your automation cannot answer "did the
downstream effect actually happen, and what did it cost," it is not
finished.
