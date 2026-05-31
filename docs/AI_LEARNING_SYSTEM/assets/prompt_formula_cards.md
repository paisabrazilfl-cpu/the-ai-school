# Prompt Formula Cards

A stack of single-card prompt formulas. Each card is self-contained: name, when to use, formula, one filled example, and the failure mode to watch for.

Verification tags used in this kit: VERIFIED_LOCAL / VERIFIED_DOCS / USER_PROVIDED_UNVERIFIED / CUSTOM_WORKFLOW / LIKELY_NATIVE_UNVERIFIED / UNKNOWN / DEPRECATED.

Note: WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Cards reference reasoning summaries only; never request hidden chain-of-thought.

---

## Card 01 - Universal Prompt

**When to use:** Default skeleton for any non-trivial prompt on any model.

**Formula:**
```
ROLE: [who the model is acting as]
OBJECTIVE: [single concrete goal]
CONTEXT: [facts, files, constraints, prior decisions]
CONSTRAINTS: [must / must-not / tone / length / scope]
OUTPUT: [exact format, sections, length, file type]
```

**Filled example:**
```
ROLE: Senior technical editor.
OBJECTIVE: Rewrite the attached onboarding doc for new operators.
CONTEXT: Audience is non-engineers. Doc is 1200 words, attached below.
CONSTRAINTS: Keep under 800 words. No jargon. Preserve all section headings.
OUTPUT: Markdown, same heading order, plus a 5-bullet TLDR at the top.
```

**Failure to watch for:** Mixing two objectives ("rewrite AND translate AND summarize"). Split into separate prompts.

---

## Card 02 - Research Prompt

**When to use:** You need facts, comparisons, or sourced claims.

**Formula:**
```
ROLE: Research analyst.
OBJECTIVE: Answer [question] using primary sources where possible.
CONTEXT: Today is [date]. Domain is [domain]. Known facts: [...].
CONSTRAINTS:
  - Cite every non-trivial claim with URL or document name.
  - Mark unsourced claims as UNKNOWN.
  - Distinguish primary vs secondary vs model-memory sources.
  - Provide a confidence tag per claim (HIGH / MED / LOW).
OUTPUT: Markdown table: Claim | Source | Source Tier | Confidence | Date.
```

**Filled example:**
```
ROLE: Research analyst.
OBJECTIVE: Compare three project management tools for a 12-person team.
CONTEXT: Today is 2026-05-13. Budget under USD 30/user/month.
CONSTRAINTS: Cite vendor docs first, reviews second. Mark anything older than 12 months as STALE.
OUTPUT: Comparison table + 5-bullet recommendation with confidence tags.
```

**Failure to watch for:** Model invents URLs. Always click-through or mark UNKNOWN.

---

## Card 03 - Coding-Agent Prompt

**When to use:** Asking an agent (Claude Code, Cursor, Copilot agent mode) to make changes across files.

**Formula:**
```
ROLE: Senior engineer pairing with an operator.
OBJECTIVE: [what to build or change]
CONTEXT:
  - Repo layout / entry points
  - Existing conventions (lint, test, naming)
  - Files in scope: [list]
  - Files out of scope: [list]
CONSTRAINTS:
  - Make minimal reversible changes.
  - Run tests after each step.
  - Stop and ask if scope expands.
  - Reasoning summary only, no hidden chain-of-thought.
OUTPUT: Plan first, then diff, then test results, then summary.
```

**Filled example:**
```
ROLE: Senior engineer.
OBJECTIVE: Add a /health endpoint to the Express server.
CONTEXT: Repo uses TypeScript, Jest, ESLint. Entry: src/server.ts.
CONSTRAINTS: Do not touch auth code. Add one unit test. Keep diff under 60 lines.
OUTPUT: 1) Plan. 2) Diff. 3) Test output. 4) One-paragraph summary.
```

**Failure to watch for:** Agent silently edits unrelated files. Require an explicit file list in plan step.

---

## Card 04 - Debug Prompt

**When to use:** Reproducible bug, error trace, or unexpected behavior.

**Formula:**
```
ROLE: Debugging partner.
OBJECTIVE: Find the root cause of [symptom].
CONTEXT:
  - Expected behavior: [...]
  - Actual behavior: [...]
  - Reproduction steps: [...]
  - Error / log output: [...]
  - Recent changes: [...]
CONSTRAINTS:
  - Propose hypotheses ranked by likelihood.
  - For each, list the cheapest test to confirm or eliminate.
  - Do not propose a fix until root cause is identified.
OUTPUT: Ranked hypothesis table, then recommended next test.
```

