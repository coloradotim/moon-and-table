# Recommendation Contract Matrix

Issue: #224

This packet defines the recommendation contract Moon & Table should test against. It is written from product expectations first, not from the current scoring engine's favorite selected pattern.

## 1. Contract Doctrine

User check-in answers are the recommendation contract. Explicit selections should not be set aside without a real blocker:

- visible category / practice type
- ritual focus
- audience
- capacity
- time scope
- hard avoid or preference constraints

Selection hierarchy:

1. hard safety, privacy, source, and approval eligibility
2. explicit visible category or resolved open-preference category
3. explicit ritual focus
4. capacity and depth
5. audience and action structure
6. time scope
7. timing, lunar, numerology, and private timing shape
8. material/source strength, variety, and presentation quality

Layers 7-8 may shape the selected category/focus. They must not replace layers 2-5 unless a real blocker is recorded.

## 2. Timing Authority

Timing is usually a modifier, not an override.

Timing may lead only when:

- the user asks for `Best moment this week` and a major timing event is in the candidate window or next few days; or
- the user asks for `Today` and a major timing event is today.

Major timing events for this matrix include new moon, full moon, solstice, equinox, end/beginning of month or year, first/last day, month turn, explicitly significant private/natal contacts, and numerology only when the fixture or timing layer marks it as major.

Ordinary phase, general planet-sign facts, and ordinary numerology should shape lightly. They should not redirect explicit category/focus.

## 3. Open Preference

`Surprise me` is not a category. It is an open category-selection mode.

Required behavior:

- resolve exactly one real visible category before pattern scoring;
- preserve that resolved category through selection and presentation;
- expose original mode and resolved category in diagnostics;
- never use `surprise_me` as a ritual style, form family, source lineage, or normal-copy category;
- keep normal copy free of phrases like `Surprise me matched`, `Surprise me ritual`, or `Surprise me category`.

The visible categories remain Home, Plant, Kitchen, Candle or light, Reflection, and Seasonal.

## 4. Coverage Gaps

A coverage gap is better than a confident wrong answer.

If exact category + focus + capacity coverage is thin, the engine should:

1. preserve the explicit or resolved category/focus/audience/capacity contract;
2. select the closest compatible approved pattern;
3. surface diagnostics such as `coverage_gap_category_focus_capacity`, `closest_compatible_pattern_selected`, `high_capacity_depth_gap`, `stronger_wrong_category_rejected`, and `recommendation_confidence_limited`;
4. avoid selecting a polished wrong-category ritual.

Normal user-facing copy should remain dignified and coherent. The coverage gap belongs in report/debug review, not in the ritual card as apology or compliance language.

## 5. Matrix Dimensions

Executable recommendation-quality scenarios now include:

- 107 total recommendation-quality scenarios
- 26 explicit recommendation-contract scenarios
- all six real visible categories
- open category-selection mode with forced/resolved Plant, Kitchen, and Candle or light fixtures
- pause, low, steady, and high capacity
- me and both-of-us audience paths
- shape-only, may-lead, and must-not-lead timing authority
- ordinary phase, full, waning, new moon, dark/rest, month turn, best-week timing, and major/minor numerology distinctions

## 6. Contract Scenario Table

