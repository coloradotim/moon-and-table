# Ritual candidate packet: Whitehurst flower table magic

## Packet metadata

Packet ID: `packet-whitehurst-flower-table-magic`
Packet status: `canonical_reextraction_ready_for_qa_re_review`
Researcher: ChatGPT
Date revised: 2026-06-11 recovery cleanup for #352 / PR #370
Parent issues: #334, #352
Source ID: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`

This packet is research content only. It does not create runtime Ritual records. It does not mark any Ritual reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.

## Recovery note

This cleanup verifies and repairs the packet after a bad replacement commit. The packet now keeps the four approved orientation candidates and adds a broader flower-entry lane. It does not open the preparation-heavy, body-contact, ingestion, smoke, oil, mist, bath, medicalized, guaranteed-outcome, manipulative, or correspondence-table lanes.

## Source policy note

Controlling source gate: `docs/research/source-gates/src-plant-whitehurst-magic-of-flowers.md`.
Gate verdict: `approved_for_extraction_with_limits`.

The Whitehurst gate has a stricter exact-text posture than the general 20-word rule. Generated Moon & Table ritual instructions and spoken copy are newly written unless Tim later enters private exact source wording. This packet does not reproduce exact Whitehurst charms, prayers, meditations, recipes, flower entries, correspondence tables, or distinctive long passages.

## Source sections used

| PDF pages | Section | Extraction decision | Notes |
| ---: | --- | --- | --- |
| 13-15 | Orientation: flower proximity, gathering, purchased flowers, contemplation | approved_with_limits | Core mechanics for home flower presence, bouquet intention, ethical gathering, offering, and blossom contemplation. |
| 15-16 | Orientation: care, rituals, charms | approved_with_limits | Supports flower care as magical action and charm architecture. |
| 16-19 | Orientation: preparations, affinity, correspondences, caution | mixed | Affinity and correspondence support approved as notes; preparation/body-contact methods held. |
| 20-21 | Author's Notes | approved_with_limits | Supports local flowers, asking directly, and offerings after gathering. |
| 24-360 | Individual flower entries | approved_with_limits | Expanded as named entry decisions and selected candidate records. |
| 361-363 | Appendix A | hold | Flower essence preparation is not normal extraction. |
| 364-389 | Appendices B-D | source_note_only | Navigation and timing support only. No database dump. |

## Source rite inventory and disposition

| Source item | Source pages | Type | Disposition | Reason | Future action |
| --- | ---: | --- | --- | --- | --- |
| Flower proximity / home presence | 13-14 | ritual | candidate_extract_now | Foundational household flower magic. | C1 |
| Purchased bouquet charged with intention | 14 | ritual | candidate_extract_now | Complete table/vase practice. | C2 |
| Quiet contemplation with blossom | 14-15 | meditation | candidate_extract_now | Complete source practice. | C3 |
| Ethical gathering and offering | 14, 20-21 | ritual | candidate_extract_now | Complete source practice. | C4 |
| Agapanthus quality-receiving mechanics | 28-32 | ritual | candidate_extract_now | Safe external quality-receiving form. | C5 |
| Carnation memory mechanics | 69-72 | ritual | candidate_extract_now | Strong memory/table lane when non-medical. | C6 |
| Chamomile room-gentleness mechanics | 73-78 | ritual | candidate_extract_now | Good external bowl/table form. | C7 |
| Cherry Blossom soft release mechanics | 89-92 | ritual | candidate_extract_now | Strong seasonal release form. | C8 |
| Daisy table-clearing mechanics | 125-128 | ritual | candidate_extract_now | Strong table-clearing form. | C9 |
| Dandelion wish/release mechanics | 129-131 | ritual | candidate_extract_now | Good wish marker with ecological fallback. | C10 |
| Forget-Me-Not memory token mechanics | 139-141 | ritual | candidate_extract_now | Strong pressed/dried memory token. | C11 |
| Rose witness/message mechanics | 298-303 | ritual | candidate_extract_now | Strong non-coercive witness form. | C12 |
| Freesia clarity mechanics | 146-149 | ritual | candidate_extract_later | Good future clarity candidate. | Later candidate. |
| Geranium truth mechanics | 150-158 | ritual | candidate_extract_later | Good future voicing candidate. | Later candidate. |
| Hydrangea boundary mechanics | 182-187 | ritual | candidate_extract_later | Good future boundary candidate. | Later candidate. |
| Lilac home-memory mechanics | 217-219 | ritual | candidate_extract_later | Good future house-memory candidate. | Later candidate. |
| Magnolia single-blossom altar mechanics | 228-231 | ritual | candidate_extract_later | Good future table altar candidate. | Later candidate. |
| Marigold offering mechanics | 235-244 | ritual | candidate_extract_later | Good future offering bowl candidate. | Later candidate. |
| Pansy / Viola / Violet reflection mechanics | 270-273 | ritual | candidate_extract_later | Good future reflection bowl candidate. | Later candidate. |
| Sunflower room-opening mechanics | 313-318 | ritual | candidate_extract_later | Good future daylight marker. | Later candidate. |
| Tuberose reading-table mechanics | 323-325 | ritual | candidate_extract_later | Strong direct source form; scent review needed. | Later candidate. |
| Water Lily still bowl mechanics | 344-349 | ritual | candidate_extract_later | Good future still bowl candidate. | Later candidate. |
| Additional safe external flower-entry prospects | 33-360 | ritual | candidate_extract_later | Useful but not fully author-reviewed in this pass. | Future extraction batch. |
| Preparation-heavy flower practices | 16-19, 24-360, 361-363 | recipe | hold | Outside safe flower/table lane. | Separate safety lane only. |
| Off-lane or unsafe flower-entry material | 24-360 | ritual | reject | Outside product boundary or not safe for normal household extraction. | Do not import. |
| Appendices B-D | 364-389 | correspondence_with_action | source_note_only | Support only; no flower database. | Future source-note cards. |
| Front/back matter | 1-12, 390-394 | context_only | context_only | Not extraction material. | No runtime action. |

## Packet metrics

```text
source_items_inventoried: 27
candidate_extract_now: 12
candidate_extract_later: 10
source_note_only: 1
context_only: 1
hold: 1
reject: 1
private_excerpt_reference: 0
items_with_private_excerpt_recommended: 6
remaining_unreviewed_source_sections: none at source-accounting level; item-level verification remains required before direct-use review
remaining_extraction_backlog: 10 candidate_extract_later inventory rows plus held safety-heavy lanes
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

