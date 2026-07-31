import type { SituationType } from "@/entities/agency/api";

export interface SituationCategory {
  type: SituationType;
  label: string;
  description: string;
}

export const situationCategories: SituationCategory[] = [
  {
    type: "DEEPFAKE_IMAGE",
    label: "얼굴 도용·딥페이크",
    description: "딥페이크·얼굴 도용 피해에 대응하는 기관 목록입니다.",
  },
  {
    type: "IMAGE_ABUSE",
    label: "이미지 유포·온라인 괴롭힘",
    description: "이미지 유포, 온라인 괴롭힘 피해에 대응하는 기관 목록입니다.",
  },
  {
    type: "CRISIS",
    label: "위기 상황(긴급)",
    description: "위기 상황에서 즉시 연결 가능한 기관 목록입니다.",
  },
];
