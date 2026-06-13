import { readFileSync } from "node:fs";

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestContext,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest";

const PROJECT_ID = "moon-and-table-firestore-rules";

let testEnv: RulesTestEnvironment;

function memberContext(): RulesTestContext {
  return testEnv.authenticatedContext("person-a-uid", {
    email: "person_a@example.com",
  });
}

function otherContext(): RulesTestContext {
  return testEnv.authenticatedContext("other-uid", {
    email: "other@example.com",
  });
}

function anonymousContext(): RulesTestContext {
  return testEnv.unauthenticatedContext();
}

async function seedBaseData(): Promise<void> {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    await setDoc(doc(db, "households/household-a"), {
      id: "household-a",
      ownerUserId: "person-a-uid",
      memberUserIds: ["person-a-uid"],
      memberEmails: ["person_a@example.com"],
    });

    await setDoc(doc(db, "households/household-b"), {
      id: "household-b",
      ownerUserId: "other-uid",
      memberUserIds: ["other-uid"],
      memberEmails: ["other@example.com"],
    });

    await setDoc(doc(db, "rituals/findable-ritual"), {
      id: "findable-ritual",
      schemaVersion: "ritual-db-v1",
      publishedVersionId: "findable-ritual__v001",
      lifecycle: {
        findable: true,
        directUseEligible: true,
        recommendationEligible: false,
        recommendable: false,
      },
    });

    await setDoc(doc(db, "ritualVersions/findable-ritual__v001"), {
      id: "findable-ritual__v001",
      ritualId: "findable-ritual",
      versionId: "findable-ritual__v001",
      schemaVersion: "ritual-db-v1",
      ritual: {
        id: "findable-ritual",
        presentation: {
          headline: "Findable Ritual",
        },
      },
    });

    await setDoc(doc(db, "rituals/held-ritual"), {
      id: "held-ritual",
      schemaVersion: "ritual-db-v1",
      publishedVersionId: "held-ritual__v001",
      lifecycle: {
        findable: false,
        directUseEligible: false,
        recommendationEligible: false,
        recommendable: false,
      },
    });

    await setDoc(doc(db, "ritualVersions/held-ritual__v001"), {
      id: "held-ritual__v001",
      ritualId: "held-ritual",
      versionId: "held-ritual__v001",
      schemaVersion: "ritual-db-v1",
    });
  });
}

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: readFileSync("firestore.rules", "utf8"),
    },
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
  await seedBaseData();
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe("Firestore Ritual content rules", () => {
  it("allow authenticated reads of published findable Ritual pointers and versions", async () => {
    const db = memberContext().firestore();

    await assertSucceeds(getDoc(doc(db, "rituals/findable-ritual")));
    await assertSucceeds(getDoc(doc(db, "ritualVersions/findable-ritual__v001")));
  });

  it("allow constrained queries for findable Ritual pointers", async () => {
    const db = memberContext().firestore();

    await assertSucceeds(
      getDocs(
        query(
          collection(db, "rituals"),
          where("schemaVersion", "==", "ritual-db-v1"),
          where("lifecycle.findable", "==", true),
        ),
      ),
    );
  });

  it("deny broad Ritual pointer and version collection reads", async () => {
    const db = memberContext().firestore();

    await assertFails(getDocs(collection(db, "rituals")));
    await assertFails(getDocs(collection(db, "ritualVersions")));
  });

  it("deny unauthenticated and non-findable Ritual content reads", async () => {
    const unauthenticatedDb = anonymousContext().firestore();
    const memberDb = memberContext().firestore();

    await assertFails(getDoc(doc(unauthenticatedDb, "rituals/findable-ritual")));
    await assertFails(getDoc(doc(memberDb, "rituals/held-ritual")));
    await assertFails(getDoc(doc(memberDb, "ritualVersions/held-ritual__v001")));
  });

  it("deny client writes to canonical Ritual content", async () => {
    const db = memberContext().firestore();

    await assertFails(
      setDoc(doc(db, "rituals/new-ritual"), {
        id: "new-ritual",
        schemaVersion: "ritual-db-v1",
      }),
    );

    await assertFails(
      updateDoc(doc(db, "rituals/findable-ritual"), {
        "lifecycle.recommendationEligible": true,
      }),
    );

    await assertFails(
      setDoc(doc(db, "ritualVersions/new-ritual__v001"), {
        id: "new-ritual__v001",
        ritualId: "new-ritual",
        versionId: "new-ritual__v001",
        schemaVersion: "ritual-db-v1",
      }),
    );
  });

  it("deny client access to lifecycle, import, review, validation, and audit records", async () => {
    const db = memberContext().firestore();

    await assertFails(setDoc(doc(db, "sourceRuns/source-run-a"), { id: "source-run-a" }));
    await assertFails(setDoc(doc(db, "importBatches/import-batch-a"), { id: "import-batch-a" }));
    await assertFails(setDoc(doc(db, "reviewDecisions/review-a"), { id: "review-a" }));
    await assertFails(
      setDoc(doc(db, "ritualValidationSnapshots/snapshot-a"), { id: "snapshot-a" }),
    );
    await assertFails(setDoc(doc(db, "ritualAuditEvents/audit-a"), { id: "audit-a" }));
  });
});

