# Ritual candidate packet: Anand and Saint Thomas ritual-only adult re-extraction

## Packet metadata

- packet ID: `packet-anand-saint-thomas-ritual-only-adult-reextract`
- issue: `#414`
- depends on: `#413`, PR `#415`, and the #287 mechanical import contract
- source IDs:
  - `SRC-CONNECTION-ANAND-ART-SEXUAL-MAGIC`
  - `SRC-CONNECTION-SAINT-THOMAS-SEX-WITCH`
- source gates:
  - `docs/research/source-gates/src-connection-anand-art-sexual-magic.md`
  - `docs/research/source-gates/src-connection-saint-thomas-sex-witch.md`
- source PDFs inspected locally:
  - `.moon-table-private/sources/The_Art_of_Sexual_Magic_-_Margot_Anand.pdf`
  - `.moon-table-private/sources/Sex_Witch_-_Sophie_Saint_Thomas.pdf`
- baseline packets:
  - `docs/research/ritual-candidates/packet-anand-connection.md`
  - `docs/research/ritual-candidates/packet-saint-thomas-sex-witch.md`
- output status: extraction packet only; no runtime Ritual records, UI copy, selector logic, direct-use eligibility, or recommendation eligibility changes
- product posture: private adult household ritual material for consenting adults; explicit adult content is allowed when it is a complete source-backed Ritual
- source text posture: repository-safe paraphrase only; no long copied source text, full exercises, full spells, full prayers, full guided meditations, or explicit technique instructions

## Doctrine applied

The extraction gate in this packet is ritual architecture and source support, not adult-content category.

A candidate can proceed when it has:

- a beginning/container;
- a middle/core action;
- an end/closing;
- an intrinsic purpose;
- source-backed ritual logic;
- enough self-containment to perform from the app without opening the source.

Recommendation eligibility is separate. Every candidate marked `approved_for_mechanical_import` below is intended for later #287-style import only as:

```ts
status: "draft";
availability: {
  findable: true,
  directUseEligible: false,
  recommendationEligible: false,
};
recommendationMetadata: {
  eligibility: {
    recommendable: false,
    missing: ["direct_use_review", "recommendation_review"],
  },
};
```

## Source sections reviewed

| Source | Sections reviewed for this re-extraction | Notes |
| --- | --- | --- |
| Anand | Hints; Chapters 2-6; Chapters 7-8; Chapter 9; Epilogue | Rechecked existing connection candidates, explicit partner technique lanes, Magic Symbol body lanes, and Magical Congress. |
| Saint Thomas | Chapter 1; Chapter 2; Chapters 3-7; Chapter 8; Chapter 9 | Rechecked existing intimate candidates, previously excluded Chapter 2 and Chapter 8, body-fluid material, partner sex magic, fantasy/intention, former-lover, breakup, and bed-reset lanes. |

## Source rite inventory and disposition

This table records the decision surface for #414. Items that are only sex education, theory, technique lesson, context, source pointer, or non-mappable material are not preserved as app-content outcomes; they are rejected or deferred with a model-readiness reason.

