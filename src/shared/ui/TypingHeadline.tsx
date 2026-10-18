"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

interface Segment {
  text: string;
  className?: string;
}

interface TypingHeadlineProps {
  lines: Segment[][];
  className?: string;
  speed?: number;
  startDelay?: number;
  children?: ReactNode;
  afterClassName?: string;
  as?: "h1" | "p";
  revealMotion?: "rise" | "fade";
}

const CARET_LINGER = 1200;
const REVEAL_PAUSE = 600;
const REVEAL_STAGGER = 600;

export default function TypingHeadline({
  lines,
  className = "",
  speed = 70,
  startDelay = 300,
  children,
  afterClassName = "",
  as: Tag = "h1",
  revealMotion = "rise",
}: TypingHeadlineProps) {
  const total = lines.flat().reduce((sum, segment) => sum + Array.from(segment.text).length, 0);
  const [count, setCount] = useState(0);
  const [caretVisible, setCaretVisible] = useState(true);
  const done = count >= total;
  const headingRef = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);

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
      <Tag ref={headingRef} className={className}>
        <span className="sr-only">
          {lines
            .flat()
            .map((segment) => segment.text)
            .join(" ")}
        </span>
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
      </Tag>
      {children && (
        <div className={`${done ? "" : "pointer-events-none"} ${afterClassName}`}>
          {Children.toArray(children).map((child, childIndex) => (
            <div
              key={childIndex}
              className={`transition-all duration-[1400ms] ease-out motion-reduce:!delay-0 ${
                done
                  ? "translate-y-0 opacity-100"
                  : `opacity-0 ${revealMotion === "rise" ? "translate-y-6" : ""}`
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
