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
import {
  generateWeeklyBrief,
  type CapacityMode,
  type WeeklyBrief,
} from "./lib/generate-weekly-brief";
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
  getTimingWindowCandidates,
  type TimingWindowCandidate,
} from "./lib/timing-window-candidates";
import { getDefaultTimingTimezone, getTimingFactsForDate } from "./lib/timing-facts";
import { createTodaysShapeBrief } from "./lib/todays-shape-brief";
import {
  isBriefFeedbackType,
  saveBriefFeedback,
  type BriefFeedbackType,
} from "./lib/brief-feedback";
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
  renderSignedInShell,
  type RitualSearchSort,
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
import { sourceBackedRituals } from "./data/rituals/source-backed-rituals";
import {
  ritualTimingPresetOptions,
  type RitualTimingFilter,
} from "./data/rituals/search-rituals";
import {
  chooseWithMeRitual,
  type ChooseWithMeResult,
} from "./data/rituals/choose-with-me-selector";
import "./styles.css";

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
let activeBrief: WeeklyBrief | null = null;
let activeChooseWithMeResult: ChooseWithMeResult | null = null;
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
let activeRitualSearchTiming: RitualTimingFilter = "all";
let activeSelectedRitualId: string | null = null;
let activeManageRitualFilters: ManageRitualFilters = {
  ...defaultManageRitualFilters,
};
const showDebugTrace = new URLSearchParams(window.location.search).get("debug") === "true";

