# Post-191 Source Packet Review

## 1. PR / Branch Summary

- PR number and title: #199, "Add domestic threshold source packet"
- PR URL: <https://github.com/coloradotim/moon-and-table/pull/199>
- Branch name: `codex/issue-191-source-packet-2`
- Base branch: `main`
- Commit SHA: `2ceb56b536cd2747f92a94b690665fa9a385727b`
- Issue addressed: #191, "Source Packet 2: Review domestic vessel, threshold, clearing, and welcome technologies"

Short implementation summary:

PR #199 adds one source packet document for domestic threshold, vessel, clearing, bread/grain, honey/welcome, written phrase, and calendar-threshold ritual technologies. It reviews only the six sources named in #191 and turns Tim's review-decision comment into explicit packet guardrails. It does not implement active recommendation content.

Files changed, grouped by purpose:

| Purpose | Files |
| --- | --- |
| Source packet document | `docs/content-packets/domestic-threshold-vessel-welcome-source-packet.md` |
| Human-review packet | `docs/content-audits/post-191-source-packet-review.md` |
| Docs updates | None outside the two packet/review docs |
| Source review support files | None |
| Tests | None |
| Anything else | None |

No-active-content verification:

| Area | Changed? | Notes |
| --- | --- | --- |
| Active SourceNotes added | No | Candidate SourceNotes only, inside the source packet/review docs. |
| SymbolicCards added | No | Candidate SymbolicCards only, inside the source packet/review docs. |
| RitualPatterns added/revised/demoted | No | Candidate and rebuild targets only. Existing data files are untouched. |
| RitualPresentation copy changed | No | Presentation direction only. |
| Scoring changed | No | No generator/scoring files changed. |
| UI changed | No | No UI files changed. |
| New visible categories added | No | The packet maps to existing routes only. |
| Source wording copied into product content | No | No source text is copied into active app content. |
| Sources outside #191 used | No active source selection outside #191 | The packet reviews only the six #191 sources. Bibliographic URLs are reference metadata only. |

Expected answer for active content/scoring/UI is "no," and that is what this PR does.

## 2. Validation Commands

Validation after adding the source packet and review packet:

| Command | Result | Notes |
| --- | --- | --- |
| `npm run lint:content` | Passed | Content lint passed with no findings. |
| `npm run typecheck` | Passed | TypeScript completed with no errors. |
| `npm run test -- tests/unit/source-registry.test.ts` | Passed | 1 file, 18 tests passed. |
| `npm run diagnose:content` | Passed | Diagnostics ran successfully; no source-note registry issue introduced. |
| `npm run test` | Passed | 26 files, 287 tests passed. |
| `npm run check` | Passed | Content lint, typecheck, build, unit tests, and 2 Playwright tests passed. |

No command was skipped. The full check emitted the existing Vite bundle-size warning only; it did not fail and should not block merge.

## 3. Source Review Summary Table

| Source | Classification | Best use | Main risk | Use in active content later? |
| --- | --- | --- | --- | --- |
| William Henderson, _Notes on the Folk-Lore of the Northern Counties of England and the Borders_ | adaptation candidate / context only | Regional threshold, first crossing, carried/placed object, household-entry mechanics | Omen-heavy, fear-based, local, and sometimes unsuitable as private practice | Yes, but only with exact location notes and transformed mechanics; not as broad user-facing lineage |
| T. F. Thiselton-Dyer, _English Folk-lore_ | context only / adaptation candidate | Cross-checking English household, salt/water, bread/grain, and seasonal motifs | Broad compilation can become generic folklore flavor without real ritual logic | Mostly as cross-check/context; not strong enough alone |
| John Brand / Henry Ellis, _Observations on Popular Antiquities_ | ritual technology source | Calendar customs, threshold/crossing, first/last forms, bread/grain/table occasion structure | Antiquarian customs can pull the app toward reenactment or superstition cataloguing | Yes, as source-backed technology after exact SourceNotes are reviewed |
| Robert Chambers, _The Book of Days_ | ritual technology source | Calendar thresholds, first/last days, month turns, seasonal entry, almanac-like timing support | Huge calendar miscellany can become trivia or holiday feed | Yes, especially for future timing support, but not as date-lore feed |
| Charlotte Sophia Burne / G. L. Gomme, _The Handbook of Folklore_ | ritual technology source for classification / context only for meaning | Source discipline, classifying custom vs belief vs mechanic | Methodological source can be mistaken for ritual content | Yes, as review/classification support, not as a standalone meaning source |
| John George Hohman, _Pow-Wows; or Long Lost Friend_ | restricted mechanics-only | Written, folded, carried, placed phrase mechanics; duration and return/closure | Extremely high risk of charm copying, prayer/remedy/protection/coercion extraction, and spell-database feel | Only if kept mechanics-only and generally not user-facing lineage |

Blunt read: Brand/Ellis and Chambers are the strongest useful sources. Burne/Gomme is useful discipline, not ritual content. Henderson and Thiselton-Dyer are interesting but risky as primary sources. Hohman is dangerous if treated as content and acceptable only as restricted structure.

## 4. Per-Source Review Cards

### William Henderson