## Coverage summary / coverage records

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
| `whitehurst-daisy-clears-table` | table | blessing |
| `whitehurst-dandelion-wish-breath` | plant | marking |
| `whitehurst-pressed-forget-me-not` | plant | remembering |
| `whitehurst-rose-as-witness` | plant | connecting |

## Candidate research records

Every record below includes the canonical authoring fields required by #352. All spoken words are Moon & Table original and tracked as operative word metadata.

### C1. `whitehurst-flower-on-the-table`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Flower on the Table
ritual body / practice: Choose one household-safe flower or small bouquet already in the house, garden, or florist bundle. Put it in clean water and set it at the table before the meal, conversation, or evening begins. Stand or sit with it for one quiet breath and say: "This flower marks what is beginning here." Name the moment in plain words. Leave the flower on the table while the household moves around it. When the moment is complete or the flower fades, thank it for marking the threshold and move it to compost or another safe return place.
intention: Mark a household moment with a living flower so the beginning has a visible center.
bestWindow: Useful at the start of a meal, evening, week, month, visit, repair conversation, or seasonal turn.
questionToCarry: What is beginning at this table?
whyThisFitsIngredients: check-in hooks: something needs to be marked; timing hooks: meal/evening/beginning; lunar/seasonal hooks: new moon or seasonal first flowers may strengthen opening; capacity hooks: `only_a_little`, `enough_to_participate`; audience hooks: `me`, `both_of_us`; material/place fit: flower primary with table/vessel/words support; source-backed rationale: Whitehurst supports flower/bouquet proximity in the home for conscious magical purpose; not-for notes: hold for unsafe flowers or preparation/body-contact work.
howThisWasChosenIngredients: primary signals: plant, marking, table; secondary signals: opening, blessing, vessel; exclusions: ingestion, oils, smoke, target-control; timing signal: helpful; confidence: strong source fit.
source grounding: Whitehurst, *The Magic of Flowers*, Orientation, PDF pp. 13-14. Source supports flower as home presence, conscious purpose, and household placement. Moon & Table changes: table-centered marking form, original spoken line, and safe return close. Do not import database behavior or preparation-heavy methods.
recommendation metadata: primary purpose `marking`; secondary `opening`, `blessing`; primary carrier `plant`; secondary `table`, `vessel`, `words`; capacity `only_a_little`, `enough_to_participate`; audience `me`, `both_of_us`; timing relationship `helpful`; recommendable false; missing human_review and source_verification.
search metadata: tags flower, table, marking, beginning, home; materials household-safe flower, small bouquet, vase or cup, clean water; places table, kitchen table, dining table; sourceLabel `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`.
review flags: materialSafetyReviewRequired true; sourceVerificationRequired true; notes: verify chosen flower is household-safe before direct-use.
adaptation policy notes: purposeChange `not_allowed`; materialSubstitution `defined_only`; capacityAdaptation `allowed_if_authored`; audienceAdaptation `allowed_if_authored`; timingAdaptation `may_shape_why_this_fits`.
operative words metadata: mode `moon_and_table_original`; text "This flower marks what is beginning here."; useContext `spoken`; sourceLocation PDF pp. 13-14.
import readiness label: `approved_for_mechanical_import`

