# Post-#200 Calendar Threshold Timing Review

This packet reviews PR #208 / issue #200. It is meant for Tim and ChatGPT human review before merge.

## 1. PR / Branch Summary

- PR: #208, "Add calendar threshold timing support"
- Branch: `codex/issue-200-calendar-threshold-timing`
- Base branch: `main`
- Implementation commit SHA before this review packet: `979f6a6`
- Issue addressed: #200

Short implementation summary: #200 adds app-computed first-day, last-day, and month-turn timing facts, approved timing interpretation rules for those facts, week look-ahead support, recommendation-quality scenarios, content diagnostics coverage, and docs. Calendar timing can now shape existing threshold and first/last ritual forms without adding new active content.

Pre-merge cleanup patch: calendar thresholds and other date-derived timing facts now respect the supplied timing timezone, or the runtime local timezone by default. Calendar-threshold language now surfaces in `Why this fits` and the expanded Timing explanation when a first-day, last-day, or month-turn signal materially shapes the recommendation.

Files changed by purpose:

- Timing logic: `src/lib/timing-facts.ts`, `src/lib/timing-interpretation-rules.ts`, `src/lib/timing-window-candidates.ts`
- Recommendation integration: `src/lib/generate-weekly-brief.ts`
- Diagnostics / report: `src/lib/content-reachability.ts`
- Scenarios / fixtures: `tests/fixtures/recommendation-quality-scenarios.ts`
- Tests: `tests/unit/timing-facts.test.ts`, `tests/unit/timing-interpretation-rules.test.ts`, `tests/unit/timing-window-candidates.test.ts`, `tests/unit/recommendation-quality-report.test.ts`
- Docs: `docs/timing-engine-decision.md`, `docs/data-model.md`, `docs/recommendation-decision-model.md`
- Content changes: none. No active SourceNotes, SymbolicCards, RitualPatterns, or RitualPresentation were added.

Scope statements:

- Active SourceNotes added: no
- SymbolicCards added: no
- RitualPatterns added/revised/demoted: no
- RitualPresentation changed: no
- Scoring changed: yes, only timing-window candidate scoring for `calendar_threshold` facts, so month-turn can beat a generic daily lunar baseline but not exact lunation-level timing.
- UI changed: no
- New visible categories added: no
- Named holiday/date-lore content added: no
- Source wording copied: no
- Warnings weakened or removed: no

## 2. Timing Behavior Added

The system now computes `calendar_threshold` timing facts in `src/lib/timing-facts.ts`.

Detection behavior:

- First day of calendar month: emitted when the local day-of-month in the supplied timing timezone is `1`.
- Last day of calendar month: emitted when the local day-of-month equals the computed last local date of that month.
- Month turn / month boundary: emitted on both the first and last local day of a month.
- First/last day of week: deferred. The existing timing model does not need this yet, and #200 did not add week-boundary facts.
- Seasonal entry / seasonal boundary: existing solstice/equinox support remains. #200 did not add new seasonal boundary logic or cross-quarter dates.

Timezone and boundaries:

- Facts use household-local date boundaries for MVP.
- Each calendar threshold fact has start/end/exact ISO fields for the local day boundary represented as UTC instants.
- The app uses the supplied timing timezone when present, otherwise the runtime local timezone. No private schedule or availability is inferred.
- Leap-year February is handled by local calendar month-end calculation.
- December 31 and January 1 are handled as ordinary month boundaries; no New Year folklore or holiday feed is added.

Where signals apply:

- Today path: first-day, last-day, and month-turn signals can appear among selected timing signals when they fit the selected ritual context.
- Across-the-week path: month-boundary facts can appear as timing-window candidates and can be selected when they are the strongest available fit.

Product boundary: calendar timing shapes the ritual; it is not the ritual.

## 3. Validation Commands

- `npm run lint:content`: pass. Content lint passed with no findings.
- `npm run typecheck`: pass. TypeScript completed with no errors.
- `npm run test`: pass. 26 test files, 296 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: pass. 1 test file, 8 tests.
- `npm run recommendation:quality`: pass. Report generated; scenario count is 42.
- `npm run diagnose:content`: pass. Computed timing fact coverage now includes `calendar_threshold`.
- `npm run check`: pass. Includes content lint, typecheck, build, unit tests, and Playwright e2e. Vite still reports the existing chunk-size warning; it does not fail the build.

No validation command is currently failing.

## 4. Unit Test / Edge Case Table

| Case | Input date/time | Expected timing fact | Actual | Pass/fail |
|---|---|---|---|---|
| First day of a 31-day month | `2026-07-01T12:00:00.000Z` | first_day_of_month + month_turn | first_day_of_month (First day of July); month_turn (Month turn into July) | pass |
| Last day of a 31-day month | `2026-07-31T12:00:00.000Z` | last_day_of_month + month_turn | last_day_of_month (Last day of July); month_turn (Month turn out of July) | pass |
| First day of a 30-day month | `2026-06-01T12:00:00.000Z` | first_day_of_month + month_turn | first_day_of_month (First day of June); month_turn (Month turn into June) | pass |
| Last day of a 30-day month | `2026-06-30T12:00:00.000Z` | last_day_of_month + month_turn | last_day_of_month (Last day of June); month_turn (Month turn out of June) | pass |
| February 1 | `2027-02-01T12:00:00.000Z` | first_day_of_month + month_turn | first_day_of_month (First day of February); month_turn (Month turn into February) | pass |
| February 28 non-leap year | `2027-02-28T12:00:00.000Z` | last_day_of_month + month_turn | last_day_of_month (Last day of February); month_turn (Month turn out of February) | pass |
| February 29 leap year | `2028-02-29T12:00:00.000Z` | last_day_of_month + month_turn | last_day_of_month (Last day of February); month_turn (Month turn out of February) | pass |
| December 31 | `2026-12-31T12:00:00.000Z` | last_day_of_month + month_turn | last_day_of_month (Last day of December); month_turn (Month turn out of December) | pass |
| January 1 | `2027-01-01T12:00:00.000Z` | first_day_of_month + month_turn | first_day_of_month (First day of January); month_turn (Month turn into January) | pass |
| Middle-of-month ordinary day | `2026-07-15T12:00:00.000Z` | none | none | pass |
| Denver local boundary before July | `2026-07-01T01:00:00.000Z` with `America/Denver` | last_day_of_month + month_turn for June 30 | last_day_of_month (Last day of June); month_turn (Month turn out of June); no First day of July | pass |
| Denver local boundary after July starts | `2026-07-01T06:00:00.000Z` with `America/Denver` | first_day_of_month + month_turn for July 1 | first_day_of_month (First day of July); month_turn (Month turn into July) | pass |
| Denver local last day after UTC crossed August | `2026-08-01T01:00:00.000Z` with `America/Denver` | last_day_of_month + month_turn for July 31 | last_day_of_month (Last day of July); month_turn (Month turn out of July); no First day of August | pass |
| Denver local month-turn timing window | `2026-07-31T00:00:00.000Z` with `America/Denver` | month-turn candidate starts at Denver local midnight | Month turn out of July starts at `2026-07-31T06:00:00.000Z` | pass |

