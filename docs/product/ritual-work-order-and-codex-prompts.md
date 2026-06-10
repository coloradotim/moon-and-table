# Ritual product work order and Codex prompts

This document defines the implementation path from source-backed Ritual import to two working Moon & Table user paths:

1. **I have something in mind** — search/browse and select a Ritual directly.
2. **Choose with me** — answer Ritual Intent Check-In questions and let Moon & Table choose one fitting Ritual.

Moon & Table is private software for Tim and Jessica. Preserving a temporarily functional public-style app is not a requirement. The old pilot Rituals are scaffolding and reference material, not product content that must be backed up, protected, or preserved.

## Controlling files

Every ritual-content implementation prompt should begin by reading:

```text
docs/research/runtime-ritual-authoring-policy.md
docs/research/private-source-text-policy.md
src/data/rituals/types.ts
docs/product/ritual-work-order-and-codex-prompts.md
```

Then restate and follow:

```text
Do not over-warn.
Do not flatten magic.
Do not replace operative ritual words by default.
Do not narrow accepted packets editorially.
Use private excerpt keys for longer exact source wording instead of generic paraphrase.
```

## Work order

### Step 0 — Finish PR #267

Finish and merge PR #267 if review confirms it is clean.

Goal: complete the first app-facing surface for **I have something in mind**.

Do not over-invest in protecting the pilot Ritual set. If #287 needs to change the ritual collection, do it.

### Step 1 — #287: Import source-backed Rituals as draft/findable

Import the first real source-backed runtime Ritual batch.

Initial batch:

```text
docs/research/ritual-candidates/packet-buckland-candlelight-complete-extraction.md
docs/research/ritual-candidates/packet-house-witch-complete-extraction.md
docs/research/ritual-candidates/packet-house-witch-complete-extraction-review-note.md
```

Expected initial counts unless the local files prove otherwise:

```text
Buckland candidate_extract_now: 20
House Witch candidate_extract_now: 31
```

The old pilot Rituals are not protected product content. Use them only as schema/style reference or temporary fallback. It is acceptable for source-backed Rituals to replace them as the primary ritual collection.

### Step 2 — #288: Direct-use review

Review imported draft/findable Rituals and promote usable records to:

```ts
status: "reviewed"
availability.directUseEligible = true
availability.recommendationEligible = false
recommendationMetadata.eligibility.recommendable = false
recommendationMetadata.eligibility.missing = ["recommendation_review"]
```

Direct-use review should remove excessive safety boilerplate, preserve operative ritual words, and keep the magic intact.

### Step 3 — #339: Recommendation eligibility review

Review a direct-use set for recommendation eligibility so **Choose with me** has a clean selection pool.

Promote passing records to:

```ts
status: "recommendable"
availability.findable = true
availability.directUseEligible = true
availability.recommendationEligible = true
recommendationMetadata.eligibility.recommendable = true
recommendationMetadata.eligibility.missing = []
```

### Step 4 — #340: Ritual Intent Check-In

Replace the current check-in with questions that map directly to Ritual metadata and user intent.

Core inputs:

```text
Who is this for?
- Me
- Both of us

What are you asking the ritual to help with?
- open
- steady
- tend
- bless
- protect
- release
- voice
- connect
- remember
- mark

How much do you have room for?
- only a little
- enough to participate
- room for something deeper

What kind of ritual are you drawn toward?
- candle / flame
- table / food / kitchen
- plant / flower
- doorway / threshold
- vessel / bowl / water / cauldron
- words / blessing / prayer / spell
- body / gesture / movement
- no preference

Is there a timing pull?
- lunar
- astrological
- seasonal
- tonight / soon
- no timing preference

Any material, phrase, place, or mood already in mind?
- free text
```

Preserving old check-in behavior is not a goal.

### Step 5 — #341: Choose with me selector

Use Ritual Intent Check-In answers to choose one Ritual.

First version can be deterministic scoring. Do not wait for AI. Do not wait for perfect astrology/timing cards.

Score against:

```text
eligibility
purpose
carrier
audience
capacity
timing relationship/context
materials/tags/keywords/free text
source/product boundaries
```

Return one Ritual and a short, warm explanation of why it fits.

