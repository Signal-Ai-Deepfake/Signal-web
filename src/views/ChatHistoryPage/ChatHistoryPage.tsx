"use client";

import { useQuery } from "@tanstack/react-query";
import PageHeading from "@/shared/ui/PageHeading";
import HistoryListItem from "@/shared/ui/HistoryListItem";
import NoticeBanner from "@/shared/ui/NoticeBanner";
import { getMyChatSessions } from "@/entities/chat/api";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import { useT } from "@/shared/i18n/I18nProvider";
import { mypageMessages } from "@/views/mypageMessages";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

export default function ChatHistoryPage() {
  const { chats: t, loading } = useT(mypageMessages);
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
            title={t.title}
            description={t.description}
            breadcrumbs={[{ label: t.title }]}
          />

          <NoticeBanner>{t.notice}</NoticeBanner>

          {isLoading && <p className="text-body-2 text-gray-700">{loading}</p>}

          {!isLoading && sessions?.length === 0 && (
            <p className="text-body-2 text-gray-700">{t.empty}</p>
          )}

          <div className="flex w-full flex-col gap-4">
            {sessions?.map((session) => (
              <HistoryListItem
                key={session.sessionId}
                href={`/mypage/chats/${session.sessionId}`}
                badge={session.saveConsent ? t.saved : t.unsaved}
                badgeTone={session.saveConsent ? "primary" : "secondary"}
                title={t.itemTitle}
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
