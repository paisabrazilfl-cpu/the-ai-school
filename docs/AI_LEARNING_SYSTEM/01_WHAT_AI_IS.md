# 01 WHAT AI IS

A foundational explainer for what modern AI actually is, what large language models actually do, and what neither of them is. This file is long on purpose. Read it once carefully. Re-read sections when you are confused later. Most "AI mysteries" dissolve once the underlying mechanism is clear.

WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Specifics about any one model's training data, parameter count, or capabilities should be re-checked against the vendor's primary documentation before you cite them.

---

## 1. Purpose

This file exists to replace folklore with a working model. After reading it you should be able to:

1. Explain in three sentences what a large language model is and what it is doing when it produces output.
2. Distinguish training from inference and explain why that distinction matters operationally.
3. Predict the three most common failure modes (hallucination, stale knowledge, missing context) before they happen.
4. Decide, for any task, whether to give the model documents, tools, or both.
5. Understand why a confident, fluent answer is not evidence of correctness.

This is not a deep learning course. There are no derivations of softmax. The depth is calibrated for someone who will use AI, not someone who will train one.

---

## 2. Who It Is For

| Reader | What They Get From This File |
|---|---|
| Total beginner | A vocabulary and mental model that prevents 80 percent of avoidable mistakes |
| Manager | The ability to discuss AI without bluffing |
| Operator | The principles that justify the workflows in later files |
| Skeptic | A precise account of what AI is and is not, so the skepticism can be aimed correctly |
| Engineer onboarding to AI | The minimum theory you need before working with the API |

Not for:

- Researchers who already train models (this is too applied).
- People looking for a vendor comparison (see files 14 through 21).

---

## 3. Beginner Explanation

Modern AI assistants are mostly built on large language models. A large language model is a very large pattern-matching system trained to do one job: given a chunk of text, predict the next small piece of text. That small piece is called a token. A token is roughly a word fragment, sometimes a whole word, sometimes a punctuation mark.

The system has been trained on an enormous amount of text. During training, it adjusted billions of internal numbers so that its next-token predictions became closer and closer to what appears in real text. After training, the numbers are frozen. When you use the model, it is doing inference: applying those frozen numbers to your input to produce predictions, one token at a time, until it produces a stop signal or hits a length limit.

That is it. That is the whole engine. Everything else, including the appearance of reasoning, conversation, code, planning, and personality, is what emerges when next-token prediction is applied to text that includes instructions, examples, and context.

Three implications follow immediately, and these are the ones beginners must internalize:

1. The model does not know what is true. It knows what is likely to come next given the input. Likely and true are correlated, especially for well-documented topics, but they are not the same. When they diverge, the model often picks likely.

2. The model does not know the current date or current events unless that information is in its training data or you provide it. Its training data has a cutoff. Anything after that cutoff is unknown to the model unless a tool retrieves it.

3. The model does not see your files, your inbox, your database, or your screen unless the product you are using has explicitly connected those things and you have explicitly granted access. Asking "what do you think of my spreadsheet?" without sharing the spreadsheet produces invented commentary on an imagined spreadsheet.

If you remember those three implications you are already operating better than most users.

---

## 4. Operator Explanation

At the operator level, an AI assistant is a stateless function with carefully managed context. The model receives a prompt, produces tokens, and forgets. Any apparent memory across turns is the product including prior turns in the next prompt automatically. Any apparent knowledge of your documents is the product retrieving them and inserting them into the prompt.

The operational model that pays off is this:

```
input  : [system instructions] + [retrieved or attached context] + [conversation history] + [your message]
engine : pretrained weights + decoding parameters (temperature, top-p, max tokens, stop)
output : a stream of tokens until stop
```

The model is stateless across requests. Context windows have limits. Tokens cost money and latency. Tools, when available, run outside the model and return text into the next prompt. Agents are loops of plan-act-observe built on top of this same primitive.

Operationally relevant truths:

