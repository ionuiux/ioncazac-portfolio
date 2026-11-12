"use client";

import { useRef } from "react";
import type { StoryImage } from "@/content/case-studies";
import { useReducedMotion } from "@/lib/motion";
import { BrowserWindow, Fill } from "./story-image";
import { clamp01, easeInOut, useScrollProgress } from "./use-scroll-progress";

// Three or four "before" screens, spread over the stage (four: one in each
// corner; three: two on top, one below in the middle), slide together into a
// pile as the page scrolls; then the single "after" screen rises in on top.
const SPOTS: Record<number, number[][]> = {
  3: [
    [-1, -1],
    [1, -1],
    [0, 1],
  ],
  4: [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ],
};
const TILT = [-3, 2, 2.5, -2];

export function Merge({
  label,
  heading,
  text,
  before,
  after,
}: {
  label: string;
  heading: [string, string];
  text: string;
  before: StoryImage[];
  after: StoryImage;
}) {
  const reduced = useReducedMotion();
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const final = useRef<HTMLDivElement>(null);
  const second = useRef<HTMLSpanElement>(null);

  const spots = SPOTS[before.length] ?? SPOTS[4];
  const middle = (before.length - 1) / 2;

  const section = useScrollProgress<HTMLElement>((progress) => {
    const together = reduced ? 1 : easeInOut(clamp01(progress / 0.5));
    const shown = reduced ? 1 : easeInOut(clamp01((progress - 0.45) / 0.3));
    cards.current.forEach((card, i) => {
      if (!card) return;
      const [x, y] = spots[i % spots.length];
      const apart = 56 * (1 - together);
      const tilt = TILT[i % 4] * (1 - together) + (i - middle) * 1.6 * together;
      card.style.transform = `translate(${x * apart}%, ${y * apart}%) rotate(${tilt}deg) scale(${1 - 0.08 * together})`;
    });
    if (final.current) {
      final.current.style.opacity = String(shown);
      final.current.style.transform = `translateY(${(1 - shown) * 8}%) scale(${0.9 + 0.1 * shown})`;
    }
    if (second.current) second.current.style.opacity = String(0.15 + 0.85 * shown);
  });

  return (
    <section ref={section} className={reduced ? "py-24" : "h-[300svh]"}>
      <div className={`flex flex-col justify-center ${reduced ? "" : "sticky top-0 h-svh overflow-hidden py-6"}`}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end lg:gap-16">
          <div>
            <p className="text-[13px] font-medium text-[var(--accent)]">{label}</p>
            <h2 className="mt-3 text-5xl leading-[0.95] font-bold tracking-[-0.045em] sm:text-7xl xl:text-8xl">
              {heading[0]}
              <br />
              <span ref={second} className="text-[var(--accent)]">
                {heading[1]}
              </span>
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-neutral-600 sm:text-[17px]">{text}</p>
        </div>

        {/* The stage keeps a 16:10 shape and shrinks to fit the screen's height. */}
        <div className="relative mx-auto mt-8 aspect-[16/10] w-[min(100%,1000px,calc((100svh-22rem)*1.6))] lg:mt-12">
          {before.map((image, i) => (
            <div
              key={image.alt}
              ref={(node) => {
                cards.current[i] = node;
              }}
              className="absolute top-[26%] left-[26%] aspect-[16/10] w-[48%] overflow-hidden bg-white shadow-[0_20px_40px_-20px_rgba(17,17,50,0.4)] ring-1 ring-black/5"
            >
              <Fill image={image} sizes="(min-width: 640px) 25vw, 50vw" compact />
              <span className="absolute top-2 left-2 bg-white/90 px-1.5 py-0.5 text-[10px] font-medium sm:text-[12px]">Before</span>
            </div>
          ))}
          <div ref={final} className="absolute top-[10%] left-[10%] w-[80%] opacity-0">
            <BrowserWindow>
              <Fill image={after} sizes="(min-width: 640px) 60vw, 90vw" />
            </BrowserWindow>
          </div>
        </div>
      </div>
    </section>
  );
}
