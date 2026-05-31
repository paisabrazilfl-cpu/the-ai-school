# 16 - ChatGPT Cheat Sheet

Status tag legend: VERIFIED_LOCAL, VERIFIED_DOCS, USER_PROVIDED_UNVERIFIED, CUSTOM_WORKFLOW, LIKELY_NATIVE_UNVERIFIED, UNKNOWN, DEPRECATED.

---

## 1. Best For

- General-purpose chat with broad subject coverage
- Multimodal tasks: text, image input, image generation (plan-dependent), voice
- File analysis: spreadsheets, PDFs, slides, code snippets
- Quick drafting: resumes, emails, marketing copy, summaries
- Brainstorming and ideation
- Light-to-medium coding (single-file, snippet-scale)
- Custom GPTs for narrow, repeatable workflows
- Projects for grouping related chats and files
- Memory for cross-session preferences
- Translation and language tasks
- Education and tutoring across most subjects

## 2. Weak For

- Repo-scale, multi-file engineering work (use Claude Code or Cursor)
- Citation-grade research (use Perplexity or a grounded model)
- Strict instruction following on adversarial edge cases
- Real-time data without an explicit web tool
- Highly regulated outputs (legal, medical) without expert review
- Anything that depends on hidden chain-of-thought (do not request it)

## 3. Mental Model

ChatGPT is the broadest generalist with the deepest consumer-product ecosystem. Strength comes from breadth, multimodality, and the surrounding features (projects, memory, custom GPTs, voice, image). Weakness is depth on any single specialist axis. Drive it with clear role, clear output format, and clear constraints. When precision matters, force it to cite sources and to flag uncertainty.

## 4. Best Use Cases

- "Turn this transcript into a structured meeting brief."
- "Analyze this spreadsheet and tell me the three biggest cost drivers."
- "Draft a resume from this LinkedIn export targeting role X."
- "Generate marketing variants A/B/C for this product page."
- "Plan a 6-week curriculum for learning topic X with weekly milestones."
- "Translate this technical document and preserve formatting."
- "Build a custom GPT that always answers in the voice of our brand."

## 5. Prompt Style That Works Best

- Start with role: "You are a careful editor / senior analyst / patient tutor."
- State the task and the audience.
- Specify format: bullets, table, JSON, word limit.
- Add constraints: tone, must-include, must-exclude.
- Demand uncertainty surfacing: "Where you are not sure, say so."
- Ask for a reasoning summary, never hidden chain-of-thought.
- For complex tasks, ask for a plan first, then execute.

Important correction: Do NOT ask ChatGPT for hidden chain-of-thought. Use phrasing like "Show a concise reasoning summary" or "Explain the decision path without private scratchpad."

## 6. Native Features

> WEB VERIFICATION NOT AVAILABLE IN THIS RUN. All entries below are LIKELY_NATIVE_UNVERIFIED unless noted; availability varies by plan tier (Free, Plus, Pro, Team, Enterprise, Edu).

- File upload for analysis
- Voice mode (advanced and standard variants exist; availability varies)
- Image generation (availability and quotas vary by plan)
- Image input / vision
- Custom GPTs (creation typically requires a paid plan)
- Projects (group chats, files, instructions)
- Memory (persistent preferences across chats)
- Web browsing tool (availability varies)
- Python / data analysis tool (availability varies)
- Canvas / structured document editing surface
- Connectors to third-party apps (availability varies by plan)
- Shared links for conversations

## 7. Commands / Shortcuts / UI Controls

> WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