- Two identical prompts at the same temperature can still produce different outputs because of low-level non-determinism in batched inference. Status: VERIFIED_DOCS for most major providers.
- The model can be confidently wrong. Confidence in the output is a function of fluency, not of truth. A grammatically polished lie reads the same as a grammatically polished fact.
- The model has no persistent identity between sessions unless memory is explicitly enabled by the product. Even with memory, what is retained is selective and product-defined.
- The model's training data has a knowledge cutoff date. Status: VERIFIED_DOCS conceptually, but the specific date for any given model must be checked against vendor documentation.
- The model cannot run code, browse the web, or read a file unless the product gives it a tool and the tool is invoked for that turn. The presence of those abilities in one product does not imply them in another.

The operator's job is to manage the inputs (system prompt, retrieved context, attached files, parameters), structure the task into a verifiable workflow, and verify the output before acting on it.

---

## 5. Core Concepts

This section is the heart of the file. The table below is the single most useful artifact in this entire manual for a new operator. Read it once. Come back to it monthly.

### 5.1 Foundational Concepts Table

| Concept | Plain Meaning | Why It Matters | Beginner Mistake | Better Operator Behavior |
|---|---|---|---|---|
| Large Language Model | A neural network trained to predict the next token of text | Everything about behavior follows from this | Treating it as a search engine or oracle | Treat it as a fluent generator that needs grounding |
| Token | The smallest unit the model reads or writes (a word fragment, word, or punctuation) | Cost, speed, and context limits are measured here | Counting words instead of tokens | Estimate context budget in tokens; trim aggressively |
| Training | The one-time process that adjusts the model's billions of internal numbers using massive text data | Determines what the model knows by default; not updated when you chat | Believing the model learns from your chat | Use retrieval or fine-tuning for new knowledge; do not lecture the model and expect it to remember next session |
| Inference | The act of running the trained model on your input to produce output | This is what costs money per request; not the same as training | Confusing "the model learns" with "the model is using what it learned" | Track that every chat is inference; no weights change |
| Context Window | The maximum amount of text the model can read at once (input plus prior history) | If you exceed it, content is dropped or summarized; quality degrades | Pasting an entire codebase and expecting all of it to be considered equally | Retrieve only relevant chunks; structure long inputs with headings |
| Prompt | The full text the model sees on this request | The only lever you fully control | Writing one short line for a complex task | Use full ROCCO structure; include role, objective, context, constraints, output |
| System Prompt | Persistent instructions set by the product or developer | Defines defaults the user does not see | Assuming the model has no instructions before your message | Read the vendor's system prompt policy; account for tone, safety, and refusal defaults |
| Hallucination | A confident, fluent answer that is wrong or fabricated | Most common failure mode; happens more on niche, recent, or under-documented topics | Trusting fluent answers because they sound right | Verify any name, number, citation, command, or claim |
| Grounding | Forcing the model to base its output on supplied or retrieved sources | The single best defense against hallucination | Asking "is this true" without giving the source | Paste the source; require citations to it; mark anything else as UNVERIFIED |
| Retrieval | The system process of fetching relevant documents and inserting them into the prompt | What turns a model into a knowledge worker for your specific data | Believing the model already knows your private files | Use a product or workflow that retrieves; or paste the source yourself |
| Tool Use | The model calling an external function (code execution, search, API) | Enables math, current facts, real actions | Asking the model to compute large numbers without a tool | Use a mode with code execution or a calculator; verify tool output |
| Agent | A loop in which the model plans, calls tools, observes results, and continues | Where most real automation lives | Letting an agent run unbounded on production systems | Bound the budget; require dry-runs; review the plan before execution |
| Temperature | A decoding parameter that controls randomness | Lower for facts and code, higher for ideation | Leaving it at default for everything | Set deliberately per task; document the choice |
| Top-p (nucleus sampling) | Another randomness control, limits sampling to the most likely tokens summing to p | Interacts with temperature; finer control | Tuning blindly | Change one parameter at a time; record the effect |
| Knowledge Cutoff | The latest date the training data reflects | After this date, the model does not know events natively | Asking about yesterday's news without enabling search | Use a search-enabled mode or paste the news in |
| Hallucination Cluster: Names, Dates, Citations | The three categories where hallucination is most common | These are the categories that destroy trust fastest | Quoting a citation the model produced | Verify every citation against the actual document |
| Reasoning Summary | A short, post-hoc explanation of how the model arrived at the output | Useful for debugging and audit; never ask for hidden chain-of-thought | Asking for "internal monologue" or "private thoughts" | Ask for a reasoning summary or an explanation of the decision path |
| Multimodal Input | The ability to accept images, audio, or other non-text inputs | Expands what you can do, also expands what can go wrong | Pasting a screenshot and assuming the model read every word | Confirm extraction; ask the model to list what it can see |
| Structured Output | Output that conforms to a schema such as JSON | Required for automation; reduces ambiguity | Asking for JSON and getting prose around it | Specify the exact schema; require "JSON only, no preamble" |
| Embeddings | A numeric representation of meaning, used for retrieval | Powers vector search and semantic similarity | Confusing embeddings with the chat model | Use embeddings to find relevant chunks, then ask the chat model |
| RAG | Retrieval-Augmented Generation, the pattern of retrieve-then-generate | The dominant pattern for grounded answers over your own data | Building a chatbot without retrieval and being surprised it makes things up | Build retrieval first; the chat is the easy part |
| MCP | A protocol for connecting tools and data sources to assistants | Where the ecosystem is heading for tool/data interop. Status: LIKELY_NATIVE_UNVERIFIED across products | Assuming every assistant supports it | Check vendor docs; treat support as per-product |
| API | A programmatic interface to the model | Where you build instead of click | Treating chat and API as identical | Read the API reference for the specific model and version |
| Latency | Time between request and full response | Affects user experience and cost | Optimizing only for quality | Measure latency; design for it |
| Rate Limit | Vendor cap on requests or tokens per unit time | Constrains how aggressively you can call the API | Hammering the API and getting 429s | Implement backoff and queueing |
| Cost Model | Vendors charge per input and output tokens, with different rates per model | Cost can explode quickly with long contexts | Pasting huge documents on every turn | Cache, retrieve, summarize; pick a smaller model for cheaper turns |
| Privacy and Data Use | Vendor policies on whether your inputs are used for training or retained | Determines what you can paste | Pasting customer data into a personal chat product | Use a product whose data policy matches your obligations; redact when in doubt |

