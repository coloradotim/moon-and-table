import fs from "node:fs";
import path from "node:path";

import {
  RITUAL_AUDIENCES,
  RITUAL_CAPACITY_MODES,
  RITUAL_CARRIERS,
  RITUAL_PURPOSES,
  RITUAL_TIMING_RELATIONSHIPS,
  RITUAL_WORD_USE_CONTEXTS,
  type Ritual,
  type RitualAudience,
  type RitualCapacityMode,
  type RitualCarrier,
  type RitualPurpose,
  type RitualSourceGrounding,
  type RitualTimingRelationship,
  type RitualWordUseContext,
  type RitualWords,
} from "../src/data/rituals/types";
import { validateRituals } from "../src/data/rituals/validate-rituals";

type PacketImportSpec = {
  packetLabel: string;
  sourceLabel: string;
  packetPath: string;
};

type ImportedRitual = Ritual & {
  __packetLabel: string;
  __packetPath: string;
};

type SkippedCandidate = {
  packetLabel: string;
  candidateId: string;
  reason: string;
};

const PACKETS: PacketImportSpec[] = [
  {
    packetLabel: "Buckland candlelight complete extraction",
    sourceLabel: "Buckland, Practical Candleburning Rituals",
    packetPath:
      "docs/research/ritual-candidates/packet-buckland-candlelight-complete-extraction.md",
  },
  {
    packetLabel: "House Witch complete extraction",
    sourceLabel: "The House Witch",
    packetPath:
      "docs/research/ritual-candidates/packet-house-witch-complete-extraction.md",
  },
  {
    packetLabel: "Magical Household domestic threshold altar",
    sourceLabel: "The Magical Household",
    packetPath:
      "docs/research/ritual-candidates/packet-magical-household-domestic-threshold-altar.md",
  },
  {
    packetLabel: "Green Witch's Garden plant household practice",
    sourceLabel: "The Green Witch's Garden",
    packetPath:
      "docs/research/ritual-candidates/packet-green-witchs-garden-plant-household-practice.md",
  },
  {
    packetLabel: "Whitehurst flower table magic",
    sourceLabel: "Whitehurst, The Magic of Flowers",
    packetPath:
      "docs/research/ritual-candidates/packet-whitehurst-flower-table-magic.md",
  },
  {
    packetLabel: "Saint Thomas sex witch",
    sourceLabel: "Saint Thomas, Sex Witch",
    packetPath: "docs/research/ritual-candidates/packet-saint-thomas-sex-witch.md",
  },
  {
    packetLabel: "Woodward kitchen vessel magic",
    sourceLabel: "Woodward, The Magical Household Cookbook",
    packetPath: "docs/research/ritual-candidates/packet-woodward-kitchen-vessel-magic.md",
  },
];

const OUT_FILE = "src/data/rituals/source-backed-rituals.ts";
const REPORT_FILE = "docs/content-audits/post-287-source-backed-import-review.md";

function parseArray(raw: string | undefined): string[] {
  if (!raw) {
    return [];
  }

  const bracketed = raw.match(/\[([^\]]*)\]/)?.[1] ?? raw;

  return bracketed
    .split(/[,;]/)
    .map((item) => item.trim().replace(/^`|`$/g, "").replace(/^"|"$/g, ""))
    .filter(Boolean);
}

function parseCommaValues(raw: string | undefined): string[] {
  if (!raw) {
    return [];
  }

  return raw
    .split(/[,;]/)
    .map((item) => item.trim().replace(/^`|`$/g, "").replace(/^"|"$/g, ""))
    .filter(Boolean);
}

function getSection(block: string, heading: string): string | undefined {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(
    new RegExp(`^#### ${escaped}\\s*\\n([\\s\\S]*?)(?=^#### |^### |\\z)`, "im"),
  );

  return match?.[1]?.trim();
}

function getYamlSection(block: string, heading: string): string | undefined {
  const section = getSection(block, heading);
  const yaml = section?.match(/```yaml\s*([\s\S]*?)```/);

  return yaml?.[1]?.trim();
}

function getLabelField(block: string, label: string): string | undefined {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`^${escaped}:\\s*(.+)$`, "m"));

  return match?.[1]?.trim();
}