function resetRitualSearchState(): void {
  activeRitualSearchQuery = "";
  activeRitualSearchChips = [];
  activeRitualSearchSort = "match";
  activeRitualSearchSource = "all";
  activeRitualSearchPurpose = "all";
  activeRitualSearchCarrier = "all";
  activeRitualSearchTiming = "all";
  activeSelectedRitualId = null;
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

function isStrongTimingWindow(
  candidate: TimingWindowCandidate | undefined,
): candidate is TimingWindowCandidate {
  return candidate !== undefined && candidate.strength !== "accent" && candidate.score >= 10;
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

function getCurrentTimingWindowForSearch(): TimingWindowCandidate | undefined {
  const currentDateValue = activePrivateBriefData?.input.currentDate ?? new Date();
  const currentDate = currentDateValue instanceof Date
    ? currentDateValue
    : new Date(currentDateValue);

  if (Number.isNaN(currentDate.getTime())) {
    return undefined;
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

  return candidates.find(
    (candidate) =>
      isStrongTimingWindow(candidate) &&
      isNearCurrentTimingWindow(candidate, currentDate),
  );
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

function getActiveBriefInput(
  excludedRitualPatternKeys?: string[],
): Parameters<typeof generateWeeklyBrief>[0] {
  if (!activePrivateBriefData) {
    return {};
  }

  return {
    ...activePrivateBriefData.input,
    ...(activeCurrentRitualCheckIn
      ? {
          currentRitualCheckIn: activeCurrentRitualCheckIn,
          capacityMode: activeCurrentRitualCheckIn.capacityMode,
          audience: activeCurrentRitualCheckIn.audience === "both_of_us"
            ? "together"
            : activePrivateBriefData.input.audience,
        }
      : {}),
    ...(excludedRitualPatternKeys
      ? { excludedRitualPatternKeys }
      : {}),
  };
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
    activeBrief = generateWeeklyBrief(getActiveBriefInput());
    activeChooseWithMeResult = null;
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
  feedbackStatus?: string;
  tryAgainStatus?: string;
  selectedFeedbackType?: BriefFeedbackType;
  savingFeedbackType?: BriefFeedbackType;
} = {}): void {
  if (!activePrivateBriefData) {
    return;
  }

  appRoot.innerHTML = renderSignedInShell(activePrivateBriefData, {
    activeView: activeSignedInView,
    brief: activeBrief ?? undefined,
    chooseWithMeResult: activeChooseWithMeResult ?? undefined,
    feedbackStatus: options.feedbackStatus,
    tryAgainStatus: options.tryAgainStatus,
    selectedFeedbackType: options.selectedFeedbackType,
    savingFeedbackType: options.savingFeedbackType,
    showDebugTrace,
    activeProfileSettingsTabId,
    ritualSearchQuery: activeRitualSearchQuery,
    selectedRitualSearchChips: activeRitualSearchChips,
    ritualSearchSort: activeRitualSearchSort,
    ritualSearchSource: activeRitualSearchSource,
    ritualSearchPurpose: activeRitualSearchPurpose,
    ritualSearchCarrier: activeRitualSearchCarrier,
    ritualSearchTiming: activeRitualSearchTiming,
    currentTimingWindow: getCurrentTimingWindowForSearch(),
    selectedRitualId: activeSelectedRitualId,
    manageRitualFilters: activeManageRitualFilters,
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
    .then((privateBriefData) => {
      if (requestId === privateDataRequestId) {
        if (!hasLoadedPrivateData(privateBriefData)) {
          activeSignedInState = null;
          activePrivateBriefData = null;
          activeBrief = null;
          activeChooseWithMeResult = null;
          activeSignedInView = "this_week";
          activeProfileSettingsTabId = null;
          resetRitualSearchState();
          activeManageRitualFilters = { ...defaultManageRitualFilters };
          activeFirstLoginCheckIn = false;
          appRoot.innerHTML = renderAppShell({
            status: "unauthorized",
            configReady: true,
          });
          return;
        }

        activePrivateBriefData = privateBriefData;
        activeProfileSettingsTabId = null;
        resetRitualSearchState();
        activeManageRitualFilters = { ...defaultManageRitualFilters };
        activeBrief = null;
        activeChooseWithMeResult = null;
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
        activeBrief = null;
        activeChooseWithMeResult = null;
        activeSignedInView = "this_week";
        activeProfileSettingsTabId = null;
        resetRitualSearchState();
        activeManageRitualFilters = { ...defaultManageRitualFilters };
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
  activeManageRitualFilters = { ...defaultManageRitualFilters };
  activeCurrentRitualCheckIn = null;
  activeChooseWithMeResult = null;
  activeFirstLoginCheckIn = false;
  activeCheckInDraft = createInitialRitualCheckInDraft();

  if (activeSignedInView !== "this_week") {
    activeBrief = generateWeeklyBrief(getActiveBriefInput());
    activeChooseWithMeResult = null;
    renderActiveSignedInShell();
    return;
  }

  activeBrief = null;
  activeChooseWithMeResult = null;
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

function renderActiveBriefStatus(
  feedbackStatus: string,
  tryAgainStatus?: string,
  selectedFeedbackType?: BriefFeedbackType,
  savingFeedbackType?: BriefFeedbackType,
): void {
  if (!activePrivateBriefData || !activeBrief) {
    return;
  }

  renderActiveSignedInShell({
    feedbackStatus,
    tryAgainStatus,
    selectedFeedbackType,
    savingFeedbackType,
  });
}

function completeCheckIn(checkIn: CurrentRitualCheckIn): void {
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

  activeCurrentRitualCheckIn = checkIn;
  activeSignedInView = "this_week";
  activeProfileSettingsTabId = null;
  activeFirstLoginCheckIn = false;
  activeBrief = null;
  activeChooseWithMeResult = chooseWithMeRitual(sourceBackedRituals, {
    timeScope: checkIn.timeScope,
    energyCapacity: checkIn.energyCapacity,
    capacityMode: checkIn.capacityMode,
    audience: checkIn.audience,
    carrier: checkIn.carrier ?? null,
    purpose: checkIn.purpose ?? null,
    refinement: checkIn.refinement ?? null,
    freeTextIntent: checkIn.ritualFocusText ?? null,
    timingContext: {
      timingFacts: activePrivateBriefData?.input.timingFacts,
      timingFactDetails: activePrivateBriefData?.input.timingFactDetails,
      computedTimingFacts,
      timingWindowCandidates,
      timingWindowCandidateIds: checkIn.timingWindowCandidateIds,
      selectedTimingWindow,
    },
  });
  renderActiveSignedInShell();
}

function showCheckInLoadingThenComplete(checkIn: CurrentRitualCheckIn): void {
  appRoot.innerHTML = renderRitualCheckInLoadingShell();
  clearCheckInLoadingTimeout();

  checkInLoadingTimeout = window.setTimeout(() => {
    checkInLoadingTimeout = null;
    completeCheckIn(checkIn);
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

async function saveActiveBriefFeedback(
  feedbackType: BriefFeedbackType,
): Promise<void> {
  if (!firebaseServices || !activeSignedInState || !activePrivateBriefData || !activeBrief) {
    throw new Error("Sign in and load a brief before saving feedback.");
  }

  await saveBriefFeedback(firebaseServices.db, {
    feedbackType,
    brief: activeBrief,
    userId: activeSignedInState.user.uid,
    userEmail: activeSignedInState.user.email,
    householdId: activePrivateBriefData.householdId,
  });
}

async function handleFeedbackClick(feedbackType: BriefFeedbackType): Promise<void> {
  try {
    renderActiveBriefStatus("Saving.", undefined, feedbackType, feedbackType);
    await saveActiveBriefFeedback(feedbackType);
    renderActiveBriefStatus(
      feedbackType === "good" ? "I’m very glad." : "Got it.",
      undefined,
      feedbackType,
    );
  } catch (error) {
    renderActiveBriefStatus(
      error instanceof Error ? error.message : "Could not save feedback.",
    );
  }
}

async function handleTryAgainClick(): Promise<void> {
  const currentBrief = activeBrief;

  try {
    renderActiveBriefStatus("Saving try again.", undefined, "try_again", "try_again");
    await saveActiveBriefFeedback("try_again");

    if (!activePrivateBriefData || !currentBrief) {
      throw new Error("Load a brief before trying again.");
    }

    const alternateBrief = generateWeeklyBrief(
      getActiveBriefInput(currentBrief.trace.ritualPatterns),
    );

    if (
      alternateBrief.trace.ritualPatterns[0] ===
      currentBrief.trace.ritualPatterns[0]
    ) {
      renderActiveBriefStatus(
        "Saved.",
        "I do not have another safe option yet. Try changing capacity or practice preferences.",
        "try_again",
      );
      return;
    }

    activeBrief = alternateBrief;
    activeChooseWithMeResult = null;
    renderActiveSignedInShell({
      tryAgainStatus: "Here is another approved option.",
      selectedFeedbackType: "try_again",
    });
  } catch (error) {
    renderActiveBriefStatus(
      error instanceof Error ? error.message : "Could not try again.",
    );
  }
}

function closeOpenOverlays(): void {
  document
    .querySelectorAll("details[data-app-menu='true'][open]")
    .forEach((menu) => menu.removeAttribute("open"));
}

function startCheckInOver(): void {
  clearCheckInLoadingTimeout();
  activeBrief = null;
  activeChooseWithMeResult = null;
  activeCurrentRitualCheckIn = null;
  activeCheckInDraft = createInitialRitualCheckInDraft();
  activeSignedInView = "this_week";
  activeProfileSettingsTabId = null;
  renderActiveCheckInShell();
}

function renderSearchRituals(): void {
  activeSignedInView = "search_rituals";
  activeProfileSettingsTabId = null;

  if (activePrivateBriefData) {
    renderActiveSignedInShell();
  }
}

function toggleRitualSearchChip(chip: string): void {
  activeRitualSearchChips = activeRitualSearchChips.includes(chip)
    ? activeRitualSearchChips.filter((activeChip) => activeChip !== chip)
    : [...activeRitualSearchChips, chip];
  activeSelectedRitualId = null;
  renderSearchRituals();
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
  const feedbackType = target.dataset.feedbackType;
  const checkInActionTarget = target.closest<HTMLElement>("[data-check-in-action]");
  const checkInAction = checkInActionTarget?.dataset.checkInAction;
  const checkInValue = checkInActionTarget?.dataset.checkInValue;
  const ritualSearchChipTarget = target.closest<HTMLElement>(
    "[data-ritual-search-chip]",
  );
  const ritualSearchChip = ritualSearchChipTarget?.dataset.ritualSearchChip;
  const ritualSelectTarget = target.closest<HTMLElement>("[data-ritual-select]");
  const ritualSelect = ritualSelectTarget?.dataset.ritualSelect;
  const manageRitualSortTarget = target.closest<HTMLElement>(
    "[data-manage-ritual-sort]",
  );
  const manageRitualSort = manageRitualSortTarget?.dataset.manageRitualSort;

  if (target.closest("[data-private-welcome-action='dismiss']")) {
    void handlePrivateWelcomeDismiss();
    return;
  }

  if (target.closest("[data-search-rituals-entry='true']")) {
    activeRitualSearchTiming = "all";
    renderSearchRituals();
    return;
  }

  if (target.closest("[data-timing-rituals-entry='true']")) {
    activeRitualSearchTiming = "current";
    activeRitualSearchSort = "match";
    activeSelectedRitualId = null;
    renderSearchRituals();
    return;
  }

  if (target.closest("[data-ritual-search-back='true']")) {
    startCheckInOver();
    return;
  }

  if (target.closest("[data-ritual-search-clear='true']")) {
    event.preventDefault();
    resetRitualSearchState();
    renderSearchRituals();
    return;
  }

  if (target.closest("[data-manage-rituals-clear='true']")) {
    event.preventDefault();
    activeManageRitualFilters = { ...defaultManageRitualFilters };
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

    if (
      activePrivateBriefData &&
      menuAction === "this_week" &&
      !activeBrief &&
      !activeChooseWithMeResult
    ) {
      renderActiveCheckInShell();
    } else if (activePrivateBriefData) {
      renderActiveSignedInShell();
    }

    return;
  }

  if (ritualSearchChip) {
    event.preventDefault();
    toggleRitualSearchChip(ritualSearchChip);
    return;
  }

  if (ritualSelect) {
    event.preventDefault();
    activeSelectedRitualId = ritualSelect;
    renderSearchRituals();
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

  if (profileSettingsTab) {
    event.preventDefault();
    activeProfileSettingsTabId = profileSettingsTab;
    renderActiveSignedInShell();
    return;
  }

  if (feedbackType && isBriefFeedbackType(feedbackType)) {
    if (target.dataset.tryAgainAction === "true") {
      void handleTryAgainClick();
      return;
    }

    void handleFeedbackClick(feedbackType);
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
    activeRitualSearchTiming = normalizeRitualSearchTimingFilter(
      document.querySelector<HTMLSelectElement>("[name='ritualSearchTiming']")
        ?.value ?? activeRitualSearchTiming,
    );
    activeSelectedRitualId = null;
    renderSearchRituals();
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
    target instanceof HTMLInputElement &&
    target.matches("[name='ritualSearchQuery']")
  ) {
    const cursorStart = target.selectionStart ?? target.value.length;
    const cursorEnd = target.selectionEnd ?? cursorStart;

    activeRitualSearchQuery = target.value;
    activeSelectedRitualId = null;
    renderSearchRituals();

    const searchInput = document.querySelector<HTMLInputElement>(
      "[name='ritualSearchQuery']",
    );

    searchInput?.focus();
    searchInput?.setSelectionRange(cursorStart, cursorEnd);
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
    activeBrief = null;
    activeChooseWithMeResult = null;
    activeSignedInView = "this_week";
    activeProfileSettingsTabId = null;
    resetRitualSearchState();
    activeManageRitualFilters = { ...defaultManageRitualFilters };
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

  if (target.matches("[data-profile-tuning-form='true']")) {
    event.preventDefault();
    void handleProfileTuningSubmit(target);
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
    activeRitualSearchTiming = normalizeRitualSearchTimingFilter(
      formData.get("ritualSearchTiming") ?? activeRitualSearchTiming,
    );
    activeSelectedRitualId = null;
    renderSearchRituals();
  }

  if (target.matches("[data-manage-rituals-filter-form='true']")) {
    event.preventDefault();
  }
});
