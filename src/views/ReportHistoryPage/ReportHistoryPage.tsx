"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getMyReports } from "@/entities/report/api";
import Arrow from "@/shared/asset/svg/Arrow";
import HistoryListItem from "@/shared/ui/HistoryListItem";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}. ${pad(date.getMonth() + 1)}. ${pad(date.getDate())}`;
}

export default function ReportHistoryPage() {
  const {
    data: reports,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: getMyReports,
  });

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

          {isPending && <p className="text-body-1 text-gray-700">불러오는 중...</p>}

          {isError && (
            <p className="text-body-1 text-red-500">
              신고 문서 내역을 불러오지 못했습니다.
              {error instanceof Error ? ` (${error.message})` : ""}
            </p>
          )}

          {reports && reports.length === 0 && (
            <p className="text-body-1 text-gray-700">아직 작성한 신고 문서가 없습니다.</p>
          )}

          {reports && reports.length > 0 && (
            <div className="flex w-full flex-col gap-4">
              {reports.map((report) => (
                <HistoryListItem
                  key={report.reportId}
                  href={`/mypage/reports/${report.reportId}`}
                  badge={report.status === "FINALIZED" ? "제출 완료" : "작성 중"}
                  badgeTone={report.status === "FINALIZED" ? "primary" : "secondary"}
                  title={`${report.damageType ?? "신고"} 피해 신고 문서`}
                  meta={`${formatDate(report.createdAt)} 생성`}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
