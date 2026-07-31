import ReportHistoryDetailPage from "@/views/ReportHistoryDetailPage/ReportHistoryDetailPage";

interface MypageReportDetailProps {
  params: Promise<{ id: string }>;
}

export default async function MypageReportDetail({ params }: MypageReportDetailProps) {
  const { id } = await params;
  return <ReportHistoryDetailPage id={id} />;
}
