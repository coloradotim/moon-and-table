# Ritual Content Architecture Audit

## 1. Executive summary

Moon & Table does not currently have one single persisted `Ritual` object. A user-facing recommendation is assembled from several layers:

- reviewed source metadata in `src/data/source-registry.ts` and `src/data/batch-1-ritual-library.ts`;
- approved symbolic support cards in `src/data/seed-symbolic-cards.ts` and Batch 1 card data;
- approved reusable `RitualPattern` records in `src/data/ritual-patterns.ts` and Batch 1 pattern data;
- optional authored `RitualPresentation` fields attached to a `RitualPattern`;
- computed timing facts and timing signals from the timing layer;
- current check-in, private profile, capacity, audience, and safety constraints;
- generated `WeeklyBrief` output from `src/lib/generate-weekly-brief.ts`.

The closest current thing to a reusable ritual is `RitualPattern`, especially when it has `presentation`. The closest current thing to a practiced recommendation instance is `WeeklyBrief`, but the full `WeeklyBrief` is generated in memory. The app persists feedback records that reference a generated brief id and trace keys; it does not currently persist full brief bodies, ritual history, favorites, direct library selections, or user-created library rituals.

Future shared-library work therefore needs a product decision: should the library treat existing `RitualPattern` objects as library rituals, wrap them in a new library model, or introduce a separate reusable ritual model while keeping generated recommendation instances/history separate?

## 2. Current architecture map

The current recommendation architecture can be read as this pipeline:

```text
source reviews and notes
  -> symbolic cards
  -> ritual patterns with optional ritual presentation
  -> timing facts and timing signals
  -> current check-in and private profile context
  -> pattern eligibility and scoring
  -> one generated WeeklyBrief
  -> UI rendering and optional feedback record
```

Concrete files:

- `src/data/source-registry.ts` defines the source/review registry and validation.
- `src/data/batch-1-ritual-library.ts` adds approved Batch 1 source reviews, notes, cards, and ritual patterns.
- `src/data/seed-symbolic-cards.ts` defines `SymbolicCard` and the seed approved card library.
- `src/data/ritual-patterns.ts` defines `RitualPattern`, `RitualPresentation`, starter patterns, approval validation, and approved-pattern accessors.
- `src/data/ritual-focus-options.ts` defines the current check-in focus vocabulary.
- `src/lib/current-ritual-check-in.ts` defines the check-in object and visible check-in option mapping.
- `src/lib/timing-facts.ts`, `src/lib/lunar-timing.ts`, `src/lib/timing-interpretation-rules.ts`, and `src/lib/timing-window-candidates.ts` provide computed timing facts, symbolic timing signals, and best-week candidates.
- `src/lib/generate-weekly-brief.ts` resolves inputs, selects cards/signals/patterns, composes copy, and returns a `WeeklyBrief`.
- `src/lib/private-data-schema.ts`, `src/lib/private-data.ts`, and `src/lib/brief-feedback.ts` define and use the current Firestore-backed private profile and feedback data.
- `src/main.ts` holds current browser-session check-in and generated brief state.
- `src/ui/app-shell.ts` renders the visible recommendation, explanation, feedback controls, and debug decision record.
- `tests/fixtures/recommendation-quality-scenarios.ts` and `scripts/recommendation-quality-report.ts` define scenario fixtures and quality reporting around generated recommendations.

## 3. Current content object inventory