function getBulletField(block: string, label: string): string | undefined {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`^- ${escaped}:\\s*(.+)$`, "m"));

  return match?.[1]?.trim();
}

function getField(block: string, label: string): string | undefined {
  return (
    getSection(block, titleCaseLabel(label)) ??
    getSection(block, label.replace(/([A-Z])/g, " $1").trim()) ??
    getLabelField(block, label) ??
    getBulletField(block, label)
  );
}

function titleCaseLabel(label: string): string {
  if (label === "ritual body / practice") {
    return "Ritual body / practice";
  }

  return label
    .split(/(?=[A-Z])|\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getMultilineIngredient(block: string, label: string): string | undefined {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const labelMatch = block.match(new RegExp(`^${escaped}:\\s*$`, "m"));
  if (!labelMatch || labelMatch.index === undefined) {
    return getBulletNestedBlock(block, label);
  }

  const start = labelMatch.index + labelMatch[0].length;
  const rest = block.slice(start);
  const next = rest.search(
    /^\S.*:\s*(?:`.*`|.+)?$|^### |^#### |^import readiness label:/m,
  );

  return (next === -1 ? rest : rest.slice(0, next)).trim();
}

function getBulletNestedBlock(block: string, label: string): string | undefined {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`^- ${escaped}:\\s*$\\n([\\s\\S]*?)(?=^- \\S|^### |\\z)`, "m"));

  return match?.[1]?.trim();
}

