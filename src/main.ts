import {
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
  getCapacityModeForEnergy,
  getNextStepAfterAudience,
  getNextStepAfterEnergy,
  getNextStepAfterPractice,
  getPracticeOptionsForEnergy,
  isCheckInAudience,
  isEnergyCapacity,
  isRitualFocusOptionKey,
  isTimeScope,
  sanitizeRitualFocusText,
  type CurrentRitualCheckIn,
  type RitualCheckInDraft,
  type RitualCheckInStep,
} from "./lib/current-ritual-check-in";
import { getTimingWindowCandidates } from "./lib/timing-window-candidates";
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
  type SignedInView,
} from "./ui/app-shell";
import { ritualFocusOptions } from "./data/ritual-focus-options";
import "./styles.css";

const app = document.querySelector<HTMLElement>("#app");

if (!app) {
  throw new Error("Missing app root");
}

const appRoot = app;
const firebaseServices = getFirebaseServices();
let privateDataRequestId = 0;
let activeSignedInState: Extract<AppAuthState, { status: "signed_in" }> | null = null;
let activePrivateBriefData: PrivateBriefData | null = null;
let activeBrief: WeeklyBrief | null = null;
let activeSignedInView: SignedInView = "this_week";
let activeProfileSettingsTabId: string | null = null;
let activeCapacityModeOverride: CapacityMode | null = null;
let activeCapacityPickerOpen = false;
let activeCheckInDraft: RitualCheckInDraft = createInitialRitualCheckInDraft();
let activeCurrentRitualCheckIn: CurrentRitualCheckIn | null = null;
let activeFirstLoginCheckIn = false;
let checkInLoadingTimeout: number | null = null;
const showDebugTrace = new URLSearchParams(window.location.search).get("debug") === "true";

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
    ...(activeCapacityModeOverride
      ? { capacityMode: activeCapacityModeOverride }
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
  });
}

