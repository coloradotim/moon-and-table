> Status: Archived / historical.
> This document is preserved for source trail, failure analysis, or migration context.
> It is not current implementation guidance.
> For current direction, see `docs/product/moon-and-table-current-direction.md`.

# Today’s Shape Brief

`Today’s shape` is the compact timing brief shown on the first check-in screen.
It is timing weather, not a recommendation and not an instruction.

The check-in still chooses the path. Today’s shape may name what is in the
weather before the user answers, but it must not override category, focus,
capacity, audience, or time-scope answers.

## Purpose

Today’s shape should help the user feel the moment without turning Moon & Table
into a horoscope feed, dashboard, debug panel, or recommendation-before-the-
recommendation.

The default card shows:

- the title `Today’s shape`
- one compact summary
- a few short timing chips
- optional collapsed timing notes

## Timing Authority

Today’s shape follows the timing-authority rules in the ritual selection model.
Timing may be prominent only when:

- the user is asking for today and a major event is today
- the user is asking for the best moment this week and a major event appears in
  the candidate window

Major events include new moon, full moon, solstice, equinox, end or beginning
of a month, end or beginning of a year, important astrological context, and
major numerology hits marked by the timing system.

Otherwise, timing stays soft background. Ordinary numerology may appear as one
small accent, never as the lead.

## Allowed Mechanisms

The brief may use curated language for:

- current moon phase
- next lunar milestone
- major lunar events
- calendar thresholds
- solstice or equinox
- important astrological context
- significant private/shared timing contacts
- major numerology hits
- ordinary numerology as a small accent

Private timing contacts must remain compact and symbolic. Normal copy may say
`Private timing adds a quiet note of structure and return.` It must not show raw
names, placements, degrees, orbs, contact keys, compatibility language, or chart
diagnostics.

## Copy Rules

Use authored timing language:

- `Waning gibbous moon. Last quarter moon comes Sunday.`
- `The month is turning. This is threshold weather.`
- `No large timing marker is at the center today.`
- `A 7 note adds reflection and sorting.`

Avoid directive or diagnostic language:

- `You should clear something.`
- `The moon wants...`
- `Numerology says...`
- `This timing overrides your check-in.`
- raw ids, scores, source ids, degrees, or debug labels

The brief may sound magical. It should not demystify timing into wellness
metaphor or overclaim that timing causes a guaranteed outcome.

## Product Boundary

Today’s shape does not add sources, cards, ritual patterns, visible categories,
or scoring behavior. It is a first-screen orientation surface over existing
timing facts and private-safe timing-window metadata.
