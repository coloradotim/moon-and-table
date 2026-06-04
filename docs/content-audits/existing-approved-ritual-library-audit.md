# Existing Approved Ritual Library Audit

Issue: #179

Date: 2026-06-04

This is an audit report only. It does not approve new sources, add active SourceNotes, add SymbolicCards, add RitualPatterns, add RitualPresentation, change scoring, change generator behavior, or change UI.

## 1. Executive Summary

The current approved ritual library has 35 approved `RitualPattern` entries. Eleven have `RitualPresentation`; 24 do not.

Visible route coverage exists across every current route:

| Route | Approved patterns | With RitualPresentation |
| --- | ---: | ---: |
| Home | 22 | 9 |
| Plant | 4 | 1 |
| Kitchen | 16 | 3 |
| Candle or light | 3 | 2 |
| Reflection | 9 | 4 |
| Seasonal | 2 | 1 |
| Surprise me / open route | 35 | 11 |

The library is broad enough for MVP recommendation flow, but approval is not the same as quality. Approved means eligible under the current rules. It does not mean the pattern is good, coherent, source-deep, or grimoire-worthy.

Several approved patterns are weak. Some are promising seeds that need presentation. Some are chores or vague household gestures with ritual language placed on top. If those cannot be given real ritual substance, they should be hidden, merged, replaced, or deferred rather than kept in normal recommendation paths just because they are approved.

Home has the most coverage. Kitchen has many approved ingredient/food/herb cue patterns, but most still read as cue data rather than authored rituals. Plant has a clean anchor in `tend_one_plant`, but the adjacent plant actions have no presentation yet. Seasonal has only two route-mapped patterns.

The obvious thin spots are:

- approved patterns without `RitualPresentation`, especially home alternates, plant alternates, kitchen cues, and end-of-week/closing work
- low/pause-capacity alternatives to `close_the_evening`
- kitchen and herb patterns that have source support but not enough ritual body, carry, or closing language
- "do one tiny household thing" patterns that do not yet answer what the ritual is supposed to do
- seasonal content, where `seasonal_table_home_reset` is carrying most of the authored presentation depth
- material-constraint variants, which are almost absent

The current recommendation-quality report samples 22 scenarios. It selected only 9 distinct patterns. The most selected pattern is `close_the_evening` with 8 selections, followed by `candle_light_focus` with 4 and `end_of_week_closing` with 3. This suggests that some patterns are working as strong anchors, but also that the current library needs more grimoire-ready alternates so the generator has better choices when capacity is low or the check-in asks for home, plant, kitchen, or reflection.

Current warning counts from `npm run recommendation:quality`:

| Warning | Count |
| --- | ---: |
| `pause_with_imperative_steps` | 0 |
| `generic_optional_candle` | 17 |
| `candle_ritual_with_candle_addon` | 0 |
| `focus_timing_unbridged` | 1 |
| `raw_score_language_in_user_copy` | 0 |
| `debug_key_in_user_copy` | 0 |
| `generic_closing_repeated` | 0 |
| `carry_prompt_contradicts_focus` | 0 |
| `best_window_reason_too_thin` | 0 |
| `source_id_visible_in_normal_copy` | 0 |

Recommended first enrichment batch for #180: enrich roughly 13 existing approved patterns that are already source-supported and likely to reduce overuse or thin output without needing new folk-magic source packets:

- `return_one_object`
- `room_reset`
- `end_of_week_closing`
- `shared_space_reset`
- `soften_one_corner`
- `houseplant_check_in`
- `prune_one_dead_leaf`
- `rotate_plant_for_light`
- `bread_enoughness_cue`
- `oats_steady_care_cue`
- `apple_fresh_choice_cue`
- `ordinary_cooking_care_cue`
- `rosemary_kitchen_memory`

Good stretch candidates if #180 has room: `simple_warm_drink` and `lavender_soft_rest_cue`.

Defer deeper boundary, charm, petition, sweetening, container, prosperity, protection, and moon-water style work to the content packet issues #171 through #176.

## 2. Approved Ritual Pattern Inventory

Visible route fit is inferred from each pattern's `ritualStyles` and the current visible check-in routes. `Surprise me / open route` can reach every approved pattern because it leaves practice type open.

