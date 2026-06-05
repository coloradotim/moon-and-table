# Domestic Threshold, Vessel, Clearing, and Welcome Source Packet

## Header

- Packet id: `source_packet_2.domestic_threshold_vessel_welcome`
- Title: Domestic Threshold, Vessel, Clearing, and Welcome Source Packet
- Status: `ready_for_review`
- Packet family / taxonomy group: Domestic vessel, threshold, clearing, welcome, first/last timing, written phrase mechanics
- Related issue numbers: #191, supports future work for #155, #174, #175, #176, #187, and follow-up content issues
- Reviewer: Codex draft from Tim review decisions; Tim review required before implementation
- Review date: 2026-06-05
- Implementation status: Not implemented. This packet adds no active SourceNotes, SymbolicCards, RitualPatterns, RitualPresentations, scoring, or UI.
- Intended visible routes: Home, Kitchen, Candle or light, Reflection, Seasonal, Surprise me after resolving to a real route
- Non-goals: No new visible categories, no spell database, no active content implementation, no copied source wording, no protection/prosperity/medical/coercive claims, no moon water or cinnamon threshold implementation.

## Product Purpose

This packet reviews six named folklore/public-domain source candidates for ritual mechanics that can deepen Moon & Table's existing household grimoire materials:

- threshold / crossing / key / return
- bowl / cup / vessel / emptying
- salt / water / washing / clearing
- bread / grain / honey / warmth / welcome
- written phrase / folded word / carried word / first-last formula
- seasonal first/last / calendar threshold

The goal is not to add more flexible fallback rituals. The goal is to support narrow, source-backed ritual technologies that have a real reason to exist and can later improve pattern presentation, carry prompts, source summaries, diagnostics, and timing support.

Carry this decision into implementation:

> Every new ritual must have a reason to exist that would still make sense if it were not the easiest pattern to select.

## Research Verdict

The six-source batch is useful, but uneven.

The strongest future direction is not "more folklore flavor." It is sharper material logic:

- Bread and grain should become a serious Kitchen/Home/Seasonal material family. They can support table-centered welcome, enoughness, beginning, first offering, and seasonal household continuity without leaning on therapy-coded sweetness or prosperity promises.
- Calendar-threshold material is strong enough to justify future first-day / last-day / month-turn timing support. Chambers and Brand/Ellis are especially useful for calendar-first structure; Burne/Gomme helps keep extraction disciplined.
- Threshold-arrival work should be narrow. A future doorway arrival pattern should only appear for true arrival/crossing/threshold contexts, not as an all-purpose low-capacity fallback.
- Salt/water should remain tied to clearing, removal, containment, rinsing, pouring away, and emptying. It should not become the default answer for arrival, threshold, or household tending.
- Honey should stay constrained. `honeyed_word` should mean sweetened, bounded speech or material welcome. It should not become generic softness, apology, relationship advice, or sentimental filler.
- Hohman is restricted mechanics-only. It can inform structural ideas such as folded/carried/placed wording and return/closure, but it should not supply user-facing lineage, charm wording, prayers, remedies, promises, or a spell-database feel.

No source in this packet should be treated as a direct script source for user-facing copy. All future extraction must become short transformed SourceNotes and reviewed active content in a later PR.

## Existing App Fit

- Home: Strong fit for threshold, key, crossing, bowl, table, clearing, first/last household attention, carried/returned object, and arrival-specific patterns.
- Plant: Not a primary route for this packet. Plant work should only use this packet when a later pattern creates a real vessel, threshold, or seasonal bridge; do not force it.
- Kitchen: Strong fit for bread, grain, cup, bowl, table, honey as bounded material welcome, salt/water only when ordinary kitchen/home materials are already appropriate.
- Candle or light: Secondary fit for first/last light, threshold light, and household closing/opening. This packet should not broaden light rituals into generic clarity.
- Reflection: Strong fit for written phrase, folded word, carried text, placed phrase, first/last word, return/closure. Hohman may only support mechanics here, not wording or claims.
- Seasonal: Strong fit for first/last day, month turn, calendar thresholds, seasonal entry/emptying/returning.
- Surprise me: Must resolve to one real visible route first. Do not let Surprise me reach threshold/written/bread material simply because it is short.

## Source Candidate Rankings

| Rank | Source | Classification | Best use | Main caution |
| --- | --- | --- | --- | --- |
| 1 | Robert Chambers, _The Book of Days_ | approved candidate / ritual technology source | calendar thresholds, first/last day rhythm, seasonal entry, almanac-like timing support | context-heavy and antiquarian; do not import trivia or reenactment |
| 2 | John Brand / Henry Ellis, _Observations on Popular Antiquities_ | approved candidate / ritual technology source | threshold customs, calendar customs, first/last forms, household customs by occasion | avoid bad-luck logic, gendered or coercive customs, and church/festival reenactment |
| 3 | Charlotte Sophia Burne / G. L. Gomme, _The Handbook of Folklore_ | approved candidate / method and classification source | extraction discipline, taxonomy, distinguishing belief/custom/mechanic | more methodological than ritual-rich; do not make it a meaning source by itself |
| 4 | William Henderson, _Notes on the Folk-Lore of the Northern Counties of England and the Borders_ | adaptation candidate / context source | northern/Borders threshold and household mechanics, first crossing, carried/placed objects | local and culturally specific; avoid fear, omen, spirit, and protection claims |
| 5 | T. F. Thiselton-Dyer, _English Folk-lore_ | context / adaptation candidate | cross-checking common English household/calendar motifs | broad compilation; risk of generic folklore flavor without actionable mechanism |
| 6 | John George Hohman, _Pow-Wows; or, Long Lost Friend_ | restricted mechanics-only | folded/carried/placed written phrase mechanics, duration, return/closure | do not extract wording, prayers, remedies, claims, coercion, protection, prosperity, or user-facing lineage |

## Source Candidates

### William Henderson

