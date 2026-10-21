const steps = [
  { step: 1, label: "유형 선택" },
  { step: 2, label: "상황 입력" },
  { step: 3, label: "초안 확인" },
  { step: 4, label: "문서 생성" },
] as const;

export default function MobileReportStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex w-full items-center px-1 md:hidden">
      {steps.map(({ step, label }, index) => (
        <div key={step} className="contents">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`text-body-2 flex size-8 shrink-0 items-center justify-center rounded-full font-bold ${
                step <= currentStep ? "bg-primary-500 text-white" : "bg-primary-50 text-gray-800"
              }`}
            >
              {step}
            </div>
            <p
              className={`text-caption font-bold whitespace-nowrap ${
                step <= currentStep ? "text-primary-500" : "text-gray-800"
              }`}
            >
              {label}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 px-1.5 pb-6">
              <div
                className={`h-0.5 w-full ${step < currentStep ? "bg-primary-500" : "bg-primary-50"}`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
