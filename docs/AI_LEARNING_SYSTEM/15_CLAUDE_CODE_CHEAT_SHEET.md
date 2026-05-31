# 15 - Claude Code Cheat Sheet

Status tag legend: VERIFIED_LOCAL, VERIFIED_DOCS, USER_PROVIDED_UNVERIFIED, CUSTOM_WORKFLOW, LIKELY_NATIVE_UNVERIFIED, UNKNOWN, DEPRECATED.

---

## 1. Best For

- Repo-scale coding: refactors, migrations, multi-file edits
- Audits: security review, dead code, hallucinated API checks
- Test authoring and test running with verification gates
- Long-running engineering sessions where state and context matter
- Disciplined output: prefers compiling code over confident-looking code
- Tool use and MCP integrations (file systems, GitHub, calendars, etc.)
- Plan-first workflows where you want a diff preview before changes land
- Documentation generated directly from source rather than imagined

## 2. Weak For

- Image generation
- Casual brainstorming chat (overkill, and slower than a chat UI)
- Tasks that require live web data unless web tools are wired up
- Domains outside its training cutoff without retrieval
- Anything where you want a single token of output and a snappy reply

## 3. Mental Model

Claude Code is a senior engineer that pair-programs inside your repo. It is biased toward correctness over speed. Treat it like a colleague who will refuse to claim a test passed if it did not actually run. Give it a goal, let it explore the repo, ask it to plan before editing, then approve the plan. Its strength compounds when you keep the repo clean, give it CLAUDE.md context, and let it use tools.

## 4. Best Use Cases

- "Find every place we call the deprecated v1 API and migrate to v2 with tests."
- "Audit this service for SSRF, then propose a minimal patch."
- "Add a feature flag for X with rollout config, tests, and docs."
- "Triage these failing tests, root-cause each, fix or quarantine with rationale."
- "Generate a migration plan for moving from package A to package B."
- "Review this PR for security, correctness, and architecture fit."

## 5. Prompt Style That Works Best

- State the goal, then the constraints, then the verification gate.
- Name files and symbols where you can. Ambiguity invites wandering.
- Ask for a plan before edits on anything non-trivial.
- Demand evidence: "show the test output," "paste the failing line."
- Forbid invention: "if an API does not exist, say so; do not invent."
- End with "Do not claim success without running and reporting the test result."

## 6. Native Features

- Repo-aware file reading and writing (LIKELY_NATIVE_UNVERIFIED)
- Tool use including shell, edit, and search (LIKELY_NATIVE_UNVERIFIED)
- Plan mode for previewing changes (LIKELY_NATIVE_UNVERIFIED)
- MCP server integration (LIKELY_NATIVE_UNVERIFIED)
- CLAUDE.md project memory (LIKELY_NATIVE_UNVERIFIED)
- Skills system for reusable workflows (LIKELY_NATIVE_UNVERIFIED)
- Settings.json hooks for automated behaviors (LIKELY_NATIVE_UNVERIFIED)
- Session resume / branch (LIKELY_NATIVE_UNVERIFIED)
- Cost and context introspection (LIKELY_NATIVE_UNVERIFIED)

## 7. Commands / Shortcuts / UI Controls

> WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

### 7.1 Keyboard Shortcuts (operator-supplied)

| Command | Purpose | Status | Notes | Safer Alternative |
| --- | --- | --- | --- | --- |
| Ctrl+C | Interrupt current operation | USER_PROVIDED_UNVERIFIED | Standard terminal interrupt convention | Type "stop" |
| Ctrl+D | Exit / send EOF | USER_PROVIDED_UNVERIFIED | Standard shell convention | /exit if available |
| Ctrl+L | Clear visible terminal | USER_PROVIDED_UNVERIFIED | Visual only; history kept | /clear for session reset |
| Ctrl+O | Open / overflow control | USER_PROVIDED_UNVERIFIED | Purpose unclear without verification | Use UI menu |
| Ctrl+R | Reverse search history | USER_PROVIDED_UNVERIFIED | Standard readline | Up arrow |
| Ctrl+G | Cancel current input mode | USER_PROVIDED_UNVERIFIED | Readline cancel convention | Esc |
| Ctrl+X E | Edit current input in $EDITOR | USER_PROVIDED_UNVERIFIED | Readline chord | Paste from editor |
| Ctrl+B | Background / pane control | USER_PROVIDED_UNVERIFIED | May be tmux passthrough | Use external multiplexer |
| Ctrl+T | Toggle / transpose | USER_PROVIDED_UNVERIFIED | Purpose unclear | Skip |
| Ctrl+V | Verbatim insert | USER_PROVIDED_UNVERIFIED | Readline convention | Paste normally |
| Ctrl+X K | Kill / close | USER_PROVIDED_UNVERIFIED | Chord; effect unclear | /exit |
| Esc Esc | Cancel pending action | USER_PROVIDED_UNVERIFIED | Double-tap escape | Ctrl+C |
| Shift+Tab | Cycle modes / completions | USER_PROVIDED_UNVERIFIED | Possibly mode toggle | Use slash command |
| Alt+P | Previous prompt | USER_PROVIDED_UNVERIFIED | Possibly history | Up arrow |
| Alt+T | Toggle option | USER_PROVIDED_UNVERIFIED | Effect unclear | Slash command |
| Alt+O | Open option / overlay | USER_PROVIDED_UNVERIFIED | Effect unclear | Slash command |
| Up / Down | Navigate prompt history | USER_PROVIDED_UNVERIFIED | Standard | - |
| Left / Right | Cursor navigation | USER_PROVIDED_UNVERIFIED | Standard | - |

