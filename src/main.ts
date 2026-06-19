import {
  completeRedirectSignIn,
  signInWithGoogle,
  signOutOfFirebase,
  subscribeToAuthState,
  type AppAuthState,
} from "./lib/auth";
import { getFirebaseServices } from "./lib/firebase";
import {
  dismissPrivateFirstLoginWelcome,
  hasLoadedPrivateData,
  loadPrivateBriefData,
  resolvePrivateBriefData,
  shouldShowPrivateFirstLoginWelcome,
  updatePrivateProfileTuning,
  type PrivateBriefData,
} from "./lib/private-data";
import { type CapacityMode } from "./lib/generate-weekly-brief";
import {
  createInitialRitualCheckInDraft,
  carrierOptions,
  getCapacityModeForEnergy,
  getNextStepAfterAudience,
  getNextStepAfterEnergy,
  getRefinementGroupForPurpose,
  isCheckInAudience,
  isEnergyCapacity,
  isRitualCarrier,
  isRitualPurpose,
  isRitualRefinementOption,
  isTimeScope,
  purposeOptions,
  type CurrentRitualCheckIn,
  type RitualCheckInDraft,
  type RitualCheckInStep,
} from "./lib/current-ritual-check-in";
import {
  getStrongTimingWindowCandidates,
  getTimingWindowCandidates,
  isStrongTimingWindowCandidate,
  type TimingWindowCandidate,
} from "./lib/timing-window-candidates";
import { getDefaultTimingTimezone, getTimingFactsForDate } from "./lib/timing-facts";
import { createTodaysShapeBrief } from "./lib/todays-shape-brief";
import type { AstrologyVisibility } from "./lib/private-data-schema";
import {
  PROFILE_TUNING_ASTROLOGY_VISIBILITY,
  type ProfileTuningFormInput,
  type ProfileTuningProfile,
} from "./lib/profile-tuning";
import {
  renderAppShell,
  renderPrivateFirstLoginWelcomeShell,
  renderPrivateDataLoadingShell,
  renderRitualCheckInLoadingShell,
  renderRitualCheckInShell,
  renderSearchRitualsBody,
  renderSignedInShell,
  type RitualSearchSort,
  type ManageRitualEditorDraftStatus,
  type SignedInView,
} from "./ui/app-shell";
import {
  defaultManageRitualFilters,
  type ManageRitualAvailabilityFilter,
  type ManageRitualFilters,
  type ManageRitualOriginFilter,
  type ManageRitualReadinessFilter,
  type ManageRitualSortDirection,
  type ManageRitualSortKey,
  type ManageRitualStatusFilter,
  type ManageRitualValidationFilter,
} from "./data/rituals/manage-rituals";
import {
  staticRitualRepository,
  type RitualRepository,
} from "./data/rituals/ritual-repository";
import {
  isRitualDbReadFeatureEnabled,
  loadRitualDbReadRepository,
  type RitualDbReadDocuments,
  type RitualDbReadRepositorySource,
} from "./data/rituals/db-read-adapter";
import { loadRitualDbReadDocumentsFromFirestore } from "./data/rituals/db-read-firestore";
import { createRitualDbMirrorDryRun } from "./data/rituals/db-mirror";
import {
  submitRitualReviewAction,
  type SubmitRitualReviewActionResult,
} from "./data/rituals/review-action-client";
import {
  submitRitualEditDraft,
  type SubmitRitualEditDraftResult,
} from "./data/rituals/ritual-edit-draft-client";
import {
  RITUAL_REVIEW_ACTIONS,
  type RitualReviewAction,
} from "./data/rituals/db-review-transactions";
import {
  RITUAL_DRAFT_CHOOSE_PREVIEW_TIMING_SAMPLES,
  type RitualDraftChoosePreviewSampleInput,
} from "./data/rituals/draft-choose-with-me-preview";
import { sourceBackedRituals } from "./data/rituals/source-backed-rituals";
import {
  ritualTimingPresetOptions,
  type RitualTimingFilter,
} from "./data/rituals/search-rituals";
import {
  chooseWithMeRitual,
  type ChooseWithMeRequest,
  type ChooseWithMeResult,
} from "./data/rituals/choose-with-me-selector";
import {
  createRecommendationEventStore,
  createRitualFavoriteStore,
  RITUAL_FAVORITE_SOURCE_SURFACES,
  RITUAL_FEEDBACK_REASONS,
  type RecommendationCandidateInput,
  type RecommendationInstance,
  type RitualFavorite,
  type RitualInteractionEvent,
  type RitualFavoriteSourceSurface,
  type RitualFeedbackFit,
  type RitualFeedbackReason,
} from "./data/rituals/household-state";
import {
  loadHouseholdRitualState,
  saveRecommendationInstance,
  saveRitualFavorite,
  saveRitualInteractionEvent,
  type HouseholdRitualStateSkippedRecordCounts,
} from "./data/rituals/household-state-firestore";
import {
  RITUAL_AUDIENCES,
  RITUAL_CAPACITY_MODES,
  RITUAL_CARRIERS,
  RITUAL_PURPOSES,
  RITUAL_TIMING_RELATIONSHIPS,
  type Ritual,
  type RitualAudience,
  type RitualCapacityMode,
} from "./data/rituals/types";
import {
  createDraftFromRitualVersion,
  createInMemoryRitualEditDraftStore,
  saveRitualEditDraft,
  type RitualEditDraftBuffer,
  type RitualEditDraftDocument,
} from "./data/rituals/ritual-edit-drafts";
import {
  validateRitualEditDraft,
  type RitualEditDraftValidationReport,
} from "./data/rituals/ritual-edit-draft-validation";
import "./styles.css";

declare global {
  interface Window {
    __moonTableRitualRepositorySource?: string;
    __moonTableRitualRepositoryFallbackReason?: string;
    __moonTableRitualRepositoryFindings?: Array<{
      path: string;
      message: string;
      severity: string;
    }>;
    __moonTableHouseholdMemoryDiagnostics?: HouseholdMemoryDiagnostics;
  }
}

const app = document.querySelector<HTMLElement>("#app");

if (!app) {
  throw new Error("Missing app root");
}

const appRoot = app;
const firebaseServices = getFirebaseServices();
const googleSignInMode = import.meta.env.DEV ? "redirect" : "popup";
const devVisualQaMode =
  import.meta.env.DEV &&
  new URLSearchParams(window.location.search).get("dev_visual_qa") === "signed_in";
let privateDataRequestId = 0;
let activeSignedInState: Extract<AppAuthState, { status: "signed_in" }> | null = null;
let activePrivateBriefData: PrivateBriefData | null = null;
let activeChooseWithMeResult: ChooseWithMeResult | null = null;
let activeChooseWithMeExcludedRitualIds: string[] = [];
let activeSignedInView: SignedInView = "this_week";
let activeProfileSettingsTabId: string | null = null;
let activeCheckInDraft: RitualCheckInDraft = createInitialRitualCheckInDraft();
let activeCurrentRitualCheckIn: CurrentRitualCheckIn | null = null;
let activeFirstLoginCheckIn = false;
let checkInLoadingTimeout: number | null = null;
let activeRitualSearchQuery = "";
let activeRitualSearchChips: string[] = [];
let activeRitualSearchSort: RitualSearchSort = "match";
let activeRitualSearchSource = "all";
let activeRitualSearchPurpose = "all";
let activeRitualSearchCarrier = "all";
let activeRitualSearchCapacity = "all";
let activeRitualSearchAudience = "all";
let activeRitualSearchTiming: RitualTimingFilter = "all";
let activeRitualSearchFavoritesOnly = false;
let activeSelectedRitualId: string | null = null;
let activeManageRitualFilters: ManageRitualFilters = {
  ...defaultManageRitualFilters,
};
let activeManageRitualEditorId: string | null = null;
let ritualFavoriteStore = createRitualFavoriteStore();
let ritualInteractionStore = createRecommendationEventStore();
let activeChooseWithMeRecommendationInstance: RecommendationInstance | null = null;
let activeChooseWithMeInteractionStatus: string | undefined;
let activeRitualRepository: RitualRepository = staticRitualRepository;
let activeRitualRepositorySource: RitualDbReadRepositorySource =
  "static_fallback_disabled";
let activeRitualDbDocuments: RitualDbReadDocuments | undefined;
let activeRitualRepositoryLoadPromise: Promise<void> | null = null;
let activeRitualRepositoryLoaded = false;
let activeManageRitualActionStatus:
  | {
    ritualId?: string;
    tone: "success" | "error" | "info";
    message: string;
  }
  | undefined;
let activeManageRitualActionSubmitting = false;
let activeManageRitualEditorDraft: RitualEditDraftDocument | undefined;
let activeManageRitualEditorDraftStatus:
  | ManageRitualEditorDraftStatus
  | undefined;
let activeManageRitualEditorDraftValidationReport:
  | RitualEditDraftValidationReport
  | undefined;
let activeManageRitualEditorUsesLocalDraft = false;
let activeManageRitualEditorLastSavedDraftBufferJson: string | undefined;
let activeManageRitualChoosePreviewSample:
  | Partial<RitualDraftChoosePreviewSampleInput>
  | undefined;

type HouseholdMemoryWriteRecordType =
  | "favorite"
  | "recommendationInstance"
  | "interactionEvent";

type HouseholdMemoryWriteOperation =
  | "favorite_added"
  | "favorite_removed"
  | "feedback_submitted"
  | "recommendation_shown"
  | "ritual_selected"
  | "try_another_requested";

type HouseholdMemoryDiagnostics = {
  hydrationFailed: boolean;
  skippedRecords: HouseholdRitualStateSkippedRecordCounts;
  skippedTotal: number;
  writeFailures: Record<HouseholdMemoryWriteRecordType, number>;
  lastWriteFailure?: {
    operation: HouseholdMemoryWriteOperation;
    recordType: HouseholdMemoryWriteRecordType;
  };
};

type HouseholdMemoryStatus = {
  tone: "warning";
  message: string;
};

function createEmptyHouseholdMemoryDiagnostics(): HouseholdMemoryDiagnostics {
  return {
    hydrationFailed: false,
    skippedRecords: {
      favorites: 0,
      recommendationInstances: 0,
      interactionEvents: 0,
    },
    skippedTotal: 0,
    writeFailures: {
      favorite: 0,
      recommendationInstance: 0,
      interactionEvent: 0,
    },
  };
}

let activeHouseholdMemoryStatus: HouseholdMemoryStatus | undefined;
let activeHouseholdMemoryDiagnostics = createEmptyHouseholdMemoryDiagnostics();

function resetRitualSearchState(): void {
  activeRitualSearchQuery = "";
  activeRitualSearchChips = [];
  activeRitualSearchSort = "match";
  activeRitualSearchSource = "all";
  activeRitualSearchPurpose = "all";
  activeRitualSearchCarrier = "all";
  activeRitualSearchCapacity = "all";
  activeRitualSearchAudience = "all";
  activeRitualSearchTiming = "all";
  activeRitualSearchFavoritesOnly = false;
  activeSelectedRitualId = null;
}

function resetRitualInteractionState(): void {
  ritualFavoriteStore = createRitualFavoriteStore();
  ritualInteractionStore = createRecommendationEventStore();
  activeChooseWithMeExcludedRitualIds = [];
  activeChooseWithMeRecommendationInstance = null;
  activeChooseWithMeInteractionStatus = undefined;
}

function publishHouseholdMemoryDiagnostics(): void {
  window.__moonTableHouseholdMemoryDiagnostics = {
    ...activeHouseholdMemoryDiagnostics,
    skippedRecords: { ...activeHouseholdMemoryDiagnostics.skippedRecords },
    writeFailures: { ...activeHouseholdMemoryDiagnostics.writeFailures },
    lastWriteFailure: activeHouseholdMemoryDiagnostics.lastWriteFailure
      ? { ...activeHouseholdMemoryDiagnostics.lastWriteFailure }
      : undefined,
  };
}

function resetHouseholdMemoryDiagnostics(): void {
  activeHouseholdMemoryDiagnostics = createEmptyHouseholdMemoryDiagnostics();
  activeHouseholdMemoryStatus = undefined;
  publishHouseholdMemoryDiagnostics();
}

function setHouseholdMemoryStatus(message: string): void {
  activeHouseholdMemoryStatus = {
    tone: "warning",
    message,
  };
}

function markHouseholdMemoryHydrationFailure(): void {
  activeHouseholdMemoryDiagnostics.hydrationFailed = true;
  setHouseholdMemoryStatus("Household memory is unavailable right now.");
  publishHouseholdMemoryDiagnostics();
}

