# AGENTS.md

## Project

Moon & Table is a private ritual calendar for meaningful timing, simple home magic, and shared life at home.

The product is best understood as a curated symbolic knowledge system with a calendar interface. The app should produce one grounded, low-overwhelm recommendation at a time, not a content feed or task list.

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
- Schedule and capacity constraints override symbolic timing.
- The app should avoid deterministic claims.
- Symbolic meaning should come from reviewed, traceable, approved cards.
- Do not let AI free-associate from the internet.
- Do not scrape sources casually.
- Do not copy large passages from copyrighted sources.
- Keep examples calm, practical, domestic, and privacy-safe.

## Recommendation quality bar

Follow `docs/recommendation-quality-model.md` when changing recommendation output, ritual language, explanations, presentation fields, scoring behavior, or content that can appear in a brief.

Moon & Table should feel like a private household grimoire with a recommendation engine underneath. A recommendation should feel authored, specific, and coherent, not mechanically assembled from a title, steps, timing phrase, and generic explanation.

Before opening a PR that can affect recommendation output, check:

- ritual coherence: title, timing reason, ritual body, intention, carry prompt, optional accent, and closing feel like one ritual
- generic filler: no repeated filler closings or vague wellness language standing in for meaning
- optional candle misuse: no generic `light a candle` add-on when the ritual is already candle/light-based or when the accent is not contextual
- timing/focus contradictions: selected focus is bridged, not vetoed or contradicted by raw timing fallback
- privacy/source boundaries: no private data, raw trace keys, or source-compliance machinery leaks into user-facing copy
- no copied source text: source-derived language is transformed, short, and traceable
- no private data: no real names, emails, birth data, natal placements tied to people, relationship details, private schedules, or private source text

Diagnostics and passing tests are necessary, but they do not prove recommendation quality. Use privacy-safe quality scenarios and human judgment for user-facing ritual output.

## Curation model

Follow `docs/curation-pipeline.md`.

Source material should move through this lifecycle:

1. Source candidate
2. Source review
3. Knowledge extraction
4. Card normalization
5. Human approval
6. Use in brief synthesis
7. Feedback from actual practice

Only approved symbolic cards should be used in generated briefs.

## Current implementation sequence

Follow `docs/roadmap.md` and the open GitHub issues.

Current first sequence:

1. Create privacy-safe source review packets.
2. Add privacy-safe symbolic card model and first generic approved cards.
3. Build first generic brief generator from seed symbolic cards.
4. Render privacy-safe weekly brief in initial app shell.
5. Add privacy-safe capacity modes and manual schedule constraints.

Do not jump ahead to calendar integration, AI generation, full astrology engines, public sharing, or a curation workbench unless an issue explicitly requests it.

## Brief format

Follow `docs/brief-format.md`.

A default weekly brief should include:

- theme
- best ritual window
- one recommended ritual
- one reflection prompt
- one optional add-on
- short `why this` explanation

Keep the default under 20 minutes. Use the four capacity modes: `pause`, `low`, `steady`, and `high`. For `low`, keep recommendations to 0-5 minutes. For `pause`, offer no required ritual.

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
- Avoid database work until the relevant issue asks for persistence.
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