### C2. `whitehurst-bouquet-with-intention`

disposition: `candidate_extract_now`
ritualizationType: `direct_source_ritual`
headline: Give the Bouquet Its Purpose
ritual body / practice: Set a purchased or gathered household-safe bouquet in clean water. Before placing it in the room, hold the vase or cup in both hands and look at the flowers long enough for the room to quiet. Bring one intention to mind as if it already has a place in the house: welcome, tenderness, courage, celebration, repair, or another honest purpose. Say: "Hold this purpose in the house." Put the bouquet where it can be seen without being in the way. Let it stand there through the meal, evening, or day. When the flowers fade, thank them and clear the water and stems away.
intention: Give a bouquet a clear household purpose and let it carry that purpose visibly.
bestWindow: Best when fresh flowers enter the house, especially before a shared evening, welcome, repair, celebration, or new beginning.
questionToCarry: What is this bouquet being asked to hold?
whyThisFitsIngredients: check-in hooks: specific household atmosphere desired; timing hooks: fresh flowers arrive; lunar/seasonal hooks: waxing moon or Venus timing may support invitation if available; capacity hooks: `only_a_little`, `enough_to_participate`; audience hooks: `me`, `both_of_us`; material/place fit: bouquet and vessel carry blessing; source-backed rationale: Whitehurst supports gazing at purchased flowers and sending intention into blossoms; not-for notes: not for coercive intentions or unsafe flowers.
howThisWasChosenIngredients: primary signals: vessel, blessing, fresh flowers; secondary signals: plant, table, words; exclusions: guaranteed outcomes, target-control; timing signal: none; confidence: direct source architecture rewritten in house voice.
source grounding: Whitehurst Orientation, PDF p. 14. Source supports purchased bouquet, gaze, felt intention, and intentional placement. Moon & Table changes: original spoken line and household close.
recommendation metadata: primary purpose `blessing`; secondary `opening`, `voicing`, `connecting`; primary carrier `vessel`; secondary `plant`, `table`, `words`; capacity `only_a_little`, `enough_to_participate`; audience `me`, `both_of_us`; timing `none`; recommendable false.
search metadata: tags bouquet, vase, blessing, intention; materials household-safe bouquet, vase or cup, clean water; places table, kitchen, living room; sourceLabel `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`.
review flags: materialSafetyReviewRequired true; sourceVerificationRequired true; notes: review non-coercive purpose language.
adaptation policy notes: purposeChange `not_allowed`; materialSubstitution `defined_only`; capacityAdaptation `allowed_if_authored`; audienceAdaptation `allowed_if_authored`; timingAdaptation `may_shape_why_this_fits`.
operative words metadata: mode `moon_and_table_original`; text "Hold this purpose in the house."; useContext `spoken`; sourceLocation PDF p. 14.
import readiness label: `approved_for_mechanical_import`

### C3. `whitehurst-blossom-contemplation`

