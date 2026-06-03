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
4. One relationship or journal prompt
5. One optional add-on
6. Short “why this” explanation

## Constraints

- Recommend no more than one primary ritual per week.
- Offer no more than one optional add-on.
- Default ritual time should be under 20 minutes.
- For `pause`, offer no required ritual; use grounding, blessing, or permission to do nothing.
- For `low`, keep the recommendation to 0-5 minutes with no shopping, setup, or cleanup.
- For `steady`, keep the practical recommendation to 10-20 minutes.
- For `high`, allow a more active recommendation up to 30 minutes, but still keep one primary ritual.
- Avoid assigning multiple rituals across multiple days unless explicitly requested.
- Use invitation language, not obligation language.
- Schedule and capacity constraints should override symbolic timing.
- Repository examples must remain generic and non-identifying.

## Generator trace

The first real vertical-slice generator lives at `src/lib/generate-weekly-brief.ts`. It uses the current week, computed lunar timing, approved symbolic cards, approved ritual patterns, private capacity/profile constraints, and schedule assumptions to choose one recommendation.

Its trace should stay short and privacy-safe, listing timing fact keys, approved symbolic card keys, approved ritual pattern keys, source review ids, source note ids when available, generic private profile placeholder keys, profile preference keys, capacity mode, audience, schedule assumption keys, and any safety exclusions or notes that affected selection.

Private profile, capacity, audience, and schedule values are private inputs, not public source citations. Public citation/source summary should come from selected timing cards, symbolic cards, ritual patterns, source reviews, source notes, and safety guardrails.

Capacity modes are `pause`, `low`, `steady`, and `high`. Superseded labels such as tiny, normal, spacious, celebration, or survival should not be implemented as separate modes.

## Feedback

Displayed briefs may collect small private feedback signals: good, too much, too generic, more like this, not this style, skipped, and try again. Feedback documents should include the generated brief key, selected timing/card/pattern trace keys, capacity, audience, source references, user id, optional user email, optional household id, feedback type, and timestamp.

Feedback is private product telemetry for later tuning. It is not a public source citation and should not include private profile notes, copied source text, real schedules, birth data, or relationship details.

Try-again should save `try_again` feedback and then select a different approved, capacity-safe ritual pattern when one exists. If there is no different safe option, the UI should say so plainly instead of rewording the same recommendation.

## Example

Theme:
Clear one small thing. Feed one living thing.

Best window:
Saturday evening, 15 minutes.

Recommended ritual:
Tend one plant. Remove dead leaves or water it. Name one thing to stop feeding and one thing to nourish.

Prompt:
What part of this household needs less intensity and more tending?

Optional:
Light a candle while doing it.

Why this:
The waning moon supports clearing and release. The private profile prefers practical tending over abstract processing. The schedule and capacity constraints suggest this should stay short and home-based.