Note: UTC instants are still used for storage and exact event comparison, but date-derived facts are evaluated against the household-local calendar date.

## 5. Before / After Recommendation-Quality Comparison

Main before #200:

- Scenario count: 39
- Distinct selected patterns: 19
- Warning counts:
- pause_with_imperative_steps: 0
- generic_optional_candle: 0
- candle_ritual_with_candle_addon: 0
- focus_timing_unbridged: 0
- raw_score_language_in_user_copy: 0
- debug_key_in_user_copy: 0
- generic_closing_repeated: 0
- carry_prompt_contradicts_focus: 0
- best_window_reason_too_thin: 0
- source_id_visible_in_normal_copy: 0
- missing_presentation_selected: 0
- task_dressed_pattern_selected: 0
- surprise_me_unresolved: 0

Current branch:

- Scenario count: 42
- Distinct selected patterns: 21
- Warning counts:
- pause_with_imperative_steps: 0
- generic_optional_candle: 0
- candle_ritual_with_candle_addon: 0
- focus_timing_unbridged: 0
- raw_score_language_in_user_copy: 0
- debug_key_in_user_copy: 0
- generic_closing_repeated: 0
- carry_prompt_contradicts_focus: 0
- best_window_reason_too_thin: 0
- source_id_visible_in_normal_copy: 0
- missing_presentation_selected: 0
- task_dressed_pattern_selected: 0
- surprise_me_unresolved: 0

Top selected patterns before:

- carried_key_word: 4
- first_light_at_the_threshold: 4
- honeyed_word: 4
- full_light_on_the_table: 3
- salt_clear_water_release: 3
- seasonal_marker_bowl: 3
- bank_the_house_light: 2
- plant_witness_to_growth: 2
- seed_waiting: 2
- two_words_at_the_table: 2

Top selected patterns after:

- first_light_at_the_threshold: 5
- carried_key_word: 4
- honeyed_word: 4
- full_light_on_the_table: 3
- salt_clear_water_release: 3
- bank_the_house_light: 2
- clear_the_threshold_bowl: 2
- plant_witness_to_growth: 2
- seasonal_marker_bowl: 2
- seed_waiting: 2

Pattern concentration review before:

- carried_key_word: 4
- first_light_at_the_threshold: 4
- honeyed_word: 4

Pattern concentration review after:

- first_light_at_the_threshold: 5
- carried_key_word: 4
- honeyed_word: 4

Scenarios where selected pattern changed:

| Scenario | Before | After |
|---|---|---|
| issue183.seasonal.entry_release | seasonal_marker_bowl | clear_the_threshold_bowl |

New #200 scenarios:

| Scenario | Selected pattern | Selected timing signals | Selected timing window |
|---|---|---|---|
| calendar.first_day.threshold_word | first_light_at_the_threshold | Full moon; First day of the month — threshold and first word; Numerology 9 | none |
| calendar.last_day.closing_bowl | clear_the_threshold_bowl | Full moon; Last day of the month — closing and return; Numerology 3 | none |
| calendar.month_turn.best_week | first_day_last_day | Full moon; Month turn — crossing between months; Numerology 9 | Month turn out of August |

Timing-related diagnostics:

- Recommendation-quality report includes `First day of the month — threshold and first word`, `Last day of the month — closing and return`, and `Month turn — crossing between months`.
- Content reachability diagnostics include computed timing fact type `calendar_threshold`.
- No raw `timing.calendar_threshold.*` keys appear in normal generated copy.

Regression check:

- Main warning counts remain zero after #200.
- One existing scenario changed: `issue183.seasonal.entry_release` moved from `seasonal_marker_bowl` to `clear_the_threshold_bowl`. That is plausible because the scenario asks for seasonal threshold / clearing and `clear_the_threshold_bowl` is a closing/emptying threshold form. It should still get human review.
- Pattern concentration shifted slightly: `first_light_at_the_threshold` increased from 4 to 5 selections. Watch this, but it is not an obvious blocker because two new calendar-threshold scenarios were added.

## 6. Calendar-Threshold Scenario Table

