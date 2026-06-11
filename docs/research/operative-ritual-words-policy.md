# Operative ritual words policy

Moon & Table is a private household ritual calendar and grimoire. It is not a public ritual-publishing platform.

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

The task is to classify and preserve source text use, not erase it and not hide
behind process language.

## Distinction to preserve

There are five different uses of source text:

1. **Mechanics extraction** — source-backed ritual structure, materials, sequence, timing, carrier, purpose, and boundary context.
2. **Surrounding runtime instructions** — Moon & Table-authored instructions that may be rewritten into product voice.
3. **Operative ritual words** — source-provided words used inside the rite. These should be preserved when feasible.
4. **Adapted long operative words** — a tightly justified Moon & Table
   exception that replaces source operative wording longer than 20 words while
   preserving its ritual function.
5. **Operative words metadata** — `ritualWords` records that prove whether words
   are exact short source words or adapted long source words.

A modern authored blessing, prompt, invocation, spell, meditation, charm, recipe, or prayer may be valid for private household use even when a generated research packet should not reproduce the whole passage.

## Simple exact wording rule

Do not create a separate source-text mini-schema for normal extraction.

Use the ritual body plus `ritualWords`:

```text
If exact operative source wording is 20 words or fewer:
  - include it inline in the ritual body / practice where it is used;
  - add ritualWords metadata with mode: source_exact_short;
  - include source location, citation label, use context, and note if needed.

If exact operative source wording is more than 20 words:
  - do not reproduce the long source passage in the public packet;
  - first decide whether the ritual can be made honest with a plain functional instruction;
  - use adapted_source_words only as a candidate-by-candidate exception when the source words are structurally necessary to the rite;
  - include the adapted phrase inline in the ritual body / practice where it is used;
  - add ritualWords metadata with mode: adapted_source_words;
  - include source location, citation label, use context, and a note explaining the exact ritual function preserved.

If the source provides usable operative words:
  - use them exactly when they are 20 words or fewer;
  - do not invent substitute speech when the words are longer than 20 words;
  - either use a functional instruction, justify an adapted_source_words exception, or hold the candidate if the unresolved words are required.
```

Definition:

```text
short source phrase = 20 words or fewer
```

## Ritual body and `ritualWords`

Spoken or written words that the user should say or write belong inline in the ritual body / practice where they are used.

The complete ritual must read correctly from `presentation.practice` alone.

`ritualWords` is not the authoring surface for user-facing Ritual copy.

Use `ritualWords` only as provenance/review metadata for operative words already present in, or required by, the ritual body.

Allowed modes:

```text
source_exact_short
adapted_source_words
```

There is no third mode for operative ritual words. Private/process labels must
never appear as ritual speech. If a source merely asks the practitioner to name,
write, thank, ask, or state something without giving operative wording, use
plain functional instruction such as "Name the purpose aloud" rather than
invented ceremonial speech. If a candidate truly depends on unresolved source
words and cannot be made honest with functional instruction, hold the candidate
until those words are reviewed.

## Agent extraction posture

Agents may extract:

- exact rite titles;
- exact short operative words of 20 words or fewer;
- exact short phrases of 20 words or fewer;
- exact short questions of 20 words or fewer;
- exact spoken cues of 20 words or fewer;
- exact blessing names;
- exact material/action labels;
- short wording anchors that help preserve ritual force;
- close summaries of the source ritual’s structure, materials, sequence, purpose, and magical function;
- `ritualWords` metadata that tracks the operative wording mode, source
  location, context, and adaptation basis.

Agents should not reproduce in generated public repo files:

- full modern copyrighted rituals;
- full prayers or invocations;
- full guided meditations;
- full prompt sets;
- full recipes;
- whole distinctive spell texts;
- long copyrighted passages.

The fallback for longer exact wording is not a process placeholder, automatic
adaptation, or generic paraphrase. Use a plain functional instruction when the
source supports a speech action but no reviewed reusable words are available.
Use `ritualWords.mode = "adapted_source_words"` only when a candidate-level
audit explains why adapted words are necessary to preserve the source function.
Hold the candidate when neither path is honest.

