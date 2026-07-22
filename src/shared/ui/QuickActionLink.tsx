import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import ArrowUp from "@/shared/asset/svg/ArrowUp";

interface QuickActionLinkProps {
  icon: ComponentType;
  title: string;
  description: ReactNode;
  href: string;
}

export default function QuickActionLink({
  icon: Icon,
  title,
  description,
  href,
}: QuickActionLinkProps) {
  return (
    <Link
      href={href}
      className="flex flex-1 flex-col gap-2 rounded-2xl bg-white px-4 pt-4 pb-2 transition-colors hover:bg-gray-100"
    >
      <span className="text-primary-500 [&>svg]:h-8 [&>svg]:w-8">
        <Icon />
      </span>
      <p className="text-body-1 text-black">{title}</p>
      <p className="text-body-2 text-gray-700">{description}</p>
      <span className="text-primary-500 self-end [&>svg]:h-6 [&>svg]:w-6">
        <ArrowUp />
      </span>
    </Link>
  );
}