- Source title: _Notes on the Folk-Lore of the Northern Counties of England and the Borders_
- Author / publisher: William Henderson; Longmans, Green, Reader, and Dyer, London, 1866
- Source type: Regional folklore collection / antiquarian compilation
- Reference URL: <https://openlibrary.org/books/OL7180858M/Notes_on_the_folk-lore_of_the_northern_counties_of_England_and_the_borders.>
- Candidate status: `context_only` with selected `adaptation_candidate` mechanics
- Why this belongs / does not belong: It belongs because the issue asks for regional threshold, household, first crossing, carried object, and domestic custom context. It should not become a general authority for Moon & Table because many motifs are omen-heavy, fear-based, local, or not suitable for practice.
- May support: threshold and crossing mechanics; object carried and returned; household entry/exit customs; context for how first actions can mark a transition.
- Should not extract: bad-luck threats, supernatural danger framing, gendered first-foot beliefs, death/corpse customs, fear-based warding, medical remedies, prayers, distinctive source phrasing.
- Source risks: Regional specificity can be flattened into generic "folk magic" if handled carelessly.
- Copyright / copying risks: Public-domain source family, but do not copy passages or distinctive wording.
- Cultural sensitivity / appropriation risks: Treat as documented regional folklore, not a universal household tradition.
- Practical / eligibility risks: Many customs include claims, omens, or protection logic that Moon & Table should not recommend.
- Human-review notes: Use only after a later PR identifies exact location notes and transforms mechanics into short SourceNotes.

### T. F. Thiselton-Dyer

- Source title: _English Folk-lore_
- Author / publisher: T. F. Thiselton-Dyer; Hardwicke & Bogue, London, 1878
- Source type: English folklore compilation
- Reference URL: <https://openlibrary.org/books/OL7131508M/English_folk-lore>
- Candidate status: `context_only` / `adaptation_candidate`
- Why this belongs / does not belong: It belongs as a broad cross-check for English domestic and calendar motifs. It should not be the core source for active ritual forms because broad compilations can produce vague, generic folklore flavor.
- May support: cross-checking threshold, seasonal, household, salt/water, and bread/grain motifs where exact source locations are reviewed later.
- Should not extract: generalized superstition claims, omen threats, prayers, charms, copied anecdotes, anything presented as guaranteed luck, protection, prosperity, or relationship outcome.
- Source risks: Broadness can encourage ungrounded synthesis.
- Copyright / copying risks: Public-domain source family, but source language must not be copied.
- Cultural sensitivity / appropriation risks: Treat as historical compilation with limits, not as a living-practice authority.
- Practical / eligibility risks: Many items are unsuitable as practice because they depend on fear, omen, coercion, or public festival context.
- Human-review notes: Use mainly as a corroborating context source, not as primary lineage in user-facing summaries.

### John Brand / Henry Ellis

- Source title: _Observations on Popular Antiquities: Chiefly Illustrating the Origin of our Vulgar Customs, Ceremonies, and Superstitions_
- Author / publisher: John Brand; revised and enlarged by Sir Henry Ellis; Charles Knight and Co., London, 1841 edition
- Source type: Antiquarian customs and calendar compilation
- Reference URL: <https://openlibrary.org/books/OL19474349M/Observations_on_popular_antiquities>
- Candidate status: `approved_candidate` as ritual technology source
- Why this belongs / does not belong: It belongs because it gives structure around customs, household occasions, calendar turns, first/last markers, and public/private custom. It should not be mined for ritual scripts or treated as proof that an outcome claim works.
- May support: first/last formula; calendar threshold; threshold crossing; table/bread/grain context; seasonal entry; event-specific household actions.
- Should not extract: bad-luck-if logic, gendered customs, coercive or outcome-based practices, prayers, church/festival reenactment, copied phrasing.
- Source risks: Antiquarian tone and "customs" can pull the app toward reenactment or superstition cataloguing.
- Copyright / copying risks: Public-domain source family; transformed notes only.
- Cultural sensitivity / appropriation risks: Keep context historically bounded. Do not universalize British customs.
- Practical / eligibility risks: Some customs carry claims or social rules that do not fit a private household app.
- Human-review notes: Strong candidate for future SourceReviews/SourceNotes supporting first-last and calendar threshold timing.

### Robert Chambers

- Source title: _The Book of Days: A Miscellany of Popular Antiquities in Connection with the Calendar, Including Anecdote, Biography, & History, Curiosities of Literature and Oddities of Human Life and Character_
- Author / publisher: Edited by Robert Chambers; W. and R. Chambers, Edinburgh and London, 1863-1864 / 1869 editions
- Source type: Calendar-almanac / popular antiquities compilation
- Reference URL: <https://openlibrary.org/books/OL17745638M>
- Candidate status: `approved_candidate` as calendar-threshold and seasonal context source
- Why this belongs / does not belong: It belongs because #191 needs first-day, last-day, month-turn, seasonal entry, and calendar-threshold support. It should not become a trivia source or a reason to overfill the app with date lore.
- May support: first day / last day / month turn; calendar thresholds; seasonal entry and return; timing context for "first word" and "last word" patterns.
- Should not extract: long calendar anecdotes, copied descriptions, saints' day practices, public festival reenactment, bad-luck logic, deterministic timing claims.
- Source risks: Very broad and dense; easy to overuse.
- Copyright / copying risks: Public-domain source family; do not copy prose.
- Cultural sensitivity / appropriation risks: British/European almanac framing should be named internally and not treated as universal timing truth.
- Practical / eligibility risks: Calendar symbolism should not override capacity or become false urgency.
- Human-review notes: Recommended backbone for a future first-day / last-day / month-turn timing issue.

### Charlotte Sophia Burne / G. L. Gomme

