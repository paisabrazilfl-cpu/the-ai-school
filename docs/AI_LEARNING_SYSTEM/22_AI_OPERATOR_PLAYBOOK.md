# 22 — AI Operator Playbook

> WEB VERIFICATION NOT AVAILABLE IN THIS RUN.
> All platform-specific claims carry a verification tag:
> VERIFIED_LOCAL / VERIFIED_DOCS / USER_PROVIDED_UNVERIFIED / CUSTOM_WORKFLOW / LIKELY_NATIVE_UNVERIFIED / UNKNOWN / DEPRECATED.
> Never request hidden chain-of-thought. Always ask for a "reasoning summary."

---

## 1. Purpose

This playbook turns the reader from an AI **user** (someone who types questions into a chat box) into an AI **operator** (someone who systematically directs AI to produce reliable, verifiable, high-leverage output).

The playbook codifies:

- The 12 operator principles
- The operator workflow loop
- A 7-day bootcamp
- A daily one-hour practice plan
- Operator habits and rituals
- A decision matrix for tool selection

If you finish this document and run the drills, you will be able to take any non-trivial task, decompose it, route it to the right AI tool, verify its output, and ship a result you would defend in front of a hostile reviewer.

---

## 2. Who It Is For

| Reader                          | Use this playbook to...                                                |
|---------------------------------|------------------------------------------------------------------------|
| Beginner (no AI experience)     | Get a structured first month and avoid bad habits.                     |
| Knowledge worker                | Replace ad-hoc prompting with a repeatable workflow.                   |
| Developer                       | Use AI in coding pipelines with verification and tests.                |
| Founder / operator              | Run AI as a team-of-one productivity stack.                            |
| Manager                         | Set standards for how a team uses AI safely.                           |
| Researcher                      | Apply discipline around sources, citations, and refutation.            |
| Creative                        | Direct AI for image, video, voice, and brand-consistent work.          |

---

## 3. Beginner Explanation

Think of AI like a brilliant but forgetful intern who:

- Has read most of the public internet up to its training cutoff.
- Cannot look out the window unless you give it eyes (search tool, file access).
- Will confidently make things up if you do not constrain it.
- Forgets the last conversation the moment you close the tab.
- Does exactly what you ask — including the bad parts of what you ask.

Your job as an operator is not to "talk to the AI." Your job is to:

1. Tell it **who it is** (role).
2. Tell it **what it must do** (objective).
3. Give it **the facts it needs** (context).
4. Set the **rules of the game** (constraints).
5. Demand the **shape of the answer** (output format).
6. **Check** the answer against reality.

Everything else is decoration.

---

## 4. Operator Explanation

An operator treats AI as a programmable function with stochastic output:

```
output = AI(role, objective, context, constraints, output_format, tools, memory)
```

The operator's job is to:

- Minimize variance (constraints, format, examples).
- Maximize signal (correct context, correct sources).
- Maximize verifiability (citations, tests, logs, audit trail).
- Maximize leverage (templates, automations, agents).

The operator never confuses a confident answer with a correct answer. The operator builds **systems**, not one-off chats.

---

## 5. Core Concepts — The 12 Operator Principles

| #  | Principle                                                | Operator implication                                                              |
|----|----------------------------------------------------------|-----------------------------------------------------------------------------------|
| 1  | AI is a worker, not an oracle.                           | Assign tasks. Do not ask for prophecy.                                            |
| 2  | Prompts are operating instructions.                      | Write them like SOPs, not like questions to a friend.                             |
| 3  | Context is fuel.                                         | If you did not pass it in, it does not exist in the model's working memory.       |
| 4  | Constraints are steering.                                | "Do X" is weak. "Do X, not Y, in under 200 words, with citations" is strong.      |
| 5  | Output format is the mold.                               | Specify shape (JSON, table, checklist) or you will get prose soup.                |
| 6  | Verification is mandatory.                               | Every claim is a hypothesis until you check it.                                   |
| 7  | Current facts require current sources.                   | Without web access, treat any "today" claim as stale.                             |
| 8  | Private files require explicit access.                   | The model only "knows" files you attach or grant.                                 |
| 9  | Coding requires tests.                                   | AI code without tests is a liability, not an asset.                               |
| 10 | Automation requires logs.                                | If it runs unattended, it must leave a trail.                                     |
| 11 | Agents require permissions and audit trails.            | Scope, log, and review every action an agent can take.                            |
| 12 | Never trust confident unsupported claims.                | The most dangerous output is the one that sounds right and is wrong.              |

