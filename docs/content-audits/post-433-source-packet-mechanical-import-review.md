# Post-433 Source Packet Mechanical Import Review

PR: source packet mechanical import

This report documents the mechanical import posture after adding the eight
no-API extraction packets and their import-prep manifest to the existing
source-backed Ritual import pipeline.

## Import Summary

- Packets included: 19
- Total source-backed Ritual records: 516
- Findable records: 516
- Direct-use records: 516
- Recommendation-eligible records: 463
- Recommendation-held records: 53
- Skipped candidates: 0

## Packet Reconciliation

| Packet | Approved candidate blocks found | Imported | Direct-use | Recommendation-eligible | Skipped |
| --- | ---: | ---: | ---: | ---: | ---: |
| Buckland candlelight complete extraction | 13 | 13 | 13 | 12 | 0 |
| House Witch complete extraction | 15 | 15 | 15 | 15 | 0 |
| Magical Household domestic threshold altar | 15 | 15 | 15 | 15 | 0 |
| Green Witch's Garden plant household practice | 16 | 16 | 16 | 16 | 0 |
| Whitehurst flower table magic | 36 | 36 | 36 | 36 | 0 |
| Saint Thomas sex witch | 47 | 47 | 47 | 37 | 0 |
| Woodward kitchen vessel magic | 14 | 14 | 14 | 14 | 0 |
| Moon Book lunar cycle | 21 | 21 | 21 | 21 | 0 |
| Anand connection | 28 | 28 | 28 | 24 | 0 |
| Anand and Saint Thomas ritual-only adult re-extraction | 7 | 7 | 7 | 7 | 0 |
| Dominguez practical astrology | 13 | 13 | 13 | 6 | 0 |
| Herstik Sacred Sex complete extraction | 69 | 69 | 69 | 69 | 0 |
| Miller Sex, Sorcery, and Spirit complete extraction | 22 | 22 | 22 | 18 | 0 |
| Carrellas Urban Tantra complete extraction | 55 | 55 | 55 | 44 | 0 |
| Pamita Book of Candle Magic complete extraction | 42 | 42 | 42 | 40 | 0 |
| Gamache Master Book of Candle Burning complete extraction | 24 | 24 | 24 | 14 | 0 |
| Dykes/Gibson Astrological Magic complete extraction | 26 | 26 | 26 | 26 | 0 |
| Whitehurst Magical Housekeeping complete extraction | 27 | 27 | 27 | 23 | 0 |
| Blonde Hearth and Home Witchcraft complete extraction | 26 | 26 | 26 | 26 | 0 |

## Import Notes

- The eight new packets are imported through `docs/research/ritual-candidates/source-packet-import-prep-manifest.md`.
- Every manifest-approved record imports as findable and direct-use eligible.
- Recommendation eligibility follows the manifest: adult/private/high-capacity material can be recommendation-eligible when current purpose, carrier, capacity, audience, and timing metadata can represent it.
- Records held from recommendation remain findable/direct-use; holds are for selector gates or owner-review decisions, not import blockers.
- Packet prose remains canonical for headline, practice, intention, best window, question, and source grounding.

## Skipped Candidates

None.
