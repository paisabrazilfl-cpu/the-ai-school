# 23 — AI Learning Curriculum

> WEB VERIFICATION NOT AVAILABLE IN THIS RUN.
> Platform-specific claims tagged: VERIFIED_LOCAL / VERIFIED_DOCS / USER_PROVIDED_UNVERIFIED / CUSTOM_WORKFLOW / LIKELY_NATIVE_UNVERIFIED / UNKNOWN / DEPRECATED.
> Never request hidden chain-of-thought. Use "reasoning summary."

---

## 1. Purpose

This is a complete curriculum for becoming an AI operator, then an AI systems builder. It defines:

- 12 ordered stages of mastery.
- A 30-day operator curriculum (day-by-day).
- A 90-day systems-builder curriculum (week-by-week).
- A beginner-to-PhD progression ladder with explicit skill gates.

The curriculum is opinionated. It teaches the order in which skills compound. Skipping stages leaves measurable gaps that show up under pressure.

---

## 2. Who It Is For

| Reader                           | Use the curriculum to...                                            |
|----------------------------------|---------------------------------------------------------------------|
| Total beginner                   | Build a foundation that does not collapse later.                    |
| Self-taught user                 | Find and fix gaps in your existing skill set.                       |
| Working professional             | Allocate one hour a day for 30/90 days deliberately.                |
| Engineer                         | Get to agent and systems work without skipping fundamentals.        |
| Researcher                       | Develop discipline around sources, citations, and refutation.       |
| Manager                          | Standardize how your team learns AI.                                |

---

## 3. Beginner Explanation

Learning AI is like learning a musical instrument:

- Scales first, then songs.
- Songs first, then composition.
- Composition first, then ensembles.
- Ensembles first, then orchestras.

You will be tempted to jump to "build an agent" on day one. Resist. An agent built on a weak prompt foundation is a confidently wrong robot.

Each stage in this curriculum has:

- **What to learn** — the concept.
- **Why it matters** — the reason it compounds.
- **Practice drill** — what to do this week.
- **Failure mode** — what happens if you skip it.
- **Proof of mastery** — what you must produce to advance.

---

## 4. Operator Explanation

The curriculum is a dependency graph. Higher stages assume lower stages are solid. The skill gates are non-negotiable:

```
[1 Capability] -> [2 Prompts] -> [3 Formats] -> [4 Refinement] -> [5 Research]
                                                                  |
                                                                  v
   [6 Writing] [7 Coding] [8 Data] [9 Automation] [10 Creative]
                                                                  |
                                                                  v
                                              [11 Agents] -> [12 Systems]
```

You can specialize after stage 5, but stages 1-5 are required for everyone.

---

## 5. Core Concepts — The 12 Stages

### Stage 1 — Understand What AI Can and Cannot Do

- **What to learn:** Capabilities (text generation, summarization, classification, code, vision, audio), limits (knowledge cutoff, hallucination, no real-time data without tools, no private files without access).
- **Why it matters:** Prevents 80% of beginner mistakes.
- **Practice drill:** Make a two-column list: 20 tasks AI is good at, 20 tasks it is bad at, with one-line reasons.
- **Failure mode:** Asking AI for current stock prices and trusting the answer.
- **Proof of mastery:** You can predict, before prompting, whether an answer will be reliable.

### Stage 2 — Learn Prompt Structure

- **What to learn:** ROLE + OBJECTIVE + CONTEXT + CONSTRAINTS + OUTPUT.
- **Why it matters:** This is the alphabet. Everything else is words.
- **Practice drill:** Rewrite 20 of your existing prompts using the five-part structure. Compare results.
- **Failure mode:** One-liner prompts that produce unbounded prose.
- **Proof of mastery:** Every prompt you write uses all five parts by reflex.

### Stage 3 — Learn Output Formats

- **What to learn:** Markdown, JSON (with schema), tables, checklists, code blocks, ASCII diagrams.
- **Why it matters:** Format determines reusability and verifiability.
- **Practice drill:** Take one prompt; demand the answer in 5 formats. Inspect which is most useful downstream.
- **Failure mode:** Receiving prose you then must reformat by hand.
- **Proof of mastery:** You always specify a format. You can write a JSON schema in 30 seconds.

### Stage 4 — Learn Refinement

- **What to learn:** Iteration commands (narrow, expand, simplify, technicalize, add citations, add risks, add examples).
- **Why it matters:** First drafts are almost never the deliverable.
- **Practice drill:** Take one weak output. Apply 6 refinement commands in sequence. Document which moved the needle.
- **Failure mode:** Starting over instead of refining.
- **Proof of mastery:** You can rescue 80% of bad outputs with 3 or fewer refinements.

### Stage 5 — Learn Research Discipline

