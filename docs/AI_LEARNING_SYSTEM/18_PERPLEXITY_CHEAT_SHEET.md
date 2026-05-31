# 18 - Perplexity Cheat Sheet

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

- Web research with inline citations.
- Current events and time-sensitive lookups.
- Competitor and market research with source discovery.
- Finding primary sources behind a claim or headline.
- Comparing how multiple outlets report the same event.
- Rapid literature scan: papers, blog posts, docs, press releases.
- Building a sourced brief before deeper analysis in another tool.

## 2. Weak For

- Private files unless you explicitly upload them.
- Long autonomous coding workflows.
- Deep multi-file refactors and IDE-style edits.
- Paywalled content: many sources are inaccessible or partial.
- Reasoning that requires deterministic computation; treat numerical results as drafts.
- Replacing a domain expert. Treat output as evidence to read, not as the final answer.

## 3. Mental Model

Perplexity is a research engine layered on top of a language model. Each answer is a short synthesis of fetched web pages, with citations. Treat it as a fast research analyst: it finds, fetches, summarizes, and cites. It is not a knowledge oracle, and it is not a coding agent. Your job is to read the citations, weigh source quality, and decide what is actually true.

For deep work, drive it with structured prompts that demand primary sources, date stamps, and an explicit separation between facts and inference.

## 4. Best Use Cases

- "What happened with X this week?" - news synthesis with sources.
- "Who are the top competitors for [product]? Cite each." - competitive landscape.
- "Find primary sources for this claim: [claim]." - source discovery.
- "Summarize the academic literature on [topic] from the last 5 years." - lit scan.
- "What is the current pricing for [vendor]?" - vendor and pricing research.
- "Compare how outlet A, outlet B, and outlet C reported [event]." - bias comparison.
- "Build a sourced briefing on [person or company] before a meeting." - prep work.

## 5. Prompt Style That Works Best

- Demand primary sources first, secondary sources second, opinion last.
- Force a separation between "fact" and "inference."
- Always ask for publication dates and authors when relevant.
- Ask for contradictions across sources. Do not let the model present a false consensus.
- Ask for the strongest counterargument or the strongest competing source.
- Ask for a ranked evidence table, not a flowing paragraph.
- Specify time window: "Use sources from the last 90 days only."

## 6. Native Features

| Feature | Purpose | Status | Notes |
|---|---|---|---|
| Quick search | Default sourced answer | LIKELY_NATIVE_UNVERIFIED | Fast, shallow |
| Pro Search | Multi-step search with follow-up queries | LIKELY_NATIVE_UNVERIFIED | Paid tier feature on most plans |
| Deep Research | Long-running multi-step research with a report | LIKELY_NATIVE_UNVERIFIED | Output is a structured report |
| Focus modes | Restrict the search corpus | LIKELY_NATIVE_UNVERIFIED | Examples below |
| Web focus | General web search | LIKELY_NATIVE_UNVERIFIED | |
| Academic focus | Restrict to scholarly sources | LIKELY_NATIVE_UNVERIFIED | |
| Social / discussion focus | Restrict to community discussion sources | LIKELY_NATIVE_UNVERIFIED | |
| Video focus | Search video platforms | LIKELY_NATIVE_UNVERIFIED | |
| File upload | Ask questions over an uploaded file | LIKELY_NATIVE_UNVERIFIED | |
| Collections / Spaces | Group threads and sources | LIKELY_NATIVE_UNVERIFIED | Naming varies |
| Threaded follow-ups | Drill deeper without re-stating context | LIKELY_NATIVE_UNVERIFIED | |
| Model selection | Choose underlying LLM | LIKELY_NATIVE_UNVERIFIED | Available on paid tiers |
| Share thread | Public share of a research thread | LIKELY_NATIVE_UNVERIFIED | |

## 7. Commands / Shortcuts / UI Controls

WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