| Source item | Source pages | Source location precision | Type | Research use | Brief source description | Review labels | Likely carriers | Likely purposes | Exact text importance | Disposition | Tim decision needed? | Reason | Future action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Anand Melting Hug | PDF 68-69 | exact_page | ritual | ritual_candidate | Shared embrace for arrival/completion. | adult_intimacy, consent_sensitive | body, words | connecting, steadying | low | duplicate | no | Existing runtime record already exists, but current metadata still routes it as primary `body + steadying`. | Handle as metadata repair, not a new import. |
| Anand Heart Salutation | PDF 68-69 | exact_page | ritual | ritual_candidate | Heart gesture for honoring/closing together. | adult_intimacy, cultural_or_gender_load | body, words | blessing, connecting | low | duplicate | yes | Existing runtime record exists as `body + blessing`; a connection variant would duplicate the same source mechanic unless Tim wants a split. | Metadata/split decision later. |
| Anand partner movement/witness | PDF 136-144 | page_range | ritual | ritual_candidate | One partner offers embodied erotic movement while the other witnesses, then roles can close or switch. | adult_intimacy, explicit, sex_forward, consent_sensitive, technique_heavy, house_voice_challenge | body, words | connecting, opening, blessing | low | candidate_extract_now | no | Source supports a complete shared body/witness form when stripped of technique instruction and kept consent-forward. | Approved candidate below. |
| Anand laughing pelvis / explicit body laughter | PDF 172-179 | page_range | ritual | ritual_candidate | Explicit body laughter as release and return to aliveness. | adult_intimacy, explicit, technique_heavy, house_voice_challenge | body | releasing, opening | medium | candidate_extract_later | yes | Existing softened laughter record covers the safe form; explicit body version needs Tim voice/product decision. | Later body/releasing variant if approved. |
| Anand Magic Circle closer-source form | PDF 51-68 | page_range | ritual | ritual_candidate | Circle, altar, markers, candle, purpose, and close. | adult_intimacy, exact_text_sensitive, cultural_or_gender_load | table, candlelight, words | opening, marking | high | candidate_extract_later | yes | Existing records cover simpler forms; a closer source form needs exact-word/gender-language review. | Later closer-source circle packet if wanted. |
| Anand shared Magic Symbol with lovemaking | PDF 238-249 | page_range | ritual | ritual_candidate | Shared symbol is carried into chosen adult touch/lovemaking and returned to the altar. | adult_intimacy, explicit, sex_forward, consent_sensitive, technique_heavy | body, table, words | connecting, opening, marking | medium | candidate_extract_now | no | Source supports a complete high-level partner Ritual without importing technique instruction. | Approved candidate below. |
| Anand solo/body Magic Symbol charge | PDF 421-429 | page_range | ritual | ritual_candidate | Body arousal or pleasure charges a personal symbol. | adult_intimacy, explicit, sex_forward, exact_text_sensitive | body, words, table | opening, voicing, connecting | medium | candidate_extract_now | no | Source supports symbol/body magic at high level; candidate avoids exact technique and claims. | Approved candidate below. |
| Anand Chakra Rub / Chakra Wave lanes | PDF 270-310 | page_range | body exercise | ritual_candidate | Chakra/oil/breath/body sequence. | explicit, technique_heavy, medical_or_somatic_claim, cultural_or_gender_load, exact_text_sensitive | body | connecting, steadying, opening | high | hold_before_import | yes | Potentially ritual-shaped, but not import-ready without cultural, somatic-claim, material, and exact-word review. | Hold for packet correction if Tim wants it. |
| Anand Chapters 7-8 explicit technique lessons | PDF 312-410 | chapter_range | technique | reject | Partner pleasuring instruction and technique pedagogy. | explicit, sex_forward, technique_heavy, medical_or_somatic_claim, direct_source_only_candidate | body | connecting | high | reject_architectural | yes | The chapter material is source-visible, but as app content it is technique instruction rather than a self-contained Moon & Table Ritual unless split into a different high-level container. | Do not import technique lessons. |
| Anand Magical Congress container | PDF 331-374 | chapter_range | ritual | ritual_candidate | Culminating adult ritual with room preparation, symbol, intention, sexual energy, and grounding return. | adult_intimacy, explicit, sex_forward, consent_sensitive, technique_heavy, cultural_or_gender_load, exact_text_sensitive | body, candlelight, table, words, vessel | connecting, marking, steadying | high | candidate_extract_now | no | Source supports a high-level Ritual container if the explicit sequence is not reproduced as technique instruction. | Approved candidate below. |
| Saint Thomas Chapter 2 sex education / consent / kink glossary | PDF 59-69 | chapter_range | context_only | reject | Sex education, anatomy, consent, kink and relationship-format glossary. | explicit, kink_adjacent, consent_sensitive, medical_or_somatic_claim, technique_heavy | body, words | connecting, protecting | low | reject_architectural | yes | Useful reviewer context, but not a Ritual and not app content under the Ritual-only gate. | Keep out of app-content packets. |
| Saint Thomas body-fluid correspondence material | Chapter 1 pp. 28-29; Chapter 5 pp. 105-106 | page_range | correspondence_with_action | ritual_candidate | Body fluids appear as possible spell/candle material. | adult_intimacy, explicit, body_fluid, sex_forward, house_voice_challenge | body, candlelight, words | voicing, opening, connecting | medium | candidate_extract_now | yes | Source supports body-fluid material as a ritual material; candidate is draft/findable only and needs later product-boundary review before direct use. | Approved candidate below. |
| Saint Thomas solo erotic self-practice | Chapter 3 pp. 75-76 | page_range | body rite | ritual_candidate | Solo erotic practice as body magic. | explicit, sex_forward, technique_heavy, direct_source_only_candidate | body | connecting, opening | medium | hold_before_import | yes | Ritual lane is visible, but current packet lacks enough source-safe architecture without technique instruction. | Hold until Tim decides private-household handling. |
| Saint Thomas kink clarity / rope and candles | Chapter 5 pp. 108-110 | page_range | ritual | ritual_candidate | Symbolic binding/cutting rite for voicing kink/desire. | adult_intimacy, explicit, kink_adjacent, consent_sensitive, technique_heavy | body, candlelight, words | voicing, opening, connecting | medium | candidate_extract_now | no | Source supports a complete symbolic body/word form without teaching rope technique. | Approved candidate below. |
| Saint Thomas partner sex magic | Chapter 5 pp. 121-122 | exact_page | ritual | ritual_candidate | Shared adult intention carried through partnered sex magic. | adult_intimacy, explicit, sex_forward, consent_sensitive, direct_source_only_candidate | body, candlelight, words | connecting, marking | medium | candidate_extract_now | no | Existing record uses candlelight as primary; source supports a high-level primary body+connecting variant. | Approved candidate below. |
| Saint Thomas fantasy/intention apple and rose lanes | Chapter 5 pp. 113-120 | page_range | ritual | ritual_candidate | Fantasy or desire is placed into a symbolic object. | adult_intimacy, explicit, sex_forward | table, words, plant, body | opening, voicing, marking | medium | duplicate | yes | Existing apple and rose records preserve the table/symbol lanes; no new body primary record is source-necessary here. | No new import. |
| Saint Thomas former-lover release | Chapter 7 pp. 150-153 | page_range | ritual | ritual_candidate | Former lover release with candle/writing/disposal. | adult_intimacy, consent_sensitive, therapy_adjacent | words, candlelight | releasing, protecting | medium | duplicate | no | Existing record is already a complete source-backed Ritual. | No new import. |
| Saint Thomas friendship-with-benefits boundary | Chapter 7 pp. 152-153 | exact_page | ritual | ritual_candidate | Arrangement boundary/welcome vessel. | adult_intimacy, explicit, consent_sensitive, recommendation_lane_unclear | vessel, words, body | connecting, protecting | medium | duplicate | yes | Existing vessel+connecting record exists and remains direct-use/search-only; a body variant would be a product split, not a missing extraction. | No new import. |
| Saint Thomas Chapter 8 revenge / hex / attraction lanes | Chapter 8 pp. 166-177 | chapter_range | spell | ritual_candidate | Revenge, targeted attraction, identity-protection, and banishing/hex lanes. | coercive_or_target_control, explicit, sex_forward, body_fluid, therapy_adjacent, exact_text_sensitive, house_voice_challenge | candlelight, vessel, words, body | protecting, releasing, opening | high | hold_before_import | yes | Some items have ritual architecture, but none are import-ready without Tim decision on targeted/revenge app content and exact-source handling. | Hold for packet correction if Tim wants mechanics-only or private-household forms. |
| Saint Thomas bed reset | Chapter 9 pp. 183-184 | exact_page | cleansing | ritual_candidate | Bed and linen cleansing/reset after relationship or intimacy context. | adult_intimacy, therapy_adjacent | body, vessel, plant | releasing, steadying | low | duplicate | no | Existing `candidate.saint_thomas.bed_linen_reset` already covers this as a complete Ritual. | No new import. |
| Saint Thomas home/body after intimacy reset | Chapter 9 pp. 188-189 | exact_page | cleansing | ritual_candidate | Room/body reset after sex or intensity. | adult_intimacy, explicit, sex_forward | body, vessel | steadying, releasing | low | duplicate | no | Existing `candidate.saint_thomas.home_after_intimacy_reset` already covers this as a complete Ritual. | No new import. |
| Saint Thomas assault/gaslighting/abuse-adjacent lanes | Chapter 9 pp. 185-192 | page_range | prayer / recovery spell | reject | Trauma/abuse-adjacent prayer and recovery material. | therapy_adjacent, exact_text_sensitive, house_voice_challenge, medical_or_somatic_claim | words, candlelight, body | protecting, releasing, tending | high | reject_architectural | yes | The source lanes are visible, but current Moon & Table app content would require therapy/trauma product decisions and exact-text review before any Ritual candidate. | Do not import in this packet. |

