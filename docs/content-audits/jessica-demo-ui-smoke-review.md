# Jessica Demo UI Smoke Review

Created for PR #223 cleanup on 2026-06-05. This is a UI/demo readiness smoke packet, not a new content packet.

## Scope

- Code changes reviewed: Candle/light presentation copy, capacity variants, recommendation-quality scenarios, and review docs.
- Runtime UI changes in this cleanup patch: none.
- New sources/cards/patterns/categories: none.
- Diagnostics/debug output: still available; not hidden.

## Check-In Flow Smoke Test

- Entry flow exists before the generated brief: app-shell tests cover the pre-brief check-in and the signed-in brief state.
- Time scope options include today and across-the-week language; the UI label renders "Across the week" for the best-moment path.
- Capacity step includes all capacity levels used by the generator, including Barely any capacity, Low, Enough to engage, and Room for something deeper.
- Audience step includes Me and Both of us.
- Practice type step includes Candle or light and Surprise me through the controlled check-in options.
- Ritual focus step includes the target demo focuses: Resting, Saying something clearly, Making a beginning, Marking a threshold, Tending us, and Clearing something out.

Verdict: acceptable for Jessica demo. No blocker found in the checked app-shell structure.

## Candle Or Light Category Smoke Test

- Candle or light can select low, steady, and high-capacity routes in recommendation-quality fixtures.
- Live-flame-avoided still selects `unlit_candle_witness` and now uses one unlit candle instead of a lamp/window/candle menu.
- Non-avoided candle/light routes no longer fall into `unlit_candle_witness` just because they are low capacity.
- Best-moment-this-week Candle/light high capacity selects a full witness arc with a timing window and does not use "five quiet minutes."

Verdict: acceptable. The category now feels like a real ritual family rather than a safety substitution family.

## Time Scope

- For today: low-capacity examples still use short windows when appropriate.
- Best moment this week: steady/high examples display the selected week window before the capacity window, such as "Around Wednesday, June 3 morning. When you have room to linger this week."

Verdict: show Jessica. Best-week timing is one of the stronger demo paths.

## Audience

- Me: solo candle/light routes use one light, bowl, phrase, or threshold action.
- Both of us: `candle_witness_one_phrase` assigns roles in low capacity; high capacity uses a shared table/household center with a witnessed, folded, and left phrase.

Verdict: acceptable. Both-of-us is more than pronoun substitution in the strongest candle routes.

## Capacity Levels

- Barely any capacity: still produces a complete pause ritual, especially `bank_the_house_light`.
- Low: remains 0-5 minutes and bounded.
- Enough to engage: now renders a fuller table-light/paper or bowl-rest arc when a steady variant exists.
- Room for something deeper: now renders written phrase, light witness, folding, resting, and return arcs for the new #223 scenarios.

Verdict: fixed enough for demo. High capacity now changes ritual shape without becoming therapy, journaling homework, or productivity planning.

## Recommendation Card Display

- The signed-in shell test confirms `data-testid="recommended-ritual"` renders only after sign-in.
- The recommendation card includes theme/title, intention, best window, ritual body, question to carry, and action buttons.
- Copy labels remain user-facing: "Intention," "Best window," "Question to carry," and "Why this fits."

Verdict: acceptable.

## Explanation Display

- "Why this fits" renders on the card.
- "How this was chosen" is rendered inside a collapsed `<details>` element and is not open by default.
- Material/source lineage appears as "Material lineage" rather than raw source IDs.
- Debug-like phrases remain blocked from normal copy by recommendation-quality tests.

Verdict: show Jessica, with How-this details left collapsed during the first pass.

## Viewport Notes

- Existing Playwright e2e includes a phone-sized viewport at 390 x 844 and checks for no horizontal overflow on the signed-out home shell.
- Unit tests cover the signed-in recommendation shell structure.
- This packet did not add a separate manual browser screenshot pass; `npm run check` passed and included Playwright e2e.

Verdict: no known viewport blocker. Non-blocking risk: signed-in recommendation card should still get a quick live-demo glance on a real phone-sized viewport before showing Jessica.

## Validation

- `npm run lint:content`: pass.
- `npm run typecheck`: pass.
- `npm run test`: pass, 26 files / 298 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: pass, 9 tests.
- `npm run recommendation:quality`: pass, 81 scenarios and all warning buckets 0.
- `npm run diagnose:content`: pass, 97 scenarios sampled.
- `npm run check`: pass, including build and 2 Playwright e2e tests. Vite still reports the existing large-chunk warning.

## Blockers Before Showing Jessica

- None after the #223 cleanup patch.

## Non-Blocking Polish Items

- Demo route should favor full/new/waning timing examples over generic "today" when possible.
- Avoid the no-strong-timing route as a first Jessica demo; it is acceptable but less enchanting.
- Keep "How this was chosen" collapsed unless Jessica asks why the recommendation was chosen.

## Merge Recommendation

Hold for human review, then merge if validation stays green.

## Contract Patch Smoke Addendum

The PR review identified a product-level contract issue rather than a display issue: the recommendation card could show a polished answer to the wrong selected category/focus. The smoke expectation is now:

- The check-in review and recommendation card must preserve explicit category/practice type, focus, audience, capacity, and time scope.
- `Surprise me` must resolve to a real category before the card is displayed, and the card should not say Surprise me as though it were a ritual family.
- `How this was chosen` can remain collapsed, but normal card copy must not rationalize ignored inputs with "held lightly," "stronger material form," or timing-overrode language.
- The recommendation-quality report now covers 12 contract matrix scenarios in addition to the Candle/light demo routes.

UI blocker status after contract patch: none known. This patch does not change UI layout or add new visible categories.

Validation after contract patch:

- `npm run lint:content`: pass.
- `npm run typecheck`: pass.
- `npm run test`: pass, 26 files / 298 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: pass, 9 tests.
- `npm run recommendation:quality`: pass; 93 scenarios; all warning buckets 0.
- `npm run diagnose:content`: pass; 97 scenarios sampled.
- `npm run check`: pass, including build and 2 Playwright e2e tests. Vite still reports the existing large-chunk warning.
