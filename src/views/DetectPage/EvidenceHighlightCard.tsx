"use client";

import { useState } from "react";
import type { DetectResult } from "./types";

interface EvidenceHighlightCardProps {
  highlights: DetectResult["evidenceHighlights"];
  previewUrl: string | null;
}

export default function EvidenceHighlightCard({
  highlights,
  previewUrl,
}: EvidenceHighlightCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = highlights[activeIndex];

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-300 px-8 py-6 lg:w-[800px]">
      <p className="text-body-1 font-semibold text-black">AI 판단 근거 하이라이트</p>
      <div className="flex w-full">
        {highlights.map((highlight, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={highlight.tab}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`text-small h-9 w-[120px] shrink-0 rounded-t-lg border-t border-r border-l bg-white font-medium transition-colors duration-200 ${
                isActive
                  ? "border-primary-500 text-primary-500"
                  : "border-t-gray-300 border-r-gray-300 border-l-gray-300 border-b border-b-primary-500 text-gray-650"
              }`}
            >
              {highlight.tab}
            </button>
          );
        })}
        <div className="border-b-primary-500 h-9 flex-1 border-b" />
      </div>
      <div className="flex items-stretch overflow-hidden rounded-lg border border-gray-300">
        <div className="h-[92px] w-[140px] shrink-0 overflow-hidden bg-gray-100">
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="" className="h-full w-full object-cover" />
          )}
        </div>
        <div className="flex flex-1 items-center p-6">
          <p className="text-body-2 text-primary-500 font-medium whitespace-pre-line">
            {active.description}
          </p>
        </div>
      </div>
    </div>
  );
}
