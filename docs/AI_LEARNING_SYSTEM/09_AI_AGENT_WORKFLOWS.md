# 09 - AI AGENT WORKFLOWS

> WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Specific product capabilities are
> tagged with verification status. Confirm framework and SDK behavior against
> current vendor documentation before relying on them.

---

## 1. Purpose

This document defines what an AI **agent** is, how to design one, how to
operate one safely, and how to evaluate one. The goal is an operator-level
mental model that survives across frameworks: whatever the SDK, the same
moving parts must exist, be named, and be observable.

An agent is not a chatbot with tools. It is a controlled execution loop with
an explicit state machine, an audit log, and a permission boundary.

---

## 2. Who It Is For

| Role | Why this matters |
|---|---|
| Engineer building agents | Needs an architecture, not a vibe. |
| Operator deploying agents | Needs to know what can go wrong and how to detect it. |
| Reviewer / security | Needs auditability and permission model. |
| Founder choosing build vs buy | Needs a way to evaluate vendor agent claims. |
| PM scoping agent features | Needs realistic boundaries on autonomy. |

---

## 3. Beginner Explanation

An AI agent is a loop:

1. Read the user's request.
2. Decide what to do next.
3. Do it (call a tool, read a document, run code, send a message).
4. Look at the result.
5. Decide if you are done.
6. If not, repeat.

The model is the brain. The **tools** are the hands. The **memory** is the
notebook. The **planner** is the strategy. The **validator** is the
self-check. The **audit log** is the record of everything that happened.

Make those parts explicit and you have an agent you can debug. Leave them
implicit and you have a black box that occasionally costs you money.

---

## 4. Operator Explanation

At operator depth, an agent is the composition:

> Agent = Model + Goal + Tools + Memory + Planning + Execution + Verification.

Each component is a slot. Each slot has a contract. Each slot fails in
specific ways. The job of the agent designer is to make the slots and their
contracts visible.

The hidden assumption that wrecks most early agents is: **the model is the
controller.** It is not. The controller is the loop you wrote around the
model. The model is a stochastic function the controller calls. If the
controller has no exit conditions, no permission gates, and no logging, you
do not have an agent; you have a fork bomb with English.

---

## 5. Core Concepts

### 5.1 Agent definition

| Component | Contract | Failure mode |
|---|---|---|
| Model | Given a prompt and tool list, return an action or a final answer. | Hallucinated tool call, invented argument, drift from goal. |
| Goal | A written, testable success criterion. | Vague goal yields rambling agent. |
| Tools | Typed callable units with explicit inputs, outputs, side effects, and authority. | Untyped tools, hidden side effects, over-broad scope. |
| Memory | Durable state across steps (short-term scratchpad, long-term store). | Memory poisoning, stale recall, leakage across sessions. |
| Planning | Decomposition into sub-goals, with dependencies. | No plan; flat reasoning; cannot back out of a wrong branch. |
| Execution | Loop that selects, calls, observes, and decides. | Unbounded loop; ignores failures; retries identical actions. |
| Verification | Predicate(s) that confirm the goal is met before stopping. | "Done because the model said so." |

### 5.2 Single-agent vs multi-agent

| Pattern | Use when | Caution |
|---|---|---|
| Single agent | The task fits in one model's context and tool set. | Most tasks. Start here. |
| Planner / executor split | The planning model is more capable or more conservative than the executor, or you want auditable plans. | Plan handoff must be explicit text, not implicit state. |
| Validator / critic | A second model reviews outputs before they ship. | Critic must have independent context; otherwise it agrees by default. |
| Tool-using agent | The task requires real-world side effects (search, write, send). | Each tool is a permission boundary. |
| Browser agent | The task requires interacting with a UI that lacks an API. | Brittle; CAPTCHA; legal terms of service; logging is critical. |
| Coding agent | The task is repo-bounded code modification. | See document 08; same disciplines apply. |
| Research agent | The task is information gathering with citations. | See document 07; provenance is the deliverable. |
| Automation agent | The task is a recurring trigger-based workflow. | See document 10; idempotency is the deliverable. |
| Multi-agent debate / swarm | The task benefits from diverse perspectives or specialization. | Cost grows; failure modes compound; logging gets harder. |

### 5.3 Memory