### 7.2 Slash Commands

| Command | Purpose | Status | Notes | Safer Alternative |
| --- | --- | --- | --- | --- |
| /clear | Start a fresh context | LIKELY_NATIVE_UNVERIFIED | Common convention; verify in your build | Restart CLI |
| /compact | Summarize and shrink current context | LIKELY_NATIVE_UNVERIFIED | Reduces tokens, may lose detail | Manual summary then /clear |
| /resume | Resume a prior session | USER_PROVIDED_UNVERIFIED | Verify availability | Re-paste relevant context |
| /rename | Rename current session | USER_PROVIDED_UNVERIFIED | Cosmetic | - |
| /branch | Fork the conversation | USER_PROVIDED_UNVERIFIED | For exploring alternatives | Open second session |
| /cost | Show session token cost | LIKELY_NATIVE_UNVERIFIED | Useful for budget tracking | External usage page |
| /context | Show current context usage | LIKELY_NATIVE_UNVERIFIED | Helps decide when to /compact | Estimate manually |
| /diff | Show pending diff | USER_PROVIDED_UNVERIFIED | Preview before apply | git diff |
| /copy | Copy last output | USER_PROVIDED_UNVERIFIED | Convenience | Terminal copy |
| /rewind | Undo last assistant turn | USER_PROVIDED_UNVERIFIED | Verify | Restart with revised prompt |
| /export | Export session transcript | USER_PROVIDED_UNVERIFIED | For audit / archive | Copy-paste |
| /config | Open settings UI | LIKELY_NATIVE_UNVERIFIED | Maps to settings.json | Edit settings.json |
| /model | Switch model | LIKELY_NATIVE_UNVERIFIED | Plan / budget impact | Restart with flag |
| /fast | Switch to a faster model variant | USER_PROVIDED_UNVERIFIED | Verify name in your build | /model |
| /theme | Change visual theme | USER_PROVIDED_UNVERIFIED | Cosmetic | - |
| /permissions | Manage tool permissions | LIKELY_NATIVE_UNVERIFIED | Critical for safety | Edit settings.json |
| /effort | Set reasoning effort level | USER_PROVIDED_UNVERIFIED | Trade speed vs depth | Prompt phrasing |
| /keybindings | Customize keys | LIKELY_NATIVE_UNVERIFIED | Maps to keybindings.json | Edit file directly |
| /terminal-setup | Configure terminal integration | USER_PROVIDED_UNVERIFIED | First-run helper | Manual setup |
| /init | Initialize CLAUDE.md in repo | LIKELY_NATIVE_UNVERIFIED | Generates project memory file | Author CLAUDE.md manually |
| /memory | Inspect / edit memory | LIKELY_NATIVE_UNVERIFIED | Project + user memory | Edit CLAUDE.md |
| /mcp | Manage MCP servers | LIKELY_NATIVE_UNVERIFIED | Tool integration control | Edit config |
| /hooks | Manage settings.json hooks | LIKELY_NATIVE_UNVERIFIED | Automated behaviors | Edit settings.json |
| /skills | List / invoke skills | LIKELY_NATIVE_UNVERIFIED | Reusable workflows | Manual prompt |
| /agents | Manage subagents | LIKELY_NATIVE_UNVERIFIED | Delegation | Single-agent prompt |
| /chrome | Browser tool control | USER_PROVIDED_UNVERIFIED | Verify availability | Use a web MCP |
| /powerup | Apply a power-user preset | USER_PROVIDED_UNVERIFIED | Likely custom; verify | CUSTOM_WORKFLOW prompt |
| /btw | Quick aside / annotation | USER_PROVIDED_UNVERIFIED | Verify | Inline comment |
| /plan | Enter plan mode | LIKELY_NATIVE_UNVERIFIED | Preview before apply | --permission-mode plan |
| /loop | Run a prompt on an interval | USER_PROVIDED_UNVERIFIED | Verify | External cron |
| /voice | Voice input / output | USER_PROVIDED_UNVERIFIED | Plan / platform dependent | Type prompts |
| /doctor | Run environment diagnostics | LIKELY_NATIVE_UNVERIFIED | Useful when things break | Manual checks |
| /remote-control | Remote session control | USER_PROVIDED_UNVERIFIED | Verify | SSH session |
| /usage | Show usage stats | LIKELY_NATIVE_UNVERIFIED | Plan tracking | Vendor dashboard |
| /schedule | Schedule a task | USER_PROVIDED_UNVERIFIED | Verify | External scheduler |
| /security-review | Run a security review skill | LIKELY_NATIVE_UNVERIFIED | Matches available skill | Manual review prompt |
| /feedback | Send feedback to vendor | LIKELY_NATIVE_UNVERIFIED | Cosmetic | - |
| /release-notes | Show CLI release notes | LIKELY_NATIVE_UNVERIFIED | Version awareness | Vendor changelog |
| /simplify | Run simplify skill | LIKELY_NATIVE_UNVERIFIED | Matches available skill | Manual review prompt |
| /batch | Batch multiple prompts | USER_PROVIDED_UNVERIFIED | Verify | Shell loop |
| /debug | Enter debug mode | USER_PROVIDED_UNVERIFIED | Verify | DEBUG env var |
| /claude-api | Invoke claude-api skill | LIKELY_NATIVE_UNVERIFIED | Matches available skill | Manual setup |

