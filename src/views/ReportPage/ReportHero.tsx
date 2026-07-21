import Link from "next/link";
import Arrow from "@/shared/asset/svg/Arrow";
import CheckCircle from "@/shared/asset/svg/CheckCircle";

export default function ReportHero() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex max-w-[670px] flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-body-1 text-gray-800">
            홈
          </Link>
          <span className="text-gray-800 [&>svg]:h-[18px] [&>svg]:w-[18px]">
            <Arrow />
          </span>
          <span className="text-body-1 text-primary-500">신고 지원</span>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-h1 font-bold text-black">신고 지원</h1>
          <p className="text-body-1 text-gray-800">
            기억나는 내용만 편안하게 입력해 주세요.
            <br />
            기관에 전달하기 좋은 형태로 차분히 정리해 드립니다.
          </p>
        </div>
      </div>
      <div className="bg-primary-50 flex w-full items-start gap-3.5 rounded-lg px-5 py-4.5">
        <span className="text-primary-500 mt-0.5 shrink-0 [&>svg]:h-6 [&>svg]:w-6">
          <CheckCircle />
        </span>
        <div className="flex flex-col gap-0.5">
          <p className="text-small text-primary-500">작성 내용은 이 화면에서만 사용됩니다.</p>
          <p className="text-small text-gray-800">
            모든 항목을 완벽하게 입력하지 않아도 괜찮아요. 나중에 초안에서 직접 수정할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
