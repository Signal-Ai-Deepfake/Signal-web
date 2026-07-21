import LockOutline from "@/shared/asset/svg/LockOutline";
import Switch from "@/shared/ui/Switch";

interface ChatPrivacyCardProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ChatPrivacyCard({ checked, onChange }: ChatPrivacyCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-primary-50 p-5">
      <div className="flex items-start gap-1">
        <span className="text-primary-500 shrink-0 [&>svg]:h-6 [&>svg]:w-6">
          <LockOutline />
        </span>
        <div className="flex flex-col">
          <p className="text-small font-medium text-primary-500">
            익명으로 안전하게 상담이 진행됩니다.
          </p>
          <p className="text-caption text-gray-700">상담 내용은 기본적으로 저장되지 않습니다.</p>
        </div>
      </div>

      <div className="h-px w-full bg-gray-300" />

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-small font-semibold text-black">상담 내역 저장</p>
          <p className="text-caption text-gray-700">{checked ? "저장 동의함" : "저장하지 않음"}</p>
        </div>
        <Switch checked={checked} onChange={onChange} />
      </div>

      <p className="text-caption text-gray-700">
        동의하면 이 대화를 &lsquo;내 대화 내역&rsquo;에서 다시 확인할 수 있습니다. 동의하지 않아도
        상담은 계속할 수 있어요.
      </p>
    </div>
  );
}
