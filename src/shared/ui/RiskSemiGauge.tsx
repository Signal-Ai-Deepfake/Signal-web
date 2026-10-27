"use client";

import { useEffect, useState } from "react";
import { useT } from "@/shared/i18n/I18nProvider";
import { uiMessages } from "@/shared/ui/messages";
import type { RiskLevel } from "@/shared/ui/messages";

const WIDTH = 285;
const HEIGHT = 192;
const CX = WIDTH / 2;
const CY = 152;
const RADIUS = 98.5;
const BAND_WIDTH = 28;
const FILL_WIDTH = 18;
const ARC = `M ${CX - RADIUS} ${CY} A ${RADIUS} ${RADIUS} 0 0 1 ${CX + RADIUS} ${CY}`;

const zones: { from: number; to: number; className: string }[] = [
  { from: 0, to: 40, className: "text-green-500" },
  { from: 40, to: 70, className: "text-yellow-400" },
  { from: 70, to: 100, className: "text-red-500" },
];

const fillColorClass: Record<RiskLevel, string> = {
  안전: "text-green-500",
  주의: "text-orange-400",
  위험: "text-red-500",
};

interface RiskSemiGaugeProps {
  score: number;
  level: RiskLevel;
  className?: string;
}

export default function RiskSemiGauge({ score, level, className = "" }: RiskSemiGaugeProps) {
  const t = useT(uiMessages);
  const clampedScore = Math.min(100, Math.max(0, score));
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setDisplayScore(clampedScore));
    return () => cancelAnimationFrame(raf);
  }, [clampedScore]);

  const outer = CX - RADIUS - BAND_WIDTH / 2;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      fill="none"
      role="img"
      aria-label={t.riskPercent(clampedScore)}
      className={`text-primary-500 h-auto w-full ${className}`}
    >
      {zones.map((zone) => (
        <path
          key={zone.from}
          d={ARC}
          pathLength={100}
          stroke="currentColor"
          strokeWidth={BAND_WIDTH}
          strokeDasharray={`${zone.to - zone.from} 100`}
          strokeDashoffset={-zone.from}
          className={zone.className}
        />
      ))}
      <path
        d={ARC}
        pathLength={100}
        stroke="currentColor"
        strokeWidth={FILL_WIDTH}
        strokeDasharray={`${displayScore} 100`}
        className={`${fillColorClass[level]} transition-[stroke-dasharray] duration-700 ease-out`}
      />
      <g stroke="currentColor" strokeWidth={1}>
        <line x1={outer - 6} y1={CY} x2={outer} y2={CY} />
        <line
          x1={CX}
          y1={CY - RADIUS - BAND_WIDTH / 2 - 6}
          x2={CX}
          y2={CY - RADIUS - BAND_WIDTH / 2}
        />
        <line x1={WIDTH - outer} y1={CY} x2={WIDTH - outer + 6} y2={CY} />
      </g>
      <g fill="currentColor" fontSize={12}>
        <text x={outer - 9} y={CY} textAnchor="end" dominantBaseline="middle">
          0
        </text>
        <text x={CX} y={CY - RADIUS - BAND_WIDTH / 2 - 11} textAnchor="middle">
          50
        </text>
        <text x={WIDTH - outer + 9} y={CY} dominantBaseline="middle">
          100
        </text>
      </g>
      <text x={CX} y={CY - 6} textAnchor="middle" fill="currentColor" fontSize={40}>
        {clampedScore}%
      </text>
    </svg>
  );
}
