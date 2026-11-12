"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// A number like "+30%" or "~20 s" that counts up from 0 when it scrolls into
// view. Values with no single number in them (like "4 → 1") and ones that would
// count only to 1 (like "1st") are shown as they are.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const match = /^(\D*)(\d+)(\D*)$/.exec(value);
    if (!element || !match || Number(match[2]) < 2 || prefersReducedMotion()) return;
    const [, before, number, after] = match;
    const target = Number(number);
    let frame = 0;
    element.textContent = `${before}0${after}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const begin = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - begin) / 1400);
          element.textContent = `${before}${Math.round(target * (1 - Math.pow(1 - t, 3)))}${after}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
