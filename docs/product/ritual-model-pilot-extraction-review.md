# Ritual Model Pilot Extraction Review

> Status: Current model pilot / supporting artifact.
> This document is not runtime data. Candidate Rituals are not runtime-approved app content.
> Do not implement without a separate typed-data issue and source-aligned review.
> Do not convert candidate Rituals into typed data from this document alone.

## Status Notes

- Ritual-first doctrine controls this pilot.
- The simplified model has no `intendedEffect` and no `source_synthesis`.
- Words and completion stay inside `practice`.
- Internal fields must support app check-in, search/direct selection, or source review.
- Dyer/Brand candidates require exact source verification before becoming Ritual records.
- Ovid candidates are accepted as model pilot candidates, but still require source-aligned review before typed runtime-adjacent records.


Source-aligned candidate Rituals using the current app presentation model

| Purpose of this document
This document is a review artifact, not app content. It tests whether candidate source-backed Rituals can be represented as whole authored practices with intrinsic purpose while preserving the current app presentation structure: headline, practice, intention, best window, why this fits, and question to carry. It also separates user-facing text fields from internal metadata needed for Choose with me and I have something in mind. |
| --- |

# 1. Locked model decisions

- The canonical object is Ritual, not LibraryRitual.

- A Ritual is a whole authored practice with intrinsic purpose. It is not assembled from reusable mechanics plus purpose tags.

- Metadata must support the app check-in flow, the search/direct-selection flow, or source/review completeness. Otherwise it is noise.

- Purpose changes usually create a different Ritual, even if the material/action looks similar.

- Adaptations are not invented by the app. They must be authored, source-supported, or household-approved.

- Words belong inside the practice field for now. Completion also belongs inside the practice field.

- Do not use intendedEffect as a separate field. Use internal purpose/refinement fields plus the user-facing Intention field.

# 2. Field model used in this review

## 2.1 User-facing presentation fields

| headline | The large title/headline shown at the top of the ritual card. |
| --- | --- |
| practice | The actual ritual the user follows. This includes any ritual words and the ending/closure. |
| intention | The app-visible intention line. This is ritual language, not internal analysis. |
| bestWindow | When to do it. For direct selection this can be general; for recommendation it may be lightly shaped by timing if the Ritual allows it. |
| whyThisFits | Authored explanation of why this Ritual fits its own purpose. Recommendation context may add a bounded sentence later. |
| questionToCarry | A strong, specific question tied to the Ritual. Current questions are accepted for now but remain reviewable. |

## 2.2 Internal fields that support app flows

| origin.type | source \| household. If there are multiple sources, origin.type is still source and sourceGrounding contains multiple entries. No source_synthesis. |
| --- | --- |
| purpose.primary | One of the app purpose families: steadying, opening, releasing, tending, connecting, voicing, marking, blessing, protecting, remembering. |
| purpose.secondary | Optional secondary purposes, only when genuinely intrinsic to the Ritual. |
| purpose.refinement | Specific check-in refinement, such as welcome_new_cycle, family_reconciliation, household_boundary, remembrance_place. |
| carriers.primary | One carrier for Choose with me: candlelight, table, doorway, plant, words, vessel, body. |
| carriers.secondary | Optional secondary carriers for search/review only. |
| capacity.supports | Which energy levels the Ritual can support as written or with authored variants. |
| audience.supports | Me, Both of us, or both. Both-of-us should be real structure, not a tag slapped on later. |
| timing.relationship | required \| preferred \| helpful \| none. |
| availability | findable, directUseEligible, recommendationEligible. |
| search | Tags, keywords, materials, places. Search metadata helps humans find things and should not drive core recommendation by itself. |

| Dropped field: intendedEffect
The previous intendedEffect field was removed. The model now uses internal purpose/refinement for check-in matching and the user-facing intention field for the app card. If the same information cannot support app flow or search, it does not belong as a separate field. |
| --- |

# 3. Source groups in this pilot

| Group A: existing repo-grounded household cluster | Carmina Gadelica, Homeric Hymns, Keightley, Lawrence/Bergen, British Popular Customs/Kelley as already documented in the repo. These support light, house, table, welcome, threshold, object, salt, calendar, and season. |
| --- | --- |
| Group B: Ovid, Fasti | Added from external second-opinion work. Strong calendar source for connecting, remembering, releasing/protecting, marking/protecting, and sweet-year cycle opening. |
| Group C: Dyer/Brand verification queue | Selected promising candidates from Gemini: Drawing Silent Water, First-Footing, Rosemary Windowsill. These need exact source verification before they become accepted Ritual candidates. |

