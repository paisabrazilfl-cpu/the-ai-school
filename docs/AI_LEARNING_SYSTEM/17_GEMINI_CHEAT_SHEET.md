# 17 - Gemini Cheat Sheet

Part of the AI_LEARNING_SYSTEM manual. Companion to the core platform comparison files.

Status tags used in this document:
- VERIFIED_LOCAL - confirmed from local repo evidence in this run
- VERIFIED_DOCS - confirmed from official documentation accessed in this run
- USER_PROVIDED_UNVERIFIED - asserted by the user but not independently verified
- CUSTOM_WORKFLOW - fan-name or user-coined pattern, not an official feature
- LIKELY_NATIVE_UNVERIFIED - plausibly a real platform feature, not verified here
- UNKNOWN - cannot confirm or deny
- DEPRECATED - confirmed retired or replaced

---

## 1. Best For

- Google Workspace integration when explicitly connected: Gmail, Drive, Docs, Sheets, Calendar. (LIKELY_NATIVE_UNVERIFIED)
- Multimodal reasoning across image, audio, video, and text in a single prompt. (LIKELY_NATIVE_UNVERIFIED)
- Long-context document analysis (large context window). (LIKELY_NATIVE_UNVERIFIED)
- YouTube content reasoning where the platform supports URL ingestion. (LIKELY_NATIVE_UNVERIFIED)
- Cross-document synthesis when files live in Drive. (LIKELY_NATIVE_UNVERIFIED)
- Spreadsheet reasoning, formula generation, and tabular pattern detection. (LIKELY_NATIVE_UNVERIFIED)

## 2. Weak For

- Any Workspace surface you have not explicitly connected or granted permission to. (LIKELY_NATIVE_UNVERIFIED)
- Private corporate documents under enterprise policy lockdown. (LIKELY_NATIVE_UNVERIFIED)
- Current-events factual claims without an active browsing or grounding step. (LIKELY_NATIVE_UNVERIFIED)
- Deep autonomous coding agents compared to dedicated IDE tools. (LIKELY_NATIVE_UNVERIFIED)
- Strict deterministic JSON output without explicit schema instructions. (LIKELY_NATIVE_UNVERIFIED)
- Replacing NotebookLM for source-grounded notebook reasoning (see section 6). (LIKELY_NATIVE_UNVERIFIED)

## 3. Mental Model

Treat Gemini as a multimodal reasoner that can optionally reach into Google Workspace surfaces when permission is granted. Without connections, it behaves as a general assistant with image, audio, and video understanding. With connections, it becomes a Workspace co-pilot that can read and reason over your Gmail, Drive, Docs, and Sheets in-session.

NotebookLM is a separate Google product that grounds answers strictly in user-supplied sources and produces citations. Gemini is broader and less source-strict. Pick NotebookLM when grounding to fixed sources matters; pick Gemini when synthesis, multimodality, or Workspace actions matter. (LIKELY_NATIVE_UNVERIFIED)

## 4. Best Use Cases

- Gmail triage: summarize unread, surface action items, draft replies.
- Sheet analysis: detect column meaning, suggest formulas, summarize trends.
- Drive search and synthesis: locate files by topic, summarize across many.
- Docs co-writing: rewrite, condense, expand, restructure.
- YouTube summarization and timestamp extraction (where URL ingestion is supported).
- Calendar reasoning: prepare for upcoming meetings using related Docs and threads.
- Cross-modal tasks: image plus spec doc, video plus transcript, screenshot plus log.

## 5. Prompt Style That Works Best

- State the surface explicitly (Gmail, Drive, Doc title, Sheet tab) so the model targets the right context.
- Provide a role, a goal, constraints, and a desired output shape.
- For Sheets, name the columns, the row range, and the metric.
- For Gmail, specify time window, sender filters, and what counts as "important."
- For YouTube, give the URL and the slice you care about (whole video, intro, a timestamp range).
- Ask for a reasoning summary, not chain-of-thought. Phrase it as: "Give a brief reasoning summary, then the answer."
- Force structure: "Return a Markdown table with columns X, Y, Z."