## Closeout accounting

```text
Source sections reviewed: 14
Existing candidates reconsidered: 75
New self-contained candidates found: 13
Candidates marked approved_for_mechanical_import: 7
Candidates held for packet correction: 3
Candidates deferred as candidate_extract_later: 3
Architectural rejects: 4
Duplicates: 5
Primary body + connecting candidates: 5 surfaced; 4 approved_for_mechanical_import; 1 duplicate/metadata-repair lane
Explicit adult candidates: 13 surfaced; 7 approved_for_mechanical_import
Candidates with body-fluid metadata: 1 approved_for_mechanical_import; 1 held Chapter 8 lane
Candidates with spirit/deity metadata: 0
Candidates not recommendation-ready but import-ready as draft/findable: 7
Validation commands run: see Validation checklist
```

Count reconciliation:

- 22 inventory rows = 7 approved candidates + 3 held for packet correction + 3 deferred later + 4 architectural rejects + 5 duplicates.
- 13 new self-contained candidates found = 7 approved + 3 held + 3 deferred.
- The 75 existing candidates reconsidered are the 28 Anand records and 47 Saint Thomas records already present in the baseline packets/runtime collection; they are not recounted as new candidates.

## Approved candidate index

| Candidate ID | Headline | Primary carrier | Primary purpose | Source | Explicit adult? | Body-fluid metadata? | Import readiness |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `candidate.anand.partner_dance_witness` | Offer the Body, Receive the Witness | `body` | `connecting` | Anand Ch. 3 | yes | no | `approved_for_mechanical_import` |
| `candidate.anand.shared_symbol_lovemaking` | Carry the Shared Symbol Into Touch | `body` | `connecting` | Anand Ch. 5 | yes | no | `approved_for_mechanical_import` |
| `candidate.anand.body_symbol_charge` | Let the Body Charge the Symbol | `body` | `opening` | Anand Ch. 9 | yes | no | `approved_for_mechanical_import` |
| `candidate.anand.magical_congress_container` | Enter the Congress Container | `body` | `connecting` | Anand Ch. 9 | yes | no | `approved_for_mechanical_import` |
| `candidate.saint_thomas.body_fluid_sigil_candle` | Mark Desire With the Body's Own Ink | `body` | `voicing` | Saint Thomas Ch. 5 | yes | yes | `approved_for_mechanical_import` |
| `candidate.saint_thomas.kink_desire_body_release` | Cut the Shame From the Desire | `body` | `voicing` | Saint Thomas Ch. 5 | yes | no | `approved_for_mechanical_import` |
| `candidate.saint_thomas.partner_body_intention` | Carry One Intention Through the Body | `body` | `connecting` | Saint Thomas Ch. 5 | yes | no | `approved_for_mechanical_import` |

## Approved candidate records

### `candidate.anand.partner_dance_witness` — Offer the Body, Receive the Witness

- candidate ID: `candidate.anand.partner_dance_witness`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Offer the Body, Receive the Witness

#### Ritual body / practice

Choose a private room and agree who will offer movement first and who will witness. Light one candle or dim one lamp. The offering partner moves, undresses, stays clothed, dances, or simply stands in the way that feels true for this rite. The witnessing partner keeps attention on appreciation, not correction. When the offering is complete, the witness names one thing they received. Switch roles if both want to, or close by touching hands and saying that the offering has been received.

#### Intention

Let the body be met as an offering instead of a performance.

#### Best window

When both of you want explicit embodied connection without turning the evening into a technique lesson.

#### Question to carry

What changes when the body is witnessed without being corrected?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "body-based connecting"
    - "partner witnessing"
    - "explicit private intimacy"
  timingHooks:
    - "not phase-specific"
    - "best when there is privacy and enough room for attention"
  lunarPlanetarySeasonalHooks: []
  capacityHooks:
    - "room_for_something_deeper"
  audienceHooks:
    - "both partners have a chosen role and an equal chance to stop, switch, or close"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: candle or lamp. Place: private room or bedroom."
  sourceBackedRationale:
    - "Anand supports partner movement/witnessing as part of erotic-magical preparation and shared body connection."
  notForOrHoldNotes:
    - "Not for performance pressure, correction, public display, third-party participation, therapy claims, or technique instruction."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:connecting"
    - "carrier:body"
    - "ritualizationType:source_backed_moon_and_table_form"
  secondarySelectionSignals:
    - "adult_intimacy"
    - "partner witnessing"
    - "candle or lamp"
  exclusionSignals:
    - "exclude from Choose with me until direct-use and recommendation review"
    - "exclude when the request is for low-capacity or solo practice"
  timingSignal:
    - "timing relationship:none"
  confidenceNotes:
    - "Source architecture supports the lane, but runtime import should remain draft/findable and not direct-use or recommendation eligible."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Margot Anand, The Art of Sexual Magic"
      sourceLocation: "PDF pp. 136-144 / Chapter 3, partner movement and witnessing material"
      sourceSummary: "The source presents partner movement/witnessing as an embodied erotic preparation lane."
      sourceSupports: "A private container, chosen roles, embodied offering, partner witnessing, and completion through acknowledgment."
      moonAndTableChanges: "Converted the source-supported movement lane into a high-level household ritual without copied exercise text or technique instruction."
      doNotImport:
        - "Copied source exercise text"
        - "Explicit technique instruction"
        - "Performance pressure"
        - "Therapy or body-image treatment claims"
        - "Third-party participation"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: connecting
    secondary:
      - opening
      - blessing
    refinement: "embodied partner witnessing"
  carriers:
    primary: body
    secondary:
      - candlelight
      - words
  capacity:
    supports:
      - room_for_something_deeper
    default: room_for_something_deeper
  audience:
    supports:
      - both_of_us
    default: both_of_us
    bothOfUsStructure: "One partner offers embodied movement while the other witnesses; roles may switch or close."
  timing:
    relationship: none
    contexts:
      - "private room with enough time for chosen embodied attention"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Anand
    - adult intimacy
    - body
    - connecting
    - partner witness
    - movement
  keywords:
    - embodied connection
    - private room
    - dance
    - witness
    - erotic offering
    - appreciation
  materials:
    - candle or lamp
  places:
    - private room
    - bedroom
  sourceLabel: "Margot Anand, The Art of Sexual Magic"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "explicit adult private partner practice"
    - "consent-sensitive role structure"
    - "not recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "embodied erotic witnessing is the ritual action"