- Source name: William Henderson
- Exact title: _Notes on the Folk-Lore of the Northern Counties of England and the Borders_
- Author / editor: William Henderson
- Publisher / collection: Longmans, Green, Reader, and Dyer, London
- URL: <https://openlibrary.org/books/OL7180858M/Notes_on_the_folk-lore_of_the_northern_counties_of_England_and_the_borders.>
- Source type: Regional folklore collection / antiquarian compilation
- Publication date / copyright or public-domain status if knowable: 1866; public-domain source family
- What parts were actually reviewed: Issue-directed source suitability, bibliographic identity, and candidate fit for threshold/household mechanics. Exact page-level extraction is not done in this PR.
- Why it belongs: It can support regional threshold, first crossing, carried object, and household-entry mechanics.
- What it supports: Threshold/crossing/key/return, some household object mechanics, calendar/entry context.
- What not to extract: Bad-luck threats, supernatural danger framing, gendered first-foot beliefs, death/corpse customs, fear-based warding, medical remedies, prayers, copied phrasing.
- Source limitations: Regional and antiquarian; not a universal household practice source.
- Cultural/source sensitivity notes: Treat as documented regional folklore, not generic "folk magic."
- Classification: adaptation candidate / context only
- Categories supported: Home strong; Seasonal limited; Reflection limited when phrase/object mechanics exist; Kitchen limited; Plant none; Candle or light none from this packet.
- Ritual forms supported: threshold/crossing/key/return strong as context; first/last/calendar threshold limited; bowl/cup/vessel/emptying limited; salt/water/clearing risky; bread/grain/table/welcome limited; honey/warm cup weak; written/folded/carried phrase weak.
- SourceNote candidates: `threshold_crossing_as_arrival_not_clearing`, `key_as_returnable_threshold_marker`, `domestic_folklore_without_bad_luck_command`
- SymbolicCard candidates: Doorway, First Crossing, Key Returned
- RitualPattern candidates or rebuild targets: `carried_key_word`, `doorway_arrival_word`, `placed_phrase_at_the_door`
- RitualPresentation direction: If used, make threshold/entry material and narrow. Do not import omen language.
- Avoid/demote guidance: Do not use Henderson to justify protection, luck, bad-luck avoidance, or generic threshold fallback.

### T. F. Thiselton-Dyer

- Source name: T. F. Thiselton-Dyer
- Exact title: _English Folk-lore_
- Author / editor: T. F. Thiselton-Dyer
- Publisher / collection: Hardwicke & Bogue, London
- URL: <https://openlibrary.org/books/OL7131508M/English_folk-lore>
- Source type: English folklore compilation
- Publication date / copyright or public-domain status if knowable: 1878; public-domain source family
- What parts were actually reviewed: Issue-directed source suitability and candidate use for cross-checking domestic motifs. Exact page-level extraction is not done in this PR.
- Why it belongs: It can cross-check common English household, calendar, threshold, salt/water, and bread/grain motifs.
- What it supports: Context and corroboration, especially when another source gives stronger ritual form support.
- What not to extract: General superstition claims, omen threats, prayers, charms, copied anecdotes, guaranteed luck/protection/prosperity/relationship claims.
- Source limitations: Broad compilation; too weak and generic as a sole active source for grimoire content.
- Cultural/source sensitivity notes: Historical compilation, not living-practice authority.
- Classification: context only / adaptation candidate
- Categories supported: Home context; Kitchen context; Seasonal context; Reflection limited; Plant none; Candle or light none from this packet.
- Ritual forms supported: threshold/crossing/key/return context; salt/water/clearing context; bread/grain/table/welcome context; first/last/calendar threshold context; vessel/written/honey weak.
- SourceNote candidates: `domestic_folklore_without_bad_luck_command`, `folklore_collection_classification_discipline`
- SymbolicCard candidates: Bread Center, Empty Bowl, Rinsed Bowl as cross-check only
- RitualPattern candidates or rebuild targets: `salt_clear_water_release`, `grain_bowl_beginning`, `bread_at_the_center`
- RitualPresentation direction: Use only to support already-specific material logic, not to add folklore flavor.
- Avoid/demote guidance: Do not use as a grab bag for new materials.

### John Brand / Henry Ellis

- Source name: John Brand / Henry Ellis
- Exact title: _Observations on Popular Antiquities: Chiefly Illustrating the Origin of our Vulgar Customs, Ceremonies, and Superstitions_
- Author / editor: John Brand; revised and enlarged by Sir Henry Ellis
- Publisher / collection: Charles Knight and Co., London, 1841 edition
- URL: <https://openlibrary.org/books/OL19474349M/Observations_on_popular_antiquities>
- Source type: Antiquarian customs and calendar compilation
- Publication date / copyright or public-domain status if knowable: 1841 edition; public-domain source family
- What parts were actually reviewed: Issue-directed source suitability for customs, first/last forms, threshold/crossing, bread/grain/table, and seasonal household occasion. Exact page-level extraction is not done in this PR.
- Why it belongs: It can support ritual technology around custom structure and household occasion without needing to copy ritual scripts.
- What it supports: Threshold/crossing, first/last, calendar threshold, bread/grain/table, event-specific household action.
- What not to extract: Bad-luck-if logic, gendered customs, coercive or outcome-based practices, prayers, church/festival reenactment, copied phrasing.
- Source limitations: Antiquarian tone can make the app feel like superstition cataloguing if overused.
- Cultural/source sensitivity notes: Historically bounded British customs; do not universalize.
- Classification: ritual technology source
- Categories supported: Home strong; Kitchen strong; Seasonal strong; Reflection moderate; Candle or light limited; Plant none.
- Ritual forms supported: threshold/crossing/key/return strong; bread/grain/table/welcome strong; first/last/calendar threshold strong; vessel/emptying moderate; salt/water/clearing moderate; written/folded phrase moderate; honey/warm cup limited.
- SourceNote candidates: `threshold_crossing_as_arrival_not_clearing`, `key_as_returnable_threshold_marker`, `bread_at_entry_as_household_welcome`, `bread_at_the_center`, `first_last_custom_as_temporal_boundary`
- SymbolicCard candidates: Doorway, First Crossing, Key Returned, Bread at Entry, Bread Center, Month Turn
- RitualPattern candidates or rebuild targets: `carried_key_word`, `threshold_bowl`, `seasonal_entry_bowl`, `bread_at_the_center`, `grain_bowl_beginning`, `last_word_first_word`, `doorway_arrival_word`
- RitualPresentation direction: Strong material-first phrasing around arrival, table, bread/grain, and first/last action.
- Avoid/demote guidance: Do not bring in public festival, bad-luck, or gendered social rules.

