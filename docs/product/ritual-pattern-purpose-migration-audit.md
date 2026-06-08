# Ritual Pattern Purpose Migration Audit

## 1. Executive summary

This audit covers 57 currently approved recommendation-relevant `RitualPattern` records returned by `getApprovedRitualPatterns()` in `src/data/ritual-patterns.ts`. It includes all 32 Batch 1 rebuilt patterns listed in `batchOneRebuiltPatternKeys` in `src/data/batch-1-ritual-library.ts` and the older approved starter patterns that remain eligible after the demotion filter.

Main finding: most rebuilt Batch 1 patterns now contain enough authored presentation to become future library candidates, but not all are ready to migrate directly. Several still work as broad engine forms that can answer multiple check-in focuses only because `src/lib/generate-weekly-brief.ts` supplies focus bridges such as `getFocusMeaningPhrase()`, `getAudienceMeaningPhrase()`, `getCapacityMeaningPhrase()`, and `getWhyThisFits()`. That is the mechanic-first pressure this issue names.

Recommended migration shape:

- Strong single `LibraryRitual` candidates: `banked_light_evening`, `bank_the_house_light`, `first_light_beginning`, `renewed_light_return`, `last_household_light`, `salt_clear_water_release`, `seed_waiting`, `dead_leaf_release`, `dormant_green_rest`, `grain_bowl_beginning`, `waning_phrase_release`, `waning_light_release`, `carried_key_word`, `seasonal_entry_bowl`, `clear_the_threshold_bowl`, `last_word_first_word`, plus several bounded starter patterns after metadata hardening.
- Likely split candidates: `first_light_at_the_threshold`, `full_light_on_the_table`, `full_light_holding_bowl`, `plant_witness_to_growth`, `warm_cup_between_us`, `quiet_welcome`, `bread_at_the_center`, `folded_phrase_vessel`, `seasonal_marker_bowl`, `threshold_bowl`, `two_words_at_the_table`, `window_light_threshold`.
- Engine-only adapters or legacy mechanics: approved cue patterns without authored presentation such as `bread_enoughness_cue`, `oats_steady_care_cue`, `apple_fresh_choice_cue`, `lemon_freshness_cue`, `rosemary_kitchen_memory`, `basil_kitchen_warmth_cue`, `mint_freshness_cue`, `thyme_steady_care_cue`, `lavender_soft_rest_cue`.
- Needs research/source-purpose hardening before library migration: plant witness/companion work, moon/light vessel placement, home/table/vessel rites, kitchen/welcome/bread, remembering/rosemary, blessing/protecting, and future body/connecting lanes.

The doctrine should shift from "source first, pattern second" to: source and household context first; intrinsic purpose and ritual form second; library entry third; recommendation adapter last.

## 2. Current problem: mechanic-first patterns vs intrinsic-purpose rituals

`RitualPattern` currently mixes several responsibilities in `src/data/ritual-patterns.ts`:

- reusable action sequence;
- recommendation candidate;
- source lineage carrier;
- safety and capacity gate;
- final presentation source;
- scoring/style metadata bundle.

The composer in `src/lib/generate-weekly-brief.ts` then uses the selected check-in and timing context to make the selected pattern read as the answer. The relevant functions include:

- `getEligiblePatternCandidates()` and `selectPattern()` for eligibility/scoring;
- `getRecommendationContractRejectionReasons()` and `getRitualFormScoreReasons()` for category/focus preservation;
- `getEffectivePresentation()` and `getPresentationVariantKeys()` for variant selection;
- `getFocusMeaningPhrase()`, `getAudienceMeaningPhrase()`, and `getCapacityMeaningPhrase()` for purpose bridges;
- `getWhyThisFits()`, `getHowThisWasChosen()`, and `getDiagnosticHowThisWasChosen()` for explanatory assembly.

That can work for a generator. It is weaker for a library. A future `LibraryRitual` should not be "a bowl action" that can later be explained as opening, release, marking, or connection. It should carry an intrinsic ritual purpose before the engine touches it.

## 3. Audit method

Files inspected:

- `src/data/ritual-patterns.ts`
- `src/data/batch-1-ritual-library.ts`
- `src/lib/generate-weekly-brief.ts`
- `src/lib/ritual-form-families.ts`
- `src/data/ritual-focus-options.ts`
- `tests/fixtures/recommendation-quality-scenarios.ts`
- `docs/product/ritual-content-architecture-audit.md`
- `docs/recommendation-quality-model.md`
- `docs/curation-pipeline.md`
- recent content-audit packets where they clarified repeated quality failures

Inventory method:

- Used `getApprovedRitualPatterns()` to identify 57 current approved patterns.
- Used `batchOneRebuiltPatternKeys` and `batchOneDemotedRitualPatternKeys` to separate rebuilt patterns from demoted older mechanics.
- Used `getRitualFormFamiliesForPattern()` in `src/lib/ritual-form-families.ts` to identify current form-family mappings.
- Ran existing quality scenarios through `generateWeeklyBrief()` to see current selected pattern/focus/practice uses.
- Classified intrinsic purpose from the pattern's title, materials, `ritualStyles`, `presentation`, `sourceLineageLabel`, `sourceNoteKeys`, and source references. Where purpose only appears after selection through composer bridge functions, it is marked composer-inferred.

This is an architecture/design audit only. No runtime data, scoring, copy, migrations, cards, notes, or patterns were changed.

## 4. Purpose/carrier taxonomy used

Purpose families from #255, used here as audit categories:

- `steadying`
- `opening`
- `releasing`
- `tending`
- `connecting`
- `voicing`
- `marking`
- `blessing`
- `protecting`
- `remembering`

Carrier families from #255, used here as audit categories:

- `candlelight`
- `table`
- `doorway`
- `plant`
- `words`
- `vessel`
- `body`

Current support is indirect. The closest current structures are:

- `RitualPattern.ritualStyles`, `materials`, `steps`, `presentation`, and `sourceLineageLabel`;
- `RITUAL_FORM_FAMILIES` and `FORM_FAMILIES_BY_PATTERN_KEY` in `src/lib/ritual-form-families.ts`;
- `RitualFocusOption.themeKeys` and `ritualStyleHints` in `src/data/ritual-focus-options.ts`.

## 5. Pattern migration table