sexualEnergyCarrier: body
bodyFluidPresent: false
targetingMode: none
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Import-ready as draft/findable, but not appropriate for Choose with me until direct-use and recommendation review."
```

adaptation policy notes: `source_backed_moon_and_table_form`; purpose change not allowed; material substitution limited to candle/lamp/no-flame light.

operative words metadata: []

### `candidate.anand.shared_symbol_lovemaking` — Carry the Shared Symbol Into Touch

- candidate ID: `candidate.anand.shared_symbol_lovemaking`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Carry the Shared Symbol Into Touch

#### Ritual body / practice

Draw or place the shared symbol where both of you can see it. Sit together and name the shared intention the symbol is holding. Choose whether the rite will continue into touch, sex, or quiet closeness. If it does, keep the symbol in view or near the bed as the body carries the intention. When the touch is complete, return attention to the symbol. Cover it, fold it, or place it back on the altar, then each person names one word for what should come forward from the rite.

#### Intention

Let shared desire have a visible sign before it enters the body.

#### Best window

Before consensual private touch or lovemaking that both of you want to treat as ritual.

#### Question to carry

What symbol can hold our shared desire without forcing it?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "body-based connecting"
    - "shared intention"
    - "symbol work"
  timingHooks:
    - "not phase-specific"
    - "best before chosen private intimacy"
  lunarPlanetarySeasonalHooks: []
  capacityHooks:
    - "room_for_something_deeper"
  audienceHooks:
    - "both partners name and carry the shared intention"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: shared symbol, paper, pen, altar or bedside."
  sourceBackedRationale:
    - "Anand supports shared Magic Symbol work and carrying the symbol through lovemaking/sexual energy."
  notForOrHoldNotes:
    - "Not for coercive manifestation, fertility claims, guaranteed outcomes, or technique instruction."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:connecting"
    - "carrier:body"
    - "shared Magic Symbol"
  secondarySelectionSignals:
    - "secondary_carriers:table,words"
    - "adult private ritual"
  exclusionSignals:
    - "exclude from recommendation until direct-use and recommendation review"
    - "exclude if the intention targets a third party or promised outcome"
  timingSignal:
    - "timing relationship:helpful"
  confidenceNotes:
    - "Source supports the symbol/body architecture; packet avoids copied technique and outcome guarantees."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Margot Anand, The Art of Sexual Magic"
      sourceLocation: "PDF pp. 238-249 / Chapter 5, shared Magic Symbol and lovemaking lane"
      sourceSummary: "The source links shared Magic Symbol work with adult partner lovemaking and sexual energy."
      sourceSupports: "A shared symbol, shared intention, visible placement, adult body practice, and return/integration."
      moonAndTableChanges: "Authored a high-level private household form that preserves symbol/body logic without importing explicit technique."
      doNotImport:
        - "Copied source visualization or technique text"
        - "Fertility, manifestation, or guaranteed-outcome claims"
        - "Third-party targeting"
        - "Pressure to proceed into touch"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: connecting
    secondary:
      - opening
      - marking
      - voicing
    refinement: "shared desire carried through the body"
  carriers:
    primary: body
    secondary:
      - table
      - words
  capacity:
    supports:
      - room_for_something_deeper
    default: room_for_something_deeper
  audience:
    supports:
      - both_of_us
    default: both_of_us
    bothOfUsStructure: "Both partners name the shared intention and decide whether the ritual continues into touch."
  timing:
    relationship: helpful
    contexts:
      - "before consensual private touch or lovemaking"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Anand
    - Magic Symbol
    - adult intimacy
    - body
    - connecting
    - shared intention
  keywords:
    - shared symbol
    - lovemaking
    - sexual energy
    - altar
    - bedside
    - desire
  materials:
    - shared symbol
    - paper
    - pen
  places:
    - altar
    - bedside
    - bedroom
  sourceLabel: "Margot Anand, The Art of Sexual Magic"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "explicit adult partner ritual"
    - "source supports symbol/body logic"
    - "not recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "sex or chosen touch may be the ritual action"
sexualEnergyCarrier: body
bodyFluidPresent: false
targetingMode: shared_intention_only
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Findable draft candidate for a private adult lane; should not be recommended until reviewed."
```

adaptation policy notes: `source_backed_moon_and_table_form`; the symbol and body connection are source-supported; no invented props beyond paper/pen/altar or bedside placement.

operative words metadata: []

### `candidate.anand.body_symbol_charge` — Let the Body Charge the Symbol

- candidate ID: `candidate.anand.body_symbol_charge`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Let the Body Charge the Symbol

#### Ritual body / practice

Place your Magic Symbol where you can see it. Put one hand on or near your own body and name the desire the symbol is carrying. Let private pleasure, arousal, breath, or body attention gather around the symbol without forcing a result. When the charge feels complete, touch the paper once, fold it, and place it on the altar, in a journal, or beside the bed. Close by washing your hands or taking one drink of water.

#### Intention

Let the body give warmth to a chosen sign without making a promise of outcome.

#### Best window

When a personal desire needs a private embodied container.

#### Question to carry