### Principle expansions

**1. AI is a worker, not an oracle.** Workers can be given specs, reviewed, fired, and replaced. Oracles cannot. Treat AI like a contractor on a fixed-bid SOW.

**2. Prompts are operating instructions.** A prompt is a runbook. Write it once, version it, store it, reuse it.

**3. Context is fuel.** A model with no relevant context will hallucinate plausible-sounding context. Paste the doc, attach the file, dump the log.

**4. Constraints are steering.** Constraints reduce the answer space. Less space = less variance = more reliable output.

**5. Output format is the mold.** "Give me a report" is unbounded. "Give me a markdown table with columns A, B, C, max 12 rows" is a contract.

**6. Verification is mandatory.** Verification is not optional even for "easy" answers. Easy answers have the highest hidden error rate because nobody checks them.

**7. Current facts require current sources.** If the question contains "today," "now," "current," "latest," "price," "release," the answer requires a live source. Without one: tag UNKNOWN.

**8. Private files require explicit access.** Models do not magically read your email, calendar, or repo. They read what you, or a sanctioned tool, hand them.

**9. Coding requires tests.** AI-written code must pass: compile, lint, type-check, unit test, integration test, security scan. No tests, no ship.

**10. Automation requires logs.** Every automated AI step must emit: input, output, timestamp, model, version, prompt hash, latency, cost, error.

**11. Agents require permissions and audit trails.** Define what the agent can read, write, call, spend. Log every action. Require human approval for irreversible operations.

**12. Never trust confident unsupported claims.** Confidence is a style, not a signal. Demand sources, demand reasoning summaries, demand falsifiable predictions.

---

## 6. Workflow — The Operator Loop

```
                +----------------+
                | Define mission |
                +--------+-------+
                         |
                         v
              +----------+-----------+
              | Define source         |
              | hierarchy            |
              +----------+-----------+
                         |
                         v
              +----------+-----------+
              | Define output format |
              +----------+-----------+
                         |
                         v
              +----------+-----------+
              | Define success       |
              | criteria             |
              +----------+-----------+
                         |
                         v
              +----------+-----------+
              | Execute prompt       |
              +----------+-----------+
                         |
                         v
              +----------+-----------+
              | Verify against       |
              | source hierarchy     |
              +----------+-----------+
                         |
                  pass?  |  no
                         +-----------------+
                         | yes             |
                         v                 v
              +----------+------+   +------+-------+
              | Refine          |<--+ Refine prompt|
              | for polish      |   +--------------+
              +----------+------+
                         |
                         v
              +----------+-----------+
              | Systematize          |
              | (turn into template) |
              +----------+-----------+
                         |
                         v
              +----------+-----------+
              | Save to prompt       |
              | library              |
              +----------------------+
```

### Step-by-step

1. **Define mission.** One sentence: "I need X for audience Y by deadline Z."
2. **Define source hierarchy.** Rank trusted sources: primary docs > peer-reviewed > reputable press > AI inference > AI guess.
3. **Define output format.** Decide the artifact: markdown, JSON, table, slide, code file.
4. **Define success criteria.** What would make you reject the output? List 3-7 rejection conditions.
5. **Execute.** Run the prompt with ROLE + OBJECTIVE + CONTEXT + CONSTRAINTS + OUTPUT.
6. **Verify.** Spot-check claims, run tests, click citations.
7. **Refine.** Use meta-commands (narrow, expand, simplify, add citations).
8. **Systematize.** Convert the working prompt into a reusable template.
9. **Save.** Store in your prompt library with metadata: use case, model, date, version.

---

## 7. Cheat Sheet

### The five-line operator prompt

