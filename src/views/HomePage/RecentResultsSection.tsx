import Link from "next/link";
import type { RiskAssessmentResponse } from "@/entities/analysis/api";
import { RISK_LEVEL_LABEL } from "@/entities/analysis/model";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import ImageIcon from "@/shared/asset/svg/Image";
import LinkButton from "@/shared/ui/LinkButton";
import RiskTag from "@/shared/ui/RiskTag";
import ScrollReveal from "@/shared/ui/ScrollReveal";

interface RecentResultsSectionProps {
  results: RiskAssessmentResponse[];
}

export default function RecentResultsSection({ results }: RecentResultsSectionProps) {
  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-h3 font-semibold text-black">최근 분석 결과</h2>
          {results.length > 0 && (
            <Link href="/analyze" className="text-body-1 text-primary-500 flex items-center gap-2">
              전체 보기
              <span className="[&>svg]:h-6 [&>svg]:w-6">
                <ArrowUp />
              </span>
            </Link>
          )}
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-300 bg-gray-100 px-8 py-16 text-center">
            <div className="flex flex-col gap-2">
              <p className="text-body-1 font-semibold text-black">아직 분석 결과가 없습니다.</p>
              <p className="text-body-2 text-gray-700">
                사진을 분석하면 최근 결과와 위험도 변화를 이곳에서 확인할 수 있습니다.
              </p>
            </div>
            <LinkButton href="/analyze" variant="primary" className="gap-1">
              첫 사진 분석하기
              <span className="[&>svg]:h-6 [&>svg]:w-6">
                <ArrowUp />
              </span>
            </LinkButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {results.map((result, index) => (
              <ScrollReveal key={result.assessmentId} delay={index * 80}>
                <div className="flex h-full flex-col items-end gap-6 rounded-2xl border border-gray-300 bg-white p-8">
                  <div className="flex w-full items-start gap-4">
                    <div className="flex size-[104px] shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-600 [&>svg]:h-8 [&>svg]:w-8">
                      <ImageIcon />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <RiskTag level={RISK_LEVEL_LABEL[result.overallRiskLevel]} />
                      <p className="text-body-1 px-1 font-semibold text-black">
                        위험도 {result.overallScore}%
                      </p>
                    </div>
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
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