| Object | File path | Purpose and key fields | User-facing | Engine-facing | Source/review metadata | Reusable | Generated per recommendation | Persisted |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `SourceReview` | `src/data/source-registry.ts` | Source-level review: `id`, `title`, `authorOrPublisher`, `category`, `sourceType`, `useDecision`, `reviewStatus`, `bestFor`, `concerns`, `copyrightNotes`, `safetyNotes`, `culturalContextNotes`, `extractionNotes`, `confidence`. | Indirectly through source summaries; raw ids are debug/source metadata. | Yes, via source references and source summaries. | Yes. | Yes. | No. | Source-controlled data, not runtime persistence. |
| `SourceNote` | `src/data/source-registry.ts` | Transformed note tied to a source: `id`, `sourceId`, `locationNote`, `sourceLocationLabel`, `reviewedSourceArea`, `reviewBasis`, `reviewedAtIso`, `paraphrasedNote`, `category`, `tags`, `riskNotes`, `safetyNotes`, `copyrightNotes`, `verbatimAllowed`. | Indirectly through lineage/source summaries; raw note ids are not normal UI copy. | Yes, for source summary and trace. | Yes. | Yes. | No. | Source-controlled data, not runtime persistence. |
| Batch 1 source/card/pattern records | `src/data/batch-1-ritual-library.ts` | Approved Batch 1 `SourceReview`, `SourceNote`, `SymbolicCard`, and `RitualPattern` records plus implementation status lists such as demoted/rebuilt/must-support coverage. | Pattern/presentation copy can become user-facing. | Yes. | Yes. | Yes. | No. | Source-controlled data, not runtime persistence. |
| `SymbolicCard` | `src/data/seed-symbolic-cards.ts` | Symbolic support object: `id`, `key`, `title`, `category`, `summary`, `themes`, `good_for`, `ritual_styles`, `ritual_ideas`, `avoid_saying`, `safety_notes`, `safety_flags`, `capacityGuidance`, `ritualPatternKeys`, `sourceNoteKeys`, `source_references`, `confidence`, `approval_status`. | Partly. Card titles and bounded summaries can appear in explanation/source summary; normal recommendation is not a card browser. | Yes, selected from timing/profile inputs and used for style matching and trace. | References sources/notes. | Yes. | No. | Source-controlled data, not runtime persistence. |
| `RitualPresentation` | `src/data/ritual-patterns.ts` | Authored final-presentation copy attached to a pattern: `invitation`, `whyThisPractice`, `approach`, `steps`, `carry`, `closing`, plus variants for capacity, audience, focus, timing, and context keys. | Yes. It is the preferred source for theme, body, intention/carry, and ritual-fit explanation. | Yes, selected/merged by composer. | No direct source object, but lives on source-backed pattern. | Yes, as part of a pattern. | No. | Source-controlled data, not runtime persistence. |
| `RitualPattern` | `src/data/ritual-patterns.ts` | Reusable ritual candidate: `id`, `key`, `title`, `summary`, `ritualStyles`, `capacityModes`, `defaultDurationMinutes`, `materials`, `steps`, optional `presentation`, optional accents, `sourceLineageLabel`, safety fields, audience fit, source refs, `approvalStatus`. | Yes. Title, presentation, steps fallback, optional accent, lineage, and materials can shape visible output. | Yes. It is the main scored candidate type. | It carries source refs and source-note keys. | Yes. | No. | Source-controlled data, not runtime persistence. |
| `RitualFocusOption` | `src/data/ritual-focus-options.ts` | Check-in focus vocabulary: key/label plus scoring metadata such as theme keys, ritual style hints, timing signal keys, symbolic card keys, and whether it drives scoring. | Yes, labels are visible check-in choices. | Yes, maps focus to pattern/timing/card hints. | No. | Yes. | No. | Source-controlled data. |
| `CurrentRitualCheckIn` | `src/lib/current-ritual-check-in.ts` | Current session input: `timeScope`, `energyCapacity`, `capacityMode`, `audience`, `practiceTypeHints`, `practiceTypeLabel`, `ritualFocusKey`, `ritualFocusLabel`, `ritualFocusText`, `timingWindowCandidateIds`. | Yes, via check-in UI and review copy. | Yes, passed into `generateWeeklyBrief()`. | No. | No; it is current context. | Created per check-in. | Not currently persisted; held in `src/main.ts` variables. |
| `GenerateWeeklyBriefInput` | `src/lib/generate-weekly-brief.ts` | Public generator input: current date/timezone, timing facts, profile keys, capacity, schedule constraints, preferred/avoided styles, profile inputs, natal profiles, audience, excluded pattern keys, check-in, timing-window candidates. | No. | Yes. | No. | No. | Created per generation call. | Not directly persisted. Private profile pieces may come from Firestore. |
| `ResolvedGenerateWeeklyBriefInput` | `src/lib/generate-weekly-brief.ts` | Internal normalized generator input after defaults, profile merging, timing-window selection, timing fact computation, and check-in resolution. | No. | Yes. | No. | No. | Created per generation call. | Not persisted. |
| `TimingFact`, `LunarTimingFact`, `TimingSignal`, `TimingWindowCandidate` | `src/lib/timing-facts.ts`, `src/lib/lunar-timing.ts`, `src/lib/timing-interpretation-rules.ts`, `src/lib/timing-window-candidates.ts` | Computed timing facts and symbolic timing interpretations used to pick cards, score patterns, choose best-week windows, and explain timing. | Partly. Labels/summaries may appear; raw ids are debug/trace. | Yes. | Timing signals include source refs. | Facts/rules are reusable; candidates are per date/window. | Candidates/facts are generated per date or week. | Not persisted by current app. |
| `WeeklyBrief` | `src/lib/generate-weekly-brief.ts` | Generated recommendation output: `briefKey`, `dateRange`, `theme`, `intention`, `bestWindow`, `recommendedRitual`, `optionalAddOn`, `reflectionPrompt`, `whyThis`, `sourceSummary`, `explanation`, `decision`, `trace`. | Yes. This is the current recommendation card plus debug data. | Yes, as output and feedback input. | Carries trace/source refs. | No; it is an instance-like generated result. | Yes. | Full body is not currently saved by app code. |
| `RecommendationDecision` | `src/lib/generate-weekly-brief.ts` | Inspectable decision record with normalized inputs, evaluated candidates, selected keys, rejected patterns, numerology/practice diagnostics, and score/safety summary. | Debug only, plus compact explanation layers. | Yes. | Carries source refs. | No. | Yes. | Not persisted except selected trace fragments in feedback. |
| `BriefExplanation` / `ExplanationSection` | `src/lib/generate-weekly-brief.ts` | User-facing explanation object: `whyThisFits`, `howThisWasChosen`, diagnostic sections, signals, reasoning, filters, sources. | Yes. | Yes. | Includes source summaries. | No. | Yes. | Not persisted. |
| `PrivateProfileDocument`, `ScheduleConstraintsDocument`, `CapacitySettingsDocument` | `src/lib/private-data-schema.ts`; loaded by `src/lib/private-data.ts` | Firestore private profile/settings used as generator inputs: profile themes, preferred/avoided styles, default audience, capacity, duration, astrology visibility, assumptions, astrology profile. | Partly in profile settings UI. | Yes. | No. | Durable settings. | No. | Yes, in Firestore. |
| `SavedBriefDocument` | `src/lib/private-data-schema.ts` | Schema type for saved briefs: `id`, `householdId`, `userId`, `dateRange`, `theme`, `symbolicCardKeys`, `privateProfileKeys`, `createdAtIso`. | Not currently rendered as history. | Potentially. | No. | No. | Would be per brief. | Type exists, but this audit found no app code writing it. |
| `FeedbackDocument` / `BriefFeedbackDocument` | `src/lib/private-data-schema.ts`; `src/lib/brief-feedback.ts` | Feedback record: user/household ids, `briefId`, `feedbackType`, selected `symbolicCardKeys`, `ritualPatternKeys`, `timingFactKeys`, capacity, audience, source ids, optional note. | Feedback controls are user-facing; records are not shown as history. | Yes, potential future learning input. | Carries source refs. | No. | Yes, per feedback event. | Yes, `saveBriefFeedback()` writes to Firestore `feedback`. |
| `RitualNoteDocument` | `src/lib/private-data-schema.ts` | Placeholder-ish note schema: `id`, `householdId`, `userId`, optional `briefId`, `genericNoteLabel`, timestamps. | Not currently rendered as ritual notebook/history. | Not currently used by generator. | No. | No. | Potentially per note. | Type exists, but this audit found no app code writing it. |
| `RecommendationQualityScenario` | `tests/fixtures/recommendation-quality-scenarios.ts` | Test/review fixture: scenario id/title/purpose/date/check-in/profile placeholders, contract expectations, authored-output expectations, expected qualities, disallowed outcomes, generator input. | No; review artifact only. | Yes, through report scripts/tests. | No, though it tests source lineage quality. | Reusable test scenarios. | No. | Source-controlled test fixture. |

