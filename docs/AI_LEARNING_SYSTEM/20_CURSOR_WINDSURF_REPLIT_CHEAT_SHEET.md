# 20 - Cursor / Windsurf / Replit AI Cheat Sheet

Part of the AI_LEARNING_SYSTEM manual. Covers three AI-native coding environments with overlapping but distinct mental models.

Status tags used in this document:
- VERIFIED_LOCAL - confirmed from local repo evidence in this run
- VERIFIED_DOCS - confirmed from official documentation accessed in this run
- USER_PROVIDED_UNVERIFIED - asserted by the user but not independently verified
- CUSTOM_WORKFLOW - fan-name or user-coined pattern, not an official feature
- LIKELY_NATIVE_UNVERIFIED - plausibly a real platform feature, not verified here
- UNKNOWN - cannot confirm or deny
- DEPRECATED - confirmed retired or replaced

---

## Universal Coding-Agent Prompt

Paste this at the start of any non-trivial task in Cursor, Windsurf, Replit, or any other coding agent:

> Inspect the existing codebase before changing anything. Identify current architecture, existing patterns, and exact files involved. Implement the smallest safe patch. Run tests. Report changed files, commands run, failures, and remaining risks.

Tag: CUSTOM_WORKFLOW. Adapt to the agent's actual capabilities.

---

## A. Cursor

### A.1 Mental Model

Cursor is a VS Code fork with first-class AI surfaces: inline completion, an Ask chat, an Edit mode that patches files, and an Agent / Composer that can run multi-file changes and tool calls. Treat it as an IDE where the AI is a peer editor that needs the same context discipline a human would.

### A.2 Indexing / Context Behavior

- Cursor indexes the open workspace to give chat and agent surfaces project-wide context. (LIKELY_NATIVE_UNVERIFIED)
- @-symbols reference files, folders, symbols, docs, and recent changes inside chat. (LIKELY_NATIVE_UNVERIFIED)
- Large repos: index may be partial or stale; explicitly @-reference the files you care about.
- Closed files and ignored paths may be invisible to the agent.

### A.3 Surfaces

| Surface | Purpose | Status | Notes |
|---|---|---|---|
| Inline completion (Tab) | Single-line and multi-line completion | LIKELY_NATIVE_UNVERIFIED | Editor inline |
| Ask (chat) | Q&A over the workspace | LIKELY_NATIVE_UNVERIFIED | Read-only by default |
| Edit (inline edit) | Patch the selected file | LIKELY_NATIVE_UNVERIFIED | Single-file edits |
| Agent / Composer | Multi-file edits and tool use | LIKELY_NATIVE_UNVERIFIED | Naming has changed over versions |
| Rules files | Persistent instructions | LIKELY_NATIVE_UNVERIFIED | Examples below |

### A.4 Commands / Shortcuts / @-References

WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

| Command | Purpose | Status | Notes | Safer Alternative |
|---|---|---|---|---|
| @file | Reference a specific file | LIKELY_NATIVE_UNVERIFIED | Chat scope | Paste the file contents |
| @folder | Reference a folder | LIKELY_NATIVE_UNVERIFIED | | List files explicitly |
| @symbol | Reference a function or class | LIKELY_NATIVE_UNVERIFIED | | Paste the symbol |
| @docs | Reference external docs added to the workspace | LIKELY_NATIVE_UNVERIFIED | | Paste the doc excerpt |
| @web | Web lookup from chat | LIKELY_NATIVE_UNVERIFIED | | Use a browser |
| @git | Reference recent changes or diffs | LIKELY_NATIVE_UNVERIFIED | | Paste git diff output |
| Inline Edit shortcut (Cmd/Ctrl+K) | Open inline edit | LIKELY_NATIVE_UNVERIFIED | Editor shortcut | |
| Chat shortcut (Cmd/Ctrl+L) | Open Ask chat | LIKELY_NATIVE_UNVERIFIED | Editor shortcut | |
| Composer / Agent shortcut | Open multi-file agent | LIKELY_NATIVE_UNVERIFIED | Shortcut varies by version | |
| Accept / Reject hunks | Apply edits selectively | LIKELY_NATIVE_UNVERIFIED | | |
| Rules file | Persistent project instructions | LIKELY_NATIVE_UNVERIFIED | Project-level config | |

### A.5 Rules Files

- Cursor supports rules files that inject persistent instructions into the agent. (LIKELY_NATIVE_UNVERIFIED)
- Use rules to encode: file structure conventions, never-touch paths, test commands, coding style, framework gotchas, refactor patterns, and review expectations.
- Keep rules short and prescriptive. Long rules dilute attention.

Example rules content (CUSTOM_WORKFLOW):

- Always inspect existing files before editing.
- Never introduce a new dependency without listing it and asking.
- After every multi-file edit, run [test command] and report results.
- Preserve public API of [module] unless I explicitly request a break.

