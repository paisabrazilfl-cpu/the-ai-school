# 02 AI CORE CONCEPTS

The deep vocabulary file. Each concept is given a plain definition, a technical definition, an operator implication, and a section on the common confusion that costs people time and money. Read this file once carefully. Then keep it within arm's reach.

The goal is not to make you sound like an AI researcher. The goal is to make you precise enough that you can read documentation, hold a useful conversation with engineers, and reason about your tools without metaphor errors.

WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Concept definitions here are conceptual. Vendor-specific values (token costs, context window sizes, fine-tuning availability) must be verified against current vendor documentation before you cite them.

---

## 1. Purpose

This file exists to give you operational precision over the words that appear constantly in AI work. Imprecise vocabulary causes two specific failures:

1. You buy or build the wrong thing because you confused two adjacent concepts (e.g., embeddings versus the chat model, fine-tuning versus retrieval).
2. You debug the wrong layer because you misunderstood where a problem lives (e.g., prompt drift mistaken for model regression).

By the end you should be able to draw the data flow of a typical AI application on a whiteboard and explain where each concept sits.

---

## 2. Who It Is For

| Reader | Why This File Matters |
|---|---|
| Operator moving from chat-only to API or builder tools | Most documentation assumes this vocabulary |
| Engineer onboarding to LLM work | Aligns ML and product vocabulary |
| Manager scoping AI projects | Lets you negotiate scope without bluffing |
| Power user | Helps decide which tool, which mode, which parameter, which pattern |

Not for absolute beginners. Read `00_START_HERE.md` and `01_WHAT_AI_IS.md` first.

---

## 3. Beginner Explanation

The simplest mental model: there is a model, there is a prompt, there is an output, and there is everything around them that makes the system useful.

```
                    +----------------------------+
                    |        THE MODEL           |
                    | (weights frozen at train)  |
                    +-------------^--------------+
                                  |
                       +----------+---------+
                       |       INFERENCE     |
                       +----------+---------+
                                  |
+------------+   +----------------v---------------+   +---------+
|  CONTEXT   |-->|     PROMPT (system + user)     |-->| OUTPUT  |
|  retrieval |   |  + parameters (temp, top-p)    |   | tokens  |
|  tools     |   |  + tools available             |   |         |
+------------+   +--------------------------------+   +---------+
```

Around this core sit retrieval systems (find documents), tool integrations (call APIs and code), agents (loops that plan and act), evaluation systems (score the output), and infrastructure concerns (latency, cost, rate limits).

The rest of this file zooms in on each piece of that picture.

---

## 4. Operator Explanation

An operator views the entire stack as a set of distinct, replaceable parts. The parts are:

| Layer | What Lives Here | When You Touch It |
|---|---|---|
| Model selection | Which model and version, which decoding parameters | When quality, cost, or latency does not meet the requirement |
| Prompt | System and user messages, structured templates | Every task |
| Context assembly | Retrieved chunks, attached files, prior messages | When the model lacks the right inputs |
| Tooling | Functions/APIs available to the model | When the task requires action or computation outside text |
| Orchestration | Single call vs multi-step vs agent loop | When one call cannot do the job reliably |
| Evaluation | How you score outputs | Always, even if informally |
| Operations | Latency budgets, rate limits, cost tracking, observability | Anytime this is in production |

Most outages and bad outputs are misdiagnosed at the layer above where they actually live. A "model hallucination" is often a context assembly problem. A "prompt issue" is often a tool issue. A "tool failure" is often an orchestration design issue. Being precise about which layer you are debugging is half the battle.

---

## 5. Core Concepts

Every concept in this section follows the same shape: Plain Definition, Technical Definition, Why Operators Care, Common Confusion.

### 5.1 Model

Plain Definition. A trained neural network that takes text in and produces text out. In the AI context, "model" almost always refers to a large language model unless qualified otherwise (image model, audio model, embedding model, reranker model).

Technical Definition. A transformer-architecture neural network with billions of parameters whose weights were optimized on a large corpus of tokens using a next-token-prediction objective (sometimes followed by additional training stages such as instruction tuning, preference tuning, or reinforcement learning from human feedback).

Why Operators Care. Different models have different strengths, costs, and constraints. Picking the right model for the task is a primary lever. A larger model is not always better. A model with a longer context window is not always better. A faster smaller model can be the right answer for many tasks.

