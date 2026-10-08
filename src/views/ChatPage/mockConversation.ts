import type { ChatMessage } from "./types";

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "bot",
    content:
      "안녕하세요. 이곳에서는 신원을 밝히지 않고 안전하게 상담할 수 있어요. 지금 어떤 상황을 겪고 계신지 편하게 말씀해 주세요.",
  },
];

export const QUICK_REPLIES = ["얼굴 도용", "딥페이크", "개인정보 유출", "신고 방법"];
