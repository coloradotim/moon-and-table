# Source-Backed Runtime Coverage Audit

Issue: #289

Status: Current audit of runtime source-backed Ritual records after the bulk
import, direct-use review, recommendation eligibility review, timing review, and
required-timing guardrail work.

Scope: analysis/reporting only. This report does not import, edit, promote, or
demote Ritual records.

## Method

This audit counts only the primary carrier and primary purpose recorded in
`recommendationMetadata`. Secondary carriers and secondary purposes are useful
context, but they do not satisfy a coverage cell.

Counts are taken from `sourceBackedRituals` and the current `Ritual` fields:

- `Imported`: source-backed runtime records in the post-import audit cohort.
- `Findable`: `availability.findable`.
- `Direct-use`: `availability.directUseEligible`.
- `Recommendation`: `availability.recommendationEligible`.

The import cohort has moved through later review, so the current `status` values
are no longer `draft`: 196 records are `recommendable` and 22 are `reviewed`.
For this report, `Imported` means the source-backed runtime cohort under audit,
not current status `draft`.

## Summary

- Total runtime Rituals audited: 218
- Imported source-backed cohort: 218
- Findable: 218
- Direct-use eligible: 218
- Recommendation eligible: 196
- Direct-use only: 22
- Current status counts: 196 `recommendable`, 22 `reviewed`, 0 `draft`
- Empty primary carrier/purpose cells: 11 of 70

The library is broadly usable now. Coverage is strongest where the current source
base naturally leans: plants, words, vessels, candlelight, table marking, and
blessing. The weakest areas are doorway, protecting, and body-as-connecting or
body-as-voicing. Those are real source-gap areas, not just metadata gaps.

## Coverage Matrix

| Carrier | Purpose | Imported | Findable | Direct-use | Recommendation |
|---|---:|---:|---:|---:|---:|
| candlelight | steadying | 5 | 5 | 5 | 5 |
| candlelight | opening | 6 | 6 | 6 | 6 |
| candlelight | releasing | 3 | 3 | 3 | 3 |
| candlelight | tending | 3 | 3 | 3 | 3 |
| candlelight | connecting | 3 | 3 | 3 | 2 |
| candlelight | voicing | 2 | 2 | 2 | 2 |
| candlelight | marking | 2 | 2 | 2 | 1 |
| candlelight | blessing | 6 | 6 | 6 | 6 |
| candlelight | protecting | 1 | 1 | 1 | 1 |
| candlelight | remembering | 1 | 1 | 1 | 1 |
| table | steadying | 1 | 1 | 1 | 1 |
| table | opening | 4 | 4 | 4 | 4 |
| table | releasing | 1 | 1 | 1 | 1 |
| table | tending | 4 | 4 | 4 | 3 |
| table | connecting | 1 | 1 | 1 | 1 |
| table | voicing | 1 | 1 | 1 | 1 |
| table | marking | 14 | 14 | 14 | 11 |
| table | blessing | 6 | 6 | 6 | 5 |
| table | protecting | 0 | 0 | 0 | 0 |
| table | remembering | 2 | 2 | 2 | 1 |
| doorway | steadying | 0 | 0 | 0 | 0 |
| doorway | opening | 2 | 2 | 2 | 1 |
| doorway | releasing | 3 | 3 | 3 | 3 |
| doorway | tending | 0 | 0 | 0 | 0 |
| doorway | connecting | 0 | 0 | 0 | 0 |
| doorway | voicing | 0 | 0 | 0 | 0 |
| doorway | marking | 0 | 0 | 0 | 0 |
| doorway | blessing | 1 | 1 | 1 | 1 |
| doorway | protecting | 2 | 2 | 2 | 2 |
| doorway | remembering | 0 | 0 | 0 | 0 |
| plant | steadying | 4 | 4 | 4 | 4 |
| plant | opening | 7 | 7 | 7 | 7 |
| plant | releasing | 3 | 3 | 3 | 3 |
| plant | tending | 6 | 6 | 6 | 6 |
| plant | connecting | 3 | 3 | 3 | 3 |
| plant | voicing | 4 | 4 | 4 | 4 |
| plant | marking | 3 | 3 | 3 | 3 |
| plant | blessing | 4 | 4 | 4 | 4 |
| plant | protecting | 0 | 0 | 0 | 0 |
| plant | remembering | 5 | 5 | 5 | 5 |
| words | steadying | 4 | 4 | 4 | 3 |
| words | opening | 4 | 4 | 4 | 4 |
| words | releasing | 4 | 4 | 4 | 2 |
| words | tending | 4 | 4 | 4 | 4 |
| words | connecting | 5 | 5 | 5 | 4 |
| words | voicing | 8 | 8 | 8 | 7 |
| words | marking | 3 | 3 | 3 | 1 |
| words | blessing | 1 | 1 | 1 | 1 |
| words | protecting | 1 | 1 | 1 | 1 |
| words | remembering | 12 | 12 | 12 | 9 |
| vessel | steadying | 4 | 4 | 4 | 4 |
| vessel | opening | 3 | 3 | 3 | 3 |
| vessel | releasing | 4 | 4 | 4 | 4 |
| vessel | tending | 4 | 4 | 4 | 4 |
| vessel | connecting | 3 | 3 | 3 | 2 |
| vessel | voicing | 2 | 2 | 2 | 2 |
| vessel | marking | 1 | 1 | 1 | 1 |
| vessel | blessing | 11 | 11 | 11 | 11 |
| vessel | protecting | 1 | 1 | 1 | 1 |
| vessel | remembering | 2 | 2 | 2 | 2 |
| body | steadying | 3 | 3 | 3 | 3 |
| body | opening | 5 | 5 | 5 | 5 |
| body | releasing | 7 | 7 | 7 | 6 |
| body | tending | 2 | 2 | 2 | 2 |
| body | connecting | 0 | 0 | 0 | 0 |
| body | voicing | 0 | 0 | 0 | 0 |
| body | marking | 1 | 1 | 1 | 1 |
| body | blessing | 5 | 5 | 5 | 4 |
| body | protecting | 1 | 1 | 1 | 1 |
| body | remembering | 0 | 0 | 0 | 0 |