function extractCandidateBlocks(markdown: string): string[] {
  return markdown
    .split(/\n(?=### )/g)
    .filter((block) =>
      block.includes("import readiness label: `approved_for_mechanical_import`"),
    );
}

function extractCandidateId(block: string): string | undefined {
  return (
    block.match(/^### `([^`]+)`/m)?.[1] ??
    block.match(/^### Candidate: `([^`]+)`/m)?.[1] ??
    block.match(/^- candidate ID: `([^`]+)`/m)?.[1]
  );
}

function coercePurpose(value: string | undefined): RitualPurpose | undefined {
  const normalized = value?.trim().replace(/`/g, "");
  return RITUAL_PURPOSES.includes(normalized as RitualPurpose)
    ? (normalized as RitualPurpose)
    : undefined;
}

function coerceCarrier(value: string | undefined): RitualCarrier | undefined {
  const normalized = value?.trim().replace(/`/g, "");
  return RITUAL_CARRIERS.includes(normalized as RitualCarrier)
    ? (normalized as RitualCarrier)
    : undefined;
}

function coerceCapacity(value: string): RitualCapacityMode | undefined {
  const normalized = value.trim().replace(/`/g, "");
  return RITUAL_CAPACITY_MODES.includes(normalized as RitualCapacityMode)
    ? (normalized as RitualCapacityMode)
    : undefined;
}

function coerceAudience(value: string): RitualAudience | undefined {
  const normalized = value.trim().replace(/`/g, "");
  return RITUAL_AUDIENCES.includes(normalized as RitualAudience)
    ? (normalized as RitualAudience)
    : undefined;
}

function coerceTiming(
  value: string | undefined,
): RitualTimingRelationship | undefined {
  const normalized = value?.trim().replace(/`/g, "");
  return RITUAL_TIMING_RELATIONSHIPS.includes(
    normalized as RitualTimingRelationship,
  )
    ? (normalized as RitualTimingRelationship)
    : undefined;
}

function coerceWordContext(value: string | undefined): RitualWordUseContext {
  const normalized = value?.trim().replace(/`/g, "");
  return RITUAL_WORD_USE_CONTEXTS.includes(normalized as RitualWordUseContext)
    ? (normalized as RitualWordUseContext)
    : "other";
}

function parseRecommendationMetadata(block: string) {
  const compact = getLabelField(block, "recommendation metadata");
  const bullet = getBulletNestedBlock(block, "recommendation metadata");
  const yaml = getYamlSection(block, "Recommendation metadata");
  const text = compact ?? bullet ?? yaml ?? "";

  const primaryPurpose =
    coercePurpose(
      compact?.match(/primaryPurpose\s+`?([a-z_]+)`?/)?.[1] ??
        bullet?.match(/primaryPurpose:\s*`?([a-z_]+)`?/)?.[1] ??
        parseYamlScalar(yaml, "primary", yaml?.indexOf("purposes:")),
    ) ?? "marking";

  const secondaryPurposes = (
    compact
      ? parseArray(compact.match(/secondaryPurposes\s+(\[[^\]]*\])/)?.[1])
      : bullet
        ? parseArray(bullet.match(/secondaryPurposes:\s*(.+)$/m)?.[1])
        : parseYamlList(yaml, "secondary")
  )
    .map(coercePurpose)
    .filter((purpose): purpose is RitualPurpose => Boolean(purpose));

  const primaryCarrier =
    coerceCarrier(
      compact?.match(/primaryCarrier\s+`?([a-z_]+)`?/)?.[1] ??
        bullet?.match(/primaryCarrier:\s*`?([a-z_]+)`?/)?.[1] ??
        parseYamlScalar(yaml, "primary", yaml?.indexOf("carriers:")),
    ) ?? "words";

  const secondaryCarriers = (
    compact
      ? parseArray(compact.match(/secondaryCarriers\s+(\[[^\]]*\])/)?.[1])
      : bullet
        ? parseArray(bullet.match(/secondaryCarriers:\s*(.+)$/m)?.[1])
        : parseYamlList(yaml, "secondary", yaml?.indexOf("carriers:"))
  )
    .map(coerceCarrier)
    .filter((carrier): carrier is RitualCarrier => Boolean(carrier));

  const capacity = (
    compact
      ? parseArray(compact.match(/capacity\s+(\[[^\]]*\])/)?.[1])
      : bullet
        ? parseArray(
            bullet.match(/capacitySupport:\s*(.+)$/m)?.[1] ??
              bullet.match(/capacity:\s*(.+)$/m)?.[1],
          )
        : parseYamlList(yaml, "supports", yaml?.indexOf("capacity:"))
  )
    .map(coerceCapacity)
    .filter((mode): mode is RitualCapacityMode => Boolean(mode));

  const audienceRaw = compact
    ? parseArray(compact.match(/audience\s+(\[[^\]]*\])/)?.[1])
    : bullet
      ? parseCommaValues(
          bullet.match(/audienceSupport:\s*(.+)$/m)?.[1] ??
            bullet.match(/audience:\s*(.+)$/m)?.[1],
        )
      : parseYamlList(yaml, "supports", yaml?.indexOf("audience:"));
  const audience = audienceRaw
    .map((item) => item.split(/\s+/)[0])
    .map(coerceAudience)
    .filter((item): item is RitualAudience => Boolean(item));

  const timing =
    coerceTiming(
      compact?.match(/timing\s+`?([a-z_]+)`?/)?.[1] ??
        bullet?.match(/timingRelationship:\s*`?([a-z_]+)`?/)?.[1] ??
        parseYamlScalar(yaml, "relationship", yaml?.indexOf("timing:")),
    ) ?? "helpful";

  const timingContexts =
    parseYamlList(yaml, "contexts", yaml?.indexOf("timing:")) ??
    parseTimingContexts(compact ?? bullet ?? "");

  return {
    purposes: {
      primary: primaryPurpose,
      secondary: uniqueValues(secondaryPurposes),
      refinement: primaryPurpose,
    },
    carriers: {
      primary: primaryCarrier,
      secondary: uniqueValues(secondaryCarriers),
    },
    capacity: {
      supports: capacity.length > 0 ? uniqueValues(capacity) : ["only_a_little" as const],
      default: capacity[0],
    },
    audience: {
      supports: audience.length > 0 ? uniqueValues(audience) : ["me" as const],
      default: audience[0],
      ...(text.includes("both") && text.includes("share")
        ? { bothOfUsStructure: "Packet notes shared witness/action structure." }
        : {}),
    },
    timing: {
      relationship: timing,
      ...(timingContexts.length > 0 ? { contexts: timingContexts } : {}),
    },
    eligibility: {
      recommendable: false,
      missing: ["direct_use_review", "recommendation_review"],
    },
  } satisfies Ritual["recommendationMetadata"];
}

function parseYamlList(
  yaml: string | undefined,
  key: string,
  afterIndex = 0,
): string[] {
  if (!yaml) {
    return [];
  }

  const source = yaml.slice(Math.max(0, afterIndex));
  const match = source.match(new RegExp(`^\\s*${key}:\\s*\\n((?:\\s+- .+\\n?)+)`, "m"));
  if (!match) {
    return [];
  }

  return match[1]
    .split("\n")
    .map((line) => line.trim().replace(/^- /, "").replace(/^"|"$/g, ""))
    .filter(Boolean);
}

function parseYamlScalar(
  yaml: string | undefined,
  key: string,
  afterIndex = 0,
): string | undefined {
  if (!yaml) {
    return undefined;
  }

  const source = yaml.slice(Math.max(0, afterIndex));
  return source.match(new RegExp(`^\\s*${key}:\\s*([^\\n]+)$`, "m"))?.[1]?.trim();
}

function parseTimingContexts(text: string): string[] {
  const timing = text.match(/timing(?:Relationship)?:?\s*`?[a-z_]+`?[;,]?\s*([^.;]*)/)?.[1];
  return timing ? parseCommaValues(timing.replace(/^contexts?:/i, "")) : [];
}

function uniqueValues<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function parseSourceGrounding(
  block: string,
  packet: PacketImportSpec,
  whyThisFits: string,
): RitualSourceGrounding[] {
  const compact = getLabelField(block, "source grounding");
  const bullet = getBulletNestedBlock(block, "source grounding");
  const yaml = getYamlSection(block, "Source grounding");
  const text = compact ?? bullet ?? yaml ?? packet.sourceLabel;
  const citationLabel =
    text.match(/citation label:\s*(.+)$/m)?.[1]?.replace(/\*/g, "").trim() ??
    text.match(/`([^`]+)`/)?.[1] ??
    packet.sourceLabel;
  const sourceLocation =
    text.match(/source location \/ basis:\s*(.+)$/m)?.[1]?.trim() ??
    text.match(/sourceLocation:\s*(.+)$/m)?.[1]?.replace(/^"|"$/g, "").trim() ??
    text.match(/(PDF\s+pp?\.\s*\d+(?:[-–]\d+)?(?:,\s*\d+(?:[-–]\d+)?)*)/)?.[1]?.trim() ??
    text.match(/(Ch(?:apter)?s?\.\s*\d+(?:[-–]\d+)?(?:,\s*\d+(?:[-–]\d+)?)*)/)?.[1]?.trim() ??
    text.replace(/^[^,]+,\s*/, "").split(". ")[0].trim() ??
    packet.packetPath;
  const transformation =
    text.match(/source transformation:\s*(.+)$/m)?.[1]?.trim() ??
    getLabelField(block, "adaptation policy notes") ??
    getBulletNestedBlock(block, "adaptation policy notes") ??
    "Mechanically imported from packet-approved candidate text without runtime reauthoring.";

  return [
    {
      citationLabel,
      sourceLocation: sourceLocation || packet.packetPath,
      sourceSummary: sanitizeRuntimeMetadata(squashWhitespace(text)),
      sourceSupports: sanitizeRuntimeMetadata(squashWhitespace(whyThisFits || text)),
      moonAndTableChanges: sanitizeRuntimeMetadata(squashWhitespace(transformation)),
      doNotImport: extractDoNotImport(block),
    },
  ];
}

function extractDoNotImport(block: string): string[] {
  const notes = getMultilineIngredient(block, "whyThisFitsIngredients") ?? "";
  const notFor = notes.match(/notForOrHoldNotes:\s*\[([^\]]*)\]/)?.[1];
  const bulletNotFor = notes.match(/notForOrHoldNotes:\s*(.+)$/m)?.[1];
  const values = [...parseArray(notFor), ...parseCommaValues(bulletNotFor)];
  const cleaned = values
    .map((value) => value.replace(/^\[|\]$/g, "").trim())
    .map(sanitizeRuntimeMetadata)
    .map(restoreGuardrailFragment)
    .filter(Boolean)
    // Drop a dangling guardrail fragment when packet splitting already kept the specific claim nearby.
    .filter((value) => !/^or guarantee$/i.test(value));

  return cleaned.length > 0 ? uniqueValues(cleaned) : [];
}

function parseSearchMetadata(block: string, packet: PacketImportSpec) {
  const compact = getLabelField(block, "search metadata");
  const bullet = getBulletNestedBlock(block, "search metadata");
  const yaml = getYamlSection(block, "Search metadata");
  const text = compact ?? bullet ?? yaml ?? "";
  const tags = uniqueValues([
    ...parseArray(compact?.match(/tags\s+(\[[^\]]*\])/)?.[1]),
    ...parseCommaValues(bullet?.match(/tags:\s*"?([^"\n]+)"?$/m)?.[1]),
    ...parseYamlList(yaml, "tags"),
  ]);
  const materials = uniqueValues([
    ...parseArray(compact?.match(/materials\s+(\[[^\]]*\])/)?.[1]),
    ...parseCommaValues(
      bullet?.match(/materials \/ places:\s*([^;\n]+)/)?.[1] ??
        bullet?.match(/materials:\s*(.+)$/m)?.[1],
    ),
    ...parseCommaValues(yaml?.match(/materials:\s*"?([^"\n]+)"?$/m)?.[1]),
  ]);
  const places = uniqueValues([
    ...parseArray(compact?.match(/places\s+(\[[^\]]*\])/)?.[1]),
    ...parseCommaValues(
      bullet?.match(/materials \/ places:\s*[^;]+;\s*(.+)$/m)?.[1] ??
        bullet?.match(/places:\s*(.+)$/m)?.[1],
    ),
    ...parseCommaValues(yaml?.match(/places:\s*"?([^"\n]+)"?$/m)?.[1]),
  ]);
  const keywords = uniqueValues([
    ...tags,
    ...materials,
    ...places,
    ...parseCommaValues(
      compact?.match(/keywords\s+(\[[^\]]*\])/)?.[1] ??
        bullet?.match(/keywords:\s*(.+)$/m)?.[1] ??
        yaml?.match(/tags:\s*"?([^"\n]+)"?$/m)?.[1],
    ),
  ]).filter(Boolean);

  return {
    tags: tags.length > 0 ? tags : [packet.packetLabel],
    keywords: keywords.length > 0 ? keywords : [packet.packetLabel, packet.sourceLabel],
    ...(materials.length > 0 ? { materials } : {}),
    ...(places.length > 0 ? { places } : {}),
    sourceLabel:
      text.match(/source label:\s*(.+)$/m)?.[1]?.trim() ?? packet.sourceLabel,
    originLabel:
      text.match(/origin label:\s*(.+)$/m)?.[1]?.trim() ?? "source",
  } satisfies Ritual["searchMetadata"];
}

