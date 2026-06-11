# Ritual candidate packet: House Witch canonical re-extraction

## Packet metadata

Packet ID: `packet-house-witch-complete-extraction`

Packet status: `canonical_reextraction_pr_for_qa`

Parent issue: #347

Related issues: #344, #345, #287, #335, #336, #337

Output path: `docs/research/ritual-candidates/packet-house-witch-complete-extraction.md`

Source ID: `SRC-MOD-HOUSE-MURPHYHISCOCK-2018`

Source used: Arin Murphy-Hiscock, *The House Witch: Your Complete Guide to Creating a Magical Space with Rituals and Spells for Hearth and Home*. Adams Media, 2018. First Adams Media hardcover edition, November 2018.

This packet is Markdown research content only. It does not create runtime Ritual records. It does not mark any Ritual or candidate reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.

## Controlling model

This packet has been re-run under #345 and the #344 house voice guide. The packet, not Codex, is the future mechanical-import authoring artifact.

Core rule:

```text
If Codex must invent user-facing Ritual prose during #287, the extraction packet is not complete enough for import.
```

Every `approved_for_mechanical_import` record below has a complete `ritual body / practice` that can be mechanically imported as draft/unavailable Ritual copy after PR-gated QA. `approved_for_mechanical_import` does not mean reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.

## Source text posture

Words, blessings, prayers, spoken formulas, charms, prompts, recipes, and ritual language are valid ritual mechanics. Exact operative source wording of 20 words or fewer may appear inline when it is ritually useful and non-substitutive. Longer prayers, blessings, scripts, recipes, meditations, prompts, formulas, and distinctive passages are not reproduced in this public packet. Where the source supports a spoken action but no reviewed short reusable wording is present, the body uses functional instruction. Use `ritualWords.mode = "adapted_source_words"` only as a candidate-level exception when the source words are structurally necessary and the audit justifies the adaptation.

## Source sections used

| PDF pages | Source section | Extraction decision | Notes |
| ---: | --- | --- | --- |
| 1-8 | Front matter / Introduction | context_only / source_note_only | Source identity, house-witch frame, home-as-refuge language. |
| 9-25 | Ch. 1, A Place to Call Home | source_note_only / hold | Hearthcraft frame, values, food and everyday action. Values/table adaptations held. |
| 26-38 | Ch. 2, Your Home As a Sacred Space | candidate_extract_now / hold | Bank inner flame approved; needfire/high-risk fire held. |
| 39-60 | Ch. 3, Your Spiritual Hearth | candidate_extract_now / hold | Spiritual hearth recognition approved; imagined hearth and ancestor/spirit material held. |
| 61-82 | Ch. 4, The Magic of the Cauldron | candidate_extract_now / hold | Cauldron blessing and harmony candle approved; high-risk cauldron fire held. |
| 83-98 | Ch. 6, The Kitchen As a Sacred Space | candidate_extract_now / hold | Kitchen flame and appliance/tool blessing approved; shrine variant held. |
| 99-121 | Ch. 7, Protect Your Home | candidate_extract_now / hold | Room purification approved; wards/threshold boundary held. |
| 122-138 | Ch. 8, Magic at the Hearth | candidate_extract_now | Grimoire / record keeping approved as source-backed Moon & Table form. |
| 139-152 | Ch. 9, Spirituality of Food | candidate_extract_now / later | Food awareness approved; recipe-specific candidates later/private. |
| 153-172 | Ch. 10, Herbs, Crafts, and Other Hearth Work | hold / later | Spell bottles, spoken-magic examples, and crafts require material/private-text review. |
| 173-183 | Ch. 11, Spells and Rituals | candidate_extract_now | Candle/oil flame, candle/fuel consecration, doorstep, house blessing, room blessing, personal purification, sacred space. |
| 184-200 | Appendix / bibliography / index | context_only | Navigation/provenance only. |

## Source rite inventory and disposition

| Source item | Source pages | Type | Research use | Disposition | Reason | Future action |
| --- | --- | --- | --- | --- | --- | --- |
| Source identity / copyright | 1-6, 184-200 | context_only | context_only | context_only | Metadata only. | Preserve citation. |
| Home as refuge / hearthcraft frame | 7-25 | context_only | source_note_only | source_note_only | Voice and product frame. | Use as rationale, not standalone ritual. |
| Household values / sacred-home prompts | 9-25 | prompt | ritual_candidate | hold | Needs Tim-approved table form to avoid worksheet flattening. | Hold. |
| Chosen-family care practice | 9-25 | practice_family | ritual_candidate | hold | Strong Moon & Table fit but needs adaptation approval. | Hold. |
| Bank inner flame | 26-38 | ritual/prayer | ritual_candidate | candidate_extract_now | Complete closing practice; long prayer requires wording review before direct use. | Candidate below. |
| Needfire / alcohol fire | 26-38 and 61-82 | fire_ritual | hold | hold | High fire risk. | Separate safety review only. |
| Spiritual hearth recognition | 39-60 | ritual | ritual_candidate | candidate_extract_now | Complete hearth recognition structure. | Candidate below. |
| Imagined spiritual hearth | 39-60 | meditation | ritual_candidate | hold | Guided structure needs operative text review before mechanical import. | Hold. |
| Ancestor / household spirit material | 39-60 and Ch. 5 | invocation/context | hold | hold | Restricted remembrance/cosmology. | Separate product decision. |
| Cauldron blessing | 61-82 | blessing | ritual_candidate | candidate_extract_now | Complete vessel blessing; long blessing requires wording review before direct use. | Candidate below. |
| Cauldron harmony candle | 173-183 | spell/rite | ritual_candidate | candidate_extract_now | Complete cauldron + candle rite. | Candidate below. |
| Kitchen sacred flame | 83-98 and 173-183 | candle/prayer | ritual_candidate | candidate_extract_now | Complete flame opening; long prayer requires wording review before direct use. | Candidate below. |
| Consecrating candle/fuel | 173-183 | consecration | ritual_candidate | candidate_extract_now | Complete visualization + short source line. | Candidate below. |
| Appliance/tool blessing | 83-98 | blessing | ritual_candidate | candidate_extract_now | Source gives repeatable blessing structure. | Candidate below. |
| Kitchen shrine/altar tending | 83-98 | practice_family | ritual_candidate | hold | Needs complete non-cosmology form. | Hold. |
| Room purification | 99-121 | ritual | ritual_candidate | candidate_extract_now | Complete cleaning/incense/candle sequence. | Candidate below. |
| Threshold wards / boundary circuit | 99-121 | ritual | ritual_candidate | hold | Outdoor/property/warding language and safety need QA. | Hold. |
| Doorstep cleansing | 173-183 | ritual | ritual_candidate | candidate_extract_now | Complete threshold wash. | Candidate below. |
| House blessing | 173-183 | ritual | ritual_candidate | candidate_extract_now | Complete whole-house circuit. | Candidate below. |
| Room blessing | 173-183 | ritual | ritual_candidate | candidate_extract_now | Complete single-room candle/water/pouch rite. | Candidate below. |
| Room blessing bundle component | 173-183 | ritual_component | ritual_candidate | hold | Pouch is source-supported as part of the larger room blessing; standalone split needs Tim approval and exact-word handling. | Hold before import. |
| Personal purification | 173-183 | ritual | ritual_candidate | candidate_extract_now | Complete candle/salt sequence. | Candidate below. |
| Create sacred space | 173-183 | ritual | ritual_candidate | candidate_extract_now | Complete element-space sequence. | Candidate below. |
| Food with awareness | 139-152 | practice_family | ritual_candidate | candidate_extract_now | Complete Moon & Table form from source-supported action. | Candidate below. |
| Recipe-specific rituals | 139-152 and 173-183 | recipe | ritual_candidate | candidate_extract_later | Exact recipes and dietary/safety review required. | Later recipe review lane. |
| Keep records / grimoire | 122-138 | prompt/practice | ritual_candidate | candidate_extract_now | Complete post-ritual record form. | Candidate below. |
| Spell bottle mechanics | 153-172 | charm/craft | ritual_candidate | hold | Materials and variants need safe splits. | Hold. |
| Corn husk / seasonal crafts | 153-172 | craft | ritual_candidate | hold | Material/time/placement variants need separate review. | Hold. |
| Spoken magic examples | 153-172 | spoken_formula | source_note_only | source_note_only | Supports words-as-mechanics and functional or justified adapted lines. | Keep as source note. |
| Oils/incense/potpourri recipes | Ch. 7, Ch. 10, Ch. 11 | recipe/formula | hold | hold | Essential oil/smoke/pet/pregnancy/asthma safety. | Separate safety review. |

