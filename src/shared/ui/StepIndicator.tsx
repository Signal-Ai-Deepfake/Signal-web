interface StepIndicatorProps {
  total: number;
  current: number;
}

export default function StepIndicator({ total, current }: StepIndicatorProps) {
  return (
    <div
      className="flex w-full max-w-[270px] items-center"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`${total}단계 중 ${current}단계`}
    >
      {Array.from({ length: total }, (_, index) => index + 1).map((step) => (
        <div key={step} className="flex flex-1 items-center last:flex-none">
          <span
            className={`size-5 shrink-0 rounded-full border-2 transition-[background-color,border-color,transform] duration-300 motion-reduce:transition-none ${
              step <= current
                ? "border-secondary-500 bg-secondary-500 scale-100 delay-[400ms]"
                : "scale-90 border-gray-300 bg-white delay-0"
            }`}
          />
          {step < total && (
            <span className="relative h-0.5 flex-1 overflow-hidden bg-gray-300">
              <span
                className={`bg-secondary-500 absolute inset-y-0 left-0 transition-[width] duration-500 ease-out motion-reduce:transition-none ${
                  step < current ? "w-full delay-0" : "w-0 delay-200"
                }`}
              />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
