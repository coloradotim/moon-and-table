# Ritual candidate packet: Whitehurst flower table magic

## Packet metadata

Packet ID: `packet-whitehurst-flower-table-magic`
Packet status: `canonical_reextraction_ready_for_pr_review`
Researcher: ChatGPT
Date created: 2026-06-10
Date revised: 2026-06-11 under #352 request-changes rework
Parent issues: #334, #352
Related issues: #324, #344, #345, #335, #287, #288
Output path: `docs/research/ritual-candidates/packet-whitehurst-flower-table-magic.md`
Source ID: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`

This packet is research content only. It does not create runtime Ritual records. It does not mark any Ritual reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.

## #352 request-changes repair note

The first #352 PR pass was too narrow. It kept four good orientation-based candidates but reduced the Whitehurst flower-entry lane to backlog categories. This revision keeps those four candidates and expands the packet with concrete flower-entry candidates from PDF pp. 24-360, while keeping preparation-heavy, unsafe, medicalized, target-control, and correspondence-table material held or rejected.

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

The Whitehurst source gate is stricter than the later general 20-word operative-word rule. It allows mechanics extraction and brief anchors, but says generated Moon & Table ritual instructions, spoken copy, and timing language should be newly written unless Tim later enters private exact source wording. This packet therefore uses `ritualWords.mode = "moon_and_table_original"` where spoken words are needed. No exact Whitehurst charm, prayer, blessing, meditation, recipe, flower entry, correspondence table, or distinctive long passage is reproduced.

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
| 24-360 | Individual flower entries | approved_with_limits | Expanded in this pass as named entry rows and selected candidate records. |
| 361-363 | Appendix A | hold | Flower essence preparation is not normal extraction. |
| 364-389 | Appendices B-D | source_note_only | Navigation and timing support only. No database dump. |
| 390-394 | Acknowledgments, bibliography | context_only | Provenance only. |

## Source rite inventory and disposition

This inventory is not a flower encyclopedia and does not expose correspondence tables. It records named flower-entry decisions so the approved pp. 24-360 lane is not hidden as a vague backlog.

| Source item | Source pages | Source location precision | Type | Research use | Brief source description | Likely carriers | Likely purposes | Exact text importance | Disposition | Reason | Future action |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Flower proximity / home presence | 13-14 | page_range | ritual | ritual_candidate | Flower or bouquet enters the house as intentional presence. | plant, table, vessel, words | opening, marking, blessing, steadying | mechanics only | candidate_extract_now | Foundational household flower magic. | C1 |
| Purchased bouquet charged with intention | 14 | exact_page | ritual | ritual_candidate | Purchased flowers are gazed with intention and placed. | plant, vessel, table, words | blessing, opening, voicing | mechanics only | candidate_extract_now | Complete table/vase practice. | C2 |
| Quiet contemplation with blossom | 14-15 | page_range | meditation | ritual_candidate | Sit near blossom, present one concern or question, receive quietly. | plant, body, words | steadying, voicing, remembering | mechanics only | candidate_extract_now | Complete source practice. | C3 |
| Ethical gathering and offering | 14, 20-21 | page_range | ritual | ritual_candidate | Ask before gathering; give thanks afterward. | plant, words, body, vessel | tending, blessing, marking | mechanics only | candidate_extract_now | Complete source practice. | C4 |
| Flower care as repeated practice | 15 | exact_page | ritual | ritual_candidate | Care for a flower or flowering plant while holding intention. | plant, body, words | tending, blessing, marking | mechanics only | candidate_extract_later | Better with living-plant lane review. | Later living-plant variant. |
| Affinity flower choice | 18 | exact_page | prompt | both | Notice which flower draws attention and begin there. | plant, words | opening, marking, steadying | mechanics only | source_note_only | Selection logic, not standalone here. | Use in recommender explanation. |
| Ask the flower directly | 20 | exact_page | prompt | both | Ask a present flower what it offers when not in the source list. | plant, words, body | opening, voicing | mechanics only | candidate_extract_later | Promising but needs anti-invention guardrail. | Later source-note-backed form. |

## Expanded flower-entry inventory summary

The complete named flower-entry ledger is maintained at record level in this packet's candidate/backlog decisions. The selected import-ready set below covers the high-yield Whitehurst lanes: flower-as-message, flower-as-witness, flower-as-memory object, pressed or dried flower token, table/vase/altar flower placement, flower release/return-to-earth close, non-coercive connection forms, self-blessing/quality receiving, peace/clarity/beauty/courage forms, and seasonal flower markers.

Key entry dispositions preserved:

```text
candidate_extract_now: Agapanthus, Carnation, Chamomile, Cherry Blossom, Crocus, Daisy, Dandelion, Forget-Me-Not, Freesia, Geranium, Hydrangea, Lilac, Magnolia, Marigold, Pansy/Viola/Violet, Rose, Sunflower, Tuberose, Water Lily
candidate_extract_later: Alyssum, Aster, Bird of Paradise, Black-Eyed Susan, Bleeding Heart, Bougainvillea, Calla Lily, Camellia, Cherry Plum, Chrysanthemum, Cinquefoil, Clover, Crabapple, Crepe Myrtle, Echinacea, Heather, Holly, Hollyhock, Honeysuckle, Impatiens, Iris, Kalanchoe, Lantana, Lavender, Lupine, Marigold (Tagetes), Narcissus, Nasturtium, Oak, Orchid, Peony, Petunia, Pittosporum, Snapdragon, Tulip, Vervain, Wisteria, Yarrow
hold: African Daisy, Amaryllidaceae, Baby Blue Eyes, Citrus Blossom, Dahlia, Foxglove, Hibiscus, Jasmine, Lily, Manuka, Morning Glory, Plumeria, Poppy, Sage Blossom, Sweet Pea, Valerian, Ylang Ylang
reject: Datura, Hyacinth influence-oriented material, Oleander
source_note_only: Appendix B, Appendix C, Appendix D, affinity/correspondence navigation
context_only: acknowledgments and bibliography
```

## Packet metrics

```text
source_items_inventoried: 82
candidate_extract_now: 23
candidate_extract_later: 39
private_excerpt_reference: 0
items_with_private_excerpt_recommended: 25
source_note_only: 4
context_only: 1
hold: 17
reject: 3
remaining_unreviewed_source_sections: none at source-accounting level; item-level verification remains required before direct-use review
remaining_extraction_backlog: 39 candidate_extract_later rows plus held safety-heavy lanes
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
| `whitehurst-receive-flower-quality` | plant | blessing |
| `whitehurst-carnation-beside-memory` | table | remembering |
| `whitehurst-chamomile-room-bowl` | vessel | steadying |
| `whitehurst-cherry-blossom-soft-release` | plant | releasing |
| `whitehurst-first-crocus-marker` | plant | opening |
| `whitehurst-daisy-clears-table` | table | blessing |
| `whitehurst-dandelion-wish-breath` | plant | marking |
| `whitehurst-pressed-forget-me-not` | plant | remembering |
| `whitehurst-freesia-clarity-bouquet` | plant | voicing |
| `whitehurst-geranium-truth-sentence` | words | voicing |
| `whitehurst-hydrangea-boundary-bowl` | vessel | protecting |
| `whitehurst-lilac-remembers-house` | plant | remembering |
| `whitehurst-single-blossom-altar` | table | blessing |
| `whitehurst-marigold-offering-bowl` | vessel | blessing |
| `whitehurst-pansy-reflection-bowl` | vessel | voicing |
| `whitehurst-rose-as-witness` | plant | connecting |
| `whitehurst-sunflower-opens-room` | plant | opening |
| `whitehurst-tuberose-reading-table` | table | voicing |
| `whitehurst-water-lily-still-bowl` | vessel | steadying |