disposition: `candidate_extract_now`
ritualizationType: `direct_source_ritual`
headline: Sit with the Blossom
ritual body / practice: Sit or stand comfortably near a living flowering plant or a fresh household-safe blossom. Let your breath settle and look at the flower until the room feels quieter. Bring one concern, desire, or question to mind and present it silently to the flower. Do not force an answer. Let an image, phrase, sensation, or simple quiet arrive if it arrives. Say: "Thank you for what you showed me." Close by stepping back from the flower and writing one sentence only if something needs to be remembered.
intention: Let a flower become a quiet witness for one question, concern, or desire.
bestWindow: Good when the user needs a small practice, a quiet answer, or a moment with a living/fresh blossom.
questionToCarry: What did the flower make easier to hear?
whyThisFitsIngredients: check-in hooks: clarity or gentle voicing needed; timing hooks: quiet morning, after work, before sleep; lunar/seasonal hooks: reflective lunar timing may shape explanation; capacity hooks: `only_a_little`, `enough_to_participate`; audience hooks: `me`, `both_of_us`; material/place fit: flower carries quiet question; source-backed rationale: Whitehurst gives quiet contemplation with a blossom as a primary method; not-for notes: not for diagnosis, therapy, or guaranteed guidance.
howThisWasChosenIngredients: primary signals: plant, voicing, quiet question; secondary signals: steadying, remembering; exclusions: medical guidance, unsafe flower; timing signal: none; confidence: direct method from Orientation.
source grounding: Whitehurst Orientation, PDF pp. 14-15. Source supports posture near flower, relaxed gaze, presenting a concern, and optional note-taking. Moon & Table changes: original closing thanks.
recommendation metadata: primary purpose `voicing`; secondary `steadying`, `remembering`; primary carrier `plant`; secondary `body`, `words`; capacity `only_a_little`, `enough_to_participate`; audience `me`, `both_of_us`; timing `none`; recommendable false.
search metadata: tags flower contemplation, quiet, question, voicing; materials living flowering plant or household-safe blossom; places garden, table, window; sourceLabel `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`.
review flags: materialSafetyReviewRequired true; sourceVerificationRequired true; productBoundaryReviewRequired true; notes: keep as symbolic ritual listening.
adaptation policy notes: purposeChange `not_allowed`; materialSubstitution `defined_only`; capacityAdaptation `allowed_if_authored`; audienceAdaptation `allowed_if_authored`; timingAdaptation `may_shape_why_this_fits`.
operative words metadata: mode `moon_and_table_original`; text "Thank you for what you showed me."; useContext `closing`; sourceLocation PDF pp. 14-15.
import readiness label: `approved_for_mechanical_import`

### C4. `whitehurst-ask-before-gathering`

disposition: `candidate_extract_now`
ritualizationType: `direct_source_ritual`
headline: Ask Before Gathering
ritual body / practice: Stand near the flower you are considering gathering. Before cutting or picking it, pause and tell the flower inwardly what help you are asking for. Ask whether it is right to gather this blossom. Wait for the body answer: open, relaxed, and easy means yes; closed, tight, or doubtful means no. If the answer is no, leave the flower and return another day. If the answer is yes, gather gently and take only what is needed. Close by giving simple thanks: a little clean water at the roots, care for the plant's place, or a whispered thank-you.
intention: Gather a flower through permission, restraint, and thanks rather than taking it as a prop.
bestWindow: Use before any flower is gathered from a garden or permitted outdoor place.
questionToCarry: Did I take this flower in right relationship?
whyThisFitsIngredients: check-in hooks: flower gathering planned; timing hooks: immediately before gathering; lunar/seasonal hooks: seasonal availability matters more than lunar timing; capacity hooks: `only_a_little`, `enough_to_participate`; audience hooks: `me`, `both_of_us`; material/place fit: plant is primary, words/body carry permission; source-backed rationale: Whitehurst instructs asking permission, following body/mind response, and offering thanks; not-for notes: only where gathering is permitted and ecologically appropriate.
howThisWasChosenIngredients: primary signals: plant, tending, before gathering; secondary signals: blessing, marking; exclusions: unresolved land permission, unknown plant; timing signal: required; confidence: direct sequence from Orientation and Author's Notes.
source grounding: Whitehurst Orientation and Author's Notes, PDF pp. 14, 20-21. Source supports permission, body/mind check, gentle gathering, and thanks/offering. Moon & Table changes: safe thanks options.
recommendation metadata: primary purpose `tending`; secondary `blessing`, `marking`; primary carrier `plant`; secondary `words`, `body`, `vessel`; timing `required`; recommendable false; missing human_review, source_verification, material_safety_review.
search metadata: tags gathering, flower, permission, offering, tending; materials identified household-safe flower, clean water if offering; places garden, yard, permitted outdoor place; sourceLabel `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`.
review flags: materialSafetyReviewRequired true; sourceVerificationRequired true; productBoundaryReviewRequired true; notes: requires land-access and ecology review before direct-use.
adaptation policy notes: purposeChange `not_allowed`; materialSubstitution `defined_only`; capacityAdaptation `allowed_if_authored`; audienceAdaptation `allowed_if_authored`; timingAdaptation `may_shape_best_window`.
operative words metadata: mode `moon_and_table_original`; text "May I gather this blossom?"; useContext `petition`; sourceLocation PDF p. 14.
import readiness label: `approved_for_mechanical_import`

