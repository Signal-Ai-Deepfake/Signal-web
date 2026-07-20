import type { ButtonHTMLAttributes } from "react";
import Check from "@/shared/asset/svg/Check";

interface CheckboxProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export default function Checkbox({ checked, onChange, label, ...props }: CheckboxProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className="flex cursor-pointer items-center gap-2"
      {...props}
    >
      <span
        className={`flex size-6 shrink-0 items-center justify-center rounded-md ${
          checked ? "bg-secondary-500 text-white" : "border border-gray-400"
        }`}
      >
        <Check checked={checked} />
      </span>
      <span className="text-body-2 text-gray-600">{label}</span>
    </button>
  );
}