## Empty Cells

These cells have no primary runtime Rituals:

- `table | protecting`
- `doorway | steadying`
- `doorway | tending`
- `doorway | connecting`
- `doorway | voicing`
- `doorway | marking`
- `doorway | remembering`
- `plant | protecting`
- `body | connecting`
- `body | voicing`
- `body | remembering`

The most important gaps are not all equally urgent. `table | protecting`,
`doorway | steadying`, `doorway | marking`, `plant | protecting`, and
`body | connecting` would likely improve Choose with me coverage the most.
`body | voicing` and `body | remembering` are more specialized and should only
be filled if a good source or household ritual naturally supports them.

## Thin Cells

Thin cells have one or zero recommendation-eligible Rituals. These are usable,
but a single record has to carry the whole primary cell:

- `candlelight | marking`: 2 imported, 1 recommendation eligible.
- `candlelight | protecting`: 1 imported, 1 recommendation eligible.
- `candlelight | remembering`: 1 imported, 1 recommendation eligible.
- `table | steadying`: 1 imported, 1 recommendation eligible.
- `table | releasing`: 1 imported, 1 recommendation eligible.
- `table | connecting`: 1 imported, 1 recommendation eligible.
- `table | voicing`: 1 imported, 1 recommendation eligible.
- `table | remembering`: 2 imported, 1 recommendation eligible.
- `doorway | opening`: 2 imported, 1 recommendation eligible.
- `doorway | blessing`: 1 imported, 1 recommendation eligible.
- `words | marking`: 3 imported, 1 recommendation eligible.
- `words | blessing`: 1 imported, 1 recommendation eligible.
- `words | protecting`: 1 imported, 1 recommendation eligible.
- `vessel | marking`: 1 imported, 1 recommendation eligible.
- `vessel | protecting`: 1 imported, 1 recommendation eligible.
- `body | marking`: 1 imported, 1 recommendation eligible.
- `body | protecting`: 1 imported, 1 recommendation eligible.

Several thin cells are probably acceptable for now because the carrier/purpose
pair is naturally narrow. The fragile ones for product coverage are
`table | steadying`, `table | connecting`, `doorway | opening`,
`words | marking`, `vessel | protecting`, and `body | protecting`.

## Strong Cells

Strong cells have at least four recommendation-eligible Rituals:

- `candlelight | steadying`: 5 recommendation eligible.
- `candlelight | opening`: 6 recommendation eligible.
- `candlelight | blessing`: 6 recommendation eligible.
- `table | opening`: 4 recommendation eligible.
- `table | marking`: 11 recommendation eligible.
- `table | blessing`: 5 recommendation eligible.
- `plant | steadying`: 4 recommendation eligible.
- `plant | opening`: 7 recommendation eligible.
- `plant | tending`: 6 recommendation eligible.
- `plant | voicing`: 4 recommendation eligible.
- `plant | blessing`: 4 recommendation eligible.
- `plant | remembering`: 5 recommendation eligible.
- `words | opening`: 4 recommendation eligible.
- `words | tending`: 4 recommendation eligible.
- `words | connecting`: 4 recommendation eligible.
- `words | voicing`: 7 recommendation eligible.
- `words | remembering`: 9 recommendation eligible.
- `vessel | steadying`: 4 recommendation eligible.
- `vessel | releasing`: 4 recommendation eligible.
- `vessel | tending`: 4 recommendation eligible.
- `vessel | blessing`: 11 recommendation eligible.
- `body | opening`: 5 recommendation eligible.
- `body | releasing`: 6 recommendation eligible.
- `body | blessing`: 4 recommendation eligible.