| Pattern key | Current title | Current carrier(s) | Current engine uses | Intrinsic purpose family/families | Purpose basis | Recommended migration shape | Recommendation-ready for library-first engine | Missing work | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `clear_one_surface` | Clear One Surface | table/body | Home tending, clearing, low/steady reset | steadying, tending, releasing | presentation, household context | single LibraryRitual | restricted | Add explicit carrier/purpose metadata and source lineage label. | Strong practical household rite, but more home-care than grimoire-specific. |
| `tend_one_plant` | Tend One Plant | plant/body | Plant/home tending | tending, steadying | presentation, household context | single LibraryRitual | restricted | Add intrinsic purpose and plant-safety readiness fields. | Directly purposeful as plant care; less source-ritualized than Batch 1 plant patterns. |
| `candle_light_focus` | Candle Light Focus | candlelight | Candle/light focus, pause, reflection | steadying, voicing | presentation, composer-inferred | keep as engine-only adapter | restricted | Clarify whether it is witness, focus, or pause. | Useful fallback; too generic for canonical library without purpose hardening. |
| `table_reset` | Table Reset | table/body | Home/kitchen/table reset, shared surface | tending, steadying, connecting | presentation, household context | single LibraryRitual | restricted | Add source-context purpose and table-specific boundaries. | Good direct ritual if framed as table tending, not generic tidying. |
| `threshold_reset` | Threshold Reset | doorway/body | Home threshold reset, marking | marking, steadying, tending | presentation, household context | single LibraryRitual | restricted | Add source lineage/purpose beyond practical entry reset. | Works as entry care; weaker as source-backed threshold ritual. |
| `tea_ritual` | Tea Pause | table/vessel/body | Kitchen warmth/rest/shared pause | steadying, connecting, tending | presentation, household context | single LibraryRitual | restricted | Separate tea-as-rest from tea-as-connection if expanded. | Purpose is fairly clear; source basis is normal-use kitchen safety more than ritual lineage. |
| `bread_enoughness_cue` | Bread Enoughness Cue | table/body | Kitchen/grounding cue | steadying, blessing | source, composer-inferred | keep as engine-only adapter | no | Authored presentation and stronger purpose extraction. | Approved but no presentation; better as material cue, not a library ritual. |
| `oats_steady_care_cue` | Oats Steady Care Cue | table/body | Kitchen steady care cue | steadying, tending | source, composer-inferred | keep as engine-only adapter | no | Authored presentation and purpose hardening. | Ingredient cue, not a complete ritual. |
| `apple_fresh_choice_cue` | Apple Fresh Choice Cue | table/body | Kitchen freshness/choice cue | opening, steadying | source, composer-inferred | keep as engine-only adapter | no | Authored presentation and source-purpose confidence. | Material correspondence cue only. |
| `kitchen_reset` | Kitchen Reset | table/body | Kitchen/home clearing | tending, releasing, steadying | presentation, household context | single LibraryRitual | restricted | Keep bounded; clarify ritual purpose beyond cleaning. | Practice-ready but risks task-manager feel. |
| `bed_blanket_rest_cue` | Bed or Blanket Rest Cue | body | Rest/pause/home tending | steadying | presentation, household context | single LibraryRitual | restricted | Source-purpose hardening for body/rest carrier. | Candidate for future body lane if made more ritual than rest cue. |
| `seasonal_table_home_reset` | Seasonal Table or Home Reset | table/doorway/body | Seasonal home/table reset | marking, tending, steadying | presentation, source, household context | split into multiple LibraryRituals | unclear | Split table seasonal reset from threshold/home reset. | Current title signals a menu of carriers. |
| `morning_light_pause` | Morning Light Pause | candlelight/body | Light pause/reflection | steadying, opening | presentation, composer-inferred | single LibraryRitual | restricted | Source context for morning/first-light purpose. | Usable but may overlap with stronger first-light patterns. |
| `lemon_freshness_cue` | Lemon Freshness Cue | table/body | Kitchen freshness cue | opening, releasing | source, composer-inferred | keep as engine-only adapter | no | Presentation and source-purpose hardening. | Material cue only. |
| `rosemary_kitchen_memory` | Rosemary Kitchen Memory Cue | table/plant/words | Kitchen memory cue | remembering, voicing | source, composer-inferred | needs research | unclear | Remembering lane, safety, and authored presentation. | Important future lane but not library-ready. |
| `basil_kitchen_warmth_cue` | Basil Kitchen Warmth Cue | table/plant/body | Kitchen warmth cue | connecting, blessing | source, composer-inferred | needs research | no | Purpose confidence and presentation. | Do not migrate as-is. |
| `mint_freshness_cue` | Mint Freshness Cue | table/plant/body | Kitchen freshness cue | opening, steadying | source, composer-inferred | keep as engine-only adapter | no | Presentation and adaptation boundaries. | Material cue only. |
| `thyme_steady_care_cue` | Thyme Steady Care Cue | table/plant/body | Kitchen steady-care cue | steadying, tending | source, composer-inferred | keep as engine-only adapter | no | Presentation and source-purpose confidence. | Material cue only. |
| `lavender_soft_rest_cue` | Lavender Soft Rest Cue | plant/body | Rest cue | steadying | source, composer-inferred | needs research | no | Safety and body/rest ritual doctrine. | Better as ingredient/herb support until hardened. |
| `hearth_object_return` | Hearth Object Return | table/vessel/body | Home tending, grounding, return, high capacity home | tending, steadying, marking | source, presentation, household context | single LibraryRitual | yes | Add explicit carrier/purpose fields. | Strong canonical home-hearth return ritual. |
| `last_household_light` | Last Household Light | candlelight/table/body | Home rest/dark close | steadying, tending, marking | source, presentation | single LibraryRitual | yes | Add purpose boundaries for rest vs protection. | Strong closing/rest ritual; avoid using for general release. |
| `banked_light_evening` | Banked Light Evening | candlelight/table/body | Candle rest/closing | steadying, tending, marking | source, presentation | single LibraryRitual | yes | Add readiness fields. | Strong banked-light rest ritual. |
| `first_light_beginning` | First Light Beginning | candlelight/table/words | High-capacity candle beginning | opening, marking | source, presentation | single LibraryRitual | yes | Clarify relation to threshold variants. | Strong first-light beginning ritual. |
| `unlit_or_electric_witness` | Unlit or Electric Witness | candlelight/words | Candle witness without flame, saying/rest | voicing, steadying | source, presentation | single LibraryRitual | restricted | Split witness from rest if both remain first-class. | Strong safe-light adapter; canonical only if witness purpose leads. |
| `renewed_light_return` | Renewed Light Return | candlelight/table/body | High-capacity renewed light, beginning/return | opening, marking, tending | source, presentation | single LibraryRitual | yes | Keep boundaries against purification/protection claims. | Strong transition ritual. |
| `bank_the_house_light` | Bank the House Light | candlelight/table/body | Rest, pause, grounding, try-again fallback | steadying, tending, marking | source, presentation | single LibraryRitual | restricted | Preserve as fallback adapter separate from canonical rite if needed. | Intrinsic close/rest is clear; broad fallback use is engine-specific. |
| `first_light_at_the_threshold` | First Light at the Threshold | candlelight/doorway | Home/candle beginning, threshold, grounding | opening, marking, steadying | source, presentation, composer-inferred | split into multiple LibraryRituals | restricted | Split first-light beginning from threshold crossing/grounding. | High risk for purpose broadening. |
| `first_light_for_the_beginning` | First Light for the Beginning | candlelight/doorway | Candle beginning | opening | source, presentation | single LibraryRitual | yes | De-duplicate with `first_light_beginning`. | Clearer intrinsic purpose than threshold variant. |
| `candle_witness_one_phrase` | Candle Witness One Phrase | candlelight/words/table | Candle saying clearly, shared witness | voicing, connecting, marking | source, presentation | single LibraryRitual | yes | Add precise witness-purpose boundaries. | Good library candidate. |
| `unlit_candle_witness` | Unlit Candle Witness | candlelight/words | No-flame witness/rest | voicing, steadying | source, presentation | single LibraryRitual | restricted | Distinguish from electric witness adapter. | Good variant if no-flame witness is its own ritual. |
| `window_light_threshold` | Window Light Threshold | candlelight/doorway/words | Reflection saying clearly, threshold, high home | voicing, marking, opening | source, presentation, composer-inferred | split into multiple LibraryRituals | restricted | Split window-threshold from saying-clearly witness. | Current quality scenarios show wide use across purposes. |
| `house_from_root_to_roof` | House from Root to Roof | doorway/table/body | Home tending, house map | tending, steadying, blessing | source, presentation | single LibraryRitual | restricted | Clarify blessing boundary and source confidence. | Strong house-map rite but blessing/protection must be bounded. |
| `threshold_bowl` | Threshold Bowl | doorway/vessel | Home threshold, grounding, pause | marking, steadying, tending | source, presentation, composer-inferred | split into multiple LibraryRituals | restricted | Split arrival bowl, grounding bowl, and threshold crossing if all remain. | Good mechanics but purpose can be too broad. |
| `salt_clear_water_release` | Salt and Clear Water Release | vessel/table/body | Home/kitchen clearing | releasing, marking | source, presentation | single LibraryRitual | yes | Keep safety and no-purification boundaries explicit. | Strong release ritual. |
| `seed_waiting` | Seed Waiting | plant/vessel/table | Plant beginning | opening, steadying | source, presentation | single LibraryRitual | yes | Add purpose metadata. | Strong beginning ritual. |
| `plant_witness_to_growth` | Plant Witness to Growth | plant/words/body | Plant tending, high capacity, witness | tending, steadying, connecting, remembering | source, presentation, composer-inferred | split into multiple LibraryRituals | restricted | Split witness, growth attention, shared plant, and remembering if needed. | High priority source-purpose hardening lane. |
| `dead_leaf_release` | Dead Leaf Release | plant/body | Plant clearing/release | releasing, tending | source, presentation | single LibraryRitual | yes | Add safety/readiness metadata. | Strong intrinsic plant release ritual. |
| `dormant_green_rest` | Dormant Green Rest | plant/body | Plant rest/dormancy | steadying, tending | source, presentation | single LibraryRitual | yes | Add seasonal/dormancy boundaries. | Strong rest/tending ritual. |
| `grain_bowl_beginning` | Grain Bowl Beginning | table/vessel | Kitchen beginning | opening, steadying, blessing | source, presentation | single LibraryRitual | yes | Clarify blessing/enoughness boundary. | Strong grain/seed beginning ritual. |
| `warm_cup_between_us` | Warm Cup Between Us | table/vessel/body | Pause, grounding, Kitchen tending us, rest | connecting, steadying, tending | source, presentation, composer-inferred | split into multiple LibraryRituals | restricted | Split shared connection from rest/grounding cup. | Strong but overused across purposes. |
| `full_light_on_the_table` | Full Light on the Table | candlelight/table/words | Candle rest, tending us, saying clearly | voicing, connecting, marking, steadying | source, presentation, composer-inferred | split into multiple LibraryRituals | restricted | Split table witness, shared tending light, and clarity phrase. | Broad utility causes bridge pressure. |
| `full_light_holding_bowl` | Full Light Holding Bowl | candlelight/vessel/table | Candle rest, high-capacity holding | steadying, voicing, marking | source, presentation, composer-inferred | split into multiple LibraryRituals | restricted | Split rest-holding bowl from full-light naming bowl if both needed. | Strong image, purpose still too broad. |
| `folded_phrase_vessel` | Folded Phrase Vessel | words/vessel | Saying clearly, threshold, beginning, clearing | voicing, releasing, opening, marking | source, presentation, composer-inferred | split into multiple LibraryRituals | restricted | Split clear-phrase vessel, release vessel, threshold/beginning fold. | Current styles encode too many purposes. |
| `waning_phrase_release` | Waning Phrase Release | words/vessel | Reflection clearing | releasing, voicing | source, presentation | single LibraryRitual | yes | Add carrier/purpose fields. | Strong specialized release phrase ritual. |
| `waning_light_release` | Waning Light Release | candlelight/table | Candle/home clearing | releasing, marking, steadying | source, presentation | single LibraryRitual | yes | Clarify not for generic rest/grounding. | Strong light-lowering release ritual. |
| `two_words_at_the_table` | Two Words at the Table | words/table | Reflection threshold, table phrase, pause | voicing, connecting, marking | source, presentation, composer-inferred | split into multiple LibraryRituals | restricted | Split shared table words from threshold words. | Compact but too broad. |
| `seasonal_marker_bowl` | Seasonal Marker Bowl | vessel/table/doorway | Seasonal threshold, grounding, table marker | marking, tending, remembering, blessing | source, presentation, composer-inferred | split into multiple LibraryRituals | restricted | Split seasonal marker, welcome bowl, remembrance bowl if kept. | Strong form but purpose lanes need hardening. |
| `quiet_welcome` | Quiet Welcome | table/vessel/body | Kitchen rest, tending us, welcome | connecting, tending, blessing, steadying | source, presentation, composer-inferred | split into multiple LibraryRituals | restricted | Split welcome offering from warm rest/tending-us cup. | Strong source lane but currently does too much. |
| `honeyed_word` | Honeyed Word | table/vessel/words | Kitchen tending us, bounded sweetness | connecting, voicing, blessing | source, presentation | single LibraryRitual | restricted | Clarify sweetness boundaries and avoid attraction/control claims. | Strong if kept as bounded speech ritual. |
| `carried_key_word` | Carried Key Word | doorway/words/body | Reflection/Home threshold carrying | marking, voicing | source, presentation | single LibraryRitual | yes | Add readiness fields. | Strong threshold word-carry ritual. |
| `seasonal_entry_bowl` | Seasonal Entry Bowl | doorway/vessel | Seasonal entry/threshold | marking, tending | source, presentation | single LibraryRitual | yes | Add purpose metadata and seasonal boundaries. | Strong entry ritual. |
| `bread_at_the_center` | Bread at the Center | table/body | Grounding, kitchen/home tending, welcome | steadying, tending, blessing, connecting | source, presentation, composer-inferred | split into multiple LibraryRituals | restricted | Split bread-enoughness, table-center welcome, and shared grounding. | Strong material, overloaded purpose. |
| `first_day_last_day` | First Day / Last Day | doorway/words | Seasonal/calendar threshold | marking, opening, releasing | source, presentation | single LibraryRitual | yes | Clarify first vs last variants as presentation variants or split. | Good threshold ritual if month-turn context remains intrinsic. |
| `darkening_light` | Darkening Light | candlelight/body | Seasonal/rest/dark close | steadying, marking | source, presentation | single LibraryRitual | yes | Add source lineage label and boundaries. | Strong dark/rest seasonal close. |
| `plant_phrase_under_the_pot` | Plant Phrase Under the Pot | plant/words/body | Plant saying clearly, placed phrase | voicing, opening, tending | source, presentation | single LibraryRitual | restricted | Harden plant-message purpose and plant safety. | Good candidate after source-purpose hardening. |
| `clear_the_threshold_bowl` | Clear the Threshold Bowl | doorway/vessel | Seasonal/Home clearing threshold | releasing, marking, tending | source, presentation | single LibraryRitual | yes | Add carrier/purpose metadata. | Strong empty/return threshold ritual. |
| `last_word_first_word` | Last Word / First Word | words/doorway/table | Reflection threshold | marking, voicing, opening, releasing | source, presentation | single LibraryRitual | yes | Decide if first/last variants split later. | Clear purpose if first-last threshold remains central. |

