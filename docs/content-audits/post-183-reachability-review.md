# Post-183 Reachability Review

This packet is for human review before merging issue #183. It asks whether specific #180 ritual-form families now win the combinations they were built for, or whether broad patterns like `two_words_at_the_table` and `full_light_on_the_table` still act as catch-all fallbacks.

## 1. PR / Branch Summary

- PR number and title: pending PR creation
- Branch name: `codex/issue-183-ritual-form-reachability`
- Base branch: `main`
- Commit SHA: `152ad938b8e9f6ae7b8f533017257ba4b7572847` before the review-packet commit; final PR head may advance after this packet is committed
- Issue addressed: #183

Short implementation summary:

- Added a typed ritual-form-family layer that maps approved ritual patterns to material/action families such as plant release/removal, grain/seed/bowl, written/folded/container, welcome/offering/vessel, threshold/crossing/bowl/key, full-light clarity, and banked/darkening light.
- Added scoring reasons for ritual-form matches, explicit category mismatch, ritual-form mismatch, and broad-pattern damping.
- Updated recommendation-quality diagnostics to show selected form family, expected form family, match status, broad-pattern concentration, and strong unselected patterns.
- Added recommendation-quality scenarios for missing #183 combinations.
- Narrowed the `long_journaling` avoid heuristic so a one-phrase written ritual is not blocked only because a step says `write`.

Files changed by purpose:

Scoring / selection:

- `src/lib/ritual-form-families.ts`
- `src/lib/generate-weekly-brief.ts`

Diagnostics / report:

- `scripts/recommendation-quality-report.ts`

Scenarios / fixtures:

- `tests/fixtures/recommendation-quality-scenarios.ts`

Tests:

- `tests/unit/recommendation-quality-report.test.ts`
- `tests/unit/generate-weekly-brief.test.ts`

Docs:

- `docs/recommendation-tuning-notes.md`
- `docs/ritual-selection-model.md`
- `docs/content-audits/post-183-reachability-review.md`

Content changes:

- New sources added: no.
- New visible categories added: no.
- RitualPatterns added/revised/demoted: no.
- SymbolicCards or SourceNotes added: no.
- Scoring changed: yes.
- Diagnostics changed: yes.
- Warnings weakened or removed: no. The report gained visibility; warning counts remain separate from product judgment.

Changed files observed before final commit:

- docs/content-audits/post-183-reachability-review.md
- docs/recommendation-tuning-notes.md
- docs/ritual-selection-model.md
- scripts/recommendation-quality-report.ts
- src/lib/generate-weekly-brief.ts
- src/lib/ritual-form-families.ts
- tests/fixtures/recommendation-quality-scenarios.ts
- tests/unit/generate-weekly-brief.test.ts
- tests/unit/recommendation-quality-report.test.ts

## 2. Validation Commands

These commands were run after the review packet was generated.

| Command | Result |
|---|---|
| `npm run lint:content` | Passed: content lint had no findings. |
| `npm run typecheck` | Passed: `tsc --noEmit`. |
| `npm run test` | Passed: 26 files, 280 tests. |
| `npm run test -- tests/unit/recommendation-quality-report.test.ts` | Passed: 1 file, 7 tests. |
| `npm run recommendation:quality` | Passed; latest report written to `/tmp/issue-183-final-report.md` with 39 scenarios. |
| `npm run diagnose:content` | Passed; still reports separate sampler gaps and 3 visible practice choices set aside. See remaining issues. |
| `npm run check` | Passed: lint, typecheck, build, unit tests, and 2 Playwright tests. |
| `git diff --check` | Passed. |

Build note: `npm run check` emitted the existing Vite large-chunk warning but did not fail. Playwright emitted the existing `NO_COLOR` / `FORCE_COLOR` warning but passed.

## 3. Before / After Recommendation-Quality Comparison

Before data comes from `/tmp/issue-183-before-report.md`, generated from main after #182 / #180 was merged and before #183 changes. After data comes from the current #183 branch.

- Before scenario count: 30
- After scenario count: 39
- Before distinct selected patterns: 9
- After distinct selected patterns: 18

A higher distinct-pattern count is not automatically better. In this case, the increased diversity is meaningful only where it corresponds to better ritual-form fit. It also creates a new review question: `honeyed_word` and `salt_clear_water_release` are now frequent.

### Warning Counts

| Warning | Before | After | Notes |
|---|---:|---:|---|
| best_window_reason_too_thin | 0 | 0 | No count change. |
| candle_ritual_with_candle_addon | 0 | 0 | No count change. |
| carry_prompt_contradicts_focus | 0 | 0 | No count change. |
| debug_key_in_user_copy | 0 | 0 | No count change. |
| focus_timing_unbridged | 0 | 0 | No count change. |
| generic_closing_repeated | 0 | 0 | No count change. |
| generic_optional_candle | 0 | 0 | No count change. |
| missing_presentation_selected | 0 | 0 | No count change. |
| pause_with_imperative_steps | 0 | 0 | No count change. |
| raw_score_language_in_user_copy | 0 | 0 | No count change. |
| source_id_visible_in_normal_copy | 0 | 0 | No count change. |
| surprise_me_unresolved | 0 | 0 | No count change. |
| task_dressed_pattern_selected | 0 | 0 | No count change. |

### Top Selected Patterns

| Pattern | Before | After | Notes |
|---|---:|---:|---|
| two_words_at_the_table | 12 | 2 | Watch broad fallback behavior. |
| full_light_on_the_table | 8 | 3 | Watch broad fallback behavior. |
| dead_leaf_release | 0 | 1 |  |
| grain_bowl_beginning | 0 | 1 |  |
| folded_phrase_vessel | 0 | 0 |  |
| quiet_welcome | 1 | 1 |  |
| threshold_bowl | 0 | 0 |  |
| first_light_at_the_threshold | 2 | 3 |  |
| bank_the_house_light | 0 | 2 |  |
| darkening_light | 0 | 0 |  |
| warm_cup_between_us | 2 | 2 |  |
| seed_waiting | 0 | 2 |  |
| dormant_green_rest | 0 | 1 |  |
| plant_phrase_under_the_pot | 0 | 1 |  |
| bread_at_the_center | 0 | 0 |  |
| honeyed_word | 0 | 5 | Now frequent; review for new default behavior. |
| carried_key_word | 0 | 2 |  |
| last_word_first_word | 0 | 0 |  |

### Scenarios Where Selection Changed

| Scenario | Before | After | After family |
|---|---|---|---|
| waning.beginning.preparation_bridge | two_words_at_the_table / Two Words at the Table | honeyed_word / Honeyed Word | honey/sweetening, welcome/offering/vessel, warm cup/bowl |
| waning.beginning.plant_bridge | two_words_at_the_table / Two Words at the Table | seed_waiting / Seed Waiting | plant seed/beginning, seasonal marker, grain/seed/bowl |
| candle.no_generic_addon | full_light_on_the_table / Full Light on the Table | bank_the_house_light / Bank the House Light | banked/darkening light |
| candle.live_flame_avoided | first_light_at_the_threshold / First Light at the Threshold | honeyed_word / Honeyed Word | honey/sweetening, welcome/offering/vessel, warm cup/bowl |
| plant.set_aside.tradeoff_visible | full_light_on_the_table / Full Light on the Table | plant_phrase_under_the_pot / Plant Phrase Under the Pot | plant phrase, written/folded/container, carried phrase |
| kitchen.tea.ordinary_care | full_light_on_the_table / Full Light on the Table | honeyed_word / Honeyed Word | honey/sweetening, welcome/offering/vessel, warm cup/bowl |
| kitchen.warmth.together | full_light_on_the_table / Full Light on the Table | quiet_welcome / Quiet Welcome | welcome/offering/vessel, warm cup/bowl, seasonal marker |
| tending_us.low.bounded | two_words_at_the_table / Two Words at the Table | honeyed_word / Honeyed Word | honey/sweetening, welcome/offering/vessel, warm cup/bowl |
| best_week.no_strong_signal_honesty | two_words_at_the_table / Two Words at the Table | seasonal_marker_bowl / Seasonal Marker Bowl | seasonal marker, welcome/offering/vessel, threshold/crossing/bowl/key |
| numerology.accent.secondary | two_words_at_the_table / Two Words at the Table | first_light_at_the_threshold / First Light at the Threshold | first light / threshold, threshold/crossing/bowl/key |
| source_debug.no_raw_keys | two_words_at_the_table / Two Words at the Table | first_light_at_the_threshold / First Light at the Threshold | first light / threshold, threshold/crossing/bowl/key |
| repetition.no_generic_closing | two_words_at_the_table / Two Words at the Table | salt_clear_water_release / Salt and Clear Water Release | salt/water release, threshold/crossing/bowl/key |
| home.threshold.arrival | two_words_at_the_table / Two Words at the Table | salt_clear_water_release / Salt and Clear Water Release | salt/water release, threshold/crossing/bowl/key |
| plant.seasonal.companionship | quiet_welcome / Quiet Welcome | plant_witness_to_growth / Plant Witness to Growth | plant witness/growth |
| batch1.plant.dead_leaf_release | two_words_at_the_table / Two Words at the Table | dead_leaf_release / Dead Leaf Release | plant release/removal |
| batch1.kitchen.grain_beginning | full_light_on_the_table / Full Light on the Table | grain_bowl_beginning / Grain Bowl Beginning | grain/seed/bowl, seasonal marker, bread/grain center |
| batch1.reflection.folded_phrase | full_light_on_the_table / Full Light on the Table | carried_key_word / Carried Key Word | carried phrase, threshold/crossing/bowl/key, written/folded/container |
| batch1.quiet_welcome | two_words_at_the_table / Two Words at the Table | honeyed_word / Honeyed Word | honey/sweetening, welcome/offering/vessel, warm cup/bowl |
| batch1.surprise_me.resolves_visible_category | two_words_at_the_table / Two Words at the Table | carried_key_word / Carried Key Word | carried phrase, threshold/crossing/bowl/key, written/folded/container |

## 4. Critical Scenario Before / After Table

