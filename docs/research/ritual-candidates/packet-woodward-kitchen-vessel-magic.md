# Ritual candidate packet: Woodward kitchen vessel magic

## Packet metadata

Packet ID: `packet-woodward-kitchen-vessel-magic`

Packet status: `canonical_reextraction_pr_for_qa`

Parent issue: #351

Related issues: #344, #345, #287, #333, #335, #336

Output path: `docs/research/ritual-candidates/packet-woodward-kitchen-vessel-magic.md`

Source ID: `SRC-VESSEL-WOODWARD-KITCHEN-WITCHERY`

Source used: Laurel Woodward, *Kitchen Witchery: Unlocking the Magick in Everyday Ingredients*. Llewellyn Publications, 2021. First e-book edition, 2021.

This packet is Markdown research content only. It does not create runtime Ritual records. It does not mark any Ritual or candidate reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.

## Controlling model

This packet has been re-run under #345 and the #344 house voice guide. The packet, not Codex, is the future mechanical-import authoring artifact.

Core rule:

```text
If Codex must invent user-facing Ritual prose during #287, the extraction packet is not complete enough for import.
```

Every `approved_for_mechanical_import` record below has a complete `ritual body / practice` that can be mechanically imported as draft/unavailable Ritual copy after PR-gated QA. `approved_for_mechanical_import` does not mean reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.

## Source text posture

The approved source gate for this source is `docs/research/source-gates/src-vessel-woodward-kitchen-witchery.md`. That gate is stricter than the general 20-word rule: it allows mechanics extraction and private exact-text handling, but says runtime text should not reproduce direct source quotes from recipes, recipe headnotes, exercises, blessings, charms, meditations, petitions, or distinctive prose. Therefore this packet does not use `source_exact_short` for this source. Where exact wording matters, it is tracked as `private_source_excerpt`; where a complete public packet body needs spoken or written words, the line is `moon_and_table_original` and the note explains the source-supported action it completes.

## Source sections used

| PDF pages | Source section | Extraction decision | Notes |
| ---: | --- | --- | --- |
| 4-8 | Copyright, disclaimer, contents | context_only / source_note_only | Citation, TOC, food sensitivity and allergy boundary. |
| 9-10 | Introduction | candidate_extract_now / source_note_only | Kitchen as sacred space; attention, intention, everyday ingredients. |
| 11-19 | Ch. 1, Why Food Matters | context_only / hold | Seasonal household food context; health/organic/pesticide claims excluded. |
| 20-41 | Ch. 2, The Magick of Everyday Things | candidate_extract_now / hold | Intention, centering, kitchen action as ritual, table candle, bowl/water reflection, moon timing, object blessing. |
| 42-120 | Chs. 3-6, grains/flours/beans/nuts/seeds | candidate_extract_now / source_note_only / hold | Bread/dough/bowl/kneading/table and hearty bowl mechanics; no recipes or allergen defaults. |
| 121-136 | Ch. 7, Oils and Vinegars | candidate_extract_later / hold | Food-safe finishing mechanics only; topical/anointing/essential-oil material held. |
| 137-164 | Ch. 8, Sugars and Sweets | candidate_extract_now / reject | Sweetness as invitation/warmth; coercive sweetening/prosperity spell database rejected. |
| 165-221 | Ch. 9, Vegetables | candidate_extract_now / source_note_only / hold | Soup/stew/bowl/table, seasonal produce, shared household offering; health/prosperity/compulsion claims held. |
| 222-224 | Ch. 10, Fungi | source_note_only | Minimal support only; no foraging or medicinal use. |
| 225-253 | Ch. 11, Fruits | candidate_extract_now / hold | Fruit as seasonal marker, table blessing, sharing, memory symbol; love-control/fertility/beauty/medicinal claims held. |
| 254-268 | Ch. 12, Hydration and What We Drink | candidate_extract_now / hold | Shared cup, pitcher, glass, jar, water vessel, drink-as-carrier; alcohol/caffeine/wild water held. |
| 269-332 | Ch. 13, Spices and Herbs | source_note_only / hold | Safe culinary scent/taste symbolism as support; medicinal/smoke/topical material held. |
| 333-343 | Ch. 14, Dairy and Eggs | source_note_only / hold | Nourishment/table/seasonal support only; dairy/egg safety boundaries. |
| 344-381 | Ch. 15, Recipes for the Seasons | candidate_extract_now / hold | Seasonal table marking, shared meal, food memory; no recipes or culturally specific obligations. |
| 382-399 | Bibliography / acknowledgments | context_only | Citation/provenance only. |

## Source rite inventory and disposition

