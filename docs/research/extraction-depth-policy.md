# Extraction depth policy

Moon & Table extraction is inventory-first **and** import-ready for selected candidates.

The goal is ritual depth and variety, not a small polished sample. Agents must not stop after finding a few strong Ritual candidates. A source extraction packet must account for the source’s usable ritual material, even when only some items become draft Moon & Table Ritual candidates in the first pass.

For any item marked `candidate_extract_now`, the packet must also provide complete, source-backed Ritual authoring content mapped to the current runtime schema. Codex should not have to invent user-facing Ritual prose during import.

## Inventory before eligibility

Source inventory is not an eligibility gate.

Extraction must name and classify the source's ritual material before deciding
whether any item can become a Moon & Table Ritual, direct-source reference,
recommendation candidate, later extraction candidate, hold, or reject.

Agents must not silently drop source material from the inventory because it is:

- adult;
- explicit;
- sex-forward;
- consent-sensitive;
- kink-adjacent;
- body-fluid-related;
- technique-heavy;
- culturally or gender loaded;
- therapy-adjacent;
- awkward in house voice;
- unsuitable for default recommendation;
- likely to require Tim's explicit import, hold, adapt, direct-source-only, or reject decision.

Those qualities are review labels and decision aids. They are not automatic
inventory blockers.

The repository boundary still controls source expression. Do not reproduce long
copyrighted source text, private source text, scripts, meditations, recipes,
or distinctive passages in the repo. Use repository-safe paraphrase, precise
source location, classification, and decision metadata instead.

Only exclude an item from inventory when the source item cannot be identified
or described without violating privacy, source-text, or legal boundaries. In
that case, record the existence of the blocked range, the reason it cannot be
described, and the private follow-up needed.

Controls:

```text
docs/research/voice/moon-and-table-house-voice-guide.md
src/data/rituals/types.ts
docs/research/operative-ritual-words-policy.md
docs/research/runtime-ritual-authoring-policy.md
```

## Core import-readiness rule

A complete extraction packet is the canonical Ritual authoring artifact.

```text
If Codex must invent user-facing Ritual prose during #287, the extraction packet is not complete enough for import.
```

Extraction still does not create runtime records. It produces packet-approved draft Ritual content that Codex can later import mechanically.

## Pilot does not mean small sample

In Moon & Table research, a pilot is a process-control term, not a content cap.

A pilot packet may test source handling, schema, product voice, and review workflow, but it must not hide, skip, or discard the rest of the source’s ritual material.

## Required extraction layers

Every approved extraction source requires three layers:

1. **Source rite inventory**
   - A source-facing inventory of rituals, spells, blessings, prayers, prompts, recipes, meditations, invocations, charms, exercises, correspondences-with-action, and other practice material.
   - This inventory must include adult or difficult material in repository-safe paraphrase. Review sensitivity affects disposition and later eligibility, not whether the item is visible in the inventory.

2. **Candidate extraction packet**
   - Moon & Table-shaped draft Ritual candidates derived from selected inventory items.
   - Every `candidate_extract_now` record must be complete enough for mechanical import after PR-gated QA.

3. **Disposition tracking**
   - Every inventoried source item must receive a disposition:
     - `candidate_extract_now`
     - `candidate_extract_later`
     - `adapted_or_exact_text_review`
     - `source_note_only`
     - `context_only`
     - `hold`
     - `reject`
   - When the correct disposition depends on Tim's explicit product choice, mark it `tim_decision_required` in addition to the provisional disposition.

## Definition of done

An extraction packet is not complete until it includes:

- source sections reviewed;
- source rite inventory;
- candidate research records;
- complete runtime-mapped authoring fields for every `candidate_extract_now` item;
- source notes;
- coverage records;
- rejected / held leads;
- duplicate check;
- gap notes;
- validation checklist;
- remaining extraction backlog.

## Required source rite inventory table

Every extraction packet must include this table:

| Source item | Source pages | Source location precision | Type | Research use | Brief source description | Review labels | Likely carriers | Likely purposes | Exact text importance | Disposition | Tim decision needed? | Reason | Future action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Allowed source location precision values:

- `exact_page`
- `page_range`
- `chapter_range`
- `needs_tightening`

Allowed research use values:

- `ritual_candidate`
- `product_followup_pattern`
- `both`
- `source_note_only`
- `context_only`
- `hold`
- `reject`

Allowed review labels include:

- `adult_intimacy`
- `explicit`
- `sex_forward`
- `consent_sensitive`
- `kink_adjacent`
- `body_fluid`
- `technique_heavy`
- `cultural_or_gender_load`
- `therapy_adjacent`
- `medical_or_somatic_claim`
- `coercive_or_target_control`
- `exact_text_sensitive`
- `house_voice_challenge`
- `direct_source_only_candidate`
- `recommendation_lane_unclear`