What does my body know about this desire before I explain it?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "solo body ritual"
    - "desire clarity"
    - "symbol work"
  timingHooks:
    - "not phase-specific"
    - "best when privacy is available"
  lunarPlanetarySeasonalHooks: []
  capacityHooks:
    - "enough_to_participate"
    - "room_for_something_deeper"
  audienceHooks:
    - "supports me"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: Magic Symbol, paper, pen, water optional."
  sourceBackedRationale:
    - "Anand supports charging a symbol through sexual/embodied energy and later placing or keeping the symbol."
  notForOrHoldNotes:
    - "Not for fertility claims, medical claims, third-party targeting, or orgasm-performance pressure."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:opening"
    - "carrier:body"
    - "Magic Symbol body lane"
  secondarySelectionSignals:
    - "secondary_purposes:voicing,connecting"
    - "secondary_carriers:words,table,vessel"
  exclusionSignals:
    - "exclude from recommendation until reviewed"
    - "exclude if request needs a shared partner rite"
  timingSignal:
    - "timing relationship:none"
  confidenceNotes:
    - "Source support is strong for body/symbol charging; packet keeps wording high-level and non-technique."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Margot Anand, The Art of Sexual Magic"
      sourceLocation: "PDF pp. 421-429 / Chapter 9, sexual self-empowerment and symbol lane"
      sourceSummary: "The source supports using personal sexual/embodied energy with a symbol."
      sourceSupports: "A personal symbol, body energy, private attention, and later keeping/placing the symbol."
      moonAndTableChanges: "Converted the explicit body-symbol lane into a self-contained Moon & Table form without technique instruction or outcome claims."
      doNotImport:
        - "Copied source exercise text"
        - "Orgasm-performance instructions"
        - "Fertility, therapy, medical, or manifestation guarantees"
        - "Third-party target work"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: opening
    secondary:
      - voicing
      - connecting
    refinement: "private embodied desire"
  carriers:
    primary: body
    secondary:
      - words
      - table
      - vessel
  capacity:
    supports:
      - enough_to_participate
      - room_for_something_deeper
    default: enough_to_participate
  audience:
    supports:
      - me
    default: me
  timing:
    relationship: none
    contexts:
      - "private embodied desire work"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Anand
    - Magic Symbol
    - body
    - desire
    - adult intimacy
  keywords:
    - symbol
    - arousal
    - private pleasure
    - body attention
    - desire
    - altar
  materials:
    - Magic Symbol
    - paper
    - pen
    - water
  places:
    - altar
    - journal
    - bedside
    - bedroom
  sourceLabel: "Margot Anand, The Art of Sexual Magic"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "explicit solo adult body ritual"
    - "no body-fluid material"
    - "not recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "private pleasure or arousal may charge the symbol"
sexualEnergyCarrier: body
bodyFluidPresent: false
targetingMode: self_only
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Draft/findable only; direct-use and recommendation review must decide whether solo explicit body ritual belongs in active use."
```

adaptation policy notes: `source_backed_moon_and_table_form`; purpose change not allowed; water is only a closing/grounding material.

operative words metadata: []

### `candidate.anand.magical_congress_container` — Enter the Congress Container

- candidate ID: `candidate.anand.magical_congress_container`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Enter the Congress Container

#### Ritual body / practice

Prepare the private room before either of you enters the heart of the rite. Set the shared symbol, one candle or lamp, and a cup of water where both of you can reach them. Stand together and name the work of the night in one sentence. Greet each other as the partner in the rite. If both of you choose to continue, let touch, sex, breath, stillness, or closeness carry the shared symbol without following instructions from the app. When the rite is complete, return to the cup of water. Each person drinks or touches the cup, names one word for the return, and the candle or lamp is closed.

#### Intention

Let explicit private intimacy live inside a beginning, a shared sign, and a real return.

#### Best window

When both of you have room for a deeper private adult ritual and want the whole encounter held as ritual.

#### Question to carry

What container lets the body go deeper and still come home?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "room for something deeper"
    - "explicit body-based connecting"
    - "shared symbol"
  timingHooks:
    - "best with privacy and recovery time"
  lunarPlanetarySeasonalHooks:
    - "A later selector may prefer strong timing windows, but this candidate does not require computed timing."
  capacityHooks:
    - "room_for_something_deeper only"
  audienceHooks:
    - "both partners enter and return together"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: shared symbol, candle or lamp, cup of water. Place: bedroom/private room."
  sourceBackedRationale:
    - "Anand's Magical Congress material supports a prepared room, shared symbol/intention, adult sexual energy, ritual greeting, and grounding return."
  notForOrHoldNotes:
    - "Not for low capacity, technique instruction, fertility/manifestation guarantees, or pressure to continue into sex."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:connecting"
    - "carrier:body"
    - "Magical Congress container"
  secondarySelectionSignals:
    - "secondary_carriers:candlelight,table,words,vessel"
    - "capacity:room_for_something_deeper"
  exclusionSignals:
    - "exclude from recommendation until reviewed"
    - "exclude for low capacity or solo requests"
  timingSignal:
    - "timing relationship:helpful"
  confidenceNotes:
    - "Source support is strong for the ritual container; explicit sequence is deliberately not reproduced."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Margot Anand, The Art of Sexual Magic"
      sourceLocation: "PDF pp. 331-374 / Chapter 9, Magical Congress"
      sourceSummary: "The source presents a culminating adult ritual with preparation, symbol, intention, sexual energy, and grounding return."
      sourceSupports: "Prepared private room, shared symbol, candle/atmosphere, intention, adult body practice, greeting/recognition, and return/grounding."
      moonAndTableChanges: "Authored only the high-level ritual container and close; did not import explicit technique sequence or long source text."
      doNotImport:
        - "Copied explicit sequence"
        - "Technique instruction"
        - "Fertility, manifestation, therapy, medical, or guaranteed-outcome claims"
        - "Pressure to continue into sex"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: connecting
    secondary:
      - marking
      - steadying
      - opening
    refinement: "full private adult ritual container"
  carriers:
    primary: body
    secondary:
      - candlelight
      - table
      - words
      - vessel
  capacity:
    supports:
      - room_for_something_deeper
    default: room_for_something_deeper
  audience:
    supports:
      - both_of_us
    default: both_of_us
    bothOfUsStructure: "Both partners prepare, name the work, choose whether to continue into touch/sex, and return together."
  timing:
    relationship: helpful
    contexts:
      - "private time with room for a deeper adult ritual and return"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Anand
    - Magical Congress
    - adult intimacy
    - body
    - connecting
    - shared symbol
  keywords:
    - private adult ritual
    - lovemaking
    - sexual energy
    - symbol
    - candle
    - water
    - grounding
  materials:
    - shared symbol
    - candle or lamp
    - cup of water
  places:
    - bedroom
    - private room
  sourceLabel: "Margot Anand, The Art of Sexual Magic"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "explicit adult partner ritual"
    - "high-level container only; no technique instruction"
    - "not recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "sex or chosen adult touch may be the central ritual action"
sexualEnergyCarrier: body
bodyFluidPresent: false
targetingMode: shared_intention_only
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Import-ready as draft/findable for later review; too deep and context-dependent for current guided recommendation."
```

