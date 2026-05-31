# 26_AI_GLOSSARY

WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

Verification tag legend:
- VERIFIED_LOCAL / VERIFIED_DOCS / USER_PROVIDED_UNVERIFIED / CUSTOM_WORKFLOW / LIKELY_NATIVE_UNVERIFIED / UNKNOWN / DEPRECATED.

Format for each term: plain definition / technical definition / operator note / common confusion.

---

## 1. Purpose

A single alphabetical reference for AI vocabulary used across this manual. Optimized for fast lookup, not for narrative reading.

## 2. Who It Is For

Beginners encountering a term for the first time. Operators who need to disambiguate two terms that sound similar.

## 3. Beginner Explanation

Most AI confusion is vocabulary confusion. The same word ("model", "agent", "memory") means different things to different vendors. This glossary uses a four-line entry so you can quickly find the meaning that applies to your situation.

## 4. Operator Explanation

Each entry separates the public-facing meaning, the engineering meaning, an operational note (what to actually do), and the common confusion (what people get wrong). Cross-reference terms with the cheat sheet (file 27) for templates.

## 5. Core Concepts

- Plain definition: the one-sentence layperson version.
- Technical definition: the engineering-accurate version.
- Operator note: how to use or watch for it in practice.
- Common confusion: the most frequent misuse.

## 6. Workflow

```
[encountered term] -> [look up] -> [pick definition matching context] -> [apply operator note] -> [avoid common confusion]
```

## 7. Cheat Sheet

- If unsure between two terms, read "common confusion" line.
- If using in production, read "operator note" line.

## 8. Examples

See entries below.

## 9. Common Mistakes

- Treating "agent" and "assistant" as synonyms.
- Confusing "fine-tune" with "RAG."
- Confusing "context window" with "memory."

## 10. Recovery Commands

- "Define term X in this conversation. Use my glossary's four-line format."
- "Disambiguate X vs Y in the context of [vendor]."

## 11. Verification Checklist

- [ ] Term resolved to the right vendor context.
- [ ] Operator note applied.
- [ ] Common-confusion check done.

## 12. Practice Drills

1. Pick five terms; write each definition from memory; compare.
2. Read a vendor doc and tag every unfamiliar term against this glossary.
3. Replace every "AI" in a recent prompt with a more precise term.

## 13. Summary

Vocabulary precision reduces failure. Use the four-line format. When in doubt, ask the model to define the term in its own context before proceeding.

---

## Glossary (alphabetical)

### Agent
- Plain: an AI that takes actions in a loop, not just one reply.
- Technical: an LLM driving a control loop with tool calls, memory, and a termination condition.
- Operator: always set a step budget and an exit condition.
- Confusion: not the same as "assistant" (single-turn) or "automation" (deterministic).

### Agentic
- Plain: behaving like an agent.
- Technical: capable of multi-step planning, tool use, and self-correction.
- Operator: agentic systems need observability; log every tool call.
- Confusion: agentic does not mean autonomous; humans should still gate critical steps.

### Alignment
- Plain: making the model do what we want.
- Technical: training and prompting techniques that bias outputs toward intended values and behaviors.
- Operator: alignment is not a guarantee; defenses are still needed.
- Confusion: alignment is not safety; safety is a subset.

### API (Application Programming Interface)
- Plain: a way for code to talk to the model.
- Technical: a versioned HTTP contract for inference.
- Operator: pin model versions; APIs change.
- Confusion: API capabilities differ from chat-app capabilities.

### Assistant
- Plain: the AI you chat with.
- Technical: a chat-tuned model with a system prompt and turn structure.
- Operator: assistants are single-loop; agents wrap them.
- Confusion: not the same as agent.

### Attention
- Plain: how the model decides which earlier words matter most.
- Technical: a weighted sum over key-query-value projections of token representations.
- Operator: attention degrades with very long contexts; chunk wisely.
- Confusion: attention is not memory.

