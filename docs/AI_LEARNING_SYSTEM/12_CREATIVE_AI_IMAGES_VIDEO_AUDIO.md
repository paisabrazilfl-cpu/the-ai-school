# 12 CREATIVE AI: IMAGES, VIDEO, AUDIO

Part of the AI_LEARNING_SYSTEM manual. Operator-grade guide to driving generative media tools deterministically.

WEB VERIFICATION NOT AVAILABLE IN THIS RUN. All platform-specific claims are tagged. Tags used:
- VERIFIED_LOCAL: confirmed against files in this repo
- VERIFIED_DOCS: confirmed against canonical vendor docs at time of writing
- USER_PROVIDED_UNVERIFIED: claim stated by user, not re-verified here
- CUSTOM_WORKFLOW: technique recommended by this manual, not tool-specific
- LIKELY_NATIVE_UNVERIFIED: plausibly a native feature, not re-verified
- UNKNOWN: cannot be determined without live web access
- DEPRECATED: previously available, may no longer be

---

## 1. Purpose

This chapter teaches you how to direct image, video, voice, and music generation systems so that output is predictable, on-brand, and reproducible. Treat generative media tools as junior production staff who follow precise briefs. The brief is the prompt.

You will learn:
- A canonical prompt formula per modality (image, video, voice, music)
- How to fix the most common artifacts (hands, text, drift, motion)
- How to maintain brand consistency across batches
- How to verify output before you ship it

---

## 2. Who It Is For

| Audience | Use this chapter to |
|---|---|
| Beginners | Stop typing one-line prompts and start writing structured briefs |
| Marketers | Produce ad creative, thumbnails, voiceovers with consistent brand |
| Filmmakers / editors | Pre-vis, b-roll, motion tests with controllable cameras |
| Founders | Generate pitch visuals and product mockups without a designer |
| Operators | Run repeatable batch generations with seed control and references |

---

## 3. Beginner Explanation

A generative model is a guess machine. You give it words; it returns pixels, frames, or audio samples that statistically match those words. The more specific the words, the narrower the guess. Vague prompts produce average results. Structured prompts produce specific results.

Think of a prompt as a checklist a film crew would receive: who is in the shot, where, how lit, what lens, what mood, what to avoid, what format to deliver.

You will rarely get the perfect output on the first try. The loop is:
1. Brief (prompt)
2. Generate
3. Inspect
4. Adjust one variable
5. Regenerate

Changing one variable at a time is the difference between learning the tool and fighting it.

---

## 4. Operator Explanation

At operator level you treat each platform as a controlled function with:
- A prompt grammar (positional and keyword tokens)
- Optional reference inputs (style refs, character refs, audio refs)
- Determinism controls (seeds, weights, fixed parameters)
- Output specs (aspect ratio, duration, resolution, codec)

You build prompt templates per use case, store them in version control, and treat the seed plus prompt plus reference set as a reproducible recipe. You log which recipe produced which asset.

---

## 5. Core Concepts

### 5.1 Platform Map

| Platform | Modality | Status |
|---|---|---|
| ChatGPT image (native image generation) | Image | LIKELY_NATIVE_UNVERIFIED |
| Midjourney | Image | VERIFIED_DOCS |
| Adobe Firefly | Image, vector, generative fill | VERIFIED_DOCS |
| Ideogram | Image (strong typography) | VERIFIED_DOCS |
| Leonardo AI | Image, asset pipelines | VERIFIED_DOCS |
| Runway | Video, motion, editing | VERIFIED_DOCS |
| Pika | Video | VERIFIED_DOCS |
| Kling | Video | VERIFIED_DOCS |
| ElevenLabs | Voice, dubbing, sound design | VERIFIED_DOCS |
| Suno | Music, vocals | VERIFIED_DOCS |
| Udio | Music | VERIFIED_DOCS |
| Canva AI | Templated design, image, text-to-image | VERIFIED_DOCS |

Specific feature claims (seed support, character reference, exact aspect ratios) are tagged inline below. WEB VERIFICATION NOT AVAILABLE IN THIS RUN.

### 5.2 Prompt Grammar

Each modality has a canonical slot order. The slot order is a memory aid; you do not have to use every slot.

