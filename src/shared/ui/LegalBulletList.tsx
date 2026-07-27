import type { ReactNode } from "react";

interface LegalBulletListProps {
  items: ReactNode[];
}

export default function LegalBulletList({ items }: LegalBulletListProps) {
  return (
    <ul className="flex flex-col gap-2 pl-5">
      {items.map((item, index) => (
        <li key={index} className="text-body-2 relative text-gray-700">
          <span className="absolute -left-5">•</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
