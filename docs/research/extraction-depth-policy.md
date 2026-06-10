# Extraction depth policy

Moon & Table extraction is inventory-first **and** import-ready for selected candidates.

The goal is ritual depth and variety, not a small polished sample. Agents must not stop after finding a few strong Ritual candidates. A source extraction packet must account for the source’s usable ritual material, even when only some items become draft Moon & Table Ritual candidates in the first pass.

For any item marked `candidate_extract_now`, the packet must also provide complete, source-backed Ritual authoring content mapped to the current runtime schema. Codex should not have to invent user-facing Ritual prose during import.

Controls:

```text
docs/research/voice/moon-and-table-house-voice-guide.md
src/data/rituals/types.ts
docs/research/private-source-text-policy.md
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

2. **Candidate extraction packet**
   - Moon & Table-shaped draft Ritual candidates derived from selected inventory items.
   - Every `candidate_extract_now` record must be complete enough for mechanical import after PR-gated QA.

3. **Disposition tracking**
   - Every inventoried source item must receive a disposition:
     - `candidate_extract_now`
     - `candidate_extract_later`
     - `private_excerpt_reference`
     - `source_note_only`
     - `context_only`
     - `hold`
     - `reject`

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

| Source item | Source pages | Source location precision | Type | Research use | Brief source description | Likely carriers | Likely purposes | Exact text importance | Disposition | Reason | Future action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

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
  The source gives symbolism, correspondences, theory, or timing context but not enough action to support a whole Ritual. Do not produce an importable Ritual candidate from this alone.
```

A `metadata_symbolism_only` item may support recommendation metadata, timing hooks, source notes, or future extraction leads. It should not be marked `candidate_extract_now` by itself.

## Required candidate authoring fields

Every `candidate_extract_now` record must include these human-facing fields:

```text
headline
ritual body / practice
intention
bestWindow
whyThisFits generation ingredients
howThisWasChosen generation ingredients
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
whyThisFits base/ingredients -> presentation.whyThisFits or runtime generation inputs, as applicable
source grounding -> origin.sourceGrounding[]
purpose/carrier/capacity/audience/timing/eligibility -> recommendationMetadata
materials/places/tags/keywords/source labels -> searchMetadata
private excerpt/material/source/product-boundary dependencies -> reviewFlags
operative words metadata -> ritualWords[]
```

## Ritual body requirement

The ritual body / practice must read as a complete practice on its own. It must contain:

```text
intentional open
concrete source-supported action / sequence
spoken or written ritual words where source-supported or Moon & Table-authored
intentional source-supported close
```

Do not add separate required `opening` or `closing` fields unless the runtime model changes in a later product issue.

For direct source rituals, use the source close.

For source-backed Moon & Table forms, author a close only from source-supported actions, locations, timing, or materials.

## Operative words and `ritualWords`

Spoken or written words that the user should say or write belong inline in the ritual body where they are used.

`ritualWords` is not the authoring surface for Ritual copy. Use it only as provenance/review metadata for operative words already present in, or required by, the ritual body.

Allowed modes:

```text
source_exact_short
private_source_excerpt
moon_and_table_original
```

Definition:

```text
short source phrase = 20 words or fewer
```

Short source phrases used in rituals should be included inline in the ritual body and classified as `source_exact_short` with source location. Longer blessings, prayers, incantations, scripts, prompt sets, meditations, recipes, or distinctive passages over 20 words should use `private_source_excerpt`.

## Why-this-fits / how-this-was-chosen ingredients

Do not treat `whyThisFits` as a static source-summary paragraph when the ritual is selected through Choose with me.

The extraction packet should provide structured generation ingredients, including:

```text
check-in hooks
timing hooks
lunar / planetary / seasonal influence notes, where source-supported
capacity notes
audience notes
material/place/carrier/purpose fit notes
source-backed rationale
not-for / hold notes
```

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
private_excerpt_reference:
items_with_private_excerpt_recommended:
source_note_only:
context_only:
hold:
reject:
remaining_unreviewed_source_sections:
remaining_extraction_backlog:
```

`private_excerpt_reference` counts source items whose main disposition is private excerpt reference.

`items_with_private_excerpt_recommended` counts any inventoried source item or candidate where exact prayers, blessings, spoken cues, prompts, recipes, meditations, charms, spells, or distinctive wording should be reviewed privately by Tim, even if the item’s disposition is also `candidate_extract_now` or `candidate_extract_later`.

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
- whether private excerpt recommendations are counted even when the item is also a candidate;
- whether broad candidates need variant/split tracking;
- whether rough source locations are marked `needs_tightening` or `chapter_range` rather than treated as exact page support;
- whether product follow-up patterns have been wrongly forced into Ritual candidate status;
- whether `ritualizationType` is correct;
- whether source architecture, props/materials, timing, operative words, and close are preserved according to the house voice guide.

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

## Relationship to private source text policy

This policy works together with:

```text
docs/research/private-source-text-policy.md
```

Agents should inventory and classify exact wording, blessings, prayers, invocations, prompts, recipes, spells, charms, and meditations instead of erasing them.

## Coordinator instruction

No extraction packet should be treated as complete unless it accounts for the source’s ritual material through inventory and disposition tracking **and** includes import-ready runtime-mapped fields for every `candidate_extract_now` item.

Depth, variety, and mechanical-import readiness are required outcomes, not nice-to-have extras.