### Robert Chambers

- Source name: Robert Chambers
- Exact title: _The Book of Days: A Miscellany of Popular Antiquities in Connection with the Calendar, Including Anecdote, Biography, & History, Curiosities of Literature and Oddities of Human Life and Character_
- Author / editor: Edited by Robert Chambers
- Publisher / collection: W. and R. Chambers, Edinburgh and London
- URL: <https://openlibrary.org/books/OL17745638M>
- Source type: Calendar-almanac / popular antiquities compilation
- Publication date / copyright or public-domain status if knowable: 1863-1864 / 1869 editions; public-domain source family
- What parts were actually reviewed: Issue-directed source suitability for calendar thresholds, first/last days, month turns, seasonal entry, and date-bound household attention. Exact page-level extraction is not done in this PR.
- Why it belongs: It is the strongest of the six for future first-day / last-day / month-turn timing support.
- What it supports: Calendar threshold, first/last timing, seasonal entry/return, first word/last word as timing-linked ritual forms.
- What not to extract: Long calendar anecdotes, saints' day practices, public festival reenactment, "today in folklore" trivia, bad-luck logic, deterministic timing claims.
- Source limitations: Broad miscellany; can easily become a holiday feed or date trivia layer.
- Cultural/source sensitivity notes: British/European almanac framing; not universal timing truth.
- Classification: ritual technology source
- Categories supported: Seasonal strong; Home strong; Reflection moderate; Kitchen moderate; Candle or light limited; Plant none.
- Ritual forms supported: first/last/calendar threshold strong; threshold/crossing/key/return strong with timing; bread/grain/table/welcome moderate; vessel/emptying moderate; written/folded phrase moderate; salt/water/clearing limited; honey/warm cup limited.
- SourceNote candidates: `calendar_threshold_private_scale`, `first_last_custom_as_temporal_boundary`, `calendar_day_as_timing_not_content`
- SymbolicCard candidates: Month Turn, First Crossing, Word Returned, Threshold Word, Bread Center
- RitualPattern candidates or rebuild targets: `last_word_first_word`, `seasonal_entry_bowl`, `seasonal_marker_bowl`, `month_turn_bowl`, `first_crossing_bowl`
- RitualPresentation direction: Calendar threshold should shape the ritual form lightly; it must not become urgency or trivia.
- Avoid/demote guidance: Avoid named-day trivia and public festival reenactment.

### Charlotte Sophia Burne / G. L. Gomme

- Source name: Charlotte Sophia Burne / G. L. Gomme
- Exact title: _The Handbook of Folklore_
- Author / editor: New edition revised and enlarged by Charlotte Sophia Burne from G. L. Gomme's handbook
- Publisher / collection: Sidgwick & Jackson, London
- URL: <https://openlibrary.org/works/OL7039971W/The_handbook_of_folklore?edition=handbookoffolklo00burnuoft>
- Source type: Folklore methodology / collection handbook
- Publication date / copyright or public-domain status if knowable: 1914; public-domain source family
- What parts were actually reviewed: Issue-directed source suitability as a classification and extraction-discipline source. Exact page-level extraction is not done in this PR.
- Why it belongs: It helps future implementation distinguish belief claim, custom, material mechanic, charm, observance, and field-note context.
- What it supports: Source review discipline and classification, not direct ritual meaning.
- What not to extract: Authority claims, collector voice, source wording, evidence of efficacy.
- Source limitations: More method than content.
- Cultural/source sensitivity notes: Useful for not flattening tradition-specific material.
- Classification: ritual technology source for method / context only for meaning
- Categories supported: All as review discipline; none as standalone active content.
- Ritual forms supported: Classification support for all listed forms; no active ritual form by itself.
- SourceNote candidates: `folklore_collection_classification_discipline`, `domestic_folklore_without_bad_luck_command`
- SymbolicCard candidates: None directly; can support review notes on Doorway, Vessel, Folded Word, Bread/Grain.
- RitualPattern candidates or rebuild targets: None directly; classification support for all future patterns.
- RitualPresentation direction: Not a presentation source.
- Avoid/demote guidance: Do not use as a source of magical meaning by itself.

### John George Hohman

