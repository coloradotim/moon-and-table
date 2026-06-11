# Ritual candidate packet: Whitehurst flower table magic

## Packet metadata

Packet ID: `packet-whitehurst-flower-table-magic`
Packet status: `canonical_reextraction_pr_ready`
Researcher: ChatGPT
Date created: 2026-06-10
Date revised: 2026-06-10 under #352
Parent issues: #334, #352
Related issues: #324, #344, #345, #335, #287, #288
Output path: `docs/research/ritual-candidates/packet-whitehurst-flower-table-magic.md`
Source ID: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`

This packet is research content only. It does not create runtime Ritual records. It does not mark any Ritual reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.

## #352 canonical repair note

This revision re-runs the Whitehurst flower/table packet under #344 and #345. The prior packet had useful source accounting, but its `candidate_extract_now` section was a mechanics table, not complete runtime-mappable Ritual authoring. This repair makes only complete, operational records `candidate_extract_now`; other useful concepts remain `candidate_extract_later`, `source_note_only`, `hold`, or `reject`.

## Assignment and controls

Assigned source: Tess Whitehurst, *The Magic of Flowers: A Guide to Their Metaphysical Uses & Properties*, Llewellyn Publications, 2013, first e-book edition.

Controlling source gate: `docs/research/source-gates/src-plant-whitehurst-magic-of-flowers.md`.

Controlling docs read for #352:

```text
#352
#344
#345
src/data/rituals/types.ts
docs/research/voice/moon-and-table-house-voice-guide.md
docs/research/extraction-depth-policy.md
docs/research/prompts/extraction-packet-prompt-template.md
docs/research/runtime-ritual-authoring-policy.md
docs/research/private-source-text-policy.md
```

The actual Whitehurst PDF available in the workspace was used. Page references use PDF pages.

## Source policy note

Gate verdict: `approved_for_extraction_with_limits`.

The Whitehurst source gate is stricter than the later general 20-word operative-word rule. It allows mechanics extraction and brief anchors, but says generated Moon & Table ritual instructions, spoken copy, and timing language should be newly written unless Tim later enters private exact source wording. This packet therefore uses `ritualWords.mode = "moon_and_table_original"` where spoken words are needed. No exact Whitehurst charm, prayer, blessing, meditation, recipe, or distinctive long passage is reproduced.

Held by default: flower essences, essential oils, mists, smoke/incense, baths, topical use, ingestion, flower additions to anyone's food or drink, unsafe plants, medicalized claims, guaranteed outcomes, manipulative attraction, target control, and whole correspondence tables.

## Source sections used

| PDF pages | Section | Extraction decision | Notes |
| ---: | --- | --- | --- |
| 1-10 | Front matter, copyright, contents | context_only | Citation, source identity, and page map. |
| 11-12 | Introduction | context_only | Flower magic frame; no candidate prose copied. |
| 13-15 | Orientation: proximity, gathering, purchased flowers, quiet contemplation | approved_with_limits | Core mechanics for home flower presence, bouquet intention, ethical gathering, offering, and blossom contemplation. |
| 15-16 | Orientation: care, rituals, charms | approved_with_limits | Supports tending a flower as magical action. |
| 16-19 | Orientation: preparations, affinity, correspondences, caution | mixed | Affinity and correspondence support approved as notes; preparation/body-contact methods held. |
| 20-21 | Author's Notes | approved_with_limits | Supports local flowers, asking a flower directly, and offerings after gathering. |
| 24-360 | Individual flower entries | approved_with_limits | Preserved as backlog and item-level source-review lane. |
| 361-363 | Appendix A | hold | Flower essence preparation is not normal extraction. |
| 364-389 | Appendices B-D | source_note_only | Navigation and timing support only. No database dump. |
| 390-394 | Acknowledgments, bibliography | context_only | Provenance only. |

## Source rite inventory and disposition

| Source item | Source pages | Source location precision | Type | Research use | Brief source description | Likely carriers | Likely purposes | Exact text importance | Disposition | Reason | Future action |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Flower proximity / home presence | 13-14 | page_range | ritual | ritual_candidate | Bring a flower or bouquet into the home and employ it consciously for a magical purpose. | plant, table, vessel, words | opening, marking, blessing, steadying | mechanics only | candidate_extract_now | Foundational safe flower-first household practice. | Candidate C1. |
| Purchased bouquet charged with intention | 14 | exact_page | ritual | ritual_candidate | Pause with purchased flowers, gaze, and send one intention into the blossoms. | plant, vessel, table, words | blessing, opening, voicing | mechanics only | candidate_extract_now | Complete vase/table sequence. | Candidate C2. |
| Quiet contemplation with blossom | 14-15 | page_range | meditation | ritual_candidate | Sit or stand near a blossom, bring one concern or intention, and open to what is received. | plant, body, words | steadying, voicing, remembering | mechanics only | candidate_extract_now | Clear, safe blossom-centered practice. | Candidate C3. |
| Ethical gathering and offering | 14, 20-21 | page_range | ritual | ritual_candidate | Ask before gathering and give thanks afterward. | plant, words, body, vessel | tending, blessing, marking | mechanics only | candidate_extract_now | Concrete grimoire-like relationship with the flower. | Candidate C4. |
| Flower care as repeated practice | 15 | exact_page | ritual | ritual_candidate | Tend a flower or flowering plant while holding a focused intention. | plant, body, words | tending, blessing, marking | mechanics only | candidate_extract_later | Useful but better aligned with living-plant lane. | Later living-plant variant. |
| Affinity flower choice | 18 | exact_page | prompt | both | Notice the flower that draws attention and begin there. | plant, words | opening, marking, steadying | mechanics only | source_note_only | Selection logic, not a standalone Ritual here. | Use in recommendation explanation. |
| Ask the flower directly | 20 | exact_page | prompt | both | Ask a present flower what it offers when it is not in the book. | plant, words, body | opening, voicing | mechanics only | candidate_extract_later | Promising but can drift into unsupported meanings. | Later source-note-backed form. |
| Carnation memory mechanics | 69-72 | page_range | ritual | ritual_candidate | Carnation supports memory, love, endurance, and remembrance. | plant, table, vessel, words | remembering, blessing, steadying | mechanics only | candidate_extract_later | Strong but entry-specific source review should precede import. | Later memory table candidate. |
| Forget-Me-Not memory mechanics | 139-141 | page_range | ritual | ritual_candidate | Forget-me-not supports memory, bond, and preservation. | plant, vessel, words | remembering, marking, connecting | mechanics only | candidate_extract_later | Strong pressed-flower lane; needs flower safety and wording review. | Later pressed-memory candidate. |
| Rose witness/message mechanics | 298-303 | page_range | ritual | ritual_candidate | Rose supports love, witness, beauty, and heart connection. | plant, table, words | connecting, blessing, voicing | private review useful | candidate_extract_later | Keep non-coercive partner use; exact entry review first. | Later partner lane. |
| Appendices B-D correspondences | 364-389 | page_range | correspondence_with_action | source_note_only | Purpose, elemental, and planetary navigation. | plant, words | marking, opening, blessing | do not reproduce | source_note_only | Support only. | Future source-note cards. |
| Essences, oils, mists, baths, body preparations | 16-19, 24-360, 361-363 | page_range | recipe | hold | Preparation-heavy methods. | body, vessel, plant | blessing, steadying, opening | private excerpt only | hold | Requires separate safety lane. | Do not import through this packet. |
| Medicalized, coercive, unsafe, or target-control flower work | throughout | chapter_range | ritual | reject | Off-lane material. | varies | varies | varies | reject | Product boundary. | Do not use. |

## Packet metrics

```text
source_items_inventoried: 13 accounting rows in this #352 canonical repair, preserving the prior whole-source accounting by category
candidate_extract_now: 4
candidate_extract_later: 5
private_excerpt_reference: 0
items_with_private_excerpt_recommended: 1
source_note_only: 2
context_only: 3 sections
hold: 1 category row
reject: 1 category row
remaining_unreviewed_source_sections: none at source-accounting level; item-level source verification remains required in PR review
remaining_extraction_backlog: entry-specific flower candidates and held preparation-heavy lanes
```

## Common runtime posture for all `candidate_extract_now` records

```ts
status: "draft"
availability: {
  findable: false,
  directUseEligible: false,
  recommendationEligible: false
}
recommendationMetadata.eligibility: {
  recommendable: false,
  missing: ["human_review", "source_verification"]
}
```

## Coverage summary

| Candidate ID | Primary carrier | Primary purpose |
| --- | --- | --- |
| `whitehurst-flower-on-the-table` | plant | marking |
| `whitehurst-bouquet-with-intention` | vessel | blessing |
| `whitehurst-blossom-contemplation` | plant | voicing |
| `whitehurst-ask-before-gathering` | plant | tending |

## Candidate research records

### C1. `whitehurst-flower-on-the-table`

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Flower on the Table

ritual body / practice:

Choose one household-safe flower or small bouquet already in the house, garden, or florist bundle. Put it in clean water and set it at the table before the meal, conversation, or evening begins. Stand or sit with it for one quiet breath and say: "This flower marks what is beginning here." Name the moment in plain words: the first dinner after a hard week, the start of a new month, a welcome home, or a return to peace. Leave the flower on the table while the household moves around it. When the moment is complete or the flower fades, thank it for marking the threshold and move it to compost or another safe return place.

intention: Mark a household moment with a living flower so the beginning has a visible center.

bestWindow: Useful at the start of a meal, evening, week, month, visit, repair conversation, or seasonal turn. Source timing is helpful rather than required.

questionToCarry: What is beginning at this table?

whyThisFitsIngredients:
  checkInHooks:
    - User has something to mark but does not need a large ritual.
    - User wants the house to feel intentionally held.
  timingHooks:
    - beginning of evening
    - start of week
    - first meal after travel or conflict
  lunarPlanetarySeasonalHooks:
    - new moon or waxing moon may strengthen opening and marking language when available
    - seasonal first flowers or locally available blooms strengthen the source fit
  capacityHooks:
    - supports `only_a_little`
    - supports `enough_to_participate`
  audienceHooks:
    - supports `me`
    - supports `both_of_us`
    - bothOfUsStructure: one person places the flower; both name what is beginning if they want to speak
  materialPlaceCarrierPurposeFit:
    - flower is the primary carrier; table and vessel support the placement
  sourceBackedRationale:
    - Whitehurst treats proximity as the simplest flower magic and supports bringing a flower or bouquet into the home for a conscious magical purpose.
  notForOrHoldNotes:
    - not for unsafe flowers around pets, children, or household sensitivities
    - not for preparation, ingestion, oils, smoke, or bath work

howThisWasChosenIngredients:
  primarySelectionSignals:
    - purpose `marking`
    - carrier `plant`
    - household table context
  secondarySelectionSignals:
    - vessel support
    - gentle opening or blessing context
  exclusionSignals:
    - avoid when user asks for body-contact, ingestion, medicinal, or coercive work
  timingSignal:
    - timing relationship `helpful`
  confidenceNotes:
    - strong fit because the source proximity mechanic is complete enough to support a simple Moon & Table form

source grounding:
  - citationLabel: Whitehurst, *The Magic of Flowers*, Orientation to Flower Magic
    sourceLocation: PDF pp. 13-14
    sourceSummary: The source describes proximity as bringing a flower or bouquet into the home and consciously employing it for a magical purpose.
    sourceSupports: flower as home presence; conscious purpose; bouquet or flower in household space
    moonAndTableChanges: Turns the general proximity practice into a table-centered marking ritual with new Moon & Table spoken words and a simple return close.
    doNotImport:
      - flower-property database behavior
      - preparation-heavy flower methods

recommendation metadata:
  purposes:
    primary: `marking`
    secondary: [`opening`, `blessing`]
    refinement: household threshold or beginning marked by a flower
  carriers:
    primary: `plant`
    secondary: [`table`, `vessel`, `words`]
  capacity:
    supports: [`only_a_little`, `enough_to_participate`]
    default: `only_a_little`
  audience:
    supports: [`me`, `both_of_us`]
    default: `both_of_us`
    bothOfUsStructure: one shared placement; optional shared naming of the moment
  timing:
    relationship: `helpful`
    contexts: [`beginning`, `meal`, `evening`, `new_moon_optional`, `seasonal_turn_optional`]
  eligibility:
    recommendable: false
    missing: [`human_review`, `source_verification`]

search metadata:
  tags: [`flower`, `table`, `marking`, `beginning`, `home`]
  keywords: [`flower on the table`, `bouquet`, `household threshold`, `marking ritual`]
  materials: [`household-safe flower`, `small bouquet`, `vase or cup`, `clean water`]
  places: [`table`, `kitchen table`, `dining table`]
  sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`
  originLabel: `Whitehurst flower proximity`

