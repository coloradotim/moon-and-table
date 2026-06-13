import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import {
  getFirestore,
  type Firestore,
  type WriteBatch,
} from "firebase-admin/firestore";

import {
  createRitualDbBackfillBackupArtifact,
  createRitualDbBackfillReport,
  formatRitualDbBackfillReport,
  isRitualDbBackfillReportSuccessful,
  type ExistingRitualDbBackfillSnapshot,
  type RitualDbBackfillBackupArtifact,
} from "../src/data/rituals/db-backfill";
import { createSourceBackedRitualDbMirrorDryRun } from "../src/data/rituals/db-mirror";
import { sourceBackedRituals } from "../src/data/rituals/source-backed-rituals";
import type {
  RitualAuditEventDocument,
  RitualDocument,
  RitualValidationSnapshotDocument,
  RitualVersionDocument,
} from "../src/data/rituals/db-documents";

const BACKFILL_DIR = ".moon-table-private/ritual-backfills";
const MAX_BATCH_WRITES = 450;

type BackfillCollection =
  | "rituals"
  | "ritualVersions"
  | "ritualValidationSnapshots"
  | "ritualAuditEvents";

function hasFlag(flag: string): boolean {
  return process.argv.slice(2).includes(flag);
}

function getArgValue(name: string): string | undefined {
  const prefix = `${name}=`;
  const value = process.argv.slice(2).find((arg) => arg.startsWith(prefix));

  return value ? value.slice(prefix.length) : undefined;
}

async function readJsonFile(path: string): Promise<unknown> {
  const file = await readFile(path, "utf8");
  return JSON.parse(file) as unknown;
}

async function readLocalEnvValue(key: string): Promise<string | undefined> {
  try {
    const envFile = await readFile(resolve(".env.local"), "utf8");
    const line = envFile
      .split(/\r?\n/)
      .find((candidate) => candidate.trim().startsWith(`${key}=`));

    return line?.slice(key.length + 1).trim().replace(/^["']|["']$/g, "");
  } catch {
    return undefined;
  }
}

async function initializeAdminApp(): Promise<void> {
  if (getApps().length > 0) {
    return;
  }

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  const projectId =
    process.env.FIREBASE_PROJECT_ID ??
    process.env.GCLOUD_PROJECT ??
    (await readLocalEnvValue("VITE_FIREBASE_PROJECT_ID"));

  if (serviceAccountPath) {
    const serviceAccount = await readJsonFile(resolve(serviceAccountPath));

    initializeApp({
      credential: cert(serviceAccount as Parameters<typeof cert>[0]),
      projectId,
    });
    return;
  }

  initializeApp({
    credential: applicationDefault(),
    projectId,
  });
}

function getSourceStaticCommitSha(): string {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
    }).trim();
  } catch {
    return "unknown";
  }
}

function getTimestampSlug(iso: string): string {
  return iso.replace(/[:.]/g, "-");
}

async function writeArtifact(path: string, contents: string): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, contents);
}

async function readCollection<T extends { id: string }>(
  db: Firestore,
  collectionName: BackfillCollection,
): Promise<T[]> {
  const snapshot = await db.collection(collectionName).get();

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }) as T);
}

async function readExistingSnapshot(db: Firestore): Promise<ExistingRitualDbBackfillSnapshot> {
  const [
    ritualDocuments,
    versionDocuments,
    validationSnapshots,
    auditEvents,
  ] = await Promise.all([
    readCollection<RitualDocument>(db, "rituals"),
    readCollection<RitualVersionDocument>(db, "ritualVersions"),
    readCollection<RitualValidationSnapshotDocument>(
      db,
      "ritualValidationSnapshots",
    ),
    readCollection<RitualAuditEventDocument>(db, "ritualAuditEvents"),
  ]);

  return {
    ritualDocuments,
    versionDocuments,
    validationSnapshots,
    auditEvents,
  };
}

function setPayloadDocument(
  batch: WriteBatch,
  db: Firestore,
  collectionName: BackfillCollection,
  document: { id: string },
): void {
  batch.set(db.collection(collectionName).doc(document.id), document);
}

