import { animateScrollTo } from "@/shared/lib/animateScrollTo";

interface ScrollToElementOptions {
  offset?: number;
  duration?: number;
}

const DEFAULT_OFFSET = 24;
const DEFAULT_DURATION = 1100;

export function scrollToElement(
  element: HTMLElement,
  { offset = DEFAULT_OFFSET, duration = DEFAULT_DURATION }: ScrollToElementOptions = {},
) {
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const targetY = Math.min(
    Math.max(element.getBoundingClientRect().top + window.scrollY - offset, 0),
    maxY,
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: targetY, behavior: "instant" });
    return () => {};
  }

  let frame = 0;
  function cancel() {
    cancelAnimationFrame(frame);
    frame = 0;
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
  }

  animateScrollTo(
    targetY,
    (id) => {
      frame = id;
    },
    duration,
  );
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  return cancel;
}