function markHouseholdMemorySkippedRecords(
  skippedRecords: HouseholdRitualStateSkippedRecordCounts,
): void {
  activeHouseholdMemoryDiagnostics.skippedRecords = { ...skippedRecords };
  activeHouseholdMemoryDiagnostics.skippedTotal =
    skippedRecords.favorites +
    skippedRecords.recommendationInstances +
    skippedRecords.interactionEvents;

  if (activeHouseholdMemoryDiagnostics.skippedTotal > 0) {
    setHouseholdMemoryStatus("Some saved Ritual memory could not be loaded.");
  }

  publishHouseholdMemoryDiagnostics();
}

function markHouseholdMemoryWriteFailure(input: {
  operation: HouseholdMemoryWriteOperation;
  recordType: HouseholdMemoryWriteRecordType;
}): void {
  activeHouseholdMemoryDiagnostics.writeFailures[input.recordType] += 1;
  activeHouseholdMemoryDiagnostics.lastWriteFailure = { ...input };
  setHouseholdMemoryStatus("Saved locally; sync failed.");
  publishHouseholdMemoryDiagnostics();
  console.warn("Moon & Table household memory sync failed.", input);
}

function clearHouseholdMemoryWriteFailureStatus(): void {
  if (
    activeHouseholdMemoryStatus?.message !== "Saved locally; sync failed." ||
    activeHouseholdMemoryDiagnostics.hydrationFailed ||
    activeHouseholdMemoryDiagnostics.skippedTotal > 0
  ) {
    return;
  }

  activeHouseholdMemoryStatus = undefined;
  publishHouseholdMemoryDiagnostics();
  document.querySelector("[data-household-memory-status='true']")?.remove();
}

async function loadActiveRitualRepository(): Promise<void> {
  activeRitualRepository = staticRitualRepository;
  activeRitualRepositorySource = "static_fallback_unavailable";
  activeRitualDbDocuments = undefined;

  if (!firebaseServices) {
    return;
  }

  const result = await loadRitualDbReadRepository({
    enabled: isRitualDbReadFeatureEnabled(import.meta.env),
    loadDbDocuments: () =>
      loadRitualDbReadDocumentsFromFirestore(firebaseServices.db),
    staticFallbackRepository: staticRitualRepository,
    staticParityRituals: sourceBackedRituals,
  });

  activeRitualRepository = result.repository;
  activeRitualRepositorySource = result.source;
  activeRitualDbDocuments = result.dbDocuments;
  window.__moonTableRitualRepositorySource = result.source;
  window.__moonTableRitualRepositoryFallbackReason = result.fallbackReason;
  window.__moonTableRitualRepositoryFindings = result.findings;
}

function resetActiveRitualRepository(): void {
  activeRitualRepository = staticRitualRepository;
  activeRitualRepositorySource = "static_fallback_disabled";
  activeRitualDbDocuments = undefined;
  activeRitualRepositoryLoadPromise = null;
  activeRitualRepositoryLoaded = false;
  window.__moonTableRitualRepositorySource = activeRitualRepositorySource;
  window.__moonTableRitualRepositoryFallbackReason = undefined;
  window.__moonTableRitualRepositoryFindings = undefined;
}

async function ensureActiveRitualRepositoryLoaded(): Promise<void> {
  if (activeRitualRepositoryLoaded) {
    return;
  }

  if (!activeRitualRepositoryLoadPromise) {
    activeRitualRepositoryLoadPromise = loadActiveRitualRepository()
      .then(() => {
        activeRitualRepositoryLoaded = true;
      })
      .finally(() => {
        activeRitualRepositoryLoadPromise = null;
      });
  }

  await activeRitualRepositoryLoadPromise;
}

function applyReviewActionResultToActiveRitualDocuments(
  result: SubmitRitualReviewActionResult,
): void {
  if (!result.valid || !activeRitualDbDocuments) {
    return;
  }

  activeRitualDbDocuments = {
    ...activeRitualDbDocuments,
    ritualDocuments: activeRitualDbDocuments.ritualDocuments.map((document) =>
      document.id === result.ritualId
        ? {
          ...document,
          currentVersionId: result.currentVersionId,
          publishedVersionId: result.publishedVersionId,
          latestReviewDecisionId: result.latestReviewDecisionId,
          lifecycle: {
            ...document.lifecycle,
            state: result.lifecycleState,
            findable: result.findable,
            directUseEligible: result.directUseEligible,
            recommendationEligible: result.recommendationEligible,
            recommendable: result.recommendable,
            missingReadiness: [...result.missingReadiness],
            holdReasons: [...result.holdReasons],
          },
        }
        : document
    ),
  };
}

function clearManageRitualEditorDraftState(): void {
  activeManageRitualEditorDraft = undefined;
  activeManageRitualEditorDraftStatus = undefined;
  activeManageRitualEditorDraftValidationReport = undefined;
  activeManageRitualEditorUsesLocalDraft = false;
  activeManageRitualEditorLastSavedDraftBufferJson = undefined;
  activeManageRitualChoosePreviewSample = undefined;
}

function isRitualDraftChoosePreviewTimingSample(
  value: string,
): value is RitualDraftChoosePreviewSampleInput["timing"] {
  return RITUAL_DRAFT_CHOOSE_PREVIEW_TIMING_SAMPLES.includes(
    value as RitualDraftChoosePreviewSampleInput["timing"],
  );
}

function updateManageRitualChoosePreviewSample(form: HTMLFormElement): void {
  const formData = new FormData(form);
  const energyCapacity = String(formData.get("previewEnergyCapacity") ?? "");
  const audience = String(formData.get("previewAudience") ?? "");
  const purpose = String(formData.get("previewPurpose") ?? "");
  const carrier = String(formData.get("previewCarrier") ?? "");
  const timing = String(formData.get("previewTiming") ?? "");

  activeManageRitualChoosePreviewSample = {
    ...(isEnergyCapacity(energyCapacity) ? { energyCapacity } : {}),
    ...(isCheckInAudience(audience) ? { audience } : {}),
    ...(isRitualPurpose(purpose) ? { purpose } : {}),
    ...(isRitualCarrier(carrier) ? { carrier } : {}),
    ...(isRitualDraftChoosePreviewTimingSample(timing) ? { timing } : {}),
  };
  renderActiveSignedInShell();
}

function getActiveRitualVersionId(ritualId: string): string | undefined {
  const ritualDocument = activeRitualDbDocuments?.ritualDocuments.find(
    (document) => document.id === ritualId,
  );

  return ritualDocument?.publishedVersionId ?? ritualDocument?.currentVersionId;
}

function getDraftBodyFromForm(form: HTMLFormElement): {
  headline: string;
  practice: string;
  intention: string;
  bestWindow: string;
  questionToCarry: string;
} {
  const formData = new FormData(form);

  return {
    headline: String(formData.get("headline") ?? ""),
    practice: String(formData.get("practice") ?? ""),
    intention: String(formData.get("intention") ?? ""),
    bestWindow: String(formData.get("bestWindow") ?? ""),
    questionToCarry: String(formData.get("questionToCarry") ?? ""),
  };
}

function normalizeDraftListText(value: FormDataEntryValue | null): string[] {
  const rawValue = String(value ?? "");

  return rawValue
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter((item, index, items) => item.length > 0 && items.indexOf(item) === index);
}

function normalizeDraftString(value: FormDataEntryValue | null): string {
  return String(value ?? "").trim();
}

function formDataValues(formData: FormData, name: string): string[] {
  return formData
    .getAll(name)
    .map((value) => String(value))
    .filter((value, index, values) => value.length > 0 && values.indexOf(value) === index);
}

function getEnumValue<const T extends readonly string[]>(
  values: T,
  value: FormDataEntryValue | null,
  fallback: T[number],
): T[number] {
  const stringValue = String(value ?? "");

  return values.includes(stringValue) ? stringValue as T[number] : fallback;
}

function getEnumValues<const T extends readonly string[]>(
  values: T,
  rawValues: string[],
): T[number][] {
  return rawValues.filter((value): value is T[number] => values.includes(value));
}

function getDraftBufferFromForm(
  form: HTMLFormElement,
  currentDraftBuffer: RitualEditDraftBuffer,
): RitualEditDraftBuffer {
  const formData = new FormData(form);
  const currentRecommendation = currentDraftBuffer.recommendationMetadata;
  const currentSearch = currentDraftBuffer.searchMetadata;
  const primaryPurpose = getEnumValue(
    RITUAL_PURPOSES,
    formData.get("primaryPurpose"),
    currentRecommendation?.purposes?.primary ?? RITUAL_PURPOSES[0],
  );
  const primaryCarrier = getEnumValue(
    RITUAL_CARRIERS,
    formData.get("primaryCarrier"),
    currentRecommendation?.carriers?.primary ?? RITUAL_CARRIERS[0],
  );
  const capacitySupports = getEnumValues(
    RITUAL_CAPACITY_MODES,
    formDataValues(formData, "capacitySupports"),
  );
  const audienceSupports = getEnumValues(
    RITUAL_AUDIENCES,
    formDataValues(formData, "audienceSupports"),
  );
  const capacityDefaultValue = String(formData.get("capacityDefault") ?? "");
  const audienceDefaultValue = String(formData.get("audienceDefault") ?? "");

  return {
    ...currentDraftBuffer,
    presentation: getDraftBodyFromForm(form),
    recommendationMetadata: {
      ...currentRecommendation,
      purposes: {
        primary: primaryPurpose,
        secondary: getEnumValues(
          RITUAL_PURPOSES,
          formDataValues(formData, "secondaryPurposes"),
        ).filter((purpose) => purpose !== primaryPurpose),
        refinement: currentRecommendation?.purposes?.refinement ?? "",
      },
      carriers: {
        primary: primaryCarrier,
        secondary: getEnumValues(
          RITUAL_CARRIERS,
          formDataValues(formData, "secondaryCarriers"),
        ).filter((carrier) => carrier !== primaryCarrier),
      },
      capacity: {
        supports: capacitySupports,
        ...(RITUAL_CAPACITY_MODES.includes(capacityDefaultValue as RitualCapacityMode)
          ? { default: capacityDefaultValue as RitualCapacityMode }
          : {}),
      },
      audience: {
        supports: audienceSupports,
        ...(RITUAL_AUDIENCES.includes(audienceDefaultValue as RitualAudience)
          ? { default: audienceDefaultValue as RitualAudience }
          : {}),
        bothOfUsStructure: normalizeDraftString(formData.get("bothOfUsStructure")),
      },
      timing: {
        relationship: getEnumValue(
          RITUAL_TIMING_RELATIONSHIPS,
          formData.get("timingRelationship"),
          currentRecommendation?.timing?.relationship ?? RITUAL_TIMING_RELATIONSHIPS[3],
        ),
        contexts: normalizeDraftListText(formData.get("timingContexts")),
      },
      eligibility: {
        recommendable: currentRecommendation?.eligibility?.recommendable ?? false,
        missing: currentRecommendation?.eligibility?.missing ?? [],
        notFor: currentRecommendation?.eligibility?.notFor ?? [],
      },
    },
    searchMetadata: {
      ...currentSearch,
      tags: normalizeDraftListText(formData.get("searchTags")),
      keywords: currentSearch?.keywords ?? [],
      materials: currentSearch?.materials ?? [],
      places: currentSearch?.places ?? [],
    },
  };
}

function serializeManageRitualDraftBuffer(
  draftBuffer: RitualEditDraftBuffer,
): string {
  return JSON.stringify(draftBuffer);
}

function updateManageRitualDraftStatusText(message: string): void {
  const statusElement = document.querySelector<HTMLElement>(
    "[data-manage-ritual-draft-status='true']",
  );

  if (statusElement) {
    statusElement.textContent = message;
  }
}

function syncManageRitualExclusiveSecondaryChoices(form: HTMLFormElement): void {
  [
    { primaryName: "primaryPurpose", secondaryName: "secondaryPurposes" },
    { primaryName: "primaryCarrier", secondaryName: "secondaryCarriers" },
  ].forEach(({ primaryName, secondaryName }) => {
    const primary = form.elements.namedItem(primaryName);

    if (!(primary instanceof HTMLSelectElement) || primary.disabled) {
      return;
    }

    form
      .querySelectorAll<HTMLInputElement>(`input[name="${secondaryName}"]`)
      .forEach((input) => {
        const shouldHide = input.value === primary.value;
        const label = input.closest<HTMLElement>(
          `[data-manage-secondary-option="${secondaryName}"]`,
        );

        if (shouldHide) {
          input.checked = false;
        }

        input.disabled = shouldHide;

        if (label) {
          label.hidden = shouldHide;
        }
      });
  });
}