async function commitBatches(
  db: Firestore,
  backup: RitualDbBackfillBackupArtifact,
): Promise<void> {
  const writes: Array<{
    collectionName: BackfillCollection;
    document: { id: string };
  }> = [
    ...backup.writePayload.ritualDocuments.map((document) => ({
      collectionName: "rituals" as const,
      document,
    })),
    ...backup.writePayload.versionDocuments.map((document) => ({
      collectionName: "ritualVersions" as const,
      document,
    })),
    ...backup.writePayload.validationSnapshots.map((document) => ({
      collectionName: "ritualValidationSnapshots" as const,
      document,
    })),
    ...backup.writePayload.auditEvents.map((document) => ({
      collectionName: "ritualAuditEvents" as const,
      document,
    })),
  ];

  for (let index = 0; index < writes.length; index += MAX_BATCH_WRITES) {
    const batch = db.batch();
    const chunk = writes.slice(index, index + MAX_BATCH_WRITES);

    for (const write of chunk) {
      setPayloadDocument(batch, db, write.collectionName, write.document);
    }

    await batch.commit();
  }
}

async function main(): Promise<void> {
  const writeToFirestore = hasFlag("--write");
  const readFirestore = writeToFirestore || hasFlag("--read-firestore");
  const confirmed = hasFlag("--confirm-production-backfill");
  const generatedAtIso = new Date().toISOString();
  const timestampSlug = getTimestampSlug(generatedAtIso);
  const artifactDir = getArgValue("--artifact-dir") ?? BACKFILL_DIR;
  const backupArtifactPath = `${artifactDir}/${timestampSlug}-ritual-db-backfill.json`;
  const reportPath = `${artifactDir}/${timestampSlug}-ritual-db-backfill-report.md`;
  const sourceStaticCommitSha = getSourceStaticCommitSha();
  const mirrorReport = createSourceBackedRitualDbMirrorDryRun({ generatedAtIso });
  const backup = createRitualDbBackfillBackupArtifact({
    sourceStaticCommitSha,
    generatedAtIso,
    staticRituals: sourceBackedRituals,
    mirrorReport,
  });

  await writeArtifact(backupArtifactPath, `${JSON.stringify(backup, null, 2)}\n`);

  let existingSnapshot: ExistingRitualDbBackfillSnapshot | undefined;

  if (readFirestore) {
    await initializeAdminApp();
    existingSnapshot = await readExistingSnapshot(getFirestore());
  }

  const preWriteReport = createRitualDbBackfillReport({
    sourceStaticCommitSha,
    generatedAtIso,
    staticRituals: sourceBackedRituals,
    mirrorReport,
    backupArtifactPath,
    existingDbSnapshotForConflictCheck: existingSnapshot,
    mode: writeToFirestore ? "pre_write" : readFirestore ? "read_check" : "dry_run",
  });

  await writeArtifact(reportPath, formatRitualDbBackfillReport(preWriteReport));
  process.stdout.write(formatRitualDbBackfillReport(preWriteReport));
  process.stdout.write(`Backup artifact: ${backupArtifactPath}\n`);
  process.stdout.write(`Report artifact: ${reportPath}\n`);

  if (!isRitualDbBackfillReportSuccessful(preWriteReport)) {
    process.exitCode = 1;
    return;
  }

  if (!writeToFirestore) {
    process.stdout.write(
      "\nDry run only. Pass --write --confirm-production-backfill to write Firestore.\n",
    );
    return;
  }

  if (!confirmed) {
    process.stderr.write(
      "\nRefusing to write Firestore without --confirm-production-backfill.\n",
    );
    process.exitCode = 1;
    return;
  }

  const db = getFirestore();

  await commitBatches(db, backup);

  const postWriteSnapshot = await readExistingSnapshot(db);
  const postWriteReport = createRitualDbBackfillReport({
    sourceStaticCommitSha,
    generatedAtIso,
    staticRituals: sourceBackedRituals,
    mirrorReport,
    backupArtifactPath,
    dbSnapshotForParity: postWriteSnapshot,
    existingDbSnapshotForConflictCheck: postWriteSnapshot,
    mode: "post_write",
  });
  const postWriteReportPath =
    `${artifactDir}/${timestampSlug}-ritual-db-backfill-post-write-report.md`;

  await writeArtifact(postWriteReportPath, formatRitualDbBackfillReport(postWriteReport));
  process.stdout.write("\nPost-write verification\n");
  process.stdout.write(formatRitualDbBackfillReport(postWriteReport));
  process.stdout.write(`Post-write report artifact: ${postWriteReportPath}\n`);

  if (!isRitualDbBackfillReportSuccessful(postWriteReport)) {
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);

  console.error(`Ritual DB backfill failed: ${message}`);
  process.exitCode = 1;
});