## Runtime handling

Runtime Ritual records should use the schema fields in `src/data/rituals/types.ts`:

```ts
ritualWords?: {
  mode: "source_exact_short" | "adapted_source_words";
  text?: string;
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

Use `adapted_source_words` only when the exact source wording is longer than 20
words and a candidate-level audit explains why functional instruction is not
enough. The `text` must be the actual adapted phrase that appears in the ritual
body. Do not use this mode for ordinary instructions such as "name the purpose
aloud."

## Classification model

Use these classifications in source-gate and extraction records.

```text
use_directly_from_source:
  The household can perform the rite directly from the purchased/provided source. The app may recommend the source rite by title, page, and section without reproducing the full text.

adapted_source_words_exception:
  Exact modern operative wording longer than 20 words is not reproduced in the
  repo. Research agents identify the source location and use adapted Moon &
  Table wording only when a candidate-level audit shows that functional
  instruction would not preserve the operative function.

recipe_text_review_required:
  Full recipes are not reproduced in public repo files. Research agents classify
  the recipe's ritual role and boundary context before any exact recipe wording
  is considered for runtime use.

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

## Source-gate exact wording review policy

Exact source wording may be stored only under these constraints:

- cited with source ID;
- cited with title and author;
- cited with page or section;
- marked as source wording, not generated Moon & Table text;
- unavailable by default until reviewed;
- not used as public repo prose;
- not recommendation eligible until human review.

Recommended source-gate policy block:

```ts
sourceTextPolicy: {
  exactTextUse: "operative_text_review";
  assistantMayReproduce: "brief_quote_or_short_operative_words_only";
  storagePosture: "review_before_runtime_use";
  storageLimits: [
    "cite_source_id",
    "cite_title_author",
    "cite_page_or_section",
    "unavailable_by_default",
    "not_recommendation_eligible_until_human_review"
  ];
  notes: "Author-provided operative ritual words are ritual materials. Operative wording of 20 words or fewer must be stored directly in presentation.practice and tracked as ritualWords.source_exact_short. Longer operative wording may be adapted into a Moon & Table phrase only as a justified candidate-level exception in presentation.practice and tracked as ritualWords.adapted_source_words; otherwise use functional instruction or hold the candidate. Do not use process labels as ritual speech."
}
```

`sourceTextPolicy` is a source-gate policy block only. It is not a candidate-level extraction object, does not belong in candidate records, and does not replace `ritualWords`.

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
- `recipe_text_review_required` when exact recipe wording may matter later;
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
4. longer exact operative wording handled by functional instruction, or by a
   justified Moon & Table adaptation in the ritual body tracked as
   ritualWords.adapted_source_words.

Research agents should not reproduce long copyrighted passages in generated public repo files. However, agents must not erase, downgrade, or generically paraphrase verbal, recipe, prayer, blessing, invocation, incantation, spell, prompt, or meditation material. Instead, classify it, preserve it inline when short enough, use functional instruction when no reusable words are supplied, and justify any adapted long wording candidate by candidate.

Agents may extract exact short phrases, questions, rite titles, spoken cues, blessing names, invocation cues, and wording anchors when they are ritually important and 20 words or fewer.

Agents may closely summarize or rewrite surrounding instructions while preserving the source’s structure, materials, sequence, carrier, purpose, operative words, and magical force.

When exact wording is important but too long for direct public repo storage, first ask whether the candidate can honestly use functional instruction. Use ritualWords.mode = "adapted_source_words" only when the adapted phrase is necessary to preserve the source ritual function; give the source page/section and explain the function being preserved. If that cannot be justified, hold the candidate.
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
- use `adapted_source_words` ritualWords metadata only for justified longer operative wording;
- avoid agent-generated long reproduction of copyrighted text in public repo files;
- keep unresolved exact wording out of runtime until cited and human-reviewed before any recommendation path.