## Packet metrics

```text
source_items_inventoried: 30
candidate_extract_now: 15
candidate_extract_later: 1
adapted_or_exact_text_review: 0
items_with_operative_text_review: 10
source_note_only: 5
context_only: 1
hold_before_import_candidate_records: 9
reject: 0
runtime_records_created: no
direct_use_eligibility_changed: no
recommendation_eligibility_changed: no
```

## Common runtime posture for every candidate

```ts
status: "draft"
availability: {
  findable: false,
  directUseEligible: false,
  recommendationEligible: false,
}
recommendationMetadata: {
  eligibility: {
    recommendable: false,
    missing: ["human_review", "source_verification", "direct_use_review"],
  },
}
```

## Coverage summary

Primary coverage only counts candidates marked `approved_for_mechanical_import`.

| Primary carrier | Primary purpose | Candidate count | Primary candidates |
| --- | --- | ---: | --- |
| candlelight | opening | 1 | `ritual-house-witch-kitchen-sacred-flame` |
| candlelight | blessing | 1 | `ritual-house-witch-consecrate-candle-fuel` |
| candlelight | steadying | 1 | `ritual-house-witch-bank-the-inner-flame` |
| table | opening | 1 | `ritual-house-witch-spiritual-hearth-recognition` |
| vessel | steadying | 1 | `ritual-house-witch-cauldron-harmony` |
| vessel | blessing | 3 | `ritual-house-witch-cauldron-blessing`; `ritual-house-witch-bless-one-room`; `ritual-house-witch-bless-kitchen-tool` |
| doorway | releasing | 1 | `ritual-house-witch-doorstep-cleansing` |
| doorway | blessing | 1 | `ritual-house-witch-house-blessing-circuit` |
| body | releasing | 2 | `ritual-house-witch-purify-person-at-home`; `ritual-house-witch-purify-one-room` |
| body | opening | 1 | `ritual-house-witch-create-small-sacred-space` |
| body | tending | 1 | `ritual-house-witch-food-with-awareness` |
| words | remembering | 1 | `ritual-house-witch-household-grimoire-entry` |

## Candidate records

### `ritual-house-witch-spiritual-hearth-recognition` — Recognize the Hearth

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Recognize the Hearth

ritual body / practice: Stand or kneel before the physical place you have chosen as the spiritual hearth. Place a small bowl of salt, a small bowl of water, a small bowl of mixed kitchen herbs or spices, a candle in a holder, matches, a heatproof dish, and a small bowl of olive or vegetable oil within reach. Take three slow breaths. Hold your hands toward the hearth and name it as the home's center. Bow to the hearth. Touch the salt and scatter a few grains toward the hearth. Touch the water and flick a few drops toward the hearth. Stir the herbs or spices and waft their scent toward the hearth. Light the candle, hold it toward the hearth, and name the flame as part of the hearth recognition. Place the candle safely on or near the hearth. Touch one fingertip to the oil and lightly mark the hearth or its safe symbolic marker. Bow once more. If you will remain in the room, let the candle burn while attended; otherwise, snuff it out.

intention: Formally recognize the place that holds the home's spiritual center.

bestWindow: When establishing a hearth place, after a household reset, or before beginning a series of home rituals.

questionToCarry: Where does this home gather its warmth?

whyThisFitsIngredients:
  checkInHooks: [needs home center, needs beginning]
  timingHooks: [new home, reset, before household ritual sequence]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [enough_to_participate, room_for_something_deeper]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [hearth place, salt, water, kitchen herbs/spices, candle, oil]
  sourceBackedRationale: [The House Witch gives a complete hearth-recognition ritual using salt, water, herbs/spices, flame, oil, bowing, and hearth-recognition words]
  notForOrHoldNotes: [not deity/spirit invocation; direct-use fire/material review still required]

howThisWasChosenIngredients:
  primarySelectionSignals: [establish hearth, open household practice]
  secondarySelectionSignals: [elemental recognition, hearth-recognition action]
  exclusionSignals: [no safe candle/oil surface]
  timingSignal: before other House Witch rituals
  confidenceNotes: complete direct source architecture; no exact or adapted source words used until hearth-recognition wording is reviewed

source grounding: `The House Witch`, Ch. 3, PDF pp. 39-60.

