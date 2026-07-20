import Link from "next/link";

export default function StepFooter() {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="h-px w-full bg-gray-300" />
      <p className="text-body-2">
        <span className="text-gray-650">이미 계정이 있으신가요? </span>
        <Link href="/login" className="text-secondary-500 cursor-pointer underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
