# 14 - Major AI Cheat Sheets - Index and Overview

> WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

This file is the index for cheat sheets 15 through 21 of the AI_LEARNING_SYSTEM manual. Each downstream file uses the universal 20-section cheat sheet structure. This index file uses the 13-section template (Purpose through Summary).

---

## 1. Purpose

Give an operator a single map of the major AI platforms covered in this manual: when to reach for each, where each is weak, and what native capabilities each ships with out of the box. This file is navigational; the detailed playbooks live in files 15 through 21.

## 2. Scope

- Coding assistants (Claude Code, Cursor, GitHub Copilot)
- General chat assistants (ChatGPT, Claude.ai, Gemini, Grok)
- Open / local models (Llama family, Mistral, DeepSeek)
- Specialized research and search tools (Perplexity)

This file does not teach prompts. It teaches selection.

## 3. Files Covered

| File | Subject | Status |
| --- | --- | --- |
| 15_CLAUDE_CODE_CHEAT_SHEET.md | Claude Code CLI / agent | CUSTOM_WORKFLOW |
| 16_CHATGPT_CHEAT_SHEET.md | OpenAI ChatGPT | CUSTOM_WORKFLOW |
| 17_CLAUDE_AI_CHEAT_SHEET.md | Anthropic Claude.ai web app | CUSTOM_WORKFLOW |
| 18_GEMINI_CHEAT_SHEET.md | Google Gemini | CUSTOM_WORKFLOW |
| 19_PERPLEXITY_CHEAT_SHEET.md | Perplexity research engine | CUSTOM_WORKFLOW |
| 20_GROK_CHEAT_SHEET.md | xAI Grok | CUSTOM_WORKFLOW |
| 21_OPEN_MODELS_CHEAT_SHEET.md | Llama / Mistral / DeepSeek / local | CUSTOM_WORKFLOW |

Status tag legend: VERIFIED_LOCAL, VERIFIED_DOCS, USER_PROVIDED_UNVERIFIED, CUSTOM_WORKFLOW, LIKELY_NATIVE_UNVERIFIED, UNKNOWN, DEPRECATED.

## 4. Mental Models (One Paragraph Each)

### Claude Code (file 15)
Treat Claude Code as a disciplined senior engineer that lives inside your terminal. It reads the repo, edits files in place, runs tools, and is unusually careful about not fabricating output. Best when you want code that compiles, tests that actually run, and changes that respect existing architecture. Status: CUSTOM_WORKFLOW for guidance, LIKELY_NATIVE_UNVERIFIED for specific commands until checked against official docs.

### ChatGPT (file 16)
Treat ChatGPT as the broadest generalist with the deepest ecosystem of tools - file upload, image generation, voice, custom GPTs, projects, and memory. Strongest when you need wide coverage of skills in one place. Weakest when you need deep, current, citation-grade research or large-repo coding. Status: LIKELY_NATIVE_UNVERIFIED for feature availability, which varies by plan.

### Claude.ai (file 17)
Treat Claude.ai as a careful long-context thinker with excellent writing, reasoning, and document analysis. Strongest for nuanced text work, long documents, and structured reasoning. Weakest for live web data unless the operator explicitly enables web search and verifies sources. Status: LIKELY_NATIVE_UNVERIFIED.

### Gemini (file 18)
Treat Gemini as Google's integrated assistant - tight ties to Search, Workspace (Docs, Gmail, Drive), and YouTube. Strongest when your workflow is already in Google's ecosystem or when you need grounded answers tied to Google Search. Weakest when you need adversarial reasoning or strict instruction following on edge cases. Status: LIKELY_NATIVE_UNVERIFIED.

### Perplexity (file 19)
Treat Perplexity as a search engine that thinks. Strongest for current events, citation-backed research, comparison shopping, and quick fact lookups. Weakest as a long-form writing partner or coding agent. Status: LIKELY_NATIVE_UNVERIFIED.

### Grok (file 20)
Treat Grok as a real-time, X-platform-aware chat model with a looser tone. Strongest for current X / social signals and casual exploration. Weakest for formal compliance work and structured engineering. Status: LIKELY_NATIVE_UNVERIFIED.

### Open Models - Llama, Mistral, DeepSeek (file 21)
Treat open models as the privacy / cost / customization tier. Strongest when data must not leave your hardware, when you want fine-tuning, or when you need cheap bulk inference. Weakest when you need the absolute frontier of reasoning quality. Status: LIKELY_NATIVE_UNVERIFIED for hosted endpoints; VERIFIED_LOCAL only after you have actually run a given checkpoint on your hardware.

## 5. Comparison Matrix

All cells below are LIKELY_NATIVE_UNVERIFIED unless marked otherwise. Verify against current product pages before relying on any single cell.

