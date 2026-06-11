# Packet-level coverage audit: four extraction packets

## Scope

This is a gap-only, packet-level coverage audit across four completed extraction packets. It does not import runtime Rituals, promote candidates, create issues, run source gates, run extraction, or make an implementation plan.

Primary carrier and primary purpose only are counted toward matrix coverage. Secondary carriers and secondary purposes are not counted as solving a cell.

## Packets audited

Requested packet paths:

```text
docs/research/ritual-candidates/packet-candlelight-buckland-pilot.md
docs/research/ritual-candidates/packet-house-witch-pilot.md
docs/research/ritual-candidates/packet-moon-book-lunar-cycle.md
docs/research/ritual-candidates/packet-magical-household-domestic-threshold-altar.md
```

Actual committed paths used:

```text
docs/research/ritual-candidates/packet-candlelight-buckland-pilot.md
docs/research/ritual-candidates/repair-house-witch-source-inventory.md
docs/research/ritual-candidates/packet-moon-book-lunar-cycle.md
docs/research/ritual-candidates/packet-magical-household-domestic-threshold-altar.md
```

Path note: `docs/research/ritual-candidates/packet-house-witch-pilot.md` was not found. The committed House Witch artifact used for this audit is `docs/research/ritual-candidates/repair-house-witch-source-inventory.md`, which identifies itself as the extraction repair / inventory backfill for the existing #278 House Witch extraction packet and reconciles the 11 existing candidates.

## Classification definitions

- `strong`: multiple good candidates or one especially strong candidate, with manageable review/safety burden.
- `adequate`: usable coverage exists, but not deep.
- `thin`: only one weak/narrow candidate, or coverage depends on later authoring.
- `empty`: no real candidate coverage by primary carrier + primary purpose.
- `fragile`: appears covered, but mostly depends on held, safety-heavy, operative-text-review-heavy, culturally sensitive, exact-text-heavy, or otherwise difficult material.

## 1. Executive summary: biggest gaps

The four packets now cover the main Moon & Table feel far better than earlier packets did. The remaining gaps are not broad domestic magic or lunar ritual gaps. They are specific primary-cell gaps where a carrier exists in the source material but does not yet have a clean, authorable primary-purpose candidate.

Biggest empty cells:

- `candlelight + connecting`
- `doorway + steadying`
- `doorway + tending`
- `doorway + remembering`
- `table + voicing`
- `plant + opening`
- `plant + voicing`
- `plant + remembering`
- `vessel + connecting`

Biggest thin cells:

- `candlelight + marking`
- `table + releasing`
- `table + protecting`
- `table + remembering`
- `doorway + voicing`
- `doorway + blessing`
- `plant + steadying`
- `plant + marking`
- `body + voicing`
- `body + blessing`
- `body + protecting`
- `body + remembering`

Biggest fragile cells:

- `plant + protecting`
- `plant + blessing`
- `plant + releasing`
- `vessel + protecting`
- `vessel + remembering`
- `words + voicing`
- `words + protecting`
- `words + blessing`
- `candlelight + protecting`
- `candlelight + blessing`

Important source-diversity issue: Moon Book dominates lunar timing and phase-shaped work; Magical Household dominates doorway, protection, broom/rag, moving, plant/garden, and household altar; Buckland is almost entirely candlelight; House Witch carries the hearth/home/kitchen bridge. Cells that depend on only one of those sources should be treated as less resilient until authoring review confirms they feel native to Moon & Table.

## 2. Carrier × purpose matrix

| Carrier \ Purpose | steadying | opening | releasing | tending | connecting | voicing | marking | blessing | protecting | remembering |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| candlelight | strong | strong | adequate | adequate | empty | fragile | thin | fragile | fragile | adequate |
| table | adequate | strong | thin | strong | strong | empty | strong | strong | thin | thin |
| doorway | empty | strong | adequate | empty | thin | thin | adequate | thin | strong | empty |
| plant | thin | empty | fragile | strong | thin | empty | thin | fragile | fragile | empty |
| words | adequate | strong | adequate | adequate | thin | fragile | adequate | fragile | fragile | strong |
| vessel | thin | adequate | strong | adequate | empty | adequate | thin | adequate | fragile | fragile |
| body | strong | strong | strong | strong | adequate | thin | adequate | thin | thin | thin |

