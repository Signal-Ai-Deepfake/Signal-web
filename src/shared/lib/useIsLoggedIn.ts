"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return !!localStorage.getItem("accessToken");
}

function getServerSnapshot() {
  return false;
}

export function useIsLoggedIn() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