review flags:
  materialSafetyReviewRequired: true
  sourceVerificationRequired: true
  notes:
    - Verify chosen flower is household-safe before any direct-use path.
    - No runtime eligibility changes in this packet.

adaptation policy notes:
  purposeChange: `not_allowed`
  materialSubstitution: `defined_only`
  capacityAdaptation: `allowed_if_authored`
  audienceAdaptation: `allowed_if_authored`
  timingAdaptation: `may_shape_why_this_fits`

operative words metadata:
  ritualWords:
    - mode: `moon_and_table_original`
      text: "This flower marks what is beginning here."
      citationLabel: Whitehurst, *The Magic of Flowers*, Orientation to Flower Magic
      sourceLocation: PDF pp. 13-14
      useContext: `spoken`
      note: Source supports conscious employment of the flower for a purpose; wording is Moon & Table original because the Whitehurst gate requires generated spoken copy to be newly authored.

import readiness label: `approved_for_mechanical_import`

### C2. `whitehurst-bouquet-with-intention`

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Give the Bouquet Its Purpose

ritual body / practice:

Set a purchased or gathered household-safe bouquet in clean water. Before placing it in the room, hold the vase or cup in both hands and look at the flowers long enough for the room to quiet. Bring one intention to mind as if it already has a place in the house: welcome, tenderness, courage, celebration, repair, or another honest purpose. Say: "Hold this purpose in the house." Put the bouquet where it can be seen without being in the way. Let it stand there through the meal, evening, or day. When the flowers fade, thank them and clear the water and stems away.

