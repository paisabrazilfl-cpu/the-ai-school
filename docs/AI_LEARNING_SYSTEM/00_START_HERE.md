# 00 START HERE

The fastest, lowest-ego on-ramp for someone who has never used AI seriously. If you read only one file in this manual, read this one. Then read `01_WHAT_AI_IS.md` and `03_PROMPT_ENGINEERING_FOUNDATION.md`.

WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Treat every platform-specific instruction by its status tag, not by its tone.

---

## 1. Purpose

This file exists to do three things:

1. Replace the mythology around AI with a working mental model.
2. Give you a prompt structure that works on your first attempt.
3. Hand you a 60-minute practice drill that converts reading into reflex.

After this file you should be able to (a) describe what an AI assistant is and is not, (b) write a prompt with a defined role, objective, context, constraints, and output, and (c) recognize the three most common ways AI will mislead you.

This file is not a vendor tour. We do not pick favorites here. The vendor cheat sheets are in files 14 through 21.

---

## 2. Who It Is For

| Reader | Why This File Matters |
|---|---|
| Total beginner | You have never written a prompt longer than one sentence |
| Returning user | You tried AI once, got bad output, and stopped |
| Manager | You need to talk about AI without bluffing |
| Skeptic | You suspect it is hype and want to test that hypothesis honestly |
| Power user onboarding others | You need a doc to hand to someone with zero context |

This file is not for:

- People who already build agents (go to file 09).
- People who already write API code (go to file 02 then 09).
- People who want vendor-specific tricks (go to files 14 through 21).

---

## 3. Beginner Explanation

An AI assistant is a worker, not an oracle.

Workers need three things to do good work: a clear job, the relevant information, and a way to check their output. AI is the same. If you treat it like a magic 8-ball, you will get magic 8-ball answers. If you treat it like a new hire who is fast, well-read, easily confused, and occasionally over-confident, you will get useful work.

The single most important shift for a beginner is this: AI does not look things up by default. It generates plausible text based on patterns in its training. If you do not give it the facts, it will fabricate facts that sound right. This is not a bug in any one product. It is the nature of the technology.

The second most important shift is this: AI does not remember you across sessions unless the product has explicitly turned on memory. In most professional use, treat every new conversation as a new hire on their first day. Re-introduce the project. Re-state the goal.

The third shift: AI is bad at math, dates, and counts of things unless you make it use a tool. It is good at language, structure, and synthesis.

If you internalize those three shifts in your first hour, you will skip ninety percent of the mistakes beginners make.

---

## 4. Operator Explanation

An operator treats AI as a controllable function with four inputs and one output.

```
output = model(system_prompt, user_prompt, context, parameters)
```

Each input is a lever. You do not pull all of them every time, but you should know which lever is in your hand:

- system_prompt: persistent behavior, role, tone, refusal policy, output schema.
- user_prompt: the task for this turn.
- context: documents, prior messages, tool results, retrieved snippets.
- parameters: temperature, top-p, max tokens, tool list, stop sequences.

The operator does not optimize the model. The operator optimizes the inputs and the verification loop around the output. The output is a draft. The operator is the editor.

Operator practices that separate professionals from tourists:

1. Write the prompt once, test it three times. Variance is real.
2. Define the failure mode you fear most, then prompt against it.
3. Always know which platform, model, and mode you are in. Confusion compounds.
4. Keep a personal prompt library. Reuse beats re-invention.
5. Verify anything that touches money, law, medicine, identity, or production.

---

## 5. Core Concepts

The minimum vocabulary to read the rest of this manual without getting lost.

| Term | Plain Meaning | Why It Matters |
|---|---|---|
| Model | The trained brain that produces output | Different models have different strengths and costs |
| Prompt | What you send to the model | The lever you actually control |
| System prompt | Persistent instructions for the session | Sets behavior before the user even speaks |
| Context window | How much text the model can read at once | If you exceed it, older content is lost or summarized |
| Token | The unit a model counts, roughly a word fragment | Cost, speed, and limits are measured here |
| Temperature | Randomness dial | Low for facts and code, higher for ideation |
| Hallucination | A confident but wrong answer | The most common failure mode |
| Grounding | Forcing the model to cite or use real sources | The single best defense against hallucination |
| Tool use | The model calling code, search, or APIs | Turns a writer into a doer |
| Agent | A loop where the model plans, acts, observes, repeats | Powerful and risky in equal measure |
| Reasoning summary | A short, post-hoc explanation of the decision path | Use this phrase, never ask for hidden chain-of-thought |