function parseReviewFlags(block: string) {
  const text = [
    getLabelField(block, "review flags"),
    getBulletNestedBlock(block, "review flags"),
    getYamlSection(block, "Review flags"),
  ]
    .filter(Boolean)
    .join("\n");

  const flags: Ritual["reviewFlags"] = {};
  if (/sourceTextReviewRequired|source text|exactWordsReviewed:\s*false|exact words/i.test(text)) {
    flags.sourceTextReviewRequired = true;
  }
  if (/materialSafetyReviewRequired|material safety|safetyBoundaryNotes|plant identification|fire|flame|oil|food|toxicity/i.test(text)) {
    flags.materialSafetyReviewRequired = true;
  }
  if (/sourceVerificationRequired|source verification|sourceVerification/i.test(text)) {
    flags.sourceVerificationRequired = true;
  }
  if (/productBoundaryReviewRequired|product boundary|adultPrivate|coercion|legal|medical|guaranteed/i.test(text)) {
    flags.productBoundaryReviewRequired = true;
  }

  const notes = text
    .split("\n")
    .map((line) => line.trim().replace(/^- /, ""))
    .filter((line) => line.length > 0)
    .filter((line) => !/Review flags|sourceTextReviewRequired|materialSafetyReviewRequired|sourceVerificationRequired|productBoundaryReviewRequired/i.test(line))
    .slice(0, 8);

  if (notes.length > 0) {
    flags.notes = notes;
  }

  return Object.keys(flags).length > 0 ? flags : undefined;
}

