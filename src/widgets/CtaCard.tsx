import Image from "next/image";
import ArrowUp from "@/shared/asset/svg/ArrowUp";
import Lock from "@/shared/asset/svg/Lock";
import Sparkle from "@/shared/asset/svg/Sparkle";
import Button from "@/shared/ui/Button";

export default function CtaCard() {
  return (
    <div
      className="relative w-full max-w-[1280px] overflow-hidden rounded-2xl"
      style={{
        backgroundImage: "linear-gradient(78deg, #ffffff 52%, var(--color-secondary-50) 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-start gap-6 px-9 py-10">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="text-h3 font-semibold text-black">혼자 고민하지 마세요.</p>
            <p className="text-h3 font-semibold">
              <span className="text-secondary-400">Signal</span>
              <span className="text-black">이 함께 안전한 해결 방법을 찾아드립니다.</span>
            </p>
          </div>
          <p className="text-small text-gray-800">
            AI 분석부터 익명 상담, 신고 지원까지 한 곳에서 이용해 보세요.
          </p>
        </div>
        <Button variant="primary" className="gap-1">
          익명 상담 시작하기
          <span className="[&>svg]:h-6 [&>svg]:w-6">
            <ArrowUp />
          </span>
        </Button>
        <div className="flex items-center gap-1 text-gray-800">
          <span className="[&>svg]:h-6 [&>svg]:w-6">
            <Lock />
          </span>
          <p className="text-small">모든 상담 내용은 익명으로 안전하게 보호됩니다.</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[560px] lg:block">
        <Image
          src="/images/landing/wave-2.svg"
          alt=""
          width={966}
          height={156}
          className="absolute top-[45%] left-0 h-auto w-[480px]"
        />
        <Image
          src="/images/landing/wave-1.svg"
          alt=""
          width={966}
          height={156}
          className="absolute top-[30%] left-4 h-auto w-[480px] -rotate-6"
        />
        <Image
          src="/images/landing/ellipse-1.svg"
          alt=""
          width={420}
          height={420}
          className="absolute top-1/2 right-[-40px] h-[420px] w-[420px] -translate-y-1/2"
        />
        <Image
          src="/images/landing/ellipse-5.svg"
          alt=""
          width={300}
          height={300}
          className="absolute top-1/2 right-16 h-[300px] w-[300px] -translate-y-1/2"
        />
        <Image
          src="/images/landing/group-7.svg"
          alt=""
          width={300}
          height={300}
          className="absolute top-1/2 right-1 h-[300px] w-[300px] -translate-y-1/2"
        />
        <span className="absolute top-9 right-44 text-white [&>svg]:h-5 [&>svg]:w-5">
          <Sparkle />
        </span>
        <span className="absolute top-16 right-14 text-white [&>svg]:h-5 [&>svg]:w-5">
          <Sparkle />
        </span>
        <span className="text-secondary-200 absolute top-10 right-72 [&>svg]:h-5 [&>svg]:w-5">
          <Sparkle />
        </span>
      </div>
    </div>
  );
}