The table above is intentionally long. It is the canonical answer to "what do I need to know first?" Memorize the leftmost two columns. Refer to the rest as needed.

### 5.2 The Predict-The-Next-Token Model

Picture a long sentence with the last word missing. The model assigns a probability to every possible next token from its vocabulary. It then samples one according to the decoding parameters. The new token is appended. The process repeats. This is the entire mechanism.

Several non-obvious consequences:

- The model has no notion of "ending the answer correctly" except as a pattern it has seen many times in training data. That is why explicit stop conditions and structured outputs work so well: they match patterns the model has internalized.
- The model has no notion of "I do not know." That phrase is itself a pattern it has learned to emit in some contexts. Whether it emits it correctly depends on training and prompting.
- The model has no notion of "let me check." Unless a tool is available and the product invokes it, the model proceeds by generating the most likely continuation.
- The model has no notion of time passing during your conversation. Each response is an act of generation conditioned on the visible context. Two turns later, it has no memory of the first turn except what is included in the current prompt.

### 5.3 Training Versus Inference

Training and inference are two completely different operations performed on the same model.

| Property | Training | Inference |
|---|---|---|
| When it happens | One time, before release; or as a finetune | Every time you use the model |
| Who pays for it | The vendor (massive compute) | You pay per token (much smaller) |
| Does it change the model | Yes, weights are updated | No, weights are frozen |
| Does your chat data affect it | Only if the vendor uses your data for future training and you have consented | No effect on the current model in front of you |
| Time scale | Weeks to months | Milliseconds to minutes per response |