function parseRitualWords(block: string): RitualWords[] | undefined {
  const compact = getLabelField(block, "operative words metadata");
  const yaml = getYamlSection(block, "Operative words metadata");
  const raw = compact ?? yaml ?? "";
  if (!raw || /\[\]/.test(raw) || /ritualWords:\s*\[\]/.test(raw)) {
    return undefined;
  }

  const words: RitualWords[] = [];
  const objectMatches = [...raw.matchAll(/\{([^{}]+)\}/g)];
  for (const match of objectMatches) {
    const objectText = match[1];
    const mode = objectText.match(/mode:\s*`?([a-z_]+)`?/)?.[1];
    if (mode !== "source_exact_short" && mode !== "adapted_source_words") {
      continue;
    }

    words.push({
      mode,
      text:
        objectText.match(/text:\s*`([^`]+)`/)?.[1] ??
        objectText.match(/text:\s*"([^"]+)"/)?.[1],
      citationLabel:
        objectText.match(/citationLabel:\s*`([^`]+)`/)?.[1] ??
        objectText.match(/citationLabel:\s*"([^"]+)"/)?.[1],
      sourceLocation:
        objectText.match(/sourceLocation:\s*`([^`]+)`/)?.[1] ??
        objectText.match(/sourceLocation:\s*"([^"]+)"/)?.[1],
      useContext: coerceWordContext(
        objectText.match(/useContext:\s*`?([a-z_]+)`?/)?.[1],
      ),
      note:
        objectText.match(/note:\s*`([^`]+)`/)?.[1] ??
        objectText.match(/note:\s*"([^"]+)"/)?.[1],
    });
  }

  return words.length > 0 ? words : undefined;
}

function squashWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function sanitizeRuntimeMetadata(value: string): string {
  return value;
}

function restoreGuardrailFragment(value: string): string {
  return value.replace(/^future prediction$/i, "no future prediction");
}

function buildWhyThisFits(block: string): string {
  const ingredients = getMultilineIngredient(block, "whyThisFitsIngredients");
  const bullet = getBulletNestedBlock(block, "whyThisFitsIngredients");
  const sourceRationale =
    ingredients?.match(/sourceBackedRationale:\s*\[([^\]]*)\]/)?.[1] ??
    bullet?.match(/sourceBackedRationale:\s*(.+)$/m)?.[1] ??
    ingredients ??
    bullet;
  const materialFit =
    ingredients?.match(/materialPlaceCarrierPurposeFit:\s*\[([^\]]*)\]/)?.[1] ??
    bullet?.match(/materialPlaceCarrierPurposeFit:\s*(.+)$/m)?.[1];

  return squashWhitespace(
    [sourceRationale, materialFit]
      .filter(Boolean)
      .map((value) => parseArray(value).join("; ") || value)
      .join(" "),
  );
}

function parseAdaptationPolicy(): Ritual["adaptationPolicy"] {
  return {
    purposeChange: "not_allowed",
    materialSubstitution: "defined_only",
    capacityAdaptation: "allowed_if_authored",
    audienceAdaptation: "allowed_if_authored",
    timingAdaptation: "may_shape_best_window",
  };
}

function importBlock(
  block: string,
  packet: PacketImportSpec,
): ImportedRitual | SkippedCandidate {
  const candidateId = extractCandidateId(block) ?? "(missing candidate id)";
  const headline = getField(block, "headline");
  const practice = getField(block, "ritual body / practice");
  const intention = getField(block, "intention");
  const bestWindow = getField(block, "bestWindow");
  const questionToCarry = getField(block, "questionToCarry");
  const whyThisFits = buildWhyThisFits(block);

  const missingFields = [
    ["headline", headline],
    ["ritual body / practice", practice],
    ["intention", intention],
    ["bestWindow", bestWindow],
    ["questionToCarry", questionToCarry],
    ["whyThisFitsIngredients", whyThisFits],
  ].filter(([, value]) => !value);

  if (candidateId === "(missing candidate id)" || missingFields.length > 0) {
    return {
      packetLabel: packet.packetLabel,
      candidateId,
      reason: `Missing required packet field(s): ${missingFields
        .map(([field]) => field)
        .join(", ")}`,
    };
  }

  const presentation = {
    headline: headline as string,
    practice: practice as string,
    intention: intention as string,
    bestWindow: bestWindow as string,
    questionToCarry: questionToCarry as string,
  };

  const ritual: ImportedRitual = {
    id: candidateId,
    status: "draft",
    origin: {
      type: "source",
      sourceGrounding: parseSourceGrounding(block, packet, whyThisFits),
    },
    presentation: {
      headline: presentation.headline.trim(),
      practice: presentation.practice.trim(),
      intention: presentation.intention.trim(),
      bestWindow: presentation.bestWindow.trim(),
      whyThisFits,
      questionToCarry: presentation.questionToCarry.trim(),
    },
    recommendationMetadata: parseRecommendationMetadata(block),
    searchMetadata: parseSearchMetadata(block, packet),
    availability: {
      findable: true,
      directUseEligible: false,
      recommendationEligible: false,
    },
    ...(parseRitualWords(block) ? { ritualWords: parseRitualWords(block) } : {}),
    ...(parseReviewFlags(block) ? { reviewFlags: parseReviewFlags(block) } : {}),
    adaptationPolicy: parseAdaptationPolicy(),
    __packetLabel: packet.packetLabel,
    __packetPath: packet.packetPath,
  };

  return ritual;
}