```
IMAGE: SUBJECT + SCENE + STYLE + COMPOSITION + LIGHTING + CAMERA + MOOD + DETAILS + NEGATIVE + OUTPUT
VIDEO: SCENE + SUBJECT ACTION + CAMERA MOVEMENT + TIMING + STYLE + LIGHTING + TRANSITIONS + MOTION CONSTRAINTS + DURATION + ASPECT
VOICE: VOICE TYPE + AGE + ACCENT + EMOTION + PACE + ENERGY + PRONUNCIATION + DELIVERY + SCRIPT
MUSIC: GENRE + MOOD + BPM + INSTRUMENTS + VOCALS + STRUCTURE + REFERENCE + EXCLUSIONS
```

### 5.3 Determinism Controls

| Control | Image | Video | Voice | Music |
|---|---|---|---|---|
| Seed | Some platforms support (Midjourney `--seed`, Leonardo, Firefly variable) VERIFIED_DOCS for MJ, UNKNOWN for others at run time | Limited UNKNOWN | N/A | Limited UNKNOWN |
| Style reference image | Midjourney `--sref`, Leonardo, Firefly VERIFIED_DOCS | Runway / Pika / Kling reference frames LIKELY_NATIVE_UNVERIFIED | N/A | N/A |
| Character reference | Midjourney `--cref` VERIFIED_DOCS, others vary | Runway character refs LIKELY_NATIVE_UNVERIFIED | ElevenLabs voice clone VERIFIED_DOCS | N/A |
| Aspect ratio | Universal | Universal | N/A | N/A |
| Negative prompt | Midjourney `--no`, Firefly negative, Leonardo VERIFIED_DOCS | Varies UNKNOWN | N/A | Suno / Udio exclusions LIKELY_NATIVE_UNVERIFIED |

### 5.4 The Reproducibility Recipe

```
RECIPE = PROMPT + REFERENCE_SET + SEED + PARAMETERS + PLATFORM_VERSION
```

Store the recipe with every shipped asset. If a stakeholder asks for "the same but with a blue jacket," you change one variable and regenerate, instead of starting over.

---

## 6. Workflow

```
GENERATIVE MEDIA WORKFLOW
.
|-- 1. DEFINE BRIEF
|     |-- Use case (ad / thumbnail / pre-vis / VO / jingle)
|     |-- Deliverable specs (size, duration, format)
|     `-- Brand constraints (palette, voice, tone)
|
|-- 2. CHOOSE PLATFORM
|     |-- Match modality and strengths to brief
|     `-- Confirm rights / licensing for commercial use (VERIFIED_DOCS per platform)
|
|-- 3. WRITE STRUCTURED PROMPT
|     |-- Fill canonical slots
|     |-- Add references
|     `-- Set determinism controls
|
|-- 4. GENERATE BATCH (usually 4 variants)
|
|-- 5. INSPECT
|     |-- Anatomy / hands / faces
|     |-- Typography
|     |-- Motion artifacts (video)
|     |-- Pronunciation / pacing (voice)
|     `-- Structure / mix (music)
|
|-- 6. ITERATE ONE VARIABLE AT A TIME
|
|-- 7. LOCK RECIPE
|
|-- 8. UPSCALE / EXPORT
|
`-- 9. LOG RECIPE WITH ASSET
```

---

## 7. Cheat Sheet

### 7.1 Image Formula

```
[SUBJECT, specific] in [SCENE, specific] ,
[STYLE: medium + artist family + era] ,
[COMPOSITION: rule of thirds / centered / close-up / wide] ,
[LIGHTING: source + direction + quality] ,
[CAMERA: lens mm + aperture + camera body] ,
[MOOD: 2-3 adjectives] ,
[DETAILS: 3-6 concrete nouns] ,
--no [NEGATIVE constraints]
[OUTPUT: --ar W:H --q quality --seed N]
```

### 7.2 Video Formula

```
SCENE: [location, time of day]
SUBJECT ACTION: [who, doing what, beat by beat]
CAMERA MOVEMENT: [dolly in / orbit / handheld / static / crane]
TIMING: [0-2s establish, 2-4s action, 4-5s resolve]
STYLE: [film stock / animation style]
LIGHTING: [practical / motivated / high key / low key]
TRANSITIONS: [hard cut / match cut / dissolve]
MOTION CONSTRAINTS: [no morphing, stable hands, locked horizon]
DURATION: [seconds]
ASPECT: [16:9 / 9:16 / 1:1]
```

### 7.3 Voice Formula

```
VOICE TYPE: [warm baritone / bright soprano / neutral mid-tenor]
AGE: [late 30s]
ACCENT: [General American / RP / Scottish]
EMOTION: [calm authority / excited / reassuring]
PACE: [words per minute target or "measured"]
ENERGY: [conversational / broadcast / intimate]
PRONUNCIATION: [provide IPA or rewrites for tricky names]
DELIVERY: [pause after each comma, lift on questions]
SCRIPT: |
  <<<text here>>>
