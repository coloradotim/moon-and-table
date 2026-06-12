import fs from "node:fs";
import path from "node:path";

import {
  getRelativeRunPath,
  getSourceRunDir,
  getSourceRunStatePath,
} from "./config";
import { ensureDir, readJsonFile, writeJsonFile } from "./json";
import type { SourcePipelineStage, SourceRunState } from "./types";

export type InitSourceRunInput = {
  sourceId: string;
  pdfPath: string;
  title?: string;
  author?: string;
  editor?: string;
  translator?: string;
};

export function createSourceRun(input: InitSourceRunInput): SourceRunState {
  if (!input.sourceId.trim()) {
    throw new Error("--source-id is required.");
  }

  if (!input.pdfPath.trim()) {
    throw new Error("--pdf is required.");
  }

  if (!fs.existsSync(input.pdfPath)) {
    throw new Error(`PDF not found: ${input.pdfPath}`);
  }

  const runDir = getSourceRunDir(input.sourceId);
  ensureDir(runDir);

  const now = new Date().toISOString();
  const state: SourceRunState = {
    source_id: input.sourceId,
    pdf_path: path.resolve(input.pdfPath),
    title: input.title,
    author: input.author,
    editor: input.editor,
    translator: input.translator,
    current_stage: "init",
    artifact_paths: {},
    inventory_count: 0,
    classified_candidate_count: 0,
    extracted_candidate_count: 0,
    qa_pass_count: 0,
    approved_for_import_count: 0,
    imported_count: 0,
    direct_use_count: 0,
    recommendable_count: 0,
    held_count: 0,
    validation_results: [],
    open_review_items: [],
    created_at: now,
    updated_at: now,
  };

  writeJsonFile(getSourceRunStatePath(input.sourceId), state);

  return state;
}

export function readSourceRun(sourceId: string): SourceRunState {
  const statePath = getSourceRunStatePath(sourceId);

  if (!fs.existsSync(statePath)) {
    throw new Error(`No source run found for ${sourceId}. Run source:init first.`);
  }

  return readJsonFile<SourceRunState>(statePath);
}

export function updateSourceRun(
  sourceId: string,
  updater: (state: SourceRunState) => SourceRunState,
): SourceRunState {
  const next = {
    ...updater(readSourceRun(sourceId)),
    updated_at: new Date().toISOString(),
  };

  writeJsonFile(getSourceRunStatePath(sourceId), next);

  return next;
}

export function markStage(
  sourceId: string,
  currentStage: SourcePipelineStage,
): SourceRunState {
  return updateSourceRun(sourceId, (state) => ({
    ...state,
    current_stage: currentStage,
  }));
}

export function getRunArtifactPath(
  sourceId: string,
  ...parts: string[]
): string {
  return getRelativeRunPath(sourceId, ...parts);
}