| Command | Purpose | Status | Notes | Safer Alternative |
| --- | --- | --- | --- | --- |
| Upload file (paperclip) | Attach a file for analysis | LIKELY_NATIVE_UNVERIFIED | Size and type limits vary | Paste content inline |
| Voice mode toggle | Spoken conversation | LIKELY_NATIVE_UNVERIFIED | Plan / platform dependent | Type prompts |
| Image generation request | Generate an image | LIKELY_NATIVE_UNVERIFIED | Quota and plan dependent | External image tool |
| Image input | Analyze an attached image | LIKELY_NATIVE_UNVERIFIED | OCR and reasoning | Transcribe manually |
| Custom GPTs (Explore GPTs) | Use or build a tailored assistant | LIKELY_NATIVE_UNVERIFIED | Build requires paid plan | Long system prompt |
| Projects | Group chats and files with shared instructions | LIKELY_NATIVE_UNVERIFIED | Plan dependent | Folder of saved prompts |
| Memory toggle (Settings) | Enable / disable persistent memory | LIKELY_NATIVE_UNVERIFIED | Review stored memories regularly | Per-prompt context |
| Temporary chat | Conversation excluded from history and memory | LIKELY_NATIVE_UNVERIFIED | Useful for sensitive prompts | Logged-out browser |
| Regenerate | Re-run the last response | LIKELY_NATIVE_UNVERIFIED | Same prompt, new answer | Reword prompt |
| Edit message | Modify a prior user turn and re-run | LIKELY_NATIVE_UNVERIFIED | Branches the conversation | New chat |
| Share link | Publish a read-only transcript URL | LIKELY_NATIVE_UNVERIFIED | Review content before sharing | Copy-paste excerpt |
| Model picker | Switch models per chat | LIKELY_NATIVE_UNVERIFIED | Plan dependent | Default model |
| /godmode | Folk "unlock everything" prompt | CUSTOM_WORKFLOW | Not a real command; community prompt convention | Use a real system prompt |
| /jailbreak, /devmode | Folk shortcuts | CUSTOM_WORKFLOW | Not real; do not rely | Use legitimate prompting |
| Ctrl/Cmd + Enter | Send message | LIKELY_NATIVE_UNVERIFIED | Browser-dependent | Click Send |
| Shift + Enter | Newline in input | LIKELY_NATIVE_UNVERIFIED | Standard | - |

## 8. File Handling

- Upload PDFs, spreadsheets, CSVs, code, images. Status: LIKELY_NATIVE_UNVERIFIED.
- For large files, ask for a structured extraction first, then iterate. Status: CUSTOM_WORKFLOW.
- For spreadsheets, ask it to use the data analysis tool and to show its calculations. Status: CUSTOM_WORKFLOW.
- For PDFs, request page references for every quoted fact. Status: CUSTOM_WORKFLOW.
- Do not upload secrets, regulated data, or anything you cannot share with a third party.

## 9. Web / Research Ability

- Has a browsing tool on supported plans. Status: LIKELY_NATIVE_UNVERIFIED.
- Citations should be requested explicitly and then opened by you.
- For citation-grade work, prefer Perplexity and bring the result back to ChatGPT for synthesis.
- Always ask for date of source and recency window.

## 10. Coding Ability

- Strong for single-file snippets, regexes, SQL, small refactors.
- Weak for repo-scale changes without a tight feedback loop.
- For Python, lean on the data analysis tool; ask it to run code, not just write it.
- Always require a runnable example and a test where it makes sense.
- For unfamiliar libraries, ask it to cite the function signature and to flag uncertainty.

## 11. Automation Ability

- Custom GPTs let you bake instructions, knowledge, and actions into a reusable assistant. Status: LIKELY_NATIVE_UNVERIFIED.
- Actions (API calls from a Custom GPT) require an OpenAPI spec. Status: LIKELY_NATIVE_UNVERIFIED.
- For scheduled work, use the API and an external scheduler rather than the consumer UI.
- For bulk runs, use the API with batching, not the web app.

## 12. Memory / Project Context

- Memory: a persistent store of user preferences. Status: LIKELY_NATIVE_UNVERIFIED.
- Projects: per-project instructions and files. Status: LIKELY_NATIVE_UNVERIFIED.
- Custom GPTs: per-assistant instructions and knowledge files. Status: LIKELY_NATIVE_UNVERIFIED.
- Audit memory regularly; delete stale or sensitive entries.
- For sensitive prompts, use Temporary chat.

## 13. Privacy / Safety Notes

