# Ritual Selection Model

Moon & Table should help choose one ritual that fits the moment. It should not become a feed, a checklist, or a profile editor disguised as a check-in.

## Product Split

| Layer | Responsibility |
| --- | --- |
| Profile | What is usually true for a person or household. |
| Check-in | What is true right now. |
| Feedback | What the app learns over time from actual use. |
| Timing engine | What is happening today or this week. |
| Natal contacts | How current timing touches private natal profiles, stored and handled privately. |
| Recommendation engine | Chooses one approved ritual using the available context. |

Profiles hold durable defaults and private symbolic themes. Check-ins should capture current context only. Feedback should tune future recommendations over time. Current-moment ritual selection work should not be moved into the profile page.

## Opening Copy

The check-in flow uses simple, signed-in copy:

```text
Welcome back, <first name>.

Are you wanting something for today, or looking across the week?
```

The name comes from private runtime data. It must not be hard-coded in source-controlled code, docs examples, or tests.

## Time Scope

The time-scope question is:

```text
Do you want something for today, or should I look for the best moment this week?
```

Visible options:

- `For today`
- `Across the week`

`For today` uses current timing. `Best moment this week` requires real timing look-ahead. It must not use fake schedule assumptions, hard-coded weekdays, or placeholder windows.

The first timing look-ahead API is `getTimingWindowCandidates()` in `src/lib/timing-window-candidates.ts`. It scans the next seven days by default and returns structured timing candidates from computed facts, approved timing rules, and safe private natal-contact metadata when profiles are available.

This is not schedule awareness. It can say that a meaningful timing event occurs at a real computed time, but it does not know whether the household is free then.

## Capacity

The capacity question is:

```text
How much energy or capacity do you have?
```

Visible options:

| Visible label | Generator capacity meaning |
| --- | --- |
| `Barely any` | `pause` / ultra-low |
| `A little` | `low` |
| `Enough to engage` | `steady` |
| `Room for something deeper` | `high` |

These are current ritual capacity labels. They are not identity labels, worth labels, diagnoses, or long-term profile settings.

## Ritual Focus

The ritual-focus question is:

```text
What should this ritual focus on?
```

Visible v1 options:

- `Getting grounded`
- `Making a beginning`
- `Clearing something out`
- `Resting`
- `Saying something clearly`
- `Tending us`
- `Tending the home`
- `Marking a threshold`
- `Something else`

The controlled vocabulary lives in `src/data/ritual-focus-options.ts`. Each scoring focus has theme keys and generator-usable metadata such as ritual style hints, timing affinities, or symbolic card links.

`Something else` is present for later controlled matching. It may store a short current-context note in a future flow, but it does not drive scoring by default and should not be interpreted as open-ended generated meaning.

## Flow Rules

The app should ask only questions it can use.

- Time scope, capacity, and audience are always asked because they can affect generation.
- Practice type and ritual focus are used when present, but the flow can stay shorter when capacity is very low.
- The review screen should restate what will be held before the app recommends one ritual.

Selected focus guides recommendation scoring. Timing should shape the form of the ritual, not veto the selected focus. For example, `Making a beginning` under waning or dark timing can become a quieter preparatory beginning rather than disappearing.

## Current Implementation

The pre-brief check-in stores answers in a `CurrentRitualCheckIn` object for the current session. It is passed into the generation path and appears in developer-only decision output.

`Try something else` reuses the same check-in answers and private profile context. `Start over` clears the current check-in and returns to the first question.

The current implementation uses check-in capacity, audience, practice type, ritual focus, conservative free-text aliases, and selected timing-window candidates in recommendation scoring. The decision record names which check-in fields influenced the selected pattern.

## Boundaries

The selection model should not add:

- extra pre-brief questions that are not represented as structured context
- persistent check-in answers unless a later issue explicitly requests it
- timing look-ahead without a real timing implementation
- free-text interpretation
- user-facing natal placement explanations
- relationship advice, compatibility, therapy, conflict resolution, or synastry
- private names, emails, birth data, natal placements, schedules, or source text in the repository

The goal is one grounded recommendation with a clear reason, not a pile of options.
