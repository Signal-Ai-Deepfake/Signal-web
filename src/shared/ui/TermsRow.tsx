import Arrow from "@/shared/asset/svg/Arrow";
import Check from "@/shared/asset/svg/Check";

export default function TermsRow({
  label,
  required = false,
  checked,
  onChange,
}: {
  label: string;
  required?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex w-full items-center justify-between bg-white px-5 py-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="flex cursor-pointer items-center gap-3"
      >
        <span
          className={`flex size-6 shrink-0 items-center justify-center rounded-md ${
            checked ? "bg-secondary-500 text-white" : "border border-gray-400"
          }`}
        >
          <Check checked={checked} />
        </span>
        <span className="text-body-2 text-black">
          {label}
          {required && <span className="text-secondary-500"> (필수)</span>}
        </span>
      </button>
      {required && (
        <span className="rotate-90 text-gray-700 [&>svg]:h-6 [&>svg]:w-3">
          <Arrow />
        </span>
      )}
    </div>
  );
}
