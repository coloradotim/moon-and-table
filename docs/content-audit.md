# Content Audit

This audit reviews the source-controlled Moon & Table content library after the first source, symbolic card, ritual pattern, timing, and generator passes. It only covers repository content. It does not inspect private Firestore data, local private seed files, birth data, raw natal placements, relationship details, schedules, or private source text.

The current library is strong enough to keep producing privacy-safe weekly recommendations from approved cards, approved timing rules, approved ritual patterns, capacity, preferences, and private profile theme signals. The main product risk is not lack of structure. The main risk is uneven depth: lunar, numerology, seasonal anchors, astrology grammar, home-tending, candle/color, ordinary kitchen ingredients, and careful plant/herb cues have usable MVP coverage, while source-location precision, deeper reachability diagnostics, and future plant-specific safety state need follow-up.

## Audit Baseline

Reviewed guidance:

- `AGENTS.md`
- `README.md`
- `docs/source-research-synthesis.md`
- `docs/source-ingestion-plan.md`
- `docs/curation-pipeline.md`
- `docs/data-model.md`
- `docs/timing-engine-decision.md`
- `docs/weekly-brief-design-brief.md`

Reviewed implementation areas:

- Source reviews and transformed source notes in `src/data/source-registry.ts`
- Symbolic cards in `src/data/seed-symbolic-cards.ts`
- Ritual patterns in `src/data/ritual-patterns.ts`
- Ritual safety flags and validation in `src/lib/ritual-safety.ts`
- Timing interpretation rules in `src/lib/timing-interpretation-rules.ts`
- Weekly brief generation in `src/lib/generate-weekly-brief.ts`
- Unit and Playwright tests under `tests/`

Current inventory:

| Content area | Count |
| --- | ---: |
| SourceReview entries | 49 |
| SourceNote entries | 96 |
| SymbolicCard entries | 69 |
| RitualPattern entries | 34 |
| TimingInterpretationRule entries | 115 |
| Eligible timing rules | 111 |

Reference integrity checks from the current data:

- Source note references used by cards, patterns, and rules resolve.
- Timing rules do not point at missing symbolic card keys.
- Symbolic card ritual pattern references resolve.
- No source notes are currently unreferenced by cards, rules, or patterns.

## Scorecard

| Area | Status | Why |
| --- | --- | --- |
| Privacy boundary | Ready | Source-controlled content uses generic placeholders and keeps private profile data out of the repo. |
| SourceReview structure | Ready | Reviews include use decisions, concerns, copyright notes, safety notes, extraction notes, and confidence. |
| SourceNote structure | Ready with follow-up | Notes are short, transformed, non-verbatim, and validated, but location notes are mostly doc-level rather than page/chapter/source-specific. |
| Lunar cards | Ready | Four-phase MVP is structured, approved, source-backed, and linked to patterns. |
| Numerology | Ready | Universal date numerology is computed and interpreted as accent-level only with 1-9 cards and rules. |
| Seasonal anchors | Ready | Solstice/equinox anchors exist with source notes, cards, rules, and safe ritual links. |
| Astrology timing | Ready with follow-up | Sun through Saturn, all signs, major aspects, retrograde, and selected practical combinations are usable. Source-note location precision and future planet/aspect combination breadth need follow-up. |
| Private profile themes | Ready for runtime use | Repo cards are generic placeholders; runtime profile data can influence scoring and explanation without exposing raw placements by default. |
| Home-tending patterns | Ready | Pattern set is useful, approved, bounded, and safety-filtered. |
| Kitchen, plant, light patterns | Ready with follow-up | Core patterns, ordinary bread/oats/apple/cooking cues, basil/mint/thyme/sage/lavender, houseplant cues, and pet/allergy guardrails exist; future work can add per-household plant safety state. |
| Candle/color symbolism | Ready with follow-up | Candle flame, optional color accents, and safety sources are traceable; deeper color/candle mechanics should remain optional and non-deterministic. |
| Safety model | Ready | Blocks deterministic claims, medical claims, smoke defaults, essential oil ingestion, crystal elixirs, control rituals, and undeclared candle work. |
| Generator content use | Ready | Generator selects approved cards and approved ritual patterns, records decisions, hides raw trace by default, and keeps schedule assumptions inert. |
| Reachability diagnostics | Ready with follow-up | `npm run diagnose:content` reports selected, evaluated, rejected, and gap coverage across representative privacy-safe scenarios. Some approved patterns remain healthy rare alternates or need future taxonomy hooks. |

