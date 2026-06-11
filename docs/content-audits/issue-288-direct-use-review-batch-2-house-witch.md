# Issue 288 Direct-Use Review: Batch 2 House Witch

Issue: #288

Source family: The House Witch

## Review posture

This batch follows the active runtime authoring, operative-words, and house-voice policies.

Moon & Table is private household software. This review treats ordinary hearth, kitchen flame, cauldron, threshold washing, room blessing, grimoire, and cooking-awareness practices as usable adult household ritual material. Safety-manual language belongs outside user-facing Ritual copy unless a concern is unusual and structurally necessary.

## Batch result

- Imported Rituals reviewed: 15
- Promoted to reviewed/direct-use: 15
- Kept draft: 0
- Held for source verification: 0
- Held for private excerpt support: 0
- Held for material/product-boundary review: 0
- Rejected/removed from runtime import: 0
- Records with ritualWords preserved: 3 records / 7 short exact source lines
- Records with private excerpt keys: 0
- Recommendation review candidates: all 15 promoted records remain recommendation-review candidates

## Promoted records

- `ritual-house-witch-spiritual-hearth-recognition`
- `ritual-house-witch-bank-the-inner-flame`
- `ritual-house-witch-kitchen-sacred-flame`
- `ritual-house-witch-consecrate-candle-fuel`
- `ritual-house-witch-cauldron-harmony`
- `ritual-house-witch-cauldron-blessing`
- `ritual-house-witch-doorstep-cleansing`
- `ritual-house-witch-house-blessing-circuit`
- `ritual-house-witch-bless-one-room`
- `ritual-house-witch-purify-person-at-home`
- `ritual-house-witch-purify-one-room`
- `ritual-house-witch-create-small-sacred-space`
- `ritual-house-witch-bless-kitchen-tool`
- `ritual-house-witch-household-grimoire-entry`
- `ritual-house-witch-food-with-awareness`

## Operative words preserved

The following records retain short exact source wording inline in `presentation.practice` and through `ritualWords` metadata:

- `ritual-house-witch-consecrate-candle-fuel`
- `ritual-house-witch-doorstep-cleansing`
- `ritual-house-witch-create-small-sacred-space`

No source-provided operative words were flattened into generic intention language.

## Editorial and house-voice repairs

- Renamed `Recognize the Hearth` to `Recognize the Heart of the Home` because the shorter headline was too abstract without context.
- Removed ordinary household warning language from flame, oil-lamp, cauldron, room, tool, and food records.
- Removed `if approved`, `safely`, and public-app caution phrasing where it made the Ritual read like a safety manual.
- Removed recipe/copyright process language from `Enter It in the Household Grimoire`.
- Replaced a real-name reference in `Prepare Food With Awareness` with repository-safe household wording.
- Preserved hearth, threshold, element, candle, cauldron, salt, water, smoke, grimoire, and food-as-hearthcraft language.

## Direct-use status applied

Each promoted record now has:

```ts
status: "reviewed"
availability: {
  findable: true,
  directUseEligible: true,
  recommendationEligible: false,
}
recommendationMetadata.eligibility: {
  recommendable: false,
  missing: ["recommendation_review"],
}
```

## Smells noted

No House Witch record required holding. The smells were wording-level:

- public safety boilerplate in private hearth rituals;
- review/process language leaking into user-facing practice;
- one privacy-boundary violation through a real name in app-visible copy;
- a too-abstract headline on the hearth-recognition record.

Those were repaired in the direct-use review overlay rather than by hand-editing the generated mechanical import.

## Headline/body fit back-pass

Reviewed after the Buckland `Open the Dream Door` catch.

- `Cauldron Harmony Candle` became `Hold Harmony in the Cauldron`; the body asks the hearth vessel to hold harmony, so the headline now names that action.
- `Purify the Person at Home` became `Release Through Salt and Flame`; the original sounded clinical and generic, while the body is salt-and-flame release.
- No other House Witch headline needed changing in this back-pass.

## Validation status

Focused validation will be rerun after this batch:

- `npm run rituals:readiness`
- focused unit tests for rituals, search, manage rituals, and readiness reporting
