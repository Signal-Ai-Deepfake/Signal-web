import type { ReactNode } from "react";
import BotOutline from "@/shared/asset/svg/BotOutline";

interface NoticeBannerProps {
  children: ReactNode;
  className?: string;
}

export default function NoticeBanner({ children, className = "" }: NoticeBannerProps) {
  return (
    <div
      className={`bg-secondary-50 border-secondary-200 flex items-start gap-2 rounded-lg border p-3 md:items-center md:p-4 ${className}`}
    >
      <span className="text-secondary-600 shrink-0 [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8">
        <BotOutline />
      </span>
      <p className="text-small md:text-body-2 text-secondary-600 font-medium break-keep">
        {children}
      </p>
    </div>
  );
}