### Step 6 — Timing/source-note cards

After the two-path product works, improve lunar/astrological/seasonal explanation using timing/source-note cards. This enhances why-this-moment copy but does not block the first working Choose with me path.

## Codex prompt: #287 import

```text
Work issue #287 in coloradotim/moon-and-table.

Before implementation, read and follow:

- docs/research/runtime-ritual-authoring-policy.md
- docs/research/private-source-text-policy.md
- src/data/rituals/types.ts
- docs/product/ritual-work-order-and-codex-prompts.md

Restate and follow:

Do not over-warn.
Do not flatten magic.
Do not replace operative ritual words by default.
Do not narrow accepted packets editorially.
Use private excerpt keys for longer exact source wording instead of generic paraphrase.

Also inspect:

- src/data/rituals/pilot-rituals.ts
- src/data/rituals/search-rituals.ts
- src/main.ts
- src/ui/app-shell.ts
- docs/research/audits/extraction-source-accounting-audit.md
- docs/research/ritual-candidates/packet-buckland-candlelight-complete-extraction.md
- docs/research/ritual-candidates/packet-house-witch-complete-extraction.md
- docs/research/ritual-candidates/packet-house-witch-complete-extraction-review-note.md

Private source PDFs may be available locally at:

.moon-table-private/sources/

That folder is local-only and must not be committed. Use packets as the primary import source. Use PDFs only when exact ritual words matter, when source verification is required, when source location is ambiguous, or when the packet does not provide enough ritual shape to author a draft runtime Ritual honestly.

Goal:

Import all acceptable candidate_extract_now records from the complete Buckland and House Witch packets as draft/findable Ritual records using the existing Ritual model.

Expected counts unless current files prove otherwise:

- Buckland candidate_extract_now: 20
- House Witch candidate_extract_now: 31

If local files disagree, stop and report the discrepancy rather than guessing.

The old pilot Rituals are scaffolding and reference material, not product content that must be backed up or preserved. Use them only as schema/style reference or temporary fallback. It is acceptable for source-backed Rituals to become the primary ritual collection used by Search rituals.

Create or update the source-backed Ritual data path, likely:

src/data/rituals/source-backed-rituals.ts

or use the repo’s existing pattern if a better current structure exists.

Ensure imported source-backed Rituals are included in the ritual collection used by search, without creating a second content model.

Every imported Ritual must use:

status: "draft"

availability: {
  findable: true,
  directUseEligible: false,
  recommendationEligible: false,
}

recommendationMetadata: {
  eligibility: {
    recommendable: false,
    missing: ["direct_use_review", "recommendation_review"],
  },
}

Use origin.type = "source" and fill origin.sourceGrounding[] with specific source grounding.

Use presentation for complete user-facing Ritual copy with clear beginning, concrete action/sequence, and close.

Do not include ordinary household safety warnings in user-facing Ritual copy.

Use ritualWords for operative source-provided words. Do not replace operative words with generic Moon & Table wording by default.

Use reviewFlags for unresolved private excerpt, source-text, source verification, material review, or product boundary dependencies.

Do not import source_note_only, context_only, candidate_extract_later, product_followup_pattern-only, hold, reject, unresolved deity/spirit/ancestor material, coercive work, medical/therapy treatment framing, prosperity/luck/power-over guarantees, or culturally sensitive practice without review.

Run:

npm run lint:content
npm run typecheck
npm run test
npm run check
npm run rituals:readiness
npm run diagnose:content

Closeout report must include counts, private excerpt keys, records with ritualWords, records with reviewFlags, schema gaps, paths changed, and validation results.

Do not work #288. Do not promote direct-use or recommendation eligibility.
```

## Codex prompt: #288 direct-use review

