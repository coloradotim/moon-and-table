# Issue 398 / 402 Timing Context and Eligibility Review

## Scope

Reviewed source-backed Ritual timing metadata after the Choose with me selector
started consuming timing evidence in issue 396.

This pass combines:

- issue 402: strengthen Ritual timing contexts for timing-aware recommendations;
- issue 398: revisit Rituals held from recommendation eligibility only because
  timing evidence was not yet wired into the selector.

This was not a source discovery, import, UI, or new timing-engine pass.

## Global Timing Metadata Audit

Timing relationships considered: 180 records with `required`, `preferred`, or
`helpful` timing.

Before this pass, 107 timing-related records exported without timing contexts.
Those records now receive explicit timing contexts from their reviewed best-window
language. The goal is not to make every context a computed sky fact; it is to
make the record honest and inspectable so selector/debug behavior never depends
on a blank timing field.

Required timing was also tightened. Required timing now remains recommendation
eligible only when the current timing selector can verify it. Rituals whose
timing is real but not engine-verifiable were downgraded from `required` to
`helpful` so they can remain usable without becoming impossible to recommend.

Metadata corrections made:

- 107 non-`none` timing records now have timing contexts.
- 27 previously `required` records whose timing is ritual-local rather than
  engine-verifiable were downgraded to `helpful`.
- Moon Book dark-moon records now include `new moon` contexts so the current
  four-phase/lunation timing engine can verify them near the new-moon window.
- Dominguez timing-adaptation records now name matchable timing contexts such as
  `moon phase`, `moon sign`, `planetary aspect`, `retrograde planet`, and
  `calendar threshold`.
- The selector timing matcher was tightened so a context such as `dark moon` no
  longer matches any generic moon evidence.

## Timing-Held Records Considered

Timing-held records considered: 22

Promoted after timing wiring: 14

- `candidate.moon_book.lunation_map_one_desire`
- `candidate.moon_book.new_moon_table_seed`
- `candidate.moon_book.waxing_one_thread`
- `candidate.moon_book.full_moon_mirror`
- `candidate.moon_book.full_moon_table_witness`
- `candidate.moon_book.waning_release_one_extra`
- `candidate.moon_book.dark_moon_void_table`
- `candidate.moon_book.cycle_close_and_begin_again`
- `candidate.dominguez.astrology-journal-timing-record`
- `candidate.dominguez.moon-phase-timing-check`
- `candidate.dominguez.moon-sign-tone`
- `candidate.dominguez.retrograde-foundation`
- `candidate.dominguez.change-details-not-date`
- `candidate.dominguez.conditions-as-outline`

Kept direct-use only: 8

- `ritual-candlelight-buckland-marking-seven-night-increase`:
  `full_moon_lead_time_not_supported`
- `candidate.dominguez.glyph-as-mark`:
  `planetary_day_or_hour_not_supported`
- `candidate.dominguez.planetary-card-attunement`:
  `planetary_day_or_hour_not_supported`
- `candidate.dominguez.seven-day-planetary-cycle`:
  `planetary_day_or_hour_not_supported`
- `candidate.dominguez.planetary-hour-support`:
  `planetary_day_or_hour_not_supported`
- `candidate.dominguez.void-moon-softening`:
  `void_moon_not_supported`
- `candidate.dominguez.aspect-before-peak`:
  `applying_aspect_timing_not_supported`
- `candidate.dominguez.planetary-representation`:
  `planetary_day_or_hour_not_supported`

Held for missing timing evidence: 8

Held for source-note/card dependency: 0

Held for context specificity: 14

The context-specific Saint Thomas and Anand records remain direct-use only. This
pass did not re-review those holds because they were not timing-engine holds.

## Current Readiness Counts

- Reviewed/direct-use records considered: 218
- Promoted recommendation eligible: 196
- Kept direct-use only: 22
- Held for timing/source-note dependency: 8
- Held as too context-specific for broad automatic recommendation: 14
- Records with blank timing contexts where timing is not `none`: 0

## Source-Family Summary

| Source family | Total | Promoted | Held |
| --- | ---: | ---: | ---: |
| Buckland, Practical Candleburning Rituals | 13 | 12 | 1 |
| The House Witch | 15 | 15 | 0 |
| The Magical Household | 15 | 15 | 0 |
| The Green Witch's Garden | 16 | 16 | 0 |
| Whitehurst flower magic | 36 | 36 | 0 |
| Saint Thomas, Sex Witch | 47 | 37 | 10 |
| Woodward, The Magical Household Cookbook | 14 | 14 | 0 |
| Sarah Faith Gottesdiener, The Moon Book | 21 | 21 | 0 |
| Margot Anand, The Art of Sexual Magic | 28 | 24 | 4 |
| Ivo Dominguez Jr., Practical Astrology for Witches and Pagans | 13 | 6 | 7 |

## Validation Results

Focused validation:

```bash
npm run test -- tests/unit/choose-with-me-selector.test.ts tests/unit/rituals.test.ts tests/unit/manage-rituals.test.ts tests/unit/ritual-readiness-report.test.ts tests/unit/app-shell.test.ts
```

Result: passed, 5 files / 92 tests.

Full validation:

```bash
npm run check
npm run rituals:readiness
```

Result: passed.

Notes:

- `npm run lint:content` still prints existing long-text warnings for imported
  source-backed ritual prose and source summaries, but exits 0.
- `npm run check` still prints Vite's existing chunk-size warning, but exits 0.
- `npm run rituals:readiness` reports 218 Rituals, 196 recommendation eligible,
  22 reviewed, validation valid, and 0 findings.