### 7.3 CLI Options

| Command | Purpose | Status | Notes | Safer Alternative |
| --- | --- | --- | --- | --- |
| --permission-mode plan | Force plan-only mode | LIKELY_NATIVE_UNVERIFIED | No writes until approval | Prompt "plan only" |
| ultrathink (prompt keyword) | Request maximum reasoning effort | USER_PROVIDED_UNVERIFIED | Folk convention; verify behavior | "think carefully and step by step" |
| --worktree | Operate in a git worktree | USER_PROVIDED_UNVERIFIED | Isolation for experiments | git worktree manually |
| -c | Continue most recent session | LIKELY_NATIVE_UNVERIFIED | Common CLI convention | /resume |
| -r | Resume a specific session id | LIKELY_NATIVE_UNVERIFIED | Pair with id | /resume |
| -p | One-shot non-interactive prompt | LIKELY_NATIVE_UNVERIFIED | Good for pipelines | Interactive mode |
| --output-format | Choose output format (text / json / stream) | LIKELY_NATIVE_UNVERIFIED | For scripting | Default |
| --max-budget-usd | Cap session spend | USER_PROVIDED_UNVERIFIED | Verify exact flag in your build | Plan-level limit |
| cat file \| claude -p "..." | Pipe stdin as context | LIKELY_NATIVE_UNVERIFIED | Standard Unix composition | claude then paste |

## 8. File Handling

- Reads files via repo tools; respects .gitignore in practice. Status: LIKELY_NATIVE_UNVERIFIED.
- Writes through Edit / Write tools with diffs. Status: LIKELY_NATIVE_UNVERIFIED.
- For large files, prefer reading specific ranges over the whole file. Status: CUSTOM_WORKFLOW.
- Binary files (images, PDFs) are handled if your tooling supports them. Status: LIKELY_NATIVE_UNVERIFIED.
- Never commit secrets; treat .env files as off-limits unless the operator explicitly opts in. Status: CUSTOM_WORKFLOW.

## 9. Web / Research Ability

- No reliable native web access unless explicitly wired via tools or MCP. Status: LIKELY_NATIVE_UNVERIFIED.
- For verified web data, pair with Perplexity output pasted in, or wire a search MCP. Status: CUSTOM_WORKFLOW.
- Never trust a Claude Code answer about a current-events fact without an external citation. Status: CUSTOM_WORKFLOW.

## 10. Coding Ability

