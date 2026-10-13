import Link from "next/link";
import Arrow from "@/shared/asset/svg/Arrow";

interface BackButtonProps {
  href?: string;
  className?: string;
}

// 브라우저 뒤로 가기는 이전 스크롤 위치를 복원하므로, 항상 맨 위에서 시작하도록 링크로 이동한다.
export default function BackButton({ href = "/", className = "" }: BackButtonProps) {
  return (
    <Link href={href} className={`text-body-2 flex items-center gap-1 text-gray-800 ${className}`}>
      <span className="block rotate-180 [&>svg]:h-4 [&>svg]:w-4">
        <Arrow />
      </span>
      뒤로 가기
    </Link>
  );
}
