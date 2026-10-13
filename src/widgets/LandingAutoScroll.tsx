"use client";

import { useEffect, useState } from "react";
import { animateScrollTo } from "@/shared/lib/animateScrollTo";

const IDLE_DELAY = 5000;
const FILL_RESET_DURATION = 250;

const MOBILE_TARGET_ID = "mobile-features";

type Fill = "empty" | "filling" | "full";

const targets: { id: string; block: "start" | "center" }[] = [
  { id: "why-signal", block: "start" },
  { id: "how-it-works", block: "start" },
  { id: "cta", block: "center" },
];

function getTargetY(el: HTMLElement, block: "start" | "center") {
  const rect = el.getBoundingClientRect();
  const offset = block === "center" ? Math.max((window.innerHeight - rect.height) / 2, 0) : 0;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  return Math.min(Math.max(rect.top + window.scrollY - offset, 0), maxY);
}

// 섹션에 머문 채 일정 시간 조작이 없으면 다음 섹션으로 한 번씩 자동 스크롤한다.
export default function LandingAutoScroll() {
  const [indicator, setIndicator] = useState<{ current: number; count: number; fill: Fill }>({
    current: -1,
    count: 0,
    fill: "empty",
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const sections = targets
      .map((target) => ({ ...target, el: document.getElementById(target.id) }))
      .filter((target): target is typeof target & { el: HTMLElement } => {
        return target.el !== null && target.el.offsetParent !== null;
      });
    if (sections.length < 2) return;

    const advanced = new Set<number>();
    let current = -1;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let fillTimer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;

    function scrollToSection(index: number) {
      const { el, block } = sections[index];
      animateScrollTo(getTargetY(el, block), (id) => {
        frame = id;
      });
    }

    function schedule() {
      clearTimeout(timer);
      clearTimeout(fillTimer);
      const counting = current >= 0 && current < sections.length - 1 && !advanced.has(current);
      setIndicator({ current, count: sections.length, fill: counting ? "empty" : "full" });
      if (!counting) return;

      // 막대를 먼저 부드럽게 비운 뒤 남은 시간 동안 다시 채운다.
      fillTimer = setTimeout(() => {
        setIndicator((prev) => ({ ...prev, fill: "filling" }));
      }, FILL_RESET_DURATION);

      const from = current;
      timer = setTimeout(() => {
        advanced.add(from);
        scrollToSection(from + 1);
      }, IDLE_DELAY);
    }

    // 화면 세로 중앙을 지나는 섹션을 현재 섹션으로 본다.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sections.findIndex((section) => section.el === entry.target);
          if (entry.isIntersecting) {
            current = Math.max(current, index);
          } else if (index === current) {
            const center = window.innerHeight / 2;
            current = sections.findLastIndex((section, i) => {
              if (i >= index) return false;
              const rect = section.el.getBoundingClientRect();
              return rect.top <= center && rect.bottom >= center;
            });
          }
        });
        schedule();
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section.el));

    // 사용자가 직접 조작하면 진행 중인 자동 스크롤을 멈추고 대기 시간을 다시 센다.
    function handleUserInput() {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      schedule();
    }
    const userEvents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    userEvents.forEach((type) => {
      window.addEventListener(type, handleUserInput, { passive: true });
    });

    // 히어로의 "스크롤해서 더 알아보기" 링크도 같은 속도로 내려가게 한다.
    function handleAnchorClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const index = sections.findIndex((section) =>
        (event.target as Element).closest(`a[href="#${section.id}"]`),
      );
      if (index < 0) return;
      event.preventDefault();
      scrollToSection(index);
    }
    document.addEventListener("click", handleAnchorClick);

    return () => {
      clearTimeout(timer);
      clearTimeout(fillTimer);
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("click", handleAnchorClick);
      userEvents.forEach((type) => window.removeEventListener(type, handleUserInput));
    };
  }, []);

  // 모바일 히어로의 "스크롤해서 더 알아보기" 링크도 같은 속도로 내려가게 한다.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(min-width: 768px)").matches) return;

    let frame = 0;

    function handleAnchorClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(`a[href="#${MOBILE_TARGET_ID}"]`)) return;
      const el = document.getElementById(MOBILE_TARGET_ID);
      if (!el) return;
      event.preventDefault();
      animateScrollTo(getTargetY(el, "start"), (id) => {
        frame = id;
      });
    }
    function cancelScroll() {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    }

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("touchstart", cancelScroll, { passive: true });
    window.addEventListener("wheel", cancelScroll, { passive: true });
    return () => {
      cancelScroll();
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("touchstart", cancelScroll);
      window.removeEventListener("wheel", cancelScroll);
    };
  }, []);

  if (indicator.count === 0) return null;

  return (
    <div
      aria-hidden
      className={`fixed top-1/2 right-5 z-20 hidden -translate-y-1/2 flex-col items-center gap-2 transition-opacity duration-500 md:flex ${
        indicator.current < 0 ? "opacity-0" : "opacity-100"
      }`}
    >
      {Array.from({ length: indicator.count }, (_, index) => {
        const active = index === indicator.current;
        const filling = active && indicator.fill === "filling";
        const filled = active && indicator.fill !== "empty";

        return (
          <span
            key={index}
            className={`w-1.5 overflow-hidden rounded-full bg-gray-400 transition-[height] duration-500 ease-out ${
              active ? "h-10" : "h-1.5"
            }`}
          >
            <span
              className={`bg-primary-500 block size-full origin-top transition-transform ${
                filled ? "scale-y-100" : "scale-y-0"
              } ${filling ? "ease-linear" : "ease-out"}`}
              style={{
                transitionDuration: `${filling ? IDLE_DELAY - FILL_RESET_DURATION : FILL_RESET_DURATION}ms`,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