## 4. Current recommendation assembly path

### Check-in entry and mapping

The check-in flow is browser-session state in `src/main.ts`.

- `activeCheckInDraft`, `activeCurrentRitualCheckIn`, and `activeBrief` are module-level variables.
- `handleCheckInAction()` moves through time scope, energy capacity, audience, practice type, ritual focus, and review.
- `maybeCompleteCheckIn()` builds `CurrentRitualCheckIn`.
- `completeCheckIn()` stores it in `activeCurrentRitualCheckIn`, calls `generateWeeklyBrief(getActiveBriefInput())`, and renders the signed-in shell.
- `getActiveBriefInput()` merges loaded private data with current check-in. It maps `both_of_us` to generator audience `together`, and uses check-in capacity as the generator `capacityMode`.

The check-in type and option mapping live in `src/lib/current-ritual-check-in.ts`:

- energy labels map to generator capacity modes through `getCapacityModeForEnergy()`;
- practice options map visible labels to `practiceTypeHints`;
- focus options are validated through `isRitualFocusOptionKey()`;
- free-text focus is sanitized by `sanitizeRitualFocusText()` and only becomes conservative hint matching in the generator.

### Input resolution

`generateWeeklyBrief()` in `src/lib/generate-weekly-brief.ts` starts by calling `resolveInput()`.

`resolveInput()`:

- normalizes current date, timezone, date range, capacity, audience, schedule constraints, preferred/avoided styles, and profile signals;
- resolves `Surprise me` to one visible practice via `resolveSurpriseMePracticeChoice()`;
- derives time scope from `CurrentRitualCheckIn`;
- selects timing-window candidates for `best_moment_this_week` through `getTimingWindowCandidates()`;
- chooses a selected timing window via `selectTimingWindowCandidate()`;
- computes lunar/timing facts using `getLunarTimingFact()` and `getTimingFactsForDate()`;
- computes private natal contacts when private natal profiles are available;
- resolves selected ritual focus using `getRitualFocusOptionByKey()`.

### Cards and timing signals

`generateWeeklyBrief()` calls `getApprovedCardsForBrief()`, which selects the primary lunar card from `MOON_CARD_KEY_BY_TIMING_FACT` and profile-theme cards from `PRIVATE_PROFILE_CARD_KEY_BY_PLACEHOLDER_KEY`. Cards are fetched only if approved through `getApprovedCardByKey()`.

`getSelectedTimingSignals()` merges computed timing facts with baseline lunar facts, optionally prioritizes the selected best-week window, then calls `selectTimingSignals()` from `src/lib/timing-interpretation-rules.ts`. Numerology is handled as an accent through `getNumerologyDiagnostic()` and the selected timing signals.

### Candidate ritual/pattern selection

The reusable candidate pool is `starterRitualPatterns`, with approval checked against `getApprovedRitualPatterns()`.

`selectPattern()` calls `getEligiblePatternCandidates()`, which:

- rejects non-approved patterns;
- rejects patterns excluded by `Try something else`;
- validates ritual safety with `validateRitualSafety()`;
- rejects capacity mismatches unless high-capacity fallback is allowed;
- applies recommendation-contract rejection via `getRecommendationContractRejectionReasons()`;
- rejects patterns too long for current duration limit;
- rejects avoided style and burden conflicts.

Eligible patterns are scored from:

- approval/capacity/duration fit;
- saved preference matches;
- selected symbolic-card style matches;
- selected timing-signal style matches;
- private profile theme matches;
- private natal contact matches;
- current check-in capacity, practice type, ritual focus, primary focus action, audience, and timing-window matches;
- ritual form-family matching through `src/lib/ritual-form-families.ts`;
- default pattern and high-capacity adjustments.