| Scenario id | Input summary | Before selected | After selected | Expected ritual-form family | After selected ritual-form family | Status | Notes |
|---|---|---|---|---|---|---|---|
| batch1.plant.dead_leaf_release | Plant + low + clearing + waning; category=Plant; capacity=a_little / low; focus=Clearing something out; audience=me; scope=today; timing=Waning moon, Mercury in Cancer — careful words for home, Numerology 7 | two_words_at_the_table / Two Words at the Table | dead_leaf_release / Dead Leaf Release | plant release/removal; dead_leaf_release or equivalent | plant release/removal | pass | No obvious awkward part from diagnostics; still needs human voice/meaning review. |
| issue183.plant.beginning.seed | Plant + low + beginning + new/waxing; category=Plant; capacity=a_little / low; focus=Making a beginning; audience=me; scope=today; timing=Waxing moon, Summer solstice — light and tending, Numerology 7 | new scenario | seed_waiting / Seed Waiting | seed/plant beginning; seed_waiting or equivalent | plant seed/beginning, seasonal marker, grain/seed/bowl | pass | No obvious awkward part from diagnostics; still needs human voice/meaning review. |
| issue183.plant.rest.dormancy | Plant + low + rest + dark/seasonal; category=Plant; capacity=a_little / low; focus=Resting; audience=me; scope=today; timing=Waning moon, Moon in Cancer — home rhythm, Numerology 6 | new scenario | dormant_green_rest / Dormant Green Rest | dormancy/rest; dormant_green_rest or equivalent | plant rest/dormancy, seasonal marker | pass | No obvious awkward part from diagnostics; still needs human voice/meaning review. |
| plant.set_aside.tradeoff_visible | Plant + saying clearly; category=Plant; capacity=a_little / low; focus=Saying something clearly; audience=me; scope=best_moment_this_week; timing=Full moon, Moon in Cancer — home rhythm, Numerology 4 | full_light_on_the_table / Full Light on the Table | plant_phrase_under_the_pot / Plant Phrase Under the Pot | plant phrase/witness; plant_phrase_under_the_pot or equivalent | plant phrase, written/folded/container, carried phrase | pass | No obvious awkward part from diagnostics; still needs human voice/meaning review. |
| kitchen.tea.ordinary_care | Kitchen + low + rest; category=Kitchen; capacity=a_little / low; focus=Resting; audience=me; scope=today; timing=Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth | full_light_on_the_table / Full Light on the Table | honeyed_word / Honeyed Word | warm cup/bowl/kitchen material; warm_cup_between_us or equivalent | honey/sweetening, welcome/offering/vessel, warm cup/bowl | pass | Honeyed Word is becoming a frequent soft default and should be reviewed for overuse. |
| batch1.kitchen.grain_beginning | Kitchen + steady + beginning; category=Kitchen; capacity=enough_to_engage / steady; focus=Making a beginning; audience=both_of_us; scope=today; timing=Waxing moon, Summer solstice — light and tending, Numerology 7 | full_light_on_the_table / Full Light on the Table | grain_bowl_beginning / Grain Bowl Beginning | grain/seed/bowl; grain_bowl_beginning or equivalent | grain/seed/bowl, seasonal marker, bread/grain center | pass | No obvious awkward part from diagnostics; still needs human voice/meaning review. |
| kitchen.warmth.together | Kitchen + both + tending us; category=Kitchen; capacity=enough_to_engage / steady; focus=Tending us; audience=both_of_us; scope=today; timing=Full moon, Winter solstice — quiet and returning light, Numerology 4 | full_light_on_the_table / Full Light on the Table | quiet_welcome / Quiet Welcome | cup/bread/honey/welcome/table-material, not generic light | welcome/offering/vessel, warm cup/bowl, seasonal marker | pass | No obvious awkward part from diagnostics; still needs human voice/meaning review. |
| issue183.kitchen.clearing_salt | Kitchen + clearing + waning; category=Kitchen; capacity=a_little / low; focus=Clearing something out; audience=me; scope=today; timing=Waning moon, Mercury in Cancer — careful words for home, Numerology 7 | new scenario | salt_clear_water_release / Salt and Clear Water Release | salt/water/clearing; salt_clear_water_release or equivalent | salt/water release, threshold/crossing/bowl/key | pass | Salt/Clear Water is now frequent and may be pulling threshold/home clearing broadly. |
| home.threshold.arrival | Home + threshold + arrival; category=Home; capacity=enough_to_engage / steady; focus=Marking a threshold; audience=me; scope=today; timing=Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth | two_words_at_the_table / Two Words at the Table | salt_clear_water_release / Salt and Clear Water Release | threshold/crossing/key/bowl/first-light form | salt/water release, threshold/crossing/bowl/key | pass | Threshold family matches, but the selected salt/water clearing form may be too clearing-weighted for arrival. |
| batch1.home.salt_water_clearing | Home + clearing + waning; category=Home; capacity=a_little / low; focus=Clearing something out; audience=me; scope=today; timing=Waning moon, Mercury in Cancer — careful words for home, Numerology 7 | salt_clear_water_release / Salt and Clear Water Release | salt_clear_water_release / Salt and Clear Water Release | salt/water/removal/emptying form | salt/water release, threshold/crossing/bowl/key | pass | Salt/Clear Water is now frequent and may be pulling threshold/home clearing broadly. |
| issue183.home.tending_steady | Home + tending home + steady; category=Home; capacity=enough_to_engage / steady; focus=Tending the home; audience=me; scope=today; timing=Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth | new scenario | salt_clear_water_release / Salt and Clear Water Release | house map, threshold bowl, key, or seasonal entry form | salt/water release, threshold/crossing/bowl/key | pass | Salt/Clear Water is now frequent and may be pulling threshold/home clearing broadly. |
| batch1.reflection.folded_phrase | Reflection + folded phrase; category=Reflection; capacity=a_little / low; focus=Saying something clearly; audience=me; scope=today; timing=Waxing moon, Summer solstice — light and tending, Numerology 7 | full_light_on_the_table / Full Light on the Table | carried_key_word / Carried Key Word | written/folded/container; folded_phrase_vessel or equivalent | carried phrase, threshold/crossing/bowl/key, written/folded/container | pass | Written/folded family matches, but exact Folded Phrase Vessel lost to Carried Key Word. |
| issue183.reflection.waning_release | Reflection + waning release; category=Reflection; capacity=a_little / low; focus=Clearing something out; audience=me; scope=today; timing=Waning moon, Mercury in Cancer — careful words for home, Numerology 7 | new scenario | waning_phrase_release / Waning Phrase Release | written/spoken release/removal; waning_phrase_release or equivalent | waning phrase/release, written/folded/container | pass | No obvious awkward part from diagnostics; still needs human voice/meaning review. |
| issue183.reflection.threshold | Reflection + threshold; category=Reflection; capacity=a_little / low; focus=Marking a threshold; audience=me; scope=today; timing=Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth | new scenario | two_words_at_the_table / Two Words at the Table | first/last, carried key, folded phrase, or crossing form | spoken/table phrase | pass | Two Words remains appropriate only if spoken table phrase is truly the form. |
| batch1.quiet_welcome | Quiet welcome; category=Kitchen; capacity=a_little / low; focus=Tending us; audience=both_of_us; scope=today; timing=Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth | two_words_at_the_table / Two Words at the Table | honeyed_word / Honeyed Word | offering/welcome/vessel; quiet_welcome or equivalent | honey/sweetening, welcome/offering/vessel, warm cup/bowl | pass | Welcome family matches, but exact Quiet Welcome lost to Honeyed Word. |
| issue183.candle.rest_dark | Candle/light + resting + dark/evening; category=Candle or light; capacity=a_little / low; focus=Resting; audience=me; scope=today; timing=Waning moon, Moon in Cancer — home rhythm, Numerology 6 | new scenario | bank_the_house_light / Bank the House Light | banked/darkening/closure light | banked/darkening light | pass | No obvious awkward part from diagnostics; still needs human voice/meaning review. |
| issue183.candle.full_saying_clearly | Candle/light + full + saying clearly; category=Candle or light; capacity=a_little / low; focus=Saying something clearly; audience=me; scope=today; timing=Full moon, Mercury in Cancer — careful words for home, Numerology 7 | new scenario | full_light_on_the_table / Full Light on the Table | full light/table is acceptable | full light / clarity | pass | Full Light remains appropriate only if light/clarity is central here. |
| batch1.surprise_me.resolves_visible_category | Surprise me; category=Surprise me; capacity=enough_to_engage / steady; focus=Saying something clearly; audience=me; scope=today; timing=Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth | two_words_at_the_table / Two Words at the Table | carried_key_word / Carried Key Word | resolves to real visible category and does not always pick broad fallback | carried phrase, threshold/crossing/bowl/key, written/folded/container | pass | No obvious awkward part from diagnostics; still needs human voice/meaning review. |

## 5. Ritual-Form Family Diagnostics

#183 added ritual-form family diagnostics to the recommendation-quality report. They are diagnostics, not fail/pass gates. Some requested summary buckets still do not exist as dedicated warning IDs; those are noted below.

| Diagnostic | Count |
|---|---:|
| ritual-form match | 39 |
| ritual-form partial match | not separately tracked; equivalents are counted as matches |
| ritual-form mismatch | 0 |
| explicit category honored | 34 |
| explicit category set aside with blocker | not separately tracked |
| explicit category set aside without clear blocker | 1 |
| open category resolved | 2 |
| broad pattern overselected | 0 |
| clearing without release/removal form | not separately tracked as a warning |
| kitchen material missing | not separately tracked as a warning |
| plant form missing | not separately tracked as a warning |
| threshold form missing | not separately tracked as a warning |
| welcome form missing | not separately tracked as a warning |

