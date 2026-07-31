import ChatHistoryDetailPage from "@/views/ChatHistoryDetailPage/ChatHistoryDetailPage";

interface MypageChatDetailProps {
  params: Promise<{ id: string }>;
}

export default async function MypageChatDetail({ params }: MypageChatDetailProps) {
  const { id } = await params;
  return <ChatHistoryDetailPage id={id} />;
}
