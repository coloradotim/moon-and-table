# 7x10 content coverage audit

Date: 2026-06-10

Parent issue: #335

Audit artifact: `docs/research/audits/extraction-source-accounting-audit.md`

This is a content audit only. It does not create runtime Ritual records, update recommendation logic, mark candidates reviewed, mark candidates findable, mark candidates direct-use eligible, mark candidates recommendation eligible, or mark anything runtime-ready.

## Executive summary

### Overall verdict

`#335 can close after PM review.`

The second-pass audit found no packet that needs a new extraction packet, full redo, or supplemental accounting issue. The active repaired packets now account for their approved source-gate lanes, and the older repaired/expanded packets are sufficiently source-accounted for authoring/import-prep planning.

The correction from the first pass is not about reopening extraction. It is about coverage truthfulness: several packets have strong primary coverage in their intended lanes but only secondary, thin, or held support elsewhere. Secondary cells must not be counted as solved matrix coverage.

### Highest-confidence covered cells

- `plant + tending`, `plant + marking`, `plant + remembering`, `plant + blessing`, `plant + opening`, `plant + steadying`: Green Witch's Garden and Whitehurst.
- `table + blessing`, `table + marking`, `table + remembering`, `table + connecting`: Magical Household, Whitehurst, Woodward, Anand.
- `vessel + blessing`, `vessel + connecting`, `vessel + remembering`, `vessel + releasing`, `vessel + protecting`: Woodward, Magical Household, House Witch, Moon Book, Buckland.
- `words + voicing`, `words + blessing`, `words + remembering`, `words + connecting`: Anand, Saint Thomas, Moon Book, Magical Household, House Witch, Dominguez.
- `candlelight + opening`, `candlelight + blessing`, `candlelight + steadying`, `candlelight + protecting`, `candlelight + remembering`: Buckland, Magical Household, House Witch, Moon Book, Saint Thomas, Anand.
- `doorway + opening`, `doorway + protecting`, `doorway + releasing`, `doorway + marking`: Magical Household and House Witch.

### Weak/thin cells

- `doorway + voicing`: weak/absent overall.
- `doorway + tending`: weak/absent overall.
- `candlelight + tending`: thin; mostly home-settling, repeated flame practice, or altar-tending.
- `body + remembering`: thin except Moon Book, Anand follow-up, and Magical Household dream/body records.
- `body + protecting`: mostly held or source-boundary-sensitive.
- `vessel + tending`: adequate but usually secondary to kitchen, plant container, cauldron, or altar mechanics.

### Overclaimed/padded cells

- Buckland: `candlelight + connecting` remains thin/held. Buckland's approved scope is candle mechanics.
- Whitehurst: `body` and `doorway` support should stay mostly held/thin; safe flower-table practice is the core.
- Green Witch's Garden: `doorway`, `table`, and `body` are secondary to plant as primary carrier.
- Woodward: `plant` and `body` are often ingredient/preparation supports, not primary coverage. The strongest cells are vessel/table/words.
- Dominguez: timing/source-note support should not be counted as runtime-ready ritual coverage.
- Anand and Saint Thomas: private connection material is valid, but technique-heavy or therapy-adjacent material remains held. Count ritual containers, shared symbols, words, candlelight, table, and integration.

### Packets needing no extraction but needing authoring care

All ten packets need authoring/import-prep care before runtime use. The main reviews are source verification, private-excerpt review, material-form safety, product-boundary review, and schema normalization. No packet should be imported wholesale.

### Packets needing supplement

None.

## Matrix summary table

Cell labels use `strong`, `adequate`, `thin`, `held`, or `absent`, followed by packet IDs. The matrix is a coverage lens, not a mandate to fill every cell.