intention: Give a bouquet a clear household purpose and let it carry that purpose visibly.

bestWindow: Best when fresh flowers enter the house, especially before a shared evening, welcome, repair, celebration, or new beginning. Source timing is none required.

questionToCarry: What is this bouquet being asked to hold?

whyThisFitsIngredients:
  checkInHooks:
    - User has a specific household atmosphere or purpose in mind.
    - User wants visible magic without a long sequence.
  timingHooks:
    - when flowers are brought home
    - before guests, dinner, a repair conversation, or a private evening
  lunarPlanetarySeasonalHooks:
    - waxing moon may support invitation; Venus-touched timing may support beauty or tenderness if already available
  capacityHooks:
    - supports `only_a_little`
    - supports `enough_to_participate`
  audienceHooks:
    - supports `me`
    - supports `both_of_us`
    - bothOfUsStructure: one person speaks the purpose or both each add one word
  materialPlaceCarrierPurposeFit:
    - bouquet and vase are the working materials; visible placement is the magical engine
  sourceBackedRationale:
    - Whitehurst specifically supports taking a moment with purchased flowers, gazing, conjuring the intention, and sending that energy into the blossoms.
  notForOrHoldNotes:
    - hold if selected flowers are unsafe for the household
    - do not add oils, mists, food/drink, or body-contact methods

