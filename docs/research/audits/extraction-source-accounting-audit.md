# Extraction source-accounting audit

Date: 2026-06-10

Parent issue: #335

## Why this audit exists

Moon & Table has been using rich source-backed extraction packets to build a private ritual library. A process problem emerged: several extraction packets were created from issue-specific coverage gaps, then risked being treated as if they fully accounted for the source.

The corrected principle is:

```text
Source gates can be gap-driven.
Extraction packets must be source-accounting-driven.
Runtime activation can still be narrowly batched.
```

A source-accounting-complete extraction packet does not need to make every source item a runtime Ritual. It does need to inventory the approved source-gate scope and disposition every ritual mechanic, exercise, spell/charm structure, prompt, object practice, timing practice, offering, blessing, symbolic action, source note, held item, and rejected item.

## Audit standard

For each packet, this audit asks:

1. Did the packet account for all approved source-gate ritual mechanics?
2. Or was it only a lane / pilot / Batch A extraction?
3. What approved source ranges or ritual families appear under-accounted?
4. What candidate families are likely missing?
5. Recommended action:
   - `no_action`
   - `supplemental_accounting`
   - `full_redo`
   - `defer_until_dependency`

Use the 7x10 matrix as a coverage lens, not as a padding mandate.

Carriers:

```text
candlelight
plant
table
vessel
words
body
doorway
```

Purposes:

```text
opening
marking
tending
blessing
remembering
steadying
protecting
releasing
voicing
connecting
```

Do not force unsupported cells. Do record weak/unsupported cells honestly.

## Verified decisions

### #331 — Green Witch's Garden plant household practice

Verified decision: `no_action`

Reason:

The supplemented packet has been accepted as complete approved-scope source accounting for the living plant / tending / household plant practice lane.

Authoring/import prep:

```text
All candidate_extract_now records move into Ritual authoring/import prep.
Candidate_extract_later records remain in the later queue.
Held/rejected/source-note-only records keep their dispositions.
```

### #333 — Woodward kitchen vessel magic

Verified decision: `no_action`

Reason:

The supplemented packet has been accepted as complete approved-scope source accounting for the kitchen / vessel / table / everyday domestic magic lane.

Authoring/import prep:

```text
All candidate_extract_now records move into Ritual authoring/import prep.
Candidate_extract_later records remain in the later queue.
Held/rejected/source-note-only records keep their dispositions.
```

### #334 — Whitehurst flower table magic

Verified decision: `no_action`

Reason:

The supplemented packet has been accepted as complete approved-scope source accounting for the flower / table / vase / message / memory / blessing lane.

Authoring/import prep:

```text
All candidate_extract_now records move into Ritual authoring/import prep.
Candidate_extract_later records remain in the later queue.
Held/rejected/source-note-only records keep their dispositions.
Material-form choices are user/household choices; do not turn them into blanket product prohibitions.
```

### #300 — Saint Thomas connection source

Verified decision: `no_action`

Reason:

The Saint Thomas packet was flagged as likely needing supplemental accounting because the source is broad and had known cleanup issues. After reading the source gate and packet, the packet already accounts for the gate-approved lanes at research level: candle spell architecture, glamour/body blessing, desire voicing, bath/bedroom/love table, relationship repair, vessel/jar work, protection/uncrossing/boundaries, private-excerpt needs, and held/rejected material.

Metrics from packet:

```text
source_items_inventoried: 98
candidate_extract_now: 45
candidate_extract_later: 26
private_excerpt_reference: 1
items_with_private_excerpt_recommended: 49
source_note_only: 3
context_only: 0
hold: 19
reject: 4
```

Authoring/import prep:

```text
All 45 candidate_extract_now records move into Ritual authoring/import prep.
The 26 candidate_extract_later records remain in the later decision queue.
The 19 held and 4 rejected records keep their dispositions.
```

Cleanup:

```text
Fix `doorwav` -> `doorway` during the next packet cleanup/import-prep edit.
Canonical path remains: docs/research/ritual-candidates/packet-saint-thomas-sex-witch.md
```

No supplemental source-accounting issue needed.

### #285 — Moon Book lunar-cycle source

Verified decision: `no_action` for extraction accounting; `separate_timing_card_work` remains.

Reason:

The Moon Book packet is already a repaired expanded inventory. It explicitly replaces an earlier under-extracted packet and treats extraction as inventory-first and depth-seeking. It covers the source-gate lanes for lunar-cycle structure, new/waxing/full/waning/dark moon mechanics, lunar journaling and cycle tracking, intention, release, blessing, gratitude, protection, reflection, moon altar, candle, vessel/water, words, and body-based mechanics.

Metrics from packet:

```text
source_items_inventoried: 112
candidate_extract_now: 64
candidate_extract_later: 10
private_excerpt_reference: 0
items_with_private_excerpt_recommended: 61
source_note_only: 15
context_only: 8
hold: 15
reject: 0
```

Authoring/import prep:

```text
All 64 candidate_extract_now records move into Ritual authoring/import prep.
The 10 candidate_extract_later records remain in the later decision queue.
The 15 held records keep their dispositions.
```

Timing-card work:

```text
Moon Book extraction accounting is accepted.
Reusable lunar timing/source-note card work remains separate under #319 / #318-style timing model work.
Do not treat timing-card work as a reason to reopen extraction accounting.
```

No supplemental source-accounting issue needed.

### #315 — Dominguez practical astrology

Verified decision: `no_action` for extraction accounting; `separate_timing_card_work` remains.

Reason:

Dominguez was flagged as split because it overlaps timing/source-note infrastructure. After reading the source gate and packet, the packet already accounts for the gate-approved extraction lanes at research level: planet families, planetary days/hours, Moon phase/sign/VOC/aspect timing, glyph-as-marking, timing adaptation, retrograde/imperfect timing support, magick squares as source-note/private-excerpt material, aura/body/spirit/talisman boundaries, and held/rejected material.

Metrics from packet:

```text
source_items_inventoried: 53
candidate_extract_now: 22
candidate_extract_later: 13
private_excerpt_reference: 2
items_with_private_excerpt_recommended: 20
source_note_only: 10
context_only: 3
hold: 5
reject: 0
```

Authoring/import prep:

```text
All 22 candidate_extract_now records move into Ritual authoring/import prep.
The 13 candidate_extract_later records remain in the later decision queue.
The 5 held records keep their dispositions.
```

Timing-card work:

```text
Dominguez extraction accounting is accepted.
Standalone astrology timing/source-note card work remains separate under #318/#320.
Do not treat #318/#320 as extraction repair.
```

No supplemental source-accounting issue needed.

## Packets still to verify

| Issue | Packet | Source | Current action |
| ---: | --- | --- | --- |
| #291 | `docs/research/ritual-candidates/packet-magical-household-domestic-threshold-altar.md` | Scott Cunningham & David Harrington, *The Magical Household* | Audit against source gate. |
| #298 | `docs/research/ritual-candidates/packet-anand-connection.md` | Margot Anand, *The Art of Sexual Magic* | Audit against source gate. |
| #278 | House Witch packet path to verify from issue/file | Arin Murphy-Hiscock, *The House Witch* | Audit against source gate. |
| #276 | `docs/research/ritual-candidates/packet-candlelight-buckland-pilot.md` | Raymond Buckland, *Practical Candleburning Rituals* | Audit against source gate; supplement only if evidence supports it. |

## Current repair order

```text
1. #291 Magical Household
2. #298 Anand
3. #278 House Witch
4. #276 Buckland
```

## Operating decision

Do not advance #287 bulk import broadly until this audit is resolved. It can be revised later to import only packets that pass the source-accounting check.

Accepted source-accounting packets should feed a separate Ritual authoring/import-prep queue. That queue should carry all `candidate_extract_now` records forward, not a hand-picked subset.