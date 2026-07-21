import type { ChatMessage } from "./types";

const MOCK_REPLIES = [
  "말씀해 주셔서 감사합니다. 상황을 조금 더 자세히 알려주시면 적절한 대응 방법을 안내해 드릴게요.",
  "그 부분은 증거 확보가 중요해요. 관련 화면을 캡처해 두셨나요?",
  "충분히 힘드셨을 상황이에요. 이어서 신고 절차를 함께 확인해볼까요?",
];

let replyIndex = 0;

// TODO: 실제 상담 API 연동 시 이 함수 내부만 교체하면 됨.
// ex) return (await api.post("/chat/messages", { history })).data.reply;
export async function requestBotReply(history: ChatMessage[]): Promise<string> {
  void history;
  await new Promise((resolve) => setTimeout(resolve, 900));
  const reply = MOCK_REPLIES[replyIndex % MOCK_REPLIES.length];
  replyIndex += 1;
  return reply;
}
