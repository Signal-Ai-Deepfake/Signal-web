import type { ReactNode } from "react";

export default function FrameScale({ children }: { children: ReactNode }) {
  return <div className="relative w-full overflow-hidden">{children}</div>;
}