| About source material in this document
For repo-documented sources, this document uses source notes and close paraphrases already captured in the repo. For Ovid/Fasti, this document uses the second-opinion citations and stable book/line references as candidate source locations; exact public-domain translation text should be verified before repo entry. For Dyer/Brand, the document lists candidates for verification only. |
| --- |

# A. Repo-grounded household cluster

## 1. Kindle the first household light

| Source material | Carmina Gadelica, Vol. I, entries 82-83, Blessing of the Kindling / Kindling the Fire. Repo note: kindling can open the house as a ritual field: floor, hearth, people, and threshold are treated together. |
| --- | --- |
| What source supports | The source supports first household fire/light as an opening action. Moon & Table changes hearth fire into an ordinary household light form. |
| Alignment rating | Strong for model pilot |

### Presentation fields

| headline | Kindle the first household light. |
| --- | --- |
| practice | Turn on one lamp before you begin anything else. Let it be the first household light of this ritual. Stand near it and name what is beginning in one plain sentence. Leave the lamp on while you take the first ordinary step. The ritual is complete when the beginning has been named and the light remains. |
| intention | Let one first light make the beginning visible. |
| bestWindow | At the beginning of the day, a task, a conversation, or a new phase. Strong beginning timing can make this especially fitting. |
| whyThisFits | The source structure treats kindling as an opening act for the household. This Ritual keeps the first-light structure but uses ordinary household light rather than hearth fire. |
| questionToCarry | What beginning wants one clear first sign? |

### Internal fields for app flow/search

| purpose.primary | opening |
| --- | --- |
| purpose.secondary | blessing, steadying |
| purpose.refinement | first_light_beginning |
| carriers.primary | candlelight |
| carriers.secondary | none |
| capacity.supports | only_a_little, enough_to_participate, room_for_something_deeper |
| audience.supports | me, both_of_us |
| timing.relationship | preferred |
| availability | findable: yes; directUseEligible: yes; recommendationEligible: pilot review |
| readiness / review note | Good first typed candidate after source-location details are included. |

## 2. Bless the house by its touchpoints

| Source material | Carmina Gadelica, Blessing of House page. Repo note: a house blessing can move by touchpoints: ground, wall, beam, roof, center, and threshold. |
| --- | --- |
| What source supports | The source supports house blessing as spatial movement through meaningful points. Moon & Table adapts the source into a private household circuit without copied prayer language. |
| Alignment rating | Strong for model pilot |

### Presentation fields

| headline | Bless the house by its touchpoints. |
| --- | --- |
| practice | Begin at the front door. Touch the doorframe. Say, “Bless this threshold.” Touch one wall. Say, “Bless what holds.” Touch the floor. Say, “Bless what carries.” Touch the table, shelf, lamp, or place where the room gathers. Say, “Bless this center.” Return to the doorframe and touch it once more. The ritual is complete when the circuit returns to the place where it began. |
| intention | Let the house be blessed through the places that hold it together. |
| bestWindow | When returning home, entering a new season, settling after disruption, or choosing to bless the household intentionally. |
| whyThisFits | The source points toward house blessing as movement through the house, not a vague home mood. The Ritual keeps the spatial map: threshold, holding surfaces, floor, and center. |
| questionToCarry | Which point of the home most wants to be included? |

### Internal fields for app flow/search

| purpose.primary | blessing |
| --- | --- |
| purpose.secondary | protecting, marking, tending |
| purpose.refinement | house_touchpoints |
| carriers.primary | doorway |
| carriers.secondary | table, body |
| capacity.supports | enough_to_participate, room_for_something_deeper |
| audience.supports | me, both_of_us |
| timing.relationship | helpful |
| availability | findable: yes; directUseEligible: yes; recommendationEligible: needs review |
| readiness / review note | Good model candidate; probably not first typed record because multi-place structure complicates v1. |

## 3. Wet the seed and wait

| Source material | Carmina Gadelica, Consecration of the Seed page. Repo note: seed and water give beginning a material form: prepare, moisten, place, and wait for growth. |
| --- | --- |
| What source supports | The source supports seed/water as material beginning and waiting. Moon & Table removes crop blessing/outcome claims and keeps the structure of prepare, moisten, place, wait. |
| Alignment rating | Strong for model pilot |