| Pattern | Title | Visible route fit | Styles | Capacity | Min | Source notes | Source refs | Presentation | Variants | Audit notes |
| --- | --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| `clear_one_surface` | Clear One Surface | Home; Surprise me | `home_tending`, `surface_reset`, `low_woo` | low, steady | 5 | 2 | 6 | yes | none | Good model presentation; useful bounded home reset. |
| `tend_one_plant` | Tend One Plant | Home, Plant; Surprise me | `plant`, `plant_tending`, `home_tending` | low, steady | 5 | 3 | 8 | yes | none | Good model presentation; plant route still needs adjacent depth. |
| `candle_light_focus` | Candle Light Focus | Candle or light, Reflection; Surprise me | `candle_or_light`, `light_focus`, `reflection` | pause, low, steady | 3 | 1 | 4 | yes | capacity:pause | Good model for focused candle practice; optional accent logic should avoid duplicating candle. |
| `table_reset` | Table Reset | Home, Kitchen; Surprise me | `home_tending`, `kitchen`, `table_reset` | low, steady, high | 15 | 2 | 7 | yes | audience:together | Good together variant; route anchor for table/home/kitchen. |
| `threshold_reset` | Threshold Reset | Home; Surprise me | `home_tending`, `threshold_reset`, `low_woo` | low, steady | 10 | 2 | 7 | yes | none | Good base threshold presentation; deeper charm work belongs to packet workflow. |
| `room_reset` | Room Reset | Home; Surprise me | `home_tending`, `surface_reset`, `low_woo` | low, steady, high | 10 | 2 | 7 | no | none | Approved and source-supported but no presentation; reads more like a reset pattern than grimoire ritual. |
| `close_the_evening` | Close the Evening | Home, Reflection; Surprise me | `home_tending`, `reflection`, `low_woo` | pause, low | 3 | 1 | 5 | yes | capacity:pause | Strong presentation and overused in quality scenarios; needs adjacent low/pause alternatives. |
| `one_clear_sentence` | One Clear Sentence | Reflection; Surprise me | `conversation`, `naming` | low, steady | 5 | 3 | 6 | no | none | Approved but no presentation; likely wait for written/spoken charm or conversation source work before broadening. |
| `tea_ritual` | Tea Pause | Kitchen; Surprise me | `kitchen`, `tea`, `warm` | low, steady | 10 | 3 | 8 | yes | none | Good kitchen presentation model. |
| `simple_warm_drink` | Simple Warm Drink | Kitchen; Surprise me | `kitchen`, `simple_food`, `warm` | steady | 15 | 3 | 8 | no | none | No presentation; kitchen warmth candidate, but avoid recipe/health framing. |
| `bread_enoughness_cue` | Bread Enoughness Cue | Kitchen; Surprise me | `kitchen`, `bread`, `simple_food`, `grounding` | low, steady | 3 | 3 | 7 | no | none | No presentation; good low-capacity kitchen grounding candidate. |
| `oats_steady_care_cue` | Oats Steady Care Cue | Kitchen; Surprise me | `kitchen`, `oats`, `simple_food`, `warm` | low, steady | 3 | 3 | 6 | no | none | No presentation; selected once in scenarios despite thin output risk. |
| `apple_fresh_choice_cue` | Apple Fresh Choice Cue | Kitchen; Surprise me | `kitchen`, `apple`, `freshness`, `simple_food` | low, steady | 3 | 3 | 6 | no | none | No presentation; low-capacity freshness cue needs ritual carry/close. |
| `ordinary_cooking_care_cue` | Ordinary Cooking Care Cue | Home, Kitchen; Surprise me | `kitchen`, `ordinary_cooking`, `simple_food`, `home_tending` | steady | 15 | 4 | 8 | no | none | No presentation; useful but can become chore-like without authored manner. |
| `kitchen_reset` | Kitchen Reset | Home, Kitchen; Surprise me | `kitchen`, `home_tending`, `surface_reset` | low, steady | 10 | 3 | 9 | yes | none | Good kitchen/home presentation model. |
| `return_one_object` | Return One Object | Home; Surprise me | `home_tending`, `surface_reset`, `low_woo` | pause, low | 2 | 1 | 3 | no | none | No presentation; strong low/pause home candidate to reduce Close the Evening overuse. |
| `soften_one_corner` | Soften One Corner | Home; Surprise me | `home_tending`, `atmosphere`, `low_woo` | low, steady | 8 | 2 | 5 | no | none | No presentation; good atmosphere candidate, needs non-decorative ritual language. |
| `window_open_air_reset` | Window Open-Air Reset | Home, Seasonal; Surprise me | `home_tending`, `air`, `seasonal`, `low_woo` | low, steady | 5 | 1 | 3 | no | none | No presentation; source support is practical/air-heavy, needs careful metaphysical bridge or defer deeper clearing. |
| `bed_blanket_rest_cue` | Bed or Blanket Rest Cue | Home, Reflection; Surprise me | `home_tending`, `rest`, `low_woo` | pause, low, steady | 5 | 1 | 3 | yes | capacity:pause | Has pause variant; good rest model. |
| `shared_space_reset` | Shared-Space Reset | Home; Surprise me | `home_tending`, `shared_space`, `table_reset` | steady, high | 15 | 2 | 5 | no | none | No presentation; together/home candidate but needs audience variant. |
| `small_repair` | Make One Thing Easier | Home; Surprise me | `home_tending`, `small_repair`, `structured_action` | steady, high | 20 | 1 | 3 | no | none | No presentation; useful high/steady pattern, but can become productivity unless carefully authored. |
| `end_of_week_closing` | End-of-Week Closing | Home, Reflection; Surprise me | `home_tending`, `reflection`, `closing` | low, steady | 10 | 2 | 5 | no | none | No presentation; selected 3 times and needs close/carry depth. |
| `seasonal_table_home_reset` | Seasonal Table or Home Reset | Home, Seasonal; Surprise me | `seasonal`, `table_reset`, `home_tending`, `threshold_reset` | low, steady | 10 | 3 | 7 | yes | none | Has presentation; seasonal route anchor but only one of two seasonal patterns with presentation. |
| `morning_light_pause` | Morning Light Pause | Home, Candle or light, Reflection; Surprise me | `light_focus`, `candle_or_light`, `reflection`, `low_woo` | pause, low | 3 | 1 | 3 | yes | capacity:pause | Good no-flame light model. |
| `prune_one_dead_leaf` | Prune One Dead Leaf | Home, Plant; Surprise me | `plant`, `plant_tending`, `home_tending` | low, steady | 5 | 3 | 7 | no | none | No presentation; plant route needs this specific action as a ritual, not plant maintenance. |
| `rotate_plant_for_light` | Rotate a Plant for Light | Plant, Candle or light; Surprise me | `plant`, `plant_tending`, `light_focus` | low, steady | 5 | 3 | 7 | no | none | No presentation; plant/light crossover candidate. |
| `salt_boundary_bowl` | Salt Boundary Bowl | Home, Kitchen; Surprise me | `kitchen`, `salt`, `boundary`, `low_woo` | low, steady | 3 | 2 | 5 | no | none | No presentation; approved but deeper boundary/container meaning should wait for #173/#176 packet review. |
| `lemon_freshness_cue` | Lemon Freshness Cue | Home, Kitchen; Surprise me | `kitchen`, `lemon`, `freshness`, `low_woo` | low, steady | 5 | 3 | 7 | no | none | No presentation; can be light kitchen freshness now, but deeper folk meaning should wait. |
| `rosemary_kitchen_memory` | Rosemary Kitchen Memory Cue | Kitchen, Reflection; Surprise me | `kitchen`, `herb`, `rosemary`, `reflection` | low, steady | 5 | 4 | 11 | no | none | No presentation; selected once and has strong note count; good herb/reflection candidate. |
| `houseplant_check_in` | Houseplant Check-In | Home, Plant; Surprise me | `plant`, `plant_tending`, `houseplant`, `home_tending` | low, steady | 3 | 4 | 8 | no | none | No presentation; strong plant route enrichment candidate. |
| `basil_kitchen_warmth_cue` | Basil Kitchen Warmth Cue | Kitchen; Surprise me | `kitchen`, `herb`, `basil`, `warmth` | low, steady | 3 | 4 | 9 | no | none | No presentation; wait for kitchen warmth/sweetening packet if doing beyond simple herb cue. |
| `mint_freshness_cue` | Mint Freshness Cue | Kitchen; Surprise me | `kitchen`, `herb`, `mint`, `freshness` | low, steady | 3 | 4 | 9 | no | none | No presentation; wait for broader ingredient packet if doing beyond simple freshness cue. |
| `thyme_steady_care_cue` | Thyme Steady Care Cue | Kitchen; Surprise me | `kitchen`, `herb`, `thyme`, `steady_care` | low, steady | 3 | 5 | 10 | no | none | No presentation; wait or enrich lightly with existing ordinary-use support. |
| `sage_clear_reflection_cue` | Sage Clear Reflection Cue | Kitchen, Reflection; Surprise me | `kitchen`, `herb`, `sage`, `reflection` | low, steady | 3 | 5 | 10 | no | none | No presentation; clearing language needs care; defer deeper clearing to #173. |
| `lavender_soft_rest_cue` | Lavender Soft Rest Cue | Home, Kitchen, Reflection; Surprise me | `herb`, `lavender`, `rest`, `home_tending` | pause, low, steady | 3 | 4 | 9 | no | none | No presentation; good rest/reflection candidate if kept non-medicinal. |

