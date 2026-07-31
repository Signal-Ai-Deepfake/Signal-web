interface StepIndicatorProps {
  total: number;
  current: number;
}

export default function StepIndicator({ total, current }: StepIndicatorProps) {
  return (
    <div className="flex w-full max-w-[270px] items-center">
      {Array.from({ length: total }, (_, index) => index + 1).map((step) => (
        <div key={step} className="flex flex-1 items-center last:flex-none">
          <span
            className={`size-5 shrink-0 rounded-full ${
              step <= current ? "bg-secondary-500" : "border-2 border-gray-300 bg-white"
            }`}
          />
          {step < total && (
            <span className={`h-0.5 flex-1 ${step < current ? "bg-secondary-500" : "bg-gray-300"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