This distinction is operationally important because of a common misunderstanding: telling the model "remember this for next time" does not work. Your message is consumed in this inference and gone. If memory exists, it is because the product retrieved your prior messages and put them back in the prompt, or because a fine-tune or a vector store has captured them outside the model.

### 5.4 Why AI Can Be Confidently Wrong

There are several mechanisms; they often compound.

- Fluency is decoupled from truth. The model is trained to produce fluent text. Fluent and true are different objectives.
- Training data contains errors, contradictions, and outdated information.
- Rare or recent facts are under-represented. The model has fewer examples to anchor on, so its predictions drift toward what would be most plausible if the fact were typical.
- Names and numbers are particularly susceptible. A name like "Jane Smith of Stanford" is plausible-shaped regardless of whether Jane Smith exists at Stanford.
- Long outputs amplify the problem. Each generated token conditions the next. A small early error can cascade.
- Prompts that imply the answer exists encourage the model to produce one. If you ask "what is the citation for X?", the model has been trained on a vast amount of text that does provide citations, and it will produce something that looks like a citation.

Operator defenses, in order of effectiveness:

1. Ground the model with the source material.
2. Require the model to mark unsupported claims as UNVERIFIED.
3. Lower temperature for fact-heavy tasks.
4. Use a tool-enabled mode for math, dates, and search.
5. Run a separate verification pass: paste the answer back and ask "for each claim, identify whether it is supported by the source provided."
6. Use multiple runs and look for consistency. Inconsistency is a strong signal of hallucination.

### 5.5 Why Current Facts Need A Source

Even if your model has a recent knowledge cutoff, it does not know:

- Anything that happened after the cutoff.
- Anything that was published after the cutoff.
- Anything that was not in its training data, regardless of date (private documents, internal databases, paywalled content).
- Anything that is changing in real time (prices, weather, schedules, scores, exchange rates, status pages).

When current facts matter, route the question through a tool: a search-enabled mode, a retrieval system over a live source, or an API call. The model is a synthesizer of the retrieved text, not the source of truth.

### 5.6 Why Private Files Need Explicit Access

This is the single most violated assumption among new users. The model does not see your files unless:

- You paste the file content into the conversation.
- The product retrieves the file and inserts it into the prompt (uploads, connectors, retrieval).
- A tool reads the file on the model's behalf.

When you write "summarize my report," with no file attached, in a product that has no connector to your files, the model is generating a plausible summary of an imagined report. Worse, it will often produce a confident, well-structured summary that looks correct at a glance.

Operator habit: at the start of every session where private content is involved, state explicitly what is shared. Example: "I have attached two PDFs and pasted the agenda below. Do not reference any other documents. If I describe something that is not in those three sources, ask me to provide it before answering."

---

## 6. Workflow

The general workflow for getting reliable output from an AI assistant. This is the parent workflow that the more specific workflows in later files inherit from.

```
+----------------+   +----------------+   +-----------------+
| 1. SCOPE       |-->| 2. GROUND      |-->| 3. STRUCTURE    |
| What is the    |   | Provide the    |   | Specify role,   |
| precise goal?  |   | source material|   | constraints,    |
| What is good?  |   | and tools.     |   | output format.  |
+----------------+   +----------------+   +-----------------+
                                                    |
+-----------------+   +-----------------+   +-------v-------+
| 6. RECORD       |<--| 5. VERIFY       |<--| 4. GENERATE   |
| Save prompt,    |   | Check claims,   |   | Run, observe, |
| inputs, output, |   | numbers, code,  |   | iterate.      |
| and decision.   |   | citations.      |   |               |
+-----------------+   +-----------------+   +---------------+
```

A practical checklist version of the same workflow:

1. SCOPE
   - State the goal in one sentence.
   - State the acceptance criteria: what would make this output usable.
   - State the stakes: what happens if the output is wrong.