- Source title: _The Handbook of Folklore_
- Author / publisher: New edition revised and enlarged by Charlotte Sophia Burne from G. L. Gomme's handbook; Sidgwick & Jackson, London, 1914
- Source type: Folklore methodology / collection handbook
- Reference URL: <https://openlibrary.org/works/OL7039971W/The_handbook_of_folklore?edition=handbookoffolklo00burnuoft>
- Candidate status: `approved_candidate` for method and classification; `context_only` for ritual meaning
- Why this belongs / does not belong: It belongs because it can help future packets distinguish belief claims, customs, observances, charms, material mechanics, and field notes. It is not itself a source of Moon & Table ritual meaning unless paired with exact reviewed examples.
- May support: source review discipline; classification terms; separating mechanics from claims; identifying when material should remain context-only.
- Should not extract: generalized authority claims, collector voice, source wording, or evidence of efficacy.
- Source risks: Methodological source can be overtreated as content source.
- Copyright / copying risks: Public-domain source family; do not copy instructional prose.
- Cultural sensitivity / appropriation risks: Useful for respecting context and classification limits.
- Practical / eligibility risks: None directly, because it should not supply active practices alone.
- Human-review notes: Use as a guardrail/source-review anchor in future implementation PRs.

### John George Hohman

- Source title: _Pow-Wows; or, Long Lost Friend_
- Author / publisher: John George Hohman / Johann Georg Hohman; original German-language source family 1820; later English-language editions
- Source type: Pennsylvania German folk-healing / charm compilation
- Reference URL: <https://openlibrary.org/books/OL16600785M/John_George_Hohman%27s_pow-wows_or_Long_lost_friend>
- Candidate status: `restricted_mechanics_only`
- Why this belongs / does not belong: It belongs only because #191 asks whether written/folded/carried/placed phrase mechanics can be reviewed. It does not belong as user-facing lineage or a source of wording, prayer, charm, outcome claim, remedy, or spell catalogue material.
- May support: structural mechanics only: written phrase, folded word, carried text, placed phrase, duration, return, and closure.
- Should not extract: actual charm wording; prayers or benedictions; medical or veterinary remedies; protection or warding claims; enemy/adversary material; binding/coercive formulas; legal/luck/prosperity claims; anything that makes Moon & Table feel like a spell database.
- Source risks: Extremely high risk of copying charm structure too directly or importing medical/protection/coercive claims.
- Copyright / copying risks: Public-domain source family, but do not copy wording, formula structure, prayers, or distinctive sequences.
- Cultural sensitivity / appropriation risks: Treat as a specific Pennsylvania German source family with religious/folk-healing context. Do not flatten into generic written magic.
- Practical / eligibility risks: Medical/veterinary content, coercive content, and protection claims are out of scope.
- Human-review notes: Use only if a later human-approved implementation issue explicitly allows mechanics-only SourceNotes. Do not use for user-facing source summaries by default.

## Source Review Summary

The reviewed batch can safely support a future domestic-material source layer if implementation keeps mechanics separated from claims.

Strong safe mechanics:

- a first action can mark entry, beginning, or calendar threshold
- a last action can mark closure, return, or emptying
- a vessel can hold, contain, receive, sweeten, or be emptied
- a key can mark threshold and return when the ritual is truly about crossing or arrival
- bread or grain can sit at the table as enoughness, welcome, beginning, or seasonal continuity
- salt/water can carry clearing only when clearing/release is explicit
- a folded, placed, carried, or returned phrase can make reflection material without turning into a spell script

Unsafe or unsuitable extractions:

- outcome guarantees
- bad-luck threats
- protection-from-danger claims
- prosperity or love claims
- medical/veterinary content
- copied charm wording, prayers, formulae, or distinctive ritual scripts
- social hierarchy, gendered, coercive, or adversarial customs
- generic "folk magic" aesthetics without a specific material logic

## Source-to-Ritual-Form Map

| Ritual form family | Henderson | Thiselton-Dyer | Brand/Ellis | Chambers | Burne/Gomme | Hohman |
| --- | --- | --- | --- | --- | --- | --- |
| Threshold / crossing / arrival | context/adaptation | context | strong | seasonal/calendar support | classification support | avoid except phrase mechanics |
| Key / carried object / return | context/adaptation | context | adaptation | timing support | classification support | mechanics-only if text/object is written or carried |
| Bowl / cup / vessel / emptying | adaptation | context | adaptation | timing support | classification support | mechanics-only for placed/returned text, not vessel meaning |
| Salt / water / washing / clearing | adaptation with caution | context | adaptation | timing support for emptying/turning | classification support | avoid |
| Bread / grain / table / welcome | context | context | strong adaptation | seasonal/calendar support | classification support | avoid |
| Honey / sweetness / warm cup | limited context | limited context | adaptation only if hospitality/material welcome is explicit | limited timing support | classification support | avoid for love/coercion |
| Written phrase / folded word / carried word | limited | context | adaptation | first/last word timing support | classification support | restricted mechanics-only |
| First-day / last-day / month-turn timing | limited | context | strong | strong | classification support | avoid except phrase duration/return mechanics |

## Source-to-Category Map

| Visible route | Strong source support | Secondary support | Use cautions |
| --- | --- | --- | --- |
| Home | Brand/Ellis, Chambers | Henderson, Thiselton-Dyer, Burne/Gomme | Do not make threshold a generic short fallback. Keep arrival/return/clearing distinct. |
| Kitchen | Brand/Ellis, Chambers | Thiselton-Dyer, Henderson, Burne/Gomme | Bread/grain can be serious; honey must stay bounded and not become relationship advice. |
| Candle or light | Chambers for first/last timing; Brand/Ellis for occasion structure | Burne/Gomme classification | This packet does not approve new light correspondences. |
| Reflection | Hohman mechanics-only; Brand/Ellis and Chambers for first/last word timing | Burne/Gomme classification | No charm wording, prayers, or spell-database mechanics. |
| Seasonal | Chambers, Brand/Ellis | Burne/Gomme, Thiselton-Dyer | Use for calendar thresholds, not urgency or reenactment. |
| Plant | None primary | None | Do not route this packet to Plant unless a later pattern has real material support. |
| Surprise me | None directly | All only after resolved route | Must resolve to a real route; no direct Surprise me fallback. |

## Approved / Restricted / Avoid Classifications

### Approved candidates for future implementation

- Chambers: approved candidate for calendar threshold, first/last, month-turn, and seasonal entry support.
- Brand/Ellis: approved candidate for ritual technology around custom structure, threshold/crossing, first/last, bread/grain/table, and household occasion.
- Burne/Gomme: approved candidate for source-review method and classification support.

### Use carefully / adaptation candidates

