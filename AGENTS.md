# AGENTS.md

## Project

Moon & Table is a private ritual calendar for meaningful timing, simple home magic, and shared life at home.

## Ritual-first reset

Before product, workflow, data-model, UI, source, recommendation, library, intake, or Ritual work, read the controlling current docs:

1. `docs/product/moon-and-table-current-direction.md`
2. `docs/product/app-flow-decisions.md`
3. `docs/product/codex-ritual-work-rules.md`
4. `docs/product/README.md`

Older docs may provide source trail, historical context, failure evidence, or migration evidence, but they are not implementation instructions unless a future issue explicitly revives them.

The future canonical object is `Ritual`: a whole authored practice with intrinsic purpose. Current `RitualPattern`, `SymbolicCard`, composer logic, and generated `WeeklyBrief` output remain current runtime architecture only. They are not the target product architecture and must not be automatically migrated into future Rituals.

The product is best understood as a curated symbolic knowledge system with a calendar interface. The app should produce one grounded, low-overwhelm recommendation at a time, not a content feed or task list.

Current Ritual storage is mid-migration: Firestore is the active hosted Ritual
content/review store when DB reads are enabled, while
`src/data/rituals/source-backed-rituals.ts` remains the reviewed static
fallback/export and preservation baseline. Do not treat static TypeScript as the
only Ritual home, and do not delete it without a later explicit migration issue
and passing preservation audit.

## Absolute privacy boundary

The repository must not contain real names, birth data, relationship details, schedules, natal placements, private source documents, or personal profile notes.

Allowed in the repository:

- generic schemas
- generic templates
- placeholder data
- public/non-identifying examples
- privacy-safe symbolic cards
- documentation about how private data is handled

Not allowed in the repository:

- real names
- birth dates, birth times, or birth places
- chart placements tied to a real person
- relationship details
- parenting, work, or school schedules tied to a real person
- copied private source text
- uploaded private documents
- private profile notes

Use generic placeholder language such as:

- `person_a`
- `person_b`
- `household`
- `private_profile`
- `capacity_constraints`
- `schedule_constraints`
- `private_profile.practical_tending`
- `schedule.realistic_window_thursday`

Real personalization belongs only in Firebase/Firestore for the hosted app, private runtime storage, or local gitignored development files.

## Product principles

- One recommendation is better than ten options.
- Rituals should feel like support, not homework.
- Moon & Table chooses one ritual from our private household grimoire, then explains how the moment gives it shape.
- Moon & Table has a house voice. User settings may constrain intensity, visibility, capacity, and practice fit, but they should not remix the ritual into a different writing style.
- Safety should constrain recommendations; it should not rewrite the metaphysics of the practice.
- Schedule and capacity constraints override symbolic timing.
- Explicit check-in answers are recommendation contracts. For Ritual-first work, energy, audience, carrier when asked, purpose, and refinement should shape eligibility and selection. Timing and source support may shape the recommendation, but should not override explicit user selections without a real safety, source, privacy, or eligibility blocker.
- The app should avoid deterministic claims.
- Symbolic meaning should come from reviewed, traceable source grounding and approved Ritual records. Current `SymbolicCard` records remain part of current runtime architecture only.
- Source-backed does not mean scientifically proven. It means reviewed lineage, ritual technology, material/action logic, symbolic tradition, timing support, or other approved curation basis.
- Do not reject content only because it is magical or wooey. Bound the claims, preserve the magic.
- Magical mechanisms such as presence, attention, embodiment, timing, material action, placing, folding, carrying, returning, washing, extinguishing, sweetening, emptying, threshold crossing, vessel holding, and spoken or written words are valid ritual mechanisms for Moon & Table.
- Avoid guarantees, not magic. A bowl may hold a beginning, a key may carry one word, water may give release a way out, sweetness may soften one word, light may witness a line, and grain may give a beginning weight.
- Do not demystify ritual copy into wellness metaphor, psychology explanation, productivity framing, `just symbolic` language, decorative prop language, or safety disclaimer language.
- Do not let AI free-associate from the internet.
- Do not scrape sources casually.
- Do not copy large passages from copyrighted sources.
- Keep examples calm, practical, domestic, and privacy-safe.

## Recommendation quality bar

Follow the controlling Ritual-first docs above when changing recommendation output, ritual language, explanations, presentation fields, scoring behavior, or content that can appear in a brief. The archived `docs/archive/old-architecture/recommendation-quality-model.md` may provide historical failure evidence, but it is not current implementation guidance.

Moon & Table should feel like a private household grimoire with a recommendation engine underneath. A recommendation should feel authored, specific, and coherent, not mechanically assembled from a title, steps, timing phrase, and generic explanation.

Before opening a PR that can affect recommendation output, check:

- ritual coherence: title, timing reason, ritual body, intention, carry prompt, optional accent, and closing feel like one ritual
- generic filler: no repeated filler closings or vague wellness language standing in for meaning
- optional candle misuse: no generic `light a candle` add-on when the ritual is already candle/light-based or when the accent is not contextual
- timing/focus contradictions: selected focus is bridged, not vetoed or contradicted by raw timing fallback
- recommendation contract: explicit Ritual-first check-in answers are preserved; energy, audience, carrier when asked, purpose, and refinement shape eligibility and selection unless a real safety, source, privacy, or eligibility blocker is recorded in diagnostics; timing, numerology, natal themes, and source strength may shape the selected path instead of replacing it
- house voice: no user-facing tone selector, writing-style picker, or prompt-style mixer is introduced without a deliberate product decision
- metaphysical integrity: magical practice is treated as meaningful on its own terms, without flattening it into wellness metaphor, decorative prop, or safety disclaimer
- privacy/source boundaries: no private data, raw trace keys, or source-compliance machinery leaks into user-facing copy
- no copied source text: source-derived language is transformed, short, and traceable
- no private data: no real names, emails, birth data, natal placements tied to people, relationship details, private schedules, or private source text

Diagnostics and passing tests are necessary, but they do not prove recommendation quality. Use privacy-safe quality scenarios and human judgment for user-facing ritual output.

## Curation model

Follow `docs/product/codex-ritual-work-rules.md` and `docs/product/ritual-source-index.md`.

Archived content packets under `docs/archive/content-packets/` may contain useful source leads, but they are source research and source trail only. They are not active recommendation content or implementation plans.

For legacy runtime maintenance only, source material previously moved through this lifecycle:

1. Source candidate
2. Source review
3. Knowledge extraction
4. Card normalization
5. Human approval
6. Use in brief synthesis
7. Feedback from actual practice

Only approved symbolic cards should be used in current generated briefs. That is current runtime architecture, not the target Ritual-first model.

Archived draft or `ready_for_review` packets may organize source candidates, proposed notes, cards, ritual patterns, presentations, bridges, and quality scenarios. They must not change active generation, scoring, source registry eligibility, or UI behavior. Codex must not treat random web sources, copied source text, or its own interpretations as approved content.

## Current implementation sequence

Follow the controlling Ritual-first docs and the open GitHub issues. Open issues created before the Ritual-first reset may need revision before implementation.

Do not jump ahead to calendar integration, AI generation, full astrology
engines, public sharing, a broad curation workbench, source import, or full
Ritual body editing unless an issue explicitly requests it.

## Brief format

Follow `docs/product/moon-and-table-current-direction.md` for the preserved
Ritual body and generated recommendation explanation boundary. The archived
`docs/archive/old-architecture/brief-format.md` describes historical
WeeklyBrief format and is not target architecture.

The current generated `WeeklyBrief` runtime structure is legacy current-runtime
architecture. Future Ritual-first work should preserve the canonical editable
Ritual body fields from `docs/product/moon-and-table-current-direction.md`:

- `headline`
- `practice`
- `intention`
- `best window`
- `question to carry`

`why this fits` is generated after a Choose with me path from the selected
Ritual, check-in inputs, timing context, selector score/breakdown, and later
household memory. Existing `presentation.whyThisFits` values are
legacy/fallback compatibility data, not an editor-required Ritual body field.

The legacy current-runtime weekly brief still includes:

- theme
- best ritual window
- one recommended ritual
- one reflection prompt
- one optional add-on
- short `why this` explanation

Keep the legacy current-runtime default under 20 minutes. For legacy current-runtime `WeeklyBrief` work, preserve existing runtime capacity behavior unless an issue explicitly changes it. Future Ritual-first work should follow the energy model in `docs/product/app-flow-decisions.md`.

## Documentation and tests

Keep documentation and tests up to date with every meaningful change.

When changing product behavior, data shapes, privacy rules, curation workflow, or brief generation:

- update the relevant docs in the same PR
- add or update tests for the changed behavior
- update examples or fixtures so they remain accurate and privacy-safe
- document any skipped tests or missing test framework in the PR notes

When adding generation logic, source-card validation, capacity logic, schedule logic, private-profile loading, or trace construction, tests are expected.

If no test framework exists yet, do not create a large framework unless the issue asks for it. Instead:

- keep the implementation small and strongly typed
- document the test gap in the PR notes
- add a follow-up issue for test setup or targeted coverage if needed

## Engineering expectations

- Keep early implementation simple and testable.
- Prefer typed data structures when using TypeScript.
- Keep seed data human-readable and easy to edit.
- Add tests when adding generation logic or constraint logic.
- Avoid introducing external APIs until the relevant issue asks for them.
- Use Firebase Auth and Firestore as the planned first hosted auth/storage path when an issue asks for backend, auth, or persistence.
- Do not introduce Supabase unless an issue explicitly asks for it.
- Keep local gitignored profile loading optional for development; do not treat it as the primary hosted storage plan.
- Keep database work scoped to the relevant issue and preserve the static
  fallback/export path unless a later explicit migration issue changes it.
- Keep docs and tests up to date when backend, auth, or storage behavior changes.
- Keep code, docs, and tests aligned with the privacy boundary.

## Before committing or opening a PR

Check for accidental private details.

Search for and remove:

- real names
- birth data
- chart placements tied to a real person
- relationship details
- schedules tied to a real person
- private source text

Also verify:

- generated examples use placeholders only
- source review packets distinguish repository-safe material from private storage
- symbolic cards include `avoid_saying` and `safety_notes`
- generated briefs recommend only one primary ritual
- schedule/capacity constraints are treated as first-class inputs
- docs are updated when behavior or data shapes change
- tests are added or updated for generation and constraint logic

## Tone

Use plainspoken, practical language. Avoid mystical overclaiming, fear-based framing, and corporate/product jargon where possible.