### A.6 Multi-File Edits

- Use the Agent / Composer surface for changes spanning many files. (LIKELY_NATIVE_UNVERIFIED)
- Always review the diff per file before applying.
- Stage and commit in small batches; do not let the agent author one giant commit.

### A.7 Secrets Handling

- Do not paste production secrets into prompts.
- Use environment variables and a local .env that is gitignored.
- Be aware that workspace files may be sent to the model provider depending on settings.
- Privacy mode (where available) reduces retention. (LIKELY_NATIVE_UNVERIFIED)

### A.8 Risk of Hallucinated Integrations

- The agent may import non-existent packages, call non-existent endpoints, or invent config keys.
- Verify every new import against the lockfile and the library's docs.
- Verify every new API call against the actual service contract.

### A.9 Common Mistakes

- Letting Composer run without reviewing the planned changes.
- Ignoring index staleness on large repos.
- Accepting a refactor that silently widens behavior (changed return types, new exceptions).
- Not committing between agent runs; lost work is hard to recover.

### A.10 Recovery

- Reject all hunks, then re-prompt with tighter constraints.
- "Stop. Show the plan as a numbered checklist before touching files."
- "List every file you read. List every file you intend to change. Wait for approval."
- Use git to reset to the last known good commit.

---

## B. Windsurf

### B.1 Mental Model

Windsurf is an AI-native IDE whose distinguishing surface is Cascade: a flow that lets the agent plan, run shell commands, edit multiple files, and iterate while keeping the developer in the loop. Treat it as Cursor's Composer pushed further toward agentic execution, with stronger emphasis on flowing through a multi-step task.

### B.2 Indexing / Context Behavior

- Windsurf indexes the workspace to power Cascade and chat. (LIKELY_NATIVE_UNVERIFIED)
- The agent can read additional files mid-task as the plan unfolds.
- For large or polyglot repos, explicitly point Cascade at the right entry points.

### B.3 Surfaces

| Surface | Purpose | Status | Notes |
|---|---|---|---|
| Inline completion | Per-keystroke completion | LIKELY_NATIVE_UNVERIFIED | |
| Chat | Q&A over the workspace | LIKELY_NATIVE_UNVERIFIED | |
| Cascade | Agentic multi-step flow | LIKELY_NATIVE_UNVERIFIED | Distinguishing feature |
| Rules / memories | Persistent instructions | LIKELY_NATIVE_UNVERIFIED | |

### B.4 Commands / Shortcuts

WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

| Command | Purpose | Status | Notes | Safer Alternative |
|---|---|---|---|---|
| Open Cascade | Launch the agent flow | LIKELY_NATIVE_UNVERIFIED | UI control | |
| Accept / Reject step | Approve or reject each agent step | LIKELY_NATIVE_UNVERIFIED | | |
| Run command in agent | Let the agent run shell | LIKELY_NATIVE_UNVERIFIED | High-risk; review each command | Run manually |
| @file / @symbol references | Scope to specific code | LIKELY_NATIVE_UNVERIFIED | Naming may differ | Paste the file |
| Rules / memories | Persistent project instructions | LIKELY_NATIVE_UNVERIFIED | | |
| Privacy mode | Reduce retention | LIKELY_NATIVE_UNVERIFIED | Settings | |

### B.5 Cascade Discipline

- Demand a plan before any file change. Approve the plan, then approve each step.
- Cap the blast radius: tell Cascade which folders are off-limits.
- Require tests to run after each meaningful step.
- Keep commits small; one logical change per commit.

### B.6 Secrets Handling

- Same rules as Cursor. Do not paste production secrets. Use .env and gitignore.
- Be cautious with agent-run shell commands; they can exfiltrate secrets through innocent-looking commands (curl, scp).

### B.7 Risk of Hallucinated Integrations

- Same risk as Cursor and amplified by autonomy. The agent may install or invoke packages that do not exist.
- Always verify new dependencies in the lockfile and against upstream docs.

### B.8 Common Mistakes

- Letting Cascade run shell without reading commands.
- Approving plans that touch files outside the requested scope.
- Allowing the agent to "fix tests" by rewriting the tests instead of the code.
- Skipping commit checkpoints between steps.

### B.9 Recovery

- Halt the flow. Ask for "a complete summary of every file changed and every command run."
- Reset the working tree to the last commit and re-plan with tighter rules.
- Reduce scope: "Only touch [specific folder]. Do not modify tests."

---

## C. Replit AI

### C.1 Mental Model

Replit AI lives inside a browser-based IDE that doubles as a hosting and deployment platform. Its differentiator is end-to-end: code, run, and deploy from one place. The AI surfaces include inline completion, chat, and an agent capable of scaffolding entire projects.