howThisWasChosenIngredients:
  primarySelectionSignals:
    - carrier `vessel`
    - purpose `blessing`
    - flowers newly entering the house
  secondarySelectionSignals:
    - plant, table, words
    - opening or voicing context
  exclusionSignals:
    - not for guaranteed outcomes or target-control intention
  timingSignal:
    - timing relationship `none`
  confidenceNotes:
    - high source confidence; this is a direct source ritual architecture rewritten into Moon & Table voice

source grounding:
  - citationLabel: Whitehurst, *The Magic of Flowers*, Orientation to Flower Magic
    sourceLocation: PDF p. 14
    sourceSummary: The source advises taking a moment with purchased flowers, gazing at them, conjuring the intended feeling, and sending the intention into the blossoms.
    sourceSupports: purchased bouquet; gaze; felt intention; intentional placement
    moonAndTableChanges: Adds a concise original spoken line and a clean household close without adding unsupported materials.
    doNotImport:
      - long source prose
      - guaranteed manifestation language
      - target-control uses

recommendation metadata:
  purposes:
    primary: `blessing`
    secondary: [`opening`, `voicing`, `connecting`]
    refinement: flower-vase blessing for household atmosphere
  carriers:
    primary: `vessel`
    secondary: [`plant`, `table`, `words`]
  capacity:
    supports: [`only_a_little`, `enough_to_participate`]
    default: `only_a_little`
  audience:
    supports: [`me`, `both_of_us`]
    default: `both_of_us`
    bothOfUsStructure: shared vase placement; optional one-word purpose from each person
  timing:
    relationship: `none`
    contexts: [`fresh_flowers`, `welcome`, `repair`, `celebration`, `shared_evening`]
  eligibility:
    recommendable: false
    missing: [`human_review`, `source_verification`]