## Ritual Substance Audit

This rubric is intentionally blunt. The question is not whether a pattern is eligible. The question is whether it has enough ritual substance to deserve recommendation.

Ratings:

- `strong`: clear ritual function, meaningful material/action logic, a reason this action matters, and a clean closure.
- `promising_but_thin`: useful seed, material, or gesture, but it needs stronger source support, better presentation, clearer magical function, or better closure.
- `task_dressed_as_ritual`: mostly a chore, micro-task, or vague household gesture with ritual language placed on top.
- `retire_hide_or_replace`: too weak, repetitive, generic, unsupported, or likely to produce bad recommendations. Hide, merge, replace, retire, or defer until better source support exists.

Questions used:

1. What is this ritual for?
2. Why this action instead of any other small action?
3. What does the material/action mean?
4. What timing, focus, or capacity context makes it appropriate?
5. What changes after it is done?
6. How does it close?
7. Is this actually a ritual, or just a chore / vague gesture with soft language?

| Pattern | Substance rating | Ritual function | Material/action logic | Activation / closure | What it is supposed to do, and why this action | Existing source support enough? | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `clear_one_surface` | `strong` | clearing, making room, bounded household attention | A surface is a visible holder of attention; clearing one surface makes room without moralizing the whole home. | Activate by choosing the bounded surface; close by turning away before it spreads. | Makes one visible place less demanding. This action works because the surface is a contained field, not because cleaning is virtuous. | Yes. | Keep. Use as a model, but watch that it does not become generic cleanup. |
| `tend_one_plant` | `strong` | tending, observation, reciprocal care | The plant is a living household presence; the ritual begins with looking before acting. | Activate by choosing one plant; close by leaving it settled. | Teaches attention before action. This action matters because the plant can answer whether care is needed. | Yes. | Keep. Use as Plant route model. |
| `candle_light_focus` | `strong` | focus, marking, beginning/closing with flame | Flame marks a small field of attention and has a natural close through extinguishing. | Activate by lighting; close by blowing out. | Gives one focus an edge and an ending. This is a real ritual technology. | Yes. | Keep. Optional add-on cleanup belongs to #155. |
| `table_reset` | `strong` | gathering, shared place, household order | The table is a shared vessel/surface for household attention. | Activate by choosing the table/shared surface; close by leaving one place ready. | Makes a shared surface able to hold the next ordinary thing. | Yes. | Keep. Later add more variants if needed. |
| `threshold_reset` | `strong` | threshold, crossing, return | The entry is a crossing point; tending it changes how arrival feels. | Activate at the threshold; close by crossing/stepping away. | Marks the edge between outside and inside. Strong existing ritual logic. | Yes for reset; deeper charms need #172. | Keep. Defer charm/prosperity expansion. |
| `room_reset` | `task_dressed_as_ritual` | unclear: easing a room, clearing, making space | One room/corner is a field, but the current pattern mostly says tidy a cue. | Activation and closure are weak. | It may make a room easier, but it does not yet explain why this room cue matters ritually. | Enough for basic enrichment. | Enrich in #180 or demote/hide. |
| `close_the_evening` | `strong` | closing, boundary, enoughness | Evening is a temporal threshold; the action marks stopping. | Activate by choosing a closing cue; close by letting the pause be the practice. | Ends the day without making another task. Strong, but overused. | Yes. | Keep, but reduce overuse with adjacent low/pause alternatives. |
| `one_clear_sentence` | `promising_but_thin` | naming, speaking, clarity | A sentence can be a spoken/written charm, but current support is not yet enough. | Activation/closure are not defined. | It could clarify one thing, but currently risks becoming communication advice. | Not enough for deep ritual. | Defer to #175/conversation work; hide from prominent use if it produces weak copy. |
| `tea_ritual` | `strong` | warmth, cup, pause, ordinary care | Cup/drink is a household vessel for warmth and return. | Activate by preparing/holding; close by setting cup down. | Gives warmth a container without recipe burden. | Yes. | Keep. Use as Kitchen model. |
| `simple_warm_drink` | `promising_but_thin` | warmth, ordinary nourishment | Warm drink/soup can be a vessel, but current pattern is close to food task. | Activation/closure need definition. | It can hold ordinary care, but needs to avoid health/recipe framing. | Enough for light enrichment. | Enrich as stretch or defer to kitchen warmth packet. |
| `bread_enoughness_cue` | `promising_but_thin` | enoughness, grounding, ordinary nourishment | Bread is an ordinary food/material of enoughness; current pattern needs more ritual shape. | Activation/closure need definition. | Can mark enoughness with one ordinary item instead of a project. | Yes for light enrichment. | Enrich in #180. |
| `oats_steady_care_cue` | `promising_but_thin` | steadiness, care, ordinary nourishment | Oats can carry steady care, but current pattern is mostly a cue. | Activation/closure need definition. | Can support steadiness without a recipe if the action is already ordinary. | Yes for light enrichment. | Enrich in #180. |
| `apple_fresh_choice_cue` | `promising_but_thin` | freshness, choice, small renewal | Apple/freshness logic is understandable but thin. | Activation/closure need definition. | Can mark one fresh choice, but risks diet/health vibes if mishandled. | Enough for light enrichment. | Enrich lightly or defer. |
| `ordinary_cooking_care_cue` | `task_dressed_as_ritual` | care through ordinary cooking | Cooking is meaningful, but current pattern can become "do the cooking" with prettier words. | Activation/closure need strong boundaries. | Should transform an already-planned kitchen action into care, not add a chore. | Yes for careful enrichment. | Enrich carefully or demote. |
| `kitchen_reset` | `strong` | clearing, kitchen threshold, ordinary care | Counter/sink/table section is a practical ritual field. | Activate by choosing one kitchen area; close before it spreads. | Makes the kitchen able to receive the next ordinary act. | Yes. | Keep. Use as Kitchen/Home model. |
| `return_one_object` | `task_dressed_as_ritual` | returning, placing, closure | Returning can be real ritual technology, but current pattern is just putting one thing away. | Activation/closure are barely defined. | It should restore one object to belonging. Without that, it is a micro-chore. | Enough for enrichment. | Enrich in #180 or hide/demote. |
| `soften_one_corner` | `promising_but_thin` | softening, welcome, atmosphere | A corner can hold atmosphere, but current pattern risks decor gesture. | Activation/closure need definition. | Should soften a specific place in the home, not stage a mood. | Enough for enrichment. | Enrich in #180. |
| `window_open_air_reset` | `promising_but_thin` | opening, air, clearing without smoke | Window/door opening is a real threshold action, but source support is mostly practical. | Activate by opening; closure should close/leave/open with intention. | Can mark air and threshold without smoke, but deeper clearing needs support. | Partial. | Enrich only lightly or defer to #173. |
| `bed_blanket_rest_cue` | `strong` | rest, containment, stopping | Bed/blanket is a rest container; the action has clear capacity logic. | Activate by choosing rest object; close by letting rest be enough. | Makes rest a bounded ritual instead of a failure to do more. | Yes. | Keep. Use as rest model. |
| `shared_space_reset` | `task_dressed_as_ritual` | shared attention, household field | Shared space can be a communal field, but current pattern is mostly tidy/arrange. | Activation/closure need audience-specific shape. | Should tend the space between people without becoming cleanup or therapy. | Enough for enrichment. | Enrich with `together` variant in #180 or hide from together recommendations. |
| `small_repair` | `task_dressed_as_ritual` | repair, making easier, practical magic | Repair can be strong ritual technology, but current pattern is too productivity-adjacent. | Activation/closure weak. | Should make one thing easier as an act of care; currently risks becoming a task list. | Thin but workable. | Defer or replace with stronger repair ritual; hide if it surfaces poorly. |
| `end_of_week_closing` | `promising_but_thin` | closing, weekly threshold, release | Week-end is a temporal threshold; action logic is clear but underwritten. | Activation/closure need stronger ritual presentation. | Closes one loop and leaves the rest. This should be stronger than it is. | Yes. | Enrich in #180. |
| `seasonal_table_home_reset` | `strong` | seasonal threshold, table/home marker | A table/home object can hold seasonal transition. | Activate by choosing one ordinary place; close by letting it carry the seasonal note. | Gives seasonal timing a household form. | Yes for current scope. | Keep. Later deepen seasonal route via packets. |
| `morning_light_pause` | `strong` | light, attention, beginning | Ordinary light is the material field; no flame required. | Activate by standing/sitting near light; close by moving on. | Lets light mark one useful focus. Strong no-flame ritual. | Yes. | Keep. Use as light model. |
| `prune_one_dead_leaf` | `task_dressed_as_ritual` | release, plant tending, removal | Pruning a dead leaf can be clear release technology, but current pattern is plant maintenance. | Activation/closure need definition. | Should let removal be precise and bounded. Without presentation, it is a chore. | Yes for enrichment. | Enrich in #180. |
| `rotate_plant_for_light` | `task_dressed_as_ritual` | orientation, light, support | Turning toward light is meaningful, but current pattern is a care instruction. | Activation/closure need definition. | Should shift orientation toward support, not just rotate a pot. | Yes for enrichment. | Enrich in #180. |
| `salt_boundary_bowl` | `retire_hide_or_replace` | boundary, container, salt | Salt/bowl could be strong ritual technology, but source depth and claims boundaries are not ready. | Activation/closure not sufficiently defined. | It risks making boundary/protection implications without packet support. | Not enough for deep use. | Hide/defer until #173/#176; replace with reviewed packet-backed ritual later. |
| `lemon_freshness_cue` | `promising_but_thin` | freshness, clearing edge | Lemon/freshness is understandable but shallow. | Activation/closure need definition. | Can mark freshness, but risks being a vague scent/object cue. | Enough for light enrichment only. | Enrich lightly or defer. |
| `rosemary_kitchen_memory` | `promising_but_thin` | memory, kitchen attention, reflection | Rosemary has source support as kitchen/herb symbol, but ritual form is missing. | Activation/closure need definition. | Should use memory as attention, not as a claim. | Yes for light enrichment. | Enrich in #180. |
| `houseplant_check_in` | `promising_but_thin` | observation, care, plant companionship | Looking first is meaningful; material/action logic is clear but underwritten. | Activate by choosing a plant; close by not acting if no care is needed. | Makes observation itself a ritual. | Yes. | Enrich in #180. |
| `basil_kitchen_warmth_cue` | `promising_but_thin` | warmth, kitchen herb | Basil/warmth has a seed, but too much deeper meaning belongs to #174. | Activation/closure need definition. | Could mark warmth, but current form is a material cue. | Partial. | Defer or enrich only after #174 direction. |
| `mint_freshness_cue` | `promising_but_thin` | freshness, clearing attention | Mint/freshness has a seed, but current form is a material cue. | Activation/closure need definition. | Could mark freshness, but risks vague correspondence. | Partial. | Defer or enrich lightly later. |
| `thyme_steady_care_cue` | `promising_but_thin` | steady care, kitchen herb | Thyme/steady care has a seed but no ritual form. | Activation/closure need definition. | Could mark steadiness, but currently thin. | Partial. | Defer or enrich later. |
| `sage_clear_reflection_cue` | `retire_hide_or_replace` | clearing, reflection | Sage/clearing is claim-risky and culturally/source-sensitive if stretched. | Activation/closure not ready. | Too likely to imply cleansing/protection without packet support. | Not enough for deep use. | Hide/defer until #173; replace with reviewed clearing ritual if needed. |
| `lavender_soft_rest_cue` | `promising_but_thin` | rest, softening | Lavender/rest has a seed but must avoid medicinal calm/sleep claims. | Activation/closure need definition. | Can cue softness if framed as object/attention, not effect. | Enough for light enrichment. | Stretch candidate for #180. |