Common Confusion. The model is not the product. A product like a chat assistant wraps the model with a system prompt, retrieval, tools, memory, and UI. When two people compare "the same model" across products, they are usually comparing different products. Always disambiguate model version, product, and mode.

### 5.2 Token

Plain Definition. The smallest unit a model reads or writes. Roughly a word fragment in English. A short word like "the" is usually one token. A long word like "internationalization" can be several tokens.

Technical Definition. The output of a tokenizer that maps strings to integer IDs from a fixed vocabulary, typically using subword schemes like byte-pair encoding (BPE) or SentencePiece.

Why Operators Care. Tokens are the unit of cost, latency, and context window. When the vendor charges per million tokens, the operator has to estimate token count to estimate cost. When the context window is 128k tokens, your input plus output must fit inside.

Common Confusion. People count words and assume one word equals one token. A safer rule of thumb is one token equals roughly three quarters of an English word, so 1,000 words is roughly 1,300 tokens. Code, JSON, and non-English text have different ratios. For any serious budgeting, use the vendor's tokenizer.

### 5.3 Context Window

Plain Definition. The maximum number of tokens the model can read at once, counting the system prompt, conversation history, attached context, and the room left for the output.

Technical Definition. The maximum sequence length the model was trained or extended to handle. Beyond this length, attention either fails outright or, in extended-context models, quality may degrade.

Why Operators Care. The context window is a hard constraint. Exceeding it requires retrieval, chunking, or summarization. Even within the limit, models often perform worse on content located in the middle of very long inputs (a phenomenon often discussed as "lost in the middle"). Status: VERIFIED_DOCS conceptually, with model-specific behavior varying.

Common Confusion. A larger context window does not mean the model treats every token equally well. It is generally better to retrieve the relevant 5,000 tokens than to paste 200,000 tokens and hope.

### 5.4 Training Data

Plain Definition. The text (and sometimes images, audio, code) that the model learned from.

Technical Definition. A curated corpus, often hundreds of billions to trillions of tokens, drawn from web crawls, books, code, and other sources, processed through deduplication, filtering, and weighting before being fed into pretraining.

Why Operators Care. The model knows what was in its training data, roughly. It does not know what was not. Niche domains, private documents, and post-cutoff events are absent. Training data also encodes the biases, errors, and gaps of its sources.

Common Confusion. People assume "the model trained on the internet" means "the model knows everything on the internet." In practice, coverage is uneven, dated, and incomplete. Even for popular topics, the model's understanding is a compressed average of what it saw, not a database lookup.

### 5.5 Inference

Plain Definition. The act of running the trained model on your input to produce output.

Technical Definition. A forward pass through the network for each generated token (with various optimizations like KV caching), executed in a serving infrastructure that handles batching, scheduling, and decoding.

Why Operators Care. Inference is where the cost happens, where the latency happens, and where the variance happens. Two inferences on the same input can produce different outputs because of non-determinism in batched execution and sampling.

Common Confusion. "The model is learning from my chat" is almost always wrong. Inference does not update weights. Any apparent learning is either context being passed back in (memory features), retrieval being updated, or a future training run that may or may not use your data depending on vendor policy.

### 5.6 Prompt

Plain Definition. The complete text the model sees on a single request.

Technical Definition. A sequence of role-tagged messages (system, user, assistant, tool) and any attached content, concatenated and tokenized into the model's input.

Why Operators Care. The prompt is the operator's primary lever. Same model, different prompts can produce very different outputs.

Common Confusion. Users often think of the prompt as just their latest message. The model sees the system prompt, the entire conversation history (or the slice the product chose to include), any attached files, and any tool results. All of it counts toward the context window and the bill.

### 5.7 System Prompt

Plain Definition. Persistent instructions that shape the model's behavior across the session, set by the developer or product rather than the end user.

Technical Definition. A message with the "system" role placed at the start of the message sequence. Most modern instruction-tuned models give it priority over user messages but not absolute priority; this varies by model and is documented per vendor.

Why Operators Care. The system prompt is where you set role, voice, refusal policy, output format defaults, allowed/forbidden topics, and tool usage conventions. Changes to the system prompt often deliver more value than changes to individual user prompts.

Common Confusion. In consumer products, the system prompt is set by the vendor and is not directly editable. In API contexts, you set it. Conflating the two is a common error: a behavior you can change via the API may not be changeable in the chat product.

