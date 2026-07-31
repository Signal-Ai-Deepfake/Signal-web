import { Fragment } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import BotOutline from "@/shared/asset/svg/BotOutline";
import CheckCircle from "@/shared/asset/svg/CheckCircle";
import FileCheck from "@/shared/asset/svg/FileCheck";
import Globe from "@/shared/asset/svg/Globe";
import ScanFace from "@/shared/asset/svg/ScanFace";

const guideItems = [
  "사진이나 영상 전체가 잘리지 않도록 업로드해 주세요.",
  "흐리거나 너무 어두운 파일은 정확도가 낮아질 수 있습니다.",
  "얼굴이 선명하게 보이는 사진 또는 영상을 업로드해 주세요.",
  "업로드한 사진은 분석 후 저장되지 않습니다.",
];

const steps = [
  { icon: ScanFace, label: "얼굴 특징\n추출" },
  { icon: Globe, label: "웹 이미지\n검색" },
  { icon: BotOutline, label: "합성 흔적\n분석" },
  { icon: FileCheck, label: "탐지 결과\n제공" },
];

export default function AnalysisGuideCard() {
  return (
    <div className="h-[458px] w-full rounded-3xl border border-gray-200 bg-white p-8 lg:flex-1">
      <div className="mx-auto flex h-full max-w-[477px] flex-col justify-center">
        <div className="flex flex-col gap-3">
          <p className="text-body-1 font-semibold text-black">업로드 가이드</p>
          <ul className="flex flex-col gap-3">
            {guideItems.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <div className="text-primary-500 shrink-0 [&>svg]:h-6 [&>svg]:w-6">
                  <CheckCircle />
                </div>
                <span className="text-large text-gray-650 font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="my-8 h-px bg-gray-200" />
        <div className="flex flex-col gap-3">
          <p className="text-body-1 font-semibold text-black">탐지 과정</p>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <Fragment key={step.label}>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-primary-500 bg-primary-50 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg [&>svg]:h-8 [&>svg]:w-8">
                    <step.icon />
                  </div>
                  <p className="text-caption text-center whitespace-pre-line text-gray-800">
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="shrink-0 text-gray-600 [&>svg]:h-6 [&>svg]:w-3">
                    <Arrow />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
