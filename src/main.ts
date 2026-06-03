import {
  signInWithGoogle,
  signOutOfFirebase,
  subscribeToAuthState,
  type AppAuthState,
} from "./lib/auth";
import { getFirebaseServices } from "./lib/firebase";
import { renderAppShell } from "./ui/app-shell";
import "./styles.css";

const app = document.querySelector<HTMLElement>("#app");

if (!app) {
  throw new Error("Missing app root");
}

const appRoot = app;
const firebaseServices = getFirebaseServices();

function render(state: AppAuthState): void {
  appRoot.innerHTML = renderAppShell(state);
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

subscribeToAuthState(firebaseServices, render);