## 4. Coverage By Visible Route

| Route | Approved patterns | With presentation | Capacity range | Assessment |
| --- | ---: | ---: | --- | --- |
| Home | 22 | 9 | pause, low, steady, high | Broadest route. It has enough variety on paper, but many approved alternates lack presentation. The route leans on `close_the_evening`, `clear_one_surface`, `table_reset`, and `threshold_reset` for authored feel. |
| Plant | 4 | 1 | low, steady | Too thin for a visible route. `tend_one_plant` is strong, but `houseplant_check_in`, `prune_one_dead_leaf`, and `rotate_plant_for_light` need presentation so plant does not collapse into one ritual. |
| Kitchen | 16 | 3 | pause, low, steady, high | Many approved patterns, but most are cue-level food/herb/ingredient patterns with no presentation. This route has breadth, not enough grimoire depth. |
| Candle or light | 3 | 2 | pause, low, steady | Small but comparatively strong. `candle_light_focus` and `morning_light_pause` are useful models. `rotate_plant_for_light` is a crossover, not a core light ritual. |
| Reflection | 9 | 4 | pause, low, steady | Moderate coverage. `one_clear_sentence`, `end_of_week_closing`, and herb/reflection cues need presentation or future packet support. |
| Seasonal | 2 | 1 | low, steady | Thin. `seasonal_table_home_reset` has presentation; `window_open_air_reset` needs more ritual language, but deeper seasonal/material rites should wait for packets. |
| Surprise me / open route | 35 | 11 | pause, low, steady, high | Can technically reach the whole library, but open-route quality depends on whether selected patterns have presentation. |

