# 21 - Image / Video / Voice / Music AI Cheat Sheet

Companion to file 12 in the AI_LEARNING_SYSTEM manual. A quick-reference card per platform with prompt formula refreshers at the end.

Status tags used in this document:
- VERIFIED_LOCAL - confirmed from local repo evidence in this run
- VERIFIED_DOCS - confirmed from official documentation accessed in this run
- USER_PROVIDED_UNVERIFIED - asserted by the user but not independently verified
- CUSTOM_WORKFLOW - fan-name or user-coined pattern, not an official feature
- LIKELY_NATIVE_UNVERIFIED - plausibly a real platform feature, not verified here
- UNKNOWN - cannot confirm or deny
- DEPRECATED - confirmed retired or replaced

WEB VERIFICATION NOT AVAILABLE IN THIS RUN. Every platform feature below is tagged conservatively.

---

## Image platforms

### Midjourney

- Best For: stylized, painterly, cinematic, high-aesthetic still images. Strong defaults for composition and lighting.
- Weak For: literal text in images, precise spatial layout, brand-consistent product shots, photoreal hands and complex anatomy at edges.
- Prompt Style: subject, action, environment, lighting, lens, style references, mood, aspect ratio. Short and dense beats long and vague.
- Known Modes (LIKELY_NATIVE_UNVERIFIED): style references, character references, aspect ratio control, stylize parameter, raw mode, upscaling, variation, region edits.
- Common Failure: prompt ignored or under-weighted when too many concepts compete.
- Fix: cut concept count, increase weight on the primary subject, pin style with a reference, run variations.

### ChatGPT image (image generation inside ChatGPT)

- Best For: conversational iteration, text-in-image attempts, infographic-style outputs, edits via natural language, integration with chat context.
- Weak For: extreme photorealism on demand, strict brand consistency across many images, fine control over exact composition.
- Prompt Style: natural language with explicit constraints; iterate by replying to the image and naming what to change.
- Known Modes (LIKELY_NATIVE_UNVERIFIED): edit / inpaint, mask-based edits, style transfer via reference image, aspect ratio control, transparent backgrounds for some outputs.
- Common Failure: drift when iterating; later images diverge from the original look.
- Fix: pin the look by reuploading the reference each turn and naming the elements to preserve.

### Adobe Firefly

- Best For: commercial-safe assets (training on licensed content), Photoshop integration via generative fill, brand workflows, vector outputs.
- Weak For: bleeding-edge stylization vs Midjourney; some creative ranges feel conservative.
- Prompt Style: clear subject and style. Use the structured controls in the UI (content type, style, color, lighting, composition).
- Known Modes (LIKELY_NATIVE_UNVERIFIED): generative fill, generative expand, text effects, generate similar, vector generate, structure and style reference.
- Common Failure: outputs feel safe and generic.
- Fix: stack style controls (lighting plus composition plus color plus reference) and refine via generative fill.

### Ideogram

- Best For: legible text in images, typography, logos and posters with readable type, layout-aware design.
- Weak For: complex scenes where text dominates the prompt budget; sometimes weaker on painterly aesthetic vs Midjourney.
- Prompt Style: state the exact text in quotes, the placement, the typography style, then the surrounding scene.
- Known Modes (LIKELY_NATIVE_UNVERIFIED): magic prompt, style presets, aspect ratio control, remix.
- Common Failure: extra or misspelled words appearing in the image.
- Fix: keep the quoted text short, isolate it, and re-roll. For long copy, generate the background and add real text in a design tool.

### Leonardo

- Best For: game art, concept art, character sheets, controllable workflows with model and LoRA-style selection.
- Weak For: cinematic photorealism at the very top end vs dedicated photoreal models.
- Prompt Style: pick the right base model first, then prompt with subject, style tokens, and negative prompt where supported.
- Known Modes (LIKELY_NATIVE_UNVERIFIED): finetuned models, image-to-image, canvas edits, prompt magic, alchemy.
- Common Failure: inconsistent style across a series.
- Fix: lock the base model, lock a seed where supported, and use image-to-image with a reference.

---

## Video platforms

### Runway

- Best For: text-to-video and image-to-video for short cinematic clips, motion brush, camera controls, editing workflows.
- Weak For: long-form continuity, perfect lip sync at scale, high-fidelity human faces under stress.
- Prompt Style: subject, action, camera move, lens, lighting, duration, style. Short prompts with explicit camera language.
- Known Modes (LIKELY_NATIVE_UNVERIFIED): image-to-video, text-to-video, motion brush, camera controls, extend clip, lip sync, green screen.
- Common Failure: morphing artifacts on faces and hands during motion.
- Fix: shorten the clip, simplify motion, lock the subject with image-to-video instead of pure text-to-video.

### Pika

- Best For: short stylized clips, quick experiments, lip sync features, easy social-format outputs.
- Weak For: long shots, complex multi-subject scenes, photoreal physics.
- Prompt Style: short and visual. Specify camera, motion, and style.
- Known Modes (LIKELY_NATIVE_UNVERIFIED): image-to-video, modify region, lip sync, sound effects, extend.
- Common Failure: jittery motion or warped backgrounds.
- Fix: lower motion intensity, use image-to-video with a clean still, keep the camera move simple.

### Kling

- Best For: longer clip durations than typical competitors, strong physics on certain motions.
- Weak For: fine-grained creative control compared with editor-style tools; access and quota can be constrained.
- Prompt Style: clear subject and action, explicit camera direction, lighting, mood.
- Known Modes (LIKELY_NATIVE_UNVERIFIED): text-to-video, image-to-video, extend, motion control.
- Common Failure: prompt drift over longer durations.
- Fix: break the shot into multiple shorter generations and stitch them in an editor.

