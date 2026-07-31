import { useId } from "react";
import type { ComponentType, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  icon?: ComponentType;
  error?: string;
  rightSlot?: ReactNode;
}

export default function Input({
  label,
  icon: Icon,
  error,
  rightSlot,
  className = "",
  disabled,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <label htmlFor={inputId} className="text-body-2 px-1 text-black">
        {label}
      </label>
      <div className="flex w-full flex-col items-start">
        <div
          className={`flex h-[52px] w-full items-center gap-2 rounded-lg border p-3 transition-colors ${
            disabled
              ? "border-transparent bg-gray-200"
              : error
                ? "border-red-500"
                : "focus-within:border-secondary-500 border-gray-400"
          }`}
        >
          {Icon && (
            <span className="text-gray-600 shrink-0 [&>svg]:h-5 [&>svg]:w-5">
              <Icon />
            </span>
          )}
          <input
            id={inputId}
            disabled={disabled}
            className={`text-body-2 placeholder:text-gray-600 min-w-0 flex-1 text-black outline-none disabled:text-black disabled:cursor-default ${className}`}
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
