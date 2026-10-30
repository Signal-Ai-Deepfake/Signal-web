"use client";

import { useT } from "@/shared/i18n/I18nProvider";
import { bandClass } from "./bandStyle";
import type { DeepfakeBand } from "./detectApi";
import { detectMessages } from "./messages";

const SCALE_BANDS = ["LOW", "UNCERTAIN", "HIGH"] as const;

interface BandScaleProps {
  band: DeepfakeBand;
}

export default function BandScale({ band }: BandScaleProps) {
  const t = useT(detectMessages);
  const style = bandClass[band];

  return (
    <div className="flex w-full flex-col items-center gap-5 py-4 md:py-6">
      <p className={`text-h3 text-center font-bold ${style.text}`}>{t.band[band]}</p>
      <div role="img" aria-label={t.band[band]} className="grid w-full grid-cols-3 gap-1.5">
        {SCALE_BANDS.map((scaleBand) => {
          const active = scaleBand === band;
          return (
            <div key={scaleBand} className="flex flex-col items-center gap-2">
              <div
                className={`h-2.5 w-full rounded-full transition-colors ${
                  active ? bandClass[scaleBand].bar : "bg-gray-200"
                }`}
              />
              <span
                className={`text-caption ${active ? `font-semibold ${bandClass[scaleBand].text}` : "text-gray-650"}`}
              >
                {t.result.bandLevel[scaleBand]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