## 3. Empty cells

### `candlelight + connecting`

Buckland has candlelight relationship material, but much of it is excluded or held because of influence/relationship-ethics concerns. Moon Book and Magical Household use candlelight heavily, but their connecting work is usually table-, words-, or household-centered rather than primarily candlelight. This remains genuinely empty by primary carrier/purpose.

### `doorway + steadying`

Doorway is strong for opening, protecting, releasing, and marking, but not for quieting, settling, or steadying. Existing doorway candidates are threshold-crossing, key/window, guest, moving, and protection practices.

### `doorway + tending`

There are doorway cleaning/protection practices, but their primary purpose is usually opening, releasing, or protecting. No strong doorway-first tending practice exists yet.

### `doorway + remembering`

Moving/threshold candidates may eventually support memory and transition, but the current primary cell is opening/releasing/marking. There is no real doorway + remembering candidate.

### `table + voicing`

Table rituals often include words, but primary voicing is not currently table-led. Existing table candidates are blessing, connecting, marking, opening, tending, or steadying.

### `plant + opening`

Plant material is strong for tending, protection, blessing, and garden practice. It does not yet provide a clean plant-first opening practice.

### `plant + voicing`

The plant/garden material contains words and spoken intent, but not as primary plant + voicing candidates. Current plant coverage is mostly tending/protecting/blessing.

### `plant + remembering`

Seasonal and garden work could become remembering, but the current plant candidates do not primarily carry memory/remembrance.

### `vessel + connecting`

Vessels are strong for protection, release, blessing, opening, and some tending. Shared vessels, cups, bowls, jars, or cauldrons do not yet have strong primary connecting coverage.

## 4. Thin cells

### `candlelight + marking`

Buckland has a seven-night repeated candle sequence and Moon Book has phase candle work, but the cell depends on authoring-sensitive sequencing and exact-text/private-source handling. It is usable but not deep enough as a clean primary cell.

### `table + releasing`

Release often happens at tables, bowls, altars, or during full/waning work, but primary table + releasing is not yet well represented. Most release candidates are body, vessel, words, or doorway first.

### `table + protecting`

Tables are strong for blessing, marking, connecting, and tending. Protection tends to use doorway, vessel, words, candlelight, or plant as the primary carrier.

### `table + remembering`

Moon Book and House Witch have grimoire and review patterns, but most are words-first or product-follow-up patterns rather than table-first remembrance rituals.

### `doorway + voicing`

There is a doorway wish and threshold spoken boundary material, but it is narrow and likely needs careful authoring to avoid being merely a spoken prompt at a door.

### `doorway + blessing`

Moving/new-home rites touch doorway blessing, but the strongest blessing candidates are table-, candlelight-, or vessel-led. Doorway blessing is present but not deep.

### `plant + steadying`

Bedroom/indoor plant material exists, but it is safety-heavy, correspondence-heavy, or later-authoring material. This remains thin.

### `plant + marking`

Seasonal altar and garden timing material touch this, but plant-first marking is not yet cleanly represented.

### `body + voicing`

Broom wish and body/voice practices exist, but voicing is usually words-first. Body + voicing is narrow.

### `body + blessing`

Bath/body/cosmetic material can become blessing, but current clean body candidates lean releasing, tending, opening, or steadying.

### `body + protecting`

There are some protection practices involving body movement or sweeping, but primary protection usually sits with doorway, vessel, candlelight, plant, or words.

### `body + remembering`

Dream and lunar body practices touch remembering, but current remembrance candidates are mostly words/table/vessel.

## 5. Fragile cells

### `plant + protecting`

This appears well covered in Magical Household and House Witch, but it is fragile because many plant candidates require toxicity, pet, allergy, pregnancy, ingestion, smoke, and provenance review. Plant protection should not be treated as easy coverage.

### `plant + blessing`