Deep definitions live in `02_AI_CORE_CONCEPTS.md`. For now, knowing these eleven terms is enough to read on.

---

## 6. Workflow

The beginner workflow is five steps. Do them in order. Do not skip step five.

```
1. FRAME       Decide what good looks like before you prompt.
2. PROMPT      Use the ROCCO formula. See section 7.
3. INSPECT     Read the output as if it were from a stranger.
4. ITERATE     One change at a time. Note what changed the result.
5. VERIFY      Check any fact, number, citation, or command against a primary source.
```

ASCII flow:

```
+--------+   +--------+   +---------+   +---------+   +--------+
| FRAME  |-->| PROMPT |-->| INSPECT |-->| ITERATE |-->| VERIFY |
+--------+   +--------+   +---------+   +---------+   +--------+
                                |____________^
                              (loop until acceptable)
```

The most common beginner mistake is collapsing FRAME and PROMPT, then skipping VERIFY. The most common operator mistake is over-iterating instead of re-framing.

---

## 7. Cheat Sheet

### The ROCCO Prompt Formula

ROCCO stands for Role, Objective, Context, Constraints, Output. Status: CUSTOM_WORKFLOW. Use it as scaffolding, drop pieces only when you know why.

| Slot | Question It Answers | Example Fragment |
|---|---|---|
| Role | Who is the AI being right now? | "You are a careful technical editor." |
| Objective | What is the single goal? | "Rewrite this email to be 30 percent shorter." |
| Context | What does it need to know? | "The audience is a non-technical executive. Tone is direct." |
| Constraints | What must it avoid or include? | "No marketing language. Keep all numbers exact. Max 120 words." |
| Output | What shape should the result take? | "Return only the rewritten email. No commentary." |

### Full Worked Example

Bad prompt (what most beginners write):

```
make this email better
[pastes 600 word email]
```

ROCCO prompt (what an operator writes):

```
ROLE
You are a careful technical editor who specializes in executive communication.

OBJECTIVE
Rewrite the email below so it is approximately 30 percent shorter while preserving every fact, number, and named person.

CONTEXT
The recipient is a non-technical executive who reads quickly on mobile.
The sender is the head of operations.
The email is about a delayed vendor shipment and a proposed mitigation plan.

CONSTRAINTS
- No marketing language.
- Keep all dates, dollar figures, and names exactly as written.
- Use short paragraphs, no more than three sentences each.
- Maximum 180 words total.
- Do not add any new information.

OUTPUT
Return only the rewritten email body. No preamble, no commentary, no alternative versions.

EMAIL TO REWRITE
"""
[paste the original email here, inside the triple quotes]
"""
```

Why this works:

1. Role focuses the model's voice.
2. Objective is one sentence and measurable.
3. Context tells the model what trade-offs to make.
4. Constraints prevent the most common failure modes (fabrication, drift, over-length).
5. Output prevents the model from adding "Sure, here's your rewritten email" preamble.

### Quick Mode Selectors

When you do not have time for full ROCCO, escalate the format to match the stakes.

| Stakes | Minimum Prompt Shape |
|---|---|
| Throwaway draft | One sentence is fine |
| Anything a human will read | Role plus Objective plus Output |
| Anything that touches a customer | Full ROCCO |
| Anything that touches money, law, or production | Full ROCCO plus a verification step in the same prompt |

---

## 8. Examples

### Example A: Summarize a meeting transcript

