"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

interface Segment {
  text: string;
  className?: string;
}

interface TypingHeadlineProps {
  /** 줄 단위로 나눈 문구. 한 줄은 색이 다른 조각 여러 개로 이뤄질 수 있다. */
  lines: Segment[][];
  className?: string;
  speed?: number;
  startDelay?: number;
  /** 타이핑이 끝난 뒤에 나타날 내용. */
  children?: ReactNode;
  afterClassName?: string;
}

const CARET_LINGER = 1200;
// 타이핑이 끝난 뒤 쉬는 시간과, 뒤따르는 요소들이 차례로 나타나는 간격.
const REVEAL_PAUSE = 600;
const REVEAL_STAGGER = 600;

// 글자를 미리 투명하게 깔아두고 하나씩 드러내므로, 타이핑 중에도 줄바꿈과 레이아웃이 변하지 않는다.
export default function TypingHeadline({
  lines,
  className = "",
  speed = 70,
  startDelay = 300,
  children,
  afterClassName = "",
}: TypingHeadlineProps) {
  const total = lines.flat().reduce((sum, segment) => sum + Array.from(segment.text).length, 0);
  const [count, setCount] = useState(0);
  const [caretVisible, setCaretVisible] = useState(true);
  const done = count >= total;
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduceMotion ? total : 1;
    let interval: ReturnType<typeof setInterval> | undefined;

    const start = setTimeout(
      () => {
        interval = setInterval(() => {
          setCount((prev) => {
            const next = Math.min(prev + step, total);
            if (next >= total) clearInterval(interval);
            return next;
          });
        }, speed);
      },
      reduceMotion ? 0 : startDelay,
    );

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [total, speed, startDelay]);

  // 타이핑이 끝나면 data-typing 조상에 알려, 그 안에서 멈춰 있던 애니메이션이 이어서 재생되게 한다.
  useEffect(() => {
    if (!done) return;
    headingRef.current?.closest("[data-typing]")?.setAttribute("data-typing", "done");
  }, [done]);

  useEffect(() => {
    if (count < total) return;
    const hide = setTimeout(() => setCaretVisible(false), CARET_LINGER);
    return () => clearTimeout(hide);
  }, [count, total]);

  const caret = (
    <span key="caret" className="relative inline-block w-0">
      <span className="bg-primary-500 absolute bottom-[0.1em] left-0.5 h-[1em] w-0.5 animate-pulse" />
    </span>
  );

  let index = 0;

  return (
    <>
      <h1
        ref={headingRef}
        className={className}
        aria-label={lines
          .flat()
          .map((segment) => segment.text)
          .join(" ")}
      >
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} aria-hidden className="block">
            {line.map((segment) =>
              Array.from(segment.text).map((char) => {
                const charIndex = index++;
                return [
                  caretVisible && charIndex === count && caret,
                  <span
                    key={charIndex}
                    className={`${segment.className ?? ""} ${charIndex < count ? "opacity-100" : "opacity-0"}`}
                  >
                    {char}
                  </span>,
                ];
              }),
            )}
            {caretVisible && count >= total && lineIndex === lines.length - 1 && caret}
          </span>
        ))}
      </h1>
      {children && (
        <div className={`${done ? "" : "pointer-events-none"} ${afterClassName}`}>
          {Children.toArray(children).map((child, childIndex) => (
            <div
              key={childIndex}
              className={`transition-all duration-[1400ms] ease-out motion-reduce:!delay-0 ${
                done ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${REVEAL_PAUSE + childIndex * REVEAL_STAGGER}ms` }}
            >
              {child}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