- Source name: John George Hohman
- Exact title: _Pow-Wows; or, Long Lost Friend_
- Author / editor: John George Hohman / Johann Georg Hohman
- Publisher / collection: Original German-language source family, later English-language editions
- URL: <https://openlibrary.org/books/OL16600785M/John_George_Hohman%27s_pow-wows_or_Long_lost_friend>
- Source type: Pennsylvania German folk-healing / charm compilation
- Publication date / copyright or public-domain status if knowable: Original source family 1820; public-domain source family
- What parts were actually reviewed: Issue-directed suitability as restricted written/folded/carried/placed phrase mechanics. No charm text extraction is done.
- Why it belongs: Only because #191 asks whether written/folded/carried phrase mechanics can be reviewed.
- What it supports: Mechanics only: written phrase, folded word, carried text, placed phrase, duration, return, closure.
- What not to extract: Actual charm wording, prayers, benedictions, medical or veterinary remedies, protection/warding claims, enemy/adversary material, binding/coercive formulas, legal/luck/prosperity success claims, anything spell-database-like.
- Source limitations: Too risky for normal user-facing lineage.
- Cultural/source sensitivity notes: Specific Pennsylvania German religious/folk-healing context; not generic written magic.
- Classification: restricted mechanics-only
- Categories supported: Reflection only under restriction; Home/Seasonal only if tied to phrase mechanics; others no.
- Ritual forms supported: written/folded/carried phrase restricted; placed phrase restricted; duration/return/closure restricted; all other forms avoid.
- SourceNote candidates: `powwow_restricted_source_guardrails`, `folded_note_as_placed_or_carried_word`
- SymbolicCard candidates: Folded Word, Word Returned, Threshold Word, but only with restrictions.
- RitualPattern candidates or rebuild targets: `folded_phrase_vessel`, `last_word_first_word`, `placed_phrase_at_the_door`
- RitualPresentation direction: Do not copy formula structure or source voice. Keep user-facing summary generic or omit Hohman lineage by default.
- Avoid/demote guidance: Treat as a restricted internal mechanics source, not a content source.

## 5. Approved / Restricted / Avoid Classifications

| Material / mechanic | Source support | Classification | Why | Guardrails |
| --- | --- | --- | --- | --- |
| Threshold crossing / doorway arrival | Brand/Ellis, Chambers, Henderson context | ritual technology source / adaptation candidate | Strong future form if tied to actual crossing or arrival | Narrow eligibility; no generic fallback, protection, luck, or clearing substitution |
| Key as returnable marker | Brand/Ellis, Henderson context | adaptation candidate | Key can make crossing/return material | No security/protection/control claims; must return to ordinary use |
| First crossing / first-foot / first entry | Chambers, Brand/Ellis, Henderson context | restricted adaptation candidate | Useful first-action logic | Avoid gendered first-foot rules, bad luck, and public custom reenactment |
| Bread or grain at entry/welcome | Brand/Ellis, Chambers, cross-checks | ritual technology source | Strong Kitchen/Home/Seasonal material family | No prosperity, abundance, health, or luck guarantees |
| Bread/grain as table center | Brand/Ellis, Chambers | ritual technology source | Serious table-centered enoughness/beginning/welcome material | Normal household food only; no recipe burden or scarcity moralizing |
| Salt as clearing/boundary material | Brand/Ellis, Henderson/Thiselton-Dyer context | adaptation candidate | Useful only when clearing/release is central | No warding/protection guarantee; no corpse/death/omen/coercive uses |
| Water / rinsing / pouring away | Brand/Ellis, Chambers context | adaptation candidate | Strong closure for clearing/release | Must include practical emptying/return; no medical/purification guarantees |
| Emptying a bowl | Chambers, Brand/Ellis, Burne/Gomme classification | ritual technology source | Clean closure for vessel work | Must be tied to actual held material/action |
| Folded note / folded word | Hohman restricted, Brand/Ellis/Chambers context | restricted mechanics-only | Useful Reflection mechanics | No charm wording, prayers, claims, formulas, or user-facing Hohman lineage by default |
| Carried phrase | Hohman restricted | restricted mechanics-only | Duration/return structure can help phrase rituals | No talismanic guarantee or copied formula |
| Placed phrase | Hohman restricted, Brand/Ellis/Chambers timing context | restricted mechanics-only / adaptation candidate | Can make Reflection and threshold words material | Must specify placement and closure; no spell database |
| First word / last word | Chambers, Brand/Ellis, Hohman restricted for mechanics | ritual technology source / restricted mechanics | Strong future timing-linked Reflection/Home form | Requires future timing support; no formula or prediction |
| Month turn / calendar threshold | Chambers, Brand/Ellis | ritual technology source | Strong future timing support | Timing should shape form, not create urgency or trivia |
| Honey / sweetness / sweetened word | Weak direct support in this packet; better as future exact-source review | restricted adaptation candidate | Can support bounded speech/welcome only if material and closed | No love magic, apology scripts, persuasion, relationship advice, or sentimental filler |
| Warm cup / shared cup | Weak direct support in this packet | context only / defer | Better supported by other Kitchen/Home sources from earlier packets | Do not force from #191 sources |
| Public festival customs | Chambers, Brand/Ellis, Thiselton-Dyer | avoid as user practice | Too public/context-specific for private app | May become context only if transformed; no reenactment |
| Protection / warding | Many sources but risky | avoid | Would pull app into outcome/protection system | Do not recommend guarantees or danger-removal claims |
| Medical or herbal remedies | Hohman and folklore compilations | avoid | Out of scope and unsafe | No remedies, medical, veterinary, or herbal treatment content |
| Coercive love or binding material | Hohman/folk charm risk | avoid | Violates product ethics | No coercion, binding, persuasion, or relationship-control |
| Prayers / benedictions | Hohman and antiquarian contexts | avoid by default | Religious/source-specific and copying risk | Do not adapt as default Moon & Table content |
| Bad-luck threats | Common folklore risk | avoid | Fear-based and deterministic | Do not use "if not, then bad luck" logic |

