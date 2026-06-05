# Content Packets

Moon & Table chooses one ritual from our private household grimoire, then explains how the moment gives it shape.

Content packets are the review layer between source research and active grimoire content. They help future work add richer source-backed ritual material without casual scraping, copied source text, safety-washing, or unreviewed rituals slipping into the live library.

Use this workflow for future content issues, especially #171 through #176.

## What A Packet Is

A content packet is a repo-safe planning document for a bounded content batch. It can collect source candidates, source-risk notes, proposed SourceNotes, proposed cards, proposed RitualPatterns, proposed RitualPresentations, possible meaning bridges, and quality scenarios.

A content packet is not active content by itself. Draft packets must not change generation, scoring, source registry behavior, user interface, or the active ritual library.

## Statuses

- `draft`: Early packet. It may organize candidate ideas, but it is not ready for implementation.
- `ready_for_review`: Complete enough for human review, but not approved for active implementation.
- `approved_for_implementation`: Reviewed by a human and approved as source/content direction for a later implementation PR.
- `implemented`: A later PR has used the approved packet to add active SourceReviews, SourceNotes, cards, patterns, presentations, bridges, diagnostics, or tests.
- `rejected`: Not approved. It cannot be used for active content unless a new reviewed packet replaces it.

Only `approved_for_implementation` packets can be used to add active recommendation content.

## Reviewed-Source Rule

Codex must not choose random web sources as approved sources. Source candidates require human review before they can support active content.

Reviewed sources become short transformed SourceNotes. They do not become copied passages, copied rituals, copied spells, copied prayers, copied chants, copied recipes, copied affirmations, copied petitions, or copied correspondence tables.

Do not copy private source text. Do not put private source documents in the repository.

Source-backed does not mean scientifically proven. In content packets, source support can mean reviewed lineage, ritual technology, material/action logic, symbolic tradition, timing support, or an approved curation basis. A packet does not need hard evidence of external efficacy before proposing a meaningful magical practice.

Do not reject a packet idea only because it is magical, wooey, or not scientifically testable. Review it for source lineage, privacy, copyright, practical fit, cultural sensitivity, material/action logic, claims boundaries, activation, and closure.

## Metaphysical Integrity

Safety should constrain recommendations; it should not rewrite the metaphysics of the practice.

Each packet should check:

- Does this preserve the ritual meaning of the practice?
- Did we accidentally reduce it to a wellness metaphor, visual prop, psychological cue, safety disclaimer, or decorative object?
- Are claims bounded without condescension?
- Are practical constraints handled quietly?
- Does the packet avoid telling the practitioner what to believe?
- Does the packet preserve magical mechanisms such as presence, attention, embodiment, timing, material action, placing, folding, carrying, returning, washing, extinguishing, sweetening, emptying, threshold crossing, vessel holding, or spoken/written words?

If a ritual form creates source, privacy, or practical eligibility risk, choose an approved form that fits, quietly constrain eligibility, or set the pattern aside. Do not explain away the practice.

Avoid guarantees, not magic. A packet may use bounded magical language such as:

- "A vessel gives the work a place to rest."
- "A threshold receives one crossing."
- "A folded word becomes a held object."
- "A cup can carry warmth and close the rite."
- "The water gives release a way out."
- "The grain gives the beginning weight."

Do not translate the practice into "just symbolic" language, wellness metaphor, psychology explanation, productivity framing, decorative prop language, or safety disclaimer language.

## House Voice

Packets should support Moon & Table's house voice. The voice should feel private, adult, warm, grounded, intentional, specific, magical without overclaiming, practical without becoming productivity software, and low-overwhelm without treating the user as fragile.

Avoid:

- generic wellness copy
- AI oracle language
- therapy or relationship advice
- productivity framing
- safety-forward copy
- belief disclaimers
- prompt-style prose tuning

## Current Visible Routes

Future packet content should map to existing app routes unless a later issue explicitly changes the UI:

- Home
- Plant
- Kitchen
- Candle or light
- Reflection
- Seasonal
- Surprise me

Objects and materials such as water, cinnamon, salt, honey, keys, coins, jars, bowls, candles, herbs, paper, and doors are vehicles under those routes. They are not new top-level product categories by default.

## How To Use This Folder

Start from `docs/content-packets/templates/content-packet-template.md`.

Save real packet drafts under `docs/content-packets/` with a clear name, for example:

```text
docs/content-packets/lunar-materials.md
docs/content-packets/threshold-charms.md
```

Use `docs/content-packets/examples/example-kitchen-warmth-packet.md` only as a structural example. It is fake and not approved for implementation.

## Codex Boundaries

Codex may:

- create draft packets from human-provided or already-approved source candidates
- organize reviewed notes into a packet
- propose privacy-safe content for human review
- implement active content only from an `approved_for_implementation` packet

Codex must not:

- select sources independently as approved
- scrape or browse random sources and treat them as approved
- approve its own interpretations
- copy source text or distinctive rituals
- add private data
- weaken source, privacy, or practical constraints
- safety-wash magical practice
- tell practitioners what to believe
- add active content from a `draft` or `ready_for_review` packet
- add new visible UI categories unless an issue explicitly asks for them