| Scenario | Check-in inputs | Date/time | Timing facts | Selected pattern | Selected ritual-form family | Expected behavior | Result | Notes |
|---|---|---|---|---|---|---|---|---|
| today.first_day / Today is first day of month | Reflection; Marking a threshold; low; me; today | `2026-07-01T12:00:00.000Z` | First day of July; Month turn into July | first_light_at_the_threshold | first light / threshold, threshold/crossing/bowl/key | First-day signal appears; it shapes but does not override ritual. | pass | signals: First day of the month — threshold and first word; window: none |
| today.last_day / Today is last day of month | Seasonal; Clearing something out; low; me; today | `2026-07-31T12:00:00.000Z` | Last day of July; Month turn out of July | clear_the_threshold_bowl | threshold/crossing/bowl/key, salt/water release, seasonal marker | Last-day signal appears; closure/emptying/last-word forms become more appropriate. | pass | signals: Last day of the month — closing and return; window: none |
| today.middle_month / Today is middle of month | Home; Getting grounded; low; me; today | `2026-07-15T12:00:00.000Z` | none | first_light_at_the_threshold | first light / threshold, threshold/crossing/bowl/key | No fake calendar-threshold signal appears. | pass | signals: none surfaced; window: none |
| week.month_boundary / Best moment this week includes month boundary | Home; Marking a threshold; steady; both_of_us; best_moment_this_week | `2026-08-29T12:00:00.000Z` | none | first_day_last_day | first/last threshold, seasonal marker | Boundary can be selected as best moment if it fits. | pass | signals: Month turn — crossing between months; window: none |
| seasonal.month_turn / Seasonal + month turn | Seasonal; Marking a threshold; low; both_of_us; today | `2026-08-31T12:00:00.000Z` | Last day of August; Month turn out of August | seasonal_marker_bowl | seasonal marker, welcome/offering/vessel | Seasonal threshold feels private, not holiday-feed. | pass | signals: Last day of the month — closing and return; window: none |
| reflection.first_word / Reflection + first word | Reflection; Making a beginning; low; me; today | `2026-07-01T12:00:00.000Z` | First day of July; Month turn into July | last_word_first_word | first/last threshold, written/folded/container | First-word/opening form is supported. | pass | signals: First day of the month — threshold and first word; window: none |
| reflection.last_word / Reflection + last word | Reflection; Clearing something out; low; me; today | `2026-07-31T12:00:00.000Z` | Last day of July; Month turn out of July | waning_phrase_release | waning phrase/release, written/folded/container | Last-word/closing form is supported. | pass | signals: Last day of the month — closing and return; window: none |
| home.threshold.month_turn / Home + threshold + month turn | Home; Marking a threshold; steady; me; today | `2026-08-31T12:00:00.000Z` | Last day of August; Month turn out of August | clear_the_threshold_bowl | threshold/crossing/bowl/key, salt/water release, seasonal marker | Threshold/key/entry forms are supported without generic fallback. | pass | signals: Last day of the month — closing and return; window: none |
| kitchen.month_turn / Kitchen + month turn | Kitchen; Making a beginning; low; me; today | `2026-08-31T12:00:00.000Z` | Last day of August; Month turn out of August | grain_bowl_beginning | grain/seed/bowl, seasonal marker, bread/grain center | Bread/grain/table forms may be supported only if category/focus fit. | pass | signals: Month turn — crossing between months; window: none |
| candle.last_day / Candle/light + last day | Candle or light; Resting; low; me; today | `2026-07-31T12:00:00.000Z` | Last day of July; Month turn out of July | bank_the_house_light | banked/darkening light | Banked/darkening/closing light may be supported only if focus fits. | pass | signals: Last day of the month — closing and return; window: none |
| surprise.month_turn / Surprise me + month turn | Surprise me; Marking a threshold; steady; me; today | `2026-08-31T12:00:00.000Z` | Last day of August; Month turn out of August | clear_the_threshold_bowl | threshold/crossing/bowl/key, salt/water release, seasonal marker | Surprise me resolves to a visible practice before timing is used. | pass | signals: Last day of the month — closing and return; window: none |

Important read: the ad-hoc `week.month_boundary` row is supplemental. The official recommendation-quality scenario `calendar.month_turn.best_week` is the stronger evidence for selected across-week timing, because it records `Month turn out of August` as the selected timing window.

## 7. Generated Recommendation Samples

The following samples are copied from the post-#200 recommendation-quality report. Awkward or weak parts are intentionally left in place.

### calendar.first_day.threshold_word: First day supports a threshold word

Purpose: Checks that first-day timing can shape a private threshold or first-word form without becoming date trivia.

Input summary:

- Date: 2026-07-01T12:00:00.000Z
- Time scope: today
- Energy/capacity: a_little / low
- Audience: me
- Practice: Reflection
- Focus: Marking a threshold
- Expected qualities: first-day timing is human-readable, threshold form is supported, no named-day folklore
- Disallowed outcomes: holiday feed, calendar trivia, deterministic timing instruction

Generated recommendation:

- Selected ritual pattern: first_light_at_the_threshold / First Light at the Threshold
- Selected ritual form family: first light / threshold, threshold/crossing/bowl/key
- Expected ritual form family: written/folded/container, carried phrase, spoken/table phrase, threshold/crossing/bowl/key, first light / threshold, first/last threshold
- Ritual form family matched: yes
- Theme/title: Let first light mark the threshold.
- Recommended ritual: Use light as the first mark, not as pressure. Let the doorway, window, or table hold the beginning. Stand at a doorway, window, or table with one light present. Name the first step in one plain phrase. Cross the threshold or turn from the light to close the opening. Close by crossing once or turning away before the beginning grows larger.
- Intention: Let first light mark the threshold.
- Best window: When you have five quiet minutes.
- Optional add-on: No add-on needed.
- Reflection/carry prompt: What is the first step small enough to cross with?
- Why this fits: Full moon shaped the timing tone. Your reflection choice helped point toward First Light at the Threshold. It also fits saved preferences for candle or light and threshold reset.

How this was chosen:

- Timing: Full moon was the main timing signal used here: A visible point for noticing clarity, gratitude, or what is complete.
- Numerology accent: Numerology 9 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your reflection choice matched First Light at the Threshold.
- Ritual focus: Your focus on marking a threshold matched the selected ritual shape.
- Ritual fit: First Light at the Threshold was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: Kindling and first-sighting traditions make a beginning visible before it becomes a project. Close by crossing once or turning away before the beginning grows larger. It also matched candle or light and threshold reset and home tending.
- Profile fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from household fire-kindling and first-light logic; Full Moon card; First Light at the Threshold pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Signals and diagnostics:

- Selected timing signals: Full moon, First day of the month — threshold and first word, Numerology 9
- Selected timing window: none
- Numerology diagnostic status: matched_selected
- Practice-choice diagnostic status: matched_selected_pattern

Top positive score reasons:

- +12 Ritual form match (first light / threshold, threshold/crossing/bowl/key)
- +8 Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
- +5 Check-in intention match (Marking a threshold)
- +4 Check-in practice match (threshold_reset)
- +3 Preferred style match (candle_or_light)

Top rejected near alternatives:

- table_reset / Table Reset: -10 Too long for capacity (15 minutes exceeds the current 5-minute limit); -20 Avoided style conflict (heavy_cleanup)
- threshold_reset / Threshold Reset: -10 Too long for capacity (10 minutes exceeds the current 5-minute limit)
- room_reset / Room Reset: -99 Not approved (approval status is reviewed); -10 Too long for capacity (10 minutes exceeds the current 5-minute limit)
- close_the_evening / Close the Evening: -99 Not approved (approval status is reviewed)
- one_clear_sentence / One Clear Sentence: -99 Not approved (approval status is reviewed)

Automatic warnings:

- none

Human review notes:

### calendar.last_day.closing_bowl: Last day supports closing or emptying

Purpose: Checks that last-day timing can support closing, return, or vessel emptying without overriding capacity.

Input summary:

- Date: 2026-07-31T12:00:00.000Z
- Time scope: today
- Energy/capacity: a_little / low
- Audience: me
- Practice: Seasonal
- Focus: Clearing something out
- Expected qualities: last-day timing is visible, closing or emptying form is supported, no public festival script
- Disallowed outcomes: holiday feed, protection claim, calendar timing as requirement

Generated recommendation:

- Selected ritual pattern: clear_the_threshold_bowl / Clear the Threshold Bowl
- Selected ritual form family: threshold/crossing/bowl/key, salt/water release, seasonal marker
- Expected ritual form family: seasonal marker, first/last threshold, threshold/crossing/bowl/key, salt/water release, plant release/removal, waning phrase/release
- Ritual form family matched: yes
- Theme/title: Empty the threshold bowl.
- Recommended ritual: Let emptying be the action. Do not add new meaning while closing the old one. Choose a bowl or vessel that has been holding a marker. Name what is finished or ready to leave. Empty, wash, or return the bowl. Close when the bowl is clean or back in its place.
- Intention: Empty the threshold bowl.
- Best window: When you have five quiet minutes.
- Optional add-on: No add-on needed.
- Reflection/carry prompt: What changes when the vessel is empty again?
- Why this fits: Full moon shaped the timing tone. Your seasonal choice helped point toward Clear the Threshold Bowl. It also fits saved preferences for home tending and seasonal.

How this was chosen:

- Timing: Full moon was the main timing signal used here: A visible point for noticing clarity, gratitude, or what is complete.
- Numerology accent: Numerology 3 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your seasonal choice matched Clear the Threshold Bowl.
- Ritual focus: Your focus on clearing something out matched the selected ritual shape.
- Ritual fit: Clear the Threshold Bowl was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: A vessel can release by being emptied, washed, and returned to ordinary use. Close when the bowl is clean or back in its place. It also matched home tending and seasonal and threshold reset.
- Profile fit: Saved profile and natal-chart themes for Person A fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Full Moon card; Clear the Threshold Bowl pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Signals and diagnostics:

- Selected timing signals: Full moon, Last day of the month — closing and return, Numerology 3
- Selected timing window: none
- Numerology diagnostic status: matched_selected
- Practice-choice diagnostic status: matched_selected_pattern

Top positive score reasons:

- +12 Ritual form match (threshold/crossing/bowl/key, salt/water release, seasonal marker)
- +8 Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action)
- +5 Check-in intention match (Clearing something out)
- +4 Check-in practice match (seasonal, threshold_reset)
- +3 Preferred style match (home_tending)

Top rejected near alternatives:

- table_reset / Table Reset: -10 Too long for capacity (15 minutes exceeds the current 5-minute limit); -20 Avoided style conflict (heavy_cleanup)
- threshold_reset / Threshold Reset: -10 Too long for capacity (10 minutes exceeds the current 5-minute limit)
- room_reset / Room Reset: -99 Not approved (approval status is reviewed); -10 Too long for capacity (10 minutes exceeds the current 5-minute limit)
- close_the_evening / Close the Evening: -99 Not approved (approval status is reviewed)
- one_clear_sentence / One Clear Sentence: -99 Not approved (approval status is reviewed)

Automatic warnings:

- none

Human review notes:

### calendar.month_turn.best_week: Month turn can be the best timing window

Purpose: Checks that across-the-week timing can choose a month boundary when it is the strongest available threshold signal.

Input summary:

- Date: 2026-08-29T12:00:00.000Z
- Time scope: best_moment_this_week
- Energy/capacity: enough_to_engage / steady
- Audience: both_of_us
- Practice: Home
- Focus: Marking a threshold
- Expected qualities: month-turn timing reason is clear, calendar threshold shapes but does not become the ritual, no fake schedule assumption
- Disallowed outcomes: Thursday evening as fake schedule, named-day folklore, calendar trivia feed

Generated recommendation:

- Selected ritual pattern: first_day_last_day / First Day / Last Day
- Selected ritual form family: first/last threshold, seasonal marker
- Expected ritual form family: threshold/crossing/bowl/key, first light / threshold, first/last threshold
- Ritual form family matched: yes
- Theme/title: Give the threshold a first word and a last word.
- Recommended ritual: Keep the words plain. Let the threshold hold the change. Name one last word for what is ending. Name one first word for what is beginning. Speak or place both at a doorway, table, or bowl. Close by crossing once or folding the words away.
- Intention: Give the threshold a first word and a last word.
- Best window: Around Monday, August 31. When you have a little space this week.
- Optional add-on: No add-on needed.
- Reflection/carry prompt: What word closes, and what word opens?
- Why this fits: Monday, August 31 stood out as the strongest timing window this week. Your home choice helped point toward First Day / Last Day. It also fits saved preferences for seasonal and reflection.

How this was chosen:

- Timing: Monday, August 31 was the strongest timing window in the next several days. The window stood out because of calendar threshold.
- Numerology accent: Numerology 9 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked to look across the week. You chose enough to engage capacity. This is for both of you. Your home choice matched First Day / Last Day.
- Ritual focus: Your focus on marking a threshold matched the selected ritual shape.
- Ritual fit: First Day / Last Day was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: Calendar customs can become private first-and-last markers without becoming a holiday feed. Close by crossing once or folding the words away. It also matched seasonal and reflection and threshold reset.
- Profile fit: For a together recommendation, saved profile and natal-chart themes for Person A and Person B balance clear structure and bounded action with warmth, beauty, and affection. This is used as fit context for both profiles together, not as a prediction.
- Capacity boundary: This fits a steady week by staying practical and about twenty minutes or less.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Full Moon card; First Day / Last Day pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Signals and diagnostics:

- Selected timing signals: Full moon, Month turn — crossing between months, Numerology 9
- Selected timing window: Month turn out of August; Around Monday, August 31.; strong=true; reasons=Calendar threshold, supporting timing signal
- Numerology diagnostic status: matched_selected
- Practice-choice diagnostic status: matched_selected_pattern

Top positive score reasons:

- +12 Ritual form match (first/last threshold)
- +8 Private profile theme match (natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
- +5 Check-in intention match (Marking a threshold)
- +4 Check-in practice match (threshold_reset)
- +3 Check-in audience match (both_of_us)

Top rejected near alternatives:

- table_reset / Table Reset: -20 Avoided style conflict (heavy_cleanup)
- room_reset / Room Reset: -99 Not approved (approval status is reviewed)
- close_the_evening / Close the Evening: -99 Not approved (approval status is reviewed); -20 Capacity mode mismatch (steady is not supported by this pattern)
- one_clear_sentence / One Clear Sentence: -99 Not approved (approval status is reviewed)
- simple_warm_drink / Simple Warm Drink: -99 Not approved (approval status is reviewed)

Automatic warnings:

- none

Human review notes:

### batch1.seasonal.marker_bowl: Seasonal marker bowl

Purpose: Checks seasonal content as private bowl/threshold marker, not holiday feed.

Input summary:

- Date: 2026-10-31T12:00:00.000Z
- Time scope: today
- Energy/capacity: a_little / low
- Audience: both_of_us
- Practice: Seasonal
- Focus: Marking a threshold
- Expected qualities: private seasonal marker, ordinary material, no festival reenactment
- Disallowed outcomes: holiday-feed behavior, spooky novelty

Generated recommendation:

- Selected ritual pattern: seasonal_marker_bowl / Seasonal Marker Bowl
- Selected ritual form family: seasonal marker, welcome/offering/vessel
- Expected ritual form family: seasonal marker, first/last threshold, threshold/crossing/bowl/key, first light / threshold
- Ritual form family matched: yes
- Theme/title: Let one bowl mark the season.
- Recommended ritual: Use one ordinary material. Let the bowl hold the season without decorating the house. Place one grain, leaf, key, bread piece, or ordinary object in a small bowl. Name what this season is asking the home to hold, begin, or release. Leave the bowl briefly, or empty it when the phrase feels complete. Close by placing, returning, or emptying the bowl.
- Intention: Let one bowl mark the season.
- Best window: When you have five quiet minutes.
- Optional add-on: Choose when the bowl will be emptied or returned.
- Reflection/carry prompt: What season is this home actually in?
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
- Sources: This drew from seasonal bowl and household-threshold customs; Waning Moon card; Seasonal Marker Bowl pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Signals and diagnostics:

- Selected timing signals: Waning moon, Last day of the month — closing and return, Numerology 6
- Selected timing window: none
- Numerology diagnostic status: matched_selected
- Practice-choice diagnostic status: matched_selected_pattern

Top positive score reasons:

- +12 Ritual form match (seasonal marker)
- +8 Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
- +5 Check-in intention match (Marking a threshold)
- +4 Check-in practice match (seasonal)
- +3 Check-in audience match (both_of_us)

Top rejected near alternatives:

- table_reset / Table Reset: -10 Too long for capacity (15 minutes exceeds the current 5-minute limit); -20 Avoided style conflict (heavy_cleanup)
- threshold_reset / Threshold Reset: -10 Too long for capacity (10 minutes exceeds the current 5-minute limit)
- room_reset / Room Reset: -99 Not approved (approval status is reviewed); -10 Too long for capacity (10 minutes exceeds the current 5-minute limit)
- close_the_evening / Close the Evening: -99 Not approved (approval status is reviewed)
- one_clear_sentence / One Clear Sentence: -99 Not approved (approval status is reviewed)

Automatic warnings:

- none

Human review notes:

### issue183.seasonal.entry_release: Seasonal entry or release uses seasonal threshold

Purpose: Checks that Seasonal + threshold/clearing reaches seasonal marker, entry, first-last, or threshold form.

Input summary:

- Date: 2026-10-31T12:00:00.000Z
- Time scope: today
- Energy/capacity: enough_to_engage / steady
- Audience: both_of_us
- Practice: Seasonal
- Focus: Marking a threshold
- Expected qualities: seasonal threshold material, not generic table speech
- Disallowed outcomes: holiday feed, full-light catch-all

Generated recommendation:

- Selected ritual pattern: clear_the_threshold_bowl / Clear the Threshold Bowl
- Selected ritual form family: threshold/crossing/bowl/key, salt/water release, seasonal marker
- Expected ritual form family: seasonal marker, first/last threshold, threshold/crossing/bowl/key, first light / threshold
- Ritual form family matched: yes
- Theme/title: Empty the threshold bowl.
- Recommended ritual: Let emptying be the action. Do not add new meaning while closing the old one. Choose a bowl or vessel that has been holding a marker. Name what is finished or ready to leave. Empty, wash, or return the bowl. Close when the bowl is clean or back in its place.
- Intention: Empty the threshold bowl.
- Best window: When you have a little space this week.
- Optional add-on: No add-on needed.
- Reflection/carry prompt: What changes when the vessel is empty again?
- Why this fits: Waning moon shaped the timing tone. Your seasonal choice helped point toward Clear the Threshold Bowl. It also fits saved preferences for home tending and seasonal.

How this was chosen:

- Timing: Waning moon was the main timing signal used here: A settling phase for clearing, integrating, releasing, or resting.
- Numerology accent: Numerology 6 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose enough to engage capacity. This is for both of you. Your seasonal choice matched Clear the Threshold Bowl.
- Ritual focus: Your focus on marking a threshold matched the selected ritual shape.
- Ritual fit: Clear the Threshold Bowl was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: A vessel can release by being emptied, washed, and returned to ordinary use. Close when the bowl is clean or back in its place. It also matched home tending and seasonal and threshold reset.
- Profile fit: For a together recommendation, saved profile and natal-chart themes for Person A balance practical home-tending magic with clear structure and bounded action. This is used as fit context for both profiles together, not as a prediction.
- Capacity boundary: This fits a steady week by staying practical and about twenty minutes or less.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from Waning Moon card; Clear the Threshold Bowl pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Signals and diagnostics:

- Selected timing signals: Waning moon, Last day of the month — closing and return, Numerology 6
- Selected timing window: none
- Numerology diagnostic status: matched_selected
- Practice-choice diagnostic status: matched_selected_pattern

Top positive score reasons:

- +12 Ritual form match (threshold/crossing/bowl/key, seasonal marker)
- +7 Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action)
- +5 Check-in intention match (Marking a threshold)
- +4 Check-in practice match (seasonal)
- +3 Check-in audience match (both_of_us)