### Presentation fields

| headline | Wet the seed and wait. |
| --- | --- |
| practice | Place one seed in a small dish. Touch it with a little water. Name the beginning it will hold in one sentence. Set the dish where it can wait undisturbed. Do not ask it to prove anything tonight. The ritual is complete when the seed has been placed into waiting. |
| intention | Let the beginning have a small body and enough time to wait. |
| bestWindow | When beginning something that should not become work immediately. Spring, new-phase, or first-step timing can strengthen the fit. |
| whyThisFits | Seed and water make beginning material without promising the result. The Ritual ends by placing the seed into waiting, not by demanding growth. |
| questionToCarry | What beginning can be placed into waiting? |

### Internal fields for app flow/search

| purpose.primary | opening |
| --- | --- |
| purpose.secondary | tending, steadying |
| purpose.refinement | beginning_into_waiting |
| carriers.primary | plant |
| carriers.secondary | vessel |
| capacity.supports | only_a_little, enough_to_participate |
| audience.supports | me, both_of_us |
| timing.relationship | helpful |
| availability | findable: yes; directUseEligible: yes; recommendationEligible: pilot review |
| readiness / review note | Best first typed candidate. |

## 4. Set grain at the table

| Source material | Carmina Gadelica quern/grain material. Repo note: grain can link household rhythm, ordinary food, table warmth, and shared nourishment without recipe work. |
| --- | --- |
| What source supports | The source supports grain/table as household rhythm and nourishment. Moon & Table narrows this to tending the household table, not prosperity or abundance. |
| Alignment rating | Strong for model pilot |

### Presentation fields

| headline | Set grain at the table. |
| --- | --- |
| practice | Place one small piece of bread at the center of the table. Name one way this household is being fed or held right now. Let the table hold that sentence for one breath. Eat the bread, share it, or put it away. The ritual is complete when the table is clear again. |
| intention | Let ordinary nourishment have one clear place at the center. |
| bestWindow | Near a meal, after the room has scattered, or when the household needs one ordinary point of care. |
| whyThisFits | The source connects grain with household rhythm and table warmth. This Ritual keeps the table and food-family material specific so it does not become a generic object ritual. |
| questionToCarry | What ordinary thing is holding more than you noticed? |

### Internal fields for app flow/search

| purpose.primary | tending |
| --- | --- |
| purpose.secondary | blessing, steadying |
| purpose.refinement | household_nourishment |
| carriers.primary | table |
| carriers.secondary | none |
| capacity.supports | only_a_little, enough_to_participate |
| audience.supports | me, both_of_us |
| timing.relationship | none |
| availability | findable: yes; directUseEligible: yes; recommendationEligible: pilot review |
| readiness / review note | Good first typed candidate, with material rules required. |

## 5. Set a quiet welcome in a cup or bowl

| Source material | Keightley, The Fairy Mythology, hospitality/offering mechanics. Repo note: a modest bowl, cup, bread, or sweetness can symbolize welcome without literal spirit-feeding. |
| --- | --- |
| What source supports | The source supports modest vessel/food/sweetness as welcome. Moon & Table keeps welcome and removes bargains, spirit-feeding, and literal offering logic. |
| Alignment rating | Strong for model pilot |

### Presentation fields

| headline | Set a quiet welcome in a cup or bowl. |
| --- | --- |
| practice | Set one small cup or bowl at the table or near the entry. Put in it one sign of welcome: water, bread, or a little sweetness. Say, “Welcome what belongs here.” Leave the vessel in place for a short while. Close by clearing or washing the vessel. |
| intention | Let welcome become visible without becoming loud. |
| bestWindow | Before shared time, after someone returns, at the start of a month, or when the household needs to open gently. |
| whyThisFits | The source supports small food or vessel gestures as welcome. This Ritual keeps the gesture modest and household-scale instead of turning it into a bargain or offering to a being. |
| questionToCarry | What are you making welcome? |

### Internal fields for app flow/search

| purpose.primary | opening |
| --- | --- |
| purpose.secondary | blessing, connecting |
| purpose.refinement | quiet_welcome |
| carriers.primary | vessel |
| carriers.secondary | table, doorway |
| capacity.supports | only_a_little, enough_to_participate |
| audience.supports | me, both_of_us |
| timing.relationship | helpful |
| availability | findable: yes; directUseEligible: yes; recommendationEligible: needs review |
| readiness / review note | Promising; likely splits later from cup-between-us/connection rituals. |

