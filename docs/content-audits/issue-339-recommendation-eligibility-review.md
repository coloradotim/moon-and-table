# Issue 339 Recommendation Eligibility Review

## Scope

Reviewed the 218 source-backed Ritual records that were already findable and direct-use eligible after the direct-use QA pass.

This pass marks recommendation-ready records for the future Choose with me selector and keeps direct-use-only records findable in the direct "I have something in mind" / Search flow.

## Result

- Reviewed/direct-use records considered: 218
- Promoted recommendation eligible: 182
- Kept direct-use only: 36
- Held for operative-word provenance: 0
- Held for metadata gap: 0
- Held for product-boundary/material review: 0
- Held for timing/source-note dependency: 22
- Held for multi-day schedule context: 0
- Held as too context-specific for broad automatic recommendation: 14
- Records with `source_exact_short`: 8
- Records with `adapted_source_words`: 0
- Records with stale private-source-text/private-excerpt metadata found: 0

Multi-day work is not a hold reason by itself. Multi-day Rituals may be recommendation eligible when their capacity metadata is deeper-only and the ritual body makes the commitment clear.

## Source-family summary

| Source family | Total | Promoted | Held |
| --- | ---: | ---: | ---: |
| Buckland, Practical Candleburning Rituals | 13 | 12 | 1 |
| The House Witch | 15 | 15 | 0 |
| The Magical Household | 15 | 15 | 0 |
| The Green Witch's Garden | 16 | 16 | 0 |
| Whitehurst flower magic | 36 | 36 | 0 |
| Saint Thomas, Sex Witch | 47 | 37 | 10 |
| Woodward, The Magical Household Cookbook | 14 | 14 | 0 |
| Sarah Faith Gottesdiener, The Moon Book | 21 | 13 | 8 |
| Margot Anand, The Art of Sexual Magic | 28 | 24 | 4 |
| Ivo Dominguez Jr., Practical Astrology for Witches and Pagans | 13 | 0 | 13 |

## Metadata corrections applied

This pass also adjusted recommendation metadata where the ritual body and 7 x 10 carrier/purpose lens were out of alignment.

- `ritual-buckland-candle-prepare-table`: primary carrier changed to `table`, with `candlelight` and `words` secondary.
- `ritual-buckland-candle-dream-door`: primary purpose changed to `opening`, with dream remembering/steadying secondary.
- `ritual-house-witch-spiritual-hearth-recognition`: primary purpose changed to `marking`.
- `ritual-house-witch-cauldron-harmony`: secondary purpose coverage expanded for household harmony.
- `ritual-magical-household-working-rug`: carrier aligned to `table`.
- `ritual-magical-household-green-living-room`: refinement clarified around tending the room through a living plant.
- `whitehurst-bowl-of-petals`: primary purpose changed to `blessing`.
- `whitehurst-hydrangea-boundary-bowl`: primary carrier changed to `vessel`; refinement names hydrangea helping the boundary hold.
- `whitehurst-water-lily-still-bowl`: refinement changed to cooling the moment.
- `ritual-woodward-candle-beside-bowl`: primary carrier changed to `candlelight`.
- Selected Saint Thomas and Anand records received purpose/carrier/refinement adjustments where the existing primary cell was too broad or pointed at the wrong ritual mechanism.

## Held direct-use only

### Complete held list

36 records remain direct-use only:

- `ritual-candlelight-buckland-marking-seven-night-increase` — Seven Marks of Readiness — `timing_engine_wiring`
- `candidate.saint_thomas.grimoire_record_after_rite` — Record the Spell Before It Scatters — `too_context_specific_for_recommendation`
- `candidate.saint_thomas.first_date_threshold_blessing` — Bless the Leaving Before the Date — `too_context_specific_for_recommendation`
- `candidate.saint_thomas.long_distance_calendar_light` — Mark Distance With One Calendar Light — `too_context_specific_for_recommendation`
- `candidate.saint_thomas.three_month_marker` — Mark the Relationship Without Pushing It — `too_context_specific_for_recommendation`
- `candidate.saint_thomas.moving_in_room_blessing` — Bless the Room as Shared Home — `too_context_specific_for_recommendation`
- `candidate.saint_thomas.former_lover_release` — Return the Old Lover to the Old Road — `too_context_specific_for_recommendation`
- `candidate.saint_thomas.friendship_benefits_vessel` — Give the Arrangement One Honest Vessel — `too_context_specific_for_recommendation`
- `candidate.saint_thomas.breakup_boldness_mirror` — Put Boldness On Before the Screen — `too_context_specific_for_recommendation`
- `candidate.saint_thomas.unsent_contact_boundary` — Let the Message Stay Unsent — `too_context_specific_for_recommendation`
- `candidate.saint_thomas.bed_linen_reset` — Reset the Bed Into Now — `too_context_specific_for_recommendation`
- `candidate.moon_book.lunation_map_one_desire` — Map One Desire Through the Moon — `timing_engine_wiring`
- `candidate.moon_book.new_moon_table_seed` — Set the Seed on the Dark Table — `timing_engine_wiring`
- `candidate.moon_book.waxing_one_thread` — Follow One Thread While the Moon Grows — `timing_engine_wiring`
- `candidate.moon_book.full_moon_mirror` — Stand Where the Light Can Show You — `timing_engine_wiring`
- `candidate.moon_book.full_moon_table_witness` — Put the Harvest on the Table — `timing_engine_wiring`
- `candidate.moon_book.waning_release_one_extra` — Let One Extra Leave With the Light — `timing_engine_wiring`
- `candidate.moon_book.dark_moon_void_table` — Keep the Table Empty on Purpose — `timing_engine_wiring`
- `candidate.moon_book.cycle_close_and_begin_again` — Close the Lunation Before Starting Over — `timing_engine_wiring`
- `candidate.anand.practice_night_commitment` — Give Practice Night a Place — `too_context_specific_for_recommendation`
- `candidate.anand.read_the_steps_together` — Read the Steps Together — `too_context_specific_for_recommendation`
- `candidate.anand.afterglow_grimoire` — Write the Afterglow — `too_context_specific_for_recommendation`
- `candidate.anand.keep_symbol_warm` — Keep the Shared Symbol Warm — `too_context_specific_for_recommendation`
- `candidate.dominguez.astrology-journal-timing-record` — Keep the Timing Beside the Work — `timing_engine_wiring`
- `candidate.dominguez.glyph-as-mark` — Trace One Planetary Mark — `timing_engine_wiring`
- `candidate.dominguez.planetary-card-attunement` — Set the Day's Planet on the Table — `timing_engine_wiring`
- `candidate.dominguez.seven-day-planetary-cycle` — Move Through the Seven Lights — `timing_engine_wiring`
- `candidate.dominguez.planetary-hour-support` — Let the Hour Lend One Color — `timing_engine_wiring`
- `candidate.dominguez.moon-phase-timing-check` — Choose What the Moon Is Doing — `timing_engine_wiring`
- `candidate.dominguez.moon-sign-tone` — Let the Moon Sign Choose the Accent — `timing_engine_wiring`
- `candidate.dominguez.void-moon-softening` — Let the Void Moon Make It Smaller — `timing_engine_wiring`
- `candidate.dominguez.aspect-before-peak` — Begin While the Aspect Is Building — `timing_engine_wiring`
- `candidate.dominguez.retrograde-foundation` — Turn Retrograde Toward the Foundations — `timing_engine_wiring`
- `candidate.dominguez.change-details-not-date` — Adjust the Table to the Sky You Have — `timing_engine_wiring`
- `candidate.dominguez.conditions-as-outline` — Let the Timing Give the Outline — `timing_engine_wiring`
- `candidate.dominguez.planetary-representation` — Give the Planet a Small Body — `timing_engine_wiring`

