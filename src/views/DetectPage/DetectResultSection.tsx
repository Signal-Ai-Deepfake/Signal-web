"use client";

import Link from "next/link";
import FileText from "@/shared/asset/svg/FileText";
import Message from "@/shared/asset/svg/Message";
import { buttonStyle } from "@/shared/ui/Button";
import type { DetectResult } from "./types";
import EvidenceHighlightCard from "./EvidenceHighlightCard";
import OverallRiskCard from "./OverallRiskCard";
import VerdictCard from "./VerdictCard";
import WebMatchCard from "./WebMatchCard";

interface DetectResultSectionProps {
  result: DetectResult;
  previewUrl: string | null;
}

export default function DetectResultSection({ result, previewUrl }: DetectResultSectionProps) {
  return (
    <div className="flex w-full animate-[fade-in-up_0.4s_ease-out] flex-col gap-8 rounded-2xl border border-gray-300 px-8 py-6">
      <p className="text-body-1 font-semibold text-black">탐지 결과</p>
      <div className="flex flex-col gap-8 lg:flex-row">
        <VerdictCard
          title="얼굴 도용 여부"
          verdict={result.faceTheftVerdict}
          score={result.faceTheftScore}
          scoreLabel="위험도"
          scoreSuffix="/100"
          caption={result.faceTheftCaption}
          suspicion
          unsupported
        />
        <VerdictCard
          title="딥페이크 여부"
          verdict={result.deepfakeVerdict}
          score={result.deepfakeProbability}
          scoreLabel="추정 확률"
          scoreSuffix="%"
          caption={result.deepfakeCaption}
        />
        <OverallRiskCard result={result} />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <EvidenceHighlightCard highlights={result.evidenceHighlights} previewUrl={previewUrl} />
        <WebMatchCard matchCount={result.webMatchCount} unsupported />
      </div>

      <div className="flex flex-col gap-2 sm:w-[536px] sm:flex-row sm:self-end">
        <Link
          href="/chat"
          className={buttonStyle("primary", "flex flex-1 items-center justify-center gap-2")}
        >
          <span className="[&>svg]:h-6 [&>svg]:w-6">
            <Message />
          </span>
          익명 상담하기
        </Link>
        <Link
          href="/report"
          className={buttonStyle("primary", "flex flex-1 items-center justify-center gap-2")}
        >
          <span className="[&>svg]:h-6 [&>svg]:w-6">
            <FileText />
          </span>
          신고 문서 작성하기
        </Link>
      </div>
    </div>
  );
}
