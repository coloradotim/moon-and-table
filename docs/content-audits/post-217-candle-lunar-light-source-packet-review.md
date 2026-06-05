# Post-217 Candle / Lunar-Light Source Packet Review

## 1. PR / Branch Summary

- PR number and title: pending, `Add candle and lunar-light source packet`
- PR URL: pending
- Branch name: `codex/issue-217-source-packet-4-candle-lunar-light`
- Base branch: `main`
- Issue addressed: #217, `Source Packet 4: Review candle magic, household flame, and lunar-light technologies`

Short implementation summary:

This branch adds one source packet document for Candle/light, household flame, and lunar-light ritual technologies. It classifies candidate source families, identifies what can be implemented from already-approved Carmina + NASA material, and separates that from work that must wait for #171 lunar-material review or a later human-selected modern candle-magic source review.

Files changed, grouped by purpose:

| Purpose | Files |
| --- | --- |
| Source packet document | `docs/content-packets/candle-household-flame-lunar-light-source-packet.md` |
| Human-review packet | `docs/content-audits/post-217-candle-lunar-light-source-packet-review.md` |
| Active source data | None |
| Tests | None |
| UI / generator / scoring | None |

No-active-content verification:

| Area | Changed? | Notes |
| --- | --- | --- |
| Active SourceNotes added | No | Candidate SourceNotes only, inside docs. |
| SymbolicCards added | No | Candidate SymbolicCards only, inside docs. |
| RitualPatterns added/revised/demoted | No | Candidate and rebuild targets only. |
| RitualPresentation copy changed | No | Presentation direction only. |
| Bridges added | No | Candidate bridge directions only. |
| Scoring changed | No | No generator/scoring files changed. |
| UI changed | No | No UI files changed. |
| New visible categories added | No | Routes stay within the existing visible categories. |
| Source wording copied into product content | No | No active product copy added. |
| Private data added | No | No names, birth data, placements, private schedule, or household details added. |

Expected answer for active content/scoring/UI is `no`, and that is what this branch does.

## 2. Validation Commands

| Command | Status | Notes |
| --- | --- | --- |
| `npm run lint:content` | Passed | Content lint passed with no findings. |
| `npm run typecheck` | Passed | TypeScript typecheck passed. |
| `npm run test -- tests/unit/source-registry.test.ts` | Passed | 1 test file, 18 tests passed. |
| `npm run diagnose:content` | Passed | Content reachability diagnostics completed; diagnostics/report output remains available. |
| `npm run check` | Passed | Included content lint, typecheck, build, 26 unit test files / 298 tests, and 2 Playwright tests. |

Validation was run locally on the rebased PR branch after #205 and #220 were merged into `main`.

## 3. Source Review Summary Table

| Source / family | Classification | Best use | Main risk | Implementation readiness |
| --- | --- | --- | --- | --- |
| Alexander Carmichael, _Carmina Gadelica, Volume I_ | approved existing adaptation candidate / direct mechanics for some household fire actions | kindling, smooring/banking, first light, evening closure, new moon acknowledgment, household field logic | Christian/Gaelic prayer material, cultural reenactment, copied cadence, protection promises | Ready for narrow Candle/light Batch A if copy is original and mechanics-only |
| NASA Science, _Moon Phases_ | approved timing/context source | honest visible-light timing for lunar phases | flattening lunar magic into astronomy explanation | Ready as timing support only |
| Existing reviewed lunar source families from #50/#80 | existing reviewed context; #171 still needed for material expansion | lunar tone, four-phase interpretation, possible lunar material direction | copyrighted/contemporary material, copied prompts/rituals, generic witch-content style | Use for context only until #171 reviews moonlit/moon-water material forms |
| Robert Chambers, _The Book of Days_ | existing #191 ritual technology / context | first/last/calendar light, seasonal threshold timing | trivia/holiday-feed drift | Secondary support only |
| John Brand / Henry Ellis, _Observations on Popular Antiquities_ | existing #191 ritual technology / context | occasion/custom structure, calendar/threshold light cross-checks | superstition cataloguing, church/festival reenactment, bad-luck logic | Secondary support only |
| Burne/Gomme, _The Handbook of Folklore_ | method/classification source | extraction discipline | mistaking method for ritual meaning | Review discipline only |
| Frazer, _The Golden Bough_ fire-festival material | context only / mostly avoid active practice | cautionary comparison for public fire customs | public reenactment, comparative speculation, universalizing claims | Do not use for active Candle/light MVP content |
| Leland, _Aradia_ | avoid active content / restricted context only if Tim explicitly requests | cautionary historical witchcraft context | spells, deity invocation, source controversy, copied rites, spell-database feel | Do not use for active content |
| Modern candle-magic manuals/websites/correspondence tables | avoid for now / candidate only after human source selection | possible future explicit modern candle-magic lineage | color/oil/herb/correspondence sprawl, copyrighted procedures, love/protection/prosperity systems | Defer to separate source-selection issue |
| Practical fire-safety references | safety/practical anchor only | eligibility, live-flame avoidance, hidden guardrails | safety copy leaking into ritual body | Use only in guardrails/variants, not user-facing metaphysics |

Blunt read: the next implementation should use **Carmina + NASA + existing app mechanics**, not random candle-spell sources. This keeps the app source-backed, private, and grimoire-like while giving Candle/light real ritual shape.

## 4. Main Packet Decisions

### Decision 1 — Candle/light Batch A can proceed without modern candle-magic sources

A narrow implementation slice can use already-approved Carmina fire mechanics and NASA visible-light timing. That is enough for:

- first light for a beginning;
- waning/lowered light release;
- strengthened banked light / covered light closure;
- unlit candle witness as a live-flame-avoided variant if copy stays careful.