### Autoregressive
- Plain: generates one token at a time using prior tokens.
- Technical: P(x_t | x_<t) sampling loop.
- Operator: latency scales with output length.
- Confusion: input length affects cost; output length affects latency.

### Batch
- Plain: many inputs processed together.
- Technical: parallelized inference over a list of prompts.
- Operator: cheaper but slower; use for offline jobs.
- Confusion: batch API is not the same as the realtime API.

### Beam Search
- Plain: keeping several candidate outputs and picking the best.
- Technical: breadth-limited tree search over token probabilities.
- Operator: rare in modern LLMs; sampling dominates.
- Confusion: beam search is deterministic given seed; sampling is not.

### Bias
- Plain: systematic skew in outputs.
- Technical: training-data or objective-induced distributional skew.
- Operator: test with diverse inputs; audit outputs.
- Confusion: model "bias" term in ML math is different (the b in y = Wx + b).

### Caching (Prompt Caching)
- Plain: reuse of repeated prompt prefixes to save cost.
- Technical: server-side reuse of KV cache for identical prefix tokens.
- Operator: place stable content first; volatile content last.
- Confusion: cache hits depend on exact prefix match.

### Chain-of-Thought
- Plain: the model thinks step by step.
- Technical: intermediate reasoning tokens before the final answer.
- Operator: ask for a "reasoning summary," not hidden chain-of-thought.
- Confusion: do not request hidden internal reasoning.

### Citation
- Plain: a link to where a claim came from.
- Technical: a structured reference attached to a span of generated text.
- Operator: require citations; verify the cited source actually says it.
- Confusion: a cited URL is not evidence; the quoted span is.

### Completion
- Plain: the model's reply.
- Technical: tokens produced by autoregressive sampling given a prompt.
- Operator: cost = input tokens + output tokens (different rates).
- Confusion: "completion" API style is older; "chat" style is now standard.

### Context Window
- Plain: how much text the model can see at once.
- Technical: maximum number of tokens in input plus output.
- Operator: long context does not mean reliable recall.
- Confusion: not the same as memory.

### Decoder
- Plain: the part of the model that generates output.
- Technical: stack of transformer blocks producing next-token distributions.
- Operator: most modern LLMs are decoder-only.
- Confusion: encoder-decoder is different (e.g., translation models).

### Distillation
- Plain: training a small model to imitate a big one.
- Technical: student model trained on teacher outputs or logits.
- Operator: faster and cheaper; usually slightly less capable.
- Confusion: distillation is not the same as fine-tuning.

### Embedding
- Plain: a vector representing meaning.
- Technical: a dense numeric vector capturing semantic features.
- Operator: used for RAG, search, clustering.
- Confusion: embeddings from different models are not interchangeable.

### Eval
- Plain: a test for the model.
- Technical: a benchmark or dataset measuring a capability.
- Operator: write task-specific evals; public benchmarks are not enough.
- Confusion: passing a benchmark is not passing your use case.

### Few-Shot
- Plain: give the model examples before the real question.
- Technical: in-context examples to bias output distribution.
- Operator: 2-5 examples often beat 20.
- Confusion: few-shot examples can leak format expectations.

### Fine-Tune
- Plain: further training on your data.
- Technical: gradient updates to model weights on a custom dataset.
- Operator: try prompting and RAG first; fine-tune last.
- Confusion: not the same as RAG.

### Function Calling
- Plain: the model picks a function and fills arguments.
- Technical: structured output mapped to a registered tool schema.
- Operator: validate arguments against schema before executing.
- Confusion: function calling does not mean the function ran.

### Google Gemini
- Plain: Google's family of multimodal models.
- Technical: a model family branded under Google. UNKNOWN specifics in this run.
- Operator: vendor naming changes; pin a version.
- Confusion: Gemini app vs Gemini API may differ.

### GPU
- Plain: the chip that runs the model.
- Technical: massively parallel processor used for tensor ops.
- Operator: GPU memory limits batch size and context.
- Confusion: more GPUs does not always mean faster inference.