search metadata:
  tags: [`bouquet`, `vase`, `blessing`, `intention`, `flower magic`]
  keywords: [`bouquet with intention`, `vase blessing`, `purchased flowers`, `household purpose`]
  materials: [`household-safe bouquet`, `vase or cup`, `clean water`]
  places: [`table`, `kitchen`, `living room`, `bedroom shelf`]
  sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`
  originLabel: `Whitehurst purchased flowers`

review flags:
  materialSafetyReviewRequired: true
  sourceVerificationRequired: true
  notes:
    - Flower safety and household sensitivity review required before direct-use.
    - Review that purpose language stays non-coercive.

adaptation policy notes:
  purposeChange: `not_allowed`
  materialSubstitution: `defined_only`
  capacityAdaptation: `allowed_if_authored`
  audienceAdaptation: `allowed_if_authored`
  timingAdaptation: `may_shape_why_this_fits`

operative words metadata:
  ritualWords:
    - mode: `moon_and_table_original`
      text: "Hold this purpose in the house."
      citationLabel: Whitehurst, *The Magic of Flowers*, Orientation to Flower Magic
      sourceLocation: PDF p. 14
      useContext: `spoken`
      note: Source supports conscious intention sent into blossoms; this line is Moon & Table original.

import readiness label: `approved_for_mechanical_import`

### C3. `whitehurst-blossom-contemplation`

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Sit with the Blossom

ritual body / practice:

Sit or stand comfortably near a living flowering plant or a fresh household-safe blossom. Let your breath settle and look at the flower until the room feels quieter. Bring one concern, desire, or question to mind and present it silently to the flower. Do not force an answer. Let an image, phrase, sensation, or simple quiet arrive if it arrives. Say: "Thank you for what you showed me." Close by stepping back from the flower and writing one sentence only if something needs to be remembered.

intention: Let a flower become a quiet witness for one question, concern, or desire.

bestWindow: Good when the user needs a low-overwhelm practice, a quiet answer, or a moment with a living/fresh blossom. Source timing is none required.

questionToCarry: What did the flower make easier to hear?

whyThisFitsIngredients:
  checkInHooks:
    - User asks for clarity, steadiness, or a gentle way to voice something.
    - User has low capacity but can sit still briefly.
  timingHooks:
    - quiet morning
    - after work
    - before sleep
    - before a conversation where words matter
  lunarPlanetarySeasonalHooks:
    - moon in water sign or reflective lunar timing may shape why-this-fits when available
    - seasonal living blooms strengthen the fit
  capacityHooks:
    - supports `only_a_little`
    - supports `enough_to_participate`
  audienceHooks:
    - supports `me`
    - supports `both_of_us`
    - bothOfUsStructure: both sit with the same flower; each keeps their own question private unless they choose to speak
  materialPlaceCarrierPurposeFit:
    - flower carries the practice; body and words support silent presentation and closing thanks
  sourceBackedRationale:
    - Whitehurst gives quiet contemplation with a blossom as a primary flower magic method, including gazing, presenting a concern, and opening to wisdom received.
  notForOrHoldNotes:
    - not for diagnostic, therapy, medical, or guaranteed guidance claims

howThisWasChosenIngredients:
  primarySelectionSignals:
    - carrier `plant`
    - purpose `voicing`
    - need for quiet, non-performative magic
  secondarySelectionSignals:
    - steadying and remembering
    - body stillness
  exclusionSignals:
    - avoid if the flower is unsafe to handle or if the request asks for medical/therapy guidance
  timingSignal:
    - timing relationship `none`
  confidenceNotes:
    - high source confidence; direct method is described in the Orientation section

source grounding:
  - citationLabel: Whitehurst, *The Magic of Flowers*, Orientation to Flower Magic
    sourceLocation: PDF pp. 14-15
    sourceSummary: The source describes sitting or standing near a blossom, relaxing, gazing, presenting a concern, and opening to what is received.
    sourceSupports: posture near flower; relaxed gaze; presenting concern; receiving wisdom; optional note-taking
    moonAndTableChanges: Keeps the source architecture, shortens the close, and uses original closing thanks.
    doNotImport:
      - therapy/diagnosis framing
      - guaranteed message claims
      - long source meditation prose

recommendation metadata:
  purposes:
    primary: `voicing`
    secondary: [`steadying`, `remembering`]
    refinement: silent question carried by flower contemplation
  carriers:
    primary: `plant`
    secondary: [`body`, `words`]
  capacity:
    supports: [`only_a_little`, `enough_to_participate`]
    default: `only_a_little`
  audience:
    supports: [`me`, `both_of_us`]
    default: `me`
    bothOfUsStructure: shared quiet practice with private or optional spoken questions
  timing:
    relationship: `none`
    contexts: [`quiet`, `low_capacity`, `before_sleep`, `before_conversation`, `reflective_moon_optional`]
  eligibility:
    recommendable: false
    missing: [`human_review`, `source_verification`]

search metadata:
  tags: [`flower contemplation`, `quiet`, `question`, `voicing`, `steadying`]
  keywords: [`sit with the blossom`, `flower witness`, `quiet contemplation`, `flower question`]
  materials: [`living flowering plant or household-safe blossom`]
  places: [`garden`, `table`, `window`, `room with flower`]
  sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`
  originLabel: `Whitehurst quiet contemplation`

