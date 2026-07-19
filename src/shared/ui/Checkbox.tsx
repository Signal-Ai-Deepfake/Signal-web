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
      className="flex items-center gap-2"
      {...props}
    >
      <span className={checked ? "text-black" : "text-gray-500"}>
        <Check checked={checked} />
      </span>
      <span className="text-body-2 text-gray-600">{label}</span>
    </button>
  );
}