```
ROLE: You are a [specific expert] who has [credential / experience].
OBJECTIVE: Produce [exact deliverable] for [audience] by [implicit deadline].
CONTEXT: [paste docs, data, links, prior decisions].
CONSTRAINTS: [length, tone, must-include, must-exclude, citations, format].
OUTPUT: [exact shape — markdown headings, JSON schema, table columns].
```

### Verification tag legend

| Tag                          | Meaning                                                                |
|------------------------------|------------------------------------------------------------------------|
| VERIFIED_LOCAL               | Confirmed by running it on this machine in this session.               |
| VERIFIED_DOCS                | Confirmed against the platform's own documentation.                    |
| USER_PROVIDED_UNVERIFIED     | User asserted; not independently checked.                              |
| CUSTOM_WORKFLOW              | A pattern this manual defines, not a vendor feature.                   |
| LIKELY_NATIVE_UNVERIFIED     | Probably built into the platform, not confirmed.                       |
| UNKNOWN                      | Cannot determine without a fresh source.                               |
| DEPRECATED                   | Was true; has since been replaced or removed.                          |

### Quick decision rules

- If the question has a "today," route it to a search-enabled tool.
- If the output must be machine-readable, demand JSON with a schema.
- If a number appears in the answer, demand a source or a calculation.
- If you cannot describe the deliverable in one sentence, you are not ready to prompt.
- If the prompt is longer than a page, split the task.

### Operator self-audit (run weekly)

- [ ] Are my prompts versioned?
- [ ] Are my recurring tasks templated?
- [ ] Do I have logs for every automation?
- [ ] Do I have tests for every AI-written code path in production?
- [ ] Did I run a post-mortem on any AI mistake this week?

---

## 8. Examples

### Example A — Bad vs Good prompt

**Bad:**
> "Write me a marketing email."

**Good:**
```
ROLE: You are a senior B2B SaaS copywriter who has shipped 200+ cold emails with >8% reply rates.
OBJECTIVE: Draft a 90-word cold outreach email to a Director of Engineering at a 500-1000 person fintech.
CONTEXT:
- Product: AI test-generation tool that cuts unit test writing time by 60%.
- Proof point: Customer "Acme Bank" cut QA cycle from 9 days to 4.
- We are a Series A startup; founder is ex-Google.
CONSTRAINTS:
- No buzzwords (synergy, leverage, revolutionary).
- One specific stat. One specific question. One specific CTA.
- 90 words max, plain text, no greeting fluff.
OUTPUT:
- Subject line (under 40 chars).
- Body (90 words).
- Variant A (curiosity hook), Variant B (proof hook).
```

### Example B — Verification in action

User asks: "What is the current corporate tax rate in Ireland?"

Operator response pattern:
1. Tag the claim domain: legal / tax — requires VERIFIED_DOCS.
2. Route to a search-enabled tool.
3. Demand the source URL.
4. Cross-check against the official government site.
5. Mark the final number with VERIFIED_DOCS plus the date pulled.

### Example C — Coding task with tests

```
ROLE: Senior Python engineer.
OBJECTIVE: Implement function `parse_iso8601(s) -> datetime` that accepts strings with or without timezone.
CONTEXT: We support Python 3.11+. Codebase uses pytest and ruff.
CONSTRAINTS: No third-party libraries. Reject invalid input with ValueError. Handle 'Z' suffix.
OUTPUT:
1. The function source.
2. A pytest test file with at least 8 cases including 3 invalid-input cases.
3. A 3-line reasoning summary explaining the parsing strategy.
```

---

## 9. Common Mistakes

| Mistake                                            | Why it fails                                                | Fix                                                          |
|----------------------------------------------------|-------------------------------------------------------------|--------------------------------------------------------------|
| Asking open questions                              | Unbounded answer space.                                     | Specify role, format, length.                                |
| Trusting the first answer                          | First answer is often plausible, not correct.               | Run verification loop.                                       |
| No examples                                        | Model guesses your taste.                                   | Provide 1-3 reference samples (few-shot).                    |
| Mixing tasks in one prompt                         | Quality drops with each subtask.                            | One prompt per task; chain them.                             |
| Skipping format spec                               | Output is unstructured prose.                               | Demand JSON / table / checklist.                             |
| Asking for "the best"                              | Subjective and unbounded.                                   | Define metric: cheapest, fastest, fewest dependencies.       |
| Pasting secrets into prompts                       | Data may be logged or leaked.                               | Redact keys, tokens, PII before prompting.                   |
| Using AI for things it cannot know                 | Stale or invented facts.                                    | Route to search or human source.                             |
| Requesting hidden chain-of-thought                 | Against guidance; brittle.                                  | Ask for a "reasoning summary."                               |
| No version control on prompts                      | Cannot reproduce or improve.                                | Store prompts in a repo with dates and changelogs.           |