| Scenario | Input summary | Timing authority | Selected pattern | Selected form families | Expected warnings |
| --- | --- | --- | --- | --- | --- |
| `contract.plant.both_high_tending_waning` | Plant / Tending the home / high / both_of_us | shape_only | `plant_witness_to_growth` | plant witness/growth | coverage gap diagnostics |
| `contract.plant.high_tending_no_timing` | Plant / Tending the home / high / me | must_not_lead | `plant_witness_to_growth` | plant witness/growth | coverage gap diagnostics |
| `contract.plant.high_rest_companionship` | Plant / Resting / high / me | shape_only | `dormant_green_rest` | plant rest/dormancy, seasonal marker | coverage gap diagnostics |
| `contract.kitchen.high_tending_full` | Kitchen / Tending us / high / both_of_us | shape_only | `warm_cup_between_us` | warm cup/bowl | none |
| `contract.kitchen.high_beginning_waning` | Kitchen / Making a beginning / high / me | shape_only | `grain_bowl_beginning` | grain/seed/bowl, seasonal marker, bread/grain center | none |
| `contract.home.high_tending_waning` | Home / Tending the home / high / me | shape_only | `first_light_at_the_threshold` | first light / threshold, threshold/crossing/bowl/key | coverage gap diagnostics + request changes |
| `contract.home.high_threshold_full` | Home / Marking a threshold / high / both_of_us | shape_only | `window_light_threshold` | first light / threshold, threshold/crossing/bowl/key, written/folded/container, first/last threshold | none |
| `contract.reflection.high_saying_new` | Reflection / Saying something clearly / high / me | shape_only | `window_light_threshold` | first light / threshold, threshold/crossing/bowl/key, written/folded/container, first/last threshold | request changes |
| `contract.candle.high_beginning` | Candle or light / Making a beginning / high / me | may_lead | `first_light_at_the_threshold` | first light / threshold, threshold/crossing/bowl/key | none |
| `contract.candle.high_resting` | Candle or light / Resting / high / me | shape_only | `full_light_holding_bowl` | full light / clarity, vessel emptying/return | none |
| `contract.surprise.high_preserves_resolved_category` | Open preference / Saying something clearly / high / me | shape_only | `window_light_threshold` | first light / threshold, threshold/crossing/bowl/key, written/folded/container, first/last threshold | coverage gap diagnostics |
| `contract.surprise.both_preserves_audience` | Open preference / Tending us / high / both_of_us | shape_only | `warm_cup_between_us` | warm cup/bowl | coverage gap diagnostics |
| `contract.seasonal.high_month_turn_threshold` | Seasonal / Marking a threshold / high / both_of_us | may_lead | `seasonal_marker_bowl` | seasonal marker, welcome/offering/vessel, vessel emptying/return | coverage gap diagnostics |
| `contract.home.low_tending_waning_not_release` | Home / Tending the home / low / me | shape_only | `first_light_at_the_threshold` | first light / threshold, threshold/crossing/bowl/key | request changes |
| `contract.pause.grounded_complete` | Home / Getting grounded / pause / me | must_not_lead | `threshold_bowl` | threshold/crossing/bowl/key, vessel emptying/return, first/last threshold | none |
| `contract.reflection.low_saying_no_journaling` | Reflection / Saying something clearly / low / me | shape_only | `window_light_threshold` | first light / threshold, threshold/crossing/bowl/key, written/folded/container, first/last threshold | none |
| `contract.tending_us.both_low_embodied` | Kitchen / Tending us / low / both_of_us | shape_only | `quiet_welcome` | welcome/offering/vessel, warm cup/bowl, seasonal marker | none |
| `contract.numerology.minor_accent_only` | Home / Tending the home / steady / me | shape_only | `bread_at_the_center` | bread/grain center, welcome/offering/vessel, seasonal marker | none |
| `contract.numerology.major_best_week_may_lead` | Reflection / Saying something clearly / steady / me | may_lead | `window_light_threshold` | first light / threshold, threshold/crossing/bowl/key, written/folded/container, first/last threshold | none |
| `contract.best_week.month_turn_may_lead` | Home / Marking a threshold / steady / both_of_us | may_lead | `first_day_last_day` | first/last threshold, seasonal marker, threshold/crossing/bowl/key, written/folded/container | none |
| `contract.surprise.low_resolves_real_category` | Open preference / Resting / low / me | shape_only | `waning_light_release` | banked/darkening light, waning phrase/release | request changes |
| `contract.surprise.full_moon_preserves_resolution` | Open preference / Saying something clearly / low / me | shape_only | `window_light_threshold` | first light / threshold, threshold/crossing/bowl/key, written/folded/container, first/last threshold | none |
| `contract.surprise.no_strong_timing_material_carries` | Open preference / Getting grounded / low / me | must_not_lead | `first_light_at_the_threshold` | first light / threshold, threshold/crossing/bowl/key | none |
| `contract.surprise.forced_plant_preserved` | Resolved open preference to Plant / Tending the home / low / me | shape_only | `plant_witness_to_growth` | plant witness/growth | none |
| `contract.surprise.forced_kitchen_preserved` | Resolved open preference to Kitchen / Tending us / low / both_of_us | shape_only | `quiet_welcome` | welcome/offering/vessel, warm cup/bowl, seasonal marker | none |
| `contract.surprise.forced_candle_preserved` | Resolved open preference to Candle or light / Resting / low / me | shape_only | `bank_the_house_light` | banked/darkening light | none |

