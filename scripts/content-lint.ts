import { readdirSync, readFileSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export type ContentLintFindingSeverity = "error" | "warning";

export type ContentLintFinding = {
  severity: ContentLintFindingSeverity;
  filePath: string;
  lineNumber: number;
  ruleId: string;
  message: string;
  excerpt: string;
};

export type ContentLintResult = {
  valid: boolean;
  findings: ContentLintFinding[];
};

type ContentLintRule = {
  id: string;
  message: string;
  severity: ContentLintFindingSeverity;
  pattern: RegExp;
  allowGuardrailContext?: boolean;
};

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SCANNED_ROOTS = ["docs", "src", "tests", "scripts"] as const;
const SCANNED_EXTENSIONS = new Set([".ts", ".md", ".json"]);
const SKIPPED_PATH_PARTS = new Set([
  ".git",
  "node_modules",
  "dist",
  "private",
  "private.example",
]);

const GUARDRAIL_CONTEXT_PATTERN =
  /\b(do not|don't|must not|not contain|not include|not\.tocontain|not allowed|not:|never|avoid|avoids|blocked|blocks|blocking|forbidden|forbidden_private_terms|guardrail|privacy|private boundary|safe(?:ty)?|unsafe|risk|risky|riskiest|hard no|no |no real|no copied|no source prose|not copied|non-verbatim|out of scope|deferred|later|not as|not a|not to|is not|does not|should not|should avoid|without committing|may include|must stay out|must stay local|gitignored|source-controlled examples|private storage|acceptance criteria|impossible)\b/i;

const EMAIL_ALLOWLIST_PATTERNS = [
  /person_[ab]@example\.com/i,
  /example\.com/i,
];

const FILE_ALLOWLIST_PATTERNS = [
  /scripts\/content-lint\.ts$/,
  /tests\/unit\/content-lint\.test\.ts$/,
];

const RULES: ContentLintRule[] = [
  {
    id: "private-data-marker",
    message: "Private-data marker appears outside an obvious guardrail context.",
    severity: "error",
    pattern:
      /\b(birth date|birth time|birth place|raw natal placement|natal placement|relationship details|private source text|private source document|real profile data|real schedule|service account)\b/i,
    allowGuardrailContext: true,
  },
  {
    id: "deterministic-claim",
    message: "Deterministic or prediction language appears outside an obvious guardrail context.",
    severity: "error",
    pattern:
      /\b(guarantees?|guaranteed|predicts?|prediction|will happen|will cause|fated|destined|certain outcome|ensures?)\b/i,
    allowGuardrailContext: true,
  },
  {
    id: "blocked-safety-phrase",
    message: "Blocked ritual safety phrase appears outside an obvious guardrail context.",
    severity: "error",
    pattern:
      /\b(smoke cleanse|smoke cleansing|smudg(?:e|ing)|burn sage|crystal elixir|crystal-infused water|essential oil ingestion|ingest essential oil|drink essential oil|consume essential oil)\b/i,
    allowGuardrailContext: true,
  },
  {
    id: "control-another-person",
    message: "Relationship-control ritual language appears outside an obvious guardrail context.",
    severity: "error",
    pattern:
      /\b(control|compel|force|make)\b.{0,48}\b(person|partner|spouse|lover|coworker|someone)\b/i,
    allowGuardrailContext: true,
  },
  {
    id: "long-quoted-text",
    message: "Long quoted text may indicate copied source prose.",
    severity: "warning",
    pattern: /"[^"]{360,}"|'[^']{360,}'/,
  },
];

function isScannedFile(filePath: string): boolean {
  return [...SCANNED_EXTENSIONS].some((extension) =>
    filePath.endsWith(extension),
  );
}

function shouldSkipPath(filePath: string): boolean {
  return filePath
    .split("/")
    .some((part) => SKIPPED_PATH_PARTS.has(part));
}

function getScannedFiles(rootPath: string): string[] {
  return readdirSync(rootPath).flatMap((entry) => {
    const entryPath = join(rootPath, entry);
    const relativePath = relative(REPO_ROOT, entryPath);

    if (shouldSkipPath(relativePath)) {
      return [];
    }

    const stats = statSync(entryPath);

    if (stats.isDirectory()) {
      return getScannedFiles(entryPath);
    }

    return isScannedFile(entryPath) ? [entryPath] : [];
  });
}

function getSourceControlledScannedFiles(): string[] {
  try {
    return execFileSync("git", ["ls-files", ...SCANNED_ROOTS], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    })
      .split(/\r?\n/)
      .filter(Boolean)
      .filter((relativePath) =>
        !shouldSkipPath(relativePath) && isScannedFile(relativePath),
      )
      .map((relativePath) => join(REPO_ROOT, relativePath));
  } catch {
    return SCANNED_ROOTS.flatMap((root) =>
      getScannedFiles(join(REPO_ROOT, root)),
    );
  }
}