```
ROLE: You are a meeting summarizer for a busy product manager.
OBJECTIVE: Produce a structured summary of the transcript below.
CONTEXT: The PM was not in the meeting. They need to act on it tomorrow.
CONSTRAINTS:
- Do not invent any decisions, owners, or dates.
- If something is ambiguous, mark it as AMBIGUOUS instead of guessing.
- Quote any direct commitments verbatim.
OUTPUT:
1. One-paragraph summary (max 80 words).
2. Decisions table: Decision | Owner | Due Date.
3. Open Questions list.
4. Risks list with severity (low, medium, high).

TRANSCRIPT:
"""
[paste transcript]
"""
```

### Example B: Generate a SQL query from a plain description

```
ROLE: You are a senior analytics engineer.
OBJECTIVE: Write a single SQL query for the question below.
CONTEXT: Database is Postgres 15. Schema is provided.
CONSTRAINTS:
- Use only tables and columns in the provided schema.
- If a needed column does not exist, stop and list what is missing.
- No window functions unless necessary.
- Include a one-line comment above the query explaining the approach.
OUTPUT: Return the SQL only, inside a fenced code block.

QUESTION: How many users signed up in March 2026 and were still active in April 2026?

SCHEMA:
users(id, created_at, last_active_at, status)
```

### Example C: Draft a refusal-aware policy reply

```
ROLE: You are a customer support specialist for a fintech company.
OBJECTIVE: Draft a reply to the customer message below.
CONTEXT: Our policy is in the snippet provided. We cannot offer refunds older than 60 days. The customer is upset but not abusive.
CONSTRAINTS:
- Do not promise anything not in the policy snippet.
- Do not quote the policy verbatim; paraphrase.
- Acknowledge frustration in the first sentence.
- Offer one concrete next step.
OUTPUT: The reply only, no subject line.

POLICY SNIPPET:
"""
[paste policy]
"""

CUSTOMER MESSAGE:
"""
[paste message]
"""
```

---

## 9. Common Mistakes

| Mistake | What Happens | Fix |
|---|---|---|
| One-line prompt for high-stakes work | Generic, watered-down output | Use full ROCCO |
| No context | Model invents context | Paste the actual document or data |
| Asking for "the best" | Model picks something safe and average | Define the criteria for best |
| Letting the model name itself an expert | Vague authority, no improvement | Define the role narrowly |
| Asking for length without bounds | Wandering output | Specify word, paragraph, or token bounds |
| No output format | Hard to use programmatically | Specify table, JSON, headers, or schema |
| Treating output as truth | You repeat fabricated facts | Verify any claim before using |
| Pasting confidential data without checking platform | Possible data exposure | Confirm the platform's data policy first |
| Asking for the model's hidden reasoning | Encourages fabricated chain-of-thought | Ask for a reasoning summary instead |
| Stacking too many tasks in one prompt | Model does one well, others poorly | Split into separate prompts or steps |
| Re-rolling instead of re-framing | Same bad answer in new clothes | Change the prompt, not your luck |
| Ignoring tone drift over a long chat | Output drifts off the original spec | Re-state the spec every few turns |
| Asking math questions without a tool | Confidently wrong arithmetic | Use a code/tool-enabled mode |

---

## 10. Recovery Commands

When a session goes wrong, do not start over. Recover.

| Symptom | Recovery Phrase |
|---|---|
| Output is too long | "Cut to under N words. Preserve every number and proper noun." |
| Output is too short | "Expand only the section on X. Do not pad. Add only verifiable detail." |
| Model invented something | "Re-do this answer. If any claim is not directly supported by the context I gave you, mark it UNVERIFIED in brackets." |
| Wrong tone | "Rewrite in the voice of [specific role]. Examples of that voice: [paste two]." |
| Drifted from spec | "Re-anchor. The original spec is below. Produce a version that strictly conforms." |
| Refused incorrectly | "Re-read my request. I am asking for X, not Y. Confirm what you can do, then proceed." |
| Bad format | "Return only the JSON. No prose before or after. Use the exact keys: [list]." |
| Stuck in a loop | Start a new chat. Paste a short brief and the last good output. |
| Lost the thread | "Summarize what we have agreed so far in five bullets. Wait for my confirmation before continuing." |
| Numbers look wrong | "Recompute step by step using a tool. If no tool is available, refuse and tell me what tool you need." |