| Layer | What it stores | Risks |
|---|---|---|
| Working memory | Current step inputs, tool outputs, scratchpad. | Bloat; context overflow. |
| Episodic memory | Past sessions, decisions, outcomes. | Stale memories drive present errors. |
| Semantic memory | Stable facts about the user, org, domain. | Privacy; access control; data residency. |
| External memory | Vector stores, databases, files. | Retrieval errors; embedding drift; injection. |

Rule: every memory write should have a writer-ID, a timestamp, and a
provenance tag. Every memory read should be logged with the query.

### 5.4 State machine

An agent that runs without a state machine eventually runs forever. States
typically include: `idle`, `planning`, `awaiting_tool`, `awaiting_approval`,
`validating`, `done`, `failed`. Transitions are explicit. Loops without
state are how a "small task" becomes a $200 API bill.

### 5.5 Recursion and loop guardrails

| Guardrail | What it does |
|---|---|
| Max steps | Hard cap on iterations per task. |
| Max tool calls | Hard cap per tool per task. |
| Max cost | Hard cap in dollars or tokens. |
| Identical-action detector | Aborts if the model retries the same action with the same arguments more than N times. |
| Stall detector | Aborts if no measurable progress for N steps. |
| Deadman switch | Auto-aborts if the agent has not heartbeat within a window. |

### 5.6 Permissions

Every tool has a permission scope. Some are read-only (search a doc). Some
are write (send an email, charge a card, delete a row). Write tools should
require explicit approval per call or per session, depending on risk. The
permission model lives outside the model; the model cannot grant itself
permissions.

### 5.7 Auditability

The audit log records: timestamp, step, state, prompt sent, model response,
tool called, tool arguments, tool result (or redacted reference), validator
verdict, final action. Without this, you cannot debug, you cannot review,
and you cannot prove what happened.

---

## 6. Workflow

### 6.1 AGENT_SYSTEM (ASCII)

```
                +-----------------+
                | USER INPUT      |
                +--------+--------+
                         |
                         v
                +-----------------+
                | CLASSIFIER      |
                | intent + scope  |
                +--------+--------+
                         |
                         v
                +-----------------+
                | PLANNER         |
                | sub-goals, deps |
                +--------+--------+
                         |
                         v
                +-----------------+
                | TOOL ROUTER     |
                | pick tool       |
                +--------+--------+
                         |
                         v
                +-----------------+
                | EXECUTOR        |
                | call tool, obs. |
                +--------+--------+
                         |
                         v
                +-----------------+
                | VALIDATOR       |
                | goal met?       |
                +--------+--------+
                         |
              +----------+----------+
              |                     |
              v                     v
       +-------------+      +---------------+
       | MEMORY      |      | APPROVAL GATE |
       | write       |      | human in loop |
       +------+------+      +-------+-------+
              |                     |
              +----------+----------+
                         |
                         v
                +-----------------+
                | AUDIT LOG       |
                | append step rec |
                +--------+--------+
                         |
                         v
                +-----------------+
                | ERROR HANDLER   |
                | retry / abort / |
                | escalate        |
                +--------+--------+
                         |
                         v
                +-----------------+
                | FINAL RESPONSE  |
                | + evidence      |
                +-----------------+
```

### 6.2 Step-by-step

1. **Classify the input.** Intent, scope, sensitivity, required tools,
   approval class.
2. **Plan.** Decompose into sub-goals with dependencies. Persist the plan.
3. **Route.** For the current sub-goal, choose the smallest-scope tool that
   can advance it.
4. **Execute.** Call the tool with typed arguments. Capture the result.
5. **Validate.** Check the sub-goal predicate. If unmet, decide retry,
   re-plan, or escalate.
6. **Update memory.** Write the step record. Update working memory.
7. **Approval gate.** If the next action crosses a permission boundary, halt
   and request approval.
8. **Audit log.** Append the step record. This is non-negotiable.
9. **Error handler.** On failure: backoff, retry with bounded attempts,
   escalate, or abort. No silent swallow.
10. **Finalize.** When the validator confirms the goal, produce the final
    response with evidence references into the audit log.

---

## 7. Cheat Sheet

```
AGENT = MODEL + GOAL + TOOLS + MEMORY + PLAN + EXEC + VERIFY
STATES: idle | planning | awaiting_tool | awaiting_approval |
        validating | done | failed
LIMITS: max_steps | max_tool_calls | max_cost | stall_detect
TOOLS : typed, scoped, side-effect-declared, permission-bounded
MEMORY: writer-id, timestamp, provenance, access log
LOG   : every step, every tool call, every validator verdict
RULE  : controller != model; model is a function the controller calls
RULE  : write tools require explicit approval at session or call scope
RULE  : "reasoning summary" only; never request hidden chain-of-thought
```

