"use client";

import { useRef, useState } from "react";
import type { StoryImage } from "@/content/case-studies";
import { PhoneShell } from "@/components/phone-frame";
import { Accent, BrowserWindow, Fill } from "./story-image";
import { useScrollProgress } from "./use-scroll-progress";

type Step = { title: string; text: string; image: StoryImage };

// A flow played out in one browser window (or phone) that stays pinned while
// the page scrolls: each stretch of scrolling shows the next step, and a timer
// counts up to the time the whole flow takes. Without `seconds`, a step count
// ("02 / 03") takes the timer's place.
// `sticker` sits on the window's corner until the last step, when `done` pops in
// its place (Flovi: "Let's go", then "All set").
export function Flow({
  label,
  heading,
  seconds,
  steps,
  sticker,
  done,
  device = "browser",
}: {
  label: string;
  heading: string;
  seconds?: number;
  steps: Step[];
  sticker?: string;
  done?: string;
  device?: "browser" | "phone";
}) {
  const [active, setActive] = useState(0);
  const timer = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  const section = useScrollProgress<HTMLElement>((progress) => {
    setActive(Math.min(steps.length - 1, Math.floor(progress * steps.length)));
    if (timer.current && seconds) timer.current.textContent = `00:${String(Math.round(progress * seconds)).padStart(2, "0")}`;
    if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
  });

  const step = steps[active];
  const finished = active === steps.length - 1;
  const count = (n: number) => String(n).padStart(2, "0");
  const signs = [
    { src: sticker, shown: !finished || !done, tilt: 10 },
    { src: done, shown: finished, tilt: -8 },
  ];

  // Every step's picture, stacked; only the current one is shown.
  const screens = (sizes: string) =>
    steps.map((item, i) => (
      <div
        key={item.title}
        aria-hidden={i !== active}
        className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
      >
        <Fill image={item.image} sizes={sizes} />
      </div>
    ));

  return (
    <section ref={section} style={{ height: `${steps.length * 60 + 100}svh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-5 py-6 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <div>
          <p className="text-[13px] font-medium text-[var(--accent)]">{label}</p>
          <h2 className="mt-3 text-4xl leading-[1.02] font-bold tracking-[-0.045em] text-balance sm:text-6xl xl:text-7xl">
            <Accent text={heading} />
          </h2>
          <div className="mt-5 flex items-center gap-4 lg:mt-10">
            <span ref={timer} className="text-3xl font-semibold tracking-tight tabular-nums sm:text-5xl">
              {seconds ? "00:00" : `${count(active + 1)} / ${count(steps.length)}`}
            </span>
            <span className="relative h-0.5 flex-1 bg-line">
              <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-[var(--accent)]" />
            </span>
          </div>
          {/* Laptops: every step listed, the current one open. */}
          <ol className="mt-8 hidden space-y-3 lg:block">
            {steps.map((item, i) => (
              <li key={item.title} className={`transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-35"}`}>
                <p className="text-[17px] font-semibold">
                  <span className="mr-3 inline-block w-6 text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {item.title}
                </p>
                <div className={`grid transition-[grid-template-rows] duration-500 ${i === active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden pl-9 text-[15px] leading-relaxed text-neutral-600">
                    <span className="block pt-1">{item.text}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative">
          {signs.map(
            (sign) =>
              sign.src && (
                // eslint-disable-next-line @next/next/no-img-element -- a small decorative SVG
                <img
                  key={sign.src}
                  src={sign.src}
                  alt=""
                  aria-hidden
                  className={`absolute -top-7 right-4 z-10 w-16 transition duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:-top-11 sm:right-8 sm:w-24 ${
                    sign.shown ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                  style={{ rotate: `${sign.tilt}deg` }}
                />
              ),
          )}
          {device === "phone" ? (
            // A phone on a tinted panel, sized by the screen's height.
            <div className="flex h-[44svh] items-center justify-center bg-[var(--tint)] lg:h-[80svh]">
              <PhoneShell className="h-[90%] lg:h-[86%]">{screens("(min-width: 1024px) 340px, 200px")}</PhoneShell>
            </div>
          ) : (
            <BrowserWindow>{screens("(min-width: 1024px) 58vw, 100vw")}</BrowserWindow>
          )}
          {/* Phones and tablets: just the current step under the window. */}
          <div className="mt-4 min-h-[5.5rem] lg:hidden">
            <p className="text-[16px] font-semibold">
              {/* The step count, unless it's already shown in the timer's place. */}
              {seconds && (
                <span className="mr-2 text-muted tabular-nums">
                  {active + 1}/{steps.length}
                </span>
              )}
              {step.title}
            </p>
            <p className="mt-1 text-[15px] leading-relaxed text-neutral-600">{step.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