**Filled example:**
```
ROLE: Debugging partner.
OBJECTIVE: Find why /login returns 500 only in staging.
CONTEXT: Works locally and in prod. Logs show "ECONNREFUSED 6379". Redis recently moved.
CONSTRAINTS: Rank hypotheses, then propose ONE diagnostic command.
OUTPUT: Hypothesis table + single next step.
```

**Failure to watch for:** Jumping to a fix before isolating the cause.

---

## Card 05 - Refactor Prompt

**When to use:** Code works but is messy, duplicated, or hard to test.

**Formula:**
```
ROLE: Refactoring specialist.
OBJECTIVE: Improve [file / module] without changing observable behavior.
CONTEXT:
  - Current pain points: [...]
  - Tests covering this code: [...]
  - Style guide: [...]
CONSTRAINTS:
  - All existing tests must still pass.
  - No new public API.
  - One concern per commit.
OUTPUT: Refactor plan, diff per step, test results per step.
```

**Filled example:**
```
ROLE: Refactoring specialist.
OBJECTIVE: Extract duplicated date-parsing logic from 4 handlers into one util.
CONTEXT: handlers/*.ts, tests in __tests__/.
CONSTRAINTS: Keep handler signatures unchanged. No new dependencies.
OUTPUT: Step-by-step plan + final diff.
```

**Failure to watch for:** Behavior drift hidden inside "cleanup". Demand identical test output.

---

## Card 06 - Test-Generation Prompt

**When to use:** You need unit, integration, or property tests for existing code.

**Formula:**
```
ROLE: Test engineer.
OBJECTIVE: Write tests for [function / module].
CONTEXT:
  - Source code: [paste or path]
  - Framework: [Jest / Pytest / etc.]
  - Coverage target: [happy path / edges / errors]
CONSTRAINTS:
  - One assertion focus per test.
  - Include at least: happy path, boundary, error, empty input.
  - No network calls; mock external IO.
OUTPUT: Test file + table mapping test name -> behavior covered.
```

**Filled example:**
```
ROLE: Test engineer.
OBJECTIVE: Write Pytest tests for parse_iso_date(s).
CONTEXT: Function returns datetime or raises ValueError.
CONSTRAINTS: Cover valid, invalid, empty, timezone-aware inputs.
OUTPUT: tests/test_parse_iso_date.py + coverage table.
```

**Failure to watch for:** Tests that re-encode the bug. Read each test for "does this catch a real failure?"

---

## Card 07 - Image Prompt

**When to use:** Generating still images (Midjourney, DALL-E, SDXL, etc.).

**Formula:**
```
SUBJECT: [main object / person / creature]
SCENE: [where, what is happening]
STYLE: [art style, era, artist reference if licensed]
COMPOSITION: [framing, rule of thirds, symmetry]
LIGHTING: [time of day, source, mood]
CAMERA: [lens, angle, distance]
MOOD: [emotion the image evokes]
DETAILS: [textures, materials, small touches]
NEGATIVE: [things to exclude]
OUTPUT SPECS: [aspect ratio, resolution, file type, version]
```

**Filled example:**
```
SUBJECT: Lone hiker with red backpack.
SCENE: Crossing a stone bridge over a misty river at dawn.
STYLE: Cinematic, painterly realism.
COMPOSITION: Rule of thirds, hiker on right third, bridge leading line.
LIGHTING: Soft warm sunrise, low fog, rim light.
CAMERA: 35mm, slight low angle, mid-distance.
MOOD: Quiet determination.
DETAILS: Wet stone texture, breath visible in cold air.
NEGATIVE: No text, no watermarks, no other people.
OUTPUT SPECS: 16:9, high detail, PNG.
```

**Failure to watch for:** Style+subject mash that the model averages into mush. Cut to one dominant style.

---

## Card 08 - Video Prompt

**When to use:** Short generative video clips (Runway, Sora-class tools).

**Formula:**
```
SUBJECT and ACTION: [who/what is doing what]
SCENE: [environment, time of day]
CAMERA MOTION: [push-in, pan, static, handheld]
SHOT LENGTH: [seconds]
STYLE: [look, reference film, color grade]
LIGHTING and MOOD: [...]
AUDIO INTENT: [if supported]
NEGATIVE: [exclusions]
OUTPUT SPECS: [aspect ratio, duration, fps]
```

**Filled example:**
```
SUBJECT and ACTION: A paper boat floating down a rain-soaked gutter.
SCENE: Empty city street at dusk.
CAMERA MOTION: Slow tracking shot following the boat.
SHOT LENGTH: 6 seconds.
STYLE: Moody indie film, teal-orange grade.
LIGHTING: Wet asphalt reflecting neon signs.
NEGATIVE: No people, no text.
OUTPUT SPECS: 16:9, 6s, 24fps.
```

**Failure to watch for:** Asking for too many camera moves in one clip. One motion per clip.