`selectPattern()` returns the highest-scoring eligible candidate. If none exists, it falls back to approved `bank_the_house_light` and records `noAlternateAvailable` when try-again exclusion caused the issue.

### Final field assembly

`generateWeeklyBrief()` returns these user-facing fields:

- `theme`: from `getTheme()`, which prefers effective `RitualPresentation.invitation` when available.
- `intention`: from `getIntention()`, which prefers effective `RitualPresentation.carry` when available.
- `bestWindow`: from `getBestWindow()`, combining capacity window copy with selected strong timing window when time scope is best-week.
- `recommendedRitual`: from `getRecommendedRitual()`, which prefers merged `RitualPresentation` body via `composePresentedRitualBody()` and falls back to `pattern.steps` plus legacy tone closing.
- `optionalAddOn`: from `getOptionalAddOn()`, preferring pattern accents, candle-free accents, then focus-aware accents, otherwise `No add-on needed.`
- `reflectionPrompt`: from `getReflectionPrompt()`, which prefers effective presentation carry prompt and has pattern/focus/timing fallback phrases.
- `whyThis`: from `getWhyThis()`, built from `getWhyThisFits()` plus boundary text when excluded patterns or safety notes matter.
- `sourceSummary`: from `getSourceSummary()`, combining selected timing card, selected pattern, source lineage, and safety notes.
- `explanation.whyThisFits`: from `getWhyThisFits()`.
- `explanation.howThisWasChosen`: from `getHowThisWasChosen()`, compacted from diagnostic sections.
- `explanation.diagnosticHowThisWasChosen`: from `getDiagnosticHowThisWasChosen()`.
- `decision`: from `getRecommendationDecision()`.
- `trace`: built inline in `generateWeeklyBrief()` from selected facts/cards/pattern/source references/private profile keys.

## 5. User-facing copy source map

### Authored pattern/presentation copy

`RitualPresentation` in `src/data/ritual-patterns.ts` is the preferred authored source for final ritual copy:

- `invitation` feeds theme/title-like recommendation copy.
- `whyThisPractice` feeds ritual-fit explanation and `Why this fits`.
- `approach`, `steps`, and `closing` compose `recommendedRitual`.
- `carry` feeds intention/reflection/carry prompt.
- `variants` allow capacity, audience, focus, timing, and context-specific overrides.

`RitualPattern` also contains reusable fallback copy:

- `title`, `summary`, `materials`, `steps`, `optionalAccent`, `candleFreeOptionalAccent`, `sourceLineageLabel`, `capacityGuidance`, `toneGuidance`, `safetyNotes`, `avoidIf`, and `generatorUseNotes`.

### Composer-generated shared phrases

`src/lib/generate-weekly-brief.ts` contains substantial generated phrase logic:

- capacity windows in `getBestWindow()`;
- legacy tone closings in `getToneClosing()`;
- focus, material, audience, and capacity meaning phrases in `getFocusMeaningPhrase()`, `getAudienceMeaningPhrase()`, `getCapacityMeaningPhrase()`, and related helpers;
- boundary and coverage-gap language in `getBoundaryPhrase()` and `getCoverageGapSection()`;
- compact explanation language in `getHowThisWasChosen()` and helper functions;
- `Why this fits` phrase assembly in `getWhyThisFits()`.

These phrases are reusable functions, but their output is generated per recommendation based on selected pattern, check-in, timing, profile, and safety state.

### Source lineage/source summary copy

Source-related normal copy is assembled in `src/lib/generate-weekly-brief.ts`:

- `getSourceSummaries()` builds `BriefSourceSummary[]` from selected timing card, selected pattern, timing signal refs, source notes, source reviews, and safety guardrails.
- `getHumanSourceLabel()` maps source references to readable labels.
- `getSourceReviewSummary()` summarizes source review and selected notes.
- `getSymbolicCardSourceSummary()` summarizes timing-card meaning.
- `getPatternSourceSummary()`, `getPatternLineageSummary()`, and `getCompressedLineage()` summarize selected pattern lineage.
- `getSourcesSection()` turns this into `How this was chosen` material-lineage copy.

Raw source ids are preserved in `decision`/`trace` and debug, not normal UI.

### Timing explanation copy

Timing explanation comes from:

- `getTimingSignalsForFacts()` and `selectTimingSignals()` in `src/lib/timing-interpretation-rules.ts`;
- timing-window candidate labels/reasons from `src/lib/timing-window-candidates.ts`;
- `getPrimaryTimingPhrase()`, `getTimingChoiceSection()`, `getTimingBridgePhrase()`, `getTimingWindowReason()`, `getCalendarThresholdTimingPhrase()`, and `getNumerologyDiagnostic()` in `src/lib/generate-weekly-brief.ts`.

The copy is composed per recommendation from computed timing facts and selected pattern context.

### Scenario/test-only copy

`tests/fixtures/recommendation-quality-scenarios.ts` contains scenario titles, purposes, contract expectations, authored-output expectations, disallowed copy patterns, warning expectations, and review notes. This is not user-facing runtime copy, but it strongly documents what output quality is supposed to mean.

`scripts/recommendation-quality-report.ts` formats generated scenarios and warning reports. Those report strings are audit/review tooling, not app UI.

