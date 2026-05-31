# 19 - Copilot Cheat Sheet

Part of the AI_LEARNING_SYSTEM manual. Covers four distinct Copilot products that share branding but differ in surface, permissions, and capability.

Status tags used in this document:
- VERIFIED_LOCAL - confirmed from local repo evidence in this run
- VERIFIED_DOCS - confirmed from official documentation accessed in this run
- USER_PROVIDED_UNVERIFIED - asserted by the user but not independently verified
- CUSTOM_WORKFLOW - fan-name or user-coined pattern, not an official feature
- LIKELY_NATIVE_UNVERIFIED - plausibly a real platform feature, not verified here
- UNKNOWN - cannot confirm or deny
- DEPRECATED - confirmed retired or replaced

The four products:

1. Microsoft Copilot (consumer chat)
2. Microsoft 365 Copilot (enterprise Office integration)
3. GitHub Copilot (IDE inline completion)
4. GitHub Copilot Chat / CLI (conversational and command-line)

They are not interchangeable. Do not assume a feature in one exists in the others.

---

## A. Microsoft Copilot (consumer)

### A.1 Best For

- General chat with web grounding.
- Image generation through the consumer surface.
- Quick lookups, drafting, brainstorming for personal use.
- Casual research with web sources.

### A.2 Weak For

- Anything that requires access to your work tenant's Office data (that is M365 Copilot).
- Private corporate files; consumer Copilot is not a tenant-aware agent.
- Deterministic, audited workflows.

### A.3 Prompt Style

- State the goal, audience, and desired length.
- Ask for citations on factual claims.
- For images, give a subject, style, lighting, framing, and what to avoid.

### A.4 Commands / Slash Patterns

WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

| Command | Purpose | Status | Notes | Safer Alternative |
|---|---|---|---|---|
| Conversation style toggle (Creative / Balanced / Precise) | Tone and freedom | LIKELY_NATIVE_UNVERIFIED | UI control | "Be precise and conservative." |
| Image generation request | Create an image | LIKELY_NATIVE_UNVERIFIED | | Be explicit: "Generate an image of..." |
| Voice input | Spoken prompts | LIKELY_NATIVE_UNVERIFIED | | Type instead |
| Web grounding | Cited answers from the web | LIKELY_NATIVE_UNVERIFIED | Often default | "Use the web. Cite URLs." |
| Plugins / connectors | Third-party integrations | LIKELY_NATIVE_UNVERIFIED | Varies by region and account | Name the action explicitly |

### A.5 File and Repo Context

- File upload may be supported on certain surfaces. (LIKELY_NATIVE_UNVERIFIED)
- No repo or tenant context. Do not paste confidential data.

### A.6 Common Mistakes

- Confusing it with M365 Copilot. It cannot see your work email or files.
- Asking for "the latest" without enabling web grounding.
- Trusting image output for any factual visual (charts, diagrams).

### A.7 Recovery

- Restart the thread when it drifts.
- Force citations: "List the exact URLs you used."

---

## B. Microsoft 365 Copilot

### B.1 Best For

- Office context: Outlook, Word, Excel, PowerPoint, Teams, OneDrive, SharePoint.
- Drafting and summarizing email threads.
- Generating Word documents from prompts and reference files.
- Excel analysis with natural language.
- PowerPoint outline and slide generation.
- Teams meeting recap, action items, and follow-ups.
- Cross-tenant search (Graph) for files, chats, and meetings.

### B.2 Weak For

- Anything outside your tenant.
- Data that policy or sensitivity labels block.
- Highly creative writing with no source material.
- Replacing manual review on regulated content.

### B.3 Prompt Style

- Name the app and artifact (Outlook thread subject, Word doc title, Excel range, PowerPoint deck name).
- Specify the output shape (table, bullet list, slide outline).
- For Excel, include sheet, tab, and range; describe columns.
- For Outlook, specify the time window and senders.

### B.4 Commands / Slash Patterns

WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

| Command | Purpose | Status | Notes | Safer Alternative |
|---|---|---|---|---|
| /summary (in Word, Loop, Teams) | Summarize the current artifact | LIKELY_NATIVE_UNVERIFIED | Slash exposure varies | "Summarize this document." |
| /draft | Generate a draft from a prompt | LIKELY_NATIVE_UNVERIFIED | | "Draft a section on..." |
| Reference syntax for files | Pull another file into context | LIKELY_NATIVE_UNVERIFIED | UI varies (file picker, paste link) | Paste the file URL |
| Copilot pane in each Office app | App-specific Copilot UI | LIKELY_NATIVE_UNVERIFIED | | |
| Meeting recap in Teams | Auto recap after a meeting | LIKELY_NATIVE_UNVERIFIED | | "Recap the meeting and list action items by owner." |
| Excel "analyze" actions | Suggest formulas, pivots, charts | LIKELY_NATIVE_UNVERIFIED | | Natural-language description |
| PowerPoint "create from" | Generate a deck from a Word doc | LIKELY_NATIVE_UNVERIFIED | | |
| Outlook "summarize thread" | Condense a long thread | LIKELY_NATIVE_UNVERIFIED | | |