---

## 8. Examples

> Replace bracketed text. Each template is a starting point; tighten to your
> framework.

### 8.1 Single-agent prompt template

```
You are an agent operating under the following contract.

GOAL: "[testable success criterion]".
NON-GOALS: "[explicit out-of-scope items]".
TOOLS: [list of typed tools with input/output schemas].
LIMITS: max_steps = N; max_cost = $X; max_tool_calls per tool = M.
MEMORY: you may read keys [list]; you may write keys [list].
APPROVAL: actions in class [list] require explicit approval; halt and ask.

LOOP:
1. State the current sub-goal in one sentence.
2. Choose the smallest-scope tool that advances it. If none, finalize.
3. Call the tool with typed arguments. Quote the result.
4. Validate against the sub-goal. If unmet, decide retry, re-plan, or
   escalate. Do not repeat an identical action more than 2 times.
5. Append a step record: time, sub-goal, tool, args, result, verdict.

STOP CONDITIONS:
- Goal validator returns success.
- Limit reached.
- Approval gate awaiting.
- Unrecoverable error.

OUTPUT: final answer plus pointers to the step records that support it.
Provide a reasoning summary. Do not fabricate hidden chain-of-thought.
```

### 8.2 Planner / executor split

```
PLANNER PROMPT:
Given the goal "[goal]" and available tools "[list]", produce a plan as an
ordered list of sub-goals with dependencies, expected tool, success
predicate, and rollback step for each. Do not call tools. Do not execute.

EXECUTOR PROMPT:
You will receive one sub-goal at a time with its expected tool and success
predicate. Execute, validate, report. Do not deviate from the planner's
sub-goal. If the sub-goal is impossible, escalate to the planner with the
specific obstacle.
```

### 8.3 Validator / critic

```
You are a critic. You did not perform this work. Given the goal "[goal]"
and the agent's output and its step log, judge whether the output
satisfies the goal. Produce a verdict (pass, fail, partial) and a list of
specific defects with pointers into the step log. Do not rewrite the
output. Do not soften the verdict.
```

### 8.4 Tool-using agent (illustrative tool schema)

```
TOOL: search_docs
  INPUT: { query: string, top_k: int <= 10 }
  OUTPUT: [ { title, url, snippet, score } ]
  SIDE EFFECTS: none
  PERMISSION: read

TOOL: send_email
  INPUT: { to: email, subject: string, body: markdown }
  OUTPUT: { message_id: string, sent_at: timestamp }
  SIDE EFFECTS: sends an email
  PERMISSION: write; requires per-call approval
```

### 8.5 Browser agent

```
TOOL: browser_navigate / browser_click / browser_type / browser_read

LIMITS: max_navigations = N; deny domains [list]; respect robots and ToS.
APPROVAL: any form submission, any payment field, any account creation.
LOG: screenshot or DOM snapshot per step.
```

### 8.6 Coding agent

> See document 08. Use the operating prompt in section 10.6 of that document.

### 8.7 Research agent

> See document 07. Output is a cited report. Tier-7 (AI summary) is never a
> citation.

### 8.8 Automation agent

> See document 10. Idempotency, retry/backoff, and approval gates are the
> defining concerns.

---

## 9. Common Mistakes

| Mistake | Why it fails | Fix |
|---|---|---|
| Treating the model as the controller | No exit conditions; loops cost money. | Controller owns the loop; model is a function. |
| Vague goals | The agent rambles; the validator cannot judge. | Write a testable success criterion. |
| Untyped tools | Hallucinated arguments; silent failures. | Schemas with validation. |
| One tool with broad scope | Permission blast radius too large. | Many narrow tools, each with explicit permission. |
| No approval gate on writes | Agent emails the wrong person; charges the wrong card. | Approval class per tool; halt and request. |
| No audit log | You cannot debug or prove what happened. | Append-only step records. |
| No max-steps / max-cost | Cost overruns; runaway loops. | Hard limits, enforced outside the model. |
| Memory poisoning | Old wrong fact contaminates future runs. | Provenance and TTL on memory entries; review writes. |
| Asking the model for hidden chain-of-thought | Not reliable; not the model's actual reasoning. | Ask for reasoning summary. |
| Letting the agent grade itself | Self-graded agents pass everything. | Independent validator. |
| Hiding tool errors | Agent continues with wrong assumptions. | Propagate errors; consider explicit escalation. |
| Re-executing identical failed action | Loops without progress. | Identical-action detector. |