- Henderson: useful for regional threshold/household mechanics, but adapt only with clear location notes and avoid omen/fear material.
- Thiselton-Dyer: useful for cross-checking common English folklore motifs, but not strong enough as the only source for active ritual meaning.

### Restricted

- Hohman: restricted mechanics-only. Do not use for user-facing lineage by default. Do not extract wording, prayers, remedies, claims, coercion, or spell catalogue material.

### Avoid extraction areas across all sources

- protection guarantees
- prosperity guarantees
- love or relationship-control claims
- medical or veterinary remedies
- bad-luck-if logic
- fear-based warding
- adversary/enemy/coercive formulas
- copied charms, prayers, chants, benedictions, petitions, recipes, or distinctive phrasing
- public festival reenactments unless converted into a private, source-backed household form in a later approved packet

## Metaphysical Integrity Review

Safety should constrain recommendations; it should not rewrite the metaphysics of the practice.

- Does this preserve the ritual meaning of the practice? Yes, if future content treats vessels, thresholds, bread/grain, salt/water, and words as real ritual materials rather than wellness props.
- Did we accidentally reduce it to a wellness metaphor, visual prop, psychological cue, safety disclaimer, or decorative object? The risk is highest for honey, warm cup, and written phrase. Future presentations must keep material logic visible.
- Are claims bounded without condescension? Yes, if the app says what the ritual marks or holds without promising outcomes.
- Are practical constraints handled quietly? They should be handled as eligibility and copy boundaries, not user-facing compliance language.
- Does the packet avoid telling the practitioner what to believe? Yes. It distinguishes mechanics from claims without explaining away practice.

## Claims Boundaries

Do not claim that these materials:

- guarantee protection
- guarantee prosperity
- guarantee love, closeness, apology, or relationship repair
- heal illness or affect medical outcomes
- change legal outcomes
- ensure physical safety
- predict future events
- coerce or bind another person
- remove danger

Allowed framing:

- marks a threshold
- gives a beginning or ending a material form
- holds a word briefly
- returns an object to ordinary use
- empties or rinses a vessel as closure
- places bread or grain at the center of household attention
- lets sweetness bound speech without making an outcome claim

## Practical Eligibility Notes

- ingestion: Normal household food/drink only in future Kitchen patterns; no essential oils, medicinal dosing, or required ingestion.
- food / allergy: Bread, grain, honey, and warm cup patterns need allergy/dietary alternatives and no health claims.
- pets: Keep salt, water bowls, small objects, honey, bread, grain, and written slips away from pets where relevant.
- children: Avoid small-object and hot-liquid risks in implementation.
- pregnancy: No herbal/medical claims.
- smoke: No smoke requirement.
- live flame: Not central to this packet; any Candle or light use should stay within existing flame constraints.
- essential oils: No essential oils.
- glass: Vessel patterns should allow non-glass bowls/cups where useful.
- small objects: Keys, folded words, grains, and small vessels require practical placement/return guidance.
- powders / spices: Salt/grain should not become messy threshold work by default.
- cleanup burden: Patterns should include clean closure and return/emptying.
- emotional intensity: Honeyed word and written phrase patterns must not become therapy, apology scripts, or forced conversation.
- medical / legal / emergency boundaries: No advice or outcome claims.

## Cultural / Source Sensitivity Notes

These sources are antiquarian and historically situated. Public-domain availability does not make practices culturally neutral or automatically suitable.

Future implementation should:

- name sources internally as historical/regional or antiquarian sources
- avoid claiming universal tradition
- avoid extracting from religious, medical, coercive, or fear-based contexts
- avoid turning regional custom into generic "old folk magic"
- preserve the difference between documented custom, ritual mechanism, and belief claim
- keep user-facing source summaries light and human-readable, not footnote-heavy

## SourceNote Candidates

These are candidates only. They are not active SourceNotes.

### Candidate SourceNote: Calendar Threshold as First / Last Attention

- Proposed key: `candidate.note.calendar_threshold_first_last_attention`
- Source candidates: Chambers; Brand/Ellis; Burne/Gomme for classification
- Source area / location basis, if known: Calendar and popular-custom sections; exact location notes required later.
- Transformed note: First and last actions can mark a calendar threshold when they are narrow, intentional, and closed cleanly.
- Review basis: Calendar-almanac and custom structure, transformed into private household use.
- Risks / extraction cautions: Do not import bad-luck logic, festival reenactment, or date determinism.

### Candidate SourceNote: Threshold Arrival Requires Actual Crossing

- Proposed key: `candidate.note.threshold_arrival_requires_crossing`
- Source candidates: Brand/Ellis; Henderson; Chambers for timing support
- Source area / location basis, if known: Threshold/entry/custom material; exact location notes required later.
- Transformed note: A threshold ritual should be tied to an actual arrival, crossing, entry, or first step, not used as a generic short ritual.
- Review basis: Tim decision plus threshold/custom source family.
- Risks / extraction cautions: Do not let threshold patterns become fallback answers.

### Candidate SourceNote: Key as Returnable Threshold Marker

- Proposed key: `candidate.note.key_as_returnable_threshold_marker`
- Source candidates: Brand/Ellis; Henderson; Burne/Gomme for classification
- Source area / location basis, if known: Object-at-threshold and carried-object material; exact location notes required later.
- Transformed note: A key can mark crossing and return when the practice includes carrying, touching, placing, and returning it to ordinary use.
- Review basis: Object/crossing mechanics adapted for private household practice.
- Risks / extraction cautions: No protection, luck, or security claims.

### Candidate SourceNote: Vessel Holds and Empties the Work

- Proposed key: `candidate.note.vessel_holds_and_empties_the_work`
- Source candidates: Brand/Ellis; Chambers; Burne/Gomme for classification
- Source area / location basis, if known: Bowl/cup/vessel/household custom material; exact location notes required later.
- Transformed note: A bowl or cup can hold a small household intention or release only if the practice also gives it a clear emptying, returning, or putting-away closure.
- Review basis: Vessel mechanics and Moon & Table closure needs.
- Risks / extraction cautions: Do not treat any vessel as automatic proof of ritual meaning.

