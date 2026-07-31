import Warning from "@/shared/asset/svg/Warning";
import SuspicionBanner from "@/shared/ui/SuspicionBanner";

function verdictStyle(score: number) {
  if (score >= 70) return { bg: "bg-red-50", text: "text-red-500" };
  if (score >= 40) return { bg: "bg-yellow-50", text: "text-yellow-500" };
  return { bg: "bg-green-50", text: "text-green-500" };
}

function scoreToSuspicionStatus(score: number): "의심" | "주의" | "의심없음" {
  if (score >= 70) return "의심";
  if (score >= 40) return "주의";
  return "의심없음";
}

interface VerdictCardProps {
  title: string;
  verdict: string;
  score: number;
  scoreLabel: string;
  scoreSuffix: string;
  caption: string;
  suspicion?: boolean;
  unsupported?: boolean;
}

export default function VerdictCard({
  title,
  verdict,
  score,
  scoreLabel,
  scoreSuffix,
  caption,
  suspicion = false,
  unsupported = false,
}: VerdictCardProps) {
  const style = verdictStyle(score);

  if (unsupported) {
    return (
      <div className="flex w-full flex-col gap-5 rounded-lg border border-gray-300 p-6 lg:w-[364px]">
        <p className="text-body-1 font-semibold text-black">{title}</p>
        <div className="bg-gray-100 flex h-[60px] w-full items-center gap-3 rounded-lg px-5">
          <span className="text-gray-500 shrink-0 [&>svg]:h-8 [&>svg]:w-8">
            <Warning />
          </span>
          <p className="text-body-1 text-gray-500 font-bold">준비 중인 기능입니다</p>
        </div>
        <p className="text-body-2 text-gray-650 text-center">{caption}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5 rounded-lg border border-gray-300 p-6 lg:w-[364px]">
      <p className="text-body-1 font-semibold text-black">{title}</p>
      {suspicion ? (
        <SuspicionBanner status={scoreToSuspicionStatus(score)} />
      ) : (
        <div className={`flex h-[60px] w-full items-center gap-3 rounded-lg px-5 ${style.bg}`}>
          <span className={`shrink-0 ${style.text} [&>svg]:h-8 [&>svg]:w-8`}>
            <Warning />
          </span>
          <p className={`text-body-1 font-bold ${style.text}`}>{verdict}</p>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <p className="text-body-1 text-gray-800">{scoreLabel}</p>
        <p className={`text-h1 font-bold ${style.text}`}>
          {score}
          <span className="text-h3 font-semibold text-gray-500">{scoreSuffix}</span>
        </p>
        <div className="h-px w-full bg-gray-200" />
      </div>
      <p className="text-body-2 text-gray-650 text-center">{caption}</p>
    </div>
  );
}
