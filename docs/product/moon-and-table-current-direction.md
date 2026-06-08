# Moon & Table Current Direction

> Status: Current / controlling.
> This is the north-star product-direction document for Ritual-first work.
> Older docs may provide history, source trail, failure analysis, or migration
> evidence, but they are not implementation instructions unless a future issue
> explicitly revives them.

## Product Doctrine

Moon & Table is not a ritual text generator. It is a private, source/context-backed ritual library that chooses and shapes one ritual for the moment.

The product is moving from a recommendation-generator-centered architecture to a Ritual-first architecture. The app should choose a whole authored practice whose intrinsic purpose fits the moment, then add bounded moment-specific context. It should not assemble a ritual from reusable mechanics, tags, and composer bridge language.

## Canonical Object

The future canonical object is `Ritual`.

A Ritual is a whole authored practice with intrinsic purpose. Similar mechanics with different purposes are different Rituals. A bowl for welcome, a bowl for release, and a bowl for memory may look mechanically similar, but they are not the same Ritual if their purposes differ.

Adaptations are not invented by the app. They must be authored, source-supported, or household-approved. An adaptation must not change the Ritual's purpose.

Current `RitualPattern` records are not canonical future Rituals. They may inform migration evidence, failure analysis, or temporary adapters, but they must not be automatically migrated into Ritual records.

## Presentation Fields

The current app presentation structure should be preserved:

- `headline`
- `practice`
- `intention`
- `best window`
- `why this fits`
- `question to carry`

These are authored presentation fields on a Ritual or an approved Ritual presentation layer. Words and completion belong inside `practice` unless a future typed-data issue explicitly changes that rule.

## Internal Metadata Rule

Internal fields must support one of these jobs:

- Choose with me
- I have something in mind
- source/review completeness

If a field does not support one of those jobs, it does not belong.

Metadata describes a Ritual so the app can recommend it, search it, select it directly, review it, and verify its source grounding. Metadata does not assemble rituals.

## Future Model Concepts

`Ritual`: The future canonical library object. It is a whole authored practice with intrinsic purpose, approved presentation fields, bounded metadata, availability flags, and source/household origin review.

`RitualPattern`: The current runtime recommendation candidate. It remains useful for existing generated recommendations, diagnostics, and migration evidence, but it is not the target canonical model.

`WeeklyBrief`: The current generated recommendation output. It is assembled today from timing facts, cards, patterns, check-in inputs, private context, composer logic, and explanations. In the target architecture, a recommendation should be closer to one selected Ritual plus bounded context.

`RitualInstance` / history event: A future record that a Ritual was recommended, selected, practiced, skipped, edited for completion truth, or otherwise used at a time. It is not the canonical Ritual itself.

`favorites`: A future user/household affordance for returning to known Rituals through the direct-selection path.

`feedback`: A future signal about whether a recommendation or selected Ritual fit the moment. Feedback should inform review and tuning without rewriting Ritual identity.

`intake`: A future workflow for proposing household Rituals, source-backed Rituals, or edits. Intake must preserve source review, authored purpose, and approval boundaries.

`readiness/eligibility audit`: A review layer that decides whether a Ritual is findable, direct-use eligible, recommendation eligible, or still pilot/review-only.

## Current Runtime vs Target Architecture

The current runtime still uses `RitualPattern`, `SymbolicCard`, composer logic, and generated `WeeklyBrief` output. That is the app's current implementation architecture.

Those objects are not the future canonical model. They may be used as migration evidence, failure evidence, source/review context, or temporary adapters only.

Existing content packets and audits may contain useful source leads or implementation history. They must not be treated as current runtime implementation plans for Ritual-first work.

## Current App Flows

`docs/product/app-flow-decisions.md` is the controlling app-flow document. Future architecture must preserve those decisions unless a later explicit product decision supersedes them.

In particular:

- Choose with me is the guided check-in and recommendation path.
- I have something in mind is library/search/direct selection, not another recommendation-first flow.
- Timing is engine-led.
- Energy controls check-in burden and recommendation eligibility.

## Pre-Reset Issue Triage

Open issues created before the Ritual-first reset should be reviewed before implementation. Issues that assume direct `RitualPattern`, `SymbolicCard`, `SourceNote`, content-packet, Part B, or composer expansion may need to be closed, revised, or superseded.

A later issue should handle GitHub issue triage. This docs reset does not close issues.
