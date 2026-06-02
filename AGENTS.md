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

Real personalization belongs only in private runtime storage, local gitignored files, or a private database.

## Product principles

- One recommendation is better than ten options.
- Rituals should feel like support, not homework.
- Schedule and capacity constraints override symbolic timing.
- The app should avoid deterministic claims.
- Symbolic meaning should come from reviewed, traceable, approved cards.
- Do not let AI free-associate from the internet.
- Do not scrape sources casually.
- Do not copy large passages from copyrighted sources.
- Keep examples calm, practical, domestic, and privacy-safe.

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
3. Build privacy-safe mock weekly brief generator from seed cards.
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

Keep the default under 20 minutes. For low-capacity or tiny mode, keep it to 3–5 minutes.

## Engineering expectations

- Keep early implementation simple and testable.
- Prefer typed data structures when using TypeScript.
- Keep seed data human-readable and easy to edit.
- Add tests when adding generation logic or constraint logic.
- Avoid introducing external APIs until the relevant issue asks for them.
- Avoid database work until the relevant issue asks for persistence.
- Keep code and docs aligned with the privacy boundary.

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

## Tone

Use plainspoken, practical language. Avoid mystical overclaiming, fear-based framing, and corporate/product jargon where possible.