Obvious route gaps:

- Plant needs two or three more authored plant presentations before it feels like a real route.
- Kitchen needs authored low-capacity food/herb/cup/bowl style presentations before adding new material families.
- Seasonal needs more source-backed content, but #180 should not invent new seasonal practices. It can safely improve `window_open_air_reset` only if kept within current source support.
- Reflection needs `end_of_week_closing` and maybe `rosemary_kitchen_memory` before broader written charm work.

## 5. Presentation-Depth Audit

Patterns with no `RitualPresentation`:

- `room_reset`
- `one_clear_sentence`
- `simple_warm_drink`
- `bread_enoughness_cue`
- `oats_steady_care_cue`
- `apple_fresh_choice_cue`
- `ordinary_cooking_care_cue`
- `return_one_object`
- `soften_one_corner`
- `window_open_air_reset`
- `shared_space_reset`
- `small_repair`
- `end_of_week_closing`
- `prune_one_dead_leaf`
- `rotate_plant_for_light`
- `salt_boundary_bowl`
- `lemon_freshness_cue`
- `rosemary_kitchen_memory`
- `houseplant_check_in`
- `basil_kitchen_warmth_cue`
- `mint_freshness_cue`
- `thyme_steady_care_cue`
- `sage_clear_reflection_cue`
- `lavender_soft_rest_cue`

Patterns with presentation but needing more variants:

- `clear_one_surface`: good base presentation, no capacity variant. It may not need one now.
- `tend_one_plant`: good base presentation, but no capacity variant. Adjacent plant patterns matter more.
- `table_reset`: has a `together` variant; could eventually use low/high variants, but it is not the first gap.
- `threshold_reset`: good base presentation; deeper charm variants should wait for #172.
- `seasonal_table_home_reset`: good base seasonal presentation; no capacity variant.
- `tea_ritual`: good base kitchen presentation; no material constraint variant for no tea/warm-drink alternatives.

