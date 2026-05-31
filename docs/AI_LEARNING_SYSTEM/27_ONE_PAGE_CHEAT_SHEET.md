# 27_ONE_PAGE_CHEAT_SHEET

WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

Tag legend: VERIFIED_LOCAL / VERIFIED_DOCS / USER_PROVIDED_UNVERIFIED / CUSTOM_WORKFLOW / LIKELY_NATIVE_UNVERIFIED / UNKNOWN / DEPRECATED.

---

## AI POWER FORMULA

```
ROLE        +  OBJECTIVE  +  CONTEXT  +  CONSTRAINTS  +  OUTPUT
who you are    what to do    what is        what not       exact
                              true/known    to do          shape
```

Every strong prompt names all five. Missing any one is the most common cause of weak output.

---

## POWER WORDS

Act as | Adopt the role of | Step by step (reasoning summary only) | Be precise | Cite sources | Quote verbatim | Refuse to guess | Mark UNKNOWN | State assumptions | Confidence 0-100 | Counter-evidence | As of <date> | Strictly | Exactly | No prose | Only JSON | Match this schema | Within <N> words | Use only the provided context | Do not invent | Verify | Compare | Contrast | Critique | Improve | Refactor | Minimize diff | Preserve <X> | Replace <X> with <Y> | Re-output | Continue from cutoff | Halt and ask | Summarize state | List every claim | Tag each claim VERIFIED/INFERRED/UNKNOWN.

---

## ANTI-HALLUCINATION RULES

1. Cite every factual claim or write UNKNOWN.
2. Separate FACT from INFERENCE from OPINION on every paragraph.
3. Mark UNKNOWN explicitly; never fill silently.
4. State assumptions in a top block before answering.
5. Demand current sources with an "as of <date>" tag.
6. Verify commands by running them; paste exit codes and output.
7. Test code by executing it; paste real output, not a description.
8. Quote source spans verbatim, not just the URL.
9. Provide a confidence 0-100 plus one piece of counter-evidence.
10. Never request hidden chain-of-thought; ask for a reasoning summary.

---

## BEST REFINEMENT COMMANDS

- "List every claim. Tag each VERIFIED / INFERRED / UNKNOWN. Redo using only VERIFIED."
- "Re-output strictly matching this JSON schema. Null for unknown. No prose."
- "Cut everything not in the original objective. Re-output the trimmed version."
- "Provide assumptions block first, then answer."
- "Give a confidence 0-100 and one reason you might be wrong."
- "Quote the exact sentence from the source for each citation."
- "Continue from the cutoff. Do not restart the answer."
- "Summarize current state in 5 bullets. Ask before next step."
- "Critique your previous answer. Then revise."
- "Reduce to <= N words. Keep items A, B, C."
- "Switch to reasoning summary. 5 bullets max. Then final answer."
- "Run the code and paste raw output. Then explain."
- "Restate the constraints in your own words before answering."

---

## BEST UNIVERSAL PROMPT

```
ROLE
You are a [domain] expert with [years] of experience in [specialty].

OBJECTIVE
Produce [exact deliverable] that achieves [measurable outcome].

CONTEXT
- Background: [3-7 bullets of relevant facts]
- Audience: [who reads this]
- Prior attempts: [what was tried, what failed]
- Sources you may use: [allow-list]
- Knowledge currency: treat anything after [date] as UNKNOWN unless a source is provided.

CONSTRAINTS
- Do NOT: [forbidden behaviors]
- Stay within: [scope boundaries]
- Length: [max words or sections]
- Tone: [register]
- Formatting: [structure]
- Verification: every factual claim must be cited or marked UNKNOWN.
- Reasoning: provide a reasoning summary (5 bullets), not hidden chain-of-thought.

OUTPUT
1. ASSUMPTIONS (bullet list)
2. REASONING SUMMARY (<= 5 bullets)
3. FINAL ANSWER (matching this exact schema/structure: [schema])
4. CONFIDENCE (0-100) and one piece of counter-evidence
5. UNKNOWNS (list anything you could not verify)

REFINEMENT
If any constraint cannot be met, stop and ask before proceeding.
```

---

## QUICK DECISION MATRIX: TASK -> PLATFORM PATTERN

| Task type | Recommended pattern | Notes |
|---|---|---|
| Quick factual lookup | Chat assistant with web tool | Demand citations. |
| Long document analysis | Long-context model + chunked summary | Re-paste constraints. |
| Code change in a repo | Coding agent with shell + edit tools | Step budget, diff minimization. |
| Multi-source research | Research-mode agent with retrieval | Force per-claim citations. |
| Recurring workflow | Automation with deterministic steps | Schema gate between steps. |
| Multi-step task with branching | Agent with tool router + critic | Log plans, traces, exit conditions. |
| Image generation | Diffusion model + refiner | Negative prompts; manual review. |
| Voice generation | TTS with phonetic tags | Pronounce-check proper nouns. |
| Structured extraction | JSON mode / structured output | Validate; reject; re-prompt. |
| Brainstorming | High-temperature single-shot | Then re-filter with low-temperature critic. |
| Decision support | Reasoning model + assumptions block | Confidence band required. |
| Safety-sensitive | Layered guardrails + human gate | Refusals are acceptable. |
| Fast classification | Small model + few-shot | Eval against golden set. |
| Personal memory | External memory store, re-injected | Treat as untrusted text. |

---

## ONE-LINERS (PRINTABLE)

- No source -> no claim. UNKNOWN is a valid answer.
- Fluent is not correct.
- A schema-valid output can still be wrong.
- Cited URL is not evidence; the quoted span is.
- A tool call is not a tool execution.
- Done is not done until evidence is shown.
- Reasoning summary, never hidden chain-of-thought.
- Pin model version. Pin prompt version. Pin schema version.
- Quarantine untrusted data from instructions.
- Set a step budget on every agent.
