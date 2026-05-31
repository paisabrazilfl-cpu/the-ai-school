# Operator Checklists

Short, imperative checklists for daily AI work. Each item is one line. Use them as gates, not suggestions.

Verification tags used in this kit: VERIFIED_LOCAL / VERIFIED_DOCS / USER_PROVIDED_UNVERIFIED / CUSTOM_WORKFLOW / LIKELY_NATIVE_UNVERIFIED / UNKNOWN / DEPRECATED.

Reminder: ask for a reasoning summary; never request hidden chain-of-thought.

---

## 1. Pre-Prompt Checklist

- [ ] State the role you want the model to take.
- [ ] State the single objective in one sentence.
- [ ] List the context the model must use.
- [ ] List the constraints (must, must-not, scope, tone, length).
- [ ] Specify the exact output format.
- [ ] Define what "done" looks like.
- [ ] Decide the blast radius (read-only, sandbox, production).
- [ ] Pick the right platform for the task.
- [ ] Confirm no PII or secrets in the prompt.
- [ ] Set a time / token budget before you start.

---

## 2. Post-Output Verification Checklist

- [ ] Re-read the prompt and confirm the output addresses it.
- [ ] Check every factual claim against a source.
- [ ] Click every cited URL.
- [ ] Recompute every number that matters.
- [ ] Verify any code compiles and runs.
- [ ] Confirm structure matches the requested format.
- [ ] Flag any "likely" claims as needing follow-up.
- [ ] Tag the output with a verification status.
- [ ] Save the prompt and output to your log.
- [ ] Decide: ship, revise, or discard.

---

## 3. Source Discipline Checklist

- [ ] Prefer primary sources over secondary.
- [ ] Prefer secondary over tertiary.
- [ ] Treat model memory as last resort.
- [ ] Date-stamp every cited source.
- [ ] Mark sources older than your domain's freshness threshold as STALE.
- [ ] Cross-check critical claims with a second independent source.
- [ ] Reject sources without a verifiable URL or document name.
- [ ] Mark anything unverifiable as UNKNOWN.
- [ ] Separate facts from inferences in the output.
- [ ] Note the source tier next to every claim.

---

## 4. Coding Agent Safety Checklist

- [ ] Work on a feature branch, never directly on main.
- [ ] Define files in scope and files out of scope.
- [ ] Require a plan before any diff.
- [ ] Keep diffs small and reversible.
- [ ] Run tests after every step.
- [ ] Reject silent edits to unrelated files.
- [ ] Forbid destructive git operations without explicit approval.
- [ ] Never let the agent push to main or force-push.
- [ ] Audit dependencies the agent adds.
- [ ] Require a human to approve the merge.

---

## 5. Automation Safety Checklist

- [ ] Identify the trigger explicitly.
- [ ] Define the success and failure signals.
- [ ] Start in dry-run mode.
- [ ] Log every action with a timestamp.
- [ ] Set a rate limit and a hard kill switch.
- [ ] Define a rollback path before you enable.
- [ ] Restrict credentials to least privilege.
- [ ] Alert a human on every error.
- [ ] Review logs weekly for drift.
- [ ] Retire the automation when no longer needed.

---

## 6. Agent Deployment Checklist

- [ ] Write the agent's job description in one paragraph.
- [ ] Enumerate every tool the agent can call.
- [ ] Define the agent's blast radius per tool.
- [ ] Add an explicit stop condition.
- [ ] Add a max-steps and max-cost guardrail.
- [ ] Test on a fixed eval set before live use.
- [ ] Run shadow mode (output captured, not applied) first.
- [ ] Define who reviews agent output and how often.
- [ ] Document the failure modes you observed.
- [ ] Pre-commit to a deprecation date for review.

---

## 7. Image / Video Output Review Checklist

- [ ] Confirm the subject matches the brief.
- [ ] Check for extra limbs, fused fingers, warped text.
- [ ] Verify any text in the image is readable and correct.
- [ ] Confirm composition and aspect ratio match specs.
- [ ] Check lighting and color grade against the brief.
- [ ] Watch the full video clip end to end.
- [ ] Inspect motion artifacts and morphing.
- [ ] Confirm no copyrighted logos, faces, or marks.
- [ ] Confirm licensing of any reference style used.
- [ ] Save the prompt, seed, and version with the asset.

---

## 8. Anti-Hallucination Checklist

- [ ] Ask the model to refuse to guess.
- [ ] Require UNKNOWN for unverifiable claims.
- [ ] Forbid invented URLs, IDs, quotes, and function names.
- [ ] Split output into Verified / Likely / Unknown.
- [ ] Audit the "Likely" bucket hardest.
- [ ] Spot-check three random claims against sources.
- [ ] Recompute every number that affects a decision.
- [ ] Ask for a counter-argument pass.
- [ ] Compare against a second model on critical questions.
- [ ] Record any hallucination you catch in your eval set.

---

## 9. Hand-Off Checklist (shipping AI output to a human)

- [ ] State that AI was used and which platform.
- [ ] Include the prompt or a faithful summary of it.
- [ ] Attach sources for every factual claim.
- [ ] Mark verification status on every section.
- [ ] Call out anything the human must double-check.
- [ ] Flag known limits and unknowns up front.
- [ ] Strip any PII not needed by the recipient.
- [ ] Confirm licensing of any generated assets.
- [ ] Provide a one-paragraph reasoning summary (not raw chain-of-thought).
- [ ] Name an owner and a review deadline.

---
