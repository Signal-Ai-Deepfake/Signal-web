"use client";

import { useQuery } from "@tanstack/react-query";
import PageHeading from "@/shared/ui/PageHeading";
import HistoryListItem from "@/shared/ui/HistoryListItem";
import NoticeBanner from "@/shared/ui/NoticeBanner";
import { getMyChatSessions } from "@/entities/chat/api";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

export default function ChatHistoryPage() {
  const { data: sessions, isLoading } = useQuery({
    queryKey: ["myChatSessions"],
    queryFn: getMyChatSessions,
  });

  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-6 pb-[120px] md:py-10">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-6 md:gap-8">
          <PageHeading
            title="대화 내역"
            description="지금까지의 익명 상담 내역이 표시됩니다."
            breadcrumbs={[{ label: "대화 내역" }]}
          />

          <NoticeBanner>익명 상담 내용은 사용자가 저장에 동의한 경우에만 보관됩니다.</NoticeBanner>

          {isLoading && <p className="text-body-2 text-gray-700">불러오는 중입니다...</p>}

          {!isLoading && sessions?.length === 0 && (
            <p className="text-body-2 text-gray-700">아직 저장된 상담 내역이 없습니다.</p>
          )}

          <div className="flex w-full flex-col gap-4">
            {sessions?.map((session) => (
              <HistoryListItem
                key={session.sessionId}
                href={`/mypage/chats/${session.sessionId}`}
                badge={session.saveConsent ? "저장됨" : "미저장"}
                badgeTone={session.saveConsent ? "primary" : "secondary"}
                title="익명 상담"
                meta={formatDate(session.createdAt)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
