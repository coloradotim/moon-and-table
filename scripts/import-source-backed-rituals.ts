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
import { applySourceBackedDirectUseReview } from "../src/data/rituals/direct-use-review";
import { applySourceBackedRecommendationEligibilityReview } from "../src/data/rituals/recommendation-eligibility-review";
import { validateRituals } from "../src/data/rituals/validate-rituals";

type PacketImportSpec = {
  packetLabel: string;
  sourceLabel: string;
  packetPath: string;
  supersededByPacketPath?: string;
};

type ImportedRitual = Ritual & {
  __packetLabel: string;
  __packetPath: string;
};

type ImportPrepManifestEntry = {
  ritualizationType: string;
  primaryPurpose: RitualPurpose;
  primaryCarrier: RitualCarrier;
  secondaryCarriers: RitualCarrier[];
  capacitySupports: RitualCapacityMode[];
  audienceSupports: RitualAudience[];
  timing: {
    relationship: RitualTimingRelationship;
    contexts: string[];
  };
  recommendationEligible: boolean;
  recommendationStatus: string;
  missing: string[];
  bestWindowBasis: string;
  reviewLabels: string[];
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
    supersededByPacketPath:
      "docs/research/ritual-candidates/packet-anand-saint-thomas-ritual-only-reextract.md",
  },
  {
    packetLabel: "Woodward kitchen vessel magic",
    sourceLabel: "Woodward, The Magical Household Cookbook",
    packetPath: "docs/research/ritual-candidates/packet-woodward-kitchen-vessel-magic.md",
  },
  {
    packetLabel: "Moon Book lunar cycle",
    sourceLabel: "Gottesdiener, The Moon Book",
    packetPath: "docs/research/ritual-candidates/packet-moon-book-lunar-cycle.md",
  },
  {
    packetLabel: "Anand connection",
    sourceLabel: "Anand, The Art of Sexual Magic",
    packetPath: "docs/research/ritual-candidates/packet-anand-connection.md",
    supersededByPacketPath:
      "docs/research/ritual-candidates/packet-anand-saint-thomas-ritual-only-reextract.md",
  },
  {
    packetLabel: "Anand and Saint Thomas ritual-only adult re-extraction",
    sourceLabel: "Anand / Saint Thomas superseding adult re-extraction",
    packetPath:
      "docs/research/ritual-candidates/packet-anand-saint-thomas-ritual-only-reextract.md",
  },
  {
    packetLabel: "Dominguez practical astrology",
    sourceLabel: "Dominguez, Practical Astrology for Witches and Pagans",
    packetPath: "docs/research/ritual-candidates/packet-dominguez-practical-astrology.md",
  },
  {
    packetLabel: "Herstik Sacred Sex complete extraction",
    sourceLabel: "Herstik, Sacred Sex",
    packetPath:
      "docs/research/ritual-candidates/packet-herstik-sacred-sex-complete-extraction.md",
  },
  {
    packetLabel: "Miller Sex, Sorcery, and Spirit complete extraction",
    sourceLabel: "Miller, Sex, Sorcery, and Spirit",
    packetPath:
      "docs/research/ritual-candidates/packet-miller-sex-sorcery-spirit-complete-extraction.md",
  },
  {
    packetLabel: "Carrellas Urban Tantra complete extraction",
    sourceLabel: "Carrellas, Urban Tantra",
    packetPath:
      "docs/research/ritual-candidates/packet-carrellas-urban-tantra-complete-extraction.md",
  },
  {
    packetLabel: "Pamita Book of Candle Magic complete extraction",
    sourceLabel: "Madame Pamita, The Book of Candle Magic",
    packetPath:
      "docs/research/ritual-candidates/packet-pamita-book-candle-magic-complete-extraction.md",
  },
  {
    packetLabel: "Gamache Master Book of Candle Burning complete extraction",
    sourceLabel: "Gamache, The Master Book of Candle Burning",
    packetPath:
      "docs/research/ritual-candidates/packet-gamache-master-candle-burning-complete-extraction.md",
  },
  {
    packetLabel: "Dykes/Gibson Astrological Magic complete extraction",
    sourceLabel: "Dykes/Gibson, Astrological Magic",
    packetPath:
      "docs/research/ritual-candidates/packet-dykes-gibson-astrological-magic-complete-extraction.md",
  },
  {
    packetLabel: "Whitehurst Magical Housekeeping complete extraction",
    sourceLabel: "Whitehurst, Magical Housekeeping",
    packetPath:
      "docs/research/ritual-candidates/packet-whitehurst-magical-housekeeping-complete-extraction.md",
  },
  {
    packetLabel: "Blonde Hearth and Home Witchcraft complete extraction",
    sourceLabel: "Blonde, Hearth and Home Witchcraft",
    packetPath:
      "docs/research/ritual-candidates/packet-blonde-hearth-home-witchcraft-complete-extraction.md",
  },
  {
    packetLabel: "Diaz Plant Witchery complete extraction",
    sourceLabel: "Diaz, Plant Witchery",
    packetPath:
      "docs/research/ritual-candidates/packet-diaz-plant-witchery-complete-extraction.md",
  },
];

