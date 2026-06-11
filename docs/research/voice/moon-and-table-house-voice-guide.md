# Moon & Table house voice guide

Status: `working_v0.2`

Parent issue: #344

This guide captures Tim's reviewed house-voice decisions for Moon & Table source-backed Ritual writing and extraction QA.

It is allowed to evolve, but it controls re-extraction work unless Tim explicitly overrides it.

## How to use this guide

This guide controls voice and extraction QA. It does not replace the canonical extraction packet model created under #345.

Use this guide before #345 and before any source-specific re-extraction issue.

Approved examples in this guide are voice, architecture, and QA examples. They are not complete import-ready candidate records unless explicitly labeled as such.

Do not copy a partial approved example as a complete extraction packet.

Do not force every source into candle, threshold, table, vessel, or house-light language. Use the source's own carriers, objects, actions, and ritual logic.

## One-sentence standard

Moon & Table should sound like a private, source-backed household grimoire written in plain language by someone who actually intends to do the ritual.

The magic should be visible in the action.

## Core hierarchy

Use this order when extracting, writing, reviewing, or importing Ritual candidates:

```text
1. Preserve source architecture.
2. Preserve source magical logic.
3. Apply Moon & Table house voice.
4. Map cleanly to the runtime Ritual model.
```

Do not use house voice as permission to replace source ritual structure with atmosphere, wellness phrasing, relationship advice, or symbolic summary.

If source architecture is unsafe, coercive, medical/legal/financial, culturally sensitive, or outside Moon & Table's product lane, do not silently adapt around it. Mark the candidate `hold_before_import` or split a clearly supported safe variant only if the source supports that variant.

## Source architecture rule

Preserve source architecture before applying house voice.

Source architecture includes:

```text
objects
counts
materials
placements
sequence
gestures
spoken or written words
timing
repetition pattern
closing pattern
magical logic
```

These details are often the ritual, not decoration.

If the source uses seven candles, the Ritual uses seven candles.

If the source uses salt, water, herbs, candle, and oil, the Ritual uses those materials.

If the source asks for a weekly repeated candle movement, preserve the weekly repeated movement.

If the source gives an intentional close, preserve the close.

Do not reduce counts, collapse materials, omit placement, remove repetition, or replace a source's magical engine to make the Ritual feel simpler.

## Source magical logic rule

Preserve the source's symbolic engine.

Examples:

- Buckland's black candle surrounded by white candles is not just candle decor. It is the mechanism by which the named pattern is surrounded and weakened.
- House Witch threshold washing is not just cleaning. The threshold is the carrier; the wash, spoken line, and doorway action renew the boundary.
- House Witch hearth recognition is not vague home-centering. It is a structured elemental recognition and blessing of the home's spiritual hearth.

If the magical logic is unclear, hold the candidate for source review rather than filling the gap with generic Moon & Table prose.

## Three source types

Extraction packets and QA must classify each Ritual candidate with `ritualizationType`:

```text
ritualizationType:
  direct_source_ritual
  source_backed_moon_and_table_form
  metadata_symbolism_only
```

### 1. `direct_source_ritual`

Use when the source gives a concrete rite with materials, steps, words, gestures, timing, repetition, or close.

For direct source rituals:

```text
Preserve the source architecture closely.
Do not simplify unless the source itself provides an adaptation or Tim explicitly approves one.
Preserve the source close when given.
```

### 2. `source_backed_moon_and_table_form`

Use when the source gives a practice family, ritual pattern, or set of practices but not a single precise step-by-step ritual.

For these candidates, Moon & Table may author a simple, well-defined household Ritual form, but the packet must separate:

```text
Source-backed core:
Moon & Table-authored ritual form:
```

The Ritual may be usable and source-backed, but it must not pretend that every step, phrase, prop, or close came directly from the source.

For source-backed Moon & Table forms, Moon & Table may author sequence and framing from actions, locations, timing, or materials already supported by the source.

Do not add new props, materials, correspondences, ritual objects, deity/spirit elements, or symbolic mechanics unless the source supports them.