Patterns that need capacity variants:

- `return_one_object`: should have `pause` and `low` variants because it supports both and can reduce `close_the_evening` overuse.
- `end_of_week_closing`: should have low and steady variants so it can be a real closing ritual, not a reflection stub.
- `room_reset`: should have low/steady/high variants because it spans all three.
- `lavender_soft_rest_cue`: should have pause/low/steady variants if enriched, and must stay non-medicinal.

Patterns that need audience variants:

- `shared_space_reset`: needs a `together` variant because its main product use is shared household space.
- `end_of_week_closing`: could use `solo` and `together` variants, but start with the base ritual unless scope is tight.
- `ordinary_cooking_care_cue`: could use household/together framing if #180 includes it.

Patterns that need material constraint variants:

- `candle_light_focus`: already good, but true `candleFree` optional-accent cleanup belongs to #155.
- `simple_warm_drink`: could use non-food/non-drink variant, but this may wait for kitchen warmth packet work.
- herb and ingredient cues: should not introduce new materials. Any variants should use already-available ordinary household forms only.

Patterns that read like tasks more than rituals:

- `room_reset`
- `small_repair`
- `shared_space_reset`
- `ordinary_cooking_care_cue`
- `prune_one_dead_leaf`
- `rotate_plant_for_light`
- `return_one_object`

Good presentation models:

- `clear_one_surface`: bounded, non-moralizing, clear close.
- `tend_one_plant`: attention before action.
- `tea_ritual`: kitchen warmth without recipe burden.
- `bed_blanket_rest_cue`: rest cue with pause variant.
- `morning_light_pause`: no-flame light practice.
- `kitchen_reset`: practical reset with enough ritual shape.
- `candle_light_focus`: coherent ritual body and close.

## 6. Source-Support Audit

Existing source support is sufficient for focused presentation enrichment in these areas:

- Home tending and bounded domestic care: `return_one_object`, `room_reset`, `soften_one_corner`, `shared_space_reset`, and `end_of_week_closing` can use existing notes such as `note.home_tending_small_enough`, `note.home_tending_attention_care`, and `note.home_atmosphere_without_overclaim`.
- Plant tending: `houseplant_check_in`, `prune_one_dead_leaf`, and `rotate_plant_for_light` are supported by plant check-first and pet/plant access notes. These can be enriched as practical plant rituals without adding new botanical claims.
- Ordinary kitchen nourishment: `bread_enoughness_cue`, `oats_steady_care_cue`, `apple_fresh_choice_cue`, and `ordinary_cooking_care_cue` have existing ordinary-use and food/herb boundary notes. They can be enriched if they avoid recipe burden, health claims, and moralized nourishment.
- Rosemary and lavender cues: `rosemary_kitchen_memory` and `lavender_soft_rest_cue` have several source notes and practical boundaries. They can be enriched lightly if kept symbolic, ordinary-use, and non-medicinal.

Source support is too generic or should wait for packet review in these areas:

- `salt_boundary_bowl`: approved, but deeper boundary, protection, bowl, and container meaning should wait for #173 and/or #176. A very light presentation could be possible, but it is not a first #180 pick.
- `sage_clear_reflection_cue`: clearing language can easily slip into unsupported cleansing/protection claims. Defer deeper work to #173.
- `one_clear_sentence`: supported by Mercury/numerology notes, but broader written/spoken charm and conversation-like ritual needs #175 and the separate conversation work.
- `basil_kitchen_warmth_cue`, `mint_freshness_cue`, and `thyme_steady_care_cue`: existing herb notes are enough for simple cue-level content, but richer magical language should wait for kitchen warmth/sweetening/ingredient packet work.
- `window_open_air_reset`: current support is strong as a smoke-free/practical air reset, but source support for deeper clearing or blessing is thin. It can be enriched only as open-air attention, not as guaranteed clearing.

Current content that is better treated as context-only until packets land:

- prosperity/luck/protection language under salt, threshold, cinnamon, keys, coins, or bowls
- written petitions, folded paper, spoken formulas, or charm language
- moon water, lunar vessels, jars, bowls, and carried objects
- sweetening or affection magic beyond ordinary warmth and welcome

No source text should be copied into #180. Use existing transformed SourceNotes and approved patterns only.

## 7. Recommendation-Quality Report Findings

`npm run recommendation:quality` sampled 22 scenarios.

Selected pattern frequency:

| Pattern | Times selected |
| --- | ---: |
| `close_the_evening` | 8 |
| `candle_light_focus` | 4 |
| `end_of_week_closing` | 3 |
| `tend_one_plant` | 2 |
| `morning_light_pause` | 1 |
| `rosemary_kitchen_memory` | 1 |
| `oats_steady_care_cue` | 1 |
| `seasonal_table_home_reset` | 1 |
| `room_reset` | 1 |

Warning counts:

| Warning | Count |
| --- | ---: |
| `pause_with_imperative_steps` | 0 |
| `generic_optional_candle` | 17 |
| `candle_ritual_with_candle_addon` | 0 |
| `focus_timing_unbridged` | 1 |
| `raw_score_language_in_user_copy` | 0 |
| `debug_key_in_user_copy` | 0 |
| `generic_closing_repeated` | 0 |
| `carry_prompt_contradicts_focus` | 0 |
| `best_window_reason_too_thin` | 0 |
| `source_id_visible_in_normal_copy` | 0 |

Warnings by selected pattern:

| Pattern | Warning notes |
| --- | --- |
| `close_the_evening` | 8 generic optional candle warnings; 1 focus/timing bridge warning |
| `tend_one_plant` | 2 generic optional candle warnings |
| `rosemary_kitchen_memory` | 1 generic optional candle warning |
| `oats_steady_care_cue` | 1 generic optional candle warning |
| `end_of_week_closing` | 3 generic optional candle warnings |
| `seasonal_table_home_reset` | 1 generic optional candle warning |
| `room_reset` | 1 generic optional candle warning |

Interpretation:

- `close_the_evening` is doing too much work in pause/low-capacity scenarios. It is good content, but overuse suggests missing adjacent low/pause home/reflection patterns with presentation.
- Generic optional candle remains the main report warning. #180 can reduce it indirectly only if presentation gives better pattern-specific optional/carry/closing material. Broad optional-accent replacement belongs to #155.
- `focus_timing_unbridged` remains a meaning-bridge problem and should be deferred to #154.
- Kitchen and herb cues are starting to appear in scenarios (`oats_steady_care_cue`, `rosemary_kitchen_memory`), but without presentation they risk thin output when selected.
- The report currently does not exercise many approved patterns. #180 should add or update quality scenarios for non-winning but important enriched patterns after the presentations are added.

Candidate quality scenarios to add later:

- pause or low capacity with `return_one_object` as a healthy alternate to `close_the_evening`
- low capacity with plant route selecting `houseplant_check_in`, `prune_one_dead_leaf`, or `rotate_plant_for_light`
- kitchen route selecting bread/oats/apple without recipe or health framing
- together/shared-space scenario selecting `shared_space_reset`
- end-of-week/waning closing selecting `end_of_week_closing` with a specific closing
- herb/reflection scenario selecting `rosemary_kitchen_memory` without medical or deterministic memory claims
- rest scenario selecting `lavender_soft_rest_cue` without medicinal calm claims

What #180 might improve:

- presentation coverage
- selected-output specificity for current approved patterns
- overuse pressure on `close_the_evening`
- thin kitchen/plant/reflection output when those patterns win
- some generic optional-candle warnings if optional language becomes more contextual

What #180 should defer:

- meaning bridges for timing/focus tension: #154
- broad contextual optional add-ons and carry prompt logic: #155
- moon water/lunar materials: #171
- threshold charms and monthly rites: #172
- boundary/clearing/protection: #173
- sweetening/warmth/affection folk practices: #174
- written charms/petitions/spoken words: #175
- containers/jars/bowls/carried objects: #176

## 8. Enrichment Priority List

Recommended first #180 batch:

| Pattern | Why it matters | Existing source support | Enrichment needed | Ready now? | Expected quality effect |
| --- | --- | --- | --- | --- | --- |
| `return_one_object` | Strong pause/low home alternate to `close_the_evening`. | `note.home_tending_small_enough`; Cheryl Mendelson; practical reference family. | Full presentation with pause/low variants, carry prompt, and clean close. | Yes. | Reduces overuse; gives low-capacity home a concrete ritual shape. |
| `room_reset` | Approved Home pattern spanning low/steady/high but no presentation. | Home-tending notes and starter home batch references. | Presentation that makes room reset bounded and ritual-like, with capacity variants. | Yes. | Makes Home route broader without new content. |
| `end_of_week_closing` | Selected 3 times; currently thin. | Home-tending attention plus waning moon clear/rest note. | Full presentation with closing language and maybe low/steady variants. | Yes. | Improves closing/reflection quality and reduces generic output. |
| `shared_space_reset` | Important for together/household use. | Home small-enough and atmosphere notes. | Presentation plus `together` audience variant. | Yes. | Makes shared recommendations feel less task-like and more household-specific. |
| `soften_one_corner` | Adds atmosphere/home warmth without new categories. | Home atmosphere and small-enough notes. | Presentation that avoids decor-only framing; strong carry/close. | Yes. | Adds warm domestic variety to Home. |
| `houseplant_check_in` | Plant route needs more than `tend_one_plant`. | Plant observation/check-first and pet/plant access notes. | Presentation emphasizing observation before action. | Yes. | Makes Plant route more specific and lower-pressure. |
| `prune_one_dead_leaf` | Useful plant/waning/clearing action. | Plant check-first and practical plant boundary notes. | Presentation that makes pruning a small release ritual, not maintenance. | Yes. | Strengthens plant and waning/clearing fit. |
| `rotate_plant_for_light` | Plant/light crossover. | Plant check-first and access notes. | Presentation around moving toward light without overclaiming. | Yes. | Adds non-candle light depth and plant variety. |
| `bread_enoughness_cue` | Low-capacity kitchen grounding pattern. | Bread everyday nourishment, kitchen normal use, food/herb boundaries. | Presentation with no recipe or health claim; clean carry/close. | Yes. | Gives Kitchen a tiny grounded ritual. |
| `oats_steady_care_cue` | Already selected once; thin if selected. | Oats steady care and kitchen normal-use notes. | Presentation around steadiness and ordinary care. | Yes. | Improves a pattern that already appears in scenarios. |
| `apple_fresh_choice_cue` | Simple freshness/choice kitchen cue. | Kitchen normal use and food/herb boundaries. | Presentation around one fresh choice, not diet/health. | Yes. | Adds kitchen freshness without new source work. |
| `ordinary_cooking_care_cue` | Could be powerful but can sound like chore/productivity. | Ordinary cooking as care plus kitchen normal-use notes. | Presentation that frames an already-planned kitchen action as ritual, with no extra recipe burden. | Yes. | Makes practical kitchen content feel grimoire-like. |
| `rosemary_kitchen_memory` | Selected once; has strong source-note coverage. | Kitchen normal use, food/herb boundaries, pet/plant access, ingredient cross-check. | Presentation around memory/attention without medicinal or certainty claims. | Yes, if light. | Adds herb/reflection depth and improves selected output. |

