# Recommendation Quality Model

Moon & Table is moving from an app that chooses one ritual that fits the moment to a private household grimoire with a recommendation engine underneath.

Moon & Table chooses one ritual from our private household grimoire, then explains how the moment gives it shape.

This document is the source of truth for recommendation quality. It exists so future work does not produce generic, repetitive, mechanically assembled ritual output.

## Product Standard

Moon & Table should feel like:

- a private household grimoire
- warm, adult, intentional, specific, and cared-for
- authored rather than assembled
- meaningful without overclaiming
- magical without becoming an AI oracle or horoscope feed
- practical without becoming productivity software
- private and personal without exposing private data

It should not feel like:

- generic wellness software
- AI-generated ritual slop
- a therapy tool
- a horoscope feed
- a task checklist
- a debug console
- a source-compliance interface
- user-tuned prose output

The recommendation engine can be technical underneath. The ritual itself should not feel technical. A person should feel that one ritual was chosen with care from a private household body of practice, then shaped by timing, check-in context, capacity, profile themes, and source-backed symbolic meaning.

Moon & Table has a house voice. User settings may constrain intensity, visibility, capacity, and practice fit, but they should not remix the ritual into a different writing style.

The house voice should be private, adult, warm, intentional, grounded, specific, magical without overclaiming, practical without becoming productivity software, loving without becoming sentimental filler, and low-overwhelm without sounding fragile-person-coded.

The normal product should not expose tone selectors, writing-style pickers, broad avoid-language controls, or prompt-style mixers. `toneGuidance` on ritual patterns is editorial metadata for curation and review, not a user setting.

Moon & Table treats magical practice as meaningful on its own terms. Do not tell the user what to believe, and do not flatten practices like moon water, threshold charms, candle work, kitchen magic, plant magic, or household rites into "visual markers," "just symbolic cues," wellness metaphors, or decorative props.

Safety should constrain recommendations; it should not rewrite the metaphysics of the practice. If a ritual form creates source, privacy, or practical eligibility risk, choose an approved form that fits, quietly constrain eligibility, or set the pattern aside. Practical boundaries should be mostly internal. They should not dominate user-facing copy or explain away the practice.

Preserve ritual meaning while avoiding unsupported claims. Do not promise healing, guaranteed outcomes, protection from danger, prosperity, love, medical effects, legal outcomes, or safety outcomes. Do not include unsafe default instructions.

Bad:

- "Moon water is just a visual marker."
- "Use this to guarantee protection."
- "Drink this to absorb lunar energy."
- "This charm will bring money into the home."
- "Do not believe this; it is only symbolic."

Better:

- "Moon water belongs to lunar material practice and should be handled as a meaningful ritual material within source-backed boundaries."
- "A threshold charm can mark welcome, intention, or monthly household attention without promising prosperity or protection."
- "Practical constraints shape which version the app recommends; they do not explain away the practice."

## Recommendation Quality Bar

A good recommendation includes six parts:

1. The moment: why now?
2. The meaning: what symbolic, timing, check-in, or contextual tension/support is being worked with?
3. The ritual: what do we do?
4. The manner: how do we approach it?
5. The carrying: what question, phrase, image, or attention remains afterward?
6. The closing: how does the ritual end cleanly?

A ritual is not just a title plus steps. A pattern can provide the action, but the final recommendation needs coherence: what the moment asks for, how the ritual answers it, how the action should be held, what remains afterward, and how the ritual ends.

## Anti-Slop Rules

These are product rules:

- Do not stitch together unrelated theme fragments and pattern summaries.
- Do not use generic optional candle add-ons by default.
- Do not repeat generic closings like `Keep it simple and useful` as filler.
- Do not render `No required ritual` followed by a list of imperative steps.
- Do not let a lunar fallback question contradict the selected focus.
- Do not say a focus helped point toward a ritual unless the explanation also gives real ritual meaning.
- Do not let score/debug language leak into user-facing copy.
- Do not make safety a prominent product layer, while preserving quiet hard guardrails.
- Do not invent ritual meaning outside reviewed cards, patterns, SourceNotes, or approved bridge rules.
- Do not treat diagnostics as proof that the recommendation is good.

Diagnostics can prove that a recommendation was explainable. They cannot prove that it was good.

## Ritual Coherence Rules

The title, timing reason, ritual body, intention, optional accent, carry prompt, and closing should feel like one ritual.

If timing, focus, practice type, audience, or capacity are in tension, the app needs a meaning bridge. It should not drop one input silently, pretend everything matched, or fall back to raw timing language.

Examples:

- `Making a beginning` during waning timing should become preparation, clearing room, naming the first step, or reclaiming attention. It should not become wrong timing, and it should not fall back to a generic waning-release prompt.
- `Tending us` with low capacity should become a small shared gesture or bounded attention, not a heavy conversation.
- A candle/light ritual should not add `light a candle` as a generic optional add-on.
- A plant-selected check-in that is set aside should explain the tradeoff in expanded explanation, not pretend the answer matched.