adaptation policy notes: `source_backed_moon_and_table_form`; no technique sequence; water completes the source-supported grounding/return function.

operative words metadata: []

### `candidate.saint_thomas.body_fluid_sigil_candle` — Mark Desire With the Body's Own Ink

- candidate ID: `candidate.saint_thomas.body_fluid_sigil_candle`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Mark Desire With the Body's Own Ink

#### Ritual body / practice

Write one consensual, non-targeted erotic intention. Reduce it to a simple sigil or mark. Set one candle on a plate or holder. Touch the sigil to the candle with one body-sourced material that belongs only to you, or keep the body material on the paper if the candle should stay clean. Light the candle and let the mark stand for the desire without naming another person as the object of the spell. When the candle work is complete, fold the paper and put it away or discard it.

#### Intention

Let private desire speak through the body without turning another person into a target.

#### Best window

When a private erotic desire needs to be named, contained, and kept non-coercive.

#### Question to carry

What does desire want when it is not aimed at control?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "explicit desire"
    - "body-fluid material"
    - "sigil or written intention"
  timingHooks:
    - "not phase-specific"
    - "best when privacy and cleanup are available"
  lunarPlanetarySeasonalHooks: []
  capacityHooks:
    - "enough_to_participate"
  audienceHooks:
    - "solo private rite"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: candle, plate or holder, paper, pen, body-sourced material."
  sourceBackedRationale:
    - "Saint Thomas supports erotic sigil/candle work and names body fluids among possible sex-magic materials."
  notForOrHoldNotes:
    - "Not for targeting another person, attraction-control, medical claims, public sharing, or recommendation before review."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:voicing"
    - "carrier:body"
    - "body_fluid_present:true"
  secondarySelectionSignals:
    - "secondary_carriers:candlelight,words"
    - "sex-forward sigil lane"
  exclusionSignals:
    - "exclude from recommendation until product-boundary and direct-use review"
    - "exclude if intention targets a specific person without consent"
  timingSignal:
    - "timing relationship:none"
  confidenceNotes:
    - "Source support is explicit; packet keeps candidate non-targeted and repository-safe."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Sophie Saint Thomas, Sex Witch"
      sourceLocation: "Chapter 1 pp. 28-29 and Chapter 5 pp. 105-106, body-fluid and sex-sigil/candle material"
      sourceSummary: "The source identifies body fluids as sex-magic material and gives erotic sigil/candle architecture."
      sourceSupports: "Written erotic intention, sigil creation, candle work, and body-fluid material as a possible carrier."
      moonAndTableChanges: "Narrowed the candidate to a non-targeted private desire rite without copied spell text, oils, smoke, or attraction-control claims."
      doNotImport:
        - "Copied spell text"
        - "Targeted attraction or control"
        - "Medical, STI, fertility, or guaranteed-effect claims"
        - "Oil/smoke/recipe requirements"
        - "Public or shared body-fluid handling"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: voicing
    secondary:
      - opening
      - connecting
    refinement: "private erotic intention"
  carriers:
    primary: body
    secondary:
      - candlelight
      - words
  capacity:
    supports:
      - enough_to_participate
    default: enough_to_participate
  audience:
    supports:
      - me
    default: me
  timing:
    relationship: none
    contexts:
      - "private erotic intention and candle work"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Saint Thomas
    - Sex Witch
    - body fluid
    - sigil
    - candle
    - explicit
    - desire
  keywords:
    - body fluid
    - sexual fluid
    - sigil
    - erotic intention
    - candle
    - desire
    - non-targeted
  materials:
    - candle
    - plate or holder
    - paper
    - pen
    - body-sourced material
  places:
    - private room
    - altar
    - bedside
  sourceLabel: "Sophie Saint Thomas, Sex Witch"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: true
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "body-fluid material present"
    - "explicit solo adult ritual"
    - "non-targeted formulation required"
    - "not direct-use or recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "body-sourced material and erotic intention are ritual materials"
