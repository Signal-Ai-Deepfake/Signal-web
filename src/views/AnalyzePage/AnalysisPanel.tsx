import CheckCircle from "@/shared/asset/svg/CheckCircle";
import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import Loading from "@/shared/asset/svg/Loading";
import Button from "@/shared/ui/Button";
import RiskScoreGauge from "@/shared/ui/RiskScoreGauge";
import RiskTag from "@/shared/ui/RiskTag";
import ScoreInfoTooltip from "./ScoreInfoTooltip";
import type { AnalysisResult, Status } from "./AnalyzePage";

interface AnalysisPanelProps {
  status: Status;
  canAnalyze: boolean;
  onAnalyze: () => void;
  result: AnalysisResult;
  isProtected: boolean;
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
  isProtected,
  showDetails,
  onToggleDetails,
  onProtect,
  onShare,
  onSaveProtected,
}: AnalysisPanelProps) {
  if (status === "error") {
    return (
      <div className="flex h-[217px] animate-[fade-in-up_0.4s_ease-out] flex-col justify-between rounded-2xl border border-gray-300 px-8 py-5">
        <p className="text-body-1 font-semibold text-black">실시간 분석</p>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-body-1 font-semibold text-black">
            얼굴을 찾을 수 없어 분석할 수 없습니다.
          </p>
          <p className="text-body-2 text-gray-650">
            얼굴이 선명하게 보이는 사진을 다시 업로드해 주세요.
          </p>
        </div>
        <Button type="button" variant="primary" className="w-full" onClick={onAnalyze}>
          분석하기
        </Button>
      </div>
    );
  }

  if (status === "result") {
    return (
      <div className="flex flex-1 animate-[fade-in-up_0.4s_ease-out] flex-col justify-between gap-3 rounded-2xl border border-gray-300 px-8 py-5">
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
              <p className="text-large font-semibold text-black">위험도 등급</p>
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
                SNS 공유
              </button>
              <Button
                type="button"
                variant="primary"
                className="animate-[fade-in-up_0.3s_ease-out]"
                onClick={onSaveProtected}
              >
                보호본 저장
              </Button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onToggleDetails}
                className="border-primary-500 text-primary-500 text-body-2 flex h-[50px] items-center justify-center rounded border"
              >
                {showDetails ? "간단히 보기" : "자세히 보기"}
              </button>
              <Button type="button" variant="primary" onClick={onProtect}>
                이미지 보호 조치
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  const guide =
    status === "analyzing"
      ? { icon: Loading, text: "AI가 사진을 분석하고 있어요.", iconClass: "animate-spin" }
      : canAnalyze
        ? { icon: CheckCircle, text: "사진이 준비됐어요. 분석하기를 눌러 주세요.", iconClass: "" }
        : { icon: ImageArrowUp, text: "사진을 올리면 분석을 시작할 수 있어요.", iconClass: "" };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-300 p-5 md:h-[217px] md:justify-between md:px-8">
      <p className="text-body-1 font-semibold text-black">실시간 분석</p>
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
        분석하기
      </Button>
    </div>
  );
}