async function getFirebaseIdTokenForRitualEditor(): Promise<string | undefined> {
  const currentUser = firebaseServices?.auth.currentUser;

  return currentUser ? currentUser.getIdToken() : undefined;
}

function getRitualEditDraftFailureMessage(result: SubmitRitualEditDraftResult): string {
  if (result.valid) {
    return "Saved";
  }

  return result.findings[0]?.message ?? "Could not open edit draft.";
}

function isLocalRitualEditDraftFallbackAllowed(
  result: SubmitRitualEditDraftResult,
): boolean {
  if (!import.meta.env.DEV || result.valid) {
    return false;
  }

  return result.findings.some((finding) =>
    finding.message.includes("endpoint was not found") ||
    finding.message.includes("could not be reached") ||
    finding.message.includes("non-JSON response"),
  );
}

async function createLocalManageRitualEditorDraft(input: {
  ritualId: string;
  versionId: string;
  statusMessage: string;
}): Promise<boolean> {
  const versionDocument = activeRitualDbDocuments?.versionDocuments.find(
    (document) => document.versionId === input.versionId,
  );

  if (!versionDocument) {
    return false;
  }

  activeManageRitualEditorDraft = await createDraftFromRitualVersion({
    store: createInMemoryRitualEditDraftStore(),
    versionDocument,
    actor: "owner",
    draftId: `local_editor_${input.ritualId}`,
    createdAtIso: new Date().toISOString(),
  });
  activeManageRitualEditorUsesLocalDraft = true;
  activeManageRitualEditorLastSavedDraftBufferJson =
    serializeManageRitualDraftBuffer(
      activeManageRitualEditorDraft.draftBuffer,
    );
  activeManageRitualEditorDraftStatus = {
    tone: "idle",
    message: input.statusMessage,
  };
  activeManageRitualEditorDraftValidationReport = undefined;
  renderActiveSignedInShell();
  return true;
}

async function loadOrCreateManageRitualEditorDraft(ritualId: string): Promise<void> {
  const versionId = getActiveRitualVersionId(ritualId);

  if (!versionId) {
    activeManageRitualEditorUsesLocalDraft = false;
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: "Could not open edit draft.",
    };
    renderActiveSignedInShell();
    return;
  }

  if (devVisualQaMode) {
    const loaded = await createLocalManageRitualEditorDraft({
      ritualId,
      versionId,
      statusMessage: "Local preview draft",
    });

    if (!loaded) {
      activeManageRitualEditorUsesLocalDraft = false;
      activeManageRitualEditorDraftStatus = {
        tone: "error",
        message: "Could not open edit draft.",
      };
      renderActiveSignedInShell();
    }
    return;
  }

  const idToken = await getFirebaseIdTokenForRitualEditor();

  if (!idToken) {
    activeManageRitualEditorUsesLocalDraft = false;
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: "Sign in again before editing this Ritual.",
    };
    renderActiveSignedInShell();
    return;
  }

  activeManageRitualEditorDraftStatus = {
    tone: "saving",
    message: "Loading draft...",
  };
  activeManageRitualEditorUsesLocalDraft = false;
  renderActiveSignedInShell();

  const result = await submitRitualEditDraft({
    idToken,
    request: {
      action: "load_or_create",
      ritualId,
      versionId,
    },
  });

  if (!result.valid) {
    console.warn("Moon & Table Ritual edit draft load failed.", result.findings);
    if (isLocalRitualEditDraftFallbackAllowed(result)) {
      const loaded = await createLocalManageRitualEditorDraft({
        ritualId,
        versionId,
        statusMessage: "Local preview draft",
      });

      if (loaded) {
        return;
      }
    }

    activeManageRitualEditorDraft = undefined;
    activeManageRitualEditorUsesLocalDraft = false;
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: getRitualEditDraftFailureMessage(result),
    };
    renderActiveSignedInShell();
    return;
  }

  if (activeManageRitualEditorId !== ritualId) {
    return;
  }

  activeManageRitualEditorDraft = result.draft;
  activeManageRitualEditorUsesLocalDraft = false;
  activeManageRitualEditorLastSavedDraftBufferJson =
    serializeManageRitualDraftBuffer(
      activeManageRitualEditorDraft.draftBuffer,
    );
  activeManageRitualEditorDraftStatus = {
    tone: "saved",
    message: "Saved",
  };
  activeManageRitualEditorDraftValidationReport = undefined;
  renderActiveSignedInShell();
}

async function saveManageRitualEditorDraft(form: HTMLFormElement): Promise<void> {
  if (!activeManageRitualEditorDraft) {
    return;
  }

  const draftBuffer = getDraftBufferFromForm(
    form,
    activeManageRitualEditorDraft.draftBuffer,
  );
  const draftBufferJson = serializeManageRitualDraftBuffer(draftBuffer);

  if (draftBufferJson === activeManageRitualEditorLastSavedDraftBufferJson) {
    activeManageRitualEditorDraftStatus = {
      tone: "saved",
      message: activeManageRitualEditorUsesLocalDraft ? "Saved in local preview" : "Saved",
    };
    updateManageRitualDraftStatusText(activeManageRitualEditorDraftStatus.message);
    return;
  }

  activeManageRitualEditorDraftStatus = {
    tone: "saving",
    message: "Saving...",
  };
  activeManageRitualEditorDraft = {
    ...activeManageRitualEditorDraft,
    saveState: "saving",
    draftBuffer,
  };
  renderActiveSignedInShell();

  if (devVisualQaMode || activeManageRitualEditorUsesLocalDraft) {
    const store = createInMemoryRitualEditDraftStore([activeManageRitualEditorDraft]);
    activeManageRitualEditorDraft = await saveRitualEditDraft({
        store,
        draftId: activeManageRitualEditorDraft.id,
        draftBuffer: activeManageRitualEditorDraft.draftBuffer,
        actor: "owner",
        updatedAtIso: new Date().toISOString(),
      });
    activeManageRitualEditorDraftStatus = {
      tone: "saved",
      message: activeManageRitualEditorUsesLocalDraft ? "Saved in local preview" : "Saved",
    };
    activeManageRitualEditorLastSavedDraftBufferJson =
      serializeManageRitualDraftBuffer(
        activeManageRitualEditorDraft.draftBuffer,
      );

    renderActiveSignedInShell();
    return;
  }

  const idToken = await getFirebaseIdTokenForRitualEditor();
  if (!idToken) {
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: "Could not save",
    };
    renderActiveSignedInShell();
    return;
  }

  const result = await submitRitualEditDraft({
    idToken,
    request: {
      action: "save",
      draftId: activeManageRitualEditorDraft.id,
      draftBuffer: activeManageRitualEditorDraft.draftBuffer,
    },
  });

  if (!result.valid) {
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: "Could not save",
    };
    activeManageRitualEditorDraft = {
      ...activeManageRitualEditorDraft,
      saveState: "save_failed",
    };
    renderActiveSignedInShell();
    return;
  }

  activeManageRitualEditorDraft = result.draft;
  activeManageRitualEditorLastSavedDraftBufferJson =
    serializeManageRitualDraftBuffer(
      activeManageRitualEditorDraft.draftBuffer,
    );
  activeManageRitualEditorDraftStatus = {
    tone: "saved",
    message: "Saved",
  };
  renderActiveSignedInShell();
}

function validateActiveManageRitualEditorDraft(): void {
  if (!activeManageRitualEditorDraft) {
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: "Open a draft before validating.",
    };
    renderActiveSignedInShell();
    return;
  }

  activeManageRitualEditorDraftValidationReport = validateRitualEditDraft(
    activeManageRitualEditorDraft,
  );
  activeManageRitualEditorDraftStatus = {
    tone: activeManageRitualEditorDraftValidationReport.valid ? "saved" : "error",
    message: activeManageRitualEditorDraftValidationReport.summaryLabel,
  };
  renderActiveSignedInShell();
}

async function reloadActiveRitualRepositoryForEditor(): Promise<void> {
  activeRitualRepositoryLoaded = false;
  activeRitualRepositoryLoadPromise = null;
  await loadActiveRitualRepository();
  activeRitualRepositoryLoaded = true;
}

async function applyActiveManageRitualEditorDraft(
  form: HTMLFormElement,
): Promise<void> {
  if (!activeManageRitualEditorDraft) {
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: "Open a draft before applying.",
    };
    renderActiveSignedInShell();
    return;
  }

  if (activeManageRitualEditorDraft.draftSource !== "existing_version") {
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: "Use Add to library for new Rituals.",
    };
    renderActiveSignedInShell();
    return;
  }

  const draftBuffer = getDraftBufferFromForm(
    form,
    activeManageRitualEditorDraft.draftBuffer,
  );
  const draftBufferJson = serializeManageRitualDraftBuffer(draftBuffer);

  if (draftBufferJson !== activeManageRitualEditorLastSavedDraftBufferJson) {
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: "Save before applying.",
    };
    renderActiveSignedInShell();
    return;
  }

  if (!activeManageRitualEditorDraftValidationReport) {
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: "Validate before applying.",
    };
    renderActiveSignedInShell();
    return;
  }

  if (!activeManageRitualEditorDraftValidationReport.valid) {
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: "Cannot apply yet.",
    };
    renderActiveSignedInShell();
    return;
  }

  const confirmed = window.confirm(
    "Publish this draft to the live ritual?\n\nThis creates a new version, keeps the previous version for history, and updates what the app uses. Choose with me eligibility may be held if recommendation metadata changed.",
  );

  if (!confirmed) {
    return;
  }

  if (devVisualQaMode || activeManageRitualEditorUsesLocalDraft) {
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: "Publishing a draft requires the DB draft service.",
    };
    renderActiveSignedInShell();
    return;
  }

  const idToken = await getFirebaseIdTokenForRitualEditor();
  if (!idToken) {
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: "Could not apply changes.",
    };
    renderActiveSignedInShell();
    return;
  }

  activeManageRitualEditorDraftStatus = {
    tone: "saving",
    message: "Publishing draft...",
  };
  renderActiveSignedInShell();

  const result = await submitRitualEditDraft({
    idToken,
    request: {
      action: "apply_changes",
      draftId: activeManageRitualEditorDraft.id,
    },
  });

  if (!result.valid) {
    activeManageRitualEditorDraftStatus = {
      tone: "error",
      message: getRitualEditDraftFailureMessage(result),
    };
    renderActiveSignedInShell();
    return;
  }

  activeManageRitualEditorDraft = result.draft;
  activeManageRitualEditorLastSavedDraftBufferJson =
    serializeManageRitualDraftBuffer(result.draft.draftBuffer);
  activeManageRitualEditorDraftValidationReport = undefined;
  activeManageRitualEditorDraftStatus = {
    tone: "saved",
    message: result.recommendationHeld
      ? "Draft published. Choose with me is held because recommendation metadata changed."
      : "Draft published.",
  };
  await reloadActiveRitualRepositoryForEditor();
  renderActiveSignedInShell();
}

function markManageRitualEditorDraftUnsaved(form: HTMLFormElement): void {
  if (!activeManageRitualEditorDraft) {
    return;
  }

  const draftBuffer = getDraftBufferFromForm(
    form,
    activeManageRitualEditorDraft.draftBuffer,
  );
  const draftBufferJson = serializeManageRitualDraftBuffer(draftBuffer);

  if (draftBufferJson === activeManageRitualEditorLastSavedDraftBufferJson) {
    updateManageRitualDraftStatusText(
      activeManageRitualEditorUsesLocalDraft ? "Saved in local preview" : "Saved",
    );
    return;
  }

  activeManageRitualEditorDraft = {
    ...activeManageRitualEditorDraft,
    saveState: "unsaved_changes",
    draftBuffer,
  };
  activeManageRitualEditorDraftStatus = {
    tone: "idle",
    message: "Unsaved changes",
  };
  activeManageRitualEditorDraftValidationReport = undefined;
  updateManageRitualDraftStatusText("Unsaved changes");
}

function normalizeRitualSearchTimingFilter(value: unknown): RitualTimingFilter {
  const stringValue = String(value ?? "all");

  if (
    stringValue === "all" ||
    stringValue === "current" ||
    ritualTimingPresetOptions.some((option) => option.value === stringValue)
  ) {
    return stringValue as RitualTimingFilter;
  }

  return "all";
}

