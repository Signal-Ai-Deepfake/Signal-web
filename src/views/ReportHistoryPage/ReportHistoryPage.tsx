"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyReports } from "@/entities/report/api";
import PageHeading from "@/shared/ui/PageHeading";
import HistoryListItem from "@/shared/ui/HistoryListItem";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import { useT } from "@/shared/i18n/I18nProvider";
import { mypageMessages } from "@/views/mypageMessages";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}. ${pad(date.getMonth() + 1)}. ${pad(date.getDate())}`;
}

export default function ReportHistoryPage() {
  const { reports: t, loading } = useT(mypageMessages);
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
      <main className="flex w-full flex-col items-center bg-white px-5 py-6 pb-[120px] md:py-10">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-6 md:gap-8">
          <PageHeading
            title={t.title}
            description={t.description}
            breadcrumbs={[{ label: t.title }]}
          />

          {isPending && <p className="text-body-1 text-gray-700">{loading}</p>}

          {isError && (
            <p className="text-body-1 text-red-500">
              {t.loadFailed}
              {error instanceof Error ? ` (${error.message})` : ""}
            </p>
          )}

          {reports && reports.length === 0 && (
            <p className="text-body-1 text-gray-700">{t.empty}</p>
          )}

          {reports && reports.length > 0 && (
            <div className="flex w-full flex-col gap-4">
              {reports.map((report) => (
                <HistoryListItem
                  key={report.reportId}
                  href={`/mypage/reports/${report.reportId}`}
                  badge={report.status === "FINALIZED" ? t.finalized : t.drafting}
                  badgeTone={report.status === "FINALIZED" ? "primary" : "secondary"}
                  title={t.itemTitle(report.damageType ?? t.itemFallback)}
                  meta={t.created(formatDate(report.createdAt))}
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
