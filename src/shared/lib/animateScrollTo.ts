const DEFAULT_DURATION = 1600;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function jumpTo(top: number) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  root.getClientRects();
  window.scrollTo({ top, behavior: "instant" });
  root.style.scrollBehavior = previous;
}

export function animateScrollTo(
  targetY: number,
  setFrame: (frame: number) => void,
  duration = DEFAULT_DURATION,
  easing: (t: number) => number = easeInOutCubic,
) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    jumpTo(startY + distance * easing(progress));
    setFrame(progress < 1 ? requestAnimationFrame(step) : 0);
  };
  setFrame(requestAnimationFrame(step));
}