### Grounding
- Plain: tying answers to a known source.
- Technical: conditioning output on retrieved or provided documents.
- Operator: grounded outputs should quote source spans.
- Confusion: grounding does not eliminate hallucination, only reduces it.

### Hallucination
- Plain: a confident wrong answer.
- Technical: output not entailed by the input or training distribution.
- Operator: require citations; mark UNKNOWN where appropriate.
- Confusion: hallucinations are not always factual; format hallucination exists.

### Inference
- Plain: running the model to get an answer.
- Technical: forward pass plus sampling loop.
- Operator: inference cost dominates production budgets.
- Confusion: inference is not training.

### Instruction Tuning
- Plain: training the model to follow instructions.
- Technical: supervised fine-tuning on instruction-response pairs.
- Operator: instruction-tuned models follow prompts more literally.
- Confusion: not the same as RLHF.

### JSON Mode / Structured Output
- Plain: force the model to return JSON.
- Technical: constrained decoding against a schema.
- Operator: always validate; mode does not guarantee semantic correctness.
- Confusion: schema valid does not mean factually correct.

### Knowledge Cutoff
- Plain: the date after which the model has no training data.
- Technical: the latest date represented in pre-training corpus.
- Operator: ask "as of" date; supply current sources via tools.
- Confusion: cutoff is not when the model was released.

### Latency
- Plain: how long until you get the answer.
- Technical: time from request to last token, often measured as time-to-first-token (TTFT) and tokens-per-second (TPS).
- Operator: streaming reduces perceived latency.
- Confusion: latency depends on output length, not just model size.

### Logit
- Plain: the raw score before turning into a probability.
- Technical: pre-softmax output of the decoder.
- Operator: logit bias APIs let you nudge tokens.
- Confusion: logit is not probability.

### Loss
- Plain: how wrong the model was during training.
- Technical: scalar objective minimized via gradient descent.
- Operator: not visible at inference time.
- Confusion: low loss does not imply good behavior.

### MCP (Model Context Protocol)
- Plain: a standard way for models to call external tools.
- Technical: a protocol for exposing tools, resources, and prompts to LLM clients. LIKELY_NATIVE_UNVERIFIED in vendor specifics.
- Operator: prefer MCP servers for portability across clients.
- Confusion: MCP is a protocol, not a model.

### Memory
- Plain: things the model remembers between sessions.
- Technical: persisted state external to the model, re-injected as context.
- Operator: memory is just stored text; treat as untrusted.
- Confusion: not the same as context window.

### Multimodal
- Plain: handles text, images, audio, etc.
- Technical: model accepting and/or producing multiple modalities.
- Operator: cost and latency differ per modality.
- Confusion: a multimodal model is not equally capable in every modality.

### Neural Net
- Plain: a network of math units loosely inspired by neurons.
- Technical: parameterized function composed of layers and nonlinearities.
- Operator: LLMs are large transformer-based neural nets.
- Confusion: "neural" is metaphor, not biology.

### OpenAI
- Plain: a major AI vendor (ChatGPT, GPT models). UNKNOWN current product lineup in this run.
- Technical: vendor; specifics out of scope.
- Operator: pin model versions.
- Confusion: ChatGPT is a product; the API is separate.

### Anthropic
- Plain: vendor of Claude models. VERIFIED_DOCS as the publisher of this CLI's underlying model.
- Technical: vendor; specifics out of scope.
- Operator: pin model versions.
- Confusion: Claude app vs Claude API may differ.

### Parameter
- Plain: a tunable number inside the model.
- Technical: a weight or bias updated during training.
- Operator: parameter count is a rough capability proxy, not a guarantee.
- Confusion: API "parameters" (like temperature) are different.

### Perplexity
- Plain: how surprised the model is by text.
- Technical: exponentiated cross-entropy.
- Operator: useful for eval; not directly user-visible.
- Confusion: Perplexity.ai is a product; perplexity is a metric.