### 3. `metadata_symbolism_only`

Use when the source provides symbolism, correspondences, theory, or timing context but not enough action to support a whole Ritual.

`metadata_symbolism_only` may appear in the source inventory, source notes, or `candidate_extract_later` backlog. It must not be used for `candidate_extract_now`.

## Ritual body rule

The Ritual body is `presentation.practice` in the runtime model.

In extraction and review language, call it:

```text
ritual body / practice
```

The ritual body must read as a complete practice on its own. It must include:

```text
intentional open
concrete action or sequence
spoken or written words where source-supported or Moon & Table-authored under the operative-words rule
intentional close
```

Do not create separate required `opening` or `closing` fields unless the runtime model is deliberately changed later.

The opening and close live inside the ritual body.

For direct source rituals, preserve the source close when given.

If the source does not give a close, the extractor may author a simple close that completes the source-supported action without adding unsupported props, materials, correspondences, deity/spirit elements, or symbolic mechanics.

Allowed authored closes complete something already present in the source-backed practice, such as:

- pouring out a wash when wash water was used;
- letting a doorway dry after threshold washing;
- closing a journal when writing was used;
- extinguishing a candle when candle flame was used;
- thanking a partner when shared witnessing was source-supported.

Do not invent a decorative close.

Without a close, the candidate reads like an activity, not a Ritual.

## Operative words and `ritualWords`

Spoken or written words that the user should say or write belong inline in the ritual body where they are used.

`ritualWords` is not the authoring surface for Ritual copy.

Use `ritualWords` only as provenance/review metadata for operative words already present in, or required by, the ritual body.

Allowed modes:

```text
source_exact_short
adapted_source_words
```

Definition:

```text
short source phrase = 20 words or fewer
```

If the exact operative source phrase is 20 words or fewer, include it inline in the ritual body and add `ritualWords` metadata with `mode: source_exact_short`, source location, use context, and citation label.

If the exact operative source wording is more than 20 words, do not reproduce the long passage in the public packet. First decide whether a plain functional instruction preserves the rite honestly. Use adapted Moon & Table words only as a candidate-by-candidate exception when the source words are structurally necessary; include those adapted words inline in the ritual body, and add a `ritualWords` record with `mode: adapted_source_words`, source location, use context, citation label, and a note explaining what function was adapted.

If the source supports a word-shaped action but does not provide operative words, use plain functional instruction rather than invented quoted speech.

Do not create generic filler, process labels, or private-wording placeholders for source-provided operative words.

Do not create a separate source-text mini-schema for normal extraction. `ritualWords` is the operative-word tracking surface.

Do not flatten prayer, blessing, charm, incantation, petition, or spoken formula into "state an intention."

## Props, materials, and decorative close rule

Do not add props, objects, table items, candles, bowls, stones, flowers, vessels, written notes, center objects, materials, correspondences, deity/spirit elements, or symbolic mechanics unless they are backed by the source or Tim explicitly approves a separate adaptation.

Moon & Table likes tables, vessels, candles, flowers, and household objects, but those should not be added just because they fit the product aesthetic.

If a new prop or close would make the Ritual better, hold it as a possible future household adaptation rather than including it in the source-backed candidate.

## Timing rule

If timing is core to the source, do not weaken it.

Examples:

- If the Ritual is full-moon work, say `on the night of the full moon` rather than `within the full moon window` unless the source or product explicitly allows a wider window.
- If the source requires weekly repetition, preserve the weekly repetition.
- If the source's timing is helpful but not required, record that distinction in recommendation metadata.

Do not turn timing into decorative context.

Timing should shape selection and explanation only where source-supported.

## House voice traits

Moon & Table voice should be:

```text
plainspoken
direct
specific
warm
private
ritually literate
source-backed
symbolic but believable
adult where appropriate
emotionally honest without therapy voice
```

Moon & Table voice is not:

```text
generic AI wellness copy
therapy intake language
productivity coaching
horoscope app copy
fake medieval grimoire voice
witchcraft influencer voice
safety manual
relationship advice column
vague mindfulness prompt
household chore checklist
```