| Command | Purpose | Status | Notes | Safer Alternative |
|---|---|---|---|---|
| Pro Search toggle | Enable multi-step search | LIKELY_NATIVE_UNVERIFIED | UI control | "Do a multi-step search and cite every claim." |
| Deep Research mode | Long-running research report | LIKELY_NATIVE_UNVERIFIED | UI control | "Produce a deep, sourced research report on..." |
| Focus: Web | General sources | LIKELY_NATIVE_UNVERIFIED | | "Search the open web." |
| Focus: Academic | Scholarly only | LIKELY_NATIVE_UNVERIFIED | | "Restrict to peer-reviewed and preprint sources." |
| Focus: Social | Forum and community sources | LIKELY_NATIVE_UNVERIFIED | | "Restrict to community discussion sources." |
| Focus: Video | Video platforms | LIKELY_NATIVE_UNVERIFIED | | "Search video platforms only." |
| Attach file | Upload PDF or doc for Q&A | LIKELY_NATIVE_UNVERIFIED | UI control | Paste relevant excerpts |
| Collections / Spaces | Group related threads | LIKELY_NATIVE_UNVERIFIED | UI control | Keep an external research log |
| Model selector | Choose underlying LLM | LIKELY_NATIVE_UNVERIFIED | UI control | |
| Share link | Make a thread public | LIKELY_NATIVE_UNVERIFIED | UI control | Export to Markdown |
| Copy with citations | Export answer with sources | LIKELY_NATIVE_UNVERIFIED | UI control | |

## 8. File Handling

- File upload supports common document formats. (LIKELY_NATIVE_UNVERIFIED)
- For long PDFs, ask for a structured outline before drilling in.
- Combine uploaded files with web research by stating: "Treat the attached file as ground truth. Use the web only to fill specific gaps I name."
- Do not upload confidential or regulated content unless you have explicit permission.

## 9. Web / Research Ability

This is the core strength. Best practices:

- Always ask for publication dates and authors.
- Always ask whether sources contradict each other.
- Always ask the model to rate source quality and explain the rating.
- Always ask for at least one strong counterargument or dissenting source.
- For any number (price, market size, growth rate), demand the original source plus methodology.
- For breaking news, demand timestamps and freshness.

The research prompt (paste as-is and fill in the topic):

> Research [topic]. Use primary sources first. Separate facts from inference. Include publication dates, source quality, contradictions, and uncertainties. Return a ranked evidence table.

## 10. Coding Ability

- Useful for finding code examples and documentation across the web.
- Not a substitute for an IDE agent that edits files in place.
- Good for "what is the current recommended way to do X with library Y as of [year]" because of fresh sources.
- Verify any code snippet against the library's official docs before running it.

## 11. Automation Ability

- Not an automation platform by itself.
- Useful as a research step inside a larger workflow: feed its output into a doc, brief, or downstream agent.
- API access for sourced answers exists on some tiers. (LIKELY_NATIVE_UNVERIFIED) Treat it as a search backend, not as a write-action agent.

## 12. Memory / Project Context

- Threads keep short-term context across follow-ups.
- Collections or Spaces group related threads. (LIKELY_NATIVE_UNVERIFIED)
- Long-running memory across sessions is limited. Keep your own research log outside the tool.

## 13. Privacy / Safety Notes

- Queries can be logged and used to improve the product unless your plan or settings prevent it. Check your account.
- Shared thread links are public. Do not share threads containing private or sensitive content.
- Uploaded files may be retained per the product's policy. Confirm before uploading client or regulated data.
- Citations point to live URLs. Open and read them; do not trust a summary blindly.

## 14. Power User Workflows

