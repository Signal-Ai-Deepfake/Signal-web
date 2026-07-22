import AnalysisResultDetailPage from "@/views/AnalysisResultDetailPage/AnalysisResultDetailPage";

interface AnalyzeResultDetailProps {
  params: Promise<{ id: string }>;
}

export default async function AnalyzeResultDetail({ params }: AnalyzeResultDetailProps) {
  const { id } = await params;
  return <AnalysisResultDetailPage id={id} />;
}