function isNearCurrentTimingWindow(
  candidate: TimingWindowCandidate,
  currentDate: Date,
): boolean {
  const startsAt = new Date(candidate.startsAtIso);
  const endsAt = candidate.endsAtIso ? new Date(candidate.endsAtIso) : undefined;
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;

  if (Number.isNaN(startsAt.getTime())) {
    return false;
  }

  if (startsAt <= currentDate && (!endsAt || endsAt >= currentDate)) {
    return true;
  }

  return startsAt > currentDate && startsAt.getTime() - currentDate.getTime() <= threeDaysMs;
}

function getCurrentTimingWindowsForSearch(): TimingWindowCandidate[] {
  const currentDateValue = activePrivateBriefData?.input.currentDate ?? new Date();
  const currentDate = currentDateValue instanceof Date
    ? currentDateValue
    : new Date(currentDateValue);

  if (Number.isNaN(currentDate.getTime())) {
    return [];
  }

  const candidates =
    activePrivateBriefData?.input.timingWindowCandidates ??
    getTimingWindowCandidates({
      startDate: currentDate,
      timezone: activePrivateBriefData?.input.timezone,
      privateNatalProfiles: activePrivateBriefData?.natalProfiles ?? [],
      astrologyVisibility: activePrivateBriefData?.input.astrologyVisibility,
      daysAhead: 4,
      options: { maxCandidates: 8 },
    });

  return getStrongTimingWindowCandidates(
    candidates.filter((candidate) =>
      isStrongTimingWindowCandidate(candidate) &&
      isNearCurrentTimingWindow(candidate, currentDate),
    ),
  );
}

function getCurrentTimingWindowForSearch(): TimingWindowCandidate | undefined {
  return getCurrentTimingWindowsForSearch()[0];
}

function isRitualFavoriteSourceSurface(
  value: string | undefined,
): value is RitualFavoriteSourceSurface {
  return RITUAL_FAVORITE_SOURCE_SURFACES.includes(
    value as RitualFavoriteSourceSurface,
  );
}

function isRitualFeedbackReason(value: unknown): value is RitualFeedbackReason {
  return (
    typeof value === "string" &&
    RITUAL_FEEDBACK_REASONS.includes(value as RitualFeedbackReason)
  );
}

function getRitualOrThrow(ritualId: string): Ritual {
  const ritual = activeRitualRepository.getRitualById(ritualId);

  if (!ritual) {
    throw new Error(`Unknown Ritual: ${ritualId}`);
  }

  return ritual;
}

function getTopRecommendationCandidates(
  result: Extract<ChooseWithMeResult, { status: "selected" }>,
): RecommendationCandidateInput[] {
  return result.debug.topCandidates.flatMap((candidate) => {
    const ritual = activeRitualRepository.getRitualById(candidate.ritualId);

    return ritual
      ? [{
          ritual,
          score: candidate.score,
          breakdown: candidate.breakdown,
        }]
      : [];
  });
}

function createRecommendationInstanceForResult(
  checkIn: CurrentRitualCheckIn,
  result: ChooseWithMeResult,
): RecommendationInstance | null {
  if (result.status !== "selected") {
    return null;
  }

  const instance = ritualInteractionStore.createRecommendationInstance({
    selectedRitual: result.selectedRitual,
    checkInSnapshot: {
      timeScope: checkIn.timeScope,
      capacityMode: checkIn.capacityMode,
      energyCapacity: checkIn.energyCapacity,
      audience: checkIn.audience,
      purpose: checkIn.purpose ?? null,
      carrier: checkIn.carrier ?? null,
      refinement: checkIn.refinement ?? null,
      freeTextIntent: checkIn.ritualFocusText ?? null,
    },
    selectorSnapshot: {
      selectorVersion: "choose-with-me-static-v1",
      selectedScore: result.debug.selectedScore,
      selectedBreakdown: result.debug.selectedBreakdown,
      matchedTiming: result.debug.timing.matchedRitualTiming,
      topCandidates: getTopRecommendationCandidates(result),
      exclusionSummary: result.debug.exclusions,
    },
  });

  const shownEvent = ritualInteractionStore.recordRecommendationShown(instance);
  void persistRecommendationRecord(instance, shownEvent)
    .then(() => {
      clearHouseholdMemoryWriteFailureStatus();
    })
    .catch(() => {
      const syncFailureMessage = "Saved locally; sync failed.";
      markHouseholdMemoryWriteFailure({
        operation: "recommendation_shown",
        recordType: "recommendationInstance",
      });
      activeChooseWithMeInteractionStatus = syncFailureMessage;

      if (activePrivateBriefData) {
        renderActiveSignedInShell({
          chooseWithMeInteractionStatus: syncFailureMessage,
        });
      }
    });

  return instance;
}

