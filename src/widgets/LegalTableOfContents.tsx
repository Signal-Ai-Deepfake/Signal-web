"use client";

import { useEffect, useState } from "react";

interface LegalTableOfContentsProps {
  items: { id: string; label: string }[];
}

const ACTIVE_OFFSET = 120;

export default function LegalTableOfContents({ items }: LegalTableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    let frame = 0;

    function updateActive() {
      frame = 0;
      const sections = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);
      if (sections.length === 0) return;

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      const current = sections.findLast(
        (section) => section.getBoundingClientRect().top <= ACTIVE_OFFSET,
      );
      setActiveId((current ?? sections[0]).id);
    }

    function handleScroll() {
      if (frame) return;
      frame = requestAnimationFrame(updateActive);
    }

    updateActive();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [items]);

  return (
    <nav className="sticky top-24 flex w-60 shrink-0 flex-col gap-2 rounded-2xl border border-gray-200 p-6">
      <p className="text-body-2 font-bold text-black">목차</p>
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`text-small block rounded-lg px-2 py-2.5 transition-colors duration-200 ease-out ${
                  active
                    ? "bg-primary-50 text-primary-500 font-semibold"
                    : "hover:bg-primary-50 hover:text-primary-500 text-gray-700"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