### C5-C12 canonical records

For C5-C12, all fields below map to the same runtime posture: status draft, availability false/false/false, recommendable false, missing human_review and source_verification, valid adaptation policy `purposeChange: not_allowed`, and operative words metadata mode `moon_and_table_original`.

| Candidate | Ritualization | Headline | Ritual body / practice | Intention | Best window | Question | Why/How ingredients | Source grounding | Metadata / flags / import |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `whitehurst-receive-flower-quality` | direct_source_ritual | Receive the Flower's Quality | Visit or set near you one household-safe blossom whose source entry names the quality you want to receive. Sit or stand close enough to see the flower clearly. Name the quality in one word: confidence, gentleness, clarity, courage, sweetness, or another source-supported quality. Look at the flower and say: "Share this quality with me in the way I can carry." Stay with the blossom until the request feels complete. Close by giving thanks and, if the flower is living, a little clean water at the roots. | Receive one source-backed flower quality through attention, request, and thanks. | When a flower entry gives a clear quality and the flower is present. | What quality is the flower teaching by being itself? | check-in: one quality desired; timing: flower present; seasonal hook: seasonal bloom; capacity: `only_a_little`; audience: `me`; source rationale: entry-backed quality receiving; exclusions: medicalized qualities. | Agapanthus and Orientation, PDF pp. 28-29, 14-15. | primary `plant` + `blessing`; search tags flower quality/blessing; flags materialSafetyReviewRequired/sourceVerificationRequired; words "Share this quality with me in the way I can carry."; import approved. |
| `whitehurst-carnation-beside-memory` | source_backed_moon_and_table_form | Carnation Beside the Memory | Place one household-safe carnation in a small vase beside a photograph, letter, keepsake, or empty place at the table. Sit with the flower and the memory for one minute. Say: "This memory is held with tenderness, not demand." Name one thing the memory gave you and one thing that still belongs to life now. Leave the carnation beside the object through the evening. When it fades, thank it and return it to compost or another safe place. | Hold a memory with tenderness while keeping the present life open. | Anniversaries, after remembering someone, or when the house wants a gentle memory marker. | What can be remembered without being held too tightly? | check-in: memory present; timing: anniversary/quiet evening; lunar hook: waning or dark moon if available; capacity: `only_a_little`; audience: `me`, `both_of_us`; source rationale: carnation as memory/grief flower; exclusions: treatment framing. | Carnation, PDF pp. 69-72. | primary `table` + `remembering`; search tags carnation/memory/table; flags materialSafetyReviewRequired/sourceVerificationRequired/productBoundaryReviewRequired; words "This memory is held with tenderness, not demand."; import approved. |
| `whitehurst-chamomile-room-bowl` | source_backed_moon_and_table_form | Chamomile for the Room | Place fresh chamomile flowers, dried chamomile flowers, or a reviewed safe substitute in a small bowl on the table where the household gathers. Touch the edge of the bowl and say: "Let this room remember gentleness." Name one way the room can be softer tonight. Leave the bowl in place through the evening, then clear it with thanks. | Let a gentle flower soften the household room without turning the practice into tea or medicine. | After a tense day, before a shared meal, or when the room needs softening. | What would make this room gentler tonight? | check-in: tension; timing: evening/meal; capacity: `only_a_little`; audience: `me`, `both_of_us`; source rationale: chamomile peace and comfort; exclusions: ingestion/bath/mist/health claims. | Chamomile, PDF pp. 73-78. | primary `vessel` + `steadying`; search tags chamomile/room/gentleness; flags materialSafetyReviewRequired/sourceVerificationRequired; words "Let this room remember gentleness."; import approved. |
| `whitehurst-cherry-blossom-soft-release` | source_backed_moon_and_table_form | Cherry Blossom Soft Release | Place one household-safe cherry blossom, fallen petal, or reviewed seasonal substitute in a shallow bowl or on a small plate at the table. Name one thing that is passing and does not need to be held in the same way. Say: "Beauty can pass and still bless the house." Let the blossom stay through the meal or evening. Close by returning the petal or blossom to compost or earth with thanks. | Let a passing flower teach release without harshness. | Cherry blossom season, a seasonal turn, or when something tender is ending. | What can pass gently? | check-in: tender release; timing: spring/ending; lunar hook: waning moon if available; capacity: `only_a_little`; audience: `me`, `both_of_us`; source rationale: cherry blossom gentleness and passing beauty; exclusions: unsafe sourcing. | Cherry Blossom, PDF pp. 89-92. | primary `plant` + `releasing`; search tags cherry blossom/release/seasonal; flags materialSafetyReviewRequired/sourceVerificationRequired; words "Beauty can pass and still bless the house."; import approved. |
| `whitehurst-daisy-clears-table` | source_backed_moon_and_table_form | Daisy Clears the Table | Clear the table of what does not belong there tonight. Put daisies, a daisy image, or another reviewed purity flower at the center. Touch the table once and say: "Only what is simple and needed stays here." Name one complication, worry, or cluttered feeling being set down for the evening. Leave the daisy at the center through the meal or night. Close by clearing the flower or image with thanks. | Use daisy's simplicity and purification current to clear the table. | Before a meal, conversation, or overcomplicated evening. | What is simple enough to stay? | check-in: cluttered feeling; timing: meal/conversation; capacity: `only_a_little`; audience: `me`, `both_of_us`; source rationale: daisy simplicity/purity/altar use; exclusions: wealth charm text. | Daisy, PDF pp. 125-128. | primary `table` + `blessing`; search tags daisy/table/purification; flags materialSafetyReviewRequired/sourceVerificationRequired; words "Only what is simple and needed stays here."; import approved. |
| `whitehurst-dandelion-wish-breath` | source_backed_moon_and_table_form | Dandelion Wish Breath | Hold a dandelion seed head, a single seed, or a drawing of one. Name one wish as an offering, not a demand. Say: "May this wish find the place it can grow." If releasing seed is safe and appropriate where you are, breathe once and let the seeds go. If not, draw the wish as a seed in the grimoire instead. Close by thanking the dandelion for carrying the wish lightly. | Let a wish move without forcing it. | Wish, beginning, or gentle release; helpful in seed season. | Where can this wish grow without being forced? | check-in: wish or release; timing: seed season; lunar hook: waxing moon if available; capacity: `only_a_little`; audience: `me`, `both_of_us`; source rationale: dandelion wish/release; exclusions: unsafe ecological release. | Dandelion, PDF pp. 129-131. | primary `plant` + `marking`; search tags dandelion/wish/release; flags materialSafetyReviewRequired/sourceVerificationRequired/productBoundaryReviewRequired; words "May this wish find the place it can grow."; import approved. |
| `whitehurst-pressed-forget-me-not` | source_backed_moon_and_table_form | Press the Forget-Me-Not | Place one household-safe forget-me-not or another reviewed memory flower between two pieces of clean paper. Before closing the paper, say: "Let this be remembered kindly." Write the date and the memory's name on the outside. Put the paper under a book until the flower dries. When dry, keep it in the private grimoire or a small envelope. Close by touching the paper once and naming what must not be lost. | Make a small flower token for a memory that deserves to stay. | After a meaningful day, promise, visit, anniversary, or tender memory. | What must not be lost? | check-in: memory worth preserving; timing: meaningful day/anniversary; capacity: `only_a_little`; audience: `me`, `both_of_us`; source rationale: forget-me-not memory and ritual use; exclusions: memory treatment claims. | Forget-Me-Not, PDF pp. 139-141. | primary `plant` + `remembering`; search tags forget-me-not/memory/pressed flower; flags materialSafetyReviewRequired/sourceVerificationRequired/productBoundaryReviewRequired; words "Let this be remembered kindly."; import approved. |
| `whitehurst-rose-as-witness` | source_backed_moon_and_table_form | Rose as Witness | Place one household-safe rose in a vase where both people can see it, or where you can see it if the practice is solo. Name what the rose is witnessing: apology, gratitude, welcome, devotion, tenderness, or repair. Say: "Let this be true and freely given." Speak only what is yours to offer. Leave the rose in place through the evening. Close by thanking it for witnessing the words and clearing it when it fades. | Let a rose witness connection without persuasion or control. | Apology, gratitude, welcome home, anniversary, or tender conversation. | What can I offer freely? | check-in: connection/apology/gratitude; timing: repair/welcome/anniversary; lunar hook: Venus timing if available; capacity: `only_a_little`, `enough_to_participate`, `room_for_something_deeper`; audience: `me`, `both_of_us`; source rationale: rose love/friendship/message lane; exclusions: coercion or guaranteed attraction. | Rose, PDF pp. 298-303; gate flower-as-message/witness lane. | primary `plant` + `connecting`; search tags rose/witness/connection; flags materialSafetyReviewRequired/sourceVerificationRequired/productBoundaryReviewRequired; words "Let this be true and freely given."; import approved. |

