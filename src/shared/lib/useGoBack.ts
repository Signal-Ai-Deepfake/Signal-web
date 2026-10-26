"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface NavigationWithCanGoBack {
  canGoBack?: boolean;
}

export function canGoBack() {
  const navigation = (window as Window & { navigation?: NavigationWithCanGoBack }).navigation;
  if (typeof navigation?.canGoBack === "boolean") return navigation.canGoBack;
  return window.history.length > 1;
}

export function useGoBack(fallbackHref = "/") {
  const router = useRouter();

  return useCallback(() => {
    if (canGoBack()) router.back();
    else router.push(fallbackHref);
  }, [router, fallbackHref]);
}
