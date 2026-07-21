import BotOutline from "@/shared/asset/svg/BotOutline";
import CheckCircle from "@/shared/asset/svg/CheckCircle";

interface RecommendationCardProps {
  items: string[];
  aiNote: string;
}

export default function RecommendationCard({ items, aiNote }: RecommendationCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-300 p-6">
      <p className="text-body-1 font-semibold text-black">개선 권장사항</p>
      {items.map((item) => (
        <div key={item} className="flex items-start gap-2">
          <span className="text-primary-500 shrink-0 [&>svg]:h-6 [&>svg]:w-6">
            <CheckCircle />
          </span>
          <p className="text-body-2 text-gray-650">{item}</p>
        </div>
      ))}
      <div className="bg-secondary-50 border-secondary-200 flex items-center gap-2 rounded-lg border p-4">
        <span className="text-secondary-600 shrink-0 [&>svg]:h-8 [&>svg]:w-8">
          <BotOutline />
        </span>
        <p className="text-body-2 text-secondary-600 font-medium">{aiNote}</p>
      </div>
    </div>
  );
}
