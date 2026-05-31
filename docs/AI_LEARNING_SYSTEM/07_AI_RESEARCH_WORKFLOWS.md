# 07 - AI RESEARCH WORKFLOWS

> WEB VERIFICATION NOT AVAILABLE IN THIS RUN. All claims about third-party tools
> are tagged with verification status. Treat USER_PROVIDED_UNVERIFIED and
> LIKELY_NATIVE_UNVERIFIED items as hypotheses until confirmed against the
> vendor's current documentation.

---

## 1. Purpose

This document teaches an operator how to perform rigorous, citable, defensible
research using AI tools without falling into the most common failure mode:
treating a language model's confident summary as ground truth.

The goal is a **repeatable pipeline** that produces a research artifact with:

- A clear question.
- A ranked source hierarchy.
- Primary and secondary search passes.
- Extracted facts separated from inferences.
- A date check on every claim.
- A contradiction register.
- An explicit uncertainty register.
- A synthesized, cited report.

If your output cannot be reproduced by a second operator following the same
pipeline, it is not research; it is opinion.

---

## 2. Who It Is For

| Role | Why this matters |
|---|---|
| Founder / operator | Needs defensible inputs for strategy, pricing, GTM, hiring. |
| Analyst | Needs reproducible methodology, not vibes. |
| Engineer | Needs to compare libraries, vendors, protocols without hallucination. |
| Legal / compliance reviewer | Needs primary-source citations, not blog paraphrase. |
| Investor / due-diligence lead | Needs source ranking and contradiction surfacing. |
| Researcher / journalist | Needs date-stamped, attributable evidence. |

If your role consumes other people's "AI summaries" without re-deriving them, you
are downstream of a hallucination you cannot detect.

---

## 3. Beginner Explanation

Think of AI research as a **funnel**, not a search box.

1. You write the question down in one sentence.
2. You decide which kinds of sources count.
3. You search broadly with an AI tool to find leads.
4. You go to the **actual sources** the AI cited and read them.
5. You write down facts in one column and inferences in another.
6. You check the date of every fact.
7. You note where sources disagree.
8. You note what you still do not know.
9. You write the final report **with citations**.

The AI is your **research assistant**, not your researcher. It finds doors; you
walk through them.

---

## 4. Operator Explanation

At operator depth, AI research is a structured information-foraging task with
explicit epistemic states. Every claim in the final artifact must carry:

- **Provenance**: the originating document and access date.
- **Tier**: source-hierarchy level (1 through 7, defined below).
- **Confidence**: high / medium / low, justified.
- **Type**: fact (observable, attributable) vs. inference (derived).
- **Freshness**: capture date and decay characteristics (a regulation may be
  stable for years; a price quote may be stale in hours).

The AI tool's job is to **accelerate** discovery, extraction, and synthesis. It
is not authorized to be the source. If you cannot point at a non-AI document
that supports a claim, the claim is unsupported.

---

## 5. Core Concepts

### 5.1 Source Hierarchy

| Tier | Source class | Examples | Use for | Caveats |
|---|---|---|---|---|
| 1 | Primary law / regulation | Statutes, regulations, court opinions, agency rulemaking, treaties | Legal claims, compliance, jurisdictional questions | Read the version in effect on the relevant date; check amendments. |
| 2 | Peer-reviewed literature | Journal articles, conference proceedings, systematic reviews | Scientific, medical, technical claims | Check retraction status; check replication; check funding. |
| 3 | Institutional reports | Government agencies, central banks, standards bodies, BIS, IMF, WHO, NIST | Macro data, standards, statistics | Methodology footnotes matter more than the headline. |
| 4 | Reputable journalism | Major newspapers and trade press with named bylines and corrections policy | Current events, named-source reporting | Distinguish reporting from opinion columns. |
| 5 | Expert commentary | Named-author analyst notes, professional blogs by domain experts, technical talks | Interpretation and framing | Author has incentives; check them. |
| 6 | Blogs / social posts | Anonymous or low-signal commentary, threads, forum posts | Leads only, never citations | Use to find Tier 1 through 4 evidence. |
| 7 | AI summaries | Any LLM output, including this document's prose | Drafting, summarization, hypothesis generation | Never a citable source. Always re-derive. |

Rule: **a citation from tier N is overridden by a contradicting citation from
tier N-1 or lower** unless you can show the lower-tier source is itself wrong.

### 5.2 Fact vs. Inference

A **fact** is a sentence whose truth can be checked against a specific document
or measurement. ("Regulation X, section 4, requires Y as of date Z.")

