# Issue 513 Timing Metadata Audit

## Scope

Audited source-backed Ritual timing metadata after the editor began warning on
broad timing buckets. The goal was to make timing useful where a Ritual says
timing matters, without changing selector scoring, adding new timing-engine
features, importing sources, or changing Ritual body prose.

Source of truth audited: `src/data/rituals/source-backed-rituals.ts`, generated
from source packets and review overlays.

## Current Counts

- Total Rituals: 528
- Active timing relationship (`required`, `preferred`, or `helpful`): 246
- `required`: 15
- `preferred`: 32
- `helpful`: 199
- `none`: 282

After this pass, active timing metadata has zero standalone editor-warning broad
bucket labels:

- `imperfect timing`
- `astrological timing`
- `lunar phase`
- `moon phase`
- `moon sign`
- `planetary aspect`
- `retrograde planet`

## Repaired Records

These records had active timing metadata that was too broad to be useful in
Search or Choose with me. Repairs were limited to source-supported timing
metadata and review overlays.

| Ritual | Relationship | Repair |
| --- | --- | --- |
| `candidate.moon_book.imperfect_timing_adaptation` | helpful | Replaced `imperfect timing` with `exact timing not required`; kept `missed phase` and `phase mismatch` as user-state timing notes. |
| `candidate.dominguez.astrology-journal-timing-record` | helpful | Replaced broad computed-timing buckets with concrete examples: new/full/waxing/waning moon, Moon in Cancer, Mercury retrograde, Venus trine Mars, seasonal threshold, month turn. |
| `candidate.dominguez.moon-phase-timing-check` | preferred | Replaced `moon phase` with `new moon`; kept waxing, waning, full, dark, and quarter moon contexts. |
| `candidate.dominguez.moon-sign-tone` | helpful | Replaced `moon sign` with explicit `moon in ...` contexts for all twelve signs. |
| `candidate.dominguez.aspect-before-peak` | required, held | Replaced `planetary aspect` with `applying planetary aspect`; kept `before culmination`. This remains held because applying/aspect-peak timing is not currently supported. |
| `candidate.dominguez.retrograde-foundation` | helpful | Replaced `retrograde planet` with Mercury, Venus, Mars, Jupiter, and Saturn retrograde contexts. |
| `candidate.dominguez.change-details-not-date` | helpful | Replaced broad sky-condition buckets with concrete examples and `exact timing not required`. |
| `candidate.dominguez.conditions-as-outline` | helpful | Replaced broad computed-timing buckets with concrete examples: new/full/waxing/waning moon, Moon in Cancer, Mercury retrograde, Venus trine Mars, seasonal threshold, month turn. |
| `ss-herstik-c2-self-love-self-lust-candle` | helpful | Replaced `astrological timing` with source-backed new moon, waxing moon, full moon, and Friday timing. |
| `miller-partner-body-sigil-working` | helpful -> none | Removed `astrological timing`; source packet says the general partnered body-sigil working has no required source-backed timing. |
| `miller-mercury-body-sigil-rite` | helpful | Replaced `astrological timing` with source-backed Wednesday and Mercury-hour timing. |
| `dykes-gibson-sol-candle-consecration` | helpful | Replaced `astrological timing` with Sunday, solar hour, Sun in Leo, and June solstice. |
| `dykes-gibson-luna-candle-consecration` | helpful | Replaced `astrological timing` with Monday, lunar hour, new moon, full moon, and Moon in Cancer. |
| `dykes-gibson-mars-candle-consecration` | helpful | Replaced `astrological timing` with Tuesday, Mars hour, Mars in Aries/Scorpio, and Moon in Aries/Scorpio. |
| `dykes-gibson-mercury-candle-consecration` | helpful | Replaced `astrological timing` with Wednesday, Mercury hour, Mercury in Gemini/Virgo, and Moon in Gemini/Virgo. |
| `dykes-gibson-jupiter-candle-consecration` | helpful | Replaced `astrological timing` with Thursday, Jupiter hour, Jupiter in Sagittarius/Pisces, and Moon in Sagittarius/Pisces. |
| `dykes-gibson-venus-candle-consecration` | helpful | Replaced `astrological timing` with Friday, Venus hour, Venus in Taurus/Libra, and Moon in Taurus/Libra. |
| `dykes-gibson-saturn-candle-consecration` | helpful | Replaced `astrological timing` with Saturday, Saturn hour, Saturn in Capricorn/Aquarius, and Moon in Capricorn/Aquarius. |
| `dykes-gibson-magical-universe-planets` | helpful | Replaced `astrological timing` with Sunday, solar hour, Sun in Leo, and June solstice. |
| `dykes-gibson-aries-invocation` | helpful | Replaced `astrological timing` with Sun/Moon/Mars in Aries. |
| `dykes-gibson-taurus-invocation` | helpful | Replaced `astrological timing` with Sun/Moon/Venus in Taurus. |
| `dykes-gibson-gemini-invocation` | helpful | Replaced `astrological timing` with Sun/Moon/Mercury in Gemini. |
| `dykes-gibson-cancer-invocation` | helpful | Replaced `astrological timing` with Sun/Moon in Cancer. |
| `dykes-gibson-leo-invocation` | helpful | Replaced `astrological timing` with Sun/Moon in Leo. |
| `dykes-gibson-virgo-invocation` | helpful | Replaced `astrological timing` with Sun/Moon/Mercury in Virgo. |
| `dykes-gibson-libra-invocation` | helpful | Replaced `astrological timing` with Sun/Moon/Venus in Libra. |
| `dykes-gibson-scorpio-invocation` | helpful | Replaced `astrological timing` with Sun/Moon/Mars in Scorpio. |
| `dykes-gibson-sagittarius-invocation` | helpful | Replaced `astrological timing` with Sun/Moon/Jupiter in Sagittarius. |
| `dykes-gibson-capricorn-invocation` | helpful | Replaced `astrological timing` with Sun/Moon/Saturn in Capricorn. |
| `dykes-gibson-aquarius-invocation` | helpful | Replaced `astrological timing` with Sun/Moon/Saturn in Aquarius. |
| `dykes-gibson-pisces-invocation` | helpful | Replaced `astrological timing` with Sun/Moon/Jupiter in Pisces. |
| `dykes-gibson-zodiac-triplicities` | helpful | Replaced `astrological timing` with seasonal threshold contexts. |

