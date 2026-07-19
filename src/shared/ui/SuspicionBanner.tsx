import type { ComponentType } from "react";
import ShieldCheck from "@/shared/asset/svg/ShieldCheck";
import Warning from "@/shared/asset/svg/Warning";
import Warnings from "@/shared/asset/svg/Warnings";

type SuspicionStatus = "의심" | "주의" | "의심없음";

interface SuspicionBannerProps {
  status: SuspicionStatus;
}

const statusStyle: Record<
  SuspicionStatus,
  { label: string; icon: ComponentType; className: string }
> = {
  의심: { label: "도용 의심", icon: Warnings, className: "bg-red-50 text-red-500" },
  주의: { label: "도용 주의", icon: Warning, className: "bg-yellow-50 text-yellow-500" },
  의심없음: { label: "도용 의심 없음", icon: ShieldCheck, className: "bg-green-50 text-green-500" },
};

export default function SuspicionBanner({ status }: SuspicionBannerProps) {
  const { label, icon: Icon, className } = statusStyle[status];

  return (
    <div className={`flex h-[60px] w-[336px] items-center gap-3 rounded-lg px-5 ${className}`}>
      <div className="shrink-0 [&>svg]:h-8 [&>svg]:w-8">
        <Icon />
      </div>
      <p className="text-body-1 font-bold">{label}</p>
    </div>
  );
}
