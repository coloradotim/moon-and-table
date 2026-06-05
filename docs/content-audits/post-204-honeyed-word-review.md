# Post-204 Honeyed Word Review

Status: ready to merge if checks pass

## PR / Branch Summary

- PR number and title: #218 - Constrain Honeyed Word bounded sweetness
- Branch: `codex/issue-204-honeyed-word-bounds`
- Base branch: `main`
- Implementation commit: `9b1e345`
- Issue addressed: #204
- Implementation summary: narrowed `honeyed_word` so it reads and selects as a bounded sweetness-word rite, not a generic warm fallback. `quiet_welcome` now carries ordinary welcome without requiring honey.

Scope confirmations:

- New sources added: no.
- Active SourceNotes added: no.
- New RitualPatterns added: no.
- New visible categories added: no.
- Broad recommendation scoring changed: no.
- Debug/report output hidden: no.
- Copied source wording added: no.
- Private data added: no.

## Content Changes

`honeyed_word`:

- Removed broad `home_tending` and generic `warm` style hooks.
- Added explicit `sweetness`, `honey`, and `bounded_speech` style hooks.
- Tightened materials to one ordinary sweetness cue and a spoon or cup.
- Changed normal copy toward one bounded word, one material cue, and closure through return or washing.
- Kept hard guardrails in metadata: no love/control/health claims, no apology or repair script.

`quiet_welcome`:

- Removed honey from the normal welcome-material list.
- Kept welcome grounded in cup, bowl, bread, grain, water, or warm drink.
- This lets welcome win when welcome is the form, while honey wins only when sweetness is explicit.

Composer / diagnostics:

- Updated material and boundary phrasing for `honeyed_word`.
- Added `sweetness` and `bounded_speech` to internal ritual-form diagnostics.
- Narrowed `honey_sweetening` expected-family diagnostics so Kitchen tending-us expects honey only when honey/sweetness/bounded-speech hints are present.

## Before / After Examples

Before:

- `batch1.quiet_welcome` selected `honeyed_word`.
- Normal copy: "Sweetness and welcome can soften speech when the phrase stays bounded and ordinary."
- `honeyed_word` appeared in 4 quality scenarios and was a concentrated pattern.

After:

- `batch1.quiet_welcome` selects `quiet_welcome`.
- `issue204.kitchen.bounded_sweetness` selects `honeyed_word`.
- Normal copy: "Sweetness belongs here as a material cue for one bounded word that can be set down and ended."
- `honeyed_word` appears in 1 quality scenario and is no longer concentrated.

## Recommendation-Quality Results

After the patch:

- Scenarios sampled: 58.
- Warning counts: all zero.
- Distinct selected patterns: 25.
- `honeyed_word`: 1 selection.
- `quiet_welcome`: 5 selections.
- `salt_clear_water_release`: 4 selections.
- Broad pattern concentration: none.

Required #204 outcomes:

| Scenario | Selected pattern | Result |
|---|---|---|
| `issue204.kitchen.bounded_sweetness` | `honeyed_word` | Pass: explicit sweetness reaches bounded material word. |
| `batch1.quiet_welcome` | `quiet_welcome` | Pass: welcome no longer defaults to honey. |
| `candle.live_flame_avoided` | `first_light_at_the_threshold` | Pass: Candle/light does not use honey. |
| `issue204.home.beginning.not_honey` | `first_light_at_the_threshold` | Pass: beginning does not use honey. |
| `issue204.plant.not_honey` | `plant_witness_to_growth` | Pass: Plant remains plant-based. |
| `issue204.clearing.not_honey` | `waning_phrase_release` | Pass: clearing does not use honey. |
| `issue204.threshold.not_honey` | `threshold_bowl` | Pass: threshold remains crossing/return. |

## Awkward Outputs / Remaining Risks

- `quiet_welcome` is now selected 5 times. It is not a broad-pattern concentration warning, but should be watched in later welcome/warmth work.
- `first_light_at_the_threshold` is also selected 5 times after adding the Home-beginning honey-loss case. Broad pattern concentration remains none.
- `honeyed_word` relies on existing approved Batch 1 welcome/grain support. No new #191 SourceNotes were activated.

## Validation Results

Current completed validation:

- `npm run lint:content`: passed with no findings.
- `npm run typecheck`: passed.
- `npm run test`: passed, 26 files, 298 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: passed, 1 file, 9 tests.
- `npm run recommendation:quality`: passed, 58 scenarios, zero warning counts.
- `npm run test -- tests/unit/generate-weekly-brief.test.ts`: passed, 1 file, 61 tests.
- `npm run diagnose:content`: passed, 91 sampled scenarios.
- `npm run check`: passed. Build completed with the existing Vite chunk-size notice; Playwright e2e passed 2 tests with the existing `NO_COLOR` / `FORCE_COLOR` warning.

## PR Notes Draft

What changed:

- Constrained `honeyed_word` to explicit sweetness / bounded speech.
- Separated `quiet_welcome` from honey so welcome can be a vessel/cup/bread/grain form without sweetening.
- Added #204 win/loss scenarios for honey selection and non-selection.
- Updated diagnostics so honey is not expected for every Kitchen tending-us case.

Validation:

- `npm run lint:content`: passed with no findings.
- `npm run typecheck`: passed.
- `npm run test`: passed, 26 files, 298 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: passed, 1 file, 9 tests.
- `npm run recommendation:quality`: passed, 58 scenarios, zero warning counts.
- `npm run diagnose:content`: passed, 91 sampled scenarios.
- `npm run check`: passed, including build, unit tests, and 2 Playwright e2e tests.

Merge recommendation:

merge if checks pass
