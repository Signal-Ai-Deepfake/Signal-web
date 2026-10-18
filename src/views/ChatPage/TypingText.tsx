"use client";

import { useEffect, useMemo, useState } from "react";
import ChatMarkdown, { countChatMarkdown, parseChatMarkdown } from "./ChatMarkdown";

const TICK_MS = 30;
const MAX_TICKS = 100;

interface TypingTextProps {
  text: string;
  onProgress?: () => void;
  onComplete?: () => void;
}

export default function TypingText({ text, onProgress, onComplete }: TypingTextProps) {
  const blocks = useMemo(() => parseChatMarkdown(text), [text]);
  const total = countChatMarkdown(blocks);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduceMotion ? total : Math.max(1, Math.ceil(total / MAX_TICKS));
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = Math.min(prev + step, total);
        if (next >= total) clearInterval(interval);
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(interval);
  }, [total]);

  useEffect(() => {
    onProgress?.();
  }, [count, onProgress]);

  useEffect(() => {
    if (total > 0 && count >= total) onComplete?.();
  }, [count, total, onComplete]);

  return (
    <>
      <div className="sr-only">
        <ChatMarkdown blocks={blocks} />
      </div>
      <div aria-hidden>
        <ChatMarkdown blocks={blocks} limit={count} />
      </div>
    </>
  );
}
