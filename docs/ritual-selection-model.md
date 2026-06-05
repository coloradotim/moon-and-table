# Ritual Selection Model

Moon & Table should help choose one ritual that fits the moment. It should not become a feed, a checklist, or a profile editor disguised as a check-in.

The next-stage frame is:

```text
Moon & Table chooses one ritual from our private household grimoire, then explains how the moment gives it shape.
```

The recommendation engine chooses from approved grimoire content. It should not assemble a generic ritual from loose timing fragments, pattern summaries, and fallback prompts.

Moon & Table has a house voice. User settings can shape what kind of ritual fits, how much capacity it should require, and how visible astrology should be, but they should not remix the writing style of the ritual itself.

Safety should constrain recommendations; it should not rewrite the metaphysics of the practice. The engine may set aside unsafe, unsupported, or privacy-risky ritual forms, but it should not turn magical practice into a wellness metaphor or decorative prop to make it feel safer.

Folk household magic uses the planning taxonomy in `docs/folk-household-magic-taxonomy.md`. That layer overlays the existing visible practice categories; it does not add a visible Folk magic, Moon water, Charms, Spells, Prosperity, or Protection route.

## Product Split

| Layer | Responsibility |
| --- | --- |
| Profile | What is usually true for a person or household. |
| Check-in | What is true right now. |
| Feedback | What the app learns over time from actual use. |
| Timing engine | What is happening today or this week. |
| Natal contacts | How current timing touches private natal profiles, stored and handled privately. |
| Recommendation engine | Chooses one approved ritual from the private household grimoire using the available context. |

Profiles hold durable defaults and private symbolic themes. Check-ins should capture current context only. Feedback should tune future recommendations over time. Current-moment ritual selection work should not be moved into the profile page.

## Profile Settings

The profile settings page is for long-term defaults, not today's ritual choice. It should show one editable profile or household surface at a time, using tabs such as `person_a`, `person_b`, and `household` with private display labels supplied at runtime.

The main editor should stay calm and durable:

- usual energy/capacity
- maximum ritual size
- astrology visibility
- broad long-term fit preferences
- private astrology profile status
- a simple private astrology loaded/not-loaded note

Specific action-pattern tags, ingredient-level preferences, herb/color/candle specifics, raw-ish diagnostics, and legacy assumptions should not appear in the normal editor. The default view should not expose the whole internal preference taxonomy.

Broad avoid-style controls and prose tone controls should not appear in the normal editor. Internal avoid flags, safety blockers, burden constraints, and `toneGuidance` metadata still exist, but they are not profile knobs.

The profile editor may show private runtime display labels and private loaded/not-loaded status after sign-in, but source-controlled code and tests must continue to use placeholders only. It should not show raw natal placements, birth data, real emails, relationship details, private schedules, or private source text.

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

Selected focus guides recommendation scoring. Timing should shape the form of the ritual, not veto the selected focus or manufacture unreviewed practice. For example, `Making a beginning` under waning or dark timing can become a quieter preparatory beginning rather than disappearing.

Explicit check-in answers form the recommendation contract. The engine should preserve visible category/practice type, ritual focus, audience, capacity, time scope, and hard avoid/preference constraints unless a real blocker is recorded. A real blocker can be safety, privacy, source eligibility, no approved pattern in that path, or an explicit avoid conflict. A stronger timing signal, brighter moon phase, numerology accent, private theme match, or more polished pattern is not by itself a blocker.

Selection order should stay conservative: hard eligibility first, then explicit or resolved category, focus, capacity/depth, audience action, time scope, timing shape, material/source strength, variety, and presentation. High capacity should deepen the selected category/focus; when no high-depth form exists, prefer a compatible steady form and surface the gap in review diagnostics rather than jumping categories. `Surprise me` must resolve to a real visible category before scoring and then preserve that resolved category.

When timing, focus, practice type, audience, or capacity are in tension, the output needs a meaning bridge. It should resolve into one coherent ritual, not a list of partially related reasons. Carry prompts should come from the resolved ritual meaning, not from a raw lunar fallback or whichever timing card happened to be first.

Carry prompts and optional accents should stay inside the selected ritual form. The generator should prefer the selected pattern's `RitualPresentation`, then focus-aware or material-aware copy, before falling back to timing. Optional accents are not a required second action. They should name the same material, vessel, threshold, light, leaf, cup, key, bowl, or phrase already present in the selected ritual, or else stay absent.

When a Batch 1 pattern is selected, source summaries should make the practical lineage readable without exposing raw source IDs. Use short labels like `salt and boundary folklore`, `quiet household welcome forms`, `seed/water beginning logic`, or `hearth/table first-and-last logic` only when that lineage actually shaped the selected pattern.

## Practice Type

The practice-type question asks what feels welcome right now. It should only show options the generator can trace and diagnose.

Visible v1 options:

- `Home`
- `Plant`
- `Kitchen`
- `Candle or light`
- `Reflection`
- `Seasonal`
- `Surprise me`

`Reflection` appears only when the selected capacity can support it. `Seasonal` appears only for the higher-capacity path.

`Surprise me` is an open selection in the UI, not a seventh practice category. Before recommendation, the generator resolves it to one real visible category based on the ritual focus and capacity context, then records `resolved_open_preference` in the decision diagnostics. The app should not pretend "Surprise me" itself matched the selected ritual.

`Conversation` is intentionally not a visible practice-type option right now. Conversation-shaped ritual content can remain in the approved library for focus-based or future use, but it needs a dedicated source/content pass before it becomes a top-level check-in/profile preference.

## Current Implementation

The pre-brief check-in stores answers in a `CurrentRitualCheckIn` object for the current session. It is passed into the generation path and appears in developer-only decision output.

`Try something else` reuses the same check-in answers and private profile context. `Start over` clears the current check-in and returns to the first question.

The current implementation uses check-in capacity, audience, practice type, ritual focus, conservative free-text aliases, selected timing-window candidates, recommendation-contract rejection, primary focus-action fit, and ritual form-family fit in recommendation scoring. Form-family fit is stricter than broad tag overlap: Plant + clearing should reach plant release/removal, Kitchen + beginning should reach grain/seed/bowl, Reflection + clear speech should reach written/folded/container, and Candle/light + rest should reach banked, holding, or darkening light. The decision record names which check-in fields influenced the selected pattern and records a practice-choice diagnostic so visible choices can be audited as matched, set aside, skipped, or intentionally open.

The user-facing explanation has two normal layers. `Why this fits` is the short card-level reason. `How this was chosen` is collapsed by default and can show timing choice, check-in fit, ritual focus, ritual fit, profile or private timing fit, capacity boundaries, tradeoffs, and sources. Debug remains separate for raw score reasons, ids, candidate lists, and exact private contact keys.

The explanation should not pretend every answer matched. If the selected ritual is an honest adaptation, it should say so. `Making a beginning` during quieter waning timing can be shaped as preparation rather than launch. `Tending us` with low capacity can stay relational through a small shared ritual rather than a heavy conversation.

Recommendation quality is defined in `docs/recommendation-quality-model.md`. Selection is only one part of the product. The final output also needs authored ritual presentation, a clean carrying prompt, and a clean closing.

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