## 6. Pattern-by-pattern notes

### Starter practical/home patterns

- `clear_one_surface`: Current key/title: `clear_one_surface` / Clear One Surface. Carrier is a small surface and body action. Engine uses it for bounded home clearing/tending. Intrinsic purpose is practical steadying and light release. Purpose is explicit in presentation and household context, but not strongly source-ritualized. It should not be used for deep threshold, blessing, protection, remembering, or relational connection. Migration gap: add explicit purpose/carrier/source-context fields.
- `tend_one_plant`: Carrier is plant care. Engine uses it for Plant/Home tending. Intrinsic purpose is tending and steadying. It should not carry release, remembering, or voicing unless a more specific plant ritual is selected. Library-ready only as a practical care rite with safety fields.
- `candle_light_focus`: Carrier is live flame/light. Engine uses it as a generic focus/pause. Intrinsic purpose is unclear between witness, focus, and pause. It should not become the default explanation for voicing, opening, or release. Keep as adapter unless source/purpose hardened.
- `table_reset`, `kitchen_reset`, `threshold_reset`, `seasonal_table_home_reset`: These are useful bounded household actions, but their current purpose depends heavily on household context. `seasonal_table_home_reset` combines table, home, and threshold and should split before library migration.
- `tea_ritual`, `bed_blanket_rest_cue`, `morning_light_pause`: These have clearer embodied/rest purposes. They need explicit purpose and source-context capture before becoming canonical library rituals.

