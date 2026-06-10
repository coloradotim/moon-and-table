# Runtime Ritual authoring policy

Moon & Table is a private household ritual calendar and grimoire for Tim and Jessica.

This policy controls runtime Ritual authoring, import, review, and Codex implementation work. It sits downstream of source gates and extraction packets. Extraction decides what source material is available and authors packet-approved draft Ritual content. Runtime authoring decides how that material becomes usable `Ritual` records in the app.

If a ritual-content issue, Codex prompt, or implementation plan conflicts with this policy, this policy controls unless Tim explicitly says otherwise.

Controls:

```text
docs/research/voice/moon-and-table-house-voice-guide.md
docs/research/extraction-depth-policy.md
docs/research/private-source-text-policy.md
src/data/rituals/types.ts
```

## Product posture

Moon & Table is not a public consumer safety product, therapy product, wellness app, productivity app, horoscope feed, spell database, or generic advice system.

Moon & Table is private software for two competent adults. It should sound and behave like a warm, source-backed, private household grimoire.

Runtime Rituals should preserve source-backed magical language when it fits the approved source lane:

```text
hearth
home
altar
table
threshold
doorway
vessel
cauldron
candle
flame
flower
plant
moon
symbol
blessing
protection
purification
release
spell
charm
spoken purpose
prayer
incantation
invocation
grimoire
remembrance
partner witnessing
invitation
closing
integration
```

Do not flatten rituals into chores, mindfulness, wellness, therapy, productivity, communication tips, or generic relationship advice.

## Source architecture first

Runtime authoring must preserve source architecture before applying Moon & Table voice.

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

If the source uses seven candles, the Ritual uses seven candles.

If the source uses a specific close, use the source close.

If the source gives a practice family rather than a precise ritual, Moon & Table may author a simple household form only from source-supported actions, locations, timing, and materials.

Do not add props, materials, closing gestures, correspondences, deity/spirit elements, or symbolic mechanics unless the source supports them or Tim explicitly approves a separate adaptation.

## Safety posture

Do not include ordinary household safety warnings in user-facing Ritual copy.

Safety review is for material product decisions: whether a candidate should be imported, held, adapted, internally flagged, or excluded. It should not turn Ritual text into warning labels.

Do not surface obvious or semi-obvious adult household cautions in `presentation.practice`, `presentation.whyThisFits`, `presentation.intention`, or other normal user-facing Ritual copy.

Only surface a user-facing safety note when the issue is non-obvious, source-specific, materially changes the ritual, or would be easy to miss even for competent adults.

Material review should still block, hold, or adapt genuinely problematic source material, including:

```text
ingestion requirements
smoke or incense defaults
essential oils, topical oils, baths, or body preparations
psychoactive substances
unsafe herbs, flowers, plants, stones, or formulas
pet, child, pregnancy, allergy, medication, or dietary hazards when materially relevant
non-potable water
hazardous disposal
high-risk flame/fire/cauldron practices
medical, therapy, addiction-treatment, legal, financial, fertility, or guaranteed-outcome claims
coercive love, sex, attraction, domination, revenge, enemy, or target-control workings
culturally/provenance-sensitive practices outside an approved lane
```

When the practice is ordinary adult candle/table/kitchen/flower/plant/water-bowl/doorway/grimoire work, keep the Ritual usable and magical.

If source architecture is unsafe, coercive, medical/legal/financial, culturally sensitive, or outside Moon & Table's product lane, do not silently adapt around it. Mark the candidate held or split a clearly supported safe variant only if the source supports that variant.

## Canonical extraction packet relationship

A complete extraction packet is the canonical Ritual authoring artifact.

Codex should not receive rough research notes and then author runtime Ritual copy. Codex should import packet-approved text mechanically.

Core rule:

```text
If Codex must invent user-facing Ritual prose during #287, the extraction packet is not complete enough for import.
```

Extraction packets should provide these human-facing fields for each importable candidate:

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

## Ritual body and presentation fields

The complete user-facing Ritual must read correctly from `presentation.practice` alone.

The ritual body / practice must include:

```text
intentional open
concrete source-supported action / sequence
spoken or written ritual words where source-supported or Moon & Table-authored
intentional source-supported close
```

Do not add separate required `opening` or `closing` fields unless the runtime model is deliberately changed in a later product issue.

`presentation.whyThisFits` is the rendered explanation field, but Choose with me may require runtime assembly/generation from structured packet ingredients. Do not treat `whyThisFits` as a static source-summary paragraph when recommendation context matters.

## Operative ritual words

Author-provided ritual words are ritual materials.

When a source gives specific words for the practitioner to say, write, chant, bless, pray, invoke, petition, name, close, or carry, those words are part of the Ritual mechanics. They are not decorative and should not be casually replaced.