## SourceReview Coverage

Strong coverage:

- Computed timing: Astronomy Engine, with Swiss Ephemeris, wrappers/APIs, and JPL Horizons now explicit as deferred or context-only source families.
- Astrology interpretation and ethics: Steven Forrest, Kevin Burk, April Elliott Kent, astrology ethics source family, Barnum/Forer guardrails, with Chani Nicholas, Robert Hand, Demetra George, and popular astrology sites explicit as deferred/context-only or anti-pattern context.
- Numerology: Hans Decoz / Tom Monte, David Phillips, Barnum/Forer guardrails, with Juno Jordan / Javane / Lawrence and commercial numerology sites explicit as context/avoid source families.
- Lunar symbolism: Sarah Faith Gottesdiener and Rachel Patterson, with Yasmin Boland, Diane Ahlquist, Llewellyn Moon Sign Book, and We'Moon/oracle decks explicit as context/deferred source families.
- Home, kitchen, plant, and domestic magic: Laurel Woodward, Arin Murphy-Hiscock, Cheryl Mendelson, Shoukei Matsumoto, Tess Whitehurst, Scott Cunningham as context-only cross-check, and Rosemary Gladstar as herbalism context only.
- Safety: CDC, EPA, NFPA, FDA, Poison Control, ASPCA, VCA, and a general safety reference family.
- Seasonal/almanac: NOAA/NWS, Temperance Alden, Anna Franklin, Old Farmer's Almanac as context only.

Gaps and follow-up needs:

- Candle/color source family now has a reviewed MVP batch: Madame Pamita, Sandra Kynes as context, USFA, CPSC, Candle Association, and NFPA safety coverage.
- Kitchen ingredient breadth now covers ordinary-use tea, soup/warm drink, lemon, salt, rosemary, bread, oats, apples, ordinary cooking, kitchen reset, and related patterns. Future expansion should stay ordinary-use and safety-gated.
- Plant/herb breadth now covers rosemary, basil, mint, thyme, sage, lavender, plant tending, and a generic houseplant cue. All plant/herb content requires pet/allergy caution and stays out of herbal medicine, smoke, essential oil, and supplement territory.
- Deferred/context source families are now represented in the registry, but they intentionally do not power approved cards, ritual patterns, or timing interpretation rules. Future work should add transformed SourceNotes and tests before any deferred/context family becomes active content.

## SourceNote Depth

What works:

- Source notes are short, transformed, and non-verbatim.
- The note categories line up with the current product areas: computed timing, lunar, numerology, astrology, seasonal, home tending, kitchen/plant, and safety.
- Current card, rule, and pattern references resolve to existing note ids.
- The astrology note layer now has practical notes for bodies, signs, aspects, retrograde, and household-actionable combinations, including Moon/Cancer, Moon/Virgo, Mercury/Cancer, Mercury/Virgo, Venus/Leo, Venus/Libra, Mars/Capricorn, Saturn/Taurus, Jupiter/Sagittarius, and selected aspect patterns.
- Numerology notes cover numbers 1-9 and guard against destiny, compatibility, and personality certainty.
- Seasonal notes distinguish factual solar markers from symbolic home practice.

What is thin:

- Location notes are intentionally safe but broad. Tests currently expect `docs/source-research-synthesis.md` in each note location. That is useful for MVP traceability, but not enough for a human curator to re-open the actual reviewed book/source location later.
- The previously unreferenced notes are now attached to the content graph. `note.computed_facts_are_not_meanings` supports lunar and seasonal timing interpretation rules, and `note.poison_control_essential_oil_block` supports food and drink ritual safety.
- Source notes rarely say which source was most helpful versus which source was a guardrail. This matters for user-facing source transparency and future curation.

## SymbolicCard Coverage

Ready:

- Four lunar phase cards only: new, waxing, full, waning.
- Numerology cards for 1-9.
- Astrology cards for Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, all 12 signs, five major aspects, and retrograde.
- Seasonal cards for the four solstice/equinox anchors plus related seasonal home themes.
- Core home/kitchen/plant/light cards and generic private profile theme placeholders.
- All cards are approved, which keeps generation simple and predictable.