recommendation metadata: primaryPurpose opening; secondaryPurposes [blessing, marking]; primaryCarrier table; secondaryCarriers [candlelight, words, body]; capacity [enough_to_participate, room_for_something_deeper]; audience [me, both_of_us]; timing preferred; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, spiritual hearth, hearth recognition]; keywords [hearth, home center, salt, water, herbs, candle, oil]; materials [salt, water, mixed kitchen herbs/spices, candle, oil]; places [hearth, kitchen, table]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true.

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: []

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-bank-the-inner-flame` — Bank the Inner Flame

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Bank the Inner Flame

ritual body / practice: Do this after the day's kitchen or household work is finished and before bed. Sit or stand in the kitchen, at the hearth place, or by a candle if one is already safely lit. Relax your body. Look back over the day from waking to this moment without judging it. Notice the feelings that remain. Close your eyes and take three slow breaths; with each exhale, let worry or irritation move out of you. Feel yourself here, now, in the home. Name that the day is being banked until morning. If using a candle, snuff or blow it out. If not using a candle, turn off the kitchen or hearth light, or close the door if you are at a threshold.

intention: Gather the day's scattered energy back into the hearth before sleep.

bestWindow: At night, after cleaning up and before bed.

questionToCarry: What can be banked safely until morning?

whyThisFitsIngredients:
  checkInHooks: [end of day, scattered, unsettled]
  timingHooks: [before bed]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [kitchen/hearth place, optional candle, light switch or door]
  sourceBackedRationale: [The House Witch gives a bank-your-inner-flame practice with review of the day, three breaths, optional prayer, and a final physical act]
  notForOrHoldNotes: [no sleep/mental-health claim]

howThisWasChosenIngredients:
  primarySelectionSignals: [night close, steadying]
  secondarySelectionSignals: [smooring, hearth-fire symbolism]
  exclusionSignals: [needs active task instead of closing]
  timingSignal: before bed
  confidenceNotes: complete source-backed form; no exact or adapted source words used until the traditional prayer is reviewed

source grounding: `The House Witch`, Ch. 2, PDF pp. 26-38.

recommendation metadata: primaryPurpose steadying; secondaryPurposes [protecting]; primaryCarrier candlelight; secondaryCarriers [words, body]; capacity [only_a_little, enough_to_participate]; audience [me]; timing required at night; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, smooring, bank inner flame, bedtime]; materials [optional candle]; places [kitchen, hearth, threshold]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true.

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: []

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-kitchen-sacred-flame` — Light the Kitchen Flame

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Light the Kitchen Flame

ritual body / practice: Place a candle in a holder or an oil lamp in a safe kitchen location where it will not be near drafts, towels, paper, hair, sleeves, children, pets, or food prep clutter. Before beginning kitchen or table work, stand before the flame. Light it. Name the kitchen work the flame is opening. Let the flame mark the kitchen as sacred while you work nearby and attend it. When the kitchen work is finished or you leave the room, extinguish the flame safely.

intention: Open kitchen work by recognizing the sacred flame at the hearth.

bestWindow: Before cooking, table-setting, kitchen cleaning, or a household ritual centered in the kitchen.

questionToCarry: What does this flame make visible about the kitchen?

whyThisFitsIngredients:
  checkInHooks: [needs opening, kitchen work]
  timingHooks: [before kitchen or table work]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [candle or oil lamp, kitchen, flame]
  sourceBackedRationale: [The House Witch treats candle or oil lamp flame as a symbol of sacred presence and gives a lighting prayer]
  notForOrHoldNotes: [flame safety; oil-lamp variant needs material review]

howThisWasChosenIngredients:
  primarySelectionSignals: [kitchen opening, flame]
  secondarySelectionSignals: [hearthcraft, sacred kitchen]
  exclusionSignals: [unsafe flame context]
  timingSignal: before kitchen work
  confidenceNotes: complete direct source architecture; no exact or adapted source words used until the prayer is reviewed

source grounding: `The House Witch`, Ch. 6 and Ch. 11, PDF pp. 83-98 and 173-183.

recommendation metadata: primaryPurpose opening; secondaryPurposes [blessing, tending]; primaryCarrier candlelight; secondaryCarriers [table, words]; capacity [only_a_little, enough_to_participate]; audience [me, both_of_us]; timing required before kitchen work; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, kitchen flame, candle, oil lamp]; materials [candle or oil lamp, holder]; places [kitchen, table, counter]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true.

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: []

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-consecrate-candle-fuel` — Consecrate the Candle or Fuel

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Consecrate the Candle or Fuel

ritual body / practice: Place the candle, candles, or oil/fuel on the table before use. Hold both hands over them. Visualize the sacred flame of the hearth burning in your heart. Imagine that fire moving from your heart through your arms and into your hands. Let the light flow from your hands into the candle or fuel, bathing it in the energy of the spiritual hearth. Say: "I dedicate these candles/this oil to the service of my spiritual hearth." Set the candle or fuel aside for later ritual use.

intention: Mark the candle or fuel as hearth material before it is lit.

bestWindow: Before a House Witch candle, oil-lamp, or flame rite.

questionToCarry: What service is this flame being prepared for?

whyThisFitsIngredients:
  checkInHooks: [preparing flame material]
  timingHooks: [before lighting]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [candle or oil/fuel, hands, hearth visualization]
  sourceBackedRationale: [The House Witch gives consecration mechanics using hands, visualization, and a short dedication]
  notForOrHoldNotes: [no essential-oil assumption; material/fire review remains]

howThisWasChosenIngredients:
  primarySelectionSignals: [candle/fuel blessing]
  secondarySelectionSignals: [preparation for later flame rites]
  exclusionSignals: [unsafe fuel handling]
  timingSignal: before flame rite
  confidenceNotes: complete direct source architecture; short exact source line used inline and tracked

source grounding: `The House Witch`, Ch. 11 / PDF pp. 173-183.

recommendation metadata: primaryPurpose blessing; secondaryPurposes [opening]; primaryCarrier candlelight; secondaryCarriers [vessel, words]; capacity [only_a_little, enough_to_participate]; audience [me]; timing required before flame rite; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, candle consecration, oil lamp, fuel]; materials [candle, oil, fuel]; places [table, kitchen, hearth]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true.

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: [{ mode: `source_exact_short`, text: `I dedicate these candles/this oil to the service of my spiritual hearth.`, citationLabel: `Murphy-Hiscock, The House Witch`, sourceLocation: `Ch. 11 / PDF pp. 173-183`, useContext: `spoken`, note: `Short exact dedication line from source.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-cauldron-harmony` — Cauldron Harmony Candle

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Cauldron Harmony Candle

ritual body / practice: Place a small cauldron or heat-safe bowl on the physical analogue of the spiritual hearth or on the kitchen shrine. Pour enough salt or sand into the bottom to hold a candle securely, about an inch and a half if the candle is tall. Set a pale blue candle upright in the salt or sand. Light the candle. Name the peace, rest, renewal, or harmony the hearth vessel is being asked to hold. Leave the cauldron and candle on the hearth place or shrine while attended. Extinguish the candle when the rite is complete or when you leave the room.

intention: Let the hearth vessel and blue candle hold rest, renewal, peace, and harmony for the home.

bestWindow: When the house has been rough, overfull, or in need of a calmer center.

questionToCarry: What would harmony feel like if the hearth could hold it?

whyThisFitsIngredients:
  checkInHooks: [home needs calm, family rough time]
  timingHooks: [as needed]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [enough_to_participate]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [cauldron or heat-safe bowl, salt/sand, pale blue candle, hearth place]
  sourceBackedRationale: [The House Witch gives a cauldron harmony spell using salt or sand, a cauldron, a pale blue candle, source words, and placement at the spiritual hearth or kitchen shrine]
  notForOrHoldNotes: [no guaranteed peace; flame safety]

howThisWasChosenIngredients:
  primarySelectionSignals: [home harmony]
  secondarySelectionSignals: [cauldron and flame]
  exclusionSignals: [unsafe candle/vessel]
  timingSignal: as needed
  confidenceNotes: complete direct source ritual; no exact or adapted source words used until the spoken formula is reviewed

source grounding: `The House Witch`, Ch. 11 / PDF pp. 173-183.

recommendation metadata: primaryPurpose steadying; secondaryPurposes [blessing, tending]; primaryCarrier vessel; secondaryCarriers [candlelight, table, words]; capacity [enough_to_participate]; audience [me, both_of_us]; timing helpful; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, cauldron, harmony, blue candle]; materials [cauldron or heat-safe bowl, salt or sand, pale blue candle]; places [spiritual hearth, kitchen shrine]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true.

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: []

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-cauldron-blessing` — Bless the Hearth Vessel

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Bless the Hearth Vessel