Garden, indoor plant, and seasonal candidates create coverage, but the cell depends heavily on plant correspondences and safety filtering.

### `plant + releasing`

Herb waters, washes, purification, and some garden practices create potential coverage, but this is safety-heavy and often exact-source or formula-dependent.

### `vessel + protecting`

There is a lot of coverage: spell bottles, sachets, stones, bowls, jars, house amulets, moon vessels, and threshold bottles. The problem is fragility: many candidates require operative text review support and safety review for contents, placement, pets, glass, powders, herbs, and exact charm wording.

### `vessel + remembering`

Moon Book mirror/remembering and House Witch/altar/grimoire material touch this, but vessel + remembering is often operative-text-review-heavy, scrying-adjacent, or secondary. Fragile rather than strong.

### `words + voicing`

There is abundant source support across House Witch, Moon Book, Buckland, and Magical Household, but the cell is fragile because exact prayers, charms, spell formulas, spoken cues, and prompt sets require operative text review handling. It is not weak, but it has a bottleneck.

### `words + protecting`

Protection words, house spells, threshold lines, charms, and spoken formulas are common, but mostly exact-text-heavy or source-boundary-sensitive.

### `words + blessing`

Altar words, prayers, blessings, and table language exist, but many require operative text review and authoring rather than direct generated text.

### `candlelight + protecting`

Coverage is real across Buckland, Moon Book, Magical Household, and House Witch, but much of it depends on exact spell text, protection claims, flame safety, and operative text review. Fragile, not empty.

### `candlelight + blessing`

Similar to protection: multiple candidates exist, especially full moon, hearth, object blessing, and altar work, but exact words, source claims, flame safety, and authoring burden make it fragile.

## 6. Source-diversity gaps

### Buckland-only or Buckland-dominant

- `candlelight + remembering`: Buckland's photo/peace candle structure is still the most direct primary candidate.
- `candlelight + releasing`: Buckland is the cleanest source for candle-centered release, though Moon Book supports related waning release through vessel/words/body.
- `candlelight + marking`: Buckland's repeated sessions and Moon Book's lunar phases overlap, but Buckland provides the strongest non-lunar candle sequence mechanics.

### Moon Book-only or Moon Book-dominant

- Lunar phase-specific opening, tending, marking, and remembrance are overwhelmingly Moon Book-led.
- `words + opening`, `words + remembering`, and lunar grimoire/review patterns depend heavily on Moon Book.
- Jessica's lunar/candle/full-moon interests are mostly Moon Book plus some Buckland/Magical Household support.

### Magical Household-only or Magical Household-dominant

- Doorway primary coverage is mostly Magical Household, with House Witch supporting threshold cleansing.
- Plant/garden coverage is mostly Magical Household, with House Witch adding herbs/washes/crafts but still safety-heavy.
- Broom/rag/purification and moving/new-home coverage are mostly Magical Household.
- Household altar is mostly Magical Household, with House Witch and Moon Book altar material as secondary support.

### House Witch-only or House Witch-dominant

- Spiritual hearth recognition and household hearth identity are mostly House Witch.
- Cauldron/vessel as hearth object is mostly House Witch.
- The warm hearthcraft/kitchen grimoire feel is strongest in House Witch, even when Magical Household has more raw domestic spell density.

## 7. Product-feel gaps

### Coverage exists but still risks feeling like a chore app

- Broom/rag cleaning.
- Window washing.
- Kitchen purification.
- Stove tending.
- Spring cleaning.
- Floor/rug freshening.

These need magical framing, a clear beginning, meaningful action, and a close. Without that, they become household maintenance.

### Coverage exists but still risks feeling like a spell database

- Protection bottles.
- Sachets.
- House spells.
- Key/lock charms.
- Candle protection spells.
- Plant correspondences.

These need authored Moon & Table ritual shape rather than a list of spell ingredients.

### Coverage exists but still risks generic wellness language

- Body steadying.
- Bathing/washing.
- Hair brushing.
- Moon body check-ins.
- Rest/void/dark moon practices.

These need magical/domestic language and source grounding, not self-care filler.

### Coverage exists but is too exact-text dependent

