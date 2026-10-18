import Link from "next/link";
import LockOutline from "@/shared/asset/svg/LockOutline";
import Switch from "@/shared/ui/Switch";

interface ChatPrivacyCardProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  locked?: boolean;
  guest?: boolean;
}

export default function ChatPrivacyCard({
  checked,
  onChange,
  locked = false,
  guest = false,
}: ChatPrivacyCardProps) {
  return (
    <div className="bg-primary-50 flex w-full flex-col gap-4 rounded-2xl p-5">
      <div className="flex items-start gap-1">
        <span className="text-primary-500 shrink-0 [&>svg]:h-6 [&>svg]:w-6">
          <LockOutline />
        </span>
        <div className="flex flex-col">
          <p className="text-small text-primary-500 font-medium">
            익명으로 안전하게 상담이 진행됩니다.
          </p>
          <p className="text-caption text-gray-700">상담 내용은 기본적으로 저장되지 않습니다.</p>
        </div>
      </div>

      <div className="h-px w-full bg-gray-300" />

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-small font-semibold text-black">상담 내역 저장</p>
          <p className="text-caption text-gray-700">
            {guest ? "로그인 후 이용 가능" : checked ? "저장 동의함" : "저장하지 않음"}
          </p>
        </div>
        <Switch checked={!guest && checked} onChange={onChange} disabled={guest || locked} />
      </div>

      {guest ? (
        <p className="text-caption break-keep text-gray-700">
          비로그인 상담은 저장되지 않아요.
          {!locked && (
            <>
              {" "}
              상담 내역을 남기려면{" "}
              <Link href="/login" className="text-primary-500 font-semibold underline">
                로그인
              </Link>
              해 주세요.
            </>
          )}
        </p>
      ) : (
        <p className="text-caption text-gray-700">
          {locked
            ? "저장 여부는 대화를 시작하기 전에만 정할 수 있어요. 바꾸려면 새 채팅을 시작해 주세요."
            : "동의하면 이 대화를 ‘내 대화 내역’에서 다시 확인할 수 있습니다. 동의하지 않아도 상담은 계속할 수 있어요."}
        </p>
      )}
    </div>
  );
}
