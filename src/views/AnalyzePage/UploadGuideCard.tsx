import CheckCircle from "@/shared/asset/svg/CheckCircle";

const guideItems = [
  "사진 전체가 잘리지 않도록 업로드해 주세요.",
  "업로드한 사진은 분석 후 저장되지 않습니다.",
  "얼굴이 선명하게 보이는 사진을 업로드해 주세요.",
  "흐리거나 너무 어두운 사진은 정확도가 낮아질 수 있습니다.",
];

export default function UploadGuideCard() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-300 px-8 py-6">
      <p className="text-body-1 font-semibold text-black">업로드 가이드</p>
      {guideItems.map((item) => (
        <div key={item} className="flex items-start gap-2">
          <span className="text-primary-500 shrink-0 [&>svg]:h-6 [&>svg]:w-6">
            <CheckCircle />
          </span>
          <p className="text-body-2 text-gray-650">{item}</p>
        </div>
      ))}
    </div>
  );
}