### No-presentation material cue patterns

The following approved patterns lack authored `RitualPresentation` and should not migrate directly:

- `bread_enoughness_cue`
- `oats_steady_care_cue`
- `apple_fresh_choice_cue`
- `lemon_freshness_cue`
- `rosemary_kitchen_memory`
- `basil_kitchen_warmth_cue`
- `mint_freshness_cue`
- `thyme_steady_care_cue`
- `lavender_soft_rest_cue`

They currently behave like ingredient/material adapters. Their intrinsic purposes are either thin or source-correspondence-based, and the ritual body would have to be authored later. `rosemary_kitchen_memory` is the strongest future lane because it maps to `remembering`, but it needs a source-purpose pass and a complete ritual form.

### Home/hearth and light patterns

- `hearth_object_return`: Canonical candidate. Intrinsic purpose is home tending through return/settling. Source basis is `note.smooring_fire_as_evening_closure` and `note.hearth_first_and_last`. Avoid using it for generic release or voicing.
- `last_household_light`, `banked_light_evening`, `bank_the_house_light`, `darkening_light`: Strong close/rest/tending family. `bank_the_house_light` also functions as fallback in `selectPattern()`, so future architecture may need both a canonical library ritual and a separate fallback adapter.
- `first_light_beginning`, `first_light_for_the_beginning`, `renewed_light_return`: Strong opening/transition candidates. They should not be used for release, protection, or generic grounding unless a source-backed variant says so.
- `first_light_at_the_threshold` and `window_light_threshold`: These combine first-light, threshold, and phrase/crossing work. They are useful now, but likely need library splitting so beginning, threshold marking, and voicing are not attached afterward by `getFocusMeaningPhrase()`.
- `full_light_on_the_table`, `full_light_holding_bowl`, `candle_witness_one_phrase`, `unlit_or_electric_witness`, `unlit_candle_witness`: The witness/holding/full-light lane is strong, but `full_light_on_the_table` and `full_light_holding_bowl` are currently broad. They answer rest, tending-us, and saying-clearly scenarios in `tests/fixtures/recommendation-quality-scenarios.ts`, which is exactly where bridge language can start doing purpose work.