Timing shapes ritual form, but it should not manufacture unreviewed practice. A selected focus should be bridged, not vetoed. Capacity should shape the ritual's size and manner without making the output feel like a task-management rule.

## Model Concepts

These concepts define the quality model. Some are implemented now and some remain planned.

`RitualPresentation`

Authored user-facing ritual language attached to an approved pattern. This is where title variants, body copy, intention language, carry prompts, closing language, and optional accents can become cared-for instead of mechanically assembled from pattern fields.

The first implementation attaches presentation fields to a focused set of approved ritual patterns. Generated briefs prefer that presentation for the ritual body, intention, carry prompt, and closing language when available, while keeping `RitualPattern.steps` for validation, safety review, source traceability, and fallback behavior.

`RitualMeaningBridge`

A planned reviewed bridge between timing, focus, practice, audience, or capacity tensions. A bridge explains how one input reshapes another without inventing meaning. For example, beginning plus waning timing can become preparation or clearing room.

`RecommendationQualityScenario`

A privacy-safe scenario used to judge output quality. It is not just a unit test for selection. It asks whether the output feels coherent, specific, and meaningfully shaped.

`ContentPacket`

A human-reviewed packet for adding new source-backed content in batches. A packet can include source candidates, review notes, proposed transformed notes, proposed cards, proposed patterns, presentation language, meaning bridges, quality scenarios, and follow-up notes.

The packet workflow lives in `docs/content-packets/README.md`. Only packets marked `approved_for_implementation` can support active implementation. Draft and `ready_for_review` packets are planning and review artifacts only; they must not change recommendation behavior.

Folk household magic packets should follow `docs/folk-household-magic-taxonomy.md` before adding active content. That taxonomy keeps visible practice routes simple while organizing deeper source-backed material forms, magical functions, timing affinities, activation modes, closure modes, and metaphysical integrity checks.

## Recommendation Quality Scenarios

A decision record explains what happened. It does not prove the recommendation was good.

Recommendation quality needs scenario review and human judgment. A privacy-safe scenario should include:

- check-in inputs
- timing context
- profile/natal placeholder context
- expected qualities
- disallowed outcomes
- selected ritual
- explanation review
- carry prompt review
- closing review
- human notes

Good scenarios should catch output that technically uses the right inputs but still feels generic, contradictory, overassembled, or thin.

The current scenario bench lives in `tests/fixtures/recommendation-quality-scenarios.ts`.
Run it with:

```sh
npm run recommendation:quality
```

The command prints a Markdown report to stdout. It is a review artifact, not app
UI and not a CI gate. The report shows the selected ritual, the user-facing copy,
the expanded explanation sections, selected timing signals, timing-window status,
numerology and practice-choice diagnostics, selected score reasons, rejected
near alternatives, automatic warnings, and a blank human-review note for each
scenario.

After Batch 1, the report also includes content-health sections for approved
pattern count, RitualPresentation coverage, selected-pattern diversity, source
coverage, category coverage, must-support coverage, nice-to-have status,
weak-pattern flags, demotions, and timing honesty. These sections make coverage
visible, but they still do not prove the recommendation is good.

Automatic warnings are prompts for review. They do not prove the recommendation
is bad, and the absence of warnings does not prove it is good. Tim should still
read the recommendation for coherence, specificity, and grimoire-worthiness.

## Content Expansion Direction

Prioritize depth in existing practice areas before adding major new categories:

- candle and light magic
- home / threshold / table / arrival rituals
- kitchen warmth and ordinary nourishment
- plant tending and seasonal companionship
- ritual closure, carrying, and after-practice

Conversation remains important, but it should not distract from fixing generic recommendation quality. Conversation needs its own source-backed content work before it becomes a mainline visible practice preference.

Future content packets should use the workflow in `docs/content-packets/README.md` and include a metaphysical integrity check:

- Does this preserve the ritual meaning of the practice?
- Did we accidentally reduce it to a wellness metaphor, visual prop, psychological cue, safety disclaimer, or decorative object?
- Are claims bounded without condescension?
- Are practical constraints handled quietly?
- Does the packet avoid telling the practitioner what to believe?

For folk household magic packets, use `docs/folk-household-magic-taxonomy.md` as the planning source before implementing moon water, threshold charms, salt/boundary practices, sweetening work, written charms, or container/object rites.

## Enforcement

Future implementation PRs that change recommendation output should check this document before changing code.

Before a recommendation-output PR is ready, ask:

- Does the ritual feel authored rather than assembled?
- Does the title match the ritual body, intention, carry prompt, and closing?
- Does the explanation describe ritual meaning, not just score mechanics?
- Did timing, focus, practice type, audience, and capacity get bridged when they were in tension?
- Is any optional accent contextual rather than generic filler?
- Are private data and reviewed-source boundaries preserved?

If the answer is no, the recommendation may be inspectable, but it is not good enough yet.