review flags:
  materialSafetyReviewRequired: true
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - Product review should keep this as symbolic/ritual listening, not therapy or divination guarantee.

adaptation policy notes:
  purposeChange: `not_allowed`
  materialSubstitution: `defined_only`
  capacityAdaptation: `allowed_if_authored`
  audienceAdaptation: `allowed_if_authored`
  timingAdaptation: `may_shape_why_this_fits`

operative words metadata:
  ritualWords:
    - mode: `moon_and_table_original`
      text: "Thank you for what you showed me."
      citationLabel: Whitehurst, *The Magic of Flowers*, Orientation to Flower Magic
      sourceLocation: PDF pp. 14-15
      useContext: `closing`
      note: Source supports thanking/relationship with flowers; closing words are Moon & Table original.

import readiness label: `approved_for_mechanical_import`

### C4. `whitehurst-ask-before-gathering`

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Ask Before Gathering

ritual body / practice:

Stand near the flower you are considering gathering. Before cutting or picking it, pause and tell the flower inwardly what help you are asking for. Ask whether it is right to gather this blossom. Wait for the body answer: open, relaxed, and easy means yes; closed, tight, or doubtful means no. If the answer is no, leave the flower and return another day. If the answer is yes, gather gently and take only what is needed. Close by giving simple thanks: a little clean water at the roots, care for the plant's place, or a whispered thank-you.

intention: Gather a flower through permission, restraint, and thanks rather than taking it as a prop.

bestWindow: Use before any flower is gathered from a garden or permitted outdoor place. Source timing is required by action context, not by lunar phase.

questionToCarry: Did I take this flower in right relationship?

whyThisFitsIngredients:
  checkInHooks:
    - User wants to gather a flower for later ritual use.
    - User wants a more relational, grimoire-like practice.
  timingHooks:
    - immediately before gathering
    - garden visit
    - seasonal flower moment
  lunarPlanetarySeasonalHooks:
    - seasonal availability matters more than lunar timing
  capacityHooks:
    - supports `only_a_little`
    - supports `enough_to_participate`
  audienceHooks:
    - supports `me`
    - supports `both_of_us`
    - bothOfUsStructure: one asks and gathers; the other witnesses or offers thanks
  materialPlaceCarrierPurposeFit:
    - plant is primary; words and body carry permission and response
  sourceBackedRationale:
    - Whitehurst instructs gathering with consciousness, compassion, respect, asking permission, following body/mind response, and offering thanks.
  notForOrHoldNotes:
    - only where gathering is legal, permitted, and ecologically appropriate
    - not for unsafe, protected, sprayed, or unknown plants