## 6. Source-To-Ritual-Form Map

| Ritual form | Strong sources | Weak/risky sources | Recommended use | Avoid |
| --- | --- | --- | --- | --- |
| Threshold / crossing / key / return | Brand/Ellis, Chambers | Henderson, Thiselton-Dyer, Hohman only phrase mechanics | Build narrow arrival/crossing/key-return forms | Generic threshold fallback, luck/protection, gendered first-foot |
| Vessel / bowl / cup / emptying | Brand/Ellis, Chambers, Burne/Gomme classification | Hohman for placed text only | Strengthen vessel closure and emptying | Generic bowl prop with no activation/closure |
| Salt / water / clearing | Brand/Ellis, Henderson/Thiselton-Dyer context | Omen/death/warding material | Use for explicit clearing/release only | Arrival/tending fallback, protection, corpse/death customs |
| Bread / grain / table / welcome | Brand/Ellis, Chambers | Henderson/Thiselton-Dyer context | Treat as serious Kitchen/Home/Seasonal material | Prosperity, abundance guarantees, recipes, public festival reenactment |
| Honey / sweetness / warm cup | Weak in #191; exact support needed | Coercive love/sweetening magic | Keep `honeyed_word` bounded and material if retained | Relationship advice, apology scripts, generic softness |
| Written / folded / carried phrase | Hohman restricted mechanics; Brand/Ellis/Chambers timing | Hohman content claims | Use mechanics only: fold/place/carry/return | Charm wording, prayers, formulas, protection/coercion |
| First / last / month-turn threshold | Chambers, Brand/Ellis | Date trivia and named-day miscellany | Recommend future timing support | Holiday feed, urgency, deterministic almanac claims |
| Seasonal marker / seasonal entry | Chambers, Brand/Ellis | Public festival customs | Private-scale seasonal entry/return/emptying | Reenactment, named-day trivia |

## 7. Source-To-Category Map

| Category | Strong source support | Weak source support | Recommended future content | Avoid |
| --- | --- | --- | --- | --- |
| Home | Brand/Ellis, Chambers | Henderson, Thiselton-Dyer | Narrow threshold arrival, key return, vessel emptying, household first/last | Generic fallback threshold, protection claims |
| Plant | None from #191 | None | Do not expand Plant from this packet; use #180 plant sources instead | Forcing plant content from household folklore |
| Kitchen | Brand/Ellis, Chambers for bread/grain/table | Thiselton-Dyer, Henderson | Bread/grain, table center, welcome, normal household food material | Health claims, recipes, prosperity, coercive sweetness |
| Candle or light | Chambers/Brand only as first/last timing context | None for light meaning | First/last light may be future bridge if backed elsewhere | New light correspondences from this packet |
| Reflection | Hohman restricted mechanics, Chambers/Brand timing | Burne/Gomme classification | Folded/placed/carried/returned phrase, first/last word | Charm/prayer/formula extraction |
| Seasonal | Chambers, Brand/Ellis | Thiselton-Dyer, Henderson | Month turn, seasonal entry, first/last, calendar threshold | Holiday feed, public festival reenactment |

Plant is mostly already covered by #180 plant sources. #191 should not be used to force new Plant support.

## 8. Candidate SourceNotes

These are review candidates only. They are not active SourceNotes.

| SourceNote candidate | Source(s) | Classification | Supports | Guardrails |
| --- | --- | --- | --- | --- |
| `threshold_crossing_as_arrival_not_clearing` | Brand/Ellis, Chambers, Henderson context | ritual technology / adaptation | Doorway arrival, threshold, Home/Seasonal | Arrival-specific only; not clearing or fallback |
| `key_as_returnable_threshold_marker` | Brand/Ellis, Henderson context | adaptation candidate | Key Returned, carried_key_word | No security/protection/control claims |
| `bread_at_entry_as_household_welcome` | Brand/Ellis, Chambers | ritual technology | Bread at Entry, quiet welcome, Seasonal/Home | No prosperity or abundance guarantees |
| `salt_water_as_specific_release` | Brand/Ellis, Henderson/Thiselton-Dyer context | adaptation candidate | salt_clear_water_release, Rinsed Bowl | Clearing/release only; no warding |
| `emptying_vessel_as_closure` | Brand/Ellis, Chambers, Burne/Gomme | ritual technology | Empty Bowl, Rinsed Bowl, vessel patterns | Must close by emptying/returning, not just holding |
| `folded_note_as_placed_or_carried_word` | Hohman restricted; Chambers/Brand timing | restricted mechanics-only | folded_phrase_vessel, Word Returned | No charm wording, prayers, claims, formulas |
| `calendar_threshold_private_scale` | Chambers, Brand/Ellis | ritual technology | Month Turn, first/last day timing | No named-day trivia or urgency |
| `first_last_custom_as_temporal_boundary` | Chambers, Brand/Ellis | ritual technology | first/last word, last_word_first_word | Requires real timing support |
| `sweetness_as_hospitality_not_therapy` | Needs exact source support; Burne/Gomme classification | restricted adaptation / defer | honeyed_word, Sweetened Word | No apology, persuasion, love magic, or relationship advice |
| `domestic_folklore_without_bad_luck_command` | Burne/Gomme, Thiselton-Dyer, Henderson | classification guardrail | All folklore-derived notes | No bad-luck-if logic |
| `powwow_restricted_source_guardrails` | Hohman | restricted mechanics-only guardrail | Folded/carried/placed phrase mechanics | Internal guardrail; not user-facing lineage by default |
| `folklore_collection_classification_discipline` | Burne/Gomme | method / classification | Source review hygiene | Not a meaning source by itself |
| `calendar_day_as_timing_not_content` | Chambers | ritual technology guardrail | first/last/month-turn support | Calendar fact should shape form, not supply content feed |

