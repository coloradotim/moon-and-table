# Private source text policy

Moon & Table is a private household ritual calendar and grimoire for Tim and Jessica. It is not a public ritual-publishing platform.

This policy exists so research agents stop flattening rituals into generic mechanics and stop treating words, blessings, prayers, invocations, prompts, meditations, spells, charms, and recipes as contamination risks.

This policy works with:

```text
docs/research/voice/moon-and-table-house-voice-guide.md
docs/research/runtime-ritual-authoring-policy.md
docs/research/extraction-depth-policy.md
src/data/rituals/types.ts
```

The runtime authoring policy controls how source material becomes app `Ritual` records. The extraction depth policy controls how source material is inventoried and converted into import-ready candidate packets.

## Core rule

Words are valid ritual mechanics.

Blessings, prayers, invocations, prompts, meditations, spells, charms, spoken formulas, sung lines, written questions, recipes, and distinctive ritual phrases may be central to a Ritual. Agents must not exclude them as categories.

Author-provided words that the practitioner is meant to say, write, chant, bless, pray, invoke, petition, name, close, or carry are operative ritual words. Treat them as ritual materials, not decorative prose.

The task is to classify and preserve source text use, not erase it.

## Distinction to preserve

There are five different uses of source text:

1. **Mechanics extraction** — source-backed ritual structure, materials, sequence, timing, carrier, purpose, and boundary context.
2. **Surrounding runtime instructions** — Moon & Table-authored instructions that may be rewritten into product voice.
3. **Operative ritual words** — source-provided words used inside the rite. These should be preserved when feasible.
4. **Private exact-text use** — exact wording stored through approved private excerpt support and cited to the source.
5. **Operative words metadata** — `ritualWords` records that classify and prove how operative words are handled.

A modern authored blessing, prompt, invocation, spell, meditation, charm, recipe, or prayer may be valid for private household use even when a generated research packet should not reproduce the whole passage.

## Ritual body and `ritualWords`

Spoken or written words that the user should say or write belong inline in the ritual body / practice where they are used.

The complete ritual must read correctly from `presentation.practice` alone.

`ritualWords` is not the authoring surface for user-facing Ritual copy.

Use `ritualWords` only as provenance/review metadata for operative words already present in, or required by, the ritual body.

Allowed modes:

```text
source_exact_short
private_source_excerpt
moon_and_table_original
```

Definition:

```text
short source phrase = 20 words or fewer
```

Short source phrases used in rituals should be included inline in the ritual body and classified as `source_exact_short` with source location.

Longer blessings, prayers, incantations, scripts, prompt sets, meditations, recipes, or distinctive passages over 20 words should use `private_source_excerpt`.

Moon & Table original operative words are allowed only when the source supports a spoken or written action but does not supply short usable words, or when Tim explicitly approves an adaptation. They must still follow the source's magical function.

## Agent extraction posture

Agents may extract:

- exact rite titles;
- exact short operative words;
- exact short phrases;
- exact short questions;
- exact spoken cues;
- exact blessing names;
- exact material/action labels;
- short wording anchors that help preserve ritual force;
- close summaries of the source ritual’s structure, materials, sequence, purpose, and magical function;
- notes that exact source wording is ritually important and should be preserved inline in the ritual body when short enough, or through private excerpt support when longer/substantial;
- `ritualWords` metadata that tracks the operative wording mode, source location, context, and review dependency.

Agents should not reproduce in generated public repo files:

- full modern copyrighted rituals;
- full prayers or invocations;
- full guided meditations;
- full prompt sets;
- full recipes;
- whole distinctive spell texts;
- long copyrighted passages.

The fallback for longer exact wording is not generic paraphrase. The fallback is private excerpt support with a source location and a clear note about why the exact words matter.

## Runtime handling

Runtime Ritual records should use the schema fields in `src/data/rituals/types.ts`:

```ts
ritualWords?: {
  mode: "source_exact_short" | "private_source_excerpt" | "moon_and_table_original";
  text?: string;
  privateExcerptKey?: string;
  citationLabel?: string;
  sourceLocation?: string;
  useContext:
    | "spoken"
    | "written"
    | "chanted"
    | "prayer"
    | "blessing"
    | "incantation"
    | "invocation"
    | "petition"
    | "closing"
    | "question"
    | "vow"
    | "song"
    | "other";
  note?: string;
}[];
```

Use `source_exact_short` when a short operative wording of 20 words or fewer can be preserved directly in the committed record with attribution and without substituting for the source.

Use `private_source_excerpt` when the exact source wording is longer, distinctive, or substantially the source’s authored ritual text.

Use `moon_and_table_original` only when the source supports spoken/written ritual mechanics but does not provide operative words, or when Tim explicitly chooses adaptation over source wording.

## Classification model

Use these classifications in source-gate and extraction records.

