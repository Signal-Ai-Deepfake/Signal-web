export type ChatRole = "bot" | "user";
export type ChatStatus = "완료" | "작성 중";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export interface ChatSummary {
  situation: string;
  recommendedSteps: string[];
  riskLevel: string;
  riskDescription: string;
  progressPercent: number;
}

export interface ChatSession {
  id: string;
  topic: string;
  title: string;
  status: ChatStatus;
  listMeta: string;
  dateLong: string;
  savedConsent: boolean;
  messages: ChatMessage[];
  summary: ChatSummary;
}

export const chatSessions: ChatSession[] = [
  {
    id: "1",
    topic: "얼굴 도용",
    title: "온라인에 제 사진이 사용된 것 같아요",
    status: "완료",
    listMeta: "2026. 07. 19",
    dateLong: "2026년 7월 18일 · 얼굴 도용 상담",
    savedConsent: true,
    messages: [
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
    ],
    summary: {
      situation: "SNS 얼굴 사진 도용 의심",
      recommendedSteps: ["증거 보존", "플랫폼 신고", "전문 기관 상담"],
      riskLevel: "주의",
      riskDescription: "확산 여부를 확인하고 있어요.",
      progressPercent: 57,
    },
  },
  {
    id: "2",
    topic: "개인정보 유출",
    title: "개인정보 유출 피해 신고 문서",
    status: "작성 중",
    listMeta: "2026. 07. 15",
    dateLong: "2026년 7월 15일 · 개인정보 유출 상담",
    savedConsent: false,
    messages: [
      {
        id: "1",
        role: "bot",
        content:
          "안녕하세요. 이곳에서는 신원을 밝히지 않고 안전하게 상담할 수 있어요. 지금 어떤 상황을 겪고 계신지 편하게 말씀해 주세요.",
      },
      { id: "2", role: "user", content: "제 개인정보가 커뮤니티에 노출된 것 같아요." },
    ],
    summary: {
      situation: "커뮤니티 개인정보 노출 의심",
      recommendedSteps: ["증거 보존", "게시물 삭제 요청", "전문 기관 상담"],
      riskLevel: "확인 중",
      riskDescription: "상담을 계속 진행하고 있어요.",
      progressPercent: 20,
    },
  },
];

export function getChatSessionById(id: string): ChatSession | undefined {
  return chatSessions.find((session) => session.id === id);
}