### Pre-training
- Plain: the first big training phase.
- Technical: self-supervised next-token prediction on large corpora.
- Operator: not user-controllable.
- Confusion: pre-training is not fine-tuning.

### Prompt
- Plain: what you tell the model.
- Technical: the full input context including system, user, and tool messages.
- Operator: prompts are programs; version them.
- Confusion: "the prompt" often means just the user message; treat the whole context.

### Prompt Injection
- Plain: someone hides instructions inside data.
- Technical: untrusted input containing instructions that override system intent.
- Operator: quarantine data; never mix data and instructions.
- Confusion: not the same as jailbreaking.

### Quantization
- Plain: shrinking model weights to fewer bits.
- Technical: lower-precision representation of weights or activations.
- Operator: trades quality for speed and memory.
- Confusion: int8 vs int4 quality differs significantly.

### RAG (Retrieval-Augmented Generation)
- Plain: look things up, then answer.
- Technical: retrieve documents from a store, append to context, generate.
- Operator: chunking and retrieval quality dominate outcomes.
- Confusion: RAG is not fine-tuning; both can coexist.

### Reasoning Summary
- Plain: a short explanation of how the answer was reached.
- Technical: a summary of intermediate reasoning, returned as final output.
- Operator: prefer this over hidden chain-of-thought.
- Confusion: reasoning summary is not raw thoughts.

### RLHF (Reinforcement Learning from Human Feedback)
- Plain: training the model with human ratings.
- Technical: PPO or DPO over a reward model trained on preferences.
- Operator: produces politeness and helpfulness; can induce sycophancy.
- Confusion: RLHF is not the same as instruction tuning.

### Sampling
- Plain: how the next word is picked.
- Technical: stochastic selection from the next-token distribution.
- Operator: temperature, top-k, top-p control diversity.
- Confusion: temperature 0 is not fully deterministic in all systems.

### Schema
- Plain: the shape your output must match.
- Technical: a typed structural description (JSON Schema, Protobuf).
- Operator: validate; reject; re-prompt.
- Confusion: schema-valid output can still be semantically wrong.

### Sliding Window
- Plain: only keep the last N tokens.
- Technical: bounded context where older tokens are dropped or compressed.
- Operator: causes context loss; re-summarize.
- Confusion: not the same as attention pattern.

### Streaming
- Plain: tokens appear as they are generated.
- Technical: server-sent events delivering tokens incrementally.
- Operator: improves perceived latency; complicates schema enforcement.
- Confusion: streaming does not lower total latency.

### Structured Output
- See JSON Mode.

### System Prompt
- Plain: the hidden instructions at the top.
- Technical: a high-priority message setting role and constraints.
- Operator: keep it stable to maximize prompt caching.
- Confusion: not actually hidden from the model; it sees it.

### Temperature
- Plain: how random the model is.
- Technical: scaling factor applied to logits before softmax.
- Operator: 0 for deterministic-ish; higher for diversity.
- Confusion: temperature 0 does not guarantee identical output.

### Token
- Plain: a chunk of text the model sees.
- Technical: a unit produced by the tokenizer, often a subword.
- Operator: cost is measured in tokens, not words.
- Confusion: 1 token is not 1 word; ratio varies by language.

### Tokenizer
- Plain: the thing that splits text into tokens.
- Technical: BPE or similar subword tokenizer.
- Operator: different models tokenize differently; counts vary.
- Confusion: token counts are model-specific.

### Tool Use
- Plain: the model calls external functions.
- Technical: structured output triggering a registered tool with typed args.
- Operator: validate args; log all calls.
- Confusion: tool call is not tool execution.

### Top-K
- Plain: only pick from the K most likely tokens.
- Technical: truncate sampling to top K probabilities.
- Operator: combine with temperature.
- Confusion: top-k limits diversity; top-p limits cumulative mass.

