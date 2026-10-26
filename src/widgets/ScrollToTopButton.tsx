"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import { animateScrollTo } from "@/shared/lib/animateScrollTo";

const SHOW_AFTER = 400;
const SCROLL_DURATION = 1300;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > SHOW_AFTER);
    }
    function cancelScroll() {
      if (!frameRef.current) return;
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchstart", cancelScroll, { passive: true });
    return () => {
      cancelScroll();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
    };
  }, []);

  function handleClick() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    animateScrollTo(
      0,
      (frame) => {
        frameRef.current = frame;
      },
      SCROLL_DURATION,
    );
  }

  return (
    <button
      type="button"
      aria-label="맨 위로"
      onClick={handleClick}
      tabIndex={visible ? 0 : -1}
      className={`text-primary-500 fixed right-5 bottom-6 z-20 flex size-11 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white shadow-lg transition-opacity duration-300 active:bg-gray-100 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span className="block -rotate-90 [&>svg]:h-4 [&>svg]:w-4">
        <Arrow />
      </span>
    </button>
  );
}
