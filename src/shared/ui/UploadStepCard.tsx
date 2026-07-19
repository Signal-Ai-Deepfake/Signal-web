import ImageArrowUp from "@/shared/asset/svg/ImageArrowUp";
import AnalysisStepCard from "@/shared/ui/AnalysisStepCard";

export default function UploadStepCard() {
  return (
    <AnalysisStepCard step="01" title="이미지 업로드" size="sm">
      <div className="flex w-[192px] h-[119px] border border-gray-200 py-4 px-[10px] flex-col items-center justify-center gap-2 rounded-xl bg-gray-50">
        <div className="text-primary-500 [&>svg]:h-10 [&>svg]:w-10">
          <ImageArrowUp />
        </div>
        <p className="text-body-2 text-black">이미지 업로드</p>
        <p className="text-caption text-gray-700">JPG, PNG 파일 지원</p>
      </div>
      <div className="h-[121px] w-[192px] border border-gray-200 py-4 px-[10px] rounded-xl bg-gray-50" />
    </AnalysisStepCard>
  );
}