Review labels may justify hold, direct-source-only, adaptation, private review,
or later rejection. They do not justify omitting the item from the inventory.

Allowed item types include:

- `ritual`
- `spell`
- `blessing`
- `prayer`
- `invocation`
- `prompt`
- `meditation`
- `recipe`
- `charm`
- `spoken_formula`
- `craft`
- `cleansing`
- `consecration`
- `correspondence_with_action`
- `context_only`

## Required candidate classification

Every Ritual candidate must include:

```text
ritualizationType:
  direct_source_ritual
  source_backed_moon_and_table_form
  metadata_symbolism_only
```

Use:

```text
direct_source_ritual:
  The source gives concrete rite architecture: materials, steps, words, gestures, timing, repetition, or close. Preserve it closely.

source_backed_moon_and_table_form:
  The source gives a practice family or ritual pattern but not a precise step-by-step ritual. Moon & Table may author a simple household form only from source-supported actions, locations, timing, and materials.

metadata_symbolism_only:
  The source gives symbolism, correspondences, theory, or timing context but not enough action to support a whole Ritual.
```

`metadata_symbolism_only` may appear in the source inventory, source notes, or `candidate_extract_later` backlog. It must not be used for `candidate_extract_now`.

## Required candidate authoring fields

Every `candidate_extract_now` record must include these human-facing fields:

```text
headline
ritual body / practice
intention
bestWindow
whyThisFitsIngredients
howThisWasChosenIngredients
questionToCarry
source grounding
recommendation metadata
search metadata
review flags
adaptation policy notes, if needed
operative words metadata
import readiness label
```

Runtime mapping:

```text
headline -> presentation.headline
ritual body / practice -> presentation.practice
intention -> presentation.intention
bestWindow -> presentation.bestWindow
questionToCarry -> presentation.questionToCarry
whyThisFitsIngredients -> presentation.whyThisFits or runtime generation inputs, as applicable
howThisWasChosenIngredients -> packet/recommendation inputs only unless a later runtime schema issue adds a field
source grounding -> origin.sourceGrounding[]
purpose/carrier/capacity/audience/timing/eligibility -> recommendationMetadata
materials/places/tags/keywords/source labels -> searchMetadata
material/source/product-boundary dependencies -> reviewFlags
operative words metadata -> ritualWords[]
```

## Ritual body requirement

The ritual body / practice must read as a complete practice on its own. It must contain:

```text
intentional open
concrete source-supported action / sequence
spoken or written ritual words where source-supported or Moon & Table-authored under the operative-words rule
intentional close
```

Do not add separate required `opening` or `closing` fields unless the runtime model changes in a later product issue.

For direct source rituals, preserve the source close when given.

If the source does not give a close, the extractor may author a simple close that completes the source-supported action without adding unsupported props, materials, deity/spirit elements, correspondences, or symbolic mechanics.

Allowed authored closes complete something already present in the source-backed practice, such as:

- pouring out a wash when wash water was used;
- letting a doorway dry after threshold washing;
- closing a journal when writing was used;
- extinguishing a candle when candle flame was used;
- thanking a partner when shared witnessing was source-supported.

Do not invent a decorative close.

## Operative words and `ritualWords`

Spoken or written words that the user should say or write belong inline in the ritual body where they are used.

`ritualWords` is not the authoring surface for Ritual copy. Use it only as provenance/review metadata for operative words already present in, or required by, the ritual body.

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

If the source supports a word-shaped action but does not provide operative words, use plain functional instruction in the ritual body, such as "Name the purpose aloud" or "Write the date and one sentence." Do not invent quoted ceremonial speech for that case.

Do not create generic filler, process labels, or private-wording placeholders for source-provided operative words.

No separate source-text mini-schema is required for normal extraction. `ritualWords` is the operative-word tracking surface.

## Why-this-fits / how-this-was-chosen ingredients

Do not treat `whyThisFits` as a static source-summary paragraph when the ritual is selected through Choose with me.

Every `candidate_extract_now` record must use this structure:

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

## Import readiness labels

Each candidate must be marked:

```text
approved_for_mechanical_import
needs_packet_correction
hold_before_import
```

`approved_for_mechanical_import` means Codex may mechanically import the packet-approved text as a draft source-backed Ritual record under #287.

It does not mean reviewed, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.

## Required packet metrics

Every extraction packet must report:

```text
source_items_inventoried:
candidate_extract_now:
candidate_extract_later:
adapted_or_exact_text_review:
items_with_operative_text_review:
source_note_only:
context_only:
hold:
reject:
tim_decision_required:
remaining_unreviewed_source_sections:
remaining_extraction_backlog:
```

`adapted_or_exact_text_review` counts source items whose main disposition is exact short-wording review or longer operative-word adaptation.

