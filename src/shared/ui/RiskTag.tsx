"use client";

import { useT } from "@/shared/i18n/I18nProvider";
import { uiMessages } from "@/shared/ui/messages";
import type { RiskLevel } from "@/shared/ui/messages";
const levelStyle: Record<RiskLevel, string> = {
  안전: "bg-green-50 text-green-500",
  위험: "bg-red-50 text-red-500",
  주의: "bg-yellow-50 text-yellow-500",
};

interface RiskTagProps {
  level: RiskLevel;
}

export default function RiskTag({ level }: RiskTagProps) {
  const t = useT(uiMessages);
  return (
    <div
      className={`text-caption flex h-[25px] min-w-[45px] items-center justify-center rounded-full px-2.5 font-bold whitespace-nowrap ${levelStyle[level]}`}
    >
      {t.riskLevel[level]}
    </div>
  );
}