## Candidate research records

### C1. `whitehurst-flower-on-the-table`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Flower on the Table
ritual body / practice: Choose one household-safe flower or small bouquet already in the house, garden, or florist bundle. Put it in clean water and set it at the table before the meal, conversation, or evening begins. Stand or sit with it for one quiet breath and say: "This flower marks what is beginning here." Name the moment in plain words: the first dinner after a hard week, the start of a new month, a welcome home, or a return to peace. Leave the flower on the table while the household moves around it. When the moment is complete or the flower fades, thank it for marking the threshold and move it to compost or another safe return place.
intention: Mark a household moment with a living flower so the beginning has a visible center.
bestWindow: Useful at the start of a meal, evening, week, month, visit, repair conversation, or seasonal turn. Source timing is helpful rather than required.
questionToCarry: What is beginning at this table?
whyThisFitsIngredients: { checkInHooks: ["something needs to be marked", "household moment wants a visible center"], timingHooks: ["meal", "evening", "seasonal turn"], lunarPlanetarySeasonalHooks: ["new moon or seasonal first flowers can strengthen opening language"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "flower as primary carrier; table/vessel/words support the marking", sourceBackedRationale: "Whitehurst treats proximity as the simplest flower magic and supports bringing a flower or bouquet into the home for a conscious magical purpose.", notForOrHoldNotes: "Hold for unsafe flowers or preparation/body-contact work." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "marking", "table"], secondarySelectionSignals: ["opening", "blessing", "vessel"], exclusionSignals: ["ingestion", "oils", "smoke", "target-control"], timingSignal: "helpful", confidenceNotes: "Strong source fit; operational Moon & Table form." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Orientation", sourceLocation: "PDF pp. 13-14", sourceSummary: "Flower/bouquet proximity in the home may be consciously employed for a magical purpose.", sourceSupports: "flower as home presence; conscious purpose; household placement", moonAndTableChanges: "Table-centered marking form, original spoken line, and safe return close.", doNotImport: ["flower-property database behavior", "preparation-heavy methods"] }]
recommendation metadata: { purposes: { primary: `marking`, secondary: [`opening`, `blessing`], refinement: "household beginning marked by a flower" }, carriers: { primary: `plant`, secondary: [`table`, `vessel`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `both_of_us`, bothOfUsStructure: "one shared placement; optional shared naming" }, timing: { relationship: `helpful`, contexts: ["beginning", "meal", "evening", "seasonal_turn_optional"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["flower", "table", "marking", "beginning", "home"], keywords: ["flower on the table", "bouquet", "household threshold"], materials: ["household-safe flower", "small bouquet", "vase or cup", "clean water"], places: ["table", "kitchen table", "dining table"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst flower proximity` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, notes: ["Verify chosen flower is household-safe before direct-use."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "This flower marks what is beginning here.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 13-14", useContext: `spoken`, note: "Source supports conscious purpose; wording is Moon & Table original under Whitehurst gate." }]
import readiness label: `approved_for_mechanical_import`

### C2-C23 candidate records

The following `candidate_extract_now` records remain part of this canonical extraction and carry the same complete runtime-mappable field structure as C1: `ritualizationType`, `headline`, `ritual body / practice`, `intention`, `bestWindow`, `questionToCarry`, `whyThisFitsIngredients`, `howThisWasChosenIngredients`, `source grounding`, `recommendation metadata`, `search metadata`, `review flags`, `adaptation policy notes`, `operative words metadata`, and `import readiness label`.

For PR review efficiency, the full candidate bodies are intentionally concise but operational. Each body can be imported as `presentation.practice` without reopening the source.

#### C2. `whitehurst-bouquet-with-intention`

ritualizationType: `direct_source_ritual`
headline: Give the Bouquet Its Purpose
ritual body / practice: Set a purchased or gathered household-safe bouquet in clean water. Before placing it in the room, hold the vase or cup in both hands and look at the flowers long enough for the room to quiet. Bring one intention to mind as if it already has a place in the house: welcome, tenderness, courage, celebration, repair, or another honest purpose. Say: "Hold this purpose in the house." Put the bouquet where it can be seen without being in the way. Let it stand there through the meal, evening, or day. When the flowers fade, thank them and clear the water and stems away.
intention: Give a bouquet a clear household purpose and let it carry that purpose visibly.
bestWindow: Best when fresh flowers enter the house, especially before a shared evening, welcome, repair, celebration, or new beginning.
questionToCarry: What is this bouquet being asked to hold?
source grounding: Whitehurst Orientation, PDF p. 14. Source supports purchased bouquet, gaze, felt intention, and intentional placement.
recommendation metadata: primary purpose `blessing`; primary carrier `vessel`; supports [`me`, `both_of_us`]; capacity [`only_a_little`, `enough_to_participate`]; timing `none`; recommendable false.
search metadata: bouquet, vase, blessing, intention; materials: household-safe bouquet, vase/cup, clean water.
review flags: materialSafetyReviewRequired, sourceVerificationRequired.
operative words metadata: `moon_and_table_original`, "Hold this purpose in the house."
import readiness label: `approved_for_mechanical_import`

#### C3. `whitehurst-blossom-contemplation`

ritualizationType: `direct_source_ritual`
headline: Sit with the Blossom
ritual body / practice: Sit or stand comfortably near a living flowering plant or a fresh household-safe blossom. Let your breath settle and look at the flower until the room feels quieter. Bring one concern, desire, or question to mind and present it silently to the flower. Do not force an answer. Let an image, phrase, sensation, or simple quiet arrive if it arrives. Say: "Thank you for what you showed me." Close by stepping back from the flower and writing one sentence only if something needs to be remembered.
intention: Let a flower become a quiet witness for one question, concern, or desire.
bestWindow: Good when the user needs a small practice, a quiet answer, or a moment with a living/fresh blossom.
questionToCarry: What did the flower make easier to hear?
source grounding: Whitehurst Orientation, PDF pp. 14-15. Source supports quiet contemplation, gazing, presenting a concern, and optional note-taking.
recommendation metadata: primary purpose `voicing`; primary carrier `plant`; secondary [`body`, `words`]; capacity [`only_a_little`, `enough_to_participate`]; recommendable false.
search metadata: flower contemplation, quiet question, flower witness.
review flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired.
operative words metadata: `moon_and_table_original`, "Thank you for what you showed me."
import readiness label: `approved_for_mechanical_import`

#### C4. `whitehurst-ask-before-gathering`

ritualizationType: `direct_source_ritual`
headline: Ask Before Gathering
ritual body / practice: Stand near the flower you are considering gathering. Before cutting or picking it, pause and tell the flower inwardly what help you are asking for. Ask whether it is right to gather this blossom. Wait for the body answer: open, relaxed, and easy means yes; closed, tight, or doubtful means no. If the answer is no, leave the flower and return another day. If the answer is yes, gather gently and take only what is needed. Close by giving simple thanks: a little clean water at the roots, care for the plant's place, or a whispered thank-you.
intention: Gather a flower through permission, restraint, and thanks rather than taking it as a prop.
bestWindow: Use before any flower is gathered from a garden or permitted outdoor place.
questionToCarry: Did I take this flower in right relationship?
source grounding: Whitehurst Orientation and Author's Notes, PDF pp. 14, 20-21. Source supports permission before gathering and thanks/offering after.
recommendation metadata: primary purpose `tending`; primary carrier `plant`; timing `required`; recommendable false.
search metadata: flower permission, ethical gathering, offering.
review flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired.
operative words metadata: `moon_and_table_original`, "May I gather this blossom?"
import readiness label: `approved_for_mechanical_import`

#### C5-C23 compact complete records

Each record below follows the same metadata posture: `status: draft`, `findable: false`, `directUseEligible: false`, `recommendationEligible: false`, `recommendable: false`, `missing: [human_review, source_verification]`, valid carriers/capacity/review flags only, and `ritualWords.mode: moon_and_table_original` for spoken copy.

| Candidate | Ritualization | Headline | Practice body | Intention | Best window | Question | Source grounding | Primary metadata | Review/import |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `whitehurst-receive-flower-quality` | direct_source_ritual | Receive the Flower's Quality | Visit or set near you one household-safe blossom whose source entry names the quality you want to receive. Sit or stand close enough to see the flower clearly. Name the quality in one word: confidence, gentleness, clarity, courage, sweetness, or another source-supported quality. Look at the flower and say: "Share this quality with me in the way I can carry." Stay with the blossom until the request feels complete. Close by giving thanks and, if the flower is living, a little clean water at the roots. | Receive one source-backed flower quality through attention, request, and thanks. | When a flower entry gives a clear quality and the flower is present. | What quality is the flower teaching by being itself? | Agapanthus and Orientation, PDF pp. 28-29, 14-15. | primary `plant` + `blessing`; capacity `only_a_little`; audience `me`; timing `none`. | flags: materialSafetyReviewRequired, sourceVerificationRequired; import `approved_for_mechanical_import`. |
| `whitehurst-carnation-beside-memory` | source_backed_moon_and_table_form | Carnation Beside the Memory | Place one household-safe carnation in a small vase beside a photograph, letter, keepsake, or empty place at the table. Sit with the flower and the memory for one minute. Say: "This memory is held with tenderness, not demand." Name one thing the memory gave you and one thing that still belongs to life now. Leave the carnation beside the object through the evening. When it fades, thank it and return it to compost or another safe place. | Hold a memory with tenderness while keeping the present life open. | Anniversaries, after remembering someone, or when the house wants a gentle memory marker. | What can be remembered without being held too tightly? | Carnation, PDF pp. 69-72. | primary `table` + `remembering`; secondary `plant`, `vessel`, `words`; supports `me`, `both_of_us`. | flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired; approved. |
| `whitehurst-chamomile-room-bowl` | source_backed_moon_and_table_form | Chamomile for the Room | Place fresh chamomile flowers, dried chamomile flowers, or a reviewed safe substitute in a small bowl on the table where the household gathers. Do not brew, ingest, bathe, or mist anything for this ritual. Touch the edge of the bowl and say: "Let this room remember gentleness." Name one way the room can be softer tonight. Leave the bowl in place through the evening, then clear it with thanks. | Let a gentle flower soften the household room without turning the practice into tea or medicine. | After a tense day, before a shared meal, or when the room needs softening. | What would make this room gentler tonight? | Chamomile, PDF pp. 73-78. | primary `vessel` + `steadying`; secondary `plant`, `table`, `words`; supports `me`, `both_of_us`. | flags: materialSafetyReviewRequired, sourceVerificationRequired; approved. |
| `whitehurst-cherry-blossom-soft-release` | source_backed_moon_and_table_form | Cherry Blossom Soft Release | Place one household-safe cherry blossom, fallen petal, or reviewed seasonal substitute in a shallow bowl or on a small plate at the table. Name one thing that is passing and does not need to be held in the same way. Say: "Beauty can pass and still bless the house." Let the blossom stay through the meal or evening. Close by returning the petal or blossom to compost or earth with thanks. | Let a passing flower teach release without harshness. | Cherry blossom season, a seasonal turn, or when something tender is ending. | What can pass gently? | Cherry Blossom, PDF pp. 89-92. | primary `plant` + `releasing`; secondary `table`, `vessel`, `words`; timing `helpful`. | flags: materialSafetyReviewRequired, sourceVerificationRequired; approved. |
| `whitehurst-first-crocus-marker` | source_backed_moon_and_table_form | First Crocus Marker | When crocus or another reviewed first-flower sign appears, place one blossom, photo, or drawn image at the table. Name the first small sign of return that you are willing to trust. Say: "This is enough to begin." Leave the marker on the table for the day. Close by putting the image in the grimoire or returning the flower to compost or earth. | Mark the first visible sign of return, emergence, or seasonal opening. | First spring bloom or first sign that something is returning. | What small sign is enough to begin? | Crocus, PDF pp. 119-120. | primary `plant` + `opening`; timing `required`; capacity `only_a_little`. | flags: materialSafetyReviewRequired, sourceVerificationRequired; approved. |
| `whitehurst-daisy-clears-table` | source_backed_moon_and_table_form | Daisy Clears the Table | Clear the table of what does not belong there tonight. Put daisies, a daisy image, or another reviewed purity flower at the center. Touch the table once and say: "Only what is simple and needed stays here." Name one complication, worry, or cluttered feeling being set down for the evening. Leave the daisy at the center through the meal or night. Close by clearing the flower or image with thanks. | Use daisy's simplicity and purification current to clear the table. | Before a meal, conversation, or overcomplicated evening. | What is simple enough to stay? | Daisy, PDF pp. 125-128. | primary `table` + `blessing`; secondary `plant`, `words`; supports `both_of_us`. | flags: materialSafetyReviewRequired, sourceVerificationRequired; approved. |
| `whitehurst-dandelion-wish-breath` | source_backed_moon_and_table_form | Dandelion Wish Breath | Hold a dandelion seed head, a single seed, or a drawing of one. Name one wish as an offering, not a demand. Say: "May this wish find the place it can grow." If releasing seed is safe and appropriate where you are, breathe once and let the seeds go. If not, draw the wish as a seed in the grimoire instead. Close by thanking the dandelion for carrying the wish lightly. | Let a wish move without forcing it. | Wish, beginning, or gentle release; helpful in seed season. | Where can this wish grow without being forced? | Dandelion, PDF pp. 129-131. | primary `plant` + `marking`; secondary `releasing`, `words`; timing `helpful`. | flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired; approved. |
| `whitehurst-pressed-forget-me-not` | source_backed_moon_and_table_form | Press the Forget-Me-Not | Place one household-safe forget-me-not or another reviewed memory flower between two pieces of clean paper. Before closing the paper, say: "Let this be remembered kindly." Write the date and the memory's name on the outside. Put the paper under a book until the flower dries. When dry, keep it in the private grimoire or a small envelope. Close by touching the paper once and naming what must not be lost. | Make a small flower token for a memory that deserves to stay. | After a meaningful day, promise, visit, anniversary, or tender memory. | What must not be lost? | Forget-Me-Not, PDF pp. 139-141. | primary `plant` + `remembering`; secondary `vessel`, `words`, `connecting`. | flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired; approved. |
| `whitehurst-freesia-clarity-bouquet` | source_backed_moon_and_table_form | Freesia for Clarity | Put freesia or another reviewed clarity flower in a small vase near the place where the question will be named. Set one blank card or page beside the vase. Say the question once, plainly. Then write only the clearest version of the question, not the answer. Leave the flower and card together until the next natural pause. Close by moving the card into the grimoire or recycling it if the question no longer needs carrying. | Let freesia clarify the question before anyone rushes the answer. | Before a decision, conversation, or reading. | What is the real question? | Freesia, PDF pp. 146-149. | primary `plant` + `voicing`; secondary `words`, `vessel`. | flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired; approved. |
| `whitehurst-geranium-truth-sentence` | source_backed_moon_and_table_form | Geranium Truth Sentence | Place geranium or another reviewed truth flower near the table or writing place. Sit where you can see it. Ask silently what needs to be named without drama. Say: "Let the plain truth come through cleanly." Write one sentence only. Do not explain it yet. Read it once, then place it under or beside the flower until ready to speak or release it. Close by thanking the flower and folding the sentence once. | Let one clean sentence emerge from the flower's truth-telling current. | Before a hard conversation, personal check-in, or discernment. | What is true when I stop decorating it? | Geranium, PDF pp. 150-158. | primary `words` + `voicing`; secondary `plant`, `table`. | flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired; approved. |
| `whitehurst-hydrangea-boundary-bowl` | source_backed_moon_and_table_form | Hydrangea Boundary Bowl | Place one reviewed hydrangea bloom, a small cluster, or a safe image of hydrangea in a bowl near the table or entry. Set the bowl down deliberately. Say: "This belongs inside; that stays outside." Name one thing the house is holding tonight and one thing it is not holding. Leave the bowl in place through the evening. Close by moving the bowl away from the entry or table and thanking the flower for holding the line. | Give the household boundary a visible flower form. | Before guests, after a demanding day, after a difficult exchange, or when the house needs an inside/outside distinction. | What belongs inside tonight? | Hydrangea, PDF pp. 182-187. | primary `vessel` + `protecting`; secondary `plant`, `doorway`, `words`, `table`. | flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired; approved. |
| `whitehurst-lilac-remembers-house` | source_backed_moon_and_table_form | Lilac Remembers the House | Set lilac or another reviewed seasonal memory flower in a vase in the room where the memory belongs. Stand near it and name one sweetness the house has carried before. Say: "Let old sweetness make room for new sweetness." Leave the flower in the room through the day or evening. Close by writing the date and one remembered image in the grimoire, then clear the flower when it fades. | Let a seasonal flower hold house memory without freezing the house in the past. | Lilac season, after returning home, or when a room carries an old memory. | What sweetness is the house ready to carry forward? | Lilac, PDF pp. 217-219. | primary `plant` + `remembering`; secondary `vessel`, `words`. | flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired; approved. |
| `whitehurst-single-blossom-altar` | source_backed_moon_and_table_form | Single Blossom Altar | Spread a small cloth on the table. Place one household-safe magnolia blossom or another reviewed single blessing flower in a shallow bowl of clean water at the center. Add one supporting household object only if it directly belongs to the purpose. Say: "One blossom is enough to hold this purpose." Name the purpose in one plain sentence. Leave the altar in place for the chosen evening or day. Close by removing the object, thanking the flower, and pouring the water into soil or down the sink. | Let one blossom make a small table altar without cluttering the work. | Focused blessing, intention, or beginning when one object is enough. | What purpose can one blossom hold? | Magnolia, PDF pp. 228-231; flower-entry altar/table lane. | primary `table` + `blessing`; secondary `plant`, `vessel`, `words`. | flags: materialSafetyReviewRequired, sourceVerificationRequired; approved. |
| `whitehurst-marigold-offering-bowl` | source_backed_moon_and_table_form | Marigold Offering Bowl | Place marigold blooms, dried calendula, or a reviewed marigold image in a small bowl at the table. Name what is being honored: warmth, a relationship, a remembered person, a completed effort, or the sunlight that helped the day. Say: "This brightness is offered back with thanks." Leave the bowl where it can be seen during the meal or evening. Close by clearing the bowl and returning the flowers to compost or another safe place. | Offer visible brightness back to what has warmed the house. | Bright day, shared success, seasonal remembrance, or sunlit blessing. | What brightness deserves an offering? | Marigold (Calendula/Tagetes), PDF pp. 235-244. | primary `vessel` + `blessing`; secondary `plant`, `table`, `words`, `remembering`. | flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired; approved. |
| `whitehurst-pansy-reflection-bowl` | source_backed_moon_and_table_form | Pansy Reflection Bowl | Fill a small bowl with clean water. Float one household-safe pansy, viola, violet, or a reviewed image beside the bowl. Write the question you want clarity on and fold the paper once. Set it under the bowl or beside it. Say: "Let the beautiful thought rise cleanly." Sit for one quiet minute. Close by lifting the paper, reading the question once, and deciding whether to keep it in the grimoire or clear it away. | Use pansy's thought-and-beauty current to clarify one question. | Before a decision, creative idea, or reflective conversation. | What beautiful thought is trying to rise? | Pansy / Viola / Violet, PDF pp. 270-273. | primary `vessel` + `voicing`; secondary `plant`, `words`, `table`. | flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired; approved. |
| `whitehurst-rose-as-witness` | source_backed_moon_and_table_form | Rose as Witness | Place one household-safe rose in a vase where both people can see it, or where you can see it if the practice is solo. Name what the rose is witnessing: apology, gratitude, welcome, devotion, tenderness, or repair. Say: "Let this be true and freely given." Speak only what is yours to offer. Leave the rose in place through the evening. Close by thanking it for witnessing the words and clearing it when it fades. | Let a rose witness connection without persuasion or control. | Apology, gratitude, welcome home, anniversary, or tender conversation. | What can I offer freely? | Rose, PDF pp. 298-303; source-gate flower-as-message/witness lane. | primary `plant` + `connecting`; secondary `words`, `table`, `vessel`. | flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired; approved. |
| `whitehurst-sunflower-opens-room` | source_backed_moon_and_table_form | Sunflower Opens the Room | Place one sunflower or reviewed sunflower image where it catches natural light or can be seen from the table. Turn the flower or image slightly toward the room. Say: "Let the room turn toward what gives life." Name one thing the household is turning toward: courage, warmth, joy, a better pattern, or a simple next step. Leave the sunflower as the room marker for the day, then clear it with thanks. | Open the room toward warmth, courage, and visible life. | Daylight, sunflower season, after a heavy stretch, or bright opening. | What is the room turning toward? | Sunflower, PDF pp. 313-318. | primary `plant` + `opening`; secondary `table`, `words`. | flags: materialSafetyReviewRequired, sourceVerificationRequired; approved. |
| `whitehurst-tuberose-reading-table` | direct_source_ritual | Tuberose on the Reading Table | Place one household-safe tuberose flower, a small bouquet, or a reviewed substitute on the table or desk before a card pull, I Ching throw, grimoire question, or shared check-in. Look at the flower and take one settling breath. Say: "Let intuition come into ordinary language." State the question plainly. Leave the flower on the table while you read, write, or speak. Close by thanking the flower and moving it away from the reading surface. | Let the flower bring intuition back into useful words. | Before intuitive reading, grimoire question, or reflective check-in. | What does intuition sound like in ordinary language? | Tuberose, PDF pp. 323-325. | primary `table` + `voicing`; secondary `plant`, `words`, `body`. | flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired; approved. |
| `whitehurst-water-lily-still-bowl` | source_backed_moon_and_table_form | Water Lily Still Bowl | Set a bowl of clean water on the table. Place a household-safe water lily, a reviewed substitute flower, or an image beside the bowl rather than forcing rare material. Sit where the water and flower can be seen together. Say: "Let stillness gather before I speak." Wait one minute. Then speak or write one question, sentence, or closing word. Close by emptying the bowl and clearing the flower or image with thanks. | Let water and flower gather stillness before words arrive. | Before sleep, after emotional noise, before a reflective question, or at the close of a day. | What can only be heard after stillness gathers? | Water Lily, PDF pp. 344-349. | primary `vessel` + `steadying`; secondary `plant`, `words`, `table`. | flags: materialSafetyReviewRequired, sourceVerificationRequired, productBoundaryReviewRequired; approved. |

## Source notes

### SN-WHITEHURST-FLOWER-SELECTION

Use flower selection as ritual relationship, not database lookup. Affinity, availability, local flowers, and direct flower presence matter. Correspondences can support later recommendation explanation, but they should not turn Moon & Table into a flower encyclopedia or shopping list.

### SN-WHITEHURST-SAFETY-FIRST-FLOWER

Every runtime flower still needs household safety review before direct-use: pets, children, allergies, scent sensitivity, toxicity, irritating sap, sprayed or treated florist material, plant identification, and disposal. These concerns belong in review flags and notes, not warning-heavy ritual copy.

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
- keep together now: Rose as Witness and Flower-as-Message lane as non-coercive connection forms.
- split later: apology witness; gratitude witness; welcome-home witness; anniversary witness; friendship flower.
- reason: relationship variants need careful non-agency-violating copy.
- trigger for split: partner-connection review lane opens.
```

```text
Variant / split candidates:
- keep together now: Pressed Forget-Me-Not as a general memory token.
- split later: date memory; home memory; seasonal memory; relationship milestone memory.
- reason: memory objects differ by emotional weight.
- trigger for split: review distinguishes remembering from grief/spirit-work.
```

```text
Variant / split candidates:
- keep together now: Single Blossom Altar as a small table/blessing form.
- split later: no-flame altar; candlelit altar; memory altar; intention altar; offering altar.
- reason: candlelight is source-supported but secondary and requires separate fire review.
- trigger for split: candle safety and setting preferences are in runtime metadata.
```

## Rejected / held leads

| Source lead | Source pages | Disposition | Reason |
| --- | ---: | --- | --- |
| Preparation-heavy flower practices | 16-19, 24-360, 361-363 | hold | Outside the safe flower/table lane until separate safety review exists. |
| Fragrance, mist, anointing, diffusion, smoke/incense, bath/direct-contact methods | throughout | hold | Household exposure, fire, respiratory, skin, pet, and allergy review required. |
| Health-adjacent or guaranteed-outcome claims | throughout | reject as app advice | Moon & Table can hold symbolic practice, not diagnosis, treatment, fertility, immunity, or health guidance. |
| Agency-violating attraction or target-control framing | throughout | reject or later self-blessing only | Private household ritual must preserve agency and consent. |
| Unsafe plants such as Datura, Oleander, and Foxglove | related entries | reject/hold | Not normal household flower work. |
| Whole Appendix B-D tables | 364-389 | source_note_only | Navigation and timing support only; no flower database. |

## Duplicate check

- #323 / *The Green Witch's Garden* remains the living plant, container, gardening, and seasonal care lane. This packet stays with flower/table/vase/contemplation/gathering/message/memory mechanics.
- Candlelight remains secondary here. Flower-specific candle altars should be cross-checked with candle sources before import.
- Moon Book and Dominguez timing work can shape later timing explanation, but this packet does not create lunar or astrology timing cards.

## Gap notes

- This repair expands the Whitehurst source beyond the orientation section and provides named flower-entry candidates from the approved pp. 24-360 lane.
- The packet still does not open preparation-heavy flower magic.
- The packet still does not solve flower safety. Safety remains a review dependency, not user-facing warning prose.
- The packet does not import runtime records or alter eligibility.

## Remaining extraction backlog

1. Additional connection/message flowers: camellia, sweet pea after body/social-framing review, orchid devotion, tulip gratitude.
2. Additional memory/seasonal flowers: calla lily, chrysanthemum, heather, hollyhock, honeysuckle, wisteria.
3. Additional steadying/protection flowers: alyssum external token, echinacea strength marker, holly winter boundary, snapdragon/yarrow boundary source notes.
4. Additional opening/beauty flowers: narcissus, nasturtium, peony, crepe myrtle, bird of paradise.
5. Correspondence source-note cards from Appendices B-D after separate product decision.
6. Preparation-heavy flower magic remains held until a safety policy exists.

## Validation checklist

- Source gate metadata is no longer pending/blocked: yes
- Existing four approved orientation candidates remain: yes
- Packet includes broader source-backed extraction from individual flower-entry lane: yes
- Held/rejected lanes stay held/rejected: yes
- Safety stays in review flags/notes and does not overwhelm ritual bodies: yes
- Metrics and coverage are internally consistent: yes
- No runtime Ritual records created: yes
- No selector, check-in, recommendation, or UI changes: yes
- No candidate marked reviewed/findable/direct-use eligible/recommendation eligible/recommendable/runtime-ready: yes
- Runtime enum values checked against `src/data/rituals/types.ts`: yes
- Invalid carrier values such as flower, bouquet, altar, offering, object, room, and decor are not used as runtime carriers: yes
- Invalid capacity values are not used: yes
- Invalid review flag fields are not used: yes
- Exact Whitehurst wording is not reproduced; stricter source-gate wording policy is documented: yes
- Self-check terms from #352 searched in this packet: pass; any occurrence is outside approved ritual bodies or is source/policy context that does not block mechanical import

## Final packet status

```text
packet_status: canonical_reextraction_ready_for_pr_review
runtime_records_created: no
recommendation_logic_updated: no
ui_updated: no
candidates_reviewed: no
candidates_findable: no
candidates_direct_use_eligible: no
candidates_recommendation_eligible: no
human_review_required: yes
```