---

## 10. Recovery Commands

### 10.1 Halt and inspect

```
HALT. Do not call any further tools. Produce:
1. Current state and sub-goal.
2. Last 5 step records.
3. The next planned action and the tool/arguments you intended.
4. The reason you believe this action advances the goal.

Wait for instructions.
```

### 10.2 Audit replay

```
Reconstruct the run from the audit log. For each step, state: time,
state, prompt summary, tool, arguments, result summary, validator
verdict. Mark any step whose verdict was missing or inferred.
```

### 10.3 Tool-permission audit

```
List every tool the agent called this session. For each, return:
permission class, whether per-call approval was required, whether
approval was recorded. Flag any write call without a recorded approval.
```

### 10.4 Loop detection

```
Scan the step log for identical (tool, normalized-arguments) pairs.
Report the top 5 most-repeated. If any exceeds 2 in a single sub-goal,
flag the agent as STALLED.
```

### 10.5 Memory audit

```
List memory writes this session: key, writer, timestamp, provenance, TTL.
Flag any write without provenance. List memory reads: key, query,
timestamp. Flag any read that returned a stale entry past its TTL.
```

### 10.6 Cost audit

```
Sum tokens and dollars by step. Identify the 3 most expensive steps and
the reason (long context, repeated tool call, retry storm). Recommend a
budget cap and a step that should be cached.
```

---

## 11. Verification Checklist

- [ ] Goal is written and testable.
- [ ] Tools are typed, scoped, and permission-tagged.
- [ ] Working / episodic / semantic memory layers are named and accessed
      with provenance.
- [ ] Planner and executor responsibilities are explicit (even if same model).
- [ ] State machine is documented; states and transitions enumerated.
- [ ] Max steps, max cost, and stall detection are configured.
- [ ] Approval gate exists for every write-class tool.
- [ ] Audit log is append-only and complete.
- [ ] Validator is independent of the executor.
- [ ] No request for hidden chain-of-thought; reasoning summary only.
- [ ] Recovery commands have been exercised at least once.

### 11.1 Agent safety checklist

- [ ] Tools cannot grant themselves new permissions.
- [ ] Secrets are not exposed in prompts; references only.
- [ ] PII handling matches policy; logs are redacted.
- [ ] Network egress is allowlisted where applicable.
- [ ] Browser agents respect robots and terms of service.
- [ ] Destructive operations are reversible or require multi-party approval.

### 11.2 Agent evaluation checklist

- [ ] Offline evals: a set of fixed tasks with known-good outputs.
- [ ] Tool-mock evals: tool calls verified against expected sequences.
- [ ] Stress evals: long contexts, conflicting instructions, missing tools.
- [ ] Adversarial evals: prompt injection, malformed inputs, looped inputs.
- [ ] Cost/latency evals: 95th percentile within budget.
- [ ] Regression suite runs on every change to model, prompt, or tools.

---

## 12. Practice Drills

1. **Slot-naming.** Take an agent you already built. Name each of: model,
   goal, tools, memory, planner, executor, validator, audit log. Find the
   missing slots; they are your top defects.
2. **Tool typing.** Take one tool. Write its full schema: input types,
   output types, side effects, permission class. Reject any tool that
   resists this.
3. **State machine.** Diagram the agent's states and transitions. Identify
   the state where loops form.
4. **Halt drill.** Inject the halt-and-inspect prompt mid-run. Confirm the
   agent stops and reports.
5. **Validator independence.** Run the same task twice: once with the
   executor grading itself, once with an independent validator. Compare
   failure rates.
6. **Injection drill.** Feed the agent a tool result that contains a prompt
   injection. Confirm the agent does not follow injected instructions.

---

## 13. Summary

An agent is not the model; it is the loop around the model. The slots are
non-negotiable: model, goal, tools, memory, planning, execution,
verification, audit log, approval gate, error handler.

Build the slots and the agent is debuggable. Skip them and the agent is a
black box that occasionally costs you money or, worse, sends an email you
did not authorize.

Treat the controller, the permissions, and the audit log as **engineering
artifacts in their own right**. They are what make an agent operate in
production rather than in a demo.