Gaps and cautions:

- All cards are approved. That is operationally convenient, but the library does not currently demonstrate a normal candidate/review/reject lifecycle in real data.
- No eight-phase lunar system exists, which is correct for MVP.
- No personal/natal cards tied to real people exist, which is correct. Private profile cards remain generic schema/prototype placeholders.
- Candle/color cards remain intentionally compact. Candle exists as practice and source-safe safety metadata, while color symbolism is represented only as an optional accent.
- Kitchen and plant cards are intentionally small. Additional ordinary ingredients, herbs, or plants should be added only through reviewed source notes, safety flags, and normal-use constraints.
- Outer planets are not approved symbolic cards. This is consistent with current timing docs: Uranus, Neptune, and Pluto can be computed as facts, but should remain fact-only until a reviewed source pass creates cards and rules.

## TimingInterpretationRule Coverage

Ready:

- Lunar phase rules remain the primary safe baseline.
- Numerology rules exist for 1-9 and are accent strength.
- Astrology rules cover moon sign, sun sign, core planet signs, retrogrades, and major aspects.
- Seasonal marker rules cover solstices and equinoxes.
- Four draft rules remain ineligible. Approved rules are the only default visible timing interpretation path.
- Rules reference source notes and symbolic cards.
- Signal summaries are human-readable and avoid raw ids.

Gaps and cautions:

- The rule set is large enough that reachability needs better diagnostics. The app should be able to answer which rule categories can actually surface under representative dates, capacities, profile preferences, and exclusions.
- Seasonal signals are available, but tests should continue proving they can surface near solstice/equinox dates without dumping every computed timing fact.
- Numerology should continue to be regression-tested as accent-level only.
- Planetary interpretation should stay limited to approved rules. Computed planetary facts alone should not create visible claims.
- Aspect rules stay broad enough to avoid unsupported planet-specific claims, but now use practical household-action summaries and ritual-style hints. Future source work should add planet/aspect combinations only where source notes support them.

## RitualPattern Coverage

Ready:

- There are 34 approved ritual patterns.
- Patterns include home tending, plant tending, candle/light focus, table reset, threshold reset, room reset, close-the-evening, kitchen, object return, rest cue, shared-space reset, small repair, seasonal anchors, salt/lemon/rosemary, basil/mint/thyme/sage/lavender, houseplant, and related low-overwhelm practices.
- Patterns have capacity modes, default durations, safety flags, safety notes, avoid-if notes, source references, and approval status.
- The generator selects from approved patterns instead of hardcoded ritual text.
- Pattern steps are bounded and generally avoid task lists, shopping, smoke, essential oils, medical claims, and heavy cleanup defaults.

Gaps and cautions:

- Candle/light now has a real candle flame pattern, light-focused seasonal patterns, reviewed candle/color notes, and an optional color-accent card. Color remains an accent, not a rule.
- Kitchen patterns avoid recipes, which is correct. Bread, oats, apples, and ordinary cooking are represented as small normal-use cues rather than recipe assignments.
- Plant/herb patterns now have pet/allergy metadata and ASPCA/VCA safety references. Future work should add household-specific plant safety state before suggesting named plant contact more confidently.
- There are no rejected/draft ritual patterns in the starter set. Tests exercise safety rejection, but real curation examples would make the workflow clearer.
- User-facing ritual copy is intentionally concise. The pattern data can support more explanation, but the app should continue avoiding long scripts.

## Reachability Follow-Up: Non-Winning Ritual Patterns

Issue #101 reviewed the approved ritual patterns that were evaluated by `npm run diagnose:content` but did not win in the sampled scenarios. The baseline before this pass sampled 48 privacy-safe scenarios, evaluated all 24 approved ritual patterns, selected 13 patterns, and left 11 approved patterns non-winning. The goal was not to make every approved pattern win. The goal was to separate healthy rare alternates from content that is unreachable because of broken metadata or scoring.

This pass found one scoring bug: shopping-avoidance guardrail prose such as "avoid if this would require shopping" was being treated as if the ritual required shopping. The generator now checks shopping burden against the materials list instead. After that targeted fix, `table_reset` naturally appears in the selected pattern set. The remaining non-winning patterns are still evaluated and remain available for future scoring, preference, or try-again improvements.