function isEmailAllowed(value: string): boolean {
  return EMAIL_ALLOWLIST_PATTERNS.some((pattern) => pattern.test(value));
}

function isFileAllowed(filePath: string): boolean {
  return FILE_ALLOWLIST_PATTERNS.some((pattern) => pattern.test(filePath));
}

function isGuardrailContext(line: string): boolean {
  return GUARDRAIL_CONTEXT_PATTERN.test(line);
}

function lintLine({
  line,
  context,
  lineNumber,
  relativePath,
}: {
  line: string;
  context: string;
  lineNumber: number;
  relativePath: string;
}): ContentLintFinding[] {
  if (isFileAllowed(relativePath)) {
    return [];
  }

  const findings: ContentLintFinding[] = [];
  const emails = line.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];

  for (const email of emails) {
    if (!isEmailAllowed(email)) {
      findings.push({
        severity: "error",
        filePath: relativePath,
        lineNumber,
        ruleId: "real-email",
        message: "Email-like value is not an approved placeholder.",
        excerpt: line.trim(),
      });
    }
  }

  for (const rule of RULES) {
    if (!rule.pattern.test(line)) {
      continue;
    }

    if (rule.allowGuardrailContext && isGuardrailContext(context)) {
      continue;
    }

    findings.push({
      severity: rule.severity,
      filePath: relativePath,
      lineNumber,
      ruleId: rule.id,
      message: rule.message,
      excerpt: line.trim(),
    });
  }

  return findings;
}

export function lintContentText(
  contents: string,
  relativePath = "fixture.md",
): ContentLintFinding[] {
  const lines = contents.split(/\r?\n/);

  return lines
    .flatMap((line, index) => {
      const context = lines
        .slice(Math.max(0, index - 12), Math.min(lines.length, index + 3))
        .join("\n");

      return lintLine({
          line,
          context,
          lineNumber: index + 1,
          relativePath,
      });
    });
}

export function runContentLint(): ContentLintResult {
  const files = getSourceControlledScannedFiles();
  const findings = files.flatMap((filePath) => {
    const relativePath = relative(REPO_ROOT, filePath);
    const contents = readFileSync(filePath, "utf8");

    return lintContentText(contents, relativePath);
  });

  return {
    valid: findings.every((finding) => finding.severity !== "error"),
    findings,
  };
}

export function formatContentLintResult(result: ContentLintResult): string {
  if (result.findings.length === 0) {
    return "Content lint passed with no findings.";
  }

  return result.findings
    .map(
      (finding) =>
        `${finding.severity.toUpperCase()} ${finding.filePath}:${finding.lineNumber} [${finding.ruleId}] ${finding.message}\n  ${finding.excerpt}`,
    )
    .join("\n");
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const result = runContentLint();

  console.log(formatContentLintResult(result));

  if (!result.valid) {
    process.exitCode = 1;
  }
}
