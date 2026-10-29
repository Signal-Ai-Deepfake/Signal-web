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
import { useT } from "@/shared/i18n/I18nProvider";
import { detectMessages } from "./messages";

interface DetectResultSectionProps {
  result: DetectResult;
  previewUrl: string | null;
}

export default function DetectResultSection({ result, previewUrl }: DetectResultSectionProps) {
  const { result: tr } = useT(detectMessages);
  return (
    <div className="flex w-full animate-[fade-in-up_0.4s_ease-out] flex-col gap-6 rounded-2xl border border-gray-300 p-5 md:gap-8 md:px-8 md:py-6">
      <p className="text-body-1 font-semibold text-black">{tr.title}</p>
      <div className="flex flex-col gap-4 md:gap-8 lg:flex-row">
        <VerdictCard
          title={tr.faceTheft}
          verdict={result.faceTheftVerdict}
          score={result.faceTheftScore}
          scoreLabel={tr.risk}
          scoreSuffix="/100"
          caption={result.faceTheftCaption}
          suspicion
          unsupported
        />
        <VerdictCard
          title={tr.deepfake}
          verdict={result.deepfakeVerdict}
          score={result.deepfakeProbability}
          tone={result.deepfakeTone}
          scoreLabel={tr.probability}
          scoreSuffix="%"
          caption={result.deepfakeCaption}
        />
        <OverallRiskCard result={result} />
      </div>

      <div className="flex flex-col gap-4 md:gap-6 lg:flex-row">
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
          {tr.chat}
        </Link>
        <Link
          href="/report"
          className={buttonStyle("primary", "flex flex-1 items-center justify-center gap-2")}
        >
          <span className="[&>svg]:h-6 [&>svg]:w-6">
            <FileText />
          </span>
          {tr.report}
        </Link>
      </div>
    </div>
  );
}