## 6. Native Features

| Feature | Purpose | Status | Notes |
|---|---|---|---|
| Workspace connection (Gmail/Drive/Docs/Sheets/Calendar) | In-session access to user data | LIKELY_NATIVE_UNVERIFIED | Requires explicit user permission |
| Image understanding | Analyze uploaded or pasted images | LIKELY_NATIVE_UNVERIFIED | Multimodal core capability |
| Audio understanding | Transcribe and reason over audio | LIKELY_NATIVE_UNVERIFIED | |
| Video understanding | Reason over video frames and audio | LIKELY_NATIVE_UNVERIFIED | |
| Long-context window | Hold large documents in one prompt | LIKELY_NATIVE_UNVERIFIED | |
| Code execution / data analysis tool | Run code on uploaded data | LIKELY_NATIVE_UNVERIFIED | Availability varies by surface |
| Grounded answers via search | Reduce hallucination on current facts | LIKELY_NATIVE_UNVERIFIED | Often toggle or automatic |
| Gems (custom assistants) | Persistent personas with instructions | LIKELY_NATIVE_UNVERIFIED | |
| Canvas-style co-editing | Iterative document or code surface | LIKELY_NATIVE_UNVERIFIED | |
| Deep Research mode | Multi-step browsing and synthesis | LIKELY_NATIVE_UNVERIFIED | |
| NotebookLM (separate product) | Source-grounded notebooks with citations | LIKELY_NATIVE_UNVERIFIED | Different product, not Gemini chat |

## 7. Commands / Shortcuts / UI Controls

WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

| Command | Purpose | Status | Notes | Safer Alternative |
|---|---|---|---|---|
| @gmail | Target Gmail as a context source | LIKELY_NATIVE_UNVERIFIED | Exact syntax varies by surface | Plain English: "in my Gmail, find..." |
| @drive | Target Drive files | LIKELY_NATIVE_UNVERIFIED | | "In Google Drive, search for..." |
| @docs | Target a specific Doc | LIKELY_NATIVE_UNVERIFIED | | Paste the Doc URL |
| @sheets | Target a specific Sheet | LIKELY_NATIVE_UNVERIFIED | | Paste the Sheet URL plus tab |
| @calendar | Target Calendar events | LIKELY_NATIVE_UNVERIFIED | | "Look at my next 7 days" |
| @workspace | Broad Workspace context | LIKELY_NATIVE_UNVERIFIED | May or may not exist as a literal token | Name the specific app instead |
| @youtube | Target a YouTube URL | LIKELY_NATIVE_UNVERIFIED | Paste URL directly is more reliable | Paste the URL |
| Deep Research toggle | Multi-step research | LIKELY_NATIVE_UNVERIFIED | UI control | Ask: "Do deep research on..." |
| Canvas / co-edit mode | Open an editing surface | LIKELY_NATIVE_UNVERIFIED | UI control | |
| Code execution toggle | Enable Python-style tools | LIKELY_NATIVE_UNVERIFIED | UI control | |
| Voice input | Spoken prompts | LIKELY_NATIVE_UNVERIFIED | | Type instead |
| Pin / save chat | Persist a thread | LIKELY_NATIVE_UNVERIFIED | | Export the thread |
| Gems | Custom assistant configs | LIKELY_NATIVE_UNVERIFIED | | Use a system prompt template |
| Share chat link | Public share of a conversation | LIKELY_NATIVE_UNVERIFIED | | Copy text manually |
| BOS_BOOT | User boot prompt to set persona, scope, and verification rules | CUSTOM_WORKFLOW | Not an official feature; it is a paste-in system prompt | |
| THINK_MAX | User flag asking for maximum reasoning summary | CUSTOM_WORKFLOW | Not an official feature; phrase as "give the most thorough reasoning summary you can" | |
| JSON_ONLY | User flag forcing JSON-only output | CUSTOM_WORKFLOW | Not an official feature; instead say "Return JSON only, no prose, conforming to this schema: ..." | |