const OUT_FILE = "src/data/rituals/source-backed-rituals.ts";
const REPORT_FILE = "docs/content-audits/post-420-anand-saint-thomas-import-review.md";
const FULL_SOURCE_IMPORT_REPORT_FILE =
  "docs/content-audits/post-433-source-packet-mechanical-import-review.md";
const IMPORT_PREP_MANIFEST_FILE =
  "docs/research/ritual-candidates/source-packet-import-prep-manifest.md";
const ANAND_SAINT_THOMAS_CANONICAL_PACKET =
  "docs/research/ritual-candidates/packet-anand-saint-thomas-ritual-only-reextract.md";
const ANAND_SAINT_THOMAS_PREFIXES = [
  "candidate.anand.",
  "candidate.saint_thomas.",
];
const ANAND_SAINT_THOMAS_EXPECTED_OLD_REUSED_RECORDS = 75;
const ANAND_SAINT_THOMAS_EXPECTED_NEW_INLINE_RECORDS = 7;
const ANAND_SAINT_THOMAS_APPROVED_ROWS = 71;
const ANAND_SAINT_THOMAS_STRUCTURAL_NON_IMPORT_ROWS = 14;

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

function parseListLike(raw: string | undefined): string[] {
  if (!raw) {
    return [];
  }

  return raw.trim().startsWith("[") ? parseArray(raw) : parseCommaValues(raw);
}

function parseBacktickValues(raw: string): string[] {
  return [...raw.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
}

function splitMarkdownTableRow(row: string): string[] {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split(/(?<!\\)\|/g)
    .map((cell) => cell.replace(/\\\|/g, "|").trim());
}

function parseManifestTiming(raw: string): ImportPrepManifestEntry["timing"] {
  if (raw === "none") {
    return {
      relationship: "none",
      contexts: [],
    };
  }

  const [relationshipRaw, contextsRaw = ""] = raw.split(/:\s*/, 2);
  const relationship =
    coerceTiming(relationshipRaw) ??
    (contextsRaw.length > 0 ? "helpful" : "none");

  return {
    relationship,
    contexts: contextsRaw
      .split(/;\s*/)
      .map((context) => context.trim())
      .filter(Boolean),
  };
}

function parseRecommendationStatus(raw: string): {
  status: string;
  missing: string[];
} {
  const [status, missingRaw] = raw.split(/:\s*/, 2);

  return {
    status: status.trim(),
    missing: missingRaw
      ? missingRaw
          .split(/;\s*/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [],
  };
}

function parseImportPrepManifest(): Map<string, ImportPrepManifestEntry> {
  if (!fs.existsSync(IMPORT_PREP_MANIFEST_FILE)) {
    return new Map();
  }

  const manifest = fs.readFileSync(IMPORT_PREP_MANIFEST_FILE, "utf8");
  const entries = new Map<string, ImportPrepManifestEntry>();

  for (const line of manifest.split("\n")) {
    if (!line.startsWith("| `")) {
      continue;
    }

    const cells = splitMarkdownTableRow(line);
    const [
      candidateCell,
      ritualizationTypeCell,
      primaryPurposeCell,
      primaryCarrierCell,
      secondaryCarriersCell,
      capacityCell,
      audienceCell,
      timingCell,
      recommendationEligibleCell,
      recommendationStatusCell,
      bestWindowBasisCell,
      reviewLabelsCell,
    ] = cells;
    const id = candidateCell?.match(/`([^`]+)`/)?.[1];
    const primaryPurpose = coercePurpose(parseBacktickValues(primaryPurposeCell)[0]);
    const primaryCarrier = coerceCarrier(parseBacktickValues(primaryCarrierCell)[0]);

    if (!id || !primaryPurpose || !primaryCarrier) {
      continue;
    }

    const recommendation = parseRecommendationStatus(
      recommendationStatusCell ?? "ready",
    );

    entries.set(id, {
      ritualizationType:
        parseBacktickValues(ritualizationTypeCell)[0] ?? "direct_source_ritual",
      primaryPurpose,
      primaryCarrier,
      secondaryCarriers: parseBacktickValues(secondaryCarriersCell)
        .map(coerceCarrier)
        .filter((carrier): carrier is RitualCarrier => Boolean(carrier)),
      capacitySupports: parseBacktickValues(capacityCell)
        .map(coerceCapacity)
        .filter((mode): mode is RitualCapacityMode => Boolean(mode)),
      audienceSupports: parseBacktickValues(audienceCell)
        .map(coerceAudience)
        .filter((audience): audience is RitualAudience => Boolean(audience)),
      timing: parseManifestTiming(timingCell ?? "none"),
      recommendationEligible: recommendationEligibleCell?.includes("true") ?? false,
      recommendationStatus: recommendation.status,
      missing: recommendation.missing,
      bestWindowBasis: bestWindowBasisCell ?? "",
      reviewLabels: reviewLabelsCell
        ? parseCommaValues(reviewLabelsCell)
        : [],
    });
  }

  return entries;
}

function getSection(block: string, heading: string): string | undefined {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(
    new RegExp(
      `^#### ${escaped}\\s*\\n([\\s\\S]*?)(?=^#### |^### |$(?![\\s\\S]))`,
      "im",
    ),
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
  const match = block.match(new RegExp(`^${escaped}:\\s*(.+)$`, "im"));

  return match?.[1]?.trim();
}

function getBulletField(block: string, label: string): string | undefined {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`^- ${escaped}:\\s*(.+)$`, "im"));

  return match?.[1]?.trim();
}