- Spoken hearth words.
- Altar prayers.
- House blessing lines.
- Buckland scripts and final-word guidance.
- Magical Household charms/formulas.
- Moon Book prompts and meditations.

These are valid ritual mechanics but need operative text review support before product use.

## 8. Jessica-interest gaps

### Candle

Candle coverage is now broad, but the main gap is intimate/connecting candlework. There is strong candle support for opening, steadying, blessing, protecting, tending, marking, releasing, and remembering, but `candlelight + connecting` remains empty because relationship-oriented candle material is either held, coercive, or not primary candlelight.

### Lunar

Lunar coverage is strong after the repaired Moon Book packet. Remaining lunar gaps are less about source quantity and more about authoring: keeping rituals magical without turning them into journaling prompts, astrology copy, or generic moon-phase advice.

### Astrological phase/contact

Moon phase coverage is strong. Astrological contact/natal/transit coverage is still thin or held. The audited packets do not deeply cover personal natal contacts, transits, planetary contacts, or relational synastry-style timing. This is a source-diversity/product-model gap, not a failure of Moon Book.

### Intimate home ritual

There is good table/meal/full-moon/household altar coverage, but intimate home ritual that feels like a private two-person practice is only adequate. Strongest current support is table + connecting, full moon witness/feast, House Witch household values/chosen-family backlog, and Magical Household guest/threshold material. Candlelight + connecting is still the clearest Jessica-interest empty cell.

## 9. Areas already strong enough and not needing near-term source research

These areas have enough packet-level coverage for review/import planning without more source research:

- `candlelight + opening`
- `candlelight + steadying`
- `doorway + opening`
- `doorway + protecting`
- `body + releasing`
- `body + steadying`
- `body + tending`
- `table + opening`
- `table + blessing`
- `table + connecting`
- `table + marking`
- `table + tending`
- `vessel + releasing`
- `words + opening`
- `words + remembering`
- hearth recognition and hearth-flame practices
- threshold/door/window/key practices
- kitchen/table/meal blessing practices
- broom/rag/cleaning/purification practices
- moving/new-home transition practices
- household altar setup and tending
- lunar new/waxing/full/waning/dark moon phase structure

## Closeout summary

Report path:

```text
docs/research/coverage/packet-level-coverage-audit-four-packets.md
```

Packets audited:

```text
docs/research/ritual-candidates/packet-candlelight-buckland-pilot.md
docs/research/ritual-candidates/repair-house-witch-source-inventory.md
docs/research/ritual-candidates/packet-moon-book-lunar-cycle.md
docs/research/ritual-candidates/packet-magical-household-domestic-threshold-altar.md
```

Top empty cells:

```text
candlelight + connecting
doorway + steadying
doorway + tending
doorway + remembering
table + voicing
plant + opening
plant + voicing
plant + remembering
vessel + connecting
```

Top thin cells:

```text
candlelight + marking
table + releasing
table + protecting
table + remembering
doorway + voicing
doorway + blessing
plant + steadying
plant + marking
body + voicing
body + blessing
body + protecting
body + remembering
```

Top fragile cells:

```text
plant + protecting
plant + blessing
plant + releasing
vessel + protecting
vessel + remembering
words + voicing
words + protecting
words + blessing
candlelight + protecting
candlelight + blessing
```

Areas already strong enough:

```text
hearth/flame opening and steadying
threshold opening and protection
kitchen/table/meal blessing
broom/rag/household purification
moving/new-home transition
household altar setup and tending
lunar phase structure and full/new/waning/dark moon work
body releasing/steadying/tending
words opening and remembering
vessel releasing
table opening/blessing/connecting/marking/tending
```

Tim decisions needed:

```text
Whether candlelight + connecting should remain empty unless a consent-safe source lane appears.
Whether plant candidates need a safety matrix before authoring.
Whether exact charms/prayers/spells move through operative text review support before any direct-use review.
Whether omen/divination, deity/spirit, ancestor/remembrance, and astrological contact lanes remain held.
Whether intimate two-person home ritual needs its own review lens separate from general connecting coverage.
```