- Prompts and files are sent to OpenAI; review your data settings.
- Memory persists across chats and can leak context; disable for sensitive work.
- Custom GPTs you publish can expose your instructions; assume the instructions are recoverable.
- Image generation has content policy restrictions.
- Do not paste credentials, API keys, or regulated PII.

## 14. Power User Workflows

### 14.1 Project-Scoped Assistant
1. Create a Project.
2. Attach 3 to 7 reference files.
3. Add project instructions covering tone, audience, format.
4. Pin a "first message" template.
5. Use that project for every chat in the workflow.

### 14.2 Plan-Then-Execute
1. Ask for a plan with milestones, risks, and acceptance criteria.
2. Review, edit, approve.
3. Execute one milestone at a time.
4. After each milestone, ask for a delta report.

### 14.3 Research-Then-Synthesize
1. Use Perplexity to gather cited sources.
2. Paste citations into ChatGPT.
3. Ask for a synthesis with caveats and an "I don't know" list.

### 14.4 Data Analysis Loop
1. Upload data.
2. Ask for a schema summary and quality issues.
3. Ask for hypothesis-driven questions.
4. Ask it to answer each with code, charts, and uncertainty notes.

### 14.5 Custom GPT Productization
1. Define audience, voice, and forbidden behaviors.
2. Write the system instructions.
3. Add 3 to 5 example dialogs.
4. Attach knowledge files.
5. Test with adversarial prompts before publishing.

## 15. Common Mistakes

- Asking for hidden chain-of-thought (forbidden; use reasoning summary).
- Treating ChatGPT as a citation engine without a browse tool open.
- Uploading sensitive files into a non-Enterprise account.
- Relying on memory for facts that change over time.
- Believing image-generation availability is uniform across plans.
- Letting Custom GPT instructions leak proprietary IP.
- Skipping the verification step on code suggestions.

## 16. Recovery Commands

| Command | Purpose | Status | Notes | Safer Alternative |
| --- | --- | --- | --- | --- |
| New chat | Reset context | LIKELY_NATIVE_UNVERIFIED | Cleanest reset | Edit a prior message |
| Edit message | Branch from an earlier turn | LIKELY_NATIVE_UNVERIFIED | Discards downstream turns | New chat |
| Regenerate | Re-run last answer | LIKELY_NATIVE_UNVERIFIED | Same prompt | Reword |
| Settings > Personalization > Memory > Manage | Delete stored memories | LIKELY_NATIVE_UNVERIFIED | Audit periodically | Disable memory |
| Temporary chat | Excluded from history | LIKELY_NATIVE_UNVERIFIED | For sensitive prompts | Logged-out session |
| Switch model | Try a different model on the same prompt | LIKELY_NATIVE_UNVERIFIED | Plan dependent | New chat |
| Delete chat | Remove from history | LIKELY_NATIVE_UNVERIFIED | May not erase server logs immediately | Data controls |

## 17. Best Prompts

### 17.1 Research
> Act as a careful analyst. Research TOPIC. Use the browse tool. For each claim, give a source URL and the date you saw it. Mark anything older than 12 months. End with a "What I could not verify" list.

### 17.2 Coding
> You are a senior engineer. I need a SMALL, RUNNABLE example in LANG that does X. Constraints: no external deps unless I name them, include one happy-path test, and flag any assumption you made. If LIB or FUNCTION may not exist, say so before writing.

### 17.3 Business Plan
> Draft a one-page business plan for IDEA targeting AUDIENCE. Sections: problem, solution, customer, channel, revenue model, costs, risks, next 30 / 60 / 90 day milestones. Be specific. No filler.

### 17.4 Resume
> Rewrite this resume for ROLE at COMPANY_TYPE. Optimize for clarity, quantified impact, and ATS keywords. Keep to one page. Output the rewritten resume only; then below, list the three biggest weaknesses I should address.

### 17.5 Legal Risk Summary
> Summarize the legal risks in this CONTRACT for a NON-LAWYER founder in JURISDICTION. Sections: termination, IP, liability, payment, exclusivity, dispute resolution, anything unusual. End with: "Issues to raise with a real lawyer." Do not give legal advice; this is a reading aid.