---

## 10. Recovery Commands

When an AI response goes wrong, use these meta-commands rather than starting over.

| Situation                              | Recovery command                                                                |
|----------------------------------------|---------------------------------------------------------------------------------|
| Output is too long.                    | "Compress to 30% length, keep the structure."                                   |
| Output is too short.                   | "Expand each section with one concrete example and one risk."                   |
| Output is too generic.                 | "Replace every generic noun with a specific entity from the context I gave."    |
| Output has no citations.               | "Add inline citations as [n] and a numbered source list at the end."            |
| Output has wrong format.               | "Reformat as a markdown table with columns: X, Y, Z."                           |
| Output contradicts the source.         | "Quote the source verbatim, then explain the contradiction, then correct."      |
| Output is too cautious.                | "Drop hedging. State the best answer with confidence intervals."                |
| Output is too confident.               | "Add uncertainty markers and a list of what could make this wrong."             |
| Output is in the wrong voice.          | "Rewrite in the voice of [reference text I am attaching]."                      |
| You suspect hallucination.             | "List every factual claim and tag each with source or 'no source available.'"   |
| You lost the thread.                   | "Summarize what we have decided so far as a numbered list. Then propose next step."|

---

## 11. Verification Checklist

Before shipping any AI output, run:

- [ ] Did I define the mission in one sentence?
- [ ] Did I provide explicit context (files, links, prior decisions)?
- [ ] Did I specify the output format?
- [ ] Did I list rejection conditions?
- [ ] Did I tag every platform-specific claim with a verification tag?
- [ ] Did I click every citation?
- [ ] Did I run the code (if any) and the tests?
- [ ] Did I check for PII or secrets in the output?
- [ ] Did I record the prompt, model, date, and version?
- [ ] Did I update the template if the prompt improved?

---

## 12. Practice Drills

### Daily Practice Plan — One hour per day for one week

| Day | 0-15 min               | 15-45 min                                              | 45-60 min                              |
|-----|------------------------|--------------------------------------------------------|----------------------------------------|
| Mon | Read principles 1-4.   | Rewrite 5 of your past prompts using ROLE+OBJ+CTX+CON+OUT. | Save to a `prompts/` folder.        |
| Tue | Read principles 5-8.   | Take one real task, run the operator loop end-to-end.  | Write a post-mortem (3 bullets).       |
| Wed | Read principles 9-12.  | Build a 1-prompt coding task with tests.               | Run the tests; fix failures.           |
| Thu | Review cheat sheet.    | Build a research prompt with mandatory citations.      | Verify 5 of the citations.             |
| Fri | Review common mistakes.| Refactor your top-3 prompts into templates.            | Add metadata (use case, model, date).  |
| Sat | Review recovery commands. | Practice 5 recovery commands on a deliberately bad output. | Note which worked.            |
| Sun | Free study.            | Run a full 7-step operator loop on a hard problem.     | Plan next week.                        |

### 7-Day AI Bootcamp — One focused project per day

| Day | Project                                              | Deliverable                                              |
|-----|------------------------------------------------------|----------------------------------------------------------|
| 1   | Personal prompt library                              | `prompts/` folder with 10 templates, README, changelog.  |
| 2   | Research dossier on a topic you do not know          | 5-page markdown report with 15+ verified citations.      |
| 3   | Small coding project, AI-driven                      | A CLI tool with full unit tests and a README.            |
| 4   | Document-grounded Q&A                                | Attach 3 PDFs; build a prompt that answers from them only.|
| 5   | Single-shot automation script                        | A script that runs daily and logs every step.            |
| 6   | Multi-step agent prototype                           | Planner + executor + validator, with audit log.          |
| 7   | Post-mortem and systematization                      | Lessons learned doc; update templates; plan week 2.      |