function getRequestedSignedInView(): SignedInView | null {
  const requestedView = new URLSearchParams(window.location.search).get("view");
  const requestedHash = window.location.hash.replace(/^#/, "");
  const requested = requestedView ?? requestedHash;

  if (requested === "profile" || requested === "profile_settings") {
    return "profile_settings";
  }

  if (requested === "how" || requested === "how_it_works") {
    return "how_it_works";
  }

  if (requested === "search" || requested === "search_rituals") {
    return "search_rituals";
  }

  if (requested === "manage" || requested === "manage_rituals") {
    return "manage_rituals";
  }

  if (requested === "this_week") {
    return "this_week";
  }

  return null;
}

function clearCheckInLoadingTimeout(): void {
  if (!checkInLoadingTimeout) {
    return;
  }

  window.clearTimeout(checkInLoadingTimeout);
  checkInLoadingTimeout = null;
}

function render(state: AppAuthState): void {
  appRoot.innerHTML = renderAppShell(state);
}

function renderActiveCheckInShell(): void {
  if (!activeSignedInState) {
    return;
  }

  appRoot.innerHTML = renderRitualCheckInShell({
    draft: activeCheckInDraft,
    displayName: activeSignedInState.user.displayName,
    introMode: activeFirstLoginCheckIn ? "first_login" : "returning",
    todaysShapeBrief: createTodaysShapeBrief({
      currentDate: activePrivateBriefData?.input.currentDate,
      timezone: activePrivateBriefData?.input.timezone,
      computedTimingFacts: activePrivateBriefData?.input.computedTimingFacts,
      timingWindowCandidates: activePrivateBriefData?.input.timingWindowCandidates,
      privateNatalProfiles: activePrivateBriefData?.natalProfiles,
      astrologyVisibility: activePrivateBriefData?.input.astrologyVisibility,
    }),
    currentTimingWindow: getCurrentTimingWindowForSearch(),
  });
}

function renderPrivateWelcomeOrCheckIn(): void {
  const requestedView = getRequestedSignedInView();

  if (requestedView && requestedView !== "this_week") {
    activeSignedInView = requestedView;
    activeChooseWithMeResult = null;
    activeChooseWithMeRecommendationInstance = null;
    activeChooseWithMeInteractionStatus = undefined;
    renderActiveSignedInShell();
    return;
  }

  if (activePrivateBriefData && shouldShowPrivateFirstLoginWelcome(activePrivateBriefData)) {
    appRoot.innerHTML = renderPrivateFirstLoginWelcomeShell();
    return;
  }

  renderActiveCheckInShell();
}

function renderActiveSignedInShell(options: {
  chooseWithMeInteractionStatus?: string;
} = {}): void {
  if (!activePrivateBriefData) {
    return;
  }

  const chooseWithMeInteractionStatus =
    options.chooseWithMeInteractionStatus ?? activeChooseWithMeInteractionStatus;

  appRoot.innerHTML = renderSignedInShell(activePrivateBriefData, {
    activeView: activeSignedInView,
    chooseWithMeResult: activeChooseWithMeResult ?? undefined,
    activeProfileSettingsTabId,
    ritualSearchQuery: activeRitualSearchQuery,
    selectedRitualSearchChips: activeRitualSearchChips,
    ritualSearchSort: activeRitualSearchSort,
    ritualSearchSource: activeRitualSearchSource,
    ritualSearchPurpose: activeRitualSearchPurpose,
    ritualSearchCarrier: activeRitualSearchCarrier,
    ritualSearchCapacity: activeRitualSearchCapacity,
    ritualSearchAudience: activeRitualSearchAudience,
    ritualSearchTiming: activeRitualSearchTiming,
    ritualSearchFavoritesOnly: activeRitualSearchFavoritesOnly,
    ritualFavorites: ritualFavoriteStore.listRitualFavorites(),
    chooseWithMeRecommendationInstanceId:
      activeChooseWithMeRecommendationInstance?.id,
    chooseWithMeInteractionStatus,
    currentTimingWindow: getCurrentTimingWindowForSearch(),
    currentTimingWindows: getCurrentTimingWindowsForSearch(),
    selectedRitualId: activeSelectedRitualId,
    manageRitualFilters: activeManageRitualFilters,
    ritualRepository: activeRitualRepository,
    ritualRepositorySource: activeRitualRepositorySource,
    ritualDbDocuments: activeRitualDbDocuments,
    selectedManageRitualEditorId: activeManageRitualEditorId,
    selectedManageRitualEditorDraft: activeManageRitualEditorDraft,
    selectedManageRitualEditorDraftStatus: activeManageRitualEditorDraftStatus,
    selectedManageRitualEditorDraftValidationReport:
      activeManageRitualEditorDraftValidationReport,
    selectedManageRitualChoosePreviewSample:
      activeManageRitualChoosePreviewSample,
    manageRitualActionStatus: activeManageRitualActionStatus,
    householdMemoryStatus: activeHouseholdMemoryStatus,
  });
}

function renderSignedInState(state: Extract<AppAuthState, { status: "signed_in" }>): void {
  activeSignedInState = state;
  privateDataRequestId += 1;
  const requestId = privateDataRequestId;

  if (!firebaseServices) {
    render(state);
    return;
  }

  appRoot.innerHTML = renderPrivateDataLoadingShell();

  void loadPrivateBriefData(
    firebaseServices.db,
    state.user.uid,
    state.user.email,
    state.user.displayName,
  )
    .then(async (privateBriefData) => {
      if (requestId === privateDataRequestId) {
        if (!hasLoadedPrivateData(privateBriefData)) {
          activeSignedInState = null;
          activePrivateBriefData = null;
          activeChooseWithMeResult = null;
          activeSignedInView = "this_week";
          activeProfileSettingsTabId = null;
          resetRitualSearchState();
          resetRitualInteractionState();
          activeManageRitualFilters = { ...defaultManageRitualFilters };
          activeManageRitualEditorId = null;
          clearManageRitualEditorDraftState();
          activeFirstLoginCheckIn = false;
          appRoot.innerHTML = renderAppShell({
            status: "unauthorized",
            configReady: true,
          });
          return;
        }

        activePrivateBriefData = privateBriefData;
        activeProfileSettingsTabId = null;
        resetHouseholdMemoryDiagnostics();
        resetActiveRitualRepository();
        resetRitualSearchState();
        try {
          await loadPersistedHouseholdRitualState();
        } catch {
          if (requestId === privateDataRequestId) {
            resetRitualInteractionState();
            markHouseholdMemoryHydrationFailure();
          }
        }
        if (requestId !== privateDataRequestId) {
          return;
        }
        activeManageRitualFilters = { ...defaultManageRitualFilters };
        activeManageRitualEditorId = null;
        clearManageRitualEditorDraftState();
        activeChooseWithMeResult = null;
        activeChooseWithMeRecommendationInstance = null;
        activeChooseWithMeInteractionStatus = undefined;
        activeCurrentRitualCheckIn = null;
        activeFirstLoginCheckIn = false;
        activeCheckInDraft = createInitialRitualCheckInDraft();
        renderPrivateWelcomeOrCheckIn();
      }
    })
    .catch(() => {
      if (requestId === privateDataRequestId) {
        activeSignedInState = null;
        activePrivateBriefData = null;
        activeChooseWithMeResult = null;
        activeSignedInView = "this_week";
        activeProfileSettingsTabId = null;
        resetRitualSearchState();
        resetRitualInteractionState();
        activeManageRitualFilters = { ...defaultManageRitualFilters };
        activeManageRitualEditorId = null;
        clearManageRitualEditorDraftState();
        activeCurrentRitualCheckIn = null;
        activeFirstLoginCheckIn = false;
        activeCheckInDraft = createInitialRitualCheckInDraft();
        appRoot.innerHTML = renderAppShell({
          status: "unauthorized",
          configReady: true,
        });
      }
    });
}

function renderDevVisualQaState(): void {
  activeSignedInState = {
    status: "signed_in",
    user: {
      uid: "dev_visual_qa",
      email: null,
      displayName: "Dev QA",
    },
  };
  activePrivateBriefData = resolvePrivateBriefData({});
  activeSignedInView = getRequestedSignedInView() ?? "this_week";
  activeProfileSettingsTabId = null;
  resetRitualSearchState();
  resetRitualInteractionState();
  activeManageRitualFilters = { ...defaultManageRitualFilters };
  activeManageRitualEditorId = null;
  clearManageRitualEditorDraftState();
  const dbMirrorReport = createRitualDbMirrorDryRun(sourceBackedRituals);
  activeRitualRepository = staticRitualRepository;
  activeRitualRepositorySource = "db";
  activeRitualDbDocuments = {
    ritualDocuments: dbMirrorReport.mirrored.map((record) => record.ritualDocument),
    versionDocuments: dbMirrorReport.mirrored.map((record) => record.versionDocument),
    validationSnapshots: dbMirrorReport.mirrored.map((record) => record.validationSnapshot),
  };
  activeRitualRepositoryLoaded = true;
  activeRitualRepositoryLoadPromise = null;
  activeManageRitualActionStatus = undefined;
  activeCurrentRitualCheckIn = null;
  activeChooseWithMeResult = null;
  activeFirstLoginCheckIn = false;
  activeCheckInDraft = createInitialRitualCheckInDraft();

  if (activeSignedInView !== "this_week") {
    activeChooseWithMeResult = null;
    activeChooseWithMeRecommendationInstance = null;
    activeChooseWithMeInteractionStatus = undefined;
    renderActiveSignedInShell();
    return;
  }

  activeChooseWithMeResult = null;
  activeChooseWithMeRecommendationInstance = null;
  activeChooseWithMeInteractionStatus = undefined;
  renderPrivateWelcomeOrCheckIn();
}

async function handlePrivateWelcomeDismiss(): Promise<void> {
  if (!firebaseServices || !activePrivateBriefData) {
    return;
  }

  try {
    activePrivateBriefData = await dismissPrivateFirstLoginWelcome(
      firebaseServices.db,
      activePrivateBriefData,
    );
    activeFirstLoginCheckIn = true;
  } catch {
    return;
  }

  renderActiveCheckInShell();
}

function createChooseWithMeRequest(
  checkIn: CurrentRitualCheckIn,
  excludedRitualIds: string[] = [],
): ChooseWithMeRequest {
  const timezone =
    activePrivateBriefData?.input.timezone ?? getDefaultTimingTimezone();
  const currentDate = activePrivateBriefData?.input.currentDate ?? new Date();
  const timingWindowCandidates =
    checkIn.timeScope === "best_moment_this_week"
      ? activePrivateBriefData?.input.timingWindowCandidates ??
        getTimingWindowCandidates({
          startDate: currentDate,
          timezone,
          privateNatalProfiles: activePrivateBriefData?.natalProfiles ?? [],
          astrologyVisibility: activePrivateBriefData?.input.astrologyVisibility,
          options: { maxCandidates: 4 },
        })
      : [];
  const selectedTimingWindow = checkIn.timingWindowCandidateIds
    ?.map((candidateId) =>
      timingWindowCandidates.find((candidate) => candidate.id === candidateId),
    )
    .find((candidate) => candidate !== undefined);
  const computedTimingFacts =
    activePrivateBriefData?.input.computedTimingFacts ??
    getTimingFactsForDate(currentDate, { timezone });

  return {
    timeScope: checkIn.timeScope,
    energyCapacity: checkIn.energyCapacity,
    capacityMode: checkIn.capacityMode,
    audience: checkIn.audience,
    carrier: checkIn.carrier ?? null,
    purpose: checkIn.purpose ?? null,
    refinement: checkIn.refinement ?? null,
    freeTextIntent: checkIn.ritualFocusText ?? null,
    excludedRitualIds,
    timingContext: {
      timingFacts: activePrivateBriefData?.input.timingFacts,
      timingFactDetails: activePrivateBriefData?.input.timingFactDetails,
      computedTimingFacts,
      timingWindowCandidates,
      timingWindowCandidateIds: checkIn.timingWindowCandidateIds,
      selectedTimingWindow,
    },
  };
}

function chooseRitualForActiveCheckIn(
  checkIn: CurrentRitualCheckIn,
): ChooseWithMeResult {
  return chooseWithMeRitual(
    activeRitualRepository.getRecommendationEligibleRitualsForChooseWithMe(),
    createChooseWithMeRequest(checkIn, activeChooseWithMeExcludedRitualIds),
  );
}

async function completeCheckIn(checkIn: CurrentRitualCheckIn): Promise<void> {
  await ensureActiveRitualRepositoryLoaded();
  activeCurrentRitualCheckIn = checkIn;
  activeSignedInView = "this_week";
  activeProfileSettingsTabId = null;
  activeFirstLoginCheckIn = false;
  activeChooseWithMeExcludedRitualIds = [];
  activeChooseWithMeInteractionStatus = undefined;
  activeChooseWithMeResult = chooseRitualForActiveCheckIn(checkIn);
  activeChooseWithMeRecommendationInstance = createRecommendationInstanceForResult(
    checkIn,
    activeChooseWithMeResult,
  );
  renderActiveSignedInShell();
}

function showCheckInLoadingThenComplete(checkIn: CurrentRitualCheckIn): void {
  appRoot.innerHTML = renderRitualCheckInLoadingShell();
  clearCheckInLoadingTimeout();

  checkInLoadingTimeout = window.setTimeout(() => {
    checkInLoadingTimeout = null;
    void completeCheckIn(checkIn);
  }, 1400);
}

function addTimingWindowCandidateIds(
  checkIn: CurrentRitualCheckIn,
): CurrentRitualCheckIn {
  if (checkIn.timeScope !== "best_moment_this_week") {
    return checkIn;
  }

  const candidates = getTimingWindowCandidates({
    startDate: activePrivateBriefData?.input.currentDate ?? new Date(),
    timezone: activePrivateBriefData?.input.timezone,
    privateNatalProfiles: activePrivateBriefData?.natalProfiles ?? [],
    astrologyVisibility: activePrivateBriefData?.input.astrologyVisibility,
    options: { maxCandidates: 4 },
  });

  return {
    ...checkIn,
    timingWindowCandidateIds: candidates.map((candidate) => candidate.id),
  };
}

function maybeCompleteCheckIn(
  draft: RitualCheckInDraft,
): CurrentRitualCheckIn | null {
  if (
    !draft.timeScope ||
    !draft.energyCapacity ||
    !draft.capacityMode ||
    !draft.audience
  ) {
    return null;
  }

  return addTimingWindowCandidateIds({
    timeScope: draft.timeScope ?? "today",
    energyCapacity: draft.energyCapacity,
    capacityMode: draft.capacityMode,
    audience: draft.audience ?? "me",
    ...(draft.practiceTypeHints ? { practiceTypeHints: draft.practiceTypeHints } : {}),
    ...(draft.practiceTypeLabel ? { practiceTypeLabel: draft.practiceTypeLabel } : {}),
    ...(draft.carrier ? { carrier: draft.carrier } : {}),
    ...(draft.carrierLabel ? { carrierLabel: draft.carrierLabel } : {}),
    ...(draft.carrierOpen ? { carrierOpen: draft.carrierOpen } : {}),
    ...(draft.purpose ? { purpose: draft.purpose } : {}),
    ...(draft.purposeLabel ? { purposeLabel: draft.purposeLabel } : {}),
    ...(draft.refinement ? { refinement: draft.refinement } : {}),
    ...(draft.refinementLabel ? { refinementLabel: draft.refinementLabel } : {}),
    ...(draft.ritualFocusKey ? { ritualFocusKey: draft.ritualFocusKey } : {}),
    ...(draft.ritualFocusLabel ? { ritualFocusLabel: draft.ritualFocusLabel } : {}),
    ...(draft.ritualFocusText ? { ritualFocusText: draft.ritualFocusText } : {}),
  });
}

function handleCheckInAction(action: string, value: string): void {
  if (action === "go_back") {
    activeCheckInDraft = getPreviousCheckInDraft(activeCheckInDraft);
    renderActiveCheckInShell();
    return;
  }

  if (action === "start_guided" && value === "choose_with_me") {
    activeCheckInDraft = {
      ...activeCheckInDraft,
      step: "energy_capacity",
    };
    renderActiveCheckInShell();
    return;
  }

  if (action === "time_scope" && isTimeScope(value)) {
    activeCheckInDraft = {
      ...activeCheckInDraft,
      timeScope: value,
      audience: undefined,
      purpose: undefined,
      purposeLabel: undefined,
      carrier: undefined,
      carrierLabel: undefined,
      carrierOpen: undefined,
      refinement: undefined,
      refinementLabel: undefined,
      step: "audience",
    };
    renderActiveCheckInShell();
    return;
  }

  if (action === "energy_capacity" && isEnergyCapacity(value)) {
    const capacityMode = getCapacityModeForEnergy(value);
    const nextDraft: RitualCheckInDraft = {
      ...activeCheckInDraft,
      energyCapacity: value,
      capacityMode,
      ...(value === "barely_any"
        ? { timeScope: "today" as const, audience: "me" as const }
        : { timeScope: undefined, audience: undefined }),
      purpose: undefined,
      purposeLabel: undefined,
      carrier: undefined,
      carrierLabel: undefined,
      carrierOpen: undefined,
      refinement: undefined,
      refinementLabel: undefined,
      step: getNextStepAfterEnergy(value),
    };

    activeCheckInDraft = nextDraft;
    renderActiveCheckInShell();
    return;
  }

  if (action === "audience" && isCheckInAudience(value)) {
    if (!activeCheckInDraft.energyCapacity) {
      return;
    }

    activeCheckInDraft = {
      ...activeCheckInDraft,
      audience: value,
      purpose: undefined,
      purposeLabel: undefined,
      carrier: undefined,
      carrierLabel: undefined,
      carrierOpen: undefined,
      refinement: undefined,
      refinementLabel: undefined,
      step: getNextStepAfterAudience(activeCheckInDraft.energyCapacity),
    };
    renderActiveCheckInShell();
    return;
  }

  if (
    action === "carrier" &&
    activeCheckInDraft.energyCapacity &&
    value === "open"
  ) {
    const nextDraft: RitualCheckInDraft = {
      ...activeCheckInDraft,
      carrier: undefined,
      carrierLabel: "I'm open",
      carrierOpen: true,
      practiceTypeHints: [],
      practiceTypeLabel: "I'm open",
      refinement: undefined,
      refinementLabel: undefined,
      step: "carrier",
    };
    activeCheckInDraft = nextDraft;
    const completed = maybeCompleteCheckIn(nextDraft);
    if (completed) {
      showCheckInLoadingThenComplete(completed);
    }
    return;
  }

  if (action === "carrier" && activeCheckInDraft.energyCapacity && isRitualCarrier(value)) {
    const option = carrierOptions.find((candidate) => candidate.key === value);

    if (!option) {
      return;
    }

    const nextDraft: RitualCheckInDraft = {
      ...activeCheckInDraft,
      carrier: value,
      carrierLabel: option.label,
      carrierOpen: false,
      practiceTypeHints: [value],
      practiceTypeLabel: option.label,
      refinement: undefined,
      refinementLabel: undefined,
      step: "carrier",
    };

    activeCheckInDraft = nextDraft;
    const completed = maybeCompleteCheckIn(nextDraft);
    if (completed) {
      showCheckInLoadingThenComplete(completed);
    }
    return;
  }

  if (action === "purpose" && isRitualPurpose(value)) {
    if (!activeCheckInDraft.energyCapacity) {
      return;
    }

    const option = purposeOptions.find((candidate) => candidate.key === value);
    const nextStep = activeCheckInDraft.energyCapacity === "barely_any"
      ? "purpose"
      : "carrier";

    const nextDraft: RitualCheckInDraft = {
      ...activeCheckInDraft,
      purpose: value,
      purposeLabel: option?.label,
      ...(option ? { ritualFocusLabel: option.label } : {}),
      carrier: undefined,
      carrierLabel: undefined,
      carrierOpen: undefined,
      refinement: undefined,
      refinementLabel: undefined,
      step: nextStep,
    };

    activeCheckInDraft = nextDraft;

    if (activeCheckInDraft.energyCapacity === "barely_any") {
      const completed = maybeCompleteCheckIn(nextDraft);
      if (completed) {
        showCheckInLoadingThenComplete(completed);
      }
      return;
    }

    renderActiveCheckInShell();
    return;
  }

  if (
    action === "refinement" &&
    activeCheckInDraft.purpose &&
    isRitualRefinementOption(activeCheckInDraft.purpose, value)
  ) {
    const option = getRefinementGroupForPurpose(activeCheckInDraft.purpose)
      .options.find((candidate) => candidate.key === value);

    activeCheckInDraft = {
      ...activeCheckInDraft,
      refinement: option?.label ?? value,
      refinementLabel: option?.label ?? value,
      step: "review",
    };
    renderActiveCheckInShell();
    return;
  }

  if (action === "confirm_review" && value === "confirm") {
    const completed = maybeCompleteCheckIn(activeCheckInDraft);

    if (completed) {
      showCheckInLoadingThenComplete(completed);
    }
  }
}

function getPreviousCheckInStep(draft: RitualCheckInDraft): RitualCheckInStep {
  switch (draft.step) {
    case "time_scope":
      return "energy_capacity";
    case "energy_capacity":
      return "entry_path";
    case "audience":
      return "time_scope";
    case "carrier":
      return "purpose";
    case "purpose":
      return draft.energyCapacity === "barely_any" ? "energy_capacity" : "audience";
    case "refinement":
      return "purpose";
    case "review":
      return draft.energyCapacity === "barely_any" ? "purpose" : "carrier";
    case "entry_path":
    default:
      return "entry_path";
  }
}

function getPreviousCheckInDraft(draft: RitualCheckInDraft): RitualCheckInDraft {
  return {
    ...draft,
    step: getPreviousCheckInStep(draft),
  };
}

function isCapacityMode(value: FormDataEntryValue | null): value is CapacityMode {
  return (
    typeof value === "string" &&
    ["pause", "low", "steady", "high"].includes(value)
  );
}

function isAstrologyVisibility(
  value: FormDataEntryValue | null,
): value is AstrologyVisibility {
  return (
    typeof value === "string" &&
    PROFILE_TUNING_ASTROLOGY_VISIBILITY.includes(value as AstrologyVisibility)
  );
}

function getStringListFormValues(formData: FormData, key: string): string[] {
  return formData
    .getAll(key)
    .filter((value): value is string => typeof value === "string")
    .filter(Boolean);
}

function getProfileRitualDuration(formData: FormData): number {
  const ritualSizeChoice = formData.get("ritualSizeChoice");

  if (ritualSizeChoice === "five") {
    return 5;
  }

  if (ritualSizeChoice === "ten") {
    return 10;
  }

  if (ritualSizeChoice === "twenty") {
    return 20;
  }

  if (ritualSizeChoice === "thirty") {
    return 30;
  }

  return Number(formData.get("maxRitualDurationMinutes"));
}

function getProfileTuningFormInput(
  form: HTMLFormElement,
  tuningProfile: ProfileTuningProfile,
): ProfileTuningFormInput {
  const formData = new FormData(form);
  const defaultCapacityMode = formData.get("defaultCapacityMode");
  const astrologyVisibility = formData.get("astrologyVisibility");
  const maxRitualDurationMinutes = getProfileRitualDuration(formData);

  if (!isCapacityMode(defaultCapacityMode)) {
    throw new Error("Choose a supported capacity mode.");
  }

  if (!isAstrologyVisibility(astrologyVisibility)) {
    throw new Error("Choose how visible astrology should be.");
  }

  if (
    !Number.isFinite(maxRitualDurationMinutes) ||
    maxRitualDurationMinutes < 0 ||
    maxRitualDurationMinutes > 30
  ) {
    throw new Error("Max ritual time must be between 0 and 30 minutes.");
  }

  return {
    defaultAudience: tuningProfile.settings.defaultAudience,
    defaultCapacityMode,
    maxRitualDurationMinutes,
    preferredRitualStyles: getStringListFormValues(
      formData,
      "preferredRitualStyles",
    ),
    astrologyVisibility,
    assumptionValues: {},
  };
}

async function handleProfileTuningSubmit(form: HTMLFormElement): Promise<void> {
  if (!firebaseServices || !activePrivateBriefData || !activeSignedInState) {
    return;
  }

  const tuningProfileId = form.dataset.profileTuningId;
  const tuningProfile = activePrivateBriefData.tuningProfiles.find(
    (profile) => profile.id === tuningProfileId,
  );
  const status = form.querySelector<HTMLElement>("[data-profile-tuning-status]");
  const submitButton = form.querySelector<HTMLButtonElement>("button[type='submit']");

  try {
    if (!tuningProfile) {
      throw new Error("Choose a loaded private profile to update.");
    }

    submitButton?.setAttribute("disabled", "true");

    if (status) {
      status.textContent = `Saving ${tuningProfile.label}.`;
    }

    await updatePrivateProfileTuning(
      firebaseServices.db,
      tuningProfile,
      getProfileTuningFormInput(form, tuningProfile),
    );

    if (status) {
      status.textContent = "Saved. Refreshing the brief.";
    }

    renderSignedInState(activeSignedInState);
  } catch (error) {
    if (status) {
      status.textContent =
        error instanceof Error ? error.message : "Could not save settings.";
    }
  } finally {
    submitButton?.removeAttribute("disabled");
  }
}

function closeOpenOverlays(): void {
  document
    .querySelectorAll("details[data-app-menu='true'][open]")
    .forEach((menu) => menu.removeAttribute("open"));
}

function startCheckInOver(): void {
  clearCheckInLoadingTimeout();
  activeChooseWithMeResult = null;
  activeChooseWithMeExcludedRitualIds = [];
  activeChooseWithMeRecommendationInstance = null;
  activeChooseWithMeInteractionStatus = undefined;
  activeCurrentRitualCheckIn = null;
  activeCheckInDraft = createInitialRitualCheckInDraft();
  activeSignedInView = "this_week";
  activeProfileSettingsTabId = null;
  renderActiveCheckInShell();
}

async function showSignedInView(view: SignedInView): Promise<void> {
  activeSignedInView = view;
  activeProfileSettingsTabId = null;

  if (!activePrivateBriefData) {
    return;
  }

  if (
    view === "search_rituals" ||
    view === "manage_rituals" ||
    (view === "this_week" && activeChooseWithMeResult)
  ) {
    await ensureActiveRitualRepositoryLoaded();
  }

  if (view === "this_week" && !activeChooseWithMeResult) {
    renderActiveCheckInShell();
    return;
  }

  renderActiveSignedInShell();
}

async function renderSearchRituals(): Promise<void> {
  activeSignedInView = "search_rituals";
  activeProfileSettingsTabId = null;

  if (activePrivateBriefData) {
    await ensureActiveRitualRepositoryLoaded();
    renderActiveSignedInShell();
  }
}

function renderRitualSearchBodyOnly(): void {
  const searchBody = document.querySelector<HTMLElement>(".ritual-search__body");

  if (!searchBody) {
    return;
  }

  const nextBody = renderSearchRitualsBody({
    query: activeRitualSearchQuery,
    selectedChips: activeRitualSearchChips,
    selectedRitualId: activeSelectedRitualId,
    sort: activeRitualSearchSort,
    source: activeRitualSearchSource,
    purpose: activeRitualSearchPurpose,
    carrier: activeRitualSearchCarrier,
    capacity: activeRitualSearchCapacity,
    audience: activeRitualSearchAudience,
    timing: activeRitualSearchTiming,
    favoritesOnly: activeRitualSearchFavoritesOnly,
    favorites: ritualFavoriteStore.listRitualFavorites(),
    currentTimingWindow: getCurrentTimingWindowForSearch(),
    currentTimingWindows: getCurrentTimingWindowsForSearch(),
    ritualRepository: activeRitualRepository,
  });
  const template = document.createElement("template");
  template.innerHTML = nextBody.trim();
  const nextBodyElement = template.content.firstElementChild;

  if (nextBodyElement instanceof HTMLElement) {
    searchBody.replaceWith(nextBodyElement);
  }
}

function isRitualReviewAction(value: unknown): value is RitualReviewAction {
  return typeof value === "string" &&
    RITUAL_REVIEW_ACTIONS.includes(value as RitualReviewAction);
}

function getManageRitualReviewSuccessMessage(
  action: RitualReviewAction,
  result: SubmitRitualReviewActionResult & { valid: true },
): string {
  switch (action) {
    case "promote_direct_use":
      return "Direct use restored. This Ritual can now appear in Search and direct selection.";
    case "hold_direct_use":
      return "Removed from direct use. This Ritual is no longer available in Search, direct selection, or recommendations.";
    case "promote_recommendation":
      return "Recommendation-ready. Choose with me can now offer this Ritual.";
    case "hold_recommendation":
      return "Removed from recommendations. This Ritual can still be used directly.";
    case "mark_needs_source_recheck":
      return "Marked for source recheck. This Ritual is held until source grounding is reviewed.";
    case "mark_needs_packet_correction":
      return "Marked for packet correction. This Ritual is held until the extraction/import issue is reviewed.";
    case "add_review_note":
      return "Review note recorded. Availability was not changed.";
    case "archive_ritual":
      return "Ritual archived. It is no longer available in active use paths.";
    case "rollback_published_version":
      return `Rollback recorded. Published version is now ${result.publishedVersionId ?? result.currentVersionId}.`;
  }
}

async function handleManageRitualReviewSubmit(
  form: HTMLFormElement,
): Promise<void> {
  if (activeManageRitualActionSubmitting) {
    activeManageRitualActionStatus = {
      tone: "info",
      message: "A review decision is already being recorded.",
    };
    renderActiveSignedInShell();
    return;
  }

  const ritualId = form.dataset.ritualId;
  const versionId = form.dataset.versionId;
  const formData = new FormData(form);
  const actionSelect = form.querySelector<HTMLSelectElement>(
    "[name='manageRitualReviewAction']",
  );
  const selectedActionOption =
    actionSelect?.selectedOptions.item(0) ?? undefined;
  const actionValue = formData.get("manageRitualReviewAction");
  const reason = String(formData.get("manageRitualReviewReason") ?? "").trim();

  if (!ritualId || !versionId || !isRitualReviewAction(actionValue)) {
    activeManageRitualActionStatus = {
      tone: "error",
      message: "That review action could not be read from the form.",
    };
    renderActiveSignedInShell();
    return;
  }

  if (
    selectedActionOption?.dataset.requiresReason === "true" &&
    reason.length === 0
  ) {
    activeManageRitualActionStatus = {
      ritualId,
      tone: "error",
      message: "Add a short reason or note before recording this review action.",
    };
    renderActiveSignedInShell();
    return;
  }

  const currentUser = firebaseServices?.auth.currentUser;
  if (!currentUser) {
    activeManageRitualActionStatus = {
      ritualId,
      tone: "error",
      message: "Sign in again before recording a Ritual review decision.",
    };
    renderActiveSignedInShell();
    return;
  }

  activeManageRitualActionSubmitting = true;
  activeManageRitualActionStatus = {
    ritualId,
    tone: "info",
    message: "Recording review decision...",
  };
  renderActiveSignedInShell();

  try {
    const result = await submitRitualReviewAction({
      idToken: await currentUser.getIdToken(),
      request: {
        ritualId,
        versionId,
        action: actionValue,
        reasons: reason ? [reason] : [],
      },
    });

    if (!result.valid) {
      activeManageRitualActionStatus = {
        ritualId,
        tone: "error",
        message: result.findings[0]?.message ?? "Review decision was not recorded.",
      };
      renderActiveSignedInShell();
      return;
    }

    applyReviewActionResultToActiveRitualDocuments(result);
    activeManageRitualActionStatus = {
      ritualId,
      tone: "success",
      message: getManageRitualReviewSuccessMessage(actionValue, result),
    };
    renderActiveSignedInShell();
  } catch (error) {
    activeManageRitualActionStatus = {
      ritualId,
      tone: "error",
      message: error instanceof Error
        ? error.message
        : "Review decision was not recorded.",
    };
    renderActiveSignedInShell();
  } finally {
    activeManageRitualActionSubmitting = false;
  }
}

function renderChooseWithMeInteractionStatus(status: string): void {
  activeChooseWithMeInteractionStatus = status;
  renderActiveSignedInShell({ chooseWithMeInteractionStatus: status });
}

function getRecommendationInstanceId(
  element: HTMLElement,
): string | undefined {
  return element.dataset.recommendationInstanceId ||
    activeChooseWithMeRecommendationInstance?.id;
}

function getActiveHouseholdId(): string | undefined {
  return activePrivateBriefData?.householdId;
}

async function loadPersistedHouseholdRitualState(): Promise<void> {
  const householdId = getActiveHouseholdId();

  resetRitualInteractionState();

  if (!firebaseServices || !householdId) {
    return;
  }

  const householdState = await loadHouseholdRitualState(
    firebaseServices.db,
    householdId,
  );

  ritualFavoriteStore = createRitualFavoriteStore(householdState.favorites);
  ritualInteractionStore = createRecommendationEventStore(
    householdState.recommendationInstances,
    householdState.interactionEvents,
  );
  markHouseholdMemorySkippedRecords(householdState.diagnostics.skippedRecords);
}

async function persistRitualFavorite(favorite: RitualFavorite): Promise<void> {
  const householdId = getActiveHouseholdId();

  if (!firebaseServices || !householdId) {
    return;
  }

  await saveRitualFavorite(firebaseServices.db, householdId, favorite);
}

async function persistRitualInteractionEvent(
  event: RitualInteractionEvent,
): Promise<void> {
  const householdId = getActiveHouseholdId();

  if (!firebaseServices || !householdId) {
    return;
  }

  await saveRitualInteractionEvent(firebaseServices.db, householdId, event);
}

async function persistRecommendationRecord(
  instance: RecommendationInstance,
  shownEvent: RitualInteractionEvent,
): Promise<void> {
  const householdId = getActiveHouseholdId();

  if (!firebaseServices || !householdId) {
    return;
  }

  await Promise.all([
    saveRecommendationInstance(firebaseServices.db, householdId, instance),
    saveRitualInteractionEvent(firebaseServices.db, householdId, shownEvent),
  ]);
}

async function handleRitualFavoriteToggle(target: HTMLElement): Promise<void> {
  const ritualId = target.dataset.ritualFavoriteToggle;
  const sourceSurface = target.dataset.ritualFavoriteSource;

  if (!ritualId || !isRitualFavoriteSourceSurface(sourceSurface)) {
    return;
  }

  const ritual = getRitualOrThrow(ritualId);
  const favorite = ritualFavoriteStore.toggleRitualFavorite({
    ritualId,
    ritual,
    sourceSurface,
  });
  const recommendationInstanceId =
    sourceSurface === "choose_with_me"
      ? getRecommendationInstanceId(target)
      : undefined;
  let event: RitualInteractionEvent;

  if (favorite.active) {
    event = ritualInteractionStore.recordFavoriteAdded({
      ritualId,
      surface: sourceSurface,
      recommendationInstanceId,
    });
  } else {
    event = ritualInteractionStore.recordFavoriteRemoved({
      ritualId,
      surface: sourceSurface,
      recommendationInstanceId,
    });
  }

  if (sourceSurface === "choose_with_me") {
    try {
      await Promise.all([
        persistRitualFavorite(favorite),
        persistRitualInteractionEvent(event),
      ]);
      clearHouseholdMemoryWriteFailureStatus();
      renderChooseWithMeInteractionStatus(
        favorite.active ? "Saved favorite." : "Removed favorite.",
      );
    } catch {
      markHouseholdMemoryWriteFailure({
        operation: favorite.active ? "favorite_added" : "favorite_removed",
        recordType: "favorite",
      });
      renderChooseWithMeInteractionStatus("Saved locally; sync failed.");
    }
    return;
  }

  try {
    await Promise.all([
      persistRitualFavorite(favorite),
      persistRitualInteractionEvent(event),
    ]);
    clearHouseholdMemoryWriteFailureStatus();
  } catch {
    markHouseholdMemoryWriteFailure({
      operation: favorite.active ? "favorite_added" : "favorite_removed",
      recordType: "favorite",
    });
  }

  void renderSearchRituals();
}

async function recordChooseWithMeFeedback(input: {
  ritualId: string;
  recommendationInstanceId?: string;
  fit: RitualFeedbackFit;
  reasons: RitualFeedbackReason[];
  note?: string;
}): Promise<void> {
  const recommendationInstanceId =
    input.recommendationInstanceId ??
    activeChooseWithMeRecommendationInstance?.id;

  if (!recommendationInstanceId) {
    throw new Error("Choose with me feedback needs a recommendation instance.");
  }

  const event = ritualInteractionStore.recordRitualFeedback({
    recommendationInstanceId,
    ritualId: input.ritualId,
    feedback: {
      fit: input.fit,
      reasons: input.reasons,
      note: input.note,
    },
  });

  try {
    await persistRitualInteractionEvent(event);
    clearHouseholdMemoryWriteFailureStatus();
  } catch {
    markHouseholdMemoryWriteFailure({
      operation: "feedback_submitted",
      recordType: "interactionEvent",
    });
    throw new Error("Saved locally; sync failed.");
  }
}

async function handleChooseWithMeFitFeedback(target: HTMLElement): Promise<void> {
  const ritualId = target.dataset.ritualId;

  if (!ritualId) {
    return;
  }

  try {
    await recordChooseWithMeFeedback({
      ritualId,
      recommendationInstanceId: getRecommendationInstanceId(target),
      fit: "fit",
      reasons: ["right_ritual"],
    });
    renderChooseWithMeInteractionStatus("I'm very glad.");
  } catch (error) {
    renderChooseWithMeInteractionStatus(
      error instanceof Error ? error.message : "Could not save feedback.",
    );
  }
}

async function handleChooseWithMeTryAnother(target: HTMLElement): Promise<void> {
  const ritualId = target.dataset.ritualId;
  const recommendationInstanceId = getRecommendationInstanceId(target);
  const checkIn = activeCurrentRitualCheckIn;

  if (!ritualId || !recommendationInstanceId || !checkIn) {
    renderChooseWithMeInteractionStatus("Could not save that request.");
    return;
  }

  try {
    const tryAnotherEvent = ritualInteractionStore.recordTryAnotherRequested({
      recommendationInstanceId,
      ritualId,
    });
    let syncFailed = false;
    try {
      await persistRitualInteractionEvent(tryAnotherEvent);
      clearHouseholdMemoryWriteFailureStatus();
    } catch {
      syncFailed = true;
      markHouseholdMemoryWriteFailure({
        operation: "try_another_requested",
        recordType: "interactionEvent",
      });
    }

    const previousExcludedRitualIds = activeChooseWithMeExcludedRitualIds;
    activeChooseWithMeExcludedRitualIds = [
      ...new Set([...activeChooseWithMeExcludedRitualIds, ritualId]),
    ];

    await ensureActiveRitualRepositoryLoaded();
    const nextResult = chooseRitualForActiveCheckIn(checkIn);

    if (
      nextResult.status !== "selected" ||
      nextResult.selectedRitual.id === ritualId
    ) {
      activeChooseWithMeExcludedRitualIds = previousExcludedRitualIds;
      renderChooseWithMeInteractionStatus(
        "I do not have another recommendation-ready option for those answers yet.",
      );
      return;
    }

    activeChooseWithMeResult = nextResult;
    activeChooseWithMeRecommendationInstance = createRecommendationInstanceForResult(
      checkIn,
      nextResult,
    );
    activeChooseWithMeInteractionStatus = syncFailed
      ? "Saved locally; sync failed."
      : "Here is another strong option.";
    renderActiveSignedInShell();
  } catch (error) {
    renderChooseWithMeInteractionStatus(
      error instanceof Error ? error.message : "Could not save that request.",
    );
  }
}

async function handleChooseWithMeNotQuiteFeedback(
  form: HTMLFormElement,
): Promise<void> {
  const ritualId = form.dataset.ritualId;
  const formData = new FormData(form);
  const reasons = formData
    .getAll("ritualFeedbackReason")
    .filter(isRitualFeedbackReason);
  const hasNegativeReason = reasons.some(
    (reason) => reason !== "more_like_this" && reason !== "right_ritual",
  );
  const fit: RitualFeedbackFit = hasNegativeReason
    ? "not_fit"
    : reasons.includes("more_like_this")
      ? "fit"
      : "mixed";
  const noteValue = String(formData.get("ritualFeedbackNote") ?? "").trim();
  const note = noteValue.length > 0 ? noteValue : undefined;

  if (!ritualId) {
    return;
  }

  try {
    await recordChooseWithMeFeedback({
      ritualId,
      recommendationInstanceId: getRecommendationInstanceId(form),
      fit,
      reasons,
      note,
    });
    renderChooseWithMeInteractionStatus("Saved feedback.");
  } catch (error) {
    renderChooseWithMeInteractionStatus(
      error instanceof Error ? error.message : "Could not save feedback.",
    );
  }
}

async function handleRitualSelected(ritualId: string): Promise<void> {
  activeSelectedRitualId = ritualId;
  const event = ritualInteractionStore.recordRitualSelected({
    ritualId,
    surface: "search",
  });

  try {
    await persistRitualInteractionEvent(event);
    clearHouseholdMemoryWriteFailureStatus();
  } catch {
    markHouseholdMemoryWriteFailure({
      operation: "ritual_selected",
      recordType: "interactionEvent",
    });
  }

  void renderSearchRituals();
}

function toggleRitualSearchChip(chip: string): void {
  activeRitualSearchChips = activeRitualSearchChips.includes(chip)
    ? activeRitualSearchChips.filter((activeChip) => activeChip !== chip)
    : [...activeRitualSearchChips, chip];
  activeSelectedRitualId = null;
  void renderSearchRituals();
}

render({ status: "loading" });

appRoot.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const tuningForm = target.closest<HTMLFormElement>(
    "[data-profile-tuning-form='true']",
  );

  if (event.type === "submit" && tuningForm) {
    event.preventDefault();
    void handleProfileTuningSubmit(tuningForm);
    return;
  }

  const action = target.dataset.authAction;
  const homeActionTarget = target.closest<HTMLElement>("[data-home-action]");
  const homeAction = homeActionTarget?.dataset.homeAction;
  const menuActionTarget = target.closest<HTMLElement>("[data-menu-action]");
  const menuAction = menuActionTarget?.dataset.menuAction;
  const profileSettingsTabTarget = target.closest<HTMLElement>(
    "[data-profile-settings-tab]",
  );
  const profileSettingsTab = profileSettingsTabTarget?.dataset.profileSettingsTab;
  const checkInActionTarget = target.closest<HTMLElement>("[data-check-in-action]");
  const checkInAction = checkInActionTarget?.dataset.checkInAction;
  const checkInValue = checkInActionTarget?.dataset.checkInValue;
  const ritualSearchChipTarget = target.closest<HTMLElement>(
    "[data-ritual-search-chip]",
  );
  const ritualSearchChip = ritualSearchChipTarget?.dataset.ritualSearchChip;
  const ritualFavoriteTarget = target.closest<HTMLElement>(
    "[data-ritual-favorite-toggle]",
  );
  const ritualFeedbackFitTarget = target.closest<HTMLElement>(
    "[data-ritual-feedback-fit]",
  );
  const ritualTryAnotherTarget = target.closest<HTMLElement>(
    "[data-ritual-try-another='true']",
  );
  const ritualSelectTarget = target.closest<HTMLElement>("[data-ritual-select]");
  const ritualSelect = ritualSelectTarget?.dataset.ritualSelect;
  const manageRitualSortTarget = target.closest<HTMLElement>(
    "[data-manage-ritual-sort]",
  );
  const manageRitualSort = manageRitualSortTarget?.dataset.manageRitualSort;
  const manageRitualEditorTarget = target.closest<HTMLElement>(
    "[data-manage-ritual-open-editor]",
  );
  const manageRitualEditorId =
    manageRitualEditorTarget?.dataset.manageRitualOpenEditor;

  if (target.closest("[data-private-welcome-action='dismiss']")) {
    void handlePrivateWelcomeDismiss();
    return;
  }

  if (target.closest("[data-search-rituals-entry='true']")) {
    activeRitualSearchTiming = "all";
    void renderSearchRituals();
    return;
  }

  if (target.closest("[data-timing-rituals-entry='true']")) {
    activeRitualSearchTiming = "current";
    activeRitualSearchSort = "match";
    activeSelectedRitualId = null;
    void renderSearchRituals();
    return;
  }

  if (target.closest("[data-ritual-search-back='true']")) {
    startCheckInOver();
    return;
  }

  if (target.closest("[data-ritual-search-clear='true']")) {
    event.preventDefault();
    resetRitualSearchState();
    void renderSearchRituals();
    return;
  }

  if (target.closest("[data-manage-rituals-clear='true']")) {
    event.preventDefault();
    activeManageRitualFilters = { ...defaultManageRitualFilters };
    activeManageRitualEditorId = null;
    clearManageRitualEditorDraftState();
    renderActiveSignedInShell();
    return;
  }

  if (target.closest("[data-check-in-start-over='true']")) {
    startCheckInOver();
    return;
  }

  if (checkInAction && typeof checkInValue === "string") {
    handleCheckInAction(checkInAction, checkInValue);
    return;
  }

  if (homeAction === "this_week") {
    event.preventDefault();

    if (activePrivateBriefData) {
      startCheckInOver();
    }

    return;
  }

  if (menuAction === "choose_ritual") {
    event.preventDefault();
    menuActionTarget
      ?.closest("details[data-app-menu='true']")
      ?.removeAttribute("open");
    startCheckInOver();
    return;
  }

  if (
    menuAction === "this_week" ||
    menuAction === "search_rituals" ||
    menuAction === "manage_rituals" ||
    menuAction === "profile_settings" ||
    menuAction === "how_it_works"
  ) {
    event.preventDefault();
    activeSignedInView = menuAction;
    menuActionTarget
      ?.closest("details[data-app-menu='true']")
      ?.removeAttribute("open");

    void showSignedInView(menuAction);
    return;
  }

  if (ritualSearchChip) {
    event.preventDefault();
    toggleRitualSearchChip(ritualSearchChip);
    return;
  }

  if (ritualFavoriteTarget) {
    event.preventDefault();
    void handleRitualFavoriteToggle(ritualFavoriteTarget);
    return;
  }

  if (ritualFeedbackFitTarget) {
    event.preventDefault();
    void handleChooseWithMeFitFeedback(ritualFeedbackFitTarget);
    return;
  }

  if (ritualTryAnotherTarget) {
    event.preventDefault();
    void handleChooseWithMeTryAnother(ritualTryAnotherTarget);
    return;
  }

  if (ritualSelect) {
    event.preventDefault();
    void handleRitualSelected(ritualSelect);
    return;
  }

  if (manageRitualSort) {
    event.preventDefault();
    const sort = manageRitualSort as ManageRitualSortKey;
    const direction: ManageRitualSortDirection =
      activeManageRitualFilters.sort === sort &&
      activeManageRitualFilters.direction === "asc"
        ? "desc"
        : "asc";

    activeManageRitualFilters = {
      ...activeManageRitualFilters,
      sort,
      direction,
    };
    renderActiveSignedInShell();
    return;
  }

  if (manageRitualEditorId) {
    event.preventDefault();
    activeManageRitualEditorId = manageRitualEditorId;
    clearManageRitualEditorDraftState();
    renderActiveSignedInShell();
    requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>("[data-manage-ritual-editor='true']")
        ?.scrollIntoView({ block: "start" });
    });
    void loadOrCreateManageRitualEditorDraft(manageRitualEditorId);
    return;
  }

  if (target.closest("[data-manage-ritual-validate-draft='true']")) {
    event.preventDefault();
    validateActiveManageRitualEditorDraft();
    return;
  }

  if (target.closest("[data-manage-ritual-apply-draft='true']")) {
    event.preventDefault();
    const form = target.closest<HTMLFormElement>(
      "[data-manage-ritual-draft-form='true']",
    );

    if (form) {
      void applyActiveManageRitualEditorDraft(form);
    }
    return;
  }

  if (profileSettingsTab) {
    event.preventDefault();
    activeProfileSettingsTabId = profileSettingsTab;
    renderActiveSignedInShell();
    return;
  }

  if (action === "sign-in") {
    void signInWithGoogle(firebaseServices, googleSignInMode).catch(() => {
      render({ status: "signed_out", configReady: Boolean(firebaseServices) });
    });
  }

  if (action === "sign-out") {
    clearCheckInLoadingTimeout();
    target.closest("details[data-app-menu='true']")?.removeAttribute("open");
    activeCurrentRitualCheckIn = null;
    activeChooseWithMeResult = null;
    resetRitualInteractionState();
    activeCheckInDraft = createInitialRitualCheckInDraft();
    void signOutOfFirebase(firebaseServices);
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const clickedMenu = Boolean(target.closest("details[data-app-menu='true']"));
  if (!clickedMenu) {
    document
      .querySelectorAll("details[data-app-menu='true'][open]")
      .forEach((menu) => menu.removeAttribute("open"));
  }

});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  const hadOpenMenu = Boolean(
    document.querySelector("details[data-app-menu='true'][open]"),
  );

  closeOpenOverlays();

  if (hadOpenMenu) {
    event.preventDefault();
  }
});