### 17.6 Data Analysis
> Analyze the attached spreadsheet. Step 1: describe schema and data quality issues. Step 2: propose five business questions the data can answer. Step 3: pick the most important, answer it with code, a chart, and an uncertainty note.

### 17.7 Image
> Generate an image: SUBJECT, STYLE, COMPOSITION, LIGHTING, ASPECT_RATIO. Avoid: LIST. Iterate three variants. After the first round, ask me which to refine.

### 17.8 Agent Design
> Design a Custom GPT for AUDIENCE that does TASK. Output: system instructions, three example user turns with ideal assistant replies, a knowledge file outline, a list of forbidden behaviors, and a test plan with adversarial prompts.

### 17.9 Automation
> I want to automate WORKFLOW. Map the steps. For each, say whether it is best done by ChatGPT, a Custom GPT with actions, or an external script. Provide the OpenAPI spec for any action needed. End with a build order.

### 17.10 Reasoning Summary (correct phrasing)
> Show a concise reasoning summary of how you reached the answer. Do not reveal private scratchpad or hidden chain-of-thought; a short, public-facing explanation is enough.

## 18. Feature Table

| Feature | How to Use | Best Prompt | Failure Mode | Fix |
| --- | --- | --- | --- | --- |
| File upload | Paperclip then drag a file | "Summarize this PDF with page citations" | Wrong file type or too large | Split file or convert to text |
| Voice mode | Tap the voice icon | "Have a back-and-forth on TOPIC" | Background noise misheard | Use a quiet room and type fallback |
| Image generation | Ask in chat | "Generate IMAGE with STYLE and ASPECT" | Quota hit or policy refusal | Wait, rephrase, or use a different tool |
| Vision (image input) | Attach an image | "Describe and extract any text" | Low-resolution OCR | Re-shoot at higher resolution |
| Custom GPT | Explore GPTs then My GPTs | "Use INSTRUCTIONS and KNOWLEDGE" | Leaky instructions | Treat instructions as recoverable |
| Projects | New Project | "Add files, set instructions" | Confusion across projects | One project per workflow |
| Memory | Settings then Personalization | "Remember PREFERENCE" | Stale or sensitive memory | Audit and delete monthly |
| Web browsing | Tools menu | "Browse and cite for each claim" | Hallucinated citations | Open every link yourself |
| Python / Data analysis | Tools menu | "Run code on this file" | Wrong assumption about schema | Have it print schema first |
| Canvas | Tools menu | "Open this draft in Canvas" | Formatting drift | Export and verify |
| Temporary chat | Toggle at top of new chat | "Sensitive draft, no memory" | Forgot it was temporary | Copy results out before closing |

## 19. Verification Checklist

- [ ] Plan tier confirmed for the feature you intend to use.
- [ ] Browse tool produced citations you actually opened.
- [ ] Code suggestions executed before trust.
- [ ] Memory reviewed and cleaned recently.
- [ ] Sensitive prompts used Temporary chat or a clean account.
- [ ] No hidden chain-of-thought requested; reasoning summary only.

## 20. Unknown / Unverified Features

- Specific availability of voice / image / browse on your plan: LIKELY_NATIVE_UNVERIFIED.
- Action-enabled Custom GPT behavior in your locale: LIKELY_NATIVE_UNVERIFIED.
- "/godmode" and similar viral commands: CUSTOM_WORKFLOW (not real product commands).
- Exact memory retention policy: LIKELY_NATIVE_UNVERIFIED; check current OpenAI policy.

## Summary

ChatGPT is the broadest generalist with the most surrounding product. Drive it with role, format, and constraints. Use Projects and Custom GPTs for repeatable work. Use Temporary chat for sensitive prompts. Never request hidden chain-of-thought; ask for a reasoning summary. Treat every feature here as LIKELY_NATIVE_UNVERIFIED until you confirm against your plan; web verification was not available in this run.