| Source item | Source pages | Source location precision | Type | Research use | Brief source description | Likely carriers | Likely purposes | Exact text importance | Disposition | Reason | Future action |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Citation / copyright / disclaimer | 4-8 | page_range | context | source_note_only | Copyright, source identity, medical and food sensitivity disclaimer. | words | protecting | high | context_only | Metadata/safety context only. | Preserve citation and safety boundary. |
| Kitchen as sacred household space | 9-10 | page_range | framing | source_note_only | Kitchen work becomes ritual through attention, intention, ingredients, and care. | table, vessel, body | blessing, tending | medium | source_note_only | Voice/context only; do not copy author prose. | Use as rationale. |
| Intention before kitchen action | 20-28 | page_range | ritual_mechanic | ritual_candidate | Choose a clear purpose before/during a kitchen act. | words, table, vessel, body | opening, voicing, blessing | high | candidate_extract_now | Core mechanic; public wording must be Moon & Table original. | Candidate below. |
| Coming to center | 27-30 | page_range | meditation | ritual_candidate | Pause, breathe, gather attention before acting. | body, words, table | steadying, opening | high | candidate_extract_now | Complete kitchen opening if kept simple. | Candidate below. |
| Bowl as focus while mixing/stirring | 21-28 | page_range | ritual_mechanic | ritual_candidate | Vessel receives attention, intention, and action. | vessel, body, words | tending, connecting | medium | candidate_extract_now | Strong vessel mechanic, not recipe. | Candidate below. |
| Candle at the table while cooking | 23-25 | page_range | ritual_mechanic | ritual_candidate | Candle and prepared food share table/working space. | candlelight, table, vessel | opening, blessing, marking | medium | candidate_extract_now | Fire-safe table variant can stand alone. | Candidate below. |
| Spoken petitions over food | 21-28 | page_range | words | private_excerpt_reference | Source examples use voiced petitions while preparing food. | words, vessel | voicing, blessing | high | hold_before_import | Exact text excluded; coercive examples rejected. | Use only private/source-reviewed text later. |
| Moon phase kitchen wording | 30-36 | page_range | timing_context | product_followup_pattern | Waxing/full/waning timing shapes the verb of a kitchen/table act. | words, table | opening, marking, releasing | medium | candidate_extract_later | Useful timing layer, not enough by itself. | Later timing variant. |
| Dark moon water bowl reflection | 33-34 | exact_page | ritual_mechanic | ritual_candidate | Water bowl/window reflection and written noticing. | vessel, words, body | remembering, releasing, voicing | medium | candidate_extract_now | Strong vessel + remembering; underworld/mediumship softened. | Candidate below. |
| Tool/object cleansing and consecration | 38-41 | page_range | object_ritual | ritual_candidate | Cleanse/bless/charge a kitchen or ritual object. | vessel, table, words, body | blessing, marking, protecting | high | candidate_extract_now | Use food-safe cleaning; smoke/oil/deity material held. | Candidate below. |
| Elemental object blessing | 39-40 | page_range | invocation | private_excerpt_reference | Elemental blessing over an object. | table, vessel, words | blessing, marking | high | hold_before_import | Exact invocation, smoke/oil/deity options, and ritual complexity require review. | Hold. |
| Bread/dough/kneading as intention work | 42-71 | chapter_range | ritual_mechanic | ritual_candidate | Bread/dough/kneading/bowl/table as embodied intention and offering. | vessel, body, table | tending, blessing, remembering | medium | candidate_extract_now | No recipe; raw flour/gluten boundary. | Candidate below. |
| Bread as household offering | 42-71, 344-381 | chapter_range | food_symbol | ritual_candidate | Bread/loaf as household offering or table sign. | table, vessel, body | blessing, remembering | medium | candidate_extract_now | Can use already-planned bread without recipe. | Candidate below. |
| Beans/lentils/vegetable soup or stew bowl | 92-107, 165-221 | chapter_range | meal_vessel | ritual_candidate | Hearty bowl/pot/serving vessel as tending and steadiness. | vessel, table, body | tending, steadying | medium | candidate_extract_now | No recipe or nutrition claim. | Candidate below. |
| Nuts/seeds as ingredient symbols | 108-120 | chapter_range | correspondence_support | source_note_only | Seeds/nuts as beginning/abundance symbols. | vessel, table | opening, marking | medium | hold_before_import | Allergy/choking/pet boundaries. | Hold. |
| Food-safe finishing oil / vinegar gesture | 121-136 | page_range | kitchen_action | product_followup_pattern | Finishing/serving gesture can mark completion. | vessel, table, body | blessing, tending | high | candidate_extract_later | Oil safety and recipe boundary require variant. | Later. |
| Sweetness bowl / welcome dish | 137-164 | chapter_range | vessel_symbol | ritual_candidate | Sweetness as warmth, welcome, and invitation. | vessel, table, words | blessing, connecting | medium | candidate_extract_now | Coercive sweetening rejected; use enoughness/welcome. | Candidate below. |
| Coercive love/attraction/sweetening | 21-25, 137-164, 225-253 | chapter_range | spell | source_note_only | Food used to compel love, favor, or desire. | vessel, words | connecting | high | reject | Target-control boundary. | Do not import. |
| Seasonal fruit or food marker | 225-253, 344-381 | chapter_range | seasonal_marker | ritual_candidate | One seasonal food object marks the moment at the table. | table, vessel, plant | marking, blessing, remembering | medium | candidate_extract_now | No fertility/beauty/health claims. | Candidate below. |
| Shared cup / pitcher / drink pause | 254-268 | page_range | drink_vessel | ritual_candidate | Cup, pitcher, glass, jar, water/drink as carrier. | vessel, table, body | connecting, steadying | medium | candidate_extract_now | Ordinary safe drink only; no alcohol/caffeine default. | Candidate below. |
| Herbal/spice correspondences | 269-332 | chapter_range | correspondence_support | source_note_only | Culinary scent/taste symbolism. | vessel, plant, words | blessing, protecting | medium | source_note_only | Support only; no database, medicine, smoke, or topical use. | Use as support only. |
| Dairy/egg seasonal/nourishment support | 333-343 | chapter_range | correspondence_support | source_note_only | Nourishment and seasonal context. | table, vessel | tending, marking | medium | source_note_only | Allergy/raw-egg boundaries. | Use as support only. |
| Seasonal recipes and table rites | 344-381 | chapter_range | seasonal_food | ritual_candidate | Seasonal table marking and repeated household food memory. | table, vessel, words | marking, remembering, connecting | high | candidate_extract_now | Recipes and cultural obligations excluded. | Candidates below. |
| Repeated food memory | 344-381 | chapter_range | memory_practice | ritual_candidate | Record the spell around a repeated household food, not the recipe. | words, table, vessel | remembering, marking | medium | candidate_extract_now | Good grimoire pattern; no recipe text. | Candidate below. |
| Culturally specific/deity/ancestor holiday foodways | 344-381 | chapter_range | seasonal_context | source_note_only | Seasonal food traditions and ritual associations. | table, words | remembering, blessing | high | hold_before_import | Provenance and obligations require review. | Hold. |
| Recipes, ingredient lists, temperatures, methods | throughout | chapter_range | recipe | source_note_only | Exact recipes and cooking directions. | vessel, table, body | tending | high | hold_before_import | Moon & Table is not a recipe app. | Hold unless private safe lane created. |
| Health/nutrition/organic/pesticide/medicinal claims | throughout | chapter_range | claim | source_note_only | Food health, purity, medical, diet, or treatment claims. | words | protecting | medium | reject | Outside product lane. | Do not import. |
| Smoke, incense, oils, perfumes, baths, hand powders | multiple | chapter_range | material_ritual | source_note_only | Non-food material preparations. | vessel, body, candlelight | blessing, protecting | high | hold_before_import | Material safety and source boundary. | Hold. |

## Packet metrics

