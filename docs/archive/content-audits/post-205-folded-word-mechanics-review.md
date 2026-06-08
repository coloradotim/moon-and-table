> Status: Archived / historical.
> This document is preserved for source trail, failure analysis, or migration context.
> It is not current implementation guidance.
> For current direction, see `docs/product/moon-and-table-current-direction.md`.

# Post-205 Folded / Carried / Placed Word Mechanics Review

## PR Summary

- Issue: #205, "Strengthen folded, carried, and placed word mechanics under restricted source guardrails"
- Branch: `codex/issue-205-folded-carried-word-mechanics`
- Base branch: `main`
- Implementation summary: strengthened existing written/folded/carried/placed word forms so one phrase has a material body, a defined resting span or crossing, and a clear return/put-away close.

## Scope Confirmation

- New visible categories: no.
- New sources: no.
- New active SourceNotes: no.
- New RitualPatterns: no.
- Broad scoring/reachability changes: no.
- Runtime UI changes: no.
- Copied source wording: no.
- Private data: no.

## Source Support

Active support remains grounded in existing approved Batch 1 notes and reviewed #191 mechanics boundaries:

- `note.flower_language_private_message`: supports private phrase/message mechanics without fixed meanings.
- `note.domestic_action_as_boundary_marker`: supports placing, removing, crossing, and returning as ordinary domestic action.
- `note.talisman_as_household_marker`: supports key/small-object marker mechanics without luck or protection claims.
- `note.hearth_first_and_last`: supports first/last attention as household form.
- `note.calendar_customs_as_household_thresholds`: supports private calendar threshold markers.
- #191 Hohman material remains restricted mechanics-only and does not appear as active SourceNote support or normal user-facing lineage.

Avoided:

- Hohman/charm/prayer/formula wording.
- Long-form journaling.
- Protection, luck, prosperity, medical, legal, love, coercive, or outcome claims.
- Spell-database structure.

## Files Changed

- Presentation / generated ritual copy: `src/data/batch-1-ritual-library.ts`, `src/lib/generate-weekly-brief.ts`
- Ritual form diagnostics: `src/lib/ritual-form-families.ts`
- Quality scenarios / tests: `tests/fixtures/recommendation-quality-scenarios.ts`, `tests/unit/recommendation-quality-report.test.ts`
- Docs: this review packet

## Pattern And Card Changes

- `folded_word`: now explicitly names writing, folding, placing, carrying, returning, and putting away; guardrails now block charms, formulas, and prayers.
- `folded_phrase_vessel`: clearer one-phrase material action, resting span, and later return; added contextual variants for clear speech, beginning, threshold reflection, and waning timing.
- `waning_phrase_release`: keeps one selected close instead of listing removal as an unshaped menu.
- `carried_key_word`: clearer one crossing and return; added threshold-reflection presentation variant.
- `plant_phrase_under_the_pot`: clearer plant-side placement, no plant disturbance, resting span, and later paper return.
- `first_day_last_day` and `last_word_first_word`: marked as first/last folded-word mechanics for diagnostics without adding a new pattern.

## Before / After Examples

### Reflection folded phrase

Before: "Give the words a fold. Write one sentence only. Let the fold contain the words. Write one clear phrase... When the phrase has done its holding, return it or put it away."

After: "Give the clear phrase a fold. Write one sentence only. Let the fold give the words a body. Write the clear phrase in one short line. Fold it once toward itself. Place it in a bowl, book, pocket, or plant-side spot. Let the place hold it until tomorrow or until you return. Close when the phrase is placed and no second line is added."

### Waning phrase release

Before: "Tear it, dissolve it in plain water, throw it away, or place it in a closed book."

After: "Choose one close: tear it, dissolve it in plain water, throw it away, or place it in a closed book."

### Home carried threshold word

Before: "Hold a key with one word and let it carry the threshold forward."

After: "Hold a key with one word, carry it through one crossing, and return it to ordinary use."

### Plant placed phrase

Before: "Place one folded phrase near a plant as a private message."

After: "Write one folded phrase and place it near a plant without disturbing soil, roots, or leaves."

### Seasonal first/last words

Before: first/last word diagnostics did not recognize the seasonal first/last scenario strongly enough and could drift to vessel/welcome forms.

After: `issue205.seasonal.first_last_words` selects `first_day_last_day` from first/last, crossing, folded-word, naming, and seasonal styles while avoiding bowl/vessel/emptying.

### Kitchen warmth loss case

Before: no dedicated #205 loss scenario checked that folded words stayed out of ordinary Kitchen warmth.

After: `issue205.kitchen.warmth.not_phrase` selects `quiet_welcome`, not folded phrase, carried key, waning release, first/last word, or plant phrase.

## Recommendation-Quality Changes

Added scenarios:

- `issue205.reflection.folded_word_body` -> `folded_phrase_vessel`
- `issue205.reflection.waning_phrase_return` -> `waning_phrase_release`
- `issue205.home.carried_word_return` -> `carried_key_word`
- `issue205.plant.placed_phrase` -> `plant_phrase_under_the_pot`
- `issue205.seasonal.first_last_words` -> `first_day_last_day`
- `issue205.kitchen.warmth.not_phrase` -> `quiet_welcome`

Added blocked normal-copy phrases:

- `hohman`
- `pow-wows`
- `long lost friend`
- `charm wording`
- `copied charm`
- `prayer formula`
- `spell database`
- `petition`
- `affirmation`

## Warning Counts And Concentration

Latest `npm run recommendation:quality` during development:

- Scenario count: 64
- Warning counts: all zero
- Distinct selected patterns: 25
- Broad pattern concentration: none
- Pattern concentration review: `quiet_welcome` 6, `first_light_at_the_threshold` 5, `bread_at_the_center` 4, `folded_phrase_vessel` 4, `salt_clear_water_release` 4

## Awkward Outputs / Remaining Risks

- `quiet_welcome` is selected in 6 scenarios after adding the Kitchen warmth loss case; this is acceptable but worth watching because it is a flexible warm/welcome form.
- `folded_phrase_vessel` now appears in 4 scenarios; the new count is intentional for #205 and remains below broad overuse flags.
- Hohman remains a source-packet mechanics boundary only. No active SourceNote was added, so future exact-source activation would still need separate review.

## Validation

- `npm run lint:content` - passed; content lint found no findings.
- `npm run typecheck` - passed.
- `npm run test` - passed; 26 test files, 298 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts` - passed; 1 test file, 9 tests.
- `npm run recommendation:quality` - passed; 64 scenarios, all warning counts zero.
- `npm run diagnose:content` - passed; diagnostics retained debug/report detail.
- `npm run check` - passed; includes content lint, typecheck, build, unit tests, and 2 Playwright tests.

## Merge Recommendation

Merge if full validation and PR checks pass.