### 5.8 Developer Instruction Versus User Instruction

Plain Definition. Developer instructions are written by the application builder and embedded in the system prompt or other elevated layer. User instructions are written by the end user at runtime.

Technical Definition. In multi-layered prompt schemes, developer instructions sit above user instructions in priority. Most providers describe a hierarchy (often: platform > developer > user > tool output) intended to make jailbreaks harder.

Why Operators Care. If you are building an application, design carefully where each rule lives. Hard rules (privacy, scope) live in developer-controlled layers. Soft preferences (tone, length) can be left to users.

Common Confusion. Users sometimes succeed in overriding developer instructions by clever phrasing. This means your developer-layer rules should be defense-in-depth, not last-line. Always assume some user prompts will try to override.

### 5.9 User Instruction

Plain Definition. The message the end user sends.

Technical Definition. A message with the "user" role appended to the prompt sequence for this turn.

Why Operators Care. This is where the day-to-day work happens. The quality of user instructions is the most variable input in most systems.

Common Confusion. Users often paste data into the user instruction and assume the model will treat the data and the instructions separately. In practice, the model reads it all as one stream. If a user pastes a document that contains instructions, the model may follow those instructions. This is the root of "prompt injection" risk.

### 5.10 Temperature

Plain Definition. A randomness dial for the model's output. Lower temperature, more deterministic; higher temperature, more varied.

Technical Definition. A scalar that scales the logits before the softmax during decoding. Temperature zero, sample the highest-probability token (still subject to ties and platform behavior). Temperature one, sample from the unmodified distribution.

Why Operators Care. Set deliberately per task. For factual and code work, low temperature. For brainstorming and creative variance, higher. Document your choice as part of the prompt template.

Common Confusion. Temperature zero is often described as "deterministic." In practice, batched inference and tie-breaking can still produce different outputs on the same input. Treat temperature zero as "low variance," not "zero variance."

### 5.11 Top-p (Nucleus Sampling)

Plain Definition. A different randomness control. The model samples only from the smallest set of tokens whose probabilities sum to at least p.

Technical Definition. Nucleus sampling. After applying temperature, restrict the sampling distribution to the most likely tokens summing to probability mass p, then renormalize.

Why Operators Care. Top-p interacts with temperature. Adjusting both at once makes the effect hard to attribute. Change one at a time.

Common Confusion. Many users assume top-p and temperature do the same thing. They are related but distinct. A common default is temperature near 0.7 and top-p near 1.0, or temperature near 1.0 and top-p near 0.9. Vendor defaults vary; check documentation.

### 5.12 Hallucination

Plain Definition. A confident, fluent answer that is wrong or fabricated.

Technical Definition. Output that is plausible under the model's learned distribution but not faithful to the input, the source material, or the world.

Why Operators Care. Hallucination is the dominant failure mode for trust. It is most common on names, dates, citations, niche facts, and recent events. It is amplified by long outputs, leading questions, and missing context.

Common Confusion. Hallucination is not a "glitch" that vendors will simply fix. It is a structural feature of next-token prediction without grounding. Workflows must include verification regardless of vendor improvements. See `06_HALLUCINATION_CONTROL.md`.

### 5.13 Grounding

Plain Definition. Forcing the model to base its output on supplied or retrieved sources, and to mark anything outside those sources as unsupported.

Technical Definition. A combination of prompt design (instructing the model to cite or refuse), context provisioning (pasting the source), and post-processing (verifying that claims are supported by retrieved chunks).

Why Operators Care. Grounding is the single best defense against hallucination. Even imperfect grounding outperforms ungrounded generation.

Common Confusion. Pasting a document and asking a question does not guarantee the answer comes from the document. The model may interpolate. Explicit instructions ("only use the document below; mark anything else UNVERIFIED") matter.

### 5.14 Retrieval

Plain Definition. The system process of fetching relevant documents and inserting them into the prompt before the model generates.

Technical Definition. A search component (usually keyword, semantic via embeddings, or a hybrid) that, given a query, returns the top-k chunks from a corpus. Those chunks are concatenated into the prompt with formatting.

Why Operators Care. Retrieval is what makes an AI useful on your private data. The quality of retrieval often dominates the quality of the final answer. A great model with bad retrieval is worse than a mediocre model with great retrieval.