---

## Card 09 - Voice Prompt

**When to use:** TTS or voice cloning briefs (ElevenLabs-class tools).

**Formula:**
```
SPEAKER PROFILE: [age range, gender, accent, register]
DELIVERY: [pace, energy, warmth]
EMOTION: [primary + secondary]
USE CASE: [narration, ad, character, IVR]
SCRIPT: [verbatim text in quotes]
PRONUNCIATION NOTES: [tricky names, acronyms]
PAUSES: [where, how long]
OUTPUT SPECS: [format, sample rate, length]
```

**Filled example:**
```
SPEAKER PROFILE: Female, 30s, neutral US accent, warm.
DELIVERY: Conversational, medium pace.
EMOTION: Reassuring, slightly curious.
USE CASE: Onboarding voiceover.
SCRIPT: "Welcome aboard. Let's get your workspace set up in under a minute."
PRONUNCIATION NOTES: "workspace" as one word.
PAUSES: 300ms after "aboard".
OUTPUT SPECS: WAV, 48kHz, ~6s.
```

**Failure to watch for:** Over-acting from vague emotion tags. Pair primary emotion with intensity word.

---

## Card 10 - Music Prompt

**When to use:** Generative music briefs.

**Formula:**
```
GENRE and SUBGENRE: [...]
TEMPO: [BPM]
KEY and MODE: [optional]
INSTRUMENTATION: [lead, rhythm, bass, percussion]
MOOD: [...]
STRUCTURE: [intro / verse / drop / outro and durations]
REFERENCE TRACKS: [for vibe, not for copying]
USE CASE: [background, hook, podcast intro]
NEGATIVE: [no vocals / no drums / etc.]
OUTPUT SPECS: [length, format, loopable?]
```

**Filled example:**
```
GENRE: Lo-fi hip hop with jazz piano.
TEMPO: 82 BPM.
KEY: A minor.
INSTRUMENTATION: Soft piano lead, mellow bass, brushed drums, vinyl crackle.
MOOD: Focused, calm.
STRUCTURE: 4s intro, 24s loop body, 4s outro.
USE CASE: Background for a study video.
NEGATIVE: No vocals.
OUTPUT SPECS: 32s, MP3, loopable.
```

**Failure to watch for:** Naming copyrighted tracks as direct targets. Use "in the spirit of" cues.

---

## Card 11 - Business Plan Prompt

**When to use:** First-pass business plan or section thereof.

**Formula:**
```
ROLE: Pragmatic business strategist.
OBJECTIVE: Draft a [section: exec summary / model / financials / etc.] for [venture].
CONTEXT:
  - Founder background: [...]
  - Market: [...]
  - Stage: [idea / MVP / revenue]
  - Known constraints: [budget, time]
CONSTRAINTS:
  - Flag every assumption explicitly.
  - Cite sources for market numbers or mark UNKNOWN.
  - Avoid generic boilerplate.
OUTPUT: Section with headings, assumption list, open questions list.
```

**Filled example:**
```
ROLE: Pragmatic business strategist.
OBJECTIVE: Draft the executive summary for an AI-tutoring service for adult learners.
CONTEXT: Solo founder, 12-month runway, no product yet.
CONSTRAINTS: 250 words. List 5 assumptions and 5 unknowns separately.
OUTPUT: Summary + assumptions + unknowns.
```

**Failure to watch for:** Confident TAM/SAM numbers with no source. Demand citations or UNKNOWN.

---

## Card 12 - GTM Plan Prompt

**When to use:** Go-to-market planning for a product or feature.

**Formula:**
```
ROLE: GTM lead.
OBJECTIVE: Produce a 90-day GTM plan for [product].
CONTEXT:
  - ICP: [...]
  - Pricing: [...]
  - Channels considered: [...]
  - Team capacity: [...]
CONSTRAINTS:
  - One owner per workstream.
  - Each tactic has a measurable metric.
  - Budget bounded by [amount].
OUTPUT: Table of Workstream | Tactic | Owner | Metric | Cost | Week.
```

**Filled example:**
```
ROLE: GTM lead.
OBJECTIVE: 90-day GTM for a B2B Slack analytics app.
CONTEXT: ICP is 50-200 person SaaS companies. USD 5k budget.
CONSTRAINTS: 3 channels max. Weekly metrics review.
OUTPUT: 12-week table.
```

**Failure to watch for:** Tactic soup with no owner or metric. Reject rows missing either.

---

## Card 13 - Decision Matrix Prompt

**When to use:** Choosing between 2-6 options on multiple criteria.