| Scenario | Selected pattern | Explicit category | Category status | Selected family | Expected family | Form status | Diagnostic note |
|---|---|---|---|---|---|---|---|
| pause.permission.enough | warm_cup_between_us | none | not explicit | warm cup/bowl | none | match | not_asked |
| pause.grounded.no_task_list | warm_cup_between_us | none | not explicit | warm cup/bowl | none | match | not_asked |
| waning.beginning.preparation_bridge | honeyed_word | Home | honored | honey/sweetening, welcome/offering/vessel, warm cup/bowl | none | match | matched_selected_pattern |
| waning.beginning.plant_bridge | seed_waiting | Plant | honored | plant seed/beginning, seasonal marker, grain/seed/bowl | plant seed/beginning | match | matched_selected_pattern |
| candle.no_generic_addon | bank_the_house_light | Candle or light | honored | banked/darkening light | banked/darkening light | match | matched_selected_pattern |
| candle.live_flame_avoided | honeyed_word | Candle or light | set aside | honey/sweetening, welcome/offering/vessel, warm cup/bowl | none | match | set_aside |
| plant.low.honor_choice | plant_witness_to_growth | Plant | honored | plant witness/growth | plant witness/growth, plant seed/beginning, plant rest/dormancy | match | matched_selected_pattern |
| plant.set_aside.tradeoff_visible | plant_phrase_under_the_pot | Plant | honored | plant phrase, written/folded/container, carried phrase | plant phrase | match | matched_selected_pattern |
| kitchen.tea.ordinary_care | honeyed_word | Kitchen | honored | honey/sweetening, welcome/offering/vessel, warm cup/bowl | warm cup/bowl | match | matched_selected_pattern |
| kitchen.warmth.together | quiet_welcome | Kitchen | honored | welcome/offering/vessel, warm cup/bowl, seasonal marker | warm cup/bowl, welcome/offering/vessel, bread/grain center, honey/sweetening | match | matched_selected_pattern |
| tending_us.low.bounded | honeyed_word | Home | honored | honey/sweetening, welcome/offering/vessel, warm cup/bowl | warm cup/bowl, welcome/offering/vessel, bread/grain center, honey/sweetening | match | matched_selected_pattern |
| tending_us.low.light | full_light_on_the_table | Candle or light | honored | full light / clarity | full light / clarity | match | matched_selected_pattern |
| best_week.clear_reason | full_light_on_the_table | Candle or light | honored | full light / clarity | full light / clarity | match | matched_selected_pattern |
| best_week.no_strong_signal_honesty | seasonal_marker_bowl | Surprise me | resolved open | seasonal marker, welcome/offering/vessel, threshold/crossing/bowl/key | none | match | resolved_open_preference |
| numerology.accent.secondary | first_light_at_the_threshold | Home | honored | first light / threshold, threshold/crossing/bowl/key | house map, threshold/crossing/bowl/key | match | matched_selected_pattern |
| numerology.not_carry_prompt | two_words_at_the_table | Reflection | honored | spoken/table phrase | written/folded/container, carried phrase, spoken/table phrase, threshold/crossing/bowl/key, first light / threshold, first/last threshold | match | matched_selected_pattern |
| source_debug.no_raw_keys | first_light_at_the_threshold | Home | honored | first light / threshold, threshold/crossing/bowl/key | salt/water release, threshold/crossing/bowl/key, plant release/removal, waning phrase/release | match | matched_selected_pattern |
| source_debug.how_chosen_human_labels | seasonal_marker_bowl | Seasonal | honored | seasonal marker, welcome/offering/vessel, threshold/crossing/bowl/key | seasonal marker, first/last threshold, threshold/crossing/bowl/key, first light / threshold | match | matched_selected_pattern |
| repetition.no_generic_closing | salt_clear_water_release | Home | honored | salt/water release, threshold/crossing/bowl/key | salt/water release, threshold/crossing/bowl/key, plant release/removal, waning phrase/release | match | matched_selected_pattern |
| repetition.cross_scenario_watch | house_from_root_to_roof | Seasonal | honored | house map, threshold/crossing/bowl/key, seasonal marker | seasonal marker, first/last threshold, threshold/crossing/bowl/key, first light / threshold | match | matched_selected_pattern |
| home.threshold.arrival | salt_clear_water_release | Home | honored | salt/water release, threshold/crossing/bowl/key | threshold/crossing/bowl/key, first light / threshold, first/last threshold | match | matched_selected_pattern |
| plant.seasonal.companionship | plant_witness_to_growth | Plant | honored | plant witness/growth | plant witness/growth, plant seed/beginning, plant rest/dormancy | match | matched_selected_pattern |
| batch1.home.salt_water_clearing | salt_clear_water_release | Home | honored | salt/water release, threshold/crossing/bowl/key | salt/water release, threshold/crossing/bowl/key, plant release/removal, waning phrase/release | match | matched_selected_pattern |
| issue183.kitchen.clearing_salt | salt_clear_water_release | Kitchen | honored | salt/water release, threshold/crossing/bowl/key | salt/water release, plant release/removal, waning phrase/release | match | matched_selected_pattern |
| issue183.home.tending_steady | salt_clear_water_release | Home | honored | salt/water release, threshold/crossing/bowl/key | house map, threshold/crossing/bowl/key | match | matched_selected_pattern |
| batch1.plant.dead_leaf_release | dead_leaf_release | Plant | honored | plant release/removal | plant release/removal, salt/water release, waning phrase/release | match | matched_selected_pattern |
| issue183.plant.beginning.seed | seed_waiting | Plant | honored | plant seed/beginning, seasonal marker, grain/seed/bowl | plant seed/beginning | match | matched_selected_pattern |
| issue183.plant.rest.dormancy | dormant_green_rest | Plant | honored | plant rest/dormancy, seasonal marker | plant rest/dormancy | match | matched_selected_pattern |
| batch1.kitchen.grain_beginning | grain_bowl_beginning | Kitchen | honored | grain/seed/bowl, seasonal marker, bread/grain center | grain/seed/bowl | match | matched_selected_pattern |
| batch1.light.first_threshold | first_light_at_the_threshold | Candle or light | honored | first light / threshold, threshold/crossing/bowl/key | first light / threshold | match | matched_selected_pattern |
| batch1.reflection.folded_phrase | carried_key_word | Reflection | honored | carried phrase, threshold/crossing/bowl/key, written/folded/container | written/folded/container | match | matched_selected_pattern |
| issue183.reflection.waning_release | waning_phrase_release | Reflection | honored | waning phrase/release, written/folded/container | waning phrase/release | match | matched_selected_pattern |
| issue183.reflection.threshold | two_words_at_the_table | Reflection | honored | spoken/table phrase | written/folded/container, carried phrase, spoken/table phrase, threshold/crossing/bowl/key, first light / threshold, first/last threshold | match | matched_selected_pattern |
| issue183.candle.rest_dark | bank_the_house_light | Candle or light | honored | banked/darkening light | banked/darkening light | match | matched_selected_pattern |
| issue183.candle.full_saying_clearly | full_light_on_the_table | Candle or light | honored | full light / clarity | full light / clarity | match | matched_selected_pattern |
| batch1.seasonal.marker_bowl | seasonal_marker_bowl | Seasonal | honored | seasonal marker, welcome/offering/vessel, threshold/crossing/bowl/key | seasonal marker, first/last threshold, threshold/crossing/bowl/key, first light / threshold | match | matched_selected_pattern |
| issue183.seasonal.entry_release | seasonal_marker_bowl | Seasonal | honored | seasonal marker, welcome/offering/vessel, threshold/crossing/bowl/key | seasonal marker, first/last threshold, threshold/crossing/bowl/key, first light / threshold | match | matched_selected_pattern |
| batch1.quiet_welcome | honeyed_word | Kitchen | honored | honey/sweetening, welcome/offering/vessel, warm cup/bowl | warm cup/bowl, welcome/offering/vessel, bread/grain center, honey/sweetening | match | matched_selected_pattern |
| batch1.surprise_me.resolves_visible_category | carried_key_word | Surprise me | resolved open | carried phrase, threshold/crossing/bowl/key, written/folded/container | none | match | resolved_open_preference |

## 6. Broad-Pattern Concentration Check

### two_words_at_the_table

- Before count: 12
- After count: 2
- Scenarios where it still wins:
- numerology.not_carry_prompt: category=Reflection; capacity=enough_to_engage / steady; focus=Marking a threshold; audience=me; scope=today; family=spoken/table phrase; review=Two Words remains appropriate only if spoken table phrase is truly the form.
- issue183.reflection.threshold: category=Reflection; capacity=a_little / low; focus=Marking a threshold; audience=me; scope=today; family=spoken/table phrase; review=Two Words remains appropriate only if spoken table phrase is truly the form.
- Scenarios where it no longer wins: waning.beginning.preparation_bridge, waning.beginning.plant_bridge, tending_us.low.bounded, best_week.no_strong_signal_honesty, numerology.accent.secondary, source_debug.no_raw_keys, repetition.no_generic_closing, home.threshold.arrival, batch1.plant.dead_leaf_release, batch1.quiet_welcome, batch1.surprise_me.resolves_visible_category
- Remaining questionable wins: Two Words remains appropriate only if spoken table phrase is truly the form.; Two Words remains appropriate only if spoken table phrase is truly the form.

### full_light_on_the_table

- Before count: 8
- After count: 3
- Scenarios where it still wins:
- tending_us.low.light: category=Candle or light; capacity=a_little / low; focus=Tending us; audience=both_of_us; scope=today; family=full light / clarity; review=Full Light remains appropriate only if light/clarity is central here.
- best_week.clear_reason: category=Candle or light; capacity=a_little / low; focus=Saying something clearly; audience=me; scope=best_moment_this_week; family=full light / clarity; review=Full Light remains appropriate only if light/clarity is central here.
- issue183.candle.full_saying_clearly: category=Candle or light; capacity=a_little / low; focus=Saying something clearly; audience=me; scope=today; family=full light / clarity; review=Full Light remains appropriate only if light/clarity is central here.
- Scenarios where it no longer wins: candle.no_generic_addon, plant.set_aside.tradeoff_visible, kitchen.tea.ordinary_care, kitchen.warmth.together, batch1.kitchen.grain_beginning, batch1.reflection.folded_phrase
- Remaining questionable wins: Full Light remains appropriate only if light/clarity is central here.; Full Light remains appropriate only if light/clarity is central here.; Full Light remains appropriate only if light/clarity is central here.

## 7. Reachability of Specific #180 Patterns