ritual body / practice: Clean and purify the cauldron or hearth vessel before use. Place it at the hearth place, kitchen shrine, or table. Stand or sit before it. Put both hands near it or on it if it is safe to touch. Name the work of change the vessel is being welcomed to hold. If using herbs is approved, sprinkle a few fresh or dried herbs inside that represent blessing or welcome to you. Leave the vessel in its hearth place when finished.

intention: Welcome the cauldron or vessel as a symbol of transformation, wisdom, and household work.

bestWindow: When a new cauldron, bowl, or hearth vessel is brought into household practice.

questionToCarry: What will this vessel hold for the home?

whyThisFitsIngredients:
  checkInHooks: [new vessel, hearth tool needs blessing]
  timingHooks: [before first use]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [enough_to_participate]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [cauldron/vessel, optional herbs, hearth place]
  sourceBackedRationale: [The House Witch instructs cleansing/purifying a cauldron before spiritual use, then saying a blessing and optionally adding herbs of welcome/blessing]
  notForOrHoldNotes: [herb/pet/child/allergy review before direct use]

howThisWasChosenIngredients:
  primarySelectionSignals: [vessel blessing]
  secondarySelectionSignals: [cauldron hearthcraft]
  exclusionSignals: [unsafe or unclean vessel]
  timingSignal: before first use
  confidenceNotes: complete direct source ritual; no exact or adapted source words used until the blessing is reviewed

source grounding: `The House Witch`, Ch. 4 / PDF pp. 61-82.

recommendation metadata: primaryPurpose blessing; secondaryPurposes [marking, tending]; primaryCarrier vessel; secondaryCarriers [table, words]; capacity [enough_to_participate]; audience [me]; timing required before use; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, cauldron blessing, hearth vessel]; materials [cauldron or bowl, optional herbs]; places [hearth, kitchen shrine, table]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true.

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: []

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-doorstep-cleansing` — Doorstep Cleansing

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Doorstep Cleansing

ritual body / practice: Combine one cup water, one tablespoon vinegar, one tablespoon salt, and three whole cloves in a bowl or bucket. Leave the mixture to steep in a sunny place for at least one hour. Bring the bowl or bucket and a washing cloth to the threshold or doorstep. Dip the cloth in the liquid and wash the threshold or doorstep. As you wash, visualize unwanted energy dissipating from the surface. Say: "I hereby cleanse this threshold of negative energy." Repeat regularly or as needed. Dispose of the wash water safely for the surface and household.

intention: Cleanse the threshold so the home has a clearer boundary.

bestWindow: Before guests, after heavy traffic, after conflict, or during regular household cleansing.

questionToCarry: What should not cling to this threshold anymore?

whyThisFitsIngredients:
  checkInHooks: [threshold needs clearing, guests, after conflict]
  timingHooks: [regular or as needed]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [enough_to_participate]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [threshold/doorstep, water, vinegar, salt, cloves, washing cloth]
  sourceBackedRationale: [The House Witch gives a simple doorstep cleansing with exact materials, sunny steeping period, washing action, visualization, and spoken line]
  notForOrHoldNotes: [surface/weather/pet safety]

howThisWasChosenIngredients:
  primarySelectionSignals: [doorway release]
  secondarySelectionSignals: [pre-hosting, threshold care]
  exclusionSignals: [surface damaged by vinegar/salt]
  timingSignal: regular or as needed
  confidenceNotes: complete direct source ritual; short exact source line used inline and tracked

source grounding: `The House Witch`, Ch. 11 / PDF pp. 173-183.

recommendation metadata: primaryPurpose releasing; secondaryPurposes [protecting]; primaryCarrier doorway; secondaryCarriers [vessel, body, words]; capacity [enough_to_participate]; audience [me, both_of_us]; timing helpful; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, doorstep cleansing, threshold, vinegar, salt, cloves]; materials [water, vinegar, salt, three cloves, bowl/bucket, cloth]; places [threshold, doorstep]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; notes [surface, pets, outdoor runoff, and weather review].

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: [{ mode: `source_exact_short`, text: `I hereby cleanse this threshold of negative energy.`, citationLabel: `Murphy-Hiscock, The House Witch`, sourceLocation: `Ch. 11 / PDF pp. 173-183`, useContext: `spoken`, note: `Short exact source line used inline.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-house-blessing-circuit` — Bless the House by Circuit

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Bless the House by Circuit

ritual body / practice: Repair what needs repair, then thoroughly clean walls, floors, windows, cupboards, stairs, and other neglected places. Move counterclockwise through the house while cleaning, finishing by sweeping dirt out the back door and shaking dust rags or emptying wash water out the back door as appropriate. Begin the blessing at the physical analogue of the spiritual hearth. Light purification incense safely in a censer or heatproof bowl with sand. Carry the incense clockwise through each room, wafting smoke into cupboards and behind doors, and name the air-and-fire blessing for each room. Return the incense to the hearth. Light a candle in a holder and carry it clockwise through each room, naming the light blessing as it moves through the house. Return the candle to the hearth. Add a pinch of salt to a small cup of water. Carry it clockwise through each room. Touch the outside and inside of each doorframe, and the frame of each window and cupboard, with salt water; if approved, draw a simple blessing symbol. Name the water-and-salt blessing for each place touched. Return the water to the hearth. Stand at the hearth and name the house as blessed and returned to itself.

intention: Bless the whole home by moving earth, water, air, and fire through its rooms and thresholds.

bestWindow: After cleaning, before moving in, after a heavy season, or when resetting the home.

questionToCarry: What does this house need to receive as blessing?

whyThisFitsIngredients:
  checkInHooks: [whole home reset, moving, blessing]
  timingHooks: [after cleaning]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [room_for_something_deeper]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [hearth, incense, candle, water, salt, rooms, doors, windows, cupboards]
  sourceBackedRationale: [The House Witch gives a full house blessing with cleaning, counterclockwise removal, clockwise incense, candle, salt-water circuits, frame touching, and final hearth blessing]
  notForOrHoldNotes: [smoke/fire/surface/pet/asthma review before direct use]

howThisWasChosenIngredients:
  primarySelectionSignals: [whole-home blessing]
  secondarySelectionSignals: [thresholds, elements, circuit movement]
  exclusionSignals: [too low capacity, unsafe smoke/flame]
  timingSignal: after physical cleaning
  confidenceNotes: complete direct source ritual; no exact or adapted source words used until repeated blessing lines are reviewed

source grounding: `The House Witch`, Ch. 11 / PDF pp. 173-183.

recommendation metadata: primaryPurpose blessing; secondaryPurposes [protecting, marking]; primaryCarrier doorway; secondaryCarriers [candlelight, vessel, words, body]; capacity [room_for_something_deeper]; audience [me, both_of_us]; timing preferred after cleaning; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, house blessing, whole-home blessing]; materials [cleaning supplies, incense, censer/bowl, sand, candle, water, salt]; places [hearth, rooms, doors, windows, cupboards]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; notes [smoke/fire/surface/pet/asthma review].

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: []

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-bless-one-room` — Bless One Room

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Bless One Room

