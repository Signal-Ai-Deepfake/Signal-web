"use client";

import { useState, type ReactNode } from "react";

interface StepTransitionProps {
  order: number;
  className?: string;
  children: ReactNode;
}

export default function StepTransition({ order, className = "", children }: StepTransitionProps) {
  const [prevOrder, setPrevOrder] = useState(order);
  const [changed, setChanged] = useState(false);

  if (order !== prevOrder) {
    setPrevOrder(order);
    setChanged(true);
  }

  return (
    <div
      key={order}
      className={`${changed ? "motion-safe:animate-[fade-in_0.4s_ease-out]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
