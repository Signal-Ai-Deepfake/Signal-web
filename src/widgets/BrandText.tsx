import type { HeadlineSegment } from "@/widgets/messages";

const BRAND_CLASS = "text-secondary-400";

export function toTypingLines(lines: HeadlineSegment[][]) {
  return lines.map((line) =>
    line.map((segment) => ({
      text: segment.text,
      className: segment.brand ? BRAND_CLASS : undefined,
    })),
  );
}

export default function BrandText({
  segments,
  className = "",
}: {
  segments: HeadlineSegment[];
  className?: string;
}) {
  return segments.map((segment, index) => (
    <span key={index} className={segment.brand ? BRAND_CLASS : className}>
      {segment.text}
    </span>
  ));
}