ritual body / practice: Sit in the room and think about its identity. Choose either a white candle or a candle in the color that fits the room's energy. Gather a candle in a holder, matches or lighter, a small cup of water, a pinch of salt for the water, a 4-inch by 4-inch square of cloth, one small amethyst or clear quartz, a pinch of salt for the pouch, one penny or other coin, and about ten inches of narrow ribbon. Light the candle and place it in the center of the room. Name the room as blessed by the flame. Add a pinch of salt to the water. Dip your finger in it and draw a line along the room threshold, naming the threshold as part of the room's blessing. Place the stone, pouch salt, and coin on the cloth, naming each one for harmony, steadiness, and enough. Gather the corners of the cloth and tie it closed with the ribbon. Carefully pass the bundle above, not through, the candle flame and name it as sealed in the room's light. Hang the bundle above the door or place it somewhere in the room where it can continue to bless the room. Name the room as held and the work as closed. Extinguish the candle safely.

intention: Bless a single room by giving it flame, threshold, harmony, protection, abundance, and a placed bundle.

bestWindow: When a room has been changed, cleaned, rearranged, or needs renewed identity.

questionToCarry: What does this room need to become again?

whyThisFitsIngredients:
  checkInHooks: [room needs blessing]
  timingHooks: [after cleaning/rearranging]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [room_for_something_deeper]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [room, candle, salt water, cloth, stone, coin, ribbon, threshold]
  sourceBackedRationale: [The House Witch gives a complete room blessing with candle, threshold line, pouch contents, flame sealing, placement, and closing]
  notForOrHoldNotes: [fire, surface, child/pet, and object-safety review]

howThisWasChosenIngredients:
  primarySelectionSignals: [room blessing]
  secondarySelectionSignals: [vessel/pouch, threshold]
  exclusionSignals: [unsafe flame/object placement]
  timingSignal: after room reset
  confidenceNotes: complete direct source ritual; no exact or adapted source words used until longer blessing lines are reviewed

source grounding: `The House Witch`, Ch. 11 / PDF pp. 173-183.

recommendation metadata: primaryPurpose blessing; secondaryPurposes [marking, protecting]; primaryCarrier vessel; secondaryCarriers [candlelight, doorway, words]; capacity [room_for_something_deeper]; audience [me, both_of_us]; timing helpful after room reset; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, room blessing, pouch, threshold]; materials [candle, water, salt, cloth, amethyst or clear quartz, coin, ribbon]; places [single room, threshold, doorway]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; notes [small object, flame, hanging/placement safety].

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: []

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-room-pouch-blessing` — Set the Room Blessing Bundle

disposition: `hold`

ritualizationType: `source_backed_moon_and_table_form`

headline: Set the Room Blessing Bundle

ritual body / practice: Hold before import. The source-supported pouch materials are one 4-inch by 4-inch square of cloth, one small amethyst or clear quartz, a pinch of salt, one penny or other coin, and about ten inches of narrow ribbon. The source-supported placement is above the room door or somewhere in the room where it can safely continue to bless the room. This component should stay inside `Bless One Room` unless Tim approves a standalone follow-up form and exact short source lines are handled in that standalone body.

intention: Preserve the room-blessing pouch component for later review without weakening the source room-blessing architecture.

bestWindow: Hold before import.

questionToCarry: Is this a whole ritual or a component of the room blessing?

whyThisFitsIngredients:
  checkInHooks: [room needs a physical blessing marker]
  timingHooks: [after room blessing]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [cloth bundle, stone, salt, coin, ribbon, room]
  sourceBackedRationale: [The House Witch room blessing creates and places a cloth pouch to continue blessing the room]
  notForOrHoldNotes: [component/follow-up pattern held before import]

howThisWasChosenIngredients:
  primarySelectionSignals: [small room marker]
  secondarySelectionSignals: [vessel/pouch]
  exclusionSignals: [not complete standalone source ritual without adaptation]
  timingSignal: after room blessing
  confidenceNotes: source-supported component, but standalone split would require Tim approval and exact-word handling

source grounding: `The House Witch`, Ch. 11 / PDF pp. 173-183.

recommendation metadata: primaryPurpose blessing; secondaryPurposes [marking]; primaryCarrier vessel; secondaryCarriers [table, words]; capacity [only_a_little, enough_to_participate]; audience [me]; timing helpful after room blessing; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, room bundle, pouch blessing]; materials [cloth, amethyst or clear quartz, salt, coin, ribbon]; places [room, doorway]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; notes [held component; standalone adaptation and exact-word handling required before import].

adaptation policy notes: hold_before_import; no standalone import until Tim approves the split from the larger Room Blessing.

operative words metadata: []

import readiness label: `hold_before_import`

### `ritual-house-witch-purify-person-at-home` — Purify the Person at Home

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Purify the Person at Home

ritual body / practice: Set a small candle in a holder on the table and place a small bowl or dish of salt beside it. Light the candle. Sit down and take time to settle fully into the moment. Take a few cleansing breaths. Lift your hands and place your fingers in the bowl of salt. Close your eyes and breathe deeply. As you exhale, visualize unwanted energy or the undesired emotion flowing down your arms, out through your fingers, and into the salt. Continue until the release feels complete enough for this sitting. Remove your fingers from the salt and open your eyes. Focus on the candle. Breathe in and visualize the warmth and brightness of the flame entering your body and filling it with light and beauty. Continue until refreshed enough to close. Extinguish the candle. Dissolve the salt in water and pour it down the sink.

intention: Release unwanted energy into salt and take in the warmth of the hearth flame.

bestWindow: Before an important act, in the middle of a difficult day, or at the beginning or end of the day.

questionToCarry: What can leave through my hands now?

whyThisFitsIngredients:
  checkInHooks: [wound up, afraid, anxious, unfocused, before important act]
  timingHooks: [before/after day, before important act]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [enough_to_participate]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [small candle, bowl of salt, hands, breath, sink disposal]
  sourceBackedRationale: [The House Witch gives a complete personal purification using candle, salt, breath, visualization, extinguishing, and salt disposal]
  notForOrHoldNotes: [no medical or therapy claim]

howThisWasChosenIngredients:
  primarySelectionSignals: [personal release]
  secondarySelectionSignals: [flame warmth, salt absorption]
  exclusionSignals: [distress needing human support]
  timingSignal: before/after important act or day
  confidenceNotes: complete direct source ritual; no exact words required

source grounding: `The House Witch`, Ch. 11 / PDF pp. 173-183.

recommendation metadata: primaryPurpose releasing; secondaryPurposes [steadying, blessing]; primaryCarrier body; secondaryCarriers [candlelight, vessel]; capacity [enough_to_participate]; audience [me]; timing helpful; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, personal purification, salt, candle]; materials [small candle, candleholder, salt, bowl/dish]; places [table, kitchen, sink]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; productBoundaryReviewRequired true; notes [no clinical claims].

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: []

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-purify-one-room` — Purify One Room

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Purify One Room

