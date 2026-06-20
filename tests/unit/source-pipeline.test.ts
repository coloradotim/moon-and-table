import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { sourceBackedRituals } from "../../src/data/rituals/source-backed-rituals";
import type { Ritual } from "../../src/data/rituals/types";
import { validateExtractionPacket } from "../../scripts/source-pipeline/qa";
import {
  createSourceRun,
  readSourceRun,
  updateSourceRun,
} from "../../scripts/source-pipeline/state";
import {
  initializeReviewQueue,
  recordReviewDecision,
} from "../../scripts/source-pipeline/stages";
import { writeJsonFile } from "../../scripts/source-pipeline/json";
import type { ExtractionPacket } from "../../scripts/source-pipeline/types";

const sourceId = "unit-test-source";
const runDir = path.join(".moon-table-private", "source-runs", sourceId);
let tempDir = "";

function makeDraftRitual(overrides: Partial<Ritual> = {}): Ritual {
  const base = sourceBackedRituals[0];

  return {
    ...base,
    id: "candidate.unit_test.ritual",
    status: "draft",
    availability: {
      findable: true,
      directUseEligible: false,
      recommendationEligible: false,
    },
    recommendationMetadata: {
      ...base .recommendationMetadata!,
      eligibility: {
        recommendable: false,
        missing: ["direct_use_review", "recommendation_review"],
      },
    },
    ...overrides,
  };
}

function makePacket(ritual: Ritual = makeDraftRitual()): ExtractionPacket {
  return {
    source_id: sourceId,
    packet_version: 1,
    packet_notes: [],
    candidates: [
      {
        candidateId: ritual.id,
        inventoryRowIds: ["row-001"],
        status: "draft_candidate",
        direct_use_target: "later_review",
        recommendation_target: "later_review",
        reviewLabels: [],
        sourceSupportSummary: "Source-safe support summary.",
        knownConcerns: [],
        runtimeRitual: ritual,
      },
    ],
  };
}

beforeEach(() => {
  fs.rmSync(runDir, { recursive: true, force: true });
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "moon-table-source-"));
});

afterEach(() => {
  fs.rmSync(runDir, { recursive: true, force: true });
  fs.rmSync(tempDir, { recursive: true, force: true });
});

describe("source pipeline", () => {
  it("creates private source-run state without committing artifacts", () => {
    const pdfPath = path.join(tempDir, "source.pdf");
    fs.writeFileSync(pdfPath, "not a real pdf for init-only state test");

    const state = createSourceRun({
      sourceId,
      pdfPath,
      title: "Private Test Source",
      author: "Test Author",
    });

    expect(state.source_id).toBe(sourceId);
    expect(state.current_stage).toBe("init");
    expect(readSourceRun(sourceId).title).toBe("Private Test Source");
    expect(fs.readFileSync(".gitignore", "utf8")).toContain(
      ".moon-table-private/",
    );
  });

  it("blocks invalid runtime enum values during packet QA", () => {
    const ritual = makeDraftRitual({
      recommendationMetadata: {
        ...makeDraftRitual() .recommendationMetadata!,
        purposes: {
          ...makeDraftRitual().recommendationMetadata!.purposes,
          primary: "invalid_purpose",
        },
      },
    } as unknown as Partial<Ritual>);
    const report = validateExtractionPacket(sourceId, makePacket(ritual));

    expect(report.valid).toBe(false);
    expect(report.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          outcome: "blocked_invalid_enum",
          path: "runtimeRitual.recommendationMetadata.purposes.primary",
        }),
      ]),
    );
  });

  it("blocks stale source excerpt metadata and too-long exact ritual words", () => {
    const ritual = {
      ...makeDraftRitual(),
      ritualWords: [
        {
          mode: "source_exact_short",
          useContext: "spoken",
          text: Array.from({ length: 21 }, (_, index) => `word${index}`).join(" "),
        },
      ],
    } satisfies Ritual;
    const packet = {
      ...makePacket(ritual),
      candidates: [
        {
          ...makePacket(ritual).candidates[0],
          sourceExcerpt: "stale private excerpt metadata",
        },
      ],
    } as unknown as ExtractionPacket;
    const report = validateExtractionPacket(sourceId, packet);

    expect(report.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ outcome: "blocked_source_text_risk" }),
        expect.objectContaining({ outcome: "blocked_stale_metadata" }),
      ]),
    );
  });

  it("records review decisions separately from import approval", () => {
    const pdfPath = path.join(tempDir, "source.pdf");
    fs.writeFileSync(pdfPath, "not a real pdf");
    createSourceRun({ sourceId, pdfPath });
    const packetPath = path.join(runDir, "packet", "extraction-packet.json");
    writeJsonFile(packetPath, makePacket());
    updateSourceRun(sourceId, (state) => ({
      ...state,
      artifact_paths: {
        ...state.artifact_paths,
        extractionPacket: packetPath,
      },
      extracted_candidate_count: 1,
    }));

    initializeReviewQueue(sourceId);
    recordReviewDecision({
      sourceId,
      candidateId: "candidate.unit_test.ritual",
      disposition: "approved_for_mechanical_import",
      directUseTarget: "yes",
      recommendationTarget: "later_review",
      notes: "Import and make findable, but hold recommendations.",
    });

    const state = readSourceRun(sourceId);
    expect(state.approved_for_import_count).toBe(1);
    expect(state.direct_use_count).toBe(1);
    expect(state.recommendable_count).toBe(0);
    expect(state.open_review_items).toEqual([]);
  });
});