### Top-P (Nucleus Sampling)
- Plain: only pick from tokens whose probabilities sum to P.
- Technical: cumulative-probability cutoff for sampling.
- Operator: more adaptive than top-k.
- Confusion: top-p and temperature interact.

### Training
- Plain: teaching the model.
- Technical: gradient-based optimization of parameters.
- Operator: not user-controllable in hosted APIs (except fine-tune).
- Confusion: training is not inference.

### Transformer
- Plain: the architecture behind modern LLMs.
- Technical: stack of self-attention and feed-forward layers.
- Operator: not directly user-visible.
- Confusion: not the same as the model name.

### Vector DB
- Plain: a database that stores embeddings.
- Technical: a store supporting approximate nearest-neighbor search over vectors.
- Operator: chunking strategy matters more than DB choice.
- Confusion: a vector DB is not RAG; it is one component.

### Zero-Shot
- Plain: no examples, just the instruction.
- Technical: inference without in-context examples.
- Operator: works best when the task is common in training.
- Confusion: zero-shot is not "no prompt."

### Window
- See Context Window.

### Weight
- Plain: a single number inside the model.
- Technical: a learned parameter in a layer.
- Operator: open-weight means weights are downloadable; not the same as open-source.
- Confusion: open-weight is not open-data.

### Hallucinated Tool
- Plain: model invents a tool that does not exist.
- Technical: tool-call output that does not match the registered schema.
- Operator: validate tool name before dispatch.
- Confusion: looks identical to a real call until validated.

### Guardrail
- Plain: a check that blocks unsafe input or output.
- Technical: a classifier or rule layer wrapping the model.
- Operator: guardrails are probabilistic; layer multiple.
- Confusion: a guardrail is not alignment.

### Jailbreak
- Plain: tricking the model past safety filters.
- Technical: input that bypasses alignment or guardrails.
- Operator: assume adversarial users; test continuously.
- Confusion: jailbreak is not prompt injection (overlap, not identity).

### Knowledge Base
- Plain: the documents you let the model search.
- Technical: a corpus indexed for retrieval.
- Operator: keep it fresh; track ingestion dates.
- Confusion: not the same as model knowledge.

### Latent Space
- Plain: the internal abstract space of meanings.
- Technical: high-dimensional representation space.
- Operator: not directly accessible at inference.
- Confusion: latent space is not embedding space (related but distinct).

### Model Card
- Plain: the spec sheet for a model.
- Technical: documentation of capabilities, limits, and intended use.
- Operator: read before deployment.
- Confusion: not the same as API reference.

### Open-Weight
- Plain: weights are downloadable.
- Technical: model parameters released for local use.
- Operator: license terms vary; check.
- Confusion: open-weight is not open-source.

### Pipeline
- Plain: a sequence of steps producing an output.
- Technical: a composed series of preprocessing, model, and postprocessing stages.
- Operator: instrument each stage.
- Confusion: pipeline is not agent.

### Prompt Template
- Plain: a reusable prompt with slots.
- Technical: a parametric string with variables.
- Operator: version templates like code.
- Confusion: a template is not a prompt until filled.

### Quality Gate
- Plain: a check before output is shipped.
- Technical: validator (schema, classifier, eval) before downstream use.
- Operator: required for production agents.
- Confusion: not the same as guardrail.

### Reasoning Model
- Plain: a model tuned to think longer before answering.
- Technical: a model trained with extended reasoning traces.
- Operator: higher latency and cost; better on hard tasks.
- Confusion: reasoning model is not omniscient.

### Refusal
- Plain: the model declines.
- Technical: a safety-trained behavior producing a non-answer.
- Operator: distinguish legitimate refusals from overshoot.
- Confusion: a refusal is not a failure if context is genuinely unsafe.

### Retrieval
- Plain: looking documents up.
- Technical: ANN search over a vector store or BM25 over text.
- Operator: hybrid retrieval often wins.
- Confusion: retrieval is one step of RAG.