ritual body / practice: Physically clean the room first: return things to their places, then vacuum, sweep, dust, polish, or otherwise remove dirt as needed. Put a teaspoon of purifying incense on a charcoal tablet in a censer or heatproof bowl with sand, or use one stick of purchased purifying incense. Light the incense and name what the smoke is carrying out of the room. Place the bowl or censer in the middle of the room. Let the smoke fill the space; if desired, walk counterclockwise around the room to disperse it. Let the incense work for as long as needed, from a few minutes to a few hours, without assuming more smoke is better. When the room feels purified and smoke has cleared enough for safe flame use, light a candle in the middle of the room and name the flame blessing for what remains. Let the candle burn down while attended. If you cannot remain with the candle, extinguish it at the end of the rite. When the flame is out, leave the room clean and undisturbed for a while.

intention: Purify a room, then bless the cleared space with flame.

bestWindow: After physical cleaning, before guests, after heavy emotional traffic, or when a room feels energetically ragged.

questionToCarry: What is leaving this room, and what is invited to remain?

whyThisFitsIngredients:
  checkInHooks: [room feels heavy, cluttered, ragged, or after conflict]
  timingHooks: [after physical cleaning]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [room_for_something_deeper]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [room, cleaning, incense/smoke, candle/flame]
  sourceBackedRationale: [The House Witch gives an all-purpose room purification with physical cleaning, incense purification, optional counterclockwise movement, candle blessing, and burn-down close]
  notForOrHoldNotes: [smoke/fire/pet/asthma review; no smoke-free direct-use variant yet]

howThisWasChosenIngredients:
  primarySelectionSignals: [room purification]
  secondarySelectionSignals: [cleanse, then bless]
  exclusionSignals: [smoke unsafe, unattended candle]
  timingSignal: after physical cleaning
  confidenceNotes: title-column correction applied; complete direct source ritual with burn-down close preserved for draft mechanical import

source grounding: `The House Witch`, Ch. 7 / PDF pp. 99-121.

recommendation metadata: primaryPurpose releasing; secondaryPurposes [protecting, blessing]; primaryCarrier body; secondaryCarriers [candlelight, vessel, words]; capacity [room_for_something_deeper]; audience [me]; timing helpful after cleaning; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, room purification, incense, candle]; materials [cleaning supplies, incense, censer/heatproof bowl, sand, candle, holder, matches/lighter]; places [single room]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; notes [smoke/fire/pet/asthma review before direct use; source burn-down close preserved for draft mechanical import but direct-use presentation still requires material/fire-safety review].

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable; direct-use safety review may later author a safer close only if Tim approves.