```

### 7.4 Music Formula

```
GENRE: [neo-soul / lo-fi / cinematic orchestral]
MOOD: [hopeful, melancholy, driving]
BPM: [92]
INSTRUMENTS: [Rhodes, upright bass, brush kit, soft strings]
VOCALS: [none / female lead / male choir / hummed]
STRUCTURE: [intro 8 / verse 16 / chorus 8 / bridge 8 / outro 8]
REFERENCE: [in the style of late-night jazz radio]
EXCLUSIONS: [no EDM drops, no autotune, no distorted guitar]
```

### 7.5 Common Parameter Reference (tagged)

| Parameter | Midjourney VERIFIED_DOCS | Firefly VERIFIED_DOCS | Leonardo VERIFIED_DOCS | Ideogram VERIFIED_DOCS |
|---|---|---|---|---|
| Aspect ratio | `--ar 16:9` | UI control | UI control | UI control |
| Seed | `--seed 12345` | varies UNKNOWN | UI control | UI control |
| Negative | `--no text, hands` | UI field | UI field | UI field |
| Style ref | `--sref URL` | structure / style refs | image guidance | style ref |
| Character ref | `--cref URL` | UNKNOWN | character feature | UNKNOWN |

---

## 8. Examples

### 8.1 Portrait Image

```
A woman in her early 40s seated at a wooden desk in a Brooklyn loft ,
editorial portrait, modern Annie-Leibovitz lighting school ,
medium close-up, rule of thirds, eyes on left third ,
soft north-facing window light from camera left, gentle fill from a white card camera right ,
shot on Hasselblad H6D, 80mm, f/2.8 ,
mood: composed, thoughtful, warm ,
details: linen blazer, brass desk lamp, hardcover books, single ceramic mug ,
--no extra fingers, distorted face, text, watermark ,
--ar 4:5 --q 2 --seed 88421
```

### 8.2 Product Photo

```
A matte-black ceramic coffee mug centered on a textured oak surface ,
commercial product photography, catalogue style ,
centered composition, slight 15 degree top-down ,
soft box from upper left, fill card right, black flag behind to deepen shadow ,
shot on Phase One IQ4, 120mm macro, f/8 ,
mood: premium, calm, minimal ,
details: visible ceramic grain, condensation droplets, steam wisp ,
--no logos, hands, text, reflection of operator ,
--ar 1:1 --seed 33310
```

### 8.3 Editorial Image

```
A teenage skateboarder mid-ollie over a cracked concrete ledge in East LA at golden hour ,
editorial documentary, leaning into Larry-Clark realism ,
wide shot, subject occupying lower right third, lens flare into upper left ,
low warm sun back-camera-right, long shadows ,
shot on Leica M6, 35mm, f/4, Portra 400 ,
mood: kinetic, defiant, nostalgic ,
details: scuffed Vans, frayed denim, graffitied wall, palm fronds ,
--no airbrushed skin, perfect anatomy, plastic look ,
--ar 3:2
```

### 8.4 Cinematic Still

```
A lone astronaut standing on a black volcanic plain under a violet sky with two moons ,
cinematic, Denis Villeneuve color palette ,
extreme wide, figure in lower center, horizon high ,
single key from upper left moon, deep cool shadows, faint atmospheric haze ,
anamorphic 2.39:1, 40mm, f/2.0 ,
mood: solitude, awe, dread ,
details: ribbed pressure suit, helmet reflection of distant lights, dust trail ,
--no lens dirt, motion blur, busy foreground ,
--ar 21:9
```

### 8.5 Brand Thumbnail (YouTube)

```
Front-facing host (use --cref host_ref.png) pointing at floating 3D text "AI IN 60 SECONDS" ,
high-contrast YouTube thumbnail style ,
host on right third, text on left two-thirds, slight tilt on text ,
bright key from front-left, rim light from behind to pop subject off background ,
shot equivalent: 50mm, f/2.8 ,
mood: urgent, fun, confident ,
details: brand color #FF3D00, drop shadow on text, neutral charcoal background ,
--no clutter, secondary characters, small text, watermark ,
--ar 16:9 --seed 70011
```

### 8.6 Ad Creative

```
A father and child laughing while assembling a wooden toy together on a living room rug ,
warm lifestyle advertising, Apple-2010s tonality ,
medium shot, eye-line at child's level, shallow depth of field ,
golden hour through sheer curtains, bounce fill ,
shot on ARRI Alexa Mini, 35mm, T2.8 ,
mood: tender, present, honest ,
details: brand colors muted into wardrobe, no logos visible, magazines stacked ,
--no staged smiles, stock-photo gloss, lens distortion ,
--ar 4:5 --seed 50227
```

### 8.7 Video Prompt: Product Hero (Runway / Pika / Kling) UNKNOWN per-platform parameter syntax

```
SCENE: clean studio cyclorama, soft graduated gray
SUBJECT ACTION: a sleek wireless earbud case slowly rotates 360 degrees while the lid opens at the halfway point
CAMERA MOVEMENT: locked-off close-up, no movement
TIMING: 0-2s closed and rotating, 2-3s lid opens, 3-5s continues rotating with lid open
STYLE: photoreal commercial, premium tech advertising
LIGHTING: large overhead softbox, two side rims, no harsh hot-spots on metal
TRANSITIONS: none, single take
MOTION CONSTRAINTS: no morphing of logo, no warping of seams, stable reflections
DURATION: 5s
ASPECT: 1:1
```

### 8.8 Voice Prompt (ElevenLabs) VERIFIED_DOCS for product, parameter exposure varies by tier

```
VOICE TYPE: warm baritone
AGE: late 30s
ACCENT: General American
EMOTION: calm authority with a hint of warmth
PACE: measured, around 150 wpm
ENERGY: broadcast documentary
PRONUNCIATION: pronounce "Anthropic" as an-THROP-ik
DELIVERY: short pauses at commas, longer pause at em-dashes, lift on question marks
SCRIPT: |
  Most people think learning AI is about prompts. It is not.
  It is about systems. And systems start with one question -
  what do you actually want this thing to do?