howThisWasChosenIngredients:
  primarySelectionSignals:
    - carrier `plant`
    - purpose `tending`
    - action context is flower gathering
  secondarySelectionSignals:
    - blessing and marking
    - ethical offering
  exclusionSignals:
    - reject if land permission, plant identification, or household safety is unresolved
  timingSignal:
    - timing relationship `required`
  confidenceNotes:
    - strong source confidence; direct sequence appears in the Orientation and Author's Notes sections

source grounding:
  - citationLabel: Whitehurst, *The Magic of Flowers*, Orientation to Flower Magic; Author's Notes
    sourceLocation: PDF pp. 14, 20-21
    sourceSummary: The source advises asking before gathering a blossom, following the felt yes/no response, gathering gently, and leaving or giving a token of thanks.
    sourceSupports: permission before gathering; body/mind yes-no check; gentle gathering; thanks/offering
    moonAndTableChanges: Uses safe household thanks options and avoids wine/ale/coin details as required materials.
    doNotImport:
      - trespass or wild-harvest encouragement
      - unsafe or unknown plant handling
      - alcohol/coin offering as required runtime material

recommendation metadata:
  purposes:
    primary: `tending`
    secondary: [`blessing`, `marking`]
    refinement: permission and thanks before flower gathering
  carriers:
    primary: `plant`
    secondary: [`words`, `body`, `vessel`]
  capacity:
    supports: [`only_a_little`, `enough_to_participate`]
    default: `only_a_little`
  audience:
    supports: [`me`, `both_of_us`]
    default: `me`
    bothOfUsStructure: shared witnessing with one person gathering
  timing:
    relationship: `required`
    contexts: [`before_gathering`, `garden`, `seasonal_flower`, `permitted_place`]
  eligibility:
    recommendable: false
    missing: [`human_review`, `source_verification`, `material_safety_review`]