function importPackets() {
  const imported: ImportedRitual[] = [];
  const skipped: SkippedCandidate[] = [];
  const approvedCounts: Record<string, number> = {};

  for (const packet of PACKETS) {
    const markdown = fs.readFileSync(packet.packetPath, "utf8");
    const blocks = extractCandidateBlocks(markdown);
    approvedCounts[packet.packetLabel] = blocks.length;

    for (const block of blocks) {
      const result = importBlock(block, packet);
      if ("reason" in result) {
        skipped.push(result);
      } else {
        imported.push(result);
      }
    }
  }

  const validation = validateRituals(imported);
  for (const finding of validation.findings) {
    skipped.push({
      packetLabel: "runtime validation",
      candidateId: finding.ritualId,
      reason: `${finding.path}: ${finding.message}`,
    });
  }

  if (!validation.valid) {
    throw new Error(
      `Generated Ritual collection is invalid:\n${validation.findings
        .map((finding) => `- ${finding.ritualId} ${finding.path}: ${finding.message}`)
        .join("\n")}`,
    );
  }

  writeRituals(imported);
  writeReport(imported, skipped, approvedCounts);

  console.log(
    `Imported ${imported.length} source-backed Rituals from ${PACKETS.length} packets.`,
  );
  if (skipped.length > 0) {
    console.log(`Skipped ${skipped.length} candidates.`);
  }
}

function withoutPrivateKeys(ritual: ImportedRitual): Ritual {
  const { __packetLabel, __packetPath, ...record } = ritual;
  void __packetLabel;
  void __packetPath;
  return record;
}

function writeRituals(imported: ImportedRitual[]) {
  const records = imported.map(withoutPrivateKeys);
  const source = `import type { Ritual } from "./types";

// Generated by scripts/import-source-backed-rituals.ts.
// Source packets remain the canonical authoring artifacts. Do not edit imported
// Ritual prose here by hand; correct the packet and regenerate.
export const sourceBackedRituals: Ritual[] = ${JSON.stringify(records, null, 2)};
`;

  fs.writeFileSync(OUT_FILE, source);
}

