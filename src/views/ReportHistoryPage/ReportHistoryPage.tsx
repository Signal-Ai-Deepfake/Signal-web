import Link from "next/link";
import Arrow from "@/shared/asset/svg/Arrow";
import HistoryListItem from "@/shared/ui/HistoryListItem";
import { reportDocuments } from "@/entities/report/model";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";

export default function ReportHistoryPage() {
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
              <span className="text-body-1 text-primary-500">신고 문서 내역</span>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-h1 font-bold text-black">신고 문서 내역</h1>
              <p className="text-body-1 text-gray-700">
                작성하거나 생성한 기관 제출용 신고 초안을 확인할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4">
            {reportDocuments.map((document) => (
              <HistoryListItem
                key={document.id}
                href={`/mypage/reports/${document.id}`}
                badge={document.status === "완료" ? "초안 생성 완료" : "작성 중"}
                badgeTone={document.status === "완료" ? "primary" : "secondary"}
                title={document.title}
                meta={document.listMeta}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