Top rejected near alternatives:

- table_reset / Table Reset: -20 Avoided style conflict (heavy_cleanup)
- room_reset / Room Reset: -99 Not approved (approval status is reviewed)
- close_the_evening / Close the Evening: -99 Not approved (approval status is reviewed); -20 Capacity mode mismatch (steady is not supported by this pattern)
- one_clear_sentence / One Clear Sentence: -99 Not approved (approval status is reviewed)
- simple_warm_drink / Simple Warm Drink: -99 Not approved (approval status is reviewed)

Automatic warnings:

- none

Human review notes:

### batch1.kitchen.grain_beginning: Kitchen grain bowl beginning

Purpose: Checks kitchen beginning as grain/seed vessel, not recipe work.

Input summary:

- Date: 2026-06-18T12:00:00.000Z
- Time scope: today
- Energy/capacity: enough_to_engage / steady
- Audience: both_of_us
- Practice: Kitchen
- Focus: Making a beginning
- Expected qualities: grain/seed material logic, table presence, no recipe burden
- Disallowed outcomes: recipe spell, food health advice

Generated recommendation:

- Selected ritual pattern: grain_bowl_beginning / Grain Bowl Beginning
- Selected ritual form family: grain/seed/bowl, seasonal marker, bread/grain center
- Expected ritual form family: grain/seed/bowl
- Ritual form family matched: yes
- Theme/title: Give the beginning a grain bowl.
- Recommended ritual: Use one ordinary kitchen material. Let the bowl hold the start so you do not have to push it. Place a pinch of grain, rice, oats, bean, or seed in a small bowl. Name the beginning in one sentence. Set the bowl at the table or return the grain when the phrase is complete. Close by placing the bowl or returning the grain to ordinary use.
- Intention: Give the beginning a grain bowl.
- Best window: When you have a little space this week.
- Optional add-on: Let the bowl stay in place until the beginning has been named.
- Reflection/carry prompt: What beginning can be held before it is acted on?
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
- Sources: This drew from grain/table household rhythm; Waxing Moon card; Grain Bowl Beginning pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Signals and diagnostics:

- Selected timing signals: Waxing moon, Summer solstice — light and tending, Numerology 7
- Selected timing window: none
- Numerology diagnostic status: matched_selected
- Practice-choice diagnostic status: matched_selected_pattern

Top positive score reasons:

- +12 Ritual form match (grain/seed/bowl)
- +8 Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
- +4 Check-in practice match (kitchen)
- +3 Check-in audience match (both_of_us)
- +3 Preferred style match (kitchen)

Top rejected near alternatives:

- table_reset / Table Reset: -20 Avoided style conflict (heavy_cleanup)
- room_reset / Room Reset: -99 Not approved (approval status is reviewed)
- close_the_evening / Close the Evening: -99 Not approved (approval status is reviewed); -20 Capacity mode mismatch (steady is not supported by this pattern)
- one_clear_sentence / One Clear Sentence: -99 Not approved (approval status is reviewed)
- simple_warm_drink / Simple Warm Drink: -99 Not approved (approval status is reviewed)

Automatic warnings:

- none

Human review notes:

### home.threshold.arrival: Threshold or arrival ritual coherence

Purpose: Checks home threshold content as a single ritual rather than fragments.

Input summary:

- Date: 2026-09-22T12:00:00.000Z
- Time scope: today
- Energy/capacity: enough_to_engage / steady
- Audience: me
- Practice: Home
- Focus: Marking a threshold
- Expected qualities: title, body, and carry prompt align
- Disallowed outcomes: unrelated fragments stitched together

