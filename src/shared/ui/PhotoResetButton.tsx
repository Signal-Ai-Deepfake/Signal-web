import type { ButtonHTMLAttributes } from "react";
import Delete from "@/shared/asset/svg/Delete";

export default function PhotoResetButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="flex h-[40px] w-[137px] items-center justify-center gap-2 rounded bg-red-50 text-red-500 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-red-50"
      {...props}
    >
      <div className="[&>svg]:h-6 [&>svg]:w-6">
        <Delete />
      </div>
      <span className="text-body-2 font-medium">사진 초기화</span>
    </button>
  );
}