| Platform | Best For | Weak For | Native Web | Native Code | Native Files | Notable Modes |
| --- | --- | --- | --- | --- | --- | --- |
| Claude Code | Repo-scale coding, refactors, audits | Image generation, casual chat | Limited (depends on tools / MCP) | Yes (first-class) | Yes (reads / writes repo) | Plan mode, agent mode |
| ChatGPT | Generalist, multimodal, ecosystem | Repo-scale code, strict citations | Yes (varies by plan) | Yes (varies) | Yes | Voice, Image, Custom GPTs, Projects |
| Claude.ai | Long-context writing, reasoning, docs | Live web by default | Optional (web search toggle) | Yes (artifacts) | Yes | Projects, Artifacts |
| Gemini | Google Workspace, grounded answers | Strict instruction edge cases | Yes (Search-grounded) | Yes | Yes | Deep Research, Workspace integration |
| Perplexity | Cited research, current info | Long-form writing, agents | Yes (core feature) | Limited | Limited | Focus modes, Pro Search |
| Grok | X / social context, real-time | Compliance, formal output | Yes (X-integrated) | Limited | Limited | Fun / Regular mode |
| GitHub Copilot | In-IDE code completion | Multi-file reasoning | Limited | Yes (first-class) | IDE files | Chat, edits, agents |
| Cursor | IDE-native repo edits | Non-code tasks | Yes (via web tool) | Yes (first-class) | Yes | Composer, agent |
| Llama (open) | Local / private inference | Frontier reasoning | None native | Via tooling | Via tooling | Self-hosted |
| Mistral (open) | EU-friendly hosted / local | Bleeding-edge benchmarks | Optional | Via tooling | Via tooling | Hosted + open weights |
| DeepSeek | Cheap reasoning + code | Long-context image work | Limited | Yes | Limited | Reasoning variants |

## 6. Selection Heuristics

- If you want code that compiles inside your repo with tests run for you: Claude Code.
- If you want one tool that does the most things acceptably: ChatGPT.
- If you want a careful long document partner: Claude.ai.
- If you want Google-grounded answers next to Docs and Gmail: Gemini.
- If you want sourced answers on current events: Perplexity.
- If you want X-aware real-time chat: Grok.
- If data cannot leave your hardware: Llama or Mistral local; DeepSeek if hosted is allowed.

## 7. Status Tag Glossary

| Tag | Meaning |
| --- | --- |
| VERIFIED_LOCAL | Observed working on the operator's own machine in this session. |
| VERIFIED_DOCS | Confirmed against the vendor's published documentation. |
| USER_PROVIDED_UNVERIFIED | Supplied by the operator; not independently confirmed. |
| CUSTOM_WORKFLOW | A recipe or pattern authored in this manual, not a vendor feature. |
| LIKELY_NATIVE_UNVERIFIED | Plausibly a real vendor feature based on broader documentation conventions, but not confirmed in this run. |
| UNKNOWN | Insufficient information; do not rely on without verification. |
| DEPRECATED | Was a vendor feature; has been removed or replaced. |

## 8. Cross-Cutting Risks

- Hidden chain-of-thought: never instruct any model to reveal private scratchpad. Ask for a reasoning summary.
- Hallucinated APIs: any code suggestion must compile and be tested before trust.
- Stale knowledge: model training cutoffs lag reality; verify version-sensitive answers.
- Data egress: hosted models send your prompt off-device. For sensitive data, prefer local or contracted endpoints.

## 9. Verification Workflow For Any Cell In This Matrix

1. Open the vendor's current documentation page.
2. Confirm the feature exists in the plan tier you actually have.
3. Test the smallest possible example in your own account.
4. Upgrade the status tag from LIKELY_NATIVE_UNVERIFIED to VERIFIED_DOCS or VERIFIED_LOCAL.
5. Record the date next to the tag so you can re-verify after vendor updates.

## 10. How To Read The Downstream Files

Files 15 through 21 all follow this 20-section universal structure:

1. Best For
2. Weak For
3. Mental Model
4. Best Use Cases
5. Prompt Style That Works Best
6. Native Features
7. Commands / Shortcuts / UI Controls
8. File Handling
9. Web / Research Ability
10. Coding Ability
11. Automation Ability
12. Memory / Project Context
13. Privacy / Safety Notes
14. Power User Workflows
15. Common Mistakes
16. Recovery Commands
17. Best Prompts
18. Verification Checklist
19. Unknown / Unverified Features
20. Summary

All command tables in those files use the columns: Command, Purpose, Status, Notes, Safer Alternative.

## 11. Update Policy

- Re-verify each downstream cheat sheet quarterly.
- When a vendor renames or deprecates a feature, mark it DEPRECATED rather than deleting it; readers need the migration trail.
- When the operator confirms a command works, upgrade its tag to VERIFIED_LOCAL with a date.

## 12. Companion Files

- 15_CLAUDE_CODE_CHEAT_SHEET.md
- 16_CHATGPT_CHEAT_SHEET.md
- 17_CLAUDE_AI_CHEAT_SHEET.md (future)
- 18_GEMINI_CHEAT_SHEET.md (future)
- 19_PERPLEXITY_CHEAT_SHEET.md (future)
- 20_GROK_CHEAT_SHEET.md (future)
- 21_OPEN_MODELS_CHEAT_SHEET.md (future)

## 13. Summary

This index is a switchboard. It does not replace the per-platform files. When in doubt, pick the platform whose Best For column matches your job and whose Weak For column does not. Always treat command lists as LIKELY_NATIVE_UNVERIFIED until you have either tested locally or read current vendor docs. Web verification was not available in this run; status tags reflect that honestly.