### B.5 File and Repo Context

- Tenant data is reachable through Microsoft Graph subject to permissions and sensitivity labels.
- Cross-app references (Word into PowerPoint, Excel into Word) are a strength when available.
- Always confirm sensitivity label propagation when generating new artifacts from labeled sources.

### B.6 Common Mistakes

- Assuming Copilot can see data you do not have permission to read; it inherits your permissions.
- Treating drafts as final without manual review of figures, dates, names, and policy claims.
- Generating decks from very long Word docs without first asking for a structural outline.
- Forgetting that meeting recaps depend on transcription being enabled.

### B.7 Recovery

- "Re-summarize using only this document. Quote the exact lines you relied on."
- "List each file you actually read to produce this answer."
- "Flag any claim you could not source inside the referenced artifacts."

### B.8 Power Prompts

- Outlook triage: "Review unread Outlook messages from the last 48 hours. Output a table: Sender, Subject, Action Required, Deadline, Suggested Reply (one line). Skip newsletters."
- Excel formula: "Sheet [name], tab [name], range A1:Z[N]. Columns describe [...]. Write a formula that computes [metric] per row. Explain it in one sentence."
- PowerPoint deck: "Build a 10-slide deck from Word doc [title]. Slide 1 cover, slide 2 problem, slide 3 audience, slides 4 through 8 the five recommendations one each, slide 9 risks, slide 10 next steps. Pull all numbers from the source doc; do not invent."
- Teams recap: "Summarize the [meeting title] on [date]. Sections: Decisions, Action Items (with owner and deadline), Open Questions, Risks."
- Word rewrite: "Rewrite this section for a senior executive audience. Cut 30 percent. Preserve every number and proper noun. Track changes in a list at the end."

---

## C. GitHub Copilot (IDE inline)

### C.1 Best For

- Inline code completion as you type.
- Boilerplate, repetitive patterns, test scaffolds.
- Comment-to-code expansion.
- Single-file edits with local context.

### C.2 Weak For

- Cross-repo reasoning.
- Architectural decisions.
- Anything that requires running tests or exploring the repo agentically (use Copilot Chat or a dedicated agent for that).
- Security-sensitive code without review.

### C.3 Prompt Style

- Write the function signature and a clear docstring; let completion fill the body.
- Add a leading comment that names inputs, outputs, edge cases, and constraints.
- Keep the surrounding context relevant; close unrelated files to reduce noise.

### C.4 Commands / Slash Patterns

WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

| Command | Purpose | Status | Notes | Safer Alternative |
|---|---|---|---|---|
| Accept suggestion (Tab) | Accept the inline completion | LIKELY_NATIVE_UNVERIFIED | Editor-specific | |
| Dismiss suggestion (Esc) | Reject the inline completion | LIKELY_NATIVE_UNVERIFIED | Editor-specific | |
| Cycle suggestions | Step through alternatives | LIKELY_NATIVE_UNVERIFIED | Shortcut differs by editor | |
| Open Copilot panel | See multiple suggestions side by side | LIKELY_NATIVE_UNVERIFIED | | |
| Enable / disable per language | Scope completion | LIKELY_NATIVE_UNVERIFIED | Settings | |

### C.5 File and Repo Context

- Inline completion uses local file context plus open tabs.
- It does not browse the repo by default; use Copilot Chat or an agent for repo-wide reasoning.

### C.6 Common Mistakes

- Accepting confident-looking completions for security-sensitive code (auth, crypto, SQL).
- Accepting code that imports non-existent or wrong-versioned libraries.
- Letting completion silently change behavior in long functions.
- Failing to write tests around AI-generated code.

### C.7 Recovery

- Undo (editor shortcut) immediately if a completion changed unintended lines.
- Run the test suite before committing AI-completed code.
- Stage hunks selectively; do not blanket-commit a Copilot session.

---

## D. GitHub Copilot Chat / CLI

### D.1 Best For