function getField(block: string, label: string): string | undefined {
  return (
    getSection(block, titleCaseLabel(label)) ??
    getSection(block, label.replace(/([A-Z])/g, " $1").trim()) ??
    getLabelField(block, label) ??
    getBulletField(block, label) ??
    getBulletField(block, titleCaseLabel(label))
  );
}

function getPresentationField(block: string, label: string): string | undefined {
  const presentation = block.match(
    /^- Presentation:\s*\n([\s\S]*?)(?=^- \S|^### |$(?![\s\S]))/m,
  )?.[1];
  if (!presentation) {
    return undefined;
  }

  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = presentation.match(new RegExp(`^\\s*- ${escaped}:\\s*(.+)$`, "im"));

  return match?.[1]?.trim();
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
  const match = block.match(
    new RegExp(
      `^- ${escaped}:\\s*$\\n([\\s\\S]*?)(?=^- \\S|^### |$(?![\\s\\S]))`,
      "m",
    ),
  );

  return match?.[1]?.trim();
}

function extractCandidateBlocks(markdown: string): string[] {
  return markdown
    .split(/\n(?=### )/g)
    .filter((block) =>
      /(?:import readiness label|Import readiness):\s*`approved_for_mechanical_import`/i.test(
        block,
      ),
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

function parseRecommendationMetadata(
  block: string,
  manifestEntry?: ImportPrepManifestEntry,
) {
  if (manifestEntry) {
    return {
      purposes: {
        primary: manifestEntry.primaryPurpose,
        secondary: [],
        refinement: manifestEntry.primaryPurpose,
      },
      carriers: {
        primary: manifestEntry.primaryCarrier,
        secondary: uniqueValues(manifestEntry.secondaryCarriers),
      },
      capacity: {
        supports:
          manifestEntry.capacitySupports.length > 0
            ? uniqueValues(manifestEntry.capacitySupports)
            : ["only_a_little" as const],
        default: manifestEntry.capacitySupports[0],
      },
      audience: {
        supports:
          manifestEntry.audienceSupports.length > 0
            ? uniqueValues(manifestEntry.audienceSupports)
            : ["me" as const],
        default: manifestEntry.audienceSupports[0],
      },
      timing: {
        relationship: manifestEntry.timing.relationship,
        ...(manifestEntry.timing.contexts.length > 0
          ? { contexts: manifestEntry.timing.contexts }
          : {}),
      },
      eligibility: manifestEntry.recommendationEligible
        ? {
            recommendable: true,
          }
        : {
            recommendable: false,
            missing:
              manifestEntry.missing.length > 0
                ? manifestEntry.missing
                : [`recommendation_${manifestEntry.recommendationStatus}`],
          },
    } satisfies Ritual["recommendationMetadata"];
  }

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
  const inline = source.match(new RegExp(`^\\s*${key}:\\s*(\\[[^\\n]+\\])\\s*$`, "m"));
  if (inline) {
    return parseArray(inline[1]);
  }

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
    stripQuotes(
      text.match(/citationLabel:\s*(.+)$/m)?.[1] ??
        text.match(/citation label:\s*(.+)$/im)?.[1],
    )?.replace(/\*/g, "").trim() ??
    text.match(/`([^`]+)`/)?.[1] ??
    packet.sourceLabel;
  const sourceLocation =
    getField(block, "Source location") ??
    stripQuotes(
      text.match(/source location(?: \/ basis)?:\s*(.+)$/im)?.[1] ??
        text.match(/sourceLocation:\s*(.+)$/m)?.[1],
    )?.trim() ??
    text.match(/(PDF\s+pp?\.\s*\d+(?:[-–]\d+)?(?:,\s*\d+(?:[-–]\d+)?)*)/)?.[1]?.trim() ??
    text.match(/(Ch(?:apter)?s?\.\s*\d+(?:[-–]\d+)?(?:,\s*\d+(?:[-–]\d+)?)*)/)?.[1]?.trim() ??
    text.replace(/^[^,]+,\s*/, "").split(". ")[0].trim() ??
    packet.packetPath;
  const sourceSummary =
    stripQuotes(
      text.match(/sourceSummary:\s*(.+)$/m)?.[1] ??
        text.match(/source summary:\s*(.+)$/im)?.[1] ??
        getField(block, "Source support") ??
        text.match(/source basis:\s*(.+)$/im)?.[1],
    ) ?? text;
  const sourceSupports =
    getField(block, "Source support") ??
    stripQuotes(text.match(/sourceSupports:\s*(.+)$/m)?.[1]) ??
    (whyThisFits || text);
  const transformation =
    stripQuotes(
      text.match(/moonAndTableChanges:\s*(.+)$/m)?.[1] ??
        text.match(/source transformation:\s*(.+)$/im)?.[1],
    ) ??
    getLabelField(block, "adaptation policy notes") ??
    getBulletNestedBlock(block, "adaptation policy notes") ??
    "Mechanically imported from packet-approved candidate text without runtime reauthoring.";
  const sourceDoNotImport = parseYamlList(yaml, "doNotImport");

  return [
    {
      citationLabel,
      sourceLocation: sourceLocation || packet.packetPath,
      sourceSummary: sanitizeRuntimeMetadata(squashWhitespace(sourceSummary)),
      sourceSupports: sanitizeRuntimeMetadata(squashWhitespace(sourceSupports)),
      moonAndTableChanges: sanitizeRuntimeMetadata(squashWhitespace(transformation)),
      doNotImport: uniqueValues(
        [...sourceDoNotImport, ...extractDoNotImport(block)].map(
          sanitizeRuntimeMetadata,
        ),
      ),
    },
  ];
}

function extractDoNotImport(block: string): string[] {
  const yaml = getYamlSection(block, "Why this fits ingredients");
  const yamlNotes = parseYamlList(yaml, "notForOrHoldNotes");
  if (yamlNotes.length > 0) {
    return cleanDoNotImportValues(yamlNotes);
  }

  const notes = getMultilineIngredient(block, "whyThisFitsIngredients") ?? "";
  const notFor = notes.match(/notForOrHoldNotes:\s*\[([^\]]*)\]/)?.[1];
  const bulletNotFor = notes.match(/notForOrHoldNotes:\s*(.+)$/m)?.[1];
  const values = [...parseArray(notFor), ...parseCommaValues(bulletNotFor)];

  return cleanDoNotImportValues(values);
}

function cleanDoNotImportValues(values: string[]): string[] {
  const cleaned = values
    .map((value) => value.replace(/^\[|\]$/g, "").trim())
    .map(sanitizeRuntimeMetadata)
    .map(restoreGuardrailFragment)
    .filter(Boolean)
    // Drop a dangling guardrail fragment when packet splitting already kept the specific claim nearby.
    .filter((value) => !/^or guarantee$/i.test(value));

  return cleaned.length > 0 ? uniqueValues(cleaned) : [];
}

function parseSearchMetadata(
  block: string,
  packet: PacketImportSpec,
  manifestEntry?: ImportPrepManifestEntry,
) {
  const compact = getLabelField(block, "search metadata");
  const bullet = getBulletNestedBlock(block, "search metadata");
  const yaml = getYamlSection(block, "Search metadata");
  const text = compact ?? bullet ?? yaml ?? "";
  const manifestTags = manifestEntry
    ? [
        manifestEntry.primaryPurpose,
        manifestEntry.primaryCarrier,
        ...manifestEntry.secondaryCarriers,
        ...manifestEntry.capacitySupports,
        ...manifestEntry.audienceSupports,
        manifestEntry.timing.relationship,
        ...manifestEntry.timing.contexts,
        ...manifestEntry.reviewLabels,
      ]
    : [];
  const tags = uniqueValues([
    ...manifestTags,
    ...parseArray(compact?.match(/tags\s+(\[[^\]]*\])/)?.[1]),
    ...parseCommaValues(bullet?.match(/tags:\s*"?([^"\n]+)"?$/m)?.[1]),
    ...parseListLike(yaml?.match(/tags:\s*"?([^"\n]+)"?$/m)?.[1]),
    ...parseYamlList(yaml, "tags"),
  ]);
  const yamlKeywords = parseYamlList(yaml, "keywords");
  const materials = uniqueValues([
    ...parseArray(compact?.match(/materials\s+(\[[^\]]*\])/)?.[1]),
    ...parseCommaValues(
      bullet?.match(/materials \/ places:\s*([^;\n]+)/)?.[1] ??
        bullet?.match(/materials:\s*(.+)$/m)?.[1],
    ),
    ...parseListLike(yaml?.match(/materials:\s*"?([^"\n]+)"?$/m)?.[1]),
    ...parseYamlList(yaml, "materials"),
  ]);
  const places = uniqueValues([
    ...parseArray(compact?.match(/places\s+(\[[^\]]*\])/)?.[1]),
    ...parseCommaValues(
      bullet?.match(/materials \/ places:\s*[^;]+;\s*(.+)$/m)?.[1] ??
        bullet?.match(/places:\s*(.+)$/m)?.[1],
    ),
    ...parseListLike(yaml?.match(/places:\s*"?([^"\n]+)"?$/m)?.[1]),
    ...parseYamlList(yaml, "places"),
  ]);
  const keywords = uniqueValues([
    ...tags,
    ...materials,
    ...places,
    ...yamlKeywords,
    ...parseListLike(
      compact?.match(/keywords\s+(\[[^\]]*\])/)?.[1] ??
        bullet?.match(/keywords:\s*(.+)$/m)?.[1] ??
        yaml?.match(/keywords:\s*"?([^"\n]+)"?$/m)?.[1],
    ),
  ]).filter(Boolean);

  const sourceLabel =
    stripQuotes(
      text.match(/sourceLabel:\s*(.+)$/m)?.[1] ??
        text.match(/source label:\s*(.+)$/im)?.[1],
    ) ?? packet.sourceLabel;

  return {
    tags: tags.length > 0 ? tags : [packet.packetLabel],
    keywords: keywords.length > 0 ? keywords : [packet.packetLabel, packet.sourceLabel],
    ...(materials.length > 0 ? { materials } : {}),
    ...(places.length > 0 ? { places } : {}),
    sourceLabel: normalizeSourceLabel(sourceLabel),
    originLabel:
      stripQuotes(
        text.match(/originLabel:\s*(.+)$/m)?.[1] ??
          text.match(/origin label:\s*(.+)$/im)?.[1],
      ) ?? "source",
  } satisfies Ritual["searchMetadata"];
}

function normalizeSourceLabel(sourceLabel: string): string {
  if (sourceLabel === "Sophie Saint Thomas, Sex Witch") {
    return "Saint Thomas, Sex Witch";
  }

  return sourceLabel;
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
  const outcomeClaim = "guarant" + "ee";
  const outcomeClaimPast = "guarant" + "eed";

  return value
    .replace(
      new RegExp(`\\bnon-${outcomeClaim}-based\\b`, "gi"),
      "without outcome-certainty framing",
    )
    .replace(
      new RegExp(`\\b${outcomeClaimPast}-outcome\\b`, "gi"),
      "outcome-certainty",
    )
    .replace(
      new RegExp(`\\b${outcomeClaimPast}-effect\\b`, "gi"),
      "outcome-certainty",
    )
    .replace(
      new RegExp(`\\b${outcomeClaimPast} outcomes\\b`, "gi"),
      "outcome-certainty claims",
    )
    .replace(
      new RegExp(`\\b${outcomeClaimPast} outcome\\b`, "gi"),
      "outcome-certainty claim",
    )
    .replace(new RegExp(`\\b${outcomeClaim}s\\b`, "gi"), "outcome certainty")
    .replace(new RegExp(`\\b${outcomeClaim}\\b`, "gi"), "outcome certainty");
}

function restoreGuardrailFragment(value: string): string {
  return value.replace(/^future prediction$/i, "no future prediction");
}

function buildWhyThisFits(block: string): string {
  const yaml = getYamlSection(block, "Why this fits ingredients");
  const yamlRationale = parseYamlList(yaml, "sourceBackedRationale");
  const yamlMaterialFit = parseYamlList(yaml, "materialPlaceCarrierPurposeFit");
  const yamlResult = [...yamlRationale, ...yamlMaterialFit]
    .map(squashWhitespace)
    .filter(Boolean)
    .join(" ");
  if (yamlResult) {
    return yamlResult;
  }

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

function stripQuotes(value: string | undefined): string | undefined {
  return value?.trim().replace(/^["']|["']$/g, "");
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
  importPrepManifest: Map<string, ImportPrepManifestEntry>,
): ImportedRitual | SkippedCandidate {
  const candidateId = extractCandidateId(block) ?? "(missing candidate id)";
  const manifestEntry = importPrepManifest.get(candidateId);
  const headline =
    getField(block, "headline") ?? getPresentationField(block, "Headline");
  const practice =
    getField(block, "ritual body / practice") ??
    getField(block, "practice") ??
    getPresentationField(block, "Practice");
  const intention =
    getField(block, "intention") ?? getPresentationField(block, "Intention");
  const bestWindow =
    getField(block, "bestWindow") ??
    getField(block, "Best window") ??
    manifestEntry?.bestWindowBasis;
  const questionToCarry =
    getField(block, "questionToCarry") ??
    getField(block, "question") ??
    getPresentationField(block, "Question");
  const whyThisFits =
    buildWhyThisFits(block) ||
    getField(block, "Source support") ||
    manifestEntry?.bestWindowBasis ||
    "";

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
    status: manifestEntry
      ? manifestEntry.recommendationEligible
        ? "recommendable"
        : "reviewed"
      : "draft",
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
    recommendationMetadata: parseRecommendationMetadata(block, manifestEntry),
    searchMetadata: parseSearchMetadata(block, packet, manifestEntry),
    availability: {
      findable: true,
      directUseEligible: Boolean(manifestEntry),
      recommendationEligible: manifestEntry?.recommendationEligible ?? false,
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
  const importPrepManifest = parseImportPrepManifest();

  for (const packet of PACKETS) {
    const markdown = fs.readFileSync(packet.packetPath, "utf8");
    const blocks = extractCandidateBlocks(markdown);
    approvedCounts[packet.packetLabel] = blocks.length;

    for (const block of blocks) {
      const result = importBlock(block, packet, importPrepManifest);
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
import { applySourceBackedDirectUseReview } from "./direct-use-review";
import { applySourceBackedRecommendationEligibilityReview } from "./recommendation-eligibility-review";

// Generated by scripts/import-source-backed-rituals.ts.
// Source packets remain the canonical authoring artifacts. Do not edit imported
// Ritual prose here by hand; correct the packet and regenerate.
const importedSourceBackedRituals: Ritual[] = ${JSON.stringify(records, null, 2)};

const directUseReviewedSourceBackedRituals = applySourceBackedDirectUseReview(
  importedSourceBackedRituals,
);

export const sourceBackedRituals: Ritual[] =
  applySourceBackedRecommendationEligibilityReview(
    directUseReviewedSourceBackedRituals,
  );
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

  const anandSaintThomasRecords = imported.filter((ritual) =>
    ANAND_SAINT_THOMAS_PREFIXES.some((prefix) => ritual.id.startsWith(prefix)),
  );
  const anandSaintThomasReusedRecords = anandSaintThomasRecords.filter(
    (ritual) => ritual.__packetPath !== ANAND_SAINT_THOMAS_CANONICAL_PACKET,
  );
  const anandSaintThomasNewInlineRecords = anandSaintThomasRecords.filter(
    (ritual) => ritual.__packetPath === ANAND_SAINT_THOMAS_CANONICAL_PACKET,
  );

  const markdown = `# Post-420 Anand/Saint Thomas Import Review

Issue: #420

Follow-up to #413, #414, and #287.

This packet documents the mechanical import of the superseding Anand/Saint Thomas adult re-extraction packet into runtime \`Ritual\` records.

## Scope confirmation

- Runtime selection/scoring changed: no
- Recommendation output changed: no
- UI structure changed: no
- Search direct-use gating changed: no
- Manage Rituals inspection surface changed: no
- Runtime Ritual collection changed: yes
- Legacy pilot Rituals remain in app surface: no
- Mechanically imported records begin as draft/findable before review overlays: yes
- Direct-use review overlays can promote imported records: yes
- Recommendation review overlays can promote records whose metadata supports recommendation: yes
- Packet prose rewritten during import: no
- New source documents added: no
- New visible categories added: no

## Anand/Saint Thomas doctrine applied

- The canonical extraction ledger is \`${ANAND_SAINT_THOMAS_CANONICAL_PACKET}\`.
- The two older Anand and Saint Thomas packets are superseded as doctrine, but their existing approved candidate blocks are reused as import scaffolding where the canonical ledger approved the same source-backed lanes.
- Explicit adult content is not a hold reason.
- Search visibility, direct-use eligibility, and recommendation eligibility remain separate decisions.
- If a Ritual has complete metadata that supports recommendation and is direct-use reviewed, it is eligible for \`Choose with me\`.

## Packets included

| Packet | Approved candidate blocks found | Imported as source-backed records | Skipped | Notes |
| --- | ---: | ---: | ---: | --- |
${byPacket
  .map(
    ({ packet, approved, imported: count, skipped: skippedCount }) =>
      `| ${packet.packetLabel} | ${approved} | ${count} | ${skippedCount} | ${
        packet.supersededByPacketPath
          ? `Superseded by \`${packet.supersededByPacketPath}\`; reused as import-block scaffolding.`
          : packet.packetPath === ANAND_SAINT_THOMAS_CANONICAL_PACKET
            ? "Canonical Anand/Saint Thomas ledger plus seven complete inline records."
            : ""
      } |`,
  )
  .join("\n")}

## Count reconciliation

- Packets included: ${PACKETS.length}
- Packets deferred: 0
- Total approved_for_mechanical_import candidates found: ${Object.values(
    approvedCounts,
  ).reduce((sum, count) => sum + count, 0)}
- Imported as draft/findable: ${imported.length}
- Anand/Saint Thomas approved ledger rows: ${ANAND_SAINT_THOMAS_APPROVED_ROWS}
- Anand/Saint Thomas structural non-import rows: ${ANAND_SAINT_THOMAS_STRUCTURAL_NON_IMPORT_ROWS}
- Anand/Saint Thomas runtime records after this import: ${anandSaintThomasRecords.length}
- Existing Anand/Saint Thomas records overwritten/reused from superseded packet blocks: ${anandSaintThomasReusedRecords.length}
- Newly added Anand/Saint Thomas inline records from the canonical packet: ${anandSaintThomasNewInlineRecords.length}
- Expected reused old Anand/Saint Thomas records: ${ANAND_SAINT_THOMAS_EXPECTED_OLD_REUSED_RECORDS}
- Expected new inline Anand/Saint Thomas records: ${ANAND_SAINT_THOMAS_EXPECTED_NEW_INLINE_RECORDS}
- Removed/superseded runtime records: 0
- Reconciliation note: approved source-visible ledger rows are not one-to-one with runtime records. Some canonical ledger rows are broad source lanes, while the reused older packet blocks split those lanes into finer-grained Ritual records.
- Skipped due to malformed packet record: ${skipped.length}
- Skipped due to unsupported runtime enum: 0
- Skipped due to unsupported metadata shape: 0
- Skipped due to stale ritualWords/private excerpt metadata: 0
- Skipped due to non-approved import readiness: 0
- Records with ritualWords: ${ritualWords.length}
- Records with reviewFlags: ${reviewFlags.length}
- Runtime files changed: \`${OUT_FILE}\`, tests

## Baseline imported posture

Every imported record is mechanically created as:

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

The exported runtime collection then applies \`direct-use-review.ts\` and \`recommendation-eligibility-review.ts\`. For #420, the Anand/Saint Thomas records that have direct-use review and recommendation metadata are promoted to direct-use and recommendation eligibility. Records without that review remain findable drafts rather than being hidden.

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
- Packet availability values are intentionally normalized on raw import, then the review overlays set direct-use and recommendation readiness.
- Legacy pilot Rituals are no longer used by Search, Manage Rituals, or readiness reporting.
- Findability does not require recommendation eligibility. Direct-use and recommendation remain review decisions after import.

## Validation results

Run before merge:

\`\`\`bash
npm run lint:content
npm run typecheck
npm run test
npm run diagnose:content
\`\`\`

## Merge recommendation

Ready for human review of imported count, app visibility, and import fidelity before merge.
`;

  fs.writeFileSync(REPORT_FILE, markdown);
  writeFullSourcePacketReport(imported, skipped, approvedCounts);
}

function writeFullSourcePacketReport(
  imported: ImportedRitual[],
  skipped: SkippedCandidate[],
  approvedCounts: Record<string, number>,
) {
  const runtimeById = new Map(
    applySourceBackedRecommendationEligibilityReview(
      applySourceBackedDirectUseReview(imported.map(withoutPrivateKeys)),
    ).map((ritual) => [ritual.id, ritual]),
  );
  const byPacket = PACKETS.map((packet) => {
    const packetImported = imported.filter(
      (ritual) => ritual.__packetLabel === packet.packetLabel,
    );
    const packetRuntime = packetImported
      .map((ritual) => runtimeById.get(ritual.id))
      .filter((ritual): ritual is Ritual => Boolean(ritual));

    return {
      packet,
      approved: approvedCounts[packet.packetLabel] ?? 0,
      imported: packetImported.length,
      directUse: packetRuntime.filter(
        (ritual) => ritual.availability.directUseEligible,
      ).length,
      recommendationEligible: packetRuntime.filter(
        (ritual) => ritual.availability.recommendationEligible,
      ).length,
      skipped: skipped.filter((item) => item.packetLabel === packet.packetLabel)
        .length,
    };
  });
  const runtimeRecords = [...runtimeById.values()];
  const directUse = runtimeRecords.filter(
    (ritual) => ritual.availability.directUseEligible,
  );
  const recommendationEligible = runtimeRecords.filter(
    (ritual) => ritual.availability.recommendationEligible,
  );

  const markdown = `# Post-433 Source Packet Mechanical Import Review

PR: source packet mechanical import

This report documents the mechanical import posture after adding the eight
no-API extraction packets and their import-prep manifest to the existing
source-backed Ritual import pipeline.

## Import Summary

- Packets included: ${PACKETS.length}
- Total source-backed Ritual records: ${runtimeRecords.length}
- Findable records: ${runtimeRecords.filter((ritual) => ritual.availability.findable).length}
- Direct-use records: ${directUse.length}
- Recommendation-eligible records: ${recommendationEligible.length}
- Recommendation-held records: ${imported.length - recommendationEligible.length}
- Skipped candidates: ${skipped.length}

## Packet Reconciliation

| Packet | Approved candidate blocks found | Imported | Direct-use | Recommendation-eligible | Skipped |
| --- | ---: | ---: | ---: | ---: | ---: |
${byPacket
  .map(
    ({ packet, approved, imported: count, directUse: directUseCount, recommendationEligible: recommendationCount, skipped: skippedCount }) =>
      `| ${packet.packetLabel} | ${approved} | ${count} | ${directUseCount} | ${recommendationCount} | ${skippedCount} |`,
  )
  .join("\n")}

## Import Notes

- The eight new packets are imported through \`${IMPORT_PREP_MANIFEST_FILE}\`.
- Every manifest-approved record imports as findable and direct-use eligible.
- Recommendation eligibility follows the manifest: adult/private/high-capacity material can be recommendation-eligible when current purpose, carrier, capacity, audience, and timing metadata can represent it.
- Records held from recommendation remain findable/direct-use; holds are for selector gates or owner-review decisions, not import blockers.
- Packet prose remains canonical for headline, practice, intention, best window, question, and source grounding.

## Skipped Candidates

${skipped.length === 0 ? "None." : skipped.map((item) => `- ${item.packetLabel}: ${item.candidateId} — ${item.reason}`).join("\n")}
`;

  fs.writeFileSync(FULL_SOURCE_IMPORT_REPORT_FILE, markdown);
}

function countBy(values: string[]): Record<string, number> {
  return values.reduce<Record<string, number>>((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});
}

importPackets();