Common Confusion. Retrieval is a separate engineering problem from prompting. Tuning retrieval (chunk size, overlap, embedding model, reranking) is a discipline of its own.

### 5.15 Tool Use

Plain Definition. The model calling an external function, such as code execution, search, a database query, or an API.

Technical Definition. The model emits a structured request indicating a tool name and arguments. The orchestrator calls the tool and returns the result as a new message. The model continues generating, conditioned on the result.

Why Operators Care. Tool use turns a writer into a doer. It also turns a synthesizer into a calculator, fact-checker, and integration point.

Common Confusion. Tool use is not magic. The orchestrator decides which tools are available, when results are returned, and how errors are handled. A poorly designed tool layer will produce poorly designed agent behavior.

### 5.16 Agent

Plain Definition. A loop in which the model plans, calls tools, observes results, and decides what to do next, until a stopping condition is met.

Technical Definition. An orchestration pattern, often described as ReAct, plan-execute, or similar, in which the model alternates between reasoning steps and tool calls. The loop can be single-agent or multi-agent.

Why Operators Care. Agents enable end-to-end automation but multiply the failure surface. Each step can introduce error. Loops can run away in cost or wall time. Production agents need budgets, timeouts, human checkpoints, and observability.

Common Confusion. "Agentic" is sometimes used as a marketing term for any tool-using model. The distinction worth keeping: a single tool call inside one response is not an agent. An iterative loop that decides its own next step is.

### 5.17 Workflow

Plain Definition. A defined sequence of steps that achieves a goal, where some or all steps use AI.

Technical Definition. A directed graph of operations: deterministic steps, model calls, tool calls, human checkpoints, and conditional branches.

Why Operators Care. Most real value comes from workflows, not single prompts. Designing the workflow is more important than tuning any one prompt.

Common Confusion. Workflows and agents overlap. A useful distinction: workflows are designed by humans, agents make decisions at runtime. Many production systems are mostly workflows with one or two agent-like steps.

### 5.18 Evaluation

Plain Definition. How you score AI output to know whether it is good enough.

Technical Definition. A combination of automated metrics (exact match, BLEU, ROUGE, embedding similarity, model-graded rubrics), human review, and golden datasets that catch regressions.

Why Operators Care. Without evaluation, you cannot tell whether a prompt change is an improvement. Most teams start with vibes and graduate to a small golden set of test cases.