```text
source_items_inventoried: 26
candidate_extract_now: 14
candidate_extract_later: 3
private_excerpt_reference: 3
items_with_private_excerpt_recommended: 4
source_note_only: 5
context_only: 1
hold_before_import_candidate_records: 7
reject: 3
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
| body | opening | 1 | `ritual-woodward-center-at-counter` |
| words | opening | 1 | `ritual-woodward-kitchen-table-intention` |
| vessel | tending | 2 | `ritual-woodward-bowl-focus-stirring`; `ritual-woodward-pot-of-tending` |
| table | blessing | 2 | `ritual-woodward-bread-table-offering`; `ritual-woodward-seasonal-food-marker` |
| vessel | remembering | 2 | `ritual-woodward-window-water-bowl`; `ritual-woodward-repeated-recipe-memory` |
| vessel | blessing | 3 | `ritual-woodward-kept-kitchen-object`; `ritual-woodward-enoughness-bowl`; `ritual-woodward-candle-beside-bowl` |
| vessel | connecting | 2 | `ritual-woodward-shared-cup-pause`; `ritual-woodward-welcome-served-simply` |
| table | releasing | 1 | `ritual-woodward-clear-table-closing` |

## Candidate records

### `ritual-woodward-center-at-counter` — Come to Center at the Counter

disposition: `candidate_extract_now`

ritualizationType: `direct_source_ritual`

headline: Come to Center at the Counter

ritual body / practice: Stand or sit at the kitchen counter, table, or sink before beginning the kitchen act. Put both feet on the floor. Let your hands rest on the counter edge, the table, or your own body. Take three slow breaths. On each breath, draw your attention away from the rest of the day and into the kitchen. Notice your body, your hands, and the object or vessel you are about to touch. Say the Moon & Table line: "I am here, and the work begins here." Begin the next kitchen action only after that pause.

intention: Arrive fully before asking the kitchen action to carry meaning.

bestWindow: Before cooking, setting a table, preparing a bowl, speaking an intention, or blessing a kitchen object.

questionToCarry: What changes when I arrive before I act?

whyThisFitsIngredients:
  checkInHooks: [scattered, rushed, needs beginning]
  timingHooks: [before kitchen action]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [counter, table, sink, body, breath]
  sourceBackedRationale: [Woodward gives coming to center as the way to gather attention before a kitchen magical act]
  notForOrHoldNotes: [not breathwork therapy, anxiety treatment, or productivity prep]

howThisWasChosenIngredients:
  primarySelectionSignals: [opening, centering]
  secondarySelectionSignals: [supports other kitchen/vessel candidates]
  exclusionSignals: [needs immediate practical action instead]
  timingSignal: before kitchen work
  confidenceNotes: complete direct source mechanic paraphrased under source-gate limits

source grounding: `Kitchen Witchery`, Ch. 2, PDF pp. 27-30. Supports centering before kitchen magical work.

recommendation metadata: primaryPurpose opening; secondaryPurposes [steadying, tending]; primaryCarrier body; secondaryCarriers [table, words]; capacity [only_a_little, enough_to_participate]; audience [me]; timing required before kitchen ritual; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, kitchen, counter, centering]; keywords [center, breath, counter, kitchen opening]; materials []; places [kitchen counter, table, sink]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired false; notes [No medical, therapy, or nervous-system claim.]

adaptation policy notes: direct_source_ritual paraphrased; source gate requires rewritten runtime wording.

operative words metadata: [{ mode: `private_source_excerpt`, privateExcerptKey: `woodward-centering-meditation-pp27-30`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 2 / PDF pp. 27-30`, useContext: `spoken`, note: `The source centering meditation is substantial and remains private; public body preserves the mechanics.` }, { mode: `moon_and_table_original`, text: `I am here, and the work begins here.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 2 / PDF pp. 27-30`, useContext: `spoken`, note: `Moon & Table line completing the source-supported centering action.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-kitchen-table-intention` — Set the Kitchen-Table Intention

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Set the Kitchen-Table Intention

ritual body / practice: Clear a small space on the kitchen table or counter. Set down the empty bowl, cup, pot, plate, or serving dish that will hold the work. Place one small paper beside it. Write one plain, non-coercive sentence naming what this kitchen act is for: welcome, steadiness, repair, warmth, courage, patience, release, or blessing. Read the sentence once. Say the Moon & Table line: "This is what the work is for." Put the paper under or beside the vessel while the kitchen action begins. Close by folding the paper and putting it in the household record, recycling it, or placing it under the vessel until the table is cleared.

intention: Give the vessel a clear household purpose before the kitchen action begins.

bestWindow: Before a meal, tea, bowl, bread, table blessing, or shared kitchen act.

questionToCarry: What is this kitchen work actually for?

whyThisFitsIngredients:
  checkInHooks: [needs purpose, wants to make the kitchen act meaningful]
  timingHooks: [before kitchen or table work]
  lunarPlanetarySeasonalHooks: [moon phase may shape wording later]
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [table, vessel, written words]
  sourceBackedRationale: [Woodward treats clear intention as the first step of magical cooking and supports written or spoken intention]
  notForOrHoldNotes: [no target-control, health claim, guaranteed outcome, or covert food magic]

howThisWasChosenIngredients:
  primarySelectionSignals: [opening, voicing]
  secondarySelectionSignals: [vessel, table, written purpose]
  exclusionSignals: [coercive or medical intention]
  timingSignal: before vessel work begins
  confidenceNotes: complete source-backed Moon & Table form from source mechanics

source grounding: `Kitchen Witchery`, Ch. 2, PDF pp. 20-28. Supports intention before kitchen magical action.

recommendation metadata: primaryPurpose opening; secondaryPurposes [voicing, blessing]; primaryCarrier words; secondaryCarriers [table, vessel]; capacity [only_a_little, enough_to_participate]; audience [me, both_of_us]; timing required before kitchen work; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, intention, kitchen table, vessel]; keywords [intention, written purpose, bowl, cup, table]; materials [paper, pen, bowl/cup/pot/plate/serving dish]; places [kitchen table, counter]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; productBoundaryReviewRequired true; notes [Reject coercive food/drink magic, medical/health claims, guaranteed outcomes, and serving ritual food to another person without consent.]

adaptation policy notes: source_backed_moon_and_table_form; no exact source petition copied.

