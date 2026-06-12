import path from "node:path";

export const PRIVATE_SOURCE_PIPELINE_DIR = ".moon-table-private";
export const SOURCE_RUNS_DIR = path.join(
  PRIVATE_SOURCE_PIPELINE_DIR,
  "source-runs",
);
export const STATE_FILE_NAME = "source-run.json";

export function getSourceRunDir(sourceId: string): string {
  return path.join(SOURCE_RUNS_DIR, sourceId);
}

export function getSourceRunStatePath(sourceId: string): string {
  return path.join(getSourceRunDir(sourceId), STATE_FILE_NAME);
}

export function getRelativeRunPath(sourceId: string, ...parts: string[]): string {
  return path.join(getSourceRunDir(sourceId), ...parts);
}
