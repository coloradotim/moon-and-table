import { describe, expect, it } from "vitest";

import {
  getNatalContactsForTimingFacts,
  type NatalContact,
} from "../../src/lib/private-natal-contacts";
import type { PrivateNatalProfile } from "../../src/lib/private-data-schema";
import type { TimingFact, ZodiacSign } from "../../src/lib/timing-facts";

const baseFact = {
  exactIso: "2026-06-21T00:00:00.000Z",
  timezone: "UTC",
  computedBy: "manual" as const,
  confidence: "manual" as const,
};

function transitFact({
  body,
  sign,
  degree,
  longitude,
}: {
  body: "sun" | "moon" | "mercury" | "venus" | "mars";
  sign: ZodiacSign;
  degree: number;
  longitude: number;
}): TimingFact {
  if (body === "sun") {
    return {
      ...baseFact,
      id: "fake.timing.sun",
      type: "sun_sign",
      label: "Sun fake position",
      sign,
      degree,
      eclipticLongitudeDegrees: longitude,
    };
  }

  if (body === "moon") {
    return {
      ...baseFact,
      id: "fake.timing.moon",
      type: "moon_sign",
      label: "Moon fake position",
      sign,
      degree,
      eclipticLongitudeDegrees: longitude,
    };
  }

  return {
    ...baseFact,
    id: `fake.timing.${body}`,
    type: "planet_sign",
    label: `${body} fake position`,
    planet: body,
    sign,
    degree,
    eclipticLongitudeDegrees: longitude,
  };
}

const fakeProfile: PrivateNatalProfile = {
  personKey: "person_a",
  profileThemeKeys: ["fake_profile_theme"],
  placements: [
    {
      bodyOrPoint: "moon",
      sign: "virgo",
      themeKeys: ["practical_care"],
    },
  ],
};

function contactSummary(contacts: NatalContact[]): string[] {
  return contacts.map((contact) =>
    [
      contact.personKey,
      contact.transitingBody,
      contact.contactType,
      contact.aspectType,
      contact.natalBodyOrPoint,
      contact.orbDegrees,
    ]
      .filter((part) => part !== undefined)
      .join("."),
  );
}