```text
Work issue #288 in coloradotim/moon-and-table.

Before implementation, read and follow the controlling files listed in docs/product/ritual-work-order-and-codex-prompts.md.

Use imported draft/findable Rituals from #287 as input.

Goal: review imported source-backed draft Rituals for direct-use eligibility. Promote passing records to reviewed/direct-use, but do not make anything recommendation eligible.

Passing records should become:

status: "reviewed"
availability.findable = true
availability.directUseEligible = true
availability.recommendationEligible = false
recommendationMetadata.eligibility.recommendable = false
recommendationMetadata.eligibility.missing = ["recommendation_review"]

Remove excessive caution language. Do not add ordinary household safety warnings to user-facing Ritual copy.

Preserve magical force and source-backed terms. Do not flatten ritual into chores, wellness, productivity, or generic advice.

Verify operative ritual words were handled intentionally: exact short words, private excerpt key, source-attributed wording anchor, or Moon & Table original only where appropriate.

Hold/defer records that need unresolved private excerpt text, source verification, material review, or product-boundary review before direct use.

Run validation and provide the required closeout report.

Do not import new candidates. Do not promote recommendation eligibility. Do not build selector logic.
```

## Codex prompt: #339 recommendation eligibility review

```text
Work issue #339 in coloradotim/moon-and-table.

Before implementation, read and follow the controlling files listed in docs/product/ritual-work-order-and-codex-prompts.md.

Input: reviewed/direct-use Ritual records produced by #288.

Goal: review direct-use Rituals for recommendation eligibility so Choose with me has a clean selection pool.

Promote passing records to:

status: "recommendable"
availability.findable = true
availability.directUseEligible = true
availability.recommendationEligible = true
recommendationMetadata.eligibility.recommendable = true
recommendationMetadata.eligibility.missing = []

A Ritual can become recommendation eligible if it is direct-use eligible, has complete enough metadata for matching, has no unresolved private excerpt or material/product-boundary dependency, and can be selected without relying on missing timing-card infrastructure.

Do not rewrite the Ritual library wholesale. Do not import new records. Do not build the selector.

Run validation and report counts.
```

## Codex prompt: #340 Ritual Intent Check-In

```text
Work issue #340 in coloradotim/moon-and-table.

Before implementation, read and follow the controlling files listed in docs/product/ritual-work-order-and-codex-prompts.md.

Goal: replace the current check-in flow with a Ritual Intent Check-In that maps directly to Ritual metadata and the Choose with me path.

Preserving the old check-in flow is not a requirement. It is acceptable to break old scaffolding if that simplifies the correct product.

Implement these input areas:

1. Who is this for? Me / Both of us.
2. What are you asking the ritual to help with? open, steady, tend, bless, protect, release, voice, connect, remember, mark.
3. How much do you have room for? only a little, enough to participate, room for something deeper.
4. What kind of ritual are you drawn toward? candle/flame, table/food/kitchen, plant/flower, doorway/threshold, vessel/bowl/water/cauldron, words/blessing/prayer/spell, body/gesture/movement, no preference.
5. Is there a timing pull? lunar, astrological, seasonal, tonight/soon, no timing preference.
6. Any material, phrase, place, or mood already in mind? free text.

Create a typed data shape for these answers. Map answers to existing Ritual metadata values wherever possible.

Do not build final selection logic here unless tiny and clearly separable. The output should be a clean check-in state that #341 can consume.

Run validation and report changed files.
```

## Codex prompt: #341 Choose with me selector

```text
Work issue #341 in coloradotim/moon-and-table.

Before implementation, read and follow the controlling files listed in docs/product/ritual-work-order-and-codex-prompts.md.

Input: Ritual Intent Check-In answers and the runtime Ritual collection.

Goal: implement the first functional Choose with me path. The user answers the Ritual Intent Check-In, Moon & Table selects one fitting Ritual, and the app renders that Ritual with a short explanation of why it fits.

Use deterministic scoring. Do not wait for AI. Do not wait for final lunar/astrological timing-card architecture.

Initial eligibility gate: prefer recommendationEligible records. If none exist yet, allow a temporary explicit fallback to directUseEligible records only if the code makes that fallback obvious and removable.

Do not select raw draft-only records for Choose with me.

Score purpose, carrier, audience, capacity, timing relationship/context, materials/tags/keywords/free-text hint, and source/product-boundary eligibility.

Return selected Ritual, score/rationale details for debugging, and user-facing why-this-fits explanation.

Reuse Ritual preview/presentation shape from Search rituals if appropriate.

Run validation and include example check-in answers and selected Ritual results.
```
