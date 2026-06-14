import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type Firestore,
} from "firebase/firestore";

import type { RitualDbReadDocuments } from "./db-read-adapter";
import type {
  RitualDocument,
  RitualValidationSnapshotDocument,
  RitualVersionDocument,
} from "./db-documents";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function loadRitualDbReadDocumentsFromFirestore(
  db: Firestore,
): Promise<RitualDbReadDocuments> {
  const ritualSnapshot = await getDocs(
    query(
      collection(db, "rituals"),
      where("schemaVersion", "==", "ritual-db-v1"),
      where("lifecycle.findable", "==", true),
    ),
  );
  const ritualDocuments = ritualSnapshot.docs.map((snapshot) =>
    snapshot.data() as RitualDocument
  );
  const publishedVersionIds = ritualDocuments
    .map((ritualDocument) => ritualDocument.publishedVersionId)
    .filter(isNonEmptyString);
  const validationSnapshotIds = ritualDocuments
    .map((ritualDocument) => ritualDocument.latestValidationSnapshotId)
    .filter(isNonEmptyString);
  const versionSnapshots = await Promise.all(
    publishedVersionIds.map((versionId) =>
      getDoc(doc(db, "ritualVersions", versionId))
    ),
  );
  const validationSnapshots = await Promise.all(
    validationSnapshotIds.map((snapshotId) =>
      getDoc(doc(db, "ritualValidationSnapshots", snapshotId))
    ),
  );

  return {
    ritualDocuments,
    versionDocuments: versionSnapshots
      .filter((snapshot) => snapshot.exists())
      .map((snapshot) => snapshot.data() as RitualVersionDocument),
    validationSnapshots: validationSnapshots
      .filter((snapshot) => snapshot.exists())
      .map((snapshot) => snapshot.data() as RitualValidationSnapshotDocument),
  };
}