## 9. Candidate SymbolicCards

| SymbolicCard candidate | Source support | Categories | Ritual forms | Should implement soon? |
| --- | --- | --- | --- | --- |
| Doorway | Brand/Ellis, Henderson, Chambers | Home, Seasonal, Reflection | threshold/crossing | Yes, if narrow |
| First Crossing | Chambers, Brand/Ellis, Henderson | Home, Seasonal | threshold/calendar | Yes, tied to timing |
| Key Returned | Brand/Ellis, Henderson | Home, Reflection | key/return | Yes, if no protection framing |
| Bread at Entry | Brand/Ellis, Chambers | Kitchen, Home, Seasonal | bread/welcome/entry | Yes |
| Bread Center | Brand/Ellis, Chambers | Kitchen, Home, Seasonal | bread/table/enoughness | Yes, high value |
| Empty Bowl | Brand/Ellis, Chambers | Home, Kitchen, Seasonal, Reflection | vessel/closure | Yes |
| Rinsed Bowl | Brand/Ellis, Henderson context | Home, Kitchen | salt/water/release | Yes, constrained |
| Folded Word | Hohman restricted, Chambers/Brand timing | Reflection, Home | written/folded phrase | Yes, with Hohman restrictions |
| Word Returned | Hohman restricted, Chambers/Brand timing | Reflection, Seasonal | carried/returned phrase | Yes, with restrictions |
| Threshold Word | Brand/Ellis, Chambers, Hohman mechanics | Home, Reflection, Seasonal | doorway word / first word | Yes, if not generic fallback |
| Month Turn | Chambers, Brand/Ellis | Seasonal, Home, Reflection | calendar threshold | Yes, after timing support |
| Sweetened Word | Weak exact support in #191; future support needed | Kitchen, Home, Reflection maybe | honey/sweetness/vessel | Wait or implement carefully only after exact support |
| Shared Cup | Weak exact support in #191 | Kitchen, Home | cup/warmth/welcome | Wait; likely better supported by other kitchen/home sources |

High-value soon: Doorway, First Crossing, Key Returned, Bread Center, Empty Bowl, Folded Word, Month Turn. Wait: Sweetened Word and Shared Cup unless stronger exact source support is located or another approved packet supplies it.

## 10. Candidate RitualPatterns / Rebuild Targets

| Pattern / rebuild target | New or existing | Source support | Ritual function | Eligibility guardrails | Priority |
| --- | --- | --- | --- | --- | --- |
| `carried_key_word` | Existing | Brand/Ellis, Henderson context | Mark crossing/return with key and word | Only when threshold/key/return is central; no protection claims | High |
| `threshold_bowl` | Existing | Brand/Ellis, Chambers | Hold arrival/threshold attention in a vessel | Not clearing unless clearing is the focus | High |
| `seasonal_entry_bowl` | Existing | Chambers, Brand/Ellis | Mark seasonal entry at private scale | No public festival reenactment | High |
| `bread_at_the_center` | Existing | Brand/Ellis, Chambers | Place bread/grain as table center/enoughness | No prosperity/health/recipe burden | High |
| `folded_phrase_vessel` | Existing | Hohman restricted, Burne/Gomme discipline | Fold/place phrase into vessel with closure | Mechanics only; no charm/prayer/claim | High |
| `last_word_first_word` | Existing | Chambers, Brand/Ellis, Hohman mechanics | Mark temporal boundary with phrase | Requires real first/last timing or clear closing/opening context | High |
| `clear_the_threshold_bowl` | Existing | Brand/Ellis/Henderson context | Threshold clearing in vessel | Clearing/release only; not arrival fallback | Medium |
| `seasonal_marker_bowl` | Existing | Chambers, Brand/Ellis | Mark season/month with a bowl and return/emptying | No named-day trivia | Medium |
| `honeyed_word` | Existing | Weak in #191; needs exact support or previous sources | Sweetened bounded speech/welcome | Presentation/carry/source-summary/diagnostics first; no relationship advice | Watch closely |
| `quiet_welcome` | Existing | Brand/Ellis, Chambers | Material welcome without overtalking | Must be actual welcome/offering/vessel form | Medium |
| `warm_cup_between_us` | Existing | Weak in #191; likely previous sources | Warm cup as shared or solo vessel | No therapy, relationship advice, or health claims | Medium / depends on other packet |
| `grain_bowl_beginning` | Existing | Brand/Ellis, Chambers | Grain/bowl beginning and waiting | No prosperity or recipe burden | High |
| `doorway_arrival_word` | Future | Brand/Ellis, Chambers, Henderson context | Arrival-specific crossing word | Must require actual arrival/crossing/threshold; not a generic fallback | High if Tim wants new pattern |
| `first_crossing_bowl` | Future | Chambers, Brand/Ellis | First crossing held in a bowl/vessel | Requires first crossing or calendar threshold timing | Medium |
| `empty_the_bowl` | Future | Brand/Ellis, Chambers | Closure through emptying vessel | Must hold something real first; not generic | Medium |
| `sweet_word_in_the_cup` | Future | Needs exact support | Sweetened speech contained by cup/vessel | No love magic, apology, advice, coercion | Defer |
| `month_turn_bowl` | Future | Chambers, Brand/Ellis | Month-turn vessel marker | Depends on month-turn timing support | High after timing |
| `placed_phrase_at_the_door` | Future | Hohman restricted, Brand/Ellis/Chambers context | Threshold phrase placement and return | No charm wording; actual threshold required | Medium |