sexualEnergyCarrier: body
bodyFluidPresent: true
bodyFluidType: "self-sourced sexual or menstrual fluid, source-supported; later review must decide direct-use handling"
targetingMode: self_only_non_targeted
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Import-ready as draft/findable so the lane is not lost; direct-use and recommendation require explicit human review."
```

adaptation policy notes: `source_backed_moon_and_table_form`; material substitution must be reviewed; no oils, smoke, glitter, or recipe materials are required.

operative words metadata: []

### `candidate.saint_thomas.kink_desire_body_release` — Cut the Shame From the Desire

- candidate ID: `candidate.saint_thomas.kink_desire_body_release`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Cut the Shame From the Desire

#### Ritual body / practice

Set two candles or two steady lights on the table. Sit with one loose length of cord, ribbon, or thread around one wrist or held between both hands. Name the desire, kink, or fantasy in one plain sentence. Let the cord hold the shame, fear, or embarrassment around the sentence. When the sentence feels named, cut the cord or untie it. Put the cord away from the body. Close by writing one next honest conversation or boundary the desire asks for.

#### Intention

Let desire be named without letting shame keep the body bound.

#### Best window

When a private kink, fantasy, or desire needs voice before it becomes a conversation.

#### Question to carry

What desire needs a clean sentence before it needs action?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "kink-adjacent desire"
    - "body and words"
    - "voicing"
  timingHooks:
    - "not phase-specific"
    - "best before a conversation, not during conflict"
  lunarPlanetarySeasonalHooks: []
  capacityHooks:
    - "enough_to_participate"
  audienceHooks:
    - "solo rite before possible shared conversation"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: two candles or lights, cord/ribbon/thread, scissors optional, paper, pen."
  sourceBackedRationale:
    - "Saint Thomas supports a kink/desire clarity rite using candles, symbolic binding, meditation on desire, and cutting/releasing the restraint."
  notForOrHoldNotes:
    - "Not a rope technique lesson, not consent negotiation by itself, not pressure on a partner."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:voicing"
    - "carrier:body"
    - "kink_adjacent"
  secondarySelectionSignals:
    - "secondary_carriers:candlelight,words"
    - "cord release"
  exclusionSignals:
    - "exclude from recommendation until adult-lane review"
    - "exclude if user asks for immediate partner action rather than self-clarity"
  timingSignal:
    - "timing relationship:none"
  confidenceNotes:
    - "Source support is strong for symbolic body/cord clarity; packet omits rope instruction and keeps the rite self-contained."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Sophie Saint Thomas, Sex Witch"
      sourceLocation: "Chapter 5 pp. 108-110, kink/desire clarity rite"
      sourceSummary: "The source uses candles, symbolic restraint, reflection on kink/desire, and cutting/release."
      sourceSupports: "Two lights/candles, symbolic cord, naming desire, releasing shame/fear, and a next communication step."
      moonAndTableChanges: "Removed rope technique instruction and preserved the ritual function as a body/voicing clarity rite."
      doNotImport:
        - "Rope technique instruction"
        - "Partner pressure"
        - "Consent negotiation replacement"
        - "Copied source spell text"
        - "Guarantees that a partner will agree"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: voicing
    secondary:
      - opening
      - releasing
      - connecting
    refinement: "desire clarity"
  carriers:
    primary: body
    secondary:
      - candlelight
      - words
  capacity:
    supports:
      - enough_to_participate
      - room_for_something_deeper
    default: enough_to_participate
  audience:
    supports:
      - me
    default: me
  timing:
    relationship: none
    contexts:
      - "before a desire or kink conversation"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Saint Thomas
    - Sex Witch
    - kink
    - desire
    - body
    - voicing
  keywords:
    - kink
    - fantasy
    - desire
    - cord
    - ribbon
    - shame
    - voice
    - candles
  materials:
    - two candles or steady lights
    - cord, ribbon, or thread
    - scissors
    - paper
    - pen
  places:
    - private room
    - altar
    - table
  sourceLabel: "Sophie Saint Thomas, Sex Witch"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: true
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "kink-adjacent adult ritual"
    - "symbolic cord only; not technique instruction"
    - "not recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "desire/kink is named as the ritual subject"
sexualEnergyCarrier: body
bodyFluidPresent: false
targetingMode: self_clarity_before_conversation
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Findable draft candidate for explicit adult clarity; guided recommendation needs later review."
```

adaptation policy notes: `source_backed_moon_and_table_form`; material substitution limited to cord/ribbon/thread and candles/lights.

operative words metadata: []

### `candidate.saint_thomas.partner_body_intention` — Carry One Intention Through the Body

- candidate ID: `candidate.saint_thomas.partner_body_intention`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Carry One Intention Through the Body

#### Ritual body / practice

Sit or stand together before private touch begins. Each person names one word for what the shared adult time should carry. Choose one word together and write it on a small paper. Place the paper near the bed, under a candle, or under a shared object. If both of you choose to continue into sex or touch, let the body carry that one word without adding instructions. Close by returning to the paper, reading the word once, and deciding whether to keep, fold, or discard it.

#### Intention

Let the body carry one shared word without turning touch into pressure.

#### Best window

Before consensual private touch, sex, or a shared connecting rite.

#### Question to carry

What one word belongs between us before the body speaks?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "body-based connecting"
    - "partner sex magic"
    - "shared intention"
  timingHooks:
    - "not phase-specific"
    - "best before consensual private time"
  lunarPlanetarySeasonalHooks: []
  capacityHooks:
    - "enough_to_participate"
    - "room_for_something_deeper"
  audienceHooks:
    - "both partners choose and return to the shared word"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: paper, pen, candle or shared object optional. Place: bedroom or private room."
  sourceBackedRationale:
    - "Saint Thomas supports partner sex magick around shared intention and focused adult energy."
  notForOrHoldNotes:
    - "Not for coercion, partner pressure, performance goals, or guaranteed outcomes."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:connecting"
    - "carrier:body"
    - "partner sex magick"
  secondarySelectionSignals:
    - "secondary_carriers:words,candlelight,table"
    - "shared word"
  exclusionSignals:
    - "exclude from recommendation until direct-use and recommendation review"
    - "exclude for solo requests"
  timingSignal:
    - "timing relationship:helpful"
  confidenceNotes:
    - "Source supports partner intention and sex-magic architecture; packet uses high-level body language only."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Sophie Saint Thomas, Sex Witch"
      sourceLocation: "Chapter 5 pp. 121-122, partner sex magick"
      sourceSummary: "The source describes partnered sex magick around shared intention and focused adult energy."
      sourceSupports: "Shared intention, adult partner body practice, symbolic support object/light, and intentional close."
      moonAndTableChanges: "Re-centered the existing lane as primary body+connecting while avoiding explicit technique and outcome claims."
      doNotImport:
        - "Technique instruction"
        - "Coercive partner pressure"
        - "Third-party targeting"
        - "Copied spell text"
        - "Guaranteed outcome"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: connecting
    secondary:
      - voicing
      - marking
    refinement: "shared adult intention"
  carriers:
    primary: body
    secondary:
      - words
      - candlelight
      - table
  capacity:
    supports:
      - enough_to_participate
      - room_for_something_deeper
    default: enough_to_participate
  audience:
    supports:
      - both_of_us
    default: both_of_us
    bothOfUsStructure: "Both partners choose one word, decide whether to continue into touch, and close by returning to the word."
  timing:
    relationship: helpful
    contexts:
      - "before consensual private touch or sex"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Saint Thomas
    - Sex Witch
    - partner sex magick
    - body
    - connecting
    - shared intention
  keywords:
    - partner
    - sex magic
    - shared word
    - body
    - touch
    - bedroom
    - candle
  materials:
    - paper
    - pen
    - candle or shared object
  places:
    - bedroom
    - private room
    - bedside
  sourceLabel: "Sophie Saint Thomas, Sex Witch"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "explicit partner adult ritual"
    - "primary body+connecting variant of an existing candlelight lane"
    - "not recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "sex or chosen adult touch may carry the shared intention"
