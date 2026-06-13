# Runtime 7x10 Ritual coverage audit

Date: 2026-06-12

Parent work: #433 source-packet mechanical import

Audit artifact: `docs/research/audits/post-433-runtime-7x10-coverage-audit.md`

This is a runtime coverage audit after mechanical import. It counts imported `Ritual` records by primary recommendation metadata:

- primary carrier;
- primary purpose;
- direct-use eligibility;
- recommendation eligibility.

It does not count secondary carriers or secondary purposes as solved cells. It also does not claim that search-only/direct-use records are recommendation coverage.

## Executive summary

The mechanical import materially improves coverage across the Ritual-first recommendation matrix.

- Total source-backed Ritual records: 516
- Findable in search: 516
- Direct-use eligible: 516
- Recommendation eligible: 463
- Recommendation held/direct-use only: 53

The import changes the coverage picture from packet-planning coverage to runtime coverage. The strongest new gains are in `body`, `words`, `candlelight`, and adult/private connection lanes from Herstik, Carrellas, Miller, Anand, and Saint Thomas; candle work from Pamita and Gamache; astrology-shaped marking and blessing from Dykes/Gibson; and home/domestic support from Whitehurst and Blonde.

## Highest-confidence runtime cells

- `candlelight + opening/marking/blessing/steadying/protecting/releasing/voicing/connecting`
- `words + voicing/connecting/remembering/steadying/releasing`
- `body + opening/steadying/releasing/connecting`
- `plant + opening/tending/remembering/releasing/voicing`
- `table + marking`
- `vessel + blessing/releasing/connecting`
- `doorway + protecting/releasing`

## Remaining weak cells

These cells remain thin or absent in recommendation-eligible runtime coverage:

- `plant + protecting`: absent.
- `table + remembering/steadying/releasing/voicing/connecting`: thin.
- `table + protecting`: absent.
- `vessel + marking/remembering/protecting/voicing`: thin.
- `words + marking`: thin.
- `body + marking/remembering/voicing`: thin.
- `doorway + opening/marking/blessing`: thin.
- `doorway + tending/remembering/steadying/voicing/connecting`: absent.

This is much better than the pre-import state, but the matrix still has a clear shape: doorway is the shallowest carrier, followed by table/vessel/body cells where the action exists mostly as secondary support inside richer rituals.

## Matrix summary table

Cell format is `rating recommendation/direct-use sources`.

Ratings:

- `strong`: 10 or more recommendation-eligible primary records.
- `adequate`: 3-9 recommendation-eligible primary records.
- `thin`: 1-2 recommendation-eligible primary records.
- `absent`: no recommendation-eligible primary records.

| Carrier | opening | marking | tending | blessing | remembering | steadying | protecting | releasing | voicing | connecting |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `candlelight` | strong 11/11 Blonde, Buckland, Gamache, Madame Pamita | strong 21/22 Blonde, Carrellas, Dykes/Gibson, Madame Pamita | adequate 5/6 Blonde, Buckland, Saint Thomas, Whitehurst | strong 23/23 Blonde, Buckland, Dykes/Gibson, Gamache | adequate 3/3 Blonde, Buckland, Madame Pamita | strong 25/28 Blonde, Buckland, Carrellas, Dykes/Gibson | strong 18/22 Blonde, Buckland, Dykes/Gibson, Gamache | strong 14/18 Buckland, Carrellas, Gamache, Herstik | strong 13/14 Blonde, Buckland, Dykes/Gibson, Herstik | strong 16/18 Blonde, Carrellas, Dykes/Gibson, Herstik |
| `plant` | adequate 7/7 Moon Book, Green Witch's Garden, Whitehurst flower magic | adequate 3/3 Whitehurst flower magic | adequate 6/6 Green Witch's Garden, Magical Household, Whitehurst flower magic | adequate 4/4 Green Witch's Garden, Whitehurst flower magic | adequate 5/5 Green Witch's Garden, Whitehurst flower magic | adequate 4/4 Green Witch's Garden, Whitehurst flower magic | absent 0/0 | adequate 5/5 Blonde, Herstik, Green Witch's Garden, Whitehurst flower magic | adequate 5/6 Blonde, Whitehurst flower magic | adequate 4/4 Carrellas, Green Witch's Garden, Whitehurst flower magic |
| `table` | adequate 4/4 Buckland, Anand, Magical Household | strong 12/15 Dykes/Gibson, Dominguez, Anand, Saint Thomas | adequate 3/4 Dominguez, Saint Thomas, Magical Household | adequate 5/6 Magical Household, Whitehurst flower magic, Woodward | thin 1/2 Whitehurst flower magic | thin 1/1 Moon Book | absent 0/0 | thin 2/2 Blonde, Woodward | thin 1/1 Whitehurst flower magic | thin 1/1 Anand |
| `vessel` | adequate 3/3 Moon Book, Green Witch's Garden, Whitehurst flower magic | thin 2/2 Miller, Moon Book | adequate 6/6 Blonde, Saint Thomas, Whitehurst, Woodward | strong 12/13 Herstik, Saint Thomas, House Witch, Whitehurst flower magic | thin 2/2 Woodward | adequate 4/5 Anand, Moon Book, House Witch, Whitehurst flower magic | thin 1/1 Whitehurst flower magic | adequate 6/6 Herstik, Saint Thomas, Moon Book, Magical Household | thin 2/2 Saint Thomas, Whitehurst flower magic | adequate 5/6 Carrellas, Miller, Woodward |
| `words` | adequate 4/4 Dominguez, Anand, Moon Book, Woodward | thin 1/3 Dominguez | adequate 5/5 Herstik, Saint Thomas, Moon Book | adequate 6/6 Blonde, Dykes/Gibson, Anand, Whitehurst | adequate 9/12 Dominguez, Anand, Moon Book, House Witch | adequate 9/10 Blonde, Carrellas, Herstik, Dominguez | adequate 5/5 Blonde, Herstik, Saint Thomas | adequate 9/11 Blonde, Herstik, Saint Thomas, Moon Book | strong 40/44 Blonde, Carrellas, Herstik, Madame Pamita | strong 13/17 Carrellas, Herstik, Anand, Miller |
| `body` | strong 10/11 Herstik, Anand, Miller, Saint Thomas | thin 2/2 Herstik, Moon Book | adequate 4/5 Carrellas, Miller, Saint Thomas, House Witch | adequate 5/6 Herstik, Anand, Saint Thomas, Moon Book | thin 1/1 Carrellas | strong 24/28 Carrellas, Herstik, Anand, Miller | adequate 3/3 Carrellas, Herstik, Saint Thomas | strong 13/14 Carrellas, Herstik, Anand, Saint Thomas | thin 2/2 Saint Thomas | strong 21/21 Blonde, Carrellas, Herstik, Anand |
| `doorway` | thin 1/2 Magical Household | thin 2/3 Blonde, Carrellas | absent 0/0 | thin 2/2 Herstik, House Witch | absent 0/0 | absent 0/0 | adequate 4/4 Blonde, Magical Household, Whitehurst | adequate 3/4 House Witch, Magical Household | absent 0/0 | absent 0/0 |