### UI labels

Visible shell/check-in/feedback labels live mostly in:

- `src/lib/current-ritual-check-in.ts` for check-in option labels;
- `src/data/ritual-focus-options.ts` for focus labels;
- `src/ui/app-shell.ts` for signed-out copy, check-in screens, current ritual view, explanation rendering, feedback labels, profile settings labels, and debug labels.

## 6. Current persistence model

Current persisted data is Firestore-oriented and private-data limited.

Persisted or intended persisted schema types in `src/lib/private-data-schema.ts`:

- `PrivateProfileDocument`
- `ScheduleConstraintsDocument`
- `CapacitySettingsDocument`
- `SavedBriefDocument`
- `FeedbackDocument`
- `RitualNoteDocument`

Actually loaded or written by current app code:

- `src/lib/private-data.ts` reads profile, capacity, schedule, household, and profile-email-link documents through `getDoc()`.
- `src/lib/private-data.ts` updates profile/capacity/schedule tuning and first-login welcome state through `updateDoc()`.
- `src/lib/brief-feedback.ts` writes feedback documents to Firestore collection `feedback` through `addDoc()`.

Current storage by product concept:

| Product concept | Current behavior |
| --- | --- |
| Current/last ritual | Held in memory as `activeBrief` in `src/main.ts`; not saved as a full current ritual record. |
| Generated recommendation instances | `WeeklyBrief` is generated in memory. `SavedBriefDocument` type exists, but this audit found no writer for saved brief bodies/history. |
| User check-in inputs | Held in memory as `activeCheckInDraft` and `activeCurrentRitualCheckIn`; included in generated `decision` while in memory; not persisted directly. |
| Feedback | Persisted by `saveBriefFeedback()` with `briefId`, feedback type, selected symbolic card keys, ritual pattern keys, timing facts, capacity, audience, source review ids, and source note ids. |
| Favorites | No current favorite model or writer found. |
| User profile/preference data | Persisted in Firestore profile/capacity/schedule documents and loaded into `PrivateBriefData`. |
| Source/content library | Source-controlled TypeScript data, not Firestore/library persistence. |
| Ritual history | No current history reader/writer found. `SavedBriefDocument` and `RitualNoteDocument` types suggest future intent but are not active history flows. |

## 7. What is reusable vs generated today

Reusable today:

- `SourceReview` and `SourceNote` records.
- `SymbolicCard` records.
- `RitualPattern` records.
- `RitualPresentation` copy attached to patterns.
- timing interpretation rules.
- ritual focus options and practice option hints.
- private profile/settings documents as durable user context.
- recommendation quality scenarios as test/review fixtures.

Generated per recommendation:

- `ResolvedGenerateWeeklyBriefInput`.
- computed timing facts and selected timing-window candidates.
- selected timing signals.
- evaluated/rejected pattern candidate lists.
- merged effective presentation variant.
- `WeeklyBrief` fields.
- `BriefExplanation`, `RecommendationDecision`, and `trace`.
- feedback document when the user gives feedback.

Important distinction: generated outputs are not reusable rituals today. They are recommendation instances built from reusable content and runtime context.

## 8. How current engine content could map to a shared library

Current `RitualPattern` records are effectively the canonical reusable ritual candidates for the recommendation engine. They contain stable ids/keys, titles, materials, steps, safety, capacity, audience, source references, style tags, approval status, and optional authored presentation. That makes them the strongest current candidate for "what is a ritual today."

`SymbolicCard` records are not currently user-facing library rituals. They are symbolic support objects: timing/material/profile meaning, style hints, source refs, guardrails, and possible ritual ideas. They may support library browsing or metadata, but they do not currently contain a complete ritual body with readiness for direct practice.

`WeeklyBrief` outputs are recommendation instances, not canonical rituals. A brief can contain a complete user-facing ritual body, but it is contextual and may be shaped by date, capacity, audience, check-in, profile, timing window, and composer logic.

There is no current shared ritual library surface. The source-controlled `starterRitualPatterns`/Batch 1 patterns behave like an engine library, not a searchable household library with direct selection, incomplete entries, favorites, history, or intake.

Future library records could naturally wrap or reference:

- a `RitualPattern.key` for existing engine-backed rituals;
- `SymbolicCard.key` and source refs for lineage/metadata;
- generated `WeeklyBrief.briefKey` for history of a specific recommendation;
- future user-created ritual content for library entries that are findable before they are recommendable.

## 9. Library/history/favorites/feedback implications

Searchable shared ritual library would need:

- a durable library entity with title, body/steps, carrier/material/action metadata, source/origin, tags, ownership/household visibility, and readiness status;
- indexing/search fields separate from current `ritualStyles`;
- a way to include current engine-backed patterns and future incomplete/user-created entries in the same findable surface.

Direct selection from "I have something in mind" would need:

- a route that can select a library entry without going through score-first recommendation;
- a way to adapt or render a library ritual using capacity/audience/timing without changing the canonical library record;
- a clear distinction between "selected directly" and "recommended by engine" in history/feedback.

Favorites by Tim/Jessica would need:

- user/profile/household-scoped favorite records;
- a target reference type, likely library ritual id and optionally pattern key;
- support for different people favoriting the same shared ritual differently;
- a decision about whether favorited generated recommendations point back to reusable ritual, saved instance, or both.