sexualEnergyCarrier: body
bodyFluidPresent: false
targetingMode: shared_intention_only
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Draft/findable body+connecting variant; guided recommendation requires later human review."
```

adaptation policy notes: `source_backed_moon_and_table_form`; body connection is primary; candle/object is secondary.

operative words metadata: []

## Held / deferred / duplicate candidate ledger

| Candidate or lane | Status | Reason |
| --- | --- | --- |
| `candidate.anand.melting_hug` | duplicate / metadata repair | Existing runtime record is complete and direct-use eligible, but current metadata routes it as primary `body + steadying`; do not create a duplicate import. |
| `candidate.anand.heart_salutation_connecting_variant` | duplicate / split decision | Existing `body + blessing` record is complete; a body+connecting split needs Tim product decision. |
| `candidate.anand.laughing_pelvis_explicit` | candidate_extract_later | Explicit body/release lane is source-visible, but needs house-voice and product decision beyond the softened existing laughter record. |
| `candidate.anand.magic_circle_closer_source` | candidate_extract_later | Closer source form needs exact-word and cultural/gender language review. |
| `candidate.anand.chakra_rub_wave` | hold_before_import | Potential body ritual, but not import-ready because of chakra/somatic-claim/material and exact-sequence review. |
| `candidate.saint_thomas.chapter_2_context` | reject_architectural | Sex education/consent/kink glossary is reviewer context, not a Moon & Table Ritual. |
| `candidate.saint_thomas.solo_erotic_self_practice` | hold_before_import | Body ritual lane is visible, but current packet cannot author it without importing technique instruction. |
| `candidate.saint_thomas.fantasy_apple_rose_body_variant` | duplicate | Existing table/plant/words fantasy records preserve the source-supported ritual architecture. |
| `candidate.saint_thomas.former_lover_release` | duplicate | Existing record is complete. |
| `candidate.saint_thomas.friendship_benefits_body_variant` | duplicate / split decision | Existing vessel+connecting record exists and remains direct-use/search-only; a body variant would be a product split. |
| `candidate.saint_thomas.chapter_8_revenge_hex_lanes` | hold_before_import | Ritual architecture exists in places, but targeted/revenge/body-fluid/exact-text handling needs Tim decision before any app-content candidate can be import-ready. |
| `candidate.saint_thomas.bed_linen_reset` | duplicate | Existing record covers bed reset. |
| `candidate.saint_thomas.home_after_intimacy_reset` | duplicate | Existing record covers body/room return after intimacy. |
| Anand Chapters 7-8 explicit technique lessons | reject_architectural | Technique instruction is not a self-contained Moon & Table Ritual unless split into a high-level container. |
| Saint Thomas assault/gaslighting/abuse-adjacent lanes | reject_architectural | Not import-ready under current Ritual-only app model; requires therapy/trauma product decision and exact-text review. |

## Variant / split ledger

Variant / split candidates:

- keep together now: `candidate.anand.shared_symbol_lovemaking` keeps symbol, touch/sex, and return together because the source lane is one shared-symbol body rite.
- split later: `candidate.anand.melting_hug` metadata repair; Heart Salutation body+connecting variant; Saint Thomas friendship-with-benefits body variant; Chapter 8 mechanics-only boundary/release salvage if Tim wants it.
- reason: the existing runtime already contains complete records for several lanes, but #414 surfaced where the primary carrier/purpose may not match the source's strongest connection logic.
- trigger for split: Tim explicitly asks for metadata repair, private adult body+connecting variants, or targeted/revenge mechanics-only candidates.

## Coverage accounting

Primary coverage only counts `approved_for_mechanical_import` candidates:

| Primary carrier | Primary purpose | Count | Candidate IDs |
| --- | --- | ---: | --- |
| body | connecting | 4 | `candidate.anand.partner_dance_witness`, `candidate.anand.shared_symbol_lovemaking`, `candidate.anand.magical_congress_container`, `candidate.saint_thomas.partner_body_intention` |
| body | opening | 1 | `candidate.anand.body_symbol_charge` |
| body | voicing | 2 | `candidate.saint_thomas.body_fluid_sigil_candle`, `candidate.saint_thomas.kink_desire_body_release` |

Secondary support was not counted as primary coverage.

## Validation checklist

- Existing gates reviewed: yes.
- Issue #414 reviewed: yes.
- Issue #413 and PR #415 reviewed: yes.
- Issue #287 mechanical import contract reviewed: yes.
- Runtime `Ritual` model reviewed: yes.
- Runtime authoring, operative-words, and extraction-depth policies reviewed: yes.
- Recent accepted packets reviewed for format: yes.
- Working PDFs inspected locally: yes.
- Repository-safe paraphrase used: yes.
- Long source text copied into repo: no.
- Runtime data changed: no.
- Recommendation eligibility changed: no.
- Direct-use eligibility changed: no.
- Candidates marked `approved_for_mechanical_import` include complete user-facing fields: yes.
- Candidates marked `approved_for_mechanical_import` include runtime-compatible recommendation metadata: yes.
- Candidates marked `approved_for_mechanical_import` include runtime-compatible search metadata: yes.
- Candidates marked `approved_for_mechanical_import` include source grounding and review flags: yes.

Validation commands run for this PR:

```text
npm run lint:content (passes with existing long-text warnings in runtime data)
npm run typecheck
npm run build
npm run test
npm run test:e2e
```
