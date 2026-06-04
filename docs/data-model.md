# Data And Content Model

Moon & Table has three main data zones:

| Zone | Examples | Location |
| --- | --- | --- |
| Private runtime data | Household profiles, capacity settings, schedule constraints, feedback | Firestore |
| Local private seed data | Initial real household/profile seed JSON and service credentials | Gitignored local files |
| Source-controlled content | Source reviews, source notes, symbolic cards, ritual patterns, safety flags, tests, placeholder examples | Repository |

Repository examples must stay generic and placeholder-only. Real private values live in Firestore or local gitignored files.

## Relationship Map

```text
SourceReview -> SourceNote -> SymbolicCard / RitualPattern -> Brief
TimingFact -> BriefSignal / BriefReason -> Brief
PrivateProfile + CapacitySettings + ScheduleConstraints -> Brief
RitualSafetyFlags -> RitualPattern eligibility -> Brief
Brief -> BriefFeedback
```

The app should recommend only approved content. Safety guardrails override symbolic fit.

## Private Runtime Data

These objects live in Firestore. Source-controlled examples use placeholders only.

| Object | Responsibility |
| --- | --- |
| `Household` | Groups private members and enables household-level reads through `memberUserIds` and `memberEmails`. |
| `PrivateProfile` | Stores private profile themes, display labels, preference styles, audience labels, assumptions, and astrology metadata. |
| `CapacitySettings` | Stores default capacity mode and maximum ritual duration. |
| `ScheduleConstraints` | Legacy/deferred private shape for future schedule awareness. Current generated briefs do not use hard-coded or fallback schedule windows in user-facing output. |
| `PrivateProfileAssumption` | Stores editable or non-editable profile assumptions with source, confidence, and timestamp metadata. |
| `PrivateAstrologyProfile` | Stores abstract astrology metadata such as placeholder placement keys, optional private placement records, and profile theme keys; no real birth data belongs in the repo. |

Profile assumptions can move from starter or seeded assumptions to user-confirmed assumptions when edited. The app preserves assumption metadata and stores edited boolean assumptions as user-confirmed.

## Local Private Seed Data

The normal setup path is:

```text
private/household.seed.local.json
-> scripts/seed-private-household.ts
-> Firestore household/profile/capacity/schedule documents
```

The seed file may contain real private values on a local machine only. It is gitignored. Firebase Admin service account files are also local-only and gitignored.

Manual Firestore console entry is not the normal workflow.

## Source And Curation Data

| Object | Responsibility |
| --- | --- |
| `SourceReview` | Tracks source label, type, domain, review status, use decision, risks, extraction guidance, and trace metadata. |
| `SourceNote` | Stores a short transformed note derived from reviewed source context. It must be paraphrased, traceable, and non-verbatim. Source notes also carry structured location metadata such as source area, review basis, review date, and precision. |

Source notes are not automatically approved content. They are curation inputs that can support symbolic cards or ritual patterns after review.

`locationPrecision` distinguishes notes tied to a reviewed source area from notes that are still synthesis-only. Synthesis-only notes are allowed as guardrails, but future curation should prefer more precise source areas where possible.

Source-controlled content must not include:

- long copied passages
- copied rituals, spells, recipes, prayers, chants, or affirmations
- private profile details
- private source text
- real birth data or natal placements tied to people

Copyrighted source material should be transformed into short SourceNotes, not ingested wholesale.

## Recommendation Content

| Object | Responsibility |
| --- | --- |
| `SymbolicCard` | Describes approved symbolic meaning: summary, themes, good-for uses, ritual styles, ritual ideas, avoid-saying guardrails, safety notes, source references, confidence, and approval status. |
| `RitualPattern` | Describes what to do: duration, capacity modes, materials, steps, safety flags, avoid-if notes, source references, and approval status. |
| `RitualFocusOption` | Controlled current-moment focus vocabulary for future check-ins. Each scoring option carries theme keys plus generator-usable metadata such as ritual style hints, timing affinities, or symbolic card links. |
| `RitualSafetyFlags` | Encodes safety constraints such as ingestion, oils, smoke, fire, pets, children, pregnancy, allergies, medical claims, emotional intensity, and cleanup burden. |
| Approval status | Determines whether content is eligible for recommendation. Only approved cards and approved patterns should be used. |

SymbolicCards describe meaning. RitualPatterns describe practice. The generator should not turn symbolic meaning directly into unreviewed actions.

RitualFocusOptions describe what the user says the current ritual should focus on. They are source-controlled controlled vocabulary, not free-text interpretation. The initial vocabulary lives in `src/data/ritual-focus-options.ts`; it is not wired into scoring until the recommendation flow explicitly accepts current check-in context.

Safety flags can block a pattern even when it matches timing, private profile context, or preferences.

Lifecycle examples may exist as separate fixture data for curation training and tests. They must stay out of active seed arrays and generated briefs unless their status is changed through review.

## Timing Data