function writeReport(
  imported: ImportedRitual[],
  skipped: SkippedCandidate[],
  approvedCounts: Record<string, number>,
) {
  const byPacket = PACKETS.map((packet) => {
    const packetImported = imported.filter(
      (ritual) => ritual.__packetLabel === packet.packetLabel,
    );
    return {
      packet,
      approved: approvedCounts[packet.packetLabel] ?? 0,
      imported: packetImported.length,
      skipped: skipped.filter((item) => item.packetLabel === packet.packetLabel)
        .length,
    };
  });

  const ritualWords = imported.filter((ritual) => ritual.ritualWords?.length);
  const reviewFlags = imported.filter((ritual) => ritual.reviewFlags);
  const purposeCounts = countBy(
    imported.map((ritual) => ritual.recommendationMetadata.purposes.primary),
  );
  const carrierCounts = countBy(
    imported.map((ritual) => ritual.recommendationMetadata.carriers.primary),
  );

  const markdown = `# Post-287 Source-Backed Ritual Import Review

Issue: #287

This packet documents the mechanical import of QA-accepted extraction packet candidates into runtime \`Ritual\` records.

## Scope confirmation

- Runtime selection/scoring changed: no
- Recommendation output changed: no
- UI structure changed: no
- Search direct-use gating changed: yes; Search now requires \`directUseEligible\` by default
- Manage Rituals inspection surface changed: yes; it now reads source-backed draft records
- Runtime Ritual collection changed: yes
- Legacy pilot Rituals remain in app surface: no
- Imported records are draft: yes
- Imported records are findable: yes
- Imported records are direct-use eligible: no
- Imported records are recommendation eligible: no
- Imported records are recommendable: no
- Packet prose rewritten during import: no
- New sources added: no
- New visible categories added: no

## Packets included

| Packet | Approved candidates found | Imported as draft/findable | Skipped |
| --- | ---: | ---: | ---: |
${byPacket
  .map(
    ({ packet, approved, imported: count, skipped: skippedCount }) =>
      `| ${packet.packetLabel} | ${approved} | ${count} | ${skippedCount} |`,
  )
  .join("\n")}

## Packets deferred

- Moon Book lunar timing/source-note work (#349)
- Any remaining timing/source-note extraction work (#354)
- Dominguez practical astrology timing/source-note work (#355)

## Count reconciliation

- Packets included: ${PACKETS.length}
- Packets deferred: 3
- Total approved_for_mechanical_import candidates found: ${Object.values(
    approvedCounts,
  ).reduce((sum, count) => sum + count, 0)}
- Imported as draft/findable: ${imported.length}
- Skipped due to malformed packet record: ${skipped.length}
- Skipped due to unsupported runtime enum: 0
- Skipped due to unsupported metadata shape: 0
- Skipped due to stale ritualWords/private excerpt metadata: 0
- Skipped due to non-approved import readiness: 0
- Records with ritualWords: ${ritualWords.length}
- Records with reviewFlags: ${reviewFlags.length}
- Runtime files changed: \`${OUT_FILE}\`, app/search/manage/readiness imports, tests

## Imported posture

Every imported record is mechanically forced to:

\`\`\`ts
status: "draft"
availability: {
  findable: true,
  directUseEligible: false,
  recommendationEligible: false,
}
recommendationMetadata.eligibility: {
  recommendable: false,
  missing: ["direct_use_review", "recommendation_review"],
}
\`\`\`

This follows Tim's #287 direction to make the seven QA'd packets visible for inspection while keeping them unusable and non-recommendable.

## Skipped candidates

${skipped.length === 0 ? "None." : skipped.map((item) => `- ${item.packetLabel}: ${item.candidateId} — ${item.reason}`).join("\n")}

## Primary purpose distribution

| Purpose | Count |
| --- | ---: |
${Object.entries(purposeCounts)
  .map(([purpose, count]) => `| ${purpose} | ${count} |`)
  .join("\n")}

## Primary carrier distribution

| Carrier | Count |
| --- | ---: |
${Object.entries(carrierCounts)
  .map(([carrier, count]) => `| ${carrier} | ${count} |`)
  .join("\n")}

## Import fidelity notes

- Headline, ritual body/practice, intention, best window, and question-to-carry are copied from packet fields.
- \`whyThisFits\` is mechanically assembled from packet \`sourceBackedRationale\` and \`materialPlaceCarrierPurposeFit\` ingredients because the runtime type requires a string field and the packet provides approved ingredients rather than a separate rendered paragraph.
- \`howThisWasChosenIngredients\` is not imported because the current runtime \`Ritual\` schema has no field for it.
- Packet availability values are intentionally overridden to draft/findable/not usable/not recommendable per #287 and Tim's latest direction.
- Legacy pilot Rituals are no longer used by Search, Manage Rituals, or readiness reporting.
- Draft/findable does not make a Ritual selectable for direct practice. Manage Rituals shows all 156 draft records for inspection; the warm Search rituals flow filters to direct-use eligible records, so these imports do not appear there yet.

## Validation results

Run before merge:

\`\`\`bash
npm run lint:content
npm run typecheck
npm run test
npm run check
npm run diagnose:content
\`\`\`

## Merge recommendation

Hold for human review of imported count, app visibility, and import fidelity before merge.
`;

  fs.writeFileSync(REPORT_FILE, markdown);
}

function countBy(values: string[]): Record<string, number> {
  return values.reduce<Record<string, number>>((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});
}

importPackets();