| Pattern | Selected after #183? | Scenario(s) | Appropriate? | Notes |
|---|---|---|---|---|
| dead_leaf_release | yes | batch1.plant.dead_leaf_release | yes | batch1.plant.dead_leaf_release (plant release/removal) |
| seed_waiting | yes | waning.beginning.plant_bridge, issue183.plant.beginning.seed | yes | waning.beginning.plant_bridge (plant seed/beginning, seasonal marker, grain/seed/bowl); issue183.plant.beginning.seed (plant seed/beginning, seasonal marker, grain/seed/bowl) |
| dormant_green_rest | yes | issue183.plant.rest.dormancy | yes | issue183.plant.rest.dormancy (plant rest/dormancy, seasonal marker) |
| plant_phrase_under_the_pot | yes | plant.set_aside.tradeoff_visible | yes | plant.set_aside.tradeoff_visible (plant phrase, written/folded/container, carried phrase) |
| grain_bowl_beginning | yes | batch1.kitchen.grain_beginning | yes | batch1.kitchen.grain_beginning (grain/seed/bowl, seasonal marker, bread/grain center) |
| warm_cup_between_us | yes | pause.permission.enough, pause.grounded.no_task_list | yes | pause.permission.enough (warm cup/bowl); pause.grounded.no_task_list (warm cup/bowl) |
| salt_clear_water_release | yes | repetition.no_generic_closing, home.threshold.arrival, batch1.home.salt_water_clearing, issue183.kitchen.clearing_salt, issue183.home.tending_steady | yes | repetition.no_generic_closing (salt/water release, threshold/crossing/bowl/key); home.threshold.arrival (salt/water release, threshold/crossing/bowl/key); batch1.home.salt_water_clearing (salt/water release, threshold/crossing/bowl/key); issue183.kitchen.clearing_salt (salt/water release, threshold/crossing/bowl/key); issue183.home.tending_steady (salt/water release, threshold/crossing/bowl/key) |
| quiet_welcome | yes | kitchen.warmth.together | yes | kitchen.warmth.together (welcome/offering/vessel, warm cup/bowl, seasonal marker) |
| honeyed_word | yes | waning.beginning.preparation_bridge, candle.live_flame_avoided, kitchen.tea.ordinary_care, tending_us.low.bounded, batch1.quiet_welcome | yes | waning.beginning.preparation_bridge (honey/sweetening, welcome/offering/vessel, warm cup/bowl); candle.live_flame_avoided (honey/sweetening, welcome/offering/vessel, warm cup/bowl); kitchen.tea.ordinary_care (honey/sweetening, welcome/offering/vessel, warm cup/bowl); tending_us.low.bounded (honey/sweetening, welcome/offering/vessel, warm cup/bowl); batch1.quiet_welcome (honey/sweetening, welcome/offering/vessel, warm cup/bowl) |
| bread_at_the_center | no | none | not proven | Not selected in this scenario suite. |
| folded_phrase_vessel | no | none | not proven | Not selected in this scenario suite. |
| waning_phrase_release | yes | issue183.reflection.waning_release | yes | issue183.reflection.waning_release (waning phrase/release, written/folded/container) |
| carried_key_word | yes | batch1.reflection.folded_phrase, batch1.surprise_me.resolves_visible_category | yes | batch1.reflection.folded_phrase (carried phrase, threshold/crossing/bowl/key, written/folded/container); batch1.surprise_me.resolves_visible_category (carried phrase, threshold/crossing/bowl/key, written/folded/container) |
| last_word_first_word | no | none | not proven | Not selected in this scenario suite. |
| threshold_bowl | no | none | not proven | Not selected in this scenario suite. |
| house_from_root_to_roof | yes | repetition.cross_scenario_watch | yes | repetition.cross_scenario_watch (house map, threshold/crossing/bowl/key, seasonal marker) |
| first_light_at_the_threshold | yes | numerology.accent.secondary, source_debug.no_raw_keys, batch1.light.first_threshold | yes | numerology.accent.secondary (first light / threshold, threshold/crossing/bowl/key); source_debug.no_raw_keys (first light / threshold, threshold/crossing/bowl/key); batch1.light.first_threshold (first light / threshold, threshold/crossing/bowl/key) |
| bank_the_house_light | yes | candle.no_generic_addon, issue183.candle.rest_dark | yes | candle.no_generic_addon (banked/darkening light); issue183.candle.rest_dark (banked/darkening light) |
| darkening_light | no | none | not proven | Not selected in this scenario suite. |
| seasonal_marker_bowl | yes | best_week.no_strong_signal_honesty, source_debug.how_chosen_human_labels, batch1.seasonal.marker_bowl, issue183.seasonal.entry_release | yes | best_week.no_strong_signal_honesty (seasonal marker, welcome/offering/vessel, threshold/crossing/bowl/key); source_debug.how_chosen_human_labels (seasonal marker, welcome/offering/vessel, threshold/crossing/bowl/key); batch1.seasonal.marker_bowl (seasonal marker, welcome/offering/vessel, threshold/crossing/bowl/key); issue183.seasonal.entry_release (seasonal marker, welcome/offering/vessel, threshold/crossing/bowl/key) |
| seasonal_entry_bowl | no | none | not proven | Not selected in this scenario suite. |
| clear_the_threshold_bowl | no | none | not proven | Not selected in this scenario suite. |

## 8. Category Coverage After #183

### Home

- Strongest selected patterns: honeyed_word, first_light_at_the_threshold, salt_clear_water_release
- Weak or missing combinations: waning.beginning.preparation_bridge: honeyed_word (Honeyed Word is becoming a frequent soft default and should be reviewed for overuse.); tending_us.low.bounded: honeyed_word (Honeyed Word is becoming a frequent soft default and should be reviewed for overuse.); repetition.no_generic_closing: salt_clear_water_release (Salt/Clear Water is now frequent and may be pulling threshold/home clearing broadly.); batch1.home.salt_water_clearing: salt_clear_water_release (Salt/Clear Water is now frequent and may be pulling threshold/home clearing broadly.); issue183.home.tending_steady: salt_clear_water_release (Salt/Clear Water is now frequent and may be pulling threshold/home clearing broadly.)
- Overused patterns: honeyed_word needs review

### Plant

- Strongest selected patterns: seed_waiting, plant_witness_to_growth, plant_phrase_under_the_pot, dead_leaf_release, dormant_green_rest
- Weak or missing combinations: none obvious in this suite
- Overused patterns: none obvious

### Kitchen

- Strongest selected patterns: honeyed_word, quiet_welcome, salt_clear_water_release, grain_bowl_beginning
- Weak or missing combinations: kitchen.tea.ordinary_care: honeyed_word (Honeyed Word is becoming a frequent soft default and should be reviewed for overuse.); issue183.kitchen.clearing_salt: salt_clear_water_release (Salt/Clear Water is now frequent and may be pulling threshold/home clearing broadly.)
- Overused patterns: honeyed_word needs review

### Candle or light

- Strongest selected patterns: bank_the_house_light, honeyed_word, full_light_on_the_table, first_light_at_the_threshold
- Weak or missing combinations: candle.live_flame_avoided: honeyed_word (Honeyed Word is becoming a frequent soft default and should be reviewed for overuse.)
- Overused patterns: honeyed_word needs review

### Reflection

- Strongest selected patterns: two_words_at_the_table, carried_key_word, waning_phrase_release
- Weak or missing combinations: none obvious in this suite
- Overused patterns: none obvious

### Seasonal

- Strongest selected patterns: seasonal_marker_bowl, house_from_root_to_roof
- Weak or missing combinations: none obvious in this suite
- Overused patterns: none obvious

### Surprise me

- Strongest selected patterns: seasonal_marker_bowl, carried_key_word
- Weak or missing combinations: none obvious in this suite
- Overused patterns: none obvious
- Note: Surprise me is not a category; the report shows it resolving to a real selected pattern/category path.


## 9. Generated Recommendation Samples

These are post-#183 outputs. They include happy paths and awkward paths.

### batch1.plant.dead_leaf_release: Plant waning dead-leaf release

Purpose: Checks plant clearing as release without plant damage or care advice.

Check-in inputs:

- Selected category / practice type: Plant
- Capacity: a_little / low
- Ritual focus: Clearing something out
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waning moon, Mercury in Cancer — careful words for home, Numerology 7

Generated recommendation:

- Selected pattern: dead_leaf_release / Dead Leaf Release
- Selected ritual-form family: plant release/removal
- Expected ritual-form family: plant release/removal, salt/water release, waning phrase/release
- Form-family matched: yes
- Source summary: This drew from Waning Moon card; Dead Leaf Release pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Clear one small thing. Release only the dead leaf.
- Ritual body: Look before touching. Do not make release larger than the leaf. Choose one already dead or fallen leaf. Remove only that spent matter, or choose observation if none is ready. Name what is complete and place the leaf in trash, compost, or outside if appropriate. Close when the leaf has left your hand.
- Intention: Release only the dead leaf.
- Best window: When you have five quiet minutes.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What is already complete enough to stop feeding?
- Why this fits: Waning moon shaped the timing tone. Your plant choice helped point toward Dead Leaf Release. It also fits saved preferences for plant and plant tending.

How this was chosen:

- Timing: Waning moon was the main timing signal used here: A settling phase for clearing, integrating, releasing, or resting.
- Numerology accent: Numerology 7 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your plant choice matched Dead Leaf Release.
- Ritual focus: Your focus on clearing something out matched the selected ritual shape.
- Ritual fit: Dead Leaf Release was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: A spent leaf gives release a precise edge: remove what is already finished, not what is alive. Close when the leaf has left your hand. It also matched plant and plant tending and clearing.
- Profile fit: This fits at least one saved profile theme around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waning Moon card; Dead Leaf Release pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: matched_selected
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (plant release/removal)
  - undefined Check-in intention match (Clearing something out)
  - undefined Check-in practice match (plant, plant_tending)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending)
  - undefined Preferred style match (plant)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Too long for capacity (15 minutes exceeds the current 5-minute limit); undefined Avoided style conflict (heavy_cleanup)
  - threshold_reset / Threshold Reset: undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed); undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: No obvious awkward part from diagnostics; still needs human voice/meaning review.

### issue183.plant.beginning.seed: Plant beginning uses seed or growth form

Purpose: Checks that Plant + beginning reaches seed, growth, or plant-beginning form.

Check-in inputs:

- Selected category / practice type: Plant
- Capacity: a_little / low
- Ritual focus: Making a beginning
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waxing moon, Summer solstice — light and tending, Numerology 7

Generated recommendation:

- Selected pattern: seed_waiting / Seed Waiting
- Selected ritual-form family: plant seed/beginning, seasonal marker, grain/seed/bowl
- Expected ritual-form family: plant seed/beginning
- Form-family matched: yes
- Source summary: This drew from Waxing Moon card; Seed Waiting pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Give one small thing support. Let the seed wait.
- Ritual body: Treat waiting as part of the ritual. Use seed, grain, or a plant pot already available. Place one seed, grain, or plant pot where it can hold the beginning. Add a little water only if that is actually appropriate. Name the beginning that can wait before it grows. Close by leaving the seed or pot in place and not checking for proof.
- Intention: Let the seed wait.
- Best window: When you have five quiet minutes.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What beginning needs patience more than force?
- Why this fits: Waxing moon shaped the timing tone. Your plant choice helped point toward Seed Waiting. It also fits saved preferences for plant and plant tending.

How this was chosen:

- Timing: Waxing moon was the main timing signal used here: A steady support phase for tending what is already underway.
- Numerology accent: Numerology 7 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your plant choice matched Seed Waiting.
- Ritual focus: Your focus was making a beginning, but Seed Waiting was chosen as the closest approved ritual that still fit capacity and safety.
- Ritual fit: Seed Waiting was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: Seed and water make a beginning material without demanding immediate growth. Close by leaving the seed or pot in place and not checking for proof. It also matched plant and plant tending and beginning.
- Profile fit: This fits at least one saved profile theme around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: The focus answer was making a beginning, so the selected ritual kept that as a tone rather than forcing an exact pattern match. Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waxing Moon card; Seed Waiting pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: matched_selected
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (plant seed/beginning)
  - undefined Check-in practice match (plant, plant_tending)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending)
  - undefined Preferred style match (plant)
  - undefined Preferred style match (plant_tending)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Too long for capacity (15 minutes exceeds the current 5-minute limit); undefined Avoided style conflict (heavy_cleanup)
  - threshold_reset / Threshold Reset: undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed); undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: No obvious awkward part from diagnostics; still needs human voice/meaning review.

### issue183.plant.rest.dormancy: Plant rest uses dormancy

Purpose: Checks that Plant + rest reaches dormancy/rest form.

Check-in inputs:

- Selected category / practice type: Plant
- Capacity: a_little / low
- Ritual focus: Resting
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waning moon, Moon in Cancer — home rhythm, Numerology 6

Generated recommendation:

- Selected pattern: dormant_green_rest / Dormant Green Rest
- Selected ritual-form family: plant rest/dormancy, seasonal marker
- Expected ritual-form family: plant rest/dormancy
- Form-family matched: yes
- Source summary: This drew from Waning Moon card; Dormant Green Rest pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Clear one small thing. Let the green thing rest.
- Ritual body: Use the plant as a rest teacher, not a task. Do not water, prune, or fix unless care is truly needed. Sit near a plant, seed, leaf, or plant image. Name one thing that does not need to grow today. Leave the plant and the question alone. Close by doing nothing more to the plant.
- Intention: Let the green thing rest.
- Best window: When you have five quiet minutes.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What is allowed to stay dormant and still be alive?
- Why this fits: Waning moon shaped the timing tone. Your plant choice helped point toward Dormant Green Rest. It also fits saved preferences for plant and rest.

How this was chosen:

- Timing: Waning moon was the main timing signal used here: A settling phase for clearing, integrating, releasing, or resting.
- Numerology accent: Numerology 6 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your plant choice matched Dormant Green Rest.
- Ritual focus: Your focus on resting matched the selected ritual shape.
- Ritual fit: Dormant Green Rest was selected as the approved ritual container. It takes about 3 minutes and keeps the action concrete: Plant life includes dormancy; not every living thing is always growing visibly. Close by doing nothing more to the plant. It also matched plant and rest and seasonal.
- Profile fit: This fits at least one saved profile theme around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waning Moon card; Dormant Green Rest pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: matched_selected
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (plant rest/dormancy)
  - undefined Check-in intention match (Resting)
  - undefined Check-in practice match (plant)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending)
  - undefined Preferred style match (plant)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Too long for capacity (15 minutes exceeds the current 5-minute limit); undefined Avoided style conflict (heavy_cleanup)
  - threshold_reset / Threshold Reset: undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed); undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: No obvious awkward part from diagnostics; still needs human voice/meaning review.

### kitchen.tea.ordinary_care: Tea or warm drink as ordinary care

Purpose: Checks kitchen warmth without recipe burden or health advice.

Check-in inputs:

- Selected category / practice type: Kitchen
- Capacity: a_little / low
- Ritual focus: Resting
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth

Generated recommendation:

- Selected pattern: honeyed_word / Honeyed Word
- Selected ritual-form family: honey/sweetening, welcome/offering/vessel, warm cup/bowl
- Expected ritual-form family: warm cup/bowl
- Form-family matched: yes
- Source summary: This drew from Waxing Moon card; Honeyed Word pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Give one small thing support. Give one word a little sweetness.
- Ritual body: Use a tiny material cue or imagine one if food is not a fit. Do not turn this into advice or apology work. Place a drop of honey, sugar substitute, warm cup, bread piece, or empty cup as the sweetness cue. Say or write one word that can soften the home. Return or wash the material. Close when the sweetness cue is returned or washed away.
- Intention: Give one word a little sweetness.
- Best window: When you have five quiet minutes.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What word can be made softer without being made false?
- Why this fits: Waxing moon shaped the timing tone. Your kitchen choice helped point toward Honeyed Word. It also fits saved preferences for kitchen and reflection.

How this was chosen:

- Timing: Waxing moon was the main timing signal used here: A steady support phase for tending what is already underway.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your kitchen choice matched Honeyed Word.
- Ritual focus: Your focus on resting matched the selected ritual shape.
- Ritual fit: Honeyed Word was selected as the approved ritual container. It takes about 3 minutes and keeps the action concrete: Sweetness and welcome can soften speech when the phrase stays bounded and ordinary. Close when the sweetness cue is returned or washed away. It also matched kitchen and reflection and home tending.
- Profile fit: Saved profile and natal-chart themes for Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waxing Moon card; Honeyed Word pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: computed_unmatched
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (warm cup/bowl)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in intention match (Resting)
  - undefined Check-in practice match (kitchen)
  - undefined Preferred style match (kitchen)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Too long for capacity (15 minutes exceeds the current 5-minute limit); undefined Avoided style conflict (heavy_cleanup)
  - threshold_reset / Threshold Reset: undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed); undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: Honeyed Word is becoming a frequent soft default and should be reviewed for overuse.

### batch1.kitchen.grain_beginning: Kitchen grain bowl beginning

Purpose: Checks kitchen beginning as grain/seed vessel, not recipe work.

Check-in inputs:

- Selected category / practice type: Kitchen
- Capacity: enough_to_engage / steady
- Ritual focus: Making a beginning
- Audience: both_of_us
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waxing moon, Summer solstice — light and tending, Numerology 7

Generated recommendation:

- Selected pattern: grain_bowl_beginning / Grain Bowl Beginning
- Selected ritual-form family: grain/seed/bowl, seasonal marker, bread/grain center
- Expected ritual-form family: grain/seed/bowl
- Form-family matched: yes
- Source summary: This drew from Waxing Moon card; Grain Bowl Beginning pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Give one small thing support. Give the beginning a grain bowl.
- Ritual body: Use one ordinary kitchen material. Let the bowl hold the start so you do not have to push it. Place a pinch of grain, rice, oats, bean, or seed in a small bowl. Name the beginning in one sentence. Set the bowl at the table or return the grain when the phrase is complete. Close by placing the bowl or returning the grain to ordinary use.
- Intention: Give the beginning a grain bowl.
- Best window: When you have a little space this week.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What beginning can be held before it is acted on?
- Why this fits: Waxing moon shaped the timing tone. Your kitchen choice helped point toward Grain Bowl Beginning. It also fits saved preferences for kitchen and beginning.

How this was chosen:

- Timing: Waxing moon was the main timing signal used here: A steady support phase for tending what is already underway.
- Numerology accent: Numerology 7 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose enough to engage capacity. This is for both of you. Your kitchen choice matched Grain Bowl Beginning.
- Ritual focus: Your focus was making a beginning, but Grain Bowl Beginning was chosen as the closest approved ritual that still fit capacity and safety.
- Ritual fit: Grain Bowl Beginning was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: Grain and seed give a beginning weight, rhythm, and table presence without turning it into work. Close by placing the bowl or returning the grain to ordinary use. It also matched kitchen and beginning and grain.
- Profile fit: For a together recommendation, saved profile and natal-chart themes for Person A and Person B balance practical home-tending magic with clear structure and bounded action. This is used as fit context for both profiles together, not as a prediction.
- Capacity boundary: This fits a steady week by staying practical and about twenty minutes or less.
- Tradeoff: The focus answer was making a beginning, so the selected ritual kept that as a tone rather than forcing an exact pattern match. Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waxing Moon card; Grain Bowl Beginning pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: matched_selected
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (grain/seed/bowl)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in practice match (kitchen)
  - undefined Check-in audience match (both_of_us)
  - undefined Preferred style match (kitchen)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Avoided style conflict (heavy_cleanup)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed); undefined Capacity mode mismatch (steady is not supported by this pattern)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
  - simple_warm_drink / Simple Warm Drink: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: No obvious awkward part from diagnostics; still needs human voice/meaning review.

### batch1.quiet_welcome: Quiet welcome without literal spirit-feeding

Purpose: Checks welcome/offering mechanics as belief-neutral household hospitality.

Check-in inputs:

- Selected category / practice type: Kitchen
- Capacity: a_little / low
- Ritual focus: Tending us
- Audience: both_of_us
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth

Generated recommendation:

- Selected pattern: honeyed_word / Honeyed Word
- Selected ritual-form family: honey/sweetening, welcome/offering/vessel, warm cup/bowl
- Expected ritual-form family: warm cup/bowl, welcome/offering/vessel, bread/grain center, honey/sweetening
- Form-family matched: yes
- Source summary: This drew from Waxing Moon card; Honeyed Word pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Give one small thing support. Give one word a little sweetness.
- Ritual body: Use a tiny material cue or imagine one if food is not a fit. Do not turn this into advice or apology work. Place a drop of honey, sugar substitute, warm cup, bread piece, or empty cup as the sweetness cue. Say or write one word that can soften the home. Return or wash the material. Close when the sweetness cue is returned or washed away.
- Intention: Give one word a little sweetness.
- Best window: When you have five quiet minutes.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What word can be made softer without being made false?
- Why this fits: Waxing moon shaped the timing tone. Your kitchen choice helped point toward Honeyed Word. It also fits saved preferences for kitchen and reflection.

How this was chosen:

- Timing: Waxing moon was the main timing signal used here: A steady support phase for tending what is already underway.
- Your check-in: You asked for something for today. You chose a little capacity. This is for both of you. Your kitchen choice matched Honeyed Word.
- Ritual focus: You chose tending us, but current capacity called for a smaller shared ritual rather than a long conversation or heavy emotional process.
- Ritual fit: Honeyed Word was selected as the approved ritual container. It takes about 3 minutes and keeps the action concrete: Sweetness and welcome can soften speech when the phrase stays bounded and ordinary. Close when the sweetness cue is returned or washed away. It also matched kitchen and reflection and home tending.
- Profile fit: For a together recommendation, saved profile and natal-chart themes for Person B balance practical home-tending magic with warmth, beauty, and affection. This is used as fit context for both profiles together, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waxing Moon card; Honeyed Word pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: computed_unmatched
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (honey/sweetening, welcome/offering/vessel, warm cup/bowl)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in intention match (Tending us)
  - undefined Check-in practice match (kitchen)
  - undefined Check-in audience match (both_of_us)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Too long for capacity (15 minutes exceeds the current 5-minute limit); undefined Avoided style conflict (heavy_cleanup)
  - threshold_reset / Threshold Reset: undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed); undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: Welcome family matches, but exact Quiet Welcome lost to Honeyed Word.