- **What to learn:** Source hierarchy, citation discipline, primary vs secondary sources, recency, refutation.
- **Why it matters:** Without it, you ship hallucinations.
- **Practice drill:** Pick a topic you do not know. Produce a 5-page dossier with 15 verified citations. Click every link.
- **Failure mode:** Citing a non-existent paper.
- **Proof of mastery:** You never ship a factual claim without a tag and, where required, a source.

### Stage 6 — Learn AI for Writing

- **What to learn:** Style transfer, voice, brand guidelines, audience modeling, structural editing.
- **Why it matters:** Most knowledge work is writing.
- **Practice drill:** Write the same memo for 3 audiences (engineer, exec, customer). Same facts; different framing.
- **Failure mode:** All AI writing sounds like AI.
- **Proof of mastery:** A reader cannot tell the writing was AI-assisted.

### Stage 7 — Learn AI for Coding

- **What to learn:** Spec-first prompts, test-first prompts, refactor prompts, code review prompts.
- **Why it matters:** Code is testable; this is where verification is cheapest.
- **Practice drill:** Build a small CLI tool. Have AI generate the code and the tests. You only review and run.
- **Failure mode:** Shipping AI code without tests.
- **Proof of mastery:** No AI code lands in your repo without tests and a reasoning summary.

### Stage 8 — Learn AI for Data

- **What to learn:** EDA prompts, SQL from English, schema design, anomaly detection, dashboard specs.
- **Why it matters:** Data is the substrate of decisions.
- **Practice drill:** Take a CSV. Have AI write the EDA report, the SQL queries, and the anomaly checks. Verify against running the code.
- **Failure mode:** Trusting AI-generated SQL without running EXPLAIN.
- **Proof of mastery:** You can describe a dataset and get back queryable, verified analysis.

### Stage 9 — Learn AI for Automation

- **What to learn:** Workflow tools (n8n, Zapier, Make) with LLM nodes; triggers, branches, retries, logs.
- **Why it matters:** Automation converts skills into compounding leverage.
- **Practice drill:** Pick a daily 15-minute task. Automate it. Add logging and an approval gate.
- **Failure mode:** Unmonitored automation drifts into silent failure.
- **Proof of mastery:** A running automation that you trust and audit weekly.

### Stage 10 — Learn AI for Creative Production

- **What to learn:** Image, video, voice, music; brand consistency; prompt seeds; references.
- **Why it matters:** Multimodal output is now production-grade.
- **Practice drill:** Produce a consistent 5-asset campaign (hero image, 2 social images, 1 voiceover, 1 short video).
- **Failure mode:** Asset drift across a campaign.
- **Proof of mastery:** Your assets look like one brand designed them, not five AIs.

### Stage 11 — Learn AI Agents

- **What to learn:** Planner / executor / validator pattern; tool use; permissions; audit logs.
- **Why it matters:** Agents are the unit of leverage above prompts.
- **Practice drill:** Build a 3-step agent (plan, execute, validate) for a real task. Log every action.
- **Failure mode:** An agent that takes irreversible actions without approval.
- **Proof of mastery:** A working agent with scoped permissions and a readable audit log.

### Stage 12 — Learn AI Systems Architecture

- **What to learn:** Memory, retrieval, evals, model routing, cost / latency tradeoffs, observability.
- **Why it matters:** This is where AI work becomes engineering.
- **Practice drill:** Design a system with retrieval, an eval harness, and a routing layer between two models. Document the tradeoffs.
- **Failure mode:** Building a demo that cannot scale or be debugged.
- **Proof of mastery:** A system other engineers can read, deploy, and extend.

---

## 6. Workflow — How to Move Through the Stages

```
For each stage:
  1. Read the stage section (10 min).
  2. Run the practice drill (3-6 hours over a week).
  3. Produce the proof-of-mastery artifact.
  4. Self-grade against the rubric in Section 11.
  5. Only advance if you score >= 80%.
```

Re-running an earlier stage is a sign of strength, not weakness. Most operators benefit from a quarterly re-run of stages 2 and 5.

---

## 7. Cheat Sheet

### Stage progression at a glance

| # | Stage                          | Core artifact                            | Time budget |
|---|--------------------------------|------------------------------------------|-------------|
| 1 | Capabilities                   | Capability list                          | 2 days      |
| 2 | Prompt structure               | 20 rewritten prompts                     | 3 days      |
| 3 | Output formats                 | Format comparison doc                    | 2 days      |
| 4 | Refinement                     | Refinement playbook                      | 2 days      |
| 5 | Research                       | Cited 5-page dossier                     | 5 days      |
| 6 | Writing                        | Multi-audience memo set                  | 5 days      |
| 7 | Coding                         | CLI tool with tests                      | 7 days      |
| 8 | Data                           | EDA + SQL + anomaly report               | 7 days      |
| 9 | Automation                     | Running, logged workflow                 | 7 days      |
| 10 | Creative                      | 5-asset brand-consistent campaign        | 7 days      |
| 11 | Agents                        | 3-step agent with audit log              | 14 days     |
| 12 | Systems                       | Designed system with eval harness        | 21 days     |