| Pattern key | Current diagnosis | Classification | Action taken or no-action rationale |
| --- | --- | --- | --- |
| `bed_blanket_rest_cue` | Scores close to `close_the_evening` in pause scenarios, but the more general closing practice wins because it has broader profile and default-capacity fit. | intentionally uncommon | No scoring change. Keep as a rest-specific alternate for future rest preference or explicit try-again paths. |
| `prune_one_dead_leaf` | Scores within a few points of winning in plant scenarios, but `tend_one_plant` wins because it carries broader plant-tending and card/timing fit. | healthy rare alternate | No scoring change. Keep as a narrow plant sub-action rather than pushing it above the main plant pattern. |
| `return_one_object` | Scores close in pause/low scenarios, but candle or kitchen patterns win when light, warmth, or profile signals stack. | intentionally uncommon | No scoring change. Keep as a very small alternate for low-capacity or try-again selection. |
| `rotate_plant_for_light` | Evaluates cleanly and receives plant/light matches, but `tend_one_plant` or kitchen patterns win when broader profile fit is stronger. | healthy rare alternate | No scoring change. Keep as a narrow plant-light option that should surface only with stronger plant/light preference hooks. |
| `seasonal_table_home_reset` | Has seasonal/card linkage, but still loses to broad kitchen or table patterns when practical home-tending profile matches dominate. | needs better preference/profile/timing hooks | No immediate scoring boost. Future seasonal work should add a clearer seasonal-home preference hook rather than forcing this pattern to win. |
| `shared_space_reset` | Can be rejected when heavy-cleanup avoidance is active and otherwise loses to broader table or kitchen resets. | needs better preference/profile/timing hooks | No scoring change. Keep capacity and heavy-cleanup avoidance dominant; revisit only with a clearer shared-space preference. |
| `simple_warm_drink` | Was unfairly rejected by the shopping-prose heuristic; now evaluates positively but still loses to broader table/kitchen patterns. | needs ritual style taxonomy adjustment | Fixed the shopping heuristic. Future taxonomy should distinguish warm-drink care from generic kitchen reset. |
| `small_repair` | Evaluates positively after the shopping-prose fix, but lacks enough structured-action timing/profile weight to beat kitchen reset in sampled scenarios. | needs better preference/profile/timing hooks | No score boost. Keep as an approved high/steady alternate; revisit with a clearer repair or bounded-action preference hook. |
| `soften_one_corner` | Evaluates positively after the shopping-prose fix, but generic home/kitchen patterns still win when practical-care signals stack. | needs ritual style taxonomy adjustment | No score boost. Future taxonomy should distinguish atmosphere/softening from generic home tending. |
| `table_reset` | Was unfairly rejected when shopping or heavy-cleanup avoidance came from profile inputs. After the shopping heuristic fix, it naturally wins in one sampled scenario. | needs better preference/profile/timing hooks | Targeted action taken: fixed shopping-burden detection. Heavy-cleanup avoidance still correctly blocks medium-cleanup cases. |
| `tea_ritual` | Was unfairly rejected by the shopping-prose heuristic; now scores strongly but loses to kitchen reset when kitchen and profile signals stack. | needs ritual style taxonomy adjustment | Fixed the shopping heuristic. Future taxonomy should distinguish tea/warmth from broad kitchen reset. |

## Safety And Quality

Strong protections:

- Essential oil ingestion is blocked.
- Smoke cleansing defaults are blocked.
- Medical, fertility, pregnancy, legal, financial, deterministic, and control-another-person claims are blocked.
- Crystal elixirs are blocked.
- Raw dough/flour crafts are blocked.
- Candle work must declare fire safety if instructions mention flame, lit candles, or burning.
- Live flame is allowed when explicitly flagged as `live_flame`; it is not treated as an impossible practice.
- Low capacity and cleanup burden are represented.
- Safety flags are attached to patterns, not buried only in prose.

Needed improvements:

- Pet and allergy handling should become more specific before expanding herbs or plants.
- Content linting should continue expanding as new safety-sensitive content families are added.

## Generator Readiness

Ready:

- The generator accepts date, capacity, preferences, profile theme inputs, audience, and exclusions.
- It gathers computed timing facts and selected timing signals.
- It selects approved symbolic cards and approved ritual patterns.
- It records selected and rejected candidates with scoring reasons.
- It keeps schedule assumptions inert in user-facing output.
- It hides raw trace/debug details by default while preserving trace and decision data internally.
- Try-again can select another approved ritual pattern without inventing unapproved content.

Gaps and cautions:

- The legacy schedule types remain for compatibility. This is acceptable only while they remain inert in default output.
- The content reachability report is intentionally sampled. It should guide curation, but it should not be used as a reason to make every approved pattern win.
- The generator can include private profile theme influence, but default UI should continue using theme language unless an explicit future feature designs deeper authenticated disclosures.

## Product-Language Audit

The current content mostly follows Moon & Table tone:

- Calm, practical, domestic, low-overwhelm.
- Invitational rather than deterministic.
- Capacity-aware.
- Source-safe and paraphrased.
- Avoids horoscope certainty, manifestation guarantees, fear-based full moon language, heavy cleanup pressure, and task-manager phrasing.

Language risks to keep watching:

- Astrology can become too broad if every planet/sign rule says nearly the same thing.
- Safety copy can feel overbearing if it crowds out the actual ritual. The better path is precise flags, concise notes, and source-backed ordinary-use language.
- Home-tending can slip into moralized housekeeping if future patterns overuse cleaning language.
- Numerology can become too personality-like if future work adds personal numerology. That is currently out of scope.
- Source transparency should say what a source helped with, not merely that a source existed.

## Copy-Ready Follow-Up Issues

### 1. Add source-location precision for reviewed SourceNotes

Goal: Improve curator traceability without copying source text.

Tasks:

- Add optional structured location metadata for SourceNotes, such as source id, source family, chapter/section/page note when available, and review date.
- Keep all notes short, transformed, and non-verbatim.
- Update tests so notes no longer have to point only to `docs/source-research-synthesis.md`.
- Identify notes where only synthesis-level location is currently known.
- Do not commit private source files or copied passages.

Acceptance criteria:

- Existing notes remain valid.
- SourceNotes can point to more precise reviewed locations.
- No source prose is copied.
- `npm run check` passes.

### 2. Deepen reviewed candle and color layer

Goal: Keep the new candle/color layer practical and source-backed while leaving real candle flame available as an opt-in practice.

Tasks:

- Add only source-backed candle/color details that improve brief fit or source transparency.
- Keep color as an optional accent rather than a correspondence database.
- Keep candle mechanics short, practical, and ordinary-use.
- Keep live flame allowed when explicitly selected and safely flagged.
- Do not add copied spells, chants, prayers, recipes, or elaborate ceremony.

Acceptance criteria:

- Candle/light sources are traceable.
- Flame safety is concise and practical.
- Color symbolism is optional and non-deterministic.
- No smoke, oils, outcome claims, or copied source text are introduced.

### 3. Expand ordinary kitchen ingredient layer beyond MVP

Goal: Add useful kitchen symbolism beyond tea, lemon, salt, rosemary, bread, oats, apples, and ordinary cooking only when it stays ordinary-use and safe.

Tasks:

- Consider additional ordinary ingredients only with source notes, source refs, and safety flags.
- Keep all food/drink use normal household use only.
- Do not add recipes, medicinal claims, essential oils, supplements, or unfamiliar ingredient requirements.
- Add FDA/CDC/Poison Control safety references where relevant.

Acceptance criteria:

- New ingredient cards or patterns include source notes, safety flags, avoid-saying, and capacity guidance.
- Generated briefs can use them only when preferences/capacity/safety fit.
- No copied recipes or private data appear.

### 4. Deepen plant and kitchen-herb layer beyond the MVP

Goal: Build on the careful plant/herb set without turning Moon & Table into herbal medicine.

Tasks:

- Add household-specific plant safety state before recommending named plant contact more confidently.
- Consider additional plants or herbs only where source-backed, ordinary-use, and safety-gated.
- Keep herbs framed as ordinary household/kitchen symbolism only.
- Do not make medicinal, ingestion-as-therapy, smoke, or essential oil claims.

Acceptance criteria:

- Plant/herb entries keep explicit pet/allergy caution.
- Unsafe or uncertain plant/herb use is blocked or review-required.
- No casual pet-toxic recommendations are generated.

### 5. Add deferred/context source registry pass

Goal: Keep intentional deferrals visible instead of relying on docs alone.

Tasks:

- Keep `defer`, `context_only`, and `avoid` SourceReview entries current as the synthesis changes.
- Keep deferred/context entries from powering approved cards or rules until a focused source-note batch promotes them.
- Document what would need to change before each deferred source becomes usable.

Acceptance criteria:

- Deferred/context source families remain explicit.
- No unsupported rules become eligible.
- No copied prose is added.

### 6. Deepen content reachability diagnostics

Goal: Keep the existing reachability diagnostic useful as the library grows.

Tasks:

- Expand the existing representative scenario set only when a new content area needs coverage.
- Keep reporting selected timing rules, symbolic cards, ritual patterns, source reviews, and source notes.
- Flag approved content that is never reachable in sampled scenarios, while preserving healthy rare alternates.
- Add targeted diagnostics for taxonomy gaps such as warm drinks versus generic kitchen reset or softening versus generic home tending.
- Keep this diagnostic local/test-only; do not expose raw trace in default UI.

Acceptance criteria:

- Diagnostics can show category coverage for lunar, astrology, numerology, seasonal, profile, capacity, check-in practice choices, and ritual patterns.
- Practice-choice diagnostics distinguish visible choices that matched the selected ritual, were set aside, were skipped, or were intentionally open through `Surprise me`.
- Numerology diagnostics distinguish computed date numbers that were selected as accents, matched but stayed hidden, or did not match the selected ritual context.
- Unreachable approved content is reported with a curation diagnosis.
- `npm run check` passes.

### 7. Add content lint for claims, privacy, and copyright risks

Goal: Catch unsafe content regressions before review.

Tasks:

- Scan source-controlled cards, source notes, rules, patterns, tests, and docs examples for private-data markers.
- Scan for deterministic/prediction language, copied-looking long quotes, raw trace keys in default UI tests, and blocked safety phrases.
- Keep false positives manageable with explicit allowlists.

Acceptance criteria:

- The lint can run in CI or `npm run check`.
- It catches obvious deterministic, privacy, and copied-text risks.
- It does not require real private data.

### 8. Continue astrology source notes and combinations

Goal: Extend astrology timing carefully after the first practical combination pass, without exposing natal data or making claims.

Tasks:

- Add more precise source notes for additional practical planet/sign/aspect combinations that the generator is likely to select.
- Treat Moon/Cancer, Moon/Virgo, Mercury/Cancer, Mercury/Virgo, Venus/Leo, Mars/Capricorn, Saturn/Taurus, Venus/Libra, Jupiter/Sagittarius, and selected aspects as the current approved MVP coverage.
- Prioritize any next combinations only when they map cleanly to household action.
- Keep outer planets fact-only unless a new reviewed source pass approves them.
- Keep all language symbolic, invitational, and non-predictive.

Acceptance criteria:

- Approved astrology rules continue to have sourceNoteKeys/sourceReferences and useful ritual-style hints.
- Unsupported combinations remain broad, draft, or ineligible.
- No raw natal placements or private profile data appear in repo content.

### 9. Add curation lifecycle examples

Goal: Show how candidate, approved, needs-revision, rejected, and retired states work in real source-controlled examples.

Tasks:

- Add a small, privacy-safe set of candidate/rejected fixture cards or patterns that are not eligible for generation.
- Include reasons such as copied-source risk, safety risk, deterministic claim, or too much burden.
- Keep production generator behavior unchanged.

Acceptance criteria:

- Tests prove only approved content is eligible.
- Review-state examples make future curation less ambiguous.
- No unsafe content can render in default brief output.

## Immediate Recommendation

Open follow-up issues in this order:

1. Content reachability diagnostics.
2. Source-location precision for SourceNotes.
3. Candle/color source batch.
4. Kitchen ingredient expansion.
5. Plant/herb expansion.
6. Deferred/context source registry pass.
7. Content lint.
8. Additional astrology combination coverage only after source-location precision improves.
9. Curation lifecycle examples.

This order keeps the library auditable before expanding it much further. The current product can continue using the existing approved content while those follow-ups improve depth and governance.
