"use client";

import { useEffect, useState } from "react";

export function useHideOnScroll(threshold = 4) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    function handleScroll() {
      const currentY = window.scrollY;
      const diff = currentY - lastY;

      if (currentY <= 0) {
        setHidden(false);
      } else if (diff > threshold) {
        setHidden(true);
      } else if (diff < -threshold) {
        setHidden(false);
      }

      lastY = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return hidden;
}
