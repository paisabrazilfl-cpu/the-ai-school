# 06 - Hallucination Control

> Verification tags used in this document: VERIFIED_LOCAL, VERIFIED_DOCS, USER_PROVIDED_UNVERIFIED, CUSTOM_WORKFLOW, LIKELY_NATIVE_UNVERIFIED, UNKNOWN, DEPRECATED.
> WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

---

## 1. Purpose

Reduce, detect, and recover from hallucinated model output. A hallucination is any confident assertion that is not supported by the model's grounding (supplied source, verified training material, or explicit assumption). Hallucinations cost time, credibility, money, and in regulated domains, exposure.

This document is the truth-discipline companion to file 03 (formula), file 04 (vocabulary), and file 05 (format).

---

## 2. Who It Is For

| Reader | Use This Document To |
|---|---|
| Beginner | Learn why models invent facts and how to spot it. |
| Operator | Add anti-hallucination patterns to every fact-bearing prompt. |
| Researcher / analyst | Enforce source hierarchy and triangulation. |
| Builder | Bake verification into system prompts. |
| Reviewer | Audit model outputs before circulation. |

---

## 3. Beginner Explanation

A language model predicts the next token. It does not "know" facts the way a database does. When asked a specific question, it produces the most plausible continuation given training, prompt, and decoding. If the true fact is not strongly represented or is ambiguous, the model fills in something that sounds right.

Signs of hallucination:

- Plausible-sounding but specific citations (case names, paper titles, URLs).
- Round numbers with implied precision.
- Confidence that does not match available evidence.
- Facts that depend on data more recent than the model's training cutoff.
- Two contradictory claims in the same answer.

Mental model: assume any specific number, name, citation, statute, or date is suspect until verified.

---

## 4. Operator Explanation

Why hallucination happens:

1. Training-data gaps. The fact is not in the training distribution at sufficient density.
2. Ambiguous prompts. The model resolves ambiguity by guessing.
3. Missing grounding. No source material was supplied, so the model fills from prior.
4. Overconfident decoding. Sampling temperature and reward shaping push toward fluent, confident text.
5. Recency. Facts after training cutoff are absent; the model may still produce them.
6. Spurious correlations. Surface patterns (a famous author + a year) produce plausible but invented titles.
7. Domain pressure. Specialized vocabulary cues the model toward genre-consistent fabrications (e.g., a non-existent case "Smith v. Jones, 421 F.3d 219").

Control levers:

- Ground the model in supplied sources rather than recall.
- Force epistemic tagging (Fact / Inference / UNKNOWN).
- Force source hierarchy discipline.
- Force explicit assumptions.
- Force "current as of" date.
- Force confidence thresholds with abstention.
- Triangulate across independent sources.
- Validate after generation.

Operator rule: never request hidden chain-of-thought. Use "reasoning summary" only.

---

## 5. Core Concepts

### 5.1 Fact vs Inference vs Opinion vs Unknown

| Tag | Definition |
|---|---|
| Fact | Verifiable from a primary source supplied or named. |
| Inference | Logical step from facts; can be wrong but is derivable. |
| Opinion | Judgment; may be reasonable but is not a fact. |
| Unknown | Required to answer fully but not available; must not be guessed. |

Force the model to tag every claim with one of these four.

### 5.2 Grounding

Grounding is the supplied material the model must use rather than recall. Forms:

- Pasted source text.
- Attached file (if your tool supports it).
- A previous turn in the conversation marked as authoritative.
- A tool-call result.

If no grounding is supplied, the model is recalling. Recall is the highest-hallucination mode.

### 5.3 Decoding confidence vs epistemic confidence

The model's fluency is not its confidence. A confident-sounding sentence may be a confabulation. Always ask for an explicit confidence label.

### 5.4 Stale data

Facts after the model's training cutoff cannot be known by the model. Anything claimed post-cutoff is suspect. Always pin "current as of [date]" and flag time-sensitive claims.

---

## 6. Workflow