| Carrier | opening | marking | tending | blessing | remembering | steadying | protecting | releasing | voicing | connecting |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `candlelight` | strong #276 #291 #278 #285 #298 #300 | adequate #276 #291 #285 | thin #276 #291 #278 | strong #276 #291 #278 #285 #300 | adequate #276 #285 #291 | strong #276 #291 #278 #285 | strong #276 #291 #278 #300 | adequate #276 #285 #291 | adequate #276 #300 | adequate #298 #300; Buckland thin |
| `plant` | strong #331 #334 | strong #331 #334 | strong #331 #278 | strong #331 #334 #291 | strong #331 #334 #285 | strong #331 #334 | adequate #331 #334 #291 | adequate #331 #334 #291 | adequate #331 #334 | adequate #331 #334 |
| `table` | strong #291 #298 #300 | strong #291 #334 #298 | adequate #291 #278 | strong #291 #333 #334 #278 | strong #291 #334 #333 | adequate #291 #334 | thin mostly secondary | adequate #291 #333 #334 | adequate #298 #334 #291 | strong #291 #333 #298 #300 |
| `vessel` | adequate #333 #285 #291 | adequate #333 #334 #285 | adequate #333 #278 | strong #333 #334 #291 #278 | strong #333 #334 #285 | adequate #333 #334 #285 | strong #291 #278 #276 | strong #291 #285 #333 | adequate #333 #334 | strong #333 #300; thin #298 |
| `words` | strong #285 #298 #315 | adequate #315 #331 #334 | adequate #331 #333 #298 | strong #291 #278 #285 #300 | strong #285 #298 #315 #334 | adequate #298 #331 #334 | adequate #291 #278 #300 | adequate #285 #291 #300 | strong #298 #300 #315 #334 | strong #298 #300 #333 |
| `body` | adequate #298 #291 #285 | thin | adequate #331 #333 #291 | adequate/held #300 #298 #291 | thin #298 #285 | strong #331 #285 #298 #291 | held/thin #291 #300 | adequate #291 #285 #300 | adequate #298 #291 | strong #298 #300 |
| `doorway` | strong #291 #278 | adequate #291 | absent/thin | thin #291 #278 | thin | thin | strong #291 #278 | adequate #291 #278 | absent/thin | thin threshold support only |

## Packet-by-packet audit

### #331 — Green Witch's Garden plant household practice

1. Source gate read: yes — `docs/research/source-gates/src-plant-murphy-hiscock-green-witchs-garden.md`.
2. Packet read: yes — `docs/research/ritual-candidates/packet-green-witchs-garden-plant-household-practice.md`.
3. Gate-approved lanes: living plant tending, observation, container/window/table plant practice, plant witnessing/blessing, plant-care-as-ritual, journals/memory, seasonal plant markers, placement, garden cleansing/dedication, safe offerings, harvest gratitude, and non-depleting living plant energy.
4. Actual packet coverage: complete approved-scope accounting. It explicitly says it is not representative sampling and inventories plant mechanics across the approved chapters.
5. Candidate counts and dispositions: 80 inventoried; 42 candidate records; 36 `candidate_extract_now`; 12 `candidate_extract_later`; 16 `source_note_only`; 15 `hold`; 1 `reject`.
6. 7x10 primary coverage: strong `plant + tending/opening/marking/blessing/remembering/steadying/releasing/connecting`; adequate `plant + protecting/voicing`; vessel support via containers/terrariums; words via journal and plant speech.
7. Secondary coverage not to over-count: table, body, vessel, and doorway support are real but mostly secondary to plant as primary carrier.
8. Held/rejected/source-note-only boundaries: Chapter 6 correspondence lists, medicinal claims, recipes/ingestion, smoke/oil/body preparations, public-land planting, plant familiars, genius loci, field spirits, spirit houses, and named high-risk plants.
9. Verdict: `no_action`.
10. Authoring/import-prep notes: all 36 `candidate_extract_now` records move into authoring/import prep after source verification and plant-safety review.

### #333 — Woodward kitchen vessel magic

