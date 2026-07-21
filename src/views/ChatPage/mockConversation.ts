import type { ChatMessage, ChatSummary } from "./types";

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "bot",
    content:
      "안녕하세요. 이곳에서는 신원을 밝히지 않고 안전하게 상담할 수 있어요. 지금 어떤 상황을 겪고 계신지 편하게 말씀해 주세요.",
  },
  { id: "2", role: "user", content: "제 사진이 다른 계정에 도용된 것 같아요." },
  {
    id: "3",
    role: "bot",
    content:
      "많이 당황스러우셨겠어요. 도용된 계정의 주소와 게시물을 먼저 캡처해 두는 것이 중요합니다. 게시물이 아직 공개되어 있나요?",
  },
  { id: "4", role: "user", content: "저 너무 힘들어요" },
  {
    id: "5",
    role: "bot",
    content:
      "말씀해 주셔서 감사합니다. 관련 화면과 URL을 캡처해 증거를 보존해 주세요. 이어서 확산 범위와 신고 가능 경로를 함께 확인할게요.",
  },
];

export const QUICK_REPLIES = ["얼굴 도용", "딥페이크", "개인정보 유출", "신고 방법"];

export const MOCK_SUMMARY: ChatSummary = {
  situation: "SNS 얼굴 사진 도용 의심",
  recommendedSteps: ["증거 보존", "플랫폼 신고", "전문 기관 상담"],
  riskLevel: "주의",
  riskDescription: "확산 여부를 확인하고 있어요.",
  progressPercent: 57,
};
