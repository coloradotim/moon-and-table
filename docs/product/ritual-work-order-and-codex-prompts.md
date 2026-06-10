# Ritual product work order and Codex prompts

This document defines the current implementation path from the source-backed Ritual import work to fully functional user paths:

1. **I have something in mind** — search and select a Ritual directly.
2. **Choose with me** — answer a short Ritual Intent Check-In and let Moon & Table choose one fitting Ritual.

The app is private for Tim and Jessica. Preserving a temporarily functional public-style app is not a requirement. The old pilot Rituals are scaffolding and reference material, not product content that must be backed up or protected.

## Controlling policy files

Every ritual-content implementation prompt should begin by reading:

```text
docs/research/runtime-ritual-authoring-policy.md
docs/research/private-source-text-policy.md
src/data/rituals/types.ts
```

Then restate and follow:

```text
Do not over-warn.
Do not flatten magic.
Do not replace operative ritual words by default.
Do not narrow accepted packets editorially.
Use private excerpt keys for longer exact source wording instead of generic paraphrase.
```

## Product target

Moon & Table should have two working user paths.

### I have something in mind

The user can search/browse source-backed Ritual records by material, mood, purpose, place, or phrase, preview the Ritual, and use it directly if eligible.

This path is allowed to expose draft/findable records because the user is intentionally searching. Draft/direct-use state should be visible enough for Tim/Jessica to understand what is reviewed versus still draft, without turning the experience into a management screen.

### Choose with me

The user answers a short Ritual Intent Check-In. Moon & Table selects one source-backed Ritual that fits the moment and explains why.

This path should use a cleaner eligibility gate than search. The first implementation should select from direct-use reviewed records, and later from recommendation-eligible records once recommendation review exists.

## Work order

### Step 0 — Finish Search rituals PR

Finish and merge PR #267 if review confirms it is clean.

Goal: complete the first app-facing surface for **I have something in mind**.

Do not over-invest in protecting the pilot Ritual set. If #287 needs to change the ritual collection, do it.

### Step 1 — #287: Import source-backed Rituals as draft/findable

Goal: import the first real source-backed runtime Ritual batch.

Use the complete Buckland and House Witch packets first:

```text
docs/research/ritual-candidates/packet-buckland-candlelight-complete-extraction.md
docs/research/ritual-candidates/packet-house-witch-complete-extraction.md
docs/research/ritual-candidates/packet-house-witch-complete-extraction-review-note.md
```

Expected initial import batch unless the local files prove otherwise:

```text
Buckland candidate_extract_now: 20
House Witch candidate_extract_now: 31
```

The old pilot Rituals are not protected product content. Use them only as schema/style reference or temporary fallback. It is acceptable for source-backed Rituals to replace them as the primary ritual collection.

### Step 2 — #288: Direct-use review

Goal: review imported draft/findable Rituals and promote usable records to:

```ts
status: "reviewed"
availability.directUseEligible: true
availability.recommendationEligible: false
recommendationMetadata.eligibility.recommendable: false
recommendationMetadata.eligibility.missing: ["recommendation_review"]
```

Direct-use review should remove excessive safety boilerplate, preserve operative ritual words, and keep the magic intact.

### Step 3 — Recommendation eligibility review

Goal: review a direct-use set for recommendation eligibility so **Choose with me** has a clean selection pool.

This is not a new import and not a rewrite. It is a recommendation-readiness review.

Promote passing records to:

```ts
status: "recommendable"
availability.findable: true
availability.directUseEligible: true
availability.recommendationEligible: true
recommendationMetadata.eligibility.recommendable: true
recommendationMetadata.eligibility.missing: []
```

### Step 4 — Replace current check-in with Ritual Intent Check-In

Goal: replace the current check-in with questions that map directly to Ritual metadata and user intent.

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

The implementation can break the old check-in flow. Preserving old check-in behavior is not a goal.

### Step 5 — Implement Choose with me selector

Goal: use Ritual Intent Check-In answers to choose one Ritual.

First version can be deterministic scoring. Do not wait for AI. Do not wait for perfect astrology/timing cards.

Scoring inputs:

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

The selector should return one Ritual and a short explanation of why it fits.

### Step 6 — Improve timing/source-note cards

After the basic two-path product works, improve lunar/astrological/seasonal explanation using timing/source-note cards. This should enhance why-this-moment copy, not block initial Choose with me functionality.

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

That folder is local-only and must not be committed. Use packets as the primary import source. Use PDFs only when exact ritual words matter, when a packet says source verification is required, when source location is ambiguous, or when the packet does not provide enough ritual shape to author a draft runtime Ritual honestly.

Do not copy long copyrighted passages into committed repo files. For longer or substantial operative wording, use ritualWords.mode = "private_source_excerpt" with a stable privateExcerptKey, citation label, source location, and note.

Goal:

Implement the first real #287 runtime import batch as draft/findable Ritual records using the existing Ritual model.

Import all acceptable candidate_extract_now records from:

- docs/research/ritual-candidates/packet-buckland-candlelight-complete-extraction.md
- docs/research/ritual-candidates/packet-house-witch-complete-extraction.md

Use the House Witch correction note:

- docs/research/ritual-candidates/packet-house-witch-complete-extraction-review-note.md

For House Witch, apply the corrected row for ritual-house-witch-purify-one-room.

Expected counts unless current files prove otherwise:

- Buckland candidate_extract_now: 20
- House Witch candidate_extract_now: 31

If the local files disagree, stop and report the discrepancy rather than guessing.

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

Before implementation, read and follow:

- docs/research/runtime-ritual-authoring-policy.md
- docs/research/private-source-text-policy.md
- src/data/rituals/types.ts
- docs/product/ritual-work-order-and-codex-prompts.md

