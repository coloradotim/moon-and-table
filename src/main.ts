import {
  signInWithGoogle,
  signOutOfFirebase,
  subscribeToAuthState,
  type AppAuthState,
} from "./lib/auth";
import { getFirebaseServices } from "./lib/firebase";
import {
  hasLoadedPrivateData,
  loadPrivateBriefData,
  updatePrivateProfileTuning,
  type PrivateBriefData,
} from "./lib/private-data";
import {
  generateWeeklyBrief,
  type CapacityMode,
  type WeeklyBrief,
} from "./lib/generate-weekly-brief";
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
  renderPrivateDataLoadingShell,
  renderSignedInShell,
  type SignedInView,
} from "./ui/app-shell";
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
let activeCapacityModeOverride: CapacityMode | null = null;
let activeCapacityPickerOpen = false;
const showDebugTrace = new URLSearchParams(window.location.search).get("debug") === "true";

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
    ...(activeCapacityModeOverride
      ? { capacityMode: activeCapacityModeOverride }
      : {}),
    ...(excludedRitualPatternKeys
      ? { excludedRitualPatternKeys }
      : {}),
  };
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
          activeCapacityModeOverride = null;
          activeCapacityPickerOpen = false;
          appRoot.innerHTML = renderAppShell({
            status: "unauthorized",
            configReady: true,
          });
          return;
        }

        activePrivateBriefData = privateBriefData;
        activeBrief = generateWeeklyBrief(getActiveBriefInput());
        renderActiveSignedInShell();
      }
    })
    .catch(() => {
      if (requestId === privateDataRequestId) {
        activeSignedInState = null;
        activePrivateBriefData = null;
        activeBrief = null;
        activeSignedInView = "this_week";
        activeCapacityModeOverride = null;
        activeCapacityPickerOpen = false;
        appRoot.innerHTML = renderAppShell({
          status: "unauthorized",
          configReady: true,
        });
      }
    });
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

function getProfileTuningFormInput(
  form: HTMLFormElement,
  tuningProfile: ProfileTuningProfile,
): ProfileTuningFormInput {
  const formData = new FormData(form);
  const defaultCapacityMode = formData.get("defaultCapacityMode");
  const astrologyVisibility = formData.get("astrologyVisibility");
  const maxRitualDurationMinutes = Number(
    formData.get("maxRitualDurationMinutes"),
  );

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
    avoidedRitualStyles: getStringListFormValues(
      formData,
      "avoidedRitualStyles",
    ),
    astrologyVisibility,
    assumptionValues: Object.fromEntries(
      tuningProfile.settings.assumptions.map((assumption) => [
        assumption.key,
        formData.has(`assumption.${assumption.key}`),
      ]),
    ),
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
        "I do not have another safe option yet. Try changing capacity or style preferences.",
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
  const menuAction = target.dataset.menuAction;
  const feedbackType = target.dataset.feedbackType;
  const capacityMode = target.dataset.capacityMode;

  if (target.dataset.capacityToggle === "true") {
    activeCapacityPickerOpen = !activeCapacityPickerOpen;
    renderActiveSignedInShell();
    return;
  }

  if (capacityMode && isCapacityMode(capacityMode)) {
    applyCapacityOverride(capacityMode);
    return;
  }

  if (menuAction === "this_week" || menuAction === "profile_settings") {
    activeSignedInView = menuAction;
    activeCapacityPickerOpen = false;
    target.closest("details[data-app-menu='true']")?.removeAttribute("open");

    if (activePrivateBriefData) {
      renderActiveSignedInShell();
    }

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
    target.closest("details[data-app-menu='true']")?.removeAttribute("open");
    activeCapacityModeOverride = null;
    activeCapacityPickerOpen = false;
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
  activeCapacityModeOverride = null;
  activeCapacityPickerOpen = false;
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
});