---

## Voice / Music platforms

### ElevenLabs

- Best For: high-quality TTS, voice cloning, multilingual narration, dubbing.
- Weak For: highly emotional improvisational performance; legal use of cloned voices without consent.
- Prompt Style: write the script with punctuation that matches the intended cadence. Use SSML-like cues where supported.
- Known Modes (LIKELY_NATIVE_UNVERIFIED): instant voice cloning, professional voice cloning, voice design, dubbing, projects, sound effects.
- Common Failure: flat delivery on long paragraphs.
- Fix: split into shorter lines, add explicit pauses, vary stability settings, choose a voice tuned to the use case.

### Suno

- Best For: full songs with vocals from a prompt, multiple genres, fast iteration.
- Weak For: exact mixing control, instrument-level edits, legal clearance for commercial use without checking terms.
- Prompt Style: name the genre, mood, instrumentation, tempo, and vocal style. Provide lyrics in the lyrics field.
- Known Modes (LIKELY_NATIVE_UNVERIFIED): custom lyrics, instrumental only, extend, remix, style transfer.
- Common Failure: lyrics misheard or mispronounced.
- Fix: simplify lyrics, avoid uncommon words, use phonetic spellings where allowed.

### Udio

- Best For: high-fidelity song generation, genre control, longer compositions through extension.
- Weak For: same caveats as Suno on mixing-level control and commercial clearance.
- Prompt Style: list genre tags, mood, instruments, era, vocal qualities. Use the structured tag input rather than free prose where available.
- Known Modes (LIKELY_NATIVE_UNVERIFIED): extend, remix, inpaint, manual mode, tags.
- Common Failure: structural sameness across sections.
- Fix: explicitly write section markers (verse, chorus, bridge) into the lyrics and prompt sections individually via extend.

---

## Design / All-in-one

### Canva AI

- Best For: design-in-context AI: backgrounds, fills, copy generation, presentation creation, brand kits.
- Weak For: heavy-creative-control workflows; the AI is tuned for accessible design, not director-grade output.
- Prompt Style: short, intent-led prompts inside the template you already chose. Lean on Canva's structured controls.
- Known Modes (LIKELY_NATIVE_UNVERIFIED): Magic Write, Magic Design, Magic Edit, Magic Eraser, Magic Expand, Magic Switch, brand voice.
- Common Failure: generic visuals that look like every other Canva output.
- Fix: bring your own reference images, lock the brand kit, write a specific prompt that names mood and audience.

---

## Prompt formula refresher cards

### Image prompt formula

> [Subject] doing [action] in [environment], [lighting], [camera or lens], [style or reference], [mood], [aspect ratio]. Avoid: [negatives].

Tips:
- One main subject. Push secondary subjects to "in the background."
- Lighting is the cheapest upgrade: name it (golden hour, rim light, soft window light, neon).
- Style references beat style adjectives. Use a reference image when supported.
- Aspect ratio matters; default square crops bury composition.

### Video prompt formula

> [Shot type] of [subject] [action], camera [move], [lens or focal length], [lighting], [environment], [duration], [style]. Keep motion [low / moderate / high].

Tips:
- One motion idea per clip. Stacked motion produces morphing.
- Image-to-video locks the subject; text-to-video drifts.
- Plan multi-shot sequences and edit in a real editor; do not expect long continuity.

### Voice prompt formula

> Script with explicit punctuation. Voice: [name or style]. Tone: [calm / urgent / warm / authoritative]. Pace: [slow / medium / fast]. Pauses: marked with commas, dashes, or SSML breaks. Pronunciation notes: [list].

Tips:
- Short sentences breathe better than long ones.
- Specify proper-noun pronunciations up front.
- Test the first 20 seconds before generating long renders.

### Music prompt formula

> Genre: [tags]. Mood: [tags]. Instrumentation: [list]. Tempo: [BPM or descriptive]. Era / production: [tags]. Vocals: [style or instrumental]. Structure: [intro / verse / chorus / bridge / outro]. Lyrics: [provided / themes].

Tips:
- Tags beat sentences for most engines.
- Provide lyrics explicitly when the platform supports it; do not let the model invent under-baked lyrics.
- Use extend to add structure rather than asking for a long song in one shot.

---

## Cross-platform verification checklist

- Did I confirm output licensing and commercial-use terms before publishing?
- For voice cloning, did I have explicit consent of the speaker?
- Did I check for hidden watermarks or provenance markers?
- Did I save the prompt and seed (where supported) for reproducibility?
- Did I avoid uploading images, voices, or songs I do not have the right to use?
- Did I disclose AI use where the audience or platform requires it?

## Unknown / Unverified Features

- Exact current model versions and quotas per platform - UNKNOWN in this run.
- Which platforms support seed locking today - LIKELY_NATIVE_UNVERIFIED.
- Commercial use terms per tier - UNKNOWN in this run.
- Watermark and provenance signal coverage - LIKELY_NATIVE_UNVERIFIED.
- Region availability for specific features - UNKNOWN in this run.

## Summary

Match the tool to the medium and the medium to the goal. Midjourney and Firefly for stills, Ideogram for typography, Leonardo for stylized art pipelines, ChatGPT image for conversational iteration. Runway and Pika for short controllable video, Kling for longer clips. ElevenLabs for voice, Suno and Udio for songs, Canva AI for design-in-context. Lean on the four prompt formulas above. Verify licensing, consent, and provenance before anything ships.
