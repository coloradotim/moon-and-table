import { sourceBackedRituals } from "./source-backed-rituals";
import type { Ritual } from "./types";

export type RitualRepository = {
  getAllRitualsForManager(): Ritual[];
  getFindableDirectUseRitualsForSearch(): Ritual[];
  getRecommendationEligibleRitualsForChooseWithMe(): Ritual[];
  getRitualById(id: string): Ritual | undefined;
};

export function isFindableDirectUseRitual(ritual: Ritual): boolean {
  return ritual.availability.findable && ritual.availability.directUseEligible;
}

export function isRecommendationEligibleRitualForChooseWithMe(
  ritual: Ritual,
): boolean {
  return (
    ritual.status !== "draft" &&
    ritual.availability.recommendationEligible &&
    ritual.recommendationMetadata.eligibility.recommendable
  );
}

export function createStaticRitualRepository(
  rituals: readonly Ritual[] = sourceBackedRituals,
): RitualRepository {
  const ritualList = [...rituals];
  const ritualsById = new Map(ritualList.map((ritual) => [ritual.id, ritual]));

  return {
    getAllRitualsForManager() {
      return [...ritualList];
    },
    getFindableDirectUseRitualsForSearch() {
      return ritualList.filter(isFindableDirectUseRitual);
    },
    getRecommendationEligibleRitualsForChooseWithMe() {
      return ritualList.filter(isRecommendationEligibleRitualForChooseWithMe);
    },
    getRitualById(id: string) {
      return ritualsById.get(id);
    },
  };
}

export const staticRitualRepository = createStaticRitualRepository();