appRoot.addEventListener("change", (event) => {
  const target = event.target;

  if (
    target instanceof HTMLSelectElement &&
    (
      target.matches("[data-ritual-search-sort='true']") ||
      target.matches("[data-ritual-search-source='true']") ||
      target.matches("[data-ritual-search-purpose='true']") ||
      target.matches("[data-ritual-search-carrier='true']") ||
      target.matches("[data-ritual-search-capacity='true']") ||
      target.matches("[data-ritual-search-audience='true']") ||
      target.matches("[data-ritual-search-timing='true']")
    )
  ) {
    activeRitualSearchSort = (
      document.querySelector<HTMLSelectElement>("[name='ritualSearchSort']")
        ?.value ?? activeRitualSearchSort
    ) as RitualSearchSort;
    activeRitualSearchSource =
      document.querySelector<HTMLSelectElement>("[name='ritualSearchSource']")
        ?.value ?? activeRitualSearchSource;
    activeRitualSearchPurpose =
      document.querySelector<HTMLSelectElement>("[name='ritualSearchPurpose']")
        ?.value ?? activeRitualSearchPurpose;
    activeRitualSearchCarrier =
      document.querySelector<HTMLSelectElement>("[name='ritualSearchCarrier']")
        ?.value ?? activeRitualSearchCarrier;
    activeRitualSearchCapacity =
      document.querySelector<HTMLSelectElement>("[name='ritualSearchCapacity']")
        ?.value ?? activeRitualSearchCapacity;
    activeRitualSearchAudience =
      document.querySelector<HTMLSelectElement>("[name='ritualSearchAudience']")
        ?.value ?? activeRitualSearchAudience;
    activeRitualSearchTiming = normalizeRitualSearchTimingFilter(
      document.querySelector<HTMLSelectElement>("[name='ritualSearchTiming']")
        ?.value ?? activeRitualSearchTiming,
    );
    activeSelectedRitualId = null;
    void renderSearchRituals();
  }

  if (
    target instanceof HTMLInputElement &&
    target.matches("[data-ritual-search-favorites-only='true']")
  ) {
    activeRitualSearchFavoritesOnly = target.checked;
    activeSelectedRitualId = null;
    void renderSearchRituals();
  }

  if (
    target instanceof HTMLSelectElement &&
    target.matches("[data-manage-rituals-filter='true']")
  ) {
    const origin =
      (document.querySelector<HTMLSelectElement>(
        "[name='manageRitualOrigin']",
      )?.value as ManageRitualOriginFilter | undefined) ??
      activeManageRitualFilters.origin;

    activeManageRitualFilters = {
      ...activeManageRitualFilters,
      status:
        (document.querySelector<HTMLSelectElement>(
          "[name='manageRitualStatus']",
        )?.value as ManageRitualStatusFilter | undefined) ??
        activeManageRitualFilters.status,
      origin,
      source: origin === "household"
        ? "all"
        : document.querySelector<HTMLSelectElement>("[name='manageRitualSource']")
          ?.value ?? activeManageRitualFilters.source,
      availability:
        (document.querySelector<HTMLSelectElement>(
          "[name='manageRitualAvailability']",
        )?.value as ManageRitualAvailabilityFilter | undefined) ??
        activeManageRitualFilters.availability,
      readiness:
        (document.querySelector<HTMLSelectElement>(
          "[name='manageRitualReadiness']",
        )?.value as ManageRitualReadinessFilter | undefined) ??
        activeManageRitualFilters.readiness,
      validation:
        (document.querySelector<HTMLSelectElement>(
          "[name='manageRitualValidation']",
        )?.value as ManageRitualValidationFilter | undefined) ??
        activeManageRitualFilters.validation,
    };
    renderActiveSignedInShell();
  }
});