- Strong on multi-file edits, refactors, and test authoring.
- Strong on reading existing code before writing new code.
- Best when you ask for a plan, approve it, then ask for edits with verification.
- Weak when given vague goals; strong when given file paths and acceptance tests.

## 11. Automation Ability

- settings.json hooks let the harness run commands automatically. Status: LIKELY_NATIVE_UNVERIFIED.
- Skills are the right home for repeatable workflows. Status: LIKELY_NATIVE_UNVERIFIED.
- Use -p with --output-format for scripted, headless invocations. Status: LIKELY_NATIVE_UNVERIFIED.
- For recurring tasks, prefer an external scheduler over /loop until /loop is verified in your build. Status: CUSTOM_WORKFLOW.

## 12. Memory / Project Context

- CLAUDE.md at repo root: long-term project memory. Status: LIKELY_NATIVE_UNVERIFIED.
- ~/.claude/CLAUDE.md: user-global memory. Status: LIKELY_NATIVE_UNVERIFIED.
- /init bootstraps a CLAUDE.md from your repo. Status: LIKELY_NATIVE_UNVERIFIED.
- /memory inspects and edits memory. Status: LIKELY_NATIVE_UNVERIFIED.
- Do not store secrets in memory files.

## 13. Privacy / Safety Notes

- Prompts and file contents are sent to Anthropic unless you are on a contracted private endpoint.
- Treat .env, credentials.json, and key material as out-of-scope unless explicitly opted in.
- For destructive git commands, require explicit confirmation; never run --force on shared branches without sign-off.
- Hooks can execute arbitrary commands; review settings.json before sharing a repo.

## 14. Power User Workflows

### 14.1 Plan-Approve-Apply
1. Ask for a plan with file list and risk notes.
2. Read the plan, edit, or reject.
3. Approve, then ask for the edits.
4. Require diffs before commit.
5. Run tests and capture output verbatim.

### 14.2 Worktree-Isolated Experiment
1. git worktree add ../exp-feature-x feature-x
2. Open Claude Code in that worktree.
3. Try the risky change.
4. If it works, merge. If not, delete the worktree.

### 14.3 Skill-Driven Review
1. /security-review on a PR branch.
2. Triage findings into must-fix, should-fix, defer.
3. /simplify on changed code.
4. Re-run tests.

### 14.4 Headless Pipeline
1. cat spec.md | claude -p "Generate an implementation plan as JSON." --output-format json
2. Feed JSON to the next stage of your pipeline.

### 14.5 Bug Hunt
1. Paste failing test output.
2. Ask for likely root causes ranked by probability with evidence required.
3. Ask for the minimal patch.
4. Run tests. Repeat until green.

## 15. Common Mistakes

- Accepting a "tests pass" claim without seeing the actual test runner output.
- Letting the agent edit before approving a plan.
- Skipping CLAUDE.md and then complaining about hallucinated conventions.
- Asking for hidden chain-of-thought instead of a reasoning summary.
- Forgetting that flags like --worktree and --max-budget-usd are unverified in this run.
- Trusting any URL it produces without checking.
- Running destructive git commands without an explicit operator instruction.

## 16. Recovery Commands

| Command | Purpose | Status | Notes | Safer Alternative |
| --- | --- | --- | --- | --- |
| /clear | Reset context after derailment | LIKELY_NATIVE_UNVERIFIED | Loses memory in session | /compact first |
| /compact | Shrink context without losing thread | LIKELY_NATIVE_UNVERIFIED | Risk: lossy summary | Manual summary |
| /rewind | Undo last turn | USER_PROVIDED_UNVERIFIED | Verify in your build | /clear and re-prompt |
| /doctor | Diagnose env issues | LIKELY_NATIVE_UNVERIFIED | Run when tools misbehave | Manual checks |
| git restore --staged . | Unstage changes | VERIFIED_DOCS | Does not discard content | - |
| git stash | Park uncommitted work | VERIFIED_DOCS | Safe pause | - |
| git reflog | Recover lost commits | VERIFIED_DOCS | Lifesaver | - |

## 17. Best Prompts

### 17.1 Claude Code Operating Prompt (verbatim, section 9.D of the master prompt)

> You are the programming AI. Do the job. Read the repo before you edit. Plan before you write. Never claim a test passed without running it and pasting the output. If an API does not exist, say so; do not invent one. Prefer the smallest change that solves the problem. Respect existing patterns. Refuse destructive git commands unless I explicitly ask. Surface uncertainty; do not hide it. When you finish, list the files you changed, the tests you ran, and the exact result.

