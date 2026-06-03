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
| `PrivateAstrologyProfile` | Stores abstract astrology metadata such as placeholder placement keys and profile theme keys; no real birth data belongs in the repo. |

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
| `SourceNote` | Stores a short transformed note derived from reviewed source context. It must be paraphrased, traceable, and non-verbatim. |

Source notes are not automatically approved content. They are curation inputs that can support symbolic cards or ritual patterns after review.

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
| `RitualSafetyFlags` | Encodes safety constraints such as ingestion, oils, smoke, fire, pets, children, pregnancy, allergies, medical claims, emotional intensity, and cleanup burden. |
| Approval status | Determines whether content is eligible for recommendation. Only approved cards and approved patterns should be used. |

SymbolicCards describe meaning. RitualPatterns describe practice. The generator should not turn symbolic meaning directly into unreviewed actions.

Safety flags can block a pattern even when it matches timing, private profile context, or preferences.

## Timing Data

| Object | Responsibility |
| --- | --- |
| `TimingFact` / `LunarTimingFact` | Deterministic timing fact with type, label, date or event bounds, timezone, computed values, confidence, and related symbolic keys where applicable. |
| `SkyEvent` | Broader event vocabulary for exact or bounded sky events such as lunations, solstices, equinoxes, and later ingresses or station events. |
| `TimingInterpretationRule` | Explicit reviewed mapping from a computed fact condition to candidate symbolic cards, ritual style hints, weight, strength, and source references. |
| `TimingSignal` | Candidate user-facing signal produced by eligible rules; signal selection should limit visible signals to a small meaningful set. |

Timing facts are computed and testable. Interpretation belongs in SymbolicCards, rules, and approved content, not raw timing facts.

The broader timing fact API lives in `src/lib/timing-facts.ts` and currently computes lunar phase, lunations, moon sign, sun sign, seasonal markers, planetary signs, retrograde status, major aspects, and universal numerology date facts. Universal numerology facts come from `src/lib/numerology-timing.ts`, which computes universal year, month, and day numbers by reducing date sums to 1-9; master numbers are reduced for MVP. The first rule layer lives in `src/lib/timing-interpretation-rules.ts`; approved rules cover lunar phase cards, numerology cards, four solstice/equinox seasonal anchors, MVP astrology cards for Sun through Saturn, all 12 signs, five major aspects, and a conservative retrograde cue. Weather-aware seasonal interpretation, local ecology, cross-quarter days, and outer-planet interpretation remain deferred until reviewed source cards exist.

Astronomy Engine is the MVP timing direction. Swiss Ephemeris remains deferred until precision, houses, natal charts, or personal transit needs justify it.

## Brief Output

| Object | Responsibility |
| --- | --- |
| `WeeklyBrief` | User-facing generated brief: key, date range, theme, intention, best window, one ritual, optional add-on, reflection prompt, why-this explanation, source summary, and trace. |
| `WeeklyBriefTrace` | Internal trace keys for timing facts, symbolic cards, ritual patterns, source review ids, source note ids, private profile keys, preferences, capacity, audience, and safety notes. The legacy `scheduleAssumptions` field remains for compatibility but is inert in current briefs. |
| `BriefSignal` | Planned user-facing vocabulary for a fact or private setting that influenced the brief. |
| `BriefReason` | Planned user-facing explanation unit for why the recommendation fits. |
| `BriefFilterNote` | Planned user-facing note for why something was set aside. |
| `BriefSourceSummary` | Human-readable source summary; raw source ids should not render in the default UI. |

User-facing explanations should not show raw trace keys, repo paths, Firestore details, or source ids. Signals should include only things that influenced the recommendation. Sources should display human-readable labels.

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