## 6. Mark the threshold with a key

| Source material | Lawrence, The Magic of the Horse-shoe, and Bergen, Current Superstitions. Repo notes: small object/key can mark household continuity or threshold; placing/removing/crossing can act as boundary technology. |
| --- | --- |
| What source supports | The source cluster supports key/object/threshold marking. Moon & Table uses this as boundary/belonging language and removes luck/omen guarantees. |
| Alignment rating | Strong for model pilot |

### Presentation fields

| headline | Mark the threshold with a key. |
| --- | --- |
| practice | Take one key that belongs near the door. Stand at the front door, inside the house. Touch the key to the doorframe or hold it flat in your palm. Say, “This is the edge of what belongs here.” Set the key back where it lives. The ritual is complete when the key has a place again. |
| intention | Let the threshold remember what belongs here. |
| bestWindow | Before sleep, after returning home, at a first or last day, or when the household boundary needs to be named. |
| whyThisFits | The source cluster supports small household objects and threshold actions as boundary markers. This Ritual keeps the key concrete and returns it to place instead of making a vague protection claim. |
| questionToCarry | What belongs inside this threshold? |

### Internal fields for app flow/search

| purpose.primary | marking |
| --- | --- |
| purpose.secondary | protecting, tending |
| purpose.refinement | household_boundary |
| carriers.primary | doorway |
| carriers.secondary | words, body |
| capacity.supports | only_a_little, enough_to_participate |
| audience.supports | me, both_of_us |
| timing.relationship | helpful |
| availability | findable: yes; directUseEligible: yes; recommendationEligible: source pinning needed |
| readiness / review note | Keep as model candidate; not first typed record until exact source pinning improves. |

# B. Ovid Fasti expansion

## 7. The Quiet Table

| Source material | Ovid, Fasti 2.617-638, Caristia / Cara Cognatio. Second-opinion source summary: a family table day of reconciliation after the rites of the dead, with dining/gifts/household affection. |
| --- | --- |
| What source supports | The source supports a timed family table observance for reconnection and setting quarrels down. Moon & Table adapts family-wide Roman observance into private household/partner table practice. |
| Alignment rating | Strong for model pilot after exact source verification |

### Presentation fields

| headline | Set the quiet table. |
| --- | --- |
| practice | Set two places at the table, even if the meal is small. Put one simple thing between you: bread, fruit, tea, or water. Before eating or drinking, each person names one thing they are willing to set down for the length of the table. Do not solve it. Let the table hold the pause. Close by clearing the shared thing together. |
| intention | Let the table hold connection before conversation tries to fix anything. |
| bestWindow | When both of you have enough to participate and want a small form of return to each other. |
| whyThisFits | The source centers kinship and reconciliation at a shared table. This Ritual keeps the table, shared food/drink, and deliberate pause, while removing Roman household-god framing. |
| questionToCarry | What can the table hold so you do not have to hold it alone? |

### Internal fields for app flow/search

| purpose.primary | connecting |
| --- | --- |
| purpose.secondary | tending, marking |
| purpose.refinement | shared_table_reconnection |
| carriers.primary | table |
| carriers.secondary | vessel |
| capacity.supports | enough_to_participate, room_for_something_deeper |
| audience.supports | both_of_us |
| timing.relationship | helpful |
| availability | findable: yes; directUseEligible: yes; recommendationEligible: source verification needed |
| readiness / review note | Accepted model pilot candidate; verify exact source text before repo record. |

## 8. Setting a Place

| Source material | Ovid, Fasti 2.533-616, Parentalia / Feralia. Second-opinion summary: offerings of garlands, grain, salt, wine-soaked bread, and violets are laid out for the family dead with words/prayers. |
| --- | --- |
| What source supports | The source supports timed remembrance through a modest place/material offering. Moon & Table adapts this as memory given one place at the table or vessel. |
| Alignment rating | Strong for model pilot after exact source verification |

### Presentation fields