### 17.2 Fix a Failing Test
> The test at PATH:LINE is failing with OUTPUT. Read the surrounding code. Propose the three most likely root causes ranked by probability, with one piece of evidence each from the actual code. Then propose the minimal patch. Do not edit until I approve. After I approve, run the test and paste the runner's exact output.

### 17.3 Audit Repo
> Audit this repo for: dead code, hallucinated imports, missing tests on changed files in the last 30 days, and any TODO older than 90 days. For each finding, give file:line and one-sentence rationale. Do not edit. Output a Markdown table.

### 17.4 Build a Feature
> Build feature X. Constraints: must respect existing patterns in DIR, must include tests, must not modify FILES. Step 1: produce a plan with file list, new symbols, and risk notes. Stop. Wait for approval.

### 17.5 Refactor Safely
> Refactor SYMBOL from PATTERN_A to PATTERN_B. Constraints: behavior unchanged, all existing tests must still pass, public API unchanged. Step 1: list every call site with file:line. Step 2: propose the diff. Step 3: run tests. Paste output.

### 17.6 Find Hallucinated Code
> Scan changed files in this branch. For each import, function call, and config key, verify it exists in the codebase or a declared dependency. Report any that you cannot verify, with file:line.

### 17.7 Remove Dead Code
> List functions, types, and files that have zero references. For each, show how you confirmed. Do not delete; produce a Markdown list with file:line.

### 17.8 Add a CI Gate
> Add a CI gate that fails the build when SYMPTOM. Use the existing CI tooling in PATH. Provide the workflow diff and a local reproduction command.

### 17.9 Create Docs From Source
> Generate API docs for PACKAGE from the source. Use only symbols that actually exist. For each public function, include signature, one-line summary, and one usage example pulled from existing tests if available. If no example exists, say so.

### 17.10 Patch a Security Issue
> Patch VULN in FILE. Constraints: minimal change, no behavior change for the safe path, include a regression test that fails without the patch and passes with it. Plan first, then patch, then run the test, then paste output.

### 17.11 Generate a Migration
> Generate a migration from LIB_A to LIB_B. List every call site. Group by mechanical vs semantic changes. Produce one PR per group with diffs and a rollback note.

### 17.12 Analyze Architecture
> Produce an architecture summary of this repo: module boundaries, data flow, external dependencies, and the three highest-risk coupling points. Cite file paths for every claim. Do not invent modules.

## 18. Verification Checklist

Before trusting any answer from Claude Code:

- [ ] Plan reviewed before edits.
- [ ] Diff inspected before commit.
- [ ] Tests actually run; output pasted.
- [ ] No invented imports or APIs.
- [ ] No destructive git commands without explicit consent.
- [ ] CLAUDE.md context up to date.
- [ ] Status tag noted for any cited command.

## 19. Anti-Fake-Success Rules

These rules are CUSTOM_WORKFLOW and should be enforced by your operating prompt or a settings.json hook.

- Never claim "tests pass" without running them and pasting the runner output.
- Never invent functions, modules, or config keys; if uncertain, say "not found in repo."
- Never assert a URL works; produce it and let the operator verify.
- Never declare a refactor "done" without listing every changed file and the test result.
- Never skip pre-commit hooks; if a hook fails, fix the cause and create a new commit.
- Never amend a commit to hide a failure.
- Never run --force on shared branches.
- Never store secrets in CLAUDE.md, settings.json, or session memory.
- Never expose hidden chain-of-thought; provide a reasoning summary instead.

## 20. Unknown / Unverified Features

- /chrome, /powerup, /btw, /voice, /remote-control, /schedule, /batch, /debug: USER_PROVIDED_UNVERIFIED.
- --max-budget-usd, --worktree, ultrathink keyword: USER_PROVIDED_UNVERIFIED.
- Exact behavior of Alt+P / Alt+T / Alt+O and Ctrl+B / Ctrl+T / Ctrl+V chords: USER_PROVIDED_UNVERIFIED.
- Verify each before relying on it in a runbook.

## Summary

Claude Code is the strongest pick when you need code that compiles and tests that actually run, inside a repo, under operator control. Use plan-first workflows, demand evidence, never accept fake success, and keep CLAUDE.md current. Treat every command in section 7 as LIKELY_NATIVE_UNVERIFIED or USER_PROVIDED_UNVERIFIED until you confirm it in your own build; web verification was not available in this run.