```

### 8.9 Music Prompt (Suno / Udio) LIKELY_NATIVE_UNVERIFIED per-field syntax

```
GENRE: cinematic neo-soul
MOOD: hopeful, late-night, reflective
BPM: 88
INSTRUMENTS: Rhodes electric piano, upright bass, brush kit, muted trumpet pads
VOCALS: female lead, mid-range, intimate
STRUCTURE: intro 8 / verse 16 / chorus 8 / verse 16 / chorus 8 / outro 8
REFERENCE: in the spirit of late-night radio jazz, contemporary
EXCLUSIONS: no EDM drops, no autotune, no distorted electric guitar, no trap hats
```

---

## 9. Common Mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| One-line prompts | Generic output | Fill the formula slots |
| Changing five variables at once | Cannot tell what helped | Change one variable per iteration |
| No negative prompt | Recurring junk (extra fingers, watermarks) | Use negatives explicitly |
| Asking for text in non-typography models | Garbled letters | Use Ideogram VERIFIED_DOCS or composite text in post |
| No seed control | Cannot reproduce | Capture seed in recipe log |
| Vague camera direction | Inconsistent framing | Specify lens, aperture, distance |
| Overstuffed prompts | Model averages everything | Cap details at 6 nouns |
| No reference image for characters | Drift across batches | Use `--cref` (MJ VERIFIED_DOCS) or platform character refs |
| Trusting first generation | Ships flawed asset | Inspect at 100 percent zoom |
| Ignoring rights and licensing | Legal risk | Read platform terms VERIFIED_DOCS; do not generate likeness of real people without consent |

### 9.1 Artifact-Specific Fixes

| Artifact | Fix |
|---|---|
| Bad hands | Add "natural anatomically correct hands, five fingers, relaxed pose"; negative "extra fingers, fused fingers, claw"; consider hand-only inpainting pass |
| Bad faces | Increase image weight on face, lower scene complexity, use higher quality setting, inpaint face only |
| Garbled text | Move to Ideogram VERIFIED_DOCS or generate plain image and overlay typography in design tool |
| Character drift | Use `--cref` MJ VERIFIED_DOCS or persistent character feature where supported; reuse seed where possible |
| Lighting drift across set | Lock lighting description verbatim across prompts; reuse style reference image |
| Motion morphing in video | Shorten duration, reduce motion magnitude, add motion constraints "no morphing, stable geometry" |
| Prompt drift across iterations | Maintain a base prompt file; diff every change; only one variable per iteration |

---

## 10. Recovery Commands

These are template prompts you paste when something goes wrong. They are CUSTOM_WORKFLOW unless tagged.

### 10.1 "Make it look like the brand again"

```
Using the attached style reference image as authoritative ,
re-render the previous subject and composition ,
match palette, contrast curve, grain, and color temperature to the reference exactly ,
keep all subject details the same ,
--sref <reference URL> --ar [same as before] --seed [same as before]
```

### 10.2 "Fix the hands only"

```
INPAINT MASK: hands only
Re-generate hands as anatomically correct, five fingers, relaxed natural pose ,
match skin tone, lighting, and shadow direction to surrounding image ,
do not alter any pixels outside the mask ,
--no extra fingers, fused fingers, claws, deformities
```

### 10.3 "Stabilize a wobbling video clip"

```
Re-render with reduced motion ,
camera: locked-off, no movement ,
subject action: minimal, slow ,
motion constraints: no morphing, stable geometry, locked horizon, no warping at edges ,
duration: 3s instead of 5s ,
keep prompt, style reference, and seed otherwise identical
```

### 10.4 "Get pronunciation right" (voice)

```
Regenerate with the following pronunciation overrides ,
- "Anthropic" -> an-THROP-ik
- "Llama" -> LAH-mah
- "Claude" -> klod (single syllable, soft d)
Keep voice, accent, pace, and emotion identical to previous take.
```

### 10.5 "Recover a lost recipe"

```
Given this final image, please produce a reasoning summary describing:
- likely subject, scene, composition, lighting, lens, mood tokens
- a candidate prompt that would re-create it
- candidate aspect ratio and any obvious parameters
Do not invent details that are not visible.
```

---

## 11. Verification Checklist

Before shipping any generated asset, run this checklist.

Image
- [ ] Faces inspected at 100 percent zoom
- [ ] Hands and feet inspected
- [ ] Typography is legible or absent
- [ ] No accidental watermark / logo / signature
- [ ] Brand palette matches reference
- [ ] Aspect ratio matches delivery spec
- [ ] Licensing reviewed for commercial use VERIFIED_DOCS per platform
- [ ] Recipe (prompt, seed, refs, params, platform version) logged

Video
- [ ] No morphing in faces or hands across frames
- [ ] Horizon stable
- [ ] Motion is intentional
- [ ] No flicker on text or logos
- [ ] Edges do not warp during camera moves
- [ ] Audio sync if present
- [ ] Duration and aspect match spec
- [ ] Recipe logged

Voice
- [ ] Names and acronyms pronounced correctly
- [ ] No clipping or breath artifacts
- [ ] Pace matches target wpm
- [ ] Tone matches brief
- [ ] Loudness normalized to delivery target (for example -16 LUFS for streaming) VERIFIED_DOCS general practice
- [ ] Recipe (voice ID, settings, script) logged

Music
- [ ] Structure matches brief
- [ ] No unintended vocals or stems
- [ ] BPM matches edit
- [ ] No copyrighted melody triggers (best-effort listen)
- [ ] Loudness normalized for delivery
- [ ] Recipe logged

---

## 12. Practice Drills

Drill 1 - Single-variable iteration
- Generate the same image five times, changing only LIGHTING each time.
- Compare. Identify which lighting term moves the image most.

Drill 2 - Negative prompt power
- Generate a portrait once with no negative prompt, once with a strong negative list.
- Compare anatomical and typographic errors.

Drill 3 - Reference locking
- Pick a brand palette image. Generate 4 different scenes all using the same style reference.
- Score consistency on a 1-5 scale.

Drill 4 - Character continuity
- Using `--cref` (MJ) VERIFIED_DOCS or a platform character feature, place the same character in 5 scenes.
- Score face consistency.

Drill 5 - Video motion budget
- Generate the same 5s clip twice, once with "dynamic camera" and once with "locked off."
- Identify which has fewer artifacts.

Drill 6 - Voice direction
- Render the same script with three emotion tokens: "calm authority," "excited," "intimate."
- Choose the one closest to brief.

Drill 7 - Music structure
- Generate the same song with two structures: AABA and ABABCB.
- Compare which fits an edit better.

Drill 8 - Recovery
- Take an image you did not create. Ask the model for a reasoning summary describing a candidate prompt. Test it. Iterate.

---

## 13. Summary

Generative media tools are deterministic enough to be production-grade when you give them structured briefs and control their inputs. The four formulas in this chapter (image, video, voice, music) are your standing templates. Add references. Capture seeds. Iterate one variable at a time. Verify before shipping. Log the recipe with every asset so you can reproduce or hand off. Treat the model as a junior crew member who follows specs exactly: your output quality is bounded by the quality of your brief, not by the model.

WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Re-confirm platform-specific parameter syntax and licensing terms against current vendor documentation before production use.