| Object | Responsibility |
| --- | --- |
| `TimingFact` / `LunarTimingFact` | Deterministic timing fact with type, label, date or event bounds, timezone, computed values, confidence, and related symbolic keys where applicable. |
| `SkyEvent` | Broader event vocabulary for exact or bounded sky events such as lunations, solstices, equinoxes, and later ingresses or station events. |
| `TimingInterpretationRule` | Explicit reviewed mapping from a computed fact condition to candidate symbolic cards, ritual style hints, weight, strength, and source references. |
| `TimingSignal` | Candidate user-facing signal produced by eligible rules; signal selection should limit visible signals to a small meaningful set. |
| `TimingWindowCandidate` | Structured look-ahead candidate for a meaningful timing moment in the next several days. It includes timing facts, signal keys, safe natal-contact keys/theme keys, score, and score reasons. |

Timing facts are computed and testable. Interpretation belongs in SymbolicCards, rules, and approved content, not raw timing facts.

The broader timing fact API lives in `src/lib/timing-facts.ts` and currently computes lunar phase, lunations, moon sign, sun sign, seasonal markers, planetary signs, retrograde status, major aspects, and universal numerology date facts. Universal numerology facts come from `src/lib/numerology-timing.ts`, which computes universal year, month, and day numbers by reducing date sums to 1-9; master numbers are reduced for MVP. The first rule layer lives in `src/lib/timing-interpretation-rules.ts`; approved rules cover lunar phase cards, numerology cards, four solstice/equinox seasonal anchors, MVP astrology cards for Sun through Saturn, all 12 signs, five major aspects, and a conservative retrograde cue. Weather-aware seasonal interpretation, local ecology, cross-quarter days, and outer-planet interpretation remain deferred until reviewed source cards exist.

Timing look-ahead lives in `src/lib/timing-window-candidates.ts`. It scans a default seven-day range and returns sorted timing-window candidates for the future `Best moment this week` flow. This is timing look-ahead, not schedule awareness: candidates do not use fake availability, hard-coded weekdays, or placeholder household windows.

Astronomy Engine is the MVP timing direction. Swiss Ephemeris remains deferred until precision, houses, natal charts, or personal transit needs justify it.

## Private Natal Contacts

`src/lib/private-natal-contacts.ts` computes private contacts between current timing facts and private natal profile placements. It supports same-sign resonance, near conjunctions, and major aspect geometry with a conservative 3 degree orb when degrees are available.

Natal contacts return structured theme keys and contact metadata. The weekly brief generator can use selected contacts as bounded scoring signals and visibility-aware explanation context. They do not create predictions, identity claims, houses, synastry, compatibility, or raw chart displays in the default UI.

Timing-window candidates may include safe natal-contact keys and theme keys. Those keys are for scoring and debugging only; they should not render raw placements, degrees, birth data, or private profile details in the default UI.

Source-controlled tests use fake placeholder profiles only. Real private placement values belong in Firestore or local gitignored files, not the repository.

## Brief Output

| Object | Responsibility |
| --- | --- |
| `WeeklyBrief` | User-facing generated brief: key, date range, theme, intention, best window, one ritual, optional add-on, reflection prompt, why-this explanation, source summary, and trace. |
| `RecommendationDecision` | Internal inspectable decision record with normalized inputs, evaluated cards and ritual patterns, selected content, rejection reasons, score breakdowns, source references, and debug summaries. |
| `WeeklyBriefTrace` | Internal trace keys for timing facts, symbolic cards, ritual patterns, source review ids, source note ids, private profile keys, preferences, capacity, audience, and safety notes. The legacy `scheduleAssumptions` field remains for compatibility but is inert in current briefs. |
| `BriefSignal` | Planned user-facing vocabulary for a fact or private setting that influenced the brief. |
| `BriefReason` | Planned user-facing explanation unit for why the recommendation fits. |
| `BriefFilterNote` | Planned user-facing note for why something was set aside. |
| `BriefSourceSummary` | Human-readable source summary; raw source ids should not render in the default UI. |

User-facing explanations should not show raw trace keys, repo paths, Firestore details, or source ids. Signals should include only things that influenced the recommendation. Sources should display human-readable labels.

`RecommendationDecision` is documented in `docs/recommendation-decision-model.md`. It supports developer inspection and golden tests without exposing the full scoring/debug record in the default UI.

## Current Check-In Data

`CurrentRitualCheckIn` is current-view context for the pre-brief flow. It records time scope, current energy/capacity, optional audience, practice type hints, optional ritual focus key, optional short focus text, and safe timing-window candidate ids.

It is not a long-term profile setting. It should stay in the current app session/current generated ritual flow unless a later issue explicitly adds persistence.

## Feedback Data

| Object | Responsibility |
| --- | --- |
| `BriefFeedback` | Firestore feedback document containing feedback type, brief trace references, user id, optional email, optional household id, capacity, audience, source references, and timestamp. |
| Feedback types | `good`, `too_much`, `too_generic`, `more_like_this`, `not_this_style`, `skipped`, and `try_again`. |

Feedback is stored for later personalization. It does not need to drive advanced learning yet.

`try_again` is stored as feedback-like data, but in the UI it is a separate action. It must select another approved ritual pattern and must not generate unapproved content.

## Privacy And Source Boundaries

Do not commit:

- real names
- real emails
- birth data
- natal placements tied to people
- relationship details
- private schedules
- service account data
- private source text
- real household/profile/capacity/schedule data

Repository content should stay generic, transformed, reviewed, and traceable. Real private values belong in Firestore or local gitignored files only.