appRoot.addEventListener("input", (event) => {
  const target = event.target;

  if (
    (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) &&
    target.matches("[data-manage-ritual-draft-field='true']")
  ) {
    const form = target.closest<HTMLFormElement>(
      "[data-manage-ritual-draft-form='true']",
    );

    if (form) {
      markManageRitualEditorDraftUnsaved(form);
    }
    return;
  }

  if (
    target instanceof HTMLInputElement &&
    target.matches("[name='ritualSearchQuery']")
  ) {
    activeRitualSearchQuery = target.value;
    activeSelectedRitualId = null;
    renderRitualSearchBodyOnly();
  }
});

appRoot.addEventListener("change", (event) => {
  const target = event.target;

  if (
    (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) &&
    target.matches("[data-manage-ritual-choose-preview-field='true']")
  ) {
    const form = target.closest<HTMLFormElement>(
      "[data-manage-ritual-choose-preview-form='true']",
    );

    if (form) {
      updateManageRitualChoosePreviewSample(form);
    }
    return;
  }

  if (
    (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) &&
    target.matches("[data-manage-ritual-draft-field='true']")
  ) {
    const form = target.closest<HTMLFormElement>(
      "[data-manage-ritual-draft-form='true']",
    );

    if (form) {
      if (
        target instanceof HTMLSelectElement &&
        (target.name === "primaryPurpose" || target.name === "primaryCarrier")
      ) {
        syncManageRitualExclusiveSecondaryChoices(form);
      }
      markManageRitualEditorDraftUnsaved(form);
    }
  }
});