## Clean Required Timing Records

The recommendation-ready required timing records remain the Moon Book records
whose current metadata can be verified by existing lunar timing evidence:

- `candidate.moon_book.lunation_map_one_desire`
- `candidate.moon_book.new_moon_table_seed`
- `candidate.moon_book.waxing_one_thread`
- `candidate.moon_book.full_moon_mirror`
- `candidate.moon_book.full_moon_table_witness`
- `candidate.moon_book.waning_release_one_extra`
- `candidate.moon_book.dark_moon_void_table`
- `candidate.moon_book.cycle_close_and_begin_again`

## Required Timing Needing Human Decision

These records are intentionally not repaired into automatic recommendation
eligibility in this pass. Their timing may be real, but the current timing
engine cannot safely verify the exact condition or the record has another hold.

| Ritual | Current contexts | Reason |
| --- | --- | --- |
| `ritual-candlelight-buckland-marking-seven-night-increase` | `Start seven days before the full moon and continue nightly through the seventh night.` | Full-moon lead time and repeated-night sequence are not currently supported. |
| `candidate.dominguez.void-moon-softening` | `void-of-course moon` | Void Moon is not currently supported. |
| `candidate.dominguez.aspect-before-peak` | `applying planetary aspect`, `before culmination` | Applying/before-peak aspect timing is not currently supported. |
| `pw-diaz-sunflower-seed-tending` | `7-10 day repeated tending`, `sunlight symbolically central` | Repeated tending window is not currently supported. |
| `pw-diaz-ague-threshold-protection-glass` | `3-day working` | Has material/disposal review holds beyond timing. |
| `pw-diaz-apple-written-wish` | `remove when apple begins to rot` | Has material/manifestation review holds beyond timing. |
| `pw-diaz-blue-lotus-protection-glass` | `weekly renewal over 3 weeks` | Has material/adversarial-target review holds beyond timing. |

## Unsupported Timing Still Present

No recommendation-ready active timing metadata still uses `astrological timing`
or the editor-warning broad labels above. Some repaired records now include
source-backed timing contexts that the current timing engine may not fully
compute yet, especially weekday and planetary-hour contexts such as Wednesday,
Friday, Mercury hour, Venus hour, and solar hour. These are preserved as
source-backed metadata, but they should not be treated as fully supported
automatic timing matches until the timing engine gains weekday/planetary-hour
facts. Generic `day` is intentionally not a timing-match token because it caused
multi-day and daily-practice contexts to match unrelated month-boundary facts.

## Fixture Checks

Focused tests now verify both Search timing matching and Choose with me timing
matching for:

- New Moon
- Full Moon
- Mercury retrograde
- Venus trine Mars

The tests also assert that no active timing metadata uses `astrological timing`
or the editor-warning broad bucket labels listed above. Search and Choose with
me timing matching now also treats zodiac signs as timing tokens, so a context
like `moon in Cancer` does not match generic `new moon` evidence.

## Validation

Focused validation run:

```bash
npm run test -- tests/unit/ritual-timing-metadata-audit.test.ts tests/unit/ritual-search.test.ts tests/unit/app-shell.test.ts tests/unit/choose-with-me-selector.test.ts tests/unit/ritual-edit-draft-validation.test.ts
```

Result: passed, 5 files / 114 tests.
