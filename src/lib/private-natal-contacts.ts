import type {
  AstrologyVisibility,
  NatalPoint,
  PrivateNatalPlacement,
  PrivateNatalProfile,
  PrivatePersonKey,
} from "./private-data-schema";
import type {
  MajorAspect,
  PlanetName,
  TimingFact,
  ZodiacSign,
} from "./timing-facts";

export type TransitingBody = "sun" | "moon" | PlanetName;

export type NatalContactType =
  | "same_sign"
  | "near_conjunction"
  | "major_aspect"
  | "elemental_resonance"
  | "modality_resonance";

export type NatalContactStrength = "primary" | "supporting" | "accent";

export type NatalContact = {
  personKey: PrivatePersonKey;
  transitingBody: TransitingBody;
  natalBodyOrPoint: NatalPoint;
  contactType: NatalContactType;
  aspectType?: MajorAspect;
  orbDegrees?: number;
  transitSign?: ZodiacSign;
  natalSign?: ZodiacSign;
  transitDegree?: number;
  natalDegree?: number;
  themeKeys: string[];
  strength: NatalContactStrength;
  visibility: AstrologyVisibility;
};

export type NatalContactOptions = {
  orbDegrees?: number;
  transitingBodies?: TransitingBody[];
  visibility?: AstrologyVisibility;
  includeSameSign?: boolean;
  includeNearConjunctions?: boolean;
  includeMajorAspects?: boolean;
};

export type NatalContactInput = {
  timingFacts: TimingFact[];
  natalProfiles: PrivateNatalProfile[];
  options?: NatalContactOptions;
};

type TransitPlacement = {
  body: TransitingBody;
  sign: ZodiacSign;
  degree?: number;
  longitudeDegrees?: number;
};

const DEFAULT_ORB_DEGREES = 3;

const DEFAULT_TRANSITING_BODIES: TransitingBody[] = [
  "sun",
  "moon",
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
];

const ZODIAC_SIGNS: ZodiacSign[] = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

const ASPECT_ANGLES: Record<MajorAspect, number> = {
  conjunction: 0,
  opposition: 180,
  square: 90,
  trine: 120,
  sextile: 60,
};

const BODY_THEME_KEYS: Record<TransitingBody | NatalPoint, string[]> = {
  sun: ["focus_and_visibility"],
  moon: ["care_rhythm"],
  mercury: ["careful_words"],
  venus: ["beauty_and_affection"],
  mars: ["direct_action"],
  jupiter: ["wider_view"],
  saturn: ["structure_and_repair"],
  uranus: ["pattern_shift"],
  neptune: ["softening_and_imagination"],
  pluto: ["deep_release"],
  ascendant: ["embodied_tending"],
  midheaven: ["visible_structure"],
  node: ["directional_theme"],
  chiron: ["gentle_repair"],
};

const SIGN_THEME_KEYS: Record<ZodiacSign, string[]> = {
  aries: ["direct_action"],
  taurus: ["embodied_tending", "steady_care"],
  gemini: ["careful_words"],
  cancer: ["home_and_belonging"],
  leo: ["visible_warmth"],
  virgo: ["practical_care"],
  libra: ["relationship_balance"],
  scorpio: ["quiet_integration"],
  sagittarius: ["wider_view"],
  capricorn: ["structure_and_repair"],
  aquarius: ["pattern_shift"],
  pisces: ["soft_release"],
};

const ASPECT_THEME_KEYS: Record<MajorAspect, string[]> = {
  conjunction: ["focused_contact"],
  opposition: ["balance_and_contrast"],
  square: ["practical_adjustment"],
  trine: ["available_support"],
  sextile: ["small_opening"],
};