Good stretch candidates:

| Pattern | Reason |
| --- | --- |
| `simple_warm_drink` | Good kitchen warmth candidate, but should avoid recipe/health advice. If enriched, keep it ordinary and source-bounded. |
| `lavender_soft_rest_cue` | Useful rest/reflection candidate, but must stay non-medicinal and avoid calm/sleep promises. |

Defer or handle with caution:

| Pattern | Reason |
| --- | --- |
| `salt_boundary_bowl` | Needs #173/#176 for deeper boundary/container meaning. |
| `sage_clear_reflection_cue` | Clearing language should wait for #173. |
| `one_clear_sentence` | Written/spoken charm and conversation-adjacent content should wait for #175 and conversation source work. |
| `basil_kitchen_warmth_cue` | Better after #174 if the product wants sweetening/warmth depth. |
| `mint_freshness_cue` | Better after ingredient/folk packet work unless kept very light. |
| `thyme_steady_care_cue` | Better as later kitchen/herb enrichment. |
| `lemon_freshness_cue` | Could be light kitchen freshness now, but deeper lemon symbolism should wait. |
| `small_repair` | Useful, but needs care not to become productivity software. Consider after low-capacity alternates. |
| `window_open_air_reset` | Useful, but source support is more practical than magical. Enrich carefully or wait for boundary/clearing packet. |

## 9. Suggested #180 Implementation Scope

#180 should be a focused enrichment PR, not a full library rewrite.

Recommended #180 scope:

- Add `RitualPresentation` to 10-13 existing approved patterns:
  - `return_one_object`
  - `room_reset`
  - `end_of_week_closing`
  - `shared_space_reset`
  - `soften_one_corner`
  - `houseplant_check_in`
  - `prune_one_dead_leaf`
  - `rotate_plant_for_light`
  - `bread_enoughness_cue`
  - `oats_steady_care_cue`
  - `apple_fresh_choice_cue`
  - `ordinary_cooking_care_cue`
  - `rosemary_kitchen_memory`
- Add capacity variants where they clearly matter:
  - `return_one_object`: `pause`, `low`
  - `room_reset`: low/steady/high if useful
  - `end_of_week_closing`: low/steady
- Add an audience variant:
  - `shared_space_reset`: `together`
- Keep all presentation language inside existing pattern scope and source support.
- Do not add new actions, materials, claims, or source-derived meanings outside existing pattern data.

Tests to add or update:

- validation accepts the new presentations
- enriched patterns still pass pattern validation
- no private data or copied source text appears in presentation fields
- generated brief uses presentation for at least one newly enriched home pattern
- generated brief uses presentation for at least one newly enriched plant pattern
- generated brief uses presentation for at least one newly enriched kitchen pattern
- pause/low-capacity enrichment does not reintroduce `No required ritual` plus task-list shape
- quality report still runs

Recommendation quality scenarios to update or add:

- low-capacity `return_one_object` scenario
- plant route scenario that can select an enriched plant alternate
- kitchen route scenario that can select a bread/oats/apple/ordinary-cooking pattern
- together shared-space scenario
- end-of-week/closing scenario
- rosemary reflection scenario

Warning counts that may improve:

- `generic_optional_candle` may improve indirectly if enriched presentations provide better pattern-specific optional/carry/closing material, but broad optional-add-on logic belongs to #155.
- `pause_with_imperative_steps` should remain 0.
- `generic_closing_repeated` should remain 0.

Explicit deferrals:

- #154: meaning bridges for timing/focus/practice/capacity tensions.
- #155: contextual optional add-ons and broader carry prompt cleanup.
- #171-#176: new folk-magic packets and deeper material practices.
- Conversation as a visible route or profile preference remains deferred until its own source/content work.

The goal for #180 should be quality depth in already-approved content: more patterns should feel like rituals from the private household grimoire before the library adds moon water, cinnamon threshold rites, written charms, containers, or other new folk-magic families.

## 10. Post-#180 Batch 1 Outcome

Issue #180 was updated after this audit. The implemented direction became
coverage-driven Batch 1 content rather than enriching a fixed numeric set of
legacy patterns.

The Batch 1 implementation uses only the source families approved in issue
#180 and adds new source-backed grimoire patterns across Home, Plant, Kitchen,
Candle or light, Reflection, and Seasonal. Weak legacy patterns were not
preserved simply because they were approved.

Demoted or replaced legacy patterns:

- `close_the_evening`
- `room_reset`
- `one_clear_sentence`
- `simple_warm_drink`
- `ordinary_cooking_care_cue`
- `return_one_object`
- `soften_one_corner`
- `window_open_air_reset`
- `shared_space_reset`
- `small_repair`
- `end_of_week_closing`
- `prune_one_dead_leaf`
- `rotate_plant_for_light`
- `salt_boundary_bowl`
- `houseplant_check_in`
- `sage_clear_reflection_cue`

Representative replacements:

- `bank_the_house_light` for evening/rest closure
- `salt_clear_water_release` for clearing
- `plant_witness_to_growth`, `dead_leaf_release`, and `dormant_green_rest` for Plant
- `warm_cup_between_us`, `grain_bowl_beginning`, `quiet_welcome`, and `honeyed_word` for Kitchen
- `first_light_at_the_threshold`, `full_light_on_the_table`, and `darkening_light` for Candle or light
- `folded_phrase_vessel`, `waning_phrase_release`, `two_words_at_the_table`, and `last_word_first_word` for Reflection
- `seasonal_marker_bowl`, `seasonal_entry_bowl`, and `clear_the_threshold_bowl` for Seasonal

The recommendation quality report now tracks Batch 1 source coverage,
RitualPresentation coverage, weak-pattern flags, must-support coverage,
nice-to-have status, demotions, and timing-honesty warnings.