### home.threshold.arrival: Threshold or arrival ritual coherence

Purpose: Checks home threshold content as a single ritual rather than fragments.

Check-in inputs:

- Selected category / practice type: Home
- Capacity: enough_to_engage / steady
- Ritual focus: Marking a threshold
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth

Generated recommendation:

- Selected pattern: salt_clear_water_release / Salt and Clear Water Release
- Selected ritual-form family: salt/water release, threshold/crossing/bowl/key
- Expected ritual-form family: threshold/crossing/bowl/key, first light / threshold, first/last threshold
- Form-family matched: yes
- Source summary: This drew from Waxing Moon card; Salt and Clear Water Release pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Give one small thing support. Let salt and clear water carry one release.
- Ritual body: Keep the release specific and small. Use the bowl to contain the clearing. Put clear water in a small bowl and add a pinch of salt. Name one spent thing that can leave this household field. Pour the water away and rinse the bowl. Close when the bowl is rinsed and empty.
- Intention: Let salt and clear water carry one release.
- Best window: When you have a little space this week.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What feels cleaner when it has somewhere ordinary to go?
- Why this fits: Waxing moon shaped the timing tone. Your home choice helped point toward Salt and Clear Water Release. It also fits saved preferences for kitchen and home tending.

How this was chosen:

- Timing: Waxing moon was the main timing signal used here: A steady support phase for tending what is already underway.
- Your check-in: You asked for something for today. You chose enough to engage capacity. This is for you. Your home choice matched Salt and Clear Water Release.
- Ritual focus: Your focus on marking a threshold matched the selected ritual shape.
- Ritual fit: Salt and Clear Water Release was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: Salt and water give clearing a vessel and an outward direction without making danger the story. Close when the bowl is rinsed and empty. It also matched kitchen and home tending and threshold reset.
- Profile fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This fits a steady week by staying practical and about twenty minutes or less.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waxing Moon card; Salt and Clear Water Release pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: computed_unmatched
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (threshold/crossing/bowl/key)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in intention match (Marking a threshold)
  - undefined Check-in practice match (home_tending)
  - undefined Preferred style match (kitchen)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Avoided style conflict (heavy_cleanup)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed); undefined Capacity mode mismatch (steady is not supported by this pattern)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
  - simple_warm_drink / Simple Warm Drink: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: Threshold family matches, but the selected salt/water clearing form may be too clearing-weighted for arrival.

### batch1.home.salt_water_clearing: Home clearing with salt and clear water

Purpose: Checks that clearing uses material logic and closure, not room tidying.

Check-in inputs:

- Selected category / practice type: Home
- Capacity: a_little / low
- Ritual focus: Clearing something out
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waning moon, Mercury in Cancer — careful words for home, Numerology 7

Generated recommendation:

- Selected pattern: salt_clear_water_release / Salt and Clear Water Release
- Selected ritual-form family: salt/water release, threshold/crossing/bowl/key
- Expected ritual-form family: salt/water release, threshold/crossing/bowl/key, plant release/removal, waning phrase/release
- Form-family matched: yes
- Source summary: This drew from Waning Moon card; Salt and Clear Water Release pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Clear one small thing. Let salt and clear water carry one release.
- Ritual body: Keep the release specific and small. Use the bowl to contain the clearing. Put clear water in a small bowl and add a pinch of salt. Name one spent thing that can leave this household field. Pour the water away and rinse the bowl. Close when the bowl is rinsed and empty.
- Intention: Let salt and clear water carry one release.
- Best window: When you have five quiet minutes.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What feels cleaner when it has somewhere ordinary to go?
- Why this fits: Waning moon shaped the timing tone. Your home choice helped point toward Salt and Clear Water Release. It also fits saved preferences for kitchen and home tending.

How this was chosen:

- Timing: Waning moon was the main timing signal used here: A settling phase for clearing, integrating, releasing, or resting.
- Numerology accent: Numerology 7 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your home choice matched Salt and Clear Water Release.
- Ritual focus: Your focus on clearing something out matched the selected ritual shape.
- Ritual fit: Salt and Clear Water Release was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: Salt and water give clearing a vessel and an outward direction without making danger the story. Close when the bowl is rinsed and empty. It also matched kitchen and home tending and clearing.
- Profile fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waning Moon card; Salt and Clear Water Release pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: matched_selected
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (salt/water release, threshold/crossing/bowl/key)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in intention match (Clearing something out)
  - undefined Check-in practice match (home_tending)
  - undefined Preferred style match (kitchen)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Too long for capacity (15 minutes exceeds the current 5-minute limit); undefined Avoided style conflict (heavy_cleanup)
  - threshold_reset / Threshold Reset: undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed); undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: Salt/Clear Water is now frequent and may be pulling threshold/home clearing broadly.

### issue183.home.tending_steady: Home tending steady uses house map or threshold form

Purpose: Checks that Home + steady + tending the home reaches house/threshold material logic.

Check-in inputs:

- Selected category / practice type: Home
- Capacity: enough_to_engage / steady
- Ritual focus: Tending the home
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth

Generated recommendation:

- Selected pattern: salt_clear_water_release / Salt and Clear Water Release
- Selected ritual-form family: salt/water release, threshold/crossing/bowl/key
- Expected ritual-form family: house map, threshold/crossing/bowl/key
- Form-family matched: yes
- Source summary: This drew from Waxing Moon card; Salt and Clear Water Release pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Give one small thing support. Let salt and clear water carry one release.
- Ritual body: Keep the release specific and small. Use the bowl to contain the clearing. Put clear water in a small bowl and add a pinch of salt. Name one spent thing that can leave this household field. Pour the water away and rinse the bowl. Close when the bowl is rinsed and empty.
- Intention: Let salt and clear water carry one release.
- Best window: When you have a little space this week.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What feels cleaner when it has somewhere ordinary to go?
- Why this fits: Waxing moon shaped the timing tone. Your home choice helped point toward Salt and Clear Water Release. It also fits saved preferences for kitchen and home tending.

How this was chosen:

- Timing: Waxing moon was the main timing signal used here: A steady support phase for tending what is already underway.
- Your check-in: You asked for something for today. You chose enough to engage capacity. This is for you. Your home choice matched Salt and Clear Water Release.
- Ritual focus: Your focus on tending the home matched the selected ritual shape.
- Ritual fit: Salt and Clear Water Release was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: Salt and water give clearing a vessel and an outward direction without making danger the story. Close when the bowl is rinsed and empty. It also matched kitchen and home tending and threshold reset.
- Profile fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This fits a steady week by staying practical and about twenty minutes or less.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waxing Moon card; Salt and Clear Water Release pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: computed_unmatched
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (threshold/crossing/bowl/key)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in intention match (Tending the home)
  - undefined Check-in practice match (home_tending)
  - undefined Preferred style match (kitchen)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Avoided style conflict (heavy_cleanup)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed); undefined Capacity mode mismatch (steady is not supported by this pattern)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
  - simple_warm_drink / Simple Warm Drink: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: Salt/Clear Water is now frequent and may be pulling threshold/home clearing broadly.

### batch1.reflection.folded_phrase: Reflection folded phrase vessel

Purpose: Checks reflection as a contained phrase form rather than journaling.

Check-in inputs:

- Selected category / practice type: Reflection
- Capacity: a_little / low
- Ritual focus: Saying something clearly
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waxing moon, Summer solstice — light and tending, Numerology 7

Generated recommendation:

- Selected pattern: carried_key_word / Carried Key Word
- Selected ritual-form family: carried phrase, threshold/crossing/bowl/key, written/folded/container
- Expected ritual-form family: written/folded/container
- Form-family matched: yes
- Source summary: This drew from Waxing Moon card; Carried Key Word pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Give one small thing support. Let the key carry one word.
- Ritual body: Use an ordinary object that can safely return to use. Keep the word portable. Hold a key or small household object. Say or write one word for what should cross with you. Carry it briefly or return it to its place. Close when the key is carried or returned.
- Intention: Let the key carry one word.
- Best window: When you have five quiet minutes.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What word can cross the threshold with you?
- Why this fits: Waxing moon shaped the timing tone. Your reflection choice helped point toward Carried Key Word. It also fits saved preferences for home tending and reflection.

How this was chosen:

- Timing: Waxing moon was the main timing signal used here: A steady support phase for tending what is already underway.
- Numerology accent: Numerology 7 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your reflection choice matched Carried Key Word.
- Ritual focus: Your focus on saying something clearly matched the selected ritual shape.
- Ritual fit: Carried Key Word was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: A key can mark threshold and return without promising luck or protection. Close when the key is carried or returned. It also matched home tending and reflection and naming.
- Profile fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waxing Moon card; Carried Key Word pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: matched_selected
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (written/folded/container)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in intention match (Saying something clearly)
  - undefined Check-in practice match (reflection)
  - undefined Preferred style match (home_tending)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Too long for capacity (15 minutes exceeds the current 5-minute limit); undefined Avoided style conflict (heavy_cleanup)
  - threshold_reset / Threshold Reset: undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed); undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: Written/folded family matches, but exact Folded Phrase Vessel lost to Carried Key Word.

### issue183.reflection.waning_release: Reflection waning release uses written release

Purpose: Checks that Reflection + clearing reaches written or release form.

Check-in inputs:

- Selected category / practice type: Reflection
- Capacity: a_little / low
- Ritual focus: Clearing something out
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waning moon, Mercury in Cancer — careful words for home, Numerology 7

Generated recommendation:

- Selected pattern: waning_phrase_release / Waning Phrase Release
- Selected ritual-form family: waning phrase/release, written/folded/container
- Expected ritual-form family: waning phrase/release
- Form-family matched: yes
- Source summary: This drew from Waning Moon card; Waning Phrase Release pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Clear one small thing. Let the waning phrase leave.
- Ritual body: Keep the phrase concrete. Let removal be the ritual body. Write or speak one phrase about what is complete enough. Tear it, dissolve it in plain water, throw it away, or place it in a closed book. Open your hands when the phrase is gone or contained. Close with empty hands.
- Intention: Let the waning phrase leave.
- Best window: When you have five quiet minutes.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What is complete enough to leave your hands?
- Why this fits: Waning moon shaped the timing tone. Your reflection choice helped point toward Waning Phrase Release. It also fits saved preferences for reflection and naming.

How this was chosen:

- Timing: Waning moon was the main timing signal used here: A settling phase for clearing, integrating, releasing, or resting.
- Numerology accent: Numerology 7 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your reflection choice matched Waning Phrase Release.
- Ritual focus: Your focus on clearing something out matched the selected ritual shape.
- Ritual fit: Waning Phrase Release was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: Waning light supports lessening when the phrase has a real way out. Close with empty hands. It also matched reflection and naming and clearing.
- Profile fit: Saved profile and natal-chart themes for Person B fit at least one profile around warmth, beauty, and affection without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waning Moon card; Waning Phrase Release pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: matched_selected
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (waning phrase/release)
  - undefined Check-in intention match (Clearing something out)
  - undefined Private profile theme match (profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in practice match (reflection)
  - undefined Preferred style match (reflection)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Too long for capacity (15 minutes exceeds the current 5-minute limit); undefined Avoided style conflict (heavy_cleanup)
  - threshold_reset / Threshold Reset: undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed); undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: No obvious awkward part from diagnostics; still needs human voice/meaning review.

### issue183.reflection.threshold: Reflection threshold uses crossing or carried phrase

Purpose: Checks that Reflection + threshold reaches carried, first/last, folded, or crossing form.

Check-in inputs:

- Selected category / practice type: Reflection
- Capacity: a_little / low
- Ritual focus: Marking a threshold
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth

Generated recommendation:

- Selected pattern: two_words_at_the_table / Two Words at the Table
- Selected ritual-form family: spoken/table phrase
- Expected ritual-form family: written/folded/container, carried phrase, spoken/table phrase, threshold/crossing/bowl/key, first light / threshold, first/last threshold
- Form-family matched: yes
- Source summary: This drew from Waxing Moon card; Two Words at the Table pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Give one small thing support. Put two words on the table.
- Ritual body: Keep language performative and brief. No explanation is required. Stand or sit at the table or counter. Each person says one word, or choose one word for the household. Let the surface hold the words without discussion. Close by touching the table once and stopping there.
- Intention: Put two words on the table.
- Best window: When you have five quiet minutes.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What word can the table hold for now?
- Why this fits: Waxing moon shaped the timing tone. Your reflection choice helped point toward Two Words at the Table. It also fits saved preferences for reflection and kitchen.

How this was chosen:

- Timing: Waxing moon was the main timing signal used here: A steady support phase for tending what is already underway.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your reflection choice matched Two Words at the Table.
- Ritual focus: Your focus on marking a threshold matched the selected ritual shape.
- Ritual fit: Two Words at the Table was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: The table can hold speech so the people do not have to turn it into a talk. Close by touching the table once and stopping there. It also matched reflection and kitchen and home tending.
- Profile fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waxing Moon card; Two Words at the Table pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: computed_unmatched
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (spoken/table phrase)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in intention match (Marking a threshold)
  - undefined Check-in practice match (reflection)
  - undefined Preferred style match (reflection)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Too long for capacity (15 minutes exceeds the current 5-minute limit); undefined Avoided style conflict (heavy_cleanup)
  - threshold_reset / Threshold Reset: undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed); undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: Two Words remains appropriate only if spoken table phrase is truly the form.

### issue183.candle.rest_dark: Candle or light rest uses banked or darkening light

Purpose: Checks that Candle/light + resting does not select full-light clarity.

Check-in inputs:

- Selected category / practice type: Candle or light
- Capacity: a_little / low
- Ritual focus: Resting
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waning moon, Moon in Cancer — home rhythm, Numerology 6

Generated recommendation:

- Selected pattern: bank_the_house_light / Bank the House Light
- Selected ritual-form family: banked/darkening light
- Expected ritual-form family: banked/darkening light
- Form-family matched: yes
- Source summary: This drew from Waning Moon card; Bank the House Light pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Clear one small thing. Bank one house light.
- Ritual body: Treat the light as the house's last small center. Close the day without turning closure into another task. Choose a lamp, window light, or supervised candle. Lower or extinguish it while naming what can be done enough. Leave one warm thing in place: a cup, blanket, or quiet table. Close by leaving the light lowered and the house unasked for more.
- Intention: Bank one house light.
- Best window: When you have five quiet minutes.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What can stay warm here without being worked on tonight?
- Why this fits: Waning moon shaped the timing tone. Your candle or light choice helped point toward Bank the House Light. It also fits saved preferences for candle or light and light focus.

How this was chosen:

- Timing: Waning moon was the main timing signal used here: A settling phase for clearing, integrating, releasing, or resting.
- Numerology accent: Numerology 6 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your candle or light choice matched Bank the House Light.
- Ritual focus: Your focus on resting matched the selected ritual shape.
- Ritual fit: Bank the House Light was selected as the approved ritual container. It takes about 3 minutes and keeps the action concrete: Fire-banking customs give evening closure a form: lower the light, keep the warmth, and stop adding fuel. Close by leaving the light lowered and the house unasked for more. It also matched candle or light and light focus and home tending.
- Profile fit: Saved profile and natal-chart themes for Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waning Moon card; Bank the House Light pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: matched_selected
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (banked/darkening light)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in intention match (Resting)
  - undefined Check-in practice match (candle_or_light, light_focus)
  - undefined Preferred style match (candle_or_light)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Too long for capacity (15 minutes exceeds the current 5-minute limit); undefined Avoided style conflict (heavy_cleanup)
  - threshold_reset / Threshold Reset: undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed); undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: No obvious awkward part from diagnostics; still needs human voice/meaning review.

### issue183.candle.full_saying_clearly: Candle or light full clarity uses full light

Purpose: Checks that Candle/light + saying clearly can still select full-light/table form when it fits.

Check-in inputs:

- Selected category / practice type: Candle or light
- Capacity: a_little / low
- Ritual focus: Saying something clearly
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Full moon, Mercury in Cancer — careful words for home, Numerology 7

Generated recommendation:

- Selected pattern: full_light_on_the_table / Full Light on the Table
- Selected ritual-form family: full light / clarity
- Expected ritual-form family: full light / clarity
- Form-family matched: yes
- Source summary: This drew from Full Moon card; Full Light on the Table pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Notice what is already clear. Set full light on the table.
- Ritual body: Let the table hold the line. Keep the phrase short enough to close. Bring one lamp, window light, or supervised candle to the table. Say or write one clear line. Turn from the light, dim it, or extinguish it to close. Close when the light is dimmed, turned from, or put out.
- Intention: Set full light on the table.
- Best window: When you have five quiet minutes.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What can be clear because it has been placed in the light?
- Why this fits: Full moon shaped the timing tone. Your candle or light choice helped point toward Full Light on the Table. It also fits saved preferences for candle or light and reflection.

How this was chosen:

- Timing: Full moon was the main timing signal used here: A visible point for noticing clarity, gratitude, or what is complete.
- Numerology accent: Numerology 7 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your candle or light choice matched Full Light on the Table.
- Ritual focus: Your focus on saying something clearly matched the selected ritual shape.
- Ritual fit: Full Light on the Table was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: Full visible light can make one phrase easier to hold without turning it into exposure. Close when the light is dimmed, turned from, or put out. It also matched candle or light and reflection and kitchen.
- Profile fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Full Moon card; Full Light on the Table pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: matched_selected
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (full light / clarity)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in intention match (Saying something clearly)
  - undefined Check-in practice match (candle_or_light, light_focus)
  - undefined Preferred style match (candle_or_light)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Too long for capacity (15 minutes exceeds the current 5-minute limit); undefined Avoided style conflict (heavy_cleanup)
  - threshold_reset / Threshold Reset: undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed); undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: Full Light remains appropriate only if light/clarity is central here.

### batch1.seasonal.marker_bowl: Seasonal marker bowl

Purpose: Checks seasonal content as private bowl/threshold marker, not holiday feed.

Check-in inputs:

- Selected category / practice type: Seasonal
- Capacity: a_little / low
- Ritual focus: Marking a threshold
- Audience: both_of_us
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waning moon, Moon in Cancer — home rhythm, Numerology 6

Generated recommendation:

- Selected pattern: seasonal_marker_bowl / Seasonal Marker Bowl
- Selected ritual-form family: seasonal marker, welcome/offering/vessel, threshold/crossing/bowl/key
- Expected ritual-form family: seasonal marker, first/last threshold, threshold/crossing/bowl/key, first light / threshold
- Form-family matched: yes
- Source summary: This drew from Waning Moon card; Seasonal Marker Bowl pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Clear one small thing. Let one bowl mark the season.
- Ritual body: Use one ordinary material. Let the bowl hold the season without decorating the house. Place one grain, leaf, key, bread piece, or ordinary object in a small bowl. Name what this season is asking the home to hold, begin, or release. Leave the bowl briefly, or empty it when the phrase feels complete. Close by placing, returning, or emptying the bowl.
- Intention: Let one bowl mark the season.
- Best window: When you have five quiet minutes.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What season is this home actually in?
- Why this fits: Waning moon shaped the timing tone. Your seasonal choice helped point toward Seasonal Marker Bowl. It also fits saved preferences for seasonal and home tending.

How this was chosen:

- Timing: Waning moon was the main timing signal used here: A settling phase for clearing, integrating, releasing, or resting.
- Numerology accent: Numerology 6 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose a little capacity. This is for both of you. Your seasonal choice matched Seasonal Marker Bowl.
- Ritual focus: Your focus on marking a threshold matched the selected ritual shape.
- Ritual fit: Seasonal Marker Bowl was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: A seasonal bowl gives calendar change a private household form instead of a public festival script. Close by placing, returning, or emptying the bowl. It also matched seasonal and home tending and kitchen.
- Profile fit: For a together recommendation, saved profile and natal-chart themes for Person A and Person B balance practical home-tending magic with clear structure and bounded action. This is used as fit context for both profiles together, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waning Moon card; Seasonal Marker Bowl pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: matched_selected
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (seasonal marker, threshold/crossing/bowl/key)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in intention match (Marking a threshold)
  - undefined Check-in practice match (seasonal)
  - undefined Check-in audience match (both_of_us)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Too long for capacity (15 minutes exceeds the current 5-minute limit); undefined Avoided style conflict (heavy_cleanup)
  - threshold_reset / Threshold Reset: undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed); undefined Too long for capacity (10 minutes exceeds the current 5-minute limit)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: No obvious awkward part from diagnostics; still needs human voice/meaning review.

### issue183.seasonal.entry_release: Seasonal entry or release uses seasonal threshold

Purpose: Checks that Seasonal + threshold/clearing reaches seasonal marker, entry, first-last, or threshold form.