1. Source gate read: yes — `docs/research/source-gates/src-vessel-woodward-kitchen-witchery.md`.
2. Packet read: yes — `docs/research/ritual-candidates/packet-woodward-kitchen-vessel-magic.md`.
3. Gate-approved lanes: intention before kitchen work, centering, ordinary kitchen action as ritual action, shared cup/bowl/pot/table practices, table blessing, meal-as-connection, seasonal food marking, water-vessel reflection, safe kitchen object preparation, repeated household food memory.
4. Actual packet coverage: complete approved-scope accounting after supplement. It expands beyond the original Batch A vessel/shared-object sample.
5. Candidate counts and dispositions: 57 inventoried; 26 candidate records. All records marked `candidate_extract_now` move forward; held/rejected/source-note rows remain limited.
6. 7x10 primary coverage: strong `vessel + connecting/blessing/remembering/voicing`, `table + blessing/connecting/marking/remembering`, `words + voicing`, and adequate `body + tending` through ordinary kitchen action.
7. Secondary coverage not to over-count: plant/ingredient and body/preparation support are often secondary. Candlelight is atmosphere only unless fire-safe and separately authored.
8. Held/rejected/source-note-only boundaries: no recipes, ingredient database, exact charms/petitions, health/nutrition claims, non-mutual influence workings, luck/result database behavior, unsafe ingestion, smoke/oils/topicals, risky foods, alcohol/caffeine defaults, or culturally specific obligations without review.
9. Verdict: `no_action`.
10. Authoring/import-prep notes: all `candidate_extract_now` records move into authoring/import prep after source verification and food/allergy/pet/household safety review.

### #334 — Whitehurst flower table magic

1. Source gate read: yes — `docs/research/source-gates/src-plant-whitehurst-magic-of-flowers.md`.
2. Packet read: yes — `docs/research/ritual-candidates/packet-whitehurst-flower-table-magic.md`.
3. Gate-approved lanes: cut flower/table/vase/message/memory/blessing, flower proximity, ethical gathering, offerings, purchased bouquet intention, quiet contemplation, flower care, flower charm/token, flower altar/table/vase, flower-as-message/gift/witness, release/return, pressed/dried memory token, and correspondence-assisted selection as source-note support.
4. Actual packet coverage: complete approved-scope accounting after correction. It now accounts for orientation mechanics, appendices, and every flower entry.
5. Candidate counts and dispositions: 96 inventoried; 36 candidate records; 31 `candidate_extract_now`; 37 `candidate_extract_later`; 6 `source_note_only`; 1 `context_only`; 18 `hold`; 3 `reject`; 25 items with private-excerpt recommendations.
6. 7x10 primary coverage: strong `plant + opening/marking/tending/blessing/remembering/steadying/voicing/connecting`; adequate `plant + protecting/releasing`; strong table/vessel memory/blessing support; words support spoken purpose and journal follow-up.
7. Secondary coverage not to over-count: body and doorway support are mostly held/thin. Candlelight is atmosphere/altar support, not a Whitehurst primary lane.
8. Held/rejected/source-note-only boundaries: flower essences, mists, oils, baths, smoke/incense/diffusion, direct-contact practices, food/drink use, unsafe flowers, health-adjacent claims, non-mutual influence framing, and whole correspondence tables.
9. Verdict: `no_action`.
10. Authoring/import-prep notes: all 31 `candidate_extract_now` records move into authoring/import prep after source verification and flower-specific safety review.

### #300 — Saint Thomas connection source