### Quick failure tests

- Cannot list 5 things AI cannot do? Go back to Stage 1.
- Prompt is shorter than 3 lines? Go back to Stage 2.
- Output is prose when it should be JSON? Go back to Stage 3.
- Restarted instead of refined? Go back to Stage 4.
- Quoted a "fact" with no source? Go back to Stage 5.

---

## 8. Examples

### Example — A Stage 7 proof of mastery

**Project:** A `wcli` utility that counts words, lines, and characters in a file, with `--json` output.

**Deliverables in the repo:**

- `src/wcli.py` — AI-generated, human-reviewed.
- `tests/test_wcli.py` — 12 unit tests, including unicode edge cases.
- `README.md` — usage, install, examples.
- `PROMPTS.md` — the exact prompts used, versioned.
- `REASONING.md` — a 5-line reasoning summary captured from the model.

If you cannot produce all five files, you have not passed Stage 7.

### Example — A Stage 11 proof of mastery

**Agent task:** Triage inbox, draft replies, label threads. No send without human approval.

**Deliverables:**

- Planner prompt, executor prompt, validator prompt.
- Permissions matrix (read-only vs draft vs send).
- Audit log schema (timestamp, action, input hash, output hash, approver).
- A 50-thread test run with results.

---

## 9. Common Mistakes

| Mistake                                  | Stage typically skipped | Symptom                                                |
|------------------------------------------|-------------------------|--------------------------------------------------------|
| "I jumped straight to agents."           | 1-5                     | Brittle systems, hallucinated facts.                   |
| "My prompts keep failing."               | 2                       | One-liners, no structure.                              |
| "AI writes too verbose."                 | 3                       | No output format spec.                                 |
| "I keep restarting from scratch."        | 4                       | Refinement vocabulary missing.                         |
| "AI made up a citation."                 | 5                       | No source hierarchy enforced.                          |
| "It does not sound like me."             | 6                       | No style references provided.                          |
| "AI code broke in production."           | 7                       | No tests.                                              |
| "Queries return wrong numbers."          | 8                       | No EXPLAIN / no row counts verified.                   |
| "My automation failed silently."         | 9                       | No logs, no alerts.                                    |
| "Brand assets do not match."             | 10                      | No seed / no reference image discipline.               |
| "My agent emailed the wrong person."     | 11                      | No permission scope.                                   |
| "We cannot debug our system."            | 12                      | No observability layer.                                |

---

## 10. Recovery Commands

If a curriculum stage stalls:

- "I do not understand this concept" -> Re-read Beginner Explanation. Then do the drill smaller.
- "The drill is taking forever" -> Cut scope by half. Same shape, less depth.
- "My output is wrong but I cannot tell why" -> Send output to the model with: "Critique this against the proof-of-mastery rubric and list defects."
- "I keep failing the skill gate" -> Pair with a peer or AI tutor. Have them grade you on the rubric.
- "I am bored at this stage" -> Skip ahead one stage as an experiment. When it fails, return.

---

## 11. Verification Checklist — Proof of Mastery Rubric

Score each stage's artifact out of 100. Advance only at >= 80.

| Criterion                                          | Points |
|----------------------------------------------------|--------|
| Followed the prompt structure (ROLE+OBJ+CTX+CON+OUT)| 20    |
| Output in the specified format                     | 15     |
| All claims have sources or are tagged              | 20     |
| Code (if any) passes tests                         | 15     |
| Reasoning summary present and coherent             | 10     |
| Reusable template captured                         | 10     |
| Post-mortem / lessons learned written              | 10     |

---

## 12. Practice Drills

### 30-Day AI Operator Curriculum (day-by-day)

