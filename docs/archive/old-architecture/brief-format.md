> Status: Archived / historical.
> This document is preserved for source trail, failure analysis, or migration context.
> It is not current implementation guidance.
> For current direction, see `docs/product/moon-and-table-current-direction.md`.

# Weekly Brief Format

Moon & Table should default to a small, usable weekly brief.

The app should not present a long list of rituals or assignments. One useful recommendation is better than many options.

## Privacy boundary

Brief examples in the repository must not contain real names, birth data, natal placements, schedules, relationship details, or private profile notes.

Use generic language such as:

* `private profile`
* `household`
* `schedule constraints`
* `capacity mode`
* `person_a`
* `person_b`

Real personalization belongs only in Firebase/Firestore for the hosted app, private runtime storage, or local gitignored development files.

## Default weekly brief

Each week should include:

1. Theme
2. Best ritual window
3. One recommended ritual
4. One reflection or carry prompt
5. One optional add-on
6. Short “why this” explanation

The final copy should read as one authored household-grimoire entry. The theme,
ritual body, intention, best window, carry prompt, optional add-on, and
explanation should belong to the same ritual. The body should choose one primary
material/action path and include clear activation and closure.

## Constraints

- Recommend no more than one primary ritual per week.
- Offer no more than one optional add-on.
- Default ritual time should be under 20 minutes.
- For `pause`, offer no required ritual; use grounding, blessing, or permission to do nothing.
- For `low`, keep the recommendation to five minutes or less with no shopping, setup, or cleanup.
- For `steady`, keep the practical recommendation to about twenty minutes or less.
- For `high`, allow a more active recommendation up to 30 minutes, but still keep one primary ritual. High capacity should create deeper ritual architecture, not only longer explanation.
- Avoid assigning multiple rituals across multiple days unless explicitly requested.
- Use invitation language, not obligation language.
- Capacity constraints should override symbolic timing.
- Schedule awareness is deferred; current best-window copy is capacity-based, not calendar-based.
- Repository examples must remain generic and non-identifying.

## Generator trace

The first real vertical-slice generator lives at `src/lib/generate-weekly-brief.ts`. It uses the current week, computed timing facts, approved symbolic cards, approved ritual patterns, and private capacity/profile constraints to choose one recommendation.

Its trace should stay short and privacy-safe, listing timing fact keys, approved symbolic card keys, approved ritual pattern keys, source review ids, source note ids when available, generic private profile placeholder keys, profile preference keys, capacity mode, audience, and any safety exclusions or notes that affected selection. The legacy `scheduleAssumptions` trace field remains available for compatibility but should be empty in current generated briefs.

Private profile, capacity, and audience values are private inputs, not public source citations. Public citation/source summary should come from selected timing cards, symbolic cards, ritual patterns, source reviews, source notes, and safety guardrails.

Capacity modes are `pause`, `low`, `steady`, and `high`. Superseded labels such as tiny, normal, spacious, celebration, or survival should not be implemented as separate modes.

## Feedback

Displayed briefs may collect small private feedback signals: good, too much, too generic, more like this, not this style, skipped, and try again. Feedback documents should include the generated brief key, selected timing/card/pattern trace keys, capacity, audience, source references, user id, optional user email, optional household id, feedback type, and timestamp.

Feedback is private product telemetry for later tuning. It is not a public source citation and should not include private profile notes, copied source text, real schedules, birth data, or relationship details.

Try-again should save `try_again` feedback and then select a different approved, capacity-safe ritual pattern when one exists. If there is no different safe option, the UI should say so plainly instead of rewording the same recommendation.

## Example

Theme:
Let one plant hold steady attention.

Best window:
When you have a little space this week.

Recommended ritual:
Set one plant where it can be seen. Name one living thing in the home that does not need to be pushed today. Leave the plant untouched until its next ordinary care moment. Close by returning it to its place.

Prompt:
What living thing can be tended by being left steady?

Optional:
No add-on needed.

Why this:
You chose Plant and low capacity. The plant keeps the work material and small. Waning timing makes the tending quiet rather than forceful: one living thing receives attention, then returns to ordinary care.
