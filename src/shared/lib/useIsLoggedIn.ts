"use client";

import { useEffect, useState } from "react";

export function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));

    function handleStorage(event: StorageEvent) {
      if (event.key === "accessToken") {
        setIsLoggedIn(!!event.newValue);
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return isLoggedIn;
}
