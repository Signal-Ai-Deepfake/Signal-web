"use client";

import { useEffect, useState } from "react";

// 헤더가 차지하던 자리가 화면 밖으로 나가기 전에는 숨기지 않는다 (상단 빈 공간 방지).
const HEADER_HEIGHT = 80;

export function useHideOnScroll(threshold = 4) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    function handleScroll() {
      const currentY = window.scrollY;
      const diff = currentY - lastY;

      if (currentY <= HEADER_HEIGHT) {
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