An **inference** is a sentence derived by reasoning from facts. ("Therefore the
company is likely subject to Y because it operates in jurisdiction Z.")

Mixing them is the most common operator error. The pipeline forces separation.

### 5.3 Date Discipline

Every claim has a **capture date** (when you read it) and an **effective date**
(when the underlying source was authoritative). A 2019 regulation cited in 2026
is fine if you confirmed it is still in force; it is dangerous if you did not.

### 5.4 Contradiction Register

Sources will disagree. Do not collapse the disagreement; record it. A useful
research artifact often surfaces a contradiction the operator did not know
existed.

### 5.5 Uncertainty Register

For each major question, you maintain a list of what you still do not know,
ranked by decision-impact. This is what separates a researcher from a
summarizer.

---

## 6. Workflow

### 6.1 RESEARCH_PIPELINE (ASCII)

```
                        +-------------------------+
                        | 01 DEFINE QUESTION      |
                        | one sentence, scoped    |
                        +------------+------------+
                                     |
                                     v
                        +-------------------------+
                        | 02 SOURCE HIERARCHY     |
                        | choose tiers in scope   |
                        +------------+------------+
                                     |
                                     v
                        +-------------------------+
                        | 03 PRIMARY SEARCH       |
                        | AI-assisted discovery   |
                        +------------+------------+
                                     |
                                     v
                        +-------------------------+
                        | 04 SECONDARY SEARCH     |
                        | citation chasing,       |
                        | adjacent terms          |
                        +------------+------------+
                                     |
                                     v
                        +-------------------------+
                        | 05 EXTRACT              |
                        | quote + locator + date  |
                        +------------+------------+
                                     |
                                     v
                        +-------------------------+
                        | 06 COMPARE              |
                        | sources against each    |
                        | other                   |
                        +------------+------------+
                                     |
                                     v
                        +-------------------------+
                        | 07 DATE CHECK           |
                        | effective + capture     |
                        +------------+------------+
                                     |
                                     v
                        +-------------------------+
                        | 08 SCORE                |
                        | tier, confidence,       |
                        | independence            |
                        +------------+------------+
                                     |
                                     v
                        +-------------------------+
                        | 09 FACT / INFERENCE     |
                        | split into two columns  |
                        +------------+------------+
                                     |
                                     v
                        +-------------------------+
                        | 10 CONTRADICTIONS       |
                        | register disagreements  |
                        +------------+------------+
                                     |
                                     v
                        +-------------------------+
                        | 11 UNCERTAINTIES        |
                        | register unknowns       |
                        +------------+------------+
                                     |
                                     v
                        +-------------------------+
                        | 12 SYNTHESIZE           |
                        | narrative + decision    |
                        +------------+------------+
                                     |
                                     v
                        +-------------------------+
                        | 13 CITED REPORT         |
                        | reproducible artifact   |
                        +-------------------------+
```

### 6.2 Step-by-step

1. **Define the question.** One sentence. Include scope, jurisdiction, and time
   horizon. If you cannot write it in one sentence, you are still confused.
2. **Pick tiers.** A legal question requires Tier 1 - 3. A market sizing
   question may legitimately rely on Tier 3 - 4 with explicit caveats.
3. **Primary search.** Use an AI search tool to enumerate candidate sources.
   Ask for *links and titles*, not summaries.
4. **Secondary search.** Chase citations inside the documents you found. Search
   adjacent terms, synonyms, and opposing viewpoints.
5. **Extract.** For each source, capture: quote, locator (page / section /
   URL), author, publication, effective date, capture date.
6. **Compare.** Lay extracts side by side. Where do they agree, where do they
   diverge.
7. **Date-check.** For each claim, confirm the source was authoritative on the
   relevant date.
8. **Score.** Assign tier and confidence. Note source independence (two outlets
   citing the same wire report are one source).
9. **Split fact and inference.** Two columns. Inferences must name the facts
   they depend on.
10. **Contradictions register.** List unresolved disagreements with both sides.
11. **Uncertainties register.** List open questions, ranked by decision impact.
12. **Synthesize.** Write the narrative. Inferences only after facts. Decision
    only after inferences.
13. **Cited report.** Final artifact has every claim linked to a source row.

---

## 7. Cheat Sheet

```
QUESTION  : one sentence, scope, jurisdiction, horizon
TIERS     : 1 law | 2 peer-rev | 3 institutional | 4 journalism
            5 expert | 6 blog | 7 AI summary (never cite)
PROMPT    : ask for LINKS, not SUMMARIES, on first pass
EXTRACT   : quote + locator + effective date + capture date
SCORE     : tier, confidence (H/M/L), independence count
SPLIT     : facts table | inferences table | contradictions | unknowns
DECAY     : regulation = slow | price = fast | news = medium
RULE      : no claim without provenance row
RULE      : AI output is tier 7, never a citation
```

---

## 8. Examples

> Each prompt below is a starting template. Replace bracketed text. The
> verification status tags refer to the *tool*, not to the prompt's correctness.

### 8.1 Current news

```
You are a research assistant. Find primary reporting on:
"[event, named entities, date window]".

Output a table with: source name, byline, publication date, URL, one-sentence
factual claim, one-sentence quote with locator. Do NOT summarize. Do NOT
interpret. Mark any item where you could not find a named author.

Then list contradictions across the sources you found.
```

### 8.2 Legal / regulatory

```
Identify the specific statute or regulation that governs:
"[activity] in [jurisdiction] as of [date]".

For each citation, return: full title, section number, effective date,
amendment history, official publisher URL. Then quote the operative sentence
verbatim with the locator.

Flag any case where the rule has changed in the last 24 months. Do not
paraphrase the operative sentence. Do not opine on application. I will read
the source.
```

> Safety: AI legal output is not legal advice. Confirm with counsel licensed
> in the relevant jurisdiction.

### 8.3 Scientific

```
For the claim: "[hypothesis]", find peer-reviewed primary literature.

Return: title, authors, journal, year, DOI, sample size, study design,
primary effect size, confidence interval, replication status if known. Flag
any retraction. Distinguish primary studies from reviews. Exclude preprints
unless explicitly requested.

Then list the strongest contradicting study you can find.
```

### 8.4 Market

```
For the market "[product category] in [geography] as of [year]", return:
- TAM / SAM / SOM estimates with the methodology each source used
- The 3 most-cited segmentations
- The 3 largest incumbents by revenue with source
- Recent growth rate with the underlying data series

Return links and methodology. Do not invent numbers. If a figure appears
only in a press release, mark it PRESS_RELEASE_UNVERIFIED.
```

### 8.5 Competitor

```
Profile competitor "[name]". Return:
- Legal entity, HQ, founding date, funding history with sources
- Product line with pricing pages (URLs)
- Public customer logos with the page they appear on
- Hiring signals: open roles by function, last 90 days
- Public statements from named executives in the last 12 months

Separate facts (sourced) from inferences (derived). Do not speculate on
strategy without naming the facts that justify the speculation.
```

### 8.6 Product / vendor evaluation

```
Compare "[product A]" and "[product B]" for use case "[use case]".

Return a feature matrix with: feature, A behavior with source URL, B
behavior with source URL, evidence date. Mark UNDOCUMENTED where the
vendor's public docs do not state a behavior. Do not infer behavior from
marketing pages; only from documentation, changelogs, or release notes.
```

### 8.7 Medical

> Safety: AI medical output is not medical advice. Do not use AI to make
> diagnosis or treatment decisions. Confirm with a licensed clinician. This
> template is for literature discovery only.

```
For the clinical question "[PICO: population, intervention, comparator,
outcome]", find systematic reviews and primary RCTs.

Return: title, authors, journal, year, DOI, population, intervention,
comparator, primary outcome, effect size, CI, risk of bias rating if
reported, conflicts of interest. Flag any study whose conclusion differs
from the others.
```

### 8.8 Financial

> Safety: AI financial output is not investment advice. Numbers from
> filings, exchanges, or regulators are authoritative; AI restatements are
> not. Re-derive every figure from the original filing.

```
For "[ticker or entity]", retrieve the most recent annual and quarterly
filings (10-K, 10-Q, equivalents). Return: filing date, period, URL,
revenue, gross margin, operating margin, net income, cash, debt, share
count. Quote each line with its locator in the filing. Do not adjust. Do
not annualize. I will adjust.
```

### 8.9 Tool-by-tool usage notes

| Tool | Verification | Strength (as commonly reported) | Caution |
|---|---|---|---|
| Perplexity | USER_PROVIDED_UNVERIFIED | Returns citations inline; good for primary search pass. | Confirm each citation actually says what the answer claims. |
| NotebookLM | USER_PROVIDED_UNVERIFIED | Operates over uploaded sources; reduces hallucination by grounding. | Quality depends entirely on the sources you upload. |
| Gemini | USER_PROVIDED_UNVERIFIED | Long context useful for ingesting large documents. | Confirm citation behavior in the version you are using. |
| Claude | USER_PROVIDED_UNVERIFIED | Long context, careful reasoning summary, good for synthesis step. | Web access varies by surface; do not assume live retrieval. |
| ChatGPT | USER_PROVIDED_UNVERIFIED | Broad tool ecosystem; useful for synthesis and extraction. | Confirm retrieval source; do not accept un-cited claims. |

When a tool gives you a "reasoning summary," treat it as a hypothesis about the
model's process, not a transcript of hidden chain-of-thought.

---

## 9. Common Mistakes

| Mistake | Why it fails | Fix |
|---|---|---|
| Citing the AI summary | Tier 7, not a source. | Open the underlying document and cite it. |
| Skipping the date check | Rules change, prices change, leaders change. | Capture effective date for every claim. |
| Conflating fact and inference | Hides where the argument actually rests. | Two columns, always. |
| Counting two outlets as two sources | They may share one wire report. | Trace to the originating source. |
| Accepting press-release figures as facts | Issuer-controlled, often unaudited. | Mark PRESS_RELEASE_UNVERIFIED. |
| Ignoring contradictions | Surfacing them is the point of research. | Maintain the contradiction register. |
| Stopping at the first plausible answer | Confirmation bias. | Force a contrarian search pass. |
| Asking the model to "be sure" | Confidence is not calibration. | Ask for sources, not certainty. |
| Pasting confidential data into public tools | Data leakage. | Confirm tool's data-handling policy first. |

---

## 10. Recovery Commands

When a research artifact is failing, run these prompts against your draft.

### 10.1 Provenance audit

```
For every claim in the draft below, return a row: claim text, source row id
(if any), tier, capture date, effective date, locator. Mark any claim with
no source row UNSUPPORTED. Do not rewrite the draft. Return only the table.
```

### 10.2 Contradiction sweep

```
Re-read the sources listed in the bibliography. Find every pair of sources
that disagree on a factual claim. Return a table: claim, source A position,
source B position, which tier each belongs to, your recommended resolution
and why.
```

### 10.3 Date sweep

```
For every quantitative claim in the draft, return the effective date of the
underlying source and today's date. Mark any claim where the gap exceeds
the decay window for that claim type (regulation 36 months, market data 12
months, price 7 days, news 24 hours).
```

### 10.4 Inference unwinding

```
For each inference in the draft, list the facts it depends on. If any
listed fact is itself an inference, mark it INFERENCE_ON_INFERENCE and
trace until you reach a fact with a citation or UNSUPPORTED.
```

### 10.5 Bias check

```
Identify the strongest counterargument to the conclusion in the draft.
Produce three sources that would, if true, falsify or substantially weaken
the conclusion. Do not soften the conclusion; just produce the
counterevidence.
```

---

## 11. Verification Checklist

- [ ] Question written in one sentence with scope and date window.
- [ ] Source tiers chosen in advance and documented.
- [ ] Every claim has a provenance row.
- [ ] Every quantitative claim has an effective date.
- [ ] No claim cites a Tier 7 source.
- [ ] Facts and inferences are in separate columns.
- [ ] Contradiction register is populated.
- [ ] Uncertainty register is populated and ranked by decision impact.
- [ ] At least one counter-search pass was performed.
- [ ] Confidential data was not sent to a tool without a confirmed handling
      policy.
- [ ] The artifact is reproducible by a second operator using the same pipeline.

---

## 12. Practice Drills

1. **Tier discipline.** Pick a recent claim from social media. Trace it back
   through tiers until you reach Tier 1 - 3 or you exhaust the chain. Record
   the chain.
2. **Date discipline.** Take a regulation cited in a blog post. Find the
   currently in-force version and the version cited. Compare deltas.
3. **Contradiction surfacing.** Pick a market-size figure. Find three
   independent estimates. Reconcile the methodology gaps.
4. **Fact / inference split.** Take a one-page analyst note. Rewrite it as two
   columns. Note how much shrinks.
5. **Counter-search.** Write a 200-word claim. Then spend equal time finding
   evidence against it. Note whether your confidence moves.
6. **Provenance audit.** Hand a draft to a peer; ask them to mark every
   UNSUPPORTED claim. Aim for zero.

---

## 13. Summary

AI research is not faster search; it is **structured information foraging with
explicit provenance**. The pipeline (question, tiers, primary search, secondary
search, extract, compare, date-check, score, fact / inference, contradictions,
uncertainties, synthesize, cited report) is the unit of work.

The AI accelerates the discovery and extraction steps. It does not produce
citations. It does not certify facts. Treating its output as Tier 7 - useful for
drafting and hypothesis, never citable - is the discipline that separates a
researcher from a summarizer.

If your output cannot be reproduced, it is not research.