These cells should be considered stable enough for recommendation selection.
Future work here should focus on duplicate mechanics and voice quality rather
than simply adding more records.

## Overrepresented Cells

These cells are dense enough that new source work should usually wait unless it
brings a clearly different mechanism, audience, timing use, or household value:

- `table | marking`: 14 imported, 11 recommendation eligible.
- `vessel | blessing`: 11 imported, 11 recommendation eligible.
- `words | remembering`: 12 imported, 9 recommendation eligible.
- `words | voicing`: 8 imported, 7 recommendation eligible.
- `plant | opening`: 7 imported, 7 recommendation eligible.
- `body | releasing`: 7 imported, 6 recommendation eligible.
- `candlelight | opening`: 6 imported, 6 recommendation eligible.
- `candlelight | blessing`: 6 imported, 6 recommendation eligible.
- `plant | tending`: 6 imported, 6 recommendation eligible.

`table | marking`, `vessel | blessing`, and `words | remembering` are the main
overrepresentation concerns. They are useful cells, but they can crowd out more
domestic protecting, threshold, embodied connecting, and low-burden steadying
coverage if future imports continue in the same shape.

## Carrier Balance

Primary carrier totals:

- `words`: 46
- `plant`: 39
- `vessel`: 35
- `table`: 34
- `candlelight`: 32
- `body`: 24
- `doorway`: 8

The library is heavy in words, plant, vessel, table, and candlelight. `doorway`
is the clear carrier gap. `body` is present but concentrated in opening,
releasing, and blessing rather than connecting, voicing, or remembering.

## Purpose Balance

Primary purpose totals:

- `blessing`: 34
- `opening`: 31
- `releasing`: 25
- `marking`: 24
- `tending`: 23
- `remembering`: 22
- `steadying`: 21
- `voicing`: 17
- `connecting`: 15
- `protecting`: 6

The main purpose gap is `protecting`. `connecting` and `voicing` are not empty,
but they are carrier-skewed: connecting leans words/vessels/candlelight, while
voicing leans words/plants. The library has plenty of blessing/opening, and new
records in those purposes should be very selective.

## Source Diversity

Source-family counts:

| Source family | Imported | Recommendation eligible | Direct-use only |
|---|---:|---:|---:|
| Whitehurst | 52 | 52 | 0 |
| Saint Thomas | 47 | 37 | 10 |
| House Witch / Magical Household | 30 | 30 | 0 |
| Anand | 28 | 24 | 4 |
| The Moon Book | 21 | 21 | 0 |
| Woodward | 14 | 14 | 0 |
| Buckland | 13 | 12 | 1 |
| Dominguez | 13 | 6 | 7 |

Source diversity is acceptable at the library level but uneven inside cells:

- Whitehurst drives much of the plant coverage, especially plant opening,
  tending, remembering, steadying, and blessing.
- Saint Thomas supplies many relationship, table-marking, body-blessing, and
  words-releasing records, with 10 held as direct-use only because they are too
  context-specific for recommendation.
- Anand supplies much of the shared-words and connecting/voicing material, with
  four direct-use-only records that still depend on a specific circumstance.
- Dominguez is valuable for planetary and timing logic, but current engine
  support keeps 7 of 13 records direct-use only.
- Woodward is concentrated in table/vessel domestic practice and is useful, but
  the collection is smaller.
- Buckland is mostly candlelight; one record remains direct-use only because
  full-moon lead time is unsupported.

The most important source-diversity need is not "more sources everywhere." It is
source work that naturally fills doorway, protecting, embodied connecting, and
table/vessel protecting without adding more general blessing or marking.

## Duplicate Mechanics

The most repeated mechanics are not bad; they are part of Moon & Table's
language. They become a problem only when a cell has many rituals that ask for
the same basic action with a different label.

Watch clusters:

- Write/name/speak on paper: very common across words, table, plant, vessel,
  and candlelight rituals.
- Vessel blessing: many bowls, cups, plates, and contained offerings now occupy
  blessing and tending cells.
- Table marking: many records use table placement, altar setup, cards, or record
  keeping to mark a threshold or moment.
- Plant opening/tending: Whitehurst and garden records provide good coverage,
  but many use a plant or flower as witness, helper, or attention object.
- Candlelight opening/blessing: strong and useful, but future candle records
  need sharper differentiation.

Recommended duplicate-handling rule: do not merge records merely because the
gesture is similar. Preserve separate Rituals where intrinsic purpose differs.
Consider merging or holding only when the headline, practice, purpose, carrier,
and selection lane all land in the same place.