### Safety
- Plain: avoiding harmful output.
- Technical: combination of training, guardrails, and policy.
- Operator: layered defenses; never single-point.
- Confusion: safety is not alignment.

### Self-Consistency
- Plain: sample many times and pick the most common.
- Technical: majority vote over multiple sampled reasoning paths.
- Operator: increases cost; improves accuracy.
- Confusion: not the same as ensembling different models.

### Skill
- Plain: a packaged capability.
- Technical: a named bundle of instructions and resources usable by the model. CUSTOM_WORKFLOW depending on vendor.
- Operator: keep skills small and composable.
- Confusion: skill terminology varies by vendor.

### Specification (Spec)
- Plain: what the system should do.
- Technical: a written contract of inputs, outputs, and constraints.
- Operator: write the spec before the prompt.
- Confusion: a prompt is not a spec.

### Streaming Tool Calls
- Plain: the model emits a tool call as it generates.
- Technical: incremental tool-call deltas in a streamed response.
- Operator: buffer until complete before dispatch.
- Confusion: do not execute partial calls.

### Synthetic Data
- Plain: data generated by a model.
- Technical: model-produced data used for training or eval.
- Operator: risk of distribution collapse; mix with real data.
- Confusion: synthetic data is not free.

### Tool Schema
- Plain: the shape of a tool's inputs.
- Technical: a typed declaration of tool parameters.
- Operator: write tight schemas; reject invalid args.
- Confusion: tool schema is not output schema.

### Toxicity
- Plain: harmful or abusive content.
- Technical: a classifier label for harmful output.
- Operator: layered detection; locale-aware.
- Confusion: toxicity is a narrow safety subset.

### Vector
- Plain: a list of numbers.
- Technical: an n-dimensional numeric array.
- Operator: not all vectors are embeddings.
- Confusion: vectors are dimensionless without a model.

### Watermarking
- Plain: hidden signal marking AI output.
- Technical: statistical bias inserted into generation. LIKELY_NATIVE_UNVERIFIED across vendors.
- Operator: do not rely on it for detection.
- Confusion: watermark is not a content classifier.

### Workflow
- Plain: a defined sequence of AI steps for a task.
- Technical: composed prompts, tools, and validators.
- Operator: write the workflow before the prompt.
- Confusion: workflow is not agent.

### YAML / Structured Config
- Plain: a config file format.
- Technical: hierarchical key-value config.
- Operator: prefer typed schemas; YAML is brittle.
- Confusion: a YAML prompt is still a prompt.

### Zero-Data Mode
- Plain: vendor mode promising no training on your data.
- Technical: contractual exclusion from training pipelines. UNKNOWN per vendor.
- Operator: verify in vendor terms.
- Confusion: zero-data is not zero-retention.

### Chunking
- Plain: splitting documents into smaller pieces.
- Technical: segmenting text by tokens, sentences, or semantic boundaries.
- Operator: chunk size and overlap dominate retrieval quality.
- Confusion: chunking is not summarization.

### Reranker
- Plain: a model that re-orders retrieved results.
- Technical: a cross-encoder scoring query-document pairs.
- Operator: rerank top-k from cheap retrieval.
- Confusion: reranker is not retriever.

### Hybrid Search
- Plain: keyword plus semantic search combined.
- Technical: BM25 plus vector retrieval, fused.
- Operator: usually beats either alone.
- Confusion: hybrid is not just two systems.

### Tool Router
- Plain: the part that picks which tool to call.
- Technical: a classifier or LLM routing requests to tools.
- Operator: log routing decisions for debugging.
- Confusion: router is not the tool.

### Plan
- Plan: the agent's intended sequence of steps.
- Technical: a structured representation of next actions.
- Operator: log plans; replan when state changes.
- Confusion: a plan is not a guarantee.

### Critic
- Plain: a second model that judges the first.
- Technical: an evaluator model scoring outputs.
- Operator: useful for self-consistency and quality gates.
- Confusion: a critic is not a verifier.

