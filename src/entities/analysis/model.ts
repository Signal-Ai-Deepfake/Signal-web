import type { ComponentType } from "react";
import type { RiskAssessmentResponse, RiskLevel } from "./api";
import FileText from "@/shared/asset/svg/FileText";
import Hd from "@/shared/asset/svg/Hd";
import IdCard from "@/shared/asset/svg/IdCard";
import Image from "@/shared/asset/svg/Image";
import ImageSearch from "@/shared/asset/svg/ImageSearch";
import ScanFace from "@/shared/asset/svg/ScanFace";
import type { RiskFactor } from "@/shared/ui/RiskFactorCard";

export type DisplayRiskLevel = "안전" | "위험" | "주의";

export interface AnalysisResult {
  score: number;
  level: DisplayRiskLevel;
  description: string;
  factors: RiskFactor[];
  recommendations: string[];
  aiNote: string;
}

export const RISK_LEVEL_LABEL: Record<RiskLevel, DisplayRiskLevel> = {
  HIGH: "위험",
  MEDIUM: "주의",
  LOW: "안전",
};

export const RISK_LEVEL_DESCRIPTION: Record<RiskLevel, string> = {
  HIGH: "AI 악용 위험이 높습니다.\n이미지 보호 처리 후 업로드를 권장합니다.",
  MEDIUM: "AI 악용 위험이 있습니다.\n이미지 보호 처리를 고려해 보세요.",
  LOW: "AI 악용 위험이 낮습니다.",
};

const FACTOR_ICON_BY_TYPE: Record<string, ComponentType> = {
  FACE: ScanFace,
  BACKGROUND: Image,
  PERSONAL_INFO: IdCard,
  RESOLUTION: Hd,
};

const FACTOR_ICON_BY_KEYWORD: [keywords: string[], icon: ComponentType][] = [
  [["quality", "resolution", "품질", "해상도"], Hd],
  [["meta", "메타"], FileText],
  [["search", "검색"], ImageSearch],
  [["background", "배경"], Image],
  [["personal", "개인"], IdCard],
  [["face", "얼굴"], ScanFace],
];

function resolveFactorIcon(type: string, label: string): ComponentType {
  const exact = FACTOR_ICON_BY_TYPE[type];
  if (exact) return exact;

  const text = `${type} ${label}`.toLowerCase();
  const matched = FACTOR_ICON_BY_KEYWORD.find(([keywords]) =>
    keywords.some((keyword) => text.includes(keyword)),
  );
  return matched?.[1] ?? ScanFace;
}

export function mapAssessment(data: RiskAssessmentResponse): AnalysisResult {
  return {
    score: data.overallScore,
    level: RISK_LEVEL_LABEL[data.overallRiskLevel],
    description: RISK_LEVEL_DESCRIPTION[data.overallRiskLevel],
    factors: data.factors.map((factor) => ({
      icon: resolveFactorIcon(factor.type, factor.label),
      title: factor.label,
      subtitle: factor.description,
      score: factor.score,
    })),
    recommendations: data.recommendations,
    aiNote: data.recommendations[0] ?? RISK_LEVEL_DESCRIPTION[data.overallRiskLevel],
  };
}
