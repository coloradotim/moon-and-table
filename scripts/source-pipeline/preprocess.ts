import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { ensureDir, readJsonFile, writeJsonFile, writeTextFile } from "./json";
import { getRunArtifactPath, readSourceRun, updateSourceRun } from "./state";
import type { PageChunk, PageManifestEntry } from "./types";

function commandExists(command: string): boolean {
  try {
    execFileSync("which", [command], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function requirePdfCommand(command: string): void {
  if (!commandExists(command)) {
    throw new Error(
      `${command} is required for source:preprocess. Install poppler tools and rerun.`,
    );
  }
}

function getPageCount(pdfPath: string): number {
  const output = execFileSync("pdfinfo", [pdfPath], { encoding: "utf8" });
  const match = output.match(/^Pages:\s+(\d+)/m);

  if (!match) {
    throw new Error("Unable to determine PDF page count with pdfinfo.");
  }

  return Number(match[1]);
}

function detectVisualSignals(text: string): string[] {
  const signals: string[] = [];
  const checks: Array<[string, RegExp]> = [
    ["diagram", /\bdiagram|figure|illustration\b/i],
    ["table", /\btable|chart\b/i],
    ["ritual_layout", /\blayout|placement|arrange|altar setup\b/i],
    ["body_position", /\bposture|position|gesture|mudra|body\b/i],
    ["altar_setup", /\baltar|shrine\b/i],
    ["symbol_or_sigil", /\bsigil|symbol|glyph|seal\b/i],
  ];

  for (const [label, pattern] of checks) {
    if (pattern.test(text)) {
      signals.push(label);
    }
  }

  return signals;
}

function buildChunks(sourceId: string, manifest: PageManifestEntry[]): PageChunk[] {
  const chunks: PageChunk[] = [];

  for (let index = 0; index < manifest.length; index += 3) {
    const pages = manifest.slice(index, index + 3);
    chunks.push({
      chunkId: `chunk-${String(chunks.length + 1).padStart(3, "0")}`,
      sourceId,
      pageStart: pages[0]?.page ?? 1,
      pageEnd: pages[pages.length - 1]?.page ?? 1,
      text: pages
        .map((page) => `# Page ${page.page}\n\n${fs.readFileSync(page.textPath, "utf8")}`)
        .join("\n\n"),
      pageRefs: pages.map((page) => ({
        page: page.page,
        textPath: page.textPath,
        imagePath: page.imagePath,
        visualSignals: page.visualSignals,
      })),
    });
  }

  return chunks;
}

export function preprocessSourceRun(sourceId: string): void {
  const state = readSourceRun(sourceId);

  requirePdfCommand("pdfinfo");
  requirePdfCommand("pdftotext");
  requirePdfCommand("pdftoppm");

  const pageCount = getPageCount(state.pdf_path);
  const textDir = getRunArtifactPath(sourceId, "extracted-text");
  const imageDir = getRunArtifactPath(sourceId, "page-images");
  const chunksDir = getRunArtifactPath(sourceId, "chunks");
  const manifestPath = getRunArtifactPath(sourceId, "page-manifest.json");

  ensureDir(textDir);
  ensureDir(imageDir);
  ensureDir(chunksDir);

  const manifest: PageManifestEntry[] = [];

  for (let page = 1; page <= pageCount; page += 1) {
    const pageLabel = String(page).padStart(3, "0");
    const textPath = path.join(textDir, `page-${pageLabel}.md`);
    const imagePrefix = path.join(imageDir, `page-${pageLabel}`);

    const text = execFileSync(
      "pdftotext",
      ["-layout", "-f", String(page), "-l", String(page), state.pdf_path, "-"],
      { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
    );
    writeTextFile(textPath, text);

    execFileSync("pdftoppm", [
      "-f",
      String(page),
      "-l",
      String(page),
      "-png",
      "-singlefile",
      state.pdf_path,
      imagePrefix,
    ]);

    const imagePath = `${imagePrefix}.png`;
    const visualSignals = detectVisualSignals(text);
    const textCharCount = text.trim().length;

    manifest.push({
      page,
      textPath,
      imagePath: fs.existsSync(imagePath) ? imagePath : undefined,
      textCharCount,
      needsImageReview:
        textCharCount < 200 ||
        visualSignals.some((signal) =>
          [
            "diagram",
            "table",
            "ritual_layout",
            "body_position",
            "altar_setup",
            "symbol_or_sigil",
          ].includes(signal),
        ),
      visualSignals: [
        ...visualSignals,
        ...(textCharCount < 200 ? ["low_text_confidence"] : []),
      ],
    });
  }

  writeJsonFile(manifestPath, manifest);

  const chunks = buildChunks(sourceId, manifest);
  for (const chunk of chunks) {
    writeJsonFile(path.join(chunksDir, `${chunk.chunkId}.json`), chunk);
  }

  updateSourceRun(sourceId, (current) => ({
    ...current,
    current_stage: "preprocess",
    artifact_paths: {
      ...current.artifact_paths,
      extractedTextDir: textDir,
      pageImagesDir: imageDir,
      pageManifest: manifestPath,
      chunksDir,
    },
  }));
}

export function readChunks(sourceId: string): PageChunk[] {
  const state = readSourceRun(sourceId);
  const chunksDir = state.artifact_paths.chunksDir;

  if (!chunksDir || !fs.existsSync(chunksDir)) {
    throw new Error(`No chunks found for ${sourceId}. Run source:preprocess first.`);
  }

  return fs.readdirSync(chunksDir)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => readJsonFile<PageChunk>(path.join(chunksDir, file)));
}
