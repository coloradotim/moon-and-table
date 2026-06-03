import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { parsePrivateHouseholdSeed } from "../../src/lib/private-seed";

function loadExampleSeed(): unknown {
  const seedPath = resolve("docs/examples/household.seed.example.json");
  return JSON.parse(readFileSync(seedPath, "utf8")) as unknown;
}

describe("private household seed validation", () => {
  it("accepts the privacy-safe example seed", () => {
    const seed = parsePrivateHouseholdSeed(loadExampleSeed());

    expect(seed.household.id).toBe("household_placeholder");
    expect(seed.household.memberEmails).toEqual([
      "person_a@example.com",
      "person_b@example.com",
    ]);
    expect(seed.household.defaultCapacityMode).toBe("low");
    expect(seed.profiles).toHaveLength(2);
    expect(seed.profiles[0]?.astrologyProfile.placementKeys).toEqual([
      "placement.sun.placeholder",
    ]);
  });

  it("rejects unsupported capacity modes before seeding", () => {
    const seed = loadExampleSeed();

    if (
      typeof seed !== "object" ||
      seed === null ||
      !("household" in seed) ||
      typeof seed.household !== "object" ||
      seed.household === null
    ) {
      throw new Error("Example seed shape changed");
    }

    (seed.household as Record<string, unknown>).defaultCapacityMode = "tiny";

    expect(() => parsePrivateHouseholdSeed(seed)).toThrow(
      "household.defaultCapacityMode must be one of pause, low, steady, high",
    );
  });

  it("requires each household member email to have a profile", () => {
    const seed = loadExampleSeed();

    if (
      typeof seed !== "object" ||
      seed === null ||
      !("profiles" in seed) ||
      !Array.isArray(seed.profiles)
    ) {
      throw new Error("Example seed shape changed");
    }

    seed.profiles = seed.profiles.slice(0, 1);

    expect(() => parsePrivateHouseholdSeed(seed)).toThrow(
      "household.memberEmails has 1 member email(s) without matching profiles",
    );
  });

  it("rejects malformed emails before Firebase Auth lookup", () => {
    const seed = loadExampleSeed();

    if (
      typeof seed !== "object" ||
      seed === null ||
      !("profiles" in seed) ||
      !Array.isArray(seed.profiles) ||
      typeof seed.profiles[0] !== "object" ||
      seed.profiles[0] === null
    ) {
      throw new Error("Example seed shape changed");
    }

    seed.profiles[0].email = "not-an-email";

    expect(() => parsePrivateHouseholdSeed(seed)).toThrow(
      "profiles[0].email must be an email-like string",
    );
  });

  it("normalizes lightweight local seed metadata", () => {
    const seed = {
      household: {
        id: "household_placeholder",
        memberEmails: ["person_a@example.com"],
        defaultCapacityMode: "low",
        maxRitualDurationMinutes: 5,
        preferredRitualStyles: ["tiny_home_ritual"],
        avoidedRitualStyles: ["large_task_list"],
        astrologyVisibility: "placeholder",
      },
      profiles: [
        {
          personKey: "person_a",
          email: "person_a@example.com",
          profileThemeKeys: ["private_profile.practical_tending"],
          assumptions: [
            {
              key: "assumption.low_overwhelm",
              label: "May prefer low-overwhelm suggestions",
              value: true,
              editability: true,
            },
          ],
          astrologyProfile: {
            source: "manual_entry",
            confidence: "low",
            placementKeys: ["placement.sun.placeholder"],
            profileThemeKeys: ["private_profile.practical_tending"],
          },
        },
      ],
    };

    const parsedSeed = parsePrivateHouseholdSeed(seed);

    expect(parsedSeed.household.astrologyVisibility).toBe("placeholder_keys_only");
    expect(parsedSeed.household.scheduleConstraints).toEqual({
      unavailableDaysOrNights: [],
      preferredRitualWindows: ["schedule.realistic_window_thursday"],
      recurringHouseholdConstraintNotes: [],
      workOrSchoolConstraintNotes: [],
    });
    expect(parsedSeed.profiles[0]?.assumptions[0]).toMatchObject({
      source: "starter_assumption",
      confidence: "low",
      editable: true,
    });
    expect(parsedSeed.profiles[0]?.assumptions[0]?.updatedAtIso).toEqual(
      expect.any(String),
    );
    expect(parsedSeed.profiles[0]?.astrologyProfile.updatedAtIso).toEqual(
      expect.any(String),
    );
  });

  it("normalizes pasted markdown mailto email values", () => {
    const seed = {
      household: {
        id: "household_placeholder",
        memberEmails: ["[person_a@example.com](mailto:person_a@example.com)"],
        defaultCapacityMode: "low",
        maxRitualDurationMinutes: 5,
        preferredRitualStyles: ["tiny_home_ritual"],
        avoidedRitualStyles: ["large_task_list"],
      },
      profiles: [
        {
          personKey: "person_a",
          email: "[person_a@example.com](mailto:person_a@example.com)",
          profileThemeKeys: ["private_profile.practical_tending"],
          assumptions: [
            {
              key: "assumption.low_overwhelm",
              label: "May prefer low-overwhelm suggestions",
              value: true,
            },
          ],
          astrologyProfile: {
            source: "manual_entry",
            confidence: "low",
            placementKeys: ["placement.sun.placeholder"],
            profileThemeKeys: ["private_profile.practical_tending"],
          },
        },
      ],
    };

    const parsedSeed = parsePrivateHouseholdSeed(seed);

    expect(parsedSeed.household.memberEmails).toEqual(["person_a@example.com"]);
    expect(parsedSeed.profiles[0]?.email).toBe("person_a@example.com");
  });

  it("keeps source-controlled seed examples free of private real data", () => {
    const serialized = JSON.stringify(loadExampleSeed()).toLowerCase();

    expect(serialized).not.toContain("birth");
    expect(serialized).not.toContain("natal");
    expect(serialized).not.toContain("relationship details");
    expect(serialized).not.toContain("private source text");
    expect(serialized).not.toContain("gmail.com");
  });
});
