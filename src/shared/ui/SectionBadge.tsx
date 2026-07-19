import type { ReactNode } from "react";

export default function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="bg-primary-50 text-primary-500 text-caption rounded-full px-4 py-1">
      {children}
    </span>
  );
}
