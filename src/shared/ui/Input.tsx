import type { ComponentType, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  icon: ComponentType;
  error?: string;
  rightSlot?: ReactNode;
}

export default function Input({
  label,
  icon: Icon,
  error,
  rightSlot,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <label className="text-body-1 px-1 text-black">{label}</label>
      <div className="flex w-full flex-col items-start">
        <div
          className={`flex h-[60px] w-full items-center gap-3 rounded-lg border p-4 ${
            error ? "border-red-500" : "border-gray-400"
          }`}
        >
          <span className="text-gray-600 shrink-0 [&>svg]:h-6 [&>svg]:w-6">
            <Icon />
          </span>
          <input
            className={`text-body-1 placeholder:text-gray-600 min-w-0 flex-1 text-black outline-none ${className}`}
            {...props}
          />
          {rightSlot}
        </div>
        <div className="flex h-6 w-full items-center px-1">
          {error && <p className="text-body-2 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
