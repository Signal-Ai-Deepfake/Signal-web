"use client";

import Link from "next/link";
import Arrow from "@/shared/asset/svg/Arrow";
import CheckCircle from "@/shared/asset/svg/CheckCircle";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import Loading from "@/shared/asset/svg/Loading";
import Button from "@/shared/ui/Button";
import RiskScoreGauge from "@/shared/ui/RiskScoreGauge";
import RiskTag from "@/shared/ui/RiskTag";
import ScoreInfoTooltip from "./ScoreInfoTooltip";
import type { AnalysisResult, Status } from "./AnalyzePage";
import { useT } from "@/shared/i18n/I18nProvider";
import { analyzeMessages } from "./messages";

interface AnalysisPanelProps {
  status: Status;
  canAnalyze: boolean;
  onAnalyze: () => void;
  result: AnalysisResult;
  detailHref: string | null;
  isProtected: boolean;
  isSimulatedProtection: boolean;
  showDetails: boolean;
  onToggleDetails: () => void;
  onProtect: () => void;
  onShare: () => void;
  onSaveProtected: () => void;
}

export default function AnalysisPanel({
  status,
  canAnalyze,
  onAnalyze,
  result,
  detailHref,
  isProtected,
  isSimulatedProtection,
  showDetails,
  onToggleDetails,
  onProtect,
  onShare,
  onSaveProtected,
}: AnalysisPanelProps) {
  const t = useT(analyzeMessages);
  if (status === "error") {
    return (
      <div className="flex animate-[fade-in-up_0.4s_ease-out] flex-col gap-4 rounded-2xl border border-gray-300 p-5 md:h-[217px] md:justify-between md:px-8">
        <p className="text-body-1 font-semibold text-black">{t.panel.realtime}</p>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-body-1 font-semibold text-black">{t.panel.noFaceTitle}</p>
          <p className="text-body-2 text-gray-650">{t.panel.noFaceDescription}</p>
        </div>
        <Button type="button" variant="primary" className="w-full" onClick={onAnalyze}>
          {t.panel.analyze}
        </Button>
      </div>
    );
  }

  if (status === "result") {
    return (
      <div className="flex animate-[fade-in-up_0.4s_ease-out] flex-col gap-4 rounded-2xl border border-gray-300 px-8 py-5">
        <div className="flex items-center gap-6">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
            <RiskScoreGauge score={result.score} size={80} level={result.level} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-body-2 font-bold text-black">{result.score}</p>
              <p className="text-caption text-gray-650">/100</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-large font-semibold text-black">{t.panel.riskGrade}</p>
              <ScoreInfoTooltip />
              <RiskTag level={result.level} />
            </div>
            <p className="text-body-2 whitespace-pre-line text-gray-800">{result.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {isProtected ? (
            <>
              <button
                type="button"
                onClick={onShare}
                className="border-primary-500 text-primary-500 text-body-2 flex h-[50px] animate-[fade-in-up_0.3s_ease-out] items-center justify-center rounded border"
              >
                {t.panel.share}
              </button>
              <Button
                type="button"
                variant="primary"
                className="animate-[fade-in-up_0.3s_ease-out]"
                onClick={onSaveProtected}
              >
                {t.panel.saveProtected}
              </Button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onToggleDetails}
                className="border-primary-500 text-primary-500 text-body-2 flex h-[50px] items-center justify-center rounded border"
              >
                {showDetails ? t.panel.showLess : t.panel.showMore}
              </button>
              <Button type="button" variant="primary" onClick={onProtect}>
                {t.panel.protect}
              </Button>
            </>
          )}
        </div>
        {isProtected && (
          <p className="text-caption break-keep text-gray-700">
            {isSimulatedProtection ? t.panel.simulatedNotice : t.panel.protectedNotice}
          </p>
        )}
        {detailHref && (
          <Link
            href={detailHref}
            className="text-small text-primary-500 flex items-center justify-center gap-1 self-center py-1 font-medium hover:underline"
          >
            {t.panel.goToDetail}
            <span className="[&>svg]:h-4 [&>svg]:w-4">
              <Arrow />
            </span>
          </Link>
        )}
      </div>
    );
  }

  const guide =
    status === "analyzing"
      ? { icon: Loading, text: t.panel.analyzing, iconClass: "animate-spin" }
      : canAnalyze
        ? { icon: CheckCircle, text: t.panel.ready, iconClass: "" }
        : { icon: ImageArrowUp, text: t.panel.idle, iconClass: "" };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-300 p-5 md:h-[217px] md:justify-between md:px-8">
      <p className="text-body-1 font-semibold text-black">{t.panel.realtime}</p>
      <div className="flex items-center gap-3 rounded-xl bg-gray-100 px-4 py-3">
        <span className={`text-primary-500 shrink-0 [&>svg]:h-6 [&>svg]:w-6 ${guide.iconClass}`}>
          <guide.icon />
        </span>
        <p className="text-small break-keep text-gray-800">{guide.text}</p>
      </div>
      <Button
        type="button"
        variant="primary"
        className="w-full"
        disabled={!canAnalyze}
        onClick={onAnalyze}
      >
        {t.panel.analyze}
      </Button>
    </div>
  );
}