## Field rules

### Headline

A good headline names the ritual action or source-backed magical function.

Prefer concrete ritual action:

```text
Cleanse the Doorstep
Bank the House Light
Surround the Habit with Light
Recognize the Heart of the Home
```

Avoid headlines that are too abstract without context:

```text
Recognize the Hearth
Bring the House Back to the Table
Speak Beside the Flame
```

A headline may use magical language, but it must be legible enough that the user knows why they might choose it.

### Ritual body / practice

The body should tell the user exactly what to do, in order.

It should preserve source architecture, avoid unnecessary abstraction, and include the close.

Good body language is physical and visible:

```text
Wash the threshold or doorstep slowly.
Set two altar candles at the back of the working space.
Set one black candle in the center.
Turn off the kitchen light, close the door, or snuff the candle.
```

Avoid vague body language:

```text
Let the house become present.
Let the room hold the work.
Bring the house back to the table.
Let the doorway become a boundary.
```

### Intention

The intention should name the ritual's purpose without becoming therapy, productivity, or moral judgment.

Good intentions are specific and source-shaped:

```text
Clear the crossing-place and renew the boundary of the home.
Gather the day back in and shelter the inner flame for sleep.
Give the pattern a visible form, then surround it with the light needed to loosen it.
Recognize the home as sacred, and mark the place where its warmth gathers.
```

Avoid pejorative or vague intentions:

```text
Let the pattern be seen without letting it run the room.
Reset your energy.
Create space for growth.
```

### Best window

Best window should state real timing and context.

If source timing is required, say so plainly.

If timing is optional/helpful, say that plainly.

Avoid weakening strong timing with a pile of fallback contexts.

### Question to carry

The question should be simple, portable, and connected to the Ritual's action.

Good examples:

```text
What can cross this threshold?
What can be left banked until morning?
What am I ready to stop feeding?
What has grown enough to be honored?
```

Do not use the question field for multi-part reflection prompts unless the source supports that form.

### Why-this-fits / how-this-was-chosen ingredients

For Choose with me, why-this-fits should be assembled from actual runtime context.

Extraction packets should use this structure:

```text
whyThisFitsIngredients:
  checkInHooks:
  timingHooks:
  lunarPlanetarySeasonalHooks:
  capacityHooks:
  audienceHooks:
  materialPlaceCarrierPurposeFit:
  sourceBackedRationale:
  notForOrHoldNotes:

howThisWasChosenIngredients:
  primarySelectionSignals:
  secondarySelectionSignals:
  exclusionSignals:
  timingSignal:
  confidenceNotes:
```

`howThisWasChosenIngredients` is packet/recommendation input only unless a later runtime schema issue adds a field.

Do not use why-this-fits as a source summary.

Do not say the ritual fits because it is generally nice, grounding, or meaningful. Explain the real match: purpose, carrier, timing, capacity, audience, and source architecture.

## Import readiness labels

Extraction QA may use these packet-level candidate labels:

```text
approved_for_mechanical_import
needs_packet_correction
hold_before_import
```

`approved_for_mechanical_import` means Codex may mechanically import the packet-approved text as a draft source-backed Ritual record under #287.

It does not mean reviewed, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.

Do not treat import approval as product approval.

## Approved examples

Approved examples are not full candidate records. They show voice, source architecture preservation, and QA direction.

### Cleanse the Doorstep

Why it works:

```text
source architecture is visible
threshold carrier is concrete
spoken source phrase is preserved inline
close is physical and simple
no extra props are added
not fear-based
```

Approved pattern:

```text
Wash the threshold or doorstep slowly. As you wash, picture whatever does not belong here loosening and leaving the threshold. Say: “I hereby cleanse this threshold of negative energy.” When you are finished, pour out the wash. Let the doorway dry. The ritual closes when the threshold is clean and left alone.
```

### Bank the House Light

Why it works:

