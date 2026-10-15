"use client";

import { useSyncExternalStore } from "react";
import { AUTH_TOKEN_EVENT } from "@/shared/lib/authToken";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_TOKEN_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_TOKEN_EVENT, callback);
  };
}

function getSnapshot() {
  return !!localStorage.getItem("accessToken");
}

function getServerSnapshot() {
  return null;
}

export function useIsLoggedIn(): boolean | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
