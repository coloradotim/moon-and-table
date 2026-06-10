# Runtime Ritual authoring policy

Moon & Table is a private household ritual calendar and grimoire for Tim and Jessica.

This policy controls runtime Ritual authoring, import, review, and Codex implementation work. It sits downstream of source gates and extraction packets. Extraction decides what source material is available. Runtime authoring decides how that material becomes usable `Ritual` records in the app.

If a ritual-content issue, Codex prompt, or implementation plan conflicts with this policy, this policy controls unless Tim explicitly says otherwise.

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

## Operative ritual words

Author-provided ritual words are ritual materials.

When a source gives specific words for the practitioner to say, write, chant, bless, pray, invoke, petition, name, close, or carry, those words are part of the Ritual mechanics. They are not decorative and should not be casually replaced.

Default runtime authoring posture:

1. Rewrite surrounding instructions into Moon & Table voice.
2. Preserve operative ritual words when feasible.
3. Do not paraphrase source-provided spell words, blessings, prayers, incantations, petitions, or written ritual words by default.
4. If exact source wording cannot be stored directly in a committed public repo file, preserve the dependency with a private excerpt key rather than replacing the words with generic original copy.
5. Do not block draft/findable import merely because exact ritual words exist.
6. Do not flatten prayer, blessing, charm, incantation, spell, petition, or spoken formula into “state an intention.”

## Source text handling

Moon & Table distinguishes between:

1. ritual mechanics and sequence;
2. surrounding runtime instructions;
3. operative words used inside the Ritual;
4. exact modern source text that needs private excerpt storage.

For modern copyrighted sources:

- do not reproduce full copyrighted rituals, full chapters, full scripts, full prompt sets, full meditations, full recipes, full poems, full prayers, full invocations, or long distinctive passages in public committed repo files;
- do preserve exact short operative words when they are necessary, attributed, and not a substitute for the source;
- do use private excerpt support for longer or substantial operative wording;
- do record source location and why the exact words matter;
- do not convert exact ritual words into bland Moon & Table original text just because they are exact words.

The correct fallback for long source wording is a private excerpt placeholder/key, not generic paraphrase.

## Runtime schema expectations

Runtime Ritual records may use optional structured fields for operative words and review flags.

Use `ritualWords` to separate words used inside the Ritual from surrounding instructions.

Use `reviewFlags` to track import/direct-use dependencies without polluting user-facing Ritual copy.

Examples:

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
docs/research/runtime-ritual-authoring-policy.md
docs/research/private-source-text-policy.md
src/data/rituals/types.ts
```

Then the prompt should restate:

```text
Do not over-warn.
Do not flatten magic.
Do not replace operative ritual words by default.
Do not narrow accepted packets editorially.
Use private excerpt keys for longer exact source wording instead of generic paraphrase.
```