Check-in inputs:

- Selected category / practice type: Seasonal
- Capacity: enough_to_engage / steady
- Ritual focus: Marking a threshold
- Audience: both_of_us
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waning moon, Moon in Cancer — home rhythm, Numerology 6

Generated recommendation:

- Selected pattern: seasonal_marker_bowl / Seasonal Marker Bowl
- Selected ritual-form family: seasonal marker, welcome/offering/vessel, threshold/crossing/bowl/key
- Expected ritual-form family: seasonal marker, first/last threshold, threshold/crossing/bowl/key, first light / threshold
- Form-family matched: yes
- Source summary: This drew from Waning Moon card; Seasonal Marker Bowl pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Clear one small thing. Let one bowl mark the season.
- Ritual body: Use one ordinary material. Let the bowl hold the season without decorating the house. Place one grain, leaf, key, bread piece, or ordinary object in a small bowl. Name what this season is asking the home to hold, begin, or release. Leave the bowl briefly, or empty it when the phrase feels complete. Close by placing, returning, or emptying the bowl.
- Intention: Let one bowl mark the season.
- Best window: When you have a little space this week.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What season is this home actually in?
- Why this fits: Waning moon shaped the timing tone. Your seasonal choice helped point toward Seasonal Marker Bowl. It also fits saved preferences for seasonal and home tending.

How this was chosen:

- Timing: Waning moon was the main timing signal used here: A settling phase for clearing, integrating, releasing, or resting.
- Numerology accent: Numerology 6 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose enough to engage capacity. This is for both of you. Your seasonal choice matched Seasonal Marker Bowl.
- Ritual focus: Your focus on marking a threshold matched the selected ritual shape.
- Ritual fit: Seasonal Marker Bowl was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: A seasonal bowl gives calendar change a private household form instead of a public festival script. Close by placing, returning, or emptying the bowl. It also matched seasonal and home tending and kitchen.
- Profile fit: For a together recommendation, saved profile and natal-chart themes for Person A and Person B balance practical home-tending magic with clear structure and bounded action. This is used as fit context for both profiles together, not as a prediction.
- Capacity boundary: This fits a steady week by staying practical and about twenty minutes or less.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waning Moon card; Seasonal Marker Bowl pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: matched_selected
- Practice-choice diagnostic: matched_selected_pattern
- Top positive score reasons:
  - undefined Ritual form match (seasonal marker, threshold/crossing/bowl/key)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in intention match (Marking a threshold)
  - undefined Check-in practice match (seasonal)
  - undefined Check-in audience match (both_of_us)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Avoided style conflict (heavy_cleanup)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed); undefined Capacity mode mismatch (steady is not supported by this pattern)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
  - simple_warm_drink / Simple Warm Drink: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: No obvious awkward part from diagnostics; still needs human voice/meaning review.

### batch1.surprise_me.resolves_visible_category: Surprise me resolves to visible category

Purpose: Checks open selection resolves before recommendation while still recording the open choice.

Check-in inputs:

- Selected category / practice type: Surprise me
- Capacity: enough_to_engage / steady
- Ritual focus: Saying something clearly
- Audience: me
- Time scope: today
- Timing window / timing facts: no selected timing window; signals=Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth

Generated recommendation:

- Selected pattern: carried_key_word / Carried Key Word
- Selected ritual-form family: carried phrase, threshold/crossing/bowl/key, written/folded/container
- Expected ritual-form family: none
- Form-family matched: yes
- Source summary: This drew from Waxing Moon card; Carried Key Word pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.
- Title/theme: Give one small thing support. Let the key carry one word.
- Ritual body: Use an ordinary object that can safely return to use. Keep the word portable. Hold a key or small household object. Say or write one word for what should cross with you. Carry it briefly or return it to its place. Close when the key is carried or returned.
- Intention: Let the key carry one word.
- Best window: When you have a little space this week.
- Optional add-on/accent: No add-on needed.
- Carry/reflection prompt: What word can cross the threshold with you?
- Why this fits: Waxing moon shaped the timing tone. Your surprise me -> reflection choice helped point toward Carried Key Word. It also fits saved preferences for home tending and reflection.

How this was chosen:

- Timing: Waxing moon was the main timing signal used here: A steady support phase for tending what is already underway.
- Your check-in: You asked for something for today. You chose enough to engage capacity. This is for you. Your surprise me -> reflection choice matched Carried Key Word.
- Ritual focus: Your focus on saying something clearly matched the selected ritual shape.
- Ritual fit: Carried Key Word was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: A key can mark threshold and return without promising luck or protection. Close when the key is carried or returned. It also matched home tending and reflection.
- Profile fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This fits a steady week by staying practical and about twenty minutes or less.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waxing Moon card; Carried Key Word pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Decision/debug summary:

- Summary: undefined
- Numerology diagnostic: computed_unmatched
- Practice-choice diagnostic: resolved_open_preference
- Top positive score reasons:
  - undefined Ritual form match (written/folded/container)
  - undefined Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
  - undefined Check-in intention match (Saying something clearly)
  - undefined Check-in practice match (reflection, naming)
  - undefined Preferred style match (home_tending)
- Top rejected near alternatives:
  - table_reset / Table Reset: undefined Avoided style conflict (heavy_cleanup)
  - room_reset / Room Reset: undefined Not approved (approval status is reviewed)
  - close_the_evening / Close the Evening: undefined Not approved (approval status is reviewed); undefined Capacity mode mismatch (steady is not supported by this pattern)
  - one_clear_sentence / One Clear Sentence: undefined Not approved (approval status is reviewed)
  - simple_warm_drink / Simple Warm Drink: undefined Not approved (approval status is reviewed)
- Automatic warnings: none
- Awkward parts to review: No obvious awkward part from diagnostics; still needs human voice/meaning review.


## 10. Source / Content and Presentation Notes

#183 did not intentionally change SourceReviews, SourceNotes, SymbolicCards, RitualPatterns, RitualPresentation copy, carry prompts, optional add-ons, or source summaries. It changed selection/scoring and diagnostics only.

Source/content checks from the report:

- SourceNote inventory no longer shows `undefined: undefined` in the recommendation-quality report.
- Raw source IDs still appear in diagnostic inventory sections, which are developer/report output, not normal user copy.
- Normal-copy warning count for source IDs: 0.
- Normal-copy warning count for debug keys: 0.
- The report still includes source IDs in source coverage by design. User-facing source summaries remain human-readable.

## 11. Remaining Issues / Recommended Next Work

| Remaining issue | Evidence | Recommended next issue |
|---|---|---|
| Honeyed Word may become a new soft default | `honeyed_word` selected 5 scenarios, the highest count tied with `salt_clear_water_release`. | Add a concentration diagnostic for any non-broad pattern that wins too often, not just the two known broad catch-alls. |
| Salt/Clear Water may be pulling Home threshold too broadly | `home.threshold.arrival` selected `salt_clear_water_release`, which matches threshold through salt/water but may be too clearing-weighted for arrival. | Tune threshold/arrival form priority or add a sharper threshold-specific scenario diagnostic. |
| Exact Batch 1 patterns still do not always win | `batch1.reflection.folded_phrase` selects `carried_key_word`, and `batch1.quiet_welcome` selects `honeyed_word`. | Decide whether equivalent form families are enough or whether scenarios need expected preferred pattern plus acceptable alternates. |
| Strong patterns remain unselected | Report lists 11 strong patterns not selected, including bread_at_the_center, clear_the_threshold_bowl, darkening_light, first_day_last_day, folded_phrase_vessel, last_word_first_word. | Add targeted scenarios or demote/hide patterns that are strong on paper but not reachable in practice. |
| Diagnostics still do not distinguish all wrong-form subtypes as warning IDs | Summary buckets like kitchen material missing and threshold form missing are inferred from form-family data, not emitted as dedicated warning IDs. | Add explicit wrong-form warning IDs only after Tim reviews whether these labels are understandable. |
| Source summaries still lean generic | Samples still say they drew from moon cards and broad lunar/domestic sources even when Batch 1 lineage matters. | Continue #155-style presentation/source-summary alignment work. |
| Clean warning counts can still hide product awkwardness | Warning counts are all zero while this packet still identifies awkward matches and over-selection concerns. | Keep human review packet as part of content QA, not only automated warnings. |

## 12. PR Notes Draft

### Summary

- Added ritual-form family matching so recommendation scoring can distinguish material/action fit from broad tag overlap.
- Added form-family score reasons, explicit-category mismatch penalties, ritual-form mismatch penalties, and damping for `two_words_at_the_table` / `full_light_on_the_table` when they do not match the expected form.
- Updated the recommendation-quality report to show selected form family, expected form family, match status, broad-pattern concentration, and strong unselected patterns.
- Added #183 scenarios for plant beginning/rest, kitchen clearing, home steady tending, reflection threshold/release, candle resting/full-light clarity, and seasonal threshold/release.
- Updated docs with the ritual-form reachability model and this human-review packet.

### What improved

- `two_words_at_the_table`: 12 before -> 2 after.
- `full_light_on_the_table`: 8 before -> 3 after.
- Plant + clearing + waning now selects a plant release/removal form.
- Kitchen + beginning now selects a grain/seed/bowl form.
- Reflection + folded/written phrase now selects a written/folded/container family.
- Candle/light + rest now selects banked/darkening light.

### What did not fully improve

- Exact target patterns do not always win; some scenarios now choose equivalents.
- `honeyed_word` and `salt_clear_water_release` are now frequent and should be reviewed for new-default behavior.
- Some strong patterns still never appear in this suite.
- Diagnostics are better but not a substitute for product judgment.

### Validation

- `npm run lint:content`: passed.
- `npm run typecheck`: passed.
- `npm run test`: passed, 26 files and 280 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: passed, 7 tests.
- `npm run recommendation:quality`: passed, 39 scenarios.
- `npm run diagnose:content`: passed, with remaining sampler gaps and set-aside practice diagnostics noted above.
- `npm run check`: passed, including build and 2 Playwright tests.
- `git diff --check`: passed.

### Remaining risks

- Form-family matching may be too broad in some areas, especially written/folded/container and welcome/sweetening.
- Threshold arrival may still lean toward clearing instead of arrival.
- Clean warning counts still do not prove recommendation quality.

### Merge recommendation from Codex

Do not merge solely on tests. Review the generated samples in this packet first. From a technical standpoint, #183 appears to fix the named broad-pattern reachability failures without new sources, new categories, copied source text, or private data. From a product standpoint, it still needs human review around equivalent selections and possible new overuse patterns.