Generated recommendation:

- Selected ritual pattern: carried_key_word / Carried Key Word
- Selected ritual form family: carried phrase, threshold/crossing/bowl/key, written/folded/container
- Expected ritual form family: threshold/crossing/bowl/key, first light / threshold, first/last threshold
- Ritual form family matched: yes
- Theme/title: Let the key carry one word.
- Recommended ritual: Use an ordinary object that can safely return to use. Keep the word portable. Hold a key or small household object. Say or write one word for what should cross with you. Carry it briefly or return it to its place. Close when the key is carried or returned.
- Intention: Let the key carry one word.
- Best window: When you have a little space this week.
- Optional add-on: Return the key to its ordinary place when the word has crossed.
- Reflection/carry prompt: What word can cross the threshold with you?
- Why this fits: Waxing moon shaped the timing tone. Your home choice helped point toward Carried Key Word. It also fits saved preferences for home tending and reflection.

How this was chosen:

- Timing: Waxing moon was the main timing signal used here: A steady support phase for tending what is already underway.
- Your check-in: You asked for something for today. You chose enough to engage capacity. This is for you. Your home choice matched Carried Key Word.
- Ritual focus: Your focus on marking a threshold matched the selected ritual shape.
- Ritual fit: Carried Key Word was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: A key can mark threshold and return without promising luck or protection. Close when the key is carried or returned. It also matched home tending and reflection and threshold reset.
- Profile fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This fits a steady week by staying practical and about twenty minutes or less.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from key, threshold, and household marker folklore; Waxing Moon card; Carried Key Word pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Signals and diagnostics:

- Selected timing signals: Waxing moon, Autumn equinox — gratitude and storing, Jupiter in Leo — visible warmth
- Selected timing window: none
- Numerology diagnostic status: computed_unmatched
- Practice-choice diagnostic status: matched_selected_pattern

Top positive score reasons:

- +12 Ritual form match (threshold/crossing/bowl/key)
- +8 Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
- +5 Check-in intention match (Marking a threshold)
- +4 Check-in practice match (home_tending)
- +3 Preferred style match (home_tending)

Top rejected near alternatives:

- table_reset / Table Reset: -20 Avoided style conflict (heavy_cleanup)
- room_reset / Room Reset: -99 Not approved (approval status is reviewed)
- close_the_evening / Close the Evening: -99 Not approved (approval status is reviewed); -20 Capacity mode mismatch (steady is not supported by this pattern)
- one_clear_sentence / One Clear Sentence: -99 Not approved (approval status is reviewed)
- simple_warm_drink / Simple Warm Drink: -99 Not approved (approval status is reviewed)

Automatic warnings:

- none

Human review notes:

### candle.live_flame_avoided: Candle/light with live flame avoided

Purpose: Checks that avoiding live flame produces no-flame behavior where possible.

Input summary:

- Date: 2026-06-03T12:00:00.000Z
- Time scope: today
- Energy/capacity: a_little / low
- Audience: me
- Practice: Candle or light
- Focus: Getting grounded
- Expected qualities: no live flame requirement, ordinary light can count
- Disallowed outcomes: required flame, generic candle add-on

Generated recommendation:

- Selected ritual pattern: first_light_at_the_threshold / First Light at the Threshold
- Selected ritual form family: first light / threshold, threshold/crossing/bowl/key
- Expected ritual form family: banked/darkening light, first light / threshold
- Ritual form family matched: yes
- Theme/title: Let first light mark the threshold.
- Recommended ritual: Use light as the first mark, not as pressure. Let the doorway, window, or table hold the beginning. Stand at a doorway, window, or table with one light present. Name the first step in one plain phrase. Cross the threshold or turn from the light to close the opening. Close by crossing once or turning away before the beginning grows larger.
- Intention: Let first light mark the threshold.
- Best window: When you have five quiet minutes.
- Optional add-on: Let lamp or window light be the whole accent.
- Reflection/carry prompt: What is the first step small enough to cross with?
- Why this fits: Full moon shaped the timing tone. Your candle or light choice helped point toward First Light at the Threshold. It also fits saved preferences for candle or light and light focus.

How this was chosen:

- Timing: Full moon was the main timing signal used here: A visible point for noticing clarity, gratitude, or what is complete.
- Numerology accent: Numerology 7 matched the selected ritual context, so it was allowed in as a small accent. Lunar, timing, capacity, and check-in fit still carried the recommendation.
- Your check-in: You asked for something for today. You chose a little capacity. This is for you. Your candle or light choice matched First Light at the Threshold.
- Ritual focus: Your focus on getting grounded matched the selected ritual shape.
- Ritual fit: First Light at the Threshold was selected as the approved ritual container. It takes about 5 minutes and keeps the action concrete: Kindling and first-sighting traditions make a beginning visible before it becomes a project. Close by crossing once or turning away before the beginning grows larger. It also matched candle or light and light focus and home tending.
- Profile fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags. This is used as fit context for at least one saved profile, not as a prediction.
- Capacity boundary: This stays small because household capacity is low right now.
- Tradeoff: Some approved options were set aside because they did not fit current capacity, safety, preferences, or practical household constraints.
- Sources: This drew from household fire-kindling and first-light logic; Full Moon card; First Light at the Threshold pattern; Sarah Faith Gottesdiener — lunar reflection source; Rachel Patterson — lunar/domestic magic source.

Signals and diagnostics:

- Selected timing signals: Full moon, Mercury in Cancer — careful words for home, Numerology 7
- Selected timing window: none
- Numerology diagnostic status: matched_selected
- Practice-choice diagnostic status: matched_selected_pattern

Top positive score reasons:

- +12 Ritual form match (first light / threshold)
- +8 Private profile theme match (profile_theme.person_a.private_profile.practical_tending, natal_theme.person_a.private_profile.structured_action, profile_theme.person_b.private_profile.beauty_warmth, natal_theme.person_b.private_profile.beauty_warmth)
- +5 Check-in intention match (Getting grounded)
- +4 Check-in practice match (candle_or_light, light_focus)
- +3 Preferred style match (candle_or_light)