### Candidate SourceNote: Salt Water Belongs to Clearing

- Proposed key: `candidate.note.salt_water_belongs_to_clearing`
- Source candidates: Brand/Ellis; Henderson; Thiselton-Dyer as cross-check
- Source area / location basis, if known: Salt/water/clearing material; exact location notes required later.
- Transformed note: Salt and water should support clearing, rinsing, containing, pouring away, or emptying only when release is the real ritual function.
- Review basis: Post-#183 cleanup decision and source packet target.
- Risks / extraction cautions: No warding, protection, omen, corpse/death, coercive, or medical material.

### Candidate SourceNote: Bread Grain at the Table

- Proposed key: `candidate.note.bread_grain_at_the_table`
- Source candidates: Brand/Ellis; Chambers; Thiselton-Dyer/Henderson as cross-checks
- Source area / location basis, if known: Bread, grain, table, welcome, seasonal food custom material; exact location notes required later.
- Transformed note: Bread or grain can make welcome, beginning, enoughness, or seasonal continuity visible at the table without promising prosperity or abundance.
- Review basis: Tim decision to treat bread/grain as serious Kitchen/Home/Seasonal material.
- Risks / extraction cautions: No prosperity guarantees, recipes, health claims, or public reenactments.

### Candidate SourceNote: Sweetened Word Must Stay Bounded

- Proposed key: `candidate.note.sweetened_word_must_stay_bounded`
- Source candidates: Brand/Ellis or Chambers only if exact hospitality/material sweetness support is located; Burne/Gomme for classification
- Source area / location basis, if known: Hospitality/sweetness/material welcome; exact support required later.
- Transformed note: Sweetness can frame bounded speech or welcome only when the ritual uses a vessel, material limit, and closure.
- Review basis: Tim decision for `honeyed_word`.
- Risks / extraction cautions: Do not use coercive love magic, apology scripts, relationship advice, or sentimental filler.

### Candidate SourceNote: Folded Carried Word Mechanics

- Proposed key: `candidate.note.folded_carried_word_mechanics`
- Source candidates: Hohman restricted mechanics-only; Brand/Ellis/Chambers for first/last word timing if supported
- Source area / location basis, if known: Written/folded/carried/placed phrase mechanics; exact location notes required later.
- Transformed note: A written phrase can be folded, placed, carried, timed, returned, or put away as structure, without copying charms or claiming effects.
- Review basis: Hohman mechanics-only boundary plus Reflection route needs.
- Risks / extraction cautions: Do not extract wording, prayers, claims, remedies, coercive formulas, or spell-database structure.

### Candidate SourceNote: First Word / Last Word

- Proposed key: `candidate.note.first_word_last_word`
- Source candidates: Chambers; Brand/Ellis; Hohman mechanics-only only if phrase duration/return is needed
- Source area / location basis, if known: Calendar/threshold/word mechanics; exact location notes required later.
- Transformed note: A first word can open a household threshold and a last word can close one, if the ritual names the timing and ends cleanly.
- Review basis: First-day / last-day / month-turn direction.
- Risks / extraction cautions: No predictions, luck claims, prayers, or formulaic charms.

## SymbolicCard Candidates

These are candidates only. They are not active SymbolicCards.

### Candidate SymbolicCard: Threshold Arrival

- Proposed key: `candidate.card.threshold_arrival`
- Title: Threshold Arrival
- Summary: A crossing into the home or into a new time can be marked by one narrow arrival action.
- Themes: arrival, crossing, entry, return, first step
- Good-for uses: Home threshold, Seasonal entry, first day, month turn, Reflection threshold phrase
- Avoid-saying guardrails: Do not promise protection, luck, safety, or prosperity. Do not use as a generic low-capacity fallback.
- Source note refs: `candidate.note.threshold_arrival_requires_crossing`, `candidate.note.calendar_threshold_first_last_attention`
- Confidence: candidate
- Approval recommendation: Use carefully after exact source locations are reviewed.

### Candidate SymbolicCard: Returnable Key

- Proposed key: `candidate.card.returnable_key`
- Title: Returnable Key
- Summary: A key can make crossing and return tangible when it is touched, carried, placed, and put back.
- Themes: threshold, return, belonging, carried marker, closure
- Good-for uses: Home arrival, threshold grounding, first/last day, leaving/returning attention
- Avoid-saying guardrails: Do not claim security, protection, control, or luck.
- Source note refs: `candidate.note.key_as_returnable_threshold_marker`
- Confidence: candidate
- Approval recommendation: Good candidate if source support is specific enough.

### Candidate SymbolicCard: Vessel

- Proposed key: `candidate.card.vessel`
- Title: Vessel
- Summary: A bowl or cup gives a small household act a container and a clean ending.
- Themes: holding, receiving, emptying, return, containment
- Good-for uses: Kitchen warmth, Home table, Reflection phrase, Seasonal marker, salt/water clearing
- Avoid-saying guardrails: Do not make the vessel a generic prop. It needs activation and closure.
- Source note refs: `candidate.note.vessel_holds_and_empties_the_work`
- Confidence: candidate
- Approval recommendation: Strong candidate for future content depth.

### Candidate SymbolicCard: Bread and Grain

- Proposed key: `candidate.card.bread_grain`
- Title: Bread and Grain
- Summary: Bread or grain can mark enoughness, beginning, welcome, or seasonal household continuity at the table.
- Themes: table, enoughness, beginning, welcome, season, ordinary nourishment
- Good-for uses: Kitchen, Home, Seasonal, shared table, grain beginning
- Avoid-saying guardrails: No prosperity, health, abundance guarantee, or recipe burden.
- Source note refs: `candidate.note.bread_grain_at_the_table`
- Confidence: candidate
- Approval recommendation: High-priority candidate.

### Candidate SymbolicCard: Folded Word

- Proposed key: `candidate.card.folded_word`
- Title: Folded Word
- Summary: A written phrase can become material by being folded, placed, carried, returned, or put away.
- Themes: phrase, focus, carrying, duration, closure
- Good-for uses: Reflection, threshold phrase, first word/last word, low-capacity naming
- Avoid-saying guardrails: No charm wording, prayers, formulas, guarantees, or coercion.
- Source note refs: `candidate.note.folded_carried_word_mechanics`, `candidate.note.first_word_last_word`
- Confidence: candidate
- Approval recommendation: Use carefully with Hohman restriction.