`items_with_operative_text_review` counts any inventoried source item or candidate where exact prayers, blessings, spoken cues, prompts, recipes, meditations, charms, spells, or distinctive wording must be reviewed under the 20-word/adapted-words rule, even if the item's disposition is also `candidate_extract_now` or `candidate_extract_later`.

## Coverage accounting rule

Only primary carrier/purpose cells count toward coverage satisfaction.

Secondary carriers and purposes may be listed when genuinely source-supported, but they must not be used to claim a coverage cell is solved.

Do not let a rich Ritual candidate make the coverage matrix lie. A source item that touches a doorway, a candle, words, and a vessel may still have only one primary carrier and one primary purpose for recommendation-driving coverage.

## Variant / split ledger

Every extraction packet must include a variant / split ledger when a source item could reasonably support multiple future Ritual variants or product patterns.

Use this format:

```text
Variant / split candidates:
- keep together now:
- split later:
- reason:
- trigger for split:
```

Use the ledger instead of bloating one candidate or silently losing future variants.

Examples include:

- house blessing vs room blessing;
- threshold wash vs whole-house circuit;
- kitchen candle vs oil lamp;
- cauldron vs bowl/jar;
- spell bottle variants;
- food awareness vs recipe-specific rituals;
- grimoire entry as ritual vs product follow-up.

## Ritual candidate vs product follow-up pattern

Some source-backed practices may be Ritual candidates, product follow-up patterns, or both.

Extraction packets must explicitly classify this using:

```text
researchUse:
  - ritual_candidate
  - product_followup_pattern
  - both
```

A product follow-up pattern may be useful for Moon & Table without being a runtime Ritual. Do not force it into the Ritual model merely to preserve it.

## Anti-under-extraction rule

Agents must not stop after 8–12 strong candidates if the source contains more usable ritual material.

If the packet becomes too large, split the candidate records into batches. Batching is allowed for delivery and review, but the source rite inventory must still show what remains.

A packet that extracts only a handful of candidates without accounting for the rest of the source is incomplete.

## Batch rule

Batches are allowed for delivery and review.

Batches are not allowed to erase source material.

A batch must include:

- what was extracted now;
- what was intentionally deferred;
- what remains;
- why it remains;
- recommended next batch.

## Review rule

Reviewers must check whether the packet under-extracted the source.

If a source contains many rituals but the packet only extracts a small sample without an inventory/backlog, return it for revision.

Reviewers must also check:

- whether primary coverage claims are inflated by secondary support;
- whether operative text review needs are counted even when the item is also a candidate;
- whether adult, explicit, sex-forward, consent-sensitive, body-fluid, kink-adjacent, technique-heavy, culturally loaded, or therapy-adjacent material was inventoried and labeled instead of silently dropped;
- whether Tim decision-required items are visible as a decision queue rather than hidden in hold/reject counts;
- whether broad candidates need variant/split tracking;
- whether rough source locations are marked `needs_tightening` or `chapter_range` rather than treated as exact page support;
- whether product follow-up patterns have been wrongly forced into Ritual candidate status;
- whether `ritualizationType` is correct;
- whether source architecture, props/materials, timing, operative words, and close are preserved according to the house voice guide.

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
- adult or difficult source material is represented through repository-safe inventory rows, review labels, and Tim decision flags instead of automated exclusion;
- no runtime eligibility flags are changed.

## Runtime / schema normalization wall

Extraction is not runtime integration.

No extraction packet may create runtime records or mark any candidate reviewed, recommendable, findable, direct-use eligible, recommendation eligible, or runtime-ready.

Every extraction candidate must remain research-only until later human review and source verification:

```text
status: draft
findable: false
directUseEligible: false
recommendationEligible: false
recommendable: false
missing: ["human_review", "source_verification"]
```

Schema-aware extraction is required. Runtime import still belongs in a later issue after PR-gated extraction QA. Do not use extraction to quietly import research candidates into runtime data.

## PR-gated QA model

Future source extraction/re-extraction work should use PR review as the QA gate.

Default flow:

```text
source-specific extraction/re-extraction issue
→ PR updates packet
→ separate QA review in PR using source PDF/material + #344 + #345 + runtime model
→ rework in same PR
→ merge only after QA pass
→ merged packet marked approved_for_mechanical_import
```

Separate QA issues should not be created by default. Create a separate QA/rework issue only if PR review uncovers work too large to resolve in the extraction PR.

## Relationship to operative ritual words policy

This policy works together with:

```text
docs/research/operative-ritual-words-policy.md
```

Agents should inventory and classify exact wording, blessings, prayers, invocations, prompts, recipes, spells, charms, and meditations instead of erasing them.

## Coordinator instruction

No extraction packet should be treated as complete unless it accounts for the source’s ritual material through inventory and disposition tracking **and** includes import-ready runtime-mapped fields for every `candidate_extract_now` item.

Depth, variety, and mechanical-import readiness are required outcomes, not nice-to-have extras.