1. Source gate read: yes — `docs/research/source-gates/src-connection-saint-thomas-sex-witch.md`.
2. Packet read: yes — `docs/research/ritual-candidates/packet-saint-thomas-sex-witch.md`.
3. Gate-approved lanes: private consensual connection, candlelight, altar/table, vessel/jar, bath/bedroom, written/spoken intention, body/self-blessing, glamour, invitation, protection, relationship tending, release, closing, and grimoire follow-up.
4. Actual packet coverage: complete approved-scope accounting. It covers ritual containers, candlelit atmosphere, altar/table setup, shared symbols, shared intention, spoken purpose, heart/partner witnessing, invitation, integration, repeated practice, memory follow-up, glamour/body blessing, desire voicing, bath/bedroom/love table, repair/boundary, vessel/jar, and protection/uncrossing mechanics.
5. Candidate counts and dispositions: 98 inventoried; 45 `candidate_extract_now`; 26 `candidate_extract_later`; 1 `private_excerpt_reference`; 49 items with private-excerpt recommendations; 3 `source_note_only`; 19 `hold`; 4 `reject`.
6. 7x10 primary coverage: strong `candlelight + connecting/blessing/opening`, `table + connecting/blessing`, `vessel + connecting/releasing/protecting`, `words + voicing/connecting/protecting`, `body + blessing/connecting`, and adequate `remembering/tending/releasing` via grimoire, relationship repair, and boundary work.
7. Secondary coverage not to over-count: doorway appears only in protection/banishing contexts and should not be inflated. Body mechanics are private and need authoring care but are not inherently off-product.
8. Held/rejected/source-note-only boundaries: exact incantations/prayers/chants, non-mutual attraction, revenge/hex/enemy work, technique instruction, body-fluid mechanics, drug/smoke material, clinical/legal/advice content.
9. Verdict: `no_action`.
10. Authoring/import-prep notes: all 45 `candidate_extract_now` records move into authoring/import prep. Do not over-warn or flatten into relationship advice; preserve private, adult, warm, magical ritual container language.

### #285 — Moon Book lunar-cycle source

1. Source gate read: yes — `docs/research/source-gates/src-mod-moon-gottesdiener-2020-moon-book.md`.
2. Packet read: yes — `docs/research/ritual-candidates/packet-moon-book-lunar-cycle.md`.
3. Gate-approved lanes: lunar phase structure, new/waxing/full/waning/dark moon mechanics, journaling/cycle tracking, intention, release, blessing, gratitude, protection, reflection, moon altar, candle, vessel/water, words, and body-based mechanics.
4. Actual packet coverage: complete extraction accounting after repair. Timing/source-note card work remains separate and should not reopen accounting.
5. Candidate counts and dispositions: 112 inventoried; 64 `candidate_extract_now`; 10 `candidate_extract_later`; 15 `source_note_only`; 8 `context_only`; 15 `hold`; 61 private-excerpt recommendations.
6. 7x10 primary coverage: strong `words + remembering/voicing`, `vessel + marking/blessing/releasing`, `candlelight + opening/blessing/marking`, `table + marking/blessing`, `body + steadying/releasing`, and lunar-cycle `opening/tending/marking/releasing/remembering`.
7. Secondary coverage not to over-count: timing architecture is not itself runtime ritual coverage unless paired with candidate mechanics. Plant/cultural/moon-name material is not generally available.
8. Held/rejected/source-note-only boundaries: exact prompts/spells/meditations, cultural/living-practice moon names, deity/spirit/ancestor material, health-adjacent claims, hex/binding/revenge, herb/oil/crystal/smoke/ingestion claims.
9. Verdict: `no_action`; separate timing-card work remains.
10. Authoring/import-prep notes: all 64 `candidate_extract_now` records move into authoring/import prep after source verification and private-excerpt handling. #318/#319 timing-card work is separate.

### #315 — Dominguez practical astrology