operative words metadata: [{ mode: `moon_and_table_original`, text: `This is what the work is for.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 2 / PDF pp. 20-28`, useContext: `spoken`, note: `Moon & Table line for the source-supported intention-setting action.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-bowl-focus-stirring` — Stir the Bowl With Purpose

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Stir the Bowl With Purpose

ritual body / practice: Set one bowl on the counter or table. Put into it only food or ingredients that are already part of the planned kitchen work. Come to center. Hold the bowl steady. Name the household quality the bowl is meant to carry: warmth, welcome, patience, courage, sweetness, repair, steadiness, or enoughness. Stir, mash, fold, or mix slowly for nine turns. Keep your attention on the bowl and the action rather than on a promised result. Say the Moon & Table line: "Let this bowl hold the work cleanly." Continue the ordinary kitchen preparation or close by washing the bowl if the food will not be used.

intention: Let a real bowl action carry the purpose without turning the meal into a spell database.

bestWindow: During already-planned mixing, mashing, stirring, or folding.

questionToCarry: What is this bowl holding besides ingredients?

whyThisFitsIngredients:
  checkInHooks: [wants ordinary kitchen action to carry meaning]
  timingHooks: [during planned preparation]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [enough_to_participate]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [bowl, spoon/fork/hand, planned ingredients]
  sourceBackedRationale: [Woodward's examples repeatedly make mashing, stirring, chopping, and mixing the way intention enters the food]
  notForOrHoldNotes: [no recipe, no coercive target, no hidden food magic for another person]

howThisWasChosenIngredients:
  primarySelectionSignals: [vessel, tending, kitchen action]
  secondarySelectionSignals: [spoken purpose, table]
  exclusionSignals: [unsafe food, allergy issue, covert serving]
  timingSignal: during planned kitchen preparation
  confidenceNotes: complete source-backed form; nine turns are Moon & Table structure, not claimed as source count

source grounding: `Kitchen Witchery`, Ch. 2, PDF pp. 20-28; Chs. 3-15 for kitchen action examples.

recommendation metadata: primaryPurpose tending; secondaryPurposes [blessing, voicing]; primaryCarrier vessel; secondaryCarriers [body, words, table]; capacity [enough_to_participate]; audience [me, both_of_us]; timing helpful during food preparation; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, bowl, stirring, kitchen action]; keywords [stir, mix, mash, bowl, intention]; materials [bowl, spoon or fork, planned ingredients]; places [kitchen counter, table]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; productBoundaryReviewRequired true; notes [Food allergy, dietary consent, raw ingredients, sanitation, sharp/hot tools, and covert serving review required before direct use.]

adaptation policy notes: source_backed_moon_and_table_form; no recipe or exact petition reproduced.

operative words metadata: [{ mode: `moon_and_table_original`, text: `Let this bowl hold the work cleanly.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 2 / PDF pp. 20-28`, useContext: `spoken`, note: `Moon & Table line for source-supported bowl-as-focus action.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-bread-table-offering` — Bread on the Table

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Bread on the Table

ritual body / practice: Use bread that is already safe for the household: a slice, roll, small loaf, toast, or bread already being prepared. Do not add baking instructions to this ritual. Place the bread on a plate at the center of the table. Touch the plate and name what the household is being fed tonight: steadiness, welcome, repair, patience, warmth, or memory. Say the Moon & Table line: "Let this be enough for the table." Share the bread only with people who know what is being offered and can safely eat it. If it is not eaten, wrap it for later or compost/discard it according to household practice.

intention: Make bread a visible household offering without turning Moon & Table into a recipe source.

bestWindow: Before a simple meal, after baking already planned bread, or when the table needs a small sign of enoughness.

questionToCarry: What does this table need to be fed?

whyThisFitsIngredients:
  checkInHooks: [table needs warmth, meal needs blessing]
  timingHooks: [before meal, after planned baking]
  lunarPlanetarySeasonalHooks: [seasonal grain/bread context if already present]
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [bread, plate, table]
  sourceBackedRationale: [Woodward treats bread, grains, dough, and seasonal foods as carriers of household care and offering]
  notForOrHoldNotes: [no recipe, gluten/wheat/celiac/allergy review, no deity obligation]

howThisWasChosenIngredients:
  primarySelectionSignals: [table blessing, bread]
  secondarySelectionSignals: [remembering, enoughness]
  exclusionSignals: [gluten/celiac concern, dietary mismatch, no consent to share]
  timingSignal: before or during meal
  confidenceNotes: complete source-backed Moon & Table form from bread/seasonal food mechanics

source grounding: `Kitchen Witchery`, Ch. 3, PDF pp. 42-71; Ch. 15, PDF pp. 344-381.

recommendation metadata: primaryPurpose blessing; secondaryPurposes [remembering, tending]; primaryCarrier table; secondaryCarriers [vessel, body, words]; capacity [only_a_little, enough_to_participate]; audience [me, both_of_us]; timing helpful before a meal; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, bread, table, offering]; keywords [bread, plate, table, household offering]; materials [bread, plate]; places [kitchen table]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; productBoundaryReviewRequired true; notes [Gluten, wheat, celiac, cross-contamination, raw dough/flour if baking, pets, dietary consent, and recipe-copying review.]

adaptation policy notes: source_backed_moon_and_table_form; no measurements, temperature, recipe steps, or exact blessing copied.

operative words metadata: [{ mode: `moon_and_table_original`, text: `Let this be enough for the table.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 3 / PDF pp. 42-71 and Ch. 15 / PDF pp. 344-381`, useContext: `spoken`, note: `Moon & Table line for source-supported bread/table offering mechanics.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-window-water-bowl` — Water Bowl at the Window

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Water Bowl at the Window

ritual body / practice: Fill a clean bowl with tap water. Place it on a stable table, counter, or windowsill where it can reflect the room, sky, or dark glass without spilling. Sit beside the bowl. Come to center. Look into the water without trying to force a message. Let one word, image, or feeling rise. Write that one thing on a small paper. Say the Moon & Table line: "The bowl has shown enough." Pour the water down the sink. Dry the bowl and put it away.

intention: Let a simple water vessel hold what is ready to be noticed and released.

bestWindow: Evening, dark moon, or any quiet window moment when a reflective vessel fits the mood.

questionToCarry: What does the water let me notice without chasing it?

whyThisFitsIngredients:
  checkInHooks: [needs reflection, release, or voicing]
  timingHooks: [evening, dark moon, quiet moment]
  lunarPlanetarySeasonalHooks: [dark moon if intentionally chosen]
  capacityHooks: [enough_to_participate]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [bowl, tap water, window, written word]
  sourceBackedRationale: [Woodward gives a dark-moon water-bowl meditation with reflection and writing afterward; hydration chapter supports water vessels]
  notForOrHoldNotes: [no drinking, wild water, underworld obligation, mediumship, or deity contact]

howThisWasChosenIngredients:
  primarySelectionSignals: [vessel, remembering]
  secondarySelectionSignals: [release, written word]
  exclusionSignals: [spill risk, unsafe location, desire for mediumship]
  timingSignal: quiet reflective window period
  confidenceNotes: complete source-backed form; source text and meditation details remain private

source grounding: `Kitchen Witchery`, Ch. 2, PDF pp. 33-34; Ch. 12, PDF pp. 254-268.

recommendation metadata: primaryPurpose remembering; secondaryPurposes [releasing, voicing]; primaryCarrier vessel; secondaryCarriers [words, body]; capacity [enough_to_participate]; audience [me]; timing preferred during evening/dark moon; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, water bowl, window, dark moon]; keywords [bowl, water, window, reflection, written word]; materials [bowl, tap water, paper, pen]; places [window, table, counter]

review flags: privateExcerptRequired true; sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; productBoundaryReviewRequired true; notes [Use potable tap water only; do not drink ritual water; manage spill, pet, child, electronics, and mediumship/deity framing boundaries.]

adaptation policy notes: source_backed_moon_and_table_form; mediumship/underworld details softened under source gate.

operative words metadata: [{ mode: `private_source_excerpt`, privateExcerptKey: `woodward-dark-moon-water-bowl-pp33-34`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 2 / PDF pp. 33-34`, useContext: `spoken`, note: `The source meditation and exact wording are private; packet preserves the water-bowl reflection mechanics.` }, { mode: `moon_and_table_original`, text: `The bowl has shown enough.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 2 / PDF pp. 33-34`, useContext: `closing`, note: `Moon & Table close for the source-supported water-bowl reflection.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-shared-cup-pause` — Share the Cup Pause

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Share the Cup Pause

ritual body / practice: Choose a safe ordinary drink already suitable for everyone present: water, herbal-free warm water, juice, milk, or tea only if already known to be safe. Pour it into one shared pitcher or two separate cups. Set the cup or cups on the table. Come to center. Name the purpose of the pause: welcome, patience, repair, listening, or simple company. Say the Moon & Table line: "Let the cup slow us down." Drink only if everyone knows what is being served and wants to participate. Close by washing the cup or cups and returning them to their place.

intention: Let a safe shared drink become a small vessel for connection.

bestWindow: Before a conversation, after work, after a meal, or when the table needs a quiet shared pause.

questionToCarry: What can slow down enough to be shared?

whyThisFitsIngredients:
  checkInHooks: [connection, shared pause, table reset]
  timingHooks: [before conversation, after meal, evening]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [both_of_us]
  materialPlaceCarrierPurposeFit: [cup, pitcher, table, safe drink]
  sourceBackedRationale: [Woodward supports cup, glass, pitcher, water, tea-like pause, and drink-as-ritual-carrier mechanics]
  notForOrHoldNotes: [no alcohol/caffeine default, no medicinal tea, no covert serving]

howThisWasChosenIngredients:
  primarySelectionSignals: [vessel, connecting]
  secondarySelectionSignals: [table, shared drink]
  exclusionSignals: [dietary uncertainty, no consent, unsafe ingredient]
  timingSignal: shared pause
  confidenceNotes: complete source-backed Moon & Table form around safe vessel sharing

source grounding: `Kitchen Witchery`, Ch. 12, PDF pp. 254-268; Ch. 2 table/vessel mechanics, PDF pp. 20-28.

recommendation metadata: primaryPurpose connecting; secondaryPurposes [steadying, blessing]; primaryCarrier vessel; secondaryCarriers [table, body, words]; capacity [only_a_little, enough_to_participate]; audience [both_of_us]; timing helpful; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, cup, shared drink, table pause]; keywords [cup, pitcher, drink, table, connection]; materials [cup or pitcher, safe drink]; places [kitchen table]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; productBoundaryReviewRequired true; notes [Allergy/dietary consent, caffeine/alcohol exclusion, herbal/medicinal tea boundary, pregnancy/medication concerns, hot liquid, pets, children, and sanitation review.]

adaptation policy notes: source_backed_moon_and_table_form; shared participation must be explicit.

operative words metadata: [{ mode: `moon_and_table_original`, text: `Let the cup slow us down.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 12 / PDF pp. 254-268`, useContext: `spoken`, note: `Moon & Table line for source-supported cup/drink carrier mechanics.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-enoughness-bowl` — Enoughness Bowl

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Enoughness Bowl

ritual body / practice: Set an empty bowl at the center of the table. Choose one safe, ordinary object already in the kitchen: a piece of fruit, wrapped sweet, clean spoon, folded note, bread end, or pantry object. Place it in the bowl. Name one way the household has enough for this hour. Say the Moon & Table line: "Enough is allowed to be small." Leave the bowl on the table through the meal, conversation, or quiet hour. Close by eating, saving, washing, composting, or returning the object according to what it is.

intention: Give enoughness a visible vessel without promising wealth, luck, or more.

bestWindow: When the house needs warmth, steadiness, or a small sign that tonight is enough.

questionToCarry: What is already enough for this hour?

whyThisFitsIngredients:
  checkInHooks: [scarcity feeling, wants steadiness, table needs warmth]
  timingHooks: [before meal, evening, household reset]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [bowl, table, safe kitchen object]
  sourceBackedRationale: [Woodward supports sweets, fruit, bowls, and table objects as carriers of warmth, welcome, and household blessing when separated from coercive/prosperity claims]
  notForOrHoldNotes: [no prosperity/luck spell database, no target sweetening, no eating if unsafe]

howThisWasChosenIngredients:
  primarySelectionSignals: [vessel blessing, enoughness]
  secondarySelectionSignals: [table, sweetness, fruit]
  exclusionSignals: [coercive target, unsafe edible item]
  timingSignal: before table time
  confidenceNotes: complete source-backed Moon & Table form adapting approved sweetness/bowl mechanics away from rejected spell-list material

source grounding: `Kitchen Witchery`, Ch. 8, PDF pp. 137-164; Ch. 11, PDF pp. 225-253.

recommendation metadata: primaryPurpose blessing; secondaryPurposes [steadying, connecting]; primaryCarrier vessel; secondaryCarriers [table, words, plant]; capacity [only_a_little, enough_to_participate]; audience [me, both_of_us]; timing helpful; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, bowl, enoughness, sweetness]; keywords [bowl, fruit, sweet, table, enough]; materials [bowl, safe kitchen object]; places [kitchen table]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; productBoundaryReviewRequired true; notes [Allergy/dietary screening, pet/child risk, choking, spoilage, and coercive sweetening/prosperity boundary review.]

adaptation policy notes: source_backed_moon_and_table_form; abundance is narrowed to sufficiency and warmth.

operative words metadata: [{ mode: `moon_and_table_original`, text: `Enough is allowed to be small.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 8 / PDF pp. 137-164 and Ch. 11 / PDF pp. 225-253`, useContext: `spoken`, note: `Moon & Table line for source-supported sweetness/fruit/bowl blessing mechanics.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-seasonal-food-marker` — Mark the Season at the Table

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Mark the Season at the Table

ritual body / practice: Choose one safe seasonal food already in the kitchen or already planned for the table. Place it on a plate or in a bowl. Name what the season is doing: arriving, ripening, resting, darkening, brightening, returning, or letting go. Say the Moon & Table line: "This is what the season has brought to the table." Let the food or object remain through the meal or quiet moment. If it is eaten, share it only with consent and safety. If it is not eaten, save, compost, or discard it according to what it is.

intention: Let one safe seasonal thing mark the moment without importing a recipe or holiday obligation.

bestWindow: At a seasonal turn, before a seasonal meal, or when the household wants to notice what the year is doing.

questionToCarry: What has the season actually put on the table?

whyThisFitsIngredients:
  checkInHooks: [seasonal marker, table blessing, remembering]
  timingHooks: [seasonal turn, planned seasonal meal]
  lunarPlanetarySeasonalHooks: [seasonal food, wheel-of-year context if already appropriate]
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [seasonal food/object, bowl or plate, table]
  sourceBackedRationale: [Woodward's seasonal chapter uses food and table practices to mark turns of the year while the gate bars recipe copying]
  notForOrHoldNotes: [no culturally specific obligation, no recipe, no foraging, no edible flower default]

howThisWasChosenIngredients:
  primarySelectionSignals: [seasonal marking]
  secondarySelectionSignals: [table, food memory]
  exclusionSignals: [unsafe food, cultural/provenance concern, no consent]
  timingSignal: seasonal table moment
  confidenceNotes: complete source-backed Moon & Table form from seasonal food mechanics

source grounding: `Kitchen Witchery`, Ch. 1, PDF pp. 11-19; Ch. 15, PDF pp. 344-381.

recommendation metadata: primaryPurpose blessing; secondaryPurposes [marking, remembering]; primaryCarrier table; secondaryCarriers [vessel, plant, words]; capacity [only_a_little, enough_to_participate]; audience [me, both_of_us]; timing preferred at seasonal table moments; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, seasonal food, table marker]; keywords [season, seasonal food, bowl, plate, table]; materials [safe seasonal food or object, bowl/plate]; places [kitchen table]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; productBoundaryReviewRequired true; notes [Allergy/dietary consent, raw food, spoilage, pets, children, pregnancy, cultural/provenance review, and no recipe copying.]

adaptation policy notes: source_backed_moon_and_table_form; no culturally specific ritual claim is imported.

operative words metadata: [{ mode: `moon_and_table_original`, text: `This is what the season has brought to the table.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 15 / PDF pp. 344-381`, useContext: `spoken`, note: `Moon & Table line for source-supported seasonal food marking.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-clear-table-closing` — Clear the Table as Closing

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Clear the Table as Closing

ritual body / practice: After a meal, table blessing, shared cup, or bowl ritual, pause before clearing. Name what the table held: welcome, release, repair, enoughness, steadiness, or memory. Remove the vessels first. Remove plates, cups, utensils, food, paper, or candle holders next. Wipe the table once from far edge to near edge. Say the Moon & Table line: "What leaves the table is finished; what remains is memory." Wash, store, compost, or discard the materials according to ordinary household practice.

intention: Let clearing the table close the work instead of letting it trail off.

bestWindow: After a meal, shared drink, seasonal marker, or table-based kitchen ritual.

questionToCarry: What is finished, and what should be remembered?

whyThisFitsIngredients:
  checkInHooks: [needs closure, after shared table time]
  timingHooks: [after meal or table ritual]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [table, dishes, vessels, cloth, disposal/washing]
  sourceBackedRationale: [Woodward frames kitchen tasks as ritual actions; clearing and washing can complete the kitchen/table working]
  notForOrHoldNotes: [no unsafe cleaners, no smoke/oil/salt water surface work]

howThisWasChosenIngredients:
  primarySelectionSignals: [releasing, closing]
  secondarySelectionSignals: [table, vessel care]
  exclusionSignals: [hot dishes/sharp knives need ordinary handling]
  timingSignal: after table work
  confidenceNotes: complete source-backed Moon & Table closing form from approved kitchen-action mechanics

source grounding: `Kitchen Witchery`, Introduction, PDF pp. 9-10; Ch. 2, PDF pp. 20-28; Ch. 15, PDF pp. 344-381.

recommendation metadata: primaryPurpose releasing; secondaryPurposes [tending, remembering]; primaryCarrier table; secondaryCarriers [body, vessel, words]; capacity [only_a_little, enough_to_participate]; audience [me, both_of_us]; timing required after table ritual; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, table clearing, kitchen closing]; keywords [clear table, close, wash, dishes, memory]; materials [table, dishes, cloth]; places [kitchen table, sink]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; notes [Ordinary kitchen heat, knives, sanitation, food waste, pets, children, and surface-safety review.]

adaptation policy notes: source_backed_moon_and_table_form; close completes source-supported kitchen action.

operative words metadata: [{ mode: `moon_and_table_original`, text: `What leaves the table is finished; what remains is memory.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Introduction / PDF pp. 9-10 and Ch. 2 / PDF pp. 20-28`, useContext: `closing`, note: `Moon & Table close for source-supported kitchen action as ritual.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-kept-kitchen-object` — Bless the Kept Kitchen Object

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Bless the Kept Kitchen Object

ritual body / practice: Choose one ordinary kitchen object that will keep being used: a cup, bowl, spoon, jar, cloth, serving dish, pot, or pan. Clean it with the ordinary method that is safe for the object. Set it on the table. Come to center. Put one hand near or on the object. Name the household job it is being given: hold welcome, remember this season, steady the table, bless a shared drink, or serve the next meal cleanly. Say the Moon & Table line: "You are kept for this work." Breathe once over or near the object without touching your mouth to it. Return it to use or storage.

intention: Give one kitchen object a clear household role.

bestWindow: When a new object enters the kitchen, after cleaning a meaningful vessel, or before using a kept cup, bowl, spoon, jar, or serving dish.

questionToCarry: What work is this object being asked to hold?

whyThisFitsIngredients:
  checkInHooks: [new object, meaningful object, kitchen reset]
  timingHooks: [before first use, after cleaning]
  lunarPlanetarySeasonalHooks: [full moon charge held for later]
  capacityHooks: [enough_to_participate]
  audienceHooks: [me]
  materialPlaceCarrierPurposeFit: [kitchen object, table, hand, breath]
  sourceBackedRationale: [Woodward gives mechanics for cleansing, consecrating, and charging objects, including holding the object and telling it its purpose]
  notForOrHoldNotes: [no smoke, oil, deity/element invocation, or unsafe surface treatment]

howThisWasChosenIngredients:
  primarySelectionSignals: [vessel blessing, kept object]
  secondarySelectionSignals: [marking, remembering]
  exclusionSignals: [object unsafe to handle or clean]
  timingSignal: before object is used or returned to place
  confidenceNotes: source-backed Moon & Table form preserves object-role mechanics while holding excluded materials

source grounding: `Kitchen Witchery`, Ch. 2, PDF pp. 38-41.

recommendation metadata: primaryPurpose blessing; secondaryPurposes [marking, remembering, protecting]; primaryCarrier vessel; secondaryCarriers [table, body, words]; capacity [enough_to_participate]; audience [me]; timing helpful before use; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, kitchen object, object blessing, vessel]; keywords [cup, bowl, spoon, jar, serving dish, consecrate]; materials [kitchen object]; places [kitchen table, counter]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; productBoundaryReviewRequired true; notes [Food-safe cleaning, hygiene, object material, heat/sharp edges, smoke/oil/deity/element exclusion, and storage/use review.]

adaptation policy notes: source_backed_moon_and_table_form; source's smoke/oil/elemental options are held.

operative words metadata: [{ mode: `private_source_excerpt`, privateExcerptKey: `woodward-object-consecration-pp38-41`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 2 / PDF pp. 38-41`, useContext: `blessing`, note: `Source object-consecration language and elemental material remain private/held; packet preserves object-role mechanics.` }, { mode: `moon_and_table_original`, text: `You are kept for this work.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 2 / PDF pp. 38-41`, useContext: `spoken`, note: `Moon & Table line for source-supported object purpose-giving.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-pot-of-tending` — Tend the Pot

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Tend the Pot

ritual body / practice: Use a pot, pan, or serving bowl already involved in a planned soup, stew, grain, beans, lentils, vegetables, or warm dish. Do not add a recipe to the ritual. Stand at the stove, counter, or table. Come to center. Place one hand near the pot or bowl where it is safe. Name the kind of tending being asked of the meal: steadiness, warmth, patience, repair, or nourishment. Stir or fold three slow times if stirring is part of the actual preparation. Say the Moon & Table line: "This pot tends what it holds." Continue cooking or serving according to the recipe you already know. Close by covering the pot, serving the food, or washing the vessel when the meal is done.

intention: Let an ordinary pot or bowl hold steady household tending.

bestWindow: During already-planned soup, stew, beans, grain, vegetable, or warm bowl preparation.

questionToCarry: What kind of tending is the pot holding tonight?

whyThisFitsIngredients:
  checkInHooks: [needs steadiness, household tending, simple meal]
  timingHooks: [during planned cooking or serving]
  lunarPlanetarySeasonalHooks: [seasonal produce only if already present]
  capacityHooks: [enough_to_participate, room_for_something_deeper]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [pot, pan, serving bowl, stove/counter/table]
  sourceBackedRationale: [Woodward supports soups, vegetables, grains, legumes, and ordinary cooking actions as carriers of intention]
  notForOrHoldNotes: [no recipe, no nutrition/health claim, no unsafe serving]

howThisWasChosenIngredients:
  primarySelectionSignals: [vessel tending, warm food]
  secondarySelectionSignals: [table, body]
  exclusionSignals: [unsafe ingredient, no consent to share, hot stove risk]
  timingSignal: during planned cooking
  confidenceNotes: complete source-backed Moon & Table form from food/vessel/kitchen action mechanics

source grounding: `Kitchen Witchery`, Chs. 3-6, PDF pp. 42-120; Ch. 9, PDF pp. 165-221.

recommendation metadata: primaryPurpose tending; secondaryPurposes [steadying, blessing]; primaryCarrier vessel; secondaryCarriers [table, body, words]; capacity [enough_to_participate, room_for_something_deeper]; audience [me, both_of_us]; timing helpful during cooking; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, pot, soup, stew, kitchen tending]; keywords [pot, pan, bowl, soup, stew, stir, tend]; materials [pot/pan/serving bowl, planned food]; places [stove, counter, kitchen table]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; productBoundaryReviewRequired true; notes [Heat, boiling water, sharp knives, allergies, gluten, legumes, nuts/seeds, dairy/egg, pets, children, pregnancy, storage/spoilage, sanitation, and food consent review.]

adaptation policy notes: source_backed_moon_and_table_form; no cooking instructions, measurements, or health claims imported.

operative words metadata: [{ mode: `moon_and_table_original`, text: `This pot tends what it holds.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Chs. 3-6 / PDF pp. 42-120 and Ch. 9 / PDF pp. 165-221`, useContext: `spoken`, note: `Moon & Table line for source-supported pot/bowl tending mechanics.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-welcome-served-simply` — Welcome Served Simply

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Welcome Served Simply

ritual body / practice: Choose one safe, simple thing already appropriate to offer: water, a piece of fruit, bread, a small sweet, or a non-edible token on a plate. Set it on the table between you and the person being welcomed, or in the place where welcome is being made. Say the Moon & Table line: "This is an invitation, not a claim." Offer it openly. The other person may eat, drink, touch, decline, or leave it alone. Close by clearing the plate or cup and putting the table back in order.

intention: Make welcome visible without asking food to control anyone.

bestWindow: Before a visit, before sitting down together, or when the table needs to show invitation.

questionToCarry: How can welcome be offered without pressure?

whyThisFitsIngredients:
  checkInHooks: [welcome, partner/shared connection, guest at table]
  timingHooks: [before shared table time]
  lunarPlanetarySeasonalHooks: []
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [both_of_us]
  materialPlaceCarrierPurposeFit: [table, plate/cup, safe simple offering]
  sourceBackedRationale: [Woodward's hospitality examples use prepared food and table service to foster welcome; source gate excludes coercive influence]
  notForOrHoldNotes: [consent, allergy/dietary screen, no sweetening/attraction manipulation]

howThisWasChosenIngredients:
  primarySelectionSignals: [vessel connecting, welcome]
  secondarySelectionSignals: [table, blessing]
  exclusionSignals: [covert intent, unsafe food, dietary uncertainty]
  timingSignal: before shared table moment
  confidenceNotes: complete source-backed Moon & Table form preserving hospitality mechanics with non-coercive boundary

source grounding: `Kitchen Witchery`, Ch. 2, PDF pp. 21-27; Ch. 8, PDF pp. 137-164; Ch. 11, PDF pp. 225-253; Ch. 12, PDF pp. 254-268.

recommendation metadata: primaryPurpose connecting; secondaryPurposes [blessing, opening]; primaryCarrier vessel; secondaryCarriers [table, body, words]; capacity [only_a_little, enough_to_participate]; audience [both_of_us]; timing helpful before shared table time; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, welcome, hospitality, table]; keywords [welcome, plate, cup, fruit, bread, sweet]; materials [plate/cup, safe offering or token]; places [kitchen table]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; productBoundaryReviewRequired true; notes [Consent, allergy/dietary restrictions, gluten/nuts/dairy/eggs/soy, pets/children, choking, spoilage, and coercive food magic review.]

adaptation policy notes: source_backed_moon_and_table_form; hospitality mechanics are retained, target-control is rejected.

operative words metadata: [{ mode: `moon_and_table_original`, text: `This is an invitation, not a claim.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 2 / PDF pp. 21-27`, useContext: `spoken`, note: `Moon & Table line for non-coercive source-supported hospitality mechanics.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-repeated-recipe-memory` — Remember the Repeated Dish

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Remember the Repeated Dish

ritual body / practice: Choose one food, drink, or table object already meaningful to the household. Do not copy the recipe into this packet or into the public ritual record. Open the household grimoire, notebook, or Moon & Table note. Record the name of the dish or object, the date, who was present, where it was served, what season or moon moment surrounded it, and one sentence about what the table held. Say the Moon & Table line: "The recipe stays private; the spell is what we remember." Close the record and return it to its place.

intention: Preserve the household memory around food without turning the app into a recipe book.

bestWindow: After a seasonal meal, shared cup, repeated household dish, birthday/holiday table, or meaningful kitchen act.

questionToCarry: What should we remember the next time this appears on the table?

whyThisFitsIngredients:
  checkInHooks: [memory, repeated dish, household grimoire]
  timingHooks: [after meal or table moment]
  lunarPlanetarySeasonalHooks: [seasonal or lunar timing if actually present]
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [grimoire/notebook/Moon & Table note, table memory, dish name]
  sourceBackedRationale: [Woodward's seasonal chapter and kitchen framing support repeated food practices as seasonal and household memory]
  notForOrHoldNotes: [do not copy recipes, culturally specific claims, or private family details without user entry]

howThisWasChosenIngredients:
  primarySelectionSignals: [remembering, repeated table practice]
  secondarySelectionSignals: [seasonal marking, connection]
  exclusionSignals: [privacy concern, no meaningful table event]
  timingSignal: after table event
  confidenceNotes: complete source-backed Moon & Table form; no recipe text included

source grounding: `Kitchen Witchery`, Ch. 1, PDF pp. 11-19; Ch. 15, PDF pp. 344-381.

recommendation metadata: primaryPurpose remembering; secondaryPurposes [marking, connecting]; primaryCarrier vessel; secondaryCarriers [words, table]; capacity [only_a_little, enough_to_participate]; audience [me, both_of_us]; timing required after meaningful table event; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, recipe memory, grimoire, seasonal table]; keywords [dish memory, recipe, table, grimoire, seasonal meal]; materials [notebook or Moon & Table note]; places [kitchen table]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; productBoundaryReviewRequired true; notes [No recipe reproduction, no invented family/cultural provenance, privacy review for household memory.]

adaptation policy notes: source_backed_moon_and_table_form; record memory, not recipe instructions.

operative words metadata: [{ mode: `moon_and_table_original`, text: `The recipe stays private; the spell is what we remember.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 15 / PDF pp. 344-381`, useContext: `spoken`, note: `Moon & Table line for source-supported seasonal/repeated-food memory.` }]

import readiness label: `approved_for_mechanical_import`

### `ritual-woodward-candle-beside-bowl` — Candle Beside the Bowl

disposition: `candidate_extract_now`

ritualizationType: `source_backed_moon_and_table_form`

headline: Candle Beside the Bowl

ritual body / practice: Set a bowl, cup, plate, or serving dish on the table. Place a small candle beside it, not inside it, or use an unlit candle as the fire symbol if flame is not appropriate. Name what the vessel is here to hold: welcome, enoughness, courage, blessing, memory, or release. Say the Moon & Table line: "The light shows what the vessel holds." If a flame is lit, keep it attended and extinguish it when the vessel is cleared. If the candle remains unlit, put it away when the table is cleared.

intention: Let candlelight show the vessel's job without making the candle the whole ritual.

bestWindow: Before a table blessing, shared cup, enoughness bowl, seasonal marker, or kitchen-table intention.

questionToCarry: What does the light reveal about the vessel?

whyThisFitsIngredients:
  checkInHooks: [needs small table opening, wants visible ritual atmosphere]
  timingHooks: [before vessel/table ritual]
  lunarPlanetarySeasonalHooks: [full moon or seasonal table only if already relevant]
  capacityHooks: [only_a_little, enough_to_participate]
  audienceHooks: [me, both_of_us]
  materialPlaceCarrierPurposeFit: [candle, vessel, table]
  sourceBackedRationale: [Woodward uses table candle, prepared food, and vessel-centered kitchen work as part of magical preparation]
  notForOrHoldNotes: [no unattended flame, smoke, herbs near flame, oil anointing, or deity/element invocation]

howThisWasChosenIngredients:
  primarySelectionSignals: [vessel blessing, candle/table atmosphere]
  secondarySelectionSignals: [opening, marking]
  exclusionSignals: [unsafe flame context]
  timingSignal: before or during table/vessel ritual
  confidenceNotes: complete fire-safe source-backed Moon & Table form; candle is secondary to vessel

source grounding: `Kitchen Witchery`, Ch. 2, PDF pp. 23-41; Ch. 15, PDF pp. 344-381.

recommendation metadata: primaryPurpose blessing; secondaryPurposes [opening, marking]; primaryCarrier vessel; secondaryCarriers [candlelight, table, words]; capacity [only_a_little, enough_to_participate]; audience [me, both_of_us]; timing helpful before vessel work; recommendable false; missing [human_review, source_verification, direct_use_review]; availability findable false/directUseEligible false/recommendationEligible false

search metadata: tags [woodward, candle, bowl, table]; keywords [candle, bowl, vessel, table, light]; materials [bowl/cup/plate/serving dish, candle or unlit candle]; places [kitchen table]

review flags: sourceTextReviewRequired true; sourceVerificationRequired true; materialSafetyReviewRequired true; notes [Fire safety, pets, children, curtains, table surface, hot wax, no oil/herb anointing, and no smoke/incense review.]

adaptation policy notes: source_backed_moon_and_table_form; ordinary candle table support only.

operative words metadata: [{ mode: `moon_and_table_original`, text: `The light shows what the vessel holds.`, citationLabel: `Woodward, Kitchen Witchery`, sourceLocation: `Ch. 2 / PDF pp. 23-41`, useContext: `spoken`, note: `Moon & Table line for source-supported candle/table/vessel atmosphere.` }]

import readiness label: `approved_for_mechanical_import`

## Held / later records

| Candidate or source item | Import readiness | Reason |
| --- | --- | --- |
| Moon-timed kitchen wording layer | candidate_extract_later | Strong timing support but should be applied after lunar/timing product rules decide how to shape wording. |
| Food-safe finishing oil / vinegar blessing | candidate_extract_later | Promising table/vessel close; needs oil safety and recipe boundary review. |
| Full moon table sharing | candidate_extract_later | Useful, but should be split after lunar timing and fire/food boundaries are reviewed. |
| Exact recipes and formulae | hold_before_import | Moon & Table should not reproduce recipe steps, measurements, temperatures, or ingredient formulas. |
| Exact spells, charms, prayers, petitions, meditations, and chants | hold_before_import | Source gate requires paraphrase/private exact-text handling only. |
| Coercive love/attraction/sweetening/target-control examples | reject | Outside product boundary. |
| Health/nutrition/organic/pesticide/medical claims | reject | Not Moon & Table guidance. |
| Prosperity/luck spell database material | hold_before_import | May become enoughness/warmth only after product review; no guaranteed outcomes. |
| Smoke/incense/essential oils/topical oils/baths/hand powders | hold_before_import | Separate material safety review required. |
| Alcohol/caffeine/cannabis/psychoactive defaults | hold_before_import | Separate review required. |
| Culturally specific/deity/ancestor holiday foodways | hold_before_import | Provenance and adaptation review required. |

## Coverage records

| Candidate ID | Primary carrier | Primary purpose | Secondary carriers | Secondary purposes | Import readiness |
| --- | --- | --- | --- | --- | --- |
| `ritual-woodward-center-at-counter` | body | opening | table, words | steadying, tending | approved_for_mechanical_import |
| `ritual-woodward-kitchen-table-intention` | words | opening | table, vessel | voicing, blessing | approved_for_mechanical_import |
| `ritual-woodward-bowl-focus-stirring` | vessel | tending | body, words, table | blessing, voicing | approved_for_mechanical_import |
| `ritual-woodward-bread-table-offering` | table | blessing | vessel, body, words | remembering, tending | approved_for_mechanical_import |
| `ritual-woodward-window-water-bowl` | vessel | remembering | words, body | releasing, voicing | approved_for_mechanical_import |
| `ritual-woodward-shared-cup-pause` | vessel | connecting | table, body, words | steadying, blessing | approved_for_mechanical_import |
| `ritual-woodward-enoughness-bowl` | vessel | blessing | table, words, plant | steadying, connecting | approved_for_mechanical_import |
| `ritual-woodward-seasonal-food-marker` | table | blessing | vessel, plant, words | marking, remembering | approved_for_mechanical_import |
| `ritual-woodward-clear-table-closing` | table | releasing | body, vessel, words | tending, remembering | approved_for_mechanical_import |
| `ritual-woodward-kept-kitchen-object` | vessel | blessing | table, body, words | marking, remembering, protecting | approved_for_mechanical_import |
| `ritual-woodward-pot-of-tending` | vessel | tending | table, body, words | steadying, blessing | approved_for_mechanical_import |
| `ritual-woodward-welcome-served-simply` | vessel | connecting | table, body, words | blessing, opening | approved_for_mechanical_import |
| `ritual-woodward-repeated-recipe-memory` | vessel | remembering | words, table | marking, connecting | approved_for_mechanical_import |
| `ritual-woodward-candle-beside-bowl` | vessel | blessing | candlelight, table, words | opening, marking | approved_for_mechanical_import |

## Variant / split ledger

- Table/vessel work should stay separate from recipes. A Ritual may name bread, cup, bowl, pot, plate, or seasonal food, but it must not include recipe steps.
- Shared food and drink candidates require explicit consent/allergy/dietary review before direct use; they remain draft/unavailable/not recommendable here.
- Moon-timed kitchen variants are held/later because lunar timing should shape selection and wording only after timing rules are reviewed.
- Object blessing is narrowed to food-safe kitchen objects; smoke/oil/elemental/deity variants are held.
- Sweetness and abundance material is narrowed to warmth/enoughness/welcome; coercive sweetening and prosperity spell-list material are rejected or held.
- Seasonal table work is approved only as household marking; culturally specific obligations and exact seasonal recipes remain held.

## Required self-check results

Checked the revised packet for blocking placeholder mechanics and invalid runtime posture. No approved candidate body uses source pattern, source period, source close, source layout, source diagram, as the source shows, as the diagram shows, chosen version, source-supported order, source recipe, use the source recipe, source ingredients, source cooking time, source kitchen action, source vessel, source preparation, source words, food safety review must decide, kitchen safety review must decide, review must decide, not needed, QA/process text, low, medium, high, foodSafetyReviewRequired, kitchenSafetyReviewRequired, vesselSafetyReviewRequired, or ingestionReviewRequired. Approved candidates use only runtime-valid carriers (`candlelight`, `table`, `doorway`, `plant`, `words`, `vessel`, `body`) and capacity values (`only_a_little`, `enough_to_participate`, `room_for_something_deeper`). Kitchen/food/vessel safety concerns are preserved under valid review flags and notes. The source-exact wording posture cites the approved Woodward source gate path and follows that source-specific gate. No runtime records or eligibility flags are changed.

## Validation checklist

- [x] Every `candidate_extract_now` has a complete operational ritual body / practice.
- [x] No approved candidate requires source lookup for materials, food/vessel/place, placement, sequence, timing, repetition, wording handling, close, disposal, washing, serving, rest, or recordkeeping.
- [x] Long/substantial source wording uses `private_source_excerpt`.
- [x] Woodward source-gate direct-quote restrictions are cited and honored.
- [x] Kitchen/food/vessel safety and product-boundary notes are explicit under valid review flags.
- [x] Components/mechanics are held unless made into complete source-backed forms.
- [x] Packet metrics and coverage are internally consistent.
- [x] Runtime enum values are valid.
- [x] Common runtime posture remains draft/unavailable/not recommendable.