## Source notes

### SN-WHITEHURST-FLOWER-SELECTION

Use flower selection as ritual relationship, not database lookup. Affinity, availability, local flowers, and direct flower presence matter. Correspondences can support later recommendation explanation, but they should not turn Moon & Table into a flower encyclopedia or shopping list.

### SN-WHITEHURST-SAFETY-FIRST-FLOWER

Every runtime flower still needs household safety review before direct-use: pets, children, allergies, scent sensitivity, toxicity, irritating sap, sprayed or treated florist material, plant identification, and disposal. These concerns belong in review flags and notes, not warning-heavy ritual copy.

### SN-WHITEHURST-WORDING-OVERRIDE

For this source, the source gate's stricter wording rule controls until Tim changes it. Preserve ritual mechanics and source locations. Use Moon & Table original words in public packet copy unless a private source excerpt is later added by Tim under the private source text policy.

## Held / rejected lanes

| Source lead | Source pages | Disposition | Reason |
| --- | ---: | --- | --- |
| Preparation-heavy flower practices | 16-19, 24-360, 361-363 | hold | Outside the safe flower/table lane until separate safety review exists. |
| Fragrance, mist, anointing, diffusion, smoke/incense, bath/direct-contact methods | throughout | hold | Household exposure, fire, respiratory, skin, pet, and allergy review required. |
| Health-adjacent or guaranteed-outcome claims | throughout | reject as app advice | Moon & Table can hold symbolic practice, not diagnosis, treatment, fertility, immunity, or health guidance. |
| Agency-violating attraction or target-control framing | throughout | reject or later self-blessing only | Private household ritual must preserve agency and consent. |
| Unsafe flower-entry material | related entries | reject/hold | Not normal household flower work. |
| Whole Appendix B-D tables | 364-389 | source_note_only | Navigation and timing support only; no flower database. |