operative words metadata: []

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-create-small-sacred-space` — Create the Small Sacred Space

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Create the Small Sacred Space

ritual body / practice: Gather incense in a censer, a candle in a holder, matches or a lighter, a small cup of water, and a small dish of salt, sand, or earth. Place them at the edge or center of the space you want to define. Take a minute to arrive fully in the moment. Light the incense, move it around the perimeter of the space, and say: "I bless this space with air." Light the candle, move it around the perimeter of the space, and say: "I bless this space with fire." Carry the cup of water around the perimeter and say: "I bless this space with water." Carry the salt, sand, or earth around the perimeter and say: "I bless this space with earth." If moving is difficult, turn in place and raise each element toward the four directions instead. With each element, visualize its energy moving outward and pushing away what does not belong in the working space. Return the elements to the starting place. Stand in the space and say: "I call upon the power of the spiritual hearth to bless this space." Close by naming the space's purpose in one plain sentence, then extinguish the flame and incense safely when the work is complete.

intention: Define a small working space for a specific household ritual.

bestWindow: Before a focused spiritual or household ritual.

questionToCarry: What is this space being set apart to hold?

whyThisFitsIngredients:
  checkInHooks: [needs defined ritual container]
  timingHooks: [before ritual work]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [enough_to_participate]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [incense, candle, water, salt/sand/earth, perimeter/directions]
  sourceBackedRationale: [House Witch gives a simple sacred-space method using incense, candle, water, earth/salt, movement or directional turning, visualization, and short element lines]
  notForOrHoldNotes: [smoke/fire safety, not for ordinary productivity blocks]

howThisWasChosenIngredients:
  primarySelectionSignals: [create ritual container]
  secondarySelectionSignals: [elemental purification]
  exclusionSignals: [unsafe smoke/flame]
  timingSignal: before ritual work
  confidenceNotes: source gives complete element structure and usable short source lines

source grounding: `The House Witch`, Ch. 11 / PDF pp. 173-183.

recommendation metadata: primaryPurpose opening; secondaryPurposes [blessing]; primaryCarrier body; secondaryCarriers [candlelight, vessel, words]; capacity [enough_to_participate, room_for_something_deeper]; audience [me]; timing required before ritual work; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, sacred space, elements]; materials [incense, candle, water, salt/sand/earth]; places [room, altar, table, hearth]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true.

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: [{ mode: `source_exact_short`, text: `I bless this space with air.`, citationLabel: `Murphy-Hiscock, The House Witch`, sourceLocation: `Ch. 11 / PDF pp. 173-183`, useContext: `blessing`, note: `Short exact element line used inline.` }, { mode: `source_exact_short`, text: `I bless this space with fire.`, citationLabel: `Murphy-Hiscock, The House Witch`, sourceLocation: `Ch. 11 / PDF pp. 173-183`, useContext: `blessing`, note: `Short exact element line used inline.` }, { mode: `source_exact_short`, text: `I bless this space with water.`, citationLabel: `Murphy-Hiscock, The House Witch`, sourceLocation: `Ch. 11 / PDF pp. 173-183`, useContext: `blessing`, note: `Short exact element line used inline.` }, { mode: `source_exact_short`, text: `I bless this space with earth.`, citationLabel: `Murphy-Hiscock, The House Witch`, sourceLocation: `Ch. 11 / PDF pp. 173-183`, useContext: `blessing`, note: `Short exact element line used inline.` }, { mode: `source_exact_short`, text: `I call upon the power of the spiritual hearth to bless this space.`, citationLabel: `Murphy-Hiscock, The House Witch`, sourceLocation: `Ch. 11 / PDF pp. 173-183`, useContext: `blessing`, note: `Short exact hearth blessing line used inline.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-bless-kitchen-tool` — Bless the Kitchen Tool

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Bless the Kitchen Tool

ritual body / practice: Choose one appliance or kitchen tool that is used often. If it needs physical cleaning or purification, do that first. Stand before it and touch it with both hands, or touch a safe part of it if it is sharp, hot, electrical, or breakable. Open yourself to its energy: what it does, how often it serves the kitchen, and what kind of work it helps the household do. Say a simple blessing in the source pattern: name the tool, thank it for the work it does, thank it for being part of the household, and bless it. If desired, draw a small circle or hearth-flame symbol on it with plain water, water with a pinch of salt, or a dry finger. Let the mark dry or fade on its own.

intention: Recognize a kitchen tool as a participant in the hearth's work.

bestWindow: When a tool is new, repaired, heavily used, or ready to be welcomed back into kitchen work.

questionToCarry: What work does this tool help the home do?

whyThisFitsIngredients:
  checkInHooks: [tool/appliance needs recognition]
  timingHooks: [new, repaired, or regular maintenance]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [enough_to_participate]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [appliance/tool, hand touch, optional water/salt symbol]
  sourceBackedRationale: [House Witch gives appliance blessing structure: touch, sense energy, thank/bless, optional water/salt/dry symbol]
  notForOrHoldNotes: [electrical/heat/knife safety]

howThisWasChosenIngredients:
  primarySelectionSignals: [kitchen tool blessing]
  secondarySelectionSignals: [modern hearthcraft]
  exclusionSignals: [unsafe touch, plugged/hot/sharp tool]
  timingSignal: as needed
  confidenceNotes: complete source-backed form based on source refrigerator example

source grounding: `The House Witch`, Ch. 6 / PDF pp. 83-98.

recommendation metadata: primaryPurpose blessing; secondaryPurposes [tending]; primaryCarrier vessel; secondaryCarriers [table, words]; capacity [enough_to_participate]; audience [me, both_of_us]; timing helpful; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, kitchen tool, appliance blessing]; materials [tool/appliance, optional water, optional salt]; places [kitchen counter, appliance location]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; notes [electrical, heat, blade, and appliance safety].

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: []

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-household-grimoire-entry` — Enter It in the Household Grimoire

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Enter It in the Household Grimoire

ritual body / practice: Open the household grimoire, notebook, binder, or Moon & Table note. Record the date, the place in the home, the ritual or household action just performed, the materials used, any words spoken, who was present, and the weather or household mood if it mattered. Add one sentence about what felt different afterward. If the action involved food, record the dish or recipe name without copying a full copyrighted recipe into the public packet. Close the book or note and put it back in its household place.

intention: Keep the home's magical memory in a form that can be returned to later.

bestWindow: Immediately after a ritual, recipe, dinner, seasonal change, or household blessing.

questionToCarry: What should the house remember about this?

whyThisFitsIngredients:
  checkInHooks: [needs memory or record]
  timingHooks: [after ritual or household event]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [enough_to_participate]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [grimoire/notebook/binder, words, table]
  sourceBackedRationale: [House Witch gives record-keeping guidance for rituals, purifications, recipes, dates, weather, people present, impressions, and household evolution]
  notForOrHoldNotes: [do not copy full recipes or restricted exact source text into public records]

howThisWasChosenIngredients:
  primarySelectionSignals: [record keeping]
  secondarySelectionSignals: [grimoire and household memory]
  exclusionSignals: [privacy concern, no meaningful event]
  timingSignal: after ritual/event
  confidenceNotes: complete source-backed Moon & Table form

source grounding: `The House Witch`, Ch. 8 / PDF pp. 122-138 and Ch. 9 recipe-memory context.

recommendation metadata: primaryPurpose remembering; secondaryPurposes [marking, tending]; primaryCarrier words; secondaryCarriers [table, vessel]; capacity [enough_to_participate]; audience [me, both_of_us]; timing required after ritual; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, grimoire, record keeping, household memory]; materials [notebook, binder, pen, Moon & Table note]; places [table, kitchen, hearth]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; notes [privacy and recipe copyright review].

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: []

import readiness label: `approved_for_mechanical_import`

### `ritual-house-witch-food-with-awareness` — Prepare Food With Awareness

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Prepare Food With Awareness

ritual body / practice: Choose food you were already going to prepare. Before beginning, pause at the kitchen counter or stove and name who the food is for. Choose one main action to carry the magic: washing vegetables, adding salt, stirring, kneading, pouring, or serving. Keep attention on that action. If stirring, move clockwise when inviting warmth, harmony, or support; move counterclockwise only when the household intention is release or clearing. Speak one short line from the heart or keep the work wordless. Finish by serving or setting the food down with attention to the care it carries. Do not add ingredients or substitutions for magical reasons unless the recipe and dietary needs already allow them.

intention: Prepare food as hearthcraft without turning the recipe into performance.

bestWindow: During normal cooking, especially when food is being made for oneself, Jessica, or chosen family.

questionToCarry: What care am I putting into this food?

whyThisFitsIngredients:
  checkInHooks: [cooking, feeding, care, connection]
  timingHooks: [during planned meal preparation]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [enough_to_participate]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [kitchen action, food already planned, stirring/salt/serving]
  sourceBackedRationale: [House Witch supports food preparation with awareness, focusing intent through ordinary kitchen actions and caring for those who will eat]
  notForOrHoldNotes: [no coercive food magic, no allergy/medical/nutrition claim]

howThisWasChosenIngredients:
  primarySelectionSignals: [food preparation as tending]
  secondarySelectionSignals: [connection through care]
  exclusionSignals: [dietary safety unclear, manipulative intent]
  timingSignal: during cooking
  confidenceNotes: complete source-backed form from food/hearthcraft chapters

source grounding: `The House Witch`, Ch. 1 / PDF pp. 9-25, Ch. 8 / PDF pp. 122-138, and Ch. 9 / PDF pp. 139-152.

