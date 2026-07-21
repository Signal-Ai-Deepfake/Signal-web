export type ReportStatus = "완료" | "작성 중";

export interface ReportDocument {
  id: string;
  damageType: string;
  title: string;
  status: ReportStatus;
  listMeta: string;
  createdAtLong: string;
  content: string;
}

export const reportDocuments: ReportDocument[] = [
  {
    id: "1",
    damageType: "얼굴 도용",
    title: "딥페이크 피해 신고 문서",
    status: "완료",
    listMeta: "2026. 07. 19 · 중앙디지털성범죄피해자지원센터 추천",
    createdAtLong: "2026년 7월 19일",
    content: `피해 개요
본인의 동의 없이 얼굴 사진이 다른 SNS 계정과 게시물에 사용된 사실을 발견하여 신고합니다.

피해 발생 시점
2026년 7월 18일 오후 9시 30분경

피해 유형
얼굴 사진 도용

피해 경로
인스타그램 공개 계정 및 게시물

원본 URL
https://example.com/post/1234

피해 내용
제 얼굴 사진을 무단으로 사용한 계정과 게시물을 발견했습니다. 해당 게시물은 현재 공개되어 있으며 지인들에게도 노출된 상태입니다.

증거 목록
계정 화면, 게시물 및 URL 캡처 이미지

요청 사항
해당 게시물의 삭제, 추가 확산 방지 및 필요한 조치를 요청합니다.`,
  },
  {
    id: "2",
    damageType: "개인정보 유출",
    title: "개인정보 유출 피해 신고 문서",
    status: "작성 중",
    listMeta: "2026. 07. 15 · 마지막 수정 18:40",
    createdAtLong: "2026년 7월 15일",
    content: `피해 개요
동의 없이 개인정보가 온라인 커뮤니티 게시물에 노출된 사실을 발견하여 신고합니다.

피해 발생 시점
2026년 7월 15일 오후 6시 40분경

피해 유형
개인정보 유출

피해 경로
온라인 커뮤니티 게시판

원본 URL
미입력

피해 내용
이름과 연락처가 포함된 게시물이 공개 커뮤니티에 게시된 것을 확인했습니다.

증거 목록
게시물 캡처 이미지

요청 사항
해당 게시물의 삭제 및 추가 유출 방지 조치를 요청합니다.`,
  },
];

export function getReportDocumentById(id: string): ReportDocument | undefined {
  return reportDocuments.find((document) => document.id === id);
}