```
ASCII WORKFLOW

[Task involves facts?]
       |
       v
[Supply grounding source]------> if no source available: "no source, use only verified training knowledge"
       |
       v
[Add anti-hallucination block]:
  - Distinguish Fact / Inference / Opinion / UNKNOWN
  - Cite primary sources only
  - State assumptions before answering
  - Current as of [date]
  - If confidence < 70%, write UNKNOWN
  - No fabricated citations
       |
       v
[Add output format requiring per-claim tagging]
       |
       v
[Send prompt]
       |
       v
[Run verification playbook]:
  - Cross-check each Fact against primary source
  - Date-check time-sensitive claims
  - Surface contradictions
  - Verify citations exist
       |
       v
[If hallucination detected: send recovery prompt]
```

CUSTOM_WORKFLOW.

---

## 7. Cheat Sheet

```
ANTI-HALLUCINATION BLOCK (paste into prompts that involve facts):

- Distinguish Fact, Inference, Opinion, and UNKNOWN for every claim.
- Cite primary sources only. If you cannot cite a primary source, write UNKNOWN.
- State every assumption before the answer.
- Treat all facts as current as of [DATE]. Flag anything time-sensitive.
- If your confidence in a claim is below 70%, write UNKNOWN.
- Do not fabricate citations, case names, statutes, study titles, or URLs.
- Separate what is in the supplied source from your prior knowledge.
- Provide a reasoning summary, not internal step-by-step reasoning.
```

---

## 8. Examples (Anti-Hallucination Patterns)

### 8.1 Separate fact and inference

Prompt snippet:

```
For every bullet, prefix with one of [FACT], [INFERENCE], [OPINION], [UNKNOWN].
FACT requires a citation. INFERENCE requires the facts it depends on.
OPINION must be flagged as such.
```

Example output:

```
- [FACT] Pro-tier MRR is $49/seat/month. (Source: pricing page, supplied 2026-05-13.)
- [INFERENCE] At 4,200 customers, a $20 price increase yields up to $84k incremental
  MRR before churn. (Derived from FACT 1 and supplied cohort table.)
- [OPINION] A 12-month price-hold for grandfathered customers is wise.
- [UNKNOWN] Competitor B's announced 2026 price changes.
```

### 8.2 Cite sources

Prompt snippet:

```
Cite every factual claim. Use this format: (Source: [name], [date]). If the source is
not a primary source, mark it [SECONDARY] and identify the primary source it derives
from. If you cannot identify a primary source, write UNKNOWN.
```

### 8.3 Mark unknowns

Prompt snippet:

```
If a required fact is not available in the supplied source or your verified knowledge,
write UNKNOWN. Do not estimate, do not guess, do not interpolate. Do not infer a
specific value from a range unless I have authorized it.
```

### 8.4 State assumptions

Prompt snippet:

```
Before the answer, list every assumption you are making in a numbered list.
Each assumption is one sentence. If an assumption is critical to the answer,
tag it [LOAD-BEARING]. After the answer, re-list load-bearing assumptions
that, if wrong, change the recommendation.
```

### 8.5 Current-as-of date

Prompt snippet:

```
Treat all facts as current as of [DATE]. For any claim that depends on data more
recent than [DATE - 6 months], flag with [TIME-SENSITIVE] and recommend a verification
step. Do not assert anything as current beyond your training knowledge.
```

### 8.6 Stale-data warning

Prompt snippet:

```
At the top of the answer, state the cutoff of your knowledge and list any claims in
the answer that are likely to have changed since that cutoff. Mark those claims
[STALE-RISK].
```

### 8.7 Primary-source-only

Prompt snippet:

```
Use primary sources only:
- Statutes, regulations, official agency guidance.
- Peer-reviewed studies (name the journal and year).
- Company first-party documents (10-K, S-1, press releases).
- Standards documents (RFC, ISO, NIST).

Exclude:
- Wikipedia, blog posts, news summaries.
- AI-generated summaries.
- Anonymous forum content.
If only secondary sources are available, mark UNKNOWN and identify the primary
source that should be consulted.
```

---

## 9. Source Hierarchy

Use this hierarchy when grading or requesting sources. Lower tier numbers are more authoritative.