## Source-family runtime counts

| Source family | Total imported | Recommendation eligible | Direct-use only |
| --- | ---: | ---: | ---: |
| Blonde, Hearth and Home Witchcraft | 26 | 26 | 0 |
| Buckland, Practical Candleburning Rituals | 13 | 12 | 1 |
| Carrellas, Urban Tantra | 55 | 44 | 11 |
| Dykes/Gibson, Astrological Magic | 26 | 26 | 0 |
| Gamache, The Master Book of Candle Burning | 24 | 14 | 10 |
| Herstik, Sacred Sex | 69 | 69 | 0 |
| Ivo Dominguez Jr., Practical Astrology for Witches and Pagans | 13 | 6 | 7 |
| Madame Pamita, The Book of Candle Magic | 42 | 40 | 2 |
| Margot Anand, The Art of Sexual Magic | 32 | 28 | 4 |
| Miller, Sex, Sorcery, and Spirit | 22 | 18 | 4 |
| Saint Thomas, Sex Witch | 50 | 40 | 10 |
| Sarah Faith Gottesdiener, The Moon Book | 21 | 21 | 0 |
| The Green Witch's Garden | 16 | 16 | 0 |
| The House Witch | 15 | 15 | 0 |
| The Magical Household | 15 | 15 | 0 |
| Whitehurst flower magic | 36 | 36 | 0 |
| Whitehurst, Magical Housekeeping | 27 | 23 | 4 |
| Woodward, The Magical Household Cookbook | 14 | 14 | 0 |

## Interpretation notes

- The new adult/private sources are doing real product work. They did not merely add explicit search content; they substantially improve `body + connecting`, `body + steadying`, `words + connecting`, `words + voicing`, and `candlelight + connecting`.
- Candlelight is now the most robust carrier. It has strong runtime coverage in most purposes and adequate runtime coverage in the remaining ones.
- Words are the second strongest carrier, especially for voicing, connecting, remembering, steadying, and releasing.
- Doorway remains the clearest coverage gap. The app can recommend protection and release at thresholds, but doorway tending, remembering, steadying, voicing, and connecting are not meaningfully covered.
- Plant coverage is healthy for domestic plant tending and flower practice, but `plant + protecting` is absent as a primary recommendation lane. This is likely a content-boundary and material-safety issue, not a missing-metadata issue.
- Some table and vessel cells are thin because those carriers often appear as support surfaces or containers inside rituals whose primary work is candlelight, words, body, or plant.

## Suggested next steps

1. Leave the current import in place. The coverage improvement is large and the remaining gaps are honest.
2. Add doorway-specific extraction or authoring only if the product needs doorway to be a full recommendation carrier rather than a specialized threshold/protection lane.
3. Revisit `plant + protecting` only with sources that can support it without unsafe plant, herb, smoke, ingestion, or pet-risk assumptions.
4. Do not inflate secondary carriers to satisfy the matrix. The current import is healthier because primary metadata is doing the truth-telling.
