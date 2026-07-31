import type { ComponentType } from "react";
import type { RiskAssessmentResponse, RiskLevel } from "./api";
import Hd from "@/shared/asset/svg/Hd";
import IdCard from "@/shared/asset/svg/IdCard";
import Image from "@/shared/asset/svg/Image";
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

export function mapAssessment(data: RiskAssessmentResponse): AnalysisResult {
  return {
    score: data.overallScore,
    level: RISK_LEVEL_LABEL[data.overallRiskLevel],
    description: RISK_LEVEL_DESCRIPTION[data.overallRiskLevel],
    factors: data.factors.map((factor) => ({
      icon: FACTOR_ICON_BY_TYPE[factor.type] ?? ScanFace,
      title: factor.label,
      subtitle: factor.description,
      score: factor.score,
    })),
    recommendations: data.recommendations,
    aiNote: data.recommendations[0] ?? RISK_LEVEL_DESCRIPTION[data.overallRiskLevel],
  };
}