| Tier | Source Type | Examples | Notes |
|---|---|---|---|
| 1 | Primary law / regulation | Statutes, regulations, treaties, court decisions. | Authoritative within jurisdiction. Verify currency. |
| 2 | Primary first-party documents | 10-K, S-1, audited financials, contracts, RFCs, ISO/NIST standards, official agency guidance. | Authoritative for what the issuer asserts. |
| 3 | Peer-reviewed primary research | Original studies in reputable journals. | Check sample size, replication, conflicts. |
| 4 | Official statistics and datasets | Census, BLS, OECD, WHO, central banks. | Check methodology and revision history. |
| 5 | Reputable journalism with named primary sources | Major outlets where the primary source is identified. | Verify the underlying primary source. |
| 6 | Secondary syntheses | Review articles, textbooks, established encyclopedias. | Useful for orientation; cite the primary. |
| 7 | AI-generated summaries | Outputs from this or other models. | Never authoritative. Always verify against tier 1-4. |

Prompt usage:

```
Tag every source with its tier number from the source hierarchy.
If the highest-tier source available is tier 5 or below, mark the claim
[LOW-AUTHORITY] and recommend a tier 1-4 verification step.
```

---

## 10. Verification Playbook

### 10.1 Cross-checking

| Step | Action |
|---|---|
| 1 | List every factual claim from the output. |
| 2 | For each claim, identify the source the model cited. |
| 3 | Independently verify the claim against that source (or a tier 1-4 source). |
| 4 | If the source does not exist, mark the claim FABRICATED. |
| 5 | If the source exists but does not support the claim, mark MISCITED. |
| 6 | If the claim cannot be verified, mark UNVERIFIED. |
| 7 | Remove FABRICATED and MISCITED claims. Re-prompt for UNVERIFIED. |

### 10.2 Date checking

| Step | Action |
|---|---|
| 1 | List every claim that depends on a date or recent event. |
| 2 | Check each against the "current as of [DATE]" anchor. |
| 3 | For claims dependent on data newer than the training cutoff, mark STALE-RISK and verify externally. |
| 4 | For statutes and regulations: verify they are currently in force, not repealed or amended. |

### 10.3 Contradiction surfacing

Prompt snippet:

```
Re-read your previous answer. List any two claims that contradict each other.
For each contradiction, state which claim you have higher confidence in and why.
Then re-emit the answer with contradictions resolved or both claims tagged UNKNOWN.
```

### 10.4 Citation existence check

| Step | Action |
|---|---|
| 1 | Extract every citation (case, paper, book, URL, statute). |
| 2 | Search the issuing system (court reporter, journal database, official site). |
| 3 | If not found, mark FABRICATED. |
| 4 | If found, confirm the cited content supports the claim. WEB VERIFICATION NOT AVAILABLE IN THIS RUN - record citations for offline verification. |

### 10.5 Triangulation

For any high-stakes claim:

1. Find at least three independent primary sources.
2. Confirm all three agree on the claim.
3. If they disagree, note the disagreement and the highest-tier source.
4. Do not rely on a single source for a decisive claim.

---

## 11. Common Mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| No grounding supplied for a fact-heavy task | High hallucination rate. | Paste source material; demand the model use only that source. |
| No epistemic tagging | Cannot distinguish fact from invention. | Force [FACT]/[INFERENCE]/[OPINION]/[UNKNOWN] tags. |
| No confidence threshold | Confident fabrications. | "If confidence < 70%, write UNKNOWN." |
| No source hierarchy | Tier 7 sources treated as tier 1. | Require tier tagging on every source. |
| No "current as of" anchor | Stale facts asserted as current. | Pin date; mark TIME-SENSITIVE claims. |
| Single-source reliance | Undetected error propagates. | Triangulate across three independent sources. |
| Accepting plausible citations | Fabricated case law / papers. | Verify every citation exists in its native database. |
| Hidden chain-of-thought request | Fabricated reasoning trail. | Use "reasoning summary" only. |
| Round numbers accepted | False precision. | Demand the source for each number. |
| Ignoring contradictions in the same answer | Internally inconsistent output. | Run the contradiction-surfacing prompt before acting. |

---

## 12. Recovery Commands

When you suspect hallucination, send a single targeted follow-up. Do not rewrite the prompt from scratch.