### Candidate SymbolicCard: Salt Water Clearing

- Proposed key: `candidate.card.salt_water_clearing`
- Title: Salt Water Clearing
- Summary: Salt and water can support release when the ritual is explicitly about rinsing, emptying, or clearing.
- Themes: release, rinsing, emptying, clearing, containment
- Good-for uses: Home clearing, Kitchen clearing, waning/release focus, end-of-week closing
- Avoid-saying guardrails: No protection, danger removal, medical, death, omen, or coercive claims. Do not use for arrival/tending by default.
- Source note refs: `candidate.note.salt_water_belongs_to_clearing`, `candidate.note.vessel_holds_and_empties_the_work`
- Confidence: candidate
- Approval recommendation: Good candidate if constrained.

## RitualPattern Candidates or Rebuild Targets

These are candidates and rebuild directions only. They are not active RitualPatterns.

### Candidate / Rebuild: Doorway Arrival Word

- Proposed key: `candidate.pattern.doorway_arrival_word`
- Title: Doorway Arrival Word
- Practice domains: Home, Reflection, Seasonal
- Magical functions: arrival, crossing, first word, grounding at threshold
- Material forms: doorway, word, key or hand at threshold
- Timing affinities: first day, month turn, arrival home, first crossing, seasonal entry
- Activation modes: cross, touch/place, say/write one arrival word
- Duration mode: momentary / low
- Closure mode: step fully in, return the key/object, leave the word at the threshold or put it away
- Capacity fit: pause, low, steady
- Visible route fit: Home, Seasonal, Reflection
- Materials: doorway; optional key or folded word
- Source note refs: `candidate.note.threshold_arrival_requires_crossing`, `candidate.note.first_word_last_word`, `candidate.note.key_as_returnable_threshold_marker`
- Eligibility notes: Must require real arrival/crossing/threshold context.
- Avoid-if notes: Avoid for generic low capacity, clearing, Kitchen warmth, Plant, tending us, or unresolved Surprise me.
- Non-goals: Not protection, luck, warding, or home security.
- Approval recommendation: Recommend future implementation as narrow arrival-specific pattern.

### Rebuild Target: `carried_key_word`

- Current pattern: `carried_key_word`
- Direction: Strengthen with key-as-returnable-threshold-marker logic.
- Needed improvements: Source lineage, carry prompt that names key/threshold/return, diagnostics to prevent generic fallback behavior.
- Source note refs: `candidate.note.key_as_returnable_threshold_marker`, `candidate.note.threshold_arrival_requires_crossing`
- Approval recommendation: Keep active pattern but deepen in a later implementation PR.

### Rebuild Target: `salt_clear_water_release`

- Current pattern: `salt_clear_water_release`
- Direction: Keep strong for clearing/release; prevent arrival/tending overreach through presentation, source summaries, diagnostics, and scoring only if needed.
- Needed improvements: Make rinsing/pouring/emptying closure explicit; show why salt/water belongs only when clearing is central.
- Source note refs: `candidate.note.salt_water_belongs_to_clearing`, `candidate.note.vessel_holds_and_empties_the_work`
- Approval recommendation: Keep, but constrain by meaning and diagnostics.

### Rebuild Target: `grain_bowl_beginning`

- Current pattern: `grain_bowl_beginning`
- Direction: Treat bread/grain as serious Kitchen/Home/Seasonal material.
- Needed improvements: Stronger lineage around grain/bread/table/beginning; carry prompt around waiting/seed/grain/bowl; optional accent should not be generic.
- Source note refs: `candidate.note.bread_grain_at_the_table`, `candidate.note.vessel_holds_and_empties_the_work`
- Approval recommendation: High-priority enrichment.

### Candidate / Rebuild: Bread at the Center

- Proposed key: existing `bread_at_the_center` if present, otherwise `candidate.pattern.bread_at_the_center`
- Title: Bread at the Center
- Practice domains: Kitchen, Home, Seasonal
- Magical functions: enoughness, welcome, table center, seasonal continuity
- Material forms: bread, plate, table, shared surface
- Timing affinities: return home, seasonal table, first/last meal marker, month turn
- Activation modes: place, name enoughness, share or return to ordinary use
- Duration mode: low / steady
- Closure mode: eat, put away, or clear the plate without ceremony creep
- Capacity fit: low, steady
- Visible route fit: Kitchen, Home, Seasonal
- Materials: normal household bread or substitute; no recipe requirement
- Source note refs: `candidate.note.bread_grain_at_the_table`
- Eligibility notes: Must allow dietary/allergy alternatives and avoid prosperity framing.
- Avoid-if notes: Avoid if food burden, allergy, or scarcity framing would make it wrong.
- Non-goals: Not prosperity magic, health advice, recipe, or public festival reenactment.
- Approval recommendation: Recommend focused future issue.

### Rebuild Target: `honeyed_word`

- Current pattern: `honeyed_word`
- Direction: Constrain through presentation, carry prompt, source summary, and diagnostics before scoring constraints.
- Needed improvements: Make sweetness material and bounded; include vessel closure; keep away from apology, relationship advice, generic softness, or wellness language.
- Source note refs: `candidate.note.sweetened_word_must_stay_bounded`, `candidate.note.vessel_holds_and_empties_the_work`
- Approval recommendation: Keep, but audit closely as a possible soft default.

### Rebuild Target: `folded_phrase_vessel`

- Current pattern: `folded_phrase_vessel`
- Direction: Strengthen folded/placed/carried word mechanics while respecting Hohman restrictions.
- Needed improvements: Source summaries should say mechanics only; carry prompt should refer to folded phrase and where it rests; no charm language.
- Source note refs: `candidate.note.folded_carried_word_mechanics`, `candidate.note.vessel_holds_and_empties_the_work`
- Approval recommendation: Good candidate for future implementation if Hohman remains restricted.

### Candidate / Future Timing Support: First Word / Last Word