Ritual history would need:

- persisted recommendation or practice instances;
- selected reusable ritual reference;
- generated brief fields or snapshot copy;
- check-in/timing/profile trace keys safe enough to keep;
- feedback/practiced/skipped/completed status;
- direct-selection vs generated-recommendation provenance.

Feedback on recommendation instances already has a partial model:

- `BriefFeedbackDocument` stores `briefId`, feedback type, selected pattern/card/timing/source keys, capacity, and audience.
- It does not store full copy, check-in, explanation, or whether the ritual was actually practiced.

Feedback aggregated back to reusable rituals/patterns would need:

- a stable library or pattern target id;
- aggregation rules by person/household, feedback type, capacity, audience, carrier, purpose, and recommendation context;
- safeguards so "not this style" on one generated instance does not globally penalize a reusable ritual in unrelated contexts.

Create/import ritual flows would need:

- a persisted draft/incomplete library entry type;
- source/origin capture;
- metadata completeness/readiness audit;
- optional links to existing source notes/cards/patterns;
- later promotion into recommendation-eligible content only when required metadata is present.

Incomplete library entries would need:

- a state that is findable but not recommendable;
- missing-field audit output;
- enough display copy for browsing even when engine metadata is incomplete.

Metadata completeness/readiness audit would need:

- a computed audit function over library entries;
- separate statuses for findable, practice-ready, recommendation-eligible, source-backed, safety-reviewed, and engine-mapped.

Recommendation eligibility for library rituals would need:

- engine-consumable metadata equivalent to or mapped from current `RitualPattern` fields: capacity, duration, styles, safety flags, source refs, audience fit, materials/actions, and presentation body.

## 10. Ritual intake implications

A future intake wizard can align with the current architecture if it separates capture, metadata, readiness, and engine eligibility.

Current code supports these ideas indirectly:

- source/origin maps to `SourceReview`, `SourceNote`, `sourceReferences`, `sourceNoteKeys`, and `sourceLineageLabel`;
- body/steps/materials map to `RitualPattern.materials`, `steps`, and `presentation`;
- purpose/action metadata maps loosely to `ritualStyles`, focus option hints, and ritual form families;
- capacity and audience map to `capacityModes`, `defaultDurationMinutes`, `audienceFit`, and presentation variants;
- safety maps to `safetyFlags`, `safetyNotes`, `avoidIf`, `burdenAvoidFlags`, and `contraindications`;
- recommendation eligibility maps to `approvalStatus`, safety validation, capacity/duration fit, style hints, source refs, and contract compatibility.

What architecture is needed:

- a library entry type that can exist before a complete `RitualPattern`;
- an explicit `origin` or `source` section captured at the start;
- a metadata step that assigns carrier, purpose, materials, actions, place, capacity, audience, timing fit, source status, and safety flags;
- a computed readiness audit that can run during intake and globally;
- a conversion/wrapper path from intake entry to recommendation-eligible engine object.

This should not be only a manual stage flag. The current engine has many real eligibility gates, so a future wizard should show readiness as computed findings: missing body, missing capacity fit, unsafe material, no source status, no carrier, no purpose, unsupported timing metadata, or incomplete presentation.

## 11. Recommendation-readiness audit implications

A future audit should answer three separate questions:

1. Is the ritual findable?
2. Is the ritual practice-ready for direct selection?
3. Is the ritual recommendable by the engine?

Recommended audit checks:

- `title`: present, human-readable, searchable.
- `ritual body/steps`: enough instructions to practice without composer fallback.
- `carrier / where ritual lives`: explicit enough for browse and check-in mapping.
- `purpose / what work ritual holds`: explicit enough for recommendation matching.
- `purpose refinement`: optional sub-purpose or focus bridge.
- `materials`: present where material action matters, or explicitly "none".
- `actions`: action family tags such as place, hold, speak, fold, tend, release, cross, close, open, bless, protect, remember.
- `place`: table, doorway, plant, vessel, body, words, candlelight, etc.
- `capacity fit`: duration and supported capacity modes.
- `audience fit`: solo, together, household, either.
- `timing fit`: timing affinities and boundaries; timing should shape, not override.
- `source/origin status`: personal/household, source-backed, curated/imported, current engine pattern, or unknown.
- `safety flags`: fire, smoke, ingestion, pets/children, cleanup burden, emotional intensity, allergies, oils/herbs, outdoor/weather constraints when relevant.
- `recommendation boundaries`: avoid-if, contraindications, hard excluded contexts.
- `search tags/metadata`: browsable tags separate from scoring-only internals.
- `presentation`: invitation, body, carry/closing, and any needed variants.
- `source refs`: valid refs when source-backed; no copied source prose.
- `engine mapping`: can map to current pattern-like fields.

Conflict checks should include:

- capacity says low but duration/materials imply high;
- safety flags conflict with common household constraints;
- purpose says opening but body is primarily release unless bridged;
- carrier says plant but body does not use a plant materially;
- source/origin says source-backed but has no source refs or notes;
- recommendation tags imply a check-in category that the form-family classifier would reject.

The audit should classify entries as personal/household ritual, source-backed ritual, current engine pattern, curated/imported ritual, or incomplete draft. That classification should be factual metadata, not a final product hierarchy.

## 12. Relationship to #255 adaptive taxonomy