```text
source fire-banking architecture is preserved
source already allows a modern/no-fireplace location
no fake fireplace is invented
close is physical: lower lamp, turn off light, close door, or snuff candle
low-capacity voice is clear without becoming sleep hygiene
```

Approved pattern:

```text
Choose one light to be the house light for the ritual: a kitchen light, table lamp, bedside lamp, or one candle. Stand or sit near it with a relaxed frame. Let the day come back as impressions, not as a report. Take three slow breaths. With each exhale, let one thing from the day stop asking for your attention. Say one simple sentence. You can use your own, or say: “I accept myself. This house can rest.” Close with a physical action. Lower the lamp, turn off the kitchen light, close the door, or snuff the candle.
```

### Surround the Habit with Light

Why it works after correction:

```text
source uses seven candles, so the Ritual uses seven candles
candle roles are preserved
placement is visible
weekly repetition is preserved
movement of white candles is preserved
ritual close uses source extinguishing logic
```

Approved pattern:

```text
Set two altar candles at the back of the working space. Set one black candle in the center for the habit or pattern you are ready to work on. Set four white candles around the black candle. Light the two altar candles. Light the incense. Then light the black candle, holding the pattern clearly in mind. Light the four white candles one by one. As they catch, picture the pattern losing its hold. Sit with the candles for a few minutes. Keep your attention on the black candle surrounded by white candlelight.
```

### Recognize the Heart of the Home

Why it works after source review:

```text
preserves elemental ritual architecture
uses the chosen hearth-place rather than vague home atmosphere
materials are source-backed
spoken source phrase can be preserved as a short anchor
close is source-backed
```

Approved direction:

```text
Choose the place that represents the spiritual heart of the home. Stand or kneel there. Use the source-backed materials: salt, water, herbs/spices, candle, and oil. Speak to the hearth directly. Offer earth, water, air, and fire. Mark the hearth-place with oil. Bow and close the candle.
```

## Rejected patterns

Rejected or weak patterns from #344 work:

```text
Bring the house back to the table.
Recognize the hearth. // without context
Let that place become the hearth.
The doorway does not need a speech; it needs a line.
Shape instead of a speech.
Hard repetition.
One dark candle and some surrounding lights. // when source uses seven candles
Let the room hold the work.
Let the house become present.
```

Common problems:

```text
too abstract
too writerly
not physically clear
not source-faithful
not enough context
not enough ritual close
adds product-preferred props not backed by source
```

## Bad to better rewrites

### Bad

```text
Let the house become the hearth for tonight.
```

### Better

```text
Choose the place that represents the spiritual heart of the home. Stand or kneel there with salt, water, herbs, a candle, and oil.
```

### Bad

```text
Choose one dark candle and some surrounding lights.
```

### Better

```text
Set two altar candles at the back of the working space. Set one black candle in the center. Set four white candles around it.
```

### Bad

```text
The doorway does not need a speech; it needs a line.
```

### Better

```text
As you wash the threshold, say the source-backed line plainly.
```

### Bad

```text
Use a center object to hold the full moon witness ritual.
```

### Better

```text
Only add a center object if the source supports one. Otherwise, keep the ritual focused on gathering, sharing, listening, and witnessing.
```

### Bad

```text
Good within the full moon window, after a shared meal, or whenever connection feels present.
```

### Better

```text
On the night of the full moon.
```

## QA reviewer baseline

A QA reviewer must read:

```text
source gate record
source PDF/material
extraction packet PR diff
docs/research/voice/moon-and-table-house-voice-guide.md
docs/research/extraction-depth-policy.md
docs/research/operative-ritual-words-policy.md
docs/research/runtime-ritual-authoring-policy.md
src/data/rituals/types.ts
```

QA must verify:

- source architecture is preserved;
- no source-supported props/materials/counts/steps are omitted without explicit reason;
- no unsupported props/materials/decorative closing gestures are added;
- `ritualizationType` is correct;
- no `metadata_symbolism_only` item is marked `candidate_extract_now`;
- every `candidate_extract_now` record is complete enough for mechanical import;
- `ritual body / practice` contains open, action/sequence, operative words where needed, and close;
- `ritualWords` is metadata only;
- exact short source words are inline, 20 words or fewer, and tracked as `source_exact_short`;
- longer exact wording is handled by functional instruction or, when justified candidate by candidate, adapted into inline Moon & Table words and tracked as `adapted_source_words`;
- no generic Moon & Table replacement words are created where usable source words exist;
- `whyThisFitsIngredients` and `howThisWasChosenIngredients` use the required structure;
- no runtime eligibility flags are changed.

## QA checklist for re-extraction PRs

Use this checklist before merging any source-specific re-extraction packet.

### Source classification

- [ ] Is this candidate classified with `ritualizationType`: `direct_source_ritual`, `source_backed_moon_and_table_form`, or `metadata_symbolism_only`?
- [ ] If it is a direct source ritual, are all source materials, counts, placements, words, sequence, timing, repetition, and close preserved?
- [ ] If it is a source-backed Moon & Table form, does the packet clearly separate source-backed core from Moon & Table-authored ritual form?
- [ ] If it is metadata/symbolism only, has it been kept out of `candidate_extract_now`?

### Runtime field completeness

- [ ] Headline is present and concrete.
- [ ] Ritual body / practice is complete and readable on its own.
- [ ] Ritual body includes an intentional open.
- [ ] Ritual body includes concrete source-supported action / sequence.
- [ ] Ritual body includes spoken/written words where appropriate.
- [ ] Ritual body includes an intentional close.
- [ ] Intention is source-shaped and not pejorative/generic.
- [ ] BestWindow preserves required timing and does not weaken core timing.
- [ ] QuestionToCarry is simple and tied to the ritual action.
- [ ] WhyThisFitsIngredients and howThisWasChosenIngredients use the required structure.

### Source fidelity

- [ ] No source material counts were reduced without explicit source support or Tim approval.
- [ ] No source materials or props were omitted without reason.
- [ ] No props/materials/decorative closing gestures were added unless backed by the source or Tim-approved.
- [ ] Source-provided short phrases of 20 words or fewer are preserved inline where useful.
- [ ] Longer source wording is handled by functional instruction, or adapted into ritual-body words and tracked as `adapted_source_words` only when the candidate audit justifies that exception.
- [ ] Plain functional naming/writing instructions are used when the source supports word-shaped action but does not provide operative words.
- [ ] Source magical logic is preserved.
- [ ] Approved examples in this guide are not being copied as complete candidate records.
- [ ] Source architecture that is unsafe, coercive, medical/legal/financial, culturally sensitive, or outside product boundaries is held rather than laundered into a softer ritual.

### House voice

- [ ] The Ritual sounds plainspoken, direct, private, and usable.
- [ ] The magic is visible in the action.
- [ ] The candidate avoids generic wellness, therapy, productivity, horoscope, or relationship-advice voice.
- [ ] The candidate avoids fake antiquarian/purple-prose grimoire voice.
- [ ] The candidate avoids vague intention-setting when source-backed action exists.
- [ ] The candidate does not force candle, threshold, table, vessel, or house-light language onto a source that uses other carriers.

### Metadata / import readiness

- [ ] Primary and secondary carriers are source-supported.
- [ ] Primary and secondary purposes are source-supported.
- [ ] Capacity metadata is realistic.
- [ ] Audience metadata is realistic.
- [ ] Timing relationship is accurate: required, preferred, helpful, or none.
- [ ] Search metadata includes real materials, places, tags, and keywords.
- [ ] Review flags capture source verification, material review, or product-boundary needs.
- [ ] Candidate is explicitly marked `approved_for_mechanical_import`, `needs_packet_correction`, or `hold_before_import`.
- [ ] `approved_for_mechanical_import` is not treated as direct-use, recommendation, reviewed, recommendable, or runtime-ready approval.

## Coordinator note

This guide should be read before #345 and before any source-specific re-extraction issue.

The purpose is not to make every Ritual sound identical. The purpose is to prevent loss of source architecture, generic prose, unsupported props, over-warning, and runtime authoring drift.