A useful trick: keep a snippet called RESET that contains the original spec. Pasting it back into the chat is faster than scrolling.

---

## 11. Verification Checklist

Before you act on any AI output that matters, run this checklist. Status: CUSTOM_WORKFLOW.

- [ ] I know which platform and model produced this output.
- [ ] I gave the model the source material; I did not rely on its memory of the world.
- [ ] Every name, date, dollar figure, and citation has been checked against a primary source.
- [ ] Any code has been read, not just run. I understand what each block does.
- [ ] Any legal, medical, financial, or safety claim has a human in the loop.
- [ ] I have not pasted secrets (keys, passwords, PII) into a platform that does not permit them.
- [ ] If I am sharing this output, I have removed prompts, raw context, and internal notes.
- [ ] If I am going to repeat this task, I have saved the prompt as a template.

If any box is unchecked, do not ship the output. Iterate or escalate.

---

## 12. Practice Drills

### Drill: The First 60 Minutes With AI

This drill is calibrated to take about an hour. Time yourself. Write down what surprises you. Status: CUSTOM_WORKFLOW.

```
00:00 - 00:05   Pick one assistant you already have access to.
                Write down: platform name, mode (chat / code / search),
                and whether memory is on or off.

00:05 - 00:15   Warm-up. Run three throwaway prompts:
                1. "Explain the difference between a model and a prompt in 80 words."
                2. "List five things you cannot do."
                3. "What is your knowledge cutoff date? If you do not know, say so."
                Note the answers. Do not argue with the model yet.

00:15 - 00:30   Real task #1: Summarize a real document you have.
                Use the full ROCCO formula from section 7.
                Constraints must include: "Do not invent any facts.
                If something is unclear, mark it AMBIGUOUS."
                Save the prompt to a notes file.

00:30 - 00:45   Real task #2: Ask the model to do something you can verify.
                Examples: rewrite an email you wrote last week,
                generate a SQL query against a schema you know,
                summarize a meeting you attended.
                Verify the output against your own knowledge.
                Count how many things are wrong.

00:45 - 00:55   Recovery practice. Deliberately break the output:
                ask for too much, ask vaguely, paste no context.
                Use the recovery commands from section 10
                to bring the session back.

00:55 - 01:00   Journal. Write three lines:
                - What did the model do better than I expected?
                - What did it do worse than I expected?
                - What is one habit I will adopt tomorrow?
```

### Drill: Spot The Hallucination

Paste a paragraph of unfamiliar content from a reliable source (a textbook chapter, a primary research paper, a man page). Ask the model questions about it. For every answer, mark each claim as SUPPORTED by the source, NOT IN SOURCE, or CONTRADICTED. Aim to do this five times. The objective is not to catch the model. The objective is to train your reflex.

### Drill: The Three-Prompt Variance Test

Take a single prompt. Run it three times in fresh sessions. Compare outputs. The amount of variance you observe is your model's natural variability. You cannot eliminate it. You can design around it by:

- Lowering temperature.
- Tightening constraints.
- Adding an explicit schema in the OUTPUT slot.
- Using multiple runs and a reconciliation step.

---

## 13. Summary

You are now equipped with five things:

1. A working mental model: AI is a worker, not an oracle.
2. The four levers: system prompt, user prompt, context, parameters.
3. The ROCCO prompt formula and one worked example.
4. A five-step beginner workflow with a verification step that is non-negotiable.
5. A 60-minute drill to convert reading into reflex.

Next steps:

- Read `01_WHAT_AI_IS.md` to understand why the model behaves this way.
- Read `02_AI_CORE_CONCEPTS.md` to get fluent in the vocabulary.
- Read `03_PROMPT_ENGINEERING_FOUNDATION.md` to deepen ROCCO into a full practice.
- When you start a real workflow, jump to the relevant cheat sheet (files 14 through 21).

A final reminder. The operators who succeed with AI are not the ones who trust it the most. They are the ones who design verification into every workflow and treat every output as a draft until proven otherwise. Start there and you will be ahead of most professionals on day one.
