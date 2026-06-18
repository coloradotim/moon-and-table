import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "node:fs";

import {
  createAdminFirestoreRitualEditDraftStore,
  type AdminFirestoreRitualEditDraftDb,
} from "../src/data/rituals/ritual-edit-drafts";
import {
  handleRitualEditDraftApi,
  type RitualEditDraftApiRequest,
  type RitualEditDraftApiResponse,
} from "../src/server/ritual-edit-draft-api";
import type { RitualVersionDocument } from "../src/data/rituals/db-documents";

type VercelRequest = RitualEditDraftApiRequest;
type VercelResponse = RitualEditDraftApiResponse;

async function getRitualVersionDocumentByVersionId(
  db: ReturnType<typeof getFirestore>,
  versionId: string,
): Promise<RitualVersionDocument | undefined> {
  const collection = db.collection("ritualVersions");
  const directSnapshot = await collection.doc(versionId).get();

  if (directSnapshot.exists) {
    return directSnapshot.data() as RitualVersionDocument;
  }

  const querySnapshot = await collection
    .where("versionId", "==", versionId)
    .limit(1)
    .get();
  const matchingSnapshot = querySnapshot.docs[0];

  return matchingSnapshot
    ? matchingSnapshot.data() as RitualVersionDocument
    : undefined;
}

function getServiceAccount(): object | undefined {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (json) {
    return JSON.parse(json) as object;
  }

  if (base64) {
    return JSON.parse(Buffer.from(base64, "base64").toString("utf8")) as object;
  }

  if (path) {
    return JSON.parse(readFileSync(path, "utf8")) as object;
  }

  return undefined;
}

function initializeFirebaseAdmin(): void {
  if (getApps().length > 0) {
    return;
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID ??
    process.env.GCLOUD_PROJECT ??
    process.env.VITE_FIREBASE_PROJECT_ID;
  const serviceAccount = getServiceAccount();

  initializeApp({
    credential: serviceAccount ? cert(serviceAccount) : applicationDefault(),
    projectId,
  });
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> {
  initializeFirebaseAdmin();
  const db = getFirestore();

  await handleRitualEditDraftApi(request, response, {
    verifyIdToken: async (idToken) => {
      const decoded = await getAuth().verifyIdToken(idToken);

      return {
        uid: decoded.uid,
        email: typeof decoded.email === "string" ? decoded.email : undefined,
      };
    },
    draftStore: createAdminFirestoreRitualEditDraftStore(
      db as unknown as AdminFirestoreRitualEditDraftDb,
    ),
    getRitualVersionDocument: (versionId) =>
      getRitualVersionDocumentByVersionId(db, versionId),
    authorize: () => true,
  });
}
