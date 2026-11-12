"use client";

import type { ReactNode } from "react";
import { useScrollProgress } from "./use-scroll-progress";

// A box whose image drifts slightly slower than the page while it passes the
// screen (the movement is in globals.css, under .parallax).
export function Parallax({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useScrollProgress<HTMLDivElement>(undefined, 1, 0);
  return (
    <div ref={ref} className={`parallax ${className}`}>
      {children}
    </div>
  );
}