This does not approve moon water, moonlit vessels, candle colors, oils, herbs, correspondences, or burn readings.

### Decision 2 — Moonlit object/vessel forms should wait for #171

The packet treats moonlit object rest, lunar window bowl, full moon vessel, moon water, and related lunar-material forms as promising but dependent on #171. Do not implement them from #217 alone unless Tim explicitly decides that a non-water moonlit object form can be supported by NASA + household-light mechanics.

### Decision 3 — Modern candle-magic source material stays deferred

Modern candle-magic manuals and internet correspondence tables should not be pulled into Codex work casually. If Tim wants explicit modern candle-magic lineage, create a separate source-selection issue with human-reviewed source candidates.

### Decision 4 — Live-flame-avoided variants must still feel magical

The packet keeps the #196 principle intact: flame avoidance should not become the headline and should not demystify the ritual. Valid alternatives include lamp, window light, morning light, an unlit candle witness, covered bowl, folded phrase, or object placement.

### Decision 5 — Natal/astrology contacts should shape technology, not produce horoscope copy

The candidate bridge model is:

```text
contact → theme pressure → ritual technology → quiet explanation
```

Example directions:

- Moon contact -> vessel/window/resting light;
- Mercury contact -> written/spoken light phrase;
- Venus contact -> warm/table light;
- Saturn contact -> banked/covered/threshold light.

These are product mappings, not source claims. They should be implemented later as bridges and recommendation logic, not as source lineage statements.

## 5. Recommended Human Review Focus

Review these areas before merging:

1. Whether Carmina + NASA are enough to approve a narrow Candle/light Batch A.
2. Whether moonlit object/window forms must wait fully for #171, or whether one non-water moonlit-object form can proceed earlier.
3. Whether `Aradia` and Frazer should remain avoid/context-only.
4. Whether modern candle-magic source review is worth doing soon, or should stay deferred.
5. Whether candidate pattern names fit the product voice:
   - `first_light_for_the_beginning`
   - `waning_light_release`
   - `unlit_candle_witness`
   - `window_light_threshold`
   - later `full_moon_light_bowl`
   - later `moonlit_object_rest`
6. Whether the candidate bridge mappings should feed #154 or a separate post-#154 bridge issue.

## 6. Recommended Next Implementation Issue

After this packet is accepted, the next implementation issue should be narrow:

### Implement Candle/light Batch A from approved household-light sources

Scope:

- Use only already-approved Carmina + NASA + existing approved app mechanics.
- Add or strengthen active content for:
  - `first_light_for_the_beginning`
  - `waning_light_release`
  - `unlit_candle_witness`
  - strengthen `bank_the_house_light` only if needed
- Add recommendation-quality scenarios:
  - Candle/light + New Moon + Making a beginning + low capacity
  - Candle/light + Waning + Clearing something out
  - Candle/light + live flame avoided
  - Full moon + Resting + Candle/light bridge, if #154 is ready
  - No strong timing + Candle/light selected
- Do not implement moon water, moonlit vessels, candle colors/oils/herbs, modern candle magic, burn readings, or astrology predictions.

## 7. Risks to Watch

- **Generic candle fallback returns.** Any new candle/light work must not revive `Optional: light a candle if that feels supportive`.
- **Candle/light becomes the new broad fallback.** New patterns need win/loss scenarios so they win true Candle/light contexts and lose Kitchen warmth, Plant, Home threshold, and generic low-capacity cases.
- **Safety copy leaks.** Fire safety should shape eligibility and variants, not normal ritual voice.
- **Lunar timing becomes command language.** NASA should support visible-light facts only. The moon should not be written as ordering release, beginning, or clarity.
- **Astrology becomes horoscope.** Natal contacts should shape ritual technology quietly and respect visibility settings.
- **Moonlit forms jump ahead of #171.** Hold lunar material forms unless Tim explicitly narrows the allowed pre-#171 slice.

## 8. Open Questions for Tim

1. Approve Candle/light Batch A before #171, limited to Carmina + NASA?
2. Keep all moonlit object/vessel forms blocked until #171, or allow one non-water window/moonlight object form earlier?
3. Should visible copy ever say `candle magic`, or should it mostly say `ritual light`, `first light`, `banked light`, and pattern-native titles?
4. Is `unlit candle witness` a good Moon & Table phrase, or should the product call it something warmer like `placed candle witness`?
5. Do candle colors/oils/herbs remain deferred for MVP?
6. Should the natal-contact candle bridges be folded into #154, or split into a follow-up after #154 lands?

## 9. Copyable PR Notes Draft

Summary:

- Added Source Packet 4 for candle magic, household flame, and lunar-light ritual technologies.
- Added a human-review packet for Tim/ChatGPT review.
- Classifies source candidates for Candle/light, lunar visible-light timing, live-flame-avoided variants, and astrology/natal-contact shaping.
- Recommends a narrow Candle/light Batch A from already-approved Carmina + NASA material.
- Holds moonlit vessels, moon water, and moonlit object material for #171 unless Tim explicitly narrows an allowed pre-#171 slice.
- Defers modern candle-magic manuals, candle colors, oils, herbs, correspondences, burn readings, and spell procedures to separate human source review.

Explicit non-implementation notes:

- No active SourceNotes were added.
- No active SymbolicCards were added.
- No RitualPatterns or RitualPresentations were added.
- No bridges, scoring, diagnostics, or UI changed.
- No new visible categories were added.
- No source wording was copied into app content.
- No private data was added.

Validation:

- `npm run lint:content` passed.
- `npm run typecheck` passed.
- `npm run test -- tests/unit/source-registry.test.ts` passed.
- `npm run diagnose:content` passed.
- `npm run check` passed.

Human review:

- Hold for Tim/ChatGPT review of source suitability and candidate implementation boundaries.