- Proposed key: `candidate.pattern.first_word_last_word`
- Title: First Word / Last Word
- Practice domains: Reflection, Home, Seasonal
- Magical functions: opening, closing, calendar threshold, phrase as temporal marker
- Material forms: spoken word, written word, folded phrase, threshold or table
- Timing affinities: first day, last day, month turn, seasonal entry, evening close
- Activation modes: choose one word, place/speak it, let it mark the threshold
- Duration mode: pause / low
- Closure mode: put away, return, or replace the first word with the last word
- Capacity fit: pause, low, steady
- Visible route fit: Reflection, Home, Seasonal
- Materials: paper optional; no charm script
- Source note refs: `candidate.note.first_word_last_word`, `candidate.note.calendar_threshold_first_last_attention`
- Eligibility notes: Needs real timing support before active recommendation.
- Avoid-if notes: Avoid generic reflection fallback.
- Non-goals: Not affirmation, prayer, spell formula, or prediction.
- Approval recommendation: Recommend after first-day / last-day / month-turn timing exists.

## RitualPresentation Direction

Future presentation should be material-native, not wrapper-native.

Good directions:

- Threshold arrival: "Let the doorway receive one arrival word." The body should involve an actual crossing and a clean return/step-in.
- Key: "Carry one word with the key, then return both to the threshold." The key must return to ordinary use.
- Bread/grain: "Let the table hold one small sign of enough." The ritual closes when the bread/grain is eaten, put away, or returned.
- Salt/water: "Let the bowl hold what is being cleared, then empty it." The ritual closes through pouring away, rinsing, or clearing the vessel.
- Honeyed word: "Let sweetness bound one word, then close the vessel." The ritual should not imply apology, persuasion, or relationship repair.
- Folded phrase: "Fold the phrase so it has somewhere to rest." The ritual closes when the paper is placed, carried for a clear duration, returned, or put away.

Avoid directions:

- generic "say one thing" copy
- generic "make space" copy without material action
- "no explanation required" repeated as anti-therapy boilerplate
- generic optional candle add-ons
- source-compliance language in the user-facing copy
- "this protects / attracts / guarantees"

## Proposed RitualMeaningBridges

### Bridge: Beginning During Waning or Closing Timing

- From timing / focus / practice / context: Beginning focus plus waning, last-day, or closing timing.
- To ritual meaning: Prepare the place for a beginning rather than forcing active growth.
- Bridge summary: A beginning can start as clearing a place, placing grain, choosing first word, or naming what will be ready next.
- Carry prompt idea: What is the first thing that can wait in its vessel?
- Avoid-saying guardrails: Do not call the timing wrong; do not fall back to generic release.

### Bridge: Threshold Arrival with Low Capacity

- From timing / focus / practice / context: Home threshold / arrival plus low capacity.
- To ritual meaning: Let crossing itself be the ritual; do not add a full household task.
- Bridge summary: The doorway, key, or first word can hold the transition.
- Carry prompt idea: What word belongs on this side of the threshold?
- Avoid-saying guardrails: Do not create a generic safe ritual; require real threshold context.

### Bridge: Sweetness Without Relationship Processing

- From timing / focus / practice / context: Tending us or welcome plus honey/sweetness.
- To ritual meaning: Sweetness bounds the word; it does not solve the relationship.
- Bridge summary: A material sweetener can make speech gentle and finite when the vessel closes.
- Carry prompt idea: What word can be sweetened and then left in the vessel?
- Avoid-saying guardrails: No apology script, advice, persuasion, or emotional outcome.

### Bridge: Salt Water Only When Clearing Is Central

- From timing / focus / practice / context: Salt/water available but focus is not release.
- To ritual meaning: Set salt/water aside unless the ritual function is clearing, rinsing, or emptying.
- Bridge summary: Salt/water works when there is something to clear; it should not answer arrival or tending by default.
- Carry prompt idea: What is ready to be poured away?
- Avoid-saying guardrails: No protection, danger removal, or broad fallback behavior.

## Proposed Quality Scenarios

### Proposed RecommendationQualityScenario: Threshold Arrival Should Not Become Clearing

- Scenario id: `packet2.threshold_arrival.not_clearing`
- Inputs: Home, Marking a threshold, steady capacity, arrival/first crossing timing
- Expected qualities: Threshold, doorway, key, first word, or entry form wins.
- Disallowed outcomes: Salt/water clearing, table speech, generic low-capacity fallback.
- Warning risks: threshold form missing, broad pattern overselected.
- Human review notes: Should test the narrow arrival rule.

### Proposed RecommendationQualityScenario: Bread Grain Beginning

- Scenario id: `packet2.kitchen.grain_beginning`
- Inputs: Kitchen, Making a beginning, low or steady capacity, optional month-turn timing
- Expected qualities: Grain/bowl/bread/table beginning form wins.
- Disallowed outcomes: Full light clarity, honey softness, generic phrase.
- Warning risks: kitchen material form missing.
- Human review notes: Bread/grain should be serious material, not a cue.

### Proposed RecommendationQualityScenario: Honeyed Word Must Stay Bounded

- Scenario id: `packet2.honeyed_word.bounded`
- Inputs: Kitchen or Home, Tending us or quiet welcome, low capacity
- Expected qualities: Sweetness is material, finite, and closed in a vessel.
- Disallowed outcomes: apology, relationship advice, wellness softness, generic affection.
- Warning risks: honeyed word overselected, anti-therapy boilerplate.
- Human review notes: Watch whether #155 fixed presentation before scoring is touched.

### Proposed RecommendationQualityScenario: Folded Phrase Mechanics

- Scenario id: `packet2.reflection.folded_phrase_mechanics`
- Inputs: Reflection, Saying clearly or carrying one phrase, low capacity
- Expected qualities: Written/folded/placed/carried form wins with clear return or resting place.
- Disallowed outcomes: charm wording, prayer, formula, outcome claim, generic table words.
- Warning risks: source leakage, Hohman restriction violation, ritual form mismatch.
- Human review notes: Should include a check that Hohman remains mechanics-only.

### Proposed RecommendationQualityScenario: First Word / Last Word Timing