Every future pattern above must have a reason to exist that would still make sense if it were not the easiest pattern to select.

Specific constraints:

- `doorway_arrival_word` must be arrival-specific, not a generic threshold fallback.
- `honeyed_word` should be constrained through presentation/carry/source summaries/diagnostics before any scoring constraint.
- Bread/grain should be treated as a serious Kitchen/Home/Seasonal material family.
- First-day / last-day / month-turn timing should be recommended as future timing support, not implemented in #191.
- Hohman may only support restricted mechanics, not user-facing source lineage by default.

## 11. What To Avoid / Demote

| Material/source direction | Avoid because | Future handling |
| --- | --- | --- |
| Hohman medical remedies | Medical/veterinary remedies are outside scope and unsafe | Avoid entirely |
| Hohman protection / enemy / legal / binding / coercive material | Pulls app into spell database, coercion, protection/prosperity system | Avoid entirely |
| Hohman prayers / benedictions as default content | Religious specificity, copying risk, and source-voice risk | Avoid by default; no user-facing lineage unless Tim explicitly approves |
| Bad-luck-if threats | Fear-based, deterministic, bad product voice | Avoid entirely |
| Gendered first-foot rules | Socially loaded and not suitable for private household app | Avoid; extract only neutral first-action mechanics if supported elsewhere |
| Death/corpse/sickness customs as user practice | Morbid, medical, and unsafe as practice | Avoid entirely |
| Horseshoe warding / anti-witch framing | Protection/warding and adversarial folk framing | Avoid for current app |
| Public festival reenactment | Turns app into holiday feed or reenactment guide | Context only; private-scale transformation required |
| Named-day trivia / "today in folklore" | Not a private grimoire; becomes content feed | Use calendar only as timing support |
| Coercive love/sweetening magic | Violates ethics and product tone | Avoid; sweetness only as bounded hospitality if supported |
| Herb/medicine correspondences | Medical/herbal risk and outside #191 | Avoid in this packet |
| Prosperity/protection guarantees | Unsupported outcome claims | Avoid entirely |

## 12. Future Implementation Issue Recommendations

| Proposed issue | Purpose | Why now | Scope | Non-goals | Depends on |
| --- | --- | --- | --- | --- | --- |
| Strengthen threshold, key, and return forms | Make threshold arrival/key rituals narrow and material-specific | Prevent new lazy fallback and improve Home/Seasonal/Reflection forms | `carried_key_word`, `threshold_bowl`, possible `doorway_arrival_word` | No protection/warding/luck; no generic fallback | #191 review; Tim decision on new vs rebuild |
| Strengthen vessel emptying and clearing forms | Clarify vessel closure and salt/water as release-only | Prevent salt/water overreach | `salt_clear_water_release`, `clear_the_threshold_bowl`, Empty Bowl/Rinsed Bowl notes | No arrival/tending defaults; no warding | #191 review |
| Strengthen bread, grain, cup, welcome, and sweetening forms | Treat bread/grain as serious material and constrain honey | Bread/grain is high value; honey is risky | `grain_bowl_beginning`, `bread_at_the_center`, `honeyed_word`, `quiet_welcome`, `warm_cup_between_us` | No recipes, prosperity, health, apology, relationship advice | #191 review; #155 follow-ups |
| Strengthen written, folded, carried, and first/last phrase forms | Add restricted mechanics without spell-database behavior | Reflection/threshold phrase forms need better source support | `folded_phrase_vessel`, `last_word_first_word`, possible `placed_phrase_at_the_door` | No Hohman wording, prayers, remedies, claims | Tim decision on Hohman visibility |
| Add month-turn / first-day / last-day timing support | Make calendar threshold a real timing input | Tim explicitly approved future timing support | First/last/month-turn facts, selected signals, quality scenarios | No named-day feed, fake schedule, or date urgency | #191 review |
| Use #187 for Seasonal/Kitchen material selection after source review | Connect material selection to reviewed packet decisions | Helps select bread/grain/seasonal forms cleanly | Seasonal/Kitchen source-backed material selection | No broad content expansion beyond approved packet | #187 plus #191 |
| Use #186 for cue-level pattern cleanup after source review | Demote/rebuild weak food/herb cues with source discipline | Prevent approved-but-weak cues from staying active | Decide rebuild/merge/demote for cue patterns | No new source selection | #186 plus #191 |
| Use #155 follow-ups for presentation/source-summary alignment | Improve carry prompts, optional accents, and lineage labels | #191 gives source packet support but no active copy | Pattern-native carry/source summaries for packet-backed forms | No scoring/reachability work | #155 and #191 |