### Multi-day deeper-capacity records

Multi-day Rituals are recommendation eligible when multi-day work is intrinsic to the ritual and the metadata limits selection to `room_for_something_deeper`.

Promoted deeper-only multi-day records:

- `ritual-candlelight-buckland-releasing-habit-surrounded`
- `ritual-candlelight-buckland-tending-home-settling`
- `ritual-candlelight-buckland-remembering-photo-peace-light`
- `ritual-buckland-candle-courage-circle`
- `ritual-buckland-candle-welcome-joy`

Still held for timing evidence:

- `ritual-candlelight-buckland-marking-seven-night-increase`
- `candidate.dominguez.seven-day-planetary-cycle`

### Timing engine wiring

- `ritual-candlelight-buckland-marking-seven-night-increase`
- `candidate.moon_book.lunation_map_one_desire`
- `candidate.moon_book.new_moon_table_seed`
- `candidate.moon_book.waxing_one_thread`
- `candidate.moon_book.full_moon_mirror`
- `candidate.moon_book.full_moon_table_witness`
- `candidate.moon_book.waning_release_one_extra`
- `candidate.moon_book.dark_moon_void_table`
- `candidate.moon_book.cycle_close_and_begin_again`
- all 13 Dominguez records

These need selector access to real timing facts, timing windows, or astrology-specific evidence before they should be automatically chosen. Follow-up issues: #396 for timing selector wiring, then #398 for re-reviewing timing-held Rituals after that wiring lands.

### Too context-specific for broad automatic recommendation

- `candidate.saint_thomas.grimoire_record_after_rite`
- `candidate.saint_thomas.first_date_threshold_blessing`
- `candidate.saint_thomas.long_distance_calendar_light`
- `candidate.saint_thomas.three_month_marker`
- `candidate.saint_thomas.moving_in_room_blessing`
- `candidate.saint_thomas.former_lover_release`
- `candidate.saint_thomas.friendship_benefits_vessel`
- `candidate.saint_thomas.breakup_boldness_mirror`
- `candidate.saint_thomas.unsent_contact_boundary`
- `candidate.saint_thomas.bed_linen_reset`
- `candidate.anand.practice_night_commitment`
- `candidate.anand.read_the_steps_together`
- `candidate.anand.afterglow_grimoire`
- `candidate.anand.keep_symbol_warm`

These remain direct-use/searchable. The hold is not a consent or safety rejection; it prevents a broad purpose/audience match from choosing a ritual that needs a very specific life context.

## Paths changed

- `src/data/rituals/recommendation-eligibility-review.ts`
- `src/data/rituals/source-backed-rituals.ts`
- `scripts/import-source-backed-rituals.ts`
- `tests/unit/rituals.test.ts`
- `tests/unit/manage-rituals.test.ts`
- `tests/unit/ritual-readiness-report.test.ts`
- `docs/content-audits/issue-339-recommendation-eligibility-review.md`

## Validation results

Focused validation:

```bash
npm run test -- tests/unit/rituals.test.ts tests/unit/manage-rituals.test.ts tests/unit/ritual-readiness-report.test.ts
```

Result: passed.

Full validation:

```bash
npm run lint:content
npm run typecheck
npm run test
npm run check
npm run rituals:readiness
npm run diagnose:content
```

Result: passed.

Notes:

- `npm run lint:content` still prints existing long-text warnings for imported/overlay ritual bodies and source summaries, but exits 0.
- `npm run check` still prints Vite's existing chunk-size warning, but exits 0.