| Day | Focus                                  | Drill                                                         |
|-----|----------------------------------------|---------------------------------------------------------------|
| 1   | Capabilities                           | Build the 20/20 can/cannot list.                              |
| 2   | Capabilities                           | Test the list against 10 real tasks.                          |
| 3   | Prompt structure                       | Rewrite 10 prompts.                                           |
| 4   | Prompt structure                       | Rewrite 10 more; compare.                                     |
| 5   | Prompt structure                       | Build a one-page personal prompt template.                    |
| 6   | Output formats                         | Same prompt -> 5 formats.                                     |
| 7   | Output formats                         | Write 3 JSON schemas for recurring tasks.                     |
| 8   | Refinement                             | Apply 6 refinement commands to one bad output.                |
| 9   | Refinement                             | Build a personal refinement cheat sheet.                      |
| 10  | Research                               | Pick topic; collect 20 sources; rank them.                    |
| 11  | Research                               | Draft 5-page dossier section 1.                               |
| 12  | Research                               | Draft sections 2-3.                                           |
| 13  | Research                               | Draft sections 4-5; verify all citations.                     |
| 14  | Writing                                | Rewrite an email for 3 audiences.                             |
| 15  | Writing                                | Build a personal style guide with 5 reference samples.        |
| 16  | Writing                                | Draft a 1000-word blog post in your voice.                    |
| 17  | Coding                                 | Spec a CLI tool; have AI write code and tests.                |
| 18  | Coding                                 | Run tests; fix failures; commit.                              |
| 19  | Coding                                 | Refactor for clarity; re-run tests.                           |
| 20  | Data                                   | Pick a CSV; run an EDA prompt.                                |
| 21  | Data                                   | Generate 5 SQL queries from English specs; run them.          |
| 22  | Data                                   | Build an anomaly checklist.                                   |
| 23  | Automation                             | Pick a daily 15-min task to automate.                         |
| 24  | Automation                             | Build the workflow with an LLM node.                          |
| 25  | Automation                             | Add logs and an approval gate.                                |
| 26  | Creative                               | Define a brand: palette, voice, references.                   |
| 27  | Creative                               | Produce 3 brand-consistent images.                            |
| 28  | Creative                               | Produce a voiceover and a short video to match.               |
| 29  | Integration                            | Run a full operator loop on a hard task.                      |
| 30  | Post-mortem                            | Write lessons; update templates; plan next 60 days.           |

### 90-Day AI Systems Builder Curriculum (weekly milestones)

| Week | Milestone                                                                                  |
|------|--------------------------------------------------------------------------------------------|
| 1    | Complete 30-day operator curriculum review; identify weak stages and re-run them.         |
| 2    | Stand up a personal prompt library repo with versioning, changelog, and CI lint.          |
| 3    | Build an eval harness: 10 benchmark prompts, scored automatically.                        |
| 4    | Implement retrieval over a personal corpus (notes, PDFs, repo).                           |
| 5    | Build a basic planner-executor-validator agent.                                            |
| 6    | Add scoped permissions and a structured audit log.                                         |
| 7    | Add cost and latency tracking.                                                             |
| 8    | Introduce model routing (cheap model for easy tasks, strong model for hard ones).         |
| 9    | Build a regression suite of "golden" outputs; alert on drift.                             |
| 10   | Add human-in-the-loop approval gate for irreversible actions.                              |
| 11   | Build a dashboard: tasks attempted, success rate, cost, latency, defect rate.             |
| 12   | Run a red-team week: jailbreaks, prompt injections, data leaks. Patch.                    |
| 13   | Productionize: containers, secrets management, CI/CD, on-call runbook.                    |
|      |                                                                                            |

### Beginner-to-PhD Progression Ladder

| Level | Title                  | Skill gate (must demonstrate before advancing)                                                                |
|-------|------------------------|----------------------------------------------------------------------------------------------------------------|
| L0    | Curious                | Has used a chat AI for at least 5 tasks.                                                                       |
| L1    | Beginner               | Can list 5 things AI cannot do reliably without tools.                                                         |
| L2    | Apprentice             | Uses ROLE+OBJ+CTX+CON+OUT by reflex; produces structured output formats.                                       |
| L3    | Journeyman             | Runs the full operator loop on real tasks; ships cited research with no hallucinations.                        |
| L4    | Practitioner           | Specializes in at least two of: writing, coding, data, automation, creative.                                  |
| L5    | Operator               | Maintains a versioned prompt library and an eval harness; runs weekly evals.                                  |
| L6    | Systems Builder        | Has built a retrieval + agent + audit system used by others.                                                  |
| L7    | Architect              | Designs multi-model, multi-tool systems with observability, cost controls, and red-team coverage.             |
| L8    | Research Engineer      | Contributes evals, datasets, or fine-tuning pipelines; can explain failure modes empirically.                 |
| L9    | Researcher             | Publishes or open-sources reusable methods (datasets, evals, techniques); peer-reviewed or widely adopted.    |
| L10   | PhD-equivalent         | Original contributions to the field (new architectures, new training methods, new alignment techniques) with reproducible results. |

Skill gates are cumulative. You cannot be L7 if you cannot pass L3.

---

## 13. Summary

- 12 stages, ordered by dependency.
- 30 days makes an operator; 90 days makes a systems builder.
- Skill gates are non-negotiable. Skipping shows up under pressure.
- Re-running early stages is a sign of strength.
- The ladder from beginner to PhD is well-defined but long. Run it deliberately.
