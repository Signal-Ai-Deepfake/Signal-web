import type { ReactNode } from "react";

export default function FrameScale({ children }: { children: ReactNode }) {
  return <div className="relative grid min-h-[950px] w-full overflow-hidden">{children}</div>;
}
