import Link from "next/link";
import type { RiskAssessmentResponse, RiskFactorResponse } from "@/entities/analysis/api";
import { RISK_LEVEL_LABEL } from "@/entities/analysis/model";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import LinkButton from "@/shared/ui/LinkButton";
import RiskTag from "@/shared/ui/RiskTag";

interface RecentResultsSectionProps {
  results: RiskAssessmentResponse[];
}

function TopFactor({ factors }: { factors: RiskFactorResponse[] }) {
  const top = factors.reduce<RiskFactorResponse | null>(
    (highest, factor) => (!highest || factor.score > highest.score ? factor : highest),
    null,
  );
  if (!top) return null;

  return (
    <p className="text-small px-1 text-gray-700">
      가장 높은 위험: {top.label} {top.score}%
    </p>
  );
}

export default function RecentResultsSection({ results }: RecentResultsSectionProps) {
  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-h3 font-semibold text-black">최근 분석 결과</h2>
          {results.length > 0 && (
            <Link
              href="/analyze"
              className="text-body-2 md:text-body-1 text-primary-500 flex shrink-0 items-center gap-1 md:gap-2"
            >
              전체 보기
              <span className="[&>svg]:h-6 [&>svg]:w-6">
                <ArrowUp />
              </span>
            </Link>
          )}
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-300 bg-gray-100 px-5 py-10 text-center md:px-8 md:py-16">
            <div className="flex flex-col gap-2">
              <p className="text-body-1 font-semibold text-black">아직 분석 결과가 없습니다.</p>
              <p className="text-small md:text-body-2 break-keep text-gray-700">
                사진을 분석하면 최근 결과와 위험도 변화를 이곳에서 확인할 수 있습니다.
              </p>
            </div>
            <LinkButton href="/analyze" variant="primary" className="w-full gap-1 md:w-auto">
              첫 사진 분석하기
              <span className="[&>svg]:h-6 [&>svg]:w-6">
                <ArrowUp />
              </span>
            </LinkButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {results.map((result) => (
              <div key={result.assessmentId}>
                <div className="flex h-full flex-col items-end gap-4 rounded-2xl border border-gray-300 bg-white p-5 md:gap-6 md:p-8">
                  <div className="flex w-full flex-col items-start gap-2">
                    <RiskTag level={RISK_LEVEL_LABEL[result.overallRiskLevel]} />
                    <p className="text-body-1 px-1 font-semibold text-black">
                      위험도 {result.overallScore}%
                    </p>
                    <TopFactor factors={result.factors} />
                    <p className="text-caption px-1 text-gray-600">
                      분석 번호 #{result.assessmentId}
                    </p>
                  </div>
                  <Link
                    href={`/analyze/results/${result.assessmentId}`}
                    className="text-large bg-primary-50 text-primary-500 hover:bg-primary-100 flex items-center gap-2 rounded px-4 py-2 font-medium transition-colors"
                  >
                    결과 보기
                    <span className="[&>svg]:h-6 [&>svg]:w-6">
                      <ArrowUp />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