- Conversational explanation of existing code.
- Refactor suggestions with rationale.
- Generating tests for a given function or file.
- Translating between languages or frameworks.
- Shell command help via the CLI (explain, suggest).
- PR review assist (summary, risk surface).

### D.2 Weak For

- Long autonomous refactors across many files without supervision.
- Replacing a careful code review.
- Anything that requires running the repo's tests without an agent-capable surface.

### D.3 Prompt Style

- Reference the file or function by name. Paste it if needed.
- State the constraint: "preserve public API," "no new dependencies," "match existing style."
- Ask for the smallest safe patch and a list of changed lines.

### D.4 Commands / Slash Patterns

WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

| Command | Purpose | Status | Notes | Safer Alternative |
|---|---|---|---|---|
| /explain | Explain selected code | LIKELY_NATIVE_UNVERIFIED | IDE chat | "Explain this function line by line." |
| /fix | Propose a fix for the selection | LIKELY_NATIVE_UNVERIFIED | IDE chat | "Identify the bug and patch it minimally." |
| /tests | Generate tests for the selection | LIKELY_NATIVE_UNVERIFIED | IDE chat | "Write unit tests covering [cases]." |
| /doc | Generate docstrings | LIKELY_NATIVE_UNVERIFIED | IDE chat | "Write a docstring with args, returns, raises." |
| @workspace | Scope chat to workspace context | LIKELY_NATIVE_UNVERIFIED | IDE chat | Paste relevant files explicitly |
| @terminal | Scope to terminal output | LIKELY_NATIVE_UNVERIFIED | IDE chat | Paste the terminal output |
| gh copilot explain | Explain a shell command | LIKELY_NATIVE_UNVERIFIED | CLI | man pages |
| gh copilot suggest | Suggest a shell command | LIKELY_NATIVE_UNVERIFIED | CLI | Search docs |
| PR review assist | Summarize and flag risks in a PR | LIKELY_NATIVE_UNVERIFIED | GitHub UI | Manual review |

### D.5 File and Repo Context

- Chat can be scoped to the workspace, the active file, or specific selections.
- The CLI works against your shell context, not your repo content.
- For repo-wide reasoning, name the files; do not assume implicit indexing.

### D.6 Common Mistakes

- Accepting a /fix without re-running tests.
- Trusting /tests to cover edge cases; review what cases it actually wrote.
- Running gh copilot suggest output without reading it; destructive commands deserve manual review.
- Asking PR review assist to replace human review on security-sensitive changes.

### D.7 Recovery

- "List every file you touched and the exact diff in unified format."
- "Re-do this patch with the minimum change. Do not refactor unrelated code."
- "Show the test cases. Which edge cases are still uncovered?"

### D.8 Power Prompts

- Refactor: "Refactor [function] to extract pure logic from IO. Preserve the public signature. Add tests for the pure functions. Show a unified diff."
- Test generation: "Write tests for [file] covering: happy path, empty input, invalid input, boundary values, error propagation. Use the existing test framework already in the repo."
- PR review: "Review this diff. Output: Summary, Risk Areas, Behavior Changes, Missing Tests, Suggested Follow-ups. Be terse."
- Bug triage: "Given this error log and this file, identify the most likely line that fails and explain why. Propose a minimal fix."
- Command help: "Explain what this shell command does line by line. Flag any destructive flag."

---

## Cross-Product Verification Checklist

- Am I using the right Copilot for the surface (consumer vs M365 vs GitHub IDE vs GitHub Chat/CLI)?
- For M365, did I confirm the model has permission to read the referenced artifact?
- For GitHub IDE, did I run the tests after accepting completions?
- For GitHub Chat, did I review the diff before applying?
- Did I avoid asking for raw chain-of-thought and ask for a reasoning summary?
- Did I avoid pasting secrets or production credentials?

## Cross-Product Unknown / Unverified Features

- Exact slash command availability per surface and per tier - LIKELY_NATIVE_UNVERIFIED.
- Model versions powering each Copilot today - UNKNOWN in this run.
- Tenant-by-tenant feature rollouts for M365 - UNKNOWN in this run.
- Whether plugins / connectors are enabled by default - UNKNOWN in this run.
- Whether PR review assist is enabled on a given repo - UNKNOWN in this run.

## Summary

Four products, one brand. Microsoft Copilot is consumer chat. M365 Copilot is the enterprise Office co-pilot grounded in your tenant via Graph. GitHub Copilot is inline IDE completion. GitHub Copilot Chat / CLI is conversational and shell-side assistance. Match the surface to the task, name your artifacts explicitly, and always review AI output before committing, sending, or sharing.