1. Source gate read: yes — `docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md`.
2. Packet read: yes — `docs/research/ritual-candidates/packet-dominguez-practical-astrology.md`.
3. Gate-approved lanes: planet families, planetary days/hours, Moon phase/sign/VOC/aspect timing, glyph-as-marking, timing adaptation, symbolic marks, household table/altar/words/candle/vessel/body practices shaped by astrology, magick-square source notes/private-excerpts.
4. Actual packet coverage: complete extraction accounting for approved lanes. It also correctly separates timing/source-note infrastructure from ritual accounting.
5. Candidate counts and dispositions: 53 inventoried; 22 `candidate_extract_now`; 13 `candidate_extract_later`; 2 `private_excerpt_reference`; 20 private-excerpt recommendations; 10 `source_note_only`; 3 `context_only`; 5 `hold`.
6. 7x10 primary coverage: strong `words + marking/voicing`, `table + marking`, `candlelight + blessing/opening`, `vessel + remembering`, `body + steadying`, and adequate `opening/blessing/protecting` by planet family.
7. Secondary coverage not to over-count: timing explanations, houses/aspects, magick squares, and correspondence tables are source-note support unless turned into reviewed candidates.
8. Held/rejected/source-note-only boundaries: horoscope/personality/chart-reading, deterministic transits, relationship compatibility, ceremonial contact, full pathworkings/tables/procedures, technical talismans, medical/body diagnosis, plant/herb/oil material.
9. Verdict: `no_action`; separate astrology timing/source-note card work remains under #318/#320.
10. Authoring/import-prep notes: all 22 `candidate_extract_now` records move into authoring/import prep after source verification. Do not import hard timing rules.

### #291 — Magical Household domestic / threshold / altar

1. Source gate read: yes — `docs/research/source-gates/src-mod-house-cunningham-harrington-magical-household.md`.
2. Packet read: yes — `docs/research/ritual-candidates/packet-magical-household-domestic-threshold-altar.md`.
3. Gate-approved lanes: hearth/flame, thresholds/doors/windows/keys/locks, furnishings, kitchen/stove/spoon/table/food, body tending, indoor plants/garden, animal/pet material with limits, protection, bottles/sachets/amulets, broom/rag, cleansing, purification, moving, magical year, house spells, and household altar.
4. Actual packet coverage: complete approved-scope accounting. It inventories 187 items across the scan and includes all major household mechanics.
5. Candidate counts and dispositions: 187 inventoried; 58 `candidate_extract_now`; 54 `candidate_extract_later`; 26 `source_note_only`; 6 `context_only`; 41 `hold`; 2 `reject`; 71 private-excerpt recommendations.
6. 7x10 primary coverage: strongest broad packet for `doorway + opening/protecting/releasing/marking`, `table + blessing/connecting/marking/tending`, `vessel + protecting/releasing/blessing/opening`, `body + releasing/tending/steadying/opening`, `candlelight + steadying/blessing/protecting/opening`, `words + voicing/protecting/blessing/remembering`, and plant with safety.
7. Secondary coverage not to over-count: pet/animal, omens/divination, deity/spirit, and some herb/oil/bath/food/smoke/fire materials are held; do not treat their presence as coverage.
8. Held/rejected/source-note-only boundaries: exact charms/spells/prayers, deity/spirit/omen material, non-mutual love/fertility workings, animal harm/control, health claims, unsafe fire/smoke/herb/oil/bath/food, guaranteed result claims.
9. Verdict: `no_action`.
10. Authoring/import-prep notes: all 58 `candidate_extract_now` records move into authoring/import prep. Several need authoring revision or private-text review, but that is not an extraction-accounting gap.

### #298 — Anand connection

