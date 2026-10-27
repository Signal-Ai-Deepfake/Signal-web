import type { ComponentType } from "react";
import type { RiskAssessmentResponse, RiskLevel } from "./api";
import FileText from "@/shared/asset/svg/FileText";
import Hd from "@/shared/asset/svg/Hd";
import IdCard from "@/shared/asset/svg/IdCard";
import Image from "@/shared/asset/svg/Image";
import ImageSearch from "@/shared/asset/svg/ImageSearch";
import ScanFace from "@/shared/asset/svg/ScanFace";
import type { RiskFactor } from "@/shared/ui/RiskFactorCard";
import { defineMessages } from "@/shared/i18n/defineMessages";
import type { Locale } from "@/shared/i18n/config";

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

const assessmentMessages = defineMessages(
  {
    description: {
      HIGH: "AI 악용 위험이 높습니다.\n이미지 보호 처리 후 업로드를 권장합니다.",
      MEDIUM: "AI 악용 위험이 있습니다.\n이미지 보호 처리를 고려해 보세요.",
      LOW: "AI 악용 위험이 낮습니다.",
    } as Record<RiskLevel, string>,
    fallbackNote:
      "⚠️ AI 모델 응답에 실패해 이번 결과는 참고용 추정치(자동 폴백)입니다. 실제 이미지 분석 결과가 아닐 수 있어요.",
  },
  {
    en: {
      description: {
        HIGH: "High risk of AI misuse.\nWe recommend protecting the image before uploading.",
        MEDIUM: "Some risk of AI misuse.\nConsider protecting the image.",
        LOW: "Low risk of AI misuse.",
      },
      fallbackNote:
        "⚠️ The AI model didn't respond, so this is a reference estimate (automatic fallback). It may not reflect an actual image analysis.",
    },
    ja: {
      description: {
        HIGH: "AI悪用の危険性が高いです。\n画像を保護してからアップロードすることをおすすめします。",
        MEDIUM: "AI悪用の危険性があります。\n画像の保護をご検討ください。",
        LOW: "AI悪用の危険性は低いです。",
      },
      fallbackNote:
        "⚠️ AIモデルの応答に失敗したため、今回の結果は参考用の推定値（自動フォールバック）です。実際の画像分析結果ではない可能性があります。",
    },
    zh: {
      description: {
        HIGH: "AI滥用风险较高。\n建议先对图片进行保护处理再上传。",
        MEDIUM: "存在AI滥用风险。\n建议考虑对图片进行保护处理。",
        LOW: "AI滥用风险较低。",
      },
      fallbackNote:
        "⚠️ AI模型未能响应，本次结果为参考估算值（自动回退），可能并非实际的图片分析结果。",
    },
  },
);

type FactorKey = "face" | "quality" | "metadata" | "reverseSearch" | "background" | "personal";

type FactorLabels = Partial<Record<FactorKey, string>>;

const FACTOR_KEY_BY_TYPE: Record<string, FactorKey> = {
  FACE: "face",
  FACE_EXPOSURE: "face",
  RESOLUTION: "quality",
  IMAGE_QUALITY: "quality",
  QUALITY: "quality",
  METADATA: "metadata",
  METADATA_EXPOSURE: "metadata",
  REVERSE_SEARCH: "reverseSearch",
  BACKGROUND: "background",
  PERSONAL_INFO: "personal",
};

const FACTOR_KEY_BY_LABEL: Record<string, FactorKey> = {
  "얼굴 노출도": "face",
  "이미지 품질": "quality",
  "메타데이터 노출": "metadata",
  "역검색 노출 위험": "reverseSearch",
  "배경 정보": "background",
  "배경 정보 노출": "background",
  "개인정보 노출": "personal",
};

export const factorLabelMessages = defineMessages<FactorLabels>(
  {},
  {
    en: {
      face: "Face exposure",
      quality: "Image quality",
      metadata: "Metadata exposure",
      reverseSearch: "Reverse search exposure risk",
      background: "Background information",
      personal: "Personal information exposure",
    },
    ja: {
      face: "顔の露出度",
      quality: "画像品質",
      metadata: "メタデータの露出",
      reverseSearch: "逆検索による露出リスク",
      background: "背景情報",
      personal: "個人情報の露出",
    },
    zh: {
      face: "面部暴露程度",
      quality: "图像质量",
      metadata: "元数据暴露",
      reverseSearch: "反向搜索暴露风险",
      background: "背景信息",
      personal: "个人信息暴露",
    },
  },
);

export function factorLabel(factor: { type: string; label: string }, labels: FactorLabels) {
  const key = FACTOR_KEY_BY_LABEL[factor.label.trim()] ?? FACTOR_KEY_BY_TYPE[factor.type];
  return (key && labels[key]) ?? factor.label;
}

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

export function mapAssessment(data: RiskAssessmentResponse, locale: Locale): AnalysisResult {
  const t = assessmentMessages[locale];
  const labels = factorLabelMessages[locale];
  return {
    score: data.overallScore,
    level: RISK_LEVEL_LABEL[data.overallRiskLevel],
    description: t.description[data.overallRiskLevel],
    factors: data.factors.map((factor) => ({
      icon: resolveFactorIcon(factor.type, factor.label),
      title: factorLabel(factor, labels),
      subtitle: factor.description,
      score: factor.score,
    })),
    recommendations: data.recommendations,
    aiNote: data.fallbackUsed
      ? t.fallbackNote
      : (data.recommendations[0] ?? t.description[data.overallRiskLevel]),
  };
}
