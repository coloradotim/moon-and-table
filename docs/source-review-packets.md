# Source Review Packets

Moon & Table uses source review packets to decide what can become curated product knowledge and what must stay outside the repository.

These packets cover source review only. They do not create symbolic card data, approve final meanings, scrape sources, or preserve private or copyrighted source text.

These packets authorize candidate card creation but do not approve final cards. Final approval happens when symbolic cards are created, reviewed, and marked approved.

Repository-safe extraction should stay generic, transformed, practical, and privacy-safe. Private personalization belongs only in private runtime storage, local gitignored files, or a private database.

## 1. Private Astrology/Profile Materials

### Source Title Or Label

Private astrology/profile materials

### Source Type

Private interpretive and profile source bucket

### Domain

Private personalization, astrology/profile themes, household context, schedule and capacity context

### Intended Use

Use only to identify generic profile theme patterns, privacy guardrails, and schema needs for private personalization. These materials may help shape how Moon & Table stores and applies private context outside source control, but they must not become public symbolic source material.

### What May Be Extracted Into The Repository

- Generic profile theme patterns, such as practical care, beauty/warmth, structured action, rest needs, or capacity sensitivity.
- Generic schema needs, such as `private_profile`, `capacity_constraints`, and `schedule_constraints`.
- Generic usage rules for how private context can influence a recommendation.
- Privacy guardrails that prevent real personal details from entering docs, examples, tests, or seed data.
- Placeholder examples using labels such as `person_a`, `person_b`, `household`, and `private_profile`.

### What May Be Extracted Only Into Private Storage

- Real chart data.
- Real names.
- Birth dates, birth times, or birth places.
- Natal placements.
- Profile notes.
- Relationship context.
- Schedule details.
- Source-specific private summaries.
- Household preferences or constraints tied to identifiable people.

### What Should Not Be Extracted

- Copied private source text.
- Real names, birth data, natal placements, schedules, or relationship details.
- Deterministic personality claims.
- Fixed claims that a profile theme is always true.
- Private interpretations treated as general public symbolism.
- Any profile detail that could identify a person or household.

### Copyright / Usage Notes

Private materials may be copyrighted, personally authored, or licensed for private use only. Do not copy passages into the repository. Repository notes should use transformed, generic descriptions of schema needs and guardrails rather than source wording.

### Privacy Notes

This is the highest-risk source bucket. Only generic profile theme patterns and schema needs may go in the repository. Real chart data, names, birth data, schedules, private summaries, natal placements, and relationship details belong outside source control.

### Safety Or Quality Risks

- Treating interpretive profile material as objective truth.
- Over-personalizing recommendations from sensitive context.
- Creating recommendations that feel invasive, diagnostic, or controlling.
- Allowing private details to leak through examples, test fixtures, comments, or future generated briefs.

### Tone Risks

- Deterministic claims about identity or compatibility.
- Overly mystical, clinical, or intimate language.
- Language that makes users feel judged, exposed, or assigned a role.

### Decision

Use carefully.

### Candidate Symbolic Cards

- private profile theme placeholder
- private profile practical-care theme placeholder
- private profile beauty/warmth theme placeholder
- private profile structured-action theme placeholder

### Notes For Future Curation

- Keep private profile cards generic and placeholder-based until a private storage approach exists.
- Any future extraction workflow must include an accidental-private-detail check before commit.
- Private profile themes should influence synthesis gently and should not override capacity, consent, or real-life constraints.
- Source references for this bucket should be generic location notes, not copied text or identifying details.

## 2. Moon Phase Reference Set

### Source Title Or Label

Moon phase reference set

### Source Type

General symbolic timing reference bucket

### Domain

Moon phases, lunar cycle symbolism, simple ritual timing

### Intended Use

Use to support general symbolic timing for weekly briefs. Moon phase cards should help explain why a moment may be useful for beginning, building, illuminating, releasing, integrating, or resting, while keeping the recommendation practical and optional.

### What May Be Extracted Into The Repository

- Common moon phase themes in transformed, original wording.
- Practical ritual uses that fit low-overwhelm domestic life.
- Avoid-saying guardrails for deterministic or obligation-heavy claims.
- Safety and accessibility notes for any suggested ritual style.
- Source notes that identify reviewed source categories without copied passages.

### What May Be Extracted Only Into Private Storage

- Private reactions to moon phase rituals.
- Household-specific timing preferences.
- Private schedule constraints that change the recommended ritual window.
- Feedback tied to actual practice.

### What Should Not Be Extracted

- Large copied passages from moon phase books, articles, or websites.
- Claims that a moon phase requires action.
- Rigid good/bad timing rules.
- Fear-based warnings about missing a phase.
- AI-invented phase meanings without reviewed source support.

### Copyright / Usage Notes

Moon phase meanings are often discussed across many sources, but source prose may still be copyrighted. Extract only short, transformed themes and product notes. Do not paste copyrighted explanations or reproduce source-specific phrasing.

### Privacy Notes

General moon phase symbolism is repository-safe when transformed and non-identifying. Private timing, feedback, or household availability must stay outside source control.

### Safety Or Quality Risks

- Overstating symbolic timing as factual causation.
- Making recommendations too rigid for real schedules.
- Suggesting rituals involving fire, smoke, herbs, or ingestion without safety review.
- Treating symbolic timing as more important than capacity.

### Tone Risks

- Dramatic full-moon language that feels sensational or ominous.
- Obligation language such as "must release" or "must manifest."
- Too much astrology jargon for a calm household brief.

### Decision

Use.