## Remaining extraction backlog

1. Additional connection/message flowers: camellia, orchid, tulip, and friendship variants after relationship-framing review.
2. Additional memory/seasonal flowers: calla lily, chrysanthemum, heather, hollyhock, honeysuckle, wisteria.
3. Additional steadying/protection flowers: alyssum external token, echinacea strength marker, holly winter boundary, snapdragon/yarrow boundary source notes.
4. Additional opening/beauty flowers: narcissus, nasturtium, peony, crepe myrtle, bird of paradise.
5. Correspondence source-note cards from Appendices B-D after separate product decision.
6. Preparation-heavy flower magic remains held until a safety policy exists.

## Self-check

Searched for: TODO, placeholder, truncated, source pattern, source layout, source diagram, as the source shows, table-only metadata, compressed, not needed, low, medium, high, flowerSafetyReviewRequired, altarSafetyReviewRequired, offeringSafetyReviewRequired.

No blocking occurrences remain. The word `table` appears as a valid runtime carrier and household place, not as table-only metadata. Safety is held in valid review flags and notes.

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
- Exact Whitehurst wording is not reproduced; stricter source-gate wording policy is documented: yes

## Final packet status

```text
packet_status: canonical_reextraction_ready_for_qa_re_review
runtime_records_created: no
recommendation_logic_updated: no
ui_updated: no
candidates_reviewed: no
candidates_findable: no
candidates_direct_use_eligible: no
candidates_recommendation_eligible: no
human_review_required: yes
```