### Verifier
- Plain: a check that confirms a fact.
- Technical: a deterministic or model-based check against ground truth.
- Operator: prefer deterministic verifiers when possible.
- Confusion: verifier is not critic.

### Determinism
- Plain: same input, same output.
- Technical: reproducible output given seed and config.
- Operator: pin seed, temperature, and model version.
- Confusion: temperature 0 alone is not deterministic.

### Drift
- Plain: behavior changes over time.
- Technical: shift in model behavior across versions or in user inputs.
- Operator: monitor with golden evals.
- Confusion: drift is not bug.

### Eval Harness
- Plain: the framework that runs evals.
- Technical: tooling that scores model outputs on a dataset.
- Operator: keep evals task-specific.
- Confusion: an eval harness is not a benchmark.

### Golden Set
- Plain: a small high-quality test set.
- Technical: hand-curated examples with known answers.
- Operator: run on every change.
- Confusion: golden set is not training data.

### Replay
- Plain: re-running a past session.
- Technical: deterministic re-execution with logged inputs.
- Operator: replay before shipping changes.
- Confusion: replay is not regeneration.

### Sandbox
- Plain: an isolated execution environment.
- Technical: a constrained runtime for untrusted code or tools.
- Operator: required for any tool that touches the system.
- Confusion: a sandbox is not a guarantee.

### Telemetry
- Plain: logs and metrics from production.
- Technical: structured events about requests, outputs, costs.
- Operator: log every prompt, response, and tool call.
- Confusion: telemetry is not training data unless you opt in.

### Throughput
- Plain: how many requests per second.
- Technical: tokens or requests processed per unit time.
- Operator: scales with batching and parallelism.
- Confusion: throughput and latency are independent.

### Token Budget
- Plain: how many tokens you are willing to spend.
- Technical: a cap on input plus output tokens per call or session.
- Operator: set per-call and per-session caps.
- Confusion: token budget is not rate limit.

### Trace
- Plain: a recorded sequence of agent steps.
- Technical: structured log of plan, tool calls, and outputs.
- Operator: required for debugging agents.
- Confusion: trace is not transcript.

### Transcript
- Plain: the chat history.
- Technical: ordered list of messages in a session.
- Operator: store with metadata.
- Confusion: transcript is not trace.

### Caching (Result)
- Plain: storing past answers to reuse.
- Technical: keying on prompt hash to skip inference.
- Operator: invalidate on context change.
- Confusion: result caching is not prompt caching.

### Latency Budget
- Plain: how long you can wait.
- Technical: target P95 time-to-completion.
- Operator: pick model and streaming based on budget.
- Confusion: budget is per-request, not average.

### Context Engineering
- Plain: designing what the model sees.
- Technical: composing system, memory, retrieval, and user inputs deliberately.
- Operator: most production wins come from context, not model choice.
- Confusion: context engineering is not prompt engineering alone.

### Prompt Engineering
- Plain: writing better prompts.
- Technical: iterating prompt structure and wording for desired outputs.
- Operator: version and eval prompts like code.
- Confusion: prompt engineering is a subset of context engineering.

### Model Routing
- Plain: pick a different model per task.
- Technical: dispatch logic selecting a model by cost, latency, or capability.
- Operator: route cheap tasks to small models.
- Confusion: model routing is not tool routing.

### Cost Per Million Tokens
- Plain: price unit for API calls.
- Technical: USD per 1e6 input or output tokens. UNKNOWN per vendor in this run.
- Operator: track separately for input and output.
- Confusion: input and output rates usually differ.

### Tokens Per Second (TPS)
- Plain: how fast it generates.
- Technical: output tokens emitted per second.
- Operator: affects perceived latency.
- Confusion: TPS depends on model and load.

### Time To First Token (TTFT)
- Plain: how long until the first token appears.
- Technical: latency from request start to first emitted token.
- Operator: streaming hides total latency by reducing TTFT.
- Confusion: TTFT is not total latency.
