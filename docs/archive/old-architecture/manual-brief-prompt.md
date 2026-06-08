> Status: Archived / historical.
> This document is preserved for source trail, failure analysis, or migration context.
> It is not current implementation guidance.
> For current direction, see `docs/product/moon-and-table-current-direction.md`.

# Manual Moon & Table Brief Prompt

Use this prompt to manually generate a Moon & Table brief in ChatGPT for today, tomorrow, this week, or next week.

## Privacy boundary

Do not put real names, birth data, chart placements, schedules, source documents, or profile notes in the repository.

This prompt is generic. Real profile details should be supplied outside source control, either from Firebase/Firestore in the hosted app or local gitignored files during development.

## Standard prompt

Generate a Moon & Table brief for `[today / tomorrow / this week / next week]` for a private household.

Use the Moon & Table approach:

* Blend astronomy, astrology, numerology, kitchen magic, candle magic, plant magic, home themes, and private context.
* Keep it grounded, practical, and non-deterministic.
* Do not give a long list of things to do.
* Recommend one primary ritual or action only.
* Include at most one optional add-on.
* Use one of the four capacity modes: `pause`, `low`, `steady`, or `high`.
* Default to `steady` unless capacity is constrained.
* Use no required ritual for `pause`, five minutes or less for `low`, about twenty minutes or less for `steady`, and about half an hour or less for `high`.
* Use capacity-based timing/window copy rather than schedule assumptions.
* Do not name a weekday or realistic window unless a future explicit schedule feature provides one.
* Explain briefly why this recommendation fits the timing, profile, and capacity.
* Make it feel like support, not homework.

Format the brief like this:

```markdown
# Moon & Table Brief — [date range]

## Theme

[One short theme]

## Best window

[One recommended time/day, or “any 5 quiet minutes” if capacity is low]

## Recommended ritual

[One simple ritual or action]

## Optional add-on

[One small optional enhancement, or “none”]

## Why this

[Short explanation using timing, approved symbolic cards, capacity, and private context when provided]

## Reflection prompt

[One question for the household to consider]
```

## Low-capacity version

Add this to the end of the prompt when life is full or the week already has too much in it:

```text
Capacity is low. Give the smallest meaningful version. Prefer one action that takes five minutes or less. Do not suggest journaling, a multi-step ritual, or anything that requires shopping, setup, or cleanup.
```

## Pause version

Add this when even a small ritual would be too much:

```text
Capacity is pause. Do not recommend a required ritual. Offer grounding, a blessing, or permission to do nothing.
```

## Steady or high version

Add this when there is room for something fuller:

```text
Capacity is steady or high. You may suggest one practical ritual: about twenty minutes or less for steady, or about half an hour or less for high. Include at most one optional add-on, and still do not give a list of multiple things to do.
```

## Deferred schedule-aware version

Do not use this for current generated briefs. Reserve it for a future designed schedule feature:

```text
Use schedule-awareness only when explicit schedule data is designed and provided. Do not automatically recommend the exact date of the astrological or lunar event. Recommend a realistic window based on private schedule constraints and stated capacity.
```

## Product behavior this prompt is testing

This manual prompt is part of product discovery. It helps test the core Moon & Table experience before building full automation.

A good brief should feel:

* calm
* personal without exposing private data
* small
* grounded
* useful
* doable in real life

A bad brief feels:

* like homework
* too long
* too generic
* too mystical without grounding
* too full of options
* insensitive to capacity
