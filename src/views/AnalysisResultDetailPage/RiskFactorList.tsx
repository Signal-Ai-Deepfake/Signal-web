import type { RiskFactor } from "@/shared/ui/RiskFactorCard";

interface RiskFactorListProps {
  factors: RiskFactor[];
}

function scoreTextColor(score: number) {
  if (score >= 70) return "text-red-500";
  if (score >= 40) return "text-orange-500";
  return "text-green-500";
}

export default function RiskFactorList({ factors }: RiskFactorListProps) {
  return (
    <section className="flex w-full flex-col gap-3">
      <h3 className="text-body-2 text-primary-500 font-bold">상세 분석 내용</h3>
      <ul className="flex flex-col gap-3">
        {factors.map((factor, index) => (
          <li
            key={`${index}-${factor.title}`}
            className="border-primary-50 bg-primary-50/50 flex items-center justify-between gap-3 rounded-2xl border p-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="text-primary-500 flex size-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm [&>svg]:size-5">
                <factor.icon />
              </span>
              <div className="flex min-w-0 flex-col">
                <p className="text-body-2 text-primary-500 font-medium">{factor.title}</p>
                {factor.subtitle && (
                  <p className="text-caption text-gray-650 break-keep">{factor.subtitle}</p>
                )}
              </div>
            </div>
            <p className={`text-body-2 shrink-0 font-bold ${scoreTextColor(factor.score)}`}>
              {factor.score}%
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