### Plant patterns

- `seed_waiting`, `dead_leaf_release`, and `dormant_green_rest` are strong single-purpose candidates: opening, release, and rest/tending.
- `plant_phrase_under_the_pot` is promising for voicing carried by a plant, but needs plant-message hardening.
- `plant_witness_to_growth` is the risky broad plant pattern. It can support tending, witness, shared attention, growth, and possibly remembering. It should split or receive a major purpose hardening pass before library migration.

### Kitchen/table/vessel patterns

- `grain_bowl_beginning`, `salt_clear_water_release`, `honeyed_word`, `carried_key_word`, `seasonal_entry_bowl`, `clear_the_threshold_bowl`, and `last_word_first_word` have enough intrinsic purpose to migrate with metadata work.
- `warm_cup_between_us`, `quiet_welcome`, `bread_at_the_center`, `seasonal_marker_bowl`, `threshold_bowl`, `folded_phrase_vessel`, and `two_words_at_the_table` are the main split candidates. Each has a strong ritual image, but each currently carries multiple purposes through tags and composer bridges.
- `first_day_last_day` is a strong threshold marking ritual, but first-day opening and last-day release may later need separate variants or entries.

## 7. Patterns recommended as single LibraryRituals

Recommended direct or near-direct migration, with explicit carrier/purpose fields added:

- `clear_one_surface` as bounded surface steadying/release, restricted to practical home care.
- `tend_one_plant` as plant tending, restricted by safety.
- `table_reset` as table tending/steadying.
- `threshold_reset` as doorway steadying/marking after source hardening.
- `tea_ritual` as warm drink steadying/connection.
- `kitchen_reset` as kitchen tending/release, if kept ritualized.
- `bed_blanket_rest_cue` as body/rest steadying after body-lane hardening.
- `morning_light_pause` as light steadying/opening after first-light hardening.
- `hearth_object_return`
- `last_household_light`
- `banked_light_evening`
- `first_light_beginning`
- `renewed_light_return`
- `bank_the_house_light`, with fallback adapter separated if needed.
- `first_light_for_the_beginning`
- `candle_witness_one_phrase`
- `unlit_candle_witness`, if no-flame witness remains distinct.
- `house_from_root_to_roof`, after blessing/protection boundaries are explicit.
- `salt_clear_water_release`
- `seed_waiting`
- `dead_leaf_release`
- `dormant_green_rest`
- `grain_bowl_beginning`
- `waning_phrase_release`
- `waning_light_release`
- `honeyed_word`, with sweetness boundaries.
- `carried_key_word`
- `seasonal_entry_bowl`
- `first_day_last_day`
- `darkening_light`
- `plant_phrase_under_the_pot`, after plant-message hardening.
- `clear_the_threshold_bowl`
- `last_word_first_word`

## 8. Patterns recommended for splitting

High-priority split candidates:

- `warm_cup_between_us`: split shared connection/tending-us from rest/grounding cup.
- `quiet_welcome`: split welcome/offering vessel from warm shared tending/rest.
- `bread_at_the_center`: split bread enoughness/grounding, table-center welcome, and possible blessing/household continuity.
- `first_light_at_the_threshold`: split first-light beginning from threshold crossing and grounding-at-threshold.
- `folded_phrase_vessel`: split voicing, release, beginning, and threshold container forms.
- `seasonal_marker_bowl`: split seasonal marking, welcome bowl, and remembrance/marker bowl if those remain desired.
- `full_light_holding_bowl`: split full-light naming/holding from rest-holding bowl.
- `plant_witness_to_growth`: split plant witness/tending from shared growth attention and remembering.
- `full_light_on_the_table`: split table-light witness/voicing from shared tending-us light and rest.
- `threshold_bowl`: split arrival/threshold bowl from grounding/boundary bowl.
- `two_words_at_the_table`: split spoken table phrase from threshold words.
- `window_light_threshold`: split window-light threshold from saying-clearly phrase work.
- `seasonal_table_home_reset`: split table seasonal reset from home/threshold reset.

## 9. Patterns recommended as engine-only adapters or legacy mechanics

Keep as adapters until rewritten as complete rituals:

- `candle_light_focus`
- `bread_enoughness_cue`
- `oats_steady_care_cue`
- `apple_fresh_choice_cue`
- `lemon_freshness_cue`
- `basil_kitchen_warmth_cue`
- `mint_freshness_cue`
- `thyme_steady_care_cue`
- `lavender_soft_rest_cue`

Likely adapter/canonical split:

- `bank_the_house_light`: canonical rest/closing ritual plus engine fallback adapter.
- `unlit_or_electric_witness`: no-flame witness ritual plus safety adapter for live-flame avoidance.

Already demoted legacy mechanics in `batchOneDemotedRitualPatternKeys` should remain out of migration unless a future issue explicitly rebuilds them.

## 10. Patterns needing source/purpose hardening

Source-purpose hardening lanes:

- Plant witness / plant companion: `plant_witness_to_growth`, `plant_phrase_under_the_pot`, and older plant care patterns need a clearer distinction between tending, witnessing, growth, remembering, and placed message.
- Moon-specific / moon-window / vessel placement: `full_light_holding_bowl`, `window_light_threshold`, `full_light_on_the_table`, and `candle_witness_one_phrase` need clear purpose boundaries for witness, holding, clarity, and rest.
- Home/table/vessel rites: `threshold_bowl`, `seasonal_marker_bowl`, `clear_the_threshold_bowl`, `table_reset`, and `house_from_root_to_roof` need explicit purpose language so vessel/threshold mechanics do not absorb every home/seasonal need.
- Kitchen/welcome/table/bread: `quiet_welcome`, `warm_cup_between_us`, `bread_at_the_center`, `honeyed_word`, and material cue patterns need source extraction that names intrinsic purpose, not just material/action lineage.
- Protection/blessing: Current code has internal focus labels and source guardrails, but no first-class safe blessing/protecting library lane. `house_from_root_to_roof`, `bread_at_the_center`, `grain_bowl_beginning`, and `honeyed_word` should not be allowed to drift into protection/blessing without new boundaries.
- Remembering/rosemary/evergreen: `rosemary_kitchen_memory` is only a cue. A remembering library ritual needs authored purpose, safety, and source confidence.
- Body/connecting future lane: `bed_blanket_rest_cue`, `warm_cup_between_us`, and shared stillness patterns need body/carrier doctrine before `body` becomes first-class.

## 11. Generated-language failure analysis

Repeated copy problems map to four architecture causes:

- Lack of intrinsic purpose in pattern: No-presentation cue patterns and broad mechanics require the composer to state why the material matters.
- Too-generic pattern used for too many purposes: `full_light_on_the_table`, `warm_cup_between_us`, `quiet_welcome`, `folded_phrase_vessel`, `seasonal_marker_bowl`, and `plant_witness_to_growth` can serve many scenarios. That raises the chance that `Why this fits` has to make the selected focus feel true after the fact.
- Composer bridge phrases doing purpose work: `getFocusMeaningPhrase()`, `getAudienceMeaningPhrase()`, and `getCapacityMeaningPhrase()` often carry the selected focus or audience meaning outside the ritual body. When the body already has purpose, these functions clarify. When it does not, they become the purpose.
- Missing authored variants: Broad patterns need variants for high capacity, both-of-us, specific focus, and timing. Without variants, the same body can be asked to mean rest, voicing, connection, or threshold.
- Weak source/purpose basis: Some source packets captured mechanics such as bowl, light, threshold, cup, grain, plant, and folded word, but the future library needs the purpose captured at extraction time.
- Category/focus mismatch: `src/lib/ritual-form-families.ts` has grown stricter because broad tags were not enough to preserve category/focus. That is a useful engine patch, but library migration should reduce the need for after-the-fact policing.

