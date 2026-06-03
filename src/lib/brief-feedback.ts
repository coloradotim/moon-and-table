import {
  addDoc,
  collection,
  type Firestore,
} from "firebase/firestore";

import type { WeeklyBrief } from "./generate-weekly-brief";

export const BRIEF_FEEDBACK_TYPES = [
  "good",
  "too_much",
  "too_generic",
  "more_like_this",
  "not_this_style",
  "skipped",
  "try_again",
] as const;

export type BriefFeedbackType = (typeof BRIEF_FEEDBACK_TYPES)[number];

export type BriefFeedbackInput = {
  feedbackType: BriefFeedbackType;
  brief: WeeklyBrief;
  userId: string;
  userEmail?: string | null;
  householdId?: string;
  note?: string;
  createdAtIso?: string;
};

export type BriefFeedbackDocument = {
  userId: string;
  userEmail?: string;
  householdId?: string;
  briefId: string;
  feedbackType: BriefFeedbackType;
  symbolicCardKeys: string[];
  ritualPatternKeys: string[];
  timingFactKeys: string[];
  capacityMode: string;
  audience: string;
  sourceReviewIds: string[];
  sourceNoteIds: string[];
  note?: string;
  createdAtIso: string;
};

export function isBriefFeedbackType(value: string): value is BriefFeedbackType {
  return BRIEF_FEEDBACK_TYPES.includes(value as BriefFeedbackType);
}

export function buildBriefFeedbackDocument(
  input: BriefFeedbackInput,
): BriefFeedbackDocument {
  const document: BriefFeedbackDocument = {
    userId: input.userId,
    briefId: input.brief.briefKey,
    feedbackType: input.feedbackType,
    symbolicCardKeys: input.brief.trace.symbolicCards,
    ritualPatternKeys: input.brief.trace.ritualPatterns,
    timingFactKeys: input.brief.trace.timingFacts,
    capacityMode: input.brief.trace.capacityMode,
    audience: input.brief.trace.audience,
    sourceReviewIds: input.brief.trace.sourceReviewIds,
    sourceNoteIds: input.brief.trace.sourceNoteIds,
    createdAtIso: input.createdAtIso ?? new Date().toISOString(),
  };

  if (input.userEmail) {
    document.userEmail = input.userEmail;
  }

  if (input.householdId) {
    document.householdId = input.householdId;
  }

  if (input.note && input.note.trim().length > 0) {
    document.note = input.note.trim();
  }

  return document;
}

export async function saveBriefFeedback(
  db: Firestore,
  input: BriefFeedbackInput,
): Promise<void> {
  await addDoc(collection(db, "feedback"), buildBriefFeedbackDocument(input));
}
