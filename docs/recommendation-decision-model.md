# Recommendation Decision Model

Moon & Table keeps recommendation decisions inspectable without making the weekly brief feel technical.

The generator flow is:

```text
timing facts + approved cards + approved ritual patterns + capacity + preferences
  + private profile themes + selected private timing contacts + current check-in context
-> evaluated candidates
-> selected card, timing signals, and ritual pattern
-> recommendation decision record
-> calm user-facing brief copy
```

Current check-in context can add a selected `RitualFocusOption` to this flow. That vocabulary is controlled data, not open-ended interpretation, and is documented in `docs/ritual-selection-model.md`.

`Best moment this week` context can use `TimingWindowCandidate` records from `src/lib/timing-window-candidates.ts`. Those records are inspectable timing candidates, not final recommendations. The generator can select one timing candidate and use it to shape timing signals and ritual scoring.

The pre-brief check-in passes `CurrentRitualCheckIn` into `generateWeeklyBrief()`. Capacity, audience, practice type, ritual focus, conservative free-text aliases, and selected timing-window candidates can all affect scoring. The normal UI should explain this in human language and keep raw keys in developer-only output.

## Decision Record

`generateWeeklyBrief()` returns a `decision` object beside the user-facing brief fields. The decision record includes:

- normalized generator inputs
- selected timing signal labels
- selected symbolic card keys
- selected ritual pattern key
- private natal profile counts and selected private timing contacts, when available
- current check-in influence labels
- selected timing window summary, when the user asked to look across the week
- evaluated symbolic cards
- evaluated ritual pattern candidates
- rejected ritual patterns and rejection reasons
- source references used by the selected recommendation
- a short scoring and safety summary

The normal UI does not render this full record. Raw ids, source keys, and debugging details belong in developer-only views, not the default weekly brief.

## Scoring

Ritual pattern scoring is intentionally boring and testable.

Current positive score reasons include:

- `capacity_fit`: approved pattern supports the active capacity mode
- `preferred_style_match`: saved preferred style or action pattern matched
- `symbolic_card_style_match`: selected symbolic card style matched
- `timing_signal_style_match`: selected timing signal style matched
- `profile_theme_match`: saved generic profile or natal-theme signal matched
- `natal_contact_theme_match`: selected private timing contact matched the ritual style
- `shared_natal_contact_match`: a together recommendation found overlap across private timing contacts
- `profile_timing_resonance`: current timing fit a saved private natal-theme signal
- `checkin_capacity_answer`: the current check-in capacity was used in scoring
- `checkin_practice_type_match`: the selected practice type matched a pattern style
- `checkin_ritual_focus_match`: the selected ritual focus or conservative text alias matched a pattern style
- `checkin_audience_match`: the selected audience matched the pattern's audience fit
- `checkin_timing_window_match`: the selected timing-window candidate matched the pattern style
- `capacity_default_pattern`: pattern is the fallback default for the active capacity
- `high_capacity_active_fit`: high-capacity pattern can be more active while staying bounded

Current rejection reasons include:

- `not_approved`
- `try_again_excluded`
- `safety_block`
- `capacity_mode_mismatch`
- `too_long_for_capacity`
- `avoided_style_conflict`

Safety, explicit avoid flags, approval status, capacity mode, and max duration can remove a pattern from eligibility. Preferences and symbolic fit can improve ranking, but they do not override hard exclusions.

## Debug View

The app renders the decision record only when debug mode is enabled:

```text
?debug=true
```

The developer view shows selected cards and pattern, normalized inputs, selected score reasons, evaluated candidate scores, rejected candidates, source references, and count/detail summaries for selected private timing contacts.

Debug output should stay privacy-safe. Use generic ids, keys, and labels. Do not render private notes, birth data, real schedules, raw natal placements, private source text, service credentials, or Firestore internals.

Timing-window diagnostics should follow the same rule: show safe timing fact labels, signal keys, score reasons, and safe natal theme/contact keys; do not show raw private placement details by default.

## Golden Tests

Generator tests protect a few core scenarios:

- low capacity with plant preference selects a small plant practice
- pause capacity produces no required ritual
- live-flame avoid flags block live-flame candle patterns
- heavy-cleanup avoid flags block unsuitable reset patterns
- try-again excludes the current pattern when a safe alternate exists
- no safe alternate is reported instead of faking variety
- max duration can reject patterns that are too long for current capacity

These tests are meant to make product behavior explicit as the symbolic library grows.