**Formula:**
```
ROLE: Decision facilitator.
OBJECTIVE: Help choose among [options] for [decision].
CONTEXT: Decision maker is [...]. Reversibility: [low/high].
CONSTRAINTS:
  - List 4-7 weighted criteria summing to 100.
  - Score each option 1-5 per criterion.
  - Show weighted total and the top risk per option.
OUTPUT: Markdown matrix + 3-sentence recommendation + reasoning summary (not hidden CoT).
```

**Filled example:**
```
ROLE: Decision facilitator.
OBJECTIVE: Choose a database for a new analytics product.
OPTIONS: Postgres, ClickHouse, DuckDB.
CRITERIA: Query speed (30), Ops burden (25), Cost (20), Team familiarity (15), Ecosystem (10).
OUTPUT: Matrix + pick + risk per option.
```

**Failure to watch for:** Criteria invented to justify a predetermined answer. Set criteria before scoring.

---

## Card 14 - Risk Matrix Prompt

**When to use:** Identifying and ranking risks for a project or launch.

**Formula:**
```
ROLE: Risk officer.
OBJECTIVE: Build a risk register for [project].
CONTEXT: Scope, timeline, dependencies: [...].
CONSTRAINTS:
  - Each risk has: description, likelihood (1-5), impact (1-5), score, owner, mitigation, trigger.
  - Sort by score descending.
  - Include at least one "unknown unknown" placeholder row.
OUTPUT: Table sorted by score.
```

**Filled example:**
```
ROLE: Risk officer.
OBJECTIVE: Risk register for a 6-week mobile app launch.
CONSTRAINTS: Min 10 risks across tech, legal, ops, market. Each with mitigation + trigger.
OUTPUT: Sorted risk table.
```

**Failure to watch for:** All risks rated 3x3. Force spread; reject if everything is "medium".

---

## Card 15 - Source Hierarchy Prompt

**When to use:** You want the model to handle sources rigorously.

**Formula:**
```
ROLE: Careful researcher.
OBJECTIVE: Answer [question] using a source hierarchy.
SOURCE HIERARCHY:
  1. Primary (official docs, filings, datasets)
  2. Secondary (reputable journalism, peer review)
  3. Tertiary (encyclopedic, aggregators)
  4. Model memory (last resort, must be tagged)
CONSTRAINTS:
  - Prefer higher tiers; downgrade only if higher tier is unavailable.
  - Tag every claim with its tier.
  - Mark UNKNOWN if no tier 1-3 source exists.
OUTPUT: Claim | Tier | Source | Date.
```

**Filled example:**
```
ROLE: Careful researcher.
OBJECTIVE: What are the current export rules for product X to country Y?
CONSTRAINTS: Cite government source if possible. Anything older than 6 months marked STALE.
OUTPUT: Source-tiered answer.
```

**Failure to watch for:** Tier 4 claims dressed as tier 1. Require a URL or document name per row.

---

## Card 16 - Anti-Hallucination Prompt

**When to use:** Any time a confident wrong answer would cost you.

**Formula:**
```
ROLE: Skeptical analyst.
OBJECTIVE: Answer [question]. Refuse to guess.
CONSTRAINTS:
  - If a claim is not verifiable from provided context or cited sources, respond UNKNOWN.
  - Never invent URLs, IDs, function names, or quotes.
  - Separate the answer into: Verified / Likely / Unknown.
  - End with "What I would need to be sure".
OUTPUT: Three sections + needs-list.
```

**Filled example:**
```
ROLE: Skeptical analyst.
OBJECTIVE: Summarize the latest features of platform X as of 2026-05-13.
CONSTRAINTS: Cite docs URLs only; if none, UNKNOWN. No guesses about deprecated features.
OUTPUT: Verified / Likely / Unknown + needs-list.
```

**Failure to watch for:** Model rephrasing a guess as "likely". Audit the "Likely" bucket hardest.

---

## Card 17 - Refinement Commands Card

**When to use:** Iterating on an output already produced.

**Formula (any of):**
```
- Shorten to N words / sentences / bullets.
- Lengthen with 2 concrete examples.
- Harden: cite a source for every claim, mark unsourced as UNKNOWN.
- Soften: same content, less assertive tone.
- Convert to: markdown table / JSON / bullet list / checklist.
- Reformat for audience: [operator / executive / engineer / child].
- Adversarial review: list the 5 weakest claims and why.
- Counter-argument pass: write the strongest rebuttal in 5 bullets.
- Reasoning summary: explain the approach you took in 5 lines (summary, not hidden CoT).
- Diff: show only what changed from the previous version.
- Regenerate with one variable changed: [variable -> new value].
```

**Filled example:**
```
> Harden the previous answer: cite a source for every claim, mark unsourced UNKNOWN, then convert to a table with columns Claim | Source | Date.
```

**Failure to watch for:** Stacking five refinements at once. Apply one, inspect, then continue.

---