The future #255 taxonomy introduces two core fields:

- Carrier: where the ritual lives.
- Purpose: what work the ritual holds.

Candidate carriers:

- In candlelight
- At the table
- At the doorway
- With a plant
- In words
- In a vessel
- In the body

Candidate purposes:

- Steadying
- Opening
- Releasing
- Tending
- Connecting
- Voicing
- Marking
- Blessing
- Protecting
- Remembering

Current architecture support:

| #255 concept | Current support | Evidence |
| --- | --- | --- |
| Carrier | Indirect. | `RitualPattern.ritualStyles`, `materials`, `steps`, `presentation`, source lineage, and ritual form families imply carriers such as candle/light, table, threshold, plant, written/folded words, bowl/vessel, and body. There is no explicit `carrier` field. |
| Purpose | Indirect. | `RitualFocusOption` labels and style hints cover current focus ideas such as grounding, beginning, clearing, resting, saying clearly, tending, and marking threshold. There is no explicit `purpose` field on `RitualPattern`. |
| Adaptive check-in use | Partly direct through current focus/practice fields. | `CurrentRitualCheckIn` carries `practiceTypeHints`, `ritualFocusKey`, and `ritualFocusText`; scoring uses those fields in `getCheckInPatternScoreReasons()` and rejection logic. |
| Library metadata | Requires refactor or wrapper. | Existing patterns can be mapped, but source-controlled records do not currently expose canonical carrier/purpose fields for browse, intake, audit, or direct selection. |
| Readiness audit | Requires new model/function. | Content reachability and recommendation quality reports audit current engine behavior, not per-entry carrier/purpose completeness. |

Likely mapping from current fields:

- `In candlelight`: styles such as `candle_or_light`, `light_focus`, `first_light`, `waning_light`, `full_light`.
- `At the table`: styles such as `table_reset`, `shared_space`, `home_hearth`, bread/grain/table patterns.
- `At the doorway`: styles such as `threshold_reset`, `crossing`, `first_last`.
- `With a plant`: styles such as `plant`, `plant_tending`, plant-specific patterns.
- `In words`: styles such as `reflection`, `naming`, `written`, `folded_word`, `conversation`.
- `In a vessel`: bowl/vessel patterns, salt/water, seasonal marker bowl, holding bowl.
- `In the body`: only lightly represented today; may need new metadata/content if this becomes a first-class carrier.

Purpose mapping is also partial:

- `Steadying`: current `getting_grounded`, grounding/home/light styles.
- `Opening`: current `making_a_beginning`, first-light/seed/grain styles.
- `Releasing`: current `clearing_something_out`, release/salt/water/dead-leaf/lowering styles.
- `Tending`: current `tending_the_home`, plant/home/table/hearth styles.
- `Connecting`: current `tending_us`, shared space/table/cup/light styles.
- `Voicing`: current `saying_something_clearly`, written/folded/naming styles.
- `Marking`: current `marking_a_threshold`, threshold/seasonal/first-last styles.
- `Blessing`, `Protecting`, and `Remembering`: not first-class current check-in purposes. Some source-backed mechanics may touch them, but the engine does not currently expose them as controlled purpose fields.

## 13. Architecture options

### Option A: `RitualPattern` as the library ritual

What it means:

`RitualPattern` becomes the canonical shared library record. Search, favorites, history, direct selection, feedback, intake, and readiness all reference pattern keys.

Pros:

- Lowest implementation distance from current engine.
- Existing recommendation eligibility already understands approval, safety, capacity, duration, style hints, audience, sources, and presentation.
- Existing feedback already stores `ritualPatternKeys`.
- Existing quality and reachability reports already analyze patterns.

Cons:

- Current patterns are engine candidates, not full library/intake records.
- Incomplete entries conflict with `approvalStatus` and validation expectations.
- Search/display metadata would overload `ritualStyles` unless new fields are added.
- Direct selection may accidentally use scoring-oriented copy/variants as canonical library copy.
- User-created/imported content would have to satisfy engine-shaped fields too early.

Migration/implementation impact:

- Add carrier/purpose/search/readiness fields to `RitualPattern`.
- Add persistence or source-controlled registry rules for user-created patterns.
- Update validation, content lint, reachability, feedback, and UI to treat patterns as library entries.

Risks:

- Engine concerns and library UX concerns become tightly coupled.
- Incomplete entries may weaken pattern validation or create many draft exceptions.
- Harder to distinguish reusable ritual from generated recommendation instance.

### Option B: Library ritual wraps existing `RitualPattern`

What it means:

A new `LibraryRitual` record references a `RitualPattern.key` when it is engine-backed. The library entry owns browse/search/intake/favorite/readiness metadata; the pattern remains the engine candidate.

Pros:

- Keeps current engine stable.
- Allows incomplete/findable entries that do not yet have pattern eligibility.
- Gives direct selection and favorites a stable library id.
- Allows one library entry to point to existing pattern, source/card lineage, and future generated/history records.
- Easier to add #255 carrier/purpose fields without immediately changing scoring.

Cons:

- Requires mapping and sync between library entries and patterns.
- Can create duplicated title/body/source metadata if boundaries are unclear.
- Direct-selection rendering must choose whether to use library copy, pattern presentation, or a generated adapted view.

Migration/implementation impact:

- Create a library model with optional `ritualPatternKey`.
- Backfill/wrap current approved patterns as initial library entries.
- Add readiness audit that distinguishes library findability from engine eligibility.
- Keep generator consuming `RitualPattern` until deliberate refactor.

Risks:

- Wrapper drift: a pattern changes but its library metadata is stale.
- Product confusion if the same ritual has both library and pattern titles/copy.

### Option C: Separate reusable `LibraryRitual`, generated instances/history separate

What it means:

The product gets a first-class reusable library model. Recommendation history gets a separate generated/practiced instance model. Existing `RitualPattern` becomes either an engine adapter generated from library metadata or a legacy engine source referenced by library entries.

Pros:

- Clean conceptual split: reusable ritual vs recommendation instance vs feedback event.
- Best fit for incomplete intake, direct selection, favorites, history, and global readiness audit.
- Allows library records to be personal/household, source-backed, curated/imported, or engine-backed.
- Avoids treating generated brief copy as canonical ritual content.

Cons:

- Highest implementation cost.
- Requires adapter/migration strategy for existing patterns.
- More product/design decisions before implementation.
- Existing tests and reports still target patterns, so audit/report tooling must expand.

Migration/implementation impact:

- Define `LibraryRitual`, `RitualInstance` or `RecommendationInstance`, favorites, and feedback target models.
- Backfill existing approved patterns into library records or create adapters.
- Update generator eligibility to consume library-derived candidates or continue through pattern adapters.
- Add readiness audit and global library/report tooling.

Risks:

- Too much model surface if designed before direct product flows are clear.
- Engine behavior could drift during migration unless adapters are well tested.

### Option D: Generated brief as saved ritual instance, with pattern/library back-reference

What it means:

Keep reusable content as patterns or library entries, but always persist generated `WeeklyBrief` snapshots as recommendation/practice history. Favorites and feedback can target either the snapshot or the reusable source.

Pros:

- Preserves exact copy the user saw.
- Makes history and feedback understandable.
- Works with either Option A, B, or C.

Cons:

- Does not solve library modeling by itself.
- Requires privacy/snapshot decisions about how much check-in, explanation, and trace to store.

Migration/implementation impact:

- Implement saved recommendation/practice instance persistence.
- Decide snapshot fields and retention.
- Link feedback and favorites to both instance id and reusable ritual id when available.

Risks:

- Storing too much decision/debug data may exceed the desired privacy boundary.
- Storing too little makes future feedback learning hard.

Recommendation, not current behavior: Option B plus Option D looks like the most incremental path from the current code. It would preserve the engine-backed `RitualPattern` layer, add a findable/incomplete library wrapper, and separately persist exact recommendation instances for history/feedback. This is a product/design recommendation, not an implemented architecture.

## 14. Recommended next product/design questions for Tim

- When Tim says "ritual," does he mean the reusable household/grimoire entry, the engine pattern, or the exact recommendation instance shown on a specific day?
- Should direct selection render the canonical library body unchanged, or should timing/capacity lightly adapt it?
- Should favorites point to reusable rituals, exact generated instances, or both?
- Should feedback mean "this generated recommendation was good/bad" or "this reusable ritual is good/bad for me/us"?
- What is the minimum findable library entry: title only, title plus origin, or title plus rough body?
- What is the minimum recommendable entry?
- Should source-backed, personal/household, and curated/imported rituals have different readiness rules?
- How much generated copy and check-in context should history store?
- Should current `ritualStyles` remain engine tags, or should #255 carrier/purpose become the user-facing metadata layer with engine tags underneath?
- Are `Blessing`, `Protecting`, and `Remembering` approved product purposes now, or should they wait for source/content review?

## 15. Recommended implementation slices after design decision

1. Define terminology and models on paper: reusable ritual, library entry, generated recommendation instance, practiced ritual/history event, favorite, feedback.
2. Add a read-only current-state library inventory report that lists approved patterns with inferred carrier/purpose/source/readiness gaps.
3. Add explicit carrier/purpose metadata to a non-runtime audit layer before changing recommendation scoring.
4. Add persisted recommendation instance snapshots, linked to current pattern key and feedback.
5. Add favorites targeting reusable library entries and optionally exact instances.
6. Add direct-selection flow for existing approved patterns/library entries without recommendation scoring changes.
7. Add intake draft model with source/origin capture and computed readiness audit.
8. Expand recommendation eligibility to library rituals once metadata and readiness are stable.
9. Update quality/reachability reports to cover library entries as well as patterns.

## 16. Risks and unknowns

- `SavedBriefDocument` and `RitualNoteDocument` exist as schema types but are not active app flows in the code inspected here.
- Current feedback is persisted but not yet used by the generator for learning in the files inspected here.
- `RitualPattern` is very close to "reusable ritual," but its current field names and validation are engine-first.
- `SymbolicCard` can look library-like because it has title/summary/themes/ritual ideas, but current runtime treats it as symbolic support, not a selectable ritual.
- Current generated `WeeklyBrief` can look like a complete ritual, but it is contextual output, not canonical reusable content.
- #255 carrier/purpose can be inferred from current styles and form families, but first-class support needs new metadata or a wrapper model.
- Incomplete entries are not compatible with the current approved-pattern-only recommendation path without a separate findable draft/library layer.
- The existing modified file `docs/content-packets/high-capacity-documented-rite-families.md` was present before this audit work and was not changed by this audit.