function renderPrivateWelcomeOrCheckIn(): void {
  const requestedView = getRequestedSignedInView();

  if (requestedView && requestedView !== "this_week") {
    activeSignedInView = requestedView;
    activeBrief = generateWeeklyBrief(getActiveBriefInput());
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
  if (!activePrivateBriefData || !activeBrief) {
    return;
  }

  appRoot.innerHTML = renderSignedInShell(activePrivateBriefData, {
    activeView: activeSignedInView,
    brief: activeBrief,
    capacityModeOverride: activeCapacityModeOverride,
    capacityPickerOpen: activeCapacityPickerOpen,
    feedbackStatus: options.feedbackStatus,
    tryAgainStatus: options.tryAgainStatus,
    selectedFeedbackType: options.selectedFeedbackType,
    savingFeedbackType: options.savingFeedbackType,
    showDebugTrace,
    activeProfileSettingsTabId,
  });
}

function renderSignedInState(state: Extract<AppAuthState, { status: "signed_in" }>): void {
  activeSignedInState = state;
  activeCapacityModeOverride = null;
  activeCapacityPickerOpen = false;
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
          activeSignedInView = "this_week";
          activeProfileSettingsTabId = null;
          activeCapacityModeOverride = null;
          activeCapacityPickerOpen = false;
          activeFirstLoginCheckIn = false;
          appRoot.innerHTML = renderAppShell({
            status: "unauthorized",
            configReady: true,
          });
          return;
        }

        activePrivateBriefData = privateBriefData;
        activeProfileSettingsTabId = null;
        activeBrief = null;
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
        activeSignedInView = "this_week";
        activeProfileSettingsTabId = null;
        activeCapacityModeOverride = null;
        activeCapacityPickerOpen = false;
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
  activeCurrentRitualCheckIn = checkIn;
  activeCapacityModeOverride = null;
  activeCapacityPickerOpen = false;
  activeSignedInView = "this_week";
  activeProfileSettingsTabId = null;
  activeFirstLoginCheckIn = false;
  activeBrief = generateWeeklyBrief(getActiveBriefInput());
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
    startDate: new Date(),
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
    timeScope: draft.timeScope,
    energyCapacity: draft.energyCapacity,
    capacityMode: draft.capacityMode,
    ...(draft.audience ? { audience: draft.audience } : {}),
    ...(draft.practiceTypeHints ? { practiceTypeHints: draft.practiceTypeHints } : {}),
    ...(draft.practiceTypeLabel ? { practiceTypeLabel: draft.practiceTypeLabel } : {}),
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

  if (action === "time_scope" && isTimeScope(value)) {
    activeCheckInDraft = {
      ...activeCheckInDraft,
      timeScope: value,
      step: "energy_capacity",
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
      step: getNextStepAfterAudience(activeCheckInDraft.energyCapacity),
    };
    renderActiveCheckInShell();
    return;
  }

  if (action === "practice_type" && activeCheckInDraft.energyCapacity) {
    const option = getPracticeOptionsForEnergy(
      activeCheckInDraft.energyCapacity,
    ).find((candidate) => candidate.key === value);

    if (!option) {
      return;
    }

    const nextDraft: RitualCheckInDraft = {
      ...activeCheckInDraft,
      practiceTypeHints: option.practiceTypeHints,
      practiceTypeLabel: option.label,
      step: getNextStepAfterPractice(activeCheckInDraft.energyCapacity),
    };

    activeCheckInDraft = nextDraft;
    renderActiveCheckInShell();
    return;
  }

  if (action === "ritual_focus" && isRitualFocusOptionKey(value)) {
    if (value === "something_else") {
      activeCheckInDraft = {
        ...activeCheckInDraft,
        ritualFocusKey: value,
        step: "ritual_focus_text",
      };
      renderActiveCheckInShell();
      return;
    }

    const option = ritualFocusOptions.find((candidate) => candidate.key === value);
    activeCheckInDraft = {
      ...activeCheckInDraft,
      ritualFocusKey: value,
      ...(option ? { ritualFocusLabel: option.label } : {}),
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
    case "energy_capacity":
      return "time_scope";
    case "audience":
      return "energy_capacity";
    case "practice_type":
      return "audience";
    case "ritual_focus":
      return draft.energyCapacity === "barely_any" ? "audience" : "practice_type";
    case "ritual_focus_text":
      return "ritual_focus";
    case "review":
      return draft.ritualFocusKey === "something_else"
        ? "ritual_focus_text"
        : "ritual_focus";
    case "time_scope":
    default:
      return "time_scope";
  }
}

function getPreviousCheckInDraft(draft: RitualCheckInDraft): RitualCheckInDraft {
  return {
    ...draft,
    step: getPreviousCheckInStep(draft),
  };
}

function handleCheckInTextSubmit(form: HTMLFormElement): void {
  const formData = new FormData(form);
  const ritualFocusText = sanitizeRitualFocusText(
    String(formData.get("ritualFocusText") ?? ""),
  );
  activeCheckInDraft = {
    ...activeCheckInDraft,
    ritualFocusText,
    step: "ritual_focus_text",
  };

  activeCheckInDraft = {
    ...activeCheckInDraft,
    step: "review",
  };
  renderActiveCheckInShell();
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
    renderActiveBriefStatus("Got it.", undefined, feedbackType);
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
    activeCapacityPickerOpen = false;
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
  activeCapacityPickerOpen = false;
  document
    .querySelectorAll("details[data-app-menu='true'][open]")
    .forEach((menu) => menu.removeAttribute("open"));
}

function applyCapacityOverride(capacityMode: CapacityMode): void {
  activeCapacityModeOverride = capacityMode;
  activeCapacityPickerOpen = false;
  activeBrief = generateWeeklyBrief(getActiveBriefInput());
  renderActiveSignedInShell();
}

function startCheckInOver(): void {
  clearCheckInLoadingTimeout();
  activeBrief = null;
  activeCurrentRitualCheckIn = null;
  activeCheckInDraft = createInitialRitualCheckInDraft();
  activeCapacityModeOverride = null;
  activeCapacityPickerOpen = false;
  activeSignedInView = "this_week";
  activeProfileSettingsTabId = null;
  renderActiveCheckInShell();
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
  const capacityMode = target.dataset.capacityMode;
  const checkInActionTarget = target.closest<HTMLElement>("[data-check-in-action]");
  const checkInAction = checkInActionTarget?.dataset.checkInAction;
  const checkInValue = checkInActionTarget?.dataset.checkInValue;

  if (target.closest("[data-private-welcome-action='dismiss']")) {
    void handlePrivateWelcomeDismiss();
    return;
  }

  if (target.closest("[data-check-in-start-over='true']")) {
    startCheckInOver();
    return;
  }

  if (target.closest("[data-capacity-toggle='true']")) {
    activeCapacityPickerOpen = !activeCapacityPickerOpen;
    renderActiveSignedInShell();
    return;
  }

  if (checkInAction && typeof checkInValue === "string") {
    handleCheckInAction(checkInAction, checkInValue);
    return;
  }

  if (capacityMode && isCapacityMode(capacityMode)) {
    applyCapacityOverride(capacityMode);
    return;
  }

  if (homeAction === "this_week") {
    event.preventDefault();
    activeSignedInView = "this_week";
    activeCapacityPickerOpen = false;

    if (activePrivateBriefData && activeBrief) {
      renderActiveSignedInShell();
    }

    return;
  }

  if (
    menuAction === "this_week" ||
    menuAction === "profile_settings" ||
    menuAction === "how_it_works"
  ) {
    event.preventDefault();
    activeSignedInView = menuAction;
    activeCapacityPickerOpen = false;
    menuActionTarget
      ?.closest("details[data-app-menu='true']")
      ?.removeAttribute("open");

    if (activePrivateBriefData) {
      renderActiveSignedInShell();
    }

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
    void signInWithGoogle(firebaseServices).catch(() => {
      render({ status: "signed_out", configReady: Boolean(firebaseServices) });
    });
  }

  if (action === "sign-out") {
    clearCheckInLoadingTimeout();
    target.closest("details[data-app-menu='true']")?.removeAttribute("open");
    activeCapacityModeOverride = null;
    activeCapacityPickerOpen = false;
    activeCurrentRitualCheckIn = null;
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
  const clickedCapacity = Boolean(target.closest("[data-capacity-control='true']"));

  if (!clickedMenu) {
    document
      .querySelectorAll("details[data-app-menu='true'][open]")
      .forEach((menu) => menu.removeAttribute("open"));
  }

  if (!clickedCapacity && activeCapacityPickerOpen) {
    activeCapacityPickerOpen = false;
    renderActiveSignedInShell();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  const hadOpenMenu = Boolean(
    document.querySelector("details[data-app-menu='true'][open]"),
  );
  const hadOpenCapacityPicker = activeCapacityPickerOpen;

  closeOpenOverlays();

  if (hadOpenCapacityPicker) {
    renderActiveSignedInShell();
  } else if (hadOpenMenu) {
    event.preventDefault();
  }
});

subscribeToAuthState(firebaseServices, (state) => {
  if (state.status === "signed_in") {
    renderSignedInState(state);
    return;
  }

  activeSignedInState = null;
  activePrivateBriefData = null;
  activeBrief = null;
  activeSignedInView = "this_week";
  activeProfileSettingsTabId = null;
  activeCapacityModeOverride = null;
  activeCapacityPickerOpen = false;
  activeCurrentRitualCheckIn = null;
  activeCheckInDraft = createInitialRitualCheckInDraft();
  clearCheckInLoadingTimeout();
  privateDataRequestId += 1;
  render(state);
});

appRoot.addEventListener("submit", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLFormElement)) {
    return;
  }

  if (target.matches("[data-profile-tuning-form='true']")) {
    event.preventDefault();
    void handleProfileTuningSubmit(target);
  }

  if (target.matches("[data-check-in-text-form='true']")) {
    event.preventDefault();
    handleCheckInTextSubmit(target);
  }
});