if (devVisualQaMode) {
  renderDevVisualQaState();
} else {
  void completeRedirectSignIn(firebaseServices).catch(() => {
    render({ status: "signed_out", configReady: Boolean(firebaseServices) });
  });

  subscribeToAuthState(firebaseServices, (state) => {
    if (state.status === "signed_in") {
      renderSignedInState(state);
      return;
    }

    activeSignedInState = null;
    activePrivateBriefData = null;
    activeChooseWithMeResult = null;
    activeSignedInView = "this_week";
    activeProfileSettingsTabId = null;
    resetActiveRitualRepository();
    resetRitualSearchState();
    resetRitualInteractionState();
    activeManageRitualFilters = { ...defaultManageRitualFilters };
    activeManageRitualEditorId = null;
    clearManageRitualEditorDraftState();
    activeCurrentRitualCheckIn = null;
    activeCheckInDraft = createInitialRitualCheckInDraft();
    clearCheckInLoadingTimeout();
    privateDataRequestId += 1;
    render(state);
  });
}

appRoot.addEventListener("submit", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLFormElement)) {
    return;
  }

  if (target.matches("[data-ritual-feedback-form='feedback']")) {
    event.preventDefault();
    void handleChooseWithMeNotQuiteFeedback(target);
    return;
  }

  if (target.matches("[data-profile-tuning-form='true']")) {
    event.preventDefault();
    void handleProfileTuningSubmit(target);
  }

  if (target.matches("[data-manage-ritual-review-form='true']")) {
    event.preventDefault();
    void handleManageRitualReviewSubmit(target);
    return;
  }

  if (target.matches("[data-manage-ritual-draft-form='true']")) {
    event.preventDefault();
    void saveManageRitualEditorDraft(target);
    return;
  }

  if (target.matches("[data-ritual-search-form='true']")) {
    event.preventDefault();
    const formData = new FormData(target);
    activeRitualSearchQuery = String(formData.get("ritualSearchQuery") ?? "");
    activeRitualSearchSort = String(
      formData.get("ritualSearchSort") ?? activeRitualSearchSort,
    ) as RitualSearchSort;
    activeRitualSearchSource = String(
      formData.get("ritualSearchSource") ?? activeRitualSearchSource,
    );
    activeRitualSearchPurpose = String(
      formData.get("ritualSearchPurpose") ?? activeRitualSearchPurpose,
    );
    activeRitualSearchCarrier = String(
      formData.get("ritualSearchCarrier") ?? activeRitualSearchCarrier,
    );
    activeRitualSearchCapacity = String(
      formData.get("ritualSearchCapacity") ?? activeRitualSearchCapacity,
    );
    activeRitualSearchAudience = String(
      formData.get("ritualSearchAudience") ?? activeRitualSearchAudience,
    );
    activeRitualSearchTiming = normalizeRitualSearchTimingFilter(
      formData.get("ritualSearchTiming") ?? activeRitualSearchTiming,
    );
    activeRitualSearchFavoritesOnly =
      formData.get("ritualSearchFavoritesOnly") === "on";
    activeSelectedRitualId = null;
    void renderSearchRituals();
  }

  if (target.matches("[data-manage-rituals-filter-form='true']")) {
    event.preventDefault();
  }
});