2. GROUND
   - Decide whether the model needs documents, tools, or both.
   - Provide them. Do not assume.
3. STRUCTURE
   - Pick a prompt template appropriate to stakes.
   - Define the output format.
4. GENERATE
   - Run the prompt.
   - Iterate by changing one variable at a time.
5. VERIFY
   - Walk through every fact, number, and citation.
   - If code, read it; if you cannot read it, do not run it on anything important.
6. RECORD
   - Save the prompt to your template library if reusable.
   - Note what failed and why.

---

## 7. Cheat Sheet

### Core Truths In One Page

```
AI = a fluent generator, not an oracle.
LLM = next-token prediction over a frozen set of weights.
TRAIN once. INFER every time you talk.
NO MEMORY between sessions unless the product adds it.
NO CURRENT FACTS unless a tool fetches them.
NO YOUR FILES unless you share them.
FLUENT != TRUE. Verify anything that matters.
CONFIDENCE in the wording is not evidence of correctness.
GROUND. STRUCTURE. VERIFY.
```

### Failure-Mode Quick Reference

| Failure | Symptom | First Fix |
|---|---|---|
| Hallucinated citation | Source title sounds real, URL or author does not check out | Require sources from the documents you provided only |
| Stale knowledge | Confident answer about an event after the cutoff | Use a search-enabled mode; paste a recent source |
| Invented context | Detailed answer about a document you did not share | Re-prompt with the actual document attached |
| Confident math error | Numbers are wrong by a factor of ten | Use a code/tool-enabled mode |
| Format drift | JSON with prose around it | "Return only valid JSON, no preamble, no commentary." |
| Tone drift over long chat | The voice slowly changes | Re-paste the spec; consider a new session |
| Refusal where it should not refuse | Model refuses a benign request | Clarify intent and audience; rephrase the request |
| Endless loop in an agent | Same step repeated | Bound the loop count; add a stop condition; review the plan |

### When To Pick Which Tool

| Need | Recommended Mode |
|---|---|
| Fact about something current | Search-enabled mode or retrieval system |
| Calculation or transformation of given data | Code execution mode |
| Long document synthesis | Long context model with explicit structure |
| Code change in a real repo | An AI coding tool with file access; see file 08 and 15 |
| Image, video, audio | Multimodal model; see file 12 and 21 |
| Repeat task at volume | API + structured output; see file 09 and 10 |

---

## 8. Examples

### Example A: Why "summarize my report" fails without attachment

User: "Summarize my Q1 sales report and tell me the biggest trend."

Model (in a product with no file access): produces a fluent paragraph about Q1 sales growth, regional performance, and a "notable trend in mid-market customers." Every detail is invented.

Better operator move: "Below is my Q1 sales report between triple quotes. Summarize only what is in the report. If a section is missing, say MISSING. Do not infer numbers from text. Quote any percentage verbatim."

### Example B: Why "what is the latest..." fails after the cutoff

User: "What is the latest version of Python and what changed?"

Model (in a non-search mode, with a cutoff before the new release): produces an answer reflecting an older version, presented confidently as current.

Better operator move: enable a search-enabled mode, or paste the official release notes and ask the model to summarize what it reads.

### Example C: Why "is this code correct?" requires more than a yes/no

User: "Is this code correct? [pastes 300 lines]."

Model: "Yes, this looks correct, with a few minor suggestions."

Better operator move: "For each function, list its preconditions, its postconditions, and any inputs that would cause an unhandled exception. Identify any code path that would fail silently. Quote the exact lines you are evaluating."

### Example D: Why "tell me your internal reasoning" is the wrong question

User: "Show me your internal monologue while solving this problem."

This is the wrong frame. Some products produce internal reasoning that is not faithful to the actual computation, and asking for it can encourage post-hoc fabrication.

Better operator move: "Produce the answer. Then produce a separate reasoning summary that lists, step by step, the decisions you made and what evidence supports each."