function uniqueValues(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

function normalizeDegrees(value: number): number {
  return ((value % 360) + 360) % 360;
}

function shortestAngleDelta(degreesA: number, degreesB: number): number {
  const delta = Math.abs(normalizeDegrees(degreesA - degreesB));

  return delta > 180 ? 360 - delta : delta;
}

function roundDegrees(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function getSignLongitude(sign: ZodiacSign, degree: number): number | undefined {
  const signIndex = ZODIAC_SIGNS.indexOf(sign);

  if (signIndex < 0 || !Number.isFinite(degree) || degree < 0 || degree >= 30) {
    return undefined;
  }

  return signIndex * 30 + degree;
}

function getNatalLongitude(placement: PrivateNatalPlacement): number | undefined {
  return typeof placement.degree === "number"
    ? getSignLongitude(placement.sign, placement.degree)
    : undefined;
}

function getTransitPlacements(
  timingFacts: TimingFact[],
  allowedBodies: Set<TransitingBody>,
): TransitPlacement[] {
  return timingFacts.flatMap((fact): TransitPlacement[] => {
    if (fact.type === "sun_sign" && allowedBodies.has("sun")) {
      return [{
        body: "sun",
        sign: fact.sign,
        degree: fact.degree,
        longitudeDegrees: fact.eclipticLongitudeDegrees,
      }];
    }

    if (fact.type === "moon_sign" && allowedBodies.has("moon")) {
      return [{
        body: "moon",
        sign: fact.sign,
        degree: fact.degree,
        longitudeDegrees: fact.eclipticLongitudeDegrees,
      }];
    }

    if (fact.type === "planet_sign" && allowedBodies.has(fact.planet)) {
      return [{
        body: fact.planet,
        sign: fact.sign,
        degree: fact.degree,
        longitudeDegrees: fact.eclipticLongitudeDegrees,
      }];
    }

    return [];
  });
}

function buildThemeKeys({
  transit,
  natalPlacement,
  natalProfile,
  aspectType,
}: {
  transit: TransitPlacement;
  natalPlacement: PrivateNatalPlacement;
  natalProfile: PrivateNatalProfile;
  aspectType?: MajorAspect;
}): string[] {
  return uniqueValues([
    ...(natalProfile.profileThemeKeys ?? []),
    ...(natalPlacement.themeKeys ?? []),
    ...(BODY_THEME_KEYS[transit.body] ?? []),
    ...(BODY_THEME_KEYS[natalPlacement.bodyOrPoint] ?? []),
    ...(SIGN_THEME_KEYS[transit.sign] ?? []),
    ...(SIGN_THEME_KEYS[natalPlacement.sign] ?? []),
    ...(aspectType ? ASPECT_THEME_KEYS[aspectType] : []),
    "private_natal_contact",
  ]);
}

function makeContact({
  profile,
  transit,
  natalPlacement,
  contactType,
  aspectType,
  orbDegrees,
  visibility,
}: {
  profile: PrivateNatalProfile;
  transit: TransitPlacement;
  natalPlacement: PrivateNatalPlacement;
  contactType: NatalContactType;
  aspectType?: MajorAspect;
  orbDegrees?: number;
  visibility: AstrologyVisibility;
}): NatalContact {
  return {
    personKey: profile.personKey,
    transitingBody: transit.body,
    natalBodyOrPoint: natalPlacement.bodyOrPoint,
    contactType,
    aspectType,
    orbDegrees,
    transitSign: transit.sign,
    natalSign: natalPlacement.sign,
    transitDegree: transit.degree,
    natalDegree: natalPlacement.degree,
    themeKeys: buildThemeKeys({
      transit,
      natalPlacement,
      natalProfile: profile,
      aspectType,
    }),
    strength: contactType === "same_sign" ? "accent" : "supporting",
    visibility: profile.astrologyVisibility ?? visibility,
  };
}

function getAspectContact(
  transitLongitude: number,
  natalLongitude: number,
  orbLimitDegrees: number,
): { aspectType: MajorAspect; orbDegrees: number } | undefined {
  const angle = shortestAngleDelta(transitLongitude, natalLongitude);

  for (const [aspectType, aspectAngle] of Object.entries(ASPECT_ANGLES) as Array<
    [MajorAspect, number]
  >) {
    const orbDegrees = Math.abs(angle - aspectAngle);

    if (orbDegrees <= orbLimitDegrees) {
      return { aspectType, orbDegrees: roundDegrees(orbDegrees) };
    }
  }

  return undefined;
}

function sortContacts(contacts: NatalContact[]): NatalContact[] {
  const bodyOrder = new Map(
    DEFAULT_TRANSITING_BODIES.map((body, index) => [body, index]),
  );
  const contactOrder: Record<NatalContactType, number> = {
    near_conjunction: 0,
    major_aspect: 1,
    same_sign: 2,
    elemental_resonance: 3,
    modality_resonance: 4,
  };

  return [...contacts].sort((a, b) => {
    const personCompare = a.personKey.localeCompare(b.personKey);

    if (personCompare !== 0) {
      return personCompare;
    }

    const bodyCompare =
      (bodyOrder.get(a.transitingBody) ?? 99) -
      (bodyOrder.get(b.transitingBody) ?? 99);

    if (bodyCompare !== 0) {
      return bodyCompare;
    }

    const natalCompare = a.natalBodyOrPoint.localeCompare(b.natalBodyOrPoint);

    if (natalCompare !== 0) {
      return natalCompare;
    }

    return contactOrder[a.contactType] - contactOrder[b.contactType];
  });
}

export function getNatalContactsForTimingFacts({
  timingFacts,
  natalProfiles,
  options = {},
}: NatalContactInput): NatalContact[] {
  const orbDegrees = options.orbDegrees ?? DEFAULT_ORB_DEGREES;
  const visibility = options.visibility ?? "balanced";
  const includeSameSign = options.includeSameSign ?? true;
  const includeNearConjunctions = options.includeNearConjunctions ?? true;
  const includeMajorAspects = options.includeMajorAspects ?? true;
  const transitingBodies = new Set(
    options.transitingBodies ?? DEFAULT_TRANSITING_BODIES,
  );
  const transitPlacements = getTransitPlacements(timingFacts, transitingBodies);
  const contacts: NatalContact[] = [];

  for (const profile of natalProfiles) {
    for (const natalPlacement of profile.placements) {
      const natalLongitude = getNatalLongitude(natalPlacement);

      for (const transit of transitPlacements) {
        if (includeSameSign && transit.sign === natalPlacement.sign) {
          contacts.push(
            makeContact({
              profile,
              transit,
              natalPlacement,
              contactType: "same_sign",
              visibility,
            }),
          );
        }

        if (
          (includeNearConjunctions || includeMajorAspects) &&
          typeof transit.longitudeDegrees === "number" &&
          typeof natalLongitude === "number"
        ) {
          const aspectContact = getAspectContact(
            transit.longitudeDegrees,
            natalLongitude,
            orbDegrees,
          );

          if (!aspectContact) {
            continue;
          }

          if (
            aspectContact.aspectType === "conjunction" &&
            includeNearConjunctions
          ) {
            contacts.push(
              makeContact({
                profile,
                transit,
                natalPlacement,
                contactType: "near_conjunction",
                aspectType: "conjunction",
                orbDegrees: aspectContact.orbDegrees,
                visibility,
              }),
            );
          }

          if (
            aspectContact.aspectType !== "conjunction" &&
            includeMajorAspects
          ) {
            contacts.push(
              makeContact({
                profile,
                transit,
                natalPlacement,
                contactType: "major_aspect",
                aspectType: aspectContact.aspectType,
                orbDegrees: aspectContact.orbDegrees,
                visibility,
              }),
            );
          }
        }
      }
    }
  }

  return sortContacts(contacts);
}