Default runtime authoring posture:

1. Preserve source architecture and operative ritual words when feasible.
2. Rewrite only the surrounding instructions into Moon & Table voice.
3. Do not paraphrase source-provided spell words, blessings, prayers, incantations, petitions, or written ritual words by default.
4. If exact source wording cannot be stored directly in a committed public repo file, preserve the dependency with a private excerpt key rather than replacing the words with generic original copy.
5. Do not block draft/findable import merely because exact ritual words exist.
6. Do not flatten prayer, blessing, charm, incantation, spell, petition, or spoken formula into “state an intention.”

## Source text handling

Moon & Table distinguishes between:

1. ritual mechanics and sequence;
2. surrounding runtime instructions;
3. operative words used inside the Ritual body;
4. exact modern source text that needs private excerpt storage;
5. `ritualWords` metadata that tracks/proves operative word handling.

For modern copyrighted sources:

- do not reproduce full copyrighted rituals, full chapters, full scripts, full prompt sets, full meditations, full recipes, full poems, full prayers, full invocations, or long distinctive passages in public committed repo files;
- do preserve exact short operative words when they are necessary, attributed, and not a substitute for the source;
- do use private excerpt support for longer or substantial operative wording;
- do record source location and why the exact words matter;
- do not convert exact ritual words into bland Moon & Table original text just because they are exact words.

The correct fallback for long source wording is a private excerpt placeholder/key, not generic paraphrase.

## Runtime schema expectations

Runtime Ritual records may use optional structured fields for operative words and review flags.

Spoken or written words that the user should say or write belong inline in `presentation.practice` where they are used.

Use `ritualWords` only as provenance/review metadata for operative words already present in, or required by, the ritual body. Do not use `ritualWords` as the authoring surface for user-facing Ritual copy.

Use `reviewFlags` to track import/direct-use dependencies without polluting user-facing Ritual copy.

Allowed `ritualWords.mode` values:

```text
source_exact_short
private_source_excerpt
moon_and_table_original
```

Definition:

```text
short source phrase = 20 words or fewer
```

Example:

```ts
ritualWords: [
  {
    mode: "private_source_excerpt",
    privateExcerptKey: "buckland-final-word-pp15",
    citationLabel: "Buckland, Practical Candleburning Rituals",
    sourceLocation: "PDF p. 15",
    useContext: "closing",
    note: "Use the author-provided final words from Tim's private source copy.",
  },
]
```

```ts
reviewFlags: {
  privateExcerptRequired: true,
  sourceTextReviewRequired: true,
}
```

These flags are not warnings to show Tim and Jessica during normal Ritual use.

## Import readiness labels

Extraction QA may mark packet candidates:

```text
approved_for_mechanical_import
needs_packet_correction
hold_before_import
```

`approved_for_mechanical_import` means Codex may mechanically import the packet-approved text as a draft source-backed Ritual record under #287.

It does not mean reviewed, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.

Do not treat import approval as product approval.

## Import scope and batching

The goal of #287 is full accepted coverage soonest.

Do not narrow accepted packets editorially.

Import all acceptable `candidate_extract_now` records from accepted packets unless there is a concrete record-level reason to hold, reject, or defer.

Operational batching is allowed only for pipeline validation, reviewability, or isolating failures. Batching should be by whole packet or large source family, not hand-picked favorite candidates.

A pipeline-test batch, if used, is not the product scope. It should be followed by broad import batches.

## Direct-use review posture

Direct-use review should confirm that a Ritual is complete, source-grounded, usable, and product-voiced.

Direct-use review should also remove unnecessary safety boilerplate, preserve magical force, and verify that operative words were handled intentionally:

```text
preserved as exact short words
stored as private excerpt key
kept as source-attributed wording anchor
authored as Moon & Table original only when the source did not provide operative words or Tim explicitly chose adaptation
```

Do not make recommendation eligibility part of direct-use review unless a separate issue explicitly says so.

## Codex preamble for future ritual work

Every Moon & Table ritual-content implementation prompt should begin by requiring Codex to read:

```text
docs/research/voice/moon-and-table-house-voice-guide.md
docs/research/runtime-ritual-authoring-policy.md
docs/research/private-source-text-policy.md
docs/research/extraction-depth-policy.md
src/data/rituals/types.ts
```

Then the prompt should restate:

```text
Do not over-warn.
Do not flatten magic.
Do not replace operative ritual words by default.
Do not add props/materials/closing gestures unless source-backed.
Do not narrow accepted packets editorially.
Use private excerpt keys for longer exact source wording instead of generic paraphrase.
Ritual words belong inline in presentation.practice; ritualWords is provenance/review metadata only.
```
