# Issue 288 Direct-Use Review: Batch 1 Woodward

Issue: #288

Source family: Woodward, The Magical Household Cookbook

## Review posture

This batch follows the active runtime authoring, operative-words, and house-voice policies.

Working reminders:

- Do not over-warn.
- Do not flatten magic.
- Do not replace operative ritual words by default.
- Do not narrow accepted packets editorially.
- Use the current operative-words contract instead of obsolete private-source-text policy.

Moon & Table is private household software. This review treats ordinary adult kitchen, table, bowl, bread, cup, candle, and grimoire practices as usable household ritual material.

## Batch result

- Imported Rituals reviewed: 14
- Promoted to reviewed/direct-use: 14
- Kept draft: 0
- Held for source verification: 0
- Held for private excerpt support: 0
- Held for material/product-boundary review: 0
- Rejected/removed from runtime import: 0
- Records with ritualWords preserved: 0
- Records with private excerpt keys: 0
- Recommendation review candidates: all 14 promoted records remain recommendation-review candidates

## Promoted records

- `ritual-woodward-center-at-counter`
- `ritual-woodward-kitchen-table-intention`
- `ritual-woodward-bowl-focus-stirring`
- `ritual-woodward-bread-table-offering`
- `ritual-woodward-window-water-bowl`
- `ritual-woodward-shared-cup-pause`
- `ritual-woodward-enoughness-bowl`
- `ritual-woodward-seasonal-food-marker`
- `ritual-woodward-clear-table-closing`
- `ritual-woodward-kept-kitchen-object`
- `ritual-woodward-pot-of-tending`
- `ritual-woodward-welcome-served-simply`
- `ritual-woodward-repeated-recipe-memory`
- `ritual-woodward-candle-beside-bowl`

## Editorial and house-voice repairs

The batch was broadly direct-use ready. Repairs focused on removing public-app warning language, import/process language, and product-meta phrasing from user-facing fields.

- Removed ordinary safety framing such as `safe`, `safely`, `known to be safe`, and consent-style phrasing where the practice is ordinary household table use.
- Removed public/product boundary phrases such as `Do not add baking instructions to this ritual`, `without turning Moon & Table into a recipe source`, and `spell database` from presentation copy.
- Kept the source-supported kitchen, table, vessel, bread, drink, seasonal-food, memory, and candle-beside-bowl mechanics intact.
- Preserved all recommendation boundaries: no record became recommendation eligible or recommendable.

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

No Woodward record required holding. The only smells were wording-level:

- too much safety/manual language for a private two-adult household app;
- product-meta explanation leaking into ritual intention/body copy;
- recipe-protection language that belongs in review metadata rather than the ritual itself.

Those were repaired in the direct-use review overlay rather than by hand-editing the generated mechanical import.

## Headline/body fit back-pass

Reviewed after the Buckland `Open the Dream Door` catch.

- No Woodward headlines were changed in the back-pass. The headlines are mostly plain action labels and match the ritual body closely.
- Watch item: `Enoughness Bowl` is a little coined, but it matches the vessel action and this batch's kitchen-bowl language, so it stays.

## Validation status

Focused validation will be run after this batch:

- `npm run rituals:readiness`
- focused unit tests for rituals, search, manage rituals, and readiness reporting
