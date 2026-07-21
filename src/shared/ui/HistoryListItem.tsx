import Link from "next/link";
import Arrow from "@/shared/asset/svg/Arrow";

export type HistoryBadgeTone = "primary" | "secondary";

interface HistoryListItemProps {
  href: string;
  badge: string;
  badgeTone: HistoryBadgeTone;
  title: string;
  meta: string;
}

const badgeStyle: Record<HistoryBadgeTone, string> = {
  primary: "bg-primary-50 text-primary-500",
  secondary: "bg-secondary-50 text-secondary-500",
};

export default function HistoryListItem({ href, badge, badgeTone, title, meta }: HistoryListItemProps) {
  return (
    <Link
      href={href}
      className="flex w-full items-center justify-between rounded-2xl border border-gray-300 bg-white p-[25px] transition-colors hover:border-primary-300"
    >
      <div className="flex flex-col items-start gap-[7px]">
        <span className={`text-caption w-fit rounded-full px-3 py-1 ${badgeStyle[badgeTone]}`}>
          {badge}
        </span>
        <p className="text-body-2 px-1 font-medium text-black">{title}</p>
        <p className="text-small px-1 text-gray-700">{meta}</p>
      </div>
      <span className="text-black shrink-0">
        <Arrow />
      </span>
    </Link>
  );
}
