# Moon & Table

Moon & Table is a private ritual calendar for meaningful timing, simple home magic, and shared life at home.

It blends astronomy, astrology, numerology, kitchen magic, candle magic, plant magic, private profile context, and real-life schedule constraints to suggest simple rituals and reflection prompts for a private household.

The goal is not prediction or mystical certainty. The goal is to surface meaningful timing, offer gentle interpretation, and suggest small, doable rituals that fit real life.

## Core product idea

Moon & Table answers:

> What is symbolically meaningful this week, why might it matter, and what is one simple thing we could do with it?

The app should strongly prefer one useful recommendation over a long list of possibilities.

## Privacy boundary

The repository must not contain real names, birth data, relationship details, schedules, natal placements, private source documents, or personal profile notes.

The repository may contain generic schemas, templates, placeholder profiles, and example data.

Real personalization belongs only in Firebase/Firestore for the hosted app, private runtime storage, or local gitignored development files.

## Product principles

* One recommendation is better than ten options.
* Rituals should feel like support, not homework.
* The app should not free-associate from the internet.
* Symbolic meaning should come from a curated library.
* Astronomy and calendar timing should be computed or sourced reliably.
* Personalization should be gentle, practical, and clearly grounded.
* Schedule and capacity matter as much as symbolic timing.
* The app should avoid deterministic claims.
* The tone should be warm, plainspoken, domestic, and useful.

## MVP focus

The first useful version should generate a weekly brief with:

* one theme for the week
* one best ritual window
* one recommended ritual
* one relationship or journal prompt
* one optional add-on
* a short “why this” explanation

Default ritual time should be under 20 minutes.

## Private personalization notes

Private personalization is supported by the product but must not be committed to the repository.

Use generic placeholder language in source control, such as:

* `person_a`
* `person_b`
* `household`
* `private_profile`
* `capacity_constraints`
* `schedule_constraints`

Do not commit actual names, birth data, natal placements, schedules, or private source text.

## Development workflow

See `docs/development-workflow.md` for local test commands, CI behavior, Playwright status, auto-merge readiness, and privacy-safe testing expectations.

See `docs/firebase-setup.md` for the placeholder-only Firebase project setup path for hosted auth and private storage.