The fix is not more elaborate bridge language. The fix is library rituals whose purpose is part of the ritual form.

## 12. Updated source/intake doctrine

Previous doctrine: source first, pattern second.

Updated doctrine:

> Source and household context first. Intrinsic purpose and ritual form second. Library entry third. Recommendation adapter last.

A future source-backed ritual extraction should capture:

- documented/source action;
- material;
- place/carrier;
- action family;
- timing/context;
- intrinsic purpose;
- purpose refinement;
- source confidence;
- adaptation boundaries;
- what Moon & Table may use;
- what Moon & Table must not use.

For example, a source packet should not stop at "bowl at threshold" or "banked light." It should say what the bowl or light is for inside Moon & Table's adaptation: marking a threshold, holding rest, closing the household day, welcoming return, naming one sentence, or releasing one finished thing. If the source only supports mechanics and not purpose, the packet should mark that gap.

## 13. Implications for future LibraryRitual model

Current `RitualPattern`s should not all migrate directly into `LibraryRitual`s.

A future `LibraryRitual` needs fields that make purpose intrinsic:

- stable `libraryRitualId`;
- optional `ritualPatternKey` or engine adapter key;
- title;
- canonical body/steps;
- carrier family and specific carrier;
- intrinsic purpose families;
- purpose refinement;
- action family;
- materials;
- place/context;
- timing/context fit;
- capacity fit and duration;
- audience fit;
- source/origin status;
- source refs/source-note refs;
- adaptation boundaries;
- "must not use for" boundaries;
- safety flags;
- authored variants;
- readiness audit result;
- migration/source status.

`RitualPattern` can remain the engine adapter for now. The library-first engine should eventually select `LibraryRitual`s or library-derived adapters whose purpose matches the check-in before scoring timing and profile fit.

## 14. Relationship to WeeklyBrief / future ritual instances

`WeeklyBrief` in `src/lib/generate-weekly-brief.ts` is a generated recommendation instance. It should not become the canonical ritual.

Future relationship:

- `LibraryRitual`: reusable ritual with intrinsic purpose.
- `RitualPattern` or adapter: engine-readable recommendation candidate.
- `WeeklyBrief` or future recommendation instance: snapshot of one selected ritual under specific date, timing, check-in, capacity, audience, profile, explanation, and copy.
- History/practice record: whether a generated or directly selected ritual was done, skipped, repeated, edited, or reflected on.

Generated instances should reference both the library ritual id and the adapter/pattern key used at generation time.

## 15. Relationship to favorites and feedback

Favorites should target reusable rituals first, not only generated instances. A favorite says "this ritual belongs in the household library."

Feedback should support two layers:

- Instance feedback: this recommendation, in this timing/check-in/capacity context, worked or did not.
- Library ritual feedback: this reusable ritual is liked, avoided, too much, too generic, more like this, not for this person, good together, etc.

The existing `BriefFeedbackDocument` in `src/lib/brief-feedback.ts` already stores `briefId`, `ritualPatternKeys`, `symbolicCardKeys`, `timingFactKeys`, capacity, audience, and source ids. Future feedback should add a library ritual target when available, while preserving instance context so one bad fit does not incorrectly demote a ritual globally.

## 16. Recommended next product/design steps

1. Decide whether `LibraryRitual` wraps `RitualPattern` first or becomes a separate canonical model immediately.
2. Add a draft field spec for `LibraryRitual` with intrinsic purpose and carrier required for recommendation readiness.
3. Create a no-runtime-change inventory report that maps current patterns to proposed carrier/purpose/readiness.
4. Choose 5-8 clean single-purpose rebuilt patterns for first migration examples.
5. Choose 3 split candidates and write product notes for the split before code changes.
6. Define a readiness audit with separate results for findable, practice-ready, and recommendable.
7. Update source packet templates so future extraction captures purpose before pattern shape.
8. Decide how direct selection, favorites, and feedback target reusable rituals versus generated instances.

## 17. Risks and unknowns

- The 57-pattern count comes from current code at audit time; it can change as demoted/approved status changes.
- Some current source notes support mechanics better than purpose. This audit does not judge the sources themselves, only the current extraction as represented in code.
- Quality scenarios sample many important paths, but not every possible check-in/timing/profile combination.
- The proposed purpose/carrier families are #255 audit categories, not final UI labels.
- Several patterns are good current engine candidates but poor direct library entries until split or hardened.
- Some no-presentation cue patterns are still approved and can be evaluated by the engine; that does not mean they are library-ready.
- No runtime behavior changed in this audit.
