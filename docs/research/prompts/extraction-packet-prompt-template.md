# Extraction packet prompt template

Use this template for Moon & Table extraction packets after a source has been approved for extraction.

This template is intentionally inventory-first and import-ready. Do not remove the inventory requirements. Do not weaken the runtime-mapped candidate requirements.

---

You are working on Moon & Table ritual research.

This is extraction from an approved source.

Use only the assigned source and the source-gate record. Do not search for new sources. Do not use outside summaries. Do not fill gaps from memory.

Follow these canonical policies:

```text
docs/research/voice/moon-and-table-house-voice-guide.md
docs/research/private-source-text-policy.md
docs/research/extraction-depth-policy.md
docs/research/runtime-ritual-authoring-policy.md
src/data/rituals/types.ts
```

## Hard rules

Do not approve runtime use.
Do not mark anything `reviewed`, `recommendable`, `findable`, `directUseEligible`, or `recommendationEligible`.
Do not create runtime Ritual records.
Do not skip source material just because you already found several strong candidates.
Do not flatten magical practice into generic wellness mechanics.
Do not use secondary carrier/purpose support to claim coverage cells are solved.
Do not force product follow-up patterns into Ritual candidates merely to preserve them.
Do not add props, materials, decorative closing gestures, correspondences, deity/spirit elements, or symbolic mechanics unless source-supported or Tim-approved.

Words, blessings, prayers, invocations, prompts, meditations, spells, charms, spoken formulas, recipes, and exact questions are valid Ritual mechanics and may be central to a Ritual.

## Exact wording rule

Definition:

```text
short source phrase = 20 words or fewer
```

If exact operative source wording is 20 words or fewer:

- include it inline in the ritual body / practice where it is used;
- add `ritualWords` metadata with `mode: "source_exact_short"`;
- include source location, citation label, use context, and note if needed.

If exact operative source wording is more than 20 words:

- do not reproduce it in the public packet;
- add `ritualWords` metadata with `mode: "private_source_excerpt"`;
- include source location, citation label, use context, and a note explaining why the exact words matter.

If the source provides usable operative words, do not create a generic Moon & Table replacement unless Tim explicitly approves adaptation.

Do not create separate `sourceTextUse` or `privateExcerptSupport` objects. `ritualWords` is the operative-word tracking surface.

Do not reproduce long copyrighted passages, full rituals, full prayers, full guided meditations, full prompt sets, full recipes, or whole distinctive spell texts.

## Core import-readiness rule

A complete extraction packet is the canonical Ritual authoring artifact.

```text
If Codex must invent user-facing Ritual prose during #287, the extraction packet is not complete enough for import.
```

For every `candidate_extract_now` item, provide full runtime-mapped candidate fields. Do not provide only rough notes or enough copy to preview.

## Required extraction layers

You must produce both:

1. **Source rite inventory**
2. **Moon & Table candidate records**

The source rite inventory must list every ritual-like item you find in the approved extraction ranges, including:

- rituals;
- spells;
- blessings;
- prayers;
- invocations;
- prompts;
- meditations;
- recipes;
- charms;
- spoken formulas;
- crafts;
- cleansing practices;
- consecrations;
- correspondence material that includes action;
- source material whose longer exact wording should be tracked through `ritualWords.mode = "private_source_excerpt"`.

For every source item, assign a disposition:

- `candidate_extract_now`
- `candidate_extract_later`
- `private_excerpt_reference`
- `source_note_only`
- `context_only`
- `hold`
- `reject`

`private_excerpt_reference` is an inventory disposition. It is not a candidate-level object and does not replace `ritualWords`.

If the packet becomes too large, split the candidate records into batches, but still provide the source rite inventory and remaining extraction backlog.

## Source rite inventory table

Include this table:

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

Allowed item types:

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

## Required packet metrics

Include:

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

`items_with_private_excerpt_recommended` counts any inventoried source item or candidate where exact prayers, blessings, spoken cues, prompts, recipes, meditations, charms, spells, or distinctive wording should be reviewed privately by Tim, even when that item is also a candidate.

## Coverage accounting

Use primary coverage conservatively.

Each candidate must have:

```text
primaryCarrier:
primaryPurpose:
```

Secondary support may be listed only when genuinely source-supported:

```text
secondaryCarriers:
secondaryPurposes:
```

Only primary carrier/purpose cells count toward coverage satisfaction. Secondary cells may help review and search later, but they must not be used to claim the matrix is solved.

If a source item touches multiple carriers or purposes, choose the recommendation-driving primary cell and preserve the rest as secondary support or variant/split backlog.

## Candidate source classification

Each candidate must include:

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
  The source gives a practice family or ritual pattern but not a precise step-by-step ritual. Moon & Table may author a simple household form only from source-supported actions, locations, timing, and materials. Separate source-backed core from Moon & Table-authored ritual form.

metadata_symbolism_only:
  The source gives symbolism, correspondences, theory, or timing context but not enough action to support a whole Ritual.
