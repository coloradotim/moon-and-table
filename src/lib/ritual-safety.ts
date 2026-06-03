export type RitualSafetyFlags = {
  ingestion: "none" | "normal_food_use_only" | "review_required" | "avoid";
  essentialOils: "none" | "avoid" | "review_required";
  smoke: "none" | "avoid" | "review_required";
  fire: "none" | "live_flame" | "led_or_no_flame" | "avoid";
  pets: "safe" | "keep_away" | "review_required" | "avoid";
  children: "safe" | "supervision" | "review_required" | "avoid";
  pregnancy: "no_claim" | "review_required" | "avoid";
  allergies: string[];
  medicalClaims: "forbidden";
  culturalContext: "none" | "label_required" | "avoid";
  emotionalIntensity: "low" | "medium" | "avoid_when_low_capacity";
  cleanupBurden: "tiny" | "low" | "medium" | "high";
};

export type RitualSafetyValidationResult = {
  allowed: boolean;
  blocks: string[];
  warnings: string[];
};

export const lowRiskRitualSafetyFlags: RitualSafetyFlags = {
  ingestion: "none",
  essentialOils: "none",
  smoke: "none",
  fire: "none",
  pets: "safe",
  children: "safe",
  pregnancy: "no_claim",
  allergies: [],
  medicalClaims: "forbidden",
  culturalContext: "none",
  emotionalIntensity: "low",
  cleanupBurden: "tiny",
};

const BLOCKED_INSTRUCTION_PATTERNS = [
  {
    pattern: /\bessential oil\b.*\b(ingest|drink|eat|swallow|consume|internal)\b/i,
    reason: "essential oil ingestion is blocked",
  },
  {
    pattern: /\b(ingest|drink|eat|swallow|consume|internal)\b.*\bessential oil\b/i,
    reason: "essential oil ingestion is blocked",
  },
  {
    pattern: /\bcrystal elixir\b|\bgem elixir\b|\bcrystal-infused water\b/i,
    reason: "crystal elixirs are blocked",
  },
  {
    pattern: /\braw (dough|flour)\b|\buncooked flour\b/i,
    reason: "raw dough or flour crafts are blocked",
  },
  {
    pattern: /\b(control|compel|force|make)\b.*\b(person|partner|spouse|lover|coworker|someone)\b/i,
    reason: "rituals aimed at controlling another person are blocked",
  },
  {
    pattern: /\b(cure|treat|diagnose|heal|prevent)\b.*\b(illness|disease|infection|anxiety|depression|pain|fertility|pregnancy)\b/i,
    reason: "medical, fertility, and pregnancy claims are blocked",
  },
  {
    pattern: /\b(guarantee|predict|prove|ensure|certain|fated|destined)\b/i,
    reason: "deterministic claims are blocked",
  },
  {
    pattern: /\b(legal advice|financial advice|safety advice)\b/i,
    reason: "legal, financial, and physical safety advice is blocked",
  },
  {
    pattern: /\b(smoke cleanse|smoke cleansing|smudg(e|ing)|burn sage)\b/i,
    reason: "smoke-cleansing defaults are blocked",
  },
];

function getInstructionBlocks(instructions: string[]): string[] {
  const joinedInstructions = instructions.join(" ");

  return BLOCKED_INSTRUCTION_PATTERNS.flatMap(({ pattern, reason }) =>
    pattern.test(joinedInstructions) ? [reason] : [],
  );
}

export function validateRitualSafety(
  flags: RitualSafetyFlags,
  instructions: string[] = [],
): RitualSafetyValidationResult {
  const blocks = getInstructionBlocks(instructions);
  const warnings: string[] = [];

  if (flags.essentialOils === "avoid") {
    blocks.push("essential oils are marked avoid");
  }

  if (flags.ingestion === "avoid") {
    blocks.push("ingestion is marked avoid");
  }

  if (flags.smoke === "avoid") {
    blocks.push("smoke is marked avoid");
  }

  if (flags.fire === "avoid") {
    blocks.push("fire is marked avoid");
  }

  if (flags.pets === "avoid") {
    blocks.push("pet-accessible risk is marked avoid");
  }

  if (flags.children === "avoid") {
    blocks.push("child-accessible risk is marked avoid");
  }

  if (flags.pregnancy === "avoid") {
    blocks.push("pregnancy-related risk is marked avoid");
  }

  if (flags.culturalContext === "avoid") {
    blocks.push("cultural context is marked avoid");
  }

  if (flags.medicalClaims !== "forbidden") {
    blocks.push("medical claims must be forbidden");
  }

  if (
    instructions.some((instruction) =>
      /\b(lit|flame|candle|burn)\b/i.test(instruction),
    ) &&
    flags.fire === "none"
  ) {
    blocks.push("candle work must declare fire safety");
  }

  if (flags.smoke === "review_required") {
    warnings.push("smoke requires review and must not be a default ritual");
  }

  if (flags.fire === "live_flame") {
    warnings.push("live flame requires ordinary candle safety and supervision");
  }

  if (flags.essentialOils === "review_required") {
    warnings.push("essential oils require review and must not be ingested");
  }

  if (flags.ingestion === "review_required") {
    warnings.push("ingestion requires safety review");
  }

  if (flags.pets === "keep_away" || flags.pets === "review_required") {
    warnings.push("pet access needs explicit handling");
  }

  if (flags.children === "supervision" || flags.children === "review_required") {
    warnings.push("child access needs explicit handling");
  }

  if (flags.pregnancy === "review_required") {
    warnings.push("pregnancy-related content requires review and no claims");
  }

  if (flags.culturalContext === "label_required") {
    warnings.push("cultural context requires a clear label");
  }

  return {
    allowed: blocks.length === 0,
    blocks: [...new Set(blocks)],
    warnings: [...new Set(warnings)],
  };
}

export function isLowCapacitySafe(flags: RitualSafetyFlags): boolean {
  return (
    flags.emotionalIntensity !== "avoid_when_low_capacity" &&
    flags.cleanupBurden !== "high"
  );
}

export function requiresSafetyReview(flags: RitualSafetyFlags): boolean {
  return (
    flags.ingestion === "review_required" ||
    flags.essentialOils === "review_required" ||
    flags.smoke === "review_required" ||
    flags.pets === "review_required" ||
    flags.children === "review_required" ||
    flags.pregnancy === "review_required" ||
    flags.culturalContext === "label_required"
  );
}

export function withSafetyOverrides(
  overrides: Partial<RitualSafetyFlags>,
): RitualSafetyFlags {
  return {
    ...lowRiskRitualSafetyFlags,
    ...overrides,
    allergies: overrides.allergies ?? lowRiskRitualSafetyFlags.allergies,
    medicalClaims: "forbidden",
  };
}