## Weak Product Voice Clusters

This audit did not rewrite ritual copy, but a few clusters deserve human review
before more promotion/source planning:

- Whitehurst correspondence-forward rituals can feel thin when the practice is
  mostly "let this flower quality help." They are findable and mostly usable,
  but future quality passes should keep checking that the ritual body does more
  than name a correspondence.
- Dominguez planetary records are clear as direct-use material, but some are
  currently blocked from recommendation because the engine cannot verify the
  timing condition. They should not be promoted by smoothing away that timing
  dependency.
- Saint Thomas and Anand direct-use-only records are often vivid and useful, but
  some are too tied to a particular situation to appear from generic Choose with
  me answers.
- Dense `table | marking`, `words | remembering`, and `vessel | blessing` cells
  should be reviewed for repetitive closeout language before additional records
  are added to those cells.

## Bottlenecks

Private excerpt blockers: none found in the current runtime availability fields.
No source-backed Ritual is currently held because of `sourceTextReviewRequired`
or a private excerpt flag.

Source-boundary and eligibility bottlenecks:

- 14 records are direct-use only because they are too context-specific for
  recommendation.
- 5 records are direct-use only because planetary day/hour evidence is not
  supported.
- 1 record is direct-use only because full-moon lead time is not supported.
- 1 record is direct-use only because void Moon evidence is not supported.
- 1 record is direct-use only because applying-aspect timing is not supported.

These are good holds. They protect recommendation accuracy without hiding the
rituals from direct search.

## Split, Merge, Hold, Promote

Recommended holds:

- Keep the 22 direct-use-only records held out of recommendation until their
  blockers change. Most are either context-specific or timing-infrastructure
  dependent.
- Keep unsupported planetary day/hour, void Moon, applying-aspect, and full-moon
  lead-time records direct-use only unless the timing engine gains those facts.

Recommended promotion candidates:

- No automatic promotion candidates from this audit. The held records are held
  for real context or timing reasons, not trivial availability flags.
- If future work wants to promote context-specific Saint Thomas or Anand records,
  it should start by deciding whether the Choose with me flow has enough inputs
  to make those situations explicit.

Recommended split candidates:

- None required by this audit. Dense cells should be reviewed for duplicate
  mechanics before adding more records, but the current records generally remain
  distinct by purpose, source lineage, or practice architecture.

Recommended merge candidates:

- None required by this audit. Similar bowl, candle, writing, and table actions
  should not be merged unless a later human review finds the Ritual identity is
  actually duplicated, not merely mechanically similar.

## Recommended Source-Gap Priorities

1. `doorway` carrier expansion, especially steadying, marking, tending, and
   remembering. The doorway lane is too narrow for a top-level carrier.
2. `protecting` purpose expansion across table, plant, body, and low-burden
   candlelight/words. Protecting is the only purpose with fewer than 10 primary
   records.
3. `body | connecting` and embodied shared practices that are usable without
   turning the carrier into words or candlelight.
4. `table | protecting` and household boundary-at-the-table practices.
5. `plant | protecting`, if source support can make it more than a generic
   correspondence.
6. Additional source diversity for strong-but-one-source-skewed cells:
   plant/opening, plant/tending, words/voicing, and table/marking.

## Closeout Report

```text
Total runtime Rituals audited: 218
Draft imported count: 218 source-backed import-cohort records; 0 current status=draft
Direct-use eligible count: 218
Recommendation eligible count: 196
Empty cells: 11
Thin cells: 17 cells with one or fewer recommendation-eligible Rituals
Strong cells: 24 cells with four or more recommendation-eligible Rituals
Overrepresented cells: table|marking, vessel|blessing, words|remembering,
  words|voicing, plant|opening, body|releasing, candlelight|opening,
  candlelight|blessing, plant|tending
Duplicate mechanics: repeated write/name/speak, vessel blessing, table marking,
  plant witness/helper practices, candlelight opening/blessing
Private excerpt blockers: none found in current runtime availability fields
Source diversity concerns: Whitehurst-heavy plant coverage; Saint Thomas-heavy
  context-specific relationship/table/body cells; Dominguez timing records held
  by unsupported timing facts; sparse doorway and protecting source support
Recommended promotion candidates: none automatic; held records have real context
  or timing blockers
Recommended source-gap priorities: doorway, protecting, body|connecting,
  table|protecting, plant|protecting, source diversity in dense cells
Report path: docs/research/coverage/source-backed-runtime-coverage-audit.md
Validation results: counts generated from sourceBackedRituals; npm run
  rituals:readiness passed; npm run test -- tests/unit/manage-rituals.test.ts
  tests/unit/ritual-readiness-report.test.ts passed
```
