# Manual Moon & Table Brief Prompt

Use this prompt to manually generate a Moon & Table brief in ChatGPT for today, tomorrow, this week, or next week.

## Privacy boundary

Do not put real names, birth data, chart placements, schedules, source documents, or profile notes in the repository.

This prompt is generic. Real profile details should be supplied outside source control.

## Standard prompt

Generate a Moon & Table brief for `[today / tomorrow / this week / next week]` for a private household.

Use the Moon & Table approach:

* Blend astronomy, astrology, numerology, kitchen magic, candle magic, plant magic, home themes, and private context.
* Keep it grounded, practical, and non-deterministic.
* Do not give a long list of things to do.
* Recommend one primary ritual or action only.
* Include at most one optional add-on.
* Default to low-to-normal capacity unless told otherwise.
* Keep the ritual under 20 minutes; under 5 minutes for low-capacity periods.
* Use private schedule constraints when provided.
* If the symbolic timing is on a bad schedule day, suggest a nearby realistic window instead.
* Explain briefly why this recommendation fits the timing, profile, schedule, and capacity.
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

[Short explanation using timing, approved symbolic cards, schedule, capacity, and private context when provided]

## Reflection prompt

[One question for the household to consider]
```

## Low-capacity version

Add this to the end of the prompt when life is full or the week already has too much in it:

```text
Capacity is low. Give the smallest meaningful version. Prefer one action under 5 minutes. Do not suggest journaling, a multi-step ritual, or anything that requires shopping, setup, or cleanup.
```

## Spacious version

Add this when there is room for something fuller:

```text
Capacity is normal-to-spacious. You may suggest one ritual up to 20 minutes and one optional add-on, but still do not give a list of multiple things to do.
```

## Schedule-aware version

Add this when schedule matters:

```text
Use schedule-awareness. Do not automatically recommend the exact date of the astrological or lunar event. Recommend the nearest realistic window based on private schedule constraints and stated capacity.
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
* insensitive to schedule or capacity