describe("private natal contacts", () => {
  it("detects same-sign resonance", () => {
    const contacts = getNatalContactsForTimingFacts({
      timingFacts: [
        transitFact({
          body: "moon",
          sign: "virgo",
          degree: 12,
          longitude: 162,
        }),
      ],
      natalProfiles: [fakeProfile],
    });

    expect(contacts).toEqual([
      expect.objectContaining({
        personKey: "person_a",
        transitingBody: "moon",
        natalBodyOrPoint: "moon",
        contactType: "same_sign",
        transitSign: "virgo",
        natalSign: "virgo",
        strength: "accent",
        visibility: "balanced",
        themeKeys: expect.arrayContaining([
          "fake_profile_theme",
          "practical_care",
          "private_natal_contact",
        ]),
      }),
    ]);
  });

  it("does not create same-sign contacts for non-matching signs without degrees", () => {
    const contacts = getNatalContactsForTimingFacts({
      timingFacts: [
        transitFact({
          body: "moon",
          sign: "leo",
          degree: 12,
          longitude: 132,
        }),
      ],
      natalProfiles: [fakeProfile],
    });

    expect(contacts).toEqual([]);
  });

  it("detects close conjunctions within the conservative orb", () => {
    const contacts = getNatalContactsForTimingFacts({
      timingFacts: [
        transitFact({
          body: "venus",
          sign: "leo",
          degree: 11,
          longitude: 131,
        }),
      ],
      natalProfiles: [
        {
          personKey: "person_b",
          placements: [
            {
              bodyOrPoint: "ascendant",
              sign: "leo",
              degree: 13,
              themeKeys: ["visible_warmth"],
            },
          ],
        },
      ],
    });

    expect(contacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          personKey: "person_b",
          transitingBody: "venus",
          natalBodyOrPoint: "ascendant",
          contactType: "near_conjunction",
          aspectType: "conjunction",
          orbDegrees: 2,
          themeKeys: expect.arrayContaining(["visible_warmth"]),
        }),
      ]),
    );
  });

  it("does not detect conjunctions outside the conservative orb", () => {
    const contacts = getNatalContactsForTimingFacts({
      timingFacts: [
        transitFact({
          body: "venus",
          sign: "leo",
          degree: 9,
          longitude: 129,
        }),
      ],
      natalProfiles: [
        {
          personKey: "person_b",
          placements: [
            {
              bodyOrPoint: "venus",
              sign: "leo",
              degree: 13,
            },
          ],
        },
      ],
    });

    expect(contactSummary(contacts)).not.toContain(
      "person_b.venus.near_conjunction.conjunction.venus.4",
    );
  });

  it("detects square, trine, opposition, and sextile contacts with fake placements", () => {
    const contacts = getNatalContactsForTimingFacts({
      timingFacts: [
        transitFact({
          body: "mercury",
          sign: "cancer",
          degree: 10,
          longitude: 100,
        }),
      ],
      natalProfiles: [
        {
          personKey: "person_a",
          placements: [
            { bodyOrPoint: "mars", sign: "libra", degree: 10 },
            { bodyOrPoint: "venus", sign: "scorpio", degree: 10 },
            { bodyOrPoint: "sun", sign: "capricorn", degree: 10 },
            { bodyOrPoint: "saturn", sign: "taurus", degree: 10 },
          ],
        },
      ],
    });

    expect(contacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          contactType: "major_aspect",
          aspectType: "square",
          natalBodyOrPoint: "mars",
        }),
        expect.objectContaining({
          contactType: "major_aspect",
          aspectType: "trine",
          natalBodyOrPoint: "venus",
        }),
        expect.objectContaining({
          contactType: "major_aspect",
          aspectType: "opposition",
          natalBodyOrPoint: "sun",
        }),
        expect.objectContaining({
          contactType: "major_aspect",
          aspectType: "sextile",
          natalBodyOrPoint: "saturn",
        }),
      ]),
    );
  });

  it("includes person keys and theme keys for every contact", () => {
    const contacts = getNatalContactsForTimingFacts({
      timingFacts: [
        transitFact({
          body: "mars",
          sign: "capricorn",
          degree: 10,
          longitude: 280,
        }),
      ],
      natalProfiles: [
        {
          personKey: "person_a",
          profileThemeKeys: ["structure_and_repair"],
          placements: [
            {
              bodyOrPoint: "sun",
              sign: "capricorn",
              degree: 10,
              themeKeys: ["direct_action"],
            },
          ],
        },
      ],
      options: { visibility: "explicit" },
    });

    expect(contacts.length).toBeGreaterThan(0);
    for (const contact of contacts) {
      expect(contact.personKey).toBe("person_a");
      expect(contact.themeKeys).toEqual(
        expect.arrayContaining([
          "structure_and_repair",
          "direct_action",
          "private_natal_contact",
        ]),
      );
      expect(contact.visibility).toBe("explicit");
    }
  });

  it("handles partial placement data gracefully", () => {
    const contacts = getNatalContactsForTimingFacts({
      timingFacts: [
        transitFact({
          body: "sun",
          sign: "cancer",
          degree: 0,
          longitude: 90,
        }),
      ],
      natalProfiles: [
        {
          personKey: "person_a",
          placements: [
            {
              bodyOrPoint: "moon",
              sign: "cancer",
            },
          ],
        },
      ],
    });

    expect(contacts).toEqual([
      expect.objectContaining({
        contactType: "same_sign",
        natalDegree: undefined,
        orbDegrees: undefined,
      }),
    ]);
  });

  it("is deterministic for fixed fake timing facts and profiles", () => {
    const input = {
      timingFacts: [
        transitFact({
          body: "moon",
          sign: "virgo",
          degree: 12,
          longitude: 162,
        }),
      ],
      natalProfiles: [fakeProfile],
    };

    expect(getNatalContactsForTimingFacts(input)).toEqual(
      getNatalContactsForTimingFacts(input),
    );
  });

  it("keeps fixtures free of real private data", () => {
    const serialized = JSON.stringify({
      fakeProfile,
      contacts: getNatalContactsForTimingFacts({
        timingFacts: [
          transitFact({
            body: "moon",
            sign: "virgo",
            degree: 12,
            longitude: 162,
          }),
        ],
        natalProfiles: [fakeProfile],
      }),
    }).toLowerCase();

    expect(serialized).not.toContain("birth");
    expect(serialized).not.toContain("email");
    expect(serialized).not.toContain("jessica");
    expect(serialized).not.toContain("tim");
    expect(serialized).not.toContain("relationship");
    expect(serialized).not.toContain("schedule");
  });
});