## 8. File Handling

- Upload formats commonly supported: PDF, images, text, common Office formats, audio, video. (LIKELY_NATIVE_UNVERIFIED)
- Drive integration lets you reference files without re-uploading when connected. (LIKELY_NATIVE_UNVERIFIED)
- Sheets reasoning is stronger when you paste a small table or point to a specific tab and range.
- Large PDFs: ask for a structured outline first, then drill into sections by page range.
- For images, name what to look for ("read the error in the screenshot," "describe the chart axes").
- Audio and video: state whether you want transcript, summary, timestamps, or extraction.

## 9. Web / Research Ability

- Browsing and grounded search are available on certain surfaces and toggles. (LIKELY_NATIVE_UNVERIFIED)
- Deep Research mode performs multi-step browsing and produces a report. (LIKELY_NATIVE_UNVERIFIED)
- Citations may appear inline as links. Always click and verify before trusting.
- Stale results are still possible if the model answers from prior training without browsing.
- For time-sensitive facts, explicitly say: "Use live web sources. Include URLs and publication dates."

## 10. Coding Ability

- Strong for explanation, refactoring suggestions, and small to medium edits.
- Code execution tool, where enabled, can run Python on uploaded data. (LIKELY_NATIVE_UNVERIFIED)
- Not a substitute for an IDE agent that indexes and edits a full repo.
- For multi-file work, paste the relevant files or use a dedicated coding agent.

## 11. Automation Ability

- Workspace actions (drafting, summarizing, extracting) are the strongest automation surfaces. (LIKELY_NATIVE_UNVERIFIED)
- Direct write-actions (send email, modify Sheet, create Calendar event) depend on the specific surface, permissions, and feature availability. Confirm in the UI before assuming a destructive action will execute. (LIKELY_NATIVE_UNVERIFIED)
- For scripted automation, prefer Apps Script or the official APIs and let Gemini generate the script.

## 12. Memory / Project Context

- Persistent memory across sessions is available on some surfaces. (LIKELY_NATIVE_UNVERIFIED)
- Gems persist instructions and persona per assistant. (LIKELY_NATIVE_UNVERIFIED)
- Treat memory as opt-in and inspectable. Clear or edit memories you do not want carried forward.
- Long threads can drift; restate the goal periodically and re-anchor to the current artifact.

## 13. Privacy / Safety Notes

- Workspace connections grant Gemini read access to potentially sensitive content. Review scopes before connecting.
- Enterprise tenants may restrict data flow; do not assume consumer behavior matches workspace behavior.
- Shared chat links can leak content. Avoid sharing chats that contain private data.
- Do not paste secrets (API keys, passwords, internal URLs) unless you accept the risk.
- For minors or regulated industries, confirm policy before uploading client or patient data.

## 14. Power User Workflows

- Inbox triage: "Look at my unread Gmail from the last 48 hours. Group by sender. Flag anything with a deadline, dollar amount, or request. Output a table with columns: Sender, Subject, Action, Deadline, Priority."
- Sheet diagnosis: "Open Sheet [URL], tab [name], range A1:Z. Infer column meaning. List anomalies, missing values, and the three most useful pivots. Suggest formulas."
- YouTube to brief: "Watch [URL]. Give a 200-word summary, then a 10-point timestamped outline."
- Drive synthesis: "Find all Docs in Drive tagged 'Q2 plan.' Summarize each in three bullets. Build a cross-doc consolidated outline."
- Doc rewrite: "Rewrite [Doc URL] at a senior-exec reading level. Cut 40 percent. Preserve all numbers and dates. Track the changes you made in a list at the end."
- Calendar prep: "For each meeting in the next 48 hours, find related Docs and emails. Produce a one-page brief per meeting."
- Image plus log debug: "Here is a screenshot and a log. Tell me what failed and propose three fixes ranked by likelihood."

