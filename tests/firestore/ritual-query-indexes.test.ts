import { readFileSync } from "node:fs";

import {
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestContext,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

const PROJECT_ID = "moon-and-table-firestore-query-indexes";
const createdAt = "2026-06-13T00:00:00.000Z";
const firestoreIndexes = JSON.parse(
  readFileSync("firestore.indexes.json", "utf8"),
) as {
  indexes: Array<{
    collectionGroup: string;
    queryScope: string;
    fields: Array<{
      fieldPath: string;
      order?: string;
      arrayConfig?: string;
    }>;
  }>;
};

let testEnv: RulesTestEnvironment;

function memberContext(): RulesTestContext {
  return testEnv.authenticatedContext("person-a-uid", {
    email: "person_a@example.com",
  });
}

function ritualSchemaVersionConstraint() {
  return where("schemaVersion", "==", "ritual-db-v1");
}

function findablePointer(input: {
  id: string;
  headlineKey: string;
  directUseEligible: boolean;
  recommendationEligible: boolean;
  recommendable: boolean;
  purpose: string;
  carrier: string;
}): Record<string, unknown> {
  return {
    id: input.id,
    schemaVersion: "ritual-db-v1",
    publishedVersionId: `${input.id}__v001`,
    lifecycle: {
      findable: true,
      directUseEligible: input.directUseEligible,
      recommendationEligible: input.recommendationEligible,
      recommendable: input.recommendable,
    },
    origin: {
      type: "source",
      sourceIds: ["source-a"],
    },
    searchIndex: {
      headline: input.headlineKey,
      purposeKeys: [input.purpose],
      carrierKeys: [input.carrier],
      searchTokens: [input.purpose, input.carrier, "table"],
    },
    recommendationIndex: {
      purposeKeys: [input.purpose],
      carrierKeys: [input.carrier],
      audienceKeys: ["me"],
      capacityKeys: ["enough"],
      timingKeys: ["moon:any"],
      eligibilityCells: [
        `purpose:${input.purpose}|carrier:${input.carrier}|audience:me|capacity:enough`,
      ],
    },
    sort: {
      headlineKey: input.headlineKey,
    },
    updatedAtIso: createdAt,
  };
}

async function seedQueryData(): Promise<void> {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    await setDoc(doc(db, "households/household-a"), {
      id: "household-a",
      ownerUserId: "person-a-uid",
      memberUserIds: ["person-a-uid"],
      memberEmails: ["person_a@example.com"],
    });

    await setDoc(
      doc(db, "rituals/findable-direct-ritual"),
      findablePointer({
        id: "findable-direct-ritual",
        headlineKey: "aim the triangle",
        directUseEligible: true,
        recommendationEligible: false,
        recommendable: false,
        purpose: "steadying",
        carrier: "words",
      }),
    );

    await setDoc(
      doc(db, "rituals/recommendable-ritual"),
      findablePointer({
        id: "recommendable-ritual",
        headlineKey: "bank the inner flame",
        directUseEligible: true,
        recommendationEligible: true,
        recommendable: true,
        purpose: "steadying",
        carrier: "candlelight",
      }),
    );

    await setDoc(doc(db, "rituals/hidden-recommendable-ritual"), {
      ...findablePointer({
        id: "hidden-recommendable-ritual",
        headlineKey: "hidden recommendation candidate",
        directUseEligible: true,
        recommendationEligible: true,
        recommendable: true,
        purpose: "steadying",
        carrier: "words",
      }),
      lifecycle: {
        findable: false,
        directUseEligible: true,
        recommendationEligible: true,
        recommendable: true,
      },
    });

    await setDoc(
      doc(db, "households/household-a/ritualFavorites/findable-direct-ritual"),
      {
        householdId: "household-a",
        ritualId: "findable-direct-ritual",
        active: true,
        createdAt,
        updatedAt: "2026-06-13T01:00:00.000Z",
      },
    );

    await setDoc(
      doc(db, "households/household-a/recommendationInstances/instance-a"),
      {
        householdId: "household-a",
        id: "instance-a",
        selectedRitualId: "recommendable-ritual",
        selectedVersionId: "recommendable-ritual__v001",
        surface: "choose_with_me",
        createdAt: "2026-06-13T02:00:00.000Z",
      },
    );

    await setDoc(
      doc(db, "households/household-a/ritualInteractionEvents/feedback-a"),
      {
        householdId: "household-a",
        id: "feedback-a",
        ritualId: "recommendable-ritual",
        recommendationInstanceId: "instance-a",
        eventType: "feedback_submitted",
        surface: "choose_with_me",
        feedback: {
          fit: "fit",
          reasons: ["right_ritual"],
        },
        createdAt: "2026-06-13T03:00:00.000Z",
      },
    );

    await setDoc(
      doc(db, "households/household-a/ritualInteractionEvents/try-another-a"),
      {
        householdId: "household-a",
        id: "try-another-a",
        ritualId: "recommendable-ritual",
        recommendationInstanceId: "instance-a",
        eventType: "try_another_requested",
        surface: "choose_with_me",
        createdAt: "2026-06-13T04:00:00.000Z",
      },
    );
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
  await seedQueryData();
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe("DB Ritual query smoke tests", () => {
  it("queries findable and direct-use Ritual pointers without requiring recommendation eligibility", async () => {
    const db = memberContext().firestore();
    const rituals = collection(db, "rituals");
    const findable = await assertSucceeds(
      getDocs(
        query(
          rituals,
          ritualSchemaVersionConstraint(),
          where("lifecycle.findable", "==", true),
          orderBy("sort.headlineKey", "asc"),
          limit(10),
        ),
      ),
    );
    const directUse = await assertSucceeds(
      getDocs(
        query(
          rituals,
          ritualSchemaVersionConstraint(),
          where("lifecycle.findable", "==", true),
          where("lifecycle.directUseEligible", "==", true),
          orderBy("sort.headlineKey", "asc"),
          limit(10),
        ),
      ),
    );

    expect(findable.docs.map((snapshot) => snapshot.id)).toEqual([
      "findable-direct-ritual",
      "recommendable-ritual",
    ]);
    expect(directUse.docs.map((snapshot) => snapshot.id)).toContain(
      "findable-direct-ritual",
    );
  });

  it("queries search filters from the direct-selection surface", async () => {
    const db = memberContext().firestore();
    const rituals = collection(db, "rituals");

    await assertSucceeds(
      getDocs(
        query(
          rituals,
          ritualSchemaVersionConstraint(),
          where("lifecycle.findable", "==", true),
          where("searchIndex.purposeKeys", "array-contains", "steadying"),
          orderBy("sort.headlineKey", "asc"),
          limit(10),
        ),
      ),
    );
    await assertSucceeds(
      getDocs(
        query(
          rituals,
          ritualSchemaVersionConstraint(),
          where("lifecycle.findable", "==", true),
          where("searchIndex.carrierKeys", "array-contains", "words"),
          orderBy("sort.headlineKey", "asc"),
          limit(10),
        ),
      ),
    );
    await assertSucceeds(
      getDocs(
        query(
          rituals,
          ritualSchemaVersionConstraint(),
          where("lifecycle.findable", "==", true),
          where("lifecycle.recommendationEligible", "==", true),
          where("lifecycle.recommendable", "==", true),
          where("recommendationIndex.carrierKeys", "array-contains", "candlelight"),
          orderBy("sort.headlineKey", "asc"),
          limit(10),
        ),
      ),
    );
    await assertSucceeds(
      getDocs(
        query(
          rituals,
          ritualSchemaVersionConstraint(),
          where("lifecycle.findable", "==", true),
          where("lifecycle.recommendationEligible", "==", true),
          where("lifecycle.recommendable", "==", true),
          where("recommendationIndex.timingKeys", "array-contains", "moon:any"),
          orderBy("sort.headlineKey", "asc"),
          limit(10),
        ),
      ),
    );
    await assertSucceeds(
      getDocs(
        query(
          rituals,
          ritualSchemaVersionConstraint(),
          where("lifecycle.findable", "==", true),
          where("searchIndex.searchTokens", "array-contains", "table"),
          orderBy("sort.headlineKey", "asc"),
          limit(10),
        ),
      ),
    );
  });

  it("queries recommendation candidates only from recommendable Ritual pointers", async () => {
    const db = memberContext().firestore();
    const rituals = collection(db, "rituals");
    const candidates = await assertSucceeds(
      getDocs(
        query(
          rituals,
          ritualSchemaVersionConstraint(),
          where("lifecycle.findable", "==", true),
          where("lifecycle.recommendationEligible", "==", true),
          where("lifecycle.recommendable", "==", true),
          orderBy("sort.headlineKey", "asc"),
          limit(10),
        ),
      ),
    );

    expect(candidates.docs.map((snapshot) => snapshot.id)).toEqual([
      "recommendable-ritual",
    ]);

    await assertSucceeds(
      getDocs(
        query(
          rituals,
          ritualSchemaVersionConstraint(),
          where("lifecycle.findable", "==", true),
          where("lifecycle.recommendationEligible", "==", true),
          where("lifecycle.recommendable", "==", true),
          where("recommendationIndex.purposeKeys", "array-contains", "steadying"),
          orderBy("sort.headlineKey", "asc"),
          limit(10),
        ),
      ),
    );
    await assertSucceeds(
      getDocs(
        query(
          rituals,
          ritualSchemaVersionConstraint(),
          where("lifecycle.findable", "==", true),
          where("lifecycle.recommendationEligible", "==", true),
          where("lifecycle.recommendable", "==", true),
          where(
            "recommendationIndex.eligibilityCells",
            "array-contains",
            "purpose:steadying|carrier:candlelight|audience:me|capacity:enough",
          ),
          orderBy("sort.headlineKey", "asc"),
          limit(10),
        ),
      ),
    );
  });

  it("keeps household memory queries household-scoped and separate from canonical Ritual content", async () => {
    const db = memberContext().firestore();
    const favorites = await assertSucceeds(
      getDocs(
        query(
          collection(db, "households/household-a/ritualFavorites"),
          where("active", "==", true),
          orderBy("updatedAt", "desc"),
          limit(10),
        ),
      ),
    );
    const instances = await assertSucceeds(
      getDocs(
        query(
          collection(db, "households/household-a/recommendationInstances"),
          orderBy("createdAt", "desc"),
          limit(10),
        ),
      ),
    );
    const instancesByRitual = await assertSucceeds(
      getDocs(
        query(
          collection(db, "households/household-a/recommendationInstances"),
          where("selectedRitualId", "==", "recommendable-ritual"),
          orderBy("createdAt", "desc"),
          limit(10),
        ),
      ),
    );
    const feedbackByRitual = await assertSucceeds(
      getDocs(
        query(
          collection(db, "households/household-a/ritualInteractionEvents"),
          where("ritualId", "==", "recommendable-ritual"),
          where("eventType", "==", "feedback_submitted"),
          orderBy("createdAt", "desc"),
          limit(10),
        ),
      ),
    );
    const feedbackByInstance = await assertSucceeds(
      getDocs(
        query(
          collection(db, "households/household-a/ritualInteractionEvents"),
          where("recommendationInstanceId", "==", "instance-a"),
          where("eventType", "==", "feedback_submitted"),
          orderBy("createdAt", "desc"),
          limit(10),
        ),
      ),
    );
    const tryAnotherEvents = await assertSucceeds(
      getDocs(
        query(
          collection(db, "households/household-a/ritualInteractionEvents"),
          where("eventType", "==", "try_another_requested"),
          orderBy("createdAt", "desc"),
          limit(10),
        ),
      ),
    );

    expect(favorites.docs.map((snapshot) => snapshot.id)).toEqual([
      "findable-direct-ritual",
    ]);
    expect(instances.docs.map((snapshot) => snapshot.id)).toEqual(["instance-a"]);
    expect(instancesByRitual.docs.map((snapshot) => snapshot.id)).toEqual([
      "instance-a",
    ]);
    expect(feedbackByRitual.docs.map((snapshot) => snapshot.id)).toEqual([
      "feedback-a",
    ]);
    expect(feedbackByInstance.docs.map((snapshot) => snapshot.id)).toEqual([
      "feedback-a",
    ]);
    expect(tryAnotherEvents.docs.map((snapshot) => snapshot.id)).toEqual([
      "try-another-a",
    ]);
  });

  it("declares collection-group indexes for future household reporting variants", () => {
    expect(
      firestoreIndexes.indexes.some((index) =>
        index.collectionGroup === "ritualFavorites" &&
        index.queryScope === "COLLECTION_GROUP" &&
        index.fields.some((field) => field.fieldPath === "householdId") &&
        index.fields.some((field) => field.fieldPath === "active") &&
        index.fields.some((field) => field.fieldPath === "updatedAt")
      ),
    ).toBe(true);
    expect(
      firestoreIndexes.indexes.some((index) =>
        index.collectionGroup === "ritualInteractionEvents" &&
        index.queryScope === "COLLECTION_GROUP" &&
        index.fields.some((field) => field.fieldPath === "householdId") &&
        index.fields.some((field) => field.fieldPath === "recommendationInstanceId") &&
        index.fields.some((field) => field.fieldPath === "eventType") &&
        index.fields.some((field) => field.fieldPath === "createdAt")
      ),
    ).toBe(true);
  });
});