```

`metadata_symbolism_only` may appear in the source inventory, source notes, or `candidate_extract_later` backlog. It must not be used for `candidate_extract_now`.

## Candidate requirements

Each Ritual candidate must be a whole practice, not a symbol note.

Each `candidate_extract_now` candidate needs full runtime-mapped fields:

```text
headline:
ritual body / practice:
intention:
bestWindow:
whyThisFitsIngredients:
howThisWasChosenIngredients:
questionToCarry:
source grounding:
recommendation metadata:
search metadata:
review flags:
adaptation policy notes, if needed:
operative words metadata:
import readiness label:
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
private excerpt/material/source/product-boundary dependencies -> reviewFlags
operative words metadata -> ritualWords[]
```

The ritual body / practice must read as a complete practice on its own. It must contain:

```text
intentional open
concrete source-supported action / sequence
spoken or written ritual words where source-supported or Moon & Table-authored under the operative-words rule
intentional close
```

Do not add separate required `opening` or `closing` fields unless the runtime model changes in a later product issue.

For direct source rituals, preserve the source close when given.

If the source does not give a close, author a simple close that completes the source-supported action without adding unsupported props, materials, deity/spirit elements, correspondences, or symbolic mechanics.

Do not invent a decorative close.

## Why-this-fits / how-this-was-chosen ingredients

Do not treat `whyThisFits` as a static source-summary paragraph when the ritual is selected through Choose with me.

Use this structure:

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

## Default status and import readiness

Every candidate must default to draft/unavailable/not recommendable.

Use:

```ts
status: "draft"

availability: {
  findable: false,
  directUseEligible: false,
  recommendationEligible: false,
}

recommendationMetadata: {
  eligibility: {
    recommendable: false,
    missing: ["human_review", "source_verification"],
  },
}
```

Each candidate must also be marked:

```text
approved_for_mechanical_import
needs_packet_correction
hold_before_import
```

`approved_for_mechanical_import` means Codex may mechanically import the packet-approved text as a draft source-backed Ritual record under #287.

It does not mean reviewed, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.

Do not normalize into runtime data during extraction. Runtime import belongs in a later issue after PR-gated extraction QA.

## Operative words metadata

Where relevant, include:

```ts
ritualWords?: [
  {
    mode: "source_exact_short" | "private_source_excerpt" | "moon_and_table_original";
    text?: string;
    privateExcerptKey?: string;
    citationLabel?: string;
    sourceLocation?: string;
    useContext: "spoken" | "written" | "chanted" | "prayer" | "blessing" | "incantation" | "invocation" | "petition" | "closing" | "question" | "vow" | "song" | "other";
    note?: string;
  }
]
```

Spoken or written words that the user should say or write belong inline in `ritual body / practice` where they are used.

`ritualWords` is not the authoring surface for Ritual copy. It is provenance/review metadata.

Use `moon_and_table_original` only when the source supports spoken/written ritual mechanics but does not provide operative words, or when Tim explicitly chooses adaptation over source wording.

## Variant / split ledger

Include a variant / split ledger for broad or high-yield source items.

Use:

```text
Variant / split candidates:
- keep together now:
- split later:
- reason:
- trigger for split:
```

Use this ledger instead of either bloating one candidate or silently losing useful future variants.

Examples:

- house blessing vs room blessing;
- threshold wash vs whole-house circuit;
- kitchen candle vs oil lamp;
- cauldron vs bowl/jar;
- spell bottle variants;
- food awareness vs recipe-specific rituals;
- grimoire entry as ritual vs product follow-up.

## Output format

Return one Markdown packet:

```text
# Ritual candidate packet: [Source / packet name]
```

Include:

1. Packet metadata.
2. Assignment.
3. Allowed source.
4. Source policy note.
5. Disallowed/limited source material.
6. Source sections used.
7. Source rite inventory.
8. Packet metrics.
9. Coverage summary.
10. Candidate research records.
11. Source notes.
12. Coverage records.
13. Variant / split ledger.
14. Rejected / held leads.
15. Duplicate check.
16. Gap notes.
17. Remaining extraction backlog.
18. Validation checklist.
19. Open questions / Tim decisions.

Do not produce a small sample and stop. The inventory must account for the source’s usable ritual material.

## QA reviewer baseline

A QA reviewer must read:

```text
source gate record
source PDF/material
extraction packet PR diff
docs/research/voice/moon-and-table-house-voice-guide.md
docs/research/extraction-depth-policy.md
docs/research/private-source-text-policy.md
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
- longer exact wording uses `private_source_excerpt` metadata;
- no generic Moon & Table replacement words are created where usable source words exist;
- `whyThisFitsIngredients` and `howThisWasChosenIngredients` use the required structure;
- no runtime eligibility flags are changed.

## Validation checklist

Every packet must validate:

- [ ] Source inventory accounts for assigned source sections.
- [ ] Every inventory item has a disposition.
- [ ] Every `candidate_extract_now` has `ritualizationType`.
- [ ] No `metadata_symbolism_only` item is marked `candidate_extract_now`.
- [ ] Every `candidate_extract_now` has full runtime-mapped fields.
- [ ] Ritual body / practice reads as a complete ritual on its own.
- [ ] Ritual body includes open, source-supported action/sequence, operative words where needed, and close.
- [ ] No props/materials/decorative closing gestures are added unless source-supported or Tim-approved.
- [ ] `ritualWords` is metadata only and does not replace the ritual body.
- [ ] Short source phrases are 20 words or fewer, inline in the ritual body, and tracked as `source_exact_short`.
- [ ] Longer/substantial exact text is handled through `private_source_excerpt` ritualWords metadata.
- [ ] No generic Moon & Table replacement words are created where usable source words exist.
- [ ] Why-this-fits / how-this-was-chosen ingredients use the required structure.
- [ ] Candidate import readiness label is present.
- [ ] No candidate is marked reviewed/findable/direct-use eligible/recommendation eligible/recommendable/runtime-ready.
