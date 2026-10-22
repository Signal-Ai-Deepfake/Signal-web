"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface LegalSectionProps {
  id: string;
  title: string;
  first?: boolean;
  last?: boolean;
  children: ReactNode;
}

export default function LegalSection({
  id,
  title,
  first = false,
  last = false,
  children,
}: LegalSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`legal-section flex w-full scroll-mt-20 flex-col pb-7 transition-all duration-700 ease-out md:scroll-mt-24 md:pb-9 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${first ? "" : "pt-7 md:pt-9"} ${last ? "" : "border-b border-gray-300"}`}
    >
      <h2 className="text-large md:text-h3 font-semibold text-black">{title}</h2>
      <div className="mt-4 flex flex-col">{children}</div>
    </section>
  );
}
