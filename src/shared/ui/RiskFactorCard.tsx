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

export default function RiskFactorCard({ factors }: RiskFactorCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-300 p-6">
      <p className="text-body-1 font-semibold text-black">요인별 위험 점수</p>
      {factors.map((factor) => (
        <div
          key={factor.title}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        >
          <div className="flex items-center gap-4">
            <span className="bg-primary-50 text-primary-500 flex size-10 shrink-0 items-center justify-center rounded-lg [&>svg]:h-8 [&>svg]:w-8">
              <factor.icon />
            </span>
            <div className="flex flex-col sm:w-[157px]">
              <p className="text-body-2 font-medium text-black">{factor.title}</p>
              <p className="text-small text-gray-800">{factor.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 pl-14 sm:gap-6 sm:pl-0">
            <div className="h-1 min-w-0 flex-1 rounded-full bg-gray-200 sm:w-[170px] sm:flex-none">
              <div
                className={`h-1 rounded-full ${scoreBarColor(factor.score)}`}
                style={{ width: `${factor.score}%` }}
              />
            </div>
            <p className="text-h3 shrink-0 font-semibold text-black">
              {factor.score}
              <span className="text-body-1 text-gray-650 font-normal">/100</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