Use the imported draft/findable Rituals from #287 as input.

Goal:

Review imported source-backed draft Rituals for direct-use eligibility. Promote passing records to reviewed/direct-use, but do not make anything recommendation eligible.

Passing records should become:

status: "reviewed"
availability.findable: true
availability.directUseEligible: true
availability.recommendationEligible: false
recommendationMetadata.eligibility.recommendable: false
recommendationMetadata.eligibility.missing: ["recommendation_review"]

Remove excessive caution language. Do not add ordinary household safety warnings to user-facing Ritual copy.

Preserve magical force and source-backed terms. Do not flatten ritual into chores, mindfulness, wellness, therapy, productivity, communication tips, or generic relationship advice.

Verify operative ritual words were handled intentionally:

- preserved as exact short words;
- stored as private excerpt key;
- kept as source-attributed wording anchor;
- authored as Moon & Table original only when the source did not provide operative words or Tim explicitly chose adaptation.

Do not replace source-provided spell words, blessings, prayers, incantations, petitions, or written ritual words merely because they are exact words.

Hold/defer records that need unresolved private excerpt text, source verification, material review, or product-boundary review before direct use.

Run validation and provide the required closeout report.

Do not import new candidates. Do not promote recommendation eligibility. Do not work recommendation selector logic.
```

## Codex prompt: recommendation eligibility review

```text
Work the recommendation eligibility review issue in coloradotim/moon-and-table.

Before implementation, read and follow:

- docs/research/runtime-ritual-authoring-policy.md
- docs/research/private-source-text-policy.md
- src/data/rituals/types.ts
- docs/product/ritual-work-order-and-codex-prompts.md

Input:

Use reviewed/direct-use Ritual records produced by #288.

Goal:

Review direct-use Rituals for recommendation eligibility so Choose with me has a clean selection pool.

Promote passing records to:

status: "recommendable"
availability.findable: true
availability.directUseEligible: true
availability.recommendationEligible: true
recommendationMetadata.eligibility.recommendable: true
recommendationMetadata.eligibility.missing: []

A Ritual can become recommendation eligible if:

- it is direct-use eligible;
- its purpose, carrier, capacity, audience, and timing metadata are complete enough for matching;
- it has no unresolved private excerpt dependency that would make the selected Ritual unusable;
- it has no unresolved material/product-boundary review dependency;
- it can be selected without relying on AI interpretation or missing timing-card infrastructure;
- its why-this-fits copy can be safely shaped by simple check-in and timing context.

Do not rewrite the Ritual library wholesale. Do not import new records. Do not build the selector in this issue.

Run validation and provide counts:

- reviewed records considered;
- promoted recommendation eligible;
- kept direct-use only;
- held for private excerpt;
- held for metadata gap;
- held for product-boundary/material review.
```

## Codex prompt: Ritual Intent Check-In

```text
Work the Ritual Intent Check-In issue in coloradotim/moon-and-table.

Before implementation, read and follow:

- docs/research/runtime-ritual-authoring-policy.md
- src/data/rituals/types.ts
- docs/product/ritual-work-order-and-codex-prompts.md

Goal:

Replace the current check-in flow with a Ritual Intent Check-In that maps directly to Ritual metadata and the Choose with me path.

Preserving the old check-in flow is not a requirement. This is a private app for Tim and Jessica; it is acceptable to break old scaffolding if that simplifies the correct product.

Implement questions:

1. Who is this for?
   - Me
   - Both of us

2. What are you asking the ritual to help with?
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

3. How much do you have room for?
   - only a little
   - enough to participate
   - room for something deeper

4. What kind of ritual are you drawn toward?
   - candle / flame
   - table / food / kitchen
   - plant / flower
   - doorway / threshold
   - vessel / bowl / water / cauldron
   - words / blessing / prayer / spell
   - body / gesture / movement
   - no preference

5. Is there a timing pull?
   - lunar
   - astrological
   - seasonal
   - tonight / soon
   - no timing preference

6. Any material, phrase, place, or mood already in mind?
   - free text

Create a typed data shape for these answers. Map answers to existing Ritual metadata values wherever possible: audience, purposes, carriers, capacity, timing, tags/materials/keywords.

Do not build final selection logic here unless it is tiny and clearly separable. The output of this issue should be a clean check-in state that the Choose with me selector can consume.

Run validation and report changed files.
```

## Codex prompt: Choose with me selector

```text
Work the Choose with me Ritual selector issue in coloradotim/moon-and-table.

Before implementation, read and follow:

- docs/research/runtime-ritual-authoring-policy.md
- src/data/rituals/types.ts
- docs/product/ritual-work-order-and-codex-prompts.md

Input:

Use Ritual Intent Check-In answers and the runtime Ritual collection.

Goal:

Implement the first functional Choose with me path: the user answers the Ritual Intent Check-In, Moon & Table selects one fitting Ritual, and the app renders that Ritual with a short explanation of why it fits.

Use deterministic scoring. Do not wait for AI. Do not wait for final lunar/astrological timing-card architecture.

Initial eligibility gate:

Prefer recommendationEligible records. If there are none yet, allow a temporary explicit fallback to directUseEligible records only if the code makes that fallback obvious and removable.

Do not select raw draft-only records for Choose with me.

Scoring should consider:

- purpose match;
- carrier match;
- audience match;
- capacity match;
- timing relationship/context match;
- materials/tags/keywords/free-text hint match;
- source/product-boundary eligibility.

Return:

- selected Ritual;
- score/rationale details for debugging;
- user-facing why-this-fits explanation.

The user-facing copy should be warm, private, magical, and specific. It should not expose database scoring internals.

Reuse the Ritual preview/presentation shape from Search rituals if appropriate.

Run validation and include a closeout report with example check-in answers and selected Ritual results.
```