Common Confusion. Model-graded evaluation (asking a model to judge another model's output) is useful but has known biases (favoring longer outputs, favoring outputs from the same model family). Use it with calibration.

### 5.19 Fine-Tuning

Plain Definition. Additional training that adapts a base model to a narrower task or style.

Technical Definition. A supervised or preference-based training run on a smaller, task-specific dataset, updating some or all of the model's parameters.

Why Operators Care. Fine-tuning is often the wrong first answer. Most "we need to fine-tune" problems are actually retrieval problems or prompting problems. Fine-tuning shines when you need a specific style or format reliably, or when you need to embed knowledge that does not change often.

Common Confusion. Fine-tuning is not how you teach a model "facts about your company." That is what retrieval is for. Fine-tuning is for behavior and style.

### 5.20 Embeddings

Plain Definition. A numeric representation of meaning. Each chunk of text is mapped to a list of numbers (a vector). Similar texts have similar vectors.

Technical Definition. The output of an embedding model that maps text into a fixed-dimensional vector space such that semantic similarity is approximated by cosine similarity or another metric.

Why Operators Care. Embeddings power semantic search and retrieval. They are usually produced by a different, smaller model than the chat model. They are stored in vector databases for fast nearest-neighbor lookup.

Common Confusion. Embeddings are not the chat model. You cannot ask an embedding model a question. You use embeddings to find which chunks to send to the chat model.

### 5.21 Vector Database

Plain Definition. A database optimized to store and search embeddings.

Technical Definition. A storage and indexing system that supports approximate nearest-neighbor search over high-dimensional vectors, often with filtering by metadata.

Why Operators Care. Vector databases are part of most retrieval systems. Choices include managed services, open-source libraries, and extensions to traditional databases. Selection is an engineering decision based on scale, latency, and cost.

Common Confusion. Vector databases are not where you store the model's knowledge. They store your knowledge in a form the model can retrieve. The model still does the synthesizing.

### 5.22 RAG (Retrieval-Augmented Generation)

Plain Definition. The pattern of retrieve first, then generate. Find relevant chunks, paste them into the prompt, ask the model to answer using them.

Technical Definition. A pipeline where a query is embedded, used to retrieve top-k chunks from a vector store (often combined with keyword search and reranking), and the chunks are concatenated into the prompt as context for generation.

Why Operators Care. RAG is the dominant pattern for grounded question answering over private corpora. Most "chatbot over your data" products are RAG systems.

Common Confusion. RAG quality is dominated by retrieval quality. Chunk sizing, overlap, metadata, reranking, and query rewriting all matter. Spending all your time on prompt engineering while ignoring retrieval is a common mistake.

### 5.23 MCP (Model Context Protocol)

Plain Definition. A protocol for connecting tools and data sources to AI assistants in a standard way.

Technical Definition. A specification for how a host application (an assistant) discovers and calls capabilities provided by external servers (tools, data, prompts). Status: LIKELY_NATIVE_UNVERIFIED across products. Adoption and feature support vary by vendor and version.

Why Operators Care. Where supported, MCP reduces lock-in: the same tool server can be wired to multiple assistants. For builders, it standardizes how tools are exposed.

Common Confusion. MCP is not a model. It is plumbing. It does not make a weak model strong. It makes integration consistent.

### 5.24 API

Plain Definition. A programmatic interface to the model, used to build instead of click.

Technical Definition. A vendor-provided HTTP interface (REST or streaming) with authentication, structured requests, and well-defined response schemas.

Why Operators Care. The API is where production systems live. Chat products are convenient but constrained. The API is more powerful, more configurable, and metered per token.

Common Confusion. The chat product and the API expose the same model but different defaults, different system prompts, and sometimes different tools. Reproducing a chat product's behavior via the API requires deliberate configuration.

### 5.25 Latency

Plain Definition. Time from request to full response.

Technical Definition. Total wall-clock time per request, often decomposed into time-to-first-token (TTFT) and tokens-per-second (throughput).

Why Operators Care. Latency is half of user experience. A model that produces better answers but takes 30 seconds may lose to a faster model with slightly worse answers, depending on the use case.

Common Confusion. Latency is not constant. It varies with input length, output length, model size, server load, and network conditions. Always measure under realistic load.

### 5.26 Cost

Plain Definition. What you pay per use.

Technical Definition. Vendor pricing typically charges per input token and per output token, with different rates per model and additional charges for tools, retrieval, and fine-tuning. Status: VERIFIED_DOCS conceptually; exact rates change and must be confirmed.

Why Operators Care. Costs can explode quickly. A long context window with frequent calls and large outputs is expensive. Caching, retrieval, prompt compression, and model selection all affect cost.

Common Confusion. The cheapest model is not always the cheapest answer. A small model that fails on 30 percent of requests and requires retries with a larger model is often more expensive overall.

### 5.27 Rate Limit

Plain Definition. The vendor's cap on requests, tokens, or both per unit time.

Technical Definition. Quotas enforced per API key or organization, often tiered, often expressed as requests-per-minute and tokens-per-minute. Status: VERIFIED_DOCS conceptually; exact limits per tier change.

Why Operators Care. Rate limits constrain how aggressively you can build. Production systems need backoff, queues, and sometimes multiple accounts or regions.

Common Confusion. Rate limits and context windows are different. You can have a giant context window and still hit a rate limit on requests per minute.

### 5.28 Multimodal Input

Plain Definition. The model accepts non-text inputs such as images, audio, video, or files.

Technical Definition. The model architecture or pipeline includes encoders for non-text modalities whose outputs are fused with text tokens before generation.

Why Operators Care. Multimodal expands what you can do (analyze a screenshot, describe an image, transcribe audio). It also expands failure modes (incorrect text extraction, missed details, hallucinated captions).

Common Confusion. Pasting a screenshot is not the same as pasting the text in the screenshot. The model can miss text in images, particularly small or stylized text. Verify extraction before trusting analysis.

### 5.29 Structured Output

Plain Definition. Output that conforms to a defined shape, such as JSON, XML, or a table.

Technical Definition. Output produced under a constraint such as a JSON schema, often enforced by the platform via constrained decoding or post-validation.

Why Operators Care. Automation requires structured output. Free-form prose cannot be reliably parsed.

Common Confusion. Asking nicely for JSON is not the same as enforcing it. Use platform features that enforce schemas where available, and always validate.

### 5.30 JSON Schema

Plain Definition. A formal description of the shape of a JSON document: which fields are required, what types they have, what values are allowed.

Technical Definition. A standard for describing JSON structures, used by many platforms as the contract for structured output.

Why Operators Care. A precise schema reduces parsing errors and makes downstream code robust. It also constrains the model meaningfully.

Common Confusion. A schema is not a guarantee. Even with schema enforcement, the values inside the JSON can still be wrong. Validate semantics, not just shape.

### 5.31 Chain-Of-Thought Privacy and Reasoning Summary

Plain Definition. Some models produce internal reasoning traces that the vendor treats as private. Operators should request a reasoning summary instead of attempting to extract hidden chain-of-thought.

Technical Definition. Internal reasoning may be generated in a separate stream, hidden by default, and not guaranteed to be faithful to the actual computation. A reasoning summary is a post-hoc, user-facing explanation of the decision path.

Why Operators Care. Asking for hidden reasoning can produce fabricated explanations. Asking for a reasoning summary, with the explicit instruction to list only decisions actually informing the output, yields better audit trails.

Common Confusion. A reasoning summary is not a transcript of the model's thoughts. It is a generated explanation. Treat it like any other generation: useful, but not authoritative.

---

## 6. Workflow

A workflow for deciding which concept to reach for in a real problem.

```
Q: My AI output is bad. What do I change?

+----------------------------------------------+
| 1. Is the failure about facts the model      |
|    should know but does not?                 |
|    -> Retrieval, grounding, source pasting   |
+----------------------------------------------+
| 2. Is the failure about format or shape?     |
|    -> Structured output, JSON schema,        |
|       explicit output spec in the prompt     |
+----------------------------------------------+
| 3. Is the failure about voice, tone, or      |
|    style consistency?                        |
|    -> System prompt, examples, possibly      |
|       fine-tuning if at scale                |
+----------------------------------------------+
| 4. Is the failure about math or current      |
|    events?                                   |
|    -> Tool use, code execution, search       |
+----------------------------------------------+
| 5. Is the failure about long documents or    |
|    lost details mid-context?                 |
|    -> Chunking, retrieval, reranking         |
+----------------------------------------------+
| 6. Is the failure inconsistent across runs?  |
|    -> Lower temperature, tighter constraints,|
|       multiple runs with reconciliation      |
+----------------------------------------------+
| 7. Is the failure about cost or latency?     |
|    -> Smaller model, prompt compression,     |
|       caching, async batching                |
+----------------------------------------------+
| 8. Is the failure about a multi-step task    |
|    going off the rails?                      |
|    -> Workflow design, bounded agent,        |
|       human checkpoint, evaluation harness   |
+----------------------------------------------+
```

This diagnostic tree is most of the value of this file.

---

## 7. Cheat Sheet

### Concept Map In One Page

```
                +------------------+
                |   BASE MODEL     |
                |  (weights frozen)|
                +--------+---------+
                         |
   +---------------------+---------------------+
   |                     |                     |
+-------+         +-------------+        +-----------+
| PROMPT|         |  CONTEXT     |        | PARAMETERS|
|system |         |  retrieved   |        | temp,     |
|user   |         |  attached    |        | top-p,    |
|tools  |         |  history     |        | max_tokens|
+-------+         +-------------+        +-----------+
                         |
                  +------v-------+
                  |  INFERENCE   |
                  +------+-------+
                         |
                  +------v-------+
                  |   OUTPUT     |
                  +--------------+

Around this core sit:
  - Embeddings + vector DB --> retrieval
  - Tools/APIs/code         --> tool use
  - Orchestrator/agent loop --> multi-step
  - Evaluation harness      --> quality control
  - Observability + budgets --> operations
```

### Lever Quick Reference

| If you want to change... | Touch this layer |
|---|---|
| Voice, refusal policy, defaults | System prompt |
| Specific task behavior | User prompt and constraints |
| Knowledge available | Retrieval / context |
| Action capability | Tools |
| Determinism | Temperature, top-p |
| Output shape | Schema, output spec |
| Latency or cost | Model selection, prompt size |
| Style at scale | Fine-tuning (as a last resort) |
| Multi-step reliability | Workflow design, checkpoints |
| Quality measurement | Evaluation harness |

### Vocabulary Sanity Check

If someone says... they probably mean...

| Phrase | Likely Meaning |
|---|---|
| "Train it on our data" | Fine-tune or build a retrieval system; clarify which |
| "Give it memory" | Implement product-side memory or retrieval over past sessions |
| "Make it not hallucinate" | Add grounding and verification; reduce expectations |
| "Connect it to our database" | Build a tool or retrieval over the database |
| "Give it access to the internet" | Add a search tool; check vendor policies |
| "Make it agentic" | Add tool use and an orchestration loop |
| "Tune the temperature" | Set the decoding parameter; document the choice |
| "Add a system prompt" | Set persistent instructions; only meaningful in API or some products |

---

## 8. Examples

### Example A: Diagnosing a "model regression"

Symptom: a chat assistant that worked last month is now giving wrong answers about your product policies.

Wrong response: "The model got worse, switch to a different one."

Right response: walk the diagnostic tree.

1. Are the wrong answers about facts? Yes. So this is likely retrieval or context.
2. Have the policy documents changed? Yes, slightly.
3. Has the retrieval index been updated? No.

The "model regression" is a stale retrieval index. The model is fine.

### Example B: Picking the right concept for "give it access to our data"

Stakeholder request: "Train the model on our wiki."

Operator translation:

| Option | When To Use |
|---|---|
| Paste the relevant page on each turn | Small, occasional, single user |
| Retrieval over the wiki (RAG) | Ongoing use, multiple users, content changes |
| Fine-tune on Q&A pairs from the wiki | Need consistent voice or format, content stable |
| Memory feature | Personal preferences, not factual data |

Most "train it on our data" requests should resolve to RAG.

### Example C: Picking temperature

| Task | Temperature |
|---|---|
| Code generation | Low, often near 0.2 |
| Structured extraction from documents | Low, often 0.0 to 0.2 |
| Summarization | Low to moderate, 0.2 to 0.5 |
| Drafting an email | Moderate, 0.3 to 0.7 |
| Brainstorming alternatives | Higher, 0.7 to 1.0 |
| Comedic writing | Higher still, 0.8 and up |

These are heuristics, not laws. Status: CUSTOM_WORKFLOW.

### Example D: When a "JSON schema" is not enough

You define a strict schema for an extraction task. The model returns valid JSON. The values are wrong. The schema is satisfied, the data is not.

Lesson: schema guarantees shape, not semantics. Always validate values against business rules.

---

## 9. Common Mistakes

| Mistake | Why It Happens | Correction |
|---|---|---|
| "Fine-tune to fix hallucinations" | Sounds like a learning fix | Use retrieval and grounding first |
| "Bigger context window equals better answer" | Larger looks more powerful | Curate context; less is often more |
| "Lower temperature equals more correct" | Determinism feels safe | Temperature controls variance, not truth |
| Conflating chat product with model | The UI hides the layers | Note product, model, mode, and version separately |
| Conflating memory with training | Both feel like "the model learns" | Memory is product-side; training is offline |
| Treating prompt injection as a model bug | It looks like the model misbehaved | It is an architectural risk; design defenses |
| Calling everything "agentic" | Marketing pressure | Reserve the term for true tool-using loops |
| Ignoring evaluation until it hurts | Evals feel like ceremony | Build a small golden set early |
| Treating reasoning summaries as ground truth | They are written confidently | Treat them as helpful, not authoritative |
| Pasting hidden chain-of-thought requests | A myth that this reveals "real" reasoning | Ask for reasoning summaries; never ask for hidden chain-of-thought |

---

## 10. Recovery Commands

The following operator phrases unblock common vocabulary-related failures. These complement, not replace, the recovery commands in `00_START_HERE.md`.

| Situation | Recovery Phrase |
|---|---|
| Answer is plausible but unsourced | "For every claim, cite the section of the document provided that supports it. If no section supports it, mark UNVERIFIED." |
| Model contradicts itself across turns | "Summarize the agreed facts in a numbered list. Halt and wait for my confirmation before answering further." |
| Tool call failed | "The tool returned an error. Do not invent a result. Restate the failure, propose a different approach, and wait for me to confirm." |
| JSON shape correct but values wrong | "Re-extract. For each field, quote the source text you used. If a field has no source, set it to null and explain in a notes field." |
| Cannot reproduce a "good" run | "Run with temperature 0.2 and the exact prompt below. Produce the same output three times for me to compare." |
| Long context degraded answers | "Below are three short, relevant excerpts. Use only these excerpts. Ignore everything else in the conversation." |
| Reasoning summary feels invented | "Produce a reasoning summary that lists only the decisions you actually used to reach your answer. Do not invent steps to make the explanation sound complete." |

---

## 11. Verification Checklist

For any concept-level decision (architecture, prompt design, vendor choice):

- [ ] I can name the layer where my problem actually lives (model, prompt, context, tool, workflow, ops).
- [ ] I have ruled out the cheaper fix before reaching for the expensive one (prompt before retrieval; retrieval before fine-tune).
- [ ] I have written down which parameters I chose and why.
- [ ] I know which vendor policies apply to the data I am about to paste.
- [ ] I know whether my workflow is single-call, multi-step, or agentic, and I have justified the choice.
- [ ] I have at least one example output I would consider acceptable, written before I read any model output.
- [ ] I have at least one failure mode I am explicitly watching for.
- [ ] I have a way to measure quality, even if informally.

---

## 12. Practice Drills

### Drill 1: Layer Identification

For each of the following symptoms, identify the layer that is most likely responsible. Then build a habit of doing this for every issue.

1. The model is producing JSON with extra commentary before and after.
2. The model is referencing a policy from last year.
3. The model claims it cannot browse the web in a product that you believe supports search.
4. The model produces a different answer to the same question on three different runs.
5. The model returns valid JSON but with the wrong values.
6. The model refuses a request that another model accepts.
7. The cost per session has tripled.
8. The latency on long inputs has spiked.

Answers, in order: output format / context / tool availability / decoding variance / extraction semantics / system prompt or training / context size or model selection / context size or model selection.

### Drill 2: Concept Disambiguation

Write a one-sentence distinction between each pair. Do not look at this file while doing it.

- Embeddings vs the chat model.
- Fine-tuning vs retrieval.
- Memory vs training.
- Workflow vs agent.
- Top-p vs temperature.
- Context window vs rate limit.
- Hallucination vs refusal.
- Tool use vs structured output.

When you can pass this drill cold, you have internalized the vocabulary.

### Drill 3: Build A Mental Trace

Pick a single AI feature you use (a chatbot over docs, an AI coding assistant, a search-grounded assistant). On paper, draw the data flow:

- Where does the user's text enter?
- Where is the system prompt?
- Where is retrieval performed, if any?
- Where are tools invoked, if any?
- What model is called, and with which parameters?
- Where does the output go, and is it validated?

If you cannot draw it, you cannot debug it.

### Drill 4: Schema Stress Test

Define a JSON schema for extracting structured data from a document. Run the extraction. For each field, verify the value is correct, not just the shape. Count the error rate. Adjust the prompt and re-run.

### Drill 5: The Reasoning Summary Discipline

After any non-trivial AI output, ask: "Produce a reasoning summary that lists the decisions you used and the evidence for each. Do not invent steps to make the explanation look complete." Compare to the original output. Look for steps that explain the output but were not actually informative. Build the habit of treating reasoning summaries as artifacts to be reviewed, not accepted.

### Drill 6: The Cost Audit

For one week, log: model used, input tokens (estimate), output tokens (estimate), and outcome (success, partial, failure). At the end of the week, identify the highest-cost class of failures. This is your highest-leverage optimization target.

---

## 13. Summary

This file gave you the vocabulary to operate on the right layer, the discipline to choose the cheaper fix first, and the diagnostic tree to spot which concept is failing. Internalize the table in section 5. Run the layer-identification drill. Stop calling everything "agentic." Stop conflating memory with training. Stop reaching for fine-tuning when retrieval is the answer.

The operators who pay off the most in their first year with AI are the ones who learn this vocabulary precisely and refuse to drift back to imprecise speech in meetings. Precision in language compounds. Imprecision compounds too, in the opposite direction.

Next steps:

- Read `03_PROMPT_ENGINEERING_FOUNDATION.md` to operationalize the prompt layer.
- Read `06_HALLUCINATION_CONTROL.md` to operationalize the grounding layer.
- Read `09_AI_AGENT_WORKFLOWS.md` and `10_AUTOMATION_WORKFLOWS.md` when you are ready to design multi-step systems.
- Keep `26_AI_GLOSSARY.md` as a quick reference.

Then start using these words deliberately in your team. Within a quarter, the precision will pay back.
