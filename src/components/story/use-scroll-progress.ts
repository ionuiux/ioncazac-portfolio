"use client";

import { useEffect, useRef } from "react";

// How far the page has scrolled through an element, from 0 to 1, updated on
// every frame the page moves. 0 is when the element's top reaches `start` and 1
// when its bottom reaches `end` (both fractions of the window height from the
// top). The defaults, 0 and 1, cover the time a tall section stays pinned while
// its sticky content fills the screen.
//
// The value is written to the element as the CSS variable --p, and passed to
// `onProgress` for anything CSS can't do on its own.
export function useScrollProgress<T extends HTMLElement>(
  onProgress?: (progress: number) => void,
  start = 0,
  end = 1,
) {
  const ref = useRef<T>(null);
  const callback = useRef(onProgress);
  useEffect(() => {
    callback.current = onProgress;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = element.getBoundingClientRect();
      const height = window.innerHeight;
      const distance = (start - end) * height + box.height;
      const progress = Math.min(1, Math.max(0, (start * height - box.top) / Math.max(1, distance)));
      element.style.setProperty("--p", progress.toFixed(4));
      callback.current?.(progress);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [start, end]);

  return ref;
}

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
