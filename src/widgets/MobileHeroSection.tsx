import Lock from "@/shared/asset/svg/Lock";
import AnalysisStepList from "@/shared/ui/AnalysisStepList";
import LinkButton from "@/shared/ui/LinkButton";

export default function MobileHeroSection() {
  return (
    <section className="relative w-full overflow-hidden px-5 pt-6 pb-8 md:hidden">
      <div className="bg-primary-50/60 pointer-events-none absolute top-0 right-0 size-[180px] -translate-y-1/4 translate-x-1/4 rounded-full" />
      <div className="bg-secondary-50/60 pointer-events-none absolute top-20 left-0 size-[140px] -translate-x-1/3 rounded-full" />
      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[28px] leading-[1.3] font-bold tracking-tight text-black">
            당신이 보낸 구조 신호,
            <br />
            <span className="text-secondary-400">Signal</span>이 안전한 일상으로
            <br />
            답합니다.
          </h1>
          <p className="text-body-2 pt-2 leading-[1.6] text-gray-800">
            디지털 괴롭힘부터 딥페이크까지,
            <br />
            혼자 고민하지 말고 Signal을 켜세요.
          </p>
        </div>
        <AnalysisStepList percent={72} riskPercent={24} level="안전" />
        <LinkButton href="/analyze" variant="primary" className="w-full justify-center">
          AI 분석 시작하기
        </LinkButton>
        <div className="flex items-center justify-center gap-1.5 opacity-70">
          <span className="text-gray-800 [&>svg]:h-4 [&>svg]:w-4">
            <Lock />
          </span>
          <p className="text-caption text-gray-800">모든 데이터는 암호화되어 안전하게 보호됩니다.</p>
        </div>
      </div>
    </section>
  );
}
