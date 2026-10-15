"use client";

import { useEffect } from "react";

export default function ScrollTopOnReload() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    const [navigation] = performance.getEntriesByType(
      "navigation",
    ) as PerformanceNavigationTiming[];
    if (navigation?.type === "reload") window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return null;
}
