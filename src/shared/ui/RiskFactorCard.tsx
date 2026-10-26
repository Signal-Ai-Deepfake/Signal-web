import type { ComponentType } from "react";

export interface RiskFactor {
  icon: ComponentType;
  title: string;
  subtitle: string;
  score: number;
}

interface RiskFactorCardProps {
  factors: RiskFactor[];
}

function scoreBarColor(score: number) {
  if (score >= 70) return "bg-red-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-green-500";
}

function Score({ score, className = "" }: { score: number; className?: string }) {
  return (
    <p className={`text-large sm:text-h3 shrink-0 font-semibold text-black ${className}`}>
      {score}
      <span className="text-small sm:text-body-1 text-gray-650 font-normal">/100</span>
    </p>
  );
}

export default function RiskFactorCard({ factors }: RiskFactorCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-300 p-4 md:p-6">
      <p className="text-body-2 md:text-body-1 font-semibold text-black">요인별 위험 점수</p>
      {factors.map((factor) => (
        <div
          key={factor.title}
          className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="bg-primary-50 text-primary-500 flex size-9 shrink-0 items-center justify-center rounded-lg sm:size-10 [&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-8 sm:[&>svg]:w-8">
              <factor.icon />
            </span>
            <div className="flex min-w-0 flex-1 flex-col sm:w-[157px] sm:flex-none">
              <p className="text-small sm:text-body-2 font-medium text-black">{factor.title}</p>
              <p className="text-caption sm:text-small break-keep text-gray-800">
                {factor.subtitle}
              </p>
            </div>
            <Score score={factor.score} className="sm:hidden" />
          </div>
          <div className="flex items-center gap-4 pl-12 sm:gap-6 sm:pl-0">
            <div className="h-1 min-w-0 flex-1 rounded-full bg-gray-200 sm:w-[170px] sm:flex-none">
              <div
                className={`h-1 rounded-full ${scoreBarColor(factor.score)}`}
                style={{ width: `${factor.score}%` }}
              />
            </div>
            <Score score={factor.score} className="hidden sm:block" />
          </div>
        </div>
      ))}
    </div>
  );
}
