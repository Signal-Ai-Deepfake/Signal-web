import { useState } from "react";
import type { ReactNode } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import Check from "@/shared/asset/svg/Check";

export default function TermsRow({
  label,
  required = false,
  checked,
  onChange,
  content,
}: {
  label: string;
  required?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
  content?: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex w-full flex-col bg-white">
      <div className="flex w-full items-center justify-between px-5 py-3">
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
        {required && content && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className={`cursor-pointer text-gray-700 transition-transform duration-300 [&>svg]:h-6 [&>svg]:w-3 ${
              expanded ? "-rotate-90" : "rotate-90"
            }`}
          >
            <Arrow />
          </button>
        )}
      </div>
      {required && content && (
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-h-48 overflow-y-auto border-t border-gray-200 px-5 py-3">{content}</div>
          </div>
        </div>
      )}
    </div>
  );
}