recommendation metadata: primaryPurpose tending; secondaryPurposes [connecting, blessing]; primaryCarrier body; secondaryCarriers [table, vessel, words]; capacity [enough_to_participate]; audience [me, both_of_us]; timing helpful during cooking; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [house-witch, food, kitchen witchcraft, cooking with awareness]; materials [planned food, normal cooking tools]; places [kitchen, table]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; productBoundaryReviewRequired true; notes [food allergy, dietary, and coercive-intent review].

adaptation policy notes: purposeChange: not_allowed; materialSubstitution: defined_only; status draft/unavailable/not recommendable.

operative words metadata: []

import readiness label: `approved_for_mechanical_import`

## Held / later records

| Candidate or source item | Import readiness | Reason |
| --- | --- | --- |
| `ritual-house-witch-household-values-table` | hold_before_import | Source supports household values work, but the runtime form risks becoming a worksheet unless Tim approves a specific ritualized table form. |
| `ritual-house-witch-place-for-chosen-care` | hold_before_import | Strong Moon & Table fit, but requires Tim approval for an empty-place/cup/candle adaptation. |
| `ritual-house-witch-imagined-hearth` | hold_before_import | Source meditation is promising but exact guided structure requires operative-text review before mechanical import. |
| `ritual-house-witch-set-household-boundary` | hold_before_import | Threshold/warding sequence is strong but property, outdoor movement, protection language, and material safety need separate QA. |
| `ritual-house-witch-spell-bottle-household-vessel` | hold_before_import | Basic spell-bottle mechanics require material-specific safe variants. |
| `ritual-house-witch-kitchen-shrine-tending` | hold_before_import | Kitchen shrine mechanics need a complete Tim-approved form without restricted cosmology. |
| `ritual-house-witch-mark-season-hearth` | hold_before_import | Seasonal/craft form needs source-specific material and timing review. |
| `ritual-house-witch-room-pouch-blessing` | hold_before_import | Source-supported pouch component belongs inside the larger Room Blessing until Tim approves a standalone follow-up adaptation. |
| Recipe-specific candidates | candidate_extract_later | Valid later lane, but exact recipes and dietary/allergy/food-safety review are required. |

## Coverage records

| Candidate ID | Primary carrier | Primary purpose | Secondary carriers | Secondary purposes | Import readiness |
| --- | --- | --- | --- | --- | --- |
| `ritual-house-witch-spiritual-hearth-recognition` | table | opening | candlelight, words, body | blessing, marking | approved_for_mechanical_import |
| `ritual-house-witch-bank-the-inner-flame` | candlelight | steadying | words, body | protecting | approved_for_mechanical_import |
| `ritual-house-witch-kitchen-sacred-flame` | candlelight | opening | table, words | blessing, tending | approved_for_mechanical_import |
| `ritual-house-witch-consecrate-candle-fuel` | candlelight | blessing | vessel, words | opening | approved_for_mechanical_import |
| `ritual-house-witch-cauldron-harmony` | vessel | steadying | candlelight, table, words | blessing, tending | approved_for_mechanical_import |
| `ritual-house-witch-cauldron-blessing` | vessel | blessing | table, words | marking, tending | approved_for_mechanical_import |
| `ritual-house-witch-doorstep-cleansing` | doorway | releasing | vessel, body, words | protecting | approved_for_mechanical_import |
| `ritual-house-witch-house-blessing-circuit` | doorway | blessing | candlelight, vessel, words, body | protecting, marking | approved_for_mechanical_import |
| `ritual-house-witch-bless-one-room` | vessel | blessing | candlelight, doorway, words | marking, protecting | approved_for_mechanical_import |
| `ritual-house-witch-room-pouch-blessing` | vessel | blessing | table, words | marking | hold_before_import |
| `ritual-house-witch-purify-person-at-home` | body | releasing | candlelight, vessel | steadying, blessing | approved_for_mechanical_import |
| `ritual-house-witch-purify-one-room` | body | releasing | candlelight, vessel, words | protecting, blessing | approved_for_mechanical_import |
| `ritual-house-witch-create-small-sacred-space` | body | opening | candlelight, vessel, words | blessing | approved_for_mechanical_import |
| `ritual-house-witch-bless-kitchen-tool` | vessel | blessing | table, words | tending | approved_for_mechanical_import |
| `ritual-house-witch-household-grimoire-entry` | words | remembering | table | marking, tending | approved_for_mechanical_import |
| `ritual-house-witch-food-with-awareness` | body | tending | table, vessel, words | connecting, blessing | approved_for_mechanical_import |

## Variant / split ledger

- `Kitchen Sacred Flame`: split later into candle and oil-lamp variants after direct-use material/fire review.
- `House Blessing Circuit`: split later into whole-house, apartment, single-room, moving/new-home, and smoke-free variants.
- `Purify One Room`: current approved draft preserves the source smoke/candle architecture but is not direct-use eligible; later QA may author a smoke-free variant if Tim approves.
- `Create the Small Sacred Space`: current candidate is approved as a draft direct-source ritual using the source's short element lines inline.
- `Bless the Hearth Vessel`: direct cauldron version is approved; bowl/jar variants may be separate Moon & Table forms.
- `Food With Awareness`: no recipe text is imported here. Recipe-specific rituals stay in later operative-text review.
- `Room Blessing Bundle`: held as a component of `Bless One Room`; do not import as a standalone Ritual unless Tim approves that adaptation.

## Required self-check results

Searched/checked the revised packet for these QA-blocking terms:

```text
source pattern
source period
source close
source layout
source diagram
as the source shows
as the diagram shows
chosen version
not needed
generic
journal
low
record that direct-use review
```

Results:

- No approved candidate body uses placeholder mechanics such as source pattern, source period, source close, source layout, source diagram, as the source shows, or as the diagram shows.
- No approved candidate uses the invalid runtime capacity value `low`; approved records use `only_a_little`, `enough_to_participate`, or `room_for_something_deeper`.
- `Purify One Room` contains no internal QA/process language in the ritual body.
- `Create the Small Sacred Space` includes the short source element lines inline and tracks them as `source_exact_short`.
- `Room Blessing Bundle` is held before import and does not count toward primary coverage.
- Long source wording is handled by functional instruction unless a candidate-level audit justifies `adapted_source_words`.
- No runtime records or eligibility flags are changed.

## Validation checklist

- [x] Every `approved_for_mechanical_import` record has complete operational `ritual body / practice`.
- [x] No approved candidate requires source lookup for materials, placement, sequence, timing, repetition, wording handling, close, disposal, or rest.
- [x] No approved candidate body contains internal QA/process text.
- [x] No approved candidate uses invalid runtime enum values.
- [x] Short exact source wording is handled under the 20-word rule.
- [x] Long/substantial source wording is handled by functional instruction unless a candidate-level audit justifies `adapted_source_words`.
- [x] Mechanics/components are held unless made into complete source-backed forms.
- [x] `ritual-house-witch-purify-one-room` title correction is applied.
- [x] Packet metrics and coverage are internally consistent.
- [x] Common runtime posture remains draft/unavailable/not recommendable.