search metadata:
  tags: [`gathering`, `flower`, `permission`, `offering`, `tending`]
  keywords: [`ask before gathering`, `flower permission`, `ethical gathering`, `flower offering`]
  materials: [`identified household-safe flower`, `clean water if offering`]
  places: [`garden`, `yard`, `permitted outdoor place`]
  sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`
  originLabel: `Whitehurst ethical gathering`

review flags:
  materialSafetyReviewRequired: true
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - Requires land-access/ecology/common-sense gathering review before direct-use.
    - Keep offerings simple and safe.

adaptation policy notes:
  purposeChange: `not_allowed`
  materialSubstitution: `defined_only`
  capacityAdaptation: `allowed_if_authored`
  audienceAdaptation: `allowed_if_authored`
  timingAdaptation: `may_shape_best_window`

operative words metadata:
  ritualWords:
    - mode: `moon_and_table_original`
      text: "May I gather this blossom?"
      citationLabel: Whitehurst, *The Magic of Flowers*, Orientation to Flower Magic
      sourceLocation: PDF p. 14
      useContext: `petition`
      note: Source supports asking permission before gathering; wording is Moon & Table original.

import readiness label: `approved_for_mechanical_import`

## Source notes

### SN-WHITEHURST-FLOWER-SELECTION

Use flower selection as ritual relationship, not database lookup. Affinity, availability, local flowers, and direct flower presence matter. Correspondences can support later recommendation explanation, but they should not turn Moon & Table into a flower encyclopedia or shopping list.

### SN-WHITEHURST-SAFETY-FIRST-FLOWER

Every runtime flower still needs household safety review before direct-use: pets, children, allergies, scent sensitivity, toxicity, irritating sap, sprayed or treated florist material, plant identification, and disposal. These concerns belong in review flags and QA, not as warning-heavy ritual copy.

### SN-WHITEHURST-WORDING-OVERRIDE

For this source, the source gate's stricter wording rule controls until Tim changes it. Preserve ritual mechanics and source locations. Use Moon & Table original words in public packet copy unless a private source excerpt is later added by Tim under the private source text policy.

## Variant / split ledger

```text
Variant / split candidates:
- keep together now: Flower on the Table as a general marking ritual.
- split later: meal-table marker; repair marker; welcome-home marker; seasonal marker.
- reason: same flower/table mechanics, different household moments.
- trigger for split: recommendation copy needs moment-specific wording.
```

```text
Variant / split candidates:
- keep together now: Bouquet with Intention as a single vase/blessing ritual.
- split later: solo blessing; partner blessing; guest-welcome bouquet; repair bouquet.
- reason: same source sequence but different audience and purpose.
- trigger for split: audience/product review chooses variants.
```

```text
Variant / split candidates:
- keep together now: Blossom Contemplation as one quiet question practice.
- split later: memory question; decision question; shared quiet practice; seasonal flower listening.
- reason: question context matters, but source architecture is stable.
- trigger for split: runtime asks for more precise contexts.
```

## Rejected / held leads

| Source lead | Source pages | Disposition | Reason |
| --- | ---: | --- | --- |
| Preparation-heavy flower practices | 16-19, 24-360, 361-363 | hold | Outside the safe flower/table lane until separate safety review exists. |
| Fragrance, mist, anointing, diffusion, smoke/incense, bath/direct-contact methods | throughout | hold | Household exposure, fire, respiratory, skin, pet, and allergy review required. |
| Health-adjacent or guaranteed-outcome claims | throughout | reject as app advice | Moon & Table can hold symbolic practice, not diagnosis, treatment, fertility, immunity, or health guidance. |
| Agency-violating attraction or target-control framing | throughout | reject or later self-blessing only | Private household ritual must preserve agency and consent. |
| Whole Appendix B-D tables | 364-389 | source_note_only | Navigation and timing support only; no flower database. |

## Duplicate check

- #323 / *The Green Witch's Garden* remains the living plant, container, gardening, and seasonal care lane. This packet stays with flower/table/vase/contemplation/gathering mechanics.
- Candlelight remains secondary here. Flower-specific candle altars should be cross-checked with candle sources before import.
- Moon Book and Dominguez timing work can shape later timing explanation, but this packet does not create lunar or astrology timing cards.

## Gap notes

- This repair intentionally reduces `candidate_extract_now` to complete, operational records that can be mechanically imported as draft/unavailable Ritual records later.
- The prior broad flower-entry accounting is preserved by category and backlog, but entry-specific candidates need separate source verification before approval.
- This packet does not solve flower safety. Safety remains a review dependency, not user-facing warning prose.
- This packet does not import runtime records or alter eligibility.

## Remaining extraction backlog

1. Entry-specific memory flowers: carnation, forget-me-not, lilac, heather, rose.
2. Entry-specific table/vessel flowers: daisy, marigold, magnolia, pansy/viola/violet, water lily.
3. Entry-specific protection/boundary flowers: hydrangea and other reviewed safe substitutes.
4. Correspondence source-note cards from Appendices B-D after separate product decision.
5. Preparation-heavy flower magic remains held until a safety policy exists.

## Validation checklist

- Used only approved Whitehurst source gate and source copy: yes
- Re-read #352, #344, #345, runtime types, house voice guide, extraction-depth policy, prompt template, runtime authoring policy, private source text policy: yes
- Used actual Whitehurst PDF available in workspace: yes
- Packet path matches requested path: yes
- Candidate records are complete runtime-mappable records, not mechanics rows: yes
- Every `candidate_extract_now` has operational ritual body / practice: yes
- Every `candidate_extract_now` includes headline, intention, bestWindow, questionToCarry, source grounding, recommendation metadata, search metadata, review flags, adaptation notes, operative words metadata, and import readiness label: yes
- No `metadata_symbolism_only` record is marked `candidate_extract_now`: yes
- Runtime enum values checked against `src/data/rituals/types.ts`: yes
- Invalid carrier values such as flower, bouquet, altar, offering, object, room, and decor are not used as runtime carriers: yes
- Invalid capacity values are not used: yes
- Invalid review flag fields are not used: yes
- No runtime Ritual records created: yes
- No selector, check-in, recommendation, or runtime data changed: yes
- No candidate marked reviewed/findable/direct-use eligible/recommendation eligible/recommendable/runtime-ready: yes
- Flower magic remains magical, domestic, concrete, and source-backed: yes
- Safety is tracked in flags/notes without turning ritual bodies into warning labels: yes
- Exact Whitehurst wording is not reproduced; stricter source-gate wording policy is documented: yes
- Self-check terms from #352 searched in this packet: pass

## Final packet status

```text
packet_status: canonical_reextraction_pr_ready
runtime_records_created: no
recommendation_logic_updated: no
ui_updated: no
candidates_reviewed: no
candidates_findable: no
candidates_direct_use_eligible: no
candidates_recommendation_eligible: no
human_review_required: yes
```