Coverage gap diagnostics means:

- `coverage_gap_category_focus_capacity`
- `closest_compatible_pattern_selected`
- `high_capacity_depth_gap`
- `stronger_wrong_category_rejected`
- `recommendation_confidence_limited`

## 7. Expected Vs Disallowed Outputs

The executable contract block can define:

- expected category-selection mode
- expected explicit or resolved category
- expected focus behavior
- expected capacity behavior
- expected audience behavior
- timing authority classification
- acceptable pattern keys or ritual form families
- disallowed pattern keys or ritual form families
- disallowed normal-copy phrases
- expected diagnostic warning ids
- coverage-gap and closest-compatible flags
- human-readable rationale

Normal copy remains blocked from diagnostic phrasing including `held lightly`, `stronger material form`, `timing overrode`, `moon phase overrode`, `better fit elsewhere`, `your choice helped point toward`, `Surprise me matched`, `Surprise me ritual`, and `Surprise me category`.

## 8. Diagnostics Added Or Strengthened

The report warning vocabulary now includes the #224 contract diagnostics:

- `coverage_gap_category_focus_capacity`
- `closest_compatible_pattern_selected`
- `high_capacity_depth_gap`
- `stronger_wrong_category_rejected`
- `recommendation_confidence_limited`
- `contract_request_changes`
- `timing_led_without_major_event`
- `timing_overrode_explicit_contract`
- `minor_numerology_overweighted`
- `major_timing_event_not_used_for_best_week`
- `surprise_me_used_as_category_or_style`

Existing warnings continue to cover explicit category/focus override, unresolved open preference, resolved category not preserved, high capacity selecting low-only patterns, and audience action not reflected.

The report now prints `Recommendation contract` and `Contract status` sections for contract scenarios. Contract status separately names whether category was preserved, acceptable families/patterns were used, blocked families/patterns were avoided, and required explanation terms were present.

## 9. Known Remaining Gaps

- Plant + high capacity still relies on closest compatible Plant forms, mostly `plant_witness_to_growth` or `dormant_green_rest`, rather than a deeper high-capacity Plant-specific ritual.
- Request changes: Home + high tending under waning currently selects `first_light_at_the_threshold`; this is form-family compatible but too light/beginning-forward for Home + tending the home.
- Request changes: Home + low tending under waning currently selects `first_light_at_the_threshold`; low-capacity Home tending should place, return, or arrange a home object rather than mark a light threshold.
- Request changes: Reflection + high saying clearly under new moon selects `window_light_threshold`; this is phrase-compatible but too threshold/light-forward for Reflection + saying something clearly at high capacity.
- Request changes: open preference + resting currently resolves to Candle/light and selects `waning_light_release`; the resolved category is preserved, but the action reads as release rather than rest.
- Coverage-gap diagnostics are report-level only. Normal copy remains coherent and does not apologize for coverage thinness.

## 10. Human Review Questions

- Are the 26 executable contract scenarios broad enough to become the baseline for future recommendation-integrity work?
- Should the Home high-capacity tending gap get a future source-backed Home-specific deeper form rather than relying on threshold/light overlap?
- Should Plant high-capacity tending/rest get deeper source-backed forms, or is closest-compatible Plant coverage acceptable for now?
- Does the open-preference distribution feel balanced enough, or should future work add explicit distribution diagnostics across repeated open-preference samples?
- Are any of the currently acceptable cross-family selections too permissive for the product contract?

## Validation Snapshot

Latest local recommendation-quality snapshot while creating this packet:

- Scenario count: 107
- Contract scenario count: 26
- Distinct selected patterns: 31
- Unexpected contract warnings: 0
- Coverage-gap warning groups: 7, all expected by scenario contract
- `contract_request_changes`: 4
- `surprise_me_unresolved`: 0
- `resolved_surprise_category_not_preserved`: 0
- `surprise_me_used_as_category_or_style`: 0

Validation commands run:

- `npm run lint:content` passed
- `npm run typecheck` passed
- `npm run test` passed
- `npm run test -- tests/unit/recommendation-quality-report.test.ts` passed
- `npm run recommendation:quality` passed
- `npm run diagnose:content` passed
- `npm run check` passed