| headline | Set a place for memory. |
| --- | --- |
| practice | Set one small plate, bowl, or cup at the table. Place one modest sign of memory there: a flower, bread, grain, salt, water, or a small object. Name who or what is being remembered in one sentence. Let the place remain while you sit quietly. Close by clearing the place with care. |
| intention | Give memory one small place at the table. |
| bestWindow | On an anniversary, during a remembering day, at a seasonal threshold, or when memory needs a visible place. |
| whyThisFits | The source gives remembrance material form through offerings and named attention. This Ritual keeps the table/place structure while removing ancestor-cult obligation and Roman religious framing. |
| questionToCarry | What memory needs a place rather than an explanation? |

### Internal fields for app flow/search

| purpose.primary | remembering |
| --- | --- |
| purpose.secondary | blessing, tending |
| purpose.refinement | memory_place |
| carriers.primary | table |
| carriers.secondary | vessel |
| capacity.supports | enough_to_participate, room_for_something_deeper |
| audience.supports | me, both_of_us |
| timing.relationship | preferred |
| availability | findable: yes; directUseEligible: yes; recommendationEligible: source verification needed |
| readiness / review note | Accepted model pilot candidate; strong Remembering test. |

## 9. The Bean Rite

| Source material | Ovid, Fasti 5.429-444, Lemuria. Second-opinion summary: midnight rite with body orientation, black beans, repeated formula, water, bronze/noise closure. |
| --- | --- |
| What source supports | The source supports a complete release/protection ritual with material, repeated words, body direction, count, timing, and closure. Moon & Table should treat it as model stress test, not near-production content. |
| Alignment rating | Strong model stress test; not production-near |

### Presentation fields

| headline | Send out what does not belong. |
| --- | --- |
| practice | Place nine dry beans in your hand. Stand in a quiet room with the lights low. Without looking behind you, drop one bean behind you and say, “What does not belong here may go.” Repeat until all nine beans are gone. Wash or touch your hands with water. Make one clear sound: a bell, clap, spoon on a bowl, or knuckle on the table. Close by saying, “This room is returned.” |
| intention | Let what does not belong move out of the room and let the room return to itself. |
| bestWindow | As a deeper ritual only, when release/protection is explicitly chosen and the household has room for a strange old form. |
| whyThisFits | The source contains a rare complete structure: body orientation, repeated words, material, number, water, and sound closure. The Moon & Table version would need careful review because the Roman spirit context is not neutral. |
| questionToCarry | What is ready to leave without being argued with? |

### Internal fields for app flow/search

| purpose.primary | releasing |
| --- | --- |
| purpose.secondary | protecting, marking |
| purpose.refinement | send_out_unwanted_presence |
| carriers.primary | body |
| carriers.secondary | words, vessel |
| capacity.supports | room_for_something_deeper |
| audience.supports | me, both_of_us |
| timing.relationship | required_or_preferred |
| availability | findable: review only; directUseEligible: no; recommendationEligible: no |
| readiness / review note | Model stress test only. Do not make first typed record. |

## 10. The Boundary Stone

| Source material | Ovid, Fasti 2.639-684, Terminalia. Second-opinion summary: boundary marker garlanded/offered to by neighbors; boundary is honored and renewed. |
| --- | --- |
| What source supports | The source supports marking a boundary through object/place attention and neighborly recognition. Moon & Table can adapt this to household threshold/object only after exact text review. |
| Alignment rating | Strong for model pilot after exact source verification |

### Presentation fields

| headline | Honor the boundary marker. |
| --- | --- |
| practice | Choose one object that marks an edge: a key, stone, small bowl, or object near the door. Set it at the inside edge of the front door. Touch it once and name the boundary it holds. If this is for both of you, each person names one thing that belongs inside the boundary. Leave the marker until the next ordinary crossing, then return it to its place. |
| intention | Let the boundary be honored without becoming a wall. |
| bestWindow | At a threshold day, after disruption, before rest, or when the home needs a clear edge. |
| whyThisFits | The source centers boundary markers and shared recognition of the line they hold. This Ritual adapts the marker structure to a private household threshold and avoids deity/offering claims. |
| questionToCarry | What boundary needs honoring rather than defending? |

### Internal fields for app flow/search

| purpose.primary | marking |
| --- | --- |
| purpose.secondary | protecting, tending |
| purpose.refinement | boundary_marker |
| carriers.primary | doorway |
| carriers.secondary | vessel, body |
| capacity.supports | enough_to_participate, room_for_something_deeper |
| audience.supports | me, both_of_us |
| timing.relationship | helpful |
| availability | findable: yes; directUseEligible: yes; recommendationEligible: source verification needed |
| readiness / review note | Accepted model pilot candidate; maybe better than key-source candidate after verification. |

