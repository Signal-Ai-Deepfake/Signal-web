import Link from "next/link";
import Arrow from "@/shared/asset/svg/Arrow";
import HistoryListItem from "@/shared/ui/HistoryListItem";
import NoticeBanner from "@/shared/ui/NoticeBanner";
import { chatSessions } from "@/entities/chat/model";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";

export default function ChatHistoryPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-10 pb-[120px]">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-body-1 text-gray-700">
                홈
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <span className="text-body-1 text-primary-500">대화 내역</span>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-h1 font-bold text-black">대화 내역</h1>
              <p className="text-body-1 text-gray-700">지금까지의 익명 상담 내역이 표시됩니다.</p>
            </div>
          </div>

          <NoticeBanner>익명 상담 내용은 사용자가 저장에 동의한 경우에만 보관됩니다.</NoticeBanner>

          <div className="flex w-full flex-col gap-4">
            {chatSessions.map((session) => (
              <HistoryListItem
                key={session.id}
                href={`/mypage/chats/${session.id}`}
                badge={session.topic}
                badgeTone={session.status === "완료" ? "primary" : "secondary"}
                title={session.title}
                meta={session.listMeta}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
