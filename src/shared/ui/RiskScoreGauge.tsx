"use client";

import { useEffect, useState } from "react";

const SWEEP_DEG = 260;
const ROTATE_DEG = 140;

interface RiskScoreGaugeProps {
  score: number;
  size?: number;
}

export default function RiskScoreGauge({ score, size = 80 }: RiskScoreGaugeProps) {
  const clampedScore = Math.min(100, Math.max(0, score));
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setDisplayScore(clampedScore));
    return () => cancelAnimationFrame(raf);
  }, [clampedScore]);

  const strokeWidth = size * 0.12;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (circumference * SWEEP_DEG) / 360;
  const filledLength = (arcLength * displayScore) / 100;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <g transform={`rotate(${ROTATE_DEG} ${size / 2} ${size / 2})`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className="text-red-100"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className="text-red-500 transition-[stroke-dasharray] duration-700 ease-out"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${filledLength} ${circumference}`}
        />
      </g>
    </svg>
  );
}