- Source discovery: "Find the original primary source for this claim: [claim]. Then list three independent secondary confirmations. Mark each as primary or secondary and include publication dates."
- Competitor landscape: "List the top 8 competitors for [product]. For each: one-line description, pricing if public, primary differentiator, last news event with date, and source URLs."
- Claim verification: "Verify this claim against the open web: [claim]. Return a table: Supporting Sources, Contradicting Sources, Source Quality (high / medium / low), Verdict (supported / mixed / contradicted)."
- Bias comparison: "Find three coverage pieces on [event] from outlets of different editorial stances. Summarize each. Identify framing differences and any factual disagreements."
- Vendor due diligence: "Build a sourced brief on [company]: founders, funding history with dates and amounts, current product lines, customer references, known incidents, last 90 days of news. Cite everything."
- Literature scan: "Survey peer-reviewed work on [topic] from the last five years. Group by sub-question. Note consensus, open questions, and contradictions. Cite each paper with year."
- Pre-meeting briefing: "Build a one-page briefing on [person]: role, recent statements, recent press, public projects, anything I should not bring up. Sources required."

## 15. Common Mistakes

- Trusting the synthesis without opening the citations.
- Asking vague questions ("tell me about X") instead of structured ones.
- Letting the tool claim consensus when sources actually disagree.
- Forgetting time bounds. "Latest" without a window can return year-old material.
- Using Perplexity for math-heavy answers without independent computation.
- Sharing threads that contain private context.
- Asking for "your sources" without asking how strong each source is.

## 16. Recovery Commands

| Move | Purpose | Status |
|---|---|---|
| "List every URL you actually used. For each, give a source quality rating and a reason." | Force citation audit | CUSTOM_WORKFLOW |
| "Re-answer only with primary sources. Drop opinion and aggregator sites." | Tighten source quality | CUSTOM_WORKFLOW |
| "Where do the sources disagree? Show the disagreement explicitly." | Surface contradiction | CUSTOM_WORKFLOW |
| "What is the strongest counterargument and who makes it?" | Steel-man the opposing view | CUSTOM_WORKFLOW |
| "Restrict to sources published in the last 90 days." | Freshness control | CUSTOM_WORKFLOW |
| "Give a brief reasoning summary explaining how you weighted these sources." | Reasoning visibility without raw chain-of-thought | CUSTOM_WORKFLOW |

## 17. Best Prompts

- The research prompt: "Research [topic]. Use primary sources first. Separate facts from inference. Include publication dates, source quality, contradictions, and uncertainties. Return a ranked evidence table."
- Claim check: "Verify the claim: '[claim]'. Return: Verdict (supported / mixed / contradicted / unverifiable), Top 3 supporting URLs with dates, Top 3 contradicting URLs with dates, Source quality rating per URL, Residual uncertainty."
- Competitor scan: "List the top competitors for [product]. For each, give: name, URL, pricing if public, target segment, last funding event with date, primary differentiator, source URLs."
- Source ranking: "For [topic], rank the 10 most authoritative sources. For each, give: URL, type (primary / secondary / opinion), authority signal, last update date."
- Time-bounded brief: "Summarize developments on [topic] from [date] to [date]. Group by week. Cite every claim. Note what is still unresolved."
- Pre-purchase: "I am evaluating [product or service]. Give independent reviews from the last 12 months. Include both positive and critical pieces. Note any recurring complaints."

## 18. Verification Checklist

- Did I open at least the top three citations and confirm them?
- Did I check publication dates on every load-bearing claim?
- Did I look for at least one dissenting source?
- Did I check whether a paywall truncated the model's view of a source?
- Did I separate facts from inference in the model's answer?
- Did I avoid trusting numbers without methodology?
- Did I avoid sharing the thread if it contains private context?

## 19. Unknown / Unverified Features

- Exact list of focus modes available on a given tier - LIKELY_NATIVE_UNVERIFIED.
- Whether Deep Research is available on the user's plan - UNKNOWN in this run.
- Underlying model options per tier - UNKNOWN in this run.
- API rate limits and retention policies - UNKNOWN in this run.
- File upload size and format ceilings - UNKNOWN in this run.
- Whether Collections / Spaces support shared editing - UNKNOWN in this run.

## 20. Summary

Perplexity is a sourced-research engine. Drive it with structured prompts that demand primary sources, date stamps, source-quality ratings, and explicit contradictions. Use Pro Search and Deep Research where available for harder questions. Never trust the synthesis without opening the citations. Combine it with a writing tool or coding agent downstream; do not expect it to replace either.