describe("Firestore household Ritual state rules", () => {
  it("allow household members to write and read favorites, recommendation instances, feedback events, and history", async () => {
    const db = memberContext().firestore();

    await assertSucceeds(
      setDoc(doc(db, "households/household-a/ritualFavorites/findable-ritual"), {
        householdId: "household-a",
        ritualId: "findable-ritual",
        active: true,
        createdAtIso: "2026-06-13T00:00:00.000Z",
      }),
    );

    await assertSucceeds(
      setDoc(doc(db, "households/household-a/recommendationInstances/instance-a"), {
        householdId: "household-a",
        id: "instance-a",
        selectedRitualId: "findable-ritual",
        selectedVersionId: "findable-ritual__v001",
        createdAtIso: "2026-06-13T00:00:00.000Z",
      }),
    );

    await assertSucceeds(
      setDoc(doc(db, "households/household-a/ritualInteractionEvents/event-a"), {
        householdId: "household-a",
        id: "event-a",
        ritualId: "findable-ritual",
        eventType: "feedback_submitted",
        feedback: {
          fit: "fit",
          reasons: ["right_ritual"],
        },
        createdAtIso: "2026-06-13T00:00:00.000Z",
      }),
    );

    await assertSucceeds(
      setDoc(doc(db, "households/household-a/ritualHistory/history-a"), {
        householdId: "household-a",
        id: "history-a",
        ritualId: "findable-ritual",
        createdAtIso: "2026-06-13T00:00:00.000Z",
      }),
    );

    await assertSucceeds(
      getDocs(collection(db, "households/household-a/ritualFavorites")),
    );
  });

  it("deny unauthenticated and cross-household state access", async () => {
    const unauthenticatedDb = anonymousContext().firestore();
    const otherDb = otherContext().firestore();

    await assertFails(
      setDoc(doc(unauthenticatedDb, "households/household-a/ritualFavorites/findable-ritual"), {
        householdId: "household-a",
        ritualId: "findable-ritual",
        active: true,
      }),
    );

    await assertFails(
      setDoc(doc(otherDb, "households/household-a/ritualFavorites/findable-ritual"), {
        householdId: "household-a",
        ritualId: "findable-ritual",
        active: true,
      }),
    );

    await assertFails(
      getDoc(doc(otherDb, "households/household-a/ritualFavorites/findable-ritual")),
    );
  });

  it("deny household state writes with mismatched ids or private/source residue fields", async () => {
    const db = memberContext().firestore();

    await assertFails(
      setDoc(doc(db, "households/household-a/ritualFavorites/findable-ritual"), {
        householdId: "household-b",
        ritualId: "findable-ritual",
        active: true,
      }),
    );

    await assertFails(
      setDoc(doc(db, "households/household-a/ritualFavorites/findable-ritual"), {
        householdId: "household-a",
        ritualId: "other-ritual",
        active: true,
      }),
    );

    await assertFails(
      setDoc(doc(db, "households/household-a/ritualInteractionEvents/event-a"), {
        householdId: "household-a",
        id: "event-a",
        ritualId: "findable-ritual",
        eventType: "feedback_submitted",
        privateSourceText: "not allowed here",
      }),
    );
  });

  it("allow household members to remove household state without allowing canonical deletion", async () => {
    const db = memberContext().firestore();

    await assertSucceeds(
      setDoc(doc(db, "households/household-a/ritualFavorites/findable-ritual"), {
        householdId: "household-a",
        ritualId: "findable-ritual",
        active: true,
      }),
    );

    await assertSucceeds(
      deleteDoc(doc(db, "households/household-a/ritualFavorites/findable-ritual")),
    );
    await assertFails(deleteDoc(doc(db, "rituals/findable-ritual")));
  });
});