## 15. Common Mistakes

- Assuming Workspace access without connecting it. The model will guess instead of read.
- Pasting a Sheet URL but no range; the model may answer about the wrong tab.
- Asking for "the latest" without enabling browsing or grounding.
- Treating Gemini as NotebookLM. Use NotebookLM when source-grounded citations are mandatory.
- Letting the thread drift across tasks. Start fresh for unrelated work.
- Requesting "show your chain-of-thought." Ask for a reasoning summary instead.
- Trusting an answer about your Drive when no Drive was attached.

## 16. Recovery Commands

| Move | Purpose | Status |
|---|---|---|
| "Stop. Confirm what sources you actually used to answer." | Force grounding check | CUSTOM_WORKFLOW |
| "Re-answer using only the attached file. Quote the exact lines you relied on." | Anchor to source | CUSTOM_WORKFLOW |
| "List unknowns and what you would need to be confident." | Surface uncertainty | CUSTOM_WORKFLOW |
| "Reset context. Treat the next message as the start of a fresh task." | Drift control | CUSTOM_WORKFLOW |
| "Reply only with JSON conforming to this schema. No prose." | Structure recovery | CUSTOM_WORKFLOW |
| "Give a brief reasoning summary, then the final answer." | Reasoning visibility without raw chain-of-thought | CUSTOM_WORKFLOW |

## 17. Best Prompts

- Gmail triage: "Review my unread Gmail from the past 48 hours. Output a Markdown table: Sender, Subject, Action Required, Deadline, Priority (P1-P3), Suggested Reply (one line). Skip newsletters unless they contain a personal action item."
- Sheet analysis: "Sheet: [URL]. Tab: [name]. Range: A1:Z[N]. Identify the meaning of each column. List the three strongest trends and three anomalies. Propose formulas for: running total, week-over-week delta, top-N by category. Return Markdown."
- YouTube summary: "Video: [URL]. Produce: (a) 150-word abstract, (b) 10-point timestamped outline, (c) three quoted moments with timestamps, (d) one critique."
- Drive search: "Search Drive for documents about [topic] modified in the last 90 days. List title, owner, last modified, and a one-line summary. Rank by likely relevance."
- Workspace automation draft: "I want to auto-summarize new emails labeled 'Clients' into a daily Doc. Draft the Apps Script. Explain each step. Mark any permission scopes I need to grant."
- Cross-modal: "Here is a screenshot of an error and the log file. Diagnose the failure. Give three ranked hypotheses with the evidence in the screenshot or log that supports each."

## 18. Verification Checklist

- Did I connect the Workspace surface I am asking about?
- Did I provide URLs, tab names, and ranges instead of vague references?
- Did I ask for citations or source links for any factual claim?
- Did I confirm the model browsed when I needed current info?
- Did I review the proposed action before allowing any write?
- Did I check memory settings if I do not want this stored?
- Did I avoid asking for raw chain-of-thought and instead ask for a reasoning summary?

## 19. Unknown / Unverified Features

- Exact tokens like @gmail, @drive, @workspace, @youtube as literal commands - LIKELY_NATIVE_UNVERIFIED.
- Specific context window sizes for each Gemini variant - UNKNOWN in this run.
- Availability of code execution per tier - UNKNOWN in this run.
- Whether Deep Research is available on a given user account - UNKNOWN in this run.
- Whether Workspace write-actions (send mail, modify Sheet) are enabled by default - LIKELY_NATIVE_UNVERIFIED.
- Whether Gems can call tools or browse - UNKNOWN in this run.

## 20. Summary

Gemini is a Workspace-aware multimodal assistant. Its strongest plays are Gmail triage, Sheet analysis, Drive synthesis, YouTube reasoning, and cross-modal debugging, all conditional on explicit connections and permissions. Treat NotebookLM as a separate, source-grounded tool. Verify every factual claim. Prefer reasoning summaries over raw chain-of-thought. Tag every command you have not personally confirmed in your account today as unverified.