1. Source gate read: yes — `docs/research/source-gates/src-connection-anand-art-sexual-magic.md`.
2. Packet read: yes — `docs/research/ritual-candidates/packet-anand-connection.md`.
3. Gate-approved lanes: private opt-in partner connection, Magic Circle/container, altar/candle/table, shared symbol, partner communication, shared vision, body/energy practice, partner feedback, ritual greeting, heart connection, clarified intent, closing/integration, journal follow-up.
4. Actual packet coverage: sufficient approved-scope accounting for ritual containers and partner connection mechanics. It correctly holds technique-heavy and therapy-adjacent material.
5. Candidate counts and dispositions: 52 inventoried; 24 `candidate_extract_now`; 12 `candidate_extract_later`; 2 `private_excerpt_reference`; 28 private-excerpt recommendations; 5 `source_note_only`; 2 `context_only`; 6 `hold`; 1 `reject`.
6. 7x10 primary coverage: strong `body + connecting/opening/steadying`, `words + voicing/connecting/remembering`, `table + connecting/marking`, `candlelight + connecting/opening`; thin `vessel + connecting`.
7. Secondary coverage not to over-count: vessel support is thin; specialized terminology and practice menus need boundary review before authoring.
8. Held/rejected/source-note-only boundaries: technique lessons, therapy/wound material, guaranteed manifestation, non-mutual attraction/control, unreviewed terminology, full guided exercises/scripts/diagrams.
9. Verdict: `no_action`.
10. Authoring/import-prep notes: all 24 `candidate_extract_now` records move into authoring/import prep, with private opt-in and non-technique ritual language.

### #278 — House Witch repaired inventory

1. Source gate read: yes — `docs/research/source-gate-house-witch.md`.
2. Packet read: yes — `docs/research/ritual-candidates/repair-house-witch-source-inventory.md`.
3. Gate-approved lanes: hearth/home tending, home-as-sacred-space, kitchen/table spirituality, sacred flame/candle/oil lamp, cauldron/vessel, doorway/threshold cleansing/protection, blessing structures, spoken magic, food/recipe-as-ritual, personal purification, sacred-space creation, ancestor/remembrance with caution, private exact-text excerpt support.
4. Actual packet coverage: repair/backfill accounts for the approved source-gate scope. It reconciles the original 11 candidates and adds inventory, backlog, held/rejected leads, private-excerpt needs, and candidate disposition tracking.
5. Candidate counts and dispositions: 58 inventoried; 11 existing draft candidates; 17 `candidate_extract_later`; 1 `private_excerpt_reference`; 17 private-excerpt recommendations; 14 `source_note_only`; 7 `context_only`; 8 `hold`; 0 `reject`.
6. 7x10 primary coverage: strong `hearth/candlelight + opening/blessing/steadying`, `doorway + protecting/releasing`, `vessel + blessing/protecting`, `table + tending/blessing`, `words + voicing/blessing`, plus household grimoire remembering.
7. Secondary coverage not to over-count: recipe-specific and ancestor/spirit material remain sensitive; oil-lamp/cauldron/fire variants need material-form review.
8. Held/rejected/source-note-only boundaries: deity/spirit, ancestor material beyond remembrance context, genericized smoke cleansing, unsafe cauldron/fire, direct recipe reproduction, correspondence import, herbs/washes, guaranteed outcomes.
9. Verdict: `no_action`.
10. Authoring/import-prep notes: all 11 existing draft candidates move into authoring/import prep after source verification. Candidate_extract_later backlog should remain staged.

### #276 — Buckland candlelight pilot

1. Source gate read: yes — issue #276 plus the packet's allowed-source/product-decision section serve as the preserved gate for this pilot; no separate `source-gates/` file was found in the reviewed paths.
2. Packet read: yes — `docs/research/ritual-candidates/packet-candlelight-buckland-pilot.md`.
3. Gate-approved lanes: candle-magic mechanics only: room/table/altar preparation, candle roles, dressing/anointing, lighting/extinguishing, symbolic placement, repeated sessions, candle movement, photo/object markers, spoken/prayer/script structure, concentration/meditation, completion/closing.
4. Actual packet coverage: complete enough for approved candlelight mechanics. It is correctly narrow and should not be penalized for not covering non-candle carriers.
5. Candidate counts and dispositions: 54 inventoried; 9 `candidate_extract_now`; 8 `candidate_extract_later`; 10 `source_note_only`; 12 `context_only`; 8 `hold`; 7 `reject`; 0 private-excerpt-only items, though private text matters for several candidates.
6. 7x10 primary coverage: strong `candlelight + opening/steadying/releasing/voicing/marking/blessing/protecting/remembering`; moderate `candlelight + tending`; thin/held `candlelight + connecting`.
7. Secondary coverage not to over-count: table/altar/object/photo support is secondary to candlelight. Do not count Buckland as solving table, vessel, or connection broadly.
8. Held/rejected/source-note-only boundaries: exact scripts, prayers, poems, diagrams, paired scripts, non-mutual influence workings, jealousy/enemy/domination, guaranteed health/money/success/protection claims, dark-side appendix material, non-candle appendix material.
9. Verdict: `no_action`.
10. Authoring/import-prep notes: all 9 `candidate_extract_now` records move into authoring/import prep. Several need authoring revision, sourceTextUse, and fire-safety review before schema normalization.

