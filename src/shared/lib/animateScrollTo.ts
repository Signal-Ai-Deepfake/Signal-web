const DEFAULT_DURATION = 1600;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function animateScrollTo(
  targetY: number,
  setFrame: (frame: number) => void,
  duration = DEFAULT_DURATION,
) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo({ top: startY + distance * easeInOutCubic(progress), behavior: "instant" });
    setFrame(progress < 1 ? requestAnimationFrame(step) : 0);
  };
  setFrame(requestAnimationFrame(step));
}