- Scenario id: `packet2.timing.first_last_word`
- Inputs: Seasonal or Reflection, first-day/month-turn or last-day timing, low capacity
- Expected qualities: First/last word or calendar-threshold ritual form becomes eligible.
- Disallowed outcomes: generic lunar fallback, unsupported date claim, fake schedule.
- Warning risks: timing reason too thin, calendar threshold missing.
- Human review notes: Requires future timing support; not implementable from this packet alone.

## What To Avoid / Demote

### Avoid as active content

- copied charm wording
- prayer or benediction-derived copy
- remedy, healing, veterinary, or medical material
- protection/warding guarantees
- prosperity or luck outcome claims
- coercive love/speech formulas
- bad-luck-if customs
- gendered first-foot rules
- death/corpse/omen material
- public festival reenactments as private household instruction
- generic folklore "flavor" without material/action logic

### Demote or constrain if overused

- `honeyed_word`: watch as a possible soft default. Constrain presentation, carry, source summary, and diagnostics before scoring changes.
- `salt_clear_water_release`: keep strong for clearing/release; do not let it answer arrival or household tending.
- broad table-speech forms: keep useful when table/speech is the real material logic; do not let them replace threshold, bread/grain, folded phrase, or vessel forms.
- threshold forms: do not create a new lazy fallback. Threshold arrival must require actual threshold/arrival/crossing/timing support.

## Recommended Implementation Issues

### Issue A: Add first-day / last-day / month-turn timing support

- Goal: Compute or derive first-day, last-day, month-turn, and seasonal-entry timing facts.
- Use packet support from: Chambers, Brand/Ellis, Burne/Gomme method.
- Must include: first crossing, first word, last word, month turn, seasonal entry, emptying/returning timing hooks.
- Must not include: fake schedules, urgency, bad-luck logic, unsupported almanac claims.
- Acceptance idea: Timing can select candidate first/last/threshold signals without showing every calendar fact.

### Issue B: Strengthen bread and grain as Kitchen/Home/Seasonal material

- Goal: Add active SourceReviews/SourceNotes/cards/pattern updates for bread/grain/table enoughness and beginning.
- Use packet support from: Brand/Ellis, Chambers, cross-check with Thiselton-Dyer/Henderson only if exact support is located.
- Targets: `grain_bowl_beginning`, `bread_at_the_center`, possible seasonal table pattern.
- Must not include: prosperity claims, health claims, recipes, abundance guarantees, scarcity moralizing.

### Issue C: Constrain `honeyed_word` presentation and diagnostics

- Goal: Make honeyed speech material, bounded, vessel-based, and closed.
- Use packet support from: exact hospitality/sweetness source support if located; Burne/Gomme classification; no Hohman.
- Must include: solo/together variants if needed, carry prompt tied to honey/vessel/closure, source summary that does not overclaim.
- Must not include: relationship advice, apology scripts, love magic, persuasion, generic softness.
- Scoring note: Do not add scoring constraints unless over-winning persists after presentation/carry/source-summary/diagnostic fixes.

### Issue D: Add folded/carried/placed word mechanics under Hohman restrictions

- Goal: Support folded phrase, carried word, placed phrase, duration, return, and closure mechanics.
- Use packet support from: Hohman restricted mechanics-only; Chambers/Brand for first/last timing where appropriate.
- Must include: explicit restriction tests preventing charm wording, prayers, remedies, protection claims, coercion, and source-summary lineage from Hohman by default.
- Must not include: spell database behavior or copied formulas.

### Issue E: Narrow threshold arrival pattern support

- Goal: Add or rebuild a threshold-arrival pattern only if arrival/crossing/threshold context is explicit.
- Candidate: `doorway_arrival_word` or a rebuild of `carried_key_word`.
- Must include: eligibility guardrails and diagnostics for threshold over-selection.
- Must not include: generic low-capacity fallback, clearing, tending us, Kitchen warmth, Plant, or unresolved Surprise me selection.

### Issue F: Improve source summaries for Batch 1 and packet-backed forms

- Goal: Make user-facing source summaries identify material lineage lightly without raw IDs.
- Examples: calendar-threshold customs, household vessel mechanics, bread/grain table customs, folded-word mechanics, threshold arrival forms.
- Must not include: over-footnoting, user-facing Hohman lineage by default, raw source keys, or copied wording.

## Implementation Checklist

These items should remain unchecked until a later implementation PR uses an `approved_for_implementation` packet.

- [ ] SourceReviews added
- [ ] SourceNotes added
- [ ] SymbolicCards added
- [ ] RitualPatterns added
- [ ] RitualPresentation added
- [ ] RitualMeaningBridges added
- [ ] Quality scenarios added
- [ ] Diagnostics updated
- [ ] Tests added
- [ ] Docs updated
- [ ] Human review completed

## Open Questions For Tim

1. Should this packet become `approved_for_implementation` after review, or should it remain `ready_for_review` until exact source locations are added for each proposed SourceNote?
2. For Hohman, is "mechanics-only" acceptable if user-facing source summaries never name it, or should Hohman remain entirely invisible even in internal source summaries?
3. Should `doorway_arrival_word` be a new future pattern, or should `carried_key_word` be rebuilt to cover narrow arrival use cases?
4. Should bread and grain get one combined SymbolicCard, or separate cards for bread, grain, and table?
5. Does honey stay in Kitchen/Home only, or can it support Reflection when the material vessel is explicit?
6. Should first-day / last-day / month-turn timing be computed from calendar dates only, or should it also include lunar month / seasonal boundary support later?
7. How visible should historical/regional source lineage be in normal "How this was chosen" details?

## Codex Boundaries

This packet is not active content. It must not be used by the generator until a later human-reviewed implementation issue adds active SourceReviews, SourceNotes, cards, patterns, presentations, bridges, diagnostics, tests, or docs.

This PR intentionally does not:

- add active SourceNotes
- add active SymbolicCards
- add active RitualPatterns
- add RitualPresentation fields
- change scoring
- change diagnostics
- change UI
- add new visible categories
- add private data
- copy source wording
- use unlisted sources