```text
use_directly_from_source:
  Tim and Jessica can perform the rite directly from the purchased/provided source. The app may recommend the source rite by title, page, and section without reproducing the full text.

private_excerpt_allowed:
  Exact modern source wording may be stored through approved private excerpt support with citation. Research agents identify source locations and importance; longer/substantial passages use private excerpt keys rather than public repo reproduction.

private_recipe_excerpt_allowed:
  Exact recipes may be stored through approved private excerpt support for private household use. Research agents classify the recipe’s ritual role and boundary context, but should not reproduce full recipes in public repo files.

brief_quote_allowed:
  Short quotes are allowed for internal review, source commentary, phrase anchoring, or short operative ritual words. Keep them brief, attributed, and non-substitutive for the source.

close_paraphrase_allowed:
  Agents may closely summarize the ritual architecture, sequence, materials, purpose, tone, and magical function while avoiding line-by-line synonym replacement of distinctive source expression.

paraphrase_required:
  Use for source summaries, non-operative surrounding instructions, and Moon & Table-authored replacement text when no source-provided operative words are being preserved.

mechanics_only:
  Use for sequence, materials, timing, carriers, purposes, preparation, close, and adaptation guidance.

do_not_use:
  Use for coercive, unsafe, medicalized, culturally inappropriate, out-of-scope, or guaranteed-effect material.
```

## What “close to the source” means

For extraction, “close to the source” means close to:

- ritual architecture;
- sequence;
- materials;
- timing;
- carrier;
- purpose;
- spiritual/magical function;
- tone of practice;
- action logic;
- closing/completion logic;
- operative ritual words when they are meant to be used inside the rite.

It does not mean a line-by-line rewrite that merely swaps synonyms.

## Private exact-text storage policy

Exact source wording may be stored only under these constraints:

- private app only;
- cited with source ID;
- cited with title and author;
- cited with page or section;
- marked as source excerpt, not generated Moon & Table text;
- unavailable by default until reviewed;
- not used as public repo prose;
- not recommendation eligible until human review.

Recommended source-gate policy block:

```ts
sourceTextPolicy: {
  exactTextUse: "private_excerpt_allowed";
  assistantMayReproduce: "brief_quote_or_short_operative_words_only";
  privateAppStorage: "allowed_with_citation_and_review";
  storageLimits: [
    "private_app_only",
    "cite_source_id",
    "cite_title_author",
    "cite_page_or_section",
    "unavailable_by_default",
    "not_recommendation_eligible_until_human_review"
  ];
  notes: "Author-provided operative ritual words should be preserved when feasible. Short operative wording may be stored directly in presentation.practice and tracked as ritualWords.source_exact_short when non-substitutive and attributed. Longer or substantial source wording should use private excerpt support rather than generic paraphrase."
}
```

## Anti-sanitizing rule

Do not over-sanitize the source.

Moon & Table is not trying to turn witchcraft, hearthcraft, candle magic, kitchen magic, prayer, blessing, invocation, recipe, spoken ritual, or spellcraft into generic wellness mechanics.

Preserve the ritual force of the source. Use words like blessing, prayer, spell, invocation, incantation, charm, consecration, purification, protection, hearth, spirit, ancestor, sacred, and offering when the source uses those concepts and when they fit the approved product scope.

The task is to classify and adapt responsibly, not to flatten magical practice into secular self-care.

## Recipe rule

Recipes may be Rituals or central Ritual components.

Do not reject recipe material just because it is a recipe.

Classify recipes as:

- `mechanics_only` when extracting preparation, timing, sequence, serving, offering, blessing, or table structure;
- `private_recipe_excerpt_allowed` when the exact recipe may be valuable for the private app;
- `paraphrase_required` when creating non-operative Moon & Table-authored recipe-adjacent ritual copy;
- `do_not_use` only for unsafe, medicalized, culturally inappropriate, or out-of-scope material.

Flag food safety, allergies, dietary restrictions, pet/pregnancy concerns, and medical/nutrition claims only where materially relevant.

## Prompt language to use going forward

Use this in future source-gate, extraction, runtime import, and direct-use prompts:

```text
Words, prayers, blessings, invocations, prompts, meditations, spells, charms, incantations, petitions, and recipes are valid Ritual mechanics and may be central to a Ritual.

For modern copyrighted sources, distinguish between:

1. mechanics extraction;
2. non-operative surrounding instructions rewritten into Moon & Table voice;
3. exact short operative ritual words preserved directly in the ritual body where feasible and tracked as ritualWords.source_exact_short;
4. longer or substantial exact wording handled through private excerpt support and tracked as ritualWords.private_source_excerpt.

Research agents should not reproduce long copyrighted passages in generated public repo files. However, agents must not erase, downgrade, or generically paraphrase verbal, recipe, prayer, blessing, invocation, incantation, spell, prompt, or meditation material. Instead, classify it and preserve it inline when short enough or through private excerpt support when longer/substantial.

Agents may extract exact short phrases, questions, rite titles, spoken cues, blessing names, invocation cues, and wording anchors when they are ritually important.

Agents may closely summarize or rewrite surrounding instructions while preserving the source’s structure, materials, sequence, carrier, purpose, operative words, and magical force.

When exact wording is important but too long or substantial for direct public repo storage, use ritualWords.mode = "private_source_excerpt", give the source page/section, and explain why the exact wording matters.
```

## Coordinator instruction

Research and implementation agents should stop treating exact wording as a contamination risk.

The correct handling is:

- preserve words as valid Ritual mechanics;
- preserve recipes as valid Ritual mechanics;
- preserve short exact operative wording inline where feasible;
- track operative wording with `ritualWords` metadata;
- closely summarize the ritual structure and magical function;
- identify exact-wording locations when exact phrasing matters;
- use private excerpt keys for longer/substantial wording;
- avoid agent-generated long reproduction of copyrighted text in public repo files;
- keep private exact excerpts cited, unavailable by default, and human-reviewed before any recommendation path.
