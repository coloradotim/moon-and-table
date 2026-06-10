# Extraction source-accounting audit

Date: 2026-06-10

Parent issue: TBD

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

## Packets in scope

### Active packets being repaired in-place

These are already active and should be fixed inside their existing issues before PM closeout:

| Issue | Packet | Current action |
| ---: | --- | --- |
| #331 | `docs/research/ritual-candidates/packet-green-witchs-garden-plant-household-practice.md` | Send back for complete approved-scope accounting. |
| #333 | `docs/research/ritual-candidates/packet-woodward-kitchen-vessel-magic.md` | Send back for complete approved-scope accounting. |
| #334 | `docs/research/ritual-candidates/packet-whitehurst-flower-table-magic.md` | Send back for complete approved-scope accounting. |

### Older completed packets to audit/repair

| Issue | Packet | Source |
| ---: | --- | --- |
| #276 | `docs/research/ritual-candidates/packet-candlelight-buckland-pilot.md` | Raymond Buckland, *Practical Candleburning Rituals* |
| #278 | House Witch packet path to verify from issue/file | Arin Murphy-Hiscock, *The House Witch* |
| #285 | `docs/research/ritual-candidates/packet-moon-book-lunar-cycle.md` | Sarah Faith Gottesdiener, *The Moon Book* |
| #291 | `docs/research/ritual-candidates/packet-magical-household-domestic-threshold-altar.md` | Scott Cunningham & David Harrington, *The Magical Household* |
| #298 | `docs/research/ritual-candidates/packet-anand-connection.md` | Margot Anand, *The Art of Sexual Magic* |
| #300 | `docs/research/ritual-candidates/packet-saint-thomas-sex-witch.md` | Sophie Saint Thomas, *Sex Witch* |
| #315 | `docs/research/ritual-candidates/packet-dominguez-practical-astrology.md` | Ivo Dominguez Jr., *Practical Astrology for Witches and Pagans* |

## Preliminary classifications

These are PM triage classifications based on prior reviews, issue scope, and packet behavior. They should be verified by reading each packet and its controlling source gate before creating repair issues.

### #276 — Buckland candlelight pilot

Preliminary classification: `supplemental_accounting_likely`

Reason:

The Buckland packet began as a candlelight carrier pilot. It may be broad across candlelight purposes, but it was still carrier-pilot framed rather than full approved-source accounting. It likely accounts for candlelight well, but may not fully account for non-candle ritual mechanics, words, table, vessel, body, or threshold elements that appear inside the approved source.

Likely missing / under-accounted families to verify:

```text
non-candle ritual containers
spoken/prayer/charm structures as private excerpts
paper/petition mechanics
object/table setup mechanics
closing/integration patterns
held/rejected coercive/prosperity/protection variants by source family
all approved source ranges beyond the pilot carrier cells
```

Recommended action: `audit_then_supplement_if_needed`

### #278 — House Witch hearth/home/kitchen/threshold

Preliminary classification: `supplemental_accounting_likely`

Reason:

House Witch was an early pilot and may not have been held to the now-corrected complete-accounting standard. It likely covered hearth/home/kitchen/threshold well enough for pilot purposes, but may under-account household memory, vessel/kept-object practices, table practices, doorway routines, repeated household tending, and source-note/private-excerpt rows.

Likely missing / under-accounted families to verify:

```text
household memory / hearth memory
kept objects and household vessels
doorway/threshold routines beyond protection
words/spoken blessing mechanics
seasonal/repeated home-tending patterns
kitchen table/vessel overlap with Woodward
held/rejected oil/smoke/ingestion/fire material
```

Recommended action: `audit_then_supplement_if_needed`

### #285 — Moon Book lunar-cycle source

Preliminary classification: `supplemental_accounting_needed`

Reason:

Moon Book is timing-rich and ritual-rich. It almost certainly needs both complete ritual-source accounting and reusable lunar timing/source-note cards. #319 already exists to retrofit Moon Book into lunar timing cards, but that does not necessarily repair candidate-source accounting.

Likely missing / under-accounted families to verify:

```text
full moon phase / lunation ritual arc
phase-specific practices beyond representative candidates
journaling/reflection prompts
body/words/table/vessel/candle practices by phase
repetition and cycle follow-up practices
private-excerpt prompts / exact wording needs
lunar timing cards and why-this-moment patterns
held/rejected manifestation, therapy, medical, or deterministic claims
```

Recommended action: `supplemental_accounting_needed`, coordinated with #319.

### #291 — Magical Household domestic / threshold / altar

Preliminary classification: `supplemental_accounting_likely`

Reason:

Magical Household is a rich domestic ritual source. The packet was accepted as an inventory-aware extraction packet, but its title/scope suggest domestic/threshold/altar emphasis rather than full approved-source accounting. Needs verification before runtime import.

Likely missing / under-accounted families to verify:

```text
household blessing and clearing
threshold/doorway rites
altar/table setup
vessel/bowl/cup practices
spoken charms/prayers/private excerpt references
repeated home-care rituals
object placement/return
held/rejected herb/incense/oil/fire practices
all source items with dispositions
```