### Candidate Symbolic Cards

- new moon
- waxing moon
- full moon
- waning moon

### Notes For Future Curation

- Keep cards broad enough for weekly planning rather than exact-event pressure.
- Include `avoid_saying` language that prevents obligation or fate framing.
- Pair phase symbolism with capacity and schedule rules during synthesis.
- Prefer ritual ideas that can be done at home in under 20 minutes.

## 3. Numerology Reference Set

### Source Title Or Label

Numerology reference set

### Source Type

Light symbolic correspondence reference bucket

### Domain

Numerology, number symbolism, simple date-based symbolic layer

### Intended Use

Use as a light symbolic layer for briefs, not as the dominant recommendation engine. Numerology should add simple texture when it supports the main recommendation and should stay secondary to capacity, schedule, and approved ritual cards.

### What May Be Extracted Into The Repository

- Simple number themes in transformed, original wording.
- Practical home, relationship, or reflection use cases.
- Capacity-sensitive usage notes.
- Avoid-saying guardrails that prevent prediction or overclaiming.
- Notes about when numerology should be omitted to keep the brief calm.

### What May Be Extracted Only Into Private Storage

- Private dates.
- Birth data.
- Anniversaries or household milestones.
- Private numerology patterns tied to real people.
- Feedback about which number themes feel meaningful or unhelpful.

### What Should Not Be Extracted

- Copied numerology source passages.
- Predictive claims about outcomes.
- Claims that numbers determine personality, compatibility, or fate.
- Private dates or identifying milestones.
- Dense number interpretations that make the brief too busy.

### Copyright / Usage Notes

Numerology references can be interpretive and copyrighted. Repository notes should use short transformed meanings, not source prose. If a future card cites a source, cite the source identity or review note without copying passages.

### Privacy Notes

Generic number cards can be repository-safe. Any use of private dates, personal cycles, birth data, or household milestones belongs only in private storage.

### Safety Or Quality Risks

- Making numbers sound predictive or authoritative.
- Adding complexity that weakens the one-recommendation product principle.
- Treating private dates as casual test data.
- Generating meanings without source review.

### Tone Risks

- Overly mystical number language.
- Busy explanations that distract from the practical ritual.
- Claims that a number "means" a person must act a certain way.

### Decision

Use carefully.

### Candidate Symbolic Cards

- numerology 1
- numerology 2
- numerology 4
- numerology 6
- numerology 9

### Notes For Future Curation

- Keep numerology cards short and secondary.
- Include explicit rules for omitting numerology when it does not improve the brief.
- Avoid private-date examples in source-controlled docs and tests.
- Use numerology to support tone and emphasis, not to predict events.

## 4. Home Magic Starter Set

### Source Title Or Label

Home magic starter set

### Source Type

Practical domestic ritual and correspondence reference bucket

### Domain

Kitchen magic, candle magic, plant tending, household clearing, simple domestic correspondences

### Intended Use

Use to create practical, accessible ritual options that fit Moon & Table's calm domestic style. This bucket should favor small actions that can be done with ordinary household materials and minimal setup.

### What May Be Extracted Into The Repository

- Domestic correspondences in transformed, original wording.
- Simple ritual uses for common home actions and materials.
- Safety notes for fire, smoke, ingestion, herbs, oils, pets, children, pregnancy, allergies, and cleanup.
- Avoid-saying guardrails for overclaiming, shopping pressure, or culturally careless language.
- Practical ritual ideas that default under 20 minutes and can scale down to 3-5 minutes.

### What May Be Extracted Only Into Private Storage

- Household inventory.
- Allergies or sensitivities tied to real people.
- Pet, child, pregnancy, or medical context tied to real people.
- Private feedback about rituals completed, skipped, loved, or avoided.
- Private notes about household spaces or routines.

### What Should Not Be Extracted

- Copied ritual instructions from books, ebooks, websites, or private notes.
- Unsafe ingestion advice.
- Essential oil assumptions.
- Smoke-heavy rituals as defaults.
- Shopping lists or rituals that require special purchases.
- Multi-step rituals that feel like homework.
- Culturally specific practices without context, care, or review.

### Copyright / Usage Notes

Many ritual instructions and correspondence lists are copyrighted or tradition-specific. Extract only transformed, practical product notes and safety considerations. Do not copy spell text, ritual scripts, long instructions, or distinctive source phrasing.

### Privacy Notes

Generic domestic ritual patterns are repository-safe when transformed. Real household constraints, inventories, allergies, sensitivities, private feedback, and routine details must stay outside source control.

### Safety Or Quality Risks

- Fire risk from candles.
- Smoke, scent, herb, or oil sensitivity.
- Unsafe ingestion or food-handling suggestions.
- Pet, child, pregnancy, allergy, or medical risks.
- Rituals that create too much setup, cleanup, cost, or emotional labor.
- Cultural-context risks around practices taken out of context.

### Tone Risks

- Making simple household care sound like a required spell.
- Cheesy or overly precious language.
- Overpromising cleansing, protection, attraction, or healing effects.
- Turning support into another task list.

### Decision

Use carefully.

### Candidate Symbolic Cards

- candle
- kitchen clearing
- plant tending
- salt
- rosemary
- honey
- lemon

### Notes For Future Curation

- Favor ordinary, low-cost actions over specialized supplies.
- Every card in this bucket should include safety notes and avoid-saying guardrails.
- Keep ritual ideas short, optional, and capacity-aware.
- Review cultural context before using practices with specific lineage or community meaning.
- Prefer household-care language over claims of guaranteed magical effect.
