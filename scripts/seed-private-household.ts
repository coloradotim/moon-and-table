import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { cert, getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import { parsePrivateHouseholdSeed } from "../src/lib/private-seed";
import { getPrivateEmailDocumentId } from "../src/lib/private-data-schema";
import type { PrivateHouseholdSeedProfile } from "../src/lib/private-seed";

const DEFAULT_SEED_PATH = "private/household.seed.local.json";
const COMMON_SEED_PATH_TYPO = "private/household.see.local.json";

type ResolvedProfile = {
  profile: PrivateHouseholdSeedProfile;
  profileId: string;
  uid?: string;
};

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

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
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

async function resolveProfiles(
  householdId: string,
  profiles: PrivateHouseholdSeedProfile[],
): Promise<ResolvedProfile[]> {
  const auth = getAuth();

  return Promise.all(
    profiles.map(async (profile) => {
      const stableProfileId = `${householdId}_${profile.personKey}`.replace(
        /[^A-Za-z0-9_-]/g,
        "_",
      );

      try {
        const user = await auth.getUserByEmail(profile.email);

        return {
          profile,
          profileId: user.uid,
          uid: user.uid,
        };
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          error.code === "auth/user-not-found"
        ) {
          return {
            profile,
            profileId: stableProfileId,
          };
        }

        throw error;
      }
    }),
  );
}

async function seedPrivateHousehold(seedPath: string): Promise<void> {
  const seed = parsePrivateHouseholdSeed(await readJsonFile(seedPath));

  await initializeAdminApp();

  const db = getFirestore();
  const resolvedProfiles = await resolveProfiles(seed.household.id, seed.profiles);
  const nowIso = new Date().toISOString();
  const memberUserIds = resolvedProfiles.flatMap((resolvedProfile) =>
    resolvedProfile.uid ? [resolvedProfile.uid] : [],
  );
  const ownerUserId = memberUserIds[0] ?? null;

  const batch = db.batch();
  const householdRef = db.collection("households").doc(seed.household.id);

  batch.set(
    householdRef,
    {
      id: seed.household.id,
      ownerUserId,
      memberUserIds,
      memberEmails: seed.household.memberEmails,
      defaultCapacityMode: seed.household.defaultCapacityMode,
      maxRitualDurationMinutes: seed.household.maxRitualDurationMinutes,
      preferredRitualStyles: seed.household.preferredRitualStyles,
      avoidedRitualStyles: seed.household.avoidedRitualStyles,
      astrologyVisibility: seed.household.astrologyVisibility,
      updatedAtIso: nowIso,
    },
    { merge: true },
  );

  for (const { profile, profileId, uid } of resolvedProfiles) {
    const profileRef = db.collection("profiles").doc(profileId);
    const capacityRef = db.collection("capacitySettings").doc(profileId);
    const scheduleRef = db.collection("scheduleConstraints").doc(profileId);
    const linkRef = db
      .collection("profileEmailLinks")
      .doc(getPrivateEmailDocumentId(profile.email));
    const schedule = {
      ...seed.household.scheduleConstraints,
      ...profile.scheduleConstraints,
    };
    const defaultCapacityMode =
      profile.defaultCapacityMode ?? seed.household.defaultCapacityMode;
    const maxRitualDurationMinutes =
      profile.maxRitualDurationMinutes ?? seed.household.maxRitualDurationMinutes;

    batch.set(
      profileRef,
      {
        id: profileId,
        personKey: profile.personKey,
        householdId: seed.household.id,
        userId: uid ?? null,
        email: profile.email,
        profileThemeKeys: profile.profileThemeKeys,
        preferredRitualStyles:
          profile.preferredRitualStyles ?? seed.household.preferredRitualStyles,
        avoidedRitualStyles:
          profile.avoidedRitualStyles ?? seed.household.avoidedRitualStyles,
        assumptions: profile.assumptions,
        astrologyProfile: profile.astrologyProfile,
        updatedAtIso: nowIso,
      },
      { merge: true },
    );

    batch.set(
      capacityRef,
      {
        id: profileId,
        householdId: seed.household.id,
        userId: uid ?? null,
        email: profile.email,
        defaultCapacityMode,
        maxRitualDurationMinutes,
        updatedAtIso: nowIso,
      },
      { merge: true },
    );

    batch.set(
      scheduleRef,
      {
        id: profileId,
        householdId: seed.household.id,
        userId: uid ?? null,
        email: profile.email,
        ...schedule,
        maxRitualDurationMinutes,
        defaultCapacityMode,
        updatedAtIso: nowIso,
      },
      { merge: true },
    );

    batch.set(
      linkRef,
      {
        id: getPrivateEmailDocumentId(profile.email),
        email: profile.email,
        householdId: seed.household.id,
        profileId,
        userId: uid ?? null,
        status: uid ? "linked" : "pending",
        updatedAtIso: nowIso,
      },
      { merge: true },
    );
  }

  await batch.commit();

  console.log(
    `Seeded household ${seed.household.id} for ${resolvedProfiles.length} profile(s), including ${resolvedProfiles.filter((profile) => !profile.uid).length} pending profile(s).`,
  );
}

async function resolveSeedPath(): Promise<string> {
  const providedPath = process.argv[2];

  if (providedPath) {
    return resolve(providedPath);
  }

  const defaultPath = resolve(DEFAULT_SEED_PATH);

  if (await fileExists(defaultPath)) {
    return defaultPath;
  }

  const typoPath = resolve(COMMON_SEED_PATH_TYPO);

  if (await fileExists(typoPath)) {
    console.warn(
      `Using ${COMMON_SEED_PATH_TYPO}. Rename it to ${DEFAULT_SEED_PATH} when convenient.`,
    );
    return typoPath;
  }

  return defaultPath;
}

resolveSeedPath().then(seedPrivateHousehold).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Private seed failed: ${message}`);
  process.exitCode = 1;
});