## Content-authoring queue

Every `candidate_extract_now` item in accepted packets moves into authoring/import prep after source verification and packet-specific boundary review. This audit does not hand-pick starters.

| Packet | candidate_extract_now count | Authoring/import-prep handling |
| --- | ---: | --- |
| #331 Green Witch's Garden | 36 | Move all 36 to authoring/import prep after plant safety and source verification. |
| #333 Woodward Kitchen Witchery | all packet records marked `candidate_extract_now` | Move all now-candidates to authoring/import prep after food/allergy/material review. |
| #334 Whitehurst Flowers | 31 | Move all 31 to authoring/import prep after flower safety and source verification. |
| #300 Saint Thomas | 45 | Move all 45 to authoring/import prep; preserve private grimoire tone and consent boundaries. |
| #285 Moon Book | 64 | Move all 64 to authoring/import prep; keep timing-card work separate. |
| #315 Dominguez | 22 | Move all 22 to authoring/import prep; do not import timing rules. |
| #291 Magical Household | 58 | Move all 58 to authoring/import prep; many require private-text/material review. |
| #298 Anand | 24 | Move all 24 to authoring/import prep; private opt-in and non-technique posture required. |
| #278 House Witch | 11 existing draft candidates | Move all 11 reconciled candidates to authoring/import prep. |
| #276 Buckland | 9 | Move all 9 to authoring/import prep; fire safety and private-text review required. |

## Weak-cell backlog

- `doorway + voicing`: no strong source-backed lane yet.
- `doorway + tending`: no strong source-backed lane yet.
- `candlelight + tending`: thin; possible through repeated altar/candle sessions, but not robust.
- `plant + protecting`: adequate but usually safety-sensitive and often held for named-plant screening.
- `body + protecting`: mostly held or requires heavy adaptation.
- `body + remembering`: thin except journaling/body-awareness contexts.
- `vessel + tending`: adequate but often secondary to kitchen, cauldron, plant container, or altar mechanics.
- `candlelight + connecting`: supported by Anand/Saint Thomas; Buckland remains thin/held and should not be used for this cell.

## Overclaim corrections

- Do not treat any source-note-only correspondence table as candidate coverage.
- Do not count secondary carriers toward primary coverage, especially in Woodward, Whitehurst, Green Witch's Garden, and Dominguez.
- Do not treat Moon Book or Dominguez timing/source-note needs as extraction-accounting failure.
- Do not treat Buckland as a general candle-and-connection source. It is primarily candle mechanics, with connection held/thin.
- Do not flatten Magical Household or House Witch domestic practices into chores. Sweeping, washing, tending, table-setting, hearth-lighting, and threshold work remain magical mechanics when source-backed.

## Final recommendation for #335

`#335 can close after PM review.`

Reason: all ten packets have now been checked against their gates and the 7x10 matrix as a coverage lens. The audit finds honest weak/thin/held cells and overclaim corrections, but no remaining extraction source-accounting gap that requires a new packet, supplement issue, or full redo. The next step is authoring/import-prep planning for all `candidate_extract_now` items, with packet-specific source verification, private-excerpt review, material-form review, and product-boundary review before any runtime activation.