## 11. The Sweet Year

| Source material | Ovid, Fasti 1.171-190, Janus/Kalends. Second-opinion summary: new-year sweetness, good words, dates/figs/honey/gifts as first offerings/wishes. |
| --- | --- |
| What source supports | The source supports a calendar-threshold practice where sweet things and good words establish the tone of a new cycle. Moon & Table adapts this into first-of-year/month/cycle opening without guaranteeing outcomes. |
| Alignment rating | Strong for model pilot after exact source verification |

### Presentation fields

| headline | Offer the first sweetness. |
| --- | --- |
| practice | Place one sweet thing at the table: honey, date, fig, fruit, candy, or a spoon of something sweet. Say one good sentence for the cycle beginning now. Taste the sweet thing, or set it where it can be shared. Close by repeating the sentence once, more plainly. |
| intention | Let sweetness be the first thing offered to the new cycle. |
| bestWindow | On the first day of a year, month, season, or personal cycle. |
| whyThisFits | The source ties calendar beginning to sweet things and good words. This Ritual keeps the material and speech structure while treating sweetness as intention, without promising an outcome. |
| questionToCarry | What first words do you want this cycle to hear? |

### Internal fields for app flow/search

| purpose.primary | opening |
| --- | --- |
| purpose.secondary | marking, connecting, blessing |
| purpose.refinement | sweet_cycle_beginning |
| carriers.primary | table |
| carriers.secondary | words |
| capacity.supports | only_a_little, enough_to_participate |
| audience.supports | me, both_of_us |
| timing.relationship | required |
| availability | findable: yes; directUseEligible: yes; recommendationEligible: source verification needed |
| readiness / review note | Accepted model pilot candidate; excellent calendar app fit. |

# C. Dyer / Brand verification queue

| Verification status
These candidates come from Gemini’s second-opinion source scout. They are promising and should be verified next, but they are not accepted Ritual candidates until exact source locations and source text are checked. They are included here to preserve the decision to pursue them. |
| --- |

## V1. Drawing Silent Water

| Source claim | Gemini second-opinion candidate: Dyer/Brand domestic folkways, exact source to verify. Described as first water drawn in silence at a calendar transition and carried home in a vessel. |
| --- | --- |
| Likely model value | Carrier: vessel/words(silence); Purpose: opening/blessing; model value: silence as ritual word-condition, vessel, calendar threshold. |
| Verification needed | Find exact Dyer/Brand location; confirm silence, first water, timing, material, closure, and claims to exclude. |

## V2. First-Footing Step

| Source claim | Gemini second-opinion candidate: Dyer/Brand domestic folkways, exact source to verify. Described as first entry across threshold with a token of fuel/food/seasoning. |
| --- | --- |
| Likely model value | Carrier: doorway; Purpose: opening/blessing/marking; model value: threshold crossing with carried material and calendar timing. |
| Verification needed | Confirm exact source, avoid gender/hair/luck requirements, identify what token/action is source-supported. |

## V3. Rosemary Windowsill

| Source claim | Gemini second-opinion candidate: Dyer/Brand domestic folkways, exact source to verify. Described as rosemary on windowsill, touched/scented for remembrance. |
| --- | --- |
| Likely model value | Carrier: plant/body; Purpose: remembering/tending; model value: plant + body + scent + memory. |
| Verification needed | Confirm whether windowsill/potted rosemary/touch-scent action is actually in source or a modernized synthesis. |

# 4. First typed Ritual record recommendation

- First typed records: Wet the seed and wait; Set grain at the table; Kindle the first household light.

- Second typed wave after Ovid verification: The Sweet Year; Setting a Place; The Quiet Table.

- Model stress test only for now: The Bean Rite.

- Source verification queue before typing: Drawing Silent Water; First-Footing Step; Rosemary Windowsill.

- Do not let Codex author or revise practice text. Codex should only add reviewed records to an inert typed data file after human approval.

# 5. External engine workflow after this pilot

- Claude and Gemini can act as source scouts and challenge engines.

- They may propose source candidates, exact citations, candidate Rituals, what the source supports, and what must not be imported.

- Human review must verify source locations and approve ritual presentation fields before anything enters the repo.

- Codex should implement types, inert data files, docs, and validation only. It should not invent ritual prose or make source authority decisions.
