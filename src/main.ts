import {
  signInWithGoogle,
  signOutOfFirebase,
  subscribeToAuthState,
  type AppAuthState,
} from "./lib/auth";
import { getFirebaseServices } from "./lib/firebase";
import {
  loadPrivateBriefData,
  resolvePrivateBriefData,
} from "./lib/private-data";
import {
  renderAppShell,
  renderPrivateDataLoadingShell,
  renderSignedInShell,
} from "./ui/app-shell";
import "./styles.css";

const app = document.querySelector<HTMLElement>("#app");

if (!app) {
  throw new Error("Missing app root");
}

const appRoot = app;
const firebaseServices = getFirebaseServices();
let privateDataRequestId = 0;

function render(state: AppAuthState): void {
  appRoot.innerHTML = renderAppShell(state);
}

function renderSignedInState(state: Extract<AppAuthState, { status: "signed_in" }>): void {
  privateDataRequestId += 1;
  const requestId = privateDataRequestId;

  if (!firebaseServices) {
    render(state);
    return;
  }

  appRoot.innerHTML = renderPrivateDataLoadingShell();

  void loadPrivateBriefData(firebaseServices.db, state.user.uid, state.user.email)
    .then((privateBriefData) => {
      if (requestId === privateDataRequestId) {
        appRoot.innerHTML = renderSignedInShell(privateBriefData);
      }
    })
    .catch(() => {
      if (requestId === privateDataRequestId) {
        appRoot.innerHTML = renderSignedInShell(resolvePrivateBriefData({}));
      }
    });
}

render({ status: "loading" });

appRoot.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const action = target.dataset.authAction;

  if (action === "sign-in") {
    void signInWithGoogle(firebaseServices).catch(() => {
      render({ status: "signed_out", configReady: Boolean(firebaseServices) });
    });
  }

  if (action === "sign-out") {
    void signOutOfFirebase(firebaseServices);
  }
});

subscribeToAuthState(firebaseServices, (state) => {
  if (state.status === "signed_in") {
    renderSignedInState(state);
    return;
  }

  privateDataRequestId += 1;
  render(state);
});