Top rejected near alternatives:

- candle_light_focus / Candle Light Focus: -20 Avoided style conflict (live_flame)
- table_reset / Table Reset: -10 Too long for capacity (15 minutes exceeds the current 5-minute limit); -20 Avoided style conflict (heavy_cleanup)
- threshold_reset / Threshold Reset: -10 Too long for capacity (10 minutes exceeds the current 5-minute limit)
- room_reset / Room Reset: -99 Not approved (approval status is reviewed); -10 Too long for capacity (10 minutes exceeds the current 5-minute limit)
- close_the_evening / Close the Evening: -99 Not approved (approval status is reviewed)

Automatic warnings:

- none

Human review notes:

## 8. Guardrail Review

This PR does not introduce:

- named holiday content
- public festival reenactment
- `today in folklore` language
- deterministic timing claims
- `the month wants you to...` language
- new visible categories
- active source/content changes outside scope
- copied source text
- private data
- UI changes

Raw debug/source keys:

- Normal recommendation copy uses labels such as `First day of the month — threshold and first word` and `Month turn — crossing between months`.
- Debug/report fields still include internal ids where expected. That remains developer/report territory, not normal UI copy.

## 9. Product Judgment

| Question | Answer | Evidence |
|---|---|---|
| Does this feel like household threshold timing? | Mostly yes. | The selected labels frame the household as crossing a month boundary. The best evidence is `calendar.month_turn.best_week`, which selects `first_day_last_day` with `Month turn out of August`. |
| Does timing shape without taking over? | Mostly yes. | Today scenarios still use capacity, practice, and focus. Calendar threshold appears as a selected signal, but the ritual remains an existing pattern. |
| Does this avoid horoscope/calendar-feed behavior? | Yes on the implementation surface. | No named holidays, feast days, public festival customs, or `folklore says` copy were added. |
| Does this help future first/last/threshold rituals? | Yes. | `first_day_last_day`, `clear_the_threshold_bowl`, `first_light_at_the_threshold`, and other existing threshold families now receive calendar threshold support. |
| Does it respect local household time? | Yes after cleanup. | `getCalendarThresholdFacts`, `getTimingFactsForDate`, numerology date facts, timing-window look-ahead, and timing-window labels use the supplied timezone or the runtime local timezone by default. |
| Any regressions? | One watch item. | `issue183.seasonal.entry_release` changed from `seasonal_marker_bowl` to `clear_the_threshold_bowl`. This may be better for clearing/closing, but needs human review. |

Blunt assessment: this is a timing support PR, not a content-quality PR. It gives the engine a useful household calendar threshold signal without becoming a date-lore feed. The weakest remaining piece is not detection; it is whether the existing first/last and threshold presentations are good enough when they win more often.

## 10. Remaining Issues / Follow-Ups

| Follow-up | Why | Depends on |
|---|---|---|
| Review `first_day_last_day` and `last_word_first_word` presentation quality | Calendar timing will make these more relevant, so their ritual voice needs human review. | #200 merge and human review |
| Strengthen threshold/key/return forms | Month-boundary timing naturally points at threshold forms; weak key/threshold copy could become noticeable. | Source packet #191 implementation follow-ups |
| Consider future `month_turn_bowl` / `first_crossing_bowl` | Existing patterns work, but future material-specific forms may be better. | Human content packet review |
| Seasonal/Kitchen material selection | Kitchen + month turn can support grain/bowl when focus fits; more nuanced material selection needs future content work. | Future content packet, no new category |
| Calendar timing over-selection diagnostics | If calendar thresholds start dominating, add concentration/over-selection diagnostics. | More scenario history after #200 |
| Explicit hosted household timezone setting | Current code uses supplied timezone or runtime local timezone by default; hosted household timing may eventually need a stored private timezone if browser/runtime defaults are not enough. | Product decision and privacy-safe storage |

## 11. PR Notes Draft

Summary:

- Added `calendar_threshold` timing facts for first day of month, last day of month, and month turn.
- Added approved interpretation rules for first-day, last-day, and month-turn signals using existing approved threshold / first-last / seasonal-bowl cards.
- Added timing-window candidate support so month boundaries can be selected in Across the week.
- Added recommendation-quality scenarios for first day, last day, and month turn.
- Added content diagnostics coverage so `calendar_threshold` appears in `npm run diagnose:content`.
- Updated timing/data/decision docs.

Validation:

- `npm run lint:content`: pass
- `npm run typecheck`: pass
- `npm run test`: pass, 26 files / 296 tests
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: pass, 8 tests
- `npm run recommendation:quality`: pass
- `npm run diagnose:content`: pass
- `npm run check`: pass

Examples:

- `calendar.first_day.threshold_word`: selected `first_light_at_the_threshold`; selected signal `First day of the month — threshold and first word`.
- `calendar.last_day.closing_bowl`: selected `clear_the_threshold_bowl`; selected signal `Last day of the month — closing and return`.
- `calendar.month_turn.best_week`: selected `first_day_last_day`; selected timing window `Month turn out of August`.

What did not change:

- No active SourceNotes, SymbolicCards, RitualPatterns, or RitualPresentation were added.
- No named holidays, feast days, public festival customs, moon water, protection/prosperity/luck content, or new visible categories were added.
- No UI changes.
- No copied source text or private data.

Risks:

- Existing first/last and threshold presentations may need stronger content review now that timing support can surface them.
- `first_light_at_the_threshold` concentration increased from 4 to 5 selections in the quality suite.
- One existing seasonal scenario changed from `seasonal_marker_bowl` to `clear_the_threshold_bowl`; this is probably coherent for clearing/closing, but should be reviewed.

Merge recommendation: hold for human timing review.