Recommended action: `audit_then_supplement_if_needed`

### #298 — Anand connection

Preliminary classification: `supplemental_accounting_likely`

Reason:

The Anand packet was accepted for connection/intimacy ritual work, but review notes emphasized selected ritual containers: Magic Circle, altar/candle/table setup, shared symbol, shared intention, spoken purpose, witnessing, greeting, closing, and journal/memory. It likely did not fully account for all approved connection ritual mechanics within the source limits.

Likely missing / under-accounted families to verify:

```text
all approved ritual container structures
shared intention and spoken purpose variants
altar/candle/table/symbol variants
heart-connection and witnessing mechanics
ritual greeting/closing/integration patterns
repeated practice/journal follow-up
body/energy practices held or converted to source notes
private-excerpt references for exact practices
held/rejected workshop/neotantra/technique-heavy material
```

Recommended action: `audit_then_supplement_if_needed`

### #300 — Saint Thomas connection source

Preliminary classification: `supplemental_accounting_needed`

Reason:

Saint Thomas was accepted as a packet path, but there were known cleanup issues: canonical path mismatch and a typo. More importantly, the source is broad: candle spell architecture, glamour/body blessing, desire voicing, bath/bedroom/love table, relationship repair, vessel/jar work, protection/uncrossing/boundaries. This likely needs stronger source-complete accounting across approved limits.

Known cleanup:

```text
Actual packet path: docs/research/ritual-candidates/packet-saint-thomas-sex-witch.md
Issue #300 requested: docs/research/ritual-candidates/packet-saint-thomas-connection.md
Known typo: doorwav -> doorway in coverage table
```

Likely missing / under-accounted families to verify:

```text
full candle ritual architecture
beauty/glamour/body blessing
desire/relationship voicing
love table/bedroom/bath as ritual settings
relationship repair and boundaries
protection/uncrossing/boundary mechanics
vessel/jar mechanics beyond protection
private-excerpt references for spells/words
held/rejected coercive/unsafe/body/oil/bath material
```

Recommended action: `supplemental_accounting_needed`, plus path/typo cleanup.

### #315 — Dominguez practical astrology

Preliminary classification: `supplemental_accounting_needed_but_split`

Reason:

Dominguez produced a good extraction packet with embedded timing/source-note infrastructure, but it did not produce standalone timing-card artifacts. #320 exists to convert Dominguez into astrology timing cards after #318. However, candidate-source accounting may also need supplementation if the packet over-focused on selected timing families.

Likely missing / under-accounted families to verify:

```text
planetary family mechanics beyond selected Sun/Moon/Mercury/Venus/Jupiter/Saturn examples
planetary day/hour variants
Moon sign/aspect/VOC/timing adaptation variants
retrograde and imperfect timing support
aspect-weather source notes
glyph-as-marking variants
magick square source-note/private-excerpt handling
aura/body/spirit/talisman sections held with explicit dispositions
all timing source-note records coordinated with #318/#320
```

Recommended action: `defer_until_318_for_timing_cards`, then `supplemental_accounting_if_candidate_packet_still_thin`.

## Recommended repair order

1. Finish active packet supplements first: #333, #331, #334.
2. Do not advance #287 bulk import until this audit is acted on.
3. Repair highest-risk older packets first:

```text
1. #300 Saint Thomas
2. #285 Moon Book
3. #315 Dominguez, after #318 timing-card model
4. #291 Magical Household
5. #298 Anand
6. #278 House Witch
7. #276 Buckland
```

Rationale:

- Saint Thomas has known cleanup issues and broad source scope.
- Moon Book and Dominguez affect the timing engine and explanation layer.
- Magical Household is broad domestic infrastructure.
- Anand and House Witch are important but likely narrower or already partially repaired.
- Buckland may be mostly adequate for candlelight carrier coverage but should still be audited.

## Standard supplement issue template

Use this pattern for any packet requiring repair:

```text
Title: Supplement <SOURCE> packet with complete approved-scope accounting

Scope:
Do not discard the existing packet. Keep existing candidates. Supplement the packet with complete source accounting across the approved source-gate scope.

This is not a representative-sample extraction. This packet must provide a complete accounting of all ritual mechanics within the approved source-gate scope. Candidate activation may be staged later, but source accounting must be complete now.

Tasks:
1. Re-read the controlling source gate.
2. Re-read the existing packet.
3. Identify all approved-scope source mechanics not yet inventoried.
4. Add missing source inventory rows with dispositions.
5. Add missing candidate records only where warranted.
6. Add candidate_extract_later / source_note_only / private_excerpt_reference / hold / reject rows where runtime candidate extraction is not appropriate.
7. Update metrics, coverage records, variant/split ledger, rejected/held leads, gap notes, backlog, and validation checklist.
8. Keep everything research-only/draft.

Do not create runtime Ritual records. Do not mark anything reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.
```

## Operating decision

Until this audit is resolved, #287 should be considered blocked or at least unsafe to execute broadly. It can be revised later to import only packets that pass the source-accounting check.
