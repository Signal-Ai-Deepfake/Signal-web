import CheckCircle from "@/shared/asset/svg/CheckCircle";
import Info from "@/shared/asset/svg/Info";

const defaultGuideItems = [
  "사진 전체가 잘리지 않도록 업로드해 주세요.",
  "업로드한 사진은 분석 후 저장되지 않습니다.",
  "얼굴이 선명하게 보이는 사진을 업로드해 주세요.",
  "흐리거나 너무 어두운 사진은 정확도가 낮아질 수 있습니다.",
];

interface UploadGuideCardProps {
  items?: string[];
}

export default function UploadGuideCard({ items = defaultGuideItems }: UploadGuideCardProps) {
  return (
    <>
      <div className="hidden flex-col gap-3 rounded-2xl border border-gray-300 px-8 py-6 md:flex">
        <p className="text-body-1 font-semibold text-black">업로드 가이드</p>
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2">
            <span className="text-primary-500 shrink-0 [&>svg]:h-6 [&>svg]:w-6">
              <CheckCircle />
            </span>
            <p className="text-body-2 text-gray-650">{item}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        <div className="text-primary-500 flex items-center gap-2">
          <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">
            <Info />
          </span>
          <p className="text-small font-bold">정확한 분석을 위한 가이드</p>
        </div>
        <div className="bg-primary-50/50 flex flex-col gap-3 rounded-2xl p-4">
          {items.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="bg-primary-500 mt-[7px] size-1.5 shrink-0 rounded-full" />
              <p className="text-small text-gray-800">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
