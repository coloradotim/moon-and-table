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
- For low-capacity weeks, default to 3–5 minutes.
- Avoid assigning multiple rituals across multiple days unless explicitly requested.
- Use invitation language, not obligation language.
- Schedule and capacity constraints should override symbolic timing.
- Repository examples must remain generic and non-identifying.

## Generator trace

The first deterministic mock generator lives at `src/lib/generate-weekly-brief.ts`. Its trace should stay short and privacy-safe, listing timing fact keys, approved symbolic card keys, generic private profile placeholder keys, capacity mode, and schedule assumption keys.

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
