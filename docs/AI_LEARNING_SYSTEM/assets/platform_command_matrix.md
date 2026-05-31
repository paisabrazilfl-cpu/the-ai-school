# Platform Command Matrix

A single reference table of commands, shortcuts, and notable features across the AI platforms operators tend to use.

**WEB VERIFICATION NOT AVAILABLE IN THIS RUN.** Most rows below are tagged `LIKELY_NATIVE_UNVERIFIED` or `USER_PROVIDED_UNVERIFIED`. Treat this as a conservative starting checklist, not a manual. Re-verify against current vendor docs before relying on any row.

Verification tags:
- `VERIFIED_LOCAL` - confirmed in this repo or local files
- `VERIFIED_DOCS` - confirmed in official docs in this session
- `USER_PROVIDED_UNVERIFIED` - supplied by the user, not independently confirmed
- `CUSTOM_WORKFLOW` - an operator pattern, not a platform feature
- `LIKELY_NATIVE_UNVERIFIED` - commonly cited but not confirmed here
- `UNKNOWN` - we cannot tell from this run
- `DEPRECATED` - was real, no longer current

Reminder: never request hidden chain-of-thought. Where a platform offers "thinking" or "reasoning" visibility, ask for a reasoning summary only.

---

| Platform | Command / Shortcut / Feature | Purpose | Status | Notes | Safer Alternative |
|---|---|---|---|---|---|
| Claude Code | Ctrl+C | Interrupt / cancel current action | USER_PROVIDED_UNVERIFIED | Terminal-standard interrupt | Confirm in `/help` before relying on it |
| Claude Code | Ctrl+D | Exit session / EOF | USER_PROVIDED_UNVERIFIED | Terminal-standard EOF | Use explicit `exit` if available |
| Claude Code | Ctrl+L | Clear screen | USER_PROVIDED_UNVERIFIED | Terminal convention; not session reset | Use `/clear` to reset context |
| Claude Code | Ctrl+R | Reverse history search | USER_PROVIDED_UNVERIFIED | Shell-level, not Claude-specific | Scroll history manually |
| Claude Code | Up / Down arrows | Cycle prompt history | USER_PROVIDED_UNVERIFIED | Standard CLI behavior | n/a |
| Claude Code | Shift+Enter | Newline within prompt | USER_PROVIDED_UNVERIFIED | Compose multi-line prompts | Paste from editor |
| Claude Code | Esc | Cancel current edit / dismiss menu | USER_PROVIDED_UNVERIFIED | Standard cancel | n/a |
| Claude Code | Esc Esc | Stronger cancel / back out twice | USER_PROVIDED_UNVERIFIED | Double-tap to exit nested state | Restart session if stuck |
| Claude Code | /clear | Reset conversation context | USER_PROVIDED_UNVERIFIED | Frees context window | Start a new session |
| Claude Code | /help | Show available commands and shortcuts | USER_PROVIDED_UNVERIFIED | Use as the authoritative in-app list | Always check `/help` first |
| Claude Code | /init | Initialize CLAUDE.md for the repo | USER_PROVIDED_UNVERIFIED | Bootstraps project context | Edit CLAUDE.md by hand |
| Claude Code | /review | Review a pull request | USER_PROVIDED_UNVERIFIED | Code review workflow | Manual diff review |
| Claude Code | /security-review | Security review of pending changes | USER_PROVIDED_UNVERIFIED | Surfaces likely security issues | Pair with human review |
| Claude Code | /simplify | Review changes for reuse, quality, efficiency | USER_PROVIDED_UNVERIFIED | Refactor suggestions | Read diff yourself |
| Claude Code | /loop | Run a prompt on a recurring interval | USER_PROVIDED_UNVERIFIED | Useful for polling tasks | Cron / scheduler |
| Claude Code | /update-config | Edit settings.json via guided skill | USER_PROVIDED_UNVERIFIED | Hooks, permissions, env vars | Edit settings.json directly |
| Claude Code | /fewer-permission-prompts | Tune allowlist to reduce prompts | USER_PROVIDED_UNVERIFIED | Reads recent transcripts | Manually edit settings |
| Claude Code | /keybindings-help | Customize keyboard shortcuts | USER_PROVIDED_UNVERIFIED | Edits ~/.claude/keybindings.json | Edit file manually |
| Claude Code | /session-start-hook | Create startup hook for web sessions | USER_PROVIDED_UNVERIFIED | Bootstraps tests/linters | Configure CI instead |
| Claude Code | /claude-api | Build/debug Anthropic SDK apps | USER_PROVIDED_UNVERIFIED | Includes caching guidance | Read SDK docs |
| Claude Code | CLAUDE.md file | Persistent project instructions | LIKELY_NATIVE_UNVERIFIED | Loaded as context per session | Keep it short and current |
| Claude Code | settings.json / settings.local.json | Permissions, hooks, env | LIKELY_NATIVE_UNVERIFIED | Hooks fire on harness events | Test hooks in a scratch repo |
| Claude Code | MCP servers | External tool integrations | LIKELY_NATIVE_UNVERIFIED | Adds tools to the session | Audit each MCP server |
| ChatGPT | Custom Instructions | Persistent user preferences | LIKELY_NATIVE_UNVERIFIED | Applies across chats | Re-state in critical prompts |
| ChatGPT | Custom GPTs | Reusable assistant configs | LIKELY_NATIVE_UNVERIFIED | Distribute or keep private | Plain system prompt |
| ChatGPT | Projects | Group chats and files | LIKELY_NATIVE_UNVERIFIED | Per-project memory and files | Manual file folders |
| ChatGPT | Memory | Cross-chat recollection | LIKELY_NATIVE_UNVERIFIED | Can leak old context | Turn off for sensitive work |
| ChatGPT | Canvas | Side-by-side document editing | LIKELY_NATIVE_UNVERIFIED | Good for long-form edits | Edit in your own editor |
| ChatGPT | Voice mode | Spoken conversation | LIKELY_NATIVE_UNVERIFIED | Casual ideation | Type for precision |
| ChatGPT | Code Interpreter / Advanced Data Analysis | Run Python in sandbox | LIKELY_NATIVE_UNVERIFIED | Good for CSV / quick calc | Local Jupyter |
| ChatGPT | Browse / Web | Live web access | LIKELY_NATIVE_UNVERIFIED | Verify citations | Use Perplexity for sourced search |
| ChatGPT | File upload | Attach docs, images | LIKELY_NATIVE_UNVERIFIED | Watch PII | Redact before upload |
| ChatGPT | Shift+Enter | Newline in input | LIKELY_NATIVE_UNVERIFIED | Compose multi-line | Paste from editor |
| ChatGPT | Regenerate | Re-run last turn | LIKELY_NATIVE_UNVERIFIED | Often hides drift | Edit the prompt instead |
| Gemini | Gems | Custom assistant personas | LIKELY_NATIVE_UNVERIFIED | Analogous to Custom GPTs | Plain system prompt |
| Gemini | Workspace integration | Docs / Gmail / Drive context | LIKELY_NATIVE_UNVERIFIED | Org policy may restrict | Copy text in manually |
| Gemini | Deep Research | Long-running research mode | LIKELY_NATIVE_UNVERIFIED | Returns sourced reports | Cross-check with Perplexity |
| Gemini | Canvas | Long-form editing surface | LIKELY_NATIVE_UNVERIFIED | Similar to ChatGPT Canvas | External editor |
| Gemini | File / image upload | Multimodal input | LIKELY_NATIVE_UNVERIFIED | Watch PII | Redact first |
| Perplexity | Focus modes (Web, Academic, etc.) | Restrict source domain | LIKELY_NATIVE_UNVERIFIED | Academic = peer-reviewed bias | Combine focuses |
| Perplexity | Spaces / Collections | Grouped threads with shared context | LIKELY_NATIVE_UNVERIFIED | Good for projects | Folders + tags |
| Perplexity | Pro Search | Multi-step search with follow-ups | LIKELY_NATIVE_UNVERIFIED | Still verify citations | Click-through each source |
| Perplexity | Citations panel | Inline source list | LIKELY_NATIVE_UNVERIFIED | Always click each | Treat as starting point |
| Perplexity | File upload | Attach PDFs etc. | LIKELY_NATIVE_UNVERIFIED | PII caution | Redact |
| Microsoft 365 Copilot | Copilot in Word | Draft / rewrite / summarize | LIKELY_NATIVE_UNVERIFIED | Uses doc + graph context | Manual draft |
| Microsoft 365 Copilot | Copilot in Excel | Formula and analysis assist | LIKELY_NATIVE_UNVERIFIED | Verify formulas | Local pivot tables |
| Microsoft 365 Copilot | Copilot in PowerPoint | Slide generation | LIKELY_NATIVE_UNVERIFIED | Generic templates | Manual deck |
| Microsoft 365 Copilot | Copilot in Outlook | Summarize / draft email | LIKELY_NATIVE_UNVERIFIED | Watch tone drift | Send-yourself preview |
| Microsoft 365 Copilot | Copilot in Teams | Meeting summary / recap | LIKELY_NATIVE_UNVERIFIED | Confirm participants notified | Manual notes |
| Microsoft 365 Copilot | Copilot Chat (work) | Tenant-scoped chat | LIKELY_NATIVE_UNVERIFIED | Respect data classification | Use unclassified chat for non-sensitive |
| Microsoft 365 Copilot | Copilot Studio | Custom Copilot agents | LIKELY_NATIVE_UNVERIFIED | Governance required | Pilot with one team |
| GitHub Copilot | Inline completion (Tab) | Accept suggestion | LIKELY_NATIVE_UNVERIFIED | IDE-specific binding | Review before accept |
| GitHub Copilot | Copilot Chat | In-IDE chat | LIKELY_NATIVE_UNVERIFIED | Context = open files | Add relevant files |
| GitHub Copilot | /explain | Explain selected code | LIKELY_NATIVE_UNVERIFIED | Good for onboarding | Ask the author |
| GitHub Copilot | /tests | Generate tests | LIKELY_NATIVE_UNVERIFIED | Tests can encode bugs | Review each test |
| GitHub Copilot | /fix | Suggest fix for diagnostic | LIKELY_NATIVE_UNVERIFIED | Verify scope | Manual fix |
| GitHub Copilot | /doc | Generate doc comment | LIKELY_NATIVE_UNVERIFIED | Often shallow | Edit by hand |
| GitHub Copilot | Workspace / Agent mode | Multi-file agent work | LIKELY_NATIVE_UNVERIFIED | Small reversible steps | Use feature branches |
| GitHub Copilot | PR summaries | Auto draft PR descriptions | LIKELY_NATIVE_UNVERIFIED | Verify accuracy | Edit before merge |
| Cursor | Cmd/Ctrl+K | Inline edit prompt | LIKELY_NATIVE_UNVERIFIED | Edits selection | Manual edit |
| Cursor | Cmd/Ctrl+L | Open chat | LIKELY_NATIVE_UNVERIFIED | Project chat | n/a |
| Cursor | Cmd/Ctrl+I | Composer / multi-file edit | LIKELY_NATIVE_UNVERIFIED | Touches many files | Review diff carefully |
| Cursor | @file / @folder / @docs | Attach context | LIKELY_NATIVE_UNVERIFIED | Keeps context relevant | Trim unused @refs |
| Cursor | .cursorrules | Repo-level instructions | LIKELY_NATIVE_UNVERIFIED | Persistent context | Keep short |
| Cursor | Agent mode | Autonomous task runner | LIKELY_NATIVE_UNVERIFIED | Blast radius matters | Branch + sandbox |
| Windsurf | Cascade | Multi-file AI flow | LIKELY_NATIVE_UNVERIFIED | Reviews and edits | Stage changes |
| Windsurf | Inline AI | In-editor suggestions | LIKELY_NATIVE_UNVERIFIED | Tab to accept (typical) | Review |
| Windsurf | Memories / rules | Persistent project context | LIKELY_NATIVE_UNVERIFIED | Like Cursor rules | Keep current |
| Replit AI | Ghostwriter / AI chat | In-IDE assistant | LIKELY_NATIVE_UNVERIFIED | Web IDE | Pull to local before shipping |
| Replit AI | Agent | Build apps from prompt | LIKELY_NATIVE_UNVERIFIED | Demo-quality default | Harden before launch |
| Replit AI | Deployments | One-click deploy | LIKELY_NATIVE_UNVERIFIED | Watch secrets exposure | Manage env vars carefully |
| Midjourney | /imagine | Generate image from prompt | LIKELY_NATIVE_UNVERIFIED | Discord and web | Use Image Prompt card |
| Midjourney | --ar W:H | Aspect ratio flag | LIKELY_NATIVE_UNVERIFIED | e.g., --ar 16:9 | Pick before generating |
| Midjourney | --no X | Negative prompt | LIKELY_NATIVE_UNVERIFIED | Excludes elements | Combine sparingly |
| Midjourney | --stylize / --s | Stylization strength | LIKELY_NATIVE_UNVERIFIED | Range varies by version | Test in pairs |
| Midjourney | --v / version flag | Model version | LIKELY_NATIVE_UNVERIFIED | Output varies by version | Lock version per project |
| Midjourney | Vary / Upscale / Remix | Iteration controls | LIKELY_NATIVE_UNVERIFIED | Output evolution | Save seeds you like |
| Midjourney | --seed | Reproducibility | LIKELY_NATIVE_UNVERIFIED | Pair with same prompt | Record seeds in brief |
| Runway | Text-to-video | Generate clip from text | LIKELY_NATIVE_UNVERIFIED | Short clips | Use Video Prompt card |
| Runway | Image-to-video | Animate a still | LIKELY_NATIVE_UNVERIFIED | More controllable | Curate input image |
| Runway | Motion brush / camera controls | Direct motion | LIKELY_NATIVE_UNVERIFIED | One motion per clip | Keep shots short |
| Runway | Extend / Lipsync / tools | Post features | LIKELY_NATIVE_UNVERIFIED | Quality varies | Edit in NLE |
| ElevenLabs | Voice library | Prebuilt voices | LIKELY_NATIVE_UNVERIFIED | Licensing varies | Check usage rights |
| ElevenLabs | Voice cloning | Custom voices | LIKELY_NATIVE_UNVERIFIED | Consent required | Document consent |
| ElevenLabs | Stability / similarity sliders | Tonal control | LIKELY_NATIVE_UNVERIFIED | Trade-off pair | A/B sample |
| ElevenLabs | Projects / long-form | Multi-paragraph narration | LIKELY_NATIVE_UNVERIFIED | Watch consistency | Break into chunks |
| ElevenLabs | Dubbing | Cross-language voice transfer | LIKELY_NATIVE_UNVERIFIED | Quality varies by language | Human QA |
| All platforms | Reasoning summary request | Visible plan / approach | CUSTOM_WORKFLOW | Replaces hidden CoT requests | Always summary, never raw CoT |
| All platforms | Source hierarchy prompt | Force tier-tagged citations | CUSTOM_WORKFLOW | See prompt cards | n/a |
| All platforms | Verification tagging | Tag every claim | CUSTOM_WORKFLOW | See operator checklists | n/a |

---

## How to use this matrix

1. Treat it as a starting checklist, not a manual.
2. Before relying on any row, open the platform's own docs or `/help` and confirm.
3. Promote a row from `LIKELY_NATIVE_UNVERIFIED` to `VERIFIED_DOCS` only after you have read the current doc page and dated it.
4. Mark anything you tested and confirmed working in this repo as `VERIFIED_LOCAL` with the date.
5. Retire rows that no longer apply by tagging them `DEPRECATED` instead of deleting; future operators benefit from the history.

WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Plan a verification pass when web access is available.