---

## 9. Common Mistakes

A more complete taxonomy than the one in file 00. Use this as a self-audit list.

| Mistake | Why It Persists | Operator Correction |
|---|---|---|
| Treating the model as a search engine | The interface looks like one | Decide explicitly: search task or synthesis task |
| Treating the model as a database | Plausible names and numbers come back | Use a real database with retrieval |
| Treating the model as a calculator | It produces numeric-looking answers | Use code execution; verify totals |
| Treating the model as a colleague who remembers | Some products have memory; many do not | Re-state the project at the start of each session |
| Treating the model as a peer reviewer in a vacuum | It will praise mediocre work if not constrained | Specify the criteria; ask for the weakest argument as well as the strongest |
| Ignoring the system prompt | Defaults shape behavior invisibly | Read the vendor's documentation; in API contexts, set your own |
| Mixing tasks in one prompt | The model averages quality across them | Split tasks; chain prompts |
| Asking "are you sure?" as a verification | Calibrated honesty about uncertainty is uneven | Verify externally; or ask for an enumerated list of assumptions |
| Treating temperature as a global setting | It varies per task | Set per task; record |
| Trusting the model with sensitive data without checking policy | The UI does not warn loudly | Read the platform's data use page before pasting |
| Believing the model "got better" because the answer looks longer | Length is not quality | Score against fixed criteria |
| Believing the model "got worse" because one answer was bad | Variance is real | Run the prompt three times before concluding regression |
| Pasting raw secrets and walking away | The chat may be retained | Redact secrets before pasting; use a secrets-aware tool when available |
| Confusing chat memory with training | Memory features are product-side, not model-side | Read the product's memory documentation; toggle when needed |

---

## 10. Recovery Commands

When the misunderstanding is conceptual, recovery is also conceptual. The following phrases unstick most situations.

| Situation | Recovery Phrase |
|---|---|
| Model is confidently wrong about a public fact | "Treat your training data as possibly outdated. Cite the source for the claim or mark it UNVERIFIED. Do not guess." |
| Model is confidently wrong about a private fact | "You do not have access to my files. Only use the document I attached. If the answer is not there, say NOT IN SOURCE." |
| Model invents citations | "Re-do the answer using only the sources I provided. If a claim is not in those sources, mark it UNVERIFIED and continue." |
| Model gets math wrong | "Use a tool or stepwise computation. Show the computation. If you cannot use a tool, refuse and tell me what tool you need." |
| Model loses track of constraints | "Re-anchor. The full spec is below. Produce a version that strictly conforms. List any constraint you find unclear before answering." |
| Model gets stuck producing the same answer | Start a new session. Paste a clean spec and one example of acceptable output. |
| Model produces unreadable structure | "Reformat as a markdown table with these exact columns: [list]. No prose outside the table." |
| Model conflates two documents | "You have two sources, A and B. For each statement, label which source supports it. Statements without source support must be marked UNVERIFIED." |

---

## 11. Verification Checklist

Before treating an answer as ground truth:

- [ ] I know which model and product produced the answer.
- [ ] I provided every source the answer should be based on.
- [ ] The answer references those sources or is explicitly marked as outside them.
- [ ] Names, dates, numbers, and citations have been cross-checked against the source.
- [ ] If the topic is time-sensitive, a tool or live source was used.
- [ ] If the answer includes math, a calculator or code was used and the computation is visible.
- [ ] If the answer includes code, I have read it.
- [ ] If the topic is regulated (medical, legal, financial), a qualified human is in the loop.
- [ ] If I am about to act on this answer, I have logged the prompt, sources, and answer somewhere I can audit later.

If you cannot say yes to a relevant box, downgrade your confidence accordingly.

---

## 12. Practice Drills

### Drill 1: The Cutoff Probe

Ask your model these three questions in order, in a non-search mode:

1. "What is your knowledge cutoff date? If you do not know precisely, give a range."
2. "Name three significant events you know that happened in the last 12 months before that cutoff."
3. "Name three significant events that happened after your cutoff. If you cannot, say so and stop."

Note carefully whether the model conflates past and future relative to its cutoff. This drill calibrates your trust in the model on time-sensitive topics.

### Drill 2: The Citation Stress Test

Ask the model for five citations on a niche topic you know well. For each citation, verify:

- Does the source exist?
- Is the author named correctly?
- Does the URL resolve?
- Does the source actually support the claim?

Tally the result. Note the failure rate. Internalize it. The next time the model produces citations on a topic you do not know, you will have a calibrated baseline.

### Drill 3: The Private Document Test

In a fresh session, ask: "What is in my Q3 budget?" without attaching anything. Observe how confidently the model fabricates. Then attach the actual document and ask again. Compare. This drill is uncomfortable on purpose. Most users do not run it. Run it.

### Drill 4: Train Versus Infer

Tell the model: "Please remember the following for next session: my project is named TIDAL and uses Postgres." Open a new chat in a non-memory mode. Ask: "What is my project named?" Observe the result. This drill anchors the train-versus-infer distinction in lived experience.

### Drill 5: Same Prompt, Three Runs

Pick a non-trivial creative or analytical prompt. Run it three times in fresh sessions. Compare the outputs sentence by sentence. The variance you observe is your operating baseline. From now on, when you see a "good" output, your reflex should be: was this a lucky run?

### Drill 6: The Tool Boundary

Ask the model to compute: "What is 7,389,432 multiplied by 2,143,001?" in a non-tool-enabled mode. Note the answer. Then verify with a calculator. Now switch to a tool-enabled mode (a coding mode, a calculator-enabled mode, or an API with code interpreter). Run the same question. Observe. The point is not the math. The point is the boundary.

### Drill 7: The Refusal Reframe

Find a benign request that some assistant refuses (this varies by product). For example, a request to write a fictional scene that includes mild conflict. Iterate the prompt to clarify the intent, audience, and context. Document which reframes work and which do not. This drill teaches you to negotiate refusals without manipulating them.

### Drill 8: The Long Context Decay

Paste a long document (10,000 to 50,000 words) and ask the model to answer a precise question about content located near the middle. Compare to the same question when only the relevant chunk is pasted. Observe whether quality changes. This drill teaches retrieval-first thinking.

### Drill 9: Reasoning Summary, Not Hidden Reasoning

Ask the model to solve a logic puzzle. After it gives an answer, ask: "Produce a reasoning summary listing the decisions you made and the evidence for each. Do not invent steps that did not actually inform your conclusion." Note any drift between the answer and the summary. This drill builds the right habit; never ask for hidden chain-of-thought.

### Drill 10: The Recovery Sequence

Deliberately break a session: vague prompt, missing context, bad format. Use the recovery commands from section 10 to bring the session back without starting over. This is a drill in operator composure, which is the single most underrated skill in working with AI.

---

## 13. Summary

The model is a next-token predictor with frozen weights and no memory. Everything else is product scaffolding. Training happened once; you experience inference. The model does not know current events past its cutoff. It does not see your files unless you share them. It can be confidently wrong, and fluency is not evidence of correctness.

The operator who internalizes those facts is unembarrassable. They never feel betrayed by an AI failure because they did not assume the AI was an oracle. They built a verification step into their workflow. They paid for the source they needed instead of hoping the model had memorized it. They saved their best prompts and rewrote the bad ones.

Next steps:

- Read `02_AI_CORE_CONCEPTS.md` for the deep vocabulary that operationalizes the ideas above.
- Read `06_HALLUCINATION_CONTROL.md` for the dedicated treatment of the failure mode this file warned you about.
- Read `07_AI_RESEARCH_WORKFLOWS.md` or `08_AI_CODING_WORKFLOWS.md` depending on what you do.

Then go run drill 1. Today. The fastest way to know what your AI actually does is to test it on something you can verify.