---

## 13. Summary

- AI is a worker. You are the operator.
- Prompts are SOPs. Context is fuel. Constraints steer. Format molds. Verification is mandatory.
- Use the operator loop: mission, sources, format, criteria, execute, verify, refine, systematize, save.
- Build a prompt library. Run weekly self-audits. Run post-mortems.
- Trust nothing confident and unsupported. Tag every claim. Cite every source. Test every line of code.

If you do these things for 30 days, you will be more productive than 95% of professionals who "use AI."

---

## Operator Habits and Rituals

| Habit                          | Cadence    | Why                                                       |
|--------------------------------|------------|-----------------------------------------------------------|
| Prompt library hygiene         | Weekly     | Keeps templates fresh; deletes dead ones.                 |
| Eval ritual                    | Weekly     | Run the same 5 benchmark prompts; track quality drift.    |
| Post-mortem                    | Per incident | One bullet on what went wrong, one on the fix.          |
| Source audit                   | Monthly    | Spot-check 10 random citations from past outputs.         |
| Model rotation review          | Quarterly  | Re-run top prompts on the current best model.             |
| Cost / latency review          | Monthly    | Identify expensive prompts; compress or cache.            |
| Security review                | Monthly    | Scan logs for leaked secrets or PII.                      |
| Agent permissions review       | Monthly    | Confirm every agent's scope is still minimal.             |

---

## Decision Matrix — Which AI Tool for Which Job

> Tool families below are described generically. Vendor-specific feature claims are tagged.

| Job                                            | Tool family                                  | Why                                                              | Tag                          |
|------------------------------------------------|----------------------------------------------|------------------------------------------------------------------|------------------------------|
| Long-form writing with citations               | Chat LLM with web search                     | Needs current sources.                                           | LIKELY_NATIVE_UNVERIFIED     |
| Code editing inside a repo                     | Agentic coding CLI / IDE assistant           | Has file access, can run tests.                                  | CUSTOM_WORKFLOW              |
| Quick fact lookup with verifiable links        | Search-augmented chat                        | Citations are the deliverable.                                   | LIKELY_NATIVE_UNVERIFIED     |
| Image generation (concept art)                 | Diffusion image model                        | Best at single-shot images.                                      | LIKELY_NATIVE_UNVERIFIED     |
| Video generation (short clip)                  | Video diffusion model                        | Specialized; expensive.                                          | LIKELY_NATIVE_UNVERIFIED     |
| Voice cloning / TTS                            | Specialized voice model                      | Quality and consent controls.                                    | LIKELY_NATIVE_UNVERIFIED     |
| Spreadsheet / data wrangling                   | LLM with code-execution sandbox              | Verifiable via running code.                                     | LIKELY_NATIVE_UNVERIFIED     |
| Document Q&A over your files                   | Retrieval-augmented chat / file upload chat  | Grounds answers in your data.                                    | LIKELY_NATIVE_UNVERIFIED     |
| Multi-step automation                          | Workflow tool (n8n / Zapier) + LLM node      | Logs, retries, schedules.                                        | USER_PROVIDED_UNVERIFIED     |
| Autonomous task execution                      | Agent framework with tool access             | Needs permission scoping.                                        | CUSTOM_WORKFLOW              |
| Live transcription / meetings                  | Specialized ASR product                      | Latency and accuracy matter.                                     | LIKELY_NATIVE_UNVERIFIED     |
| Translation                                    | Modern LLM                                   | Comparable to dedicated MT for most pairs.                       | LIKELY_NATIVE_UNVERIFIED     |
| Reasoning over math / logic                    | Reasoning-tuned LLM                          | Better step accuracy on hard problems.                           | LIKELY_NATIVE_UNVERIFIED     |
| Anything with "today" or "live"                | Search-augmented or live-data tool           | Without live data, output is stale.                              | CUSTOM_WORKFLOW              |

Pair every choice with the operator loop. The best tool used badly underperforms the second-best tool used systematically.