### C.2 Indexing / Context Behavior

- The agent operates against the Repl's filesystem. (LIKELY_NATIVE_UNVERIFIED)
- For large projects, name the entry points and key files explicitly.
- The platform's templates and packs influence what the agent assumes.

### C.3 Surfaces

| Surface | Purpose | Status | Notes |
|---|---|---|---|
| Inline completion | Per-keystroke completion | LIKELY_NATIVE_UNVERIFIED | |
| AI chat | Q&A and edits scoped to the Repl | LIKELY_NATIVE_UNVERIFIED | |
| Agent | Scaffolds and modifies projects end to end | LIKELY_NATIVE_UNVERIFIED | Naming has evolved |
| Run / Deploy | Execute and host | LIKELY_NATIVE_UNVERIFIED | Distinguishing platform feature |
| Secrets manager | Store env vars | LIKELY_NATIVE_UNVERIFIED | Use this, not plaintext |
| Database / object store | Built-in storage primitives | LIKELY_NATIVE_UNVERIFIED | Names vary by product version |

### C.4 Commands / Shortcuts

WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

| Command | Purpose | Status | Notes | Safer Alternative |
|---|---|---|---|---|
| Invoke agent | Start a scaffolding or edit task | LIKELY_NATIVE_UNVERIFIED | UI control | |
| Accept / Reject agent steps | Approve each step | LIKELY_NATIVE_UNVERIFIED | | |
| Run | Execute the Repl | LIKELY_NATIVE_UNVERIFIED | UI control | |
| Deploy | Publish to a hosted endpoint | LIKELY_NATIVE_UNVERIFIED | Costs may apply | Stage first |
| Secrets pane | Manage env vars | LIKELY_NATIVE_UNVERIFIED | Use it; do not hardcode | |
| Shell pane | Free shell access | LIKELY_NATIVE_UNVERIFIED | | |

### C.5 Multi-File Edits

- The agent will create and modify many files when scaffolding.
- Demand a project map before deployment; confirm structure, entry point, runtime, and required env vars.
- Commit (or fork) the Repl between major agent runs.

### C.6 Secrets Handling

- Use the secrets pane. Never paste keys into source files.
- Public Repls expose code; do not host private logic in a public Repl.
- Forking a Repl can copy non-secret files; secrets are typically not copied. Confirm before forking.

### C.7 Deployment Caveats

- Deploy targets vary (static, autoscale, reserved). Understand the billing implications. (LIKELY_NATIVE_UNVERIFIED)
- An agent that "deploys" your project can trigger usage charges. Approve deployments explicitly.
- Always do a staging or preview run before promoting to a public URL.
- Confirm DNS, custom domains, and HTTPS settings before sharing the URL.

### C.8 Risk of Hallucinated Integrations

- The agent may scaffold against frameworks or templates that do not match what you intended.
- It may invent package names, file structures, or env var names that no one expects.
- Always confirm: package manager, exact dependencies, runtime version, and entry-point command.

### C.9 Common Mistakes

- Deploying without staging.
- Hardcoding API keys in a public Repl.
- Letting the agent rewrite working code to match a hallucinated framework convention.
- Trusting the agent's "it should work" without actually running the Run button.

### C.10 Recovery

- "Stop. Print the current file tree and the contents of the entry point."
- "Roll back to the last working commit or fork."
- Revoke any API key that was pasted in plaintext, even briefly.

---

## Cross-Tool Verification Checklist

- Did I run the universal coding-agent prompt first?
- Did I review the plan before any multi-file change?
- Did I read every shell command the agent proposed to run?
- Did I commit before and after the agent's run?
- Did I verify new dependencies exist in the lockfile and upstream?
- Did I run the test suite after the change?
- Did I confirm no secrets were embedded in source?
- For Replit: did I stage before deploying?
- Did I avoid asking for raw chain-of-thought and ask for a reasoning summary?

## Cross-Tool Unknown / Unverified Features

- Exact shortcuts and command names per current version - LIKELY_NATIVE_UNVERIFIED.
- Underlying model selection per tier - UNKNOWN in this run.
- Privacy mode defaults - UNKNOWN in this run.
- Indexing scope and freshness on large monorepos - UNKNOWN in this run.
- Replit deployment pricing tiers and quotas - UNKNOWN in this run.
- Whether Cascade and Composer can fully run a CI-like loop unattended - LIKELY_NATIVE_UNVERIFIED.

## Summary

Cursor is a context-disciplined IDE with strong chat, edit, and agent surfaces. Windsurf leans further into agentic flow with Cascade and demands tight step-by-step approval. Replit AI extends the agent loop all the way to hosting, which adds deployment and cost risk. The same disciplines apply to all three: inspect first, smallest safe patch, review the diff, run tests, manage secrets, watch for hallucinated integrations, and commit between runs.