| Symptom | Recovery Prompt |
|---|---|
| Suspected fabricated facts | "List every factual claim from your previous answer. For each, mark VERIFIED, UNVERIFIED, or UNKNOWN, and name the source. Remove anything UNVERIFIED unless I confirm." |
| Fabricated citations | "List every citation from your previous answer. For each, confirm it exists in [primary database]. If you cannot confirm, mark FABRICATED. Remove FABRICATED citations." |
| Overconfident answer | "Re-emit the previous answer with a confidence label (High/Medium/Low/UNKNOWN) on every claim. Replace any Low or below-threshold claim with UNKNOWN." |
| Stale data risk | "Identify every claim that depends on data after [DATE]. Mark STALE-RISK and recommend an external verification step for each." |
| Contradictions | "Identify any two claims in your previous answer that contradict each other. Resolve or tag both UNKNOWN." |
| No source hierarchy | "Tag every source you cited with a tier from 1 (primary law) to 7 (AI summary). Replace any tier 5+ claim with a tier 1-4 source or mark UNKNOWN." |
| Inferred specifics from a range | "Identify any specific number you inferred from a range or distribution. Replace with the range or mark UNKNOWN." |
| Hallucinated case law | "For each case cited, give the full citation, the holding in one sentence, and the controlling jurisdiction. If you cannot, mark FABRICATED." |
| Hallucinated studies | "For each study cited, give author(s), year, journal, and N. If any of those four are missing, mark FABRICATED." |
| Hallucinated APIs / functions | "For each library function cited, confirm signature and version. If you cannot, mark UNVERIFIED." |

---

## 13. Verification Checklist

Before sending a fact-heavy prompt:

- [ ] Grounding material is supplied or "use only verified training knowledge" is stated.
- [ ] Epistemic tagging is required ([FACT]/[INFERENCE]/[OPINION]/[UNKNOWN]).
- [ ] Source hierarchy tier tagging is required.
- [ ] "Current as of [DATE]" anchor is set.
- [ ] Confidence threshold (e.g., 70%) is stated.
- [ ] "Do not fabricate citations" clause is present.
- [ ] "Separate supplied source from prior knowledge" clause is present.
- [ ] No hidden chain-of-thought request; "reasoning summary" only.
- [ ] WEB VERIFICATION NOT AVAILABLE IN THIS RUN is acknowledged where relevant.
- [ ] Platform-specific claims will be tagged.

After receiving:

- [ ] Every claim is tagged.
- [ ] Every citation has been independently verified or marked UNVERIFIED.
- [ ] STALE-RISK claims have been externally checked.
- [ ] Contradictions have been surfaced and resolved.
- [ ] Tier 5+ sources have been upgraded to tier 1-4 or marked UNKNOWN.
- [ ] Round numbers and specific names have been confirmed.

---

## 14. Practice Drills

Drill 1 - Tagging discipline. Take any factual answer the model has given you recently. Force re-emission with [FACT]/[INFERENCE]/[OPINION]/[UNKNOWN] tags. Count how many claims drop to UNKNOWN.

Drill 2 - Citation hunt. Ask the model a question that invites citations (law, science, software). Verify every citation. Note your fabrication rate per 10 citations.

Drill 3 - Source hierarchy. Force tier tagging on a research output. Replace every tier 5+ source with a tier 1-4 source.

Drill 4 - Stale data. Pin a "current as of" date six months earlier than today. Ask the model to flag stale-risk claims. Compare to a date you set today.

Drill 5 - Contradiction surfacing. Take a long answer. Run the contradiction-surfacing prompt. Note contradictions you missed on first read.

Drill 6 - Confidence calibration. Force confidence labels on every claim. Independently verify the High-confidence claims. Note whether the model is well-calibrated.

Drill 7 - Triangulation. Take one decisive claim. Force the model to provide three independent primary sources. Verify each.

Drill 8 - Recovery muscle. Take a hallucinated output. Recover it using only the recovery commands in section 12. Note how much survives after recovery.

---

## 15. Summary

```
Hallucination is the default when the model is not grounded, not tagged, not bounded.
Anti-hallucination is a stack of small, repeatable forcing functions.
```

- Ground the model in supplied sources whenever possible.
- Force [FACT]/[INFERENCE]/[OPINION]/[UNKNOWN] tagging on every claim.
- Require source-hierarchy tier tagging; demand tier 1-4 for decisive claims.
- Pin a "current as of" date; flag stale-risk claims.
- Set a confidence threshold and require abstention below it.
- Verify every citation in its native database.
- Triangulate decisive claims across three independent primary sources.
- Surface contradictions before acting on the output.
- Never request hidden chain-of-thought; only "reasoning summary."

WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Tag every platform-specific claim.
The model is a probability machine. Truth is your job, not its job.