## 13. Open Questions For Tim

1. Should Hohman remain internal/restricted only, or may it appear in source summaries in any form?
2. Should `doorway_arrival_word` be a new future pattern, or should arrival remain inside `carried_key_word` / `threshold_bowl`?
3. What should count as a first-day / last-day / month-turn timing fact?
4. Should bread/grain become a primary Kitchen/Seasonal material family in the recommendation engine?
5. Should `honeyed_word` be constrained only by presentation for now?
6. Which candidate patterns should be highest priority after the packet?
7. Should this packet be considered `approved_for_implementation` after Tim review, or remain `ready_for_review` until exact source locations are added for every candidate SourceNote?
8. Should "sweetened word" wait for a stronger source packet, since #191 support for honey is weaker than for bread/grain/threshold/calendar mechanics?

## 14. Diff / No-Active-Content Verification

| Area | Changed? | Notes |
| --- | --- | --- |
| SourceReviews | No active additions | No source registry changes. |
| SourceNotes | No active additions | Candidate notes only in docs. |
| SymbolicCards | No active additions | Candidate cards only in docs. |
| RitualPatterns | No active additions | Rebuild targets only in docs. |
| RitualPresentation | No active changes | Direction only in docs. |
| Scoring | No | No generator/scoring files changed. |
| UI | No | No UI files changed. |
| Docs/source packet | Yes | Source packet and this review packet added. |
| Tests | No active test changes | Existing tests run unchanged. |
| Diagnostics | No behavior change | `diagnose:content` run only. |

No active content changed.

## 15. PR Notes Draft

Copyable PR notes:

```markdown
## Summary

- Added `docs/content-packets/domestic-threshold-vessel-welcome-source-packet.md` for #191.
- Added `docs/content-audits/post-191-source-packet-review.md` as the human-review packet for Tim/ChatGPT.
- Reviewed only the six #191 source families:
  - William Henderson, _Notes on the Folk-Lore of the Northern Counties of England and the Borders_
  - T. F. Thiselton-Dyer, _English Folk-lore_
  - John Brand / Henry Ellis, _Observations on Popular Antiquities_
  - Robert Chambers, _The Book of Days_
  - Charlotte Sophia Burne / G. L. Gomme, _The Handbook of Folklore_
  - John George Hohman, _Pow-Wows; or Long Lost Friend_

## Classifications

- Strong ritual technology sources: Chambers; Brand/Ellis.
- Method/classification support: Burne/Gomme.
- Adaptation/context candidates: Henderson; Thiselton-Dyer.
- Restricted mechanics-only: Hohman.

## Restricted / avoid material

- Hohman is restricted to mechanics only: folded/carried/placed phrase, duration, return, closure.
- Do not extract charms, prayers, remedies, protection/warding claims, enemy/adversary material, binding/coercive formulas, legal/luck/prosperity claims, or anything spell-database-like.
- Avoid bad-luck threats, gendered first-foot rules, death/corpse/sickness customs, public festival reenactment, coercive sweetening, herbal/medical correspondences, and prosperity/protection guarantees.

## Candidate outputs for later implementation

- Candidate SourceNotes include threshold arrival, key return, bread/grain welcome, salt/water release, emptying vessel closure, folded/carried word mechanics, first/last timing, and source-classification guardrails.
- Candidate SymbolicCards include Doorway, First Crossing, Key Returned, Bread at Entry, Bread Center, Empty Bowl, Rinsed Bowl, Folded Word, Word Returned, Threshold Word, Month Turn, Sweetened Word, and Shared Cup.
- Candidate/rebuild targets include `carried_key_word`, `threshold_bowl`, `seasonal_entry_bowl`, `bread_at_the_center`, `folded_phrase_vessel`, `last_word_first_word`, `clear_the_threshold_bowl`, `seasonal_marker_bowl`, `honeyed_word`, `quiet_welcome`, `warm_cup_between_us`, `grain_bowl_beginning`, plus possible future `doorway_arrival_word`, `first_crossing_bowl`, `empty_the_bowl`, `sweet_word_in_the_cup`, `month_turn_bowl`, and `placed_phrase_at_the_door`.

## Recommended follow-up issues

- Strengthen threshold, key, and return forms.
- Strengthen vessel emptying and clearing forms.
- Strengthen bread, grain, cup, welcome, and sweetening forms.
- Strengthen written, folded, carried, and first/last phrase forms.
- Add month-turn / first-day / last-day timing support.
- Feed #155 follow-ups, #174, #175, #176, #187, and #186.

## Validation

- npm run lint:content
- npm run typecheck
- npm run test -- tests/unit/source-registry.test.ts
- npm run diagnose:content
- npm run test
- npm run check

## Confirmations

- No active SourceNotes were added.
- No SymbolicCards were added.
- No RitualPatterns or RitualPresentations were added or changed.
- No scoring, diagnostics behavior, or UI changed.
- No new visible categories were added.
- No copied source text was added.
- No private data was added.
```

Codex merge recommendation:

- Merge as a source packet if Tim is comfortable with the source suitability classifications and Hohman restriction.
- Hold for Tim source-suitability review if he wants exact page/location notes before accepting `ready_for_review`.
- Do not treat this packet as approved active implementation until Tim explicitly reviews/approves it.
