import type { SituationType } from "@/entities/agency/api";
import { defineMessages } from "@/shared/i18n/defineMessages";
import { useT } from "@/shared/i18n/I18nProvider";

export interface SituationCategory {
  type: SituationType;
  label: string;
  description: string;
}

interface CategoryText {
  label: string;
  description: string;
}

export const situationTypes: SituationType[] = ["DEEPFAKE_IMAGE", "IMAGE_ABUSE", "CRISIS"];

const categoryMessages = defineMessages<Record<string, CategoryText>>(
  {
    DEEPFAKE_IMAGE: {
      label: "얼굴 도용·딥페이크",
      description: "딥페이크·얼굴 도용 피해에 대응하는 기관 목록입니다.",
    },
    IMAGE_ABUSE: {
      label: "이미지 유포·온라인 괴롭힘",
      description: "이미지 유포, 온라인 괴롭힘 피해에 대응하는 기관 목록입니다.",
    },
    CRISIS: {
      label: "위기 상황(긴급)",
      description: "위기 상황에서 즉시 연결 가능한 기관 목록입니다.",
    },
  },
  {
    en: {
      DEEPFAKE_IMAGE: {
        label: "Face theft & deepfakes",
        description: "Agencies that respond to deepfake and face theft harm.",
      },
      IMAGE_ABUSE: {
        label: "Image distribution & online harassment",
        description: "Agencies that respond to image distribution and online harassment.",
      },
      CRISIS: {
        label: "Crisis (urgent)",
        description: "Agencies you can reach immediately in a crisis.",
      },
    },
    ja: {
      DEEPFAKE_IMAGE: {
        label: "顔の盗用・ディープフェイク",
        description: "ディープフェイク・顔の盗用被害に対応する機関の一覧です。",
      },
      IMAGE_ABUSE: {
        label: "画像の拡散・ネットいじめ",
        description: "画像の拡散やネットいじめの被害に対応する機関の一覧です。",
      },
      CRISIS: {
        label: "危機的状況（緊急）",
        description: "危機的な状況ですぐにつながる機関の一覧です。",
      },
    },
    zh: {
      DEEPFAKE_IMAGE: {
        label: "面部盗用·深度伪造",
        description: "应对深度伪造·面部盗用伤害的机构列表。",
      },
      IMAGE_ABUSE: {
        label: "图片传播·网络霸凌",
        description: "应对图片传播、网络霸凌伤害的机构列表。",
      },
      CRISIS: { label: "危机情况（紧急）", description: "危机情况下可立即联系的机构列表。" },
    },
  },
);

export function useSituationCategories(): SituationCategory[] {
  const t = useT(categoryMessages);
  return situationTypes.map((type) => ({ type, ...t[type] }));
